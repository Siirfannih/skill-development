// DIHASILKAN oleh simpan_preset.py --bangun dari presets/*.json; jangan disunting (sunting JSON-nya).
export const PRESETS = {
  "editorial-polos": {
    "komponen": "lightwave",
    "catatan": "Nyaris polos: core sangat tipis dari tepi atas (pusat di luar frame) dan ambient hampir tak terlihat di atas warna dasar; untuk referensi editorial/datar. Dasar bawaan: terang #F8FAFC, gelap #03050C.",
    "params": {
      "colors": [
        "#F8FAFC",
        "#EAF0FA",
        "#DCE6F8"
      ],
      "mode": "light",
      "core": {
        "x": 0.5,
        "y": -0.3,
        "radius": 1.1,
        "ratio": 0.5,
        "intensity": 0.35
      },
      "ambient": {
        "x": 0.5,
        "y": 0.5,
        "width": 1.8,
        "ratio": 0.6,
        "angle": 0,
        "intensity": 0.25
      },
      "waveSpeed": 0.5,
      "drift": 0.6,
      "grain": 0.015,
      "intensity": 1,
      "saturation": 1
    },
    "varian": {
      "light": {},
      "dark": {
        "colors": [
          "#03050C",
          "#0E1426",
          "#1B2748"
        ],
        "mode": "dark"
      }
    }
  },
  "hangat-netral": {
    "komponen": "lightwave",
    "catatan": "Netral hangat: dasar cokelat-abu gelap, core hangat berpusat di luar kiri bawah, ambient hangat miring melintasi tengah.",
    "params": {
      "colors": [
        "#110D0B",
        "#2A201B",
        "#8A6246"
      ],
      "mode": "dark",
      "core": {
        "x": -0.15,
        "y": 0.95,
        "radius": 1.0,
        "ratio": 0.6,
        "intensity": 0.6
      },
      "ambient": {
        "x": 0.35,
        "y": 0.6,
        "width": 1.5,
        "ratio": 0.6,
        "angle": -20,
        "intensity": 0.4
      },
      "waveSpeed": 0.8,
      "drift": 1,
      "grain": 0.015,
      "intensity": 1,
      "saturation": 1
    },
    "varian": {
      "dark": {},
      "light": {
        "colors": [
          "#FAF7F2",
          "#F0E2D0",
          "#E2B88C"
        ],
        "mode": "light"
      }
    }
  },
  "researchly-glow": {
    "komponen": "lightwave",
    "catatan": "Patokan Irfan apa adanya (patokan-irfan.glsl): ambient wash lebar + core biru di luar kanan-atas (pusat x 1.05), falloff Gaussian. colors = [dasar, ambient, core]. Varian light = warna terang dari komentar uniform patokan.",
    "params": {
      "colors": [
        "#03050C",
        "#0E256B",
        "#2563EB"
      ],
      "mode": "dark",
      "core": {
        "x": 1.05,
        "y": 0.15,
        "radius": 0.95,
        "ratio": 0.6316,
        "intensity": 0.75
      },
      "ambient": {
        "x": 0.75,
        "y": 0.4,
        "width": 1.35,
        "ratio": 0.7037,
        "angle": 0,
        "intensity": 0.55
      },
      "waveSpeed": 1,
      "drift": 1,
      "grain": 0.02,
      "intensity": 1,
      "saturation": 1
    },
    "varian": {
      "dark": {},
      "light": {
        "colors": [
          "#F8FAFC",
          "#D1DFFA",
          "#94B8FC"
        ],
        "mode": "light"
      }
    }
  },
  "zona-lembut": {
    "komponen": "generative",
    "catatan": "Satu zona cahaya lembut (GenerativeBG, CSS ringan) berpusat di luar tepi kanan di atas dasar gelap; pengganti ringan bila WebGL tidak perlu.",
    "params": {
      "mode": "zona",
      "colors": [
        "#2A52E0"
      ],
      "base": "#03050C",
      "zones": [
        {
          "x": 1.2,
          "y": 0.2,
          "r": 0.5,
          "strength": 0.9
        }
      ],
      "intensity": 1,
      "saturation": 1,
      "seed": 1,
      "drift": 0.3,
      "driftAmp": 0.02
    }
  }
};
