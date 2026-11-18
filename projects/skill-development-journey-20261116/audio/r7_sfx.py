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
VIDEO = ROOT / 'qc/r7/visual_r7_fin.mp4'


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
    lead = x[pk:pk+lead_n+1][::-1][:-1]
    put('gelombang', path, fade(np.r_[lead, tail], .020, .080),
        'Sapuan udara stok; lead dibalik 4 frame, puncak di f1740, ekor 380 ms. Jentikan tetap dari suara asli.')
    path = STOCK / 'Move.mp3'
    x = band(decode(path), 150, 3500); pk = int(np.argmax(np.abs(x[:SR])))
    tail = x[pk:pk+round(.27*SR)]
    lead = tail[1:round(.16*SR)+1][::-1]
    put('punchline', path, fade(np.r_[lead, tail], .025, .090),
        'Satu potongan hit stok dengan lead terbalik 160 ms; swell dan hit satu file, tanpa layering.')
    path = STOCK / 'Pergantianfoto.mp3'
    x = decode(path); pk = int(np.argmax(np.abs(x[:round(.3*SR)])))
    put('cut-wajah', path, fade(band(x[max(0,pk-96):pk+round(.08*SR)], 450, 8000)),
        'Satu klik cut 82 ms dari awal stok, untuk kembali dari bidang biru ke wajah.')
    path = STOCK.parent / 'Kenyset/immersivecontrol-button-click-sound-463065.mp3'
    put('hitung', path, fade(decode(path), .002, .020),
        'Rekaman tik penghitung R6; satu rangkaian per kartu, bukan KT per kata.',
        next(c['dengar'] for c in original if c['peran']=='hitung'))
    heard = json.loads((LOG/'rendered_asset_descriptions.json').read_text()) if (LOG/'rendered_asset_descriptions.json').exists() else {}
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
                 status_r7=status,visual_file='qc/r7/visual_r7_fin.mp4',fps='30000/1001',
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
                            (70.4036666667,2112),(79.6128666667,2387),(80.1467333333,2403)]:
            if abs(t-old_t)<.0001:c.update(t=frame/FPS,frame=frame,frame_objek=frame,status_r7='geser')
    add(94,'terverifikasi','blok chartreuse SELESAI dan tanda sukses',-9,old_time=3.11,status='ganti')
    for fr,obj in [(263,'bubble WhatsApp ChatGPT'),(289,'bubble WhatsApp Clawd'),(300,'bubble WhatsApp Gemini')]:
        add(fr,'pop-chat',obj,-9)
    add(365,'objek-mendarat','slab DECISION dan tiga tokoh mendarat sebagai satu event kontak',-10)
    add(408,'transisi-dunia','sapuan keluar slab DECISION beserta ketiga tokoh',-10,start_frame=406,tail_s=.10)
    for fr,obj in [(130,'tangga pembuka pertama'),(315,'cincin decision pertama'),
                   (1148,'cincin publish pertama'),(1618,'cincin lintas pertama')]:
        add(fr,'kinetik-cincin',obj,-10)
    add(752,'ketik','template. muncul di kolom prompt',-10,old_time=25.091,status='ganti',duration_s=.18)
    add(1305,'objek-mendarat','pil biru habis banget',-10,old_time=43.532,status='ganti')
    add(1740,'gelombang','gelombang grid dari jentikan menuju UI Claude',-10,old_time=58.4917666667,status='geser',start_frame=1736)
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
    cues.sort(key=lambda c:c['t'])
    for i,c in enumerate(cues):
        c['id']=f'SFX-R7-{i+1:03}'
        c['terikat_ke_visual']=[f"R7_f{c['frame']}_{c['objek']}"]
    objects=[dict(t=c['frame_objek']/FPS,frame=c['frame_objek'],objek=c['objek'],peran=c['peran'],cue=c['id']) for c in cues]
    objects.extend([
        dict(t=2471/FPS,frame=2471,objek='label kecil SKILL',senyap=True,alasan='Label pengantar kecil; tidak lagi kata slam, jadi mengikuti aturan KT senyap.'),
        dict(t=286/FPS,frame=286,objek='Gemini bertumpu di kepala ChatGPT',senyap=True,
             alasan='Onset dua frame setelah bubble Clawd; pengenalan serentak ditanggung event bubble, tanpa pop tokoh tambahan.'),
        dict(t=301/FPS,frame=301,objek='titik mengetik Gemini berdenyut',senyap=True,alasan='Indikator mengetik senyap sesuai TASK; bukan klik per titik.'),
        dict(t=2441/FPS,frame=2441,objek='komentar Skill baru muncul',senyap=True,
             alasan='Terikat cue kirim f2440; beda satu frame, dihitung satu event E24.'),
        dict(t=2114/FPS,frame=2114,objek='Pelajaran tersimpan',senyap=True,alasan='Dekat konfirmasi PASS; ringkasan sengaja senyap sesuai R6.'),
    ])
    timing=json.loads((ROOT/'qc/r7/ktwajah/timing.json').read_text())
    for item in timing:
        if item['bentuk']=='Pil':continue
        objects.append(dict(t=item['on_render'],frame=item['on_frame'],objek=item['id']+' '+item['teks'],
                            senyap=True,alasan='KT narasi kata per kata senyap; cue kelompok hanya pada bentuk pertama.'))
    save(OUT/'cues_r7.json',cues)
    save(OUT/'objects_r7.json',sorted(objects,key=lambda x:x['t']))
    save(LOG/'removed_r6.json',removed)
    return cues


