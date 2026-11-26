#!/usr/bin/env python3
"""Alat cookbook motion-graphic (Two-Tier Domain Packs): CATALOG/POLA/SFX, resolver kartu, validasi token & skema.

  python3 tools/cookbook.py index                 tulis cookbook/CATALOG.md, cookbook/POLA.md, cookbook/SFX.md
  python3 tools/cookbook.py cari <id|path>        cetak path kartu (id, alias, _vault, atau arsip)
  python3 tools/cookbook.py baca <id> [--pengikat]  cetak kartu; blok Pengikat (kulit video sumber) disembunyikan kecuali --pengikat
  python3 tools/cookbook.py cek [--ketat]         validasi 44 Invariant Cards + rujukan kode + INDEX/Core token budget + CATALOG/POLA/SFX; info struktur vault
  python3 tools/cookbook.py migrasi-path [--tulis]  ganti rujukan pustaka/ lama di seluruh repo
Hanya stdlib. Fungsi resolve() dipakai skrip lain (juri/resep_check.py)."""
import json, glob, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
CB = os.path.join(ROOT, "claude", "motion-graphic", "cookbook")
FOLDERS = [
    "01-motion-camera-transitions",
    "02-typography-talking-head",
    "03-documentary-story-narrative",
    "04-ui-cutout-dataviz-visuals",
    "05-audio-sfx-pacing",
    "06-qc-and-verification",
]
FOLDER_KAT = dict(zip(FOLDERS, ["camera", "typography", "script", "layout", "sfx", "qc"]))
# Allowed primary categories inside each Domain Pack
PACK_KATS = {
    "01-motion-camera-transitions": {"camera"},
    "02-typography-talking-head": {"typography"},
    "03-documentary-story-narrative": {"script", "typography", "layout", "texture"},
    "04-ui-cutout-dataviz-visuals": {"layout", "typography"},
    "05-audio-sfx-pacing": {"sfx"},
    "06-qc-and-verification": {"qc"},
}
KAT = ["camera", "typography", "layout", "texture", "sfx", "script", "qc"]
WAJIB = ["id", "pola", "pack", "kategori", "kategori_lain", "trigger", "fungsi", "sumber", "dilihat_bergerak", "diukur", "alias", "vault"]
LIST_KEYS = {"kategori_lain", "alias", "vault", "fungsi"}
# Sumbu fungsi cerita: apa yang dikerjakan kartu di sebuah beat, terlepas dari industri. Dipakai pilih_kartu.py (bobot tertinggi) dan menu bantuan tanpa hasil.
FUNGSI = ("hook", "jelaskan", "angka", "banding", "bukti", "langkah", "balik", "penekanan", "transisi", "suasana", "cta", "penutup", "audio", "qc")
TBLOK = re.compile(r"^### T(\d+) · (.+?) · (\w+)\s*$", re.M)
HEAD = re.compile(r"^#{2,3} ", re.M)
GENERATED = "<!-- dibangkitkan oleh tools/cookbook.py index; jangan diedit tangan -->"
INDEX_MAX_TOKENS = 600
CORE_MAX_TOKENS = 1000
# Id lama yang digabung sebagai alias karena isinya duplikat persis (commit 271ddf41, dibuktikan MD5/isi): id lama -> id kartu vault yang sama.
# Id ini sengaja tidak punya file vault sendiri; CATALOG mencetaknya supaya alias tanpa file tidak dikira rusak.
DUPLIKAT = {"8": "65", "9": "71", "42": "71", "50": "68", "51": "78", "52": "77", "54": "77", "53": "23", "70": "55", "82": "20"}
# Rujukan kode di baris Primitives/Ref: berkas yang hanya ada di proyek selesai tidak boleh jadi rujukan (produksi tidak membuka proyek lain).
REF_EXT = (".tsx", ".ts", ".py", ".sh", ".md")
REF_TERLARANG = {"projects", "archive"}
VAULT_INTI = re.compile(r"\*\*Inti mekanik(?: \([^)]*\))?:\*\*")
VAULT_BAGIAN = (("Inti mekanik", VAULT_INTI), ("Jangan dipakai untuk", re.compile(r"\*\*Jangan dipakai untuk:\*\*")),
                ("Kenapa bekerja", re.compile(r"Kenapa bekerja")), ("## Pengikat", re.compile(r"^## Pengikat", re.M)),
                ("## Yang harus terasa sama saat disandingkan", re.compile(r"^## Yang harus terasa sama saat disandingkan", re.M)))
