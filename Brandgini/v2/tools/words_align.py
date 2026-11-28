#!/usr/bin/env python3
"""words_align.py · timestamp per kata dari VO dengan faster-whisper lokal (0 token LLM), lalu cek cakupan naskah.

  python3 tools/words_align.py vo.wav script.md words.json [--model medium] [--min-cakupan 0.85] [--durasi 45 59.5]
                                [--shotlist shotlist.json]

Keluaran words.json: [{"w": kata, "s": detik, "e": detik}] (format yang dibaca frame_audit.py --words di skill-development).
Gerbang (exit 1 bila gagal):
  cakupan  : kata naskah yang ditemukan berurutan di transkrip (difflib, setelah normalisasi) >= --min-cakupan
  durasi   : awal kata pertama s/d akhir kata terakhir di dalam --durasi
  monoton  : s <= e dan kata tidak mundur waktu
  KT       : (dengan --shotlist) setiap kata KT harus ada di transkrip, karena waktu tampil KT dikunci ke kata itu.
             Kata KT yang salah dengar ASR (mis. "foton" -> "photon") = GAGAL: beri waktu manual di shotlist atau ganti ejaan.
Ambang 0,85 (bukan 0,95 seperti v1): uji 25 Nov 2026 pada suara edubizz-2 (37 kata) memberi 91,9 % dengan model medium
dan 75,7 % dengan small; selisihnya salah dengar istilah (foton/photon), bukan kata yang hilang (uji/HASIL-UJI.md T4).
Catatan: audio di-decode dengan ffmpeg lalu diberikan sebagai array (PyAV di mg-venv PC tidak menerima argumen
metadata_errors; terlihat 25 Nov 2026). Jalankan dengan ~/work/mg-venv/bin/python di PC.
"""
import argparse, difflib, json, re, subprocess, sys

import numpy as np


def load(path):
    b = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", "16000", "-f", "s16le", "-"],
                       capture_output=True, check=True).stdout
    return np.frombuffer(b, np.int16).astype(np.float32) / 32768


ANGKA = {"0": "nol", "1": "satu", "2": "dua", "3": "tiga", "4": "empat", "5": "lima", "10": "sepuluh", "100": "seratus"}


def norm_tokens(text):
    text = re.sub(r"^---.*?---", " ", text, flags=re.S)          # front matter
    text = re.sub(r"\[[^\]]*\]|\([^)]*\)|<[^>]*>", " ", text)     # catatan sutradara [..], (..), tag
    text = "\n".join(l for l in text.splitlines() if not l.lstrip().startswith(("#", "|", "-", "*")) or l.lstrip().startswith(">"))
    text = text.lower().replace("-", " ")
    toks = re.findall(r"[a-z0-9]+", text)
    return [ANGKA.get(t, t) for t in toks]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("audio"); ap.add_argument("script"); ap.add_argument("out")
    ap.add_argument("--model", default="medium"); ap.add_argument("--min-cakupan", type=float, default=0.85)
    ap.add_argument("--durasi", type=float, nargs=2, default=[45.0, 59.5]); ap.add_argument("--threads", type=int, default=4)
    ap.add_argument("--shotlist")
    a = ap.parse_args()
    from faster_whisper import WhisperModel
    m = WhisperModel(a.model, device="cpu", compute_type="int8", cpu_threads=a.threads)
    segs, _ = m.transcribe(load(a.audio), language="id", word_timestamps=True, vad_filter=False)
    words = [{"w": w.word.strip(), "s": round(w.start, 3), "e": round(w.end, 3)} for s in segs for w in s.words if w.word.strip()]
    json.dump(words, open(a.out, "w"), ensure_ascii=False, indent=0)
    fails = []
    if not words:
        print("FAIL: tidak ada kata terdeteksi"); sys.exit(1)
    naskah = norm_tokens(open(a.script, encoding="utf-8").read())
    trans = norm_tokens(" ".join(w["w"] for w in words))
    sm = difflib.SequenceMatcher(None, naskah, trans, autojunk=False)
    cocok = sum(b.size for b in sm.get_matching_blocks())
    cak = cocok / max(1, len(naskah))
    hilang = []
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag in ("delete", "replace"):
            hilang.append(" ".join(naskah[i1:i2]) + (f" -> '{' '.join(trans[j1:j2])}'" if tag == "replace" else " -> (tidak terdengar)"))
    dur = words[-1]["e"] - words[0]["s"]
    mundur = sum(1 for p, q in zip(words, words[1:]) if q["s"] < p["s"] - 0.01) + sum(1 for w in words if w["e"] < w["s"])
    print(f"kata naskah {len(naskah)} | kata transkrip {len(trans)} | cakupan {cak:.1%} (min {a.min_cakupan:.0%}) | "
          f"durasi ucap {dur:.1f} dtk | {len(words) / max(dur, 0.1):.2f} kata/dtk")
    if cak < a.min_cakupan:
        fails.append(f"cakupan {cak:.1%}")
    if not (a.durasi[0] <= dur <= a.durasi[1]):
        fails.append(f"durasi {dur:.1f} di luar {a.durasi[0]:g}-{a.durasi[1]:g}")
    if mundur:
        fails.append(f"{mundur} kata waktunya mundur")
    if a.shotlist:
        ada = set(trans); kurang = []
        for b in json.load(open(a.shotlist, encoding="utf-8"))["beats"]:
            for kt in b.get("kt", []):
                miss = [t for t in norm_tokens(kt.get("teks", "")) if t not in ada]
                if miss: kurang.append(f"b{b.get('beat_id', 0):02d} '{kt.get('teks')}' ({', '.join(miss)})")
        if kurang: fails.append("kata KT tidak tertangkap ASR: " + "; ".join(kurang[:8]))
        else: print("KT: semua kata KT punya timestamp")
    if hilang:
        print("selisih naskah -> transkrip (cek: salah ucap TTS atau salah dengar ASR?):")
        for h in hilang[:15]:
            print("   ", h)
    print("PASS" if not fails else "FAIL: " + "; ".join(fails))
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
