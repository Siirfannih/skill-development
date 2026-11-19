#!/usr/bin/env python3
"""D-445/D-462: KT kartu 83 di wajah; D-464: lubang slab memakai kamera R7.

Jalankan dari folder proyek: python3 lego/r7_ktwajah.py prepare|still|render|slabs|override|check|qc|pixels|artifacts.
Menulis cache r7_ktwajah_*, override sendiri, dan qc/r7/ktwajah; komponen ada di bersama/kt83.
"""
import argparse
import copy
import fcntl
import hashlib
import io
import importlib.util
import json
import math
import os
from pathlib import Path
import subprocess
import sys
import types
from functools import lru_cache

import numpy as np
from PIL import Image, ImageDraw, ImageFont

P = Path(__file__).resolve().parents[1]
SKILL = Path.home() / 'work/skill-development/claude/motion-graphic'
QC = P / 'qc/r7/ktwajah'
SRC = P / 'remotion/src/video/bersama/kt83'
STORE = Path('/mnt/storage-projects/skill-dev-journey/r7/ktwajah')
FPS = 30000 / 1001
SLABS = ['T002', 'T009', 'T011', 'GRADE', 'T034', 'T051', 'T057', 'T077']
GROUPS = [
    ('buka', ['T001'], 'K4', 'kiri'),
    ('workflow', ['T006', 'T007', 'T008', 'T010', 'T012', 'T013'], 'K2', 'kiri'),
    ('decision_cincin', ['T017', 'T018'], 'K1', 'kiri'),
    ('decision_dada', ['T020', 'T021', 'T022', 'T023', 'T024'], 'K4', 'kanan'),
    ('parodi', [f'T{i:03}' for i in list(range(26, 34)) + list(range(35, 38))], 'K2', 'kanan'),
    ('publish', [f'T{i:03}' for i in range(52, 57)], 'K1', 'kiri'),
    ('biaya', [f'T{i:03}' for i in range(58, 63)], 'K4', 'kiri'),
    ('langganan', ['T063', 'T064', 'T068', 'T069', 'T071', 'T072', 'T073'], 'K4', 'kiri'),
    ('lintas', ['T074', 'T075', 'T076'], 'K1', 'kiri'),
]


def read(path):
    return json.loads(Path(path).read_text())


def write(path, data):
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    Path(path).write_text(json.dumps(data, ensure_ascii=False, separators=(',', ':')) + '\n')


def run(cmd, log=None, cwd=P, env=None):
    if log:
        with open(log, 'w') as f:
            r = subprocess.run([str(c) for c in cmd], cwd=cwd, stdout=f, stderr=subprocess.STDOUT, env=env)
        if r.returncode:
            print(Path(log).read_text()[-5000:], flush=True)
            raise RuntimeError(f'{cmd[0]} gagal; {log}')
    else:
        subprocess.run([str(c) for c in cmd], cwd=cwd, check=True, env=env)


def module(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


@lru_cache(maxsize=1)
def camera():
    clips = copy.deepcopy(read(P / 'lego/lego_r7_kamera.json')['dasar'])
    n0 = 0
    for c in clips:
        c['frame0'] = n0
        c['n'] = round(c['dur'] * FPS)
        n0 += c['n']
    return clips


def zoom_at(t):
    n = round(t * FPS)
    clips = camera()
    c = next((c for c in clips if c['frame0'] <= n < c['frame0'] + c['n']), clips[-1])
    cam = c.get('kamera', {})
    a, b = cam.get('zoom', [1, 1])
    p = min(1, max(0, (n - c['frame0']) / max(1, c['n'] - 1)))
    curve = cam.get('kurva', 'heavy')
    q = p if curve == 'linear' else 1 - (1 - p) ** 3 if curve == 'land' else p * p * (3 - 2 * p)
    return a + (b - a) * q


def measure_heads():
    """Head top and sides measured at every matte frame, before the camera transform."""
    path = QC / 'kepala_matte.json'
    if path.exists():
        return read(path)
    cmd = ['ffmpeg', '-v', 'error', '-threads', '2', '-i', P / 'qc/matte/wajah-matte.mkv',
           '-vf', f'fps={FPS},scale=480:270,format=gray', '-frames:v', '1732',
           '-f', 'rawvideo', '-pix_fmt', 'gray', '-']
    proc = subprocess.Popen([str(c) for c in cmd], stdout=subprocess.PIPE)
    heads = []
    while True:
        buf = proc.stdout.read(480 * 270)
        if len(buf) != 480 * 270:
            break
        mask = np.frombuffer(buf, np.uint8).reshape(270, 480) > 150
        rows = np.flatnonzero(mask[:, 150:330].sum(axis=1) >= 12)
        if not len(rows):
            raise ValueError(f'Kepala tidak ditemukan di matte frame {len(heads)}')
        top = int(rows[0])
        lefts, rights = [], []
        for yy in range(top + 15, min(top + 53, 270)):
            xs = np.flatnonzero(mask[yy, 150:330])
            if len(xs) > 35:
                lefts.append(int(xs[0]) + 150)
                rights.append(int(xs[-1]) + 150)
        if not lefts:
            raise ValueError(f'Kontur kepala tidak lengkap di frame {len(heads)}')
        left, right = float(np.median(lefts)) * 4, float(np.median(rights)) * 4
        width = right - left
        heads.append({'cx': (left + right) / 2, 'atas': top * 4, 'lebar': width, 'tinggi': width * 1.18})
    if proc.wait():
        raise RuntimeError('Decode matte gagal')
    write(path, heads)
    return heads


def head_at(n, heads):
    h = heads[min(len(heads) - 1, n)]
    z = zoom_at(n / FPS)
    clips = camera()
    c = next(c for c in clips if c['frame0'] <= n < c['frame0'] + c['n'])
    cx, cy = c.get('kamera', {}).get('pusat', [.5, .45])
    return {**h, 'cx': round(h['cx'] * z - 1920 * (z - 1) * cx, 2),
            'atas': round(h['atas'] * z - 1080 * (z - 1) * cy, 2),
            'lebar': round(h['lebar'] * z, 2), 'tinggi': round(h['tinggi'] * z, 2), 'z': round(z, 6)}


def onset(t):
    return math.ceil(t * FPS - 1e-7)


def rig_boxes():
    layers = read(P / 'lego/lego_r7.json')['lapisan']
    l = next(x for x in layers if x['id'] == 'K_Clawd')
    path = P / 'lego' / l['src']
    info = read(QC / 'rig_clawd_boxes.json') if (QC / 'rig_clawd_boxes.json').exists() else None
    stat = path.stat()
    signature = {'src': l['src'], 't': l['t'], 'x': l['x'], 'y': l['y'], 'bytes': stat.st_size, 'mtime_ns': stat.st_mtime_ns}
    if info and info['signature'] == signature:
        return info
    probe = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-select_streams', 'v:0',
                                                '-show_entries', 'stream=width,height', '-of', 'json', str(path)], text=True))['streams'][0]
    w, h = probe['width'], probe['height']
    proc = subprocess.Popen(['ffmpeg', '-v', 'error', '-threads', '2', '-i', str(path),
                             '-vf', 'alphaextract,format=gray', '-frames:v', '125', '-threads', '2',
                             '-f', 'rawvideo', '-pix_fmt', 'gray', '-'], stdout=subprocess.PIPE)
    boxes = []
    while True:
        buf = proc.stdout.read(w * h)
        if len(buf) != w * h:
            break
        yy, xx = np.where(np.frombuffer(buf, np.uint8).reshape(h, w) > 48)
        boxes.append({'x0': int(xx.min()) + l['x'], 'x1': int(xx.max() + 1) + l['x'],
                      'y0': int(yy.min()) + l['y'], 'y1': int(yy.max() + 1) + l['y']} if len(xx) else None)
    if proc.wait():
        raise ValueError('Gagal membaca alpha Clawd untuk ruang tangga')
    info = {'signature': signature, 'start_frame': round(l['t'] * FPS), 'boxes': boxes}
    write(QC / 'rig_clawd_boxes.json', info)
    return info


