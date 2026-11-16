#!/usr/bin/env python3
"""Gerbang urutan sound design: tiap lapisan audio dikunci berurutan ke lapisan sebelumnya (Irfan 8 Nov).

Gagal yang ditangkap: V5 8 Nov, visual + SFX + musik dikerjakan paralel, tidak ada tahap mencocokkan.
SFX tidak terikat ke event visual (cakupan 5-11 %), musik dipilih tanpa mendengar hasil visual + SFX.

Dua mode (pilih di brief, tulis alasannya):
  konten (default) : suara (VO / audio sumber klip) -> visual -> sfx -> musik
                     Visual dibangun di atas timing suara, SFX disusun dari event visual yang sudah terkunci,
                     musik dipilih paling akhir dengan mendengar visual + SFX ("tipe videonya begini, jadi musiknya ini").
  musik            : musik -> visual -> sfx (suara opsional)
                     Untuk video yang digerakkan lagu/ketukan (video lirik, montage potong di ketukan): musik
                     menentukan timeline, visual dipotong di ketukannya, SFX menyusul event visual.

Setiap `lock` mencatat sidik file tahap itu + sidik semua tahap sebelumnya. Bila file tahap awal berubah
(visual direvisi), semua tahap sesudahnya jadi BASI dan harus dikunci ulang: SFX disinkron ulang, musik didengar ulang.

Pakai (folder default: audio/ di proyek):
  audio_order.py init --mode konten [--dir audio]
  audio_order.py lock suara  vo.wav --words actual.json --source-words source.json --cut-map map.json
  audio_order.py lock visual render_tanpa_audio.mp4
  audio_order.py lock sfx    cues.json --ref-density 0.65 (wajib lolos kepadatan + palet terhadap visual terkunci)
  audio_order.py lock musik  track.mp3 --peran "..." --alasan "..." --didengar preview_visual_sfx.mp4
  audio_order.py check                            exit 1 bila ada tahap hilang, salah urut, atau basi
"""
import argparse, hashlib, json, subprocess, sys, time
from pathlib import Path

ORDER = {"konten": ["suara", "visual", "sfx", "musik"], "musik": ["musik", "suara", "visual", "sfx"]}
OPTIONAL = {"musik": {"suara"}, "konten": set()}
HERE = Path(__file__).resolve().parent


def sha(p):
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""):
            h.update(b)
    return h.hexdigest()[:16]


def load(d):
    f = d / "ORDER.json"
    if not f.exists():
        raise SystemExit(f"FAIL: {f} belum ada; jalankan `audio_order.py init --mode konten|musik` dulu")
    return json.loads(f.read_text())


def save(d, s):
    (d / "ORDER.json").write_text(json.dumps(s, ensure_ascii=False, indent=1))


def stale(s, d):
    """Kembalikan daftar masalah: file berubah sejak dikunci, atau tahap hulu berubah sejak tahap ini dikunci."""
    out, seq = [], [x for x in ORDER[s["mode"]] if x in s["stages"]]
    for st in seq:
        rec = s["stages"][st]
        p = Path(rec["file"])
        if not p.exists():
            out.append(f"{st}: file {p} hilang")
        elif sha(p) != rec["sha"]:
            out.append(f"{st}: {p.name} berubah sejak dikunci -> kunci ulang {st} dan semua tahap sesudahnya")
        for label, evidence in rec.get("evidence", {}).items():
            ep = Path(evidence["file"])
            if not ep.exists():
                out.append(f"{st}: bukti {label} hilang: {ep}")
            elif sha(ep) != evidence["sha"]:
                out.append(f"{st}: bukti {label} berubah sejak dikunci -> kunci ulang {st}")
        for up, up_sha in rec.get("hulu", {}).items():
            if up in s["stages"] and s["stages"][up]["sha"] != up_sha:
                out.append(f"{st}: dikunci terhadap {up} versi lama -> {'sinkron ulang SFX ke visual baru' if st == 'sfx' else 'dengar ulang dan kunci ulang ' + st}")
    return out


