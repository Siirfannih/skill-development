import React from "react";
import { loadFont } from "@remotion/fonts";
import { Img, staticFile } from "remotion";

// "Visual is king" (Irfan 26 Okt 14:48): every AI output on screen must look like a real, professional,
// modern product — real photos, real typography, real copy. Each design is built at its native size
// (a real website is 1440 px wide, an A4 page is 1240 px) and scaled down by the caller with <Fit>.
export const FR = "Fraunces";
export const BG = "Bricolage Grotesque";
export const CV_ = "Caveat";
export const DM = "DM Sans";
export const IS = "Instrument Serif Roman";
for (const w of ["400", "600", "700"]) loadFont({ family: FR, url: staticFile(`fonts/fraunces-latin-${w}-normal.woff2`), weight: w, format: "woff2" });
for (const w of ["500", "700", "800"]) loadFont({ family: BG, url: staticFile(`fonts/bricolage-grotesque-latin-${w}-normal.woff2`), weight: w, format: "woff2" });
loadFont({ family: CV_, url: staticFile("fonts/caveat-latin-500-normal.woff2"), weight: "500", format: "woff2" });
for (const w of ["400", "500", "700"]) loadFont({ family: DM, url: staticFile(`fonts/dm-sans-latin-${w}-normal.woff2`), weight: w, format: "woff2" });
loadFont({ family: IS, url: staticFile("fonts/instrument-serif-latin-400-normal.woff2"), weight: "400", format: "woff2" });

const ph = (n: string) => staticFile(`assets/${n}`);
const Photo: React.FC<{ src: string; style?: React.CSSProperties; pos?: string }> = ({ src, style, pos = "center" }) => (
  <Img src={ph(src)} style={{ display: "block", objectFit: "cover", objectPosition: pos, ...style }} />
);

/** Scale a native-size design into a box. */
export const Fit: React.FC<{ w: number; h: number; nw: number; nh: number; children: React.ReactNode; radius?: number; shadow?: boolean; style?: React.CSSProperties }> = ({ w, h, nw, nh, children, radius = 0, shadow, style }) => {
  const s = Math.max(w / nw, h / nh);
  return (
    <div style={{ width: w, height: h, overflow: "hidden", borderRadius: radius, position: "relative", boxShadow: shadow ? "0 30px 80px rgba(10,10,10,0.18), 0 0 0 1px rgba(10,10,10,0.05)" : undefined, ...style }}>
      <div style={{ position: "absolute", left: (w - nw * s) / 2, top: 0, width: nw, height: nh, scale: String(s), transformOrigin: "0 0" }}>{children}</div>
    </div>
  );
};

