#!/usr/bin/env python3
"""beat_frames.py · satu sumber waktu per beat untuk storyboard, QC, dan golden frame (keyframe = output).

  python3 tools/beat_frames.py cek        shotlist.json                 lint shotlist (exit 1 bila gagal)
  python3 tools/beat_frames.py label      shotlist.json                 "b01:123 b02:…" untuk render.sh still
  python3 tools/beat_frames.py ekstrak    shotlist.json render.mp4 DIR  ambil frame yang SAMA dari render final
  python3 tools/beat_frames.py storyboard shotlist.json STILLDIR OUT.md tabel storyboard: still + transisi + timing

Storyboard dibuat dari still Remotion (`$MG/juri/render.sh <proyek> still <Comp> $(beat_frames.py label …)`), yaitu kode
yang sama dengan render final; `ekstrak` mengambil nomor frame yang sama dari MP4, jadi still yang disetujui dan output
bisa dibandingkan satu lawan satu (golden_cek.py).

Aturan `cek` (sumber di kolom kanan):
  urut/rapat        beat berurutan, tanpa celah/tumpang > 1 frame, mulai 0, berakhir di target ±0,5 dtk
  durasi beat       1,0–5,0 dtk                                         plan §3; v1 skill 02 anti-pattern
  ganti visual      jarak antar-perubahan (awal beat + perubahan_sec) <= 2,2 dtk   MOTION-CORE §1 (retensi short-form)
  transisi          tanpa crossfade/fade; tipe sama tidak berturut-turut; >= 4 tipe per 30 dtk   Lantai B13, MOTION-CORE §2 #6
  tanda tangan      ada beat visual_type "tanda_tangan_buka" yang mulai di 3,0–6,5 dtk                    plan §2.1 butir 3
  hook              beat 1 mulai di 0 dan KT-nya memuat kata cap pembuka                          plan §3, Lantai D22c
  KT dari ucapan    tiap kata KT ada di vo_text beat itu; 1–3 kata per tampil                     Lantai A4, A5
  fakta             beat yang menyebut angka wajib punya fakta_ids                                skill 01/02
  keyframe          di dalam [start+0,25; end-0,05]
  maskot            tiap kemunculan punya karakter + aksi (kata kerja) + fungsi                  vibedesign guide/karakter KRK-01
"""
import json, re, subprocess, sys
from pathlib import Path

FPS_DEF = 30
TRANS_OK = {"potong", "whip", "push-through", "pull-back", "match-cut", "grid-flash", "invert-flash",
            "keyhole", "buka-maskot", "drop-in", "slide-arah"}


def toks(s):
    return re.findall(r"[a-z0-9]+", s.lower().replace("…", " "))


def keyframe(b):
    if b.get("keyframe_sec") is not None:
        return float(b["keyframe_sec"])
    d = b["end_sec"] - b["start_sec"]          # frame tahan: gerak masuk sudah mendarat, belum keluar
    return b["start_sec"] + min(max(0.6, 0.55 * d), d - 0.1)


def load(p):
    sl = json.load(open(p, encoding="utf-8"))
    return sl, sl.get("fps", FPS_DEF), sorted(sl["beats"], key=lambda b: b["start_sec"])


