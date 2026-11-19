#!/usr/bin/env python3
"""Build the R7 UI layers independently of the R5 scenes and other workers' overrides.

Run from any directory: python3 lego/r7_ui.py prepare|render|assemble|stills|check|all|r3.
B2 revision: b2_prepare, b2_render, b2_assemble (repo, cards, desk only).
B2 R2 revision: b2_r2 (card contents only).
R4 sources and full-frame PSNR proofs stay frozen in qc/r7/ui/r4_proof.json.
"""
import argparse
import copy
import hashlib
import importlib.util
import json
import math
import os
from pathlib import Path
import re
import subprocess
import sys

P = Path(__file__).resolve().parents[1]
Q = P / 'qc/r7/ui'
CACHE = P / 'lego/cache'
SKILL = Path.home() / 'work/skill-development/claude/motion-graphic'
RANGES = [('repo', 1.3, 4.6), ('app', 23.4, 36.6), ('kartu', 45., 54.), ('blender', 72., 76.5)]
ALL_RANGES = tuple(RANGES)
JOBS = []


def read(p):
    return json.loads(Path(p).read_text())


def write(p, value):
    Path(p).write_text(json.dumps(value, indent=2) + '\n')


def run(args, log=None, cwd=P):
    if log:
        with open(log, 'w') as f:
            subprocess.run([str(x) for x in args], cwd=cwd, stdout=f, stderr=subprocess.STDOUT, check=True)
    else:
        subprocess.run([str(x) for x in args], cwd=cwd, check=True)


def probe(src):
    return read_probe(src)['format']['duration']


def read_probe(src):
    return json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_format', '-show_streams', '-of', 'json', str(src)]))


