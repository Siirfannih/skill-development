"""Ekstrak tiap shot EDL jadi klip H.264 1080p30 bergrade di remotion/public/media/shot_XX.mp4 (video saja).
Pakai: python3 extract_shots.py edl.json <out_dir> [id ...]"""
import json, sys, glob, subprocess, os
from paths6 import src_path
from sig6 import sig
CACHE = 'cache/media'   # v8e: shot identik dipakai ulang (hardlink), hanya shot baru/berubah yang di-encode
GRADE = {
    'pagi': "eq=contrast=0.97:saturation=0.90,colorbalance=rs=0.05:gs=0.01:bs=-0.05:rm=0.03:bm=-0.03,curves=all='0/0.045 1/0.97'",
    'ws': "eq=contrast=1.06:saturation=1.00,colorbalance=rs=0.01:bs=0.01,curves=all='0/0.03 0.5/0.5 1/0.98'",
    'tutup': "eq=contrast=1.05:saturation=1.14,colorbalance=rs=0.05:gs=0.01:bs=-0.04:rm=0.04:bm=-0.03,curves=all='0/0.03 1/0.98'",
}
edl = json.load(open(sys.argv[1])); out = sys.argv[2]; only = set(map(int, sys.argv[3:]))
os.makedirs(out, exist_ok=True); os.makedirs(CACHE, exist_ok=True)
for s in edl['shots']:
    if s['clip'] == 'logo' or (only and s['id'] not in only): continue
    src = src_path(s['clip'])
    dur = round(s['v1'] - s['v0'] + 0.2, 3)  # 0,2 dtk cadangan di ujung
    vf = f"fps=30,scale=1920:1080:flags=lanczos,{GRADE[s['grade']]},vignette=angle=PI/5.5,noise=c0s=3:c0f=t,format=yuv420p"
    dst = f"{out}/shot_{s['id']:02d}.mp4"; cf = f"{CACHE}/{sig(s)}.mp4"
    if os.path.exists(cf):
        if os.path.exists(dst): os.remove(dst)
        os.link(cf, dst); print('cache', dst, flush=True); continue
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(s['src']), '-t', str(dur), '-i', src, '-an', '-vf', vf,
                    '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-g', '15', cf + '.tmp.mp4'], check=True)
    os.replace(cf + '.tmp.mp4', cf); os.link(cf, dst)
    print('ok', dst, dur, flush=True)
