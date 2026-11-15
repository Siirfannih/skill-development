"""Mix v3 (15 Nov): suara dipotong ulang (edit/v3), cue v3, duck ≤ 1,5 dB (anti-pumping §14.1), bed lebih rendah.
Mix v2 (koreksi Irfan 13 Nov): suara = voice_clean.wav (jeda diredam), SFX = sfx_stem_v3.wav (53 cue), musik tanpa auto-gain naik; duck −2,5 dB saat bicara; stem float.
Mix v1: suara (take asli, gain linear saja) + SFX stem + musik per babak (Aware; drone gelap di belokan).
Musik: babak 1–2 = Aware 0,00→46,30 · babak 3 = drone_dark (ElevenLabs) + Aware 92,25→ low-pass 1,2 kHz · babak 4 = Aware 172,27→ (lagu meluruh sendiri ±93,5 dtk video).
Level dari audio.md §14.10: suara ≈ −14 LUFS, musik di bawah suara −22…−25 LUFS, SFX −4…−10 dB setelah normalisasi puncak (di cues), akhir −14 LUFS, TP ≤ −1 dBTP."""
import os
for _key in ("OMP_NUM_THREADS", "OPENBLAS_NUM_THREADS", "MKL_NUM_THREADS"):
    os.environ[_key] = "2"
import subprocess, numpy as np, soundfile as sf, json, sys
from pathlib import Path
import importlib.util
_spec = importlib.util.spec_from_file_location('make_v5', Path(__file__).resolve().parents[1] / 'edit/make_v5.py')
_build = importlib.util.module_from_spec(_spec); _spec.loader.exec_module(_build)
_run = subprocess.run
def guarded_run(*args, **kwargs):
    _build.resource_gate()
    return _run(*args, **kwargs)
TMP = Path('edit/v5/tmp'); TMP.mkdir(parents=True, exist_ok=True)
SR = 48000; DUR = json.load(open('edit/v5/map.json'))['dur_new']; N = int(round(DUR * SR))
def dec(path, ss=0.0, t=None, af=None):
    cmd = ['ffmpeg', '-filter_threads', '1', '-filter_complex_threads', '1', '-threads', '2', '-v', 'error', '-ss', str(ss)] + (['-t', str(t)] if t else []) + ['-i', path] + (['-af', af] if af else []) + ['-ac', '2', '-ar', str(SR), '-f', 'f32le', '-']
    return np.frombuffer(guarded_run(cmd, capture_output=True, check=True).stdout, dtype=np.float32).reshape(-1, 2).copy()
