#!/usr/bin/env python3
"""Runner R4: dua pemeriksa buta (Codex + Claude Sonnet) per potongan frame_audit, maks 3 paralel per model.
Pakai: python3 run.py [cNN ...]   (tanpa argumen = semua potongan 'belum diperiksa'). Log: qc/audit_r4/logs/."""
import glob, json, os, re, subprocess, sys, time
from concurrent.futures import ThreadPoolExecutor
P = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
FA = f"{P}/qc/frame_audit"; LOG = f"{P}/qc/audit_r4/logs"; os.makedirs(LOG, exist_ok=True)
NOTES = """CATATAN DISENGAJA (jangan dilaporkan sebagai masalah):
- Teks hilang dengan POTONGAN (tanpa pudar) adalah gaya yang disengaja; teks masuk per kata dalam 3 frame.
- Teks besar (FINALLY, BALIK MODAL, WORKFLOW-NYA, LINTAS AGENT, AI SLOP) berdiri di BELAKANG kepala dan sebagian tertutup kepala: disengaja.
- Bubble "Hi, aku Claude/ChatGPT/Gemini!" di atas tokoh pixel adalah teks yang diberikan pemilik video (bukan ucapan): disengaja; nama tokoh tidak muncul lagi sebagai teks terpisah.
- Komentar IG "@…", "masih AI slop", "Lumayan nih", kartu "Claude Max"/"ChatGPT Pro" dan angka berhitung 1×→20×/5×: disengaja.
- Shot meja 3D (Claude bata oranye) dan postingan IG adalah adegan sisipan yang disengaja; tumpukan emoji/panah merah/bingkai neon di 15–22 dtk = parodi "AI slop", disengaja.
- Panah goresan putih (B11 ±58,6) dan tulisan tangan biru/kuning (81–83 dtk) disengaja.
- Kata besar keluar dengan sapuan mask kiri→kanan ±5–6 frame: disengaja.
- 59–60 dtk: "ChatGPT" tidak muncul sebagai teks narasi karena sudah tampil sebagai label kartu di papan (kata ganda dilarang): disengaja, sudah diputus Sutradara.
- 79,6–80,8: pita hitam kosong sementara "masih kerasa AI?" tampil sebagai komentar IG: disengaja.
- 29 dtk: "apple style" tampil sebagai ketikan di kolom app Claude, bukan teks narasi (kata ganda dilarang): disengaja.
- 38,1 dtk: potongan footage di akhir kalimat "workflow-nya." adalah jump cut dari edit suara yang terkunci: disengaja.
- 23,9 dan 34,7 dtk: teks tertunda ≤ 0,25 dtk dari awal blok saat lingkaran wajah menutup layar app terang: disengaja.
- "bagi yang beruntung." hilang 2 frame sebelum akhir video (kata terakhir selesai 83,67): disengaja.
- 73–74 dtk: kata "pakai" sengaja tidak ditampilkan di "100% FULL AI" (instruksi pemilik video): disengaja.
- Teks narasi bisa tertunda ≤ 0,25 dtk dari kata saat transisi lingkaran/wipe sedang menutup frame: disengaja."""


def prompt(folder, absolute):
    where = f"folder potongan `{folder}`" if absolute else "folder kerjamu"
    prev = os.path.exists(f"{folder}/VERDICT.prev.md")
    p = f"""Kamu pemeriksa frame untuk sebuah video 29,97 fps, 1920x1080. Tugasmu memeriksa SATU potongan (maks 10 detik) di {where}. Jangan membaca kode, laporan, atau file di luar folder itu, dan jangan mengubah file apa pun.
1. Baca INFO.md di folder itu (tanda otomatis, kata yang diucapkan + detiknya, cue SFX).
2. Buka SEMUA file s*.jpg di folder itu, satu per satu. Tiap lembar = 1 detik = sekitar 30 frame berurutan (kiri ke kanan, atas ke bawah; lembar terakhir bisa lebih pendek) + strip energi audio (biru suara, hijau musik, oranye SFX). Nama lembar s<detik mulai>.jpg; nomor frame ABSOLUT tertulis di tiap sel. Pakai nomor itu untuk kolom frame. Frame berbingkai merah = tanda otomatis.
"""
    if prev:
        p += "2b. Ada VERDICT.prev.md: temuan di VERDICT.prev.md yang sudah diputus Sutradara jangan diangkat lagi kecuali masih terlihat di lembar sekarang (nomor frame bisa bergeser).\n"
    p += NOTES + """
3. Nilai per detik:
 - jarak antar-frame: lompatan/patahan (objek, kamera, wajah meloncat) di luar pergantian adegan yang jelas disengaja? gerak tertahan lalu meloncat?
 - transisi: frame kosong, kedip 1 frame, dua teks tajam bertumpuk, teks/kartu muncul lalu hilang lalu muncul?
 - visual: teks terbaca dan utuh (tidak terpotong tepi/kata), tidak bertabrakan, keseimbangan kiri-kanan, wajah tidak terpotong aneh;
 - audio: momen visual yang bercerita (benda jatuh/mendarat/ditempel, klik, ketik, ganti adegan, kartu masuk) punya cue SFX di INFO.md dalam ±0,3 dtk; bila tidak, tulis apakah perlu bunyi; strip suara tidak tenggelam di musik;
 - kecocokan: teks layar = kata yang sedang diucapkan (detik di INFO.md).
4. Tiap tanda otomatis di INFO.md dinilai (masalah / bukan masalah + alasan), bukan disalin.
5. Balasan akhirmu HANYA satu blok JSON valid (tanpa teks lain), bentuk:
{"temuan":[{"detik":<int>,"frame":<nomor frame absolut, wajib>,"jenis":"lompat|kedip|beku|transisi|visual|audio|kecocokan","terlihat":"<apa yang terlihat, singkat>","usul":"<usul perbaikan>"}],
 "tanda_otomatis":[{"frame":<int>,"putusan":"masalah|bukan masalah","alasan":"<singkat>"}],
 "putusan":"LULUS|GAGAL"}
putusan = LULUS bila temuan kosong, GAGAL bila ada. Temuan tanpa nomor frame tidak dihitung. Jangan melaporkan hal sepele selera; laporkan hanya yang nyata terlihat di lembar."""
    return p