def prepare():
    QC.mkdir(parents=True, exist_ok=True)
    heads = measure_heads()
    rig = rig_boxes()
    words = read(P / 'edit/words.json')['words']
    blocks = {b['id']: b for b in read(P / 'teks.json')}
    word_map = {}
    for _, ids, _, _ in GROUPS:
        for id in ids:
            b = blocks[id]
            tokens = b['teks'].split()
            matches = [j for j in range(len(words) - len(tokens) + 1)
                       if [w['w'] for w in words[j:j + len(tokens)]] == tokens]
            if not matches:
                raise ValueError(f'{id}: ucapan tidak ditemukan persis dalam words.json')
            a = min(matches, key=lambda j: abs(words[j]['s'] - b['t']))
            if abs(words[a]['s'] - b['t']) > 0.3:
                raise ValueError(f'{id}: calon ucapan jauh dari rentang blok')
            word_map[id] = list(range(a, a + len(tokens)))
    timing, jobs = [], []
    for name, ids, shape, side in GROUPS:
        indices = [j for id in ids for j in word_map[id]]
        f0 = min(onset(words[j]['s']) for j in indices)
        f1 = max(onset(words[j]['e']) for j in indices)
        props = {'w': 1920, 'h': 1080, 'frames': f1 - f0 + 1,
                 'kepala': [head_at(n, heads) for n in range(f0, f1 + 1)], 'blok': []}
        if name == 'workflow':
            for i, h in enumerate(props['kepala']):
                source_frame = f0 + i - rig['start_frame']
                if 0 <= source_frame < len(rig['boxes']) and rig['boxes'][source_frame]:
                    h['rig'] = rig['boxes'][source_frame]
        for id in ids:
            b = blocks[id]
            ix = word_map[id]
            if b['teks'].split() != [words[j]['w'] for j in ix]:
                raise ValueError(f'{id}: teks.json berbeda dari words.json')
            item = {'id': id, 'bentuk': 'pil' if id == 'T060' else shape, 'sisi': side,
                    'bawahDecision': id in ['T020', 'T021'], 'bawahBusur': id == 'T010', 'kata': []}
            for i, j in enumerate(ix):
                w = words[j]
                a, e = onset(w['s']), onset(w['e'])
                end = max(e, onset(words[ix[i + 1]]['s'])) if i + 1 < len(ix) else e
                item['kata'].append({'teks': w['w'], 'masuk': a - f0, 'akhir': end - f0})
                timing.append({'id': id, 'kata_index': j, 'teks': w['w'], 's': w['s'], 'e': w['e'],
                               'indeks_blok_lama': b['kata'],
                               'on_frame': a, 'end_frame': e, 'on_render': a / FPS, 'off_render': end / FPS,
                               'delay_ms': (a / FPS - w['s']) * 1000, 'bentuk': item['bentuk'], 'group': name})
            rows = [r for r in timing if r['id'] == id]
            for i, r in enumerate(rows):
                last = len(item['kata']) - 1
                keep = last if item['bentuk'] in ['K1', 'pil'] else min(i + 1, last) if item['bentuk'] == 'K2' else i
                r['off_render'] = (f0 + item['kata'][keep]['akhir']) / FPS
                r['hold_after_speech_ms'] = (r['off_render'] - r['e']) * 1000
            active_heads = props['kepala'][item['kata'][0]['masuk']:item['kata'][-1]['akhir']]
            mid_z = (min(h['z'] for h in active_heads) + max(h['z'] for h in active_heads)) / 2
            target = 62 if shape == 'K1' else 80 if id == 'T068' else 65 if id == 'T013' else 72
            item['tata'] = {'ukuran': round(target / .71 / mid_z, 3)}
            if shape == 'K2':
                item['tata'].update({'baris': 230, 'kepalaY': .42})
                if name == 'workflow':
                    item['tata'].update({'sisi': 'kanan', 'baris': 255, 'kepalaY': .16})
                    if id == 'T008':
                        item['tata']['baris'] = 295
                    if id in ['T010', 'T012']:
                        item['tata'].update({'kepalaY': .84, 'baris': 265})
                    elif id == 'T013':
                        item['tata'].update({'sisi': 'kiri', 'kepalaY': .96, 'baris': 106, 'jarak': 60, 'paddingX': 6})
                elif id == 'T031':
                    item['tata'].update({'sisi': 'kiri', 'kepalaY': 1.10, 'baris': 140})
            elif shape == 'K1':
                item['tata']['dy'] = 0
                if name == 'decision_cincin':
                    item['tata'].update({'dx': -90, 'dy': -10, 'radius': 1.8})
            elif not item['bawahDecision']:
                item['tata'].update({'dx': -70, 'dy': 55})
                if id == 'T060':
                    item['tata'].update({'ukuran': 76, 'dx': -170, 'dy': 85})
            props['blok'].append(item)
        path = QC / f'props_{name}.json'
        write(path, props)
        jobs.append({'name': name, 'ids': ids, 'shape': shape, 't': f0 / FPS, 'frames': props['frames'], 'props': str(path)})
    write(QC / 'jobs.json', jobs)
    write(QC / 'timing.json', timing)
    print(f'{len(jobs)} grup; {len(timing)} kata; kepala dari {len(heads)} frame matte', flush=True)
    return jobs


def cached(name):
    STORE.mkdir(parents=True, exist_ok=True)
    out = P / 'lego/cache' / f'r7_ktwajah_{name}.mov'
    target = STORE / out.name
    if not out.exists() and not out.is_symlink():
        out.symlink_to(target)
    return out


