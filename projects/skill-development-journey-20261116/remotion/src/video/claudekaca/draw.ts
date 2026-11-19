import {renderToStaticMarkup} from 'react-dom/server';
import {createElement} from 'react';
import {LogoClaude} from '../bersama/ui-asli/claude/LogoClaude';
import {CURVE} from '../../lib/curves';
import {CUES, FPS, RESETS, SENDS, TEXT, cellVisibility, resetAt, sceneAt, type SceneState} from './timeline';

const W = 1920, H = 1080;
const INK = '#1f1e1d', MUTED = '#6e6862', WHITE = '#faf8f0', ORANGE = '#d97757';
type Box = {x: number; y: number; w: number; h: number};
type Check = {text: string; box: Box; ink: Box};
export type Assets = {background: HTMLCanvasElement; frosted: HTMLCanvasElement; logo: HTMLImageElement};
export type Audit = {time: number; text: Check[]; grid: null | {direction: string; changed: number; outside: number; cells: number; edge: number}};
const clamp = (v: number) => Math.max(0, Math.min(1, v));
const motion = (t: number, start: number, frames: number, curve: 'heavy' | 'land' = 'land') =>
  CURVE[curve](clamp((t - start) * FPS / frames));
const canvas = () => Object.assign(document.createElement('canvas'), {width: W, height: H});
const context = (c: HTMLCanvasElement) => {
  const ctx = c.getContext('2d', {willReadFrequently: true});
  if (!ctx) throw new Error('Canvas 2D is unavailable');
  return ctx;
};
const image = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => {
  const img = new Image(); img.onload = () => resolve(img); img.onerror = () => reject(new Error(`Image failed: ${src}`)); img.src = src;
});

export const loadAssets = async (url: (s: string) => string): Promise<Assets> => {
  const fonts = [new FontFace('ClaudeKacaSF', `url("${url('fonts/sfpro-display-medium.otf')}")`, {weight: '500'}),
    new FontFace('ClaudeKacaSF', `url("${url('fonts/sfpro-display-bold.otf')}")`, {weight: '700'})];
  const [padang, logo] = await Promise.all([
    image(url('img/latar-padang.png')),
    image('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(renderToStaticMarkup(createElement('svg',
      {xmlns: 'http://www.w3.org/2000/svg', width: 96, height: 96}, createElement(LogoClaude, {size: 96}))))),
    ...fonts.map(async (font) => {document.fonts.add(await font.load());}),
  ]);
  await document.fonts.ready;
  for (const weight of [500, 700]) if (!document.fonts.check(`${weight} 38px ClaudeKacaSF`)) throw new Error('SF Pro was not loaded');
  const background = canvas(), frosted = canvas();
  const bg = context(background); bg.filter = 'blur(3px)'; bg.drawImage(padang, -8, -5, W + 16, H + 10); bg.filter = 'none';
  const fg = context(frosted); fg.filter = 'blur(22px)'; fg.drawImage(background, 0, 0); fg.filter = 'none';
  return {background, frosted, logo};
};

class UI {
  checks: Check[] = [];
  constructor(readonly ctx: CanvasRenderingContext2D, readonly assets: Assets) {}

