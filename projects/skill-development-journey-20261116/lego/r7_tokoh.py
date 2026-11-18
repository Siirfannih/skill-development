#!/usr/bin/env python3
"""Build D-458/D-459 overlays, with per-frame matte anchors and DECISION contact.

Run from the project: python3 lego/r7_tokoh.py prepare|render|compose|qc.
The source matte and camera recipe are read-only. Only this task's seven IDs
are replaced. Renders use a private bundle and three Chrome workers.
"""
import argparse
import hashlib
import importlib.util
import json
import math
from pathlib import Path
import subprocess
import sys

import numpy as np
from PIL import Image, ImageDraw

P = Path(__file__).resolve().parent.parent
Q = P / 'qc/r7/tokoh'
FPS = 30000 / 1001
W, H = 1920, 1080
IDS = ['K_Clawd0', 'K_Clawd', 'K_Codex', 'K_Gemini', 'B_Codex', 'B_Clawd', 'B_Gemini']
BM, TAIL = 56, 48


def read(p):
    return json.loads(Path(p).read_text())


def write(p, data):
    Path(p).write_text(json.dumps(data, indent=1, ensure_ascii=False) + '\n')


def run(args, *, cwd=P, log=None):
    if log:
        with Path(log).open('w') as out:
            subprocess.run([str(a) for a in args], cwd=cwd, stdout=out, stderr=subprocess.STDOUT, check=True)
    else:
        subprocess.run([str(a) for a in args], cwd=cwd, check=True)


def frames(path, width, height, vf, n):
    rd = subprocess.Popen(['ffmpeg', '-v', 'error', '-threads', '2', '-i', str(path), '-vf', vf,
                           '-frames:v', str(n), '-f', 'rawvideo', '-pix_fmt', 'gray', '-'], stdout=subprocess.PIPE)
    try:
        for i in range(n):
            buf = rd.stdout.read(width * height)
            if len(buf) != width * height:
                raise RuntimeError(f'{path}: EOF at frame {i}')
            yield np.frombuffer(buf, np.uint8).reshape(height, width)
    finally:
        rd.stdout.close()
        rd.wait()
        if rd.returncode:
            raise RuntimeError(f'ffmpeg failed: {path}')


def camera_frames():
    data = read(P / 'lego/lego_r7_kamera.json')
    result = []
    for clip in data['dasar']:
        count = round(clip['dur'] * FPS)
        cam = clip.get('kamera', {'zoom': [1, 1], 'pusat': [.5, .45]})
        for i in range(count):
            a = i / max(1, count - 1)
            curve = cam.get('kurva', 'heavy')
            k = a if curve == 'linear' else 1 - (1 - a) ** 3 if curve == 'land' else a * a * (3 - 2 * a)
            z = cam['zoom'][0] + (cam['zoom'][1] - cam['zoom'][0]) * k
            result.append((round(clip['in'] * FPS) + i, z, *cam['pusat']))
    return result


