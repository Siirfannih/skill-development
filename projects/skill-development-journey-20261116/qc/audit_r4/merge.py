#!/usr/bin/env python3
"""Gabung mekanis VERDICT_gpt.md + VERDICT_sonnet.md per potongan -> VERDICT.md, lalu qc/VERDICT.md dan handoff/REPORT-R4-audit.md.
Aturan: temuan tanpa nomor frame dibuang; sepakat = jenis sama dan frame beda <=3; satu pemeriksa saja = PERLU PUTUS. Tidak menilai frame."""
import glob, json, os, re
P = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
FA = f"{P}/qc/frame_audit"


def load(path):
    try:
        t = open(path).read()
        if t.startswith("GAGAL-JALUR"):
            return None
        d = json.loads(t)
    except Exception:
        return None
    out = []
    for x in d.get("temuan", []):
        try:
            f = int(x["frame"])
        except Exception:
            continue
        out.append(dict(frame=f, jenis=str(x.get("jenis", "?")).strip().lower(), terlihat=str(x.get("terlihat", "")).replace("|", "/"),
                        usul=str(x.get("usul", "")).replace("|", "/")))
    return out


rows = []; agree_all = []; split_all = []; sec_stat = {}
for d in sorted(glob.glob(f"{FA}/c[0-9][0-9]_*")):
    name = os.path.basename(d)
    m = re.match(r"c\d+_([\d.]+)-([\d.]+)s", name); a, b = float(m[1]), float(m[2])
    h = re.search(r"HASH:\s*(\S+)", open(f"{d}/VERDICT.md").read())
    hsh = h[1] if h else (open(f"{d}/.hash").read().strip() if os.path.exists(f"{d}/.hash") else "?")
    g, s = load(f"{d}/VERDICT_gpt.md"), load(f"{d}/VERDICT_sonnet.md")
    sheets = sorted(glob.glob(f"{d}/s*.jpg"))

    def sheet(fr, sheets=sheets):
        t = fr / 29.97
        best = [x for x in sheets if float(re.findall(r"s([\d.]+)\.jpg", x)[0]) <= t + 1e-6]
        return os.path.relpath(best[-1], P) if best else "?"
    ag, sp = [], []
    if g is not None and s is not None:
        used = set()
        for x in g:
            hit = next((j for j, y in enumerate(s) if j not in used and y["jenis"] == x["jenis"] and abs(y["frame"] - x["frame"]) <= 3), None)
            if hit is None:
                sp.append(("Codex", x))
            else:
                used.add(hit); ag.append((x, s[hit]))
        sp += [("Sonnet", y) for j, y in enumerate(s) if j not in used]
    else:
        sp = [("Codex", x) for x in (g or [])] + [("Sonnet", y) for y in (s or [])]
    incomplete = g is None or s is None
    putus = "LULUS" if (not incomplete and not ag and not sp) else "GAGAL"
    lines = [f"# VERDICT {name}", f"HASH: {hsh}", ""]
    lines.append(f"Codex: {'JALUR MATI' if g is None else ('LULUS' if not g else f'{len(g)} temuan')} · Sonnet: {'JALUR MATI' if s is None else ('LULUS' if not s else f'{len(s)} temuan')}. Mentah: VERDICT_gpt.md, VERDICT_sonnet.md.")
    if incomplete:
        lines += ["", "CATATAN: satu pemeriksa gagal menjawab; GAGAL sementara sampai diulang."]
    lines += ["", "## DISEPAKATI (kedua pemeriksa)", "dtk | frame | jenis | terlihat | usul | lembar"]
    for x, y in ag:
        lines.append(f"{x['frame'] / 29.97:.1f} | {x['frame']} | {x['jenis']} | Codex: {x['terlihat']} / Sonnet: {y['terlihat']} | {x['usul']} | {sheet(x['frame'])}")
    if not ag: lines.append("(tidak ada)")
    lines += ["", "## PERLU PUTUS (satu pemeriksa)", "dtk | frame | jenis | pemeriksa | terlihat | usul | lembar"]
    for who, x in sp:
        lines.append(f"{x['frame'] / 29.97:.1f} | {x['frame']} | {x['jenis']} | {who} | {x['terlihat']} | {x['usul']} | {sheet(x['frame'])}")
    if not sp: lines.append("(tidak ada)")
    lines += ["", f"PUTUSAN: {putus}"]
    open(f"{d}/VERDICT.md", "w").write("\n".join(lines) + "\n")
    # kesepakatan per detik: sepakat bila keduanya sama-sama bersih, atau sama-sama punya temuan sepakat di detik itu
    for sec in range(int(a), int(b + 0.999)):
        fr = lambda L: any(sec <= x["frame"] / 29.97 < sec + 1 for x in L)
        if incomplete: st = "tak-lengkap"
        elif any(sec <= x["frame"] / 29.97 < sec + 1 for x, _ in ag): st = "sepakat-temuan"
        elif any(sec <= x["frame"] / 29.97 < sec + 1 for _, x in sp): st = "beda"
        else: st = "sepakat-bersih"
        sec_stat[sec] = st
    rows.append(dict(name=name, g=g, s=s, ag=ag, sp=sp, putus=putus, sheet=sheet))

