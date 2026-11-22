"""Bangun data episode (src/data/epNN.json) dari rancangan + waktu kata VO.

Pakai: python bangun_ep.py rancangan_ep01.py

Rancangan (modul Python) mendefinisikan:
  VO_BEATS, VO_WORDS   path vo_beats.json / vo_words.json (rakit VO)
  VO_SRC               path relatif public/ untuk vo.wav
  SUB_MD               path tabel subtitle Indonesia (| Beat | ... |)
  adegan(w)            -> list adegan; w(kata, beat, n=1) mengembalikan detik mulai kata ke-n yang cocok di beat
  kt(w)                -> list KT
  EKSTRA_SFX(w)        -> cue tambahan (opsional)
  DURASI_TAMBAH        detik setelah VO selesai (kartu sumber)
SFX otomatis (aturan SFX terbaru: bunyi di setiap objek/visual/gerak, hidup selama objeknya hidup):
  bed konstan sepanjang video; tiap pergantian adegan; tiap lapisan masuk (inset = kertas/shutter, foto jangkar = shutter);
  tiap gerak kamera > 2,5 dtk = pad rendah yang dipotong di akhir gerak; tiap kata KT r1/lead = tick 4 varian bergiliran,
  laju 0,95–1,05; r2/r6 = hantam lembut; kotak = swoosh ringan; giant = deret klik selama digit berputar; kilat negatif = glitch.
"""
import importlib.util, json, re, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent


def muat(path):
    spec = importlib.util.spec_from_file_location("ranc", path); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m


def norm(s):
    return re.sub(r"[^a-z0-9]", "", s.lower())


