#!/usr/bin/env python3
"""mix.py · stem VO + SFX + bed musik -> audio/stem_*.wav, mix.wav, cues.json. Tanpa limiter/kompresor/loudnorm; VO tidak disentuh.
Waktu cue diturunkan dari remotion/src/data/ep03.json (awal beat + offset). Musik bed: pad sintetis orisinal (lihat LOG)."""
import json, subprocess, sys, tempfile
from pathlib import Path
import numpy as np
import soundfile as sf
import scipy.signal as ss

EP = Path(__file__).resolve().parent.parent
SR = 48000
D = json.load(open(EP / "remotion/src/data/ep03.json"))
FPS = D["fps"]; beats = {b["id"]: b for b in D["beats"]}
bs = lambda i: beats[f"b{i:02d}"]["dari"] / FPS
be = lambda i: beats[f"b{i:02d}"]["sampai"] / FPS
SFX = Path.home() / "sfx"
EPI, SI = SFX / "Epidemic", SFX / "SFXIrfan"

# (detik, file, pilar, peran, alasan/visual, puncak dBFS, panjang maks dtk)
CUES = [
    (0.02, EPI / "taktil/playing-card-set-down-db3f8c58.wav", "taktil", "stempel cap", "cap 'Kalau…' distempel di atas layar", -17, 0.6),
    (bs(1) + 1.2, EPI / "mekanik/led-plastic-button-press-single-ab33e364.wav", "taktil", "termometer masuk", "termometer muncul di mangkuk", -20, 0.5),
    (bs(2) + 0.30, SFX / "Kenyset/creatorshome-sharp-pop-328170.mp3", "aksen", "momen Soalnya gini", "KLIK membuka, tanda tangan seri", -15, 0.7),
    (bs(3) - 0.47, EPI / "air/swoosh-designed-light-c52cf22f.wav", "transisi", "pan ke gerobak", "kamera pan satu arah dari meja ke gerobak", -17, 0.9),
    (bs(3) + 1.05, EPI / "air/whoosh-soft-short-02-e62847da.wav", "transisi", "menyelam ke tong", "kamera naik dari gerobak ke panel potongan melintang dari samping", -19, 0.8),
    (bs(4) + 0.10, EPI / "taktil/paper-friction-envelope-slide-a5da9fbb.wav", "foley", "karung garam masuk", "karung miring masuk dari kanan atas", -21, 0.9),
    (bs(4) + 0.95, EPI / "taktil/credit-card-slide-on-table-604c921e.wav", "foley", "garam menabur", "butir garam jatuh ke cincin es", -22, 1.2),
    (bs(5) + 0.20, SFX / "Kenyset/flowing-water-sound-effect-418728.mp3", "foley", "es mulai mencair", "kubus es membulat dan meleleh", -26, 1.6),
    (bs(6) + 0.30, EPI / "mekanik/heater-fan-thermostat-click-1f6638b9.wav", "tick", "termometer turun", "merkuri mulai turun", -21, 0.4),
    (bs(6) + 2.30, EPI / "stab/ping-string-pluck-02-203cc987.wav", "aksen", "di bawah nol", "merkuri melewati garis nol", -20, 0.9),
    (bs(7) + 0.35, EPI / "air/designed-whoosh-soft-airy-073cf199.wav", "transisi", "panah panas masuk", "tiga panah menuju kubus es", -23, 0.9),
    (bs(8) + 0.40, EPI / "air/whoosh-mids-16bb9f7c.wav", "transisi", "aliran panas dari kaleng", "panah panas keluar dari kaleng", -23, 1.0),
    (bs(9) + 2.60, SI / "ES_User Interface, Click, Pops, Glass, UI, Pops - Epidemic Sound.mp3", "aksen", "adonan beku", "kerak beku mencapai tengah kaleng", -19, 0.5),
    (bs(10) + 0.25, EPI / "mekanik/heater-fan-dial-turn-one-click-bc15fff9.wav", "foley", "engkol diputar", "tong mulai berputar", -21, 0.5),
    (bs(11) + 1.60, SI / "ES_User Interface, Click, Pops, Glass, UI, Pops - Epidemic Sound.mp3", "aksen", "kristal besar", "kristal besar tajam tumbuh", -20, 0.5),
    (bs(12) + 1.00, EPI / "taktil/sticky-tape-peel-off-surface-1705b78e.wav", "foley", "pengerok", "pengerok menyapu dinding kaleng", -23, 1.0),
    (bs(13) + 0.15, EPI / "taktil/credit-card-slide-on-table-604c921e.wav", "foley", "garam ditambah", "garam kembali menumpuk di cincin", -22, 1.0),
    (bs(13) + 1.45, SFX / "Kenyset/bubble_pop_1-476367.mp3", "foley", "es baru jatuh", "dua es baru mendarat di cincin", -20, 0.4),
    (bs(14) + 0.12, EPI / "air/whoosh-mids-16bb9f7c.wav", "transisi", "pull-back", "kamera mundur ke gerobak utuh", -20, 1.0),
    (bs(14) + 2.85, EPI / "stab/ping-string-pluck-02-203cc987.wav", "aksen", "oh gitu", "KLIK bereaksi 'oh gitu'", -19, 0.9),
    (bs(15) + 0.25, EPI / "taktil/playing-card-slide-on-table-02-5d709714.wav", "foley", "roti dan cone masuk", "dua pilihan masuk", -22, 0.6),
]


