#!/usr/bin/env python3
"""Gerbang: satu track musik tidak boleh dipakai untuk semua klip/babak dalam satu batch (Irfan 8 Nov).
Gagal pertama: V5 8 Nov, tiga klip podcast memakai Mixkit #22 "Piano Reflections" yang sama.

Membandingkan file musik yang dipakai (sumber atau stem musik, bukan mix dengan suara):
  - sha256 sama                         -> SAMA
  - sidik jari mirip (chroma + MFCC rata-rata, kosinus >= 0,97) -> SAMA (potongan berbeda dari track yang sama)
Label genre (earshot dll.) TIDAK dipakai: track piano yang sama dilabeli funk/jazz/corporate (uji audit 8 Nov).

Pakai:  python3 music_batch.py musik_klipA.mp3 musik_klipB.mp3 musik_klipC.mp3 [--allow-same 0]
Exit 1 bila ada pasangan SAMA. --allow-same N mengizinkan N pasangan bila Irfan memutuskan satu bed untuk satu seri.
"""
import argparse, hashlib, itertools, subprocess, sys
import numpy as np

SR = 22050


def load(path, seconds=120):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-t", str(seconds), "-vn", "-ac", "1", "-ar", str(SR),
                          "-f", "f32le", "-"], capture_output=True).stdout
    return np.frombuffer(raw, np.float32).copy()


def fingerprint(path):
    import librosa
    y = load(path)
    if len(y) < SR:
        raise SystemExit(f"FAIL audio terlalu pendek/tidak terbaca: {path}")
    chroma = librosa.feature.chroma_cqt(y=y, sr=SR).mean(1)
    mfcc = librosa.feature.mfcc(y=y, sr=SR, n_mfcc=20)[1:].mean(1)
    v = np.concatenate([chroma / (np.linalg.norm(chroma) + 1e-9), mfcc / (np.linalg.norm(mfcc) + 1e-9)])
    return v / np.linalg.norm(v)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("files", nargs="+")
    ap.add_argument("--allow-same", type=int, default=0)
    ap.add_argument("--threshold", type=float, default=0.97)
    a = ap.parse_args()
    if len(a.files) < 2:
        print("PASS: hanya satu file"); return
    sha = {f: hashlib.sha256(open(f, "rb").read()).hexdigest() for f in a.files}
    fp = {f: fingerprint(f) for f in a.files}
    same = []
    for x, y in itertools.combinations(a.files, 2):
        cos = float(fp[x] @ fp[y])
        tag = "SAMA (file identik)" if sha[x] == sha[y] else ("SAMA (sidik jari)" if cos >= a.threshold else "beda")
        print(f"{tag:22s} kosinus {cos:.3f}  {x}  <->  {y}")
        if tag.startswith("SAMA"):
            same.append((x, y))
    if len(same) > a.allow_same:
        print(f"FAIL: {len(same)} pasangan memakai track yang sama; tiap klip/babak butuh track sendiri (aturan 25, S-A9)")
        sys.exit(1)
    print("PASS")


if __name__ == "__main__":
    main()
