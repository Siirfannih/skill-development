#!/usr/bin/env python3
"""Audit SEMUA frame sebelum render MP4 (Irfan 15 Nov): tanpa sampling, video dipecah per <=10 dtk, tiap potongan
diperiksa per detik (30 frame) oleh agen lain (subagen/model lain), mencakup visual, audio/SFX, transisi, dan jarak
antar-frame.

Irfan: "pengecekannya tidak lagi menggunakan sampling, tapi menggunakan semua data sebelum proses rendering … saat
penyusunan frame per frame … untuk mengecek visual, audio, transisi, dan jarak frame antar frame … frame per 1 detiknya
… dilakukan oleh model agent yang berbeda … video itu harus sudah dipecah dulu setiap 1 detik sampai 10 detiknya."
Gagal yang membentuk alat ini: builder-trap-r2 v3 (patahan di titik potong suara f312/1270/1481/1708/2405, jump cut
wajah, SFX tidak ada saat konten berjatuhan) lolos karena cek memakai sampel tiap 8–15 frame; Bali Digifest (sama).

Masukan: urutan gambar dari `render.sh <proyek> frames <Comp>` (qc/frames/, skala 0,5), opsional:
  --cuts  file teks/JSON berisi frame potong yang DISENGAJA (batas beat, ganti adegan): lompatan di sana tidak ditandai
          (format `B01:0-42 B02:42-83 …` seperti beats_*_frames.txt, atau list angka JSON)
  --cues  cue sheet SFX (JSON, kunci `cues` → `t` detik)        --words kata per kata (JSON, `w`/`s`/`e`)
  --stems folder berisi stem_vo*.wav / stem_music*.wav / stem_sfx*.wav (strip energi audio per detik)
Keluaran `--out` (default qc/frame_audit/):
  per potongan `cNN_<a>-<b>s/`: `s<detik>.jpg` (30 frame 6×5 + strip audio; frame bertanda diberi bingkai merah),
  `INFO.md` (tanda otomatis, kata yang diucapkan, cue SFX di potongan itu), `VERDICT.md` (diisi agen pemeriksa),
  dan `INDEX.md` (ringkasan + cara pemeriksaan). `render.sh final` menolak bila ada VERDICT tanpa `PUTUSAN: LULUS`.
Tanda otomatis (penapis, bukan putusan):
  LOMPAT  beda frame→frame melonjak (> 4× median lokal + 1,5 dan > 3) di luar potong disengaja ±1 f = patahan
  KEDIP   satu frame berbeda dari kedua tetangganya yang mirip satu sama lain (frame kosong/dip 1 f)
  BEKU    ≥ 3 frame identik di antara frame yang bergerak (gerak tertahan)
  SFX?    potong/lompatan visual besar tanpa cue SFX dalam ±0,30 dtk (dinilai: perlu bunyi atau sengaja hening)
Pakai:  python3 frame_audit.py qc/frames --src remotion/src --fps 30 --cuts handoff/beats_v3_frames.txt --cues edit/v3/cues_v3.json \\
          --words edit/v3/words_final.json --stems audio --out qc/frame_audit
"""
import argparse, glob, json, os, re, sys
import numpy as np
from PIL import Image, ImageDraw


def load_frames(d):
    fs = sorted(glob.glob(os.path.join(d, "*.jpeg")) + glob.glob(os.path.join(d, "*.jpg")) + glob.glob(os.path.join(d, "*.png")),
                key=lambda p: int(re.findall(r"(\d+)", os.path.basename(p))[-1]))
    if not fs: sys.exit(f"tidak ada frame di {d}")
    return fs


def small(path, w=192, h=108):
    return np.asarray(Image.open(path).convert("L").resize((w, h), Image.BILINEAR), dtype=np.float32)


def load_cuts(p):
    if not p: return set()
    s = open(p).read().strip()
    try:
        return {int(x) for x in json.loads(s)}
    except Exception:
        out = set()
        for tok in s.split():
            m = re.match(r"[^:]+:(\d+)-(\d+)", tok)
            if m: out.add(int(m.group(1)))
        return out


def load_json_list(p, key):
    if not p: return []
    d = json.load(open(p))
    return d.get(key, d) if isinstance(d, dict) else d


