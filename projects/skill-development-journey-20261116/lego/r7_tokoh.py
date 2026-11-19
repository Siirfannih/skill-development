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
ASSET_TAG = 'r7_tokoh'
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
        out = P / f'lego/cache/{ASSET_TAG}_{key}.mov'
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


def shoulder_anchors():
    """Fit a foot-wide line to the upper shoulder, excluding vertical shirt edges.

    A column may contain the tilted head above a separate shoulder. Read the
    bottom-connected torso contour, rather than the first white pixel at 520.
    """
    cached = Q / 'shoulder_anchors_fit.json'
    if cached.exists():
        return read(cached)
    result, contours, prev = [], [], {}
    cams = camera_frames()
    old = read(Q / 'before/tracking.json')
    needed = {key: set() for key in ['K_Clawd', 'K_Codex']}
    for key in IDS[:3]:
        target = 'K_Clawd' if key == 'K_Clawd0' else key
        needed[target].update(cams[a['frame']][0] for a in old[key]['frames'] if a['frame'] < 364)
    for n, m in enumerate(frames(P / 'qc/matte/wajah-matte.mkv', W, H, 'format=gray', 364)):
        bg = m[600:1000] < 180
        contour = 1000 - np.argmax(bg[::-1], axis=0)
        contour[~np.any(bg, axis=0)] = 600
        contours.append(contour)
        neck = []
        for row in [620, 640, 660]:
            xs = np.flatnonzero(m[row, 600:1350] > 180) + 600
            neck.append((xs[0], xs[-1]))
        nl, nr = np.median(neck, axis=0)
        item = {'frame': n, 'anchors': {}}
        # Keep one patch of the shoulder in each shot; a fresh best-fit search
        # every frame can hop sideways between equally flat patches.
        for key, target, half in [('K_Clawd', nl - 70, 4.4 * 16 * .75), ('K_Codex', nr + 85, 2.4 * 14)]:
            if n not in needed[key]:
                continue
            candidates = []
            for cx in range(round(target - 38), round(target + 39), 2):
                xx = np.arange(round(cx - half), round(cx + half) + 1)
                yy = contour[xx]
                if yy.min() < 670 or yy.max() > 835:
                    continue
                slope, y = np.polyfit(xx - cx, yy, 1)
                error = float(np.max(np.abs(yy - (slope * (xx - cx) + y))))
                if abs(slope) > .8:
                    continue
                score = error + abs(slope) * 18 + abs(cx - target) * .7
                score += abs(cx - prev.get(key, cx)) * .4
                candidates.append((score, cx, float(y), float(slope), error))
            if not candidates:
                raise RuntimeError(f'No upper shoulder plane: {key}, source frame {n}')
            _, x, y, slope, error = min(candidates)
            prev[key] = x
            item['anchors'][key] = dict(x=x, y=round(y + 2, 3), angle=round(math.degrees(math.atan(slope)), 3),
                                        residual=round(error, 3), span=2 * half)
        result.append(item)
    for key, half in [('K_Clawd', 4.4*16*.75), ('K_Codex', 2.4*14)]:
        raw = {a['frame']: a['anchors'][key].copy() for a in result if key in a['anchors']}
        for n, a in raw.items():
            nearby = [raw[j] for j in range(n-3, n+4) if j in raw]
            x = float(np.mean([v['x'] for v in nearby]))
            angle = float(np.mean([v['angle'] for v in nearby]))
            xx = np.arange(round(x-half), round(x+half)+1)
            yy = contours[n][xx]
            valid = (yy >= 670) & (yy <= 835)
            if np.mean(valid) < .95:
                continue
            slope = math.tan(math.radians(angle))
            y = float(np.median(yy[valid]-slope*(xx[valid]-x)))
            error = float(np.max(np.abs(yy[valid]-(slope*(xx[valid]-x)+y))))
            if error > 12:
                continue
            result[n]['anchors'][key].update(x=round(x, 3), y=round(y+2, 3), angle=round(angle, 3), residual=round(error, 3))
    write(cached, result)
    return result


