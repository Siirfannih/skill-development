#!/usr/bin/env python3
"""Mix Fore: lagu (potongan 26,17→100,8) + bed ambience + SFX per gerak.
Standar Irfan: SFX hangat (LPF 6 kHz, HPF 40 Hz), tiap SFX terikat ke visual, tanpa tumpukan,
lagu tanpa lubang. Output: video/public/audio/mix.wav, stem_sfx.wav, render/cues.json
"""
import json, os, sys
import numpy as np, soundfile as sf, pyloudnorm as pyln
from scipy.signal import butter, sosfilt
import subprocess

SR = 48000
ROOT = "/home/claude/fore"
SFX = f"{ROOT}/sfx"
OUT = f"{ROOT}/video/public/audio"
DUR = 74.58

def load(name):
    for ext in (".mp3", ".wav"):
        p = os.path.join(SFX, name + ext)
        if os.path.exists(p):
            raw = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True).stdout
            return np.frombuffer(raw, dtype=np.float32).reshape(-1, 2).copy()
    print("MISSING", name); return None

def filt(x, lo=None, hi=None):
    if lo: x = sosfilt(butter(2, lo, "hp", fs=SR, output="sos"), x, axis=0)
    if hi: x = sosfilt(butter(4, hi, "lp", fs=SR, output="sos"), x, axis=0)
    return x

SUBONLY = {'bubble_pop', 'buzz', 'thud_0', 'thud_1', 'heartbeat_0', 'steps', 'gasp'}
LPF = {'paper': 2800, 'tissue': 2800, 'curtain': 3000, 'door': 4500, 'spill': 4500}

def db(v): return 10 ** (v / 20)

def norm_peak(x, peak_db=-1.0):
    m = np.abs(x).max() + 1e-9
    return x / m * db(peak_db)

# ---- cue sheet (detik video, nama, dB relatif, catatan visual) ----
CUES = [
    (0.78, "phone_tap", -22, "S01 tap story 2"),
    (1.56, "phone_tap", -22, "S01 tap story 3"),
    (4.60, "bubble_form", -15, "S03 tetes embun jadi gelembung"),
    (5.45, "glide_0", -20, "S03 mendarat di dunia bayangan"),
    (6.00, "curtain", -19, "S04 tirai dibuka"),
    (9.20, "blanket", -19, "S04 merapikan selimut"),
    (19.0, "swell_0", -24, "S05 siluet muncul"),
    (22.2, "heartbeat_0", -27, "S06 telentang, mata terbuka"),
    (24.40, "swell_1", -20, "S07 langit-langit larut ke ruang bayangan"),
    (27.05, "writing", -25, "S08 daftar resolusi tertulis"),
    (43.06, "thud_0", -19, "S10 kamera putus ke wide, ia tertinggal"),
    (45.10, "buzz", -17, "S11 notifikasi grup"),
    (45.90, "v17_typing_0", -23, "S11 mengetik 'aku...'"),
    (46.90, "v17_typing_1", -25, "S11 menghapus"),
    (47.62, "thock_1", -17, "S11 HP ditelungkupkan"),
    (48.25, "door", -18, "S12 gagang pintu"),
    (49.30, "steps", -21, "S12 melangkah keluar"),
    (51.60, "cupdown", -21, "S13 gelas diserahkan"),
    (54.50, "cupdown", -23, "S14 gelas di meja pojok"),
    (59.00, "heartbeat_0", -23, "S15 siluet merapat"),
    (60.40, "heartbeat_0", -21, "S15 siluet merapat"),
    (62.30, "thud_1", -14, "S16 meja disenggol"),
    (62.75, "bubble_pop", -13, "S16 gelembung pecah"),
    (62.75, "v17_shutter_0", -24, "S16 flash negatif 1 f"),
    (62.85, "spill", -15, "S16 gelas tumpah"),
    (63.60, "gasp", -21, "S17 perempuan kaget"),
    (64.10, "tissue", -21, "S17 tisu"),
    (65.20, "chairs_laugh", -23, "S18 tertawa"),
    (68.70, "pen", -17, "S20 coret baris (pria)"),
    (68.83, "pen", -19, "S20 coret baris (perempuan)"),
    (70.20, "chairs_laugh", -19, "S21 bangku ramai"),
    (72.20, "writing", -21, "S22 tagline ditulis"),
]
# lembar kalender S09: tiap 2 lembar
per = int((39.56 - 33.06 - 1.0) * 24 / 12) / 24
for i in range(0, 12, 2):
    CUES.append((33.06 + i * per + 0.05, "paper", -24, f"S09 lembar {i+1}"))
