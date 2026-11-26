#!/usr/bin/env python3
"""Tulis PETA.md: peta repo supaya model membuka hanya file yang dibutuhkan.

Bagian atas (RUTE) ditulis tangan di sini: pekerjaan → file yang dibuka, berurutan. Bagian bawah dibuat otomatis dari
isi file: judul + kalimat pertama tiap referensi/guide, baris pertama docstring/komentar tiap skrip, dan `description`
tiap SKILL.md. Karena dibuat dari file, ringkasannya tidak basi selama skrip ini dijalankan setelah file berubah.

  python3 tools/peta.py          tulis ulang PETA.md
  python3 tools/peta.py --check  keluar 1 bila PETA.md tidak sama dengan isi repo (dipanggil doctor.sh); tidak menulis
  python3 tools/peta.py --help   bantuan ini
"""
import argparse, os, re, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
MG = "claude/motion-graphic"

RUTE = f"""## Cara membaca (ringkas; pintunya `AGENTS.md`)

- Urutan otoritas: kalimat di `AGENTS.md` (kata Irfan → NEGATIF [mutlak] → REF-SPEC → brief/proyek → profil merek → kartu → `references/`/`guide/`).
- Cocokkan setiap pesan baru dengan satu baris Rute sebelum edit pertama.
- File rute dibaca utuh; `grep` bukan membaca.

## Rute: pekerjaan → buka ini (urut, berhenti bila cukup)

| Pekerjaan | Buka | Jangan buka |
|---|---|---|
| Sesi produksi video | `{MG}/SKILL.md` (NEGATIF + alur 8 langkah + tabel "Bila … buka …") → `projects/<proyek>/` (`DECISIONS.md`, `RESEP.md`, `TAHAP.md`, `STATUS.md`); kartu per kartu via `{MG}/scripts/cookbook/pilih_kartu.py` (2–4 kartu untuk seluruh video; filter `--pack` dari `{MG}/cookbook/INDEX.md`) | pack utuh, `PETA.md` selebihnya, `RETRO.md`, `SUMBER.md`, `cookbook/CATALOG.md` utuh, `_vault/`; folder proyek lain; template gaya tetap |
| Awal sesi lainnya | `AGENTS.md` → `PETA.md` (file ini) | seluruh `references/` sekaligus |
| Fase 1 pra-produksi (Brief, Naskah, Storyboard/block out): script, bedah referensi, storyboard | `{MG}/cookbook/README.md` (§1 Prinsip, §2 Alur dua langkah) → `{MG}/scripts/cookbook/pilih_kartu.py --cari "<fungsi cerita>"` per beat (mencocokkan *Narrative trigger* di `{MG}/cookbook/CATALOG.md` lewat router `{MG}/cookbook/INDEX.md`; naskah: `--kategori script`) → hanya 2–4 kartu **dan frame kuncinya** (`guide/referensi/sheets/keyframes/`) → tabel racikan disetujui user, `{MG}/cookbook/contoh-gagal/README.md`, `{MG}/references/storyboard.md`, `claude/script-workshop/SKILL.md` | `audio.md`, `build.md` |
| User membawa draf desain/storyboard/kode Remotion (penaik mutu) | `{MG}/cookbook/README.md` §1 + §3 → `{MG}/cookbook/INDEX.md` / `POLA.md` / `SFX.md` → `{MG}/references/smooth-motion.md`, `{MG}/references/camera-transition.md`, `{MG}/references/pacing-map.md`, `{MG}/guide/sfx/GUIDE.md` → daftar bedah per beat disetujui user, lalu revisi kode yang ada | merombak konsep, palet, huruf, aset, atau urutan user; menulis ulang dari nol |
| Fase 2 suara (Storyboard/block out, kunci suara): potong, ekor kata, level | `{MG}/references/audio.md` §14.0C–14.0D, §14.6, `scripts/gate/cut_check.py`, `scripts/audio/recut.py`, `scripts/gate/voice_level.py` | tipografi, kamera |
| Fase 3 visual (Animate, Effects & grade): teks/KT, kamera, kurva, lapisan lego, efek, grade | **Rasa dulu:** `projects/<proyek>/RESEP.md` → kartu kiblat + frame kuncinya (dan kartu lain untuk bentuk di luar kiblat) → `{MG}/guide/teks/GUIDE.md`, `{MG}/guide/visual/GUIDE.md`, `{MG}/guide/gerak/GUIDE.md` (§Cara memutuskan: pelajaran "bila…, pilih…, karena…") → `{MG}/cookbook/contoh-gagal/README.md`. **Lalu teknik:** `{MG}/references/typography.md` §8a, `{MG}/references/build.md` (Rakit lego), `scripts/lego/teks_plan.py` → `kt_check.py`, `scripts/remotion/curves.ts`, `TeksBlok.tsx`, `LightSweep.tsx`, `{MG}/references/camera-transition.md`; teks di belakang kepala, glow tepi badan, teks mengapit wajah, cutout subjek: `{MG}/references/persepsi.md` + `scripts/lego/persepsi.py` (matte RVM, titik wajah MediaPipe, still rambut BiRefNet). **Effects & grade sebelum kunci visual:** tiap efek berfungsi (Lantai C18b), `{MG}/references/grade.md` + `scripts/gate/grade_ukur.py`, lalu `{MG}/templates/roles/pemeriksa-frame.md` (menilai frame, satu penilai). Builder hanya mengerjakan TASK dan bertanya langsung ke Sutradara (`{MG}/references/roles.md` §5) | audio; `tools/AFTER-EFFECTS.md` kecuali diminta |
| Fase 4 SFX lalu musik (Mix) | `{MG}/guide/sfx/GUIDE.md`, `{MG}/guide/sfx/FAMILI.md` (famili bunyi, sumber tiga tingkat, `scripts/audio/sfx_cari.py` + `sfx_vet.py`), `{MG}/cookbook/SFX.md`, `{MG}/guide/sfx/SFXIRFAN.md` dan `{MG}/guide/sfx/EPIDEMIC.md` (hanya bila folder SFX lokal ada; selain itu `sfx_cari.py`), `{MG}/references/audio.md` §14.3–14.9, `scripts/gate/sfx_density.py`, `{MG}/guide/audio/GUIDE.md`, `Asset/musik/MUSIK.md` (katalog lagu + link; file audio di mesin kerja; tanpa itu `musik_cari.py`) | tipografi |
| Fase 5 finishing (Mix, Deliver): mix, QA, render sekali, kirim + caption | `{MG}/cookbook/README.md` §Juri, `{MG}/templates/roles/pemeriksa-audio.md`, `{MG}/templates/roles/devils-advocate.md` (mata luar, sekali sebelum final, brief steril; subagen/model lain bila ada, selain itu satu putaran kritik sendiri), `{MG}/references/delivery-gate.md`, `scripts/juri/render.sh` (`lego` untuk video berfootage), `scripts/juri/frame_audit.py`, `claude/irfan-creative-workflow/SKILL.md` §2 (Kirim lewat Drive bila ada, selain itu path/link) | storyboard |
| Revisi dari Irfan: pesan apa pun yang mengeluhkan atau mengubah video yang sudah pernah dirender | **Sebelum edit pertama, urut:** `{MG}/references/revision-log.md` utuh (§0 urutan, §21 ledger dan kunci) → ledger di `projects/<proyek>/DECISIONS.md` + `STATUS.md` → `scripts/juri/revisi_cek.py mulai` + `scripts/baseline_lock.py approve` dari versi yang disetujui → baca ulang NEGATIF + kartu kiblat proyek → kerjakan per lapisan, hanya atribut yang diminta → `revisi_cek.py cek` (atribut blok teks + lapisan) + `baseline_lock.py check` → rakit rentang (`scripts/lego/compose.py --rentang`) + still sebelum/sesudah ke Irfan; audio, audit semua frame, dan Devil's Advocate sekali sebelum final; video lama: `qc/revisi.json` (Lantai F27) | mengubah komponen atau aturan bersama untuk keluhan satu blok, menulis ulang dari nol, memigrasi adegan yang sudah disetujui, memasang usul model tanpa Irfan memilih, merakit master penuh tiap ronde |
| Koreksi dari Irfan atas hasil apa pun (di tengah sesi, bukan menunggu akhir) | koreksinya ke `projects/<proyek>/DECISIONS.md` saat diterima (selera dan gaya selalu di sini); hanya kesalahan kerja yang salah di gaya apa pun naik sebagai butir ber-ID di `{MG}/guide/<urusan>/GUIDE.md` §Cara memutuskan, lewat `claude/skill-steward/references/placement.md` §6 dan `writing.md` §1; frame yang ditolak ke `{MG}/cookbook/contoh-gagal/` | menjadikan satu koreksi larangan umum; menanyakan cakupannya ke Irfan |
| Mendelegasikan ke subagen / model lain (opsional; satu model tidak perlu) | `{MG}/references/orkestrasi.md`, `{MG}/templates/handoff-fase.md` | — |
| Sesi produksi desain statis (carousel, poster, cover) | `claude/vibedesign/DESIGN-CORE.md` (alur 3 gerbang, pertimbangan utama, gerbang juri) → `projects/<proyek>/` (`BRIEF.md`, `RESEP.md`, `DECISIONS.md`, `TAHAP.md`); referensi baru → `claude/vibedesign/cookbook/BEDAH.md`; kartu lewat `claude/vibedesign/cookbook/INDEX.md` | skill video, `PETA.md` selebihnya |
| Tulisan konten (caption, hook, copy carousel) | `claude/script-workshop/SKILL.md` | skill video |
| Proyek dengan PRD/QUEUE | `claude/autopilot-prd/SKILL.md` | — |
| Mengubah skill | `claude/skill-steward/SKILL.md` (§3 langkah kerja; `references/` dibuka saat tabelnya menyuruh); asal-usul aturan ke `SUMBER.md` skill itu; lalu `python3 tools/sumber_cek.py` dan `python3 tools/peta.py` | menulis nama, tanggal, atau cerita gagal di file instruksi |
"""