def prepare():
    global JOBS
    proof = read(Q / 'r4_proof.json')
    assert min(proof['repo']['psnr'], proof['app']['psnr']) >= 45
    for f, sha in proof['sources'].items():
        assert hashlib.sha256((P / f).read_bytes()).hexdigest() == sha, f'R4 basis changed: {f}'
    sys.path.insert(0, str(P / 'lego'))
    import waktu as W
    basis = read(P / 'lego/lego_r6.json')
    layers = {x['id']: x for x in basis['lapisan']}
    blocks = {x['id']: x for x in read(P / 'teks.json')}
    fps = basis['fps']

    def cue(i):
        b = blocks[i]
        units = W.U[b['kata'][0]:b['kata'][1] + 1]
        texts = b.get('teks_vis', b['teks']).split()
        if i == 'T081':
            units = [x for x in units if W.nrm(x['w']) != 'pakai']
        if len(texts) != len(units):
            raise ValueError((i, texts, units))
        words = [{'text': s, 'on': round(w['s'] + 2 / 30, 6), 'off': round(w['e'] + 2 / 30, 6)} for s, w in zip(texts, units)]
        end = round(max(b['t'] + b['dur'], words[-1]['off']), 6)
        if i == 'T083':
            end = min(end, layers['D_IG']['t'] - .1)
        return {'id': i, 'start': words[0]['on'], 'end': end, 'words': words}

    cams = []
    start = 0
    for c in read(P / 'lego/lego_r7_kamera.json')['dasar']:
        if c.get('kamera'):
            cams.append({'start': start, 'end': start + c['dur'], 'zoom': c['kamera']['zoom'], 'center': c['kamera']['pusat']})
        start += c['dur']

    jobs, replace, add, remove = [], [], [], []

    def job(name, comp, props, layer, opaque=False):
        props['durasi'] = math.ceil(props['durasi'] * 30) / 30
        props_file = Q / (name + '_props.json')
        write(props_file, props)
        out_name = name + '_r3' if name in ('kartu1', 'kartu2', 'blender') else name
        out = CACHE / ('r7_ui_' + out_name + ('.mp4' if opaque else '.mov'))
        layer = dict(layer, src='cache/' + out.name)
        jobs.append({'name': name, 'comp': comp, 'props': str(props_file), 'out': str(out), 'opaque': opaque})
        return layer

    for id_, comp, ids in [('D_REPO', 'DuniaRepoUI', ['T003', 'T004', 'T005']),
                           ('D_APP', 'AppClaudeUI', [f'T{i:03d}' for i in range(39, 48)])]:
        props = read(Q / (id_ + '_r4_props.json'))
        props.update(t0=layers[id_]['t'], cues=[cue(i) for i in ids])
        if id_ == 'D_REPO':
            props['cues'][0]['start'] = 53 / fps
        replace.append(job(id_.lower(), comp, props, dict(layers[id_]), True))
        remove.extend(ids)

    c3 = cue('T003')
    intro_start = c3['start']
    intro_end = 53 / fps
    intro = dict(c3, end=intro_end)
    add.append(job('intro', 'SurfaceTextUI', {'durasi': intro_end - intro_start, 't0': intro_start,
        'cues': [intro], 'kind': 'intro', 'camera': cams},
        {'id': 'UI_REPO_INTRO', 't': intro_start, 'x': 0, 'y': 0}))

    face_cues = [cue('T048'), cue('T049')]
    start, end = face_cues[0]['start'], face_cues[-1]['end']
    replace.append(job('face_exit', 'SurfaceTextUI', {'durasi': end - start, 't0': start, 'kind': 'face',
        'cues': face_cues, 'camera': cams}, {'id': 'T048', 't': start, 'x': 0, 'y': 0}))
    remove.append('T049')

    c65, c66, c68 = cue('T065'), cue('T066'), cue('T068')
    for id_, model, label, number, name_cue, extra in [('KARTU1', 'chatgpt', 'ChatGPT Pro', 20, c65, c66),
        ('KARTU2', 'claude', 'Claude Pro', 5, dict(c68, start=c68['end'], words=c68['words'][1:]), None)]:
        original = layers[id_]
        # T068 is explicitly owned by the face task; its spoken name hands off to this UI tag.
        start = original['t'] if model == 'claude' else name_cue['start']
        end = original['t'] + float(probe(P / 'lego' / original['src']))
        name_cue = dict(name_cue, end=end)
        number_block = blocks['T070' if model == 'claude' else 'T067']
        number_onset = round(W.U[number_block['kata'][0]]['s'] + 2 / 30, 6)
        props = {'durasi': end - start, 'w': 640, 'h': 720 if model == 'chatgpt' else 580, 't0': start, 'numberT0': number_onset, 'model': model,
            'label': label, 'angka': number, 'terbang': .45, 'jarak': 900, 'kanan': model == 'chatgpt', 'cue': name_cue}
        if extra:
            props['extra'] = extra
        layer = dict(original, t=start)
        g = copy.deepcopy(layer['gerak'])
        # Names arrive on their cards; preserve the original final positions and exit times.
        for axis in ('x', 'y'):
            for pair in g[axis]:
                if pair[0] > .65:
                    pair[0] = round(pair[0] + original['t'] - start, 6)
        layer['gerak'] = g
        replace.append(job(id_.lower(), 'KartuUI', props, layer))
    remove.extend(['T065', 'T066'])

    blender_cues = [cue(i) for i in ['T080', 'T081', 'T082', 'T083']]
    blender_cues[-1]['end'] = min(blender_cues[-1]['end'], layers['D_IG']['t'])
    start, end = blender_cues[0]['start'], layers['D_IG']['t']
    blender_timing = read('/mnt/storage-projects/skill-dev-journey/b10a/timing.json')
    blender_end = layers['b10a_meja3d']['t'] + (blender_timing['frames'] - 1) / blender_timing['fps']
    replace.append(job('blender', 'SurfaceTextUI', {'durasi': end - start, 't0': start,
        'kind': 'blender', 'cues': blender_cues, 'slab': {'x': 220, 'y': 334, 'size': 222, 'scaleX': .846},
        'blender': {'start': layers['b10a_meja3d']['t'], 'end': blender_end}},
        {'id': 'T080', 't': start, 'x': 0, 'y': 0}))
    remove.extend(['T081', 'T082', 'T083'])
    write(P / 'lego/r7_override_ui.json', {'ganti': replace, 'tambah': add, 'buang': remove})
    write(Q / 'jobs.json', jobs)
    write(Q / 'cue_timing.json', [cue(i) for i in ['T003', 'T004', 'T005'] + [f'T{i:03d}' for i in range(39, 50)] +
        ['T065', 'T066', 'T067', 'T068', 'T070', 'T080', 'T081', 'T082', 'T083'] if i not in ['T067', 'T070']])
    print(f'{len(jobs)} UI layers prepared', flush=True)