VAULT_BAGIAN_S = (("Inti/Kerangka", re.compile(r"\*\*(?:Inti|Kerangka)[^*]*:\*\*|Kerangka")),)


# ---------- parsing ----------
def parse_front(text):
    m = re.match(r"---\n(.*?)\n---\n?", text, re.S)
    if not m:
        return None, text
    fm = {}
    for line in m.group(1).splitlines():
        km = re.match(r"^([A-Za-z_]+):\s*(.*)$", line)
        if not km:
            continue
        k, v = km.group(1), km.group(2).strip()
        if k in LIST_KEYS or (v.startswith("[") and v.endswith("]")):
            inner = v[1:-1] if v.startswith("[") and v.endswith("]") else v
            fm[k] = [_unq(x) for x in inner.split(",") if x.strip()]
        else:
            fm[k] = _unq(v)
    return fm, text[m.end():]


def _unq(v):
    v = v.strip()
    if len(v) >= 2 and v[0] == v[-1] and v[0] in ("\"", "'"):
        return v[1:-1]
    return v


def tblocks(body):
    """Dukungan kompatibilitas: baca T-blok lama (bila ada) atau ringkas Invariant Card baru sebagai 1 entri."""
    out = []
    ms = list(TBLOK.finditer(body))
    if ms:
        for i, m in enumerate(ms):
            end = ms[i + 1].start() if i + 1 < len(ms) else len(body)
            nxt = HEAD.search(body, m.end())
            if nxt and nxt.start() < end:
                end = nxt.start()
            blok = body[m.end():end]
            tm = re.search(r"^- \*\*Trigger:\*\*[ \t]*(.*)$", blok, re.M)
            sm = re.search(r"^- \*\*SFX:\*\*[ \t]*(.*)$", blok, re.M)
            out.append(dict(n=m.group(1), nama=m.group(2).strip(), kat=m.group(3), trigger=tm.group(1).strip() if tm else "",
                            mekanik="Mekanik Remotion" in blok, remix="Remix" in blok,
                            belum="belum dibedah" in blok.lower(),
                            sfx=sm.group(1).strip() if sm else ""))
        return out
    hm = re.search(r"^###\s+(?:[A-Za-z0-9-]+)\s+·\s+(.+)$", body, re.M)
    if hm:
        tm = re.search(r"^- \*\*Trigger:\*\*[ \t]*(.*)$", body, re.M)
        am = re.search(r"^- \*\*Anti-Pattern:\*\*[ \t]*(.*)$", body, re.M)
        im = re.search(r"^- \*\*Invariant:\*\*[ \t]*(.*)$", body, re.M)
        gm = re.search(r"^- \*\*Gate:\*\*[ \t]*(.*)$", body, re.M)
        out.append(dict(
            n="1", nama=hm.group(1).strip(), kat="",
            trigger=tm.group(1).strip() if tm else "",
            anti=am.group(1).strip() if am else "",
            invariant=im.group(1).strip() if im else "",
            gate=gm.group(1).strip() if gm else "",
            mekanik=True, remix=True, belum=False, sfx=""
        ))
    return out


def norm_id(x):
    x = x.strip()
    if re.match(r"^[Ss]\d+$", x):
        return "S%02d" % int(x[1:])
    if re.match(r"^[MmQqAa]\d+$", x):
        return x[0].upper() + "%02d" % int(x[1:])
    if re.match(r"^\d+(-\d+)*$", x):
        return "-".join(str(int(p)) for p in x.split("-"))
    return x


def idkey(i):
    return [(0, int(p)) if p.isdigit() else (1, p) for p in re.findall(r"\d+|[A-Za-z]+", i)]


def load_cards():
    cards = []
    for fi, f in enumerate(FOLDERS):
        for p in sorted(glob.glob(os.path.join(CB, f, "*.md"))):
            text = open(p, encoding="utf-8").read()
            fm, body = parse_front(text)
            cards.append(dict(path=p, rel=f + "/" + os.path.basename(p), folder=f, fi=fi, fm=fm, body=body, text=text))
    return cards