tot = len(sec_stat); same = sum(1 for v in sec_stat.values() if v in ("sepakat-bersih", "sepakat-temuan"))
q = ["# VERDICT audit frame R4 (gabungan mekanis; belum diputus Sutradara)", "",
     f"Tingkat kesepakatan per detik: {same}/{tot} detik ({100 * same / max(tot, 1):.0f}%) · sepakat-bersih {sum(v == 'sepakat-bersih' for v in sec_stat.values())} · sepakat-temuan {sum(v == 'sepakat-temuan' for v in sec_stat.values())} · beda {sum(v == 'beda' for v in sec_stat.values())} · tak lengkap {sum(v == 'tak-lengkap' for v in sec_stat.values())}", "",
     "| Potongan | Codex | Sonnet | Disepakati | Perlu putus | PUTUSAN |", "|---|---|---|---|---|---|"]
for r in rows:
    cx = lambda L: "mati" if L is None else len(L)
    q.append(f"| {r['name']} | {cx(r['g'])} | {cx(r['s'])} | {len(r['ag'])} | {len(r['sp'])} | {r['putus']} |")
bad = [sec for sec, v in sorted(sec_stat.items()) if v == "beda"]
q += ["", f"Detik dengan beda pendapat: {bad if bad else '(tidak ada)'}"]
open(f"{P}/qc/VERDICT.md", "w").write("\n".join(q) + "\n")

rep = ["# REPORT R4 audit frame", "", "Koordinator tidak menilai frame; semua penilaian dari Codex dan Claude Sonnet buta. Putusan akhir di Sutradara.", ""] + q[2:]
for title, key in (("Temuan DISEPAKATI", "ag"), ("Temuan PERLU PUTUS", "sp")):
    rep += ["", f"## {title}", "dtk | frame | jenis | terlihat | usul | lembar"]
    n = 0
    for r in rows:
        for it in r[key]:
            if key == "ag":
                x, y = it; rep.append(f"{x['frame'] / 29.97:.1f} | {x['frame']} | {x['jenis']} | Codex: {x['terlihat']} / Sonnet: {y['terlihat']} | {x['usul']} | {r['sheet'](x['frame'])}")
            else:
                who, x = it; rep.append(f"{x['frame'] / 29.97:.1f} | {x['frame']} | {x['jenis']} | ({who}) {x['terlihat']} | {x['usul']} | {r['sheet'](x['frame'])}")
            n += 1
    if not n: rep.append("(tidak ada)")
os.makedirs(f"{P}/handoff", exist_ok=True)
open(f"{P}/handoff/REPORT-R4-audit.md", "w").write("\n".join(rep) + "\n")
print("\n".join(q))