def run_gate(command, failure):
    result = subprocess.run(command, capture_output=True, text=True)
    output = (result.stdout + result.stderr).strip()
    if output:
        print(output.splitlines()[-1])
    if result.returncode:
        raise SystemExit(f"FAIL: {failure}\n{output[-1200:]}")


def validate_voice(audio, words, source_words, cut_map, voice_source):
    required = {
        "words": Path(words),
        "source_words": Path(source_words),
        "cut_map": Path(cut_map),
        "voice_source": Path(voice_source),
    }
    missing = [f"{name}={path}" for name, path in required.items() if not path.exists()]
    if missing:
        raise SystemExit("FAIL: bukti potongan suara tidak lengkap: " + ", ".join(missing))
    cut = str(HERE / "cut_check.py")
    run_gate(
        [sys.executable, cut, audio, words],
        "suara terkunci masih memuat kata sampah atau jeda berpikir",
    )
    run_gate(
        [sys.executable, cut, audio, words, "--source-words", source_words, "--map", cut_map],
        "peta potong menyentuh kata isi, guard 50 ms, atau urutan kata sumber",
    )
    run_gate(
        [sys.executable, str(HERE / "pause_clean.py"), audio, words],
        "jeda suara masih berisik",
    )
    run_gate(
        [sys.executable, str(HERE / "voice_level.py"), voice_source, audio],
        "suara asli diturunkan, ditekan, atau terlalu pelan (Lantai E23)",
    )
    return {
        name: {"file": str(path.resolve()), "sha": sha(path)}
        for name, path in required.items()
    }