def id_map(cards=None):
    cards = load_cards() if cards is None else cards
    m = {}
    for c in cards:
        if not c["fm"]:
            continue
        for i in [c["fm"].get("id", "")] + list(c["fm"].get("alias", [])):
            if i:
                m.setdefault(norm_id(i), c)
    return m


# ---------- resolver ----------
def id_candidates(ref):
    """Kandidat id dari id polos atau path/nama file (terpanjang dulu)."""
    b = os.path.basename(ref.strip().rstrip("/"))
    b = re.sub(r"\.md$", "", b)
    cands = []
    m = re.match(r"^(\d+(?:-\d+)*)", b)
    if m:
        parts = m.group(1).split("-")
        for k in range(len(parts), 0, -1):
            cands.append("-".join(parts[:k]))
    else:
        sm = re.match(r"^([SsMmQqAa]\d+)", b)
        if sm:
            cands.append(sm.group(1))
        else:
            cands.append(b)
    return [norm_id(c) for c in cands]


def resolve(ref, include_lama=True):
    """Path absolut kartu untuk id/alias/path lama; cari pack aktif dulu, lalu _vault/, _lama/, dan archive/cookbook-legacy/."""
    idm = id_map()
    for c in id_candidates(ref):
        if c in idm:
            return idm[c]["path"]
    if include_lama:
        for c in id_candidates(ref):
            variants = [c, c.zfill(2)] if c.isdigit() and len(c) == 1 else [c]
            for v in variants:
                for pat in (
                    os.path.join(CB, "_vault", "*", v + "-*.md"),
                    os.path.join(CB, "_lama", v + "-*.md"),
                    os.path.join(ROOT, "archive", "cookbook-legacy", v + "-*.md"),
                ):
                    hit = sorted(glob.glob(pat))
                    if hit:
                        return hit[0]
    return None


def in_lama(path):
    return path is not None and (os.sep + "_lama" + os.sep in path or os.sep + "cookbook-legacy" + os.sep in path)


# ---------- catalog / pola / sfx ----------
def cut(s, n):
    s = " ".join(s.split())
    return s if len(s) <= n else s[:n - 1].rstrip() + "…"


def esc(s):
    return s.replace("|", "\\|")


def _vault_files():
    return sorted(glob.glob(os.path.join(CB, "_vault", "*", "*.md")))


def _ada_vault(i):
    """Apakah ada berkas vault berawalan id ini (mis. '65-...')."""
    v = i.zfill(2) if i.isdigit() and len(i) == 1 else i
    return bool(glob.glob(os.path.join(CB, "_vault", "*", v + "-*.md")))


def build_catalog(cards):
    ok = sorted([c for c in cards if c["fm"]], key=lambda c: (c["fi"], idkey(c["fm"].get("id", "")), c["rel"]))
    aliases = []
    for c in ok:
        for a in c["fm"].get("alias", []):
            aliases.append((norm_id(a), c["fm"].get("id", "")))
    aliases.sort(key=lambda t: idkey(t[0]))
    L = ["# Cookbook · CATALOG (Daftar Invariant Cards)", "", GENERATED, "",
         "File ini dibaca otomatis oleh `scripts/cookbook/pilih_kartu.py`. Agen produksi memuat `00-core-invariants.md` lalu 2–4 kartu hasil `pilih_kartu.py`; pack utuh tidak dimuat.", ""]
    if aliases:
        def _alias(a, t):
            return f"`{a} = duplikat dari {DUPLIKAT[a]} → {t}`" if a in DUPLIKAT and not _ada_vault(a) else f"`{a} → {t}`"
        L += ["**Alias (id lama → kartu pack):** " + ", ".join(_alias(a, t) for a, t in aliases), ""]
        n_dup = sum(1 for a, _ in aliases if a in DUPLIKAT and not _ada_vault(a))
        L += [f"{len(ok)} kartu aktif · {len(_vault_files())} kartu vault · {n_dup} id duplikat", ""]
    L += ["> Dibangkitkan oleh `tools/cookbook.py index`; jangan diedit tangan.", "",
          "| ID | Pola | Narrative trigger | Kategori | Status | Path |", "|---|---|---|---|---|---|"]
    for c in ok:
        fm = c["fm"]
        kat = fm.get("kategori", "")
        lain = fm.get("kategori_lain", [])
        if lain:
            kat += " (" + ", ".join(lain) + ")"
        status = f"bergerak:{fm.get('dilihat_bergerak', '?')} · diukur:{fm.get('diukur', '?')}"
        L.append("| " + " | ".join(esc(x) for x in [fm.get("id", ""), fm.get("pola", ""), cut(fm.get("trigger", ""), 140),
                                                     kat, status, c["rel"]]) + " |")
    return "\n".join(L) + "\n"


