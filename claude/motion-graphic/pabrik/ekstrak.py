#!/usr/bin/env python3
"""ekstrak.py: fase 1. Klip referensi -> DATA UKUR GERAK (ukur-gerak.schema.json) + plot kurva PNG sebagai bukti.

  ekstrak.py <kartu> --teknik T1 --komponen Nama --jenis kt|kamera|transisi|ui --klip v.mp4 --dari s --sampai s
             [--fokus latar|terang|gelap] [--roi x0,y0,x1,y1] [--namai] [--mekanik "..."]...
  ekstrak.py <kartu> --teknik T1 --komponen Nama --jenis kt --statis --mekanik "..."    (referensi tanpa klip)

Angka diukur skrip (gerak.py: lacak elemen fokus, kamera optical flow, energi residu -> segmen, easing bezier/pegas, overshoot,
hold, stagger, jenis masuk/keluar, potongan, transisi grid/arah). --namai: model vision (claude1 sonnet, hanya Read) melihat strip
12 frame dan MEMILIH nama jenis gerak dari kosakata skema; ia tidak mengisi angka. --statis: hanya keyframe kartu, tanpa kurva
(status registri maksimum teruji-sebagian). Baris `mekanik` disusun otomatis dari angka; --mekanik menambah baris dari kartu.
Juga: fps asli (ffprobe) dan frame duplikat di fps asli. Data ukur adalah BAHAN untuk spec primitif (spec-gerak.schema.json v4),
bukan primitif itu sendiri. Keluaran: ukur/data/<kartu>-<teknik>.json, -kurva.png, -strip.jpg.
"""
import argparse, json, sys, tempfile
from pathlib import Path
from jsonschema import Draft202012Validator
sys.path.insert(0, str(Path(__file__).resolve().parent))
import lib, gerak

SCHEMA = json.loads((lib.PABRIK / "ukur-gerak.schema.json").read_text())
NAMA_GERAK = SCHEMA["properties"]["nama_gerak"]["items"]["enum"]


def validasi(spec):
    """-> daftar pesan galat (kosong = valid)."""
    return [f"{'/'.join(map(str, e.absolute_path)) or '(akar)'}: {e.message}" for e in sorted(Draft202012Validator(SCHEMA).iter_errors(spec), key=lambda e: list(map(str, e.absolute_path)))]


def strip(frames, keluar, n=12, label=None, tinggi=160):
    """Strip n frame merata dari array frame -> JPEG (flipbook). label: teks kiri atas tiap sel (mis. waktu relatif)."""
    from PIL import Image, ImageDraw
    import numpy as np
    idx = np.linspace(0, len(frames) - 1, n).round().astype(int)
    ims = [Image.fromarray(frames[i]) for i in idx]; ims = [im.resize((int(im.width * tinggi / im.height), tinggi)) for im in ims]
    w = ims[0].width; L = Image.new("RGB", (w * n, tinggi), (0, 0, 0)); d = ImageDraw.Draw(L)
    for k, im in enumerate(ims):
        L.paste(im, (k * w, 0)); d.rectangle([k * w, 0, k * w + 44, 13], fill=(0, 0, 0)); d.text((k * w + 2, 1), label(k, idx[k]) if label else f"f{idx[k]}", fill=(255, 255, 0))
    Path(keluar).parent.mkdir(parents=True, exist_ok=True); L.save(keluar, quality=85); return L


def mekanik_otomatis(tt):
    """Kalimat mekanik dari angka terukur (bukan dari model)."""
    m = []; su = gerak._seg_utama(tt)
    if su:
        m.append(f"Gerak utama di saluran {su['saluran']}: {su['durasi_frame']} frame @30 fps, cubic-bezier {su['kurva']['bezier']} (terdekat CURVE.{su['kurva']['terdekat']['nama']}, "
                 f"jarak {su['kurva']['terdekat']['rms']}); pegas setara stiffness {su['spring']['stiffness']}, damping {su['spring']['damping']}; overshoot {round(su['overshoot'] * 100, 1)} %.")
    m.append(f"{len(tt['segmen'])} segmen gerak dalam {tt['durasi_frame']} frame; hold terpanjang {tt['hold']['maks_frame']} frame.")
    st = tt["stagger"]
    if st["interval_rata"]: m.append(f"Stagger {len(st['onset_frame'])} onset (unit {st['unit']}): interval rata-rata {st['interval_rata']} frame, ketidakrataan CV {st['ketidakrataan_cv']}; onset {st['onset_frame']}.")
    f = tt["fokus"]
    if f.get("masuk"): m.append(f"Masuk fokus: {f['masuk']['jenis']} {f['masuk']['durasi_frame']} frame" + (f"; keluar: {f['keluar']['jenis']} {f['keluar']['durasi_frame']} frame." if f.get("keluar") else "."))
    if tt["potong"]: m.append(f"Potongan keras di frame {tt['potong']}.")
    for t in tt["transisi"]: m.append(f"Transisi {t['bentuk']} frame {t['mulai']}-{t['selesai']} ({t['durasi_frame']} frame)" + (f", grid {t['grid']['baris']}x{t['grid']['kolom']} (perkiraan)" if t.get("grid") else "") + (f", arah {t['arah']}" if t.get("arah") else "") + ".")
    k = tt["kamera"]
    if k["n_segmen"]: m.append(f"Kamera: {k['n_segmen']} segmen gerak ({k['jangkar']} jangkar), skala {k['skala_min']}–{k['skala_maks']}, rentang geser x {k['rentang_x']} / y {k['rentang_y']} lebar frame.")
    return m


