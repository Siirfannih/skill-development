#!/usr/bin/env python3
"""bangun.py · menurunkan shotlist.json dan remotion/src/data/ep03.json dari beats.py + script.md (+ words.json bila ada).

  ~/work/mg-venv/bin/python tools_ep/bangun.py [--words words.json] [--dur-vo 49.5]

Tanpa --words: waktu kata diperkirakan 2,9 kata/dtk (tahap naskah). Dengan words.json (hasil words_align.py, kata ASR)
token naskah disejajarkan lewat difflib; token yang tidak cocok diinterpolasi di antara tetangganya.
"""
import argparse, json, math, re, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from beats import BEATS, SFX  # noqa: E402
from PIL import ImageFont  # noqa: E402
import difflib  # noqa: E402

EP = Path(__file__).resolve().parent.parent
FPS, W, H = 30, 1080, 1920
FONT_B = str(EP / "remotion/public/fonts/HelveticaNeueBold.otf")
LS = {"lead": -0.015, "r1": -0.022, "kotak": -0.022, "r2": -0.03, "r6": -0.04}
LH = {"lead": 1.02, "r1": 1.02, "kotak": 1.3, "r2": 0.92, "r6": 0.92}
UKURAN = {"r1": 88, "r2": 112, "r6": 120, "r4": 56}   # = HURUF.ukuran tema.ts (narasi 80, hero 120; kunci 96-120; label 40 <56 tidak dipakai untuk ucapan)
MINHOLD = {"r1": 0.3, "r2": 0.75, "r3": 0.8, "r4": 0.75, "r6": 0.8}
SLOT_Y = {"bawah": 1309, "atas": 1309}   # K-05: caption selalu di pita bawah (pelat putih), pusat y ~1350


def tok(s):
    return re.findall(r"[a-z0-9]+", s.lower().replace("…", " "))


def lebar(teks, size, peran):
    f = ImageFont.truetype(FONT_B, size)
    return max(f.getlength(l) * (1 + LS.get(peran, -0.022)) for l in teks.split("\n"))


