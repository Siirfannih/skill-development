#!/usr/bin/env python3
"""Gerbang revisi video lego: lapisan yang berubah sejak versi yang disetujui harus tercakup ledger (Lantai F27, revision-log §21.2).

Aturan "adegan yang sudah disetujui tidak disentuh" butuh hitungan: tanpa menghitung lapisan mana yang ikut berubah,
revisi beberapa butir bisa mengubah separuh blok teks dan merusak adegan yang tidak diminta.

Yang dibandingkan: `lego/lego.json` proyek pada commit basis (versi yang Irfan setujui) dengan yang sekarang, per `id`
lapisan: isi (`src` = hash cache, berubah bila props/kode lapisan berubah), waktu `t`, posisi `x`/`y`; dan trek `dasar`
(potongan footage + kamera). Lapisan yang berubah, hilang, atau baru harus cocok dengan satu baris `boleh_berubah` di
`qc/cakupan-revisi.json`, yang menunjuk ID ledger di `DECISIONS.md` (kata Irfan verbatim + cakupan).

  python3 revisi_cek.py mulai projects/<proyek> --basis <commit> --alasan "revisi D-031"
      tulis qc/cakupan-revisi.json (basis + daftar boleh_berubah kosong). Jalankan SEBELUM edit pertama.
  python3 revisi_cek.py cek projects/<proyek> [--daftar]
      exit 1 bila ada lapisan berubah di luar cakupan. --daftar mencetak semua lapisan berubah, bukan hanya pelanggar.

qc/cakupan-revisi.json:
  {"basis": "8597352", "alasan": "…",
   "boleh_berubah": [
     {"id": "T071", "ledger": "D-031"},            # satu lapisan
     {"id": "T07*", "ledger": "D-031"},            # pola (fnmatch) untuk satu adegan
     {"id": "*", "atribut": ["isi"], "ledger": "D-034"},   # hanya atribut itu yang boleh berubah (isi | t | pos | gerak | hilang | baru)
     {"dasar": [16, 17], "ledger": "D-033"}        # potongan footage/kamera nomor itu; true = semua potongan
   ]}
File ini sengaja terpisah dari `qc/revisi.json` (mode warisan Lantai F27, yang melonggarkan gerbang untuk video lama).
Blok teks (`teks.json` di folder proyek, bila ada) dibandingkan per atribut: teks, warna, ukuran, gaya, kode, pos,
t, dur, dan kunci lain (kecuali `alasan`). Blok dicocokkan lewat isi `teks` + nomor `kata`, bukan `id`, karena id bisa
bergeser saat blok ditambah. Izin untuk blok teks memakai kunci "teks" (pola fnmatch atas isi teks):
     {"teks": "profesional", "atribut": ["pos"], "ledger": "D-413", "sumber": "Irfan"}
Tiap baris boleh_berubah wajib punya "sumber": "Irfan", "pemilik", "owner" (kata pemilik video), atau "usul-dipilih" (revision-log §21.1). Baris "usul" ditolak:
ide model ditawarkan ke Irfan dulu, tidak dipasang ke video yang sudah ia lihat.
Batas alat: hanya membaca rencana rakit (lego.json, teks.json), tidak melihat piksel; untuk itu `scripts/baseline_lock.py check`.
Mengedit apa pun di `remotion/src` mengganti hash semua lapisan (kunci cache memuat stamp bundle), jadi semuanya terhitung
berubah "isi" walau pikselnya sama. Perbaikan satu cabang di komponen bersama dicatat sebagai satu baris
{"id": "*", "atribut": ["isi"], "ledger": …}: waktu dan posisi lapisan lain tetap dijaga alat ini, pikselnya dijaga
`baseline_lock.py check`. Tanpa baris itu, perubahan komponen bersama gagal di sini, dan itu disengaja.
"""
import argparse, fnmatch, json, os, subprocess, sys

SUMBER_SAH = ("Irfan", "pemilik", "owner", "usul-dipilih")  # "Irfan" tetap sah; "pemilik"/"owner" = netral untuk pengguna lain

TOL_T, TOL_XY = 0.02, 1.0


def git_root(path):
    return subprocess.run(["git", "-C", path, "rev-parse", "--show-toplevel"], capture_output=True, text=True, check=True).stdout.strip()