def prepare_b2():
    """Narasi dinding dan slab utuh; masukan selalu snapshot sebelum revisi."""
    q = QC / 'b2'
    before = q / 'before/qc/r7/ktwajah'
    jobs = read(before / 'jobs.json')
    relay_frame = onset(next(l['t'] for l in read(P / 'lego/lego_r7.json')['lapisan'] if l['id'] == 'D_RELAY'))
    # Posisi dibaca pada footage berkamera; setiap frasa punya jangkar tetap.
    layout = {
        'T001': (1240, 335, 100, [0]),
        'T006': (1250, 280, 100, [0, 0]),
        'T008': (1230, 280, 100, [0, 0, 1]),
        'T010': (1280, 420, 94, [0, 1]),
        'T012': (1260, 400, 96, [0, 0, 1]),
        'T013': (1260, 400, 96, [0, 0]),
        'T020': (1270, 220, 94, [0, 1]), 'T021': (1270, 220, 94, [0]),
        'T022': (1230, 150, 86, [0, 1, 2]),
        'T024': (1230, 300, 96, [0, 0]),
        'T035': (1235, 350, 96, [0, 0]),
        'T036': (1235, 350, 96, [0, 1]), 'T037': (1235, 350, 100, [0]),
        'T058': (1280, 380, 98, [0]), 'T059': (1260, 220, 100, [0, 1, 2]),
        'T060': (1260, 310, 106, [0, 1]), 'T061': (1280, 370, 98, [0]),
        'T062': (1260, 300, 92, [0, 1]),
        'T063': (1260, 280, 100, [0, 1]), 'T064': (1240, 280, 96, [0, 1]),
        'T068': (1470, 620, 92, [0]), 'T069': (1470, 620, 88, [0]),
        'T071': (1470, 620, 82, [0, 1]),
        'T071_uji_coba': (1470, 620, 82, [0, 0]),
        'T072': (1470, 620, 82, [0, 1]), 'T073': (1470, 620, 88, [0]),
        'T051_lbl': (120, 140, 64, [0, 0]),
        'T057_lbl': (125, 170, 68, [0, 0]),
        'T077_lbl': (130, 125, 68, [0, 0]),
    }
    for j in jobs:
        p = read(before / ('props_' + j['name'] + '.json'))
        by_id = {b['id']: b for b in p['blok']}
        if j['name'] == 'workflow':
            rig = rig_boxes()
            for i, h in enumerate(p['kepala']):
                h.pop('rig', None)
                n = round(j['t'] * FPS) + i - rig['start_frame']
                if 0 <= n < len(rig['boxes']) and rig['boxes'][n]:
                    h['rig'] = rig['boxes'][n]
            by_id['T006']['kata'] += by_id['T007']['kata']
            p['blok'].remove(by_id['T007'])
            by_id['T012']['kata'].append(by_id['T013']['kata'].pop(0))
        elif j['name'] == 'decision_dada':
            by_id['T022']['kata'] += by_id['T023']['kata']
            p['blok'].remove(by_id['T023'])
        elif j['name'] == 'biaya':
            for w in by_id['T060']['kata']:
                w['bobot'] = 800
            by_id['T059']['kata'] += by_id['T060']['kata']
            p['blok'].remove(by_id['T060'])
        elif j['name'] == 'langganan':
            b = copy.deepcopy(by_id['T071'])
            b['id'] = 'T071_uji_coba'
            b['kata'] = [by_id['T071']['kata'].pop(), by_id['T072']['kata'].pop(0)]
            p['blok'].insert(p['blok'].index(by_id['T072']), b)
        elif j['name'] == 'publish':
            # Fokus latar menggantikan penundaan dua kata yang dulu menghindari slab.
            words = read(P / 'edit/words.json')['words']
            b = by_id['T052']
            f0 = round(j['t'] * FPS)
            for i, index in enumerate([100, 101]):
                b['kata'][i]['masuk'] = onset(words[index]['s']) - f0
                b['kata'][i]['akhir'] = (onset(words[index + 1]['s']) - f0)
        new_blocks = []
        for b in p['blok']:
            if b['id'] == 'T020':
                old = copy.deepcopy(b)
                old['id'] += '_dalam'
                old['kata'] = old['kata'][:1]
                new_blocks.append(old)
                b['kata'] = b['kata'][1:]
            if b['id'] in layout:
                x, y, size, lines = layout[b['id']]
                a, e = b['kata'][0]['masuk'], b['kata'][-1]['akhir']
                z = p['kepala'][(a + e) // 2]['z']
                b['narasi'] = {'x': 960 + (x - 960) / z, 'y': 486 + (y - 486) / z,
                               'ukuran': size / z, 'baris': lines}
                for w in b['kata']:
                    w.pop('tag', None)
                if b['id'] == 'T060':
                    for w in b['kata']:
                        w['bobot'] = 800
            new_blocks.append(b)
        p['blok'] = new_blocks
        if j['name'] == 'label_lintas':
            p['frames'] = min(p['frames'], relay_frame - onset(j['t']))
            j['frames'] = p['frames']
        j['props'] = str(q / ('props_' + j['name'] + '.json'))
        write(j['props'], p)
    layers = {l['id']: l for l in read(P / 'lego/lapisan.json')}
    for name, id, x, y, width in [
            ('slab_workflow', 'T051', 120, 185, 1680),
            ('slab_balik', 'T057', 115, 210, 1690),
            ('slab_lintas', 'T077', 120, 175, 1680)]:
        l = layers[id]
        frames = round(l['durasi'] * FPS)
        if name == 'slab_lintas':
            frames = min(frames, relay_frame - onset(l['t']))
        f0 = round(l['t'] * FPS)
        fokus = []
        # Label pengantar tidak mengubah fokus; narasi berikutnya yang mengubahnya.
        for j in jobs:
            if j['shape'] == 'label':
                continue
            p = read(j['props'])
            for b in p['blok']:
                a = round(j['t'] * FPS) + b['kata'][0]['masuk'] - f0
                e = round(j['t'] * FPS) + b['kata'][-1]['akhir'] - f0
                if a < frames and e > 0:
                    fokus.append([max(0, a), min(frames, e)])
        p = {'w': 1920, 'h': 1080, 'frames': frames,
             'kepala': [head_at(n, measure_heads()) for n in range(f0, f0 + frames)],
             'blok': [{'id': id, 'bentuk': 'slab', 'kata': [{'teks': l['props']['teks'], 'masuk': 0, 'akhir': frames}],
                       'slab': {'teks': l['props']['teks'], 'x': x, 'y': y, 'w': width, 'fokus': fokus}}]}
        path = q / ('props_' + name + '.json')
        write(path, p)
        jobs.append({'name': name, 'ids': [id], 'shape': 'slab', 't': l['t'], 'frames': frames, 'props': str(path)})
    write(q / 'jobs.json', jobs)
    print('B2:', len(jobs), 'grup; D-476/477/478', flush=True)
    return jobs


def cached_b2(name):
    target = STORE / 'b2' / f'r7b2_narasi_{name}.mov'
    target.parent.mkdir(exist_ok=True)
    out = P / 'lego/cache' / target.name
    if not out.exists() and not out.is_symlink():
        out.symlink_to(target)
    return out


def prepare_r2():
    """D-485: dua posisi narasi, awal T052, dan penutup hingga ekor."""
    q = QC / 'b2/ronde2'
    before = q / 'before'
    jobs = read(before / 'jobs.json')
    selected = []
    positions = {'T012': (1340, 675, 88), 'T036': (1360, 690, 82), 'T037': (1360, 690, 88)}
    slab_end = max(j['t'] + j['frames'] / FPS for j in jobs
                   if j['name'] in ['slab_workflow', 'label_workflow'])
    for source in jobs:
        if source['name'] not in ['workflow', 'parodi', 'publish']:
            continue
        j = copy.deepcopy(source)
        p = read(before / 'qc/r7/ktwajah/b2' / Path(j['props']).name)
        for b in p['blok']:
            if b['id'] in positions:
                x, y, size = positions[b['id']]
                a, e = b['kata'][0]['masuk'], b['kata'][-1]['akhir']
                z = p['kepala'][(a + e) // 2]['z']
                b['narasi'].update(x=960 + (x - 960) / z, y=486 + (y - 486) / z, ukuran=size / z)
            if b['id'] == 'T052':
                b['tampilMulai'] = onset(slab_end) - round(j['t'] * FPS)
        j['props'] = str(q / f'props_{j["name"]}.json')
        write(j['props'], p)
        selected.append(j)
    words = read(P / 'edit/words.json')['words'][-3:]
    start = onset(words[0]['s'])
    frames = round(84.52 * FPS) - start
    ig = read(P / 'qc/r7/ig/props.json')
    ig_layer = next(l for l in read(P / 'lego/r7_override_ig.json')['ganti'] if l['id'] == 'D_IG')
    native_start = round((start / FPS - ig_layer['t']) * 30)
    last_base_frame = sum(round(c['dur'] * FPS) for c in camera()) - 1
    native_stop = min(round((last_base_frame / FPS - ig_layer['t']) * 30), round(ig['durasi'] * 30) - 1)
    z = 1.04
    def layout(size, rows):
        return {'x': 960 + (1200 - 960) / z, 'y': 486 + (330 - 486) / z,
                'ukuran': size / z, 'baris': rows}
    p = {'w': 1920, 'h': 1080, 'frames': frames,
         'kepala': [{'cx': 950, 'atas': 150, 'lebar': 400, 'tinggi': 472, 'z': z}] * frames,
         'blok': [
             {'id': 'PENUTUP_BAGI', 'bentuk': 'K4', 'narasi': layout(88, [0]),
              'kata': [{'teks': 'bagi', 'masuk': 0, 'akhir': onset(words[1]['s']) - start}]},
             {'id': 'PENUTUP_YANG_BERUNTUNG', 'bentuk': 'K4', 'narasi': layout(88, [0, 1]),
              'kata': [{'teks': words[1]['w'], 'masuk': onset(words[1]['s']) - start, 'akhir': frames},
                       {'teks': words[2]['w'], 'masuk': onset(words[2]['s']) - start, 'akhir': frames,
                        'bobot': 800, 'ukuran': 104 / z}]}]}
    props = q / 'props_penutup.json'
    write(props, p)
    write(q / 'props_penutup_basis.json', ig)
    selected.append({'name': 'penutup', 'ids': ['NARASI_PENUTUP_R2'], 'shape': 'penutup',
                     't': start / FPS, 'frames': frames, 'props': str(props),
                     'native_start': native_start, 'native_stop': native_stop})
    write(q / 'jobs.json', selected)
    write(q / 'timing.json', {'ledger': 'D-485', 'workflow_slab_and_label_end': slab_end,
                             'ring_first_frame': onset(slab_end), 'ring_first_time': onset(slab_end) / FPS,
                             'penutup_first_frame': start, 'penutup_end_frame_exclusive': start + frames,
                             'penutup_end_time': (start + frames) / FPS})
    print('Ronde 2:', len(selected), 'grup; D-485', flush=True)


def render_r2(names=None):
    q = QC / 'b2/ronde2'
    video = QC / 'public/video'
    if not video.exists():
        video.symlink_to(P / 'remotion/public/video')
    bundle()
    for j in read(q / 'jobs.json'):
        if names and j['name'] not in names:
            continue
        raw = cached_b2('r2_' + j['name'] + '_raw')
        temporary = raw.resolve().with_suffix('.rendering.mov')
        run(['npx', 'remotion', 'render', QC / 'bundle', 'R7KTWajah', temporary,
             f'--props={j["props"]}', '--codec=prores', '--prores-profile=4444',
             '--pixel-format=yuva444p10le', '--image-format=png', '--concurrency=3',
             *(['--frames=0-15'] if j['name'] == 'publish' else [])],
            q / ('render_' + j['name'] + '.log'), P / 'remotion')
        os.replace(temporary, raw.resolve())
        if j['shape'] == 'K1':
            out = cached_b2('r2_' + j['name'])
            temporary = out.resolve().with_suffix('.rendering.mov')
            cut_matte(raw, j['t'], 0, 0, temporary)
            # T053 dan sesudahnya tetap memakai paket ProRes yang sudah dikirim.
            split = next(b['kata'][0]['masuk'] for b in read(j['props'])['blok'] if b['id'] == 'T053')
            old = next(l for l in read(q / 'before/lego/r7_override_ktwajah.json')['ganti'] if l['id'] == 'T052')
            head, tail = q / 'publish_head.mov', q / 'publish_tail.mov'
            run(['ffmpeg', '-y', '-v', 'error', '-i', temporary, '-frames:v', str(split), '-an', '-c', 'copy', head])
            seek = math.floor(split / FPS * 1_000_000) / 1_000_000
            run(['ffmpeg', '-y', '-v', 'error', '-ss', str(seek), '-i', P / 'lego' / old['src'],
                 '-frames:v', str(j['frames'] - split), '-an', '-c', 'copy', tail])
            listing = q / 'publish_concat.txt'
            listing.write_text(f"file '{head}'\nfile '{tail}'\n")
            run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', listing,
                 '-an', '-c', 'copy', temporary])
            os.replace(temporary, out.resolve())
        elif j['shape'] == 'penutup':
            base = q / 'penutup_basis.mp4'
            run(['npx', 'remotion', 'render', QC / 'bundle', 'R7B2PenutupBasis', base,
                 f'--props={q / "props_penutup_basis.json"}', '--codec=h264', '--crf=10',
                 f'--frames={j["native_start"]}-{j["native_stop"]}', '--concurrency=3'],
                q / 'render_penutup_basis.log', P / 'remotion')
            out = cached_b2('r2_penutup')
            temporary = out.resolve().with_suffix('.rendering.mov')
            filt = (f'[0:v]fps={FPS},tpad=stop_mode=clone:stop_duration=1,'
                    f'trim=end_frame={j["frames"]},setpts=PTS-STARTPTS[b];'
                    '[1:v]setpts=PTS-STARTPTS[n];[b][n]overlay=shortest=1[v]')
            run(['ffmpeg', '-y', '-v', 'error', '-filter_complex_threads', '2',
                 '-threads', '2', '-i', base, '-threads', '2', '-i', raw,
                 '-filter_complex', filt, '-map', '[v]', '-an', '-threads', '3',
                 '-c:v', 'prores_ks', '-profile:v', '4444', '-pix_fmt', 'yuva444p10le', temporary],
                q / 'render_penutup_compose.log')
            os.replace(temporary, out.resolve())
        print('Ronde 2 render', j['name'], flush=True)