def first_sentence(text):
    text = re.sub(r"^---.*?---", "", text, flags=re.S)
    title, body = "", []
    for line in text.splitlines():
        s = line.strip()
        if not s:
            if body:
                break
            continue
        if s.startswith("#") and not title:
            title = s.lstrip("# ").strip(); continue
        if s.startswith(("|", "```", "<!--", ">")):
            if body:
                break
            continue
        body.append(s)
    para = " ".join(body)
    para = re.sub(r"\*\*|`", "", para)
    m = re.match(r"(.{20,220}?[.!?])(\s|$)", para)
    sent = m.group(1) if m else para[:200]
    return title, sent


def skill_desc(path):
    t = open(path, encoding="utf-8").read()
    m = re.search(r"^description:\s*(.+)$", t, flags=re.M)
    return (m.group(1).strip().strip('"').replace('\\"', '"')[:220]) if m else first_sentence(t)[1]


def script_desc(path):
    t = open(path, encoding="utf-8", errors="ignore").read()
    m = re.search(r'"""\s*(.+?)(?:\n\s*\n|""")', t, flags=re.S)
    if m:
        return " ".join(m.group(1).split())[:200]
    for line in t.splitlines()[:8]:
        s = line.strip()
        if s.startswith(("//", "#")) and not s.startswith("#!") and len(s) > 4:
            return s.lstrip("/# ").strip()[:200]
    return ""