def build_pola(cards):
    ok = [c for c in cards if c["fm"]]
    rows = {k: [] for k in KAT}
    for c in ok:
        fm = c["fm"]
        kat = fm.get("kategori", "")
        for t in tblocks(c["body"]):
            tk = t["kat"] or kat
            rows.setdefault(tk, []).append((c, t))
    L = ["# Cookbook · POLA (Ringkasan Invariant per Kategori)", "", GENERATED, "",
         "Satu baris per pola di dalam Domain Packs. Buka kartunya untuk detail Invariant, Primitives, dan Gate.", ""]
    for k in KAT + sorted(set(rows) - set(KAT)):
        lst = sorted(rows.get(k, []), key=lambda r: (idkey(r[0]["fm"].get("id", "")), int(r[1]["n"])))
        if not lst:
            continue
        L += [f"## {k}", "", "| ID | Nama pola | Trigger | Kartu |", "|---|---|---|---|"]
        for c, t in lst:
            L.append("| " + " | ".join(esc(x) for x in [c["fm"].get("id", ""), t["nama"], cut(t["trigger"], 120), c["rel"]]) + " |")
        L.append("")
    return "\n".join(L).rstrip("\n") + "\n"


SFXDIR = os.path.join(os.path.dirname(CB), "guide", "sfx")
SFXCAT = os.path.join(SFXDIR, "SFXIRFAN.md")
FAMJSON = os.path.join(SFXDIR, "FAMILI.json")


def sfx_lokal(path=None, hanya_pakai=False):
    out = []
    path = path or SFXCAT
    if not os.path.exists(path):
        return out
    for line in open(path, encoding="utf-8"):
        if hanya_pakai and "| PAKAI" not in line:
            continue
        m = re.match(r"^\|\s*`([^`]+)`[^|]*\|\s*`?([a-z]+)?`?[^|]*\|(.*)\|\s*$", line)
        if not m:
            continue
        cols = [c.strip() for c in m.group(3).split("|")]
        out.append((m.group(1), m.group(2) or "", cols[-1] if cols else ""))
    return out


def build_sfx(cards):
    fams = json.load(open(FAMJSON, encoding="utf-8"))["famili"] if os.path.exists(FAMJSON) else {}
    lokal = sfx_lokal()
    epi = sfx_lokal(os.path.join(SFXDIR, "EPIDEMIC.md"), hanya_pakai=True)
    L = ["# Cookbook · SFX per famili", "", GENERATED, "",
         "Kebutuhan bunyi tiap pola ditulis sebagai **famili** (karakter), bukan nama file. Rujuk `05-audio-sfx-pacing/A01-five-pillars-and-natural-level.md` dan `../guide/sfx/FAMILI.md`.", ""]
    for k, f in fams.items():
        mine = [f"`{n}`" for n, fk, _ in lokal if fk == k]
        L += [f"## `{k}` · {f.get('nama', k)}", "",
              f"- **Karakter:** {f.get('deskripsi', '')}",
              f"- **SFXIrfan:** " + (", ".join(mine) or "tidak ada"),
              f"- **Epidemic lokal (PAKAI):** " + (", ".join(f"`{n}`" for n, fk, _ in epi if fk == k) or "tidak ada")
              + "; Kenyset: nama file cocok `" + f.get("kenyset_regex", "—") + "`",
              f"- **Cari:** `python3 scripts/audio/sfx_cari.py --famili {k} --out projects/<proyek>/sfx/kandidat` (kata kunci: "
              + ", ".join(f'"{q}"' for q in f.get("cari", [])) + ")", ""]
    return "\n".join(L).rstrip("\n") + "\n"