// ---------------------------------------------------------------- 1. Coffee shop landing page (1440×900)
export const KopiLanding: React.FC<{ off?: number; err?: boolean }> = ({ off = 0, err = false }) => {
  const ink = "#2A1A10";
  const cream = "#F4EEE5";
  const clay = "#B4562B";
  return (
    <div style={{ width: 1440, height: 900, background: cream, position: "relative", overflow: "hidden", fontFamily: DM, color: ink }}>
      <div style={{ height: 40, background: ink, color: "#EBDCC8", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 28, letterSpacing: "0.02em" }}>
        <span>Jl. Drupadi 12, Denpasar</span>
        <span style={{ opacity: 0.5 }}>●</span>
        <span>Buka setiap hari 07.00–22.00</span>
        <span style={{ opacity: 0.5 }}>●</span>
        <span>Biji Kintamani, disangrai tiap pagi</span>
      </div>
      <div style={{ height: 92, display: "flex", alignItems: "center", padding: "0 64px", justifyContent: "space-between" }}>
        <div style={{ fontFamily: FR, fontWeight: 700, fontSize: 34, letterSpacing: "-0.02em" }}>
          Senja<span style={{ color: clay }}>.</span>
        </div>
        <div style={{ display: "flex", gap: 40, fontSize: 17, fontWeight: 500 }}>
          <span>Menu</span>
          <span>Cerita kami</span>
          <span>Biji kopi</span>
          <span>Kunjungi</span>
        </div>
        <div style={{ padding: "12px 22px", borderRadius: 999, background: ink, color: cream, fontSize: 16, fontWeight: 500 }}>Pesan antar</div>
      </div>
      {/* hero */}
      <div style={{ position: "absolute", left: 64, top: 200, width: 660 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 16px", borderRadius: 999, background: "#EADBC6", fontSize: 15, fontWeight: 500 }}>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: clay }} /> Kedai sangrai kecil di Denpasar
        </div>
        <div style={{ fontFamily: FR, fontWeight: 600, fontSize: 104, lineHeight: 0.98, letterSpacing: "-0.035em", marginTop: 28, translate: `0 ${off}px` }}>
          Kopi <i style={{ fontWeight: 400, color: clay }}>pelan</i> untuk sore yang panjang.
        </div>
        <div style={{ fontSize: 21, lineHeight: 1.5, marginTop: 28, maxWidth: 520, color: "#5A4637" }}>Biji Kintamani disangrai tiap pagi, diseduh tanpa buru-buru. Duduk dulu, ceritanya belakangan.</div>
        <div style={{ display: "flex", gap: 14, marginTop: 36 }}>
          <div style={{ padding: "18px 30px", borderRadius: 999, background: clay, color: "#FFF", fontSize: 18, fontWeight: 500 }}>Lihat menu</div>
          <div style={{ padding: "18px 30px", borderRadius: err ? 10 : 999, border: `1.5px solid ${ink}`, fontSize: 18, fontWeight: 500, translate: err ? "0 9px" : undefined }}>Arah ke kedai →</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 46 }}>
          <div style={{ display: "flex" }}>
            {["p_portrait.jpg", "p_laptop.jpg", "p_desk.jpg"].map((p, i) => (
              <Photo key={p} src={p} style={{ width: 44, height: 44, borderRadius: 22, border: `3px solid ${cream}`, marginLeft: i ? -12 : 0 }} />
            ))}
          </div>
          <div style={{ fontSize: 15, lineHeight: 1.35 }}>
            <b>4,9 ★</b> dari 1.284 ulasan
            <br />
            <span style={{ color: "#7A6553" }}>"Tempat sore favorit di Renon."</span>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", right: 64, top: 160, width: 600, height: 700, borderRadius: 36, overflow: "hidden" }}>
        <Photo src="p_coffee.jpg" style={{ width: 600, height: 700 }} pos="60% 50%" />
      </div>
      <div style={{ position: "absolute", right: 560, top: 640, width: 300, padding: 16, borderRadius: 22, background: "#FFFDF9", boxShadow: "0 24px 60px rgba(42,26,16,0.18)", display: "flex", gap: 14, alignItems: "center" }}>
        <Photo src="p_coffee2.jpg" style={{ width: 72, height: 72, borderRadius: 14 }} />
        <div>
          <div style={{ fontSize: 13, color: clay, fontWeight: 700, letterSpacing: "0.06em" }}>TERLARIS</div>
          <div style={{ fontFamily: FR, fontSize: 21, fontWeight: 600, marginTop: 2 }}>Kopi Susu Aren</div>
          <div style={{ fontSize: 15, color: "#7A6553", marginTop: 2 }}>Rp 28.000</div>
        </div>
      </div>
      <div style={{ position: "absolute", right: 110, top: 112, fontFamily: CV_, fontSize: 34, color: clay, rotate: "-6deg" }}>disangrai pagi ini ✿</div>
      <svg width="90" height="70" style={{ position: "absolute", right: 300, top: 120 }} viewBox="0 0 90 70" aria-hidden="true">
        <path d="M86 12 C 60 4, 30 18, 18 52" stroke={clay} strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <path d="M8 44 L18 56 L28 44" stroke={clay} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

// ---------------------------------------------------------------- 2. Running app screen (390×844)
export const RunApp: React.FC = () => (
  <div style={{ width: 390, height: 844, background: "#0E0F12", color: "#FFF", fontFamily: DM, position: "relative", overflow: "hidden" }}>
    <Photo src="p_runner.jpg" style={{ width: 390, height: 430 }} pos="50% 60%" />
    <div style={{ position: "absolute", left: 0, top: 0, width: 390, height: 430, background: "linear-gradient(180deg, rgba(14,15,18,0) 40%, #0E0F12 100%)" }} />
    <div style={{ position: "absolute", left: 24, top: 56, fontSize: 15, opacity: 0.85 }}>Selasa, 6.12 pagi</div>
    <div style={{ position: "absolute", left: 24, top: 300 }}>
      <div style={{ fontSize: 15, color: "#C8FF4D", fontWeight: 700, letterSpacing: "0.08em" }}>LARI PAGI</div>
      <div style={{ fontFamily: BG, fontWeight: 800, fontSize: 64, letterSpacing: "-0.04em", lineHeight: 1 }}>5,24 km</div>
    </div>
    <div style={{ position: "absolute", left: 24, right: 24, top: 460, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
      {[
        ["28:41", "Durasi"],
        ["5'28\"", "Pace"],
        ["412", "Kalori"],
      ].map(([v, l]) => (
        <div key={l} style={{ background: "#1B1D22", borderRadius: 18, padding: "16px 14px" }}>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{v}</div>
          <div style={{ fontSize: 13, opacity: 0.6, marginTop: 4 }}>{l}</div>
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", left: 24, right: 24, top: 580, height: 150, background: "#1B1D22", borderRadius: 20, padding: 18, boxSizing: "border-box" }}>
      <div style={{ fontSize: 14, opacity: 0.7 }}>Minggu ini</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 80, marginTop: 14 }}>
        {[40, 62, 30, 75, 52, 88, 66].map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 6, background: i === 5 ? "#C8FF4D" : "#3A3D45" }} />
        ))}
      </div>
    </div>
    <div style={{ position: "absolute", left: 24, right: 24, bottom: 34, height: 60, borderRadius: 30, background: "#C8FF4D", color: "#0E0F12", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700 }}>Mulai lari</div>
  </div>
);

// ---------------------------------------------------------------- 3. Concert poster (900×1200)
export const Poster: React.FC = () => (
  <div style={{ width: 900, height: 1200, position: "relative", overflow: "hidden", background: "#0B1B4A", fontFamily: BG, color: "#F2F0E9" }}>
    <Photo src="p_concert.jpg" style={{ width: 900, height: 1200, filter: "grayscale(1) contrast(1.2) brightness(0.9)", mixBlendMode: "screen", opacity: 0.7 }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(37,99,235,0.55), rgba(11,27,74,0.2) 45%, rgba(11,27,74,0.95))" }} />
    <div style={{ position: "absolute", left: 56, top: 56, right: 56, display: "flex", justifyContent: "space-between", fontSize: 26, fontWeight: 500, letterSpacing: "0.04em" }}>
      <span>12.12.26</span>
      <span>LAPANGAN NITI MANDALA</span>
    </div>
    <div style={{ position: "absolute", left: 48, bottom: 250, fontWeight: 800, fontSize: 228, lineHeight: 0.82, letterSpacing: "-0.06em" }}>
      SUARA
      <br />
      MALAM
    </div>
    <div style={{ position: "absolute", left: 56, right: 56, bottom: 64, display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 30, fontWeight: 500, lineHeight: 1.25 }}>
      <span>
        Hindia · Nadin Amizah
        <br />
        Feast · The Panturas
      </span>
      <span style={{ padding: "14px 26px", borderRadius: 999, background: "#F2F0E9", color: "#0B1B4A", fontSize: 26 }}>Tiket dari Rp 250rb</span>
    </div>
  </div>
);

// ---------------------------------------------------------------- 4. Instagram post (1080×1350 incl. chrome)
export const IGPost: React.FC<{ photo?: string; handle?: string; caption?: string }> = ({ photo = "p_coffee2.jpg", handle = "kopisenja.id", caption = "Sore ini kita seduh pelan-pelan. Kopi Susu Aren baru keluar dari sangrai pagi, mampir ya ☕" }) => (
  <div style={{ width: 1080, height: 1350, background: "#FFF", fontFamily: "Inter", color: "#0A0A0A" }}>
    <div style={{ height: 110, display: "flex", alignItems: "center", gap: 20, padding: "0 32px" }}>
      <div style={{ width: 66, height: 66, borderRadius: 33, padding: 4, background: "linear-gradient(45deg,#F9A825,#E91E63,#7B1FA2)" }}>
        <Photo src="p_coffee.jpg" style={{ width: 58, height: 58, borderRadius: 29, border: "3px solid #FFF", boxSizing: "border-box" }} />
      </div>
      <div style={{ fontSize: 30, fontWeight: 600 }}>{handle}</div>
      <div style={{ flex: 1 }} />
      <div style={{ fontSize: 40, letterSpacing: 2 }}>···</div>
    </div>
    <Photo src={photo} style={{ width: 1080, height: 1000 }} />
    <div style={{ padding: "22px 32px", fontSize: 30 }}>
      <div style={{ display: "flex", gap: 28, fontSize: 44 }}>
        <span>♡</span>
        <span>◯</span>
        <span>➢</span>
      </div>
      <div style={{ fontWeight: 600, marginTop: 10 }}>2.184 suka</div>
      <div style={{ marginTop: 8, lineHeight: 1.35, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        <b>{handle}</b> {caption}
      </div>
    </div>
  </div>
);

// ---------------------------------------------------------------- 5. Pitch slide (1600×900)
export const DeckSlide: React.FC = () => (
  <div style={{ width: 1600, height: 900, background: "#F7F7F5", fontFamily: DM, color: "#0A0A0A", position: "relative", padding: 90, boxSizing: "border-box" }}>
    <div style={{ fontSize: 22, color: "#2563EB", fontWeight: 700, letterSpacing: "0.08em" }}>Q3 · 2026</div>
    <div style={{ fontFamily: IS, fontSize: 92, lineHeight: 1, marginTop: 18, letterSpacing: "-0.02em" }}>Pelanggan tumbuh 38% dalam satu kuartal.</div>
    <div style={{ position: "absolute", left: 90, right: 90, bottom: 90, height: 380, display: "flex", alignItems: "flex-end", gap: 36 }}>
      {[
        ["Jan", 32],
        ["Feb", 38],
        ["Mar", 41],
        ["Apr", 47],
        ["Mei", 55],
        ["Jun", 61],
        ["Jul", 72],
        ["Agu", 84],
        ["Sep", 100],
      ].map(([m, v], i) => (
        <div key={m as string} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ width: "100%", height: (v as number) * 3, borderRadius: 10, background: i === 8 ? "#2563EB" : "#D9DEE8" }} />
          <div style={{ fontSize: 20, color: "#6B6B6B" }}>{m}</div>
        </div>
      ))}
    </div>
  </div>
);

// ---------------------------------------------------------------- 6. Product page (1440×900)
export const StorePage: React.FC<{ orders?: number }> = () => (
  <div style={{ width: 1440, height: 900, background: "#FFF", fontFamily: DM, color: "#111", position: "relative" }}>
    <div style={{ height: 80, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 56px", borderBottom: "1px solid #EEE" }}>
      <div style={{ fontFamily: BG, fontWeight: 800, fontSize: 30, letterSpacing: "-0.04em" }}>langkah.</div>
      <div style={{ display: "flex", gap: 34, fontSize: 16 }}>
        <span>Pria</span>
        <span>Wanita</span>
        <span>Koleksi baru</span>
        <span>Diskon</span>
      </div>
      <div style={{ fontSize: 16 }}>Keranjang (1)</div>
    </div>
    <div style={{ position: "absolute", left: 56, top: 120, width: 780, height: 720, borderRadius: 28, background: "#F1F1EF", overflow: "hidden" }}>
      <Photo src="p_sneaker.jpg" style={{ width: 780, height: 720, mixBlendMode: "multiply" }} />
    </div>
    <div style={{ position: "absolute", left: 900, top: 150, width: 480 }}>
      <div style={{ fontSize: 15, color: "#2563EB", fontWeight: 700, letterSpacing: "0.08em" }}>BARU · EDISI TERBATAS</div>
      <div style={{ fontFamily: BG, fontWeight: 700, fontSize: 64, letterSpacing: "-0.04em", lineHeight: 1, marginTop: 14 }}>Langit Low</div>
      <div style={{ fontSize: 22, color: "#666", marginTop: 8 }}>Putih susu · Kulit sintetis daur ulang</div>
      <div style={{ fontSize: 34, fontWeight: 700, marginTop: 30 }}>Rp 649.000</div>
      <div style={{ fontSize: 16, color: "#666", marginTop: 34 }}>Ukuran</div>
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        {[38, 39, 40, 41, 42, 43].map((s) => (
          <div key={s} style={{ width: 62, height: 52, borderRadius: 12, border: `1.5px solid ${s === 41 ? "#111" : "#DDD"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: s === 41 ? 700 : 400 }}>
            {s}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 40, height: 66, borderRadius: 33, background: "#111", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, fontWeight: 500 }}>Tambah ke keranjang</div>
      <div style={{ marginTop: 14, height: 66, borderRadius: 33, border: "1.5px solid #DDD", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19 }}>♡ Simpan</div>
      <div style={{ marginTop: 26, fontSize: 15, color: "#666" }}>Gratis ongkir se-Bali · Tukar ukuran 30 hari</div>
    </div>
  </div>
);

// ---------------------------------------------------------------- 7. Vertical reel (1080×1920)
export const Reel: React.FC<{ t?: number }> = ({ t = 0.4 }) => (
  <div style={{ width: 1080, height: 1920, position: "relative", overflow: "hidden", background: "#000", fontFamily: "Inter", color: "#FFF" }}>
    <Photo src="p_concert.jpg" style={{ width: 1080, height: 1920, scale: String(1.05 + 0.05 * t) }} pos="40% 50%" />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.7))" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 820, textAlign: "center", fontFamily: BG, fontWeight: 800, fontSize: 104, lineHeight: 1, letterSpacing: "-0.03em", textShadow: "0 6px 30px rgba(0,0,0,0.5)" }}>
      malam ini
      <br />
      <span style={{ color: "#C8FF4D" }}>kita bernyanyi</span>
    </div>
    <div style={{ position: "absolute", right: 36, bottom: 360, display: "flex", flexDirection: "column", gap: 46, alignItems: "center", fontSize: 30, fontWeight: 600 }}>
      {["♥ 12,4rb", "◯ 318", "➢ 2,1rb"].map((x) => (
        <div key={x} style={{ textAlign: "center" }}>{x}</div>
      ))}
    </div>
    <div style={{ position: "absolute", left: 40, bottom: 140, right: 200, fontSize: 32, lineHeight: 1.35 }}>
      <b>suaramalam.fest</b> · Recap malam pertama. Sampai jumpa 12.12 🎤
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 80, height: 6, background: "rgba(255,255,255,0.3)" }}>
      <div style={{ width: `${t * 100}%`, height: 6, background: "#FFF" }} />
    </div>
  </div>
);

// ---------------------------------------------------------------- 8. CV (A4 1240×1754)
export const CVDoc: React.FC = () => {
  const L: React.FC<{ w: number }> = ({ w }) => <div style={{ height: 14, width: `${w}%`, borderRadius: 7, background: "#E7E7E4", marginTop: 14 }} />;
  return (
    <div style={{ width: 1240, height: 1754, background: "#FFF", fontFamily: DM, color: "#111", padding: 110, boxSizing: "border-box" }}>
      <div style={{ display: "flex", gap: 44, alignItems: "center" }}>
        <Photo src="p_portrait.jpg" style={{ width: 200, height: 200, borderRadius: 100 }} pos="50% 30%" />
        <div>
          <div style={{ fontFamily: IS, fontSize: 104, lineHeight: 1, letterSpacing: "-0.02em" }}>Nadia Putri</div>
          <div style={{ fontSize: 34, color: "#2563EB", marginTop: 10, fontWeight: 500 }}>Product Designer</div>
          <div style={{ fontSize: 24, color: "#777", marginTop: 10 }}>Denpasar · nadia@putri.design · nadia.design</div>
        </div>
      </div>
      {[
        ["Pengalaman", ["Senior Product Designer — Traveloka", "2023 – sekarang"], ["Product Designer — Gojek", "2020 – 2023"]],
        ["Pendidikan", ["S1 Desain Komunikasi Visual — ITB", "2016 – 2020"]],
      ].map(([h, ...rows]) => (
        <div key={h as string} style={{ marginTop: 90 }}>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "0.12em", color: "#999" }}>{(h as string).toUpperCase()}</div>
          {(rows as string[][]).map(([a, b]) => (
            <div key={a} style={{ marginTop: 34 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 500 }}>
                <span>{a}</span>
                <span style={{ color: "#999", fontWeight: 400 }}>{b}</span>
              </div>
              <L w={92} />
              <L w={78} />
            </div>
          ))}
        </div>
      ))}
      <div style={{ marginTop: 90, fontSize: 24, fontWeight: 700, letterSpacing: "0.12em", color: "#999" }}>KEAHLIAN</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 28 }}>
        {["Figma", "Riset pengguna", "Design system", "Prototyping", "UX writing", "Framer"].map((s) => (
          <span key={s} style={{ padding: "12px 24px", borderRadius: 999, background: "#F1F4FD", color: "#1D4ED8", fontSize: 26 }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- 9. Business plan (A4 1240×1754)
export const PlanDoc: React.FC = () => (
  <div style={{ width: 1240, height: 1754, background: "#FFFDF8", fontFamily: DM, color: "#151515", padding: 110, boxSizing: "border-box" }}>
    <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "0.12em", color: "#B4562B" }}>RENCANA BISNIS</div>
    <div style={{ fontFamily: FR, fontWeight: 600, fontSize: 96, lineHeight: 1, letterSpacing: "-0.03em", marginTop: 18 }}>Kopi Keliling Renon</div>
    <div style={{ fontSize: 30, color: "#666", marginTop: 20 }}>Gerobak kopi susu untuk pekerja kantor, modal kecil, balik modal &lt; 4 bulan.</div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginTop: 70 }}>
      {[
        ["Modal awal", "Rp 7,5 jt"],
        ["Target / hari", "80 cup"],
        ["Balik modal", "3,5 bln"],
      ].map(([a, b]) => (
        <div key={a} style={{ background: "#F3ECE0", borderRadius: 24, padding: "30px 30px" }}>
          <div style={{ fontSize: 24, color: "#7A6553" }}>{a}</div>
          <div style={{ fontFamily: FR, fontSize: 52, fontWeight: 600, marginTop: 8 }}>{b}</div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: 80, fontSize: 24, fontWeight: 700, letterSpacing: "0.12em", color: "#999" }}>PROYEKSI PENDAPATAN</div>
    <svg width="1020" height="380" style={{ marginTop: 30 }} aria-hidden="true">
      <path d="M0 340 C 200 320, 330 270, 480 220 S 800 90, 1020 40" fill="none" stroke="#B4562B" strokeWidth="6" />
      <path d="M0 340 C 200 320, 330 270, 480 220 S 800 90, 1020 40 L1020 380 L0 380Z" fill="rgba(180,86,43,0.08)" />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="0" x2="1020" y1={40 + i * 100} y2={40 + i * 100} stroke="#E8E2D8" strokeWidth="2" />
      ))}
    </svg>
    <div style={{ marginTop: 60, fontSize: 24, fontWeight: 700, letterSpacing: "0.12em", color: "#999" }}>LANGKAH PERTAMA</div>
    {["Sewa gerobak & mesin espresso bekas", "Uji 3 menu di depan kantor Renon", "Buka pre-order lewat WhatsApp"].map((s, i) => (
      <div key={s} style={{ display: "flex", gap: 22, alignItems: "center", marginTop: 26, fontSize: 32 }}>
        <span style={{ width: 52, height: 52, borderRadius: 26, background: "#151515", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{i + 1}</span>
        {s}
      </div>
    ))}
  </div>
);

// ---------------------------------------------------------------- 10. Caption doc (900×1100)
export const CaptionDoc: React.FC = () => (
  <div style={{ width: 900, height: 1100, background: "#FFF", fontFamily: "Inter", color: "#141413", padding: 70, boxSizing: "border-box" }}>
    <div style={{ fontSize: 22, color: "#73726C" }}>Caption launching · 3 opsi</div>
    {[
      ["Opsi 1 · Hangat", "Akhirnya buka juga. Satu tahun sangrai di garasi, sekarang kamu bisa duduk di sini. Sampai ketemu Sabtu ☕"],
      ["Opsi 2 · Singkat", "Kedai baru. Kopi lama yang kamu suka. Buka Sabtu, 07.00."],
      ["Opsi 3 · Ajakan", "Datang Sabtu, kopi pertama gratis untuk 100 orang pertama. Tag teman yang selalu telat bangun."],
    ].map(([h, b], i) => (
      <div key={h} style={{ marginTop: 44, padding: "30px 34px", borderRadius: 22, background: i === 0 ? "#F4F1EA" : "#FAF9F5", border: i === 0 ? "2px solid #C6613F" : "1px solid #ECEAE3" }}>
        <div style={{ fontSize: 22, fontWeight: 600, color: i === 0 ? "#C6613F" : "#73726C" }}>{h}</div>
        <div style={{ fontFamily: "Source Serif 4", fontSize: 32, lineHeight: 1.45, marginTop: 12 }}>{b}</div>
      </div>
    ))}
  </div>
);

// ---------------------------------------------------------------- 11. The generic "AI look" (portrait 900×1200)
// Used for "semua karya mulai terlihat sama": every card converges into this same template.
export const GenericAI: React.FC = () => (
  <div style={{ width: 900, height: 1200, position: "relative", overflow: "hidden", background: "radial-gradient(120% 90% at 30% 20%, #7C5CFF 0%, #4F46E5 40%, #1E1B4B 100%)", fontFamily: "Inter", color: "#FFF", textAlign: "center" }}>
    <div style={{ position: "absolute", left: 230, top: 170, width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #FFFFFF 0%, #C4B5FD 18%, #8B5CF6 45%, #4C1D95 80%)", boxShadow: "0 60px 120px rgba(124,92,255,0.6)" }} />
    <div style={{ position: "absolute", left: 60, right: 60, top: 700, fontSize: 84, fontWeight: 600, lineHeight: 1.02, letterSpacing: "-0.03em" }}>Unlock Your Potential</div>
    <div style={{ position: "absolute", left: 120, right: 120, top: 900, fontSize: 30, opacity: 0.8, lineHeight: 1.4 }}>Elevate your experience with innovative solutions.</div>
    <div style={{ position: "absolute", left: 300, right: 300, top: 1030, height: 74, borderRadius: 37, background: "#FFF", color: "#4F46E5", fontSize: 28, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>Get Started</div>
  </div>
);

export const DESIGNS: { id: string; nw: number; nh: number; C: React.FC }[] = [
  { id: "landing", nw: 1440, nh: 900, C: KopiLanding },
  { id: "app", nw: 390, nh: 844, C: RunApp },
  { id: "poster", nw: 900, nh: 1200, C: Poster },
  { id: "ig", nw: 1080, nh: 1350, C: IGPost },
  { id: "deck", nw: 1600, nh: 900, C: DeckSlide },
  { id: "store", nw: 1440, nh: 900, C: StorePage },
  { id: "reel", nw: 1080, nh: 1920, C: Reel },
  { id: "cv", nw: 1240, nh: 1754, C: CVDoc },
  { id: "plan", nw: 1240, nh: 1754, C: PlanDoc },
  { id: "caption", nw: 900, nh: 1100, C: CaptionDoc },
  { id: "generic", nw: 900, nh: 1200, C: GenericAI },
];

/** QA board: every design at a glance (composition "Board"). */
export const Board: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: "#E9E9E6", display: "flex", flexWrap: "wrap", gap: 24, padding: 24, alignContent: "flex-start" }}>
    {DESIGNS.map((d) => {
      const h = 330;
      const w = Math.round((h * d.nw) / d.nh);
      return (
        <Fit key={d.id} w={w} h={h} nw={d.nw} nh={d.nh} radius={10} shadow>
          <d.C />
        </Fit>
      );
    })}
  </div>
);

/** "ribuan": a dense wall of real outputs, rendered once to assets/wall.png and tiled in S4. */
export const Wall: React.FC = () => {
  const ids = ["landing", "poster", "app", "deck", "ig", "store", "reel", "plan", "cv", "caption"];
  const cols = 12;
  const rows = 9;
  const w = 150;
  const h = 110;
  return (
    <div style={{ position: "absolute", inset: 0, background: "#0A0A0A" }}>
      {Array.from({ length: cols * rows }, (_, i) => {
        const d = DESIGNS.find((x) => x.id === ids[Math.floor(((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1 * ids.length)])!;
        return (
          <div key={i} style={{ position: "absolute", left: (i % cols) * (w + 10) + 5, top: Math.floor(i / cols) * (h + 10) + 5 }}>
            <Fit w={w} h={h} nw={d.nw} nh={d.nh} radius={8}>
              <d.C />
            </Fit>
          </div>
        );
      })}
    </div>
  );
};
