#!/usr/bin/env python3
"""sintesis.py: fase 2. Spec primitif (spec-gerak.schema.json v4) -> PRIMITIF PEMBUNGKUS Remotion di pabrik/kandidat/<Komponen>/.

  sintesis.py spec/<id>.json [--revisi hasil.json] [--model sonnet|opus] [--baca-dingin]

Satu pemanggilan = satu primitif atomik. Primitif menerima konten dari pemanggil (children) dan HANYA menerapkan gerak (transform,
opacity, clipPath, filter blur, waktu); ia tidak menggambar UI, latar, objek, atau warna (lint L1-L7). Demo.tsx menerima
`isian` ("A" | "B") dan merakit kit netral demo-netral/Netral.tsx (lint_demo D1-D3); uji merender kedua isian (uji transfer).
Model (claude1 -p, Write/Edit hanya di kandidat/<Komponen>/, tanpa Bash) menerima spec: mekanik, parameter berlabel, progres
terukur, slot, jangan dicuri. Frame referensi TIDAK diberikan: referensi hanya bahan ukur yang sudah diubah jadi angka.
--baca-dingin: model diminta MENJELASKAN apa yang akan dibuat dan cara dinilai, tanpa menulis berkas (uji baca dingin brief-gate).
"""
import argparse, json, subprocess, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import lib, lint

KALIMAT_IRFAN = ("sintesis harusnya cuma mengambil Animation / Transision / Kinetic Typography style ga meniru atau membuat ulang "
                 "benar benar perframe")

ATURAN = """ATURAN (dicek mesin; pelanggaran = ditolak):
1. <Nama>.tsx = PRIMITIF PEMBUNGKUS. Konten datang dari pemanggil (children). Komponen hanya mengatur transform, opacity,
   clipPath, filter blur, dan waktu. DILARANG di <Nama>.tsx: color, background*, border*, boxShadow, textShadow, fontFamily,
   fontSize, fontWeight, letterSpacing, fill, stroke, elemen svg/path/rect/img/canvas, hex/rgb/hsl, nama warna.
   Kenapa: yang dipindahkan hanya gerak; gaya di dalam komponen menjadi template tersembunyi.
2. Deterministik per frame: useCurrentFrame/useVideoConfig/interpolate/Easing dari remotion; tanpa Math.random, Date.now, timer.
   Impor hanya remotion, react, zod, berkas sefolder, ../../../toolkit/*.
3. Kurva: pakai CURVE bernama dari ../../../toolkit/gerak/curves sesuai `kurva.kurva_toolkit` di spec (baca berkasnya).
4. Parameter spec jadi props berdefault = nilai spec (rentang_aman = batas wajar). Jarak dalam fraksi tinggi/lebar frame
   (useVideoConfig), bukan px tetap.
5. Ekspor: komponen bernama persis <Nama>; `export const <Nama>PropsSchema = z.object({{...}})` (zod 3; ReactNode pakai
   z.custom<React.ReactNode>()). JSDoc di atas komponen: satu kalimat fungsi + "Pakai bila:" (pemicu spec) + "Jangan bila:".
6. Demo.tsx: `export const Demo: React.FC<{{ isian: IdIsian }}>`; impor HANYA remotion, react, ./<Nama>, ../../demo-netral/Netral
   (ISIAN, IdIsian, PanggungNetral, WadahUji, KataUji). Teks diambil dari ISIAN[isian].kata, warna/huruf hanya lewat komponen kit.
   Tanpa hex/rgb/nama warna/font di Demo.tsx. {tata}; tinggi huruf ±{huruf} px;
   isian "B" membungkus baris dengan <WadahUji> (kartu); isian "A" tanpa wadah. Durasi {durasi} frame @30 fps, ukuran {wh}.
7. meta.json: {{"fungsi": satu kalimat, "width": {w}, "height": {h}, "fps": 30, "durasi": {durasi}, "catatan": "..."}}."""

KAMUS = """KAMUS (arti versi pemilik):
- Sintesis = ekstrak CARA BERGERAK (animation, transition, kinetic typography: timing, easing, urutan, arah) menjadi primitif yang
  bisa dipakai ulang. BUKAN membangun ulang frame, adegan, UI, latar, atau objek referensi.
- Primitif/preset = satu blok gerak berparameter; konten, warna, ukuran diganti pemanggil. Satu primitif satu mekanik."""

