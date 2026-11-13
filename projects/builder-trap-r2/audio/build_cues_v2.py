"""Cue sheet SFX v2 (gain dinaikkan 14 Nov: audio_phone 25/49 terdengar; Lantai E24 −4…−10 dB)
Cue sheet SFX v2 (koreksi Irfan 13 Nov: v1 berisik + salah pilih SFX).
Cara pilih (Sutradara, bukan kamus peran → file):
 1. Kepadatan dari kiblat 55: ±30 SFX berlabel dalam 46 dtk (≈ 0,65/dtk) → target ±0,5–0,7/dtk; bunyi di momen CERITA dan gerak besar.
 2. Tidak ada bunyi per kata. Kata kinetik berbunyi hanya di pergantian kata triad (k3) — rima babak 1 dan babak 3.
 3. Sisipan wajah dan cut keras di suku kata tidak berbunyi (suara Irfan yang membawa momen itu).
 4. Sumber: ~/sfx/SFXIrfan (nama = fungsi dari Irfan) dulu → kosakata kiblat (hit/boom judul, riser → drop di twist, pop foto,
    whoosh gerak kamera besar) → set ElevenLabs proyek ini → v17 (hanya hit/sub yang tidak ada di SFXIrfan; alasan ditulis).
 5. Setiap file sudah didengar dengan `earshot describe` (label di kolom `dengar`).
Keluaran: audio/cues_v2.json + audio/sfx_stem_v2.wav (float)."""
import json, subprocess, numpy as np, soundfile as sf
SR = 48000; DUR = 94.967; N = int(round(DUR * SR))
I = '/home/irfan/sfx/SFXIrfan/'
E = 'audio/sfx_el/'
V = '/home/irfan/work/skill-development/projects/jadisatu-60s/remotion/sfx-el/'
K = '/home/irfan/sfx/Kenyset/'
EP = lambda s: I + s + ' - Epidemic Sound.mp3'

# file → label earshot (13 Nov)
DENGAR = {
    'Pergantianfoto.mp3': 'pen click / toggle switch click (deretan klik foto)',
    'Kinetictypography(gunakansecaraacak).mp3': 'scroll wheel tick lembut',
    'basmenyebar.mp3': 'deep cinematic boom / sub bass drop',
    'Woosh.mp3': 'fast whoosh / soft air whoosh',
    'Wooshcameramovementtransisi.mp3': 'fast whoosh / swoosh passing by',
    'scaningfast.mp3': 'fast whoosh pendek',
    'documenter.mp3': 'cloth/paper rustling',
    'Enter.mp3': 'mechanical key press (klik tegas)',
    'Keyboardtyping.mp3': 'keyboard typing fast',
    'pop up.mp3': 'bubble pop',
    'Lasertransision.mp3': 'triangle hit / glass ting',
    'ES_Designed, Riser, Transition, Fast, Short, Clean 01 - Epidemic Sound.mp3': 'reverse cymbal swell / riser',
    'ES_Designed, Bass Dive, Bass Drop, Deep Sub, 50Hz - Epidemic Sound.mp3': 'sub bass drop',
    'ES_Swooshes, Whoosh, Big, Cinematic - Epidemic Sound.mp3': 'fast whoosh besar',
    'ES_User Interface, Glitch, Glitch Databend 04 - Epidemic Sound.mp3': 'digital glitch / stutter transition',
    'ES_User Interface, Click, Pops, Glass, UI, Pops - Epidemic Sound.mp3': 'glass ting / kalimba (pop like)',
    'ES_User Interface, Click, UI Buttons, Confirm, Menu - Epidemic Sound.mp3': 'notification ding pendek',
    'marker.mp3': 'goresan spidol (ElevenLabs proyek ini)',
    'pin.mp3': 'tusukan pin (ElevenLabs proyek ini)',
    'swell_1.mp3': 'fast whoosh / reverse cymbal swell (v17)',
    'v17_thud_1.mp3': 'punchy impact hit (v17)',
    'v17_thud_0.mp3': 'punchy impact hit (v17)',
    'v17_thud_2.mp3': 'punchy impact hit (v17)',
    'v17_impact_0.mp3': 'sub bass drop (v17)',
    'v17_impact_1.mp3': 'sub bass drop / hum (v17)',
}
cues = []
def c(t, f, g, peran, alasan, ss=0.0, dur=None, align='peak', fout=0.03):  # 14 Nov: puncak bunyi di frame visual (pin.mp3 sunyi 0,41 dtk di depan; basmenyebar memuncak di 1,27 dtk)
    cues.append(dict(t=round(t, 3), file=f, ss=ss, dur=dur, gain_db=g, peran=peran, alasan=alasan, align=align, fout=fout,
                     dengar=DENGAR[f.split('/')[-1]]))

