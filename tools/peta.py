#!/usr/bin/env python3
"""Tulis PETA.md: peta repo supaya model membuka hanya file yang dibutuhkan (Irfan 16 Nov).

Bagian atas (RUTE) ditulis tangan di sini: pekerjaan → file yang dibuka, berurutan. Bagian bawah dibuat otomatis dari
isi file: judul + kalimat pertama tiap referensi/guide, baris pertama docstring/komentar tiap skrip, dan `description`
tiap SKILL.md. Karena dibuat dari file, ringkasannya tidak basi selama skrip ini dijalankan setelah file berubah.

  python3 tools/peta.py          tulis ulang PETA.md
  python3 tools/peta.py --check  keluar 1 bila PETA.md tidak sama dengan isi repo (dipanggil doctor.sh)
"""
import os, re, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
MG = "claude/motion-graphic"

RUTE = f"""## Cara membaca (ringkas; lengkapnya `AGENTS.md` §Cara membaca repo ini)

- `LANTAI.md` = berlaku di semua video. `guide/` + kartu `pustaka/kartu/` = cara memutuskan bersyarat dan kiblat gaya. `projects/<proyek>/DECISIONS.md` = satu video saja.
- Cocokkan setiap pesan baru dengan satu baris Rute sebelum edit pertama, juga di tengah sesi.
- File rute dibaca utuh; `grep` bukan membaca. "Aturannya tidak ada" hanya setelah LANTAI, kartu kiblat proyek, dan skrip jurinya dibaca.

## Rute: pekerjaan → buka ini (urut, berhenti bila cukup)

| Pekerjaan | Buka | Jangan buka |
|---|---|---|
| Awal sesi apa pun | `AGENTS.md` → `PETA.md` (file ini) → `PENDING.md` | seluruh `references/` sekaligus |
| Video apa pun | `{MG}/SKILL.md` (Lantai termuat di dalamnya) → `projects/<proyek>/STATUS.md` | skill di `archive/` |
| Fase 1 pra-produksi: script, bedah referensi, storyboard | `{MG}/references/storyboard.md`, `{MG}/pustaka/PETA.md` → satu kartu kiblat, `claude/script-workshop/SKILL.md` | `audio.md`, `build.md` |
| Fase 2 suara: potong, ekor kata, level | `{MG}/references/audio.md` §14.0C–14.0D, §14.6, `scripts/gate/cut_check.py`, `scripts/audio/recut.py`, `scripts/gate/voice_level.py` | tipografi, kamera |
| Fase 3 visual: teks/KT, kamera, kurva, lapisan lego | `{MG}/references/typography.md` §8a, `{MG}/references/build.md` (Rakit lego), `scripts/lego/teks_plan.py` → `kt_check.py`, `scripts/remotion/curves.ts`, `TeksBlok.tsx`, `LightSweep.tsx`, `{MG}/references/camera-transition.md` | audio |
| Fase 4 SFX lalu musik | `{MG}/guide/sfx/GUIDE.md`, `{MG}/guide/sfx/SFXIRFAN.md`, `{MG}/references/audio.md` §14.3–14.9, `scripts/gate/sfx_density.py`, `{MG}/guide/audio/GUIDE.md` | tipografi |
| Fase 5 finishing: mix, QA, render sekali | `{MG}/references/delivery-gate.md`, `scripts/juri/render.sh` (`lego` untuk video berfootage), `scripts/juri/frame_audit.py` | storyboard |
| Revisi dari Irfan: pesan apa pun yang mengeluhkan atau mengubah video yang sudah pernah dirender | **Sebelum edit pertama, urut:** `{MG}/references/revision-log.md` utuh (§0 urutan, §21 ledger dan kunci) → ledger di `projects/<proyek>/DECISIONS.md` + `STATUS.md` → `scripts/juri/revisi_cek.py mulai` + `scripts/baseline_lock.py approve` dari versi yang disetujui → baca ulang `LANTAI.md` + kartu kiblat proyek → kerjakan per lapisan → `revisi_cek.py cek` + `baseline_lock.py check` → `scripts/juri/render.sh`; video lama: `qc/revisi.json` (Lantai F27) | mengubah komponen atau aturan bersama untuk keluhan satu blok, menulis ulang dari nol, memigrasi adegan yang sudah disetujui |
| Orkestrasi subagen / model lain | `{MG}/references/orkestrasi.md`, `{MG}/templates/handoff-fase.md` | — |
| Tulisan konten (caption, hook, carousel) | `claude/script-workshop/SKILL.md` | skill video |
| Proyek dengan PRD/QUEUE | `claude/autopilot-prd/SKILL.md` | — |
| Mengubah skill | `AGENTS.md` §Akhir sesi, `EVALS-DESIGN.md`, `{MG}/pustaka/README.md` §Tumbuh, lalu `python3 tools/peta.py` | — |
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
        if s.startswith(("|", "```", "<!--")):
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
    return (m.group(1).strip().strip('"')[:220]) if m else first_sentence(t)[1]


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


def rel(p):
    return os.path.relpath(p, ROOT)


def table(rows, head=("File", "Isi / kapan dibuka")):
    out = [f"| {head[0]} | {head[1]} |", "|---|---|"]
    out += [f"| `{a}` | {b.replace('|', '/')} |" for a, b in rows]
    return "\n".join(out)


def build():
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
        ("motion-graphic · inti", [f"{MG}/LANTAI.md", f"{MG}/RETRO.md", f"{MG}/pustaka/PETA.md", f"{MG}/pustaka/README.md"]),
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
        if "tests" in r or "__pycache__" in r:
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
        rows.append((f"projects/{d}/", (first_sentence(open(src, encoding="utf-8").read())[0] if src else "")
                     + (" · mulai dari STATUS.md" if os.path.exists(st) else "")))
    parts += ["## projects/ (keputusan per video; hanya untuk proyek itu)", "", table(rows, ("Proyek", "Isi")), ""]
    top = [("INDEX.md", "katalog skill dan folder"), ("AGENTS.md", "aturan awal/akhir sesi untuk semua model"),
           ("PENDING.md", "pelajaran yang belum disetujui; bukan aturan"), ("EVALS-DESIGN.md", "cara menguji perubahan skill"),
           ("experimental/", "alur sampingan yang belum terbukti; bukan aturan"), ("archive/", "skill lama; jangan dimuat")]
    parts += ["## Lain-lain", "", table(top), ""]
    return "\n".join(parts).rstrip() + "\n"


if __name__ == "__main__":
    out = os.path.join(ROOT, "PETA.md")
    new = build()
    if "--check" in sys.argv:
        cur = open(out, encoding="utf-8").read() if os.path.exists(out) else ""
        print("PETA.md terbaru" if cur == new else "PETA.md basi: jalankan python3 tools/peta.py")
        sys.exit(0 if cur == new else 1)
    open(out, "w", encoding="utf-8").write(new)
    print(f"PETA.md ditulis ({new.count(chr(10))} baris)")