TATA = {
    "unit-masuk": ("Satu unit = satu <KataUji> berisi satu kata (teks unik per unit), dibungkus <Nama>. Unit ke-i muncul pada frame "
                   "onset[i] = {onset}; posisi diam unit berderet dalam satu baris di tengah frame"),
    "kamera-jalan": ("<Nama> membungkus seluruh panggung; gerak kamera mulai pada frame onset[0] = {onset} dan sebelum itu panggung diam "
                     "(tahan terukur di referensi). Panggung = DUA bidang yang terpisah jelas: bidang awal mengisi frame di awal, dan bidang "
                     "kedua mula-mula di luar frame pada sisi yang dibuka, sehingga di akhir gerak bidang kedua terlihat sebagai bidang baru. "
                     "Isi tiap bidang: beberapa <KataUji> dari ISIAN[isian].kata berukuran beda-beda dan tidak membentuk pola berulang "
                     "(gerak global diukur dari titik sudut; pola berulang membuat pergeseran tidak terbaca); isian B memakai <WadahUji> "
                     "sebagai bidang. SEMUA unit tampil sejak frame 0 dan diam; hanya primitif kamera yang menggerakkan panggung"),
    "unit-ganti": "Satu unit = satu <KataUji> berisi satu kata (teks unik per unit). Unit ke-i muncul pada frame onset[i] = {onset}; semua unit di SATU jangkar (pusat frame); unit ke-i tampil dari onset[i] sampai onset[i+1]-1, unit terakhir sampai akhir",
}

UJI = {
    "unit-masuk": """CARA DINILAI (uji transfer, otomatis; tidak ada perbandingan tampilan dengan referensi karena referensi tidak dipakai):
Demo dirender DUA KALI: isian A dan isian B (token warna, huruf, teks, wadah berbeda). Posisi, opasitas, dan blur tiap unit diukur
per frame dari DOM. Untuk SETIAP unit di KEDUA isian:
- muncul: opasitas >= 0,9 di frame pertama terlihat (potong 1 frame, tanpa fade); frame itu = onset spec +-2 frame.
- offset awal ke bawah (pusat frame pertama - pusat diam) dalam rentang_aman `offset_awal_y` (fraksi tinggi frame); offset x
  dalam rentang_aman `offset_awal_x` (ke kanan positif).
- durasi luncur (frame pertama -> diam, jarak < 0,002 tinggi frame) = `durasi_luncur` +-2 frame.
- progres luncuran 0..1 terhadap `kurva.progres_ref` (waktu dinormalisasi): RMS <= 0,10.
- tanpa pantul: unit tidak melewati posisi diam.
- blur > 0 di frame pertama dan 0 saat diam.
Plus: kulit tidak bocor (tidak ada warna render dalam DeltaE 12 dari `jangan_dicuri.warna`; tidak ada teks/objek/tata letak dari
`jangan_dicuri`), teks tidak tertutup atau terpotong, lint + tsc lulus. Lalu kritikus vision melihat strip kandidat A dan B saja
(tanpa referensi) bersama kalimat mekanik dan daftar jangan dicuri: mekanik terbaca di A? di B? geraknya sama di A dan B? ada
kulit tercuri?""",
    "kamera-jalan": """CARA DINILAI (uji transfer, otomatis; tidak ada perbandingan tampilan dengan referensi karena referensi tidak dipakai):
Demo dirender DUA KALI: isian A dan isian B (token warna, huruf, teks, wadah berbeda). Gerak global panggung diukur dari PIKSEL
render (titik sudut dilacak Lucas-Kanade, transform similaritas RANSAC) di KEDUA isian: geser x total dan skala akhir dalam
rentang_aman spec; geser y < 0,01; tanpa potongan; progres geser x dan skala per frame sejak onset[0] terhadap `kurva.progres_ref`
(waktu absolut, bukan dinormalisasi) RMS <= 0,10; durasi progres 1 % -> 99 % = `durasi_1_99` +-2 frame; tidak melewati posisi akhir.
Catatan ukur: geser x positif = isi panggung bergerak ke kanan; skala = rasio ukuran isi akhir/awal. Plus kulit tidak bocor
(warna dalam DeltaE 12 dari `jangan_dicuri.warna`, objek/tata letak `jangan_dicuri`), lint + tsc lulus, kritikus vision melihat
strip kandidat A dan B saja.""",
    "unit-ganti": """CARA DINILAI (uji transfer, otomatis; tidak ada perbandingan tampilan dengan referensi karena referensi tidak dipakai):
Demo dirender DUA KALI: isian A dan isian B (token warna, huruf, teks, wadah berbeda). Posisi dan opasitas tiap unit diukur per
frame dari DOM. Untuk SETIAP unit di KEDUA isian: muncul pada onset spec +-2 frame dengan opasitas >= 0,9 di frame pertama
(potong, tanpa fade) dan >= 0,9 di frame terakhir sebelum diganti (potong keluar); unit berikut muncul tepat di frame sesudah unit
lama hilang (tanpa celah, tanpa tumpang); tidak ada gerak posisi selama tampil (< 0,002 frame); pusat semua unit dalam
`toleransi_jangkar` satu sama lain walau lebar unit berbeda. Plus kulit tidak bocor (warna dalam DeltaE 12 dari
`jangan_dicuri.warna`, teks/objek/tata letak `jangan_dicuri`), teks tidak tertutup/terpotong, lint + tsc lulus. Lalu kritikus
vision melihat strip kandidat A dan B saja bersama kalimat mekanik dan daftar jangan dicuri.""",
}