def cmd_index():
    cards = load_cards()
    for name, txt in (("CATALOG.md", build_catalog(cards)), ("POLA.md", build_pola(cards)), ("SFX.md", build_sfx(cards))):
        open(os.path.join(CB, name), "w", encoding="utf-8").write(txt)
    print(f"OK  CATALOG.md, POLA.md, SFX.md ditulis dari {sum(1 for c in cards if c['fm'])} kartu")
    return 0


# ---------- cari ----------
def cmd_cari(args):
    if not args:
        print(__doc__); return 1
    p = resolve(args[0])
    if not p:
        print(f"tidak ada kartu untuk '{args[0]}'", file=sys.stderr); return 1
    if in_lama(p):
        print("(arsip/legacy)", file=sys.stderr)
    print(os.path.relpath(p, ROOT))
    return 0


# ---------- baca ----------
PENGIKAT_DISEMBUNYIKAN = "## Pengikat (disembunyikan: kulit video sumber; dipakai hanya bila video sumbernya referensi yang dibawa user — tambah --pengikat)"
BINGKAI_SANDING = ("> Jawab tiap pertanyaan untuk hubungan yang ditanyakan (urutan, ritme, proporsi, peran). Warna, huruf, angka, dan benda yang "
                   "disebut adalah milik video sumber; bandingkan dengan padanannya di proyek kita, bukan dengan nilainya.")


def bingkai_kartu(teks):
    """Teks kartu untuk dibaca sebagai mekanik: seksi `## Pengikat...` (sampai `## ` berikutnya) jadi satu baris, dan checklist sanding diberi bingkai."""
    out, lewati = [], False
    for baris in teks.split("\n"):
        if baris.startswith("## "):
            lewati = False
            if baris.startswith("## Pengikat"):
                out.append(PENGIKAT_DISEMBUNYIKAN); lewati = True; continue
            out.append(baris)
            if baris.startswith("## Yang harus terasa sama saat disandingkan"):
                out.append(BINGKAI_SANDING)
            continue
        if not lewati:
            out.append(baris)
    return "\n".join(out)


def resolve_vault_dulu(ref):
    """Kartu vault bernomor itu dulu (id lama seperti 57 adalah alias kartu aktif M20, tetapi yang dibaca di sini sumbernya); lalu resolve() biasa."""
    for c in id_candidates(ref):
        for v in ([c, c.zfill(2)] if c.isdigit() and len(c) == 1 else [c]):
            hit = sorted(glob.glob(os.path.join(CB, "_vault", "*", v + "-*.md")))
            if hit:
                return hit[0]
    return resolve(ref)


def cmd_baca(args):
    ref = [a for a in args if not a.startswith("--")]
    if not ref:
        print(__doc__); return 1
    p = resolve_vault_dulu(ref[0])
    if not p:
        print(f"tidak ada kartu untuk '{ref[0]}'", file=sys.stderr); return 1
    with open(p, encoding="utf-8") as fh:
        teks = fh.read()
    sys.stdout.write(teks if "--pengikat" in args else bingkai_kartu(teks))
    return 0


# ---------- cek ----------
def _indeks_berkas():
    """Nama berkas -> daftar path relatif, untuk seluruh repo kecuali projects/, archive/, .git, node_modules."""
    out = {}
    for dp, dn, fn in os.walk(ROOT):
        rel = os.path.relpath(dp, ROOT)
        dn[:] = [d for d in dn if d not in (".git", "node_modules", "__pycache__") and not (rel == "." and d in REF_TERLARANG)]
        for f in fn:
            out.setdefault(f, []).append(os.path.normpath(os.path.join(rel, f)))
    return out


