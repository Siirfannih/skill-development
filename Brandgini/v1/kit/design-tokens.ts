// Single Source of Truth — Soalnya Gini Dual-Style Design Tokens
// Import file ini di semua Scene.tsx; dilarang hardcode warna atau safe-zone di level episode.

export const CANVAS = {
  width: 1080,
  height: 1920,
  fps: 30,
  safeZone: {
    top: 250,      // Hindari header UI Shorts/Reels
    bottom: 400,   // Hindari caption/desk & tombol bawah
    left: 64,
    right: 64,
    captionYMin: 1250,
    captionYMax: 1450,
  },
} as const;

export const BRAND_TOKENS = {
  channelName: "Soalnya Gini",
  handle: "@soalnyagini",
  accentBlue: "#2D6BFF",
  ink: "#1B2330",
  muted: "#6B7684",
  mist: "#E9EDF2",
  white: "#FFFFFF",
  mascotGini: {
    cardboardBody: "#C99A5B",
    outlineAndEyes: "#1B2330",
    tapeAccent: "#2D6BFF",
  },
  fonts: {
    primary: "'Plus Jakarta Sans', sans-serif",
    editorialSerif: "'Instrument Serif', Georgia, serif",
    condensedImpact: "'Oswald', 'Anton', sans-serif",
    monoStamp: "'JetBrains Mono', monospace",
  },
  typeScale: {
    label: 40,
    subhead: 56,
    caption: 80,
    heroCap: 120,
  },
  openingCaps: ["Kalau…", "Kenapa…", "Katanya…"] as const,
} as const;

// Style A: Einstein Editorial / Surreal Collage (ekstraksi dari editing.mp4)
export const STYLE_A_EINSTEIN = {
  id: "STYLE_A_EINSTEIN",
  backdrop: {
    centerSpotlight: "#F2F4FF",
    midPeriwinkle: "#9AA0EE",
    edgeIndigo: "#6E74DC",
    halftoneOpacity: 0.14,
    grainOpacity: 0.05,
  },
  colors: {
    headlineNavy: "#1B1E59",
    connectorInk: "#2B2F6C",
    accentBlue: "#2D6BFF",
    orbitDashWhite: "#FFFFFF",
    shadowRgba: "rgba(27, 30, 89, 0.28)",
  },
  motion: {
    popFrames: 7,
    orbitDrawFrames: 16,
    floatAmplitudePx: 6,
    floatPeriodFrames: 90,
    bezierSnap: [0.22, 1, 0.36, 1] as const,
  },
} as const;

// Style B: Vox Investigative Documentary / Tactile Archive (ekstraksi dari vox.mp4 & vox2.mp4)
export const STYLE_B_VOX = {
  id: "STYLE_B_VOX",
  surfaces: {
    blueprintBg: "#1D3C6B",
    blueprintGridLine: "rgba(255, 255, 255, 0.16)",
    archivePaper: "#E8E6DF",
    darkCharcoal: "#15171A",
    woodDark: "#241914",
  },
  colors: {
    highlighterYellow: "#E8C547",
    markerRed: "#D6202B",
    tapeRed: "rgba(214, 32, 43, 0.84)",
    accentBlue: "#2D6BFF",
    textLight: "#F7F6F2",
    textDark: "#14161A",
  },
  motion: {
    pushInScaleEnd: 1.07,
    highlighterSweepFrames: 10,
    redCircleDrawFrames: 14,
    polaroidSpring: { damping: 14, stiffness: 180 },
    whipPanFrames: 7,
    grainOpacity: 0.06,
  },
} as const;

export const BANNED_SFX_KEYWORDS = [
  "wood",
  "kayu",
  "plank",
  "knock",
  "bamboo",
  "marimba",
  "xylophone",
] as const;
