#!/usr/bin/env python3
"""Telinga gabungan: earshot = skor pertama, lalu dicek ukuran independen (audio.md §14.0B, Irfan 8 Nov).

Langkah:
  1. Audio diambil dari file (audio atau video).
  2. Ada suara orang (AudioSet Speech >= 0,3)? Pisahkan dengan demucs (htdemucs, two-stems) dan nilai stem musiknya.
     Bukti 8 Nov: track piano V5 di mix bersuara terbaca "funk, vocal chop"; di stem "solo piano, sedih".
  3. earshot describe pada stem: genre, mood, instrumen (hipotesis).
  4. Ukuran librosa pada stem yang sama: bpm, mayor/minor, kecerahan, kepadatan onset, perubahan level per 10 dtk.
  5. Klaim earshot dicocokkan dengan ukuran: SETUJU / BEDA / BELUM TERUJI (perlu telinga kedua: Gemini/metadata).
Tabel dan pertanyaan untuk telinga kedua dicetak; --json menyimpan semuanya.

Pakai (PC server: earshot + demucs di ~/work/mg-venv):
  python3 ears.py ref.mp4 [--no-separate] [--json hasil.json]
"""
import argparse, json, os, re, shutil, subprocess, sys, tempfile
from pathlib import Path
import numpy as np

SR = 22050
FAST = re.compile(r"energetic|upbeat|driving|hype|intense|aggressive|exciting|action|fast", re.I)
CALM = re.compile(r"calm|relax|dreamy|ethereal|sad|melanchol|peaceful|ambient|slow|gentle|reflective|cozy", re.I)
MINOR = re.compile(r"sad|melanchol|dark|tense|suspense|ominous|sinister|anxious|mysterious", re.I)
MAJOR = re.compile(r"happy|uplifting|hopeful|playful|cheerful|joyful|bright|triumphant|romantic|warm", re.I)
# profil Krumhansl-Kessler
KK_MAJ = np.array([6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88])
KK_MIN = np.array([6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17])
NOTES = "C C# D D# E F F# G G# A A# B".split()


def earshot_bin():
    for c in (os.environ.get("EARSHOT"), shutil.which("earshot"), os.path.expanduser("~/work/mg-venv/bin/earshot")):
        if c and Path(c).exists():
            return c
    raise SystemExit("FAIL: earshot tidak ditemukan (set EARSHOT=...)")


def describe(path):
    r = subprocess.run([earshot_bin(), "describe", str(path), "--json", "--top", "5"], capture_output=True, text=True)
    if r.returncode:
        raise SystemExit(f"FAIL earshot: {r.stderr[-300:]}")
    return json.loads(r.stdout[r.stdout.index("{"):])


def separate(wav, work):
    demucs = shutil.which("demucs") or os.path.expanduser("~/work/mg-venv/bin/demucs")
    if not Path(demucs).exists():
        raise SystemExit("FAIL: demucs tidak terpasang; pip install demucs (venv terpisah bila torch bentrok)")
    subprocess.run([demucs, "--two-stems=vocals", "-n", "htdemucs", "-o", str(work), str(wav)],
                   check=True, capture_output=True)
    return next(Path(work).rglob("no_vocals.wav"))