def override_r2():
    q = QC / 'b2/ronde2'
    o = read(P / 'lego/r7_override_ktwajah.json')
    for j in read(q / 'jobs.json'):
        suffix = '_raw' if j['shape'] not in ['K1', 'penutup'] else ''
        layer = {'id': j['ids'][0], 'src': 'cache/' + cached_b2('r2_' + j['name'] + suffix).name,
                 't': j['t'], 'x': 0, 'y': 0}
        if j['shape'] == 'penutup':
            o['tambah'] = [l for l in o['tambah'] if l['id'] != layer['id']] + [layer]
        else:
            at = next(i for i, l in enumerate(o['ganti']) if l['id'] == layer['id'])
            o['ganti'][at] = layer
    write(P / 'lego/r7_override_ktwajah.json', o)
    print('Ronde 2 override: T006, T026, T052 + NARASI_PENUTUP_R2', flush=True)


def render_b2(jobs):
    bundle()
    q = QC / 'b2'
    for j in jobs:
        name = j['name']
        raw = cached_b2(name + '_raw')
        digest = hashlib.sha256(Path(j['props']).read_bytes() + b''.join(
            p.read_bytes() for p in sorted(SRC.glob('*')) if p.is_file()) +
            (P / 'remotion/src/video/bersama/tema.ts').read_bytes()).hexdigest()
        stamp = q / (name + '.sha256')
        if not raw.exists() or not stamp.exists() or stamp.read_text().strip() != digest:
            temporary = raw.resolve().with_suffix('.rendering.mov')
            run(['npx', 'remotion', 'render', QC / 'bundle', 'R7KTWajah', temporary,
                 f'--props={j["props"]}', '--codec=prores', '--prores-profile=4444',
                 '--pixel-format=yuva444p10le', '--image-format=png', '--concurrency=3'],
                q / ('render_' + name + '.log'), P / 'remotion')
            os.replace(temporary, raw.resolve())
            stamp.write_text(digest)
        if j['shape'] in ['K1', 'slab']:
            out = cached_b2(name)
            temporary = out.resolve().with_suffix('.rendering.mov')
            cut_matte(raw, j['t'], 0, 0, temporary)
            os.replace(temporary, out.resolve())
        print('B2 render', name, flush=True)


def override_b2():
    q = QC / 'b2'
    o = read(q / 'before/lego/r7_override_ktwajah.json')
    for j in read(q / 'jobs.json'):
        name = j['name'] + ('' if j['shape'] in ['K1', 'slab'] else '_raw')
        layer = next(l for l in o['ganti'] if l['id'] == j['ids'][0])
        layer.update(src='cache/' + cached_b2(name).name, t=j['t'], x=0, y=0)
    ais = next(l for l in o['ganti'] if l['id'] == 'T034')
    ais['src'] = 'cache/' + cached_b2('slab_aislop').name
    write(P / 'lego/r7_override_ktwajah.json', o)
    print('B2 override; ID dan lapisan terlindungi tetap', flush=True)


def check_b2():
    q = QC / 'b2'
    before = q / 'before'
    old_jobs = {j['name']: j for j in read(before / 'qc/r7/ktwajah/jobs.json')}
    checked, frames = [], 0
    for j in read(q / 'jobs.json'):
        p = read(j['props'])
        if j['name'] in old_jobs:
            old = read(before / ('qc/r7/ktwajah/props_' + j['name'] + '.json'))
            if j['name'] == 'publish':
                b = next(b for b in old['blok'] if b['id'] == 'T052')
                words = read(P / 'edit/words.json')['words']
                f0 = round(j['t'] * FPS)
                for i, index in enumerate([100, 101]):
                    b['kata'][i].update(masuk=onset(words[index]['s']) - f0,
                                       akhir=onset(words[index + 1]['s']) - f0)
            words = lambda data: sorted((w['masuk'], w['akhir'], w['teks']) for b in data['blok'] for w in b['kata'])
            assert words(old) == words(p), (j['name'], 'ucapan/onset berubah')
        if j['name'] == 'workflow':
            rig = rig_boxes()
            for i, h in enumerate(p['kepala']):
                n = round(j['t'] * FPS) + i - rig['start_frame']
                expected = rig['boxes'][n] if 0 <= n < len(rig['boxes']) else None
                assert h.get('rig') == expected, ('rig', i)
        for b in p['blok']:
            if b.get('narasi'):
                assert len(b['kata']) == len(b['narasi']['baris'])
                assert all(not w.get('tag') for w in b['kata'])
            assert all(w['akhir'] > w['masuk'] for w in b['kata'])
        name = j['name'] + ('' if j['shape'] in ['K1', 'slab'] else '_raw')
        path = cached_b2(name)
        info = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-select_streams', 'v:0',
            '-show_entries', 'stream=nb_frames,pix_fmt,r_frame_rate,width,height', '-of', 'json', str(path)], text=True))['streams'][0]
        assert int(info['nb_frames']) == j['frames'], (name, info)
        assert info['width'] == 1920 and info['height'] == 1080
        assert info['pix_fmt'].startswith('yuva'), (name, 'alpha hilang')
        frames += j['frames']
        checked.append({'name': name, 'frames': j['frames'], 'alpha': info['pix_fmt'], 'fps': info['r_frame_rate']})
    a = read(before / 'lego/r7_override_ktwajah.json')
    b = read(P / 'lego/r7_override_ktwajah.json')
    assert a['buang'] == b['buang'] and a['tambah'] == b['tambah']
    assert [l['id'] for l in a['ganti']] == [l['id'] for l in b['ganti']]
    protected = ['T002', 'T009', 'T011', 'GRADE']
    for id in protected:
        assert next(l for l in a['ganti'] if l['id'] == id) == next(l for l in b['ganti'] if l['id'] == id)
    for j in read(q / 'jobs.json'):
        name = j['name'] + ('' if j['shape'] in ['K1', 'slab'] else '_raw')
        layer = next(l for l in b['ganti'] if l['id'] == j['ids'][0])
        expected = {'src': 'cache/' + cached_b2(name).name, 't': j['t'], 'x': 0, 'y': 0}
        assert all(layer.get(key) == value for key, value in expected.items()), j['ids'][0]
    result = {'status': 'PASS', 'ucapan': 'identik', 'onset': 'identik kecuali Jadi/gak T052 kembali ke cue ucapan (D-478)', 'ID_ownership': 'identik',
              'protected_layers': protected, 'frames': frames, 'layers': checked}
    write(q / 'checks.json', result)
    print(json.dumps(result, ensure_ascii=False, indent=2), flush=True)


def blur_aislop_b2():
    """Pertahankan animasi AI SLOP; fokus mundur hanya selama narasi sesudah parodi."""
    q = QC / 'b2'
    l = next(l for l in read(q / 'before/lego/r7_override_ktwajah.json')['ganti'] if l['id'] == 'T034')
    j = next(j for j in read(q / 'jobs.json') if j['name'] == 'parodi')
    p = read(j['props'])
    a = min(w['masuk'] for b in p['blok'] if b.get('narasi') for w in b['kata']) / FPS + j['t'] - l['t']
    raw = cached_b2('slab_aislop_raw')
    temporary = raw.resolve().with_suffix('.rendering.mov')
    run(['ffmpeg', '-y', '-v', 'error', '-threads', '2', '-i', P / 'lego' / l['src'],
         '-vf', f'format=gbrap,gblur=sigma=3:enable=gte(t\\,{a:.8f})',
         '-threads', '3', '-c:v', 'prores_ks', '-profile:v', '4444', '-pix_fmt', 'yuva444p10le', temporary],
        q / 'blur_aislop.log')
    os.replace(temporary, raw.resolve())
    out = cached_b2('slab_aislop')
    temporary = out.resolve().with_suffix('.rendering.mov')
    cut_matte(raw, l['t'], l['x'], l['y'], temporary)
    os.replace(temporary, out.resolve())
    write(q / 'slab_aislop.json', {'source': l, 'blur_starts_at': a + l['t'], 'sigma': 3})


