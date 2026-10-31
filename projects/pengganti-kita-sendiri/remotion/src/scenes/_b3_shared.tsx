// Komponen bersama Babak 3 «Meniru Diri» (03a-1 … 03e): agent, kursor bernama, ikon UI, piktogram.
import React from "react";
import cues from "../../public/data/cues11.json";

/** Waktu cue SFX di mix (detik absolut) berdasarkan id. */
export const cue = (id: string) => {
  const c = (cues as any[]).find((x) => x.id === id || x.id.startsWith(id));
  if (!c) throw new Error("cue " + id);
  return c.t as number;
};

export type AgentDef = { key: string; name: string; a: string; b: string; label: string; ink: string };
export const AGENTS: AgentDef[] = [
  { key: "ceo", name: "CEO Agent", a: "var(--agent-ceo-a)", b: "var(--agent-ceo-b)", label: "var(--agent-ceo-b)", ink: "#ffffff" },
  { key: "cs", name: "CS Agent", a: "var(--agent-cs-a)", b: "var(--agent-cs-b)", label: "var(--agent-cs-label)", ink: "#ffffff" },
  { key: "ops", name: "Ops Agent", a: "var(--agent-ops-a)", b: "var(--agent-ops-b)", label: "var(--agent-ops-b)", ink: "var(--sb-ink)" },
  { key: "editor", name: "Editor Agent", a: "var(--agent-editor-a)", b: "var(--agent-editor-b)", label: "var(--agent-editor-label)", ink: "var(--sb-ink)" },
];