FOTO = [0.05, 1.25, 2.41, 6.06, 7.21, 9.61, 10.84]  # klik kuat di Pergantianfoto.mp3
# --- Babak 1: tesis universal (hook cepat, kiblat 0,25–0,7 dtk/shot)
c(0.00, V + 'v17_thud_1.mp3', -6, 'pembuka', 'kiblat: hantaman di frame 0 (stab orkestra ref02; SFXIrfan tidak punya stab)')
# montase hook: klik foto hanya di pergantian berselang (0,73 · 2,33 · 3,37); pergantian lain dibawa kata triad + cut di suku kata
for k, t in enumerate([0.733, 2.333, 3.367]):
    c(t, I + 'Pergantianfoto.mp3', -9, 'ganti_foto', 'isi bingkai arsip berganti (file Irfan "Pergantianfoto"); berselang supaya tidak jadi lapisan klik', ss=FOTO[k] - 0.01, dur=0.35)
for t, w in [(1.367, 'membangun'), (2.967, 'membuat'), (4.867, 'bikin software')]:
    c(t, I + 'Kinetictypography(gunakansecaraacak).mp3', -8, 'kata_triad', f'kata kunci triad berganti: "{w}"')
c(5.17, I + 'Woosh.mp3', -5, 'whoosh', 'kamera menembus bingkai ke babak berikut', align='peak')
c(7.57, I + 'basmenyebar.mp3', -4, 'judul', 'kartu judul "mempublikasikan" = jawaban hook (kiblat: hit di judul); boom naik dari "gak semua orang"', dur=3.4, fout=0.9)
c(9.40, EP('ES_User Interface, Glitch, Glitch Databend 04'), -13, 'transisi_babak', 'mosaik piksel membangun babak 2', dur=0.9, fout=0.2)
# --- Babak 2: belokan ke diri
c(10.10, I + 'documenter.mp3', -10, 'cetakan', 'foto cetak mendarat di alas', ss=2.95, dur=0.5, fout=0.15)
c(10.83, E + 'marker.mp3', -12, 'tulis', 'label tangan "20-an"')
c(15.93, I + 'scaningfast.mp3', -13, 'whoosh', 'kamera tarik mundur memperlihatkan 12 cetakan', align='peak')
c(16.00, I + 'Pergantianfoto.mp3', -15, 'cetakan_jatuh', 'cetakan berjatuhan = satu rentetan klik, bukan 12 bunyi', ss=9.55, dur=1.4, fout=0.3)
c(21.20, I + 'Wooshcameramovementtransisi.mp3', -12, 'whoosh', 'punch-in besar ke teks post Threads', align='peak')
c(23.90, EP('ES_User Interface, Click, Pops, Glass, UI, Pops'), -8, 'like', 'hati Threads terisi (benda yang dimaksud ucapan)')
c(26.57, I + 'scaningfast.mp3', -15, 'whoosh', 'halaman YouTube masuk', align='peak')
c(30.47, V + 'v17_thud_0.mp3', -6, 'tekan', '"FOMO." punch + guncang kamera')
c(34.83, V + 'v17_thud_2.mp3', -5, 'cap', 'logo OpenAI dicap besar + guncang')
c(37.73, I + 'Woosh.mp3', -9, 'whoosh', 'punch-in ke kotak prompt', align='peak')
c(37.90, I + 'Keyboardtyping.mp3', -9, 'ketik', '"build something" diketik di prompt', ss=0.36, dur=0.85, fout=0.1)
c(38.80, I + 'Enter.mp3', -10, 'kirim', 'tombol kirim ditekan')
c(38.86, EP('ES_User Interface, Glitch, Glitch Databend 04'), -14, 'transisi_babak', 'mosaik: prompt → dinding bukti', dur=0.8, fout=0.2)
for t in [39.67, 42.33, 45.07]:
    c(t, E + 'pin.mp3', -8, 'pin', 'pin cetakan disorot di dinding bukti (3 dari 5: awal, tengah, foto Irfan)')
