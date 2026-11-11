"""Cue SFX dari event visual terkunci (aturan 43). Waktu diturunkan dari Main.tsx/Agents.tsx."""
import json, math, datetime
K = '/home/irfan/sfx/Kenyset/'; I = '/home/irfan/sfx/SFXIrfan/'
F = dict(
 txt=I+'Kinetictypography(gunakansecaraacak).mp3', cut=I+'Cut.mp3', cam=I+'Wooshcameramovementtransisi.mp3',
 photo=I+'Pergantianfoto.mp3', shine=K+'benkirb-shine-1-268902.mp3', swoosh=K+'swoosh-010-352856.mp3',
 paper=K+'flipcard-91468.mp3', first=I+'Katapertama.mp3', velo=K+'whoosh-velocity-383019.mp3',
 bass=I+'ES_Designed, Bass Dive, Bass Drop, Deep Sub, 50Hz - Epidemic Sound.mp3', popai=I+'Popup user interface : AI.mp3',
 airesp=I+'ResponAI:AIpopup.mp3', whs=K+'simple-whoosh-382724.mp3', typing=K+'iphone-keyboard-typing-sound-effect-336778.mp3',
 enter=I+'Enter.mp3', laser=I+'Lasertransision.mp3', ccut=I+'Cutcontrastransision.mp3', pop=K+'soft-pop-sfx-433612.mp3',
 strike=K+'quick-double-swish-sfx-230502.mp3', tick=K+'minimal-pop-click-ui-11-198311.mp3', particle=I+'ES_Particle Emission - Soundpembuka.mp3',
 bubble=K+'bubble_pop_1-476367.mp3', msg=K+'mensaje-de-texto-iphone-218138.mp3', wend=K+'whoosh-end-384629.mp3',
 click=K+'universfield-computer-mouse-click-352734.mp3', multipop=K+'multi-pop-2-188167.mp3', shine6=K+'shine-6-268910.mp3',
 bspread=I+'basmenyebar.mp3', woosh=I+'Woosh.mp3', off=K+'ui-sound-off-270300.mp3', err=K+'sfx-erreur-363728.mp3',
 glitch=I+'ES_User Interface, Glitch, Glitch Databend 04 - Epidemic Sound.mp3', scan=I+'scaningfast.mp3', sonar=K+'sonar-ping-95840.mp3',
 notify=K+'pop-up-notify-smooth-modern-332448.mp3', riser=I+'ES_Designed, Riser, Transition, Fast, Short, Clean 01 - Epidemic Sound.mp3',
 move=I+'Move.mp3', wipe=I+'Variasitransisiataucut.mp3', glitchfx=K+'glitch-fx-transitions-8-311809.mp3', popclick=K+'soft-ui-pop-light-minimal-click-451232.mp3', uiproc=K+'ui-processing-data-sequence-modern-interface-progress-02-230495.mp3',
)
C = []
def c(t, k, db, peran, alasan, dur=None): C.append(dict(t=round(t, 3), file=F[k], db=db, peran=peran, alasan=alasan, **({'dur': dur} if dur else {})))