def measure(path):
    import librosa
    y, _ = librosa.load(str(path), sr=SR, mono=True)
    tempo = float(np.atleast_1d(librosa.beat.beat_track(y=y, sr=SR)[0])[0])
    chroma = librosa.feature.chroma_cqt(y=y, sr=SR).mean(1)
    cands = [(np.corrcoef(np.roll(KK_MAJ, k), chroma)[0, 1], "mayor", k) for k in range(12)] + \
            [(np.corrcoef(np.roll(KK_MIN, k), chroma)[0, 1], "minor", k) for k in range(12)]
    best = max(cands)
    alt = max(np.corrcoef(np.roll(KK_MIN if best[1] == "mayor" else KK_MAJ, k), chroma)[0, 1] for k in range(12))
    on = librosa.onset.onset_detect(y=y, sr=SR, units="time")
    rms = librosa.feature.rms(y=y)[0]
    hop = 512 / SR
    win = int(10 / hop)
    lv = [float(20 * np.log10(np.mean(rms[i:i + win]) + 1e-9)) for i in range(0, max(1, len(rms) - win // 2), win)]
    return dict(bpm=round(tempo, 1), mode=best[1], key=f"{NOTES[best[2]]} {best[1]}", mode_margin=round(float(best[0] - alt), 3),
                brightness_hz=int(librosa.feature.spectral_centroid(y=y, sr=SR).mean()),
                onsets_per_s=round(len(on) / (len(y) / SR), 2),
                level_10s_db=[round(x, 1) for x in lv], level_range_db=round(float(max(lv) - min(lv)), 1) if lv else 0.0)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("file")
    ap.add_argument("--no-separate", action="store_true")
    ap.add_argument("--speech-threshold", type=float, default=0.3)
    ap.add_argument("--json")
    a = ap.parse_args()
    work = Path(tempfile.mkdtemp(prefix="ears_"))
    wav = work / "in.wav"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", a.file, "-vn", "-ac", "2", "-ar", "44100", str(wav)], check=True)

    mix = describe(wav)
    speech = next((x["p"] for x in mix.get("audioset", []) if x["label"] == "Speech"), 0.0)
    target, note = wav, "tanpa suara orang, dinilai langsung"
    if speech >= a.speech_threshold and not a.no_separate:
        target = separate(wav, work / "sep")
        note = f"ada suara orang (Speech {speech:.2f}) -> dinilai dari stem musik demucs"
    stem = describe(target) if target != wav else mix
    m = measure(target)

    hints = stem.get("tags", {})
    top = lambda cat: [(t["term"], t["z"]) for t in hints.get(cat, [])[:3]]
    genre, mood, inst = top("music_genre"), top("music_mood"), top("instruments")
    rows = []
    for term, z in mood[:2]:
        if FAST.search(term):
            ok = m["bpm"] >= 105 or m["onsets_per_s"] >= 3
            rows.append((f"mood '{term}' ({z:+.1f}) = cepat/berenergi", f"bpm {m['bpm']}, onset {m['onsets_per_s']}/dtk",
                         "SETUJU" if ok else "BEDA"))
        if CALM.search(term):
            ok = m["bpm"] <= 105 or m["onsets_per_s"] <= 2.5
            rows.append((f"mood '{term}' ({z:+.1f}) = tenang", f"bpm {m['bpm']}, onset {m['onsets_per_s']}/dtk",
                         "SETUJU" if ok else "BEDA"))
        if m["mode_margin"] >= 0.05:
            if MINOR.search(term):
                rows.append((f"mood '{term}' = cenderung minor", m["key"], "SETUJU" if m["mode"] == "minor" else "BEDA"))
            elif MAJOR.search(term):
                rows.append((f"mood '{term}' = cenderung mayor", m["key"], "SETUJU" if m["mode"] == "mayor" else "BEDA"))
    for term, z in genre[:2] + inst[:2]:
        rows.append((f"genre/instrumen '{term}' ({z:+.1f})", "tidak ada ukuran independen", "BELUM TERUJI"))
    rows.append(("perubahan per babak", f"rentang level 10 dtk {m['level_range_db']} dB",
                 "DATAR (< 3 dB)" if m["level_range_db"] < 3 else "BERUBAH"))

    print(f"{a.file}: {note}")
    print(f"ukuran: {m['bpm']} bpm · {m['key']} (margin {m['mode_margin']}) · kecerahan {m['brightness_hz']} Hz · "
          f"onset {m['onsets_per_s']}/dtk · level per 10 dtk {m['level_10s_db']}")
    print(f"earshot stem: genre {genre} · mood {mood} · instrumen {inst}")
    if target != wav:
        mg = [(t["term"], t["z"]) for t in mix.get("tags", {}).get("music_genre", [])[:2]]
        print(f"earshot mix (tidak dipakai, tercampur suara): genre {mg}")
    print("\n| klaim | pembanding | status |\n|---|---|---|")
    for r in rows:
        print(f"| {r[0]} | {r[1]} | {r[2]} |")
    beda = [r for r in rows if r[2] in ("BEDA", "BELUM TERUJI")]
    if beda:
        print("\nTelinga kedua (Gemini via `agy` / API, atau metadata sumber) untuk klaim BEDA/BELUM TERUJI. Tanyakan spesifik:")
        print("  1. Instrumen utama apa yang terdengar? 2. Tempo terasa cepat, sedang, atau lambat? "
              "3. Suasananya sedih, tegang, hangat, atau ceria? 4. Di detik berapa suasana atau intensitas berubah?")
        print("Lalu tulis putusan: klaim -> sumber yang setuju -> sumber yang tidak -> mana yang dipakai dan kenapa.")
    if a.json:
        json.dump(dict(file=a.file, note=note, speech=speech, measure=m, genre=genre, mood=mood, instruments=inst,
                       rows=rows), open(a.json, "w"), ensure_ascii=False, indent=1)
    shutil.rmtree(work, ignore_errors=True)


if __name__ == "__main__":
    main()