def muat_basis(proyek, basis):
    root = git_root(proyek)
    rel = os.path.relpath(os.path.join(os.path.abspath(proyek), "lego/lego.json"), root)
    r = subprocess.run(["git", "-C", root, "show", f"{basis}:{rel}"], capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit(f"GAGAL: lego/lego.json tidak ada di commit basis {basis} ({r.stderr.strip().splitlines()[-1] if r.stderr.strip() else 'git show gagal'})")
    return json.loads(r.stdout)


def beda_lapisan(a, b):
    """a = basis, b = sekarang. Kembalikan [(id, [atribut berubah])]."""
    A = {l["id"]: l for l in a.get("lapisan", [])}
    B = {l["id"]: l for l in b.get("lapisan", [])}
    out = []
    for i in sorted(set(A) | set(B)):
        if i not in B: out.append((i, ["hilang"])); continue
        if i not in A: out.append((i, ["baru"])); continue
        la, lb, at = A[i], B[i], []
        if la.get("src") != lb.get("src"): at.append("isi")
        if abs(float(la.get("t", 0)) - float(lb.get("t", 0))) > TOL_T: at.append(f"t {la.get('t')}→{lb.get('t')}")
        if abs(float(la.get("x", 0)) - float(lb.get("x", 0))) > TOL_XY or abs(float(la.get("y", 0)) - float(lb.get("y", 0))) > TOL_XY:
            at.append(f"pos ({la.get('x')},{la.get('y')})→({lb.get('x')},{lb.get('y')})")
        if la.get("gerak") != lb.get("gerak"): at.append("gerak")
        if at: out.append((i, at))
    return out


ABAIKAN_TEKS = {"id", "alasan"}


def muat_basis_teks(proyek, basis):
    root = git_root(proyek)
    rel = os.path.relpath(os.path.join(os.path.abspath(proyek), "teks.json"), root)
    r = subprocess.run(["git", "-C", root, "show", f"{basis}:{rel}"], capture_output=True, text=True)
    return json.loads(r.stdout) if r.returncode == 0 else None


def blok_teks(d):
    """teks.json bisa berupa daftar blok atau objek berisi daftar blok."""
    if isinstance(d, list): return d
    if isinstance(d, dict):
        for k in ("blok", "blocks", "teks"):
            if isinstance(d.get(k), list): return d[k]
        for v in d.values():
            if isinstance(v, list) and v and isinstance(v[0], dict): return v
    return []


def kunci_blok(b):
    return (str(b.get("teks", "")).strip(), json.dumps(b.get("kata"), sort_keys=True))


def beda_teks(a, b):
    """a = basis, b = sekarang. Kembalikan [(label teks, [atribut berubah])], dicocokkan lewat teks + nomor kata."""
    A, B = {}, {}
    for x in blok_teks(a): A.setdefault(kunci_blok(x), x)
    for x in blok_teks(b): B.setdefault(kunci_blok(x), x)
    out = []
    for k in sorted(set(A) | set(B)):
        if k not in B: out.append((k[0], ["hilang"])); continue
        if k not in A: out.append((k[0], ["baru"])); continue
        la, lb, at = A[k], B[k], []
        for key in sorted((set(la) | set(lb)) - ABAIKAN_TEKS):
            va, vb = la.get(key), lb.get(key)
            if key in ("t", "dur") and va is not None and vb is not None:
                if abs(float(va) - float(vb)) > TOL_T: at.append(f"{key} {va}→{vb}")
            elif va != vb:
                at.append(f"{key} {va}→{vb}")
        if at: out.append((k[0], at))
    return out


def teks_diizinkan(label, at, izin):
    return all(any("teks" in z and fnmatch.fnmatch(label, z["teks"]) and ("atribut" not in z or jenis(x) in z["atribut"])
                   for z in izin) for x in at)


def beda_dasar(a, b):
    da, db = a.get("dasar", []), b.get("dasar", [])
    if len(da) != len(db): return [-1]
    return [k for k, (x, y) in enumerate(zip(da, db)) if x != y]


def jenis(at):
    """'t 1.2→1.4' → 't', 'pos (…)' → 'pos'."""
    return at.split(" ")[0]


def diizinkan(i, at, izin):
    """Tiap atribut yang berubah harus dicakup satu baris izin (pola id cocok, dan atributnya tidak dibatasi atau memuatnya)."""
    return all(any(fnmatch.fnmatch(i, z["id"]) and ("atribut" not in z or jenis(x) in z["atribut"]) for z in izin if "id" in z) for x in at)


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    sub = ap.add_subparsers(dest="cmd", required=True)
    m = sub.add_parser("mulai"); m.add_argument("proyek"); m.add_argument("--basis", required=True); m.add_argument("--alasan", required=True)
    c = sub.add_parser("cek"); c.add_argument("proyek"); c.add_argument("--daftar", action="store_true")
    a = ap.parse_args()
    rj = os.path.join(a.proyek, "qc/cakupan-revisi.json")

    if a.cmd == "mulai":
        if os.path.exists(rj): sys.exit(f"GAGAL: {rj} sudah ada; basis tidak diganti di tengah revisi.")
        muat_basis(a.proyek, a.basis)   # pastikan basis punya lego.json
        os.makedirs(os.path.dirname(rj), exist_ok=True)
        json.dump({"basis": a.basis, "alasan": a.alasan, "boleh_berubah": []}, open(rj, "w"), indent=1, ensure_ascii=False)
        print(f"OK {rj} · basis {a.basis}. Isi boleh_berubah dari ledger DECISIONS.md sebelum mengedit.")
        return

    if not os.path.exists(rj):
        sys.exit(f"GAGAL: {rj} tidak ada. Revisi video yang sudah disetujui dimulai dengan `revisi_cek.py mulai` (Lantai F27).")
    R = json.load(open(rj))
    izin = R.get("boleh_berubah", [])
    tanpa_ledger = [z for z in izin if not str(z.get("ledger", "")).strip()]
    if tanpa_ledger:
        sys.exit(f"GAGAL: {len(tanpa_ledger)} baris boleh_berubah tanpa ID ledger (revision-log §21.1): {tanpa_ledger[:3]}")
    tanpa_sumber = [z for z in izin if z.get("sumber") not in SUMBER_SAH]
    if tanpa_sumber:
        sys.exit(f"GAGAL: {len(tanpa_sumber)} baris boleh_berubah tanpa sumber Irfan/pemilik/owner/usul-dipilih (revision-log §21.1). "
                 f"Usul model ditawarkan ke Irfan dulu, tidak dipasang: {tanpa_sumber[:3]}")
    basis = muat_basis(a.proyek, R["basis"])
    kini = json.load(open(os.path.join(a.proyek, "lego/lego.json")))
    lap = beda_lapisan(basis, kini)
    das = beda_dasar(basis, kini)
    pola = [z["id"] for z in izin if "id" in z]
    semua_dasar = any(z.get("dasar") is True for z in izin)
    nomor_dasar = {k for z in izin if isinstance(z.get("dasar"), list) for k in z["dasar"]}
    das_luar = [] if semua_dasar else [k for k in das if k not in nomor_dasar]
    luar = [(i, at) for i, at in lap if not diizinkan(i, at, izin)]
    tj = os.path.join(a.proyek, "teks.json")
    teks_luar, tek = [], []
    if os.path.exists(tj):
        tb = muat_basis_teks(a.proyek, R["basis"])
        if tb is not None:
            tek = beda_teks(tb, json.load(open(tj)))
            teks_luar = [(l, at) for l, at in tek if not teks_diizinkan(l, at, izin)]
    total = len(basis.get("lapisan", []))
    print(f"basis {R['basis']} · lapisan basis {total} · berubah {len(lap)} · tercakup ledger {len(lap) - len(luar)} · di luar cakupan {len(luar)}")
    if das: print(f"dasar (footage/kamera) berubah: potongan {das if das != [-1] else 'jumlahnya berubah'} · {'tercakup' if not das_luar else f'DI LUAR CAKUPAN: {das_luar}'}")
    for i, at in (lap if a.daftar else luar):
        print(f"  {'·' if (i, at) not in luar else 'X'} {i}: {', '.join(at)}")
    if tek:
        print(f"blok teks berubah {len(tek)} · di luar cakupan {len(teks_luar)}")
        for l, at in (tek if a.daftar else teks_luar):
            print(f"  {'·' if (l, at) not in teks_luar else 'X'} teks \"{l}\": {', '.join(at)}")
    tak_terpakai = [p for p in pola if not any(fnmatch.fnmatch(i, p) for i, _ in lap)]
    if tak_terpakai: print(f"catatan: {len(tak_terpakai)} butir ledger belum mengubah lapisan apa pun: {', '.join(tak_terpakai[:8])}")
    if luar or das_luar or teks_luar:
        print("GAGAL: ada perubahan di luar cakupan ledger. Pulihkan lapisan itu ke basis, atau catat kata Irfan yang mengizinkannya di DECISIONS.md lalu tambahkan ke boleh_berubah.")
        sys.exit(1)
    print("LULUS: semua perubahan tercakup ledger.")


if __name__ == "__main__":
    main()