# S1 wajah
c(1.66, 'txt', -16, 'teks', 'kata "kesempurnaan." masuk blur')
c(6.15, 'whs', -24, 'teks keluar', 'kesempurnaan keluar')
c(8.45, 'txt', -18, 'teks', '"siapa pun." masuk')
c(11.07, 'cut', -14, 'cut', 'punch-in framing kedua')
c(11.9, 'pop', -14, 'teks', '"20-an" masuk')
c(15.3, 'whs', -24, 'teks keluar', '20-an keluar')
# S2 foto
c(15.68, 'cam', -12, 'transisi', 'wajah live mengecil jadi foto')
c(16.3, 'photo', -12, 'objek', 'foto tertancap di papan')
c(16.75, 'shine', -18, 'cahaya', 'foto menyala, orang lain meredup')
c(17.35, 'move', -20, 'kamera', 'push-in ke fotonya')
# S3 motivasi
c(19.68, 'swoosh', -14, 'cut', 'masuk feed motivasi')
for k, tt in enumerate([19.9, 20.3, 20.7]): c(tt, 'popclick', -24, 'objek', f'kartu feed lewat {k+1}')
c(21.1, 'paper', -12, 'objek', 'kartu kutipan kertas masuk')
c(21.56, 'first', -16, 'teks', 'kata pertama kutipan')
c(23.70, 'txt', -20, 'teks', 'bagian kedua kutipan "harus"')
c(24.84, 'tick', -18, 'teks', 'kata vonis "berbeda."')
# S4 FOMO
c(25.8, 'velo', -14, 'cut', 'arus kartu tren')
for k, tt in enumerate([26.6, 27.5, 28.4, 29.3, 30.2, 31.0]): c(tt, 'whs', -27, 'gerak', f'arus tren melintas {k+1}')
c(31.7, 'riser', -18, 'antisipasi', 'blur sebelum FOMO')
c(31.86, 'bass', -10, 'slam', 'FOMO menghantam')
c(31.88, 'pop', -14, 'teks', 'FOMO muncul')
# S5 ChatGPT
c(32.66, 'cut', -16, 'cut', 'masuk layar gelap ChatGPT')
c(32.85, 'popai', -14, 'objek', 'jendela ChatGPT naik')
for k, tt in enumerate([33.4, 33.9, 34.25]): c(tt, 'popclick', -26, 'UI', f'item sidebar muncul {k+1}')
c(34.2, 'tick', -22, 'teks', '"Where should we begin?"')
c(36.2, 'airesp', -10, 'logo', 'logo ChatGPT asli dicap')
c(37.3, 'whs', -22, 'logo keluar', 'logo ChatGPT pergi')
c(37.6, 'move', -22, 'kamera', 'push-in perlahan ke kolom input')
c(39.4, 'typing', -14, 'UI', 'mengetik "build something"', dur=0.65)
c(39.95, 'enter', -12, 'UI', 'tombol kirim')
# S6 belokan merah
c(40.18, 'ccut', -10, 'belokan', 'potong keras ke merah')
c(40.35, 'laser', -18, 'garis', 'garis merah menggambar')
for w, a, s in [('menjual', 43.34, 44.25), ('mempublikasikan', 45.0, 45.95), ('mendokumentasikan', 46.64, 47.6)]:
    c(a, 'pop', -12, 'teks', f'"{w}" masuk'); c(s, 'strike', -12, 'coret', f'"{w}" dicoret')
# S7 timeline
c(48.26, 'woosh', -14, 'cut', 'masuk timeline setahun')
c(48.4, 'scan', -22, 'kamera', 'kamera menyusuri tahun')
def bez(x1, y1, x2, y2):
    def f(x):
        lo, hi = 0.0, 1.0
        for _ in range(60):
            m = (lo + hi) / 2; bx = 3*(1-m)**2*m*x1 + 3*(1-m)*m*m*x2 + m**3
            lo, hi = (m, hi) if bx < x else (lo, m)
        m = (lo + hi) / 2; return 3*(1-m)**2*m*y1 + 3*(1-m)*m*m*y2 + m**3
    return f
repos = json.load(open('remotion/public/data/repos.json'))
T0 = datetime.datetime(2025, 11, 1)
DAY, CW, LANES = 12.5, 250, [-1, 1, -2, 2, -3, 3]
last, lay = {}, []
for r in repos:
    y, m, d = map(int, r[2].split('-')); anc = 260 + (datetime.datetime(y, m, d) - T0).days * DAY; x = anc
    lane = next((l for l in LANES if last.get(l, -1e9) + CW + 14 <= x), None)
    if lane is None: lane = min(LANES, key=lambda l: last.get(l, 0)); x = last.get(lane, 0) + CW + 14
    last[lane] = x; lay.append((r[0], x, anc))
WIDTH = max(x + CW for _, x, _ in lay) + 160
e = bez(0.45, 0, 0.25, 1); start, end = 260, WIDTH - 260
prev = -9
for name, x, anc in lay:
    for i in range(0, 351):
        tt = 48.4 + i * 0.01; cam = start + (end - start) * e((tt - 48.4) / 3.5)
        if cam - anc >= -40: break
    if tt - prev >= 0.11: c(tt, 'tick', -21, 'objek', f'kartu repo {name} muncul'); prev = tt
