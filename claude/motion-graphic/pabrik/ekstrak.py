#!/usr/bin/env python3
"""ekstrak.py: fase 1. Bedah satu teknik kartu menjadi spec primitif ber-skema ketat.

  ekstrak.py <kartu-id> [--teknik T1] [--kategori atmosfer|gerak_kamera|permukaan_ui|tipografi] [--komponen Nama]
             [--klip video.mp4 --dari 2.0 --sampai 5.0] [--fps 8] [--maks-frame 24]

Masukan: keyframe kartu (guide/referensi/sheets/keyframes/<id>-k*.jpg) dan, bila --klip diberi, frame klip pada --fps
(lembar kontak berstempel waktu). Model vision (claude2 --model sonnet, membaca gambar lewat tool Read) menulis spec;
skrip memvalidasi terhadap spec.schema.json dan mengulang (maks 2x) dengan pesan galat bila gagal.
Keluaran: pabrik/spec/<kartu>-<teknik>.json. Tanpa klip: spec.terukur.dari_klip = false (gerak hanya perkiraan dari keyframe).
Kartu yang punya field "Video sumber:" dan tidak diberi --klip: dicetak sebagai petunjuk, tidak dipakai otomatis.
"""
import argparse, json, re, subprocess, sys, tempfile
from pathlib import Path
from jsonschema import Draft202012Validator
sys.path.insert(0, str(Path(__file__).resolve().parent))
import lib

SCHEMA = json.loads((lib.PABRIK / "spec.schema.json").read_text())
KATEGORI = ["atmosfer", "gerak_kamera", "permukaan_ui", "tipografi"]


def validasi(spec):
    """-> daftar pesan galat (kosong = valid)."""
    return [f"{'/'.join(map(str, e.absolute_path)) or '(akar)'}: {e.message}" for e in sorted(Draft202012Validator(SCHEMA).iter_errors(spec), key=lambda e: list(map(str, e.absolute_path)))]


def bagian_teknik(kartu_md, teknik):
    """Potong bagian '### Tn · ...' dari kartu (sampai ### berikutnya)."""
    m = re.search(rf"^### {re.escape(teknik)} ·.*?(?=^### |\Z)", kartu_md, re.S | re.M)
    return m.group(0).strip() if m else ""


def sumber_video(kartu_md):
    m = re.search(r"Video sumber:\*?\*?\s*`([^`]+)`", kartu_md)
    return m.group(1) if m else None


