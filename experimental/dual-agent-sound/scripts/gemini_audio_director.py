#!/usr/bin/env python3
"""Gemini sebagai Music/Vocal Director (dual agent): Claude = sound engineer (eksekutor), Gemini = kurator & kritikus.

Setiap panggilan menyertakan: config/acoustic_style_blueprint.json + config/acoustic_style_overrides.json (aturan Irfan
di chat yang menang bila bertentangan) + 2 referensi 8 dtk di assets/reference_bank/ (diunggah sekali, URI di-cache).

Perintah:
  vo-pick   --act 1 --text "naskah babak" TAKE.wav [TAKE.wav ...]      → pilih 1 dari 3 take VO per babak
  vo-direct DRAFT.wav --words words.json                               → instruksi jeda/klip (timestamp) untuk VO rakitan
  curate    --kind music|sfx --context "panel/emosi" FILE [FILE ...]    → skor vibe, instrumen nyata, titik drop/perubahan emosi
  qc        MIX.wav [--cues cues.json]                                 → audit estetika mix (format rubric blueprint)
Keluaran: JSON ke stdout dan ke --out (default out/gemini/<perintah>_<waktu>.json).

Kunci API (tidak pernah dicetak): $GEMINI_API_KEY → ~/Documents/Skill-Development/.secrets/gemini.key → ~/.secrets/gemini_keys (baris pertama).
Audio dikirim sebagai 16 kHz mono (hemat token).

Backend: --backend agy (default bila `agy` ada di PATH, Mac Irfan: Antigravity CLI, model gemini-3.8-flash-high, kuota Google AI Pro)
atau --backend api (google-genai, model $GEMINI_AUDIO_MODEL, default gemini-3-flash-preview; kunci gratis tidak punya kuota model Pro)."""
import argparse, json, os, re, shutil, subprocess, sys, tempfile, time, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
CFG = ROOT / 'config'; REF = ROOT / 'assets' / 'reference_bank'; CACHE = ROOT / '.cache' / 'gemini_files.json'
MODEL = os.environ.get('GEMINI_AUDIO_MODEL', 'gemini-3-flash-preview')
AGY_MODEL = os.environ.get('AGY_MODEL', 'gemini-3.8-flash-high')
REFS = {'ref_act1_baikov_hook.wav': 'Referensi Babak 1 (Baikov/Krea 2): ritme padat namun tenang dan berwibawa.',
        'ref_act3_2030_manifesto.wav': 'Referensi Babak 3 (The 2030): narasi paling reflektif, dalam, ambient pad sinematik.'}

def key():
    if os.environ.get('GEMINI_API_KEY'): return os.environ['GEMINI_API_KEY'].strip()
    for p in [pathlib.Path.home() / 'Documents/Skill-Development/.secrets/gemini.key', pathlib.Path.home() / '.secrets/gemini_keys',
              pathlib.Path('/home/claude/.secrets/gemini_keys')]:
        if p.exists(): return p.read_text().split()[0]
    sys.exit('Kunci Gemini tidak ditemukan (lihat docstring)')

client = None
def api():
    global client, genai, types
    if client is None:
        from google import genai as g; from google.genai import types as t; genai, types = g, t; client = genai.Client(api_key=key())
    return client

def to16k(path):
    out = tempfile.NamedTemporaryFile(suffix='.mp3', delete=False).name
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(path), '-ac', '1', '-ar', '16000', '-b:a', '48k', out], check=True)
    return out

def upload(path, mime='audio/mpeg'):
    api(); f = client.files.upload(file=path, config=types.UploadFileConfig(mime_type=mime))
    while f.state and f.state.name == 'PROCESSING': time.sleep(1); f = client.files.get(name=f.name)
    return f

def ref_parts():
    """Unggah referensi sekali; pakai ulang URI selama masih aktif (file Gemini kedaluwarsa 48 jam)."""
    cache = json.loads(CACHE.read_text()) if CACHE.exists() else {}
    parts = []
    for fn, desc in REFS.items():
        c = cache.get(fn)
        ok = False
        if c and time.time() - c['t'] < 46 * 3600:
            try: client.files.get(name=c['name']); ok = True
            except Exception: ok = False
        if not ok:
            f = upload(str(REF / fn), 'audio/wav'); c = dict(name=f.name, uri=f.uri, mime='audio/wav', t=time.time()); cache[fn] = c
        parts += [types.Part.from_text(text=f'[{fn}] {desc}'), types.Part.from_uri(file_uri=c['uri'], mime_type=c['mime'])]
    CACHE.parent.mkdir(parents=True, exist_ok=True); CACHE.write_text(json.dumps(cache, indent=1))
    return parts