def pieces(cues, assets, n):
    rendered = []
    for c in cues:
        x = read(ROOT/'audio'/c['file'])
        if c['peran']=='hitung':
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
        elif c['peran']=='transisi-dunia' and 'start_frame' in c:
            pk=int(np.argmax(np.abs(x)))
            pre=round((c['frame']-c['start_frame'])/FPS*SR)
            if pre<pk:
                x=x[pk-pre:]
            else:
                x=np.r_[signal.resample(x[:pk],pre),x[pk:]]
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
        start=round(c['t']*SR)-peak
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


def peak_guard(voice, musics, fx):
    """Only attenuate music/SFX; solve both sums against oversampled locked VO."""
    n=len(voice);gain=np.ones(n)
    v4=signal.resample_poly(voice,4,1)
    limit=10**(-1.15/20)
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
        if max(peaks.values())<=-1.145:break
        envelope=minimum_filter1d(upper,size=round(.028*SR)|1,mode='nearest')
        envelope=uniform_filter1d(envelope,size=round(.008*SR)|1,mode='nearest')
        gain*=envelope
    else:raise RuntimeError('Music/SFX-only true peak guard did not converge')
    # Record the automation as sparse 1 ms knots, including every local minimum.
    knots=[]
    for i in range(0,n,48):
        value=float(np.min(gain[i:i+48]))
        if value<.999999:knots.append([i/SR,round(20*np.log10(max(value,1e-12)),6)])
    save(LOG/'peak_automation.json',dict(target_dbtp=-1.15,voice_gain=1.0,
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


def build(cues,assets):
    voice=read(ROOT/'audio/stem_suara.wav')
    musics={'bgmbaru':read(OUT/'stem_musik_r7.wav'),
            'bgmlama':read(ROOT/'audio/stem_musik_A.wav')}
    n=len(voice)
    assert all(x.shape==(n,2) for x in musics.values())
    rendered=pieces(cues,assets,n)
    fx=sum_pieces(rendered,n)
    gain=peak_guard(voice,musics,fx)
    fx=(fx*gain[:,None]).astype(np.float32)
    sf.write(OUT/'stem_sfx_r7.wav',fx,SR,subtype='FLOAT')
    for start,x,c in rendered:
        y=x*gain[start:start+len(x)]
        c['puncak_efektif_dbfs']=db(y)
        c['puncak_sfx_s']=(start+int(np.argmax(np.abs(y))))/SR
        c['frame_puncak_sfx']=round(c['puncak_sfx_s']*FPS)
        c['otomasi_gain_min_db']=float(20*np.log10(max(np.min(gain[start:start+len(x)]),1e-12)))
    save(OUT/'cues_r7.json',cues)
    sf.write(LOG/'voice_stereo_locked.wav',np.repeat(voice[:,None],2,axis=1),SR,subtype='FLOAT')
    reports={}
    for name,source in musics.items():
        music=(source*gain[:,None]).astype(np.float32)
        path=OUT/('mix_final_'+name+'.wav')
        mix=(voice[:,None]+fx.astype(np.float64)+music.astype(np.float64)).astype(np.float32)
        sf.write(path,mix,SR,subtype='FLOAT')
        sf.write(LOG/('music_used_'+name+'.wav'),music,SR,subtype='FLOAT')
        recovered=mix.astype(np.float64)-fx.astype(np.float64)-music.astype(np.float64)
        sf.write(LOG/('voice_recovered_'+name+'.wav'),recovered,SR,subtype='FLOAT')
        reports[name]=dict(samples=n,duration_s=n/SR,channels=2,sample_rate=SR,
            sample_peak_dbfs=db(mix),voice_gain=1.0,master_processing=False,
            voice_recovery_max_error=float(np.max(np.abs(recovered-voice[:,None]))),
            voice_fit_gain=float(np.dot(recovered[:,0],voice)/np.dot(voice,voice)),
            **ebur(path,'ebur_'+name))
    save(LOG/'mix_checks.json',reports)
    return reports


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


def mux():
    commands=[]
    for name in ['bgmbaru','bgmlama']:
        cmd=['ffmpeg','-v','error','-y','-nostdin','-threads','1','-i',str(VIDEO),
             '-i',str(OUT/('mix_final_'+name+'.wav')),'-map','0:v:0','-map','1:a:0',
             '-c:v','copy','-c:a','aac','-b:a','320k','-ar',str(SR),'-movflags','+faststart',
             str(OUT/('cek_final_'+name+'.mp4'))]
        subprocess.run(cmd,check=True);commands.append(cmd)
    save(LOG/'mux_commands.json',commands)


if __name__=='__main__':
    ap=argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--plan-only',action='store_true')
    ap.add_argument('--sheet',action='store_true')
    ap.add_argument('--mux',action='store_true')
    args=ap.parse_args()
    LOG.mkdir(parents=True,exist_ok=True);(OUT/'sfx').mkdir(exist_ok=True)
    assets=make_assets(sf.info(ROOT/'audio/stem_suara.wav').frames)
    cues=plan(assets)
    print(len(cues),'cue; plan and assets written',flush=True)
    if not args.plan_only:
        print(json.dumps(build(cues,assets),indent=2),flush=True)
        if args.sheet:sheet(cues)
        if args.mux:mux()