def rujukan_kode(teks):
    """Token berekstensi kode/dokumen di dalam backtick pada segmen Primitives/Ref (sebelum '· Vault:'). Glob dan nama tanpa ekstensi diabaikan."""
    m = re.search(r"^- \*\*Primitives[/-]Ref:\*\*(.*)$", teks, re.M)
    if not m:
        return []
    seg = m.group(1).split("· Vault:")[0]
    return [t for t in re.findall(r"`([^`\s]+)`", seg) if t.endswith(REF_EXT) and not re.search(r"[*?\[]", t)]


def rujukan_ada(tok, indeks):
    if "/" in tok:
        t = os.path.normpath(tok)
        if t.split(os.sep)[0] in REF_TERLARANG:
            return False
        return any(os.path.exists(os.path.join(ROOT, b, t)) for b in ("", os.path.join("claude", "motion-graphic")))
    return tok in indeks


def info_vault(cards):
    """Temuan struktur vault dan id yatim. Hanya info: tidak pernah GAGAL, tidak dihitung di --ketat."""
    out = []
    pakai = set()
    for c in cards:
        for vp in (c["fm"] or {}).get("vault", []):
            pakai.add(os.path.normpath(os.path.join(os.path.dirname(c["path"]), vp)))
    yatim = []
    for p in _vault_files():
        stem = os.path.basename(p)
        with open(p, encoding="utf-8") as fh:
            teks = fh.read()
        fm, _ = parse_front(teks)
        if os.path.normpath(p) not in pakai:
            yatim.append(re.match(r"^([A-Za-z]?\d+(?:-\d+)*)", stem).group(1) if re.match(r"^[A-Za-z]?\d", stem) else stem)
        bagian = VAULT_BAGIAN_S if re.match(r"^S\d", stem) else VAULT_BAGIAN
        miss = [n for n, rx in bagian if not rx.search(teks)]
        if not fm or "dilihat_bergerak" not in fm:
            miss.append("dilihat_bergerak (frontmatter)")
        if miss:
            out.append(f"{stem}: tidak ada {', '.join(miss)}")
    if yatim:
        out.append("yatim (tidak dirujuk kartu aktif mana pun): " + ", ".join(sorted(yatim, key=idkey)))
    return out


