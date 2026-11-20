#!/usr/bin/env python3
"""Cek take dobel dan kata terpotong pada rakitan klip dari rekaman talking head mentah.

Rekaman panjang sering berisi kalimat yang diulang (take 1 tersendat, take 2 utuh). Bila in/out klip diambil dari
dua take berbeda, kata terdengar dua kali ("benar-benar membuka diri … benar-benar membuka diri"); bila titik potong
jatuh di kata pendek di sambungan, kata itu hilang tanpa terlihat di timeline. Keduanya hanya ketahuan dengan
mentranskrip ULANG suara hasil rakitan, bukan dari timestamp transkrip sumber.

  sumber  : daftar kandidat take dobel di transkrip sumber: frasa ≥ --n kata yang muncul lagi dalam --jarak dtk, dan
            kata yang durasinya > --maks-kata dtk. Whisper sering menelan take yang diulang ke dalam satu kata panjang
            ("ingin" 2,3 dtk berisi "aku benar-benar membuka diri… sekarang aku ingin"), sehingga take dobel tidak
            terlihat sebagai frasa berulang. Jendela kata itu ditranskrip ulang tanpa VAD sebelum in/out dipilih.
            python3 rakitan_cek.py sumber words.json [--n 3] [--jarak 20] [--maks-kata 0.9]
  rakitan : transkrip ulang dialog hasil rakitan (atau --words hasil transkrip ulang), petakan kata ke klip memakai
            timeline.json, lalu cek per klip:
              - kata pertama/terakhir `ucapan` tidak terdengar di klip itu atau tetangganya:
                  tidak ada bunyi di antara batas klip dan kata pertama/terakhir yang terdengar -> FAIL (kata terpotong)
                  ada bunyi di celah itu (kata pelan yang tidak tertangkap ASR)                 -> PERIKSA (dengar)
              - frasa ≥ --n kata terdengar dua kali dalam --jarak-rakitan dtk (ejaan longgar:
                "bener bener" = "benar benar")                                               -> FAIL (take dobel)
              - kemiripan ucapan vs terdengar < 0,7                                          -> PERIKSA (dengar)
            python3 rakitan_cek.py rakitan timeline.json --audio dialog.wav [--simpan kata.json] [--model medium]
            python3 rakitan_cek.py rakitan timeline.json --words kata.json [--audio dialog.wav]   (tanpa transkrip ulang)
words.json = Whisper word timestamps (list kata, atau {"segments": [{"words": [...]}]}, kunci word/start/end).
Transkrip ulang butuh faster-whisper (uv run --with faster-whisper); cek bunyi di celah butuh --audio. Kemiripan ejaan
≥ 0,6 dihitung cocok, karena ASR sering salah dengar kata asing pendek ("how" → "who"); angka di `ucapan` ("9") cocok
dengan kata apa pun ("sembilan"). Exit 1 bila ada FAIL.
"""
import argparse, difflib, json, re, sys


def norm(s):
    return [w for w in re.sub(r"[^\w\s]", " ", s.lower().replace("-", " ")).split() if w]


def muat_kata(p):
    d = json.load(open(p, encoding="utf-8"))
    segs = d.get("segments", d) if isinstance(d, dict) else d
    out = []
    for q in segs:
        for w in (q.get("words") if isinstance(q, dict) and "words" in q else [q]):
            for t in norm(w.get("word", w.get("text", ""))):
                out.append((t, float(w["start"]), float(w["end"])))
    return out


def transkrip(audio, model):
    from faster_whisper import WhisperModel
    m = WhisperModel(model, device="cpu", compute_type="int8")
    seg, _ = m.transcribe(audio, language="id", word_timestamps=True, vad_filter=False)
    return [(t, w.start, w.end) for s in seg for w in s.words for t in norm(w.word)]


def sama(a, b, ambang=0.75):
    return a == b or difflib.SequenceMatcher(None, a, b).ratio() >= ambang


def dobel(kata, n, jarak, longgar=False):
    """Frasa ≥ n kata yang terdengar lagi dalam `jarak` dtk; hit yang bersambung digabung jadi satu pasangan take."""
    temu = []
    for i in range(n, len(kata) - n + 1):
        g = [k[0] for k in kata[i:i + n]]
        if len(set(g)) == 1:
            continue
        t = kata[i][1]
        for j in range(i - n, -1, -1):
            if t - kata[j][1] > jarak:
                break
            if t - kata[j][1] <= 0.5 * n:
                continue
            if all((sama if longgar else str.__eq__)(x, k[0]) for x, k in zip(g, kata[j:j + n])):
                t1 = kata[j][1]
                if temu and abs(t1 - temu[-1][3]) < 1.5 and abs(t - temu[-1][4]) < 1.5:
                    temu[-1][0].append(g[-1]); temu[-1][3], temu[-1][4] = t1, t
                else:
                    temu.append([list(g), t1, t, t1, t])
                break
    return [(" ".join(g), a, b) for g, a, b, _, _ in temu]


def mirip(a, b):
    return a.isdigit() or b.isdigit() or difflib.SequenceMatcher(None, a, b).ratio() >= 0.6


