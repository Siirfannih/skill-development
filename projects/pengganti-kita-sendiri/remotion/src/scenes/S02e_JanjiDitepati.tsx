// 02e–02f · «Sebagian janji itu memang ditepati … Kita bekerja jauh lebih cepat … Tapi di satu sisi, kita juga tidak berhenti di tahap ini» (v9 F3).
// Grafik kurva DIBUANG. Konsep daftar centang, kontinu dengan 02c (kartu tugas yang sama), latar hitam = fokus:
//  1) f956–1033  kartu Input data pesanan / Invoice Oktober.pdf / Rekap penjualan.xlsx; kursor agent AI mencentang ✓ satu per satu (snap 3 f, ease-out ekstrem),
//     kamera close-up mengikuti kursor; centang ke-3 = f1010 = DITEPATI: kamera patah ke wide, anchor di samping daftar yang tuntas.
//  2) f1037–1100 «Kita bekerja jauh lebih cepat»: daftar surut (DOF), bar waktu «8 jam» whip-compress jadi «45 menit» di «lebih cepat» (f1074→1081),
//     low_whoosh di puncak kecepatan, sub_impact saat mendarat; kamera whip mengikuti ujung bar.
//  3) f1104–1229 «Tapi … tidak berhenti di tahap ini»: daftar bergulir, tugas manusiawi Menulis / Berpikir / Memutuskan ikut dicentang AI (close-up kursor),
//     «tidak» = kamera patah ke wide (daftar panjang terus terisi), v10: TIDAK f1169 + BERHENTI f1176 di kanan daftar.
// Semua fungsi murni terhadap frame absolut (fa) supaya posisi kamera/kursor dapat dipakai untuk pan SFX.
import React from "react";
import { AbsoluteFill } from "remotion";
import { EZ, panOf, prog, Scene, sfxMark, useT, Grain } from "../lib/anim";
import { FPS, panel, word } from "../lib/time";
import { AnchorWord } from "../lib/AnchorWord";
import { BLOOM_PT } from "./_b2_shared";
import { moveFrame } from "./_b5_shared";
import { CARD, TaskCard, type TaskIcon } from "./parts/TaskCard";
import { SkyBackdrop } from "./parts/SkyBackdrop";
import { CalendarDay, CAL, CAL_EVENTS, blockCenter } from "./parts/CalendarDay";

const W_TIDAK = word("tidak", "s2", 1);

// ── tata letak dunia (1920×1080 di Z=1). Daftar di kiri, ruang kanan untuk anchor.
const CX = 200, TOP0 = 300, PITCH = 180;
const topOf = (i: number) => TOP0 + PITCH * i;
const BOX_X = CX + CARD.w - 64; // pusat kotak centang
const ITEMS: { name: string; icon: TaskIcon }[] = [
  { name: "Input data pesanan", icon: "db" },
  { name: "Invoice Oktober.pdf", icon: "doc" },
  { name: "Rekap penjualan.xlsx", icon: "grid" },
  { name: "Menulis", icon: "pen" },
  { name: "Berpikir", icon: "bulb" },
  { name: "Memutuskan", icon: "scale" },
  { name: "Bernegosiasi", icon: "chat" },
  { name: "Merancang", icon: "compass" },
  { name: "Memimpin", icon: "users" },
];
/** frame absolut centang per kartu */
const TAPS = [972, 991, 1010, 1119, 1138, 1157, 1176, 1182, 1188];
/** frame kartu mulai muncul (3 kartu pertama sudah ada) */
const APPEAR = [-1e9, -1e9, -1e9, 1104, 1112, 1130, 1146, 1152, 1158];
const tapOf = (i: number) => TAPS[i];

// ── jadwal
const F_START = 956, F_PUNCH = 1010, F_BAR_IN = 1037, F_COMP0 = 1074, F_LAND = 1081, F_BAR_OUT = 1100, F_BACK = 1104;
const F_TIDAK = Math.round(W_TIDAK.s * FPS); // 1169

