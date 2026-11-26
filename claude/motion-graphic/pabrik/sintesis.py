#!/usr/bin/env python3
"""sintesis.py: fase 2. Satu spec -> satu komponen Remotion di pabrik/kandidat/<Nama>/.

  sintesis.py <spec.json> [--nama Nama] [--revisi hasil-uji.json]

Berkas yang ditulis model (CLI claude --model sonnet, dengan tool Write di pabrik/kandidat/<Nama>/):
  <Nama>.tsx   komponen + `export const <Nama>PropsSchema` (zod); semua nilai visual = props; lulus lint.py
  Demo.tsx     DemoA dan DemoB: komponen yang sama dengan dua set token warna/huruf berbeda
  meta.json    {fungsi, width, height, fps, durasi, stills[], urutan{dari,sampai}, catatan}
Cek otomatis setelah ditulis: lint.py + tsc --noEmit; galat dikirim balik ke model (maks 2 perbaikan).
Mode --revisi: model menerima berkas yang ada + kritik/metrik putaran uji dan menyunting di tempat.
"""
import argparse, json, re, subprocess, sys
from pathlib import Path
from PIL import Image
sys.path.insert(0, str(Path(__file__).resolve().parent))
import lib, lint

ATURAN_T = """ATURAN KOMPONEN (dicek mesin; pelanggaran = ditolak):
1. Semua nilai visual berupa PROPS: warna, huruf, ukuran, durasi, kurva, biji acak. Tanpa hex/rgb()/hsl()/nama warna CSS, tanpa font-family literal di <Nama>.tsx. Warna dan huruf datang dari prop `tokens` (mis. latar, tinta, aksen, huruf). Boleh interpolasi token ke gradien/bayangan (`${tokens.aksen}`).
2. Mandiri dan deterministik per frame: hanya `useCurrentFrame`, `useVideoConfig`, `interpolate`, `spring` dari remotion; tanpa Math.random (pakai PRNG berbiji sendiri dari props.seed), tanpa Date.now/new Date/performance.now/requestAnimationFrame/setTimeout.
3. WAJIB memakai toolkit repo, bukan versi sendiri. Impor yang boleh: remotion, react, zod, berkas sesama folder, dan modul toolkit (path dari folder komponen): ../../../toolkit/gerak/curves (CURVE, dur, react, move, arc, drift, clamp01, lerp), ../../../toolkit/gerak/timing (stagger, dampTrack, vanWijk, timeline), ../../../toolkit/kamera/Camera25D (Camera25D, Layer25D, cameraAt; kamera berkeyframe + parallax), ../../../toolkit/latar/LightWaveBg dan GenerativeBG dan Grain (hanya bila spec meminta latar/cahaya/tekstur), ../../../toolkit/transisi, ../../../scripts/remotion/ae-primitives/*. Baca ../../../toolkit/README.md dan berkas yang dipakai (Read) sebelum menulis. DILARANG menulis easing/kurva/kamera/latar sendiri bila toolkit sudah punya; panggil kurva bernama dari CURVE.
4. Ukuran dalam satuan relatif (fraksi tinggi frame dari useVideoConfig), bukan px tetap, agar sama di 16:9 dan 9:16.
5. Ekspor: komponen bernama persis <Nama>, `export const <Nama>PropsSchema = z.object({...})` (zod 3), `export type <Nama>Props = z.infer<...>`. Komentar JSDoc di atas komponen: satu kalimat fungsi, baris "Pakai bila:" dan "Jangan bila:".
6. Tanpa gaya bawaan: tidak ada nilai default untuk warna/huruf; default hanya untuk angka mekanik yang diambil dari spec.parameter (angka kulit tidak dibakukan).
7. Komponen mereproduksi MEKANIK spec (spec.mekanik), bukan KULIT (spec.kulit): jangan meniru warna, font, objek, kata milik referensi.
8. Demo.tsx boleh memakai hex/font literal, TETAPI hanya dua set token wajib dari tokens-netral.json (netral dingin terang = A, netral hangat gelap = B): A = {tokA}; B = {tokB} (peran latar, permukaan, tinta, redup, aksen, aksen2, berurutan). Setiap hex di Demo.tsx harus salah satu dari 12 nilai itu (atau #000000/#FFFFFF); campuran antar-peran lewat opacity/gradien boleh. DILARANG membawa warna, wallpaper, foto, atau latar bertema meniru referensi (mis. matahari terbenam oranye): kulit referensi tidak ikut, hanya mekanik. Bentuk ilustrasi harus netral dan memakai warna token saja. DemoA dan DemoB memakai komponen yang SAMA dengan props identik kecuali tokens (dua set WARNA yang benar-benar berbeda, mis. terang-krem vs gelap-biru; keluarga huruf dan bobot SAMA di A dan B, karena uji dua-token mengukur bahwa struktur/tata letak tetap sama ketika hanya warna berganti). Isi demo harus bermakna (teks/objek nyata, bukan placeholder atau kotak kosong) dan menampilkan mekanik inti dalam durasi 2-4 detik pada 30 fps (durasi <= 120 frame).
9. meta.json: {"palet": {"A": [6 hex set A persis], "B": [6 hex set B persis]} (urutan peran sama; setiap hex ada di Demo.tsx; warna lain di render dianggap dosa),"fungsi": satu kalimat Indonesia, "width","height","fps":30,"durasi":<frame>,"stills":[3-4 indeks frame kunci berbeda yang menampilkan keadaan penting],"urutan":{"dari":0,"sampai":<durasi-1>},"catatan":"..."}. width/height: {wh} (sesuai rasio referensi).
10. DAFTAR DOSA (satu saja = ditolak): elemen/lapisan/grid/transisi yang menutupi atau memotong teks pada frame mana pun (teks tertutup > 10 %, atau ada lapisan non-teks di atas kotak teks); teks keluar kotak wadahnya; frame tampak rusak/glitch; kulit referensi (warna/wallpaper/objek referensi) bocor ke demo; bila memakai latar toolkit: pola dari noise (asap/lava lamp), orb/sumber cahaya utuh di dalam frame (pakai ekor cahaya dari luar layar), ruang negatif < 50 % (piksel ΔE<3 dari warna dasar), grain > 2 %; gradien ragu-ragu (frame satu nada pucat tanpa zona tegas); noda/gradien radial bulat di pojok tanpa arah cahaya; bola/benda 3D generik tanpa makna; elemen utama kecil (<20% luas) di tengah seperti slide; halo/glow di belakang teks; blur pada teks yang harus dibaca; placeholder (kotak kosong, garis abu pengganti teks); teks < 24px@1080 (sisi pendek); warna di luar meta.palet (kecuali campuran antar warna palet/hitam/putih); tabrakan teks-teks atau teks-objek; pengulangan pola gambar yang pernah ditolak (zona biru tetap di pojok kanan bawah, bola 3D + garis acak, gradien pucat + teks abu). Hindari semuanya sejak awal.
Kontrak render demo: <Composition> dibuat otomatis oleh pabrik dari meta.json: component={DemoA}/{DemoB}, tanpa props. Jangan membuat registerRoot atau entry sendiri."""