def source_anchors():
    cached = Q / 'matte_anchors_feet.json'
    if cached.exists():
        return read(cached)
    result = []
    for n, m in enumerate(frames(P / 'qc/matte/wajah-matte.mkv', W, H, 'format=gray', 420)):
        edges = []
        for row in [280, 340, 400, 460]:
            xs = np.flatnonzero(m[row, 520:1400] > 180) + 520
            if len(xs) > 110:
                edges.append((xs[0], xs[-1]))
        if not edges:
            raise RuntimeError(f'No head at {n}')
        left, right = np.median(edges, axis=0)
        shoulder_xs = {'K_Clawd': left - 125, 'K_Codex': right + 135, 'K_Gemini': right + 255}
        feet = {'K_Clawd': 3.8 * 16, 'K_Codex': -1.376 * 14, 'K_Gemini': 0}
        r = {'frame': n, 'head': [float(left), float(right)], 'anchors': {}}
        for key, x in shoulder_xs.items():
            xi = round(x + feet[key])
            # The lower of the local contour peaks avoids a hand in front of the shoulder.
            tops = []
            for col in range(xi - 5, xi + 6):
                ys = np.flatnonzero(m[520:1040, col] > 200) + 520
                if len(ys):
                    tops.append(int(ys[0]))
            if not tops:
                candidates = np.flatnonzero(np.any(m[650:1000] > 200, axis=0))
                candidates = candidates[candidates > right + 50] if key != 'K_Clawd' else candidates[candidates < left - 50]
                if not len(candidates):
                    raise RuntimeError(f'No shoulder support: {key} frame {n}')
                xi = int(candidates[np.argmin(abs(candidates - x))])
                x = float(xi - feet[key])
                tops = [int(np.flatnonzero(m[520:1040, xi] > 200)[0]) + 520]
            y = int(np.median(tops))
            r['anchors'][key] = [round(float(x), 2), y]
        result.append(r)
    write(cached, result)
    return result


