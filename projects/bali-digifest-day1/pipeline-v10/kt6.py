"""v6: teks kinetik + kata kunci tunggal + player tag + label bab -> remotion/src/kt6.json.
Aturan (Irfan 13 Nov + guide/teks): satu fokus teks per momen (frasa hilang dulu sebelum kata kunci tampil sendirian);
frasa di sisi wajah yang lega setinggi wajah, margin >= 96 px, satu posisi per adegan; kata kunci warna padat, tanpa efek terbelah;
kata pahlawan (maks 2) oranye; player tag di atas kepala (atau di sisi kepala bila tak ada ruang); label bab statis kanan atas."""
import json
from PIL import ImageFont
FPS = 30; W, H = 1920, 1080; M = 96
F = lambda s: ImageFont.truetype('remotion/public/fonts/SFPRODISPLAYBOLD.OTF', s)
edl = json.load(open('edl6.json')); heads = json.load(open('remotion/src/heads.json'))
SH = edl['shots']; VO = edl['vo']
def v(bite, t):                       # detik sumber -> timeline (kata di bagian yang dibuang ikut ke awal potongan berikutnya)
    ps = [p for p in VO if p['bite'] == bite]
    for p in ps:
        if t <= p['b']: return round(p['v'] + max(0.0, t - p['a']), 3)
    p = ps[-1]; return round(p['v'] + p['b'] - p['a'], 3)
def vend(bite):
    p = [p for p in VO if p['bite'] == bite][-1]; return p['v'] + p['b'] - p['a']