def cmd_cek(args):
    ketat = "--ketat" in args
    cards = load_cards()
    res = []
    def ok(m): res.append(("OK", m))
    def bad(m): res.append(("GAGAL", m))
    def warn(m): res.append(("PERINGATAN", m))
    def nbad(): return sum(1 for s, _ in res if s == "GAGAL")

    # Cek router INDEX.md dan 00-core-invariants.md
    for fname, limit in (("INDEX.md", INDEX_MAX_TOKENS), ("00-core-invariants.md", CORE_MAX_TOKENS)):
        fpath = os.path.join(CB, fname)
        if not os.path.exists(fpath):
            bad(f"{fname} tidak ditemukan")
        else:
            txt = open(fpath, encoding="utf-8").read()
            tok = len(txt) // 4
            if tok >= limit:
                bad(f"{fname} terlalu besar: ~{tok} tok (batas < {limit})")
            else:
                ok(f"{fname}: ~{tok} tok (< {limit})")

    ids, namas = {}, {}
    indeks = None
    for c in cards:
        r = c["rel"]
        fm = c["fm"]
        bc = nbad()
        if not fm:
            bad(f"{r}: frontmatter tidak ada"); continue
        miss = [k for k in WAJIB if k not in fm or (k not in LIST_KEYS and not fm[k])]
        if miss:
            bad(f"{r}: frontmatter kurang: {', '.join(miss)}")
        fg = fm.get("fungsi", [])
        if "fungsi" in fm and not (1 <= len(fg) <= 3):
            bad(f"{r}: fungsi harus 1-3 nilai, ada {len(fg)}")
        for f in fg:
            if f not in FUNGSI:
                bad(f"{r}: fungsi tidak dikenal: {f} (diizinkan {', '.join(FUNGSI)})")
        kat = fm.get("kategori", "")
        allowed = PACK_KATS.get(c["folder"], {FOLDER_KAT[c["folder"]]})
        if kat not in allowed:
            bad(f"{r}: kategori '{kat}' tidak sesuai pack {c['folder']} (diizinkan {sorted(allowed)})")
        if fm.get("pack", "") != c["folder"]:
            bad(f"{r}: field pack '{fm.get('pack', '')}' != folder '{c['folder']}'")
        for l in fm.get("kategori_lain", []):
            if l not in KAT:
                bad(f"{r}: kategori_lain tidak dikenal: {l}")
        if fm.get("dilihat_bergerak") not in (None, "ya", "sebagian", "tidak"):
            bad(f"{r}: dilihat_bergerak harus ya|sebagian|tidak")
        if fm.get("diukur") not in (None, "ya", "tidak"):
            bad(f"{r}: diukur harus ya|tidak")
        for i in [fm.get("id", "")] + list(fm.get("alias", [])):
            if not i:
                continue
            n = norm_id(i)
            if n in ids and ids[n] != r:
                bad(f"id/alias '{i}' bentrok: {ids[n]} dan {r}")
            ids.setdefault(n, r)
        pn = fm.get("pola", "").lower()
        if pn:
            if pn in namas and namas[pn] != r:
                bad(f"nama pola '{fm['pola']}' kembar: {namas[pn]} dan {r}")
            namas.setdefault(pn, r)

        # Validasi format Invariant Card (Trigger, Anti-Pattern, Invariant, Gate)
        tb = tblocks(c["body"])
        if not tb:
            bad(f"{r}: format Invariant Card tidak valid (heading/Trigger tidak ditemukan)")
        else:
            t = tb[0]
            missing_sec = [lbl for lbl, val in (("Trigger", t.get("trigger")), ("Anti-Pattern", t.get("anti")),
                                                 ("Invariant", t.get("invariant")), ("Gate", t.get("gate"))) if not val]
            if missing_sec:
                bad(f"{r}: bagian wajib kurang: {', '.join(missing_sec)}")
        body_lines = len(c["body"].strip().splitlines())
        if body_lines > 18:
            warn(f"{r}: isi Invariant Card {body_lines} baris (target 10-15)")

        if indeks is None:
            indeks = _indeks_berkas()
        for tok in rujukan_kode(c["body"]):
            if not rujukan_ada(tok, indeks):
                bad(f"{r}: Primitives-Ref tidak ada: {tok}")

        dirc = os.path.dirname(c["path"])
        for vp in fm.get("vault", []):
            full = os.path.normpath(os.path.join(dirc, vp))
            if not os.path.exists(full):
                bad(f"{r}: vault path tidak ada: {vp}")

        if nbad() == bc:
            ok(f"{r}: frontmatter, pack, Invariant Card, vault OK")

    for name, fn in (("CATALOG.md", build_catalog), ("POLA.md", build_pola), ("SFX.md", build_sfx)):
        p = os.path.join(CB, name)
        want = fn(cards)
        if not os.path.exists(p):
            bad(f"{name} belum ada (python3 tools/cookbook.py index)")
        elif open(p, encoding="utf-8").read() != want:
            bad(f"{name} basi (python3 tools/cookbook.py index)")
        else:
            ok(f"{name} sama dengan hasil index")

    lama = glob.glob(os.path.join(CB, "_lama", "*"))
    if lama:
        (bad if ketat else warn)(f"_lama/ masih berisi {len(lama)} file (belum dikonversi)")
    else:
        ok("_lama/ kosong")

    for s, m in res:
        print(f"{s:<10} {m}")
    for m in info_vault(cards):
        print(f"VAULT (info) {m}")
    n_bad = sum(1 for s, _ in res if s == "GAGAL")
    print(f"\n{len(cards)} kartu · {n_bad} GAGAL · {sum(1 for s, _ in res if s == 'PERINGATAN')} PERINGATAN")
    return 1 if n_bad else 0


# ---------- migrasi-path ----------
SKIP_TOP = {"projects", "archive"}
SKIP_ANY = {".git", "node_modules", "__pycache__", "_vault"}
TEXT_EXT = {".md", ".py", ".sh", ".ts", ".tsx", ".js", ".json", ".txt", ".yml", ".yaml", ".toml", ".mjs", ".cjs", ".html", ".css", ""}
FIXED = {"PETA.md": "INDEX.md"}
KARTU_RE = re.compile(
    r"(?<![\w-])(?P<kartu>(?P<pre>(?:claude/motion-graphic/)?(?:(?:\.\./)+)?(?:pustaka/)?)kartu/(?P<name>\d[A-Za-z0-9._-]*?\.md))"
    r"|(?<![\w-])pustaka/kartu/?(?![\w-])"
    r"|(?<![\w-])pustaka/(?P<fixed>PETA\.md|README\.md|KARTU-TEMPLATE\.md|RESEP-TEMPLATE\.md|teknik/|contoh-gagal/)"
    r"|(?<![\w-])pustaka/(?=[\w])")