def sejajarkan(script_tok, words):
    """-> daftar (s, e) per token naskah."""
    asr = [(re.findall(r"[a-z0-9]+", w["w"].lower()), w) for w in words]
    seq, owner = [], []
    for toks, w in asr:
        for t in toks:
            seq.append(t); owner.append(w)
    sm = difflib.SequenceMatcher(None, script_tok, seq, autojunk=False)
    out = [None] * len(script_tok)
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "equal":
            for k in range(i2 - i1):
                out[i1 + k] = (owner[j1 + k]["s"], owner[j1 + k]["e"])
    # interpolasi token yang kosong
    i = 0
    while i < len(out):
        if out[i] is None:
            j = i
            while j < len(out) and out[j] is None:
                j += 1
            a = out[i - 1][1] if i > 0 else 0.0
            b = out[j][0] if j < len(out) else a + 0.3 * (j - i)
            n = j - i
            for k in range(n):
                out[i + k] = (a + (b - a) * k / n, a + (b - a) * (k + 1) / n)
            i = j
        else:
            i += 1
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--words"); ap.add_argument("--ekor", type=float, default=1.0)
    ap.add_argument("--out-shotlist", default=str(EP / "shotlist.json"))
    ap.add_argument("--out-data", default=str(EP / "remotion/src/data/ep03.json"))
    ap.add_argument("--vo-mulai", type=float, default=0.0, help="detik awal kata pertama bila perlu digeser")
    a = ap.parse_args()

    script_tok = tok(re.sub(r"^---.*?---", " ", (EP / "script.md").read_text(encoding="utf-8"), flags=re.S))
    beat_tok = [tok(b["vo"]) for b in BEATS]
    flat = [t for bt in beat_tok for t in bt]
    if flat != script_tok:
        for i, (x, y) in enumerate(zip(flat, script_tok)):
            if x != y:
                sys.exit(f"GAGAL: vo beat != script.md di token {i}: '{x}' vs '{y}'")
        sys.exit(f"GAGAL: jumlah token beat {len(flat)} != script {len(script_tok)}")

    if a.words:
        words = json.load(open(a.words, encoding="utf-8"))
        tt = sejajarkan(script_tok, words)
    else:
        t = 0.2; tt = []
        for w in script_tok:
            d = (0.17 + 0.03 * len(w)) * (2.9 / 3.0)   # perkiraan kasar
            tt.append((t, t + d)); t += d + 0.04
    # tt per token global
    idx = 0; beat_times = []
    for bt in beat_tok:
        beat_times.append(tt[idx:idx + len(bt)]); idx += len(bt)

    starts = []
    for i, bt in enumerate(beat_times):
        s = 0.0 if i == 0 else max(beat_times[i][0][0] - 0.10, starts[-1] + 1.0)
        starts.append(round(s * FPS) / FPS)
    vo_end = tt[-1][1]
    total = math.ceil((vo_end + a.ekor) * FPS) / FPS
    ends = starts[1:] + [total]

    # ---- narasi + kunci -> kt ----
    kt_all = []; per_beat_kt = []
    for bi, b in enumerate(BEATS):
        toks_b = beat_tok[bi]; times_b = beat_times[bi]
        # frasa asli dengan tanda baca untuk pemecahan grup
        raw = re.findall(r"[^\s]+", b["vo"])
        # petakan raw ke token (satu raw bisa memuat satu token; "kecil-kecil" -> dua)
        items = []   # (kata tampil, token_idx_awal, token_idx_akhir, akhir_klausa)
        ti = 0
        for r in raw:
            n = len(tok(r))
            items.append((r.strip(",.!"), ti, ti + n - 1, r[-1] in ",.?!"))   # tanda tanya dipertahankan di teks layar (KEPUTUSAN 01:18)
            ti += n
        # tandai kunci
        key_spans = []   # (i_item_awal, i_item_akhir, peran, kode, teks); hanya R6 jadi grup sendiri
        key_flags = set()   # indeks item kata kunci kinetik inline (1 kata per beat)
        for (frasa, peran, kode, teks) in b["kunci"]:
            ft = tok(frasa)
            for s0 in range(len(items)):
                seq = []
                e0 = s0
                while e0 < len(items) and len(seq) < len(ft):
                    seq += tok(items[e0][0]); e0 += 1
                if seq == ft:
                    if peran == "R6": key_spans.append((s0, e0 - 1, peran, kode, teks or frasa))
                    else: key_flags.update(range(s0, e0))
                    break
            else:
                sys.exit(f"GAGAL: frasa kunci '{frasa}' tidak ada di beat {bi + 1}")
        grup = []   # dict(items[], peran, kode, teks)
        i = 0
        while i < len(items):
            ks = next((k for k in key_spans if k[0] == i), None)
            if ks:
                grup.append(dict(i0=ks[0], i1=ks[1], peran=ks[2].lower(), kode=ks[3], teks=ks[4])); i = ks[1] + 1; continue
            j = i; n = 0
            while j < len(items) and n < 3:
                if any(k[0] <= j <= k[1] for k in key_spans) and j != i:
                    break
                if n >= 1 and sum(lebar(items[q][0], UKURAN["r1"] * (1.35 if q in key_flags else 1), "r1") for q in range(i, j + 1)) + 0.3 * UKURAN["r1"] * (j - i) > 800:
                    break   # pelat caption satu baris tetap di dalam zona aman (TEPI)
                n += 1; j += 1
                if items[j - 1][3]:
                    break
            grup.append(dict(i0=i, i1=j - 1, peran="r1", kode="T19", teks=None)); i = j
        # yatim: grup r1 satu kata di akhir tanpa tanda baca digabung ke grup sebelumnya bila total <=3 kata
        per_beat_kt.append(grup)
        for g in grup:
            g["beat"] = bi
            ti0 = items[g["i0"]][1]; ti1 = items[g["i1"]][2]
            g["onset"] = times_b[ti0][0] + a.vo_mulai; g["akhir_kata"] = times_b[ti1][1] + a.vo_mulai
            g["kata"] = [(items[k][0], times_b[items[k][1]][0] + a.vo_mulai, k in key_flags) for k in range(g["i0"], g["i1"] + 1)]
            if g["teks"] is None:
                g["teks"] = " ".join(x[0] for x in g["kata"])
            kt_all.append(g)

    # waktu tampil berurutan tanpa tumpang
    prev_end = 0.0
    for gi, g in enumerate(kt_all):
        p = g["peran"]
        minh = MINHOLD.get(p, 0.5)
        if p == "r1":
            minh = min(0.8, max(0.3, 0.12 + 0.03 * len(g["teks"])))
        dari = max(g["onset"], prev_end)
        sampai = max(g["akhir_kata"] + 0.12, dari + minh)
        g["dari"] = round(dari * FPS) / FPS; g["sampai"] = round(sampai * FPS) / FPS
        prev_end = g["sampai"]
    kt_all[0]["dari"] = 0.0
    for gi, g in enumerate(kt_all[:-1]):   # tidak melewati onset grup berikut bila ada jeda
        nxt = kt_all[gi + 1]
        if g["sampai"] > nxt["dari"]:
            g["sampai"] = nxt["dari"]
    # posisi + baris
    kt_out = []; ycount = [0]
    for g in kt_all:
        b = BEATS[g["beat"]]; slot = b["kt_slot"]
        size = UKURAN.get(g["peran"], 80)
        teks = g["teks"]
        w1 = lebar(teks.replace("\n", " "), size, g["peran"] if g["peran"] in LS else "r1")
        baris = 1
        if "\n" in teks:
            baris = 2
        elif w1 > 880:
            ws = teks.split(" ")
            best = None
            for c in range(1, len(ws)):
                l1, l2 = " ".join(ws[:c]), " ".join(ws[c:])
                m = max(lebar(l1, size, "r1"), lebar(l2, size, "r1")); best = (m, l1, l2) if best is None or m < best[0] else best
            teks = best[1] + "\n" + best[2]; baris = 2
        peran = g["peran"]
        y = [1300, 1215, 1345][ycount[0] % 3] if g["peran"] == "r1" else SLOT_Y[slot]
        if g["peran"] == "r1": ycount[0] += 1
        if peran == "r6":
            y = 300
        if baris == 2 and peran != "r6":
            y = 1268
        # kata per kata (untuk sorot kata aktif) hanya dipakai di komponen; gerbang memakai 'teks'
        e = dict(peran=peran if peran != "r4" else "r2", peranVideo=peran.upper(), kode=g["kode"], dari=round(g["dari"], 3), sampai=round(g["sampai"], 3),
                 x=W // 2, y=y, jangkar="tengah", ukuran=size, teks=teks, beat=g["beat"] + 1,
                 kata=[dict(w=w, t=round(t, 3), k=bool(kk)) for w, t, kk in g["kata"]])
        # peran r4 (label diegetik) diukur sebagai r2 oleh gerbang; ukuran 56 tidak dipakai: label besar
        if peran == "r4":
            e["ukuran"] = 96
        kt_out.append(e)

    # ---- adegan + shotlist ----
    adegan = []; beats_out = []; shot_beats = []
    for bi, b in enumerate(BEATS):
        s, en = starts[bi], ends[bi]
        L = en - s
        n = max(0, math.ceil(L / 2.1) - 1)
        per = [round(s + L * (k + 1) / (n + 1), 3) for k in range(n)]
        tipe, fr, alasan = b["tr"]
        kt_keys = [dict(teks=k[3] or k[0], peran=k[1], kode=k[2]) for k in b["kunci"]]
        # beat pertama: sertakan cap pembuka; kt kunci dipertahankan
        sb = dict(beat_id=bi + 1, start_sec=round(s, 3), end_sec=round(en, 3), perubahan_sec=per, vo_text=b["vo"],
                  fakta_ids=b["fakta"], kt=kt_keys, visual_type=b["vt"], metafora=b["met"],
                  transisi_masuk=dict(tipe=tipe, frames=fr, alasan=alasan), kamera=b["kamera"],
                  sfx=[dict(t=round(s + t, 3), file=SFX, pilar=p) for t, p in b["sfx"]])
        if b.get("maskot"):
            sb["maskot"] = b["maskot"]
        shot_beats.append(sb)
        masuk = {"potong": "potong", "whip": "whip", "grid-flash": "grid", "buka-maskot": "potong", "push-through": "potong",
                 "slide-arah": "potong", "drop-in": "potong"}[tipe]
        adegan.append(dict(id=f"b{bi + 1:02d}", dari=round(s, 3), sampai=round(en, 3), masuk=masuk, mode="cutout",
                           lapisan=[dict(k="kanvas", warna="latar"), dict(k="cutout", src=f"cutout/{b['sc']}")]))
        beats_out.append(dict(id=f"b{bi + 1:02d}", sc=b["sc"], dari=round(s * FPS), sampai=round(en * FPS), ev=[round((p_ - s) * FPS) for p_ in per],
                              tr=tipe, trFrames=fr, slot=b["kt_slot"]))
    shot = dict(episode_id="sg003", title="Kenapa es puter bisa beku tanpa kulkas? – Soalnya Gini", gaya="A-kolase",
                kartu_kiblat=["95", "17", "88"], opening_cap="Kalau…", target_duration_sec=round(total, 2), fps=FPS, beats=shot_beats)
    Path(a.out_shotlist).write_text(json.dumps(shot, ensure_ascii=False, indent=1), encoding="utf-8")
    kt_data = [{k: v for k, v in e.items()} for e in kt_out]
    data = dict(durasi=round(total, 3), lebar=W, tinggi=H, fps=FPS, adegan=adegan, kt=kt_data, beats=beats_out)
    Path(a.out_data).parent.mkdir(parents=True, exist_ok=True)
    Path(a.out_data).write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"beat {len(BEATS)} · durasi {total:.2f} dtk · kt {len(kt_out)} · kata VO akhir {vo_end:.2f} dtk")
    for bi, b in enumerate(BEATS):
        print(f"  b{bi + 1:02d} {starts[bi]:5.2f}-{ends[bi]:5.2f} ({ends[bi] - starts[bi]:.2f}) {b['sc']:11s} {b['tr'][0]}")


if __name__ == "__main__":
    main()
