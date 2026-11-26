import React, { useId } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { CURVE, move, clamp01, type CurveName } from "../../../toolkit/gerak/curves";
import { Camera25D, Layer25D } from "../../../toolkit/kamera/Camera25D";
import { GridFlashReveal } from "../../../toolkit/transisi";
import { acakIndeks, idAman } from "../../../scripts/remotion/ae-primitives/inti/acak";

const NAMA_KURVA = ["land", "heavy", "whip", "reveal", "leave", "wind", "drift"] as const;

export const WorldStagePropsSchema = z.object({
  /** Semua warna dan huruf datang dari sini; komponen tidak punya gaya bawaan. */
  tokens: z.object({
    latar: z.string(),
    tinta: z.string(),
    tintaRedup: z.string(),
    panelTinta: z.string(),
    panelRedup: z.string(),
    aksen: z.string(),
    sorot: z.string(),
    langit: z.string(),
    cakrawala: z.string(),
    matahari: z.string(),
    bukit: z.array(z.string()).min(2),
    jendela: z.string(),
    panel: z.string(),
    panelKotak: z.string(),
    dock: z.string(),
    ikon: z.array(z.string()).min(1),
    ikonTinta: z.string(),
    huruf: z.string(),
  }),
  seed: z.number(),
  /** Isi jendela utama (satu dunia: ikut digeser kamera bersama semua lapisan). */
  isiJendela: z.custom<React.ReactNode>().optional(),
  /** Adegan sebelum dunia (kartu gelap) yang kabur lalu tersingkap oleh grid. */
  kartu: z.custom<React.ReactNode>().optional(),
  dockItems: z.array(z.string()),
  panelJudul: z.string(),
  panelPesan: z.string(),
  panelBalas: z.string(),
  promptTeks: z.string(),
  pilihanModel: z.string(),
  /** Lintasan kamera: x = lebar frame, y = tinggi frame, skala absolut; t = 0..1 dari durasiGerak. */
  lintasan: z
    .array(z.object({ t: z.number(), x: z.number(), y: z.number(), skala: z.number() }))
    .optional(),
  durasiGerak: z.number().optional(),
  kurva: z.enum(NAMA_KURVA).optional(),
  mulaiKamera: z.number().optional(),
  panelIndeks: z.number().optional(),
  panelTampak: z.number().optional(),
  panelLebar: z.number().optional(),
  jendelaLebar: z.number().optional(),
  jendelaTinggi: z.number().optional(),
  ketikDari: z.number().optional(),
  ketikSampai: z.number().optional(),
  napas: z.number().optional(),
  gridMulai: z.number().optional(),
  gridDurasi: z.number().optional(),
  gridKolom: z.number().optional(),
  kaburKartu: z.number().optional(),
});
export type WorldStageProps = z.infer<typeof WorldStagePropsSchema>;

// Lintasan dari spec: t 0..1 = 2,5 dtk. Titik punch dari pivot kiri-bawah (0,25; 1,0) frame
// yang diterapkan di atas keadaan panel: T = (1 - s/0,91) * pivot, bukan ukuran langsung.
const LINTASAN_SPEC = [
  { t: 0.0, x: 0, y: 0, skala: 1.0 },
  { t: 0.26, x: 0, y: 0, skala: 1.0 },
  { t: 0.5, x: -0.18, y: 0, skala: 0.91 },
  { t: 0.7, x: -0.18, y: 0, skala: 0.91 },
  { t: 0.8, x: -0.32, y: 0.29, skala: 2.1 },
  { t: 1.0, x: -0.32, y: 0.29, skala: 2.2 },
];

