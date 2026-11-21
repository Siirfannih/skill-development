#!/usr/bin/env python3
"""Alat cookbook motion-graphic: INDEX/POLA, resolver kartu, validasi, migrasi path.

  python3 tools/cookbook.py index                 tulis cookbook/INDEX.md dan cookbook/POLA.md
  python3 tools/cookbook.py cari <id|path>        cetak path kartu (id, alias, atau path lama)
  python3 tools/cookbook.py cek [--ketat]         validasi kartu + INDEX/POLA; exit 1 bila GAGAL
  python3 tools/cookbook.py migrasi-path [--tulis]  ganti rujukan pustaka/ lama di seluruh repo
Hanya stdlib. Fungsi resolve() dipakai skrip lain (juri/resep_check.py)."""
import json, glob, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
CB = os.path.join(ROOT, "claude", "motion-graphic", "cookbook")
FOLDERS = ["01-camera-and-transitions", "02-typography-and-captions", "03-spatial-and-ui-layouts",
           "04-tactile-textures-and-grading", "05-sfx-and-audio-mapping", "06-script-and-story"]
FOLDER_KAT = dict(zip(FOLDERS, ["camera", "typography", "layout", "texture", "sfx", "script"]))
KAT = list(FOLDER_KAT.values())
WAJIB = ["id", "pola", "kategori", "kategori_lain", "trigger", "sumber", "dilihat_bergerak", "diukur", "alias"]
LIST_KEYS = {"kategori_lain", "alias"}
TBLOK = re.compile(r"^### T(\d+) · (.+?) · (\w+)\s*$", re.M)
HEAD = re.compile(r"^#{2,3} ", re.M)
GENERATED = "<!-- dibangkitkan oleh tools/cookbook.py index; jangan diedit tangan -->"


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
    if len(v) >= 2 and v[0] == v[-1] and v[0] in "\"'":
        return v[1:-1]
    return v


def tblocks(body):
    out = []
    ms = list(TBLOK.finditer(body))
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


def norm_id(x):
    x = x.strip()
    if re.match(r"^[Ss]\d+$", x):
        return "S%02d" % int(x[1:])
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
    m = re.match(r"^(\d+(?:-\d+)*)", b)
    cands = []
    if m:
        parts = m.group(1).split("-")
        for k in range(len(parts), 0, -1):
            cands.append("-".join(parts[:k]))
    else:
        sm = re.match(r"^([Ss]\d+)", b)
        if sm:
            cands.append(sm.group(1))
    return [norm_id(c) for c in cands]


def resolve(ref, include_lama=True):
    """Path absolut kartu untuk id/alias/path lama; None bila tidak ada.
    include_lama: kartu yang belum dikonversi (cookbook/_lama/NN-*.md) ikut dicari."""
    idm = id_map()
    for c in id_candidates(ref):
        if c in idm:
            return idm[c]["path"]
    if include_lama:
        for c in id_candidates(ref):
            hit = sorted(glob.glob(os.path.join(CB, "_lama", c + "-*.md")))
            if hit:
                return hit[0]
    return None


def in_lama(path):
    return path is not None and os.sep + "_lama" + os.sep in path


# ---------- index ----------
def cut(s, n):
    s = " ".join(s.split())
    return s if len(s) <= n else s[:n - 1].rstrip() + "…"


def esc(s):
    return s.replace("|", "\\|")