def walk_files():
    for dp, dn, fn in os.walk(ROOT):
        rel = os.path.relpath(dp, ROOT)
        dn[:] = [d for d in dn if d not in SKIP_ANY and not (rel == "." and d in SKIP_TOP)]
        if rel.startswith(os.path.join("claude", "motion-graphic", "cookbook", "_lama")):
            dn[:] = []; continue
        for f in fn:
            r = os.path.normpath(os.path.join(rel, f))
            if rel == "." and f.startswith("AUDIT-") and f.endswith(".md"):
                continue
            if r == os.path.join("tools", "cookbook.py"):
                continue
            if os.path.splitext(f)[1].lower() not in TEXT_EXT:
                continue
            yield r


def migrate_line(line, relfile, pending):
    in_cb = relfile.startswith(os.path.join("claude", "motion-graphic", "cookbook") + os.sep)
    in_mg = relfile.startswith("claude" + os.sep + "motion-graphic" + os.sep) or relfile.startswith("tools" + os.sep)
    ch = []

    def sub(m):
        old = m.group(0)
        if m.group("kartu"):
            pre, name = m.group("pre"), m.group("name")
            if "pustaka/" not in pre and not (in_cb or in_mg or "claude/motion-graphic/" in pre):
                return old
            p = resolve(name, include_lama=False)
            if not p:
                pending.append((old, name)); return old
            new_rel = os.path.relpath(p, CB)
            if "pustaka/" in pre:
                new = pre.replace("pustaka/", "cookbook/") + new_rel
            elif in_cb:
                new = pre + new_rel
            else:
                new = pre + "cookbook/" + new_rel
            ch.append((old, new)); return new
        if m.group("fixed"):
            f = m.group("fixed"); new = "cookbook/" + FIXED.get(f, f)
            ch.append((old, new)); return new
        if old.rstrip("/").endswith("kartu"):
            pending.append((old, "(folder kartu/: ubah manual)")); return old
        new = "cookbook/"
        ch.append((old, new)); return new

    return KARTU_RE.sub(sub, line), ch


def cmd_migrasi(args):
    tulis = "--tulis" in args
    total, pending, files = 0, [], 0
    for rel in sorted(walk_files()):
        path = os.path.join(ROOT, rel)
        try:
            if os.path.getsize(path) > 3_000_000:
                continue
            raw = open(path, encoding="utf-8").read()
        except (UnicodeDecodeError, OSError):
            continue
        if "pustaka/" not in raw and "kartu/" not in raw:
            continue
        lines = raw.split("\n"); out = []; changed = False
        for n, line in enumerate(lines, 1):
            pend = []
            new, ch = migrate_line(line, rel, pend)
            for old, nw in ch:
                print(f"{rel}:{n}: {old} -> {nw}"); total += 1
            for old, name in pend:
                pending.append((rel, n, old, name))
            changed |= new != line
            out.append(new)
        if changed:
            files += 1
            if tulis:
                open(path, "w", encoding="utf-8").write("\n".join(out))
    for rel, n, old, name in pending:
        print(f"TERTUNDA {rel}:{n}: {old} ({name})")
    print(f"\n{total} rujukan {'diganti' if tulis else 'akan diganti'} di {files} file; {len(pending)} tertunda")
    return 0


def main(argv):
    if not argv or argv[0] in ("-h", "--help"):
        print(__doc__); return 0 if argv else 1
    c, a = argv[0], argv[1:]
    if c == "index": return cmd_index()
    if c == "cari": return cmd_cari(a)
    if c == "baca": return cmd_baca(a)
    if c == "cek": return cmd_cek(a)
    if c == "migrasi-path": return cmd_migrasi(a)
    print(__doc__); return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
