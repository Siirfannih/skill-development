import words from '../../../../edit/words.json';

export const FPS = 30000 / 1001;
export const T0 = 707 / FPS;
export const FRAMES = 324;
const quantize = (s: number) => Math.round(s * FPS) / FPS;
const word = (id: number) => {
  const found = words.words.find((w) => w.src_id === id);
  if (!found) throw new Error(`Missing spoken word ${id}`);
  return found;
};

export const TEXT = {
  greeting: 'Selamat sore, Irfan',
  placeholder: 'Ada yang bisa dibantu?',
  apple: 'Gunakan /apple-style untuk edit videoku.',
  cine: 'Gunakan /cinematic-storytelling untuk edit videoku.',
  reverse: 'Tonton videoku, lalu kamu yang tentukan gayanya.',
  appleReply: 'Siap, aku edit dengan gaya Apple.',
  cineReply: 'Siap, aku edit dengan gaya sinematik.',
  finalReply: 'Oke. Aku tonton dulu, lalu aku pilih gaya yang cocok.',
} as const;

export const CUES = {
  upload: word(110).s,
  slash: word(117).s,
  select: word(120).s,
  cinematic: word(124).s,
  reverse: word(130).s,
  finalReply: quantize(word(136).s),
};
export const SENDS = [quantize(CUES.select + 0.6), quantize(word(126).s), quantize(word(134).s + 0.3)];
export const RESETS = [quantize(word(123).s), quantize(word(127).s)];
export const RESET_FRAMES = 12;
const resetEnd = (i: number) => RESETS[i] + RESET_FRAMES / FPS;
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const type = (text: string, t: number, start: number, end: number) =>
  text.slice(0, Math.floor(text.length * clamp((t - start) / (end - start)) + 1e-7));

export type SceneState = {
  mode: 'home' | 'compose' | 'sent';
  input: string;
  attachment: number | null;
  attachmentStart: number;
  focus: boolean;
  menu: boolean;
  sent: string;
  sendAt: number;
  reply: string;
  replyAt: number;
  thinking: boolean;
};

export const home = (): SceneState => ({mode: 'home', input: '', attachment: null,
  attachmentStart: 0, focus: false, menu: false, sent: '', sendAt: 0, reply: '', replyAt: 0, thinking: false});

export const sceneAt = (t: number): SceneState => {
  const s = home();
  if (t < SENDS[0]) {
    s.focus = t >= CUES.upload;
    if (s.focus) {
      s.mode = 'compose';
      s.attachment = clamp((t - CUES.upload) / 1.15);
      s.attachmentStart = CUES.upload;
    }
    s.input = t < CUES.select
      ? type('Gunakan /', t, CUES.slash, CUES.slash + 0.33)
      : 'Gunakan /apple-style' + type(' untuk edit videoku.', t, CUES.select, CUES.select + 0.4);
    s.menu = s.input.endsWith('/') && t < CUES.select;
    return s;
  }
  if (t < RESETS[0]) return sent(0, t);
  if (t < SENDS[1]) {
    s.mode = 'compose';
    s.focus = true;
    s.attachment = 1;
    s.attachmentStart = resetEnd(0);
    s.input = type(TEXT.cine, t, resetEnd(0), word(125).e - 0.13);
    return s;
  }
  if (t < RESETS[1]) return sent(1, t);
  if (t < SENDS[2]) {
    s.mode = 'compose';
    s.focus = true;
    s.attachment = 1;
    s.attachmentStart = resetEnd(1);
    s.input = type(TEXT.reverse, t, resetEnd(1), word(134).s + 0.12);
    return s;
  }
  return sent(2, t);
};

const sent = (index: number, t: number): SceneState => {
  const s = home();
  s.mode = 'sent';
  s.sent = [TEXT.apple, TEXT.cine, TEXT.reverse][index];
  s.sendAt = SENDS[index];
  s.replyAt = index === 2 ? CUES.finalReply : s.sendAt + (index === 1 ? 5 : 8) / FPS;
  s.reply = t >= s.replyAt ? [TEXT.appleReply, TEXT.cineReply, TEXT.finalReply][index] : '';
  s.thinking = index === 2 && t >= s.sendAt + 4 / FPS && t < s.replyAt;
  return s;
};

export const resetAt = (t: number) => {
  const frame = Math.round(t * FPS);
  const index = RESETS.findIndex((start) => frame >= Math.round(start * FPS) && frame < Math.round(start * FPS) + RESET_FRAMES);
  if (index < 0) return null;
  const elapsed = frame - Math.round(RESETS[index] * FPS);
  const direction = elapsed < 6 ? 'out' as const : 'in' as const;
  const progress = clamp(direction === 'out' ? elapsed / 5 : (elapsed - 6) / 5);
  return {index, direction, progress, edge: direction === 'out' ? 1620 - 1320 * progress : 300 + 1320 * progress,
    state: direction === 'out' ? sceneAt(RESETS[index] - 1 / FPS) : home()};
};

export const cellVisibility = (x: number, edge: number, jitter: number, salt: number) => {
  const delta = x + jitter - edge;
  if (delta < -30) return {alpha: 1, pixelated: false};
  if (delta > 30) return {alpha: 0, pixelated: false};
  return salt < 0.55 ? {alpha: 0.6, pixelated: true} : {alpha: delta < 0 ? 1 : 0, pixelated: false};
};