def bersih(s):
    """Buang tanda sumber dari judul file proyek supaya PETA tetap berisi instruksi saja."""
    return re.sub(r"\s*\([^()]*Irfan[^()]*\d[^()]*\)", "", s)


def rel(p):
    return os.path.relpath(p, ROOT)


def table(rows, head=("File", "Isi / kapan dibuka")):
    out = [f"| {head[0]} | {head[1]} |", "|---|---|"]
    out += [f"| `{a}` | {b.replace('|', '/')} |" for a, b in rows]
    return "\n".join(out)


WAJIB_RUTE = {"Fase 3 visual": [f"`{MG}/guide/visual/GUIDE.md`", f"`{MG}/guide/teks/GUIDE.md`", f"`{MG}/guide/gerak/GUIDE.md`"],
              "Sesi produksi video": [f"`{MG}/SKILL.md`", f"`{MG}/scripts/cookbook/pilih_kartu.py`"]}


def jaga_rute(rute=None):
    """Baris Rute yang wajib memuat file tertentu; regenerasi berhenti bila salah satunya hilang dari RUTE."""
    rute = RUTE if rute is None else rute
    kurang = []
    for awal, files in WAJIB_RUTE.items():
        baris = next((b for b in rute.splitlines() if b.startswith(f"| {awal}")), None)
        kurang += [f"baris '{awal}' tidak ada"] if baris is None else [f"baris '{awal}' tanpa {x}" for x in files if x not in baris]
    return kurang


