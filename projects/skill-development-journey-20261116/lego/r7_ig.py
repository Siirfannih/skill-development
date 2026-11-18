#!/usr/bin/env python3
"""Aset dan QC adegan IG R7. Jalankan dari folder mana pun; tidak mengubah resep bersama."""
import argparse
import copy
import hashlib
import json
import math
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
QC = ROOT / 'qc/r7/ig'
FPS = 30000 / 1001


def baca(p):
    return json.loads((ROOT / p).read_text())


def simpan(p, data):
    p = ROOT / p
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(data, indent=2) + '\n')


def run(cmd, log):
    with (QC / log).open('w') as f:
        subprocess.run(cmd, cwd=ROOT, stdout=f, stderr=subprocess.STDOUT, check=True)


def probe(p):
    return json.loads(subprocess.check_output([
        'ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(p)]))


def prepare():
    layer = next(x for x in baca('lego/lego_r6.json')['lapisan'] if x['id'] == 'D_IG')
    props = next(x for x in baca('lego/lapisan_opaque.json') if x['id'] == 'D_IG')['props']
    props['rev'] = 27
    props.pop('ring', None)
    props.pop('coret', None)
    # Kamera D-451 tetap sama sampai sesudah f85; pan berikutnya selalu disertai zoom.
    props['kamera'] = props['kamera'][:4] + [
        [3.22, 1.28, 1120, 466.875, 'heavy'],
        [3.65, 1.29, 1250, 463.604651, 'drift'],
        [4.16, 1.30, 1250, 460.384615, 'heavy'],
        [4.44, 1.305, 1250, 458.793103, 'drift'],
        [5.63, 1.32, 1253, 454.090909, 'heavy'],
        # I2-1: batas atas tetap di ruang sebelum header sampai panel keluar ke kanan.
        [5.666666667, 1.412345679, 1205, 427.342657, 'heavy'],
        [5.70, 1.496296296, 1075, 405.891089, 'heavy'],
        [5.733333333, 1.580246914, 800, 386.718750, 'heavy'],
        [5.766666667, 1.664197531, 560, 414, 'heavy'],
        [5.80, 1.748148148, 590, 439, 'heavy'],
        [5.833333333, 1.832098765, 615, 460, 'heavy'],
        [5.866666667, 1.916049383, 638, 468, 'heavy'],
        [5.90, 2.00, 660, 468, 'heavy'],
        [6.00, 2.04, 660, 468, 'drift'],
        [7.4333333333, 2.09, 660, 468, 'drift'],
    ]
    simpan('qc/r7/ig/props.json', props)
    layer['src'] = 'cache/r7_ig_D_IG_r2.mp4'
    layer.pop('_asal', None)
    simpan('lego/r7_override_ig.json', {'ganti': [layer], 'tambah': [],
        'buang': [f'T{n:03d}' for n in range(84, 96) if n != 86]})
    simpan('qc/r7/ig/lingkup.json', {
        'ledger': ['D-454', 'D-455', 'D-456', 'D-457', 'D-462', 'D-465'],
        'basis': 'lego/cache/D_IG_r6.mp4', 'dipertahankan': {'D_IG': [67, 85]},
        'narasi': 'T088–T090 dan aku di panel putih; kasih dan narasi lain di bidang video D_IG',
        'ronde': 2, 'ledger_ronde2': 'qc/r7/ig/r2/lingkup.json',
        'rentang_qc': [76.3, 83.82]})
    print('Props dan override IG disiapkan.')


def matte():
    vf = ('setpts=PTS+16*1001/30000/TB,fps=fps=30:start_time=0,'
          'trim=start_frame=2475:end_frame=2493,setpts=PTS-STARTPTS,'
          'erosion,erosion,gblur=sigma=1,lut=y=clip((val-3)*255/249\\,0\\,255)')
    cmd = ['ffmpeg', '-y', '-v', 'warning', '-threads', '2', '-i', 'qc/matte/wajah-matte-r6.mkv',
           '-vf', vf, '-an', '-c:v', 'libvpx-vp9', '-threads', '2', '-lossless', '1',
           '-deadline', 'good', '-cpu-used', '4', '-pix_fmt', 'yuv420p',
           'remotion/public/video/matte-ig-gratis-r7.webm']
    run(cmd, 'matte-build.log')
    simpan('qc/r7/ig/matte-provenance.json', {
        'basis': 'qc/r6/profesional/provenance.json', 'offset_sumber_frame': -16,
        'sumber': 'qc/matte/wajah-matte-r6.mkv', 'proxy': 'remotion/public/video/wajah-proxy.mp4',
        'shift_pts_native': '+16 frames @30000/1001', 'trim_fps30': [2475, 2493],
        'native_proxy_start': 2292, 'matte_mulai_frame_lokal': 183,
        'gratis_frame_lokal': [187, 198], 'command': cmd})
    print('Matte GRATIS dibuat dengan offset yang sama dengan PROFESIONAL.')


def preserve(patch_atau=False):
    cmd = ['ffmpeg', '-y', '-v', 'warning', '-threads', '2', '-i', 'qc/r7/ig/ig-render.mp4',
           '-threads', '2', '-i', 'lego/cache/D_IG_r6.mp4']
    if patch_atau:
        patch = QC / 'ig-patch-90-96.mp4'
        assert int(probe(patch)['streams'][0]['nb_frames']) == 7
        cmd += ['-threads', '2', '-i', str(patch)]
        filters = ('[0:v]format=yuvj420p,split=3[a][b][c];'
                   '[a]trim=end_frame=67,setpts=PTS-STARTPTS[pre];'
                   '[1:v]trim=start_frame=67:end_frame=86,setpts=PTS-STARTPTS[mid];'
                   '[b]trim=start_frame=86:end_frame=90,setpts=PTS-STARTPTS[antara];'
                   '[2:v]format=yuvj420p,setpts=PTS-STARTPTS[patch];'
                   '[c]trim=start_frame=97,setpts=PTS-STARTPTS[post];'
                   '[pre][mid][antara][patch][post]concat=n=5:v=1:a=0[v]')
    else:
        filters = ('[0:v]format=yuvj420p,split=2[a][c];'
           '[a]trim=end_frame=67,setpts=PTS-STARTPTS[pre];'
           '[1:v]trim=start_frame=67:end_frame=86,setpts=PTS-STARTPTS[mid];'
           '[c]trim=start_frame=86,setpts=PTS-STARTPTS[post];'
           '[pre][mid][post]concat=n=3:v=1:a=0[v]')
    cmd += ['-filter_complex_threads', '2', '-filter_complex', filters, '-map', '[v]', '-an',
           '-c:v', 'libx264', '-threads', '2', '-preset', 'fast', '-qp', '0',
           '-pix_fmt', 'yuvj420p', '-color_range', 'pc', '-movflags', '+faststart',
           'lego/cache/r7_ig_D_IG_r2.mp4']
    run(cmd, 'preserve-profesional.log')
    simpan('qc/r7/ig/preserve-command.json', cmd)
    print('D_IG: f67–85 berasal dari R6, sisanya dari render R7, enkode lossless.')


def scoped_qc():
    start = round(76.3 * FPS) / FPS
    recipe = baca('lego/lego_r6.json')
    recipe['dasar'] = baca('lego/lego_r7_kamera.json')['dasar']
    luar_rentang = []
    # QC memakai override yang sama. Bentrok ID di luar rentang dilaporkan, tidak diedit.
    for path in sorted((ROOT / 'lego').glob('r7_override_*.json')):
        override = json.loads(path.read_text())
        for x in override.get('ganti', []):
            ids = [l['id'] for l in recipe['lapisan']]
            if x['id'] not in ids:
                if x['t'] < 72.2:
                    luar_rentang.append({'file': path.name, 'id': x['id'],
                        'masalah': 'ID sudah dibuang override sebelumnya; adegan sebelum E/IG'})
                    continue
                src = ROOT / 'lego' / x['src']
                akhir = x['t'] + float(probe(src)['format']['duration'])
                if akhir > start:
                    raise ValueError(f'{path.name}: konflik dalam rentang IG: {x["id"]}')
                luar_rentang.append({'file': path.name, 'id': x['id'], 'akhir': akhir,
                    'masalah': 'ID sudah dibuang override sebelumnya; di luar QC IG'})
                continue
            recipe['lapisan'][ids.index(x['id'])] = x
        buang = set(override.get('buang', []))
        recipe['lapisan'] = [l for l in recipe['lapisan'] if l['id'] not in buang]
        for x in override.get('tambah', []):
            ids = [l['id'] for l in recipe['lapisan']]
            pos = ids.index(x['sebelum']) if x.get('sebelum') in ids else len(ids)
            recipe['lapisan'].insert(pos, x)
    simpan('qc/r7/ig/integrasi.json', {'sumber': 'R6 + lego_r7_kamera + r7_override_*.json',
        'konflik_luar_rentang': luar_rentang,
        'catatan': 'Resep global r7_gabung.py tetap harus diperbaiki pemilik integrasi.' if luar_rentang else ''})
    end = round(sum(c['dur'] for c in recipe['dasar']) * FPS) / FPS
    plan = {k: copy.deepcopy(v) for k, v in recipe.items() if k not in ('dasar', 'lapisan')}
    plan.update(dasar=[], lapisan=[], audio=None, keluar='rakitan.mp4')
    cursor = 0
    for c in recipe['dasar']:
        a, b = max(cursor, start), min(cursor + c['dur'], end)
        if abs(b - end) < 0.0001:
            b = end
        if b > a:
            x = copy.deepcopy(c)
            # In sumber yang beberapa mikrodetik lewat kisi frame akan membuang satu frame saat -ss.
            native_in = round((c['in'] + a - cursor) * FPS) / FPS
            x.update(src=str((ROOT / 'lego' / c['src']).resolve()), dur=b - a,
                     **{'in': math.floor(native_in * 1e6) / 1e6})
            if 'kamera' in x:
                cam = x['kamera']
                za, zb = cam['zoom']
                def zoom(t):
                    p = (t - cursor) / c['dur']
                    q = p if cam.get('kurva') == 'linear' else 1 - (1 - p)**3 if cam.get('kurva') == 'land' else p*p*(3 - 2*p)
                    return za + (zb - za) * q
                cam['zoom'] = [zoom(a), zoom(b)]
            plan['dasar'].append(x)
        cursor += c['dur']
    for l in recipe['lapisan']:
        # Kontrak adegan E mulai 72,2; cache pekerja adegan sebelumnya tidak dibuka saat QC IG.
        if l['t'] < 72.2 or l['t'] >= end:
            continue
        src = (ROOT / 'lego' / l['src']).resolve()
        if l['t'] + float(probe(src)['format']['duration']) <= start:
            continue
        x = copy.deepcopy(l)
        x.update(src=str(src), t=l['t'] - start)
        plan['lapisan'].append(x)
    # compose menolak t negatif; T083 yang melintasi awal QC ditrim dahulu beserta geraknya.
    for x in plan['lapisan']:
        if x['t'] >= 0:
            continue
        cut = -x['t']
        out = QC / f'{x["id"]}-sisa.mov'
        run(['ffmpeg', '-y', '-v', 'error', '-threads', '2', '-ss', str(cut), '-i', x['src'],
             '-an', '-c:v', 'prores_ks', '-threads', '2', '-profile:v', '4',
             '-pix_fmt', 'yuva444p10le', str(out)], f'trim-{x["id"]}.log')
        def nilai(keys, t):
            for (ta, va), (tb, vb) in zip(keys, keys[1:]):
                if ta <= t < tb:
                    return va + (vb - va) * (t - ta) / (tb - ta)
            return keys[-1][1]
        for axis, keys in x.get('gerak', {}).items():
            x['gerak'][axis] = [[0, nilai(keys, cut)]] + [[t-cut, v] for t, v in keys if t > cut]
        x.update(src=str(out), t=0)
    simpan('qc/r7/ig/rakitan.json', plan)
    simpan('qc/r7/ig/qc-waktu.json', {'awal_diminta': 76.3, 'awal_frame': start,
        'awal_frame_global': round(start * FPS), 'akhir': end, 'fps': FPS})
    print(f'Resep QC R7 rentang IG: {start:.8f}–{end:.8f}, {len(plan["lapisan"])} lapisan; '
          f'{len(luar_rentang)} konflik di luar rentang, lihat integrasi.json.')


def verify():
    a = ROOT / 'lego/cache/D_IG_r6.mp4'
    b = ROOT / 'lego/cache/r7_ig_D_IG_r2.mp4'
    sums = []
    for p in (a, b):
        raw = subprocess.check_output(['ffmpeg', '-v', 'error', '-threads', '2', '-i', str(p),
            '-vf', 'trim=start_frame=67:end_frame=86,setpts=PTS-STARTPTS', '-an', '-f', 'framemd5', '-'])
        sums.append([line.split(',')[-1].strip() for line in raw.decode().splitlines() if not line.startswith('#')])
    assert len(sums[0]) == 19 and sums[0] == sums[1], 'PROFESIONAL berubah'
    info = probe(b)
    stream = info['streams'][0]
    assert int(stream['nb_frames']) == 223
    assert [stream['width'], stream['height']] == [1920, 1080]
    assert len(info['streams']) == 1
    basis = baca('qc/r7/ig/basis-hashes.json')
    for f in ['lego/lego_r6.json', 'lego/r7_gabung.py', 'teks.json',
              'remotion/public/video/matte-ig-r6.webm', 'lego/cache/D_IG_r6.mp4']:
        assert hashlib.sha256((ROOT / f).read_bytes()).hexdigest() == basis[f], f'{f} berubah'
    simpan('qc/r7/ig/verification.json', {'profesional_frame67_85': 'identik (19/19 framemd5)',
        'frame_md5_R6': sums[0], 'frame_md5_R7': sums[1], 'output_frames': 223,
        'dimensions': [1920, 1080], 'audio_streams': 0,
        'r6_recipe_matte_cache_dan_teks_asli': 'SHA256 identik',
        'output_sha256': hashlib.sha256(b.read_bytes()).hexdigest()})
    print('LULUS: 19/19 frame PROFESIONAL identik; 223 frame 1080p, tanpa audio; sumber terjaga.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('aksi', choices=['prepare', 'matte', 'preserve', 'qc', 'verify'])
    parser.add_argument('--patch-atau', action='store_true', help='Gunakan render tujuh frame koreksi T087 pada preserve')
    args = parser.parse_args()
    QC.mkdir(parents=True, exist_ok=True)
    if args.aksi == 'preserve':
        preserve(args.patch_atau)
    else:
        {'prepare': prepare, 'matte': matte, 'qc': scoped_qc, 'verify': verify}[args.aksi]()