def tsc(files):
    r = subprocess.run([str(lib.NODE_BIN / "node"), str(lib.MG / "node_modules/typescript/bin/tsc"), "--noEmit", "--jsx", "react-jsx", "--strict", "--skipLibCheck",
                        "--moduleResolution", "bundler", "--module", "esnext", "--target", "es2020", "--resolveJsonModule", "--lib", "DOM,ES2020", *map(str, files)],
                       capture_output=True, text=True, cwd=str(lib.PABRIK), env=lib.env_node())
    return [l for l in (r.stdout + r.stderr).splitlines() if l.strip()][:20]


def cek(nama, spec):
    """Lint, lint_demo, meta = spec.uji.demo, tsc. -> daftar galat."""
    d = lib.PABRIK / "kandidat" / nama; g = []
    for f in (f"{nama}.tsx", "Demo.tsx", "meta.json"):
        if not (d / f).exists(): g.append(f"berkas tidak ada: {f}")
    if g: return g
    g += [f"lint {x}" for x in lint.lint_file(d / f"{nama}.tsx")]
    g += [f"lint_demo {x}" for x in lint.lint_demo((d / "Demo.tsx").read_text())]
    dm = spec["uji"]["demo"]
    try:
        m = json.loads((d / "meta.json").read_text())
        for k in ("fungsi", "width", "height", "fps", "durasi"):
            if k not in m: g.append(f"meta.json tanpa {k}")
        for k in ("durasi", "width", "height"):
            if m.get(k) != dm[k]: g.append(f"meta.{k} harus {dm[k]}, bukan {m.get(k)}")
    except Exception as e:
        g.append(f"meta.json rusak: {e}")
    if not g: g += [f"tsc {x}" for x in tsc([d / f"{nama}.tsx", d / "Demo.tsx"])]
    return g


def ringkas_spec(spec):
    """Spec untuk model: tanpa path video/arsip (referensi bukan target visual)."""
    s = {k: v for k, v in spec.items() if k not in ("sumber", "kemunculan", "_path")}
    s["sumber"] = {k: spec["sumber"][k] for k in ("fps_asli", "frame_duplikat") if k in spec["sumber"]}
    return s


def brief(spec, nama):
    d = lib.PABRIK / "kandidat" / nama; dm = spec["uji"]["demo"]; w, h = dm["width"], dm["height"]
    aturan = ATURAN.replace("<Nama>", nama).format(durasi=dm["durasi"], wh=f"{w}x{h}", w=w, h=h, onset=dm["onset"], huruf=round(min(w, h) * 0.11),
                                                    tata=TATA.get(spec["uji"]["jenis"], "tata letak paling sederhana yang memperlihatkan mekanik").replace("<Nama>", nama).format(onset=dm["onset"]))
    fa = spec["sumber"].get("frame_duplikat", {}).get("fps_animasi")
    dup = (f" Nilai kembar = frame duplikat animasi sumber {fa:g} fps, bukan jeda: jangan ditiru, buat kurva mulus per frame 30 fps."
           if fa and fa > 1 else " Sumber tanpa frame duplikat.")
    return f"""Kalimat pemilik: "{KALIMAT_IRFAN}"

TUJUAN: model editing di repo skill memakai primitif gerak siap pakai (animasi, transisi, kinetic typography) dan mengisinya dengan
konten serta tema proyeknya sendiri, tanpa menulis animasi dari nol.
UNIT KERJA: SATU primitif atomik Remotion bernama {nama} (id {spec['id']}, lapisan {spec['kategori']}). Mekaniknya:
"{spec['mekanik']}"
BUKAN: membangun ulang adegan, frame, urutan shot, UI, latar, foto, ikon, warna, huruf, atau tata letak referensi; BUKAN juga
mekanik lain yang terlihat di referensi (pergantian warna, gerak kamera, sisipan gambar) karena itu primitif terpisah. Kamu tidak
menerima gambar referensi; spec di bawah adalah hasil ukur geraknya.

{KAMUS}

INPUT:
- Spec primitif (di bawah). Angka berlabel `measured` mengikat; `estimated` adalah taksiran dalam rentang_aman.
  `kurva.progres_ref` = progres terukur per frame asli.{dup} Jarak dalam satuan yang ditulis di `satuan` parameter
  (fraksi lebar frame untuk x, fraksi tinggi frame untuk y dan blur; useVideoConfig()). Skala kamera berpusat di tengah frame, dan
  geser kamera diukur pada titik pusat frame.
- Toolkit: {lib.MG}/toolkit/gerak/curves.ts (baca; kurva `{spec.get('kurva', {}).get('kurva_toolkit', '-')}`).
- Kit demo netral: {lib.PABRIK}/demo-netral/Netral.tsx (baca).

OUTPUT (tulis dengan Write, path absolut, jangan menyentuh berkas lain): {d}/{nama}.tsx, {d}/Demo.tsx, {d}/meta.json.

{aturan}

{UJI.get(spec['uji']['jenis'], 'CARA DINILAI: uji transfer dua isian slot, angka gerak terhadap spec, kulit tidak bocor.')}

BERHENTI DAN LAPOR (tulis {d}/BERHENTI.md berisi alasan, jangan menebak) bila: angka spec saling bertentangan atau tidak cukup untuk
menentukan gerak, atau mekanik tidak bisa dibuat tanpa menggambar benda/warna referensi.

SPEC:
{json.dumps(ringkas_spec(spec), ensure_ascii=False)}
"""