def prepare_r3():
    before = Q / 'before'
    data = read(before / 'tracking.json')
    old_items = {a['id']: a for a in read(before / 'r7_override_tokoh.json')['ganti']}
    cams, anchors = camera_frames(), shoulder_anchors()
    landing = next(e['frame'] for e in read(before / 'events.json') if e['event'] == 'mendarat DECISION')
    for key in IDS[:4]:
        d = data[key]
        for a in d['frames']:
            g = a['frame']
            if g >= landing:
                continue
            if key == 'K_Gemini':
                parent = data['K_Codex']
                pa = parent['frames'][g - parent['start']]
                age = (g - parent['start']) / FPS
                sq = .1 * math.exp(-6 * ((age * 2) % 1))
                pu = parent['karakter']['u'] * pa['s']
                dx, dy = 1.72 * (1 + .6 * sq) * pu, (-9.74 * (1 - sq) + .45) * pu
                angle = pa['bahu']['sudut']
                r = math.radians(angle)
                x, y, z = pa['x'] + dx * math.cos(r) - dy * math.sin(r), pa['y'] + dx * math.sin(r) + dy * math.cos(r), pa['s']
                span = 2.6 * d['karakter']['u'] * z
                error = 0
                support = 'kepala ChatGPT'
            else:
                src, z, cx, cy = cams[g]
                anchor = anchors[src]['anchors']['K_Clawd' if key == 'K_Clawd0' else key]
                x, y = anchor['x'] * z - (z - 1) * W * cx, anchor['y'] * z - (z - 1) * H * cy
                angle, span, error = anchor['angle'], anchor['span'] * z, anchor['residual']
                if key.startswith('K_Clawd'):
                    z *= .75
                support = 'puncak bahu kiri' if key.startswith('K_Clawd') else 'puncak bahu kanan'
            a.update(x=round(x, 3), y=round(y, 3), s=round(z, 6), contact=[round(x, 3), round(y, 3)],
                     support=support, bahu={'sudut': angle, 'lebar': round(span, 3)}, residual=error)

    # Names are the timing source; exit remains visible through the end of each word.
    words = read(P / 'edit/words.json')['words']
    names = {key: next(w for w in words if w['w'] == word) for key, word in
             [('B_Codex', 'CGPT,'), ('B_Clawd', 'Claude,'), ('B_Gemini', 'Gemini,')]}
    ordered = sorted(names, key=lambda key: names[key]['s'])
    ring_start = math.ceil(next(l['t'] for l in read(before / 'lego_r7.json')['lapisan'] if l['id'] == 'T017') * FPS)
    events = [e for e in read(before / 'events.json') if e['id'].startswith('K_')]
    for key in IDS[4:]:
        d, word = data[key], names[key]
        start = math.floor(word['s'] * FPS)
        word_end = math.ceil(word['e'] * FPS)
        next_index = ordered.index(key) + 1
        next_start = math.floor(names[ordered[next_index]]['s'] * FPS) if next_index < len(ordered) else ring_start
        stop = min(word_end + 6, next_start, ring_start)
        exit_start = stop - 6
        actor = data[key.replace('B_', 'K_')]
        bp = d['bubble']
        bp.update(durasi=(stop - start + 1) / FPS, keluarAt=(exit_start - start) / FPS, keluarFrames=6)
        arr = []
        for g in range(start, stop + 1):
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
            arr.append(dict(frame=g, x=round(bx - BM, 3), y=round(by - BM, 3), s=1, support=a['support'], head=a['head']))
        d.update(start=start, frames=arr)
        events.append(dict(id=key, event='bubble pop', frame=start, t=start/FPS, peak_frame=start+5,
                           name_end_frame=word_end, leave_frame=exit_start, gone_frame=stop, leave_frames=6))

    replacements = []
    for key, d in data.items():
        arr = d['frames']
        if 'karakter' in d:
            u = d['karakter']['u']
            bounds = []
            for a in arr:
                r = math.radians(a.get('bahu', {}).get('sudut', 0))
                for dx in [-12*u-20, 12*u+20]:
                    for dy in [-18*u-60, 4*u+20]:
                        bounds.append((a['x'] + a['s']*(dx*math.cos(r)-dy*math.sin(r)),
                                       a['y'] + a['s']*(dx*math.sin(r)+dy*math.cos(r))))
            left, top = min(v[0] for v in bounds)-20, min(v[1] for v in bounds)-20
            right, bottom = max(v[0] for v in bounds)+20, max(v[1] for v in bounds)+20
        else:
            left, top = min(a['x'] for a in arr) - 24, min(a['y'] for a in arr) - 24
            right, bottom = max(a['x'] for a in arr) + d['bubble']['w'] + 24, max(a['y'] for a in arr) + d['bubble']['h'] + 24
        ox, oy = math.floor(left), math.floor(top)
        w, h = math.ceil(right) - ox, math.ceil(bottom) - oy
        if 'karakter' in d:
            old_props = read(before / f'props_{key}.json')
            ox, oy = old_items[key]['x'], old_items[key]['y']
            w, h = old_props['w'], old_props['h']
        local = [dict(x=round(a['x']-ox, 3), y=round(a['y']-oy, 3), s=a['s'],
                      **({'mask': max(0, a['mask']-ox)} if 'mask' in a else {}),
                      **({'bahu': a['bahu']} if 'bahu' in a else {})) for a in arr]
        prop = 'karakter' if 'karakter' in d else 'bubble'
        props = dict(jenis='tokoh' if prop == 'karakter' else 'bubble', w=w, h=h,
                     durasi=len(arr)/FPS, frames=local, **{prop: d[prop]})
        props[prop]['durasi'] = props['durasi']
        write(Q / f'props_{key}.json', props)
        replacements.append(dict(id=key, src=f'cache/{ASSET_TAG}_{key}.mov', t=d['start']/FPS, x=ox, y=oy))
    write(Q / 'tracking.json', data)
    write(Q / 'events.json', sorted(events, key=lambda e: e['frame']))
    write(Q / 'override_candidate.json', dict(ganti=replacements, tambah=[], buang=[]))
    print(f'prepared r3: upper shoulders, six-frame exits, no bubbles at frame {ring_start}', flush=True)


