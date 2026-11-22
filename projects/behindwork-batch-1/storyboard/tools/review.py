"""Halaman review storyboard (Artifact) untuk satu atau beberapa episode.

Pakai: python3 review.py <out_dir> ep01 [ep02 ...]
Menulis <out_dir>/index.html + <out_dir>/f/*.jpg (frame baru) + <out_dir>/v1/*.jpg (frame lama pembanding).
"""
import html, json, sys
from pathlib import Path
from PIL import Image

SB = Path(__file__).resolve().parent.parent
V1 = json.loads((SB / "arsip-v1" / "data.json").read_text(encoding="utf-8"))

CHANGES = {
 "ep01": [
  "Gaya baru Story Cinematic (kartu 39): footage dan foto arsip penuh layar, grade natural; masa lalu B&W, masa kini berwarna.",
  "Huruf Helvetica Neue sesuai BRAND; narasi kecil 1–3 kata yang menempel di ruang kosong dekat subjek, bukan pita subtitle di bawah.",
  "Kartu jeda polos hitam/putih tanpa vignette atau gradien radial; merah hanya di kartu putih.",
  "Teks layar hanya dari ucapan: '30 TAHUN LEBIH', '1984–1993', 'TOILET → CHIP AI' diganti kata yang benar-benar diucapkan.",
  "Foto jangkar booth Denny's asli (NVIDIA Blog): hanya Jensen berwarna, 1993 di belakang kepalanya; plakat 'The booth that launched a $1 trillion company'.",
  "Ilustrasi pengganti (peta, booth gambar, stick figure, 100 piktogram) diganti foto/klip nyata atau kartu teks.",
 ],
}
NOTES = {
 "ep01": [
  "Foto papan Oneida di Commons hanya 544 px; untuk render final perlu foto lebih besar.",
  "Klip Fortune dan JRE vertikal, jadi tampil sebagai foto tegak di hitam (caption tertanam dibuang lewat crop).",
 ],
}


def jpg(src, dst, w=1280):
    im = Image.open(src).convert("RGB")
    if im.width > w:
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    dst.parent.mkdir(parents=True, exist_ok=True)
    im.save(dst, quality=82)


def main():
    out = Path(sys.argv[1]); eps = sys.argv[2:]
    data = []
    for ep in eps:
        spec = json.loads((SB / ep / "beats.json").read_text(encoding="utf-8"))
        v1 = next(e for e in V1 if e["n"] == ep[2:])
        v1b = {b["id"]: b for b in v1["beats"]}
        babak = {b["id"]: b["nama"] for b in spec["babak"]}
        beats = []
        for b in spec["beats"]:
            fr = sorted((SB / ep / "png").glob(f"{b['id']}.png")) + sorted((SB / ep / "png").glob(f"{b['id']}-*.png"))
            names = []
            for f in fr:
                n = f"{ep}_{f.stem}.jpg"; jpg(f, out / "f" / n); names.append(n)
            old = []
            for n in v1b.get(b["id"], {}).get("frames", []):
                jpg(SB / "arsip-v1" / "f" / n, out / "v1" / n, 640); old.append(n)
            beats.append(dict(id=b["id"], babak=babak.get(b["babak"], b["babak"]), t=b["t"], vo=b["vo"], layar=b["layar"],
                              aksi=b["aksi"], kamera=b["kamera"], keluar=b["keluar"],
                              sfx=[f"{c['t']} {c['peran']}" for c in b["sfx"]], frames=names, v1=old))
        data.append(dict(ep=ep, title=spec["project"], beats=beats, changes=CHANGES.get(ep, []), notes=NOTES.get(ep, [])))
    page = (Path(__file__).parent / "review_template.html").read_text(encoding="utf-8")
    page = page.replace("/*DATA*/[]", json.dumps(data, ensure_ascii=False))
    (out / "index.html").write_text(page, encoding="utf-8")
    print(out / "index.html", sum(len(b["frames"]) for e in data for b in e["beats"]), "frame")


if __name__ == "__main__":
    main()
