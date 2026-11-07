# Mix audio Jadisatu #2: dialog (VO + klip Irfan) + musik ber-envelope + SFX. Waktu = detik video (animatic + OFF).
import subprocess, numpy as np, soundfile as sf
SR = 48000; OFF = 0.6; TOTAL = 2621 / 30
def load(p):
    d = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(d, np.float32).reshape(-1, 2).copy()
N = int(TOTAL * SR); out = np.zeros((N, 2), np.float32)
def place(x, t, g=1.0):
    i = int(t * SR); j = min(N, i + len(x)); out[i:j] += x[: j - i] * g
dialog = load("../vo/v2/animatic.wav"); place(dialog, OFF)
# --- musik dengan envelope (titik waktu, gain); antar titik linear, perubahan "hard" pakai dua titik berdekatan
music = load("music_groove.mp3")
A = lambda s: s + OFF
env = [(0, 0), (0.42, 0), (0.45, 0.20), (1.2, 0.13),
       (5.95, 0.13), (5.96, 0), (6.76, 0), (6.86, 0.12),
       (18.09, 0.12), (18.35, 0), (A(21.75), 0), (A(21.8), 0.12),
       (A(48.7), 0.12), (A(48.8), 0.06), (A(51.3), 0.06), (A(51.5), 0.12),
       (A(59.68), 0.12), (A(59.685), 0), (A(60.485), 0), (A(60.55), 0.13), (A(65.4), 0.18), (A(65.45), 0.22),
       (A(66.4), 0.15), (A(78.9), 0.15), (A(79.0), 0), (A(84.45), 0), (A(84.5), 0.32), (TOTAL - 0.6, 0.32), (TOTAL, 0)]
t = np.arange(len(music)) / SR
g = np.interp(t, [p[0] for p in env], [p[1] for p in env]).astype(np.float32)
place(music * g[:, None], 0)
# --- SFX: (file, detik video, gain)
S = lambda f: load(f"sfx/{f}.mp3")
cues = [("switch", 0.40, 0.5), ("shutter", A(1.1), 0.35), ("ui_pop", A(2.4), 0.3),
        ("key_clack", A(5.36), 0.6), ("whoosh", A(6.31), 0.3), ("whoosh", A(11.875), 0.3),
        ("tape_stop", A(17.45), 0.45), ("ui_pop", A(18.85), 0.28), ("ui_pop", A(19.15), 0.3), ("ui_pop", A(19.45), 0.32),
        ("whoosh", A(21.75), 0.3), ("typing", A(27.95), 0.3), ("mouse_click", A(30.3), 0.4), ("whoosh", A(30.35), 0.3),
        ("ui_pop", A(30.6), 0.35), ("ui_pop", A(32.1), 0.4),
        ("mouse_click", A(32.4), 0.35), ("ui_pop", A(33.1), 0.3), ("key_clack", A(33.7), 0.4),
        ("ui_pop", A(35.2), 0.3), ("ui_pop", A(36.6), 0.3), ("ui_pop", A(37.8), 0.3),
        ("whoosh", A(40.6), 0.25), ("mouse_click", A(42.25), 0.3), ("mouse_click", A(42.38), 0.25), ("mouse_click", A(42.52), 0.25),
        ("key_clack", A(55.0), 0.5), ("whoosh", A(56.1), 0.3),
        ("key_clack", A(59.685), 0.6), ("riser", A(63.45), 0.35), ("key_clack", A(65.45), 0.55), ("ui_pop", A(65.55), 0.4),
        ("key_clack", A(70.85), 0.35), ("key_clack", A(72.1), 0.35), ("key_clack", A(73.35), 0.35), ("ui_pop", A(73.4), 0.25),
        ("ding", A(75.55), 0.45), ("whoosh", A(76.45), 0.25), ("mouse_click", A(79.25), 0.45), ("trash", A(80.9), 0.5)]
for f, tt, gg in cues: place(S(f), tt, gg)
sf.write("mix_raw.wav", out, SR)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", "mix_raw.wav", "-af", "alimiter=limit=0.95,loudnorm=I=-14:TP=-1.5:LRA=11", "-ar", "48000", "mix_final.wav"], check=True)
print("ok", round(N / SR, 2))