def muat(p, maks):
    with tempfile.TemporaryDirectory() as t:
        out = Path(t) / "x.wav"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(p), "-ac", "1", "-ar", str(SR), "-t", str(maks), str(out)], check=True)
        y, _ = sf.read(out)
    return y


def pad(n):
    t = np.arange(n) / SR
    akor = [(130.81, 164.81, 196.0, 246.94), (110.0, 130.81, 164.81, 196.0), (87.31, 130.81, 174.61, 220.0), (98.0, 123.47, 146.83, 196.0)]
    seg = n / len(akor)
    yL = np.zeros(n); yR = np.zeros(n)
    for ci, ak in enumerate(akor):
        w = np.clip(1 - np.abs(t - (ci + 0.5) * seg) / (seg * 0.75), 0, 1) ** 1.5      # tumpang halus antar-akor
        for fi, f in enumerate(ak):
            for det, ch in ((0.997, 0), (1.003, 1)):
                s = np.sin(2 * np.pi * f * det * t + fi) + 0.3 * np.sin(2 * np.pi * 2 * f * det * t + 2 * fi)
                (yL if ch == 0 else yR)[:] += s * w / (1 + fi * 0.3)
    b, a = ss.butter(2, 1400 / (SR / 2))
    yL, yR = ss.lfilter(b, a, yL), ss.lfilter(b, a, yR)
    am = 1 + 0.06 * np.sin(2 * np.pi * 0.11 * t)
    y = np.stack([yL * am, yR * am], 1)
    return y / np.sqrt((y ** 2).mean())


def tenang(vo, t, dur, rentang=0.5, ambang=-32):
    """geser cue (<= 0,5 dtk) ke posisi terdekat yang VO-nya hening (puncak < ambang dBFS) supaya tidak menambah puncak VO."""
    th = 10 ** (ambang / 20); n = int(dur * SR)
    for d in sorted(np.arange(-rentang, rentang + 1e-9, 0.02), key=abs):
        i = int((t + d) * SR)
        if i < 0 or i + n > len(vo): continue
        if np.abs(vo[i:i + n]).max() < th: return t + d
    return t


def main():
    vo, sr = sf.read(EP / "audio/vo.wav"); assert sr == SR
    vo = vo if vo.ndim == 1 else vo.mean(1)
    n = int(round(D["durasi"] * SR))
    vo_s = np.zeros(n); vo_s[:min(n, len(vo))] = vo[:n]
    fx = np.zeros((n, 2)); cues = []
    for t0, f, pilar, peran, alasan, db, mx in CUES:
        t = t0
        y = muat(f, mx)
        pk = np.abs(y).max()
        db = {"aksen": -5, "transisi": -7, "foley": -9, "tick": -10, "taktil": -9}[pilar]   # SFX terdengar di speaker HP (E25a); VO median -21,7 dBFS
        y = y / pk * 10 ** (db / 20)
        t = tenang(vo_s, t, min(len(y) / SR, 0.5))
        k = int(0.012 * SR); y[:k] *= np.linspace(0, 1, k) if False else 1   # serangan tidak diberi fade-in (E24)
        fo = int(min(0.25 * SR, len(y) * 0.5)); y[-fo:] *= np.cos(np.linspace(0, np.pi / 2, fo)) ** 2   # ease-out kosinus
        i = int(t * SR); i = min(i, n - 1); y = y[: n - i]
        pan = 0.0
        fx[i:i + len(y), 0] += y * (1 - pan) ; fx[i:i + len(y), 1] += y * (1 + pan)
        cues.append(dict(t=round(t, 3), t_rencana_beat=round(t0, 3), file=str(f), pilar=pilar, peran=peran, alasan=alasan, visual=alasan, dur=round(len(y) / SR, 3), rate=1.0, dengar="dipilih dari katalog dengar Epidemic/SFXIrfan (KATALOG.md); tidak didengar ulang di sesi ini"))
    mu = pad(n) * 10 ** (-38 / 20)
    k = int(0.08 * SR); mu[:k] *= np.linspace(0, 1, k)[:, None]
    fo = int(1.5 * SR); mu[-fo:] *= np.linspace(1, 0, fo)[:, None] ** 1.0
    cues.insert(0, dict(t=0.0, file="musik bed pad sintetis orisinal", pilar="bed", peran="bed", alasan="bed tipis sejak frame 0", visual="seluruh video", dur=round(D["durasi"], 3), rate=1.0, dengar="dibuat sendiri (numpy), pad lembut tanpa drop"))
    vo2 = np.stack([vo_s, vo_s], 1)
    mix = vo2 + fx + mu
    while np.abs(mix).max() > 10 ** (-1.1 / 20):   # puncak mix <= -1,1 dBFS: yang diturunkan SFX/bed, bukan VO
        fx *= 0.93; mu *= 0.97; mix = vo2 + fx + mu
    pk = np.abs(mix).max()
    print(f"puncak mix {20 * np.log10(pk):.2f} dBFS (vo {20 * np.log10(np.abs(vo_s).max()):.2f})")
    A = EP / "audio"
    for nm, y in (("stem_vo", vo2), ("stem_sfx", fx), ("stem_music", mu), ("mix", mix)):
        sf.write(A / f"{nm}.wav", y, SR, subtype="FLOAT")
    json.dump(cues, open(A / "cues.json", "w"), ensure_ascii=False, indent=1)
    print("OK", len(cues), "cue")


if __name__ == "__main__":
    main()
