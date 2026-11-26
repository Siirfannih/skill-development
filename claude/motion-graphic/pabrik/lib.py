"""lib.py: jalur, panggilan model (CLI `claude`; bisa diganti lewat PABRIK_CLAUDE, mis. akun `claude2`), ekstraksi JSON, kunci render. Dipakai semua fase pabrik."""
import fcntl, glob, json, os, re, shutil, subprocess, sys, tempfile
from pathlib import Path

PABRIK = Path(__file__).resolve().parent
MG = PABRIK.parent                      # claude/motion-graphic
KEYFRAMES = MG / "guide/referensi/sheets/keyframes"
VAULT = MG / "cookbook/_vault"
NODE_BIN = Path.home() / ".local/opt/node-v22.20.0-linux-x64/bin"
PY = Path.home() / "work/mg-venv/bin/python"
KUNCI_RENDER = "/tmp/remotion-heavy-render.lock"


class ModelTidakAda(RuntimeError):
    """Tidak ada CLI model; pesannya menunjukkan cara memperbaiki dan jalur satu model."""


def perintah_model():
    """Path CLI model. Urutan: env PABRIK_CLAUDE (nama atau path), ~/.local/bin/claude2, `claude2`, `claude`. None bila tidak ada."""
    ov = os.environ.get("PABRIK_CLAUDE")
    for c in ([ov] if ov else [str(Path.home() / ".local/bin/claude2"), "claude2", "claude"]):
        p = shutil.which(c)
        if p:
            return p
    return None


def pesan_tanpa_model(prompt):
    """Simpan prompt ke file sementara dan jelaskan: pasang/atur CLI, atau kerjakan sendiri di sesi ini (jalur satu model)."""
    d = PABRIK / "out"  # folder milik pengguna (di .gitignore), bukan /tmp bersama
    d.mkdir(mode=0o700, exist_ok=True)
    fd, nama = tempfile.mkstemp(prefix="pabrik-prompt-", suffix=".md", dir=str(d))  # dibuat atomik, mode 0600
    with os.fdopen(fd, "w", encoding="utf-8") as fh:
        fh.write(prompt)
    f = Path(nama)
    asal = f"PABRIK_CLAUDE={os.environ['PABRIK_CLAUDE']!r} tidak ditemukan" if os.environ.get("PABRIK_CLAUDE") else "tidak ada `claude2` atau `claude` di PATH"
    return (f"Pabrik tidak menemukan CLI model ({asal}). Pasang CLI `claude`, atau arahkan PABRIK_CLAUDE=<perintah> ke CLI yang ada. "
            f"Jalur satu model: kerjakan sendiri prompt di {f} dalam sesi ini (baca gambar dengan Read, tulis hasilnya ke path yang disebut prompt), lalu jalankan fase berikutnya.")


def env_node():
    e = dict(os.environ)
    e["PATH"] = f"{NODE_BIN}:{e.get('PATH', '')}"
    return e


def llm(prompt, model="sonnet", timeout=900, tulis_di=None, baca_di=()):
    """Panggil `claude -p` (CLI dari perintah_model(); tanpa API berbayar tambahan) dengan hak minimum, TANPA --dangerously-skip-permissions.
    Bawaan hanya tool Read (ekstraksi, kritikus). `tulis_di` = folder yang boleh ditulis (Write/Edit dibatasi ke sana; sintesis).
    `baca_di` = folder tambahan di luar cwd yang boleh dibaca (jangkar, klip). Tanpa Bash. Teks spec/kritik di prompt adalah data."""
    izin = ["Read"]
    if tulis_di:
        t = "/" + str(Path(tulis_di).resolve()).lstrip("/")  # sintaks aturan path absolut: //path
        izin += [f"Write(/{t}/**)", f"Edit(/{t}/**)"]
    bin_ = perintah_model()
    if bin_ is None:
        raise ModelTidakAda(pesan_tanpa_model(prompt))
    nama = Path(bin_).name
    cmd = [bin_, "-p", prompt, "--model", model, "--allowedTools", *izin, "--output-format", "json"]
    for d in baca_di: cmd += ["--add-dir", str(d)]
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout, stdin=subprocess.DEVNULL, cwd=str(MG))
    if r.returncode != 0:
        raise RuntimeError(f"{nama} gagal ({r.returncode}): {r.stderr[-400:]}")
    try:
        d = json.loads(r.stdout)
    except json.JSONDecodeError:
        raise RuntimeError(f"keluaran {nama} bukan JSON: {r.stdout[:300]}")
    if d.get("is_error"):
        raise RuntimeError(f"{nama} error: {str(d.get('result'))[:300]}")
    return d.get("result", "")