def prepare():
    Q.mkdir(parents=True, exist_ok=True)
    layers = {x['id']: x for x in read(P / 'lego/lego_r6.json')['lapisan']}
    originals = {x['id']: x for x in read(P / 'lego/lapisan.json')}
    cams, source = camera_frames(), source_anchors()
    slab = layers['T019']
    slab_path = P / 'lego' / slab['src']
    alpha = list(frames(slab_path, 840, 282, 'alphaextract', 52))
    # Target the wide, horizontal crowns of D, O, N, rather than a gap between glyphs.
    slab_x = {'K_Clawd': 590, 'K_Codex': 1190, 'K_Gemini': 1325}
    slab_on = math.ceil(slab['t'] * FPS)
    landing = slab_on + 3
    end = slab_on + 52
    data, events = {}, []
    for key in IDS[:4]:
        old = layers[key]
        start = 0 if key == 'K_Clawd0' else round(originals[key]['t'] * FPS)
        stop = round(layers['D_REPO']['t'] * FPS) if key == 'K_Clawd0' else end
        stem = 'K_Clawd' if key == 'K_Clawd0' else key
        kp = originals[key]['props'].copy()
        kp.update(ancre=True, mendarat=[0, (landing - start) / FPS], kamar=False, lantai=False,
                  lompat=[], kaget=[], denyut=[], lambai=[])
        kp['tumpuX'] = 3.8 if stem == 'K_Clawd' else -1.376 if stem == 'K_Codex' else 0
        kp.pop('rev', None)
        if key == 'K_Gemini':
            kp.update(u=9, emosi=[[0, 'neutral']], sudut=[[0, -.125]])
        elif key == 'K_Codex':
            kp.update(emosi=[[0, 'happy']], sudut=[[0, -.125]])
        elif key == 'K_Clawd':
            kp.update(emosi=[[0, 'neutral'], [(layers['B_Clawd']['t'] - start / FPS), 'bored']],
                      sudut=[[0, .125], [(landing - start) / FPS, .125]])
        else:
            kp.update(emosi=[[0, 'neutral']], sudut=[[0, .125]])
        arr = []
        for g in range(start, stop):
            src, z, cx, cy = cams[g]
            sr = source[src]
            x, y = sr['anchors'][stem]
            x, y = x * z - (z - 1) * W * cx, y * z - (z - 1) * H * cy
            hl, hr = [v * z - (z - 1) * W * cx for v in sr['head']]
            support = 'bahu kiri' if stem == 'K_Clawd' else 'bahu kanan'
            mask = None
            if key == 'K_Gemini' and g < landing:
                parent = data['K_Codex']
                a = parent['frames'][g - parent['start']]
                age = (g - parent['start']) / FPS
                sq = 0.1 * math.exp(-6 * ((age * 2) % 1))
                sx, sy = 1 + 0.6 * sq, 1 - sq
                pu = parent['karakter']['u'] * a['s']
                # Crown of the cloud's left hump after its mirrored three-quarter rig.
                x = a['x'] + (-1.376 + 3.096 * sx) * pu
                y = a['y'] - 9.74 * sy * pu
                z = a['s']
                support = 'kepala ChatGPT'
            if g >= landing and key != 'K_Clawd0':
                # The half-frame T019 PTS is rounded by ffmpeg's overlay clock.
                j = min(51, g - slab_on + 1)
                tx = slab_x[stem]
                col = round(tx + kp['tumpuX'] * kp['u'] - slab['x'])
                if j >= 46:
                    mask = slab['x'] + min(1, (j - 46 + 1) / 5) * 840 - 5
                    if stem == 'K_Codex' and mask > tx + kp['tumpuX'] * kp['u']:
                        age = (g - start) / FPS
                        sx = 1 + 0.06 * math.exp(-6 * ((age * 2) % 1))
                        col = round(tx + (-1.376 + 3.44 * sx) * kp['u'] - slab['x'])
                    if mask > col + slab['x'] or j >= 50:
                        mask = W + 500
                ys = np.flatnonzero(alpha[j][:, col] > 180)
                # The exit wipes an entire vertical slice; removed actors are clipped on the same frame.
                if len(ys):
                    y = slab['y'] + float(ys[0]) + 1
                else:
                    y = arr[-1]['y']
                x, z = tx, 1
                support = 'DECISION:' + {'K_Clawd': 'D', 'K_Codex': 'O', 'K_Gemini': 'N'}[stem]
            r = dict(frame=g, x=round(x, 3), y=round(y, 3), s=round(z, 6), support=support,
                     head=[round(hl, 2), round(hr, 2)], contact=[round(x + kp['tumpuX'] * kp['u'] * z, 3), round(y, 3)])
            if support.startswith('DECISION:'):
                r['contact'][0] = slab['x'] + col
            if mask is not None:
                r['mask'] = round(mask, 2)
            arr.append(r)
        data[key] = dict(start=start, frames=arr, karakter=kp)
        if key != 'K_Clawd0':
            events.append(dict(id=key, event='mendarat DECISION', frame=landing, t=landing / FPS,
                               squash_peak_frame=landing + 1, support=arr[landing - start]['support']))
    bubble_spec = {
        'B_Codex': dict(bw=350, bh=226, size=56, ekor='kiri', baris=[[{'t': 'Hi! Aku'}], [{'t': 'nemenin'}], [{'t': 'Claude.', 'warna': '#2E5BFF'}]]),
        'B_Clawd': dict(bw=370, bh=164, size=56, ekor='bawah', baris=[[{'t': 'Aku yang'}], [{'t': 'ngedit', 'warna': '#2E5BFF'}, {'t': ' loh.'}]]),
        'B_Gemini': dict(bw=128, bh=100, size=56, ekor='bawah', baris=[[{'t': '…'}]], mengetik=True),
    }
    for key, bp in bubble_spec.items():
        start = math.ceil(layers[key]['t'] * FPS)
        stop = slab_on - 1
        duration = (stop - start) / FPS
        bp.update(w=bp['bw'] + BM * 2, h=bp['bh'] + BM * 2 + (TAIL if bp['ekor'] == 'bawah' else 0),
                  durasi=duration, sortir='r7', keluarAt=duration - 4 / FPS)
        bp.pop('sortir')
        actor_key = key.replace('B_', 'K_')
        actor = data[actor_key]
        arr = []
        for g in range(start, stop):
            a = actor['frames'][g - actor['start']]
            x, y, z = a['x'], a['y'], a['s']
            u = actor['karakter']['u'] * z
            if key == 'B_Clawd':
                bx = min(x - (bp['bw'] - 54), a['head'][0] - 30 - bp['bw'])
                by = y - 8.2 * u - bp['bh'] - TAIL - 8
            elif key == 'B_Codex':
                bx = min(W - 80 - bp['bw'], max(a['head'][1] + 55, x + 90))
                by = y - 9.5 * u - bp['bh'] + 30
            else:
                bx = max(a['head'][1] + 30, x - (bp['bw'] - 54))
                by = y - 17.15 * u - bp['bh'] - TAIL - 8
            arr.append(dict(frame=g, x=round(bx - BM, 3), y=round(by - BM, 3), s=1,
                            support=a['support'], head=a['head']))
        data[key] = dict(start=start, frames=arr, bubble=bp)
        events.append(dict(id=key, event='bubble pop', frame=start, t=start / FPS,
                           peak_frame=start + 5, peak_t=(start + 5) / FPS, settle_frame=start + 8))
    replacements = []
    for key, d in data.items():
        arr = d['frames']
        if 'karakter' in d:
            u = d['karakter']['u']
            # Include the complete SVG and its filters; the contact point is the pivot.
            left = min(a['x'] - 12 * u * a['s'] - 20 for a in arr)
            top = min(a['y'] - (18 * u + 40) * a['s'] - 20 for a in arr)
            right = max(a['x'] + 12 * u * a['s'] + 20 for a in arr)
            bottom = max(a['y'] + 4 * u * a['s'] + 20 for a in arr)
        else:
            left, top = min(a['x'] for a in arr) - 24, min(a['y'] for a in arr) - 24
            right, bottom = max(a['x'] for a in arr) + d['bubble']['w'] + 24, max(a['y'] for a in arr) + d['bubble']['h'] + 24
        ox, oy = math.floor(left), math.floor(top)
        w, h = math.ceil(right) - ox, math.ceil(bottom) - oy
        local = [dict(x=round(a['x'] - ox, 3), y=round(a['y'] - oy, 3), s=a['s'],
                      **({'mask': max(0, a['mask'] - ox)} if 'mask' in a else {})) for a in arr]
        props = dict(jenis='tokoh' if 'karakter' in d else 'bubble', w=w, h=h, durasi=len(arr) / FPS, frames=local)
        prop = 'karakter' if 'karakter' in d else 'bubble'
        props[prop] = d[prop]
        props[prop]['durasi'] = props['durasi']
        write(Q / f'props_{key}.json', props)
        replacements.append(dict(id=key, src=f'cache/r7_tokoh_{key}.mov', t=d['start'] / FPS, x=ox, y=oy))
    write(Q / 'tracking.json', data)
    write(Q / 'events.json', sorted(events, key=lambda e: e['frame']))
    write(P / 'lego/r7_override_tokoh.json', dict(ganti=replacements, tambah=[], buang=[]))
    write(Q / 'provenance.json', {str(x.relative_to(P)): hashlib.sha256(x.read_bytes()).hexdigest() for x in [P / 'lego/lego_r7_kamera.json', P / 'lego/lego_r6.json', slab_path]})
    print(f'prepared {len(replacements)} layers; landing global frame {landing}, {landing / FPS:.6f}s', flush=True)


