export const W = 1920;
export const H = 1080;
export const FPS = 30;

export const C = {
  black: '#0A0A0A',
  paper: '#F6F5F2',
  ink: '#111111',
  inkSoft: 'rgba(17,17,17,0.42)',
  white: '#FFFFFF',
  whiteDim: 'rgba(255,255,255,0.46)',
  blue: '#2563EB', // hanya di latar terang
  line: 'rgba(17,17,17,0.10)',
};

export const F = {
  sans: '"Inter", system-ui, sans-serif',
  serif: '"Instrument Serif", Georgia, serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
  claude: '"Source Serif 4", Georgia, serif',
};

// easing kurva yang terbukti (smooth-motion.md §6)
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN = [0.7, 0, 0.84, 0] as const;
export const EASE_INOUT = [0.65, 0, 0.35, 1] as const;
