"""Mix: suara (take asli, gain linear saja) + SFX stem + musik per babak (Aware; drone gelap di belokan).
Musik: babak 1–2 = Aware 0,00→46,30 · babak 3 = drone_dark (ElevenLabs) + Aware 92,25→ low-pass 1,2 kHz · babak 4 = Aware 172,27→ (lagu meluruh sendiri ±93,5 dtk video).
Level dari audio.md §14.10: suara ≈ −14 LUFS, musik di bawah suara −22…−25 LUFS, SFX −4…−10 dB setelah normalisasi puncak (di cues), akhir −14 LUFS, TP ≤ −1 dBTP."""
import subprocess, numpy as np, soundfile as sf, json, sys
SR = 48000; DUR = 94.967; N = int(round(DUR * SR))
def dec(path, ss=0.0, t=None, af=None):
    cmd = ['ffmpeg', '-v', 'error', '-ss', str(ss)] + (['-t', str(t)] if t else []) + ['-i', path] + (['-af', af] if af else []) + ['-ac', '2', '-ar', str(SR), '-f', 'f32le', '-']
    return np.frombuffer(subprocess.run(cmd, capture_output=True).stdout, dtype=np.float32).reshape(-1, 2).copy()
def lufs(x):
    sf.write('/tmp/claude-1000/_l.wav', x, SR)
    o = subprocess.run(['ffmpeg', '-v', 'info', '-i', '/tmp/claude-1000/_l.wav', '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr
    return float([l for l in o.splitlines() if 'I:' in l][-1].split('I:')[1].split('LUFS')[0])
def place(buf, x, at, g_db=0.0, fin=0.0, fout=0.0):
    x = x * 10 ** (g_db / 20); i = int(round(at * SR))
    if fin: n = int(fin * SR); x[:n] *= np.linspace(0, 1, n)[:, None]
    if fout: n = int(fout * SR); x[-n:] *= np.linspace(1, 0, n)[:, None]
    buf[i:i + len(x)] += x[:max(0, len(buf) - i)]

M = 'assets/music_aware.wav'
T3, T4 = 46.30, 75.45  # twist, sadar
voice = dec('audio/voice_raw.wav')[:N]
voice = np.vstack([voice, np.zeros((N - len(voice), 2), np.float32)])
sfx = sf.read('audio/sfx_stem.wav', dtype='float32')[0]
sfx = np.stack([sfx, sfx], 1)[:N]
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

# auto-gain RMS bed musik (jendela 1 dtk, maks ±8 dB) supaya sebaran bed per 3 dtk ≤ 4 dB (audio.md §14.10, resep Behindwork)
mono = music.mean(1); win = SR
rms = np.array([np.sqrt((mono[i:i + win] ** 2).mean()) + 1e-9 for i in range(0, N, win)])
db = 20 * np.log10(rms); act = db > -60
tgt = np.median(db[act]) + 1.0
gdb = np.clip(tgt - db, -8, 8); gdb[~act] = 0
gdb[int(T4):] += 1.5  # babak 4 sedikit terangkat (lega), tetap dalam sebaran
cent = np.arange(len(gdb)) * win + win / 2
curve = np.interp(np.arange(N), cent, gdb)
music *= (10 ** (curve / 20))[:, None].astype(np.float32)
# level: suara gain linear ke −14,5 LUFS; musik ke target LUFS relatif (diukur di bagian yang ada musik)
gv = -14.5 - lufs(voice); voice *= 10 ** (gv / 20)
target_music = float(sys.argv[1]) if len(sys.argv) > 1 else -23.5
gm = target_music - lufs(music); music *= 10 ** (gm / 20)
# kantong EQ untuk suara di musik (−4 dB 2,8 kHz, −2 dB 450 Hz) — audio.md §14.10
sf.write('/tmp/claude-1000/_m.wav', music, SR)
music = dec('/tmp/claude-1000/_m.wav', af='equalizer=f=2800:t=q:w=1.2:g=-4,equalizer=f=450:t=q:w=1.0:g=-2')[:N]
# SFX: gain cue sudah relatif ke puncak ternormalisasi; stem diskalakan supaya puncak SFX median ±9 dB di bawah puncak suara
mix = voice + music + sfx * 10 ** (gv / 20 * 0)  # SFX tidak ikut gain suara
sf.write('audio/stem_voice.wav', voice, SR); sf.write('audio/stem_music.wav', music, SR); sf.write('audio/stem_sfx.wav', sfx, SR)
sf.write('audio/mix_raw.wav', mix, SR)
# satu limiter + true peak oversampled, target −14 LUFS
g = -13.9 - lufs(mix); mix *= 10 ** (g / 20); sf.write('audio/mix_pre.wav', mix, SR)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'audio/mix_pre.wav', '-af', 'aresample=192000,alimiter=limit=0.85:attack=1:release=50:level=false,aresample=48000', '-c:a', 'pcm_s16le', 'audio/mix.wav'], check=True)
print('gain suara', round(gv, 1), 'gain musik', round(gm, 1), 'gain akhir', round(g, 1))