def render():
    for job in read(Q / 'jobs.json'):
        cmd = ['npx', 'remotion', 'render', 'src/video/index.ts', job['comp'], job['out'],
            '--props=' + job['props'], '--concurrency=3', '--image-format=png']
        cmd += ['--codec=h264', '--crf=14'] if job['opaque'] else ['--codec=prores', '--prores-profile=4444', '--pixel-format=yuva444p10le']
        print('Render', job['name'], flush=True)
        run(cmd, Q / ('render_' + job['name'] + '.log'), P / 'remotion')
        if job['opaque']:
            strip_audio(Path(job['out']))


def r3():
    q = Q / 'r3'
    q.mkdir(parents=True, exist_ok=True)
    outputs = {}
    for name, comp, id_ in [('kartu1', 'KartuUI', 'KARTU1'), ('kartu2', 'KartuUI', 'KARTU2'),
                             ('blender', 'SurfaceTextUI', 'T080')]:
        props = read(Q / (name + '_props.json'))
        if name == 'kartu1':
            props['h'] = 680
        props_file = q / (name + '_props.json')
        write(props_file, props)
        out = CACHE / ('r7_ui_' + name + '_r3.mov')
        print('Render R3', name, flush=True)
        run(['npx', 'remotion', 'render', 'src/video/index.ts', comp, out,
             '--props=' + str(props_file), '--concurrency=3', '--image-format=png',
             '--codec=prores', '--prores-profile=4444', '--pixel-format=yuva444p10le'],
            q / ('render_' + name + '.log'), P / 'remotion')
        outputs[id_] = 'cache/' + out.name
    override = read(P / 'lego/r7_override_ui.json')
    for layer in override['ganti']:
        if layer['id'] in outputs:
            layer['src'] = outputs[layer['id']]
    write(P / 'lego/r7_override_ui.json', override)
    write(q / 'override_after.json', override)
    print('R3 layers rendered and UI override updated', flush=True)


def strip_audio(src):
    tmp = src.with_name(src.stem + '_an' + src.suffix)
    run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-map', '0:v:0', '-c:v', 'copy', '-an', tmp])
    tmp.replace(src)


def b2_prepare():
    """D-476/484: prepare only the repo and desk, preserving the other UI jobs."""
    q = Q / 'b2'
    q.mkdir(parents=True, exist_ok=True)
    before = q / 'before-source/lego/r7_override_ui.json'
    if not before.exists():
        before.parent.mkdir(parents=True, exist_ok=True)
        write(before, read(P / 'lego/r7_override_ui.json'))
    jobs = []
    for name, comp, opaque in [('repo', 'DuniaRepoUI', True), ('blender', 'SurfaceTextUI', False)]:
        props = read(Q / ('d_repo_props.json' if name == 'repo' else 'blender_props.json'))
        if name == 'repo':
            props['cues'][0]['start'] = props['t0']
            props['cues'][0]['words'][0]['on'] = props['t0']
        props_file = q / f'{name}_props.json'
        write(props_file, props)
        out = q / ('r7b2_ui_' + name + ('.mp4' if opaque else '.mov'))
        jobs.append({'name': name, 'comp': comp, 'props': str(props_file), 'out': str(out), 'opaque': opaque})
    write(q / 'jobs.json', jobs)
    print('B2 prepared: repo + blender only')