def build_index(cards):
    ok = sorted([c for c in cards if c["fm"]], key=lambda c: (c["fi"], idkey(c["fm"].get("id", "")), c["rel"]))
    aliases = []
    for c in ok:
        for a in c["fm"].get("alias", []):
            aliases.append((norm_id(a), c["fm"].get("id", "")))
    aliases.sort(key=lambda t: idkey(t[0]))
    L = ["# Cookbook · INDEX", "", GENERATED, "",
         "## Cara pakai", "",
         "1. Baca tabel ini sekali; jangan membuka kartu satu per satu untuk \"melihat-lihat\".",
         "2. Cocokkan kalimat naskah/adegan dengan kolom *Narrative trigger*.",
         "3. Pilih **1 kartu pengikat** (warna, teks, ritme satu video) + **1–3 kartu mekanik** untuk adegan yang butuh gerak lain.",
         "4. Buka hanya kartu terpilih dan frame kuncinya (`guide/referensi/sheets/keyframes/`); jangan baca kartu lain.",
         "5. Mencari per pola (T-blok) atau per kata kunci mekanik: lihat `POLA.md`.",
         "6. Kartu kategori script (id `S..`) dipakai di fase naskah, bukan fase visual.",
         "7. Kolom *Status* memberi tahu seberapa kuat kartunya: `bergerak:tidak` = dibaca dari still, perlakukan sebagai hipotesis.",
         "8. Id lama yang sudah digabung tetap terbaca: `python3 tools/cookbook.py cari <id>`.",
         ""]
    if aliases:
        L += ["**Alias (id lama → kartu):** " + ", ".join(f"`{a} → {t}`" for a, t in aliases), ""]
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
        for t in tblocks(c["body"]):
            rows.setdefault(t["kat"], []).append((c, t))
    L = ["# Cookbook · POLA (per T-blok)", "", GENERATED, "",
         "Satu baris per pola (T-blok) dalam kartu, dikelompokkan per kategori pola. Buka kartunya untuk mekanik dan remix.", ""]
    for k in KAT + sorted(set(rows) - set(KAT)):
        lst = sorted(rows.get(k, []), key=lambda r: (idkey(r[0]["fm"].get("id", "")), int(r[1]["n"])))
        if not lst:
            continue
        L += [f"## {k}", "", "| ID.Tn | Nama pola | Trigger | Kartu |", "|---|---|---|---|"]
        for c, t in lst:
            L.append("| " + " | ".join(esc(x) for x in [f"{c['fm'].get('id', '')}.T{t['n']}", t["nama"], cut(t["trigger"], 120), c["rel"]]) + " |")
        L.append("")
    return "\n".join(L).rstrip("\n") + "\n"


SFXDIR = os.path.join(os.path.dirname(CB), "guide", "sfx")
SFXCAT = os.path.join(SFXDIR, "SFXIRFAN.md")
FAMJSON = os.path.join(SFXDIR, "FAMILI.json")


def sfx_lokal():
    """Baris katalog SFXIrfan: (nama file, famili, peran). Kolom Famili ditulis `id`."""
    out = []
    if not os.path.exists(SFXCAT):
        return out
    for line in open(SFXCAT, encoding="utf-8"):
        m = re.match(r"^\|\s*`([^`]+)`[^|]*\|\s*`?([a-z]+)?`?[^|]*\|(.*)\|\s*$", line)
        if not m:
            continue
        cols = [c.strip() for c in m.group(3).split("|")]
        out.append((m.group(1), m.group(2) or "", cols[-1] if cols else ""))
    return out


def build_sfx(cards):
    ok = [c for c in cards if c["fm"]]
    fams = json.load(open(FAMJSON, encoding="utf-8"))["famili"] if os.path.exists(FAMJSON) else {}
    pakai = {k: [] for k in fams}
    for c in sorted(ok, key=lambda c: idkey(c["fm"].get("id", ""))):
        for t in tblocks(c["body"]):
            for k in re.findall(r"`([a-z]+)`", t["sfx"].split(" · ")[0]) if t["sfx"].startswith("famili ") else []:
                pakai.setdefault(k, []).append(f"{c['fm'].get('id', '')}.T{t['n']}")
    lokal = sfx_lokal()
    L = ["# Cookbook · SFX per famili", "", GENERATED, "",
         "Kebutuhan bunyi tiap pola ditulis sebagai **famili** (karakter), bukan nama file. Untuk satu famili: lihat pola yang "
         "memakainya, coba stok lokal yang terdaftar, lalu cari bila tidak ada yang lolos dengar "
         "(`../guide/sfx/GUIDE.md` Cara 3, `../guide/sfx/FAMILI.md`).", ""]
    for k, f in fams.items():
        mine = [f"`{n}`" for n, fk, _ in lokal if fk == k]
        L += [f"## `{k}` · {f.get('nama', k)}", "",
              f"- **Karakter:** {f.get('deskripsi', '')}",
              f"- **Pola yang memakainya ({len(pakai.get(k, []))}):** " + (", ".join(pakai.get(k, [])) or "—"),
              f"- **SFXIrfan:** " + (", ".join(mine) or "tidak ada") + "; Kenyset: nama file cocok `" + f.get("kenyset_regex", "—") + "`",
              f"- **Cari:** `python3 scripts/audio/sfx_cari.py --famili {k} --out projects/<proyek>/sfx/kandidat` (kata kunci: "
              + ", ".join(f'"{q}"' for q in f.get("cari", [])) + ")", ""]
    return "\n".join(L).rstrip("\n") + "\n"