P, B = 'p', 'b'
C = {  # per bite: ('p', [[(kata, t)...], [...]]) frasa <= 2 baris | ('b', teks, t, pahlawan?)
 'H': [(P, [[('ada', 12.46), ('event', 12.64), ('namanya', 13.56)]]), (B, 'Bali Digifest', 13.90, True),
       (P, [[('gitu.', 14.50), ('wah,', 14.74), ('gila', 14.86), ('ini!', 15.06)]])],
 'D1': [(P, [[('jelas,', 12.29)], [('Bali', 12.73), ('Digifest', 13.27), ('itu', 13.71)]]),
        (P, [[('yang', 13.95), ('mengenai', 14.23)], [('teknologi', 15.23), ('dan', 15.83)]]),
        (B, 'inovasi.', 15.92, False)],
 'T1a': [(P, [[('untuk', 174.32), ('Primakara', 174.60)], [('dan', 175.38), ('Pemprov', 175.58), ('Bali,', 175.90)]]),
        (P, [[('terima', 176.28), ('kasih', 176.56)], [('banyak,', 176.78)]]),
        (P, [[('karena', 177.14), ('sudah', 177.42)], [('menciptakan', 178.10)]]),
        (P, [[('sebuah', 179.32)], [('kegiatan', 180.06), ('ini,', 181.46)]]),
        (P, [[('yaitu', 182.20)], [('Bali', 182.62), ('Digifest.', 182.92)]])],   # v8g: nama acara (Irfan)
 'T1b': [(P, [[('ini', 184.00), ('benar-benar', 184.80)]]), (B, 'berkesan', 185.54, False),
        (P, [[('untuk', 186.16), ('saya', 186.30), ('sebagai', 186.72)], [('generasi', 187.40), ('muda', 188.06)]]),
        (P, [[('dan', 188.50), ('juga', 189.36)], [('generasi', 189.62), ('penerus.', 190.22)]])],
 'D2': [(P, [[('jadi,', 114.32), ('pastinya', 114.80)], [('di', 115.44), ('sini', 115.56)]]),
        (P, [[('tidak', 115.68), ('hanya', 116.00)], [('mengedukasi,', 116.34)]]),
        (P, [[('tapi', 116.94), ('juga', 117.08), ('mengajarkan', 117.26)], [('bagaimana', 118.00), ('cara', 118.46)]]),
        (P, [[('membuat', 118.64), ('sebuah', 118.92)]]), (B, 'seni', 119.30, False),
        (P, [[('yang', 119.74), ('bisa', 120.20)], [('dinikmati', 120.40)]]),
        (P, [[('oleh', 121.06), ('banyak', 121.18), ('orang.', 121.36)]])],
 'I1': [(P, [[('Claymaking', 13.84), ('ini', 14.56), ('adalah', 14.94)], [('sebuah', 15.36), ('workshop.', 15.92)]]),
        (P, [[('kalau', 18.84), ('membuat', 18.92), ('desain', 19.34)], [('biasanya', 19.80)]]),
        (P, [ [('membuat', 20.16), ('sketsa', 20.56), ('2D', 21.84), ('dulu.', 22.18)]]),
        (P, [[('nah,', 23.92), ('dari', 24.06), ('dua', 24.50)], [('dimensi', 24.68), ('itu', 25.18)]]),
        (P, [[('diwujudkan', 25.22), ('ke', 25.80)], [('dalam', 25.92), ('bentuk', 26.16)]]),
        (B, 'tiga dimensi.', 26.52, False)],
 'T2': [(P, [[('perasaan', 100.31), ('kami', 100.63)], [('sangat', 100.75), ('senang', 101.15)]]),
        (P, [[('bisa', 101.76), ('mengetahui', 101.94)], [('cara', 102.66), ('untuk', 102.88), ('membuat', 103.20)]]),
        (B, 'art toys', 103.82, False),
        (P, [[('dan', 104.66), ('bahagia', 105.30), ('karena', 107.10), ('bisa', 107.30)], [('mempunyai', 107.60), ('teman-teman', 108.32), ('baru', 108.66)]]),
        (P, [[('di', 108.92), ('lingkungan', 109.04), ('ini.', 109.32)]])],
  'C1': [        (P, [[('ternyata', 42.60), ('teknologi', 43.72)], [('dan', 45.72), ('budaya', 45.98), ('saling', 46.48)]]),
        (B, 'berdampingan', 46.86, False), (P, [[('dan', 47.52), ('bisa', 47.70)], [('dikolaborasi', 48.22)]]),
        (P, [[('dan', 49.20), ('elaborasi.', 49.32)]])],
 'Q': [(P, [[('1', 68.74), ('sampai', 68.94), ('10,', 69.12)], [('seberapa', 69.46), ('antusias', 69.98)]]),   # pewawancara (abu-abu)
       (P, [[('dengan', 72.16), ('acara', 72.28), ('ini?', 72.74)]])],
 'C2': [(P, [[('kalau', 73.60), ('jujur,', 73.90)]]), (B, '8,5', 74.60, True)],
 'C3': [(P, [[('harapan', 54.84), ('saya', 55.46)], [('lebih', 55.70), ('ditingkatkan,', 56.14)]]),
        (P, [[('jika', 56.76), ('bisa', 57.28)], [('pindah', 57.58), ('tempat,', 58.32)]]),
        (P, [[('jangan', 58.78), ('di', 59.42)], [('Denpasar', 59.94), ('saja,', 60.50)]]),
        (P, [[('kalau', 60.78), ('bisa', 60.96), ('di', 61.16), ('Jembrana', 61.34)], [('atau', 61.86), ('di', 62.28), ('Klungkung,', 62.66)]]),
        (P, [[('atau', 63.84), ('di', 64.26), ('daerah-daerah', 64.42)], [('yang', 65.12), ('mempunyai', 65.26), ('potensi.', 66.00)]])],
 # v9: testimoni Day 2 (kata dari whisper large-v3 per kata, raw23/w_*.json)
 'K1': [(P, [[('awalnya', 42.16), ('kayak', 42.84), ('aduh', 43.10)], [('males', 44.08), ('sih,', 44.38)]]),
        (P, [[('tapi', 45.06), ('ternyata', 45.30)], [('pas', 45.70), ('ikut', 45.92), ('seneng,', 46.56)]]),
        (B, 'seru juga', 48.00, False)],
 'K2': [(P, [[('jadi', 14.10), ('rasanya', 14.30)], [('seneng', 14.80), ('banget', 15.30)]]),
        (P, [[('dan', 15.52), ('ini', 15.76)], [('pengalaman', 16.02), ('pertama.', 16.70)]])],
 'K3': [(P, [[('itu', 67.82), ('seru', 68.30), ('banget', 68.72)], [('dan', 68.90), ('gak', 69.20), ('ngebosanin', 69.42)]]),
        (P, [[('sih', 70.04), ('jujur,', 70.14)], [('karena', 70.52), ('kakaknya', 70.70), ('juga', 71.06), ('seru,', 71.24)]]),
        (P, [[('kayak', 71.94), ('dia', 72.48), ('gak', 72.84), ('pakai', 73.12)], [('bahasa', 73.64), ('yang', 74.36), ('kaku,', 74.50)]]),
        (P, [[('tapi', 74.84), ('dia', 75.02)]]), (B, 'friendly', 75.20, False)],
 'K4': [(P, [[('kalau', 293.94), ('di', 294.32), ('sini', 294.40), ('kan', 294.72)], [('kita', 294.90), ('bisa', 295.12), ('ikut', 295.38)]]),
        (P, [[('talkshow-talkshownya,', 295.76)]]),
        (P, [[('terus', 297.02), ('ketemu', 297.50), ('sama', 298.06)], [('narasumber-narasumber', 298.26)]]),
        (P, [[('yang', 299.10), ('udah', 299.34), ('mulai', 299.52)], [('berpengalaman,', 299.76)]]),
        (P, [[('jadi', 301.14), ('kita', 301.56), ('bisa', 302.04)], [('dapat', 302.28), ('ilmu', 302.52), ('yang', 302.96), ('banyak.', 303.08)]])],
 'P1': [(P, [[('AI', 63.08)], [('memang', 65.64), ('itu', 66.26), ('pinter,', 66.38)]]),
        (P, [[('tapi', 66.88), ('manusia', 67.74), ('juga', 68.30)]]), (B, 'lebih pinter.', 68.40, True),
        (P, [[('jadi', 68.86), ('gimana', 69.36), ('caranya', 70.18)], [('kita', 70.96), ('buat,', 71.18)]]),
        (P, [[('istilahnya', 72.40), ('kita', 73.02)], [('yang', 73.26), ('mengatur', 73.62), ('AI,', 74.78)]]),
        (P, [[('jangan', 74.94), ('sampai', 75.18), ('AI', 75.32)], [('yang', 75.54), ('ngatur', 75.66), ('kita.', 75.80)]])],
 'P2': [(P, [[('rugi', 153.30), ('sih', 153.78)], [('kalau', 154.00), ('gak', 154.20), ('dateng.', 154.38)]])],
 'R2': [(P, [[('10', 126.60), ('per', 127.14), ('10', 127.54), ('deh.', 128.14)]])],
}
ORANGE, WHITE = '#F7922E', '#FFFFFF'
# ---- 1) tampilan + waktu ----
D = []
import os
SY = json.load(open('sync9.json')) if os.path.exists('sync9.json') and os.environ.get('NOSYNC') != '1' else {}   # v10: waktu kata dari suara final
for bite, items in C.items():
    if not any(p['bite'] == bite for p in VO): continue          # v8d: bite tidak dipakai (mis. Q dihapus)
    sy = SY.get(bite); ki = 0
    for it in items:
        if it[0] == P:
            lines = []
            for ln in it[1]:
                row = []
                for w, t in ln:
                    row.append(dict(w=w, t=(sy[ki] if sy and ki < len(sy) and sy[ki] is not None else v(bite, t)))); ki += 1
                lines.append(row)
            D.append(dict(kind='p', bite=bite, lines=lines, start=lines[0][0]['t'] - 0.05))
        else:
            _, txt, t, hero = it
            tt = sy[ki] if sy and ki < len(sy) and sy[ki] is not None else v(bite, t); ki += 1
            D.append(dict(kind='b', bite=bite, text=txt, t=tt, start=tt - 0.05, hero=hero))