  font(size: number, weight = 500) {this.ctx.font = `${weight} ${size}px ClaudeKacaSF`; this.ctx.textBaseline = 'alphabetic';}
  width(text: string, size: number, weight = 500) {this.font(size, weight); return this.ctx.measureText(text).width;}
  shape(b: Box, radius: number) {this.ctx.beginPath(); this.ctx.roundRect(b.x, b.y, b.w, b.h, radius);}
  fill(b: Box, radius: number, color: string) {this.shape(b, radius); this.ctx.fillStyle = color; this.ctx.fill();}
  glass(b: Box, radius: number, tint = 'rgba(255,255,255,0.64)') {
    const c = this.ctx;
    c.save(); c.shadowColor = 'rgba(30,20,30,0.28)'; c.shadowBlur = 18; c.shadowOffsetY = 14;
    this.fill(b, radius, '#302830'); c.restore();
    c.save(); this.shape(b, radius); c.clip(); c.drawImage(this.assets.frosted, 0, 0); this.fill(b, radius, tint); c.restore();
    this.shape(b, radius); c.lineWidth = 2; c.strokeStyle = 'rgba(255,255,255,0.47)'; c.stroke();
  }
  text(text: string, x: number, y: number, size: number, weight: number, color: string, box: Box, pad = 8, outline = false) {
    if (!text) return;
    const c = this.ctx; this.font(size, weight);
    const m = c.measureText(text), baseline = y + m.actualBoundingBoxAscent;
    const ink = {x: x - m.actualBoundingBoxLeft, y, w: m.actualBoundingBoxLeft + m.actualBoundingBoxRight,
      h: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent};
    if (ink.x < box.x + pad / 2 || ink.x + ink.w > box.x + box.w - pad / 2 ||
        ink.y < box.y + pad / 2 || ink.y + ink.h > box.y + box.h - pad / 2) {
      throw new Error(`Text outside container: ${JSON.stringify({text, box, ink})}`);
    }
    c.save();
    if (outline) {
      c.strokeStyle = 'rgba(29,40,43,0.20)'; c.lineWidth = 0.7; c.lineJoin = 'round';
      c.shadowColor = 'rgba(15,29,34,0.55)'; c.shadowBlur = 8; c.shadowOffsetY = 2; c.strokeText(text, x, baseline);
    }
    c.fillStyle = color; c.fillText(text, x, baseline); c.restore(); this.checks.push({text, box, ink});
  }
  lines(text: string, size: number, width: number) {
    const lines: string[] = []; let line = '';
    for (const word of text.split(' ')) {
      const next = line ? `${line} ${word}` : word;
      if (line && this.width(next, size) > width) {lines.push(line); line = word;} else line = next;
    }
    if (line) lines.push(line);
    return lines;
  }
  logo(x: number, y: number, size: number) {this.ctx.drawImage(this.assets.logo, x, y, size, size);}
  mp4(x: number, y: number, progress = 1) {
    const name = 'footage-irfan.mp4', detail = progress >= 1 ? 'Video · 1,2 GB' : `Mengunggah ${Math.floor(progress * 100)}%`;
    const b = {x, y, w: Math.max(330, Math.ceil(this.width(name, 24, 700)) + 104), h: 76};
    this.fill(b, 16, 'rgba(255,255,255,0.94)');
    this.shape(b, 16); this.ctx.strokeStyle = '#dcd6ce'; this.ctx.lineWidth = 2; this.ctx.stroke();
    this.fill({x: x + 12, y: y + 12, w: 52, h: 52}, 10, '#282624');
    const c = this.ctx; c.beginPath(); c.moveTo(x + 32, y + 26); c.lineTo(x + 32, y + 50); c.lineTo(x + 52, y + 38); c.closePath(); c.fillStyle = '#fff'; c.fill();
    this.text(name, x + 78, y + 12, 24, 700, INK, b, 10);
    this.text(detail, x + 78, y + 43, 20, 500, MUTED, b, 8);
    if (progress < 1) this.fill({x: x + 78, y: y + 67, w: Math.max(1, (b.w - 98) * progress), h: 3}, 1.5, ORANGE);
  }
  plus(x: number, y: number) {
    const c = this.ctx; c.beginPath(); c.moveTo(x - 10, y); c.lineTo(x + 10, y); c.moveTo(x, y - 10); c.lineTo(x, y + 10);
    c.strokeStyle = MUTED; c.lineWidth = 2.5; c.lineCap = 'round'; c.stroke();
  }
  composer(s: SceneState, t: number) {
    const lines = this.lines(s.input || TEXT.placeholder, 38, 912);
    const b = {x: 460, y: 600, w: 1000, h: Math.max(150, 106 + lines.length * 44)};
    this.glass(b, 34, s.focus ? 'rgba(255,255,255,0.76)' : 'rgba(255,255,255,0.62)');
    lines.forEach((line, i) => this.text(line, b.x + 44, b.y + 31 + i * 44, 38, 500, s.input ? INK : MUTED, b, 20));
    if (s.focus && Math.floor(t * FPS / 12) % 2 === 0) {
      const x = b.x + 48 + this.width(s.input ? lines[lines.length - 1] : '', 38);
      this.fill({x, y: b.y + 27 + (s.input ? lines.length - 1 : 0) * 44, w: 3, h: 42}, 1, INK);
    }
    const bottom = b.y + b.h; this.plus(b.x + 54, bottom - 35);
    const model = 'Opus 5.5  ·  High';
    this.text(model, b.x + b.w - 110 - this.width(model, 26), bottom - 47, 26, 500, MUTED, b, 20);
    const active = Boolean(s.input), button = {x: b.x + b.w - 76, y: bottom - 58, w: 50, h: 50};
    this.fill(button, 14, active ? ORANGE : '#dcc8be');
    const c = this.ctx, x = button.x + 25, y = button.y + 25;
    c.beginPath(); c.moveTo(x, y + 11); c.lineTo(x, y - 11); c.moveTo(x - 9, y - 2); c.lineTo(x, y - 11); c.lineTo(x + 9, y - 2);
    c.strokeStyle = '#fff'; c.lineWidth = 3; c.lineCap = 'round'; c.lineJoin = 'round'; c.stroke();
    if (s.attachment !== null) {
      const enter = motion(t, s.attachmentStart, 8);
      this.mp4(b.x + 40 - 44 * (1 - enter), b.y - 96 + 18 * (1 - enter), s.attachment);
    }
  }
  greeting() {
    const size = 64, width = this.width(TEXT.greeting, size, 700), left = (W - width - 70) / 2;
    this.logo(left, 207, 48);
    this.text(TEXT.greeting, left + 70, 203, size, 700, WHITE, {x: left + 58, y: 187, w: width + 24, h: 90}, 8, true);
  }
  menu(t: number) {
    const items = [['/apple-style', 'Gaya Apple, minimal'], ['/cinematic-storytelling', 'Gaya sinematik'], ['/viral-hook', 'Hook viral 3 detik']];
    const width = Math.ceil(Math.max(...items.map(([name, detail]) => this.width(name, 30, 700) + this.width(detail, 24)))) + 110;
    const y = 368 + 14 * (1 - motion(t, CUES.slash + 0.33, 5)), b = {x: 460, y, w: width, h: 212};
    this.glass(b, 22, 'rgba(255,255,255,0.83)');
    this.text('Template', 484, y - 40, 26, 700, WHITE, {x: 470, y: y - 49, w: width, h: 42}, 8, true);
    items.forEach(([name, detail], i) => {
      const rowY = y + 20 + i * 64;
      if (i === 0) this.fill({x: 470, y: rowY - 8, w: width - 20, h: 58}, 14, 'rgba(255,255,255,0.91)');
      this.text(name, 486, rowY, 30, 700, INK, b, 14);
      this.text(detail, 506 + this.width(name, 30, 700), rowY + 6, 24, 500, MUTED, b, 14);
    });
  }
  conversation(s: SceneState, t: number) {
    const lines = this.lines(s.sent, 32, 920), width = Math.min(1000, Math.max(380, ...lines.map((line) => this.width(line, 32) + 80)));
    const y = 150 + 140 * (1 - motion(t, s.sendAt, 8, 'heavy'));
    const b = {x: 1460 - width, y, w: width, h: Math.max(180, 141 + lines.length * 39)};
    this.glass(b, 28, 'rgba(40,30,40,0.69)'); this.mp4(b.x + 30, b.y + 16);
    lines.forEach((line, i) => this.text(line, b.x + 40, b.y + 118 + i * 39, 32, 500, WHITE, b, 20));
    if (s.reply) {
      const replyLines = this.lines(s.reply, 32, 860), replyY = 370 + 24 * (1 - motion(t, s.replyAt, 5));
      const r = {x: 460, y: replyY, w: Math.min(1000, Math.max(...replyLines.map((line) => this.width(line, 32))) + 140), h: 49 + replyLines.length * 39};
      this.glass(r, 28); this.logo(r.x + 30, r.y + 25, 36);
      replyLines.forEach((line, i) => this.text(line, r.x + 90, r.y + 27 + i * 39, 32, 500, INK, r, 20));
    } else if (s.thinking) {
      this.logo(490, 395, 36);
      for (let i = 0; i < 3; i++) this.fill({x: 550 + i * 20, y: 410 - Math.sin(t * 9 - i * 0.8) * 4, w: 8, h: 8}, 4, WHITE);
    }
  }
  newChat(t: number) {
    const b = {x: 1560, y: 70, w: Math.max(240, this.width('+  Chat baru', 28, 700) + 72), h: 58};
    const clicked = RESETS.some((s) => t >= s && t < s + 2 / FPS);
    this.glass(b, 22, clicked ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.76)');
    this.text('+  Chat baru', b.x + 40, b.y + 16, 28, 700, INK, b, 12);
  }
}