def validate_sfx(state, cues, objects, ref_density=0.0):
    visual = state["stages"].get("visual")
    if not visual:
        raise SystemExit("FAIL: SFX disusun dari event visual; kunci visual dulu")
    if not objects or not Path(objects).exists():
        raise SystemExit("FAIL: SFX wajib memakai --objects objects.json (1 SFX per objek/visual penting, Lantai E24)")
    cmd = [sys.executable, str(HERE / "sfx_density.py"), visual["file"], cues, "--objects", objects]
    if ref_density > 0:
        cmd += ["--ref-density", str(ref_density)]
    run_gate(cmd, "objek tanpa SFX, peran tidak konsisten, spam, atau palet terlarang")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("cmd", choices=["init", "lock", "check"])
    ap.add_argument("stage", nargs="?")
    ap.add_argument("file", nargs="?")
    ap.add_argument("--dir", default="audio")
    ap.add_argument("--mode", choices=list(ORDER), default="konten")
    ap.add_argument("--peran", default="")
    ap.add_argument("--alasan", default="")
    ap.add_argument("--didengar", default="", help="preview visual+SFX yang didengar saat memilih musik (mode konten)")
    ap.add_argument("--words", default="", help="transkrip kata aktual pada suara terkunci")
    ap.add_argument("--source-words", default="", help="transkrip kata pada take sumber sebelum dipotong")
    ap.add_argument("--cut-map", default="", help="map.json berisi rentang sumber yang dibuang")
    ap.add_argument("--ref-density", type=float, default=0.0, help="opsional: batas kepadatan bila Irfan memintanya")
    ap.add_argument("--voice-source", default="", help="stem suara sumber sebelum proses (bukti level tidak diturunkan)")
    ap.add_argument("--objects", default="", help="objects.json: objek/visual yang muncul atau bergerak")
    a = ap.parse_args()
    d = Path(a.dir)
    d.mkdir(parents=True, exist_ok=True)

    if a.cmd == "init":
        save(d, {"mode": a.mode, "stages": {}, "dibuat": time.strftime("%Y-%m-%d %H:%M")})
        print(f"OK mode {a.mode}: " + " -> ".join(ORDER[a.mode]))
        return

    s = load(d)
    seq = ORDER[s["mode"]]

    if a.cmd == "lock":
        st, f = a.stage, a.file
        if st not in seq or not f or not Path(f).exists():
            raise SystemExit(f"FAIL: pakai `lock <{'|'.join(seq)}> <file yang ada>`")
        before = seq[:seq.index(st)]
        missing = [x for x in before if x not in s["stages"] and x not in OPTIONAL[s["mode"]]]
        if missing:
            raise SystemExit(f"FAIL: {st} belum boleh dikunci; tahap sebelumnya belum terkunci: {', '.join(missing)} "
                             f"(urutan mode {s['mode']}: {' -> '.join(seq)})")
        prob = [p for p in stale(s, d) if p.split(":")[0] in before]
        if prob:
            raise SystemExit("FAIL: tahap hulu basi, perbaiki dulu:\n  " + "\n  ".join(prob))
        evidence = {}
        if st == "suara" and s["mode"] == "konten":
            if not (a.words and a.source_words and a.cut_map and a.voice_source):
                raise SystemExit("FAIL: lock suara wajib --words, --source-words, --cut-map, dan --voice-source")
            evidence = validate_voice(f, a.words, a.source_words, a.cut_map, a.voice_source)
        if st == "sfx":
            validate_sfx(s, f, a.objects, a.ref_density)
            evidence = {"objects": {"file": str(Path(a.objects).resolve()), "sha": sha(a.objects)}}
        if st == "musik":
            if not a.peran.strip() or not a.alasan.strip():
                raise SystemExit("FAIL: musik wajib punya --peran dan --alasan (mis. 'tipe video X, jadi musiknya Y')")
            if s["mode"] == "konten" and (not a.didengar or not Path(a.didengar).exists()):
                raise SystemExit("FAIL: mode konten memilih musik paling akhir sambil mendengar visual + SFX; "
                                 "beri --didengar preview.mp4 (render visual + SFX tanpa musik)")
        rec = {"file": str(Path(f).resolve()), "sha": sha(f), "waktu": time.strftime("%Y-%m-%d %H:%M"),
               "hulu": {x: s["stages"][x]["sha"] for x in before if x in s["stages"]}}
        if evidence:
            rec["evidence"] = evidence
        if st == "sfx":
            rec["ref_density"] = a.ref_density
        if st == "musik":
            rec.update(peran=a.peran, alasan=a.alasan, didengar=a.didengar)
        # mengunci ulang tahap awal membuat tahap sesudahnya basi (dilaporkan oleh check), tidak dihapus diam-diam
        s["stages"][st] = rec
        save(d, s)
        print(f"OK {st} terkunci ({rec['sha']})")
        return

    # check
    fails = []
    for x in seq:
        if x not in s["stages"] and x not in OPTIONAL[s["mode"]]:
            fails.append(f"{x}: belum dikunci")
    fails += stale(s, d)
    voice = s["stages"].get("suara")
    if s["mode"] == "konten" and voice and not voice.get("evidence"):
        fails.append("suara: bukti words/source_words/cut_map belum dikunci")
    elif s["mode"] == "konten" and voice and not fails:
        evidence = voice["evidence"]
        try:
            validate_voice(
                voice["file"],
                evidence["words"]["file"],
                evidence["source_words"]["file"],
                evidence["cut_map"]["file"],
                evidence.get("voice_source", {}).get("file", ""),
            )
        except SystemExit as error:
            fails.append(str(error))
    sfx = s["stages"].get("sfx")
    if sfx and not fails:
        try:
            validate_sfx(s, sfx["file"], sfx.get("evidence", {}).get("objects", {}).get("file", ""),
                         float(sfx.get("ref_density", 0)))
        except SystemExit as error:
            fails.append(str(error))
    print(f"mode {s['mode']}: " + " -> ".join(f"{x}{'✓' if x in s['stages'] else '·'}" for x in seq))
    print("PASS" if not fails else "FAIL:\n  " + "\n  ".join(fails))
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