def system_context():
    bp = (CFG / 'acoustic_style_blueprint.json').read_text()
    ov = (CFG / 'acoustic_style_overrides.json').read_text() if (CFG / 'acoustic_style_overrides.json').exists() else '{}'
    return ('Kamu adalah Executive Audio & Vocal Director untuk video dokumenter @siirfannih «Pengganti Kita Sendiri». '
            'Claude adalah sound engineer yang mengeksekusi instruksimu. Dengarkan audio sungguhan; jangan menebak dari nama file. '
            'Patuhi blueprint berikut, dan OVERRIDES menang bila bertentangan. Jawab hanya JSON valid.\n'
            f'BLUEPRINT:\n{bp}\nOVERRIDES:\n{ov}')

BACKEND = 'agy' if shutil.which('agy') else 'api'

def ask_agy(prompt, files, schema_hint):
    """Antigravity CLI: file disalin ke folder kerja sementara di dalam proyek, Gemini membaca & mendengarnya sendiri."""
    work = ROOT / 'out' / 'gemini' / 'agy_in' / time.strftime('%H%M%S'); work.mkdir(parents=True, exist_ok=True)
    lines = []
    for label, p in files:
        dst = work / (re.sub(r'[^A-Za-z0-9_.-]', '_', label.split(':')[0]) + '_' + pathlib.Path(p).stem + '.mp3')
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(p), '-ac', '1', '-ar', '16000', '-b:a', '48k', str(dst)], check=True)
        lines.append(f'- [{label}] file: {dst}')
    refs = '\n'.join(f'- [{fn}] {d} file: {REF / fn}' for fn, d in REFS.items())
    full = (system_context() + '\n\nREFERENSI (dengarkan dulu):\n' + refs + '\n\nFILE YANG DINILAI (dengarkan semuanya, utuh):\n'
            + '\n'.join(lines) + '\n\nTUGAS:\n' + prompt + '\nJangan mengedit file apa pun. Balas HANYA satu objek JSON valid dengan format:\n' + schema_hint)
    for attempt in range(2):
        r = subprocess.run(['agy', '-p', full, '--model', AGY_MODEL, '--add-dir', str(ROOT), '--print-timeout', '600s', '--output-format', 'text'],
                           capture_output=True, text=True, cwd=str(work))
        out = r.stdout
        m = re.search(r'\{.*\}', out, re.S)
        if m:
            try:
                j = json.loads(m.group(0)); return j[0] if isinstance(j, list) and len(j) == 1 else j
            except Exception: pass
    return {'error': 'agy tanpa JSON valid', 'raw': out[-2000:], 'stderr': r.stderr[-500:]}

def ask(prompt, files, schema_hint):
    if BACKEND == 'agy': return ask_agy(prompt, files, schema_hint)
    api(); parts = ref_parts()
    for label, p in files:
        f = upload(to16k(p)); parts += [types.Part.from_text(text=f'[{label}]'), types.Part.from_uri(file_uri=f.uri, mime_type='audio/mpeg')]
    parts.append(types.Part.from_text(text=prompt + '\nFormat JSON yang diminta:\n' + schema_hint))
    for attempt in range(3):
        try:
            r = client.models.generate_content(model=MODEL, contents=[types.Content(role='user', parts=parts)],
                                               config=types.GenerateContentConfig(system_instruction=system_context(), temperature=0.2,
                                                                                  response_mime_type='application/json'))
            j = json.loads(r.text)
            return j[0] if isinstance(j, list) and len(j) == 1 else j
        except Exception as e:
            err = str(e); time.sleep(4)
    return {'error': err[:500]}