c(39.77, E + 'marker.mp3', -13, 'tulis', 'tulisan tangan "satu tahun"')
c(43.33, I + 'Wooshcameramovementtransisi.mp3', -15, 'whoosh', 'kamera mundur lebar ke seluruh dinding', align='peak')
# --- Babak 3: twist (kiblat: riser menuju jawaban, musik + grade berganti)
c(46.30, EP('ES_Designed, Riser, Transition, Fast, Short, Clean 01'), -9, 'riser', 'menuju "Tapi" — twist', align='peak')
c(46.33, EP('ES_Designed, Bass Dive, Bass Drop, Deep Sub, 50Hz'), -7, 'drop', 'dinding berubah gelap (twist)', dur=2.5, fout=0.9)
for t, w in [(49.77, 'menjual'), (51.27, 'mempublikasikan'), (52.90, 'mendokumentasikan')]:
    c(t, I + 'Kinetictypography(gunakansecaraacak).mp3', -8, 'kata_triad', f'triad babak 3 (rima babak 1): "{w}"')
c(51.20, EP('ES_User Interface, Click, UI Buttons, Confirm, Menu'), -9, 'klik_ui', 'klik Cancel di composer Threads')
c(51.90, I + 'Enter.mp3', -8, 'klik_ui', 'klik "Save" — draft disimpan, tidak terbit')
c(54.60, I + 'Keyboardtyping.mp3', -10, 'ketik', 'nama repo "MemoryPC" diketik', ss=1.41, dur=0.65, fout=0.1)
c(56.20, I + 'Enter.mp3', -8, 'klik_ui', 'klik "Create repository"')
c(57.83, I + 'Pergantianfoto.mp3', -8, 'repo_menumpuk', '19 halaman repo menumpuk makin cepat = satu rentetan klik', ss=0.0, dur=5.2, fout=0.4)
c(63.07, V + 'v17_impact_1.mp3', -6, 'beku', 'semua kartu berhenti mendadak + guncang ("gak pernah selesai")', dur=1.8, fout=0.6)
c(71.93, I + 'Wooshcameramovementtransisi.mp3', -14, 'whoosh', 'kamera mundur jauh: timbunan draft terlihat', align='peak')
# --- Babak 4: sadar & janji
c(76.90, I + 'basmenyebar.mp3', -5, 'puncak', '"sadar." klimaks; boom naik dari wipe terang lalu memuncak di kata (peran hit besar sama dengan judul; sub v17 tidak terdengar di HP)', dur=3.4, fout=0.9)
c(77.73, EP('ES_Swooshes, Whoosh, Big, Cinematic'), -8, 'whoosh', 'whip pan mundur menyusuri dinding', align='peak')
c(80.77, E + 'marker.mp3', -12, 'tulis', 'lingkaran + "titik awal" ditulis tangan')
c(86.13, I + 'Enter.mp3', -8, 'klik_ui', 'klik Post — akhirnya terbit')
for t, f in [(86.33, I + 'pop up.mp3'), (87.20, EP('ES_User Interface, Click, Pops, Glass, UI, Pops')), (89.13, I + 'pop up.mp3')]:
    c(t, f, -10, 'post_terbit', 'post Threads terbit (satu per frasa); post 2 varian pop supaya file sama tidak berulang < 1 dtk')
c(93.47, I + 'Lasertransision.mp3', -15, 'penutup', '"belum sempurna." — ting lembut, ekor sunyi seperti kiblat')

# ---- render stem
def dec(path, ss=0.0, dur=None):
    cmd = ['ffmpeg', '-v', 'error', '-ss', str(ss)] + (['-t', str(dur)] if dur else []) + ['-i', path, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-']
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).copy()
stem = np.zeros(N, np.float32)
cues.sort(key=lambda q: q['t'])
for q in cues:
    x = dec(q['file'], q['ss'], q['dur'])
    pk = np.abs(x).max() + 1e-9; x = x / pk * 10 ** (q['gain_db'] / 20)
    if q['fout']: n = min(len(x), int(q['fout'] * SR)); x[-n:] *= np.linspace(1, 0, n)
    at = q['t'] - (np.argmax(np.abs(x)) / SR if q['align'] == 'peak' else 0.0)
    i = int(round(max(0.0, at) * SR)); n = min(len(x), N - i)
    stem[i:i + n] += x[:n]
    q['mulai'] = round(at, 3)
sf.write('audio/sfx_stem_v2.wav', stem, SR, subtype='FLOAT')
json.dump({'cues': cues}, open('audio/cues_v2.json', 'w'), ensure_ascii=False, indent=1)
from collections import Counter
print('cue', len(cues), 'per dtk', round(len(cues) / DUR, 2), dict(Counter(q['peran'] for q in cues)))