def build():
    kurang = jaga_rute()
    if kurang:
        sys.exit("PETA.md tidak ditulis, RUTE di tools/peta.py kehilangan rujukan wajib: " + "; ".join(kurang))
    parts = ["# PETA repo skill-development",
             "",
             "Dibuat oleh `tools/peta.py` dari isi file; jangan diedit tangan (ubah RUTE di skrip itu). Tujuannya: model membuka hanya file yang dibutuhkan pekerjaan. Bila file berubah, jalankan `python3 tools/peta.py`; `tools/doctor.sh` menandai peta yang basi.",
             "", RUTE]
    skills = []
    for d in sorted(os.listdir(os.path.join(ROOT, "claude"))):
        p = os.path.join(ROOT, "claude", d, "SKILL.md")
        if os.path.exists(p):
            skills.append((rel(p), skill_desc(p)))
    parts += ["## Skill aktif (`claude/`)", "", table(skills, ("Skill", "Pakai saat")), ""]
    groups = [
        ("motion-graphic · pintu produksi", [f"{MG}/SKILL.md", f"{MG}/MIGRASI-LANTAI.md", "claude/_bersama/NEGATIF.md"]),
        ("motion-graphic · inti dan kamus referensi (opsional di sesi produksi)", [f"{MG}/RETRO.md", f"{MG}/cookbook/INDEX.md", f"{MG}/cookbook/00-core-invariants.md", f"{MG}/cookbook/CATALOG.md", f"{MG}/cookbook/README.md"]),
        ("motion-graphic · references (cabang; dibuka saat SKILL.md atau RUTE menyuruh)", sorted(
            f"{MG}/references/{f}" for f in os.listdir(os.path.join(ROOT, MG, "references")) if f.endswith(".md"))),
        ("motion-graphic · guide (rasa per urusan)", sorted(
            f"{MG}/guide/{d}/{f}" for d in os.listdir(os.path.join(ROOT, MG, "guide")) if os.path.isdir(os.path.join(ROOT, MG, "guide", d))
            for f in os.listdir(os.path.join(ROOT, MG, "guide", d)) if f.endswith(".md"))),
        ("motion-graphic · templates", sorted(
            os.path.join(r, f).replace(ROOT + "/", "") for r, _, fs in os.walk(os.path.join(ROOT, MG, "templates"))
            for f in fs if f.endswith(".md"))),
    ]
    for name, files in groups:
        rows = []
        for f in files:
            p = os.path.join(ROOT, f)
            if os.path.exists(p):
                title, sent = first_sentence(open(p, encoding="utf-8").read())
                rows.append((f, f"**{title}** — {sent}" if title else sent))
        parts += [f"## {name}", "", table(rows), ""]
    rows = []
    sd = os.path.join(ROOT, MG, "scripts")
    for r, _, fs in sorted(os.walk(sd)):
        if "tests" in r or "__pycache__" in r or "node_modules" in r:
            continue
        for f in sorted(fs):
            if f.endswith((".py", ".sh", ".ts", ".tsx")):
                rows.append((rel(os.path.join(r, f)), script_desc(os.path.join(r, f))))
    parts += ["## motion-graphic · skrip (alat dan gerbang)", "", table(rows), ""]
    rows = []
    for f in sorted(os.listdir(os.path.join(ROOT, "tools"))):
        p = os.path.join(ROOT, "tools", f)
        if os.path.isfile(p):
            rows.append((rel(p), script_desc(p) if f.endswith((".py", ".sh")) else first_sentence(open(p, encoding="utf-8", errors="ignore").read())[1]))
    parts += ["## tools/ (perawatan repo)", "", table(rows), ""]
    rows = []
    for d in sorted(os.listdir(os.path.join(ROOT, "projects"))):
        st = os.path.join(ROOT, "projects", d, "STATUS.md")
        dec = os.path.join(ROOT, "projects", d, "DECISIONS.md")
        src = st if os.path.exists(st) else dec if os.path.exists(dec) else None
        rows.append((f"projects/{d}/", (bersih(first_sentence(open(src, encoding="utf-8").read())[0]) if src else "")
                     + (" · mulai dari STATUS.md" if os.path.exists(st) else "")))
    parts += ["## projects/ (keputusan per video; buka hanya proyekmu sendiri, isinya bukan aturan untuk video lain)", "", table(rows, ("Proyek", "Isi")), ""]
    top = [("INDEX.md", "katalog skill dan folder"), ("AGENTS.md", "pintu: invarian, urutan otoritas, tabel rute"),
           ("steward/", "keadaan perawatan skill: backlog, kotak masuk pelajaran, laporan perubahan; bukan aturan"),
           ("SUMBER.md, claude/<skill>/SUMBER.md", "asal-usul aturan; bukan instruksi, jangan dibuka saat mengerjakan tugas"),
           ("experimental/", "alur sampingan yang belum terbukti; bukan aturan"), ("archive/", "skill lama; jangan dimuat")]
    parts += ["## Lain-lain", "", table(top), ""]
    return "\n".join(parts).rstrip() + "\n"


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description="Tulis PETA.md dari isi repo.")
    ap.add_argument("--check", action="store_true", help="tidak menulis; keluar 1 bila PETA.md basi")
    args = ap.parse_args()
    out = os.path.join(ROOT, "PETA.md")
    new = build()
    if args.check:
        cur = open(out, encoding="utf-8").read() if os.path.exists(out) else ""
        print("PETA.md terbaru" if cur == new else "PETA.md basi: jalankan python3 tools/peta.py")
        sys.exit(0 if cur == new else 1)
    open(out, "w", encoding="utf-8").write(new)
    print(f"PETA.md ditulis ({new.count(chr(10))} baris)")