def render(only):
    bundle = Q / 'bundle'
    run(['npx', 'remotion', 'bundle', 'src/video/index.ts', '--out-dir', bundle, '--log=error'], cwd=P / 'remotion', log=Q / 'bundle.log')
    for key in only or IDS:
        out = P / f'lego/cache/r7_tokoh_{key}.mov'
        run(['npx', 'remotion', 'render', bundle, 'R7Tokoh', out, '--props', Q / f'props_{key}.json',
             '--codec=prores', '--prores-profile=4444', '--pixel-format=yuva444p10le', '--image-format=png',
             '--concurrency=3', '--log=error'], cwd=P / 'remotion', log=Q / f'render_{key}.log')
        print('rendered', key, flush=True)


def compose():
    try:
        run(['python3', 'r7_gabung.py'], cwd=P / 'lego', log=Q / 'gabung.log')
        L = read(P / 'lego/lego_r7.json')
        write(Q / 'assembly_scope.json', {'basis': 'all ready r7 overrides'})
    except subprocess.CalledProcessError:
        L = read(P / 'lego/lego_r6.json')
        L['dasar'] = read(P / 'lego/lego_r7_kamera.json')['dasar']
        own = {x['id']: x for x in read(P / 'lego/r7_override_tokoh.json')['ganti']}
        L['lapisan'] = [own.get(layer['id'], layer) for layer in L['lapisan']]
        write(Q / 'assembly_scope.json', {'basis': 'r6 + kamera r7 + tokoh', 'reason': (Q / 'gabung.log').read_text()})
    L['lapisan'] = [layer for layer in L['lapisan'] if layer['t'] < 15]
    # Own output and private recipe avoid other workers overwriting this QC range.
    for c in L['dasar']:
        c['src'] = str((P / 'lego' / c['src']).resolve())
    for layer in L['lapisan']:
        layer['src'] = str((P / 'lego' / layer['src']).resolve())
    if L.get('audio'):
        L['audio'] = str((P / 'lego' / L['audio']).resolve())
    L['keluar'] = str(Q / 'rakitan.mp4')
    write(Q / 'rakitan.json', L)
    helper = Path.home() / 'work/skill-development/claude/motion-graphic/scripts/lego/compose.py'
    run(['python3', helper, Q / 'rakitan.json', '--cek'], log=Q / 'compose_validate.log')
    spec = importlib.util.spec_from_file_location('lego_compose', helper)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    cmd, _ = module.build_cmd(L, str(Q), (0, 15))
    # Bound decoder and filter threads on the shared render machine.
    limited = [cmd[0], '-filter_complex_threads', '2']
    for arg in cmd[1:]:
        if arg == '-i':
            limited.extend(['-threads', '2'])
        limited.append(arg)
    limited[-1:-1] = ['-threads', '3']
    write(Q / 'compose_command.json', limited)
    run(limited, log=Q / 'compose.log')
    print('composed qc/r7/tokoh/rakitan_0-15.mp4', flush=True)


