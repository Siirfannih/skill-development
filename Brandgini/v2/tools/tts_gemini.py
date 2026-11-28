#!/usr/bin/env python3
"""tts_gemini.py v2 · VO Soalnya Gini dengan Gemini Voice Design (keputusan Irfan 25 Nov 2026, KEPUTUSAN-IRFAN D-01).

  python3 tools/tts_gemini.py --input script.md --out vo_raw.wav --episode sg001              # DRY-RUN (bawaan)
  python3 tools/tts_gemini.py --input script.md --out vo_raw.wav --episode sg001 --izin-biaya D-VO-01

Suara: kit/suara.json. Bergantian per episode: nomor ganjil -> sg-perempuan, genap -> sg-laki (bisa dipaksa --suara).
Request: POST https://generativelanguage.googleapis.com/v1beta/interactions, header x-goog-api-key,
  body {model, input:[{type:user_input, content:[{type:text, text}]}], response_format:{type:audio},
        generation_config:{speech_config:[{voice: <id>}]}}; audio = steps[].content[type=audio].data (base64 WAV).
  Struktur ini sama dengan skrip uji A/B yang berhasil 25 Nov 2026 dan dokumen https://aistudio.google.com/docs/voice-design.
  TANPA anotasi style (sampel yang Irfan suka dibuat tanpa style; D-04).
Kunci API hanya dibaca dari ~/.config/soalnya-gini/gemini.env (izin 600, GEMINI_API_KEY); tidak pernah dicetak,
  ditulis ke log, atau disalin. Berkas dengan izin lebih longgar dari 600 ditolak.
Keluaran MENTAH (uji: -19...-21 LUFS). Mastering: tools/vo_master.sh --sumber tts (tanpa loudnorm; Lantai E23).
Hanya teks VO yang dibacakan: front matter, judul, tabel, dan catatan [..] dibuang.
"""
import argparse, base64, datetime as dt, json, os, re, stat, sys, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/interactions"
ENVF = Path(os.path.expanduser("~/.config/soalnya-gini/gemini.env"))


def clean_script(path):
    raw = re.sub(r"^---.*?---", " ", open(path, encoding="utf-8").read(), flags=re.S)
    keep = [t.lstrip("> ").strip() for t in (l.strip() for l in raw.splitlines()) if t and not t.startswith(("#", "|", "<!--"))]
    return re.sub(r"\s+", " ", re.sub(r"\[[^\]]*\]", " ", " ".join(keep))).strip()


def pilih_suara(cfg, episode, paksa):
    if paksa:
        return paksa
    n = int(re.sub(r"\D", "", episode) or 0)
    return cfg["giliran"]["ganjil" if n % 2 else "genap"]


def baca_kunci():
    if not ENVF.exists():
        sys.exit(f"GAGAL: {ENVF} tidak ada (kunci hanya di PC).")
    mode = stat.S_IMODE(ENVF.stat().st_mode)
    if mode & 0o077:
        sys.exit(f"GAGAL: izin {ENVF} {oct(mode)} terlalu longgar; harus 600.")
    env = dict(l.strip().split("=", 1) for l in ENVF.read_text().splitlines() if "=" in l and not l.lstrip().startswith("#"))
    k = env.get("GEMINI_API_KEY", "").strip().strip('"')
    if not k:
        sys.exit("GAGAL: GEMINI_API_KEY kosong di berkas env.")
    return k


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--input", required=True); p.add_argument("--out", required=True)
    p.add_argument("--episode", required=True, help="mis. sg001; menentukan giliran suara")
    p.add_argument("--suara", help="paksa nama suara di kit/suara.json (mis. sg-laki)")
    p.add_argument("--izin-biaya", default="", help="ID DECISIONS persetujuan biaya; tanpa ini = dry-run")
    p.add_argument("--suara-json", default=str(ROOT / "kit/suara.json"))
    a = p.parse_args()
    cfg = json.load(open(a.suara_json, encoding="utf-8"))
    nama = pilih_suara(cfg, a.episode, a.suara); v = cfg["suara"][nama]
    sisa = (dt.date.fromisoformat(v["kedaluwarsa"]) - dt.date.today()).days
    text = clean_script(a.input); n = len(text.split())
    print(f"[suara] {a.episode} -> {nama} ({v['id']}) · kedaluwarsa {v['kedaluwarsa']} ({sisa} hari lagi)")
    if sisa < 30:
        print("[PERINGATAN] suara rancangan kedaluwarsa < 30 hari: perbarui di AI Studio dan kit/suara.json")
    print(f"[teks] {n} kata · perkiraan {n / cfg['tempo_kata_per_dtk']:.1f} dtk pada {cfg['tempo_kata_per_dtk']} kata/dtk")
    body = {"model": cfg["model"], "input": [{"type": "user_input", "content": [{"type": "text", "text": text}]}],
            "response_format": {"type": "audio"}, "generation_config": {"speech_config": [{"voice": v["id"]}]}}
    if not a.izin_biaya.strip():
        print("[DRY-RUN] tidak memanggil API (tanpa --izin-biaya). Body yang akan dikirim:")
        print(json.dumps(body, ensure_ascii=False)[:1200]); return
    if sisa < 0:
        sys.exit("GAGAL: suara rancangan sudah kedaluwarsa.")
    req = urllib.request.Request(ENDPOINT, data=json.dumps(body).encode(),
                                 headers={"x-goog-api-key": baca_kunci(), "Content-Type": "application/json"})
    try:
        r = json.load(urllib.request.urlopen(req, timeout=180))
    except urllib.error.HTTPError as e:   # pesan error dari server tidak memuat kunci; header permintaan tidak dicetak
        sys.exit(f"GAGAL HTTP {e.code}: {e.read()[:300].decode(errors='ignore')}")
    aud = [c for s in r.get("steps", []) for c in s.get("content", []) if c.get("type") == "audio"]
    if not aud:
        sys.exit("GAGAL: respons tanpa audio")
    Path(a.out).parent.mkdir(parents=True, exist_ok=True)
    Path(a.out).write_bytes(base64.b64decode(aud[-1]["data"]))
    meta = dict(episode=a.episode, suara=nama, voice_id=v["id"], model=cfg["model"], izin=a.izin_biaya, kata=n,
                waktu=dt.datetime.now().isoformat(timespec="seconds"))
    Path(a.out).with_suffix(".json").write_text(json.dumps(meta, ensure_ascii=False, indent=1))
    print(f"[OK] {a.out} ({Path(a.out).stat().st_size} byte) -> lanjut: bash tools/vo_master.sh {a.out} vo.wav --sumber tts")


if __name__ == "__main__":
    main()
