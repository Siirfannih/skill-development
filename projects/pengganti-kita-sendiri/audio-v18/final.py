"""dialog (VO + quoted clips, v14 chain, untouched) + the earshot soundtrack premaster -> earshot master.py (-14 LUFS, TP <= -1.5)"""
import sys, subprocess, numpy as np, soundfile as sf, pyloudnorm as pl
VO_OVER_MUSIC = float(sys.argv[1]) if len(sys.argv) > 1 else 10.0
pre, sr = sf.read('out/audio/premaster.wav'); mus = pre
d, _ = sf.read('/home/claude/v9b/mix16d/stem_dialog_g.wav'); d = d if d.ndim == 1 else d.mean(1)
n = len(pre); d = np.pad(d, (0, max(0, n - len(d))))[:n]
m = pl.Meter(sr); lv = m.integrated_loudness(d); lm = m.integrated_loudness(mus)
k = 1.0   # v18: dialog at unity (SFX levels are set against it); no music
D = np.stack([d, d], 1) * k
sf.write('out/audio/dialog_scaled.wav', D.astype(np.float32), sr, subtype='FLOAT')
sf.write('out/audio/final_premaster.wav', (pre + D).astype(np.float32), sr, subtype='FLOAT')
print(f'VO {lv:.1f} -> {lv + 20*np.log10(k):.1f} LUFS, music {lm:.1f} LUFS (with rides), gain on dialog {20*np.log10(k):+.1f} dB')
r = subprocess.run([sys.executable, '-I', '/home/claude/earshot_up/skills/real-sound/scripts/master.py', 'out/audio/final_premaster.wav', 'out/audio/soundtrack_final.wav',
                    '--lufs', '-14', '--ceiling', '0.6', '--no-comp', '--no-glue', '--json', 'out/qa/master_final.json'], capture_output=True, text=True)
print(r.stdout[-600:], r.stderr[-400:])