def main():
    ap = argparse.ArgumentParser(); sub = ap.add_subparsers(dest='cmd', required=True)
    a = sub.add_parser('vo-pick'); a.add_argument('--act', required=True); a.add_argument('--text', required=True); a.add_argument('takes', nargs='+')
    b = sub.add_parser('vo-direct'); b.add_argument('draft'); b.add_argument('--words', required=True)
    c = sub.add_parser('curate'); c.add_argument('--kind', choices=['music', 'sfx'], required=True); c.add_argument('--context', required=True); c.add_argument('files', nargs='+')
    d = sub.add_parser('qc'); d.add_argument('mix'); d.add_argument('--cues'); d.add_argument('--notes', default='')
    for s in (a, b, c, d): s.add_argument('--out'); s.add_argument('--backend', choices=['agy', 'api'])
    x = ap.parse_args()
    global BACKEND
    if x.backend: BACKEND = x.backend
    if x.cmd == 'vo-pick':
        res = ask(f'Babak {x.act}. Naskah: «{x.text}». Dengarkan setiap take VO (bahasa Indonesia). Bandingkan dengan referensi dan '
                  f'vocal_prosody babak ini. Pilih satu take terbaik: tidak ceria/energik, tidak naik di akhir kalimat, berat dan reflektif sesuai babak.',
                  [(f'TAKE {i+1}: {pathlib.Path(p).name}', p) for i, p in enumerate(x.takes)],
                  '{"best_take": 1, "scores": [{"take": 1, "prosody_1_10": 0, "tone_1_10": 0, "issues": ["..."]}], "reason": "..."}')
    elif x.cmd == 'vo-direct':
        words = json.load(open(x.words))
        res = ask('Ini draf rakitan VO + klip kutipan Jensen Huang dan Sam Altman, beserta daftar kata bertimestamp (detik): '
                  + json.dumps(words, ensure_ascii=False) + '\nDengarkan alurnya. Beri instruksi jeda hening per batas kalimat '
                  '(0,6–1,0 dtk akhir kalimat, 1,5 dtk sebelum & sesudah klip Inggris) dan cek apakah klip terpotong di tengah kata. '
                  'Jangan pernah meminta mengubah kecepatan/pitch.', [('DRAFT VO', x.draft)],
                  '{"status": "APPROVED|REJECTED", "pauses": [{"after_word_time": 0.0, "after_word": "...", "silence_s": 0.8, "why": "..."}], '
                  '"clip_fixes": [{"clip": "jensen|altman", "issue": "...", "extend_end_s": 0.0, "extend_start_s": 0.0}], "notes": "..."}')
    elif x.cmd == 'curate':
        res = ask(f'Kurasi {x.kind} untuk konteks: {x.context}. Dengarkan tiap file; tolak yang mengandung tag terlarang blueprint. '
                  'Laporkan instrumen yang benar-benar terdengar dan detik penting (drop, perubahan emosi, build).',
                  [(f'FILE {i+1}: {pathlib.Path(p).name}', p) for i, p in enumerate(x.files)],
                  '{"ranking": [{"file": "...", "vibe_match_1_10": 0, "banned_tags_heard": [], "instruments": ["..."], '
                  '"mood": "...", "key_moments": [{"t": 0.0, "event": "drop|swell|emotion_shift|build|silence"}], "verdict": "USE|REJECT", "reason": "..."}], "pick": "..."}')
    else:
        cues = json.load(open(x.cues)) if x.cues else []
        res = ask('Audit estetika mix_master ini secara utuh terhadap rubric blueprint (rejection_triggers). Cue SFX: ' + json.dumps(cues, ensure_ascii=False)
                  + ('\nCatatan engineer: ' + x.notes if x.notes else ''), [('MIX', x.mix)],
                  json.dumps(json.load(open(CFG / 'acoustic_style_blueprint.json'))['gemini_api_evaluation_rubric']['output_format_required_from_gemini']))
    out = pathlib.Path(x.out) if x.out else ROOT / 'out' / 'gemini' / f'{x.cmd}_{time.strftime("%H%M%S")}.json'
    out.parent.mkdir(parents=True, exist_ok=True); out.write_text(json.dumps(res, indent=1, ensure_ascii=False))
    print(json.dumps(res, indent=1, ensure_ascii=False))

if __name__ == '__main__':
    main()