def pixels_b2():
    q = QC / 'b2'
    result = []
    for j in read(q / 'jobs.json'):
        p = read(j['props'])
        name = j['name'] + ('' if j['shape'] in ['K1', 'slab'] else '_raw')
        proc = subprocess.Popen(['ffmpeg', '-v', 'error', '-threads', '2', '-i', str(cached_b2(name)),
            '-vf', 'alphaextract,scale=480:270,format=gray', '-threads', '2', '-f', 'rawvideo',
            '-pix_fmt', 'gray', '-'], stdout=subprocess.PIPE)
        edges, face, bounds = [], [], []
        n = 0
        while True:
            buf = proc.stdout.read(480 * 270)
            if len(buf) != 480 * 270:
                break
            core = np.frombuffer(buf, np.uint8).reshape(270, 480) > 150
            yy, xx = np.where(core)
            protected_parody = j['name'] == 'parodi' and not any(b.get('narasi') and
                b['kata'][0]['masuk'] <= n < b['kata'][-1]['akhir'] for b in p['blok'])
            if len(xx) and not protected_parody:
                box = [int(xx.min()) * 4, int(yy.min()) * 4, int(xx.max() + 1) * 4, int(yy.max() + 1) * 4]
                bounds.append(box)
                if box[0] < 96 or box[1] < 54 or box[2] > 1824 or box[3] > 1028:
                    edges.append({'frame': n, 'box': box})
                h = p['kepala'][n]
                x0, x1 = round((h['cx'] - h['lebar'] * .25) / 4), round((h['cx'] + h['lebar'] * .25) / 4)
                y0, y1 = round((h['atas'] + h['tinggi'] * .35) / 4), round((h['atas'] + h['tinggi'] * .8) / 4)
                if core[max(0, y0):min(270, y1), max(0, x0):min(480, x1)].sum() > 3:
                    face.append(n)
            n += 1
        assert proc.wait() == 0
        item = {'group': j['name'], 'frames': n, 'edge_frames': edges, 'face_frames': face,
                'ink_envelope': [min(b[0] for b in bounds), min(b[1] for b in bounds),
                                 max(b[2] for b in bounds), max(b[3] for b in bounds)] if bounds else None}
        result.append(item)
        print(j['name'], n, 'frames; edge', len(edges), 'face', len(face), flush=True)
    write(q / 'pixel_audit.json', result)
    if any(x['edge_frames'] or x['face_frames'] for x in result):
        raise ValueError('Lihat frame penunjuk di b2/pixel_audit.json; ini bukan putusan kreatif.')


def prepare_r4():
    """D-474: ukuran cincin dari snapshot ronde 3; waktu dan label tetap."""
    before = QC / 'r4/before/qc/r7/ktwajah'
    for name in ['decision_cincin', 'publish', 'lintas']:
        props = read(before / f'props_{name}.json')
        for b in props['blok']:
            heads = props['kepala'][b['kata'][0]['masuk']:b['kata'][-1]['akhir']]
            z = (min(h['z'] for h in heads) + max(h['z'] for h in heads)) / 2
            target = 104 if b['id'] == 'T075' else 110
            b['tata'] = {'ukuran': round(target / .71 / z, 3)}
        write(QC / f'props_{name}.json', props)
    print('D-474: 3 grup cincin; timing tetap', flush=True)


def bundle():
    public = QC / 'public'
    public.mkdir(exist_ok=True)
    fonts = public / 'fonts'
    if not fonts.exists():
        fonts.symlink_to(P / 'remotion/public/fonts')
    run(['npx', 'remotion', 'bundle', 'src/video/index.ts', '--out-dir', QC / 'bundle',
         '--public-dir', public], QC / 'bundle.log', P / 'remotion')


def cut_matte(src, t, x, y, out):
    m = module(P / 'lego/lubang.py', 'lubang_ktwajah')
    def limited(cmd):
        if cmd[0] == 'ffmpeg':
            cmd = [cmd[0], '-threads', '2', '-filter_threads', '1', '-filter_complex_threads', '1'] + cmd[1:]
            cmd = [str(v).replace('fps=30,', f'fps={FPS},') for v in cmd]
            for i, v in enumerate(cmd[:-1]):
                if v == '-r' and cmd[i + 1] == '30':
                    cmd[i + 1] = str(FPS)
        return cmd
    m.subprocess = types.SimpleNamespace(
        Popen=lambda cmd, **kw: subprocess.Popen(limited(cmd), **kw),
        run=lambda cmd, **kw: subprocess.run(limited(cmd), **kw), PIPE=subprocess.PIPE)
    # potong_zoom's local clock is 30 fps; both its matte and camera use the native grid here.
    m.potong_zoom(str(src), t, x, y, str(out), lambda sec: zoom_at(t + round((sec - t) * 30) / FPS))


def render(jobs, still=False):
    bundle()
    for j in jobs:
        name = j['name']
        if still:
            targets = [t for t in [0.5, 4.9, 7.8, 11, 13, 16.2, 21.7, 39.5, 44, 49.9, 55.5]
                       if j['t'] <= t < j['t'] + j['frames'] / FPS]
            for t in targets:
                frame = round((t - j['t']) * FPS)
                run(['npx', 'remotion', 'still', QC / 'bundle', 'R7KTWajah', QC / f'layer_{t:g}.png',
                     f'--props={j["props"]}', f'--frame={frame}', '--image-format=png'],
                    QC / f'still_{t:g}.log', P / 'remotion')
                print('still', name, t, flush=True)
            continue
        raw = cached(name + '_raw')
        digest = hashlib.sha256(Path(j['props']).read_bytes() + b''.join(p.read_bytes() for p in sorted(SRC.glob('*')))
                                + (P / 'remotion/src/video/bersama/tema.ts').read_bytes()).hexdigest()
        stamp = QC / f'{name}.sha256'
        if not raw.exists() or not stamp.exists() or stamp.read_text().strip() != digest:
            run(['npx', 'remotion', 'render', QC / 'bundle', 'R7KTWajah', raw,
                 f'--props={j["props"]}', '--codec=prores', '--prores-profile=4444',
                 '--pixel-format=yuva444p10le', '--image-format=png', '--concurrency=3'],
                QC / f'render_{name}.log', P / 'remotion')
            stamp.write_text(digest)
        if j['shape'] == 'K1':
            out = cached(name)
            cut_matte(raw, j['t'], 0, 0, out)
        print('render', name, flush=True)


def slabs():
    layers = {x['id']: x for x in read(P / 'lego/lego_r6.json')['lapisan']}
    for id in SLABS:
        l = layers[id]
        src = P / 'lego' / (l['src'].split('-lubang')[0] + '.mov')
        out = cached(id)
        cut_matte(src, l['t'], l['x'], l['y'], out)
        print('matte kamera R7', id, flush=True)


def override(jobs):
    original = {x['id']: x for x in read(P / 'lego/lego_r6.json')['lapisan']}
    data = {'ganti': [], 'tambah': [], 'buang': []}
    for j in jobs:
        name = j['name'] + ('' if j['shape'] == 'K1' else '_raw')
        data['ganti'].append({'id': j['ids'][0], 'src': 'cache/' + cached(name).name, 't': j['t'], 'x': 0, 'y': 0})
        data['buang'].extend(j['ids'][1:])
    for id in SLABS:
        data['ganti'].append({**original[id], 'src': 'cache/' + cached(id).name})
    if any(j['shape'] == 'label' for j in jobs):
        data['buang'].append('T050')
    write(P / 'lego/r7_override_ktwajah.json', data)
    print('override:', len(data['ganti']), 'ganti;', len(data['buang']), 'buang', flush=True)