def seal_r3():
    """Keep the accepted DECISION section as the original ProRes packets."""
    old_items = {a['id']: a for a in read(Q / 'before/r7_override_tokoh.json')['ganti']}
    data = read(Q / 'tracking.json')
    for key in ['K_Clawd', 'K_Codex', 'K_Gemini']:
        d = data[key]
        count = next(i for i, a in enumerate(d['frames']) if a['support'].startswith('DECISION:'))
        out = P / f'lego/cache/{ASSET_TAG}_{key}.mov'
        head, tail = Q / f'head_{key}.mov', Q / f'tail_{key}.mov'
        run(['ffmpeg', '-v', 'error', '-i', out, '-frames:v', count, '-c:v', 'copy', '-an', '-y', head])
        run(['ffmpeg', '-v', 'error', '-ss', f'{count/FPS:.9f}', '-i', P/'lego'/old_items[key]['src'],
             '-frames:v', len(d['frames'])-count, '-c:v', 'copy', '-an', '-avoid_negative_ts', 'make_zero', '-y', tail])
        listing = Q / f'concat_{key}.txt'
        listing.write_text(f"file '{head}'\nfile '{tail}'\n")
        run(['ffmpeg', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', listing, '-c:v', 'copy', '-an', '-y', out])
        print('preserved DECISION packets', key, flush=True)


def compose_r3():
    L = read(Q / 'before/lego_r7.json')
    own = {a['id']: a for a in read(Q / 'override_candidate.json')['ganti']}
    L['lapisan'] = [own.get(a['id'], a) for a in L['lapisan'] if a['t'] < 15]
    clips, total = [], 0
    for c in L['dasar']:
        if total >= 15:
            break
        c['src'] = str((P/'lego'/c['src']).resolve())
        clips.append(c)
        total += c['dur']
    L['dasar'] = clips
    for a in L['lapisan']:
        a['src'] = str((P/'lego'/a['src']).resolve())
    if L.get('audio'):
        L['audio'] = str((P/'lego'/L['audio']).resolve())
    L['keluar'] = str(Q/'rakitan.mp4')
    write(Q/'rakitan.json', L)
    helper = Path.home()/'work/skill-development/claude/motion-graphic/scripts/lego/compose.py'
    spec = importlib.util.spec_from_file_location('lego_compose', helper)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    cmd, _ = module.build_cmd(L, str(Q), (0, 15))
    limited = [cmd[0], '-filter_complex_threads', '2']
    for arg in cmd[1:]:
        if arg == '-i':
            limited.extend(['-threads', '2'])
        limited.append(arg)
    limited[-1:-1] = ['-threads', '3']
    write(Q/'compose_command.json', limited)
    run(limited, log=Q/'compose.log')
    print('composed r3 range 0-15', flush=True)


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('step', choices=['prepare', 'render', 'compose', 'qc', 'prepare-r3', 'render-r3', 'seal-r3', 'compose-r3'])
    ap.add_argument('--only', nargs='*', choices=IDS)
    args = ap.parse_args()
    if args.step.endswith('-r3'):
        Q = Q / 'r3'
        ASSET_TAG = 'r7_tokoh_r3'
    Q.mkdir(parents=True, exist_ok=True)
    if args.step == 'prepare-r3': prepare_r3()
    elif args.step == 'seal-r3': seal_r3()
    elif args.step == 'compose-r3': compose_r3()
    elif args.step in ['render', 'render-r3']: render(args.only)
    elif args.step == 'prepare': prepare()
    elif args.step == 'compose': compose()
    else: qc()
