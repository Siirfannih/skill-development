import React from "react";
import { useCurrentFrame } from "remotion";
import { Abs, C, Cam, MB, Rise, SANS, eIn, eIO, eOut, k, rnd, shake, wf, Vignette } from "./lib";
import { ClaudeApp, RMsg } from "./RealUI";
import { CapLabel, Person, Sparkle } from "./Figures";
import { DESIGNS, Fit, GenericAI, Reel } from "./Designs";

// S3 — hitam (fokus): "Faktanya, kita takut digantikan" → AI. slam.
//      putih (transformasi): "Tapi di satu sisi, kita menyerahkan semua yang enggan kita kerjakan."
//      empat sesi Claude terpisah (1 kegiatan = 1 sesi) → hasil nyata datang bersamaan (reel, caption, CV, rencana bisnis).
//      hasil + "cukup." berdampingan → kartu beragam memampat jadi sama.
export const S3_START = () => wf("c04", "Faktanya") - 1;
export const S3_END = () => wf("c06", "Ira") + 1;

const REQ = [
  { key: "Edit", nth: 1, short: "Edit video", title: "Edit footage konser", prompt: "Edit jadi reels 30 detik. Ambil momen terbaik, tambahkan subtitle.", chip: { name: "footage_konser.mp4", meta: "Video · 2:41", thumb: "p_concert.jpg" } },
  { key: "Menulis", nth: 1, short: "Menulis", title: "Caption launching kedai", prompt: "Tulis 3 opsi caption untuk launching kedai kopiku. Nadanya hangat.", chip: undefined },
  { key: "Mencari", nth: 1, short: "Mencari kerja", title: "CV Product Designer", prompt: "Rapikan CV-ku untuk posisi Product Designer di lowongan ini.", chip: { name: "CV_lama.pdf", meta: "PDF · 2 halaman" } },
  { key: "Mencari", nth: 2, short: "Mencari uang", title: "Ide bisnis modal 7 juta", prompt: "Modalku 7 juta. Bisnis apa yang bisa mulai jalan bulan ini?", chip: undefined },
];