def aturan(spec):
    return (ATURAN_T.replace('{wh}', ukuran_rasio(spec)).replace('{tokA}', ", ".join(lib.palet_token("A"))).replace('{tokB}', ", ".join(lib.palet_token("B"))))


def tsc(files):
    r = subprocess.run([str(lib.NODE_BIN / "node"), str(lib.MG / "node_modules/typescript/bin/tsc"), "--noEmit", "--jsx", "react-jsx", "--strict", "--skipLibCheck",
                        "--moduleResolution", "bundler", "--module", "esnext", "--target", "es2020", "--resolveJsonModule", "--lib", "DOM,ES2020", *map(str, files)],
                       capture_output=True, text=True, cwd=str(lib.PABRIK), env=lib.env_node())
    return [l for l in (r.stdout + r.stderr).splitlines() if l.strip()][:20]


def cek(nama):
    d = lib.PABRIK / "kandidat" / nama; g = []
    for f in (f"{nama}.tsx", "Demo.tsx", "meta.json"):
        if not (d / f).exists(): g.append(f"berkas tidak ada: {f}")
    if g: return g
    g += [f"lint {x}" for x in lint.lint_file(d / f"{nama}.tsx")]
    try:
        m = json.loads((d / "meta.json").read_text())
        for k in ("palet", "fungsi", "width", "height", "fps", "durasi", "stills", "urutan"):
            if k not in m: g.append(f"meta.json tanpa {k}")
        if m.get("durasi", 0) > 150: g.append("durasi > 150 frame")
        demo = (d / "Demo.tsx").read_text().lower()
        for k in ("A", "B"):
            if sorted(h.lower() for h in m.get("palet", {}).get(k, [])) != sorted(h.lower() for h in lib.palet_token(k)):
                g.append(f"meta.palet.{k} harus persis set token netral wajib {lib.palet_token(k)}")
            for h in lib.palet_token(k):
                if h.lower() not in demo: g.append(f"palet {k}: {h} tidak ada di Demo.tsx")
        boleh = {h.lower() for k in ("A", "B") for h in lib.palet_token(k)} | {"#000000", "#000", "#ffffff", "#fff"}
        liar = sorted({x.lower() for x in re.findall(r"#[0-9a-fA-F]{3,8}\b", demo) if x.lower() not in boleh})
        if liar: g.append(f"Demo.tsx memakai hex di luar set token netral: {liar[:6]}")
    except Exception as e:
        g.append(f"meta.json rusak: {e}")
    if "export const DemoA" not in (d / "Demo.tsx").read_text() or "export const DemoB" not in (d / "Demo.tsx").read_text():
        g.append("Demo.tsx harus mengekspor DemoA dan DemoB")
    if not g: g += [f"tsc {x}" for x in tsc([d / f"{nama}.tsx", d / "Demo.tsx"])]
    return g