// ── OBJ «Kalender hari kerja» · blok jadwal muncul satu per satu (frame absolut), lalu memampat di «lebih cepat»
/** frame muncul blok: Input data pesanan · Invoice Oktober · Rekap penjualan */
const CAL_APPEAR = [1040, 1051, 1062];
/** kamera kalender (koordinat lokal kalender): fokus ke blok yang sedang muncul → overview → ikut blok termampat */
const calCamAt = (fa: number): Cam => {
  const focus = (i: number, k = 0): Cam => { const b = blockCenter(i, k); return { cx: b.x, cy: b.y, Z: 2.0 }; };
  const overview: Cam = { cx: CAL.w / 2, cy: CAL.h / 2, Z: 1.34 };
  const top: Cam = { cx: 345, cy: blockCenter(1, 1).y + 40, Z: 3.0 };
  let c = focus(0);
  c = mixCam(c, focus(1), e(fa, CAL_APPEAR[1] - 3, CAL_APPEAR[1] + 4, EZ.inOut));
  c = mixCam(c, focus(2), e(fa, CAL_APPEAR[2] - 3, CAL_APPEAR[2] + 4, EZ.inOut));
  c = mixCam(c, overview, e(fa, 1066, F_COMP0, EZ.inOut));
  c = mixCam(c, top, e(fa, F_COMP0, F_LAND + 4, EZ.out));
  c = mixCam(c, overview, e(fa, 1088, F_BAR_OUT, EZ.inOut)); // tarik mundur: sisa hari 10.00–17.00 kosong
  return c;
};


const e = (fa: number, a: number, b: number, ez = EZ.out) => prog(fa / FPS, a / FPS, b / FPS, ez);
const mix = (a: number, b: number, k: number) => a + (b - a) * k;
type Cam = { cx: number; cy: number; Z: number };
const mixCam = (a: Cam, b: Cam, k: number): Cam => ({ cx: mix(a.cx, b.cx, k), cy: mix(a.cy, b.cy, k), Z: Math.exp(mix(Math.log(a.Z), Math.log(b.Z), k)) });

// ── kursor AI: titik singgah (frame tiba, posisi ujung panah). Berpindah ease-out ekstrem dalam ≤14 f sebelum tiba.
const WP: { f: number; x: number; y: number }[] = [
  { f: F_START, x: 1040, y: 200 },
  ...[0, 1, 2].map((i) => ({ f: tapOf(i), x: BOX_X, y: topOf(i) + 76 })),
  { f: 1030, x: 960, y: 700 }, // parkir selama bar waktu
  ...[3, 4, 5, 6, 7, 8].map((i) => ({ f: tapOf(i), x: BOX_X, y: topOf(i) + 76 })),
];
const cursorAt = (fa: number) => {
  let from = WP[0];
  for (let i = 1; i < WP.length; i++) {
    const to = WP[i];
    const s = Math.max(from.f + 3, to.f - 14), en = to.f - 1;
    if (fa < s) return { x: from.x, y: from.y };
    if (fa <= en) {
      const u = EZ.out((fa - s) / Math.max(1, en - s));
      const dx = to.x - from.x, dy = to.y - from.y, len = Math.hypot(dx, dy) || 1;
      const bend = Math.min(60, len * 0.12);
      const mx = (from.x + to.x) / 2 + (-dy / len) * bend, my = (from.y + to.y) / 2 + (dx / len) * bend;
      const v = 1 - u;
      return { x: v * v * from.x + 2 * v * u * mx + u * u * to.x, y: v * v * from.y + 2 * v * u * my + u * u * to.y };
    }
    from = to;
  }
  return { x: from.x, y: from.y };
};

