// DIHASILKAN oleh simpan_preset.py --bangun dari presets/*.json; jangan disunting (sunting JSON-nya).
export const PRESETS = {
  "editorial-polos": {
    "komponen": "lightwave",
    "catatan": "Nyaris polos: satu ekor cahaya sangat tipis dari tepi atas (pusat di luar frame) di atas warna dasar; hanya grain halus supaya tidak banding. Untuk referensi bergaya editorial/datar. Dasar bawaan: terang #F8FAFC, gelap #03050C.",
    "params": {
      "colors": [
        "#F8FAFC",
        "#E8EEF9"
      ],
      "mode": "light",
      "glow": {
        "x": 0.5,
        "y": -0.45,
        "r": 2.2,
        "strength": 0.6,
        "ratio": 0.5
      },
      "dir": 90,
      "waveSpeed": 0.15,
      "amp": 0.5,
      "grain": 0.015,
      "seed": 1,
      "intensity": 1,
      "saturation": 1
    },
    "varian": {
      "light": {},
      "dark": {
        "colors": [
          "#03050C",
          "#0E1426"
        ],
        "mode": "dark"
      }
    }
  },
  "hangat-netral": {
    "komponen": "lightwave",
    "catatan": "Netral hangat: dasar cokelat-abu gelap, satu elips cahaya hangat berpusat di luar kiri bawah, sapuan dari kiri bawah; hanya ekornya masuk.",
    "params": {
      "colors": [
        "#110D0B",
        "#4A3A32",
        "#D9B99B"
      ],
      "mode": "dark",
      "glow": {
        "x": -0.22,
        "y": 1.18,
        "r": 2.0,
        "strength": 0.9,
        "ratio": 0.45
      },
      "dir": 215,
      "waveSpeed": 0.45,
      "amp": 1.3,
      "grain": 0.015,
      "seed": 5,
      "intensity": 1,
      "saturation": 1
    },
    "varian": {
      "dark": {},
      "light": {
        "colors": [
          "#FAF7F2",
          "#EAC49A",
          "#DC9560"
        ],
        "mode": "light"
      }
    }
  },
  "researchly-glow": {
    "komponen": "lightwave",
    "catatan": "Gelap hampir hitam; satu elips cahaya biru raksasa berpusat di luar kanan-atas, hanya ekornya masuk, sapuan dari kanan atas. Varian light: dasar putih kebiruan, ekor periwinkle naik dari tepi bawah (seperti still Researchly). Dasar navy jenuh lewat prop base bila REF-SPEC meminta.",
    "params": {
      "colors": [
        "#03050C",
        "#1B3FD6",
        "#8FB0FF"
      ],
      "mode": "dark",
      "glow": {
        "x": 1.25,
        "y": -0.1,
        "r": 1.9,
        "strength": 0.95,
        "ratio": 0.45
      },
      "glow2": {
        "x": -0.25,
        "y": 1.2,
        "r": 1.3,
        "strength": 0.45,
        "ratio": 0.45
      },
      "dir": 40,
      "waveSpeed": 0.4,
      "amp": 1,
      "grain": 0.015,
      "seed": 3,
      "intensity": 1,
      "saturation": 1
    },
    "varian": {
      "dark": {},
      "light": {
        "colors": [
          "#F8FAFC",
          "#B3C3FF",
          "#8EA6FF"
        ],
        "mode": "light",
        "glow": {
          "x": 0.62,
          "y": 1.3,
          "r": 2.0,
          "strength": 0.95,
          "ratio": 0.5
        },
        "glow2": null,
        "dir": 275
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
