// 10 pratinjau landing page BERBEDA (nama, palet, tata letak) untuk orbit 05e. Semua 440×300, tanpa label contoh.
import React from "react";

export const LW = 440, LH = 300;
const F = "Inter, system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, 'Times New Roman', serif";

const Frame: React.FC<{ bg: string; url?: string; dark?: boolean; children: React.ReactNode; pad?: number }> = ({ bg, url, dark, children, pad = 0 }) => (
  <div style={{ width: LW, height: LH, borderRadius: 18, overflow: "hidden", background: bg, fontFamily: F, position: "relative", boxShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 30px 60px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column" }}>
    {url && (
      <div style={{ height: 28, display: "flex", alignItems: "center", gap: 5, padding: "0 12px", background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", flexShrink: 0 }}>
        {[0, 1, 2].map((i) => <div key={i} style={{ width: 8, height: 8, borderRadius: 4, background: dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)" }} />)}
        <div style={{ marginLeft: 10, fontSize: 10, color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)" }}>{url}</div>
      </div>
    )}
    <div style={{ flex: 1, position: "relative", padding: pad }}>{children}</div>
  </div>
);
const Pill: React.FC<{ bg: string; color: string; children: React.ReactNode; border?: string }> = ({ bg, color, children, border }) => (
  <span style={{ background: bg, color, borderRadius: 999, padding: "7px 14px", fontSize: 11, fontWeight: 700, border: border ?? "none", whiteSpace: "nowrap" }}>{children}</span>
);

// 1 · Vesper — hero gelap + cahaya oranye
const Vesper = () => (
  <Frame bg="#070910" url="vesper.sleep" dark>
    <div style={{ position: "absolute", right: -80, bottom: -120, width: 360, height: 360, borderRadius: 180, background: "radial-gradient(circle, rgba(255,122,61,0.55), rgba(255,122,61,0) 68%)" }} />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 22px", color: "#fff", fontSize: 13 }}>
      <b style={{ letterSpacing: 2, fontSize: 13 }}>VESPER</b>
      <span style={{ display: "flex", gap: 14, alignItems: "center", fontSize: 11, color: "rgba(255,255,255,0.65)" }}>Science Pricing <Pill bg="#fff" color="#07080d">Get Vesper</Pill></span>
    </div>
    <div style={{ padding: "18px 26px", color: "#fff", position: "relative" }}>
      <div style={{ fontSize: 10, letterSpacing: 2, color: "#ffb48f", fontWeight: 700 }}>TUNED SLEEP, NIGHTLY</div>
      <div style={{ fontSize: 46, fontWeight: 800, letterSpacing: -1.8, lineHeight: 1, marginTop: 10 }}>Sleep,<br />engineered.</div>
      <div style={{ display: "flex", gap: 8, marginTop: 18 }}><Pill bg="#ff7a3d" color="#1a0b03">Start free night</Pill><Pill bg="transparent" color="#fff" border="1px solid rgba(255,255,255,0.35)">Watch film</Pill></div>
    </div>
  </Frame>
);
// 2 · Mellow — gradien lembut
const Mellow = () => (
  <Frame bg="linear-gradient(135deg,#ffd6c4 0%,#e4d3ff 55%,#cde6ff 100%)" url="mellow.money">
    <div style={{ padding: "14px 22px", display: "flex", justifyContent: "space-between", color: "#2a2140", fontSize: 14, fontWeight: 800 }}>mellow<span style={{ fontSize: 11, fontWeight: 600 }}>Log in</span></div>
    <div style={{ textAlign: "center", color: "#2a2140", padding: "6px 24px" }}>
      <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1.4, lineHeight: 1.02 }}>Money,<br />but gentler.</div>
      <div style={{ marginTop: 14 }}><Pill bg="#2a2140" color="#fff">Open an account</Pill></div>
    </div>
    <div style={{ position: "absolute", left: 120, right: 120, bottom: -10, height: 62, borderRadius: 18, background: "rgba(255,255,255,0.7)", boxShadow: "0 10px 30px rgba(80,50,140,0.18)", padding: "12px 16px", color: "#2a2140" }}>
      <div style={{ fontSize: 9, opacity: 0.6 }}>Balance</div><div style={{ fontSize: 20, fontWeight: 700 }}>$2,480.12</div>
    </div>
  </Frame>
);
// 3 · Fieldnotes — editorial serif krem
const Fieldnotes = () => (
  <Frame bg="#f3eee3" url="fieldnotes.press">
    <div style={{ padding: "12px 22px 0", color: "#1b1a17" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, letterSpacing: 1.5, fontWeight: 600, borderBottom: "1.5px solid #1b1a17", paddingBottom: 6 }}><span>ISSUE 142</span><span>AUTUMN</span></div>
      <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 34, textAlign: "center", marginTop: 8 }}>Fieldnotes</div>
      <div style={{ borderTop: "1px solid #1b1a17", marginTop: 6, display: "flex", gap: 16, paddingTop: 10 }}>
        <div style={{ flex: 1.5, fontFamily: SERIF, fontSize: 30, lineHeight: 1.02 }}>The slow web is quietly coming back</div>
        <div style={{ flex: 1, fontSize: 8.5, lineHeight: 1.5, color: "#4a463e" }}>Readers are leaving the feed for small, patient publications. We spent a season with the people building them.<div style={{ marginTop: 8, fontWeight: 700, letterSpacing: 1 }}>READ THE ESSAY →</div></div>
      </div>
    </div>
  </Frame>
);
// 4 · Tidal — mockup aplikasi HP
const Tidal = () => (
  <Frame bg="linear-gradient(160deg,#0b3b4a,#0f766e)">
    <div style={{ position: "absolute", left: 26, top: 40, width: 190, color: "#fff" }}>
      <b style={{ fontSize: 12, letterSpacing: 2 }}>TIDAL</b>
      <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1, lineHeight: 1.04, marginTop: 14 }}>Know the tide before you leave.</div>
      <div style={{ marginTop: 16 }}><Pill bg="#fff" color="#0b3b4a">Get the app</Pill></div>
    </div>
    <div style={{ position: "absolute", right: 36, top: 26, width: 150, height: 300, borderRadius: 28, background: "#0a1a20", border: "5px solid #0a1a20", boxShadow: "0 0 0 1.5px rgba(255,255,255,0.3)" }}>
      <div style={{ margin: 8, borderRadius: 20, background: "linear-gradient(#e8fbf7,#bfeee4)", height: 270, padding: 12, color: "#0b3b4a" }}>
        <div style={{ fontSize: 9, fontWeight: 700, opacity: 0.6 }}>HIGH TIDE</div><div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1 }}>14:32</div>
        <svg width="112" height="54" viewBox="0 0 112 54"><path d="M0 40 C 20 40, 22 8, 42 8 S 66 46, 84 46 S 100 20, 112 16" fill="none" stroke="#0f766e" strokeWidth="3" strokeLinecap="round" /></svg>
        {["Low 20:48", "High 03:05", "Low 09:11"].map((r) => <div key={r} style={{ fontSize: 10, fontWeight: 600, padding: "6px 8px", background: "rgba(255,255,255,0.7)", borderRadius: 8, marginTop: 5 }}>{r}</div>)}
      </div>
    </div>
  </Frame>
);
// 5 · Basil — dashboard analitik
const Basil = () => (
  <Frame bg="#0e1116" url="basil.dev/overview" dark>
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 44, background: "#12161d", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, paddingTop: 14 }}>
      {[0, 1, 2, 3].map((i) => <div key={i} style={{ width: 16, height: 16, borderRadius: 5, background: i === 0 ? "#34d399" : "rgba(255,255,255,0.18)" }} />)}
    </div>
    <div style={{ marginLeft: 44, padding: "12px 16px", color: "#fff" }}>
      <div style={{ fontSize: 13, fontWeight: 700 }}>Overview</div>
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        {[["Revenue", "$48.2k", "+12%"], ["Users", "9,310", "+4.1%"], ["Churn", "1.4%", "-0.3%"]].map(([a, b, c]) => (
          <div key={a} style={{ flex: 1, background: "#161b24", borderRadius: 10, padding: "8px 10px" }}><div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.55)" }}>{a}</div><div style={{ fontSize: 16, fontWeight: 700 }}>{b}</div><div style={{ fontSize: 8.5, color: "#34d399" }}>{c}</div></div>
        ))}
      </div>
      <svg width="360" height="110" viewBox="0 0 360 110" style={{ marginTop: 10 }}>
        <defs><linearGradient id="bsl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#34d399" stopOpacity="0.4" /><stop offset="1" stopColor="#34d399" stopOpacity="0" /></linearGradient></defs>
        <path d="M0 90 L40 74 L80 82 L120 52 L160 60 L200 34 L240 44 L280 20 L320 26 L360 8 V110 H0Z" fill="url(#bsl)" />
        <path d="M0 90 L40 74 L80 82 L120 52 L160 60 L200 34 L240 44 L280 20 L320 26 L360 8" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    </div>
  </Frame>
);
// 6 · Kiln — tabel harga
const Kiln = () => (
  <Frame bg="#faf8f3" url="kiln.studio/pricing">
    <div style={{ textAlign: "center", color: "#1f1b16", paddingTop: 12 }}>
      <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.6 }}>Simple pricing</div>
      <div style={{ fontSize: 10, color: "#7a7166", marginTop: 3 }}>Fire up a studio in minutes</div>
    </div>
    <div style={{ display: "flex", gap: 8, padding: "12px 16px" }}>
      {[["Hobby", "$0", false], ["Studio", "$29", true], ["Team", "$79", false]].map(([n, p, hi]) => (
        <div key={n as string} style={{ flex: 1, borderRadius: 12, padding: "10px 10px", background: hi ? "#1f1b16" : "#fff", color: hi ? "#fff" : "#1f1b16", border: hi ? "none" : "1px solid #e6e0d4", transform: hi ? "translateY(-6px)" : undefined }}>
          <div style={{ fontSize: 10, fontWeight: 700, opacity: 0.7 }}>{n}{hi ? "  ·  Popular" : ""}</div>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: -1 }}>{p}<span style={{ fontSize: 9, fontWeight: 500 }}>/mo</span></div>
          {["3 projects", "Custom domain", hi ? "Priority kiln" : "Community"].map((l) => <div key={l} style={{ fontSize: 9, marginTop: 5, display: "flex", gap: 5 }}><span style={{ color: hi ? "#ff8a3d" : "#d9622b" }}>✓</span>{l}</div>)}
          <div style={{ marginTop: 10, textAlign: "center", fontSize: 9.5, fontWeight: 700, padding: "6px 0", borderRadius: 8, background: hi ? "#ff8a3d" : "#f1ece1", color: hi ? "#1f1b16" : "#1f1b16" }}>Choose</div>
        </div>
      ))}
    </div>
  </Frame>
);
// 7 · Pebble — UI chat
const Pebble = () => (
  <Frame bg="#f5f6f8" url="pebble.chat">
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderBottom: "1px solid #e4e6ea", color: "#15171c", fontSize: 12, fontWeight: 700 }}><div style={{ width: 20, height: 20, borderRadius: 10, background: "#15171c" }} />Pebble</div>
    <div style={{ padding: "10px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ alignSelf: "flex-end", background: "#15171c", color: "#fff", fontSize: 11, padding: "8px 12px", borderRadius: "14px 14px 4px 14px" }}>Plan 3 days in Kyoto</div>
      <div style={{ alignSelf: "flex-start", background: "#fff", color: "#15171c", fontSize: 11, lineHeight: 1.45, padding: "9px 12px", borderRadius: "14px 14px 14px 4px", maxWidth: 270, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>Day 1: Fushimi Inari at sunrise, then Gion at dusk. Want a slower pace?</div>
      <div style={{ display: "flex", gap: 6 }}>{["Slower", "Food focus", "Add Nara"].map((c) => <span key={c} style={{ fontSize: 9.5, fontWeight: 600, border: "1px solid #d5d8de", borderRadius: 999, padding: "4px 9px", color: "#15171c" }}>{c}</span>)}</div>
    </div>
    <div style={{ position: "absolute", left: 14, right: 14, bottom: 12, height: 34, borderRadius: 17, background: "#fff", border: "1px solid #dcdfe5", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 6px 0 14px", fontSize: 11, color: "#7b8088" }}>Ask anything<div style={{ width: 24, height: 24, borderRadius: 12, background: "#15171c", color: "#fff", textAlign: "center", lineHeight: "24px", fontSize: 12 }}>↑</div></div>
  </Frame>
);
// 8 · Halo — waitlist
const Halo = () => (
  <Frame bg="#050408" url="halo.fm/waitlist" dark>
    <div style={{ position: "absolute", left: 60, right: 60, top: -70, height: 220, background: "radial-gradient(ellipse, rgba(168,85,247,0.55), rgba(236,72,153,0.2) 50%, rgba(0,0,0,0) 72%)" }} />
    <div style={{ position: "relative", textAlign: "center", color: "#fff", paddingTop: 22 }}>
      <div style={{ width: 26, height: 26, borderRadius: 13, margin: "0 auto", border: "3px solid #fff", boxShadow: "0 0 24px rgba(236,72,153,0.7)" }} />
      <div style={{ fontSize: 33, fontWeight: 800, letterSpacing: -1.2, lineHeight: 1.04, marginTop: 14 }}>Something quiet<br />is coming.</div>
      <div style={{ margin: "16px auto 0", width: 300, height: 38, borderRadius: 19, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.22)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 5px 0 16px", fontSize: 11, color: "rgba(255,255,255,0.6)" }}>you@email.com<Pill bg="#fff" color="#050408">Join</Pill></div>
      <div style={{ marginTop: 12, fontSize: 10, color: "rgba(255,255,255,0.7)" }}>12,481 people already waiting</div>
    </div>
  </Frame>
);
// 9 · Plot — papan kanban, produk
const Plot = () => (
  <Frame bg="#ffffff" url="plot.work">
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 18px", color: "#14142b", fontSize: 13, fontWeight: 800 }}>plot<Pill bg="#5b5bf0" color="#fff">Try free</Pill></div>
    <div style={{ padding: "0 18px", color: "#14142b" }}><div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.8 }}>Plan like you mean it.</div></div>
    <div style={{ display: "flex", gap: 8, padding: "12px 18px" }}>
      {[["Backlog", ["Pricing page", "Onboarding"], "#e9e9fd"], ["Doing", ["Launch email", "Mobile nav"], "#fff1d6"], ["Done", ["Brand kit"], "#d9f5e5"]].map(([n, cs, bg]) => (
        <div key={n as string} style={{ flex: 1, background: "#f6f6fb", borderRadius: 10, padding: 7 }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#55557a", marginBottom: 6 }}>{n}</div>
          {(cs as string[]).map((c) => <div key={c} style={{ background: "#fff", borderRadius: 7, padding: "7px 7px", fontSize: 9.5, fontWeight: 600, marginBottom: 5, boxShadow: "0 1px 4px rgba(20,20,43,0.08)" }}><span style={{ display: "inline-block", width: 24, height: 5, borderRadius: 3, background: bg as string, border: "1px solid rgba(0,0,0,0.06)", marginBottom: 4 }} /><br />{c}</div>)}
        </div>
      ))}
    </div>
  </Frame>
);
// 10 · Sundial — brutalis kuning
const Sundial = () => (
  <Frame bg="#ffe14d" url="sundial.cut">
    <div style={{ padding: "12px 20px", color: "#111", position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 900, letterSpacing: 1 }}><span>SUNDIAL ✺</span><span>BARBERS · SALONS</span></div>
      <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: -2.4, lineHeight: 0.92, marginTop: 14 }}>BOOK<br />THE CHAIR.</div>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 16 }}>
        <span style={{ background: "#111", color: "#ffe14d", fontWeight: 800, fontSize: 12, padding: "9px 16px", boxShadow: "4px 4px 0 #ff5a36" }}>START FREE →</span>
        <span style={{ fontSize: 10, fontWeight: 700, border: "2px solid #111", padding: "4px 8px", transform: "rotate(-4deg)" }}>2,300 SHOPS</span>
      </div>
    </div>
  </Frame>
);

export const LANDING_CARDS: React.FC[] = [Vesper, Mellow, Fieldnotes, Tidal, Basil, Kiln, Pebble, Halo, Plot, Sundial];