def namai(strip_path, jenis, model="sonnet"):
    """Vision MEMILIH nama gerak dari kosakata (angka tidak diminta). -> daftar nama valid."""
    p = f"""Baca gambar {strip_path} (strip 12 frame berurutan dari kiri ke kanan, satu potongan klip motion graphic; jenis: {jenis}).
Pilih nama jenis GERAK/TRANSISI yang benar-benar terlihat, HANYA dari daftar ini: {NAMA_GERAK}.
Abaikan warna, gambar, dan isi; nilai hanya geraknya. Jawab satu blok ```json {{"nama_gerak": [...]}}``` (1-4 nama)."""
    try:
        j = lib.ambil_json(lib.llm(p, model=model, baca_di=[Path(strip_path).parent]))
        return [x for x in j.get("nama_gerak", []) if x in NAMA_GERAK]
    except Exception as e:  # nama hanya pelengkap; kegagalan tidak menghentikan ekstraksi
        print(f"(namai gagal: {e})", file=sys.stderr); return []


def ekstrak(kartu, teknik, komponen, jenis, klip=None, dari=None, sampai=None, fokus="latar", roi=None, statis=False, mekanik=(), nama=False, keluar_dir=None):
    out = Path(keluar_dir or lib.PABRIK / "ukur" / "data"); out.mkdir(parents=True, exist_ok=True); sid = f"{kartu}-{teknik}"
    spec = {"versi": 3, "id": sid, "kartu": str(kartu), "teknik": teknik, "komponen": komponen, "jenis": jenis}
    if statis:
        kf = [lib.rel(p) for p in lib.keyframes(kartu)]
        if not mekanik: raise SystemExit("--statis butuh --mekanik (uraian dari kartu; tidak ada klip untuk diukur)")
        spec |= {"sumber": {"statis": True, "keyframe": kf, "fps": 30, "rasio": "16:9"}, "mekanik": list(mekanik),
                 "catatan": "Referensi statis (keyframe saja): tidak ada kurva gerak terukur; status maksimum teruji-sebagian."}
    else:
        fr = gerak.baca_klip(klip, dari, sampai)
        fa = gerak.fps_asli(klip)
        dup = gerak.frame_duplikat(fr) if abs(fa - gerak.FPS) < 0.01 else {"frame": [], "periode": None, "fps_animasi": None, "catatan": f"fps asli {fa}: duplikat tidak diukur di grid 30 fps"}
        tt, sg = gerak.tanda_tangan(fr, fokus, roi)
        rasio = "9:16" if fr.shape[1] > fr.shape[2] else "16:9"
        png = out / f"{sid}-kurva.png"; gerak.plot(sg, tt, png, f"{sid} {komponen}: {Path(klip).name} {dari}-{sampai}s, fokus={fokus} roi={roi}")
        sp = out / f"{sid}-strip.jpg"; strip(fr, sp, label=lambda k, i: f"{i / 30:.2f}s")
        spec |= {"sumber": {"statis": False, "klip": {"path": str(Path(klip).resolve()), "dari": dari, "sampai": sampai}, "fps": 30, "fps_asli": fa, "frame_duplikat": dup, "lebar_analisis": gerak.LEBAR,
                            "rasio": rasio, "fokus": {"mode": fokus, "roi": roi}},
                 **tt, "plot": lib.rel(png), "mekanik": mekanik_otomatis(tt) + list(mekanik),
                 "catatan": "Angka dari gerak.py pada frame 30 fps lebar 320 px; resolusi waktu 1 frame (33 ms). Kamera = gerak global titik tersebar (LK+RANSAC); "
                            "satu elemen yang bergerak sendiri tidak dihitung kamera. Grid transisi dan unit stagger adalah perkiraan."}
        if nama: spec["nama_gerak"] = namai(sp, jenis)
    g = validasi(spec)
    if g: raise SystemExit("spec gagal validasi:\n" + "\n".join(g))
    p = out / f"{sid}.json"; p.write_text(json.dumps(spec, ensure_ascii=False, indent=1) + "\n"); return p, spec


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("kartu"); ap.add_argument("--teknik", default="T1"); ap.add_argument("--komponen", required=True)
    ap.add_argument("--jenis", choices=["kt", "kamera", "transisi", "ui"], required=True)
    ap.add_argument("--klip"); ap.add_argument("--dari", type=float); ap.add_argument("--sampai", type=float)
    ap.add_argument("--fokus", default="latar", choices=["latar", "terang", "gelap"]); ap.add_argument("--roi")
    ap.add_argument("--statis", action="store_true"); ap.add_argument("--mekanik", action="append", default=[]); ap.add_argument("--namai", action="store_true")
    a = ap.parse_args(argv)
    if not a.statis and (a.klip is None or a.dari is None or a.sampai is None): raise SystemExit("butuh --klip --dari --sampai, atau --statis")
    roi = [float(x) for x in a.roi.split(",")] if a.roi else None
    p, _ = ekstrak(a.kartu, a.teknik, a.komponen, a.jenis, a.klip, a.dari, a.sampai, a.fokus, roi, a.statis, a.mekanik, a.namai)
    print(f"ok {lib.rel(p)}"); return 0


if __name__ == "__main__":
    sys.exit(main())