/** Wajah agent (bentuk hantu: atas bulat, bawah membulat kecil) + dua mata. Blink opsional (0..1). */
export const AgentFace: React.FC<{ agent: AgentDef; size: number; blink?: number; shadow?: boolean; style?: React.CSSProperties }> = ({
  agent, size, blink = 0, shadow = true, style,
}) => (
  <div style={{ position: "relative", width: size, height: size, ...style }}>
    <div
      style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(160deg, ${agent.a} 0%, ${agent.b} ${agent.key === "ceo" ? 70 : 75}%)`,
        borderRadius: `${size / 2}px ${size / 2}px ${size * 0.3}px ${size * 0.3}px`,
        boxShadow: shadow ? `0 ${size * 0.15}px ${size * 0.3}px color-mix(in srgb, var(--electric) 18%, transparent)` : undefined,
      }}
    />
    {[0.3, 0.56].map((l) => (
      <div key={l} style={{ position: "absolute", left: `${l * 100}%`, top: `${38 + blink * 8}%`, width: "16%", height: `${20 * (1 - blink * 0.85)}%`, background: "#fff", borderRadius: 999 }} />
    ))}
  </div>
);

/** Panah kursor (bentuk macOS/Figma), ujung di kiri atas. */
export const Arrow: React.FC<{ size: number; color: string; stroke?: string }> = ({ size, color, stroke = "#ffffff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block", overflow: "visible" }}>
    <path d="M3 2.2 L20.6 9.4 C21.4 9.7 21.3 10.8 20.5 11 L13.2 12.9 L10.6 20.3 C10.3 21.1 9.2 21.1 9 20.3 Z"
      fill={color} stroke={stroke} strokeWidth={1.6} strokeLinejoin="round" />
  </svg>
);

/** Kursor bernama (ruang kerja bersama): panah + pil nama dengan wajah agent kecil. Titik (x,y) = ujung panah. */
export const NamedCursor: React.FC<{ agent: AgentDef; x: number; y: number; scale?: number; opacity?: number; pill?: number }> = ({
  agent, x, y, scale = 1, opacity = 1, pill = 1,
}) => (
  <div style={{ position: "absolute", left: x - 6, top: y - 4, transform: `scale(${scale})`, transformOrigin: "6px 4px", opacity }}>
    <Arrow size={46} color={agent.label} />
    <div
      style={{
        position: "absolute", left: 34, top: 40, display: "flex", alignItems: "center", gap: 10, padding: "8px 22px 8px 10px",
        background: agent.label, color: agent.ink, borderRadius: 999, whiteSpace: "nowrap",
        fontFamily: "Inter", fontWeight: 600, fontSize: 30, letterSpacing: -0.2,
        boxShadow: `0 12px 32px color-mix(in srgb, ${agent.label} 35%, transparent)`,
        transform: `scale(${pill})`, transformOrigin: "0 0", opacity: Math.min(1, pill * 1.5),
      }}
    >
      <AgentFace agent={agent} size={40} shadow={false} style={{ outline: "3px solid rgba(255,255,255,0.85)", borderRadius: "20px 20px 12px 12px" }} />
      {agent.name}
    </div>
  </div>
);

/** Ikon garis tipis (feather), warna currentColor. */
export const Icon: React.FC<{ d: React.ReactNode; size: number; color?: string; sw?: number }> = ({ d, size, color = "currentColor", sw = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
    {d}
  </svg>
);
export const I_PLUS = <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>;
export const I_X = <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>;
export const I_UP = <><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></>;
export const I_MIC = <><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10v1a7 7 0 0 0 14 0v-1" /><line x1="12" y1="18" x2="12" y2="22" /></>;
export const I_MORE = <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>;
export const I_FOLDER = <><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></>;
export const I_KEY = <><circle cx="7.5" cy="15.5" r="4.5" /><path d="M10.7 12.3 21 2" /><path d="m16 7 3 3" /></>;

// ── Piktogram (motif 01c / 03c / 03d / 06x): kepala bulat + badan lengkung, ukuran ruang 1920×1080.
export const PICTO = { headD: 208, bodyW: 384, bodyH: 400, headTop: 392, bodyTop: 620, floor: 1020 };

/** Piktogram matte (gradien charcoal) dengan rim light opsional dari kiri/kanan. cx = pusat horizontal. */
export const MattePicto: React.FC<{
  cx: number; scale?: number; rimR?: number; rimL?: number; flat?: boolean; opacity?: number; blur?: number; clipTop?: number; litLeft?: boolean;
}> = ({ cx, scale = 1, rimR = 0, rimL = 0, flat = false, opacity = 1, blur = 0, clipTop, litLeft = false }) => {
  const { headD, bodyW, bodyH, headTop, bodyTop, floor } = PICTO;
  const grad = flat ? "var(--sb-charcoal-raised)" : litLeft
    ? "linear-gradient(100deg, var(--sb-charcoal-raised) 20%, var(--sb-charcoal) 100%)"
    : "linear-gradient(100deg, var(--sb-charcoal) 30%, var(--sb-charcoal-raised) 100%)";
  const rim = (k: number) =>
    [rimR > 0 ? `inset -10px ${k}px 7px -4px color-mix(in srgb, var(--sb-white) ${Math.round(rimR * 90)}%, transparent)` : "",
     rimL > 0 ? `inset 10px ${k}px 7px -4px color-mix(in srgb, var(--sb-white) ${Math.round(rimL * 60)}%, transparent)` : ""]
      .filter(Boolean).join(",") || undefined;
  // clipTop: hanya bagian di bawah y (ruang dunia) yang terlihat (isi wireframe dari kaki ke kepala)
  const clipFor = (top: number, h: number) => (clipTop === undefined ? undefined : `inset(${Math.min(h, Math.max(0, clipTop - top))}px 0 0 0)`);
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: `${cx}px ${floor}px`, opacity, filter: blur > 0.05 ? `blur(${blur}px)` : undefined }}>
      <div style={{ position: "absolute", left: cx - headD / 2, top: headTop, width: headD, height: headD, borderRadius: "50%", background: grad, boxShadow: rim(0), clipPath: clipFor(headTop, headD) }} />
      <div style={{ position: "absolute", left: cx - bodyW / 2, top: bodyTop, width: bodyW, height: bodyH, borderRadius: `${bodyW / 2}px ${bodyW / 2}px 0 0`, background: grad, boxShadow: rim(6), clipPath: clipFor(bodyTop, bodyH) }} />
    </div>
  );
};

/** Wireframe kosong (garis putus-putus) piktogram — sama persis dengan 01c. */
export const WirePicto: React.FC<{ cx: number; opacity?: number }> = ({ cx, opacity = 1 }) => {
  const { headD, bodyW, bodyH, headTop, bodyTop } = PICTO;
  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      <div style={{ position: "absolute", left: cx - headD / 2, top: headTop, width: headD, height: headD, borderRadius: "50%", border: "3px dashed color-mix(in srgb, var(--sb-white) 70%, transparent)" }} />
      <svg style={{ position: "absolute", left: cx - bodyW / 2, top: bodyTop }} width={bodyW} height={bodyH} viewBox="0 0 192 200" fill="none">
        <path d="M2 200 V96 A94 94 0 0 1 190 96 V200" stroke="rgb(210,210,215)" strokeOpacity={0.8} strokeWidth={1.5} strokeDasharray="7 6" />
      </svg>
    </div>
  );
};

/** Lebar penampang piktogram di ketinggian y (untuk garis scan). */
export const pictoHalfWidth = (y: number) => {
  const { headD, bodyW, headTop, bodyTop, floor } = PICTO;
  const r = bodyW / 2;
  if (y >= bodyTop + r && y <= floor) return r;
  if (y >= bodyTop && y < bodyTop + r) return Math.sqrt(Math.max(0, r * r - (bodyTop + r - y) ** 2));
  const hr = headD / 2;
  const hc = headTop + hr;
  if (Math.abs(y - hc) <= hr) return Math.sqrt(hr * hr - (y - hc) ** 2);
  return 0;
};

/** Kerucut cahaya (dari atas) + genangan cahaya di lantai, pusat cx. */
export const LightCone: React.FC<{ cx: number; w?: number; i?: number }> = ({ cx, w = 880, i = 1 }) => (
  <>
    <div style={{ position: "absolute", left: cx - w / 2, top: 0, width: w, height: 1080, clipPath: "polygon(44% 0%, 56% 0%, 84% 100%, 16% 100%)",
      backgroundImage: `linear-gradient(180deg, color-mix(in srgb, var(--sb-white) ${Math.round(19 * i)}%, transparent) 0%, color-mix(in srgb, var(--sb-white) ${Math.round(4.5 * i)}%, transparent) 100%)` }} />
    <div style={{ position: "absolute", left: cx - 260, top: 956, width: 520, height: 96, borderRadius: "50%",
      backgroundImage: `radial-gradient(circle at center, color-mix(in srgb, var(--sb-white) ${Math.round(29 * i)}%, transparent) 0%, #00000000 70%)` }} />
  </>
);