def b2_render(only=None):
    q = Q / 'b2'
    shared = P / 'remotion/src/video/bersama/kt83/gelombang.ts'
    wave_hash = hashlib.sha256(shared.read_bytes()).hexdigest()
    if only:
        assert read(q / 'render_dependencies.json')[str(shared.relative_to(P))] == wave_hash
    for job in read(q / 'jobs.json'):
        if only and job['name'] not in only:
            continue
        cmd = ['npx', 'remotion', 'render', 'src/video/index.ts', job['comp'], job['out'],
               '--props=' + job['props'], '--concurrency=3', '--image-format=png']
        cmd += ['--codec=h264', '--crf=14'] if job['opaque'] else [
            '--codec=prores', '--prores-profile=4444', '--pixel-format=yuva444p10le']
        run(cmd, q / ('render_' + job['name'] + '.log'), P / 'remotion')
        assert hashlib.sha256(shared.read_bytes()).hexdigest() == wave_hash, 'Shared wave changed; rerun b2_render'
        strip_audio(Path(job['out']))
        link = CACHE / Path(job['out']).name
        if link.is_symlink():
            assert link.resolve() == Path(job['out']).resolve()
        elif not link.exists():
            link.symlink_to(Path(job['out']).resolve())
        else:
            raise FileExistsError(link)
    # Keep the existing word over the face, ending when the opaque repo begins.
    before = read(q / 'before-source/lego/r7_override_ui.json')
    intro = next(x for x in before['tambah'] if x['id'] == 'UI_REPO_INTRO')
    repo = next(x for x in before['ganti'] if x['id'] == 'D_REPO')
    frames = math.ceil((repo['t'] - intro['t']) * 30)
    out = q / 'r7b2_ui_intro.mov'
    run(['ffmpeg', '-v', 'error', '-y', '-i', P / 'lego' / intro['src'],
         '-map', '0:v:0', '-frames:v', frames, '-c:v', 'copy', '-an', out], q / 'trim_intro.log')
    link = CACHE / out.name
    if not link.exists():
        link.symlink_to(out.resolve())
    override = read(P / 'lego/r7_override_ui.json')
    sources = {'D_REPO': 'cache/r7b2_ui_repo.mp4', 'T080': 'cache/r7b2_ui_blender.mov'}
    for layer in override['ganti']:
        if layer['id'] in sources:
            layer['src'] = sources[layer['id']]
    for layer in override['tambah']:
        if layer['id'] == 'UI_REPO_INTRO':
            layer['src'] = 'cache/r7b2_ui_intro.mov'
    b2_app_owner(override)
    write(P / 'lego/r7_override_ui.json', override)
    write(q / 'override_after.json', override)
    write(q / 'render_dependencies.json', {str(shared.relative_to(P)): wave_hash})
    print('B2 active: D_REPO, T080, UI_REPO_INTRO; cards preserved, legacy app released to its owner')


def b2_blender():
    b2_render({'blender'})


def b2_r2():
    """D-485: refill the two cards and remove the T066 narrative container."""
    q = Q / 'b2-r2'
    q.mkdir(parents=True, exist_ok=True)
    sys.path.insert(0, str(P / 'lego'))
    import waktu as W
    blocks = {b['id']: b for b in read(P / 'teks.json')}
    before = read(P / 'lego/r7_override_ui.json')
    if not (q / 'override_before.json').exists():
        write(q / 'override_before.json', before)
    run([sys.executable, 'r7_gabung.py'], q / 'r7_gabung_before.log', P / 'lego')
    assembled = {x['id']: x for x in read(P / 'lego/lego_r7.json')['lapisan']}
    sources = {}
    for name, id_, cue_id in [('kartu1', 'KARTU1', 'T067'), ('kartu2', 'KARTU2', 'T070')]:
        props = read(Q / 'r3' / (name + '_props.json'))
        layer = next(x for x in before['ganti'] if x['id'] == id_)
        assert props['t0'] == layer['t'], (name, props['t0'], layer['t'])
        props['t0'] = assembled[id_]['t']
        props['numberT0'] = round(W.U[blocks[cue_id]['kata'][0]]['s'] + 2 / 30, 6)
        if name == 'kartu1':
            props['h'] = 720
        props_file = q / (name + '_props.json')
        write(props_file, props)
        out = q / ('r7b2_ui_' + name + '_r2.mov')
        rendering = out.with_name(out.stem + '_rendering.mov')
        print('Render B2 R2', name, flush=True)
        run(['npx', 'remotion', 'render', 'src/video/index.ts', 'KartuUI', rendering,
             '--props=' + str(props_file), '--concurrency=3', '--image-format=png',
             '--codec=prores', '--prores-profile=4444', '--pixel-format=yuva444p10le'],
            q / ('render_' + name + '.log'), P / 'remotion')
        strip_audio(rendering)
        rendering.replace(out)
        link = CACHE / out.name
        if link.is_symlink():
            assert link.resolve() == out.resolve()
        elif not link.exists():
            link.symlink_to(out.resolve())
        else:
            raise FileExistsError(link)
        sources[id_] = 'cache/' + out.name
    override = read(P / 'lego/r7_override_ui.json')
    for layer in override['ganti']:
        if layer['id'] in sources:
            assert layer == next(x for x in before['ganti'] if x['id'] == layer['id'])
            layer['src'] = sources[layer['id']]
    write(P / 'lego/r7_override_ui.json', override)
    write(q / 'override_after.json', override)
    print('B2 R2 active: KARTU1/KARTU2 sources only; placement and motion preserved')