const noise = (x: number, y: number, seed: number) => {
  const v = Math.sin(x * 127.1 + y * 311.7 + seed * 67.3) * 43758.5453; return v - Math.floor(v);
};

export const applyObjectGrid = (c: HTMLCanvasElement, edge: number) => {
  const ctx = context(c), src = ctx.getImageData(0, 0, W, H), dst = new ImageData(new Uint8ClampedArray(src.data), W, H);
  let changed = 0, outside = 0, cells = 0;
  for (let gy = 0; gy < H; gy += 24) for (let gx = 0; gx < W; gx += 24) {
    const vis = cellVisibility(gx + 12, edge, noise(gx, gy, 5) * 40 - 20, noise(gx, gy, 11));
    if (vis.alpha === 1) continue;
    const color = [0, 0, 0]; let weight = 0;
    if (vis.pixelated) {
      for (let y = gy; y < Math.min(gy + 24, H); y++) for (let x = gx; x < Math.min(gx + 24, W); x++) {
        const at = (y * W + x) * 4, a = src.data[at + 3]; weight += a;
        for (let k = 0; k < 3; k++) color[k] += src.data[at + k] * a;
      }
      if (weight) {color.forEach((v, k) => {color[k] = Math.round(v / weight);}); cells++;}
    }
    for (let y = gy; y < Math.min(gy + 24, H); y++) for (let x = gx; x < Math.min(gx + 24, W); x++) {
      const at = (y * W + x) * 4;
      const inset = x > gx && x < gx + 23 && y > gy && y < gy + 23;
      const alpha = src.data[at + 3] * (vis.pixelated && !inset ? 0 : vis.alpha);
      dst.data[at + 3] = Math.round(alpha);
      if (vis.pixelated && alpha) for (let k = 0; k < 3; k++) dst.data[at + k] = color[k];
      if (src.data[at + 3] && dst.data[at + 3] !== src.data[at + 3]) changed++;
      if (!src.data[at + 3] && dst.data[at + 3]) outside++;
    }
  }
  ctx.putImageData(dst, 0, 0); return {changed, outside, cells, edge};
};