def lembar_klip(klip, dari, sampai, fps, maks, keluar):
    """Ekstrak frame klip -> lembar kontak JPEG berstempel waktu. -> (path lembar, daftar (t, path))."""
    from PIL import Image, ImageDraw
    tmp = Path(tempfile.mkdtemp(prefix="pabrik-klip-"))
    subprocess.run(["ffmpeg", "-v", "error", "-ss", str(dari), "-to", str(sampai), "-i", klip, "-vf", f"fps={fps},scale=480:-2",
                    "-q:v", "3", str(tmp / "f%03d.jpg")], check=True)
    fr = sorted(tmp.glob("f*.jpg"))
    if not fr: raise SystemExit("ffmpeg tidak menghasilkan frame; cek --dari/--sampai")
    langkah = max(1, -(-len(fr) // maks)); fr = fr[::langkah]
    ims = [Image.open(f).convert("RGB") for f in fr]; w, h = ims[0].size; kol = 4; baris = -(-len(ims) // kol)
    L = Image.new("RGB", (kol * w, baris * h), (20, 20, 20)); d = ImageDraw.Draw(L); ts = []
    for i, im in enumerate(ims):
        t = round(dari + (int(fr[i].stem[1:]) - 1) / fps, 3); ts.append((t, str(fr[i])))
        L.paste(im, ((i % kol) * w, (i // kol) * h)); d.rectangle([(i % kol) * w, (i // kol) * h, (i % kol) * w + 70, (i // kol) * h + 16], fill=(0, 0, 0))
        d.text(((i % kol) * w + 3, (i // kol) * h + 2), f"{t:.2f}s", fill=(255, 255, 0))
    L.save(keluar, quality=82); return keluar, ts


def prompt(kartu, teknik, md_teknik, kategori, komponen, kf, lembar, fps, ts):
    skema = json.dumps(SCHEMA, ensure_ascii=False)
    klip = (f"\nLEMBAR KLIP (frame berstempel waktu, {fps} fps): {lembar}\nStempel: " + ", ".join(f"{t:.2f}s" for t, _ in ts)
            if lembar else "\nTidak ada klip: hanya keyframe statis. Isi terukur.dari_klip=false dan lintasan/kurva hanya perkiraan wajar dari urutan keyframe (jelaskan di terukur.catatan).")
    return f"""Kamu membedah referensi motion graphic menjadi SPEC primitif terukur (bukan menyalin gaya).
Kartu {kartu}, teknik {teknik}. Kategori target: {kategori or 'pilih satu dari ' + ', '.join(KATEGORI)}. Komponen usulan: {komponen or '(usulkan nama PascalCase)'}.

LANGKAH: (1) Baca tiap gambar di bawah dengan tool Read (path absolut). (2) Ukur dari gambar, bukan menebak: ukuran relatif terhadap tinggi frame, rasio, posisi, arah cahaya, luma/saturasi relatif. (3) Tulis SATU objek JSON spec.
KEYFRAME KARTU:
{chr(10).join(str(p) for p in kf)}{klip}

URAIAN TEKNIK DI KARTU (teks pendamping, boleh dikoreksi oleh apa yang kamu lihat):
{md_teknik or '(tidak ada bagian teknik spesifik; pakai kartu secara umum)'}

ATURAN ISI:
- mekanik = apa yang DIPINDAHKAN ke video lain (aturan gerak/tata letak/proporsi yang berlaku di gaya apa pun). kulit = warna, font, tekstur, objek, kata milik referensi yang TIDAK dibakukan.
- Semua angka terukur harus dalam satuan relatif (fraksi tinggi frame, fraksi sisi elemen, em, detik, frame-rate-agnostik); tanpa hex, tanpa nama font di parameter.
- bukti: minimal satu entri {{frame: path absolut gambar yang kamu pakai, t: detik atau null untuk keyframe statis, catatan}}.
- id = "{kartu}-{teknik}". kartu="{kartu}". teknik="{teknik}".
- Jujur: bila tak bisa diukur dari gambar, beri perkiraan dan katakan di terukur.catatan; jangan mengarang presisi.

SKEMA (JSON Schema, wajib lolos): {skema}

KELUARAN: hanya satu blok ```json ... ``` berisi spec. Tanpa penjelasan lain."""


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("kartu"); ap.add_argument("--teknik", default="T1"); ap.add_argument("--kategori", choices=KATEGORI)
    ap.add_argument("--komponen"); ap.add_argument("--klip"); ap.add_argument("--dari", type=float); ap.add_argument("--sampai", type=float)
    ap.add_argument("--fps", type=float, default=8); ap.add_argument("--maks-frame", type=int, default=24); ap.add_argument("--model", default="sonnet")
    a = ap.parse_args(argv)
    md = lib.kartu_file(a.kartu).read_text()
    kf = lib.keyframes(a.kartu)
    if not kf: raise SystemExit(f"kartu {a.kartu}: tidak ada keyframe di {lib.KEYFRAMES}")
    sv = sumber_video(md)
    if sv and not a.klip: print(f"(petunjuk) kartu mencatat video sumber: {sv}", file=sys.stderr)
    out = lib.PABRIK / "spec" / f"{a.kartu}-{a.teknik}.json"; out.parent.mkdir(exist_ok=True)
    lembar = ts = None
    if a.klip:
        if a.dari is None or a.sampai is None: raise SystemExit("--klip butuh --dari dan --sampai (detik)")
        lembar, ts = lembar_klip(a.klip, a.dari, a.sampai, a.fps, a.maks_frame, lib.PABRIK / "spec" / f"{a.kartu}-{a.teknik}-klip.jpg")
        lembar = str(lembar); kf = kf + [Path(lembar)]
    p = prompt(a.kartu, a.teknik, bagian_teknik(md, a.teknik), a.kategori, a.komponen, kf, lembar, a.fps, ts or [])
    galat = []
    for upaya in range(3):
        q = p if not galat else p + "\n\nPERCOBAAN SEBELUMNYA DITOLAK VALIDATOR, perbaiki:\n- " + "\n- ".join(galat[:12])
        spec = None
        try:
            spec = lib.ambil_json(lib.llm(q, model=a.model))
        except Exception as e:
            galat = [f"jawaban tidak berisi JSON valid: {e}"]; continue
        spec.setdefault("terukur", {"dari_klip": bool(a.klip), "catatan": ""})
        if not a.klip and spec["terukur"].get("dari_klip"): spec["terukur"]["dari_klip"] = False
        galat = validasi(spec)
        if not galat: break
        print(f"upaya {upaya + 1}: {len(galat)} galat skema", file=sys.stderr)
    if galat: raise SystemExit("spec gagal validasi setelah 3 upaya:\n" + "\n".join(galat))
    spec["bukti"] = [dict(b, frame=lib.rel(b["frame"]) if Path(b["frame"]).is_absolute() else b["frame"]) for b in spec["bukti"]]
    out.write_text(json.dumps(spec, ensure_ascii=False, indent=1) + "\n"); print(f"ok {lib.rel(out)}"); return 0


if __name__ == "__main__":
    sys.exit(main())