D.sort(key=lambda d: d['start'])
for i, d in enumerate(D):
    nxt = D[i + 1]['start'] if i + 1 < len(D) else 1e9
    end_bite = vend(d['bite']) + 0.45
    d['end'] = round(min(nxt - 0.03, end_bite if d['kind'] == 'p' else max(d['start'] + 0.75, end_bite)), 3)
    if d['kind'] == 'b' and d['end'] - d['start'] < 0.6: d['end'] = round(min(nxt - 0.03, d['start'] + 0.6), 3)
    d['start'] = round(d['start'], 3)
# ---- 2) frasa -> format kt.json untuk mesin layout v5 (layout6p.py); kata kunci disimpan terpisah ----
phr = [dict(vo=d['bite'], start=d['start'], end=d['end'], lines=[[dict(w=w['w'], t=w['t'], k=False, q=d['bite'] == 'Q') for w in l] for l in d['lines']],
            bw=round(max(F(64).getlength(' '.join(w['w'] for w in l)) for l in d['lines']) * 1.03, 1)) for d in D if d['kind'] == 'p']
json.dump(phr, open('remotion/src/kt.json', 'w'), ensure_ascii=False, indent=1)
big = [d for d in D if d['kind'] == 'b']
json.dump(big, open('big6.json', 'w'), ensure_ascii=False, indent=1)
# ---- 3) label bab: rentang berurutan dengan label sama ----
CH = []
for s in SH:
    c = s.get('chap')
    if CH and CH[-1]['title'] == c and abs(CH[-1]['end'] - s['v0']) < 1e-3: CH[-1]['end'] = s['v1']
    else: CH.append(dict(title=c, start=s['v0'], end=s['v1']))
CH = [c for c in CH if c['title']]
# ---- 4) player tag: per shot wajah pembicara yang menyebut sekolahnya ----
TG = []
for s in SH:
    if not s.get('talk') or s['spk'] not in edl['tags']: continue
    sub, lab = edl['tags'][s['spk']]
    TG.append(dict(shot=s['id'], start=s['v0'], end=s['v1'], sub=sub, label=lab, spk=s['spk'], scene=s['scene']))
json.dump(dict(chapters=CH, tags=TG), open('chaptags6.json', 'w'), ensure_ascii=False, indent=1)
print('label bab:', [(c['title'], round(c['start'], 1), round(c['end'], 1)) for c in CH])