def check():
    rows = read(QC / 'timing.json')
    current_words = read(P / 'edit/words.json')['words']
    for r in rows:
        w = current_words[r['kata_index']]
        assert (w['w'], w['s'], w['e']) == (r['teks'], r['s'], r['e'])
    assert all(0 <= x['delay_ms'] < (250 if x['id'] == 'T052' and x['teks'] in ['Jadi', 'gak']
               and x.get('onset_exception') == 'D-473 #2: mulai setelah slab keluar' else 1000 / FPS + .001) for x in rows)
    assert all(x['off_render'] >= x['e'] for x in rows)
    assert len({x['kata_index'] for x in rows}) == len(rows)
    own = {id for _, ids, _, _ in GROUPS for id in ids} | set(SLABS)
    if any(j['shape'] == 'label' for j in read(QC / 'jobs.json')):
        own |= {'T050', 'T051_lbl', 'T057_lbl', 'T077_lbl'}
    o = read(P / 'lego/r7_override_ktwajah.json')
    assert {x['id'] for x in o['ganti']} | set(o['buang']) == own
    assert not o['tambah']
    rig = rig_boxes()
    for j in read(QC / 'jobs.json'):
        p = read(j['props'])
        first = round(j['t'] * FPS)
        for i, h in enumerate(p['kepala']):
            assert abs(h['z'] - zoom_at((first + i) / FPS)) < .0000006
            if j['name'] == 'workflow':
                index = first + i - rig['start_frame']
                expected = rig['boxes'][index] if 0 <= index < len(rig['boxes']) else None
                assert h.get('rig') == expected
    for c in camera():
        assert c.get('kamera', {}).get('pusat', [.5, .45]) == [.5, .45]
        z0, z1 = c.get('kamera', {}).get('zoom', [1, 1])
        assert abs(zoom_at(c['frame0'] / FPS) - z0) < 1e-6
        assert abs(zoom_at((c['frame0'] + c['n'] - 1) / FPS) - z1) < 1e-6
    result = {'words': len(rows), 'blocks': sum(len(ids) for _, ids, _, _ in GROUPS),
              'delay_ms_max': max(x['delay_ms'] for x in rows),
              'holds_until_word_end': True, 'unique_word_indices': True, 'scope': 'PASS',
              'camera_endpoints': 'PASS', 'current_words_identity': 'PASS', 'baked_camera_and_rig': 'PASS'}
    write(QC / 'checks.json', result)
    print(json.dumps(result, indent=2), flush=True)


def still_frame(path, t):
    data = subprocess.check_output(['ffmpeg', '-v', 'error', '-threads', '2', '-ss', str(max(0, t)),
                                    '-i', str(path), '-frames:v', '1', '-threads', '2',
                                    '-f', 'image2pipe', '-vcodec', 'png', '-'])
    return Image.open(io.BytesIO(data)).convert('RGBA')


def zoom_image(im, t):
    z = zoom_at(t)
    x, y = (1920 - 1920 / z) * .5, (1080 - 1080 / z) * .45
    return im.crop((x, y, x + 1920 / z, y + 1080 / z)).resize((1920, 1080), Image.Resampling.BILINEAR)


def preview():
    """Preview awal di basis R6; bukti gabungan terbaru dibuat oleh artifacts()."""
    jobs = read(QC / 'jobs.json')
    original = read(P / 'lego/lego_r6.json')['lapisan']
    own = {id for _, ids, _, _ in GROUPS for id in ids}
    tiles = []
    for t in [4.9, 7.8, 11, 39.5, 44, 55.5]:
        base = zoom_image(still_frame(P / 'edit/wajah.mp4', t), t)
        for l in original:
            if l['id'] in own or l['t'] > t:
                continue
            path = P / 'lego' / l['src']
            d = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                                               '-of', 'csv=p=0', str(path)], text=True))
            if t >= l['t'] + d:
                continue
            layer = still_frame(path, t - l['t'])
            x, y = l.get('x', 0), l.get('y', 0)
            for axis in ['x', 'y']:
                keys = l.get('gerak', {}).get(axis)
                if keys:
                    v = float(np.interp(t - l['t'], [k[0] for k in keys], [k[1] for k in keys]))
                    if axis == 'x': x = v
                    else: y = v
            base.alpha_composite(layer, (round(x), round(y)))
        fg = Image.open(QC / f'layer_{t:g}.png').convert('RGBA')
        j = next(j for j in jobs if j['t'] <= t < j['t'] + j['frames'] / FPS)
        if j['shape'] == 'K1':
            matte = zoom_image(still_frame(P / 'qc/matte/wajah-matte.mkv', t), t).convert('L')
            a = np.asarray(fg.getchannel('A')).astype(float) * (1 - np.asarray(matte) / 255)
            fg.putalpha(Image.fromarray(a.astype(np.uint8)))
        base.alpha_composite(fg)
        base.convert('RGB').save(QC / f'preview_{t:g}.jpg', quality=96)
        small = base.convert('RGB').resize((640, 360))
        tiles.append((small, str(t)))
    sheet = Image.new('RGB', (1280, 1152), '#202020')
    dr = ImageDraw.Draw(sheet)
    for i, (im, label) in enumerate(tiles):
        x, y = i % 2 * 640, i // 2 * 384
        sheet.paste(im, (x, y)); dr.text((x + 8, y + 363), label, fill='white')
    sheet.save(QC / 'preview_sheet.jpg', quality=94)


def snapshot():
    """Private QC snapshot: the explicit TASK owns T068; other workers' files are read only."""
    L = read(P / 'lego/lego_r6.json')
    L['dasar'] = copy.deepcopy(camera())
    for c in L['dasar']:
        c.pop('frame0', None); c.pop('n', None)
    conflicts = []
    sources = []
    for path in sorted((P / 'lego').glob('r7_override_*.json')):
        o = read(path)
        sources.append({'path': str(path.relative_to(P)), 'sha256': hashlib.sha256(path.read_bytes()).hexdigest()})
        for y in o.get('ganti', []):
            ids = [x['id'] for x in L['lapisan']]
            if y['id'] not in ids:
                if y['id'] == 'T068' and path.name == 'r7_override_ui.json':
                    conflicts.append({'id': 'T068', 'file': path.name, 'putusan_qc': 'TASK: ktwajah'})
                    continue
                raise ValueError(f'{path}: ID {y["id"]} tidak ditemukan')
            L['lapisan'][ids.index(y['id'])] = dict(y)
        L['lapisan'] = [x for x in L['lapisan'] if x['id'] not in o.get('buang', [])]
        for y in o.get('tambah', []):
            ids = [x['id'] for x in L['lapisan']]
            if y['id'] in ids:
                raise ValueError(f'ID lapisan ganda {y["id"]}')
            at = ids.index(y['sebelum']) if y.get('sebelum') in ids else len(ids)
            L['lapisan'].insert(at, dict(y))
    for x in L['dasar'] + L['lapisan']:
        x['src'] = str((P / 'lego' / x['src']).resolve())
        if not Path(x['src']).exists():
            raise FileNotFoundError(x['src'])
    if L.get('audio'):
        L['audio'] = str((P / 'lego' / L['audio']).resolve())
    write(QC / 'snapshot_r7.json', L)
    write(QC / 'snapshot_inputs.json', {'overrides': sources, 'konflik': conflicts})
    return L