def lufs(x):
    sf.write('edit/v5/tmp/lufs.wav', x, SR)
    o = guarded_run(['ffmpeg', '-filter_threads', '1', '-filter_complex_threads', '1', '-threads', '2', '-v', 'info', '-i', 'edit/v5/tmp/lufs.wav', '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr
    return float([l for l in o.splitlines() if 'I:' in l][-1].split('I:')[1].split('LUFS')[0])
def place(buf, x, at, g_db=0.0, fin=0.0, fout=0.0):
    x = x * 10 ** (g_db / 20); i = int(round(at * SR))
    if fin: n = min(len(x), int(fin * SR)); x[:n] *= np.linspace(0, 1, n)[:, None]
    if fout: n = min(len(x), int(fout * SR)); x[-n:] *= np.linspace(1, 0, n)[:, None]
    buf[i:i + len(x)] += x[:max(0, len(buf) - i)]

M = 'assets/music_aware.wav'
K = np.array(json.load(open('remotion/src/data/knots_v5.json'))['knots'])
T3, T4 = (float(np.interp(t, K[:, 1], K[:, 0])) for t in (46.62, 75.58))
#  # twist, sadar (v3: peta edit/v3/knots.json)
voice = dec('edit/v5/voice_clean.wav')[:N]
voice = np.vstack([voice, np.zeros((N - len(voice), 2), np.float32)])
sfx = np.zeros((N, 2), np.float32)
for cue in json.load(open('edit/v5/cues.json'))['cues']:
    hit = dec(cue['file'], cue.get('ss', 0.), cue.get('dur'))
    if not len(hit): raise ValueError(f"Cannot decode cue {cue['file']}")
    peak = max(float(np.abs(hit).max()), 1e-9)
    hit /= peak
    offset = int(np.argmax(np.max(np.abs(hit), axis=1))) / SR if cue.get('align', 'peak') == 'peak' else 0.
    at = cue['t'] - offset
    if at < 0: hit = hit[round(-at * SR):]; at = 0.
    place(sfx, hit, at, cue['gain_db'], cue.get('fin', 0.), cue.get('fout', 0.))
music = np.zeros((N, 2), np.float32)
# babak 1–2: intro Aware, berhenti di twist dengan ekor 0,25 dtk (turun, bukan hilang: drone sudah masuk)
place(music, dec(M, 0.0, T3 + 0.25), 0.0, 0.0, fin=0.0, fout=0.25)
# babak 3: drone gelap + string tersaring
dr = dec('audio/sfx_el/drone_dark.mp3')
drone = np.concatenate([dr, dr[::-1], dr])[: int((T4 - T3 + 0.4) * SR)]
place(music, drone, T3 - 0.05, -9.0, fin=0.3, fout=0.4)
place(music, dec(M, 92.25, T4 - T3 + 0.3, af='lowpass=f=1200,lowpass=f=1200'), T3 + 0.4, -6.0, fin=1.5, fout=0.3)
# babak 4: puncak Aware, masuk di "sadar"
place(music, dec(M, 172.27, DUR - T4 + 0.1), T4, 0.0, fin=0.15)

# level: suara gain linear ke −14,5 LUFS; musik ke target LUFS relatif (diukur di bagian yang ada musik)
gv = -14.5 - lufs(voice); voice *= 10 ** (gv / 20)
target_music = float(sys.argv[1]) if len(sys.argv) > 1 else -23.5
gm = target_music - lufs(music); music *= 10 ** (gm / 20)
# v2 (urutan diperbaiki 14 Nov: duck SESUDAH normalisasi musik, kalau sebelum, normalisasi mengembalikan duck): tidak ada auto-gain naik (v1 ±8 dB mengisi jeda). Duck −6 dB saat bicara; babak 4 −2 dB, envelope 150 ms.
env = np.abs(voice.mean(1)); k = int(0.15 * SR)
env = np.convolve(env, np.ones(k, np.float32) / k, mode='same')
mask = np.clip((20 * np.log10(env + 1e-9) + 45) / 10, 0, 1)  # 0 = jeda (< −45 dB), 1 = bicara (> −35 dB)
# v3: anti-pumping §14.1 — duck ≤ 1,5 dB dengan ramp ±300 ms; kejernihan dari bed yang lebih rendah (target_music)
mask = np.convolve(mask, np.ones(int(0.3 * SR), np.float32) / int(0.3 * SR), mode='same')
music *= (10 ** (-1.5 * mask / 20))[:, None].astype(np.float32)
music[int(T4 * SR):] *= 10 ** (-3.0 / 20)  # babak 4: puncak Aware rapat di pita suara (audio_phone 72–86 dtk < 8 dB); level tetap per babak, bukan pumping
nf = int(0.5 * SR); music[-nf:] *= (np.linspace(1, 0, nf) ** 2)[:, None] if music.ndim > 1 else np.linspace(1, 0, nf) ** 2  # r8 audit c09: musik tidak terpotong di frame terakhir
# kantong EQ untuk suara di musik (−4 dB 2,8 kHz, −2 dB 450 Hz) — audio.md §14.10
sf.write('edit/v5/tmp/music.wav', music, SR)
music = dec('edit/v5/tmp/music.wav', af='equalizer=f=2800:t=q:w=1.2:g=-4,equalizer=f=450:t=q:w=1.0:g=-2')[:N]
# SFX: gain cue sudah relatif ke puncak ternormalisasi; stem diskalakan supaya puncak SFX median ±9 dB di bawah puncak suara
mix = voice + music + sfx * 10 ** (gv / 20 * 0)  # SFX tidak ikut gain suara
W = dict(subtype='FLOAT')
sf.write('edit/v5/stem_voice.wav', voice, SR, **W); sf.write('edit/v5/stem_music.wav', music, SR, **W); sf.write('edit/v5/stem_sfx.wav', sfx, SR, **W)
sf.write('edit/v5/mix_raw.wav', mix, SR, **W)
# satu limiter + true peak oversampled, target −14 LUFS
g = -13.9 - lufs(mix); mix *= 10 ** (g / 20); sf.write('edit/v5/mix_pre.wav', mix, SR, **W)
guarded_run(['ffmpeg', '-filter_threads', '1', '-filter_complex_threads', '1', '-threads', '2', '-v', 'error', '-y', '-i', 'edit/v5/mix_pre.wav', '-af', 'aresample=192000,alimiter=limit=0.85:attack=1:release=50:level=false,aresample=48000', '-threads', '2', '-c:a', 'pcm_s16le', 'edit/v5/mix.wav'], check=True)
print('gain suara', round(gv, 1), 'gain musik', round(gm, 1), 'gain akhir', round(g, 1))