# potongan rutinitas S05 (setiap cut kedua, thock pelan)
for k in range(0, 9, 2):
    CUES.append((15.0 + k * 19 / 24, ["thock_0", "thock_2"][k // 2 % 2], -27, f"S05 cut {k}"))

BEDS = [  # (nama, mulai, selesai, dB, fade_in, fade_out)
    ("amb_cafe", 0.0, 4.9, -27, 0.05, 0.4),
    ("amb_dream", 4.6, 63.2, -31, 0.6, 0.3),
    ("amb_room", 5.6, 15.0, -30, 0.4, 0.6),
    ("whispers", 19.0, 22.0, -31, 0.8, 0.6),
    ("whispers", 24.4, 26.9, -30, 0.6, 0.6),
    ("whispers", 57.2, 62.3, -26, 1.5, 0.05),
    ("amb_cafe", 63.46, DUR, -24, 0.05, 1.2),
]

def place(bus, x, t, gain_db):
    i = int(t * SR)
    if i >= len(bus): return
    n = min(len(x), len(bus) - i)
    bus[i:i + n] += x[:n] * db(gain_db)

def bed(x, length):
    if len(x) >= length: return x[:length]
    # loop dengan crossfade 0,5 dtk
    xf = int(0.5 * SR); out = x.copy()
    while len(out) < length:
        a, b = out[-xf:], x[:xf]
        r = np.linspace(0, 1, xf)[:, None]
        out = np.concatenate([out[:-xf], a * (1 - r) + b * r, x[xf:]])
    return out[:length]

def main():
    n = int(DUR * SR)
    song = load("../video/public/audio/song") if False else None
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", f"{OUT}/song.wav", "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True).stdout
    song = np.frombuffer(raw, dtype=np.float32).reshape(-1, 2)[:n].copy()
    sfx = np.zeros((n, 2), np.float32)
    used = []
    for (name, s, e, g, fi, fo) in BEDS:
        x = load(name)
        if x is None: continue
        x = norm_peak(filt(x, 40, 6000), -3)
        L = int((e - s) * SR); y = bed(x, L)
        env = np.ones(L); a, b = int(fi * SR), int(fo * SR)
        if a: env[:a] = np.linspace(0, 1, a)
        if b: env[-b:] = np.linspace(1, 0, b)
        place(sfx, y * env[:, None], s, g)
        used.append({"t": s, "end": e, "kind": "bed", "name": name, "db": g})
    cues = sorted(CUES)
    PRIMARY = {"bubble_form","glide_0","curtain","blanket","door","buzz","thock_1","thud_0","thud_1","bubble_pop","spill","pen","writing","chairs_laugh","gasp","tissue","heartbeat_0","swell_1"}
    duck = np.ones(n, np.float32)
    for (t, name, g, note) in cues:
        x = load(name)
        if x is None: continue
        x = norm_peak(filt(x, 40, LPF.get(name, 6000)), -1)
        if name in SUBONLY:   # HP tidak memutar < 300 Hz: tambah lapisan harmonik 250–1.400 Hz (aturan 35)
            h = filt(np.tanh(x * 5.0), 250, 1400)
            x = norm_peak(x + norm_peak(h, -1) * 0.45, -1)
        near = [u for u in used if u.get("kind") == "sfx" and abs(u["t"] - t) < 0.1]
        if len(near) >= 2: print("skip (padat)", t, name); continue
        # level otomatis: SFX harus terdengar di atas lagu (aturan 30), target relatif per kelas
        i = int(t * SR); L = min(len(x), int(0.35 * SR), n - i)
        rs = np.sqrt((song[i:i + L] ** 2).mean() + 1e-12)
        rx = np.sqrt((x[:L] ** 2).mean() + 1e-12)
        target = -9 if name in PRIMARY else -14
        gain = target + 20 * np.log10(rs / rx)
        gain = float(np.clip(gain, g, g + 24))
        place(sfx, x, t, gain)
        if name in PRIMARY:   # turunkan lagu maks 1,5 dB di sekitar SFX utama (tidak memompa)
            a0, a1 = max(0, i - int(0.03 * SR)), min(n, i + int(0.45 * SR))
            duck[a0:a1] = np.minimum(duck[a0:a1], db(-1.5))
        used.append({"t": round(t, 3), "kind": "sfx", "name": name, "db": round(gain, 1), "visual": note})
    # haluskan envelope duck
    k = int(0.12 * SR); ker = np.ones(k) / k
    duck = np.convolve(duck, ker, mode="same").astype(np.float32)
    song = song * duck[:, None]
    pk_sfx = np.abs(sfx).max()
    mix = song * db(-1.0) + sfx
    meter = pyln.Meter(SR)
    lufs = meter.integrated_loudness(mix)
    mix = mix * db(-14 - lufs)
    # limiter (bukan skala turun) supaya loudness tetap -14 LUFS dan puncak <= -1,5 dBTP
    ceil = db(-1.5)
    env = np.abs(mix).max(axis=1)
    w = int(0.005 * SR)
    env = np.maximum.reduce([np.roll(env, k) for k in range(-w, w + 1, max(1, w // 4))])
    g = np.minimum(1.0, ceil / np.maximum(env, 1e-9))
    rel = int(0.08 * SR); ker = np.exp(-np.arange(rel) / (rel / 4)); ker /= ker.sum()
    g = np.minimum(g, np.convolve(g, ker, mode="same"))
    mix = mix * g[:, None]
    mix = np.clip(mix, -ceil, ceil)
    os.makedirs(OUT, exist_ok=True)
    sf.write(f"{OUT}/mix.wav", mix, SR, subtype="PCM_16")
    sf.write(f"{OUT}/stem_sfx.wav", sfx * db(-14 - lufs), SR, subtype="PCM_16")
    os.makedirs(f"{ROOT}/render", exist_ok=True)
    json.dump(used, open(f"{ROOT}/render/cues.json", "w"), indent=1)
    print(f"mix -> {OUT}/mix.wav  LUFS before {lufs:.1f} -> -14, cues {len(used)}")

if __name__ == "__main__":
    main()