def ukuran_rasio(spec):
    for b in spec["bukti"]:
        p = lib.MG / b["frame"]
        if p.exists():
            w, h = Image.open(p).size
            return "1280x720 (landscape 16:9)" if w >= h else "720x1280 (portrait 9:16)"
    return "1280x720 (landscape 16:9)"


def sintesis(spec_path, nama=None, revisi=None, model="sonnet"):
    spec = json.loads(Path(spec_path).read_text()); nama = nama or spec["komponen_usulan"]
    d = lib.PABRIK / "kandidat" / nama; d.mkdir(parents=True, exist_ok=True)
    pembuka = f"""Kamu menulis SATU komponen Remotion (React + TypeScript) bernama {nama} dari spec terukur di bawah.
Tulis berkas dengan tool Write ke: {d}/{nama}.tsx, {d}/Demo.tsx, {d}/meta.json (path absolut). Jangan menyentuh berkas lain.
Bahan kurva/timing yang boleh diimpor ada di {lib.MG}/scripts/remotion/curves.ts dan timing.ts: baca keduanya dulu (Read) agar tidak mengarang ulang.
Lihat juga gambar referensi di spec.bukti (path relatif ke {lib.MG}) dengan Read, supaya proporsi dan tata letak mengikuti ukuran nyata.

{aturan(spec)}

SPEC:
{json.dumps(spec, ensure_ascii=False, indent=1)}
"""
    if revisi:
        pembuka += f"""
MODE REVISI: berkas sudah ada di {d}. Baca ketiganya, lalu SUNTING di tempat (Edit/Write) untuk memperbaiki temuan putaran uji berikut. Pertahankan yang sudah benar; jangan menulis ulang dari nol kecuali perlu. Metrik keras yang gagal harus lolos; kritik rubrik harus dijawab dengan perubahan nyata pada render.
HASIL UJI PUTARAN SEBELUMNYA:
{json.dumps(revisi, ensure_ascii=False, indent=1)}
"""
    lib.llm(pembuka + "\nSetelah selesai menulis, balas satu kata: SELESAI.", model=model, tulis_di=d)
    for i in range(2):
        g = cek(nama)
        if not g: break
        print(f"sintesis {nama}: {len(g)} galat otomatis, perbaikan {i + 1}", file=sys.stderr)
        lib.llm(f"Berkas komponen {nama} di {d} ditolak pemeriksa otomatis. Baca lalu perbaiki di tempat (Edit) tanpa mengubah perilaku selain yang perlu:\n- " + "\n- ".join(g) + f"\n\n{aturan(spec)}\nBalas SELESAI.", model=model, tulis_di=d)
    g = cek(nama)
    return nama, g


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("spec"); ap.add_argument("--nama"); ap.add_argument("--revisi"); ap.add_argument("--model", default="sonnet")
    a = ap.parse_args(argv)
    rev = json.loads(Path(a.revisi).read_text()) if a.revisi else None
    nama, g = sintesis(a.spec, a.nama, rev, a.model)
    if g:
        print(f"{nama}: masih ada galat otomatis:\n" + "\n".join(g), file=sys.stderr); return 1
    print(f"ok kandidat/{nama}"); return 0


if __name__ == "__main__":
    sys.exit(main())