// ── kamera (pusat dunia di tengah layar + zoom), semua murni terhadap frame absolut
const camAt = (fa: number): Cam => {
  const cur = cursorAt(fa - 3);
  const p1: Cam = { cx: 700 + (cur.x - BOX_X) * 0.4, cy: cur.y * 0.9 + 556 * 0.1, Z: mix(1.46, 1.56, e(fa, F_START, F_PUNCH, EZ.inOut)) };
  const wide: Cam = { cx: 880, cy: 540, Z: 1 + 0.04 * e(fa, 1014, 1036, EZ.inOut) };
  const p2: Cam = { cx: 1000, cy: 540, Z: 1 + 0.05 * e(fa, 1042, F_COMP0, EZ.inOut) };
  const p2b: Cam = { cx: 640, cy: 540, Z: 1.3 + 0.04 * e(fa, 1086, F_BAR_OUT + 2, EZ.out) };
  const p3: Cam = { cx: 700 + (cur.x - BOX_X) * 0.4, cy: cur.y, Z: 1.3 };
  // v10 (#19): daftar terbaca (Z ≈ 0,95 → teks ±34 px), 5–6 baris terakhir saja, sisanya keluar frame atas; daftar di kiri, ruang kanan untuk TIDAK BERHENTI
  const wide2: Cam = { cx: CX + CARD.w / 2, cy: mix(1440, 1500, e(fa, F_TIDAK + 6, 1229, EZ.inOut)), Z: mix(0.95, 0.98, e(fa, F_TIDAK + 6, 1229, EZ.inOut)) };
  let c = p1;
  c = mixCam(c, wide, e(fa, F_PUNCH, F_PUNCH + 4));
  c = mixCam(c, p2, e(fa, 1034, 1042, EZ.inOut));
  c = mixCam(c, p2b, e(fa, F_COMP0, 1086));
  c = mixCam(c, p3, e(fa, F_BAR_OUT, F_BACK + 6, EZ.inOut));
  c = mixCam(c, wide2, e(fa, F_TIDAK, F_TIDAK + 6));
  return c;
};

