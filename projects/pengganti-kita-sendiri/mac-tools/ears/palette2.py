# PKS v10c · palet SFX dari proyek yang LULUS (The Gap v18 + video #2 "20 konten"), didengar dengan earshot.
# Tiap peran: kandidat dari palet terbukti → earshot describe + match (peran vs pembanding salah) + ukuran:
#   centroid (kecerahan), porsi >6 kHz (desis), 2–6 kHz (tusukan), ekor alami (waktu puncak → −30 dB, "agak bergema"), kekasaran.
import json, os, glob, subprocess, numpy as np, soundfile as sf
from earshot import api
H = os.path.expanduser('~'); SD = f'{H}/Documents/Skill-Development/projects'
K = f'{H}/Downloads/Kenyset [FREE SFX PACK]'; V2 = f'{SD}/jadisatu-video2/audio/sfx'
GE = f'{SD}/jadisatu-60s/remotion/sfx-el'; GX = f'{SD}/jadisatu-60s/remotion/sfx-extra'
V10 = f'{H}/Documents/Skill-Development/AI-Video/pks-studio/ears/v10b'
ROLES = {
 'tonal': dict(q='a soft bright pleasant musical notification tone, like a marimba or flute note', alts=['error buzz', 'alarm', 'car horn', 'cartoon boing', 'siren'],
   c=[f'{K}/marimba-bloop-3-188151.mp3', f'{K}/marimba-bloop-2-188149.mp3', f'{K}/notification-pluck-off-269290.mp3', f'{K}/happy-message-ping-351298.mp3', f'{K}/bright-notification-352449.mp3', f'{K}/new-notification-08-352461.mp3', f'{K}/new-notification-09-352705.mp3', f'{K}/new-notification-012-363675.mp3', f'{K}/new-notification-013-363676.mp3', f'{K}/notification-2-269292.mp3', f'{V2}/ding.mp3']),
 'word': dict(q='a crisp light click of a mouse or touchscreen tap', alts=['error buzz', 'gunshot', 'wood knock', 'glitch', 'typewriter'],
   c=[f'{K}/ipad_click-99325.mp3', f'{K}/App Click 11.wav', f'{K}/minimal-pop-click-ui-11-198311.mp3', f'{K}/immersivecontrol-button-click-sound-463065.mp3', f'{K}/universfield-computer-mouse-click-352734.mp3', f'{K}/tiktok_drop_sample_click3_kofi_by_miraclei-360034.mp3']),
}
def load(p):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-ac', '1', '-ar', '48000', '-f', 'f32le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.float32)
def metrics(p):
    x = load(p); sr = 48000
    if len(x) < 100: return {}
    S = np.abs(np.fft.rfft(x)) ** 2; f = np.fft.rfftfreq(len(x), 1 / sr); tot = S.sum() + 1e-12
    hop = 480; e = np.array([np.sqrt((x[i:i + hop] ** 2).mean()) for i in range(0, len(x) - hop, hop)]) + 1e-9
    edb = 20 * np.log10(e / e.max()); pk = int(e.argmax())
    tail = next((i for i in range(pk, len(edb)) if edb[i] < -30), len(edb)) - pk
    rough = float(np.mean(np.abs(np.diff(edb[pk:pk + 40])))) if len(edb) > pk + 5 else 0
    # nada: jendela 80 ms di puncak → autokorelasi (keharmonisan 0–1, nada dasar) + frekuensi puncak spektrum
    a0 = pk * hop; w = x[a0:a0 + int(0.08 * sr)]
    if len(w) > 2000:
        w = w * np.hanning(len(w)); ac = np.correlate(w, w, 'full')[len(w) - 1:]; ac = ac / (ac[0] + 1e-12)
        lo, hi = int(sr / 2500), int(sr / 80); lag = lo + int(ac[lo:hi].argmax()); harm = float(ac[lag]); f0 = sr / lag
        Ws = np.abs(np.fft.rfft(w, 8192)); fw = np.fft.rfftfreq(8192, 1 / sr); peak = float(fw[Ws.argmax()])
    else: harm, f0, peak = 0.0, 0.0, 0.0
    return dict(dur=round(len(x) / sr, 2), centroid=int((f * S).sum() / tot), hi6k=round(float(100 * S[f > 6000].sum() / tot), 1),
                b26=round(float(100 * S[(f > 2000) & (f < 6000)].sum() / tot), 1), attack_ms=pk * 10, tail_ms=int(tail * 10), rough=round(float(rough), 2),
                harm=round(harm, 2), f0=int(f0), peakHz=int(peak))
S = lambda r: r.get('summary') if isinstance(r, dict) else str(r)
out = {}
for role, R in ROLES.items():
    paths = [p for p in dict.fromkeys(R['c']) if os.path.exists(p)]
    out[role] = []
    for p in paths:
        m = api.match(p, R['q'], alts=R['alts']); d = api.describe(p)
        row = dict(file=p.replace(H, '~'), match=S(m), describe=S(d), **metrics(p))
        out[role].append(row)
        print('ROLE', role, os.path.basename(p), json.dumps({k: row[k] for k in row if k not in ('file', 'describe')}, ensure_ascii=False)[:420], flush=True)
        print('   DESC', row['describe'][:260], flush=True)
json.dump(out, open(os.path.join(os.path.dirname(__file__), 'palette2_report.json'), 'w'), indent=1)
print('PALETTE_DONE')
