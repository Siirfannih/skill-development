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
 'shutter': dict(q='a single short camera shutter click', alts=['whoosh', 'car engine starting', 'error buzz', 'record scratch', 'gunshot'],
   c=[f'{V2}/shutter.mp3', f'{GX}/shutter-modern.wav', f'{GX}/shutter-old.wav', f'{GE}/v17_shutter_0.mp3', f'{GE}/v17_shutter_1.mp3', f'{GE}/v17_shutter_2.mp3']),
 'whoosh': dict(q='a light airy whoosh swish', alts=['car engine starting', 'motorcycle revving', 'record scratch', 'wind storm', 'jet plane'],
   c=[f'{V2}/whoosh.mp3', f'{K}/swoosh-2-359826.mp3', f'{K}/simple-whoosh-382724.mp3', f'{K}/swoosh-014-383768.mp3', f'{K}/universfield-swoosh-023-454830.mp3', f'{K}/swoosh-010-352856.mp3', f'{GE}/v17_whoosh_1.mp3', f'{GE}/v17_whip_1.mp3', f'{V10}/swoosh_light.flac', f'{V10}/air_generic.flac', f'{V10}/sub-cinematic-01__a9946ddf.flac']),
 'pop': dict(q='a soft bright user interface pop notification', alts=['error buzz', 'cartoon boing', 'water drop', 'car horn', 'glitch'],
   c=[f'{K}/pop-up-notify-smooth-modern-332448.mp3', f'{V2}/ui_pop.mp3', f'{K}/soft-subtle-ui-pop-sfx-348820.mp3', f'{K}/soft-ui-pop-light-minimal-click-451232.mp3', f'{K}/ui-pop-sound-316482.mp3', f'{GE}/v17_pop_0.mp3', f'{V10}/bubbly_select.flac', f'{V10}/wobble_bloop.flac', f'{V10}/cute_pops.flac']),
 'click': dict(q='a crisp mouse click tap', alts=['error buzz', 'gunshot', 'wood knock', 'glitch', 'car engine starting'],
   c=[f'{K}/mouse-click-290204.mp3', f'{V2}/mouse_click.mp3', f'{K}/confirm-tap-394001.mp3', f'{K}/ipad_click-99325.mp3', f'{K}/App Click 1.wav', f'{GE}/v17_click_0.mp3', f'{V10}/simple_select.flac', f'{V10}/dull_menu.flac']),
 'hit': dict(q='a short deep soft impact thud', alts=['explosion', 'car engine starting', 'door slam', 'gunshot', 'glitch'],
   c=[f'{GE}/v17_thud_0.mp3', f'{GE}/v17_thud_1.mp3', f'{GE}/v17_impact_0.mp3', f'{GE}/v17_impact_1.mp3', f'{V2}/key_clack.mp3', f'{V10}/boom_thud_distant.flac', f'{V10}/bass_drop_deep.flac']),
 'glide': dict(q='a smooth soft swoosh of a line being drawn', alts=['scratching', 'car engine starting', 'error buzz', 'wind storm'],
   c=[f'{GE}/v17_glide_2.mp3', f'{GE}/v17_glide_1.mp3', f'{GE}/v17_glide_0.mp3', f'{V10}/shepard-tone-up-09__25747e8d.flac']),
 'switch': dict(q='a light switch click', alts=['gunshot', 'error buzz', 'wood knock', 'car engine starting'],
   c=[f'{V2}/switch.mp3', f'{GX}/switch.mp3' if os.path.exists(f'{GX}/switch.mp3') else f'{V2}/switch.mp3']),
 'riser': dict(q='a soft rising swell', alts=['siren', 'car engine starting', 'jet plane', 'glitch'],
   c=[f'{V2}/riser.mp3', f'{GE}/v17_riser_0.mp3', f'{GE}/swell_1.mp3', f'{V10}/tension-glitch-riser__1b894efa.flac']),
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
json.dump(out, open(os.path.join(os.path.dirname(__file__), 'palette_report.json'), 'w'), indent=1)
print('PALETTE_DONE')