def qc_range(L, a, b):
    """Clip only linear camera tails; retain the original frame grid and camera endpoints."""
    start, stop = round(a * FPS), round(b * FPS)
    offset, duration = start / FPS, (stop - start) / FPS
    name = f'{a:g}-{b:g}'
    outdir = STORE / 'qc'
    outdir.mkdir(exist_ok=True)
    out = outdir / f'rentang_{name}.mp4'
    short = copy.deepcopy(L)
    short['dasar'], short['lapisan'] = [], []
    used = []
    own_durations = {j['ids'][0]: j['frames'] / FPS for j in read(QC / 'jobs.json')}
    for c in camera():
        lo, hi = max(start, c['frame0']), min(stop, c['frame0'] + c['n'])
        if hi <= lo:
            continue
        d = copy.deepcopy(c)
        d.pop('n'); d.pop('frame0')
        d['src'] = str((P / 'lego' / d['src']).resolve())
        d['in'] += (lo - c['frame0']) / FPS
        d['dur'] = (hi - lo) / FPS
        if lo != c['frame0'] or hi != c['frame0'] + c['n']:
            if d.get('kamera', {}).get('kurva', 'linear') != 'linear':
                raise ValueError('QC: kurva non-linear tidak boleh dipotong dan diganti')
            if 'kamera' in d:
                d['kamera']['zoom'] = [zoom_at(lo / FPS), zoom_at((hi - 1) / FPS)]
        short['dasar'].append(d)
    for l in L['lapisan']:
        if l['t'] >= stop / FPS:
            continue
        path = Path(l['src'])
        length = own_durations.get(l['id'])
        if length is None:
            length = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                                                    '-of', 'csv=p=0', path], text=True))
        if l['t'] + length <= offset + .0001:
            continue
        stat = path.stat()
        used.append({'id': l['id'], 'path': str(path), 'bytes': stat.st_size, 'mtime_ns': stat.st_mtime_ns})
        layer = copy.deepcopy(l)
        local = max(0, offset - l['t'])
        need = min(length - local, stop / FPS - max(offset, l['t']))
        layer['t'] -= offset
        if local or length - local > need + .0001:
            trim = outdir / f'trim_{name}_{l["id"]}.mov'
            run(['ffmpeg', '-y', '-v', 'error', '-threads', '1', '-ss', str(local), '-i', path,
                 '-t', f'{need:.8f}', '-an', '-threads', '2',
                 '-c:v', 'prores_ks', '-profile:v', '4444', '-pix_fmt', 'yuva444p10le', trim])
            layer['src'] = str(trim)
            if local:
                layer['t'] = 0
                for axis, keys in layer.get('gerak', {}).items():
                    first = float(np.interp(local, [k[0] for k in keys], [k[1] for k in keys]))
                    layer['gerak'][axis] = [[0, first]] + [[t - local, v] for t, v in keys if t > local]
        short['lapisan'].append(layer)
    if L.get('audio'):
        audio = outdir / f'audio_{name}.wav'
        run(['ffmpeg', '-y', '-v', 'error', '-ss', str(offset), '-i', L['audio'], '-t', str(duration), '-c:a', 'pcm_s24le', audio])
        short['audio'] = str(audio)
    short['keluar'] = str(outdir / f'compose_{name}.mp4')
    recipe = QC / f'recipe_{name}.json'
    write(recipe, short)
    # Limit only this subprocess; other workers' render settings remain untouched.
    m = module(SKILL / 'scripts/lego/compose.py', 'compose_ktwajah')
    errs, _ = m.validate(short, str(QC))
    if errs:
        raise ValueError(errs)
    cmd, rendered = m.build_cmd(short, str(QC), [0, duration])
    limited = cmd[:]
    for i in reversed([i for i, arg in enumerate(limited) if arg == '-i']):
        limited[i:i] = ['-threads', '1']
    limited[1:1] = ['-filter_complex_threads', '1', '-filter_threads', '1']
    limited[-1:-1] = ['-threads', '3']
    write(QC / f'command_{name}.json', {'equivalent_cli': ['python3', str(SKILL / 'scripts/lego/compose.py'), str(recipe), '--rentang', '0', str(duration)],
                                     'global_frame_range': [start, stop], 'global_time_offset': offset, 'cmd': limited})
    bindir = QC / 'bin'
    bindir.mkdir(exist_ok=True)
    wrapper = bindir / 'ffmpeg'
    wrapper.write_text('#!/usr/bin/env python3\nimport os,sys\na=sys.argv[1:]\n'
                       'for i in reversed([i for i,v in enumerate(a) if v=="-i"]): a[i:i]=["-threads","1"]\n'
                       'a[0:0]=["-filter_complex_threads","1","-filter_threads","1"]\n'
                       'a[-1:-1]=["-threads","3"]\n'
                       'os.execv("/usr/bin/ffmpeg",["/usr/bin/ffmpeg",*a])\n')
    wrapper.chmod(0o755)
    env = {**os.environ, 'PATH': str(bindir) + os.pathsep + os.environ['PATH']}
    run([sys.executable, SKILL / 'scripts/lego/compose.py', recipe, '--rentang', '0', str(duration)],
        QC / f'compose_{name}.log', env=env)
    Path(rendered).rename(out)
    link = QC / out.name
    if not link.exists():
        link.symlink_to(out)
    got = m.ffprobe_dur(str(out))
    assert abs(got - duration) <= 1.5 / FPS + .05, (got, duration)
    print(f'QC {name}: PASS; {got:.3f}s; {len(short["lapisan"])} lapisan', flush=True)
    return {'range': [a, b], 'offset': offset, 'duration': duration, 'path': str(link), 'frames': stop - start,
            'input_signatures': used}


def qc(names=None):
    L = snapshot()
    for a, b in [(0, 15), (15, 23.7), (36, 57.7)]:
        if names and f'{a:g}-{b:g}' not in names:
            continue
        result = qc_range(L, a, b)
        with open(QC / 'ranges.lock', 'w') as lock:
            fcntl.flock(lock, fcntl.LOCK_EX)
            results = read(QC / 'ranges.json') if (QC / 'ranges.json').exists() else []
            results = [r for r in results if r['range'] != [a, b]] + [result]
            write(QC / 'ranges.json', sorted(results, key=lambda r: r['range'][0]))


def sheet(frames, out, cols=4, w=480):
    h = round(w * 1080 / 1920)
    row = h + 25
    im = Image.new('RGB', (cols * w, math.ceil(len(frames) / cols) * row), '#202020')
    dr = ImageDraw.Draw(im)
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 17)
    for i, (path, label) in enumerate(frames):
        x, y = i % cols * w, i // cols * row
        im.paste(Image.open(path).convert('RGB').resize((w, h)), (x, y))
        dr.text((x + 7, y + h + 2), label, fill='white', font=font)
    im.save(out, quality=94)