def b2_app_owner(override):
    """D-479/484: release the legacy app entries when its new owner is present."""
    if (P / 'lego/r7_override_claudekaca.json').exists():
        override['ganti'] = [x for x in override['ganti'] if x['id'] not in {'D_APP', 'T048'}]
        app_text = {f'T{i:03d}' for i in range(39, 50)}
        override['buang'] = [i for i in override['buang'] if i not in app_text]


def b2_assemble():
    global Q, RANGES
    override = read(P / 'lego/r7_override_ui.json')
    b2_app_owner(override)
    write(P / 'lego/r7_override_ui.json', override)
    write(Q / 'b2/override_after.json', override)
    Q = Q / 'b2'
    RANGES = [('repo', 1.2, 4.6), ('kartu', 47., 53.8), ('blender', 72., 76.5)]
    assemble()


def recipe():
    run([sys.executable, 'r7_gabung.py'], Q / 'r7_gabung.log', P / 'lego')
    L = read(P / 'lego/lego_r7.json')
    write(Q / 'override_hashes.json', {f.name: hashlib.sha256(f.read_bytes()).hexdigest()
        for f in sorted((P / 'lego').glob('r7_override_*.json'))})
    return L


def assemble():
    L = recipe()
    write(Q / 'recipe_snapshot.json', L)
    spec = importlib.util.spec_from_file_location('compose', SKILL / 'scripts/lego/compose.py')
    compose = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(compose)
    fps = L['fps']
    for name, a, b in RANGES:
        # Trim inputs before compose so a 4-second check does not decode 76 seconds of all layers.
        first, last = round(a * fps), round(b * fps)
        A, B = first / fps, last / fps
        local = dict(L, dasar=[], lapisan=[], audio=None, keluar=str(Q / f'{name}.mp4'), crf=14)
        n = 0
        for clip in L['dasar']:
            count = round(clip['dur'] * fps)
            lo, hi = max(first, n), min(last, n + count)
            if hi > lo:
                c = copy.deepcopy(clip)
                c['src'] = str((P / 'lego' / c['src']).resolve())
                c['in'] += (lo - n) / fps
                c['dur'] = (hi - lo) / fps
                if c.get('kamera'):
                    z0, z1 = c['kamera']['zoom']
                    def z(frame):
                        t = (frame - n) / max(1, count - 1)
                        if c['kamera'].get('kurva') != 'linear':
                            t = 1 - (1 - t)**3 if c['kamera']['kurva'] == 'land' else t*t*(3 - 2*t)
                        return z0 + (z1 - z0) * t
                    c['kamera']['zoom'] = [z(lo), z(hi - 1)]
                    c['kamera']['kurva'] = 'linear'
                local['dasar'].append(c)
            n += count
        for layer in L['lapisan']:
            if layer['t'] >= B:
                continue
            src = (P / 'lego' / layer['src']).resolve()
            duration = float(probe(src))
            if layer['t'] >= B or layer['t'] + duration <= A:
                continue
            y = copy.deepcopy(layer)
            trim = max(0, A - layer['t'])
            if trim:
                dst = Q / f'{name}_{layer["id"]}_trim.nut'
                run(['ffmpeg', '-v', 'error', '-y', '-ss', trim, '-i', src, '-t', B-A,
                     '-an', '-c:v', 'ffv1', '-pix_fmt', 'bgra', dst], Q / f'trim_{name}_{layer["id"]}.log')
                y['src'] = str(dst)
                if y.get('gerak'):
                    for axis, points in y['gerak'].items():
                        y['gerak'][axis] = [[t-trim, v] for t,v in points]
            else:
                y['src'] = str(src)
            y['t'] = max(0, layer['t'] - A)
            local['lapisan'].append(y)
        write(Q / f'{name}_recipe.json', local)
        cmd, _ = compose.build_cmd(local, str(P / 'lego'))
        # These checks run alongside other editors, so constrain ffmpeg's thread use.
        cmd[1:1] = ['-threads', '3', '-filter_complex_threads', '2']
        cmd[-1:-1] = ['-t', str(B-A)]
        print('Assemble', name, a, b, flush=True)
        run(cmd, Q / f'assemble_{name}.log')
        write(Q / f'{name}_range.json', {'start': A, 'end': B, 'requested': [a,b], 'frames': last-first})