def baca_dingin(spec, model="sonnet"):
    """Uji baca dingin brief-gate 3.3: model menjelaskan rencana tanpa menulis berkas."""
    p = brief(spec, spec["komponen"]) + ("\n\nJANGAN kerjakan dan jangan menulis berkas. Jawab ringkas (maks 8 baris): (1) apa yang akan kamu buat, "
                                         "(2) apa yang TIDAK akan kamu buat, (3) bagaimana hasilmu dinilai, (4) pertanyaan bila brief bolong.")
    return lib.llm(p, model=model)


def sintesis(spec_path, revisi=None, model="sonnet"):
    spec = json.loads(Path(spec_path).read_text()); nama = spec["komponen"]
    d = lib.PABRIK / "kandidat" / nama; d.mkdir(parents=True, exist_ok=True)
    p = brief(spec, nama)
    if revisi:
        p += f"""
MODE REVISI: berkas sudah ada di {d}. Baca ketiganya, lalu SUNTING di tempat agar angka gerak memenuhi CARA DINILAI. Pertahankan
yang sudah lulus. Jangan menambah dekorasi atau objek; perbaiki waktu, jarak, kurva, blur. Hasil ukur putaran sebelumnya:
{json.dumps(revisi, ensure_ascii=False)}
"""
    (d / "brief.txt").write_text(p)
    lib.llm(p + "\nSetelah selesai menulis, balas satu kata: SELESAI.", model=model, tulis_di=d, baca_di=[lib.PABRIK, lib.MG / "toolkit"])
    for i in range(2):
        if (d / "BERHENTI.md").exists(): break
        g = cek(nama, spec)
        if not g: break
        print(f"sintesis {nama}: {len(g)} galat otomatis, perbaikan {i + 1}", file=sys.stderr)
        lib.llm(f"Berkas primitif {nama} di {d} ditolak pemeriksa otomatis. Baca lalu perbaiki di tempat (Edit) tanpa mengubah gerak selain yang perlu:\n- "
                + "\n- ".join(g) + "\n\n" + brief(spec, nama) + "\nBalas SELESAI.", model=model, tulis_di=d, baca_di=[lib.PABRIK, lib.MG / "toolkit"])
    return nama, (["BERHENTI.md: " + (d / "BERHENTI.md").read_text()[:400]] if (d / "BERHENTI.md").exists() else cek(nama, spec))


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("spec"); ap.add_argument("--revisi"); ap.add_argument("--model", default="sonnet"); ap.add_argument("--baca-dingin", action="store_true")
    a = ap.parse_args(argv)
    if a.baca_dingin:
        print(baca_dingin(json.loads(Path(a.spec).read_text()), a.model)); return 0
    rev = json.loads(Path(a.revisi).read_text()) if a.revisi else None
    nama, g = sintesis(a.spec, rev, a.model)
    if g:
        print(f"{nama}: masih ada galat:\n" + "\n".join(g), file=sys.stderr); return 1
    print(f"ok kandidat/{nama}"); return 0


if __name__ == "__main__":
    sys.exit(main())