const Glif: React.FC<{ i: number; c: string; s: number }> = ({ i, c, s }) => {
  const k = i % 5, g = s * 0.46;
  if (k === 0) return <div style={{ width: g, height: g, borderRadius: "50%", border: `${s * 0.09}px solid ${c}`, boxSizing: "border-box" }} />;
  if (k === 1) return <div style={{ width: g, height: g, background: c, borderRadius: s * 0.08 }} />;
  if (k === 2) return <div style={{ width: g, height: g, background: c, transform: "rotate(45deg) scale(0.85)", borderRadius: s * 0.05 }} />;
  if (k === 3) return (
    <div style={{ display: "flex", gap: s * 0.06, alignItems: "flex-end", height: g }}>
      {[0.5, 1, 0.7].map((h, j) => <div key={j} style={{ width: s * 0.1, height: g * h, background: c, borderRadius: s * 0.03 }} />)}
    </div>
  );
  return <div style={{ width: 0, height: 0, borderTop: `${g / 2}px solid transparent`, borderBottom: `${g / 2}px solid transparent`, borderLeft: `${g * 0.85}px solid ${c}`, marginLeft: g * 0.2 }} />;
};

const JARAK = 1000; // jarak kamera Camera25D (px); push = JARAK * (1 - 1/skala) memberi skala datar

/**
 * Satu dunia datar (wallpaper, jendela, dock, panel samping) digerakkan sebagai satu grup oleh satu kamera 2D virtual:
 * geser memberi ruang bagi panel masuk, lalu punch ke sudut kiri-bawah; masuk lewat blur kartu lama + wipe grid.
 *
 * Pakai bila: ruang kerja UI harus tampil utuh lalu didekati detailnya (prompt, dock) tanpa elemen bergerak sendiri-sendiri.
 * Jangan bila: butuh paralaks/kedalaman antarlapis, atau UI dan latar bernada sama (jendela tidak terpisah dari latar).
 */
