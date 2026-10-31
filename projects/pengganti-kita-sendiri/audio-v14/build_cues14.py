"""Cue SFX v14 — semua SFX lama dihapus, disusun ulang (Irfan 1 Nov 00:23).
Sumber EVENT (bukan bunyi): anotasi visual per adegan (pks-video/sfx/cues_*.json + cues11, ditulis dari kode adegan)
+ log kemunculan kata dari render (KWord/SlotWord, pks-out/word_events.txt). Bunyi lama (bank sintetis, kayu, felt, flutter,
lapisan sub/pulse) tidak dipakai lagi.
Aturan:
- 1 adegan 1 pesan 1 SFX: satu event visual = tepat satu bunyi (tidak ada lapisan sub/pulse); satu PERAN = satu bunyi yang sama
  sepanjang video (kata kinetik selalu bunyi kata, kamera patah selalu whoosh gelombang, dst.), seperti aturan tipografi.
- Sumber: hanya stok Irfan — Kenyset, Proyek/tuntunly-motion sfx, ElevenLabs The Gap (sfx-el), ElevenLabs video #2.
- Palet & pita mengikuti The Gap v17/v18 (lulus Irfan) dan referensi Audio.mp4 (klik digital terang, whoosh halus pita tengah).
"""
import json, glob, re, os
J = lambda p: json.load(open(p))
K = '/home/claude/sfx_stock/Kenyset [FREE SFX PACK]/'
TU = '/home/claude/sfx_stock/Proyek/tuntunly-motion/audio/final/sfx/'
EL = '/home/claude/skill-development/projects/jadisatu-60s/remotion/sfx-el/'
V2 = '/home/claude/sfx_stock/Skill-Development/projects/jadisatu-video2/audio/sfx/'

# PERAN → bunyi (satu peran satu bunyi; whoosh/whip berotasi di antara 2–3 sampel yang mirip supaya tidak terdengar mesin)
# fam = keluarga pita (The Gap v17): ui 300 Hz–8 kHz + cekungan 2,8–4,5 kHz · motion 400 Hz–2,5 kHz · low < 2 kHz + body · texture 400–2,6 kHz
# pk = puncak di master (dBFS). VO berpuncak ±−2 dBFS → SFX ±8–15 dB di bawahnya (The Gap terukur: median −10 dB).
ROLE = {
    'word':    dict(files=[K + 'ipad_click-99325.mp3'], fam='ui', pk=-17, why='kata kinetik muncul: tap digital iPad (Apple), sama untuk setiap kata'),
    'slam':    dict(files=[EL + 'v17_thud_1.mp3'], fam='low', pk=-10, why='kata penekanan besar (slam): satu dentum pendek'),
    'type':    dict(files=[K + 'iphone-keyboard-typing-sound-effect-336778.mp3'], fam='ui', pk=-20, why='teks terketik: keyboard digital iPhone (bukan mekanik)'),
    'click':   dict(files=[K + 'mouse-click-290204.mp3'], fam='ui', pk=-15, why='kursor/tombol ditekan: klik mouse'),
    'ui_pop':  dict(files=[K + 'pop-up-notify-smooth-modern-332448.mp3'], fam='ui', pk=-15, why='kartu/UI/agent muncul: pop notifikasi halus'),
    'land':    dict(files=[K + 'soft-subtle-ui-pop-sfx-348820.mp3'], fam='ui', pk=-16, why='kartu/tile mendarat: pop rendah lembut'),
    'message': dict(files=[K + 'message-envoye-iphone-apple-391098.mp3'], fam='ui', pk=-15, why='balasan/pesan masuk: bunyi kirim pesan iPhone'),
    'whoosh':  dict(files=[TU + 'whoosh-gelombang.mp3'], fam='motion', pk=-15, align='peak',
                    why='kamera patah / transisi / benda melesat: whoosh gelombang halus pita tengah, puncak di kecepatan maks'),
    'whip':    dict(files=[EL + 'v17_whip_1.mp3', EL + 'v17_whip_2.mp3'], fam='motion', pk=-15, align='peak', why='whip pan / cut on motion: swish pendek'),
    'riser':   dict(files=[V2 + 'riser.mp3'], fam='motion', pk=-17, align='end', why='zoom-through / bangunan menuju potongan: riser lembut berakhir di cut'),
    'impact':  dict(files=[EL + 'v17_impact_1.mp3'], fam='low', pk=-11, tail=0.9, why='beat drop / pendaratan besar: bass drop bersih'),
    'photo':   dict(files=[TU + 'klik-ui.mp3'], fam='ui', pk=-18, why='foto montase berganti: klik pendek'),
    'light':   dict(files=[K + 'soft-ui-pop-light-minimal-click-451232.mp3'], fam='ui', pk=-17, why='bidang cahaya menyala/padam: klik lembut (QC: saklar terlalu berdesis)'),
    'trash':   dict(files=[V2 + 'trash.mp3'], fam='texture', pk=-18, why='kartu masuk Trash: remasan kertas (metafora macOS)'),
    'draw':    dict(files=[EL + 'v17_glide_2.mp3'], fam='texture', pk=-19, why='garis/grafik tergambar: glide halus'),
    'shutter': dict(files=[EL + 'v17_shutter_1.mp3'], fam='ui', pk=-17, why='foto tunggal dipotret / efek negatif'),
}