def extract(txt):
    i = txt.find('{"temuan"')
    if i < 0:
        i = txt.find("{")
    j = txt.rfind("}")
    if i < 0 or j < i:
        return None
    try:
        d = json.loads(txt[i:j + 1])
        return d if "temuan" in d else None
    except Exception:
        return None


def sh(cmd, env, log, timeout=3000, inp=None):
    with open(log, "ab") as f:
        f.write(f"\n=== {time.strftime('%H:%M:%S')} {' '.join(cmd[:6])} ...\n".encode()); f.flush()
        try:
            r = subprocess.run(cmd, **({'input': inp} if inp is not None else {'stdin': subprocess.DEVNULL}), stdout=subprocess.PIPE, stderr=f, env=env, timeout=timeout)
            return r.returncode, r.stdout.decode(errors="replace")
        except subprocess.TimeoutExpired:
            return 124, ""


def run_codex(cd, name):
    log = f"{LOG}/{name}_gpt.log"; raw = f"{cd}/VERDICT_gpt.raw"
    for att in (1, 2):
        if os.path.exists(raw):
            os.remove(raw)
        rc, out = sh(["codex", "exec", "--sandbox", "danger-full-access", "--skip-git-repo-check", "-C", cd, "-o", raw, prompt(cd, False)], os.environ.copy(), log)
        txt = open(raw).read() if os.path.exists(raw) else out
        d = extract(txt)
        if d is not None:
            open(f"{cd}/VERDICT_gpt.md", "w").write(json.dumps(d, ensure_ascii=False, indent=1) + "\n")
            return "ok", att
    open(f"{cd}/VERDICT_gpt.md", "w").write("GAGAL-JALUR: Codex tidak mengembalikan JSON valid 2x (lihat qc/audit_r4/logs).\n")
    return "mati", 2


def run_sonnet(cd, name):
    log = f"{LOG}/{name}_sonnet.log"; used = []
    for cfg in ("~/.claude-2", "~/.claude-2", "~/.claude", "~/.claude"):
        env = os.environ.copy(); env["CLAUDE_CONFIG_DIR"] = os.path.expanduser(cfg)
        rc, out = sh(["claude", "-p", "--model", "sonnet", "--allowedTools=Read,Glob"], env, log, inp=prompt(cd, True).encode())
        used.append(cfg); d = extract(out)
        if d is not None:
            open(f"{cd}/VERDICT_sonnet.md", "w").write(json.dumps(d, ensure_ascii=False, indent=1) + "\n")
            open(f"{cd}/sonnet.fallback", "w").write(f"akun {cfg} percobaan {len(used)}\n")
            return "ok", len(used)
    open(f"{cd}/VERDICT_sonnet.md", "w").write("GAGAL-JALUR: Sonnet tidak mengembalikan JSON valid 4x (2x per akun).\n")
    return "mati", 4


def main():
    only = os.environ.get("ONLY", "")  # ONLY=sonnet | gpt
    want = sys.argv[1:]
    chunks = [d for d in sorted(glob.glob(f"{FA}/c[0-9][0-9]_*")) if os.path.isdir(d)]
    todo = [d for d in chunks if (not want and (only == "sonnet" or "belum diperiksa" in open(f"{d}/VERDICT.md").read())) or any(os.path.basename(d).startswith(w) for w in want)]
    print("potongan:", [os.path.basename(d) for d in todo], flush=True)
    res = {}
    with ThreadPoolExecutor(3) as pc, ThreadPoolExecutor(3) as ps:
        fs = {}
        for d in todo:
            n = os.path.basename(d)
            if only != "sonnet": fs[(n, "gpt")] = pc.submit(run_codex, d, n)
            if only != "gpt": fs[(n, "sonnet")] = ps.submit(run_sonnet, d, n)
        for k, f in fs.items():
            res[k] = f.result(); print(k, res[k], flush=True)
    json.dump({f"{k[0]}|{k[1]}": v for k, v in res.items()}, open(f"{P}/qc/audit_r4/run_result_{only or 'all'}.json", "w"))


main()