# S7b agents world
t0 = 51.9
c(t0, 'particle', -14, 'cut', 'masuk dunia agent (editorial terang)')
names = ['Creative Pro', 'Developer', 'Sales Ops', 'Content Research', 'Content Strategy', 'Writing Partner']
for k, d in enumerate([0.35, 1.0, 1.55, 2.1, 2.6, 3.05]):
    a = t0 + d
    c(a - 0.3, 'bubble', -14, 'objek', f'agent {names[k]} muncul')
    c(a + 0.45, 'msg', -20, 'pesan', f'bubble {names[k]} mulai mengetik real time')
c(t0 + 0.2, 'whs', -26, 'kamera', 'kamera mundur perlahan')
# reveal
c(56.45, 'wend', -14, 'kamera', 'zoom out ke semua repo')
c(56.9, 'click', -18, 'UI', 'header GitHub + jumlah repo')
c(57.0, 'multipop', -14, 'objek', 'enam agent berbaris')
# S8 sadar
c(58.58, 'whs', -20, 'transisi', 'semua meredup dan blur')
c(59.9, 'shine6', -14, 'teks', '"sadar." muncul')
# S9/S10 lautan
c(63.34, 'bspread', -12, 'objek', 'grid kartu muncul')
c(63.36, 'txt', -18, 'teks', '"membangun."')
c(64.92, 'woosh', -16, 'kamera', 'zoom out kedua'); c(64.94, 'txt', -18, 'teks', '"membuat."')
c(66.82, 'txt', -18, 'teks', '"bikin software."'); c(67.16, 'velo', -14, 'kamera', 'zoom out jadi lautan')
for k in range(7): c(69.4 + k * 0.09, 'popclick', -22, 'objek', f'sel yang publish menyala {k+1}')
c(69.4, 'shine', -18, 'cahaya', 'yang publish naik dari grid')
c(71.24, 'multipop', -12, 'logo', 'logo platform asli muncul melingkar')
c(72.55, 'whs', -22, 'logo keluar', 'logo platform pergi')
c(72.88, 'txt', -16, 'teks', '"belum sempurna."')
# S11 loop
c(73.64, 'cut', -16, 'cut', 'masuk lingkaran build')
c(73.8, 'uiproc', -20, 'UI', 'progress bar building berjalan', dur=7.2)
for kk in range(1, 9):
    u = (-0.6 + math.sqrt(0.36 + 0.28 * kk)) / 0.14
    if 73.64 + u < 81.0: c(73.64 + u, 'off', -20, 'UI', f'progress reset ke 0 (putaran {kk})')
c(75.86, 'txt', -16, 'teks', '"kecanduan."'); c(77.45, 'whs', -24, 'teks keluar', 'kecanduan keluar')
c(80.04, 'click', -18, 'UI', 'tombol Publish (mati) muncul')
c(81.0, 'err', -14, 'UI', 'progress membeku 99 %'); c(81.02, 'glitch', -20, 'UI', 'lingkaran merah berhenti')
# S12 keputusan
c(82.4, 'riser', -16, 'transisi', 'rewind ke awal')
c(82.5, 'velo', -14, 'kamera', 'timeline digulung mundur')
c(84.6, 'whs', -20, 'fokus', 'kartu lain meredup')
c(85.12, 'sonar', -14, 'objek', 'titik awal: repo Jadisatu Nov 2025')
c(88.9, 'swoosh', -16, 'transisi', 'pindah ke grid profil')
c(89.3, 'click', -20, 'UI', 'header profil Instagram')
posts = [89.66, 91.1, 92.1] + [92.45 + k * 0.17 for k in range(6)]
for k, tt in enumerate(posts): c(tt, 'notify' if k < 3 else 'popclick', -14 if k < 3 else -18, 'objek', f'post {k+1} terunggah')
c(96.4, 'whs', -26, 'penutup', 'fade ke hitam')
for w in [15.68, 40.18, 51.9, 56.45, 82.4, 89.25]: c(w - 0.18, 'wipe', -14, 'transisi', 'sapuan blok piksel gradient (ref 03)')
c(15.0, 'riser', -18, 'kamera', 'kamera menembus teks 20-an')
c(21.15, 'whs', -24, 'objek', 'tanda kutip gradient (L4) melayang masuk')
c(32.9, 'popclick', -24, 'objek', 'chip UI (L4) muncul di depan kamera')
C.sort(key=lambda x: x['t'])
json.dump({'cues': C}, open('audio/cues.json', 'w'), ensure_ascii=False, indent=0)
print(len(C), 'cues; density', round(len(C) / 97.5, 2))
