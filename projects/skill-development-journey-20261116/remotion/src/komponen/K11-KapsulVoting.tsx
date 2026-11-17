// K11 · B6 · overlay di atas footage wajah penuh. Area wajah (x 35–65 %, y 15–70 %) dibiarkan kosong:
// hero di atas (y < 15 %), kapsul di kiri/kanan di luar x 35–65 %, pil ajakan di bawah y 70 %.
// Semua prop = frame absolut di linimasa tuan rumah; `mulai` = frame pertama komponen terlihat.
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { dur, drift, exitDur, move } from "../lib/curves";
import { BlurArah, lerp, sb, useHuruf } from "./K11/kit";
import { KilatTeks } from "./K11/KilatTeks";

export type PropsK11 = { mulai: number; k100: number; kProfesional: number; kAI: number; kComment: number };

const C = { panel: "#FFFFFF", garis: "#E4E2DA", tinta: "#1F2328", tinta2: "#6B6F76", biru: "#2E5BFF" };
const SHADOW = (lift: number) => `0 ${14 + 10 * lift}px ${34 + 22 * lift}px rgba(31,35,40,${0.24 + 0.08 * lift}), 0 4px 10px rgba(31,35,40,0.14)`;
const KAP = { w: 590, h: 150, y: 450, tepi: 40 }; // 1,5x; tepi dalam kiri x=630, kanan x=1290, di luar x 35–65 %

const hentak = (f: number, t: number, amp: number) => amp * move(f, t, 5, "whip") * (1 - move(f, t + 6, 26, "heavy"));
const pop = (f: number, t: number, frames: number, jarak = 24) => {
  const m = move(f, t, frames, "land");
  return { m, y: jarak * (1 - m), s: lerp(0.92, 1, m), op: f < t ? 0 : Math.min(1, (f - t) / 3) };
};

const Ikon = {
  Radio: ({ aktif, ring }: { aktif: number; ring: number }) => (
    <svg width={66} height={66} viewBox="0 0 52 52" style={{ flex: "none" }}>
      <circle cx={26} cy={26} r={21} fill="#fff" stroke={ring > 0.5 ? C.biru : C.tinta2} strokeWidth={4} />
      <circle cx={26} cy={26} r={11.5 * aktif} fill={C.biru} />
    </svg>
  ),
  Komentar: () => (
    <svg width={64} height={64} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}>
      <path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4 9 9 0 0 1-3.6-.8L3 21l1.9-5A8.4 8.4 0 1 1 21 11.5z" />
      <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" strokeWidth={3} />
    </svg>
  ),
};

type KapsulProps = { sisi: "kiri" | "kanan"; label: string; t0: number; tPilih: number; tLepas?: number };

const Kapsul: React.FC<KapsulProps> = ({ sisi, label, t0, tPilih, tLepas }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const arah = sisi === "kiri" ? -1 : 1;
  const dM = dur(160, fps, 1);
  const g = (ff: number) => {
    const m = move(ff, t0, dM, "land");
    const hover = move(ff, t0 + 16, 8, "whip") * (tLepas ? 1 - move(ff, tLepas, 8, "whip") : 1);
    // tekan: turun 4 f, lepas 6 f
    const tekan = move(ff, tPilih, 4, "whip") * (1 - move(ff, tPilih + 4, 6, "land"));
    const dot = move(ff, tPilih, 8, "land") * (tLepas ? 1 - move(ff, tLepas, 8, "whip") : 1);
    const push = Math.min(0.03, 0.01 * Math.max(0, ff - t0) / fps); // tumbuh ke arah wajah: dibatasi agar tetap di luar x 35–65 %
    const s = lerp(0.92, 1, m) * (1 + 0.02 * hover) * (1 - 0.035 * tekan) * (1 + push);
    return { x: arah * 160 * (1 - m), y: 24 * (1 - m), s, hover, dot, op: ff < t0 ? 0 : Math.min(1, (ff - t0) / 3) };
  };
  const a = g(f), b = g(f - 1);
  if (a.op <= 0) return null;
  const left = sisi === "kiri" ? KAP.tepi : 1920 - KAP.tepi - KAP.w;
  return (
    <div style={{ position: "absolute", left, top: KAP.y - KAP.h / 2, width: KAP.w, height: KAP.h, opacity: a.op, transformOrigin: sisi === "kiri" ? "left center" : "right center", transform: `translate(${a.x}px, ${a.y}px) scale(${a.s})` }}>
      <BlurArah id={`k11-kap-${sisi}`} dx={sb(a.x - b.x)} dy={sb(a.y - b.y)}>
        <div style={{ width: KAP.w, height: KAP.h, borderRadius: KAP.h / 2, background: C.panel, boxSizing: "border-box", border: `4px solid ${a.hover > 0.5 ? C.biru : C.panel}`, boxShadow: SHADOW(a.hover), display: "flex", alignItems: "center", gap: 30, padding: "0 44px" }}>
          <Ikon.Radio aktif={a.dot} ring={a.hover} />
          <span style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 44, color: C.tinta, whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>{label}</span>
        </div>
      </BlurArah>
    </div>
  );
};