export const S3: React.FC = () => {
  const f = useCurrentFrame();
  const fFak = wf("c04", "Faktanya");
  const fKita = wf("c04", "kita");
  const fTakut = wf("c04", "takut");
  const fDig = wf("c04", "digantikan");
  const fAI = wf("c04", "AI");
  const fTapi = wf("c04", "Tapi");
  const fDi = wf("c04", "di", 2);
  const fSatu = wf("c04", "satu");
  const fSisi = wf("c04", "sisi");
  const fKita2 = wf("c04", "kita", 2);
  const fMeny = wf("c04", "menyerahkan");
  const fSemua = wf("c04", "semua");
  const fYang = wf("c04", "yang");
  const fEnggan = wf("c04", "enggan");
  const fKita3 = wf("c04", "kita", 3);
  const fKerj = wf("c04", "kerjakan");
  const fHasil = wf("c05", "Hasilnya");
  // fJadi no longer needed (v15)
  const fDetik = wf("c05", "detik");
  const fCukup = wf("c05", "cukup");
  const fPerl = wf("c05", "perlahan");
  const fMulai = wf("c05", "mulai");
  const fSama = wf("c05", "sama");
  const fEnd = S3_END();
  const reqAt = REQ.map((r) => wf("c04", r.key, r.nth));

  // ---------- A: black focus — the fear, drawn as people (Irfan 16:40, neuronvisuals style), not a word on screen.
  // "kita" = a person in their circle; "takut" = they flinch; "digantikan AI" = an AI spark becomes a copy of them
  // that takes the centre and pushes them out of their own circle.
  if (f < fTapi) {
    const ring = k(f, [fFak - 2, fFak + 12], [0, 1], eOut);
    const fear = k(f, [fTakut - 2, fTakut + 6], [0, 1], eOut);
    const tremble = fear * (1 - k(f, [fAI, fAI + 10], [0, 1])) * Math.sin(f * 2.3) * 3.5;
    const spark = k(f, [fDig - 2, fDig + 6], [0, 1], eOut);
    const morph = k(f, [fDig + 6, fAI - 1], [0, 1], eIO);
    const take = k(f, [fAI - 3, fAI + 5], [0, 1], (t) => 1 - Math.pow(1 - t, 3));
    const [shx, shy] = shake(f, fAI + 1, 14, 7);
    const push = 1 + 0.08 * k(f, [fFak, fTapi], [0, 1], eIO);
    const R = 340;
    const meX = 960 - 600 * take; // the person gets pushed out of the circle
    const aiX = 1560 + (960 - 1560) * Math.max(morph * 0.35, take);
    return (
      <Cam bg={C.black} x={shx} y={shy} s={push}>
        <Vignette dark />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1.4px, transparent 1.8px)", backgroundSize: "36px 36px" }} />
        {/* comfort circle */}
        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
          <circle cx={960} cy={500} r={R * ring} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth={2} strokeDasharray="6 8" style={{ rotate: `${f * 0.4}deg`, transformOrigin: "960px 500px" }} />
          <circle cx={960} cy={500} r={R * 0.48 * ring} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth={1.5} strokeDasharray="3 6" />
        </svg>
        {/* us */}
        <Abs style={{ left: meX - 60 + tremble, top: 500 - 140, opacity: ring * (1 - 0.6 * take) }}>
          <Person s={2} pose={fear > 0.5 ? "fear" : "stand"} dashed={take > 0.6} />
        </Abs>
        <Abs style={{ left: meX, top: 690, translate: "-50% 0", opacity: k(f, [fKita, fKita + 6], [0, 1]) * (1 - 0.5 * take) }}>
          <CapLabel size={34}>Kita</CapLabel>
        </Abs>
        {/* Irfan 16:44: AI is drawn as AI tools, not as a human. One spark splits into the three assistants we
            actually use (app tiles), they close in and take the centre of our circle. */}
        {spark > 0 &&
          ["ChatGPT", "Claude", "Gemini"].map((name, i) => {
            const a0 = (i / 3) * Math.PI * 2 - Math.PI / 2;
            const split = k(f, [fDig + 4, fDig + 14], [0, 1], eOut);
            const cx = aiX + Math.cos(a0) * 150 * split * (1 - take * 0.12);
            const cy = 500 + Math.sin(a0) * 150 * split * (1 - take * 0.12);
            return (
              <Abs key={name} style={{ left: cx, top: cy, translate: "-50% -50%", opacity: spark, scale: String(0.6 + 0.4 * spark) }}>
                <div style={{ width: 120, height: 120, borderRadius: 30, background: "linear-gradient(160deg, rgba(255,255,255,0.22), rgba(255,255,255,0.06))", boxShadow: `0 0 0 1.5px rgba(255,255,255,0.45), 0 0 ${20 + 30 * take}px rgba(255,255,255,${0.15 + 0.25 * take})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ rotate: `${f * 2 + i * 40}deg` }}>
                    <Sparkle r={34} />
                  </div>
                </div>
                <div style={{ position: "absolute", left: 60, top: 132, translate: "-50% 0", opacity: split }}>
                  <CapLabel size={22}>{name}</CapLabel>
                </div>
              </Abs>
            );
          })}
        {take > 0 && (
          <Abs style={{ left: 960, top: 760, translate: "-50% 0", opacity: take, scale: String(k(f, [fAI, fAI + 6], [1.6, 1], eOut)) }}>
            <CapLabel size={64}>AI</CapLabel>
          </Abs>
        )}
      </Cam>
    );
  }

  // ---------- B: white transformation — what we hand over.
  // v13 (self-review vs Baikov "Shapes" ref 0:00–0:02): the sentence is built word by word on one line, each word lands in
  // colour and settles to ink, the camera rides the line to the right, small thumbnails of the very tasks we hand over sit
  // between the words, then a snap zoom-out reveals the whole line before we cut into the first Claude session.
  const fChat = reqAt[0] - 14;
  if (f < fChat) {
    const fKepada = wf("c04", "kepadanya");
    const SZ = 150;
    type Tok = { t?: string; at: number; accent?: boolean; thumb?: string; dim?: boolean };
    const toks: Tok[] = [
      { t: "Tapi", at: fTapi, dim: true },
      { t: "di", at: fDi, dim: true },
      { t: "satu", at: fSatu, dim: true },
      { t: "sisi,", at: fSisi, dim: true },
      { t: "kita", at: fKita2 },
      { t: "menyerahkan", at: fMeny },
      { t: "semua", at: fSemua },
      { thumb: "reel", at: fSemua + 4 },
      { thumb: "caption", at: fSemua + 7 },
      { thumb: "cv", at: fSemua + 10 },
      { thumb: "plan", at: fSemua + 13 },
      { t: "yang", at: fYang },
      { t: "enggan", at: fEnggan, accent: true },
      { t: "kita", at: fKita3 },
      { t: "kerjakan", at: fKerj },
      { t: "kepadanya.", at: fKepada },
    ];
    const GAP = 44;
    const TH = { w: 190, h: 150 };
    // estimated advance (Geist 600, -0.045em); words are laid out by flex so they never overlap, the estimate only
    // steers the camera and the zoom-out fit
    const widths = toks.map((tk) => (tk.thumb ? TH.w : tk.t!.length * SZ * 0.52));
    const xs: number[] = [];
    let acc = 0;
    widths.forEach((w) => {
      xs.push(acc);
      acc += w + GAP;
    });
    const total = acc - GAP;
    const cur = toks.reduce((c, tk, i) => (f >= tk.at - 2 ? i : c), 0);
    const focusAt = (ff: number) => {
      const ci = toks.reduce((c, tk, i) => (ff >= tk.at - 2 ? i : c), 0);
      const prev = Math.max(0, ci - 1);
      const t = k(ff, [toks[ci].at - 2, toks[ci].at + 6], [0, 1], eOut);
      return xs[prev] + widths[prev] / 2 + (xs[ci] + widths[ci] / 2 - xs[prev] - widths[prev] / 2) * t;
    };
    const outT = k(f, [fKepada + 10, fKepada + 22], [0, 1], (t) => 1 - Math.pow(1 - t, 3));
    const sFit = 1640 / (total * 1.08);
    const sc = 1 + (sFit - 1) * outT;
    const fxW = focusAt(f) * (1 - outT) + (total / 2) * outT;
    const fxP = focusAt(f - 1) * (1 - outT) + (total / 2) * outT;
    const leave = k(f, [fChat - 6, fChat], [0, 1], eIn);
    const worldX = 960 - fxW * sc;
    const vx = (fxP - fxW) * sc;
    return (
      <Cam bg={C.white} y={-1100 * leave}>
        <MB id="s3line" vx={vx} vy={-1100 * (leave - k(f - 1, [fChat - 6, fChat], [0, 1], eIn))} max={4}>
          <div style={{ position: "absolute", left: worldX, top: 540, height: 0, scale: String(sc), transformOrigin: "0 0", display: "flex", alignItems: "center", gap: GAP, whiteSpace: "nowrap" }}>
            {toks.map((tk, i) => {
              const p = k(f, [tk.at - 2, tk.at + 6], [0, 1], eOut);
              const settle = k(f, [tk.at + 4, tk.at + 12], [0, 1], eIO);
              if (tk.thumb) {
                const D = DESIGNS.find((d) => d.id === tk.thumb)!;
                return (
                  <div key={i} style={{ flexShrink: 0, opacity: p, scale: String(0.6 + 0.4 * p), rotate: `${(i % 2 ? 3 : -3) * (1 - settle)}deg` }}>
                    <Fit w={TH.w} h={TH.h} nw={D.nw} nh={D.nh} radius={18} shadow>
                      <D.C />
                    </Fit>
                  </div>
                );
              }
              const inkFinal = tk.accent ? C.blue : C.ink;
              return (
                <div key={i} data-text={f >= tk.at - 2 ? tk.t : undefined} style={{ flexShrink: 0, fontFamily: SANS, fontWeight: tk.dim ? 400 : 600, fontSize: SZ, letterSpacing: "-0.045em", lineHeight: 1.1, whiteSpace: "nowrap", color: settle < 1 && !tk.accent ? mixHex("#2563EB", "#0A0A0A", settle) : inkFinal, opacity: p, translate: `0 ${(1 - p) * 40}px`, filter: p < 1 ? `blur(${(1 - p) * 4}px)` : undefined }}>
                  {tk.t}
                </div>
              );
            })}
          </div>
        </MB>
        {void cur}
      </Cam>
    );
  }

  // ---------- C: Apple-style task list (left) + the real Claude UI (right).
  // Irfan 14:45: one task = one fresh session (new chat, real attachment, realistic prompt). No literal "3 seconds":
  // the work is not shown finishing here; results arrive together on "Hasilnya…".
  const fRes = fHasil - 4;
  if (f < fRes) {
    const start = reqAt.map((a) => a - 14);
    const cur = start.reduce((acc, a, i) => (f >= a ? i : acc), 0);
    const r = REQ[cur];
    const s0 = start[cur];
    const sendAt = s0 + 21;
    const msgs: RMsg[] = [
      { role: "user", text: r.prompt, at: sendAt, file: r.chip },
      { role: "ai", text: "", at: sendAt + 3, think: 999 },
    ];
    const enter = k(f, [fChat, fChat + 12], [0, 1], eOut);
    const punch = k(f, [s0, s0 + 8], [1.03, 1], eOut);
    // v10/v11: push into the composer while typing; after send, settle on the sent bubble (never cut its top)
    const zf = k(f, [s0 + 2, s0 + 9], [0, 1], eIO);
    const zp = f >= sendAt + 1 ? 1 : 0; // hard cut to the sent bubble
    const camZ = (1 + 0.03 * k(f, [fChat, fRes], [0, 1], eIO)) * punch * (1 + 0.5 * zf * (1 - zp) + 0.18 * zp);
    const tgx = 960 + (1369 - 960) * zf * (1 - zp) + (1430 - 960) * zp;
    const tgy = 540 + (495 - 540) * zf * (1 - zp) + (300 - 540) * zp;
    const listSoft = Math.max(zf * (1 - zp), zp);
    return (
      <Cam bg={C.white} s={camZ} x={(960 - tgx) * camZ} y={(540 - tgy) * camZ}>
        <Abs style={{ left: 90, top: 540, translate: "0 -50%", display: "flex", flexDirection: "column", gap: 6, filter: `blur(${4 * listSoft}px)`, opacity: 1 - 0.4 * listSoft }}>
          {REQ.map((q, i) => {
            const on = i === cur;
            const seen = f >= start[i];
            const p = k(f, [start[i], start[i] + 8], [0, 1], eOut);
            return (
              <div key={i} data-text={seen ? q.short : undefined} style={{ display: "flex", alignItems: "center", gap: 22, fontFamily: SANS, fontWeight: 600, fontSize: 70, letterSpacing: "-0.04em", lineHeight: 1.15, color: on ? C.ink : C.g3, opacity: seen ? 1 : 0, translate: `${(1 - p) * -40}px 0` }}>
                <span style={{ width: 20, height: 20, borderRadius: 10, background: C.blue, opacity: on ? 1 : 0, scale: String(on ? k(f, [start[i], start[i] + 6], [0, 1], eOut) : 0) }} />
                {q.short}
              </div>
            );
          })}
        </Abs>
        <Abs style={{ left: 1330, top: 470, translate: `${(1 - enter) * 400}px 0`, opacity: enter }}>
          <div style={{ translate: "-50% -50%", scale: "1.38" }}>
            <ClaudeApp key={cur} f={f} msgs={msgs} typing={{ text: r.prompt, from: s0 + 3, to: s0 + 18, sendAt, file: r.chip, fileAt: s0 + 1 }} w={1000} h={840} fs={21} title={r.title} />
          </div>
        </Abs>
      </Cam>
    );
  }

  // ---------- D: the four real results arrive ("Hasilnya jadi dalam hitungan detik"), gather beside "cukup.", then cards → sama.
  const dive = k(f, [fEnd - 18, fEnd], [0, 1], eIn);
  // Irfan 15:49: once the cards snap into the identical grid, the camera rides along the row, card 1 → last,
  // then dives into the last one. The visual says "sama", no word needed.
  const zIn = k(f, [fMulai + 14, fMulai + 24], [0, 1], eIO);
  const pan = k(f, [fMulai + 20, fEnd - 18], [0, 1], eIO);
  const panX = 520 + 5 * 176 * pan;
  const cardCx = 520 + 5 * 176;
  const cardCy = 295;
  const tx = 960 + (panX - 960) * zIn + (cardCx - panX) * dive;
  const ty = 540 + (410 - 540) * zIn + (cardCy - 410) * dive;
  const camS = (1 + 1.1 * zIn) * (1 + dive * dive * 7);
  const resOut = k(f, [fPerl - 4, fPerl + 8], [0, 1], eIn);
  const g = k(f, [fCukup - 6, fCukup + 8], [0, 1], eIO);
  const arrive = [fHasil - 4, // v15: first result lands on the cut (was ~15 f of blank white)
    wf("c05", "dalam") - 2, wf("c05", "hitungan") - 2, fDetik - 2];
  const RES = [
    { id: "reel", nw: 1080, nh: 1920 },
    { id: "caption", nw: 900, nh: 1100 },
    { id: "cv", nw: 1240, nh: 1754 },
    { id: "plan", nw: 1240, nh: 1754 },
  ];
  // row layout (h 560) → 2×2 grid on the left (h 300)
  const rowH = 560;
  const rowW = RES.map((d) => (rowH * d.nw) / d.nh);
  const rowX: number[] = [];
  let acc = (1920 - (rowW.reduce((a, b) => a + b, 0) + 3 * 34)) / 2;
  rowW.forEach((w) => {
    rowX.push(acc);
    acc += w + 34;
  });
  const gH = 300;
  const gW = RES.map((d) => (gH * d.nw) / d.nh);
  const gX = [520 - (gW[0] + gW[1] + 24) / 2, 520 - (gW[0] + gW[1] + 24) / 2 + gW[0] + 24, 520 - (gW[2] + gW[3] + 24) / 2, 520 - (gW[2] + gW[3] + 24) / 2 + gW[2] + 24];
  const gY = [230, 230, 554, 554];
  return (
    <Cam bg={C.white} x={(960 - tx) * camS} y={(540 - ty) * camS} s={camS * (1 + 0.04 * k(f, [fRes, fCukup - 6], [0, 1], eIO) * (1 - g))}>
      {resOut < 1 &&
        RES.map((d, i) => {
          const D = DESIGNS.find((x) => x.id === d.id)!;
          const p = k(f, [arrive[i], arrive[i] + 12], [0, 1], eOut);
          if (f < arrive[i]) return null;
          const h = rowH + (gH - rowH) * g;
          const w = (h * d.nw) / d.nh;
          const x = rowX[i] + (gX[i] - rowX[i]) * g;
          const y = 540 - rowH / 2 + (gY[i] - (540 - rowH / 2)) * g;
          return (
            <Abs key={d.id} dataSubject style={{ left: x - resOut * 300, top: y + (1 - p) * 120, opacity: p * (1 - resOut), transform: `perspective(1600px) rotateY(${(1 - p) * -24}deg)` }}>
              <Fit w={w} h={h} nw={d.nw} nh={d.nh} radius={18} shadow>
                {d.id === "reel" ? <Reel t={k(f, [arrive[0], fCukup], [0.1, 0.9])} /> : <D.C />}
              </Fit>
            </Abs>
          );
        })}
      {resOut < 1 && f >= fCukup - 2 && (
        <Abs style={{ left: 1000, top: 540, translate: "0 -50%", opacity: 1 - resOut }}>
          <Rise text="cukup." at={fCukup} size={250} weight={300} color={C.ink} letterSpacing="-0.05em" />
        </Abs>
      )}
      {f >= fPerl && <Cards f={f} from={fPerl} conv={fMulai} sama={fSama} dive={dive} />}
    </Cam>
  );
};

const Cards: React.FC<{ f: number; from: number; conv: number; sama: number; dive: number }> = ({ f, from, conv, sama, dive }) => {
  const N = 12;
  return (
    <>
      {Array.from({ length: N }, (_, i) => {
        const at = from + Math.floor(i * 2.4);
        const side = i % 4;
        const sx = side === 0 ? -300 : side === 1 ? 2220 : 200 + rnd(i) * 1500;
        const sy = side === 2 ? -400 : side === 3 ? 1480 : 100 + rnd(i + 2) * 800;
        const vx = 140 + rnd(i + 4) * 1640;
        const vy = 120 + rnd(i + 6) * 760;
        const gx = 960 - 3 * 176 + (i % 6) * 176 + 8;
        const gy = 300 + Math.floor(i / 6) * 230 - 110;
        const pin = k(f, [at, at + 16], [0, 1], eOut);
        const c = k(f, [conv, conv + 22], [0, 1], eIO);
        const x0 = sx + (vx - sx) * pin;
        const y0 = sy + (vy - sy) * pin;
        const x = x0 + (gx - x0) * c;
        const y = y0 + (gy - y0) * c;
        const order = ["landing", "poster", "app", "ig", "deck", "store", "reel", "plan", "cv", "caption", "landing", "poster"];
        const D = DESIGNS.find((x) => x.id === order[i])!;
        const bw = 170 + rnd(i + 8) * 150;
        const bh = Math.min(330, (bw * D.nh) / D.nw);
        const w = bw * (1 - c) + 160 * c;
        const h = bh * (1 - c) + 210 * c;
        const r = (rnd(i + 12) - 0.5) * 24 * (1 - c);
        const isCenter = i === 5;
        return f >= at ? (
          <Abs
            key={i}
            dataSubject
            style={{
              left: x,
              top: y,
              width: w,
              height: h,
              rotate: `${r}deg`,
              scale: String(f >= sama && f < sama + 6 ? 1 + Math.sin(((f - sama) / 6) * Math.PI) * 0.04 : 1),
            }}
          >
            <div style={{ position: "absolute", inset: 0, opacity: 1 - k(c, [0.45, 0.75], [0, 1]) }}>
              <Fit w={w} h={h} nw={D.nw} nh={D.nh} radius={14} shadow>
                <D.C />
              </Fit>
            </div>
            {c > 0.45 && (
              <div style={{ position: "absolute", inset: 0, opacity: k(c, [0.45, 0.75], [0, 1]) }}>
                <Fit w={w} h={h} nw={900} nh={1200} radius={14} shadow>
                  <GenericAI />
                </Fit>
              </div>
            )}
            {isCenter && dive > 0 && <div style={{ position: "absolute", inset: 0, borderRadius: 14, background: C.black, opacity: Math.min(1, dive * 1.6) }} />}
          </Abs>
        ) : null;
      })}
    </>
  );
};



export const _s3 = [eIn, eIO];

const mixHex = (a: string, b: string, t: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * t)).join(",")})`;
};
