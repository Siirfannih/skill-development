#!/usr/bin/env python3
"""Frame-bound R7 SFX and two mixes, with locked voice and read-only input stems.

Run with ~/work/mg-venv/bin/python audio/r7_sfx.py [--plan-only] [--sheet] [--mux].
The camera push/contact and send/comment pairs are single, indivisible events.
"""
import argparse
import copy
import hashlib
import importlib.util
import json
import math
import re
import subprocess
import sys
sys.dont_write_bytecode = True
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy import signal
from scipy.ndimage import minimum_filter1d, uniform_filter1d

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'audio/r7'
LOG = OUT / 'logs/sfx'
STOCK = Path('/home/irfan/sfx/SFXIrfan')
SR, FPS = 48000, 30000 / 1001
VIDEO = ROOT / 'qc/r7/visual_r7_fin_ekor.mp4'
FRAMES = 2533
SAMPLES = round(FRAMES * 1001 / 30000 * SR)
BEFORE = LOG / 'r3/before'
B2_BEFORE = LOG / 'b2/before'
B3_BEFORE = LOG / 'b3/before'


def save(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')


def sha(path):
    with path.open('rb') as f:
        return hashlib.file_digest(f, 'sha256').hexdigest()


def pcm_sha(path):
    x, _ = sf.read(path, dtype='float32')
    return hashlib.sha256(x.tobytes()).hexdigest()


def db(x):
    return float(20 * np.log10(max(float(np.max(np.abs(x))), 1e-14)))


def read(path):
    x, sr = sf.read(path, dtype='float64')
    assert sr == SR, (path, sr)
    return x


def decode(path):
    r = subprocess.run(['ffmpeg', '-v', 'error', '-nostdin', '-threads', '1',
                        '-i', str(path), '-ac', '1', '-ar', str(SR),
                        '-f', 'f32le', '-'], capture_output=True, check=True)
    return np.frombuffer(r.stdout, np.float32).astype(np.float64)


def fade(x, attack=.002, release=.025):
    x = x.copy()
    a, b = min(len(x), round(attack * SR)), min(len(x), round(release * SR))
    if a: x[:a] *= np.linspace(0, 1, a) ** 2
    if b: x[-b:] *= np.linspace(1, 0, b) ** 2
    return x


def band(x, low, high):
    return signal.sosfilt(signal.butter(2, [low, high], 'bandpass', fs=SR, output='sos'), x)


def source_labels():
    labels = {}
    for path in (LOG / 'candidate_descriptions.json', LOG / 'keyboard_candidates.json', LOG / 'send_candidates.json'):
        labels.update({p: r['summary'] for p, r in json.loads(path.read_text()).items()})
    return labels


def make_assets(n):
    spec = importlib.util.spec_from_file_location('r6_readonly', ROOT / 'audio/r6_audio.py')
    old = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(old)
    original = json.loads((ROOT / 'audio/r6/cues_r6.json').read_text())
    clean = old.R4.__new__(old.R4)
    clean.gain, clean.roles, clean.files = np.ones(n, np.float32), old.r4_roles(), {}
    labels, assets = source_labels(), {}
    roles = {c['peran'] for c in original} - {'sapa', 'kertas', 'hitung', 'penutup', 'gelombang', 'ketik', 'kunci-slam'}
    for role in sorted(roles):
        cue = next(c for c in original if c['peran'] == role)
        source = ROOT / 'audio' / cue['file'] if cue['file'].startswith('r6/') else STOCK / cue['file']
        if role in clean.roles:
            _, x = clean.excerpt(dict(cue, t=10.0, dB=0))
        else:
            x = read(source)
        if role=='transisi-dunia':
            pk=int(np.argmax(np.abs(x)))
            x=fade(x[:pk+round(.25*SR)],.002,.080)
        if role in {'pesan','terverifikasi'}:
            length={'pesan':.20,'terverifikasi':.14}[role]
            x=decode(source);pk=int(np.argmax(np.abs(x[:SR])))
            x=fade(x[max(0,pk-round(.003*SR)):pk+round(length*SR)],.002,min(.055,length*.3))
        elif role in {'kata-hero','slop'}:
            length,release={'kata-hero':(.110,.045),'slop':(.140,.045)}[role]
            x=fade(x[:round(length*SR)],.002,release)
        assets[role] = dict(samples=x, source=source.resolve(), dengar=cue['dengar'],
                            edit='Sumber peran R6, normalisasi puncak; UI/pesan/hero/slop berekor pendek sesuai durasi aset yang tercatat.')

    def put(role, path, x, edit, label=None):
        assets[role] = dict(samples=x, source=path, edit=edit,
                           dengar=label or labels[str(path)])

    path = STOCK.parent / 'Kenyset/simple-whoosh-382724.mp3'
    put('transisi-dunia', path, fade(band(decode(path), 400, 2500), .008, .070),
        'Sapuan udara tengah 400–2500 Hz; mengganti cuplikan whoosh R6 yang lemah ketika dijumlah mono di HP.')
    path = STOCK.parent / 'Kenyset/confirm-tap-394001.mp3'
    x = band(decode(path), 300, 6500); pk = int(np.argmax(np.abs(x)))
    put('kirim', path, fade(x[max(0, pk-round(.008*SR)):pk+round(.085*SR)], .002, .030),
        'Satu pop/tap kirim 93 ms; decay 85 ms, tidak memakai sapuan kamera.')
    path = STOCK.parent / 'Kenyset/soft-pop-sfx-433612.mp3'
    x = decode(path)
    put('pop-chat', path, fade(band(x, 230, 6500), .002, .030),
        'Seluruh pop kering; HPF 230/LPF 6500 Hz dan ekor 30 ms. Aset sama untuk tiga bubble.')
    path = STOCK.parent / 'Kenyset/keyboard-typing-fast-371229.mp3'
    x = decode(path)
    # This source describes as a laptop keyboard. The iPhone-named candidate
    # was rejected because its strongest reading was a wooden block.
    put('ketik', path, fade(band(x[:round(1.65*SR)], 450, 8000), .002, .025),
        'Satu burst keyboard laptop tipis, dipotong menurut panjang episode ketik.')
    path = STOCK.parent / 'Kenyset/simple-whoosh-382724.mp3'
    x = band(decode(path), 180, 3200); pk = int(np.argmax(np.abs(x)))
    tail = x[pk:pk+round(.24*SR)]
    lead = tail[1:][::-1]
    lead = signal.resample(lead, round(.4004*SR))
    put('dorong-kontak', path, fade(np.r_[lead, tail], .040, .070),
        'Satu rekaman udara dengan body rendahnya; lead dibalik dan direntang 400,4 ms menuju kontak. Tidak melapis file hit.',
        'a fast whoosh (z +5.1), a swoosh passing by (z +3.5); satu take dengan kontak rendah di puncak')
    path = STOCK.parent / 'Kenyset/swoosh-014-383768.mp3'
    x = band(decode(path), 280, 3000); pk = int(np.argmax(np.abs(x)))
    lead_n = round(4 / FPS * SR)
    tail = x[pk:pk+round(.38*SR)]
    rate = .38 / (24 / FPS)
    cmd = ['ffmpeg','-v','error','-nostdin','-f','f32le','-ar',str(SR),'-ac','1','-i','pipe:0',
           '-af',f'atempo=0.5,atempo={rate/.5:.12f}','-f','f32le','pipe:1']
    stretched = subprocess.run(cmd,input=tail.astype(np.float32).tobytes(),capture_output=True,check=True)
    tail = signal.resample(np.frombuffer(stretched.stdout,np.float32), round(24 / FPS * SR))
    lead = x[pk:pk+lead_n+1][::-1][:-1]
    put('gelombang', path, fade(np.r_[lead, tail], .020, .120),
        'Sapuan udara stok; lead 4 frame menuju f1740. Decay 380 ms direntang dengan atempo 0,474525 lalu disesuaikan ke tepat 24 frame sampai f1764; release 120 ms. Jentikan tetap dari suara asli.')
    path = STOCK / 'Move.mp3'
    x = band(decode(path), 150, 3500); pk = int(np.argmax(np.abs(x[:SR])))
    put('punchline', path, fade(x[max(0,pk-96):pk+round(.18*SR)], .001, .070),
        'Satu hit langsung untuk kedua kanvas punchline; handle 2 ms, tanpa swell atau bunyi keluar.')
    path = STOCK.parent / 'Kenyset/swoosh-010-352856.mp3'
    x = signal.sosfilt(signal.butter(4,[450,4500],'bandpass',fs=SR,output='sos'),decode(path))
    pk = int(np.argmax(np.abs(x)))
    put('kirim-kaca', path, fade(x[max(0,pk-round(.035*SR)):pk+round(.130*SR)], .006, .065),
        'Satu sapuan kirim UI 165 ms dari stok swoosh; pita 450–4500 Hz, tanpa klik tambahan.',
        'Cuplikan sapuan udara stok; hasil analisis PCM ada di logs/sfx/b2/rendered_asset_descriptions.json.')
    path = STOCK / 'ES_User Interface, Glitch, Glitch Databend 04 - Epidemic Sound.mp3'
    x = band(decode(path), 350, 6000); pk = int(np.argmax(np.abs(x[:SR])))
    x = x[max(0,pk-round(.004*SR)):][:round(12/FPS*SR)]
    t = np.arange(len(x))/SR
    envelope = np.interp(t, [0,.004,.025,5/FPS,6/FPS,8/FPS,11/FPS,12/FPS],
                         [0,1,.60,.28,.24,.55,.28,0])
    put('chat-baru-grid', path, fade(x*envelope,.001,.015),
        'Satu take glitch 12 frame: transien klik pemicu, hapus 6 frame, lalu muncul 6 frame; satu gesture reset, tanpa layer klik kedua.',
        'a digital glitch (z +3.9), a stutter glitch transition (z +3.6); transien awal dan dua arah grid dari satu take')
    path = STOCK / 'Pergantianfoto.mp3'
    x = decode(path); pk = int(np.argmax(np.abs(x[:round(.3*SR)])))
    put('cut-wajah', path, fade(band(x[max(0,pk-96):pk+round(.08*SR)], 450, 8000)),
        'Satu klik cut 82 ms dari awal stok, untuk kembali dari bidang biru ke wajah.')
    path = STOCK.parent / 'Kenyset/immersivecontrol-button-click-sound-463065.mp3'
    put('hitung', path, fade(decode(path), .002, .020),
        'Rekaman tik penghitung R6; satu rangkaian per kartu, bukan KT per kata.',
        next(c['dengar'] for c in original if c['peran']=='hitung'))
    heard = json.loads((LOG/'rendered_asset_descriptions.json').read_text()) if (LOG/'rendered_asset_descriptions.json').exists() else {}
    b2_heard=LOG/'b2/rendered_asset_descriptions.json'
    if b2_heard.exists(): heard.update(json.loads(b2_heard.read_text()))
    metadata = {}
    for role, entry in assets.items():
        x = np.asarray(entry.pop('samples'), np.float64)
        x /= np.max(np.abs(x))
        p = OUT / 'sfx' / (role + '.wav')
        sf.write(p, x, SR, subtype='FLOAT')
        if role in heard and heard[role].get('asset_pcm_sha256')==pcm_sha(p):
            tags=heard[role]['top_tags']
            plausible=[t for t in tags if t['z']>=2.5]
            entry['dengar']='; '.join(f"{t['term']} (z {t['z']:+.2f})" for t in (plausible or tags[:1]))
        entry.update(file='r7/sfx/'+p.name, asset_pcm_sha256=pcm_sha(p), source=str(entry['source']),
                     source_sha256=sha(Path(entry['source'])), samples=len(x),
                     peak_offset_samples=int(np.argmax(np.abs(x))))
        metadata[role] = entry
    save(LOG / 'asset_sources.json', metadata)
    return metadata


def apply_b2(cues, assets):
    """Replace the retired app and bind changed events to inspected frames."""
    kept = []
    removed = []
    shifts = {
        1041: (1031, 'bridge-out', 'dorong menembus balasan kaca lalu wajah mendarat'),
        1126: (1122, 'workflow', 'WORKFLOW-NYA potong masuk utuh'),
        1274: (1269, 'balik', 'BALIK MODAL potong masuk utuh'),
        1717: (1708, 'lintas', 'LINTAS AGENT potong masuk utuh'),
        2357: (2355, 'profesional', 'PROFESIONAL: potong ke kanvas chartreuse'),
        2478: (2468, 'skill-gratis', 'SKILL GRATIS: potong ke kanvas biru'),
        2490: (2485, 'cut-wajah', 'potong dari SKILL GRATIS kembali ke wajah'),
    }
    for cue in cues:
        f = cue['frame']
        if 707 <= f < 1031 or f == 1305:
            removed.append(copy.deepcopy(cue))
            continue
        if f in shifts:
            frame, event, obj = shifts[f]
            cue.update(t=frame/FPS,frame=frame,frame_objek=frame,event_b2=event,
                       frame_sebelum_b2=f,objek=obj,status_r7='geser',
                       alasan='Mengikuti peristiwa pada master brief-r2 yang diperiksa frame demi frame.')
            if event == 'bridge-out': cue.update(start_frame=1021,accelerate=True)
            if event in {'profesional','skill-gratis'}:
                cue.update(peran='punchline',file=assets['punchline']['file'],
                           dengar=assets['punchline']['dengar'],dB=-8,status_r7='ganti')
        kept.append(cue)

    def add(frame, role, obj, event, gain=-10, **extra):
        kept.append(dict(t=frame/FPS,frame=frame,frame_objek=frame,peran=role,
                         file=assets[role]['file'],objek=obj,event_b2=event,dB=gain,
                         alasan='Satu cue untuk '+obj+'.',dengar=assets[role]['dengar'],
                         status_r7='baru',visual_file=str(VIDEO.relative_to(ROOT)),
                         fps='30000/1001',**extra))
    add(707,'transisi-dunia','dorong wajah dan blur lalu padang mendarat','bridge-in',
        start_frame=698,accelerate=True)
    add(770,'objek-mendarat','kartu MP4 masuk dan unggah sebagai satu aksi','upload',
        frame_objek_awal=769)
    add(840,'ketik','frasa Gunakan /apple-style untuk edit videoku.','type-apple',
        typing_windows_frames=[[840,848],[869,880]],
        alasan_frasa='Satu frasa dalam satu kolom; jeda menu dan pemilihan tetap sunyi di dalam episode.')
    add(848,'pop-chat','menu Template terbuka setelah slash','menu')
    add(868,'klik','pilih item /apple-style','select')
    add(917,'ketik','frasa Gunakan /cinematic-storytelling untuk edit videoku.','type-cine',
        typing_windows_frames=[[917,952]])
    add(978,'ketik','frasa Tonton videoku, lalu kamu yang tentukan gayanya.','type-reverse',
        typing_windows_frames=[[978,1003]])
    for frame, suffix in [(886,'apple'),(954,'cine'),(1006,'reverse')]:
        add(frame,'kirim-kaca','kirim pesan '+suffix,'send-'+suffix)
    for frame, suffix in [(894,'apple'),(959,'cine'),(1016,'reverse')]:
        add(frame,'pop-chat','balasan Claude '+suffix+' muncul','reply-'+suffix)
    for i, frame in enumerate([904,965],1):
        add(frame,'chat-baru-grid','klik Chat baru dan GRID hapus+muncul','reset-'+str(i),
            start_frame=frame,end_frame=frame+12,align_start=True,
            grouped_frames=[frame,frame+1],grid_phases_frames=[[frame,frame+6],[frame+6,frame+12]],
            group_reason='Klik dan awal wipe berjarak satu frame: satu gesture reset sesuai E24, satu file memuat transien dan kedua arah.')
    save(LOG/'b2/removed_cues.json',removed)
    return kept


def apply_b3(cues):
    """Retain the palette and bind only revised objects to their observed frames."""
    changes = {
        ('kinetik-cincin', 1152): (1155, 'publish', 'cincin publish pertama sesudah slab keluar', None),
        ('objek-mendarat', 1452): (1421, 'chatgpt-entry', 'kartu ChatGPT Pro masuk dengan angka 1×', None),
        ('hitung', 1458): (1443, 'chatgpt-count', 'angka kartu ChatGPT berubah dari 1× sampai 20×',
                         [1443, 1444, 1445, 1446, 1447, 1448, 1454]),
        ('hitung', 1517): (1511, 'claude-count', 'angka kartu Claude berubah dari 1× sampai 5×',
                         [1511, 1512, 1513, 1522]),
    }
    delta = []
    for cue in cues:
        change = changes.get((cue['peran'], cue['frame']))
        if change is None:
            continue
        prior = copy.deepcopy(cue)
        frame, event, obj, ticks = change
        cue.update(t=frame/FPS, frame=frame, frame_objek=frame, event_b3=event,
                   frame_sebelum_b3=prior['frame'], objek=obj, status_r7='geser',
                   alasan='Mengikuti objek revisi; narasi per kata tetap senyap.')
        if ticks is not None:
            cue['count_frames'] = ticks
            cue.pop('duration_s', None)
        delta.append(dict(before=prior, event=event, frame_after=frame, count_frames=ticks))
    save(LOG/'b3/cue_delta.json', delta)
    return cues


def plan(assets):
    original = json.loads((ROOT/'audio/r6/cues_r6.json').read_text())
    cues, removed = [], []
    remove_times = {3.11,5.938,7.033,8.575233333333333,9.442766666666666,
                    9.8098,25.091,43.532,50.72,57.919,58.324933333333334,
                    58.49176666666667,72.075,76.41,82.407,83.55,11.996}
    remove_roles = {'sapa','kinetik-cincin','kertas','gelombang','penutup'}
    def add(frame, role, obj, gain=-9, status='baru', old_time=None, **extra):
        a = assets[role]
        c = dict(t=frame/FPS,frame=frame,frame_objek=frame,peran=role,file=a['file'],
                 objek=obj,alasan='Satu bunyi untuk '+obj+'.',dengar=a['dengar'],dB=gain,
                 status_r7=status,visual_file=str(VIDEO.relative_to(ROOT)),fps='30000/1001',
                 terikat_ke_visual=[f'R7_f{frame}_{obj}'],**extra)
        if old_time is not None:c['t_r6']=old_time
        cues.append(c)
        return c
    for old in original:
        t,role=old['t'],old['peran']
        if role in remove_roles or any(abs(t-u)<.0001 for u in remove_times):
            removed.append(old);continue
        obj=old.get('objek') or (re.search(r'\[(.*?)\]',old['alasan']).group(1) if '[' in old['alasan'] else old['alasan'])
        gain={'transisi-dunia':-10,'kata-hero':-9,'objek-mendarat':-9,'pesan':-9,'klik':-10}.get(role,max(-10,min(-4,old['dB'])))
        c=add(round(t*FPS),role,obj,gain=gain,status='dipertahankan',old_time=t)
        if role=='transisi-dunia':c['status_r7']='ganti'
        if role=='ketik':c['duration_s']={28.929:.40,30.554:.66,32.601:.24,72.181:.32}.get(round(t,3),.4)
        if role=='hitung':c.update(count=20 if t<50 else 5,duration_s=.72)
        if abs(t-70.4036666667)<.0001:
            c.update(frame_objek=2110,alasan='Konfirmasi PASS: transien +2 frame dari kemunculan untuk menghindari konsonan dan menjaga suara asli.',offset_visual_frames=2)
        for old_t,frame in [(37.453,1126),(42.347,1274),(56.982,1717),(78.6786,2357),
                            (50.384,1501),(50.923,1517),
                            (70.4036666667,2112),(79.6128666667,2387),(80.1467333333,2403)]:
            if abs(t-old_t)<.0001:c.update(t=frame/FPS,frame=frame,frame_objek=frame,status_r7='geser')
    add(94,'terverifikasi','blok chartreuse SELESAI dan tanda sukses',-9,old_time=3.11,status='ganti')
    for fr,obj in [(259,'bubble WhatsApp ChatGPT'),(285,'bubble WhatsApp Clawd'),(297,'bubble WhatsApp Gemini')]:
        add(fr,'pop-chat',obj,-9)
    add(365,'objek-mendarat','slab DECISION dan tiga tokoh mendarat sebagai satu event kontak',-10)
    add(408,'transisi-dunia','sapuan keluar slab DECISION beserta ketiga tokoh',-10,start_frame=406,tail_s=.10)
    for fr,obj in [(130,'tangga pembuka pertama'),(315,'cincin decision pertama'),
                   (1152,'cincin publish pertama'),(1618,'cincin lintas pertama')]:
        add(fr,'kinetik-cincin',obj,-10)
    add(752,'ketik','template. muncul di kolom prompt',-10,old_time=25.091,status='ganti',duration_s=.18)
    add(1305,'objek-mendarat','pil biru habis banget',-10,old_time=43.532,status='ganti')
    add(1740,'gelombang','gelombang grid dari jentikan menuju UI Claude',-10,old_time=58.4917666667,status='geser',start_frame=1736,end_frame=1764)
    add(1760,'klik','tombol kirim di jendela Claude',-10,old_time=58.3249333333,status='geser')
    add(2160,'dorong-kontak','dorongan ke Clawd lalu kontak pendaratan di Blender',-10,start_frame=2148)
    add(2201,'kata-hero','FULL pada slab 100% FULL AI',-9)
    add(2215,'kata-hero','AI pada slab 100% FULL AI',-9)
    add(2290,'transisi-dunia','dorong ke pratinjau monitor lalu wajah penuh',-10,old_time=76.41,status='ganti',start_frame=2278)
    add(2383,'transisi-dunia','kamera mendekati panel komentar IG',-10,start_frame=2381)
    add(2424,'ketik','Skill diketik sebagai satu episode pendek',-10,duration_s=10/FPS,
        key_offsets_s=[0,2/FPS,5/FPS,7/FPS,10/FPS])
    add(2440,'kirim','kirim komentar dan komentar baru muncul dalam satu frame',-9,
        grouped_frames=[2440,2441],group_reason='Selisih satu frame: satu event kirim/pop sesuai E24.')
    add(2449,'pesan','balasan siirfannih muncul',-10)
    add(2464,'transisi-dunia','kamera meninggalkan komentar dan kembali ke bidang video',-10,start_frame=2460)
    add(2478,'punchline','GRATIS pada bidang biru: swell kecil dan hit tunggal',-9)
    add(2490,'cut-wajah','potong dari GRATIS kembali ke wajah',-10)
    cues=apply_b2(cues,assets)
    cues=apply_b3(cues)
    cues.sort(key=lambda c:c['t'])
    for i,c in enumerate(cues):
        c['id']=f'SFX-R7-{i+1:03}'
        c['terikat_ke_visual']=[f"R7_f{c['frame']}_{c['objek']}"]
    objects=[dict(t=c['frame_objek']/FPS,frame=c['frame_objek'],objek=c['objek'],peran=c['peran'],cue=c['id']) for c in cues]
    objects.extend([
        dict(t=286/FPS,frame=286,objek='Gemini bertumpu di kepala ChatGPT',senyap=True,
             alasan='Onset dua frame setelah bubble Clawd; pengenalan serentak ditanggung event bubble, tanpa pop tokoh tambahan.'),
        dict(t=297/FPS,frame=297,objek='titik mengetik Gemini berdenyut',senyap=True,alasan='Indikator mengetik senyap sesuai TASK; bukan klik per titik.'),
        dict(t=2441/FPS,frame=2441,objek='komentar Skill baru muncul',senyap=True,
             alasan='Terikat cue kirim f2440; beda satu frame, dihitung satu event E24.'),
        dict(t=2114/FPS,frame=2114,objek='Pelajaran tersimpan',senyap=True,alasan='Dekat konfirmasi PASS; ringkasan sengaja senyap sesuai R6.'),
        dict(t=310/FPS,frame=310,objek='bubble terakhir mengecil; seluruh bubble kosong f313',senyap=True,
             alasan='Pop-out satu pergantian fokus ke cincin f313; bunyi keluar opsional tidak ditambah agar tidak membentuk rentetan.'),
        dict(t=2110/FPS,frame=2110,objek='kamera baca kembali ke bidang jendela saat Selesai',senyap=True,
             alasan='Konfirmasi PASS dan perubahan baris sudah berbunyi; swoosh mundur opsional tidak ditambah.'),
        dict(t=2374/FPS,frame=2374,objek='narasi nggak?',senyap=True,alasan='Narasi kata per kata senyap, sesuai TASK-R7-sfx-r3.'),
        dict(t=2387/FPS,frame=2387,objek='narasi masih kerasa AI?',senyap=True,alasan='Narasi senyap; pop pada frame ini milik komentar UI, bukan kata narasi.'),
        dict(t=2512/FPS,frame=2512,objek='tahan narasi yang / beruntung. di dinding sampai f2532',senyap=True,
             alasan='Narasi gelombang tanpa objek baru mendarat; hanya musik berlanjut pada ekor.'),
        dict(t=1442/FPS,frame=1442,objek='narasi Max yang tanpa pil',senyap=True,
             alasan='Wadah dihapus; narasi per kata tidak mendapat cue.'),
        dict(t=2455/FPS,frame=2455,objek='narasi aku di ruang putih atas thread IG',senyap=True,
             alasan='Hanya posisi narasi berubah; ketik/kirim/balasan tetap terikat objek UI.'),
    ])
    timing=json.loads((ROOT/'qc/r7/ktwajah/b2/strips.json').read_text())
    for item in timing:
        if item['id'] in {'T051','T057','T077'}:continue
        frame=1155 if item['id']=='T052' else item['frame']
        objects.append(dict(t=frame/FPS,frame=frame,objek=item['id']+' '+item['text'],
                            senyap=True,alasan='KT narasi kata per kata senyap; cue kelompok hanya pada bentuk pertama.'))
    ui_timing=json.loads((ROOT/'qc/r7/ui/b2/motion_index.json').read_text())
    for item in ui_timing:
        if item['cue'] in {'T004','T081'}:continue
        frame=item['global_frames'][0]
        objects.append(dict(t=frame/FPS,frame=frame,objek=item['cue']+' '+item['word'],senyap=True,
                            alasan='Narasi repo/meja per kata senyap, sesuai brief-r2.'))
    for frame,obj in [(1305,'narasi Ini habis banget tanpa pil'),(916,'MP4 dipulihkan setelah reset pertama'),
                      (977,'MP4 dipulihkan setelah reset kedua')]:
        objects.append(dict(t=frame/FPS,frame=frame,objek=obj,senyap=True,
                            alasan='Narasi dan pemulihan isi chat tetap senyap; tidak ada aksi unggah baru setelah reset.'))
    save(OUT/'cues_r7.json',cues)
    save(OUT/'objects_r7.json',sorted(objects,key=lambda x:x['t']))
    save(LOG/'removed_r6.json',removed)
    return cues


def pieces(cues, assets, n):
    rendered = []
    for c in cues:
        x = read(ROOT/'audio'/c['file'])
        if c['peran']=='hitung' and 'count_frames' in c:
            pk=int(np.argmax(np.abs(x)))
            tick=fade(x[max(0,pk-round(.002*SR)):pk+round(.018*SR)],.001,.010)
            offsets=[round((f-c['frame'])/FPS*SR) for f in c['count_frames']]
            x=np.zeros(offsets[-1]+len(tick))
            for offset in offsets:
                x[offset:offset+len(tick)]+=tick
            c['tick_offsets_s']=[offset/SR for offset in offsets]
            c.update(mode='episode',episode_frames=[c['frame'],c['count_frames'][-1]+1])
        elif c['peran']=='hitung':
            pk=int(np.argmax(np.abs(x)))
            tick=fade(x[max(0,pk-round(.002*SR)):pk+round(.018*SR)],.001,.010)
            def ease(p):
                lo,hi=0.,1.
                for _ in range(35):
                    m=(lo+hi)/2
                    u=3*(1-m)**2*m*.22+3*(1-m)*m*m*.36+m**3
                    if u<p:lo=m
                    else:hi=m
                return 1-(1-(lo+hi)/2)**3
            previous, steps = 1, []
            for f in range(23):
                value=round(1+(c['count']-1)*ease(f/22))
                if value>previous:steps.append(f/30);previous=value
            x=np.zeros(round(.8*SR))
            for t in steps:
                i=round((t-steps[0])*SR)
                x[i:i+len(tick)]+=tick
            c['tick_offsets_s']=[round(t-steps[0],6) for t in steps]
        elif 'key_offsets_s' in c:
            pk=int(np.argmax(np.abs(x[:round(.08*SR)])))
            key=fade(x[max(0,pk-round(.002*SR)):pk+round(.018*SR)],.001,.008)
            x=np.zeros(round((c['key_offsets_s'][-1]+.024)*SR))
            for offset in c['key_offsets_s']:
                i=round(offset*SR)
                x[i:i+len(key)]+=key
        elif 'typing_windows_frames' in c:
            windows=c['typing_windows_frames']
            source=x.copy()
            x=np.zeros(round((windows[-1][1]-windows[0][0])/FPS*SR))
            for i,(a,b) in enumerate(windows):
                count=round((b-a)/FPS*SR)
                burst=fade(source[:count],.002,.025)
                offset=round((a-windows[0][0])/FPS*SR)
                x[offset:offset+len(burst)]+=burst*(1 if i==0 else .72)
        elif c['peran']=='transisi-dunia' and 'start_frame' in c:
            pk=int(np.argmax(np.abs(x)))
            pre=round((c['frame']-c['start_frame'])/FPS*SR)
            if pre<pk:
                x=x[pk-pre:]
            else:
                x=np.r_[signal.resample(x[:pk],pre),x[pk:]]
            if c.get('accelerate'):
                x[:pre]*=np.linspace(0,1,pre)**1.8
            x=fade(x[:pre+round(c.get('tail_s',.20)*SR)],.006,.060)
        elif 'duration_s' in c:
            x=fade(x[:round(c['duration_s']*SR)],.002,.025)
        if c['peran']=='ketik':
            peak=int(np.argmax(np.abs(x[:round(.080*SR)])))
            c.update(mode='episode',episode_frames=[c['frame'],round((c['t']+len(x)/SR)*FPS)])
        else:
            peak=int(np.argmax(np.abs(x)))
        x/=np.max(np.abs(x))
        x*=10**(c['dB']/20)
        start=round(c['t']*SR) if c.get('align_start') else round(c['t']*SR)-peak
        if start<0:
            x=fade(x[-start:],.002,0);start=0
            x=x/np.max(np.abs(x))*10**(c['dB']/20)
        x=x[:n-start]
        c.update(start_s=start/SR,offset_puncak_s=peak/SR,duration_render_s=len(x)/SR,
                 puncak_sfx_s=(start+int(np.argmax(np.abs(x))))/SR)
        c['frame_puncak_sfx']=round(c['puncak_sfx_s']*FPS)
        rendered.append((start,x,c))
    return rendered


def sum_pieces(rendered,n):
    fx=np.zeros((n,2),np.float64)
    for start,x,c in rendered:
        fx[start:start+len(x)]+=x[:,None]
    return fx


def peak_guard(voice, musics, fx, target=-1.15):
    """Only attenuate music/SFX; solve both sums against oversampled locked VO."""
    n=len(voice);gain=np.ones(n)
    v4=signal.resample_poly(voice,4,1)
    limit=10**(target/20)
    rows=[]
    for attempt in range(10):
        upper=np.ones(n)
        peaks={}
        for name,music in musics.items():
            bed4=signal.resample_poly((music+fx)*gain[:,None],4,1,axis=0)
            total=v4[:,None]+bed4
            peaks[name]=db(total)
            bounds=np.ones_like(bed4)
            np.divide(np.where(bed4>=0,limit-v4[:,None],-limit-v4[:,None]),bed4,
                      out=bounds,where=np.abs(bed4)>1e-15)
            bound=np.clip(bounds,0,1).min(1).reshape(n,4).min(1)
            upper=np.minimum(upper,bound)
        rows.append(dict(iteration=attempt,peaks_4x_dbfs=peaks,min_gain_db=db(np.min(gain))))
        if max(peaks.values())<=target+.001:break
        envelope=minimum_filter1d(upper,size=round(.028*SR)|1,mode='nearest')
        envelope=uniform_filter1d(envelope,size=round(.008*SR)|1,mode='nearest')
        gain*=envelope
    else:raise RuntimeError('Music/SFX-only true peak guard did not converge')
    # Record the automation as sparse 1 ms knots, including every local minimum.
    knots=[]
    for i in range(0,n,48):
        value=float(np.min(gain[i:i+48]))
        if value<.999999:knots.append([i/SR,round(20*np.log10(max(value,1e-12)),6)])
    save(LOG/'peak_automation.json',dict(target_dbtp=target,voice_gain=1.0,
         bus='music and SFX only; common SFX envelope for both variants',iterations=rows,
         min_gain_db=float(20*np.log10(max(np.min(gain),1e-12))),
         affected_ms=len(knots),knots_ms_db=knots))
    return gain


def ebur(path,name):
    r=subprocess.run(['ffmpeg','-hide_banner','-nostats','-threads','1','-i',str(path),
                      '-af','ebur128=peak=true:framelog=verbose','-f','null','-'],capture_output=True,text=True,check=True)
    (LOG/(name+'.log')).write_text(r.stderr)
    loud=float(re.findall(r'I:\s+(-?[0-9.]+) LUFS',r.stderr)[-1])
    tp=float(re.findall(r'Peak:\s+(-?[0-9.]+) dBFS',r.stderr)[-1])
    return dict(lufs=loud,true_peak_dbtp=tp)


def extend_music(voice):
    """Continue each comparison's recording; only the final 0.6 s leaves to zero."""
    old_n = sf.info(ROOT/'audio/stem_suara.wav').frames
    duration = SAMPLES / SR
    times = np.arange(SAMPLES) / SR
    result = {name: np.pad(read(BEFORE/f'audio/r7/logs/sfx/music_used_{name}.wav'),
                          ((0, SAMPLES-old_n), (0, 0)))
              for name in ('bgmbaru', 'bgmlama')}
    spec = importlib.util.spec_from_file_location('r7_music_readonly', ROOT/'audio/r7_bgm.py')
    bgm = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(bgm)
    arrangement = json.loads((OUT/'arrangement.json').read_text())
    part = arrangement['parts'][-1]
    row = next(r for r in json.loads((OUT/'candidates.json').read_text()) if r['id']=='relax')
    source = Path(row['source'])
    if not source.exists(): source = OUT/'r2/sources'/source.name
    if sha(source) != row['sha256']: raise RuntimeError('Relax source hash changed')
    left = part['start'] - .045
    i = round(left*SR)
    raw = bgm.decode(source, part['source_start']-.045, duration-left+.08)[:SAMPLES-i]
    raw *= 10**((-27.5-part['source_lufs']+arrangement['act_gain_knots_s_db'][-1][1])/20)
    hop = round(.01*SR)
    grid = np.arange(0, SAMPLES, hop)
    rms = np.array([np.sqrt(np.mean(voice[j:j+hop]**2)) for j in grid])
    smooth = np.convolve((rms>10**(-42/20)).astype(float), np.ones(51)/51, mode='same')
    raw *= (10**(np.interp(times[i:], grid/SR, -1.5*smooth)/20))[:,None]
    new = result['bgmbaru']
    stem = read(OUT/'stem_musik_r7.wav')
    old_taper = np.clip((times[:old_n]-82.65)/(old_n/SR-82.65), 0, 1)*-27
    continued = stem * (10**(-old_taper/20))[:,None]
    a, b = round(82.65*SR), round(82.695*SR)
    blend = np.linspace(0, 1, b-a)[:,None]
    new[a:b] = new[a:b]*(1-blend)+continued[a:b]*blend
    new[b:old_n] = continued[b:]
    new[old_n:] = raw[old_n-i:]
    join_error = float(np.max(np.abs(continued[-4800:]-raw[old_n-i-4800:old_n-i])))
    a = old_n-round(.045*SR)
    blend = np.linspace(0,1,old_n-a)[:,None]
    new[a:old_n] = continued[a:]*(1-blend)+raw[a-i:old_n-i]*blend

    # The old comparison ends in Aware. Keep its source and the level at the join.
    source_old = ROOT/'musik/sumber/aware.wav'
    push = next(o['t'] for o in json.loads((ROOT/'objects.json').read_text()) if o['lapisan']=='D_RELAY')
    start = 82.65
    source_start = 30.16 + start - push
    old_eq = 'highpass=f=90,equalizer=f=1000:t=q:w=0.8:g=-3,equalizer=f=2800:t=q:w=1:g=-3.5'
    cmd = ['ffmpeg','-v','error','-nostdin','-threads','1','-ss',str(source_start-.5),
           '-i',str(source_old),'-t',str(duration-start+.6),'-af',old_eq,
           '-ar',str(SR),'-ac','2','-f','f32le','-']
    raw_old = np.frombuffer(subprocess.check_output(cmd),np.float32).reshape(-1,2).astype(np.float64)
    raw_old = raw_old[round(.5*SR):round(.5*SR)+SAMPLES-round(start*SR)]
    old = result['bgmlama']
    a, b = round(start*SR), round((start+.15)*SR)
    old_level = np.sqrt(np.mean(old[a:b]**2))
    source_level = np.sqrt(np.mean(raw_old[:b-a]**2))
    raw_old *= old_level/source_level
    blend = np.linspace(0,1,b-a)[:,None]
    old[a:b] = old[a:b]*(1-blend)+raw_old[:b-a]*blend
    old[b:] = raw_old[b-a:]

    # Same leave Bezier as the visual curve: (0.55, 0, 0.9, 0.35).
    u = np.clip((times-(duration-.6))/.6,0,1)
    lo, hi = np.zeros(SAMPLES), np.ones(SAMPLES)
    for _ in range(28):
        q = (lo+hi)/2
        bx = 3*(1-q)**2*q*.55 + 3*(1-q)*q*q*.9 + q**3
        lo = np.where(bx<u,q,lo); hi = np.where(bx>=u,q,hi)
    q = (lo+hi)/2
    leave = 1-(3*(1-q)*q*q*.35+q**3)
    leave[times<duration-.6] = 1
    leave[-1] = 0
    for music in result.values(): music *= leave[:,None]
    save(LOG/'r3/music_tail.json',dict(ledger='D-473 #14b',samples=SAMPLES,duration_s=duration,
         voice_end_s=old_n/SR,leave_start_s=duration-.6,leave_duration_s=.6,leave_curve=[.55,0,.9,.35],
         bgmbaru=dict(track='Relax',source=str(source),source_sha256=sha(source),
                      continuation_source_end_s=part['source_start']+duration-part['start'],
                      boundary_reconstruction_max_error=join_error,boundary_crossfade_s=.045),
         bgmlama=dict(track='Aware',source=str(source_old),source_sha256=sha(source_old),
                      source_start_s=source_start,crossfade_s=.15,gain_to_join=float(old_level/source_level))))
    return result


def guard_music(voice, fx, music, target=-1.10):
    base4 = signal.resample_poly(voice[:,None]+fx,4,1,axis=0)
    limit = 10**(target/20)
    if np.max(np.abs(base4))>=limit:
        raise RuntimeError('Locked voice/SFX alone exceed the music-only ceiling')
    gain = np.ones(len(voice))
    iterations = []
    for attempt in range(10):
        bed4 = signal.resample_poly(music*gain[:,None],4,1,axis=0)
        peak = db(base4+bed4)
        iterations.append(dict(iteration=attempt,true_peak_4x_dbfs=peak))
        if peak<=target+.001: break
        bounds = np.ones_like(bed4)
        np.divide(np.where(bed4>=0,limit-base4,-limit-base4),bed4,
                  out=bounds,where=np.abs(bed4)>1e-15)
        upper = np.clip(bounds,0,1).min(1).reshape(len(voice),4).min(1)
        env = minimum_filter1d(upper,size=round(.028*SR)|1,mode='nearest')
        gain *= uniform_filter1d(env,size=round(.008*SR)|1,mode='nearest')
    else: raise RuntimeError('Music-only true peak guard did not converge')
    return gain, iterations


def guard_sfx_fixed_music(voice, musics, fx, target=-1.10):
    """Keep both delivered music beds and VO fixed; attenuate only SFX if needed."""
    n=len(voice)
    bases={name:signal.resample_poly(voice[:,None]+music,4,1,axis=0)
           for name,music in musics.items()}
    limit=10**(target/20)
    gain=np.ones(n)
    rows=[]
    for attempt in range(10):
        fx4=signal.resample_poly(fx*gain[:,None],4,1,axis=0)
        peaks={name:db(base+fx4) for name,base in bases.items()}
        rows.append(dict(iteration=attempt,peaks_4x_dbfs=peaks))
        if max(peaks.values())<=target+.001:
            break
        upper=np.ones(n)
        for base in bases.values():
            bounds=np.ones_like(fx4)
            np.divide(np.where(fx4>=0,limit-base,-limit-base),fx4,
                      out=bounds,where=np.abs(fx4)>1e-15)
            upper=np.minimum(upper,np.clip(bounds,0,1).min(1).reshape(n,4).min(1))
        env=minimum_filter1d(upper,size=round(.028*SR)|1,mode='nearest')
        gain*=uniform_filter1d(env,size=round(.008*SR)|1,mode='nearest')
    else:
        raise RuntimeError('SFX-only guard cannot satisfy the fixed music/voice ceiling')
    save(LOG/'b3/sfx_peak_guard.json',dict(target_dbtp=target,voice_gain=1.0,music_gain=1.0,
         bus='SFX only',iterations=rows,min_gain_db=db(np.min(gain)),
         affected_samples=int(np.count_nonzero(gain<.999999))))
    return gain


def build(cues,assets):
    original_voice=read(ROOT/'audio/stem_suara.wav')
    voice=np.pad(original_voice,(0,SAMPLES-len(original_voice)))
    musics={name:read(B3_BEFORE/f'audio/r7/logs/sfx/music_used_{name}.wav')
            for name in ('bgmbaru','bgmlama')}
    n=SAMPLES
    rendered=pieces(cues,assets,n)
    raw_fx=sum_pieces(rendered,n)
    old_cues=json.loads((B3_BEFORE/'audio/r7/cues_r7.json').read_text())
    for c in old_cues: c['file']=str(B3_BEFORE/'audio'/c['file'])
    old_raw=sum_pieces(pieces(old_cues,{},n),n)
    old_fx=read(B3_BEFORE/'audio/r7/stem_sfx_r7.wav')
    inherited_gain=np.ones(n)
    active=np.abs(old_raw[:,0])>1e-7
    inherited_gain[active]=np.clip(old_fx[active,0]/old_raw[active,0],0,1)
    fx=old_fx+(raw_fx-old_raw)*inherited_gain[:,None]
    gain=guard_sfx_fixed_music(voice,musics,fx)
    fx=(fx*gain[:,None]).astype(np.float32)
    sf.write(OUT/'stem_sfx_r7.wav',fx,SR,subtype='FLOAT')
    for start,x,c in rendered:
        y=x*inherited_gain[start:start+len(x)]*gain[start:start+len(x)]
        c['puncak_efektif_dbfs']=db(y)
        c['puncak_sfx_s']=(start+int(np.argmax(np.abs(y))))/SR
        c['frame_puncak_sfx']=round(c['puncak_sfx_s']*FPS)
        c['otomasi_gain_min_db']=float(20*np.log10(max(np.min(gain[start:start+len(x)]),1e-12)))
    save(OUT/'cues_r7.json',cues)
    sf.write(LOG/'voice_stereo_locked.wav',np.repeat(voice[:,None],2,axis=1),SR,subtype='FLOAT')
    reports={}
    for name,source in musics.items():
        music=source.astype(np.float32)
        path=OUT/('mix_final_'+name+'.wav')
        mix=(voice[:,None]+fx.astype(np.float64)+music.astype(np.float64)).astype(np.float32)
        sf.write(path,mix,SR,subtype='FLOAT')
        sf.write(LOG/('music_used_'+name+'.wav'),music,SR,subtype='FLOAT')
        recovered=mix.astype(np.float64)-fx.astype(np.float64)-music.astype(np.float64)
        sf.write(LOG/('voice_recovered_'+name+'.wav'),recovered,SR,subtype='FLOAT')
        reports[name]=dict(samples=n,duration_s=n/SR,channels=2,sample_rate=SR,
            sample_peak_dbfs=db(mix),voice_gain=1.0,master_processing=False,
            music_pcm_identical_to_b3_baseline=pcm_sha(B3_BEFORE/f'audio/r7/logs/sfx/music_used_{name}.wav')==pcm_sha(LOG/f'music_used_{name}.wav'),
            voice_recovery_max_error=float(np.max(np.abs(recovered-voice[:,None]))),
            voice_fit_gain=float(np.dot(recovered[:,0],voice)/np.dot(voice,voice)),
            **ebur(path,'ebur_'+name))
    save(LOG/'mix_checks.json',reports)
    return reports


def mix_bgm_only():
    """Keep the delivered SFX and old mix intact; guard only replacement music."""
    voice=read(ROOT/'audio/stem_suara.wav')
    voice=np.pad(voice,(0,SAMPLES-len(voice)))
    fx=read(OUT/'stem_sfx_r7.wav')
    music=extend_music(voice)['bgmbaru']
    n=len(voice)
    assert music.shape==fx.shape==(n,2)
    base=voice[:,None]+fx
    base4=signal.resample_poly(base,4,1,axis=0)
    target=-1.10
    limit=10**(target/20)
    if np.max(np.abs(base4))>=limit:
        raise RuntimeError('Locked voice/SFX alone exceed the music-only guard ceiling')
    gain=np.ones(n)
    iterations=[]
    for attempt in range(10):
        bed4=signal.resample_poly(music*gain[:,None],4,1,axis=0)
        peak=db(base4+bed4)
        iterations.append(dict(iteration=attempt,true_peak_4x_dbfs=peak))
        if peak<=target+.001:break
        bounds=np.ones_like(bed4)
        np.divide(np.where(bed4>=0,limit-base4,-limit-base4),bed4,
                  out=bounds,where=np.abs(bed4)>1e-15)
        upper=np.clip(bounds,0,1).min(1).reshape(n,4).min(1)
        envelope=minimum_filter1d(upper,size=round(.028*SR)|1,mode='nearest')
        envelope=uniform_filter1d(envelope,size=round(.008*SR)|1,mode='nearest')
        gain*=envelope
    else:raise RuntimeError('Music-only true peak guard did not converge')
    music=(music*gain[:,None]).astype(np.float32)
    mix=(base+music.astype(np.float64)).astype(np.float32)
    sf.write(OUT/'mix_final_bgmbaru.wav',mix,SR,subtype='FLOAT')
    sf.write(LOG/'music_used_bgmbaru.wav',music,SR,subtype='FLOAT')
    recovered=mix.astype(np.float64)-fx-music.astype(np.float64)
    sf.write(LOG/'voice_recovered_bgmbaru.wav',recovered,SR,subtype='FLOAT')
    report=dict(task='TASK-R7-bgm-r2',voice_gain=1.0,sfx_gain=1.0,
                master_processing=False,target_dbtp=target,iterations=iterations,
                music_min_gain_db=float(20*np.log10(max(gain.min(),1e-12))),
                affected_ms=int(np.count_nonzero(gain<.999999)/SR*1000),
                sample_peak_dbfs=db(mix),samples=n,sample_rate=SR,channels=2,
                voice_recovery_max_error=float(np.max(np.abs(recovered-voice[:,None]))),
                **ebur(OUT/'mix_final_bgmbaru.wav','ebur_bgmbaru'))
    save(OUT/'r2/mix_checks.json',report)
    return report


def sheet(cues):
    import cv2
    from PIL import Image,ImageDraw,ImageFont
    rows=[c for c in cues if c['status_r7']!='dipertahankan']
    targets={c['frame_puncak_sfx'] for c in rows}
    cap=cv2.VideoCapture(str(VIDEO));images={};f=0
    while True:
        ok,bgr=cap.read()
        if not ok:break
        if f in targets:
            images[f]=Image.fromarray(cv2.cvtColor(bgr,cv2.COLOR_BGR2RGB)).resize((640,360),Image.Resampling.LANCZOS)
        f+=1
    cap.release()
    font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',17)
    canvas=Image.new('RGB',(1920,math.ceil(len(rows)/3)*416),'#101219');d=ImageDraw.Draw(canvas)
    for i,c in enumerate(rows):
        x,y=(i%3)*640,(i//3)*416
        canvas.paste(images[c['frame_puncak_sfx']],(x,y))
        d.text((x+8,y+366),f"{c['id']}  f{c['frame_puncak_sfx']}  {c['puncak_sfx_s']:.6f}s  {c['peran']}",font=font,fill='white')
        d.text((x+8,y+391),c['objek'][:61],font=font,fill='#a8d8ff')
    canvas.save(OUT/'cek_cue_r7.jpg',quality=91)
    for i in range(math.ceil(len(rows)/6)):
        canvas.crop((0,i*832,1920,min(canvas.height,(i+1)*832))).save(OUT/f'cek_cue_r7_{i+1:02}.jpg',quality=92)
    save(LOG/'sheet_manifest.json',dict(video_sha256=sha(VIDEO),rows=rows,decoded_frames=f))


def mux(names=('bgmbaru','bgmlama')):
    commands=[]
    for name in names:
        cmd=['ffmpeg','-v','error','-y','-nostdin','-threads','1','-i',str(VIDEO),
             '-i',str(OUT/('mix_final_'+name+'.wav')),'-map','0:v:0','-map','1:a:0',
             '-c:v','copy','-c:a','aac','-b:a','320k','-ar',str(SR),'-movflags','+faststart',
             str(OUT/('cek_final_'+name+'.mp4'))]
        subprocess.run(cmd,check=True);commands.append(cmd)
    save(LOG/('mux_bgm_only.json' if len(names)==1 else 'mux_commands.json'),commands)


if __name__=='__main__':
    ap=argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--plan-only',action='store_true')
    ap.add_argument('--sheet',action='store_true')
    ap.add_argument('--mux',action='store_true')
    ap.add_argument('--mix-bgm-only',action='store_true',
                    help='Mix replacement BGM with delivered SFX, preserving the old mix byte-for-byte')
    args=ap.parse_args()
    LOG.mkdir(parents=True,exist_ok=True);(OUT/'sfx').mkdir(exist_ok=True)
    if args.mix_bgm_only:
        print(json.dumps(mix_bgm_only(),indent=2),flush=True)
        if args.mux:mux(('bgmbaru',))
        raise SystemExit(0)
    assets=make_assets(sf.info(ROOT/'audio/stem_suara.wav').frames)
    cues=plan(assets)
    print(len(cues),'cue; plan and assets written',flush=True)
    if not args.plan_only:
        print(json.dumps(build(cues,assets),indent=2),flush=True)
        if args.sheet:sheet(cues)
        if args.mux:mux()