def cmd_index():
    cards = load_cards()
    for name, txt in (("INDEX.md", build_index(cards)), ("POLA.md", build_pola(cards)), ("SFX.md", build_sfx(cards))):
        open(os.path.join(CB, name), "w", encoding="utf-8").write(txt)
    print(f"OK  INDEX.md, POLA.md, SFX.md ditulis dari {sum(1 for c in cards if c['fm'])} kartu")
    return 0


# ---------- cari ----------
def cmd_cari(args):
    if not args:
        print(__doc__); return 1
    p = resolve(args[0])
    if not p:
        print(f"tidak ada kartu untuk '{args[0]}'", file=sys.stderr); return 1
    if in_lama(p):
        print("(belum dikonversi, masih di _lama)", file=sys.stderr)
    print(os.path.relpath(p, ROOT))
    return 0


# ---------- cek ----------
def cmd_cek(args):
    ketat = "--ketat" in args
    cards = load_cards()
    res = []  # (status, pesan)
    def ok(m): res.append(("OK", m))
    def bad(m): res.append(("GAGAL", m))
    def warn(m): res.append(("PERINGATAN", m))
    def nbad(): return sum(1 for s, _ in res if s == "GAGAL")

    ids, namas = {}, {}
    for c in cards:
        r = c["rel"]
        fm = c["fm"]
        bc = nbad()
        if not fm:
            bad(f"{r}: frontmatter tidak ada"); continue
        miss = [k for k in WAJIB if k not in fm or (k not in LIST_KEYS and not fm[k])]
        if miss:
            bad(f"{r}: frontmatter kurang: {', '.join(miss)}")
        kat = fm.get("kategori", "")
        if kat != FOLDER_KAT[c["folder"]]:
            bad(f"{r}: kategori '{kat}' tidak sesuai folder (harus {FOLDER_KAT[c['folder']]})")
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
        tb = tblocks(c["body"])
        b0 = nbad()
        if kat != "script":
            if not tb:
                bad(f"{r}: tidak ada T-blok")
            for t in tb:
                wajib = (("Trigger", t["trigger"]),) if t.get("belum") else (("Trigger", t["trigger"]), ("Mekanik Remotion", t["mekanik"]), ("Remix", t["remix"]))
                kurang = [n for n, v in wajib if not v]
                if not t.get("belum") and t.get("sfx") and not (t["sfx"].startswith("famili `") or re.search(r"senyap", t["sfx"], re.I)):
                    kurang.append("SFX tanpa famili (tulis famili `<id>` dari guide/sfx/FAMILI.md, atau senyap + alasan)")  # T-blok yang jujur "belum dibedah" cukup punya Trigger
                if kurang:
                    bad(f"{r} T{t['n']}: kurang {', '.join(kurang)}")
        b1 = nbad()
        dirc = os.path.dirname(c["path"])
        seen = set()
        for pm in re.finditer(r"`([^`\n]+)`", c["text"]):
            p = pm.group(1)
            if not (p.startswith("../") or p.startswith("../../")):
                continue
            if re.search(r"\s", p) or "<" in p or "…" in p or "{" in p or not re.search(r"\.\w+$", p) or p in seen:
                continue
            seen.add(p)
            full = os.path.normpath(os.path.join(dirc, p))
            if "*" in p:
                if not glob.glob(full):
                    bad(f"{r}: glob tanpa hasil: {p}")
            elif not os.path.exists(full):
                bad(f"{r}: path tidak ada: {p}")
        if nbad() == bc:
            ok(f"{r}: frontmatter, kategori, {len(tb)} T-blok, path rujukan")

    for name, fn in (("INDEX.md", build_index), ("POLA.md", build_pola), ("SFX.md", build_sfx)):
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
    n_bad = sum(1 for s, _ in res if s == "GAGAL")
    print(f"\n{len(cards)} kartu · {n_bad} GAGAL · {sum(1 for s, _ in res if s == 'PERINGATAN')} PERINGATAN")
    return 1 if n_bad else 0


# ---------- migrasi-path ----------
SKIP_TOP = {"projects", "archive", "_archive"}
SKIP_ANY = {".git", "node_modules", "__pycache__"}
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
        top = rel.split(os.sep)[0]
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
    """Kembalikan (baris baru, daftar (lama, baru))."""
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
    if c == "cek": return cmd_cek(a)
    if c == "migrasi-path": return cmd_migrasi(a)
    print(__doc__); return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