export const WorldStage: React.FC<WorldStageProps> = ({
  tokens,
  seed,
  isiJendela,
  kartu,
  dockItems,
  panelJudul,
  panelPesan,
  panelBalas,
  promptTeks,
  pilihanModel,
  lintasan = LINTASAN_SPEC,
  durasiGerak = 3.2,
  kurva = "heavy",
  mulaiKamera,
  panelIndeks = 2,
  panelTampak = 0.4,
  panelLebar = 0.44,
  jendelaLebar = 0.62,
  jendelaTinggi = 0.6,
  ketikDari = 0.42,
  ketikSampai = 0.8,
  napas = 0.0025,
  gridMulai = 4,
  gridDurasi = 7,
  gridKolom = 24,
  kaburKartu = 0.004,
}) => {
  const frame = useCurrentFrame();
  const { fps, width: W, height: H } = useVideoConfig();
  const u = (f: number) => f * H;
  const idLangit = "ws" + idAman(useId());
  const curve = kurva as CurveName;

  const t0 = mulaiKamera ?? gridMulai + 3;
  const frameAt = (t: number) => t0 + Math.round(t * durasiGerak * fps);

  // Kamera: x,y diberikan sebagai pergeseran layar akhir (T = -x*W, -y*H); Layer25D mengalikan dengan k, jadi dibagi k.
  const keys = lintasan.map((p) => {
    const k = p.skala;
    return { at: frameAt(p.t), x: (p.x * W) / k, y: (p.y * H) / k, push: JARAK * (1 - 1 / k), curve };
  });

  // Panel masuk: geser dari luar frame mengikuti jendela waktu dan kurva yang sama dengan kamera.
  const iP = Math.min(Math.max(1, panelIndeks), lintasan.length - 1);
  const pa = frameAt(lintasan[iP - 1].t), pb = frameAt(lintasan[iP].t);
  const pp = move(frame, pa, Math.max(1, pb - pa), curve);

  // Posisi dunia: tepi kanan panel jatuh di panelTampak lebar frame pada keadaan panel.
  const sP = lintasan[iP].skala, xP = lintasan[iP].x;
  const panelKananRel = ((panelTampak - 0.5) - -xP) / sP; // fraksi lebar relatif pusat
  const panelKanan = W * (0.5 + panelKananRel);
  const pw = W * panelLebar;
  const panelKiri = panelKanan - pw;
  const geserPanel = (1 - pp) * (panelKanan + W * 0.03);

  // Ketik prompt
  const kA = frameAt(ketikDari), kB = frameAt(ketikSampai);
  const huruf = Math.floor(interpolate(frame, [kA, Math.max(kA + 1, kB)], [0, promptTeks.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const teksKetik = promptTeks.slice(0, huruf);
  const kursor = Math.floor(frame / Math.max(1, Math.round(fps / 2))) % 2 === 0;

  // Kartu lama kabur dahulu sebelum grid menyapu
  const kabur = u(kaburKartu) * CURVE.reveal(clamp01((frame - gridMulai * 0.5) / Math.max(1, gridMulai * 0.5)));

  // Wallpaper: zona tegas langit -> cakrawala, matahari terbenam di balik punggungan berlapis
  const WW = W * 1.8, HH = H * 1.8, ox = W * 0.4, oy = H * 0.4;
  const horizon = H * 0.62 + oy;
  const punggung = (lapis: number, dasar: number, amp: number) => {
    const n = 20, pts: string[] = [];
    const nilai = (i: number) => acakIndeks(seed + lapis * 13, i);
    for (let i = 0; i <= n; i++) {
      const sm = (nilai(i - 1) + nilai(i) * 2 + nilai(i + 1)) / 4;
      pts.push(`${((i / n) * WW).toFixed(1)},${(dasar + oy - amp * (sm - 0.4)).toFixed(1)}`);
    }
    return `M0,${HH} L${pts.join(" L")} L${WW},${HH} Z`;
  };
  const lapisBukit = [
    { dasar: H * 0.62, amp: H * 0.16 },
    { dasar: H * 0.72, amp: H * 0.14 },
    { dasar: H * 0.84, amp: H * 0.1 },
  ];

  // Dock
  const ub = u(0.07), jr = u(0.012);
  const dockW = dockItems.length * ub + (dockItems.length + 1) * jr;
  const dockH = u(0.09);

  const jw = W * jendelaLebar, jh = H * jendelaTinggi;
  const font = tokens.huruf;

  const dunia = (
    <Camera25D
      keys={keys}
      drift={{ amp: u(napas), seed }}
      distance={JARAK}
      background={tokens.latar}
    >
      <Layer25D z={0}>
        {/* wallpaper */}
        <svg width={WW} height={HH} viewBox={`0 0 ${WW} ${HH}`} style={{ position: "absolute", left: -ox, top: -oy }}>
          <defs>
            <linearGradient id={idLangit} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={tokens.langit} />
              <stop offset="0.55" stopColor={tokens.langit} />
              <stop offset="1" stopColor={tokens.cakrawala} />
            </linearGradient>
          </defs>
          <rect x={0} y={0} width={WW} height={horizon + H * 0.02} fill={`url(#${idLangit})`} />
          <circle cx={W * 0.86 + ox} cy={horizon - H * 0.01} r={u(0.1)} fill={tokens.matahari} />
          {lapisBukit.map((l, i) => (
            <path key={i} d={punggung(i + 1, l.dasar, l.amp)} fill={tokens.bukit[i % tokens.bukit.length]} />
          ))}
        </svg>

        {/* jendela utama */}
        <div
          style={{
            position: "absolute",
            left: (W - jw) / 2,
            top: H * 0.14,
            width: jw,
            height: jh,
            background: tokens.jendela,
            borderRadius: u(0.012),
            overflow: "hidden",
            boxShadow: `0 ${u(0.02)}px ${u(0.07)}px ${tokens.latar}`,
            fontFamily: font,
          }}
        >
          {isiJendela}
        </div>

        {/* dock */}
        <div
          style={{
            position: "absolute",
            left: (W - dockW) / 2,
            top: H - u(0.02) - dockH,
            width: dockW,
            height: dockH,
            background: tokens.dock,
            borderRadius: u(0.022),
            display: "flex",
            alignItems: "center",
            gap: jr,
            paddingLeft: jr,
            boxSizing: "border-box",
          }}
        >
          {dockItems.map((d, i) => (
            <div
              key={i}
              style={{
                width: ub,
                height: ub,
                borderRadius: u(0.016),
                background: tokens.ikon[i % tokens.ikon.length],
                color: tokens.ikonTinta,
                fontFamily: font,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Glif i={i} c={tokens.ikonTinta} s={ub} />
            </div>
          ))}
        </div>

        {/* panel samping: masuk dari kiri, dunia yang sama */}
        <div
          style={{
            position: "absolute",
            left: panelKiri - geserPanel,
            top: -H * 0.1,
            width: pw,
            height: H * 1.25,
            background: tokens.panel,
            fontFamily: font,
            color: tokens.panelTinta,
          }}
        >
          <div style={{ position: "absolute", left: pw * 0.08, top: H * 0.1, fontSize: u(0.034), fontWeight: 700, color: tokens.panelTinta }}>{panelJudul}</div>
          <div style={{ position: "absolute", left: pw * 0.08, right: pw * 0.08, top: H * 0.17, height: u(0.003), background: tokens.panelKotak }} />
          <div
            style={{
              position: "absolute",
              right: pw * 0.08,
              top: H * 0.21,
              width: pw * 0.62,
              background: tokens.panelKotak,
              color: tokens.panelTinta,
              borderRadius: u(0.02),
              padding: `${u(0.016)}px ${u(0.022)}px`,
              fontSize: u(0.03),
              lineHeight: 1.3,
            }}
          >
            {panelBalas}
          </div>
          <div
            style={{
              position: "absolute",
              left: pw * 0.08,
              top: H * 0.34,
              width: pw * 0.8,
              borderLeft: `${u(0.005)}px solid ${tokens.aksen}`,
              paddingLeft: u(0.02),
              fontSize: u(0.03),
              lineHeight: 1.35,
              color: tokens.panelRedup,
            }}
          >
            {panelPesan}
          </div>
          <div
            style={{
              position: "absolute",
              right: pw * 0.07,
              top: H * 0.58,
              width: pw * 0.86,
              height: H * 0.28,
              background: tokens.panelKotak,
              borderRadius: u(0.02),
              boxSizing: "border-box",
              padding: `${u(0.018)}px ${u(0.022)}px`,
            }}
          >
            <div style={{ fontSize: u(0.034), lineHeight: 1.25, color: tokens.panelTinta, minHeight: u(0.17) }}>
              {teksKetik}
              <span
                style={{
                  display: "inline-block",
                  width: u(0.004),
                  height: u(0.034),
                  marginLeft: u(0.004),
                  verticalAlign: "middle",
                  background: kursor ? tokens.aksen : tokens.panelKotak,
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: u(0.022),
                right: u(0.018),
                bottom: u(0.012),
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: u(0.026),
                color: tokens.panelRedup,
              }}
            >
              <span>{pilihanModel}</span>
              <span
                style={{
                  width: u(0.048),
                  height: u(0.048),
                  borderRadius: u(0.012),
                  background: tokens.aksen,
                  color: tokens.ikonTinta,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: u(0.03),
                  fontWeight: 700,
                }}
              >
                ↑
              </span>
            </div>
          </div>
        </div>
      </Layer25D>
    </Camera25D>
  );

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: tokens.latar }}>
      {kartu ? (
        <div style={{ position: "absolute", inset: 0, filter: kabur > 0.05 ? `blur(${kabur.toFixed(2)}px)` : "none" }}>{kartu}</div>
      ) : null}
      <GridFlashReveal
        from={gridMulai}
        durationInFrames={gridDurasi}
        cols={gridKolom}
        pattern="sweep"
        edge="left"
        seed={seed}
        flashColor={tokens.sorot}
        flashGap={0}
      >
        {dunia}
      </GridFlashReveal>
    </div>
  );
};
