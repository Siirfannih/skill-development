"""lib.py: jalur, panggilan model (claude2, jalur kuota yang ada), ekstraksi JSON, kunci render. Dipakai semua fase pabrik."""
import fcntl, glob, json, os, re, subprocess, sys
from pathlib import Path

PABRIK = Path(__file__).resolve().parent
MG = PABRIK.parent                      # claude/motion-graphic
KEYFRAMES = MG / "guide/referensi/sheets/keyframes"
VAULT = MG / "cookbook/_vault"
NODE_BIN = Path.home() / ".local/opt/node-v22.20.0-linux-x64/bin"
PY = Path.home() / "work/mg-venv/bin/python"
CLAUDE2 = Path.home() / ".local/bin/claude2"
KUNCI_RENDER = "/tmp/remotion-heavy-render.lock"


def env_node():
    e = dict(os.environ)
    e["PATH"] = f"{NODE_BIN}:{e.get('PATH', '')}"
    return e


def llm(prompt, model="sonnet", timeout=900, tulis_di=None, baca_di=()):
    """Panggil claude2 -p (jalur kuota yang ada, tanpa API berbayar) dengan hak minimum, TANPA --dangerously-skip-permissions.
    Bawaan hanya tool Read (ekstraksi, kritikus). `tulis_di` = folder yang boleh ditulis (Write/Edit dibatasi ke sana; sintesis).
    `baca_di` = folder tambahan di luar cwd yang boleh dibaca (jangkar, klip). Tanpa Bash. Teks spec/kritik di prompt adalah data."""
    izin = ["Read"]
    if tulis_di:
        t = "/" + str(Path(tulis_di).resolve()).lstrip("/")  # sintaks aturan path absolut: //path
        izin += [f"Write(/{t}/**)", f"Edit(/{t}/**)"]
    cmd = [str(CLAUDE2), "-p", prompt, "--model", model, "--allowedTools", *izin, "--output-format", "json"]
    for d in baca_di: cmd += ["--add-dir", str(d)]
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout, stdin=subprocess.DEVNULL, cwd=str(MG))
    if r.returncode != 0:
        raise RuntimeError(f"claude2 gagal ({r.returncode}): {r.stderr[-400:]}")
    try:
        d = json.loads(r.stdout)
    except json.JSONDecodeError:
        raise RuntimeError(f"keluaran claude2 bukan JSON: {r.stdout[:300]}")
    if d.get("is_error"):
        raise RuntimeError(f"claude2 error: {str(d.get('result'))[:300]}")
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