def cek(p):
    sl, fps, B = load(p)
    F, W = [], []
    tf = 1.0 / fps
    if not B:
        print("FAIL: tidak ada beat"); return 1
    if abs(B[0]["start_sec"]) > tf: F.append(f"beat 1 mulai {B[0]['start_sec']} (harus 0)")
    if abs(B[-1]["end_sec"] - sl["target_duration_sec"]) > 0.5:
        F.append(f"akhir {B[-1]['end_sec']} vs target {sl['target_duration_sec']}")
    for a, b in zip(B, B[1:]):
        if abs(b["start_sec"] - a["end_sec"]) > tf:
            F.append(f"b{a['beat_id']:02d}->b{b['beat_id']:02d}: celah/tumpang {b['start_sec'] - a['end_sec']:+.2f} dtk")
    ev = []
    for b in B:
        bid = f"b{b['beat_id']:02d}"; d = b["end_sec"] - b["start_sec"]
        if not 1.0 <= d <= 5.0: F.append(f"{bid}: durasi {d:.2f} dtk di luar 1,0–5,0")
        k = keyframe(b)
        if not b["start_sec"] + 0.25 <= k <= b["end_sec"] - 0.05: F.append(f"{bid}: keyframe {k:.2f} di luar beat")
        ev.append(b["start_sec"]); ev += [t for t in b.get("perubahan_sec", []) if b["start_sec"] < t < b["end_sec"]]
        vo = set(toks(b.get("vo_text", "")))
        for kt in b.get("kt", []):
            w = toks(kt.get("teks", ""))
            if not 1 <= len(w) <= 3: F.append(f"{bid}: KT '{kt.get('teks')}' {len(w)} kata (1–3, Lantai A4)")
            luar = [x for x in w if x not in vo]
            if luar: F.append(f"{bid}: KT memuat kata yang tidak diucapkan {luar} (Lantai A5)")
        if re.search(r"\d|seratus|sepuluh|ribu|juta|persen|derajat|meter", b.get("vo_text", "").lower()) and not b.get("fakta_ids"):
            F.append(f"{bid}: menyebut angka tanpa fakta_ids")
        m = b.get("maskot")
        if m is not None and not all(str(m.get(k, "")).strip() for k in ("karakter", "aksi", "fungsi")):
            F.append(f"{bid}: maskot tanpa karakter/aksi/fungsi (KRK-01)")
        t = (b.get("transisi_masuk") or {}).get("tipe", "")
        if b is not B[0] and t not in TRANS_OK: F.append(f"{bid}: transisi '{t}' tidak dikenal/dilarang (fade/crossfade = S-V1)")
    ev = sorted(set(ev)) + [B[-1]["end_sec"]]
    for a, b in zip(ev, ev[1:]):
        if b - a > 2.2 + 1e-6: F.append(f"tidak ada perubahan visual {a:.1f}–{b:.1f} dtk ({b - a:.1f} > 2,2; isi perubahan_sec)")
    tipe = [(b["start_sec"], (b.get("transisi_masuk") or {}).get("tipe")) for b in B[1:]]
    for (t1, x), (t2, y) in zip(tipe, tipe[1:]):
        if x == y: F.append(f"transisi '{x}' berturut-turut di {t1:.1f} dan {t2:.1f} dtk (Lantai B13a)")
    if sl["target_duration_sec"] >= 30:
        for t0, _ in tipe:
            win = {y for t, y in tipe if t0 <= t < t0 + 30}
            if t0 + 30 <= B[-1]["end_sec"] and len(win) < 4:
                F.append(f"jendela {t0:.0f}–{t0 + 30:.0f} dtk hanya {len(win)} tipe transisi (< 4)"); break
    gb = [b for b in B if b.get("visual_type") == "tanda_tangan_buka"]
    if not gb or not 3.0 <= gb[0]["start_sec"] <= 6.5: F.append("momen tanda tangan 'tanda_tangan_buka' (Soalnya gini) tidak mulai di 3,0–6,5 dtk")
    cap = toks(sl.get("opening_cap", ""))
    if cap and not any(set(cap) <= set(toks(kt.get("teks", ""))) for kt in B[0].get("kt", [])):
        F.append(f"beat 1 tidak menampilkan cap pembuka '{sl.get('opening_cap')}'")
    print(f"{len(B)} beat · {len(set(y for _, y in tipe))} tipe transisi · jarak perubahan maks "
          f"{max(b - a for a, b in zip(ev, ev[1:])):.2f} dtk")
    for x in F: print("  GAGAL", x)
    print("PASS" if not F else f"FAIL ({len(F)})")
    return 1 if F else 0


def label(p):
    _, fps, B = load(p)
    print(" ".join(f"b{b['beat_id']:02d}:{round(keyframe(b) * fps)}" for b in B)); return 0


def ekstrak(p, video, out):
    _, fps, B = load(p)
    Path(out).mkdir(parents=True, exist_ok=True)
    rc = 0
    for b in B:
        n = round(keyframe(b) * fps); f = Path(out) / f"b{b['beat_id']:02d}.png"
        r = subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", video, "-vf", f"select=eq(n\\,{n})", "-vsync", "0",
                            "-frames:v", "1", str(f)], capture_output=True, text=True)
        ok = r.returncode == 0 and f.exists() and f.stat().st_size > 0
        print(f"{'ok ' if ok else 'GAGAL'} b{b['beat_id']:02d} frame {n} -> {f}"); rc |= 0 if ok else 1
    return rc


def storyboard(p, stills, out):
    sl, fps, B = load(p)
    L = [f"# Storyboard {sl['episode_id']} · {sl['title']}", "",
         f"Gaya `{sl.get('gaya')}` · cap `{sl.get('opening_cap')}` · {fps} fps · still = keyframe dari komposisi Remotion yang sama "
         f"dengan render final (`render.sh still`), bukan gambar terpisah.", "",
         "| Beat | Waktu (dtk) | Keyframe | Still | Transisi masuk | Kamera | KT (peran) | SFX (pilar) | VO |",
         "|---|---|---|---|---|---|---|---|---|"]
    for b in B:
        bid = f"b{b['beat_id']:02d}"; n = round(keyframe(b) * fps); tr = b.get("transisi_masuk") or {}
        st = Path(stills) / f"{bid}.png"
        kt = "; ".join(f"{k['teks']} ({k.get('peran', '?')})" for k in b.get("kt", []))
        sfx = "; ".join(f"{s.get('t', '')}s {Path(s.get('file', '')).name} ({s.get('pilar', '?')})" for s in b.get("sfx", []))
        L.append(f"| {bid} | {b['start_sec']:.2f}–{b['end_sec']:.2f} | f{n} | {'![](' + str(st) + ')' if st.exists() else 'BELUM ADA'} | "
                 f"{tr.get('tipe', '-')} {tr.get('frames', '')}f | {b.get('kamera', '-')} | {kt} | {sfx} | {b.get('vo_text', '')} |")
    Path(out).write_text("\n".join(L) + "\n", encoding="utf-8"); print("storyboard ->", out); return 0


if __name__ == "__main__":
    a = sys.argv[1:]
    cmds = {"cek": (cek, 1), "label": (label, 1), "ekstrak": (ekstrak, 3), "storyboard": (storyboard, 3)}
    if not a or a[0] not in cmds or len(a) - 1 != cmds[a[0]][1]:
        print(__doc__); sys.exit(2)
    sys.exit(cmds[a[0]][0](*a[1:]))