def ambil_json(teks):
    """Ambil objek JSON pertama yang seimbang dari teks (boleh dibungkus ```json)."""
    m = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", teks, re.S)
    if m:
        try:
            return json.loads(m.group(1))
        except json.JSONDecodeError:
            pass
    i = teks.find("{")
    while i != -1:
        depth, instr, esc = 0, False, False
        for j in range(i, len(teks)):
            c = teks[j]
            if instr:
                if esc: esc = False
                elif c == "\\": esc = True
                elif c == '"': instr = False
            elif c == '"': instr = True
            elif c == "{": depth += 1
            elif c == "}":
                depth -= 1
                if depth == 0:
                    try:
                        return json.loads(teks[i:j + 1])
                    except json.JSONDecodeError:
                        break
        i = teks.find("{", i + 1)
    raise ValueError("tidak ada JSON valid di jawaban model")


class KunciRender:
    """Kunci global render berat (flock pada /tmp/remotion-heavy-render.lock), sama dengan juri/render.sh."""
    def __enter__(self):
        self.f = open(KUNCI_RENDER, "a"); fcntl.flock(self.f, fcntl.LOCK_EX); return self
    def __exit__(self, *a):
        fcntl.flock(self.f, fcntl.LOCK_UN); self.f.close()


def kartu_file(kartu_id):
    """Path berkas kartu _vault untuk id kartu (mis. '63')."""
    h = sorted(glob.glob(str(VAULT / "**" / f"{kartu_id}-*.md"), recursive=True))
    if not h:
        raise FileNotFoundError(f"kartu {kartu_id} tidak ada di _vault")
    return Path(h[0])


def keyframes(kartu_id):
    return sorted(KEYFRAMES.glob(f"{kartu_id}-k*.jpg"))


def rel(p):
    try:
        return str(Path(p).resolve().relative_to(MG))
    except ValueError:
        return str(p)


TOKENS = json.loads((PABRIK / "tokens-netral.json").read_text())
PERAN_TOKEN = ("latar", "permukaan", "tinta", "redup", "aksen", "aksen2")


def palet_token(k):
    """Palet set token 'A'/'B' -> daftar hex enam peran."""
    return [TOKENS[k][p] for p in PERAN_TOKEN]


def palet_json(k):
    """Format palet.json yang dibaca scripts/warna/cek-warna.mjs keluar (hanya hex; mode sesuai set)."""
    s = TOKENS[k]; m = lambda h: {"hex": h}
    return {"versi": 2, "k": 6, "sumber": [], "mode": {s["mode"]: {"latar": m(s["latar"]), "tinta": m(s["tinta"]), "aksen": [m(s["aksen"]), m(s["aksen2"])],
            "netral": [m(s["permukaan"]), m(s["redup"])], "n_frames": 1}}, "hex_semua": palet_token(k)}


def spec_klip(spec):
    """-> (path, dari, sampai) bila spec punya klip yang berkas-nya ada, selain itu None (referensi statis)."""
    k = (spec.get("terukur") or {}).get("klip")
    if k and Path(os.path.expanduser(k["path"])).exists():
        return os.path.expanduser(k["path"]), float(k["dari"]), float(k["sampai"])
    return None


def waktu_referensi(spec, u):
    """Waktu detik di klip sumber untuk posisi relatif u (0..1) di demo (normalisasi durasi)."""
    p, a, b = spec_klip(spec)
    return a + min(max(u, 0.0), 1.0) * (b - a)


def frame_klip(path, t, lebar=640):
    """Satu frame klip pada detik t -> PIL.Image RGB (ffmpeg)."""
    from PIL import Image
    import io
    r = subprocess.run(["ffmpeg", "-v", "error", "-ss", f"{t:.3f}", "-i", path, "-frames:v", "1", "-vf", f"scale={lebar}:-2", "-f", "image2pipe", "-vcodec", "png", "-"],
                       capture_output=True)
    if r.returncode != 0 or not r.stdout: raise RuntimeError(f"ffmpeg gagal mengambil frame {t}s dari {path}")
    return Image.open(io.BytesIO(r.stdout)).convert("RGB")