def raw_events():
    C = J('/home/claude/v9/mix13/cues11.json')
    rep = set()
    for f in sorted(glob.glob('/home/claude/pks-video/sfx/replace_*.json')):
        for r in J(f): rep.add(r['old_id'])
    C = [q for q in C if q['id'] not in rep]
    for f in sorted(glob.glob('/home/claude/pks-video/sfx/cues_*.json')): C += J(f)
    return sorted(C, key=lambda q: q['t'])

R2C = {'low_sub_bass_boom': 'impact', 'soft_air_whoosh': 'whoosh_s', 'low_pass_sweep': 'whoosh_s', 'micro_tick': 'micro_tick', 'tape_hiss_bed': 'texture_bed'}
def role_of(q):
    c = q.get('class') or R2C.get(q.get('role', ''), q.get('role', ''))
    v = (q.get('visual') or q.get('why') or '').lower()
    if c in ('texture_bed', 'texture', 'sub_layer', 'graph_pulse', 'step'): return None   # lapisan/tekstur/langkah kartun: dihapus
    if c == 'text_pop':
        return 'word'
    if c == 'text_slam': return 'slam'
    if c == 'type_key': return 'type'
    if c == 'micro_tick': return None            # «poin beruntun»: penanda daftar lama, sudah diwakili kata/ketikan
    if c == 'ui_click': return 'click'
    if c == 'ui_pop':
        if 'balasan' in v or 'notif' in v: return 'message'
        return 'ui_pop'
    if c == 'land_soft': return 'land'
    if c == 'graph_tick':
        return 'word' if ('kata' in v or 'label' in v) else 'ui_pop'
    if c in ('whoosh_s',):
        if 'whip' in v or 'cut on motion' in v or 'cut-on-motion' in v or 'melesat' in v: return 'whip'
        return 'whoosh'
    if c == 'riser': return 'riser'
    if c in ('sub_thud', 'impact'):
        if 'pembuka' in v and q['t'] < 0.2: return None          # The Gap D-038: tidak ada hantaman di frame 0 (diam → keras → hilang)
        if 'hard cut' in v: return 'whoosh'                         # potongan antar pembicara/klip = whoosh gelombang yang menjembatani celah (naik di celah, puncak di potongan), bukan bass drop
        return 'impact'
    if c == 'flutter': return 'photo'
    if c == 'shutter': return 'photo' if 'montase' in v else 'shutter'
    if c == 'relay': return 'light'
    if c == 'paper': return 'trash' if 'trash' in v else 'ui_pop'
    if c == 'pen': return 'draw'
    return None

def main():
    ev = []
    dropped = []
    for q in raw_events():
        r = role_of(q)
        v = q.get('visual') or q.get('why') or ''
        if r is None: dropped.append(dict(t=q['t'], cls=q.get('class') or q.get('role'), visual=v[:80])); continue
        if q.get('panel', '').startswith('00') and r == 'word' and 'kinetik ucapan' in v: continue   # kata cold open → dari log render
        ev.append(dict(t=round(q['t'], 3), role=r, panel=q.get('panel'), visual=v, src_id=q.get('id')))
    # kata dari log render (kebenaran visual: frame munculnya kata)
    have = [e for e in ev if e['role'] in ('word', 'slam')]
    for ln in open('/home/claude/pks-out/word_events.txt'):
        _, t, kind, txt = ln.strip().split(' ', 3)
        t = float(t)
        near = [e for e in have if abs(e['t'] - t) < 0.12]
        if near:
            for e in near: e['t'] = round(t, 3); e['visual'] += f' [frame log {t:.3f}]'
            continue
        ev.append(dict(t=round(t, 3), role='slam' if kind == 'slam' else 'word', panel='log', visual=f'kata «{txt}» muncul ({kind})', src_id=f'log_{t:.3f}'))
    ev.sort(key=lambda e: e['t'])
    # satu event = satu bunyi: event berbeda peran di waktu yang sama (≤ 2 frame) → simpan yang paling penting
    PRI = ['impact', 'slam', 'word', 'whip', 'whoosh', 'riser', 'click', 'message', 'ui_pop', 'land', 'type', 'light', 'photo', 'trash', 'draw', 'shutter']
    out = []
    for e in ev:
        clash = [o for o in out if abs(o['t'] - e['t']) <= 2 / 30 and o['role'] != 'riser' and e['role'] != 'riser']
        if clash:
            o = clash[0]
            keep, lose = (o, e) if PRI.index(o['role']) <= PRI.index(e['role']) else (e, o)
            if keep is e: out.remove(o); out.append(e)
            dropped.append(dict(t=lose['t'], cls=lose['role'], visual='bertumpuk dengan ' + keep['role'] + ': ' + lose['visual'][:60]))
            continue
        out.append(e)
    out.sort(key=lambda e: e['t'])
    rr = {}
    for i, e in enumerate(out):
        R = ROLE[e['role']]; k = rr.get(e['role'], 0); rr[e['role']] = k + 1
        e.update(file=R['files'][k % len(R['files'])], fam=R['fam'], peak_dbfs=R['pk'], align=R.get('align', 'start'), why=R['why'], id=f"{e['role']}_{i:03d}")
    json.dump(out, open('cues14.json', 'w'), indent=0, ensure_ascii=False)
    json.dump(dropped, open('dropped14.json', 'w'), indent=0, ensure_ascii=False)
    from collections import Counter
    print(len(out), 'event', dict(Counter(e['role'] for e in out)))
    print('dihapus', len(dropped), dict(Counter(d['cls'] for d in dropped)))

if __name__ == '__main__': main()