def muat_audio(p):
    import subprocess
    import numpy as np
    b = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-ac", "1", "-ar", "16000", "-f", "f32le", "-"],
                       capture_output=True, check=True).stdout
    return np.frombuffer(b, np.float32)


def ada_bunyi(x, a, b, lantai):
    """True bila ada jendela 30 ms di [a, b] yang ≥ 10 dB di atas lantai noise."""
    import numpy as np
    if x is None or b - a < 0.08:
        return False
    s = x[int(a * 16000):int(b * 16000)]
    w = 480
    rms = [10 * np.log10(np.mean(s[k:k + w] ** 2) + 1e-12) for k in range(0, len(s) - w, w // 2)]
    return bool(rms) and max(rms) >= lantai + 10


def detik(x):
    m, s = x.split(":")
    return int(m) * 60 + float(s)


def cek_rakitan(a):
    rows = json.load(open(a.timeline, encoding="utf-8"))["rows"]
    kata = muat_kata(a.words) if a.words else transkrip(a.audio, a.model)
    if a.simpan:
        json.dump([dict(word=t, start=s0, end=s1) for t, s0, s1 in kata], open(a.simpan, "w", encoding="utf-8"))
    x = muat_audio(a.audio) if a.audio else None
    lantai = None
    if x is not None:
        import numpy as np
        e = 10 * np.log10(np.convolve(x ** 2, np.ones(480) / 480, "valid")[::240] + 1e-12)
        lantai = float(np.percentile(e, 10))
    gagal = 0
    for i, r in enumerate(rows):
        exp = norm(r.get("ucapan", "")) if r.get("ucapan", "—") != "—" else []
        if not exp:
            continue
        t0 = r.get("tl_in_s", detik(r["tl_in"])); t1 = t0 + float(r["durasi"])
        di = [k for k in kata if t0 - 0.15 <= (k[1] + k[2]) / 2 < t1 + 0.15]
        dengar = [k[0] for k in di]
        sekitar = [k[0] for k in kata if t0 - 1.5 <= k[1] < t1 + 1.5]
        celah = {"awal": (t0, di[0][1] if di else t1), "akhir": (di[-1][2] if di else t0, t1)}
        catat, status = [], "ok"
        for posisi, w in (("awal", exp[0]), ("akhir", exp[-1])):
            if any(mirip(w, d) for d in sekitar):
                continue
            if ada_bunyi(x, *celah[posisi], lantai):
                catat.append(f"{posisi} '{w}' tak tertangkap ASR tapi ada bunyi di celah (dengar)")
                status = "PERIKSA" if status == "ok" else status
            else:
                catat.append(f"{posisi} '{w}' hilang"); status = "FAIL"
        rasio = difflib.SequenceMatcher(None, exp, dengar).ratio()
        if status == "ok" and rasio < 0.7:
            status = "PERIKSA"
        gagal += status == "FAIL"
        if status != "ok" or a.semua:
            print(f"{status:7s} klip {r['no']:>4s} {r['tl_in']}  kemiripan {rasio:.2f}  {'; '.join(catat)}\n"
                  f"         ucapan : {' '.join(exp)}\n         dengar : {' '.join(dengar)}")
    for g, s1, s2 in dobel(kata, a.n, a.jarak_rakitan, longgar=True):
        gagal += 1
        print(f"FAIL    take dobel '{g}' di {s1:.2f} dan {s2:.2f} dtk")
    print("PUTUSAN:", "GAGAL" if gagal else "LULUS")
    return 1 if gagal else 0


def main():
    ap = argparse.ArgumentParser(); sub = ap.add_subparsers(dest="mode", required=True)
    s = sub.add_parser("sumber"); s.add_argument("words"); s.add_argument("--n", type=int, default=3)
    s.add_argument("--jarak", type=float, default=20); s.add_argument("--maks-kata", type=float, default=0.9)
    r = sub.add_parser("rakitan"); r.add_argument("timeline"); r.add_argument("--audio"); r.add_argument("--words")
    r.add_argument("--simpan", help="simpan hasil transkrip ulang (dipakai lagi lewat --words)")
    r.add_argument("--model", default="medium"); r.add_argument("--n", type=int, default=4)
    r.add_argument("--jarak-rakitan", type=float, default=8)
    r.add_argument("--semua", action="store_true", help="cetak semua klip, bukan hanya yang bermasalah")
    a = ap.parse_args()
    if a.mode == "sumber":
        kata = muat_kata(a.words)
        for g, t1, t2 in dobel(kata, a.n, a.jarak):
            print(f"take dobel? '{g}'  {t1:.2f} → {t2:.2f} dtk  (pilih SATU take utuh untuk klip itu)")
        for t, s0, s1 in kata:
            if s1 - s0 > a.maks_kata:
                print(f"kata menelan ucapan? '{t}' {s0:.2f}–{s1:.2f} ({s1 - s0:.2f} dtk): transkrip ulang jendela ini tanpa VAD")
        return 0
    if not (a.audio or a.words):
        ap.error("rakitan butuh --audio atau --words")
    return cek_rakitan(a)


if __name__ == "__main__":
    sys.exit(main())