def stem_env(folder, fps, n):
    import soundfile as sf
    out = {}
    for tag, pats in (("suara", ("stem_vo*", "stem_voice*")), ("musik", ("stem_music*",)), ("sfx", ("stem_sfx*", "sfx_stem*"))):
        cands = sorted(sum((glob.glob(os.path.join(folder, p + ".wav")) for p in pats), []), key=os.path.getmtime)
        if not cands: continue
        x, sr = sf.read(cands[-1], always_2d=True); x = x.mean(1)
        hop = sr / fps
        e = np.array([np.sqrt(np.mean(x[int(i * hop):int((i + 1) * hop)] ** 2) + 1e-12) for i in range(n)])
        out[tag] = np.nan_to_num(20 * np.log10(e + 1e-9), nan=-90.0)  # frame melebihi panjang audio = senyap
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("frames"); ap.add_argument("--fps", type=float, default=30)
    ap.add_argument("--cuts"); ap.add_argument("--cues"); ap.add_argument("--words"); ap.add_argument("--stems")
    ap.add_argument("--chunk", type=float, default=10.0); ap.add_argument("--out", default="qc/frame_audit")
    ap.add_argument("--src", help="folder kode (mis. remotion/src): frame yang lebih tua dari perubahan kode terakhir = BASI → keluar")
    a = ap.parse_args()
    fs = load_frames(a.frames); n = len(fs); fps = a.fps
    if a.src:  # gagal 15 Nov: render ulang sebagian (f520–610) menyambung frame lama f611+ → audit melihat "snap" palsu
        newest = max(os.path.getmtime(os.path.join(r, f)) for r, _, fl in os.walk(a.src) for f in fl)
        stale = [i for i, f in enumerate(fs) if os.path.getmtime(f) < newest]
        if stale:
            sys.exit(f"BASI: {len(stale)} frame lebih tua dari perubahan kode terakhir (mis. f{stale[0]}–f{stale[-1]}). Render ulang semua frame (render.sh frames), jangan menyambung rentang.")
    print(f"frame {n} ({n / fps:.2f} dtk) · menghitung jarak antar-frame …")
    v = np.stack([small(f) for f in fs])
    d = np.abs(np.diff(v, axis=0)).mean((1, 2))                     # d[i] = frame i → i+1
    med = np.array([np.median(d[max(0, i - 6):i + 7]) for i in range(len(d))])
    cuts = load_cuts(a.cuts)
    near_cut = lambda i: any(abs(i + 1 - c) <= 1 for c in cuts)
    flags = {}                                                       # frame -> [tanda]
    def flag(i, t): flags.setdefault(int(i), []).append(t)
    big = (d > 4 * med + 1.5) & (d > 3)
    for i in np.where(big)[0]:
        if not near_cut(i): flag(i + 1, f"LOMPAT {d[i]:.1f} (f{i}→{i + 1})")
    for i in range(1, n - 1):
        a1 = np.abs(v[i] - v[i - 1]).mean(); a2 = np.abs(v[i] - v[i + 1]).mean(); a0 = np.abs(v[i + 1] - v[i - 1]).mean()
        if a1 > 6 and a2 > 6 and a0 < 0.35 * min(a1, a2): flag(i, f"KEDIP {min(a1, a2):.1f}")
    same = d < 0.12; i = 0
    while i < len(d):
        if same[i]:
            j = i
            while j < len(d) and same[j]: j += 1
            run = j - i + 1
            mov_before = i > 0 and d[i - 1] > 0.8; mov_after = j < len(d) and d[j] > 0.8
            if run >= 3 and mov_before and mov_after: flag(i, f"BEKU {run} f")
            i = j
        else: i += 1
    cues = load_json_list(a.cues, "cues"); ct = np.array(sorted(float(q["t"]) for q in cues)) if cues else np.array([])
    events = sorted(set(int(i) + 1 for i in np.where(big)[0]) | {c for c in cuts if 0 < c < n})
    for f in events:
        if ct.size == 0 or np.min(np.abs(ct - f / fps)) > 0.30: flag(f, "SFX? potong/gerak besar tanpa cue ±0,30 dtk")
    words = load_json_list(a.words, "words")
    env = stem_env(a.stems, fps, n) if a.stems else {}
    os.makedirs(a.out, exist_ok=True)
    per = int(round(a.chunk * fps)); W, H = 256, 144
    idx = ["# Audit frame per frame (tanpa sampling)", "",
           f"Sumber: `{a.frames}` · {n} frame · {n / fps:.2f} dtk · potongan {a.chunk:g} dtk · lembar = 1 detik (6×5 = 30 frame)", "",
           "Cara periksa (agen LAIN dari yang membangun; satu agen per potongan, paralel): buka SEMUA `s*.jpg` di potongan, baca `INFO.md`,",
           "nilai tiap detik: visual (teks terbaca, tidak terpotong, tidak bertumpuk, keseimbangan), transisi (halus, tanpa frame kosong/kedip),",
           "jarak antar-frame (tidak ada lompatan/patahan di luar potong disengaja, gerak tidak tertahan), audio (cue SFX ada di momen cerita:",
           "jatuh/mendarat/klik/ganti adegan; suara tidak tertutup musik; strip energi), dan cocok dengan kata yang diucapkan.",
           "Tulis `VERDICT.md`: satu baris per masalah `dtk | frame | jenis | apa yang terlihat | usul`, lalu baris terakhir",
           "`PUTUSAN: LULUS` atau `PUTUSAN: GAGAL`. Tanda otomatis hanya penapis: tiap tanda dinilai, bukan disalin.", "",
           "| Potongan | Frame | Tanda otomatis |", "|---|---|---|"]
    for c0 in range(0, n, per):
        c1 = min(n, c0 + per); name = f"c{c0 // per + 1:02d}_{c0 / fps:05.1f}-{c1 / fps:05.1f}s"
        cd = os.path.join(a.out, name); os.makedirs(cd, exist_ok=True)
        info = [f"# {name}", "", f"Frame {c0}–{c1 - 1} · {c0 / fps:.2f}–{c1 / fps:.2f} dtk", "", "## Tanda otomatis"]
        nf = 0
        for f in range(c0, c1):
            for t in flags.get(f, []): info.append(f"- f{f} ({f / fps:.2f} dtk): {t}"); nf += 1
        if nf == 0: info.append("- (tidak ada)")
        info += ["", "## Kata diucapkan (dtk)"]
        ws = [q for q in words if c0 / fps <= float(q.get("s", q.get("start", -1))) < c1 / fps]
        info.append(" ".join(f"{q.get('w', q.get('word', '')).strip()}@{float(q.get('s', q.get('start'))):.2f}" for q in ws) or "-")
        info += ["", "## Cue SFX (dtk · peran · file)"]
        cs = [q for q in cues if c0 / fps <= float(q["t"]) < c1 / fps]
        info += [f"- {float(q['t']):.2f} · {q.get('peran', '')} · {os.path.basename(q.get('file', ''))}" for q in cs] or ["- (tidak ada)"]
        open(os.path.join(cd, "INFO.md"), "w").write("\n".join(info) + "\n")
        vp = os.path.join(cd, "VERDICT.md")
        if not os.path.exists(vp): open(vp, "w").write(f"# VERDICT {name}\n\n(belum diperiksa)\n")
        for s0 in range(c0, c1, int(fps)):
            s1 = min(c1, s0 + int(fps)); strip = 40 if env else 0
            sh = Image.new("RGB", (6 * W, 5 * H + 22 + strip), (18, 18, 18)); dr = ImageDraw.Draw(sh)
            dr.text((4, 4), f"{name} · detik {s0 / fps:.2f}-{s1 / fps:.2f} · f{s0}-{s1 - 1}", fill=(255, 220, 0))
            for k, f in enumerate(range(s0, s1)):
                im = Image.open(fs[f]).convert("RGB").resize((W, H)); x, y = (k % 6) * W, 22 + (k // 6) * H
                sh.paste(im, (x, y)); col = (255, 60, 60) if f in flags else (255, 255, 0)
                dr.text((x + 3, y + 2), str(f), fill=col)
                if f in flags: dr.rectangle([x, y, x + W - 1, y + H - 1], outline=(255, 40, 40), width=3)
            if env:
                y0 = 22 + 5 * H; dr.text((4, y0 + 2), " ".join(env), fill=(160, 160, 160))
                for tag, colr in (("suara", (90, 200, 255)), ("musik", (120, 220, 120)), ("sfx", (255, 120, 60))):
                    if tag not in env: continue
                    e = env[tag][s0:s1]; pts = [(int((k + 0.5) * 6 * W / fps), y0 + strip - 2 - int(np.clip((e[k] + 60) / 60, 0, 1) * (strip - 6))) for k in range(len(e))]
                    if len(pts) > 1: dr.line(pts, fill=colr, width=2)
            sh.save(os.path.join(cd, f"s{s0 / fps:05.1f}.jpg"), quality=82)
        idx.append(f"| `{name}` | {c0}–{c1 - 1} | {nf} |")
    open(os.path.join(a.out, "INDEX.md"), "w").write("\n".join(idx) + "\n")
    tot = sum(len(t) for t in flags.values())
    kinds = {}
    for t in sum(flags.values(), []): kinds[t.split()[0]] = kinds.get(t.split()[0], 0) + 1
    print(f"tanda otomatis {tot}: " + ", ".join(f"{k} {v}" for k, v in sorted(kinds.items())) + f" · keluaran {a.out}/INDEX.md")
    print("Lanjut: satu agen pemeriksa per potongan (paralel), isi VERDICT.md tiap potongan.")


if __name__ == "__main__":
    main()
