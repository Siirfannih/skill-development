// DIHASILKAN oleh simpan_preset.py --bangun dari presets/*.json; jangan disunting (sunting JSON-nya).
export const PRESETS = {
  "editorial-polos": {
    "komponen": "lightwave",
    "catatan": "Nyaris polos: gelombang dimatikan, hanya grain halus supaya tidak banding. Untuk referensi bergaya editorial/datar.",
    "params": {
      "colors": [
        "#F3F0E8",
        "#ECE7DB"
      ],
      "mode": "light",
      "glow": {
        "x": 0.5,
        "y": 0.4,
        "r": 0.8,
        "strength": 0.15
      },
      "dir": 90,
      "waveSpeed": 0,
      "amp": 0.1,
      "grain": 0.02,
      "seed": 1,
      "intensity": 1,
      "saturation": 1
    },
    "varian": {
      "dark": {
        "colors": [
          "#141414",
          "#1C1C1C"
        ]
      }
    }
  },
  "hangat-netral": {
    "komponen": "lightwave",
    "catatan": "Netral hangat: cokelat-abu gelap dengan cahaya lembut dari kiri bawah.",
    "params": {
      "colors": [
        "#1A1614",
        "#4A3A32",
        "#D9B99B"
      ],
      "mode": "dark",
      "glow": {
        "x": 0.2,
        "y": 0.8,
        "r": 0.55,
        "strength": 0.7
      },
      "dir": 215,
      "waveSpeed": 0.3,
      "amp": 0.8,
      "grain": 0.025,
      "seed": 5,
      "intensity": 1,
      "saturation": 1
    },
    "varian": {
      "light": {
        "colors": [
          "#F6EFE6",
          "#E6D3BF",
          "#FFFFFF"
        ]
      }
    }
  },
  "researchly-glow": {
    "komponen": "lightwave",
    "catatan": "Biru dalam dengan pita cahaya dan glow di kanan atas. Varian light: dasar putih kebiruan.",
    "params": {
      "colors": [
        "#060B1F",
        "#1B3FD6",
        "#8FB0FF"
      ],
      "mode": "dark",
      "glow": {
        "x": 0.72,
        "y": 0.28,
        "r": 0.5,
        "strength": 0.85
      },
      "dir": 35,
      "waveSpeed": 0.4,
      "amp": 1,
      "grain": 0.025,
      "seed": 3,
      "intensity": 1,
      "saturation": 1
    },
    "varian": {
      "light": {
        "colors": [
          "#EEF3FF",
          "#A9C0FF",
          "#FFFFFF"
        ],
        "glow": {
          "x": 0.72,
          "y": 0.28,
          "r": 0.55,
          "strength": 0.9
        },
        "grain": 0.02
      }
    }
  },
  "zona-lembut": {
    "komponen": "generative",
    "catatan": "Satu zona cahaya lembut (GenerativeBG, CSS ringan) di atas dasar gelap; pengganti ringan bila WebGL tidak perlu.",
    "params": {
      "mode": "zona",
      "colors": [
        "#2A52E0"
      ],
      "base": "#080C1E",
      "zones": [
        {
          "x": 0.7,
          "y": 0.3,
          "r": 0.65,
          "strength": 0.9
        }
      ],
      "intensity": 1,
      "saturation": 1,
      "seed": 1,
      "drift": 0.3,
      "driftAmp": 0.03
    }
  }
};
