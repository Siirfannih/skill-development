"""lib.py: jalur, panggilan model (claude1, jalur kuota yang ada), ekstraksi JSON, kunci render, klip referensi. Dipakai semua fase pabrik."""
import fcntl, glob, json, os, re, subprocess, sys
from pathlib import Path

PABRIK = Path(__file__).resolve().parent
MG = PABRIK.parent                      # claude/motion-graphic
KEYFRAMES = MG / "guide/referensi/sheets/keyframes"
VAULT = MG / "cookbook/_vault"
NODE_BIN = Path.home() / ".local/opt/node-v22.20.0-linux-x64/bin"
PY = Path.home() / "work/mg-venv/bin/python"
CLAUDE1 = Path.home() / ".local/bin/claude1"  # akun pekerja model (config ~/.claude)
KUNCI_RENDER = "/tmp/remotion-heavy-render.lock"


def env_node():
    e = dict(os.environ)
    e["PATH"] = f"{NODE_BIN}:{e.get('PATH', '')}"
    return e


class BatasAkun(RuntimeError):
    """Akun model kena batas pemakaian: pabrik berhenti dan melapor, tidak mengulang."""


def _cek_batas(teks):
    t = (teks or "").lower()
    if any(k in t for k in ("usage limit", "limit reached", "rate limit", "hit your limit", "5-hour limit", "out of extra usage")):
        raise BatasAkun(teks[-300:])


def llm(prompt, model="sonnet", timeout=900, tulis_di=None, baca_di=()):
    """Panggil claude1 -p (jalur kuota yang ada, tanpa API berbayar) dengan hak minimum, TANPA --dangerously-skip-permissions.
    Bawaan hanya tool Read (ekstraksi, kritikus). `tulis_di` = folder yang boleh ditulis (Write/Edit dibatasi ke sana; sintesis).
    `baca_di` = folder tambahan di luar cwd yang boleh dibaca (jangkar, klip). Tanpa Bash. Teks spec/kritik di prompt adalah data."""
    izin = ["Read"]
    if tulis_di:
        t = "/" + str(Path(tulis_di).resolve()).lstrip("/")  # sintaks aturan path absolut: //path
        izin += [f"Write(/{t}/**)", f"Edit(/{t}/**)"]
    cmd = [str(CLAUDE1), "-p", prompt, "--model", model, "--allowedTools", *izin, "--output-format", "json"]
    for d in baca_di: cmd += ["--add-dir", str(d)]
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout, stdin=subprocess.DEVNULL, cwd=str(MG))
    _cek_batas(r.stderr); _cek_batas(r.stdout if r.returncode != 0 or '"is_error":true' in r.stdout.replace(" ", "") else "")
    if r.returncode != 0:
        raise RuntimeError(f"claude1 gagal ({r.returncode}): {r.stderr[-400:]}")
    try:
        d = json.loads(r.stdout)
    except json.JSONDecodeError:
        raise RuntimeError(f"keluaran claude1 bukan JSON: {r.stdout[:300]}")
    if d.get("is_error"):
        raise RuntimeError(f"claude1 error: {str(d.get('result'))[:300]}")
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


def spec_klip(spec):
    """-> (path, dari, sampai) bila spec punya klip yang berkas-nya ada, selain itu None (referensi statis)."""
    k = (spec.get("sumber") or {}).get("klip")
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