const waypoints = [
  [24.7, 1120, 820], [25.48, 514, 715], [25.75, 516, 714], [27.75, 696, 653],
  [28.75, 715, 404], [CUES.select, 715, 404], [SENDS[0] - 0.055, 1410, 716], [SENDS[0] + 0.045, 1410, 716],
  [RESETS[0] - 0.06, 1664, 96], [RESETS[0] + 0.06, 1664, 96], [30.85, 1060, 649],
  [SENDS[1] - 0.04, 1410, 716], [SENDS[1] + 0.035, 1410, 716],
  [RESETS[1] - 0.025, 1664, 96], [RESETS[1] + 0.04, 1664, 96], [32.94, 1070, 651],
  [SENDS[2] - 0.04, 1410, 716], [SENDS[2] + 0.08, 1410, 716], [34.3, 1490, 800],
];

const cursor = (c: CanvasRenderingContext2D, t: number) => {
  if (t < waypoints[0][0]) return;
  const next = waypoints.findIndex((p) => p[0] > t), from = waypoints[next < 0 ? waypoints.length - 1 : Math.max(0, next - 1)], to = waypoints[next < 0 ? waypoints.length - 1 : next];
  const p = CURVE.land(clamp((t - from[0]) / Math.max(1e-8, to[0] - from[0])));
  const length = Math.hypot(to[1] - from[1], to[2] - from[2]), bow = Math.min(120, length * 0.18);
  const x = from[1] + (to[1] - from[1]) * p + Math.sin(p * Math.PI) * bow;
  const y = from[2] + (to[2] - from[2]) * p - Math.sin(p * Math.PI) * bow * 0.7;
  const clicks = [CUES.upload, CUES.select, ...SENDS, ...RESETS], elapsed = t - Math.max(...clicks.filter((s) => s <= t));
  c.save(); c.translate(x, y);
  if (elapsed >= 0 && elapsed < 0.12) {
    c.beginPath(); c.arc(2, 3, 8 + elapsed * 80, 0, Math.PI * 2); c.strokeStyle = ORANGE; c.lineWidth = 2; c.stroke();
  }
  c.shadowColor = 'rgba(0,0,0,0.25)'; c.shadowBlur = 5; c.shadowOffsetY = 3;
  c.beginPath(); c.moveTo(0, 0); for (const [px, py] of [[0, 40], [11, 30], [19, 46], [26, 42], [18, 27], [31, 27]]) c.lineTo(px, py);
  c.closePath(); c.fillStyle = '#fff'; c.fill(); c.strokeStyle = '#24201c'; c.lineWidth = 1.8; c.lineJoin = 'round'; c.stroke(); c.restore();
};

export const drawScene = (target: HTMLCanvasElement, assets: Assets, t: number, layerOnly = false): Audit => {
  const objects = canvas(), ui = new UI(context(objects), assets), reset = resetAt(t), state = reset?.state ?? sceneAt(t);
  if (!state.sent) ui.greeting(); else ui.conversation(state, t);
  ui.composer(state, t); if (state.menu) ui.menu(t);
  const gridAudit = reset ? {...applyObjectGrid(objects, reset.edge), direction: reset.direction} : null;
  if (gridAudit?.outside) throw new Error('Grid changed pixels outside the objects');
  const out = context(target); out.clearRect(0, 0, W, H); if (!layerOnly) out.drawImage(assets.background, 0, 0); out.drawImage(objects, 0, 0);
  const fixed = new UI(out, assets); if (t >= SENDS[0]) fixed.newChat(t); cursor(out, t);
  return {time: t, text: [...ui.checks, ...fixed.checks], grid: gridAudit};
};