def main():
    R = muat(sys.argv[1])
    beats = {b["id"]: b for b in json.load(open(R.VO_BEATS))["beats"]}
    words = json.load(open(R.VO_WORDS))["words"]

    def w(kata, beat, n=1, akhir=False):
        b = beats[beat]; k = norm(kata); hit = 0
        for x in words:
            if b["mulai"] - 0.08 <= x["start"] < b["selesai"] + 0.05 and norm(x["word"]).startswith(k):
                hit += 1
                if hit == n:
                    return round(x["end"] if akhir else x["start"], 3)
        raise SystemExit(f"kata '{kata}' ke-{n} tidak ada di beat {beat}")

    w.beat = beats
    vo_end = max(b["selesai"] for b in beats.values())
    durasi = round(vo_end + getattr(R, "DURASI_TAMBAH", 0.0), 3)
    adegan = R.adegan(w); kt = R.kt(w)
    # subtitle: tampilan per beat dibagi menurut panjang karakter, batas dijepret ke awal kata terdekat
    sub = []
    md = Path(R.SUB_MD).read_text()
    for m in re.finditer(r"^\| (\d\d) \| (.+?) \|", md, re.M):
        bid, cell = m.group(1), m.group(2).strip()
        if bid not in beats or cell.startswith("("):
            continue
        disp = [d.strip() for d in cell.split(" / ") if d.strip()]
        b = beats[bid]; a0, a1 = b["mulai"], b["selesai"]
        tot = sum(len(re.sub("<br>", "", d)) for d in disp); t = a0
        bw = [x for x in words if a0 - 0.05 <= x["start"] < a1]
        ws = [x["start"] for x in bw]
        # batas tampilan = awal kalimat Inggris berikutnya bila jumlah kalimat cocok dengan jumlah tampilan
        awal = [bw[0]["start"]] + [bw[j + 1]["start"] for j in range(len(bw) - 1) if re.search(r"[.?!:]$", bw[j]["word"])] if bw else []
        if len(awal) > len(disp):  # kalimat lebih banyak: gabungkan menurut proporsi karakter
            pass
        for i, d in enumerate(disp):
            if i == len(disp) - 1:
                t1 = a1
            elif len(awal) == len(disp):
                t1 = awal[i + 1]
            else:
                t1 = t + (a1 - a0) * len(re.sub("<br>", "", d)) / tot
                kand = [s_ for s_ in awal[1:] if s_ > t] or ws
                if kand:
                    t1 = min(kand, key=lambda s_: abs(s_ - t1))
            sub.append({"dari": round(t, 3), "sampai": round(t1 + (0.25 if i == len(disp) - 1 else 0), 3), "teks": d}); t = t1
    # tutup celah subtitle kecil antar-beat supaya pita tidak berkedip
    for i in range(len(sub) - 1):
        if 0 < sub[i + 1]["dari"] - sub[i]["sampai"] < 0.4:
            sub[i]["sampai"] = sub[i + 1]["dari"]
        if sub[i]["sampai"] > sub[i + 1]["dari"]:
            sub[i]["sampai"] = sub[i + 1]["dari"]
    ucapan = [[b["mulai"], b["selesai"]] for b in sorted(beats.values(), key=lambda x: x["mulai"])]

    # ---- SFX otomatis
    cues = []
    def cue(t, file, gain, pilar, peran, sampai=None, laju=1.0):
        c = {"t": round(max(0, t), 3), "file": file, "gain": gain, "pilar": pilar, "peran": peran, "laju": laju}
        if sampai: c["sampai"] = round(sampai, 3)
        cues.append(c)
    bed_len = 28.8; t = 0.0
    while t < durasi:
        cue(t, "sfx/bed_vinyl.wav", -31, "bed", "bed ambien pita/vinyl", sampai=min(durasi, t + bed_len)); t += bed_len - 0.4
    for i, a in enumerate(adegan):
        kinds = [l["k"] for l in a["lapisan"]]
        if i > 0:
            if "kartu" in kinds:
                cue(a["dari"], "sfx/cut_kontras.mp3", -12, "transisi", "potong ke kartu")
            elif "belah" in kinds:
                cue(a["dari"] - 0.15, "sfx/whoosh_mids.wav", -12, "transisi", "layar terbelah masuk")
            else:
                cue(a["dari"] - 0.12, "sfx/whoosh_airy.wav", -15, "transisi", "potong ke footage")
        for l in a["lapisan"]:
            if l["k"] == "inset":
                cue(a["dari"] + 0.02, "sfx/paper_slide.wav", -14, "foley", "foto/klip tegak masuk")
            if l["k"] == "potong":
                cue(a["dari"] + 0.05, "sfx/shutter.wav", -12, "foley", "foto jangkar (rana kamera)")
            if l["k"] == "tracking":
                cue(a["dari"], "sfx/tape_rewind.mp3", -14, "transisi", "pita diputar mundur", sampai=a["sampai"])
            kb = l.get("kb") or {}
            dur = a["sampai"] - a["dari"]
            if l["k"] in ("video", "gambar", "inset") and dur > 2.5 and abs(kb.get("s1", 1.04) - kb.get("s0", 1.0)) >= 0.03:
                cue(a["dari"] + 0.1, "sfx/pad_low.wav", -26, "transisi", "gerak kamera panjang", sampai=min(a["sampai"], a["dari"] + 3.0))
        if a.get("invert"):
            cue(a["invert"][0], "sfx/glitch_cut.mp3", -14, "aksen", "kilat negatif")
    ticks = ["sfx/tick1.wav", "sfx/tick2.wav", "sfx/tick3.wav", "sfx/tick4.wav"]; laju = [1.0, 0.96, 1.04, 0.98, 1.02]; ti = 0
    for k in kt:
        if k["peran"] in ("r1", "lead"):
            for x in k.get("kata", []):
                cue(x["t"], ticks[ti % 4], -19, "tick", "kata KT muncul", laju=laju[ti % 5]); ti += 1
        elif k["peran"] in ("r2", "r6"):
            cue(k["dari"], "sfx/impact_thud.wav", -14, "aksen", "kata kunci menghantam")
        elif k["peran"] == "kotak":
            cue(k["dari"], "sfx/swoosh_light.wav", -16, "tick", "kotak sorot melebar")
        elif k["peran"] == "giant" and k.get("angka"):
            cue(k["dari"], "sfx/klik_deret.mp3", -15, "tick", "digit tahun berputar", sampai=k["dari"] + k["angka"]["durasi"])
            cue(k["dari"] + k["angka"]["durasi"], "sfx/impact_thud.wav", -12, "aksen", "tahun mendarat")
    for c in getattr(R, "EKSTRA_SFX", lambda w: [])(w):
        cues.append(c)
    cues.sort(key=lambda c: c["t"])
    # bunyi non-bed yang terlalu rapat (< 100 ms) digeser sedikit, bukan dibuang: setiap objek tetap berbunyi
    last = -1
    for c in cues:
        if c["pilar"] == "bed":
            continue
        if c["t"] - last < 0.1:
            c["t"] = round(last + 0.1, 3)
        last = c["t"]

    ep = {"id": R.ID, "durasi": durasi, "vo": R.VO_SRC, "adegan": adegan, "kt": kt, "sub": sub, "sfx": cues,
          "musik": getattr(R, "MUSIK", []), "ucapan": ucapan}
    out = ROOT / "src" / "data" / f"{R.ID.lower()}.json"; out.write_text(json.dumps(ep, ensure_ascii=False, indent=1))
    print(f"{out.name}: {durasi} dtk, {len(adegan)} adegan, {len(kt)} KT, {len(sub)} subtitle, {len(cues)} cue SFX")


if __name__ == "__main__":
    main()