export const S02e_JanjiDitepati: React.FC = () => {
  const t = useT();
  const fa = Math.round(t * FPS);
  const pe = panel("02e");
  const pf = panel("02f");
  // konvensi lib v9: at/until AnchorWord = frame ABSOLUT video
  const atDitepati = F_PUNCH, untilDitepati = 1034;

  const cam = camAt(fa);
  const { cx, cy, Z } = cam;
  // blur gerak kamera: patah ke wide (uniform), whip bar (horizontal), transisi balik
  const bu = 7 * Math.sin(Math.PI * e(fa, F_PUNCH, F_PUNCH + 4)) + 6 * Math.sin(Math.PI * e(fa, F_TIDAK, F_TIDAK + 6)) + 3 * Math.sin(Math.PI * e(fa, F_BAR_OUT, F_BACK + 6));
  const bx = 14 * Math.sin(Math.PI * e(fa, F_COMP0, F_LAND + 2, EZ.inOut));
  // match cut masuk dari bloom 02d: snap zoom keluar dari titik, tanpa flash putih
  const snapIn = 1 - prog(t, pe.start, pe.start + 5 / FPS, EZ.out);

  // daftar surut (DOF) saat bar waktu menjadi fokus
  const dim = e(fa, F_BAR_IN - 1, F_BAR_IN + 5) - e(fa, F_BAR_OUT + 2, F_BACK + 4);
  // v10 (#18): cut bersih, daftar hilang total saat kalender tampil (tanpa kartu blur sebagai lapis hantu)
  const listOp = dim > 0.02 ? 0 : 1, listBlur = 0;

  // kalender hari kerja (macOS Calendar): masuk cut bersih, blok memampat 09.00–17.00 → 09.00–09.45
  const barIn = e(fa, F_BAR_IN, F_BAR_IN + 5);
  const kc = e(fa, F_COMP0, F_LAND, EZ.out);
  const barOut = e(fa, F_BAR_OUT, F_BAR_OUT + 6, EZ.acc);
  const showBar = fa >= F_BAR_IN - 1 && barOut < 1;
  const calBlur = 9 * Math.sin(Math.PI * e(fa, F_COMP0, F_LAND + 2, EZ.inOut));
  const calCam = calCamAt(fa);
  const calCamBlur = 2.5 * Math.sin(Math.PI * e(fa, CAL_APPEAR[1] - 3, CAL_APPEAR[1] + 3)) + 2.5 * Math.sin(Math.PI * e(fa, CAL_APPEAR[2] - 3, CAL_APPEAR[2] + 3));

  // SFXEV · metronom
  sfxMark(t, "riser", pe.start, "02d:bloom:hit"); // X14 bloom 02d memuncak → mengerut ke titik (tetap)
  TAPS.forEach((f, i) => {
    const c = camAt(f);
    sfxMark(t, "ui_tap", f / FPS, `02e:tick:${i}`, panOf((BOX_X - c.cx) * c.Z + 960)); // centang ✓ (pan mengikuti x kotak di layar)
  });
  CAL_APPEAR.forEach((f, i) => sfxMark(t, "glass_ping", f / FPS, `02e:cal:block:${CAL_EVENTS[i].replace(/\s+/g, "_")}`)); // blok jadwal muncul
  sfxMark(t, "low_whoosh", moveFrame(F_COMP0 / FPS), "02e:time:compress"); // puncak kecepatan whip-compress
  sfxMark(t, "sub_impact", F_LAND / FPS, "02e:cal:compressed"); // blok mendarat 09.00–09.45 (≥4 f senyap sesudah whoosh)
  sfxMark(t, "whoosh", W_TIDAK.s, "02f:cam:snapwide"); // C15 patah ke wide di «tidak»

  const cursor = cursorAt(fa);
  const press = TAPS.some((f) => fa >= f && fa < f + 3) ? 0.86 : 1;
  const curScale = Math.min(1.8, Math.max(0.8, 1.1 / Z));
  // dot grid parallax (lapis belakang 2.5D)
  const Zg = 1 + (Z - 1) * 0.4;


  return (
    <Scene start={pe.start} end={pf.end} name="02e–02f Daftar centang">
      <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <filter id="cam02e" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation={`${(bu + bx).toFixed(2)} ${bu.toFixed(2)}`} /></filter>
        </svg>
        <AbsoluteFill style={{ transform: snapIn > 0.002 ? `scale(${1 + 0.6 * snapIn})` : undefined, transformOrigin: `${BLOOM_PT.x}px ${BLOOM_PT.y}px`, filter: snapIn > 0.02 ? `blur(${(10 * snapIn).toFixed(2)}px)` : undefined }}>
          {/* lapis belakang: titik halus, parallax 50 % */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 7000, height: 7000, transform: `translate(${960 - 3500 - (cx - 960) * 0.5 * Zg}px, ${540 - 3500 - (cy - 540) * 0.5 * Zg}px) scale(${Zg})`, transformOrigin: "3500px 3500px", backgroundImage: "radial-gradient(rgba(255,255,255,0.10) 2px, transparent 2.5px)", backgroundSize: "88px 88px" }} />
          <AbsoluteFill style={{ background: "radial-gradient(ellipse 60% 55% at 38% 52%, rgba(255,255,255,0.06), rgba(0,0,0,0) 70%)" }} />
          {/* lapis tengah: dunia di bawah kamera */}
          <AbsoluteFill style={{ transform: `translate(${960 - cx * Z}px, ${540 - cy * Z}px) scale(${Z})`, transformOrigin: "0 0", filter: bu + bx > 0.2 ? "url(#cam02e)" : undefined }}>
            <div style={{ position: "absolute", inset: 0, opacity: listOp, filter: listBlur > 0.1 ? `blur(${listBlur.toFixed(2)}px)` : undefined }}>
              {ITEMS.map((it, i) => {
                const ap = e(fa, APPEAR[i], APPEAR[i] + 5);
                if (ap <= 0) return null;
                const dn = e(fa, tapOf(i), tapOf(i) + 3);
                const ring = fa >= tapOf(i) ? e(fa, tapOf(i), tapOf(i) + 8, EZ.out) : 0;
                return <TaskCard key={i} name={it.name} icon={it.icon} done={dn} ring={ring} style={{ left: CX, top: topOf(i) + (1 - ap) * 40, opacity: Math.min(1, ap * 2) }} />;
              })}
              {/* kursor AI (gaya 02c, dibalik untuk latar hitam) */}
              <div style={{ position: "absolute", left: cursor.x - 6 * curScale, top: cursor.y - 4 * curScale, zIndex: 10, opacity: 1 - dim, transform: `scale(${curScale * press})`, transformOrigin: "6px 4px", display: "flex", alignItems: "flex-start", gap: 4 }}>
                <svg width={44} height={56} viewBox="0 0 22 28" style={{ filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.6))" }}>
                  <path d="M2 2 L2 22 L7.2 17.2 L10.6 25 L14 23.6 L10.7 16 L17.6 16 Z" fill="#fff" stroke="#000" strokeWidth={1.6} strokeLinejoin="round" />
                </svg>
                <span style={{ marginTop: 40, background: "#fff", color: "#1d1d1f", fontFamily: "Inter", fontWeight: 800, fontSize: 24, letterSpacing: 1.4, borderRadius: 999, padding: "4px 16px" }}>AI</span>
              </div>
            </div>
          </AbsoluteFill>
          {/* OBJ «Kalender hari kerja» (ruang layar, cut bersih): penuh frame, blok jadwal muncul satu per satu dengan kamera fokus
              ke blok yang muncul; «lebih cepat» = blok memampat 09.00–09.45 dan kamera ikut naik. TANPA teks «8 jam/45 menit»
              (Irfan 2 Nov 06.48: visual blok sudah kuat). */}
          {showBar && (
            <AbsoluteFill style={{ opacity: (1 - barOut) * Math.min(1, barIn * 1.5), filter: calCamBlur > 0.3 ? `blur(${calCamBlur.toFixed(2)}px)` : undefined }}>
              <SkyBackdrop px={-(calCam.cx - CAL.w / 2) * 0.15 * calCam.Z} py={-(calCam.cy - CAL.h / 2) * 0.15 * calCam.Z} />
              <svg width="0" height="0" style={{ position: "absolute" }}><filter id="cal02e" x="-5%" y="-30%" width="110%" height="160%"><feGaussianBlur stdDeviation={`0 ${calBlur.toFixed(2)}`} /></filter></svg>
              <div style={{ position: "absolute", left: 0, top: 0, width: CAL.w, height: CAL.h, transform: `translate(${960 - calCam.cx * calCam.Z}px, ${540 - calCam.cy * calCam.Z}px) scale(${calCam.Z})`, transformOrigin: "0 0" }}>
                <CalendarDay k={kc} blurY={calBlur} appear={CAL_APPEAR.map((f0) => e(fa, f0, f0 + 7, EZ.out))} style={{ left: 0, top: 0 }} />
              </div>
            </AbsoluteFill>
          )}
        </AbsoluteFill>

        {/* lapis atas: anchor (ruang layar). DITEPATI di samping daftar yang tuntas */}
        <AnchorWord text="DITEPATI" at={atDitepati} until={untilDitepati} x={1030} y={556} size={110} color="#ffffff" align="left" enter="left" />
        {/* «tidak berhenti»: TANPA teks (Irfan 2 Nov 06.48) — daftar panjang yang terus dicentang AI sudah menjadi visualnya */}
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </Scene>
  );
};

export const SCENE = { Component: S02e_JanjiDitepati, covers: ["02e", "02f"] };