def stills():
    from PIL import Image, ImageDraw
    for name, a, b in ALL_RANGES:
        d = read(Q / f'{name}_range.json')
        count = math.ceil((b-a)*2)
        tiles = []
        for i in range(count):
            t = i / 2
            out = Q / f'{name}_{a+t:.2f}.jpg'
            run(['ffmpeg', '-v', 'error', '-y', '-ss', t, '-i', Q / f'{name}.mp4', '-frames:v', '1', out])
            if out.exists():
                tiles.append((a+t, out))
        w, h = 480, 298
        sheet = Image.new('RGB', (w*4, h*math.ceil(len(tiles)/4)), '#141114')
        draw = ImageDraw.Draw(sheet)
        for i,(t,out) in enumerate(tiles):
            im=Image.open(out); im.thumbnail((w,270))
            x,y=(i%4)*w,(i//4)*h
            sheet.paste(im,(x,y+25)); draw.text((x+8,y+7),f'{t:.2f}s',fill='white')
        sheet.save(Q / f'{name}_sheet.jpg', quality=92)
    for t in [3.3,25.3,29.5,33.,49.5,73.8]:
        name,a,b=next(x for x in ALL_RANGES if x[1]<=t<x[2])
        a=read(Q/f'{name}_range.json')['start']
        run(['ffmpeg','-v','error','-y','-ss',t-a,'-i',Q/f'{name}.mp4','-frames:v','1',Q/f'still_{t:.1f}.png'])
    refs = Path.home() / 'work/skill-development/claude/motion-graphic/guide/referensi/sheets/keyframes'
    board=Image.new('RGB',(1920,6*390),'#141114'); draw=ImageDraw.Draw(board)
    for i,(name,t,ref) in enumerate([('repo',3.3,'63-k6-chat-klip.jpg'),('app',25.3,'63-k5-prompt-kaca.jpg'),
        ('app',29.5,'63-k5-prompt-kaca.jpg'),('app',33.,'63-k6-chat-klip.jpg'),
        ('kartu',49.5,'63-k6-chat-klip.jpg'),('blender',73.8,'63-k6-chat-klip.jpg')]):
        for j,src in enumerate([Q/f'before_{t:.1f}.jpg',Q/f'still_{t:.1f}.png',refs/ref]):
            im=Image.open(src); im.thumbnail((640,360)); board.paste(im,(j*640,i*390+25))
            draw.text((j*640+10,i*390+6),['R6','R7 UI',ref][j],fill='white')
    board.save(Q/'sanding.jpg',quality=93)


def check():
    def lum(s):
        c=[int(s[i:i+2],16)/255 for i in (1,3,5)]
        c=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in c]
        return sum(x*y for x,y in zip(c,[.2126,.7152,.0722]))
    contrast=(lum('#C8E64A')+.05)/(lum('#080608')+.05)
    o=read(P/'lego/r7_override_ui.json')
    assert not (set(x['id'] for x in o['ganti']) & set(o['buang']))
    assert len(o['buang'])==len(set(o['buang']))
    results={'contrast_selesai':contrast,'psnr':read(Q/'r4_proof.json'),'layers':{}}
    for job in read(Q/'jobs.json'):
        d=read_probe(job['out']); s=d['streams'][0]
        assert s['width'] in [640,1920]
        if not job['opaque']:
            assert s['codec_name']=='prores' and s['pix_fmt']=='yuva444p12le',s
        results['layers'][job['name']]={'codec':s['codec_name'],'pixel_format':s['pix_fmt'],'frames':s.get('nb_frames'),'duration':d['format']['duration']}
    assert contrast>=4.5
    write(Q/'verification.json',results)
    print('Contrast SELESAI',round(contrast,4),'PASS')


if __name__=='__main__':
    ap=argparse.ArgumentParser(description=__doc__)
    ap.add_argument('step',choices=['prepare','render','assemble','stills','check','all','r3',
                                  'b2_prepare', 'b2_render', 'b2_blender', 'b2_assemble', 'b2_r2'])
    a=ap.parse_args()
    Q.mkdir(parents=True,exist_ok=True)
    for step in ['prepare','render','assemble','stills','check'] if a.step=='all' else [a.step]:
        globals()[step]()