def qc():
    clip = Q / 'rakitan_0-15.mp4'
    folder = Q / 'frames_6fps'
    folder.mkdir(exist_ok=True)
    run(['ffmpeg', '-v', 'error', '-i', clip, '-vf', 'fps=6', '-y', folder / '%03d.jpg'])
    files = sorted(folder.glob('*.jpg'))
    for page in range(math.ceil(len(files) / 30)):
        canvas = Image.new('RGB', (1920, 6 * 238), '#111111')
        draw = ImageDraw.Draw(canvas)
        for i, path in enumerate(files[page * 30:(page + 1) * 30]):
            im = Image.open(path).resize((384, 216))
            x, y = (i % 5) * 384, (i // 5) * 238
            canvas.paste(im, (x, y + 22))
            draw.text((x + 8, y + 4), f'{(page * 30 + i) / 6:.3f}s', fill='white')
        canvas.save(Q / f'lembar_6fps_{page + 1}.jpg', quality=94)
    for t in [.5, 4.8, 8.9, 9.7, 10.5, 12.2, 12.8, 13.5]:
        run(['ffmpeg', '-v', 'error', '-ss', str(t), '-i', clip, '-frames:v', '1', '-y', Q / f'still_{t:04.1f}.png'])
    print(f'QC: {len(files)} frames at 6fps; eight full-size stills', flush=True)


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('step', choices=['prepare', 'render', 'compose', 'qc'])
    ap.add_argument('--only', nargs='*', choices=IDS)
    args = ap.parse_args()
    Q.mkdir(parents=True, exist_ok=True)
    if args.step == 'prepare': prepare()
    elif args.step == 'render': render(args.only)
    elif args.step == 'compose': compose()
    else: qc()