def artifacts():
    ranges = read(QC / 'ranges.json')
    for r in ranges:
        if not r.get('input_signatures'):
            raise ValueError('QC lama: rakit ulang dari sumber terbaru')
        for s in r['input_signatures']:
            stat = Path(s['path']).stat()
            if stat.st_size != s['bytes'] or stat.st_mtime_ns != s['mtime_ns']:
                raise ValueError(f'Sumber berubah setelah rakitan QC: {s["id"]}, {r["range"]}')
    stills = QC / 'stills'
    stills.mkdir(exist_ok=True)
    refs = SKILL / 'guide/referensi/sheets/keyframes'

    def capture(t, out):
        frame = round(t * FPS)
        t = frame / FPS
        r = next(r for r in ranges if r['offset'] <= t < r['offset'] + r['duration'])
        local_frame = frame - round(r['offset'] * FPS)
        still_frame(r['path'], max(0, local_frame / FPS - .00001)).convert('RGB').save(out, quality=97)

    six = []
    for t in [4.9, 7.8, 11, 39.5, 44, 55.5]:
        path = stills / f'{t:.1f}.jpg'
        capture(t, path)
        six.append((path, t))
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 26)
    comparison = Image.new('RGB', (1920, 6 * 760), '#202020')
    dr = ImageDraw.Draw(comparison)
    for i, (path, t) in enumerate(six):
        ref = refs / ('83-k2.jpg' if t in [4.9, 7.8, 44] else '83-k1.jpg')
        comparison.paste(Image.open(path).resize((960, 540)), (0, i * 760 + 100))
        comparison.paste(Image.open(ref).resize((960, 720)), (960, i * 760))
        dr.text((20, i * 760 + 725), f'R7 {t:.1f}s  |  {ref.name}', fill='white', font=font)
    comparison.save(QC / 'sanding.jpg', quality=95)
    sheet([(path, f'{t:.1f}s · 360 px') for path, t in six], QC / 'phone.jpg', cols=2, w=360)
    before_after = []
    for path, t in six:
        basis = stills / f'before_{t:.1f}.jpg'
        still_frame(P / 'qc/r6/visual_r6.mp4', t).convert('RGB').save(basis, quality=95)
        before_after.extend([(basis, f'R6 {t:.1f}s'), (path, f'R7 {t:.1f}s')])
    sheet(before_after, QC / 'sebelum_sesudah.jpg', cols=2, w=960)

    samples = []
    for r in ranges:
        a, b = r['range']
        cells = []
        vf = f"select='eq(n,round(round(n*2/{FPS})*{FPS}/2))',scale=480:270,format=rgb24"
        cmd = ['ffmpeg', '-v', 'error', '-threads', '2', '-i', r['path'], '-vf', vf,
               '-threads', '2', '-fps_mode', 'vfr', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-']
        proc = subprocess.Popen(cmd, stdout=subprocess.PIPE)
        i = 0
        while True:
            buf = proc.stdout.read(480 * 270 * 3)
            if len(buf) != 480 * 270 * 3:
                break
            path = stills / f'sheet_{a:g}-{b:g}_{i:03}.jpg'
            Image.frombytes('RGB', (480, 270), buf).save(path, quality=94)
            frame = round(r['offset'] * FPS) + round(i * FPS / 2)
            cells.append((path, f'{frame / FPS:.3f}s'))
            samples.append({'range': r['range'], 'frame': frame, 'time': frame / FPS, 'path': str(path.relative_to(P))})
            i += 1
        if proc.wait():
            raise RuntimeError('Ekstraksi lembar 2 fps gagal')
        sheet(cells, QC / f'sheet_{a:g}-{b:g}_2fps.jpg')
        print('sheet', a, b, len(cells), flush=True)
    write(QC / 'sheet_samples.json', samples)

    slab_dir = QC / 'matte'
    slab_dir.mkdir(exist_ok=True)
    layers = {x['id']: x for x in read(P / 'lego/lego_r6.json')['lapisan']}
    proofs = []
    for id in SLABS:
        l = layers[id]
        cmd = ['ffmpeg', '-v', 'error', '-threads', '2', '-i', str(cached(id)),
               '-vf', 'alphaextract,scale=192:108,format=gray', '-threads', '2', '-f', 'rawvideo', '-pix_fmt', 'gray', '-']
        data = subprocess.check_output(cmd)
        frames = np.frombuffer(data, np.uint8).reshape(-1, 108, 192)
        mass = frames.mean(axis=(1, 2))
        native_frames = list(range(onset(l['t']), onset(l['t'] + len(frames) / 30)))
        times = [n / FPS for n in native_frames]
        zs = [zoom_at(t) for t in times]
        mapped_mass = [mass[min(len(mass) - 1, max(0, round((t - l['t']) * 30)))] for t in times]
        maximum = max(range(len(zs)), key=lambda i: zs[i])
        middle = mass[len(mass) // 4:max(len(mass) // 4 + 1, 3 * len(mass) // 4)]
        hold_mass = max(.0001, float(np.median(middle)))
        valid = [i for i in range(len(times)) if mapped_mass[i] >= .65 * hold_mass]
        legible = max(valid, key=lambda i: zs[i])
        item = {'id': id, 'native_frame_max': native_frames[maximum],
                't_max': times[maximum], 'zoom_max': zs[maximum], 'alpha_mean_at_max': float(mapped_mass[maximum]),
                't_max_readable': times[legible], 'zoom_max_readable': zs[legible],
                'source': l['src'].split('-lubang')[0] + '.mov'}
        for suffix, ix in [('max', maximum), ('readable', legible)]:
            path = slab_dir / f'{id}_{suffix}.jpg'
            capture(times[ix], path)
            item[suffix + '_still'] = str(path.relative_to(P))
        h = head_at(round(times[legible] * FPS), read(QC / 'kepala_matte.json'))
        edge = Image.open(P / item['readable_still']).crop((round(h['cx'] - 420), round(h['atas'] - 70),
                                                          round(h['cx'] + 420), round(h['atas'] + 330)))
        edge.save(slab_dir / f'{id}_tepi.jpg', quality=97)
        proofs.append(item)
    write(QC / 'matte_proofs.json', proofs)
    sheet([(P / x['readable_still'], f'{x["id"]} {x["t_max_readable"]:.3f}s z={x["zoom_max_readable"]:.4f}')
           for x in proofs], slab_dir / 'sheet.jpg', cols=2, w=960)
    edges = Image.new('RGB', (1680, 4 * 430), '#202020')
    dr = ImageDraw.Draw(edges)
    for i, x in enumerate(proofs):
        xx, yy = i % 2 * 840, i // 2 * 430
        edges.paste(Image.open(slab_dir / f'{x["id"]}_tepi.jpg'), (xx, yy))
        dr.text((xx + 8, yy + 402), x['id'], fill='white', font=font)
    edges.save(slab_dir / 'tepi_sheet.jpg', quality=96)
    print('6 still 1080p, sanding, 3 lembar 2fps, 8 bukti matte', flush=True)


def pixel_audit():
    """Inspect every delivered overlay frame, including the first and last spoken frames."""
    results = []
    for j in read(QC / 'jobs.json'):
        p = read(j['props'])
        path = cached(j['name'] + ('' if j['shape'] == 'K1' else '_raw'))
        cmd = ['ffmpeg', '-v', 'error', '-threads', '2', '-i', str(path),
               '-vf', 'scale=480:270,format=rgba', '-threads', '2', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-']
        proc = subprocess.Popen(cmd, stdout=subprocess.PIPE)
        rects, missing, extra, face_hits, rig_hits = [], [], [], [], []
        f = 0
        while True:
            buf = proc.stdout.read(480 * 270 * 4)
            if len(buf) != 480 * 270 * 4:
                break
            a = np.frombuffer(buf, np.uint8).reshape(270, 480, 4)
            core = (a[:, :, 0] > 210) & (a[:, :, 1] > 210) & (a[:, :, 2] > 190) & (a[:, :, 3] > 230)
            expected = any(w['masuk'] <= f < w['akhir'] for b in p['blok'] for w in b['kata'])
            yy, xx = np.where(core)
            if expected and len(xx) < 3:
                missing.append(f)
            if not expected and len(xx) > 3:
                extra.append(f)
            if len(xx):
                rects.append([int(xx.min()) * 4, int(yy.min()) * 4, int(xx.max() + 1) * 4, int(yy.max() + 1) * 4])
                h = p['kepala'][min(f, len(p['kepala']) - 1)]
                x0, x1 = (h['cx'] - h['lebar'] * .26) / 4, (h['cx'] + h['lebar'] * .26) / 4
                y0, y1 = (h['atas'] + h['tinggi'] * .38) / 4, (h['atas'] + h['tinggi'] * .78) / 4
                if core[round(y0):round(y1), round(x0):round(x1)].sum() > 3:
                    face_hits.append(f)
                if h.get('rig'):
                    b = h['rig']
                    if core[max(0, b['y0'] // 4):min(270, math.ceil(b['y1'] / 4)),
                            max(0, b['x0'] // 4):min(480, math.ceil(b['x1'] / 4))].sum() > 3:
                        rig_hits.append(f)
            f += 1
        if proc.wait():
            raise ValueError(f'Decode pixel gagal: {path}')
        bounds = [min(r[0] for r in rects), min(r[1] for r in rects), max(r[2] for r in rects), max(r[3] for r in rects)]
        item = {'group': j['name'], 'frames_decoded': f, 'frames_requested': p['frames'],
                'core_bbox_envelope': bounds, 'missing_frames': missing, 'extra_frames': extra,
                'central_face_zone_hits': face_hits, 'rig_zone_hits': rig_hits,
                'resolution_of_measurement': '480x270, bounds in 1080p pixels (±4px)'}
        results.append(item)
        print(j['name'], f, 'frames; bounds', bounds, 'missing', len(missing), 'extra', len(extra), 'face', len(face_hits), 'rig', len(rig_hits), flush=True)
    write(QC / 'pixel_audit.json', results)
    if any(r['missing_frames'] or r['extra_frames'] or r['central_face_zone_hits'] or r['rig_zone_hits'] for r in results):
        raise ValueError('Ada frame overlay yang perlu diperiksa; lihat pixel_audit.json')


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('action', choices=['prepare-r2', 'render-r2', 'override-r2', 'check-r2', 'prepare-b2', 'render-b2', 'blur-aislop-b2', 'override-b2', 'check-b2', 'pixels-b2', 'prepare', 'prepare-r3', 'prepare-r4', 'still', 'render', 'slabs', 'override', 'check', 'preview', 'qc', 'artifacts', 'pixels'])
    ap.add_argument('--group', nargs='*')
    args = ap.parse_args()
    os.chdir(P)
    if args.action == 'prepare-r2':
        prepare_r2()
    elif args.action == 'render-r2':
        render_r2(args.group)
    elif args.action == 'override-r2':
        override_r2()
    elif args.action == 'check-r2':
        run([sys.executable, QC / 'b2/ronde2/proof.py', 'scope'])
    elif args.action == 'prepare-b2':
        prepare_b2()
    elif args.action == 'render-b2':
        jobs = read(QC / 'b2/jobs.json')
        render_b2([j for j in jobs if not args.group or j['name'] in args.group])
    elif args.action == 'blur-aislop-b2':
        blur_aislop_b2()
    elif args.action == 'override-b2':
        override_b2()
    elif args.action == 'check-b2':
        check_b2()
    elif args.action == 'pixels-b2':
        pixels_b2()
    elif args.action == 'prepare-r4' or (args.action == 'prepare' and (QC / 'r4/before/hashes.json').exists()):
        prepare_r4()
    elif args.action == 'prepare' and not (QC / 'r3/before/jobs.json').exists():
        prepare()
    elif args.action in ['prepare', 'prepare-r3']:
        env = {**os.environ, 'LD_LIBRARY_PATH': str(QC / 'r3/native') + os.pathsep + os.environ.get('LD_LIBRARY_PATH', '')}
        run([Path.home() / 'work/mg-venv/bin/python', QC / 'r3/prepare_revision.py'], env=env)
    elif args.action == 'slabs':
        slabs()
    elif args.action in ['still', 'render']:
        jobs = read(QC / 'jobs.json')
        render([j for j in jobs if not args.group or j['name'] in args.group], args.action == 'still')
    elif args.action == 'override':
        override(read(QC / 'jobs.json'))
    elif args.action == 'check':
        if any(l['src'].startswith('cache/r7b2_narasi_r2_') for l in read(P / 'lego/r7_override_ktwajah.json')['ganti']):
            run([sys.executable, QC / 'b2/ronde2/proof.py', 'scope'])
        elif any(l['src'].startswith('cache/r7b2_narasi_') for l in read(P / 'lego/r7_override_ktwajah.json')['ganti']):
            check_b2()
        else:
            check()
    elif args.action == 'preview':
        preview()
    elif args.action == 'qc':
        qc(args.group)
    elif args.action == 'artifacts':
        artifacts()
    elif args.action == 'pixels':
        pixel_audit()