const Hero: React.FC<{ p: PropsK11 }> = ({ p }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tKeluar = p.kProfesional - 12;
  const dK = exitDur(dur(220, fps, 1));
  const g = (ff: number) => {
    const a = pop(ff, p.k100, 16, 40);
    const l = move(ff, tKeluar, dK, "leave");
    const push = Math.min(0.02, 0.006 * Math.max(0, ff - p.k100) / fps);
    return { x: -420 * l, y: a.y, s: a.s * (1 + push + hentak(ff, p.k100 + 2, 0.06)), op: a.op * (1 - l) };
  };
  const a = g(f), b = g(f - 1);
  if (a.op <= 0.001) return null;
  return (
    <div style={{ position: "absolute", left: 115, top: 310, transformOrigin: "left center", opacity: a.op, transform: `translate(${a.x}px, ${a.y}px) scale(${a.s})` }}>
      <BlurArah id="k11-hero" dx={sb(a.x - b.x)} dy={sb(a.y - b.y)}>
        <KilatTeks text={"100% full\npakai AI"} fontSize={132} sapuan={[p.k100 + 8]} />
      </BlurArah>
    </div>
  );
};

const Ajakan: React.FC<{ p: PropsK11 }> = ({ p }) => {
  const f = useCurrentFrame();
  const g = (ff: number) => {
    const a = pop(ff, p.kComment, 16, 48);
    const tekan = move(ff, p.kComment + 22, 4, "whip") * (1 - move(ff, p.kComment + 26, 8, "land"));
    return { ...a, s: a.s * (1 - 0.04 * tekan), tekan };
  };
  const a = g(f), b = g(f - 1);
  const t2 = p.kComment + 18;
  const k = pop(f, t2, 14, 20), kb = pop(f - 1, t2, 14, 20);
  return (
    <>
      {a.op > 0 && (
        <div style={{ position: "absolute", left: 960 - 410, top: 788, width: 820, height: 132, opacity: a.op, transform: `translateY(${a.y}px) scale(${a.s})` }}>
          <BlurArah id="k11-ajakan" dx={0} dy={sb(a.y - b.y)}>
            <div style={{ width: 820, height: 132, borderRadius: 66, background: C.tinta, boxShadow: SHADOW(a.tekan), display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
              <div style={{ transform: `rotate(${-8 * (1 - a.m)}deg) scale(${1 + 0.12 * a.tekan})`, display: "flex" }}><Ikon.Komentar /></div>
              <span style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 60, color: "#fff", whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>Comment di bawah</span>
            </div>
          </BlurArah>
        </div>
      )}
      {k.op > 0 && (
        <div style={{ position: "absolute", left: 960 - 480, top: 940, width: 960, display: "flex", justifyContent: "center", opacity: k.op, transform: `translateY(${k.y}px) scale(${k.s})` }}>
          <BlurArah id="k11-kecil" dx={0} dy={sb(k.y - kb.y)}>
            <div style={{ height: 90, padding: "0 50px", borderRadius: 45, background: "rgba(255,255,255,0.9)", boxShadow: SHADOW(0), display: "flex", alignItems: "center" }}>
              <span style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 46, color: C.tinta, whiteSpace: "nowrap" }}>skill gratis bagi yang beruntung</span>
            </div>
          </BlurArah>
        </div>
      )}
    </>
  );
};

export const K11KapsulVoting: React.FC<PropsK11> = (p) => {
  useHuruf();
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (f < p.mulai) return null;
  const d = drift(f, fps, 3, 4);
  const tA = p.kProfesional + 34, tB = p.kAI + 34;
  return (
    <AbsoluteFill style={{ transform: `translate(${d.x}px, ${d.y}px)` }}>
      <Hero p={p} />
      <Kapsul sisi="kiri" label="profesional?" t0={p.kProfesional} tPilih={tA} tLepas={tB} />
      <Kapsul sisi="kanan" label="masih kerasa AI?" t0={p.kAI} tPilih={tB} />
      <Ajakan p={p} />
    </AbsoluteFill>
  );
};

export const objekK11 = (p: PropsK11): { nama: string; frame: number; peran: string }[] => [
  { nama: "100% full pakai AI", frame: p.k100, peran: "kata-hero" },
  { nama: "kilat cahaya", frame: p.k100 + 8, peran: "sinyal" },
    { nama: "100% full pakai AI", frame: p.kProfesional - 12, peran: "lempar" },
  { nama: "profesional?", frame: p.kProfesional, peran: "objek-mendarat" },
  { nama: "pilih profesional?", frame: p.kProfesional + 34, peran: "sinyal" },
  { nama: "masih kerasa AI?", frame: p.kAI, peran: "objek-mendarat" },
  { nama: "pilih masih kerasa AI?", frame: p.kAI + 34, peran: "sinyal" },
  { nama: "Comment di bawah", frame: p.kComment, peran: "objek-mendarat" },
  { nama: "Comment di bawah ditekan", frame: p.kComment + 22, peran: "sinyal" },
  { nama: "skill gratis bagi yang beruntung", frame: p.kComment + 18, peran: "objek-mendarat" },
];
