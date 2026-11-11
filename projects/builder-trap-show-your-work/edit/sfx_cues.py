"""Cue SFX dari event visual v4 (aturan 43, guide/sfx). 1 peran = 1 file; gain setelah normalisasi puncak (−4…−10 dB)."""
import json, math
K = '/home/irfan/sfx/Kenyset/'; I = '/home/irfan/sfx/SFXIrfan/'
P = '/home/irfan/work/skill-development/projects/jadisatu-60s/remotion/sfx-el/'  # proven palette (audio.md §14.8)
ROLE = {  # peran: (file, gain dB) — §14.8
 'hook': (P + 'v17_thud_1.mp3', -4), 'slam': (P + 'v17_thud_1.mp3', -4), 'impact': (P + 'v17_impact_1.mp3', -6),
 'whoosh': (P + 'v17_whoosh_1.mp3', -6), 'whip': (P + 'v17_whip_1.mp3', -4), 'cut': (P + 'v17_click_0.mp3', -9),
 'kinetik': (K + 'mouse-click-290204.mp3', -5), 'kata-frasa': (K + 'mouse-click-290204.mp3', -8),
 'klik': (P + 'cursor_0.mp3', -6), 'ketik': (K + 'iphone-keyboard-typing-sound-effect-336778.mp3', -6),
 'pop': (K + 'soft-subtle-ui-pop-sfx-348820.mp3', -8), 'notif': (K + 'pop-up-notify-smooth-modern-332448.mp3', -6),
 'kamera': (P + 'swell_1.mp3', -7), 'riser': (P + 'v17_riser_1.mp3', -5), 'tick': (P + 'v17_tick_1.mp3', -6),
 'error': (K + 'sfx-erreur-363728.mp3', -6), 'flip': (K + 'flipcard-91468.mp3', -6), 'rattle': (K + 'multi-pop-2-188167.mp3', -6),
 'garis': (P + 'v17_glide_2.mp3', -7), 'kertas': (P + 'v17_shutter_1.mp3', -6),
 'ui-ai': (I + 'Popup user interface : AI.mp3', -7), 'logo': (I + 'ResponAI:AIpopup.mp3', -6), 'enter': (I + 'Enter.mp3', -4),
 'hapus': (K + 'ui-sound-off-270300.mp3', -6), 'terbit': (K + 'message-envoye-iphone-apple-391098.mp3', -11), 'ring': (K + 'sonar-ping-95840.mp3', -8),
}
WHOOSH_ROT = [P + 'v17_whoosh_1.mp3', P + 'v17_whoosh_2.mp3', P + 'v17_whoosh_3.mp3']  # §14.8: rotate 3 similar samples
C = []
def c(t, role, alasan, dur=None):
    f, g = ROLE[role]
    if role == 'whoosh': f = WHOOSH_ROT[sum(1 for x in C if x['peran'] == 'whoosh') % 3]
    C.append(dict(t=round(t, 3), file=f, db=g, peran=role, alasan=alasan, **({'dur': dur} if dur else {})))

# S1 wajah
c(0.0, 'hook', 'frame 0: kamera punch ke wajah (aturan 27)'); c(0.5, 'kinetik', '"terobsesi" berputar masuk bersama ucapannya')
c(1.66, 'kinetik', '"kesempurnaan." menggantikan "terobsesi"'); c(8.45, 'kinetik', '"siapa pun."')
c(11.07, 'cut', 'punch-in framing kedua'); c(15.4, 'kinetik', '"20-an" keluar (smear)'); c(11.9, 'kinetik', '"20-an" masuk'); c(11.95, 'tick', 'counter 0→20 berputar (T16)', dur=0.6)
c(15.0, 'kamera', 'dolly cepat dimulai menembus wajah'); c(15.75, 'whoosh', 'kamera terbang menembus wajah + sapuan blok (gerak cepat terlihat)')
c(30.53, 'kinetik', 'frasa "aku nggak mau jadi orang yang FOMO" (kata menuju FOMO)')
for tt, w in [(6.2, 'kesempurnaan'), (10.75, 'siapa pun'), (62.2, 'sadar'), (64.7, 'membangun'), (66.45, 'membuat')]: c(tt, 'kinetik', f'"{w}" keluar')
# S2 unik
c(16.05, 'kamera', 'kamera menembus lorong kerumunan figur abu'); c(16.72, 'pop', 'figur Irfan menyala biru di ujung lorong')
c(16.78, 'kinetik', '"unik."'); 
# S3 motivasi
c(19.68, 'cut', 'masuk feed Instagram'); c(19.75, 'pop', 'HP muncul')
c(20.1, 'kamera', 'kamera mendekat ke HP'); c(20.53, 'kata-frasa', 'feed di-scroll cepat (flick)'); c(21.05, 'whoosh', 'HP terlempar keluar, satu post terangkat'); c(21.12, 'kertas', 'post jadi kartu kutipan')
for w in json.load(open('remotion/src/captions.json'))['words']:
    if 21.5 <= w[0] < 25.5: c(w[0], 'kinetik', f'kata kutipan menyala "{w[2]}"')
# S4 FOMO
c(25.8, 'cut', 'masuk lorong layar tren'); c(26.05, 'garis', 'layar tren mulai mengorbit di dinding lorong'); 
c(27.1, 'kamera', 'kamera menyelam ke lorong menuju sosok Irfan'); c(31.28, 'kamera', 'lorong berputar makin cepat'); [c(x, 'whoosh', 'cincin layar terdekat menyapu melewati kamera') for x in (27.47, 28.97, 30.73)]; c(31.62, 'riser', 'arus blur sebelum FOMO'); c(31.86, 'slam', '"FOMO" menghantam + punch kamera'); c(32.13, 'pop', '"FOMO" mendarat setelah guncang'); c(32.43, 'whoosh', '"FOMO" keluar dengan smear (gerak cepat)')
# S5 malam
c(32.66, 'cut', 'masuk adegan malam'); c(33.2, 'tick', 'jam dinding berputar cepat (waktu yang diinvestasikan)', dur=1.2); c(33.0, 'kamera', 'dolly pelan ke meja')
c(34.07, 'garis', 'cahaya monitor menyapu lantai'); c(34.4, 'ui-ai', 'monitor menyala menampilkan ChatGPT'); c(35.17, 'kamera', 'kamera mulai menyelam ke monitor'); c(35.75, 'whoosh', 'kamera menyelam ke monitor (gerak cepat)')
# S6 ChatGPT
c(36.0, 'klik', 'UI ChatGPT tersusun'); c(36.2, 'logo', 'logo ChatGPT asli dicap'); c(37.27, 'whoosh', 'panel logo naik keluar (cepat)')
c(37.7, 'kamera', 'push-in ke kolom input'); c(38.17, 'kata-frasa', 'push-in mendarat: kursor mulai berkedip di kolom input + frasa caption baru'); c(38.53, 'tick', 'caret mulai berkedip di kolom input'); c(39.4, 'ketik', 'mengetik "build something"', dur=0.6); c(39.95, 'enter', 'kirim')
# S7 Threads
c(40.1, 'whip', 'whip pan ChatGPT → Threads (ganti topik, aturan 42)'); c(40.32, 'pop', 'modal New thread terbuka')
c(40.55, 'kamera', 'zoom ke isi modal'); c(40.7, 'ketik', 'mengetik perjalanan', dur=1.7); c(43.34, 'ketik', 'mengetik baris jualan', dur=0.6)
c(44.08, 'klik', 'baris jualan diseleksi'); c(44.3, 'hapus', 'baris jualan dihapus')
c(44.85, 'kamera', 'pan ke tombol Post'); c(45.55, 'pop', 'hover di Post (tidak diklik)')
c(46.5, 'kamera', 'kursor mundur, pan ke Cancel'); c(46.77, 'kata-frasa', 'kursor bergerak ke Cancel'); c(46.96, 'klik', 'klik Cancel'); c(47.0, 'notif', 'dialog Save to drafts?')
c(47.36, 'enter', 'klik Save (konfirmasi)'); c(47.77, 'pop', 'modal tertutup, halaman kembali')
# S8 kalender
c(48.26, 'riser', 'push-through Threads → kalender')
c(49.13, 'kata-frasa', 'tile repo Maret 2026 bermunculan')
for k, tt in enumerate([48.4, 49.4, 50.4, 51.4]):
    c(tt, 'flip', f'halaman kalender ke-{k+1} membalik'); c(tt + 0.3, 'rattle', f'tile repo halaman ke-{k+1} muncul')
# S9 OpenBot
c(51.9, 'whip', 'whip pan kalender → Mac'); c(52.1, 'ketik', 'pertanyaan ke Personal Asisten', dur=0.7)
for at, name in [(0.6, 'Creative Pro'), (1.6, 'Developer'), (2.9, 'Writing Partner')]: c(51.9 + at, 'notif', f'{name}: status done (rangkaian status agent)')
c(52.62, 'pop', 'avatar Creative Pro keluar dari jendela'); c(54.12, 'pop', 'avatar Content Research keluar dari jendela')
c(53.0, 'kata-frasa', 'garis NEW di chat OpenBot'); c(53.2, 'kamera', 'pan ke chat'); c(53.5, 'ketik', 'balasan agent mengalir', dur=1.6); c(55.3, 'kamera', 'kamera mundur'); c(55.77, 'kata-frasa', 'jendela OpenBot utuh terlihat')
# S10 setahun
c(56.45, 'cut', 'ke tampilan setahun'); c(56.5, 'whoosh', 'zoom out cepat ke 13 bulan'); c(56.65, 'pop', 'kartu repo pinned GitHub tersusun'); c(56.75, 'tick', 'contribution graph terisi hari-hari push', dur=0.8); c(57.1, 'rattle', 'enam agent di profil'); c(57.53, 'kata-frasa', 'contribution graph selesai terisi')
# S11 sadar
c(58.58, 'cut', 'kembali ke wajah'); c(59.9, 'kinetik', '"sadar."'); c(61.0, 'cut', 'jump cut di footage (sambungan EDL C→D)')
# S12 lautan
c(62.4, 'cut', 'potong ke lautan pembangun'); c(62.55, 'kamera', 'kamera mundur memperlihatkan barisan builder'); c(63.0, 'kinetik', 'pengantar "semua orang tuh bisa" naik'); c(63.36, 'kinetik', '"membangun."')
c(64.92, 'kinetik', '"membuat."'); c(65.1, 'pop', 'jendela app bermunculan di atas meja'); c(66.82, 'kinetik', '"bikin software."'); c(67.5, 'cut', 'layar barisan builder padam, kecuali beberapa'); 
c(67.6, 'kinetik', '"nggak semua orang."'); c(68.07, 'kata-frasa', 'warna "nggak semua orang." patah biru → tinta (ketukan kedua G4)'); c(69.4, 'rattle', 'beberapa orang mengangkat kartu Post biru'); c(70.17, 'pop', 'kartu Post keenam terangkat penuh'); c(69.95, 'whoosh', 'pesawat kertas terbang dari kartu Post'); c(70.43, 'terbit', 'kiriman pertama keluar dari layar'); c(72.63, 'whoosh', 'logo platform terlempar keluar'); c(71.24, 'rattle', 'logo platform asli muncul'); c(72.88, 'kinetik', '"belum sempurna."')
# S13 kecanduan
c(73.64, 'cut', 'masuk form GitHub')
CR = []; x, d = 73.9, 1.3
while x < 80.0 and len(CR) < 14: CR.append(x); x += d; d = max(0.15, d * 0.76)
c(73.9, 'ketik', 'mengetik nama repo terus-menerus (makin cepat)', dur=6.1)
last_k = last_p = -9
for i, st in enumerate(CR):
    dd = (CR[i + 1] if i + 1 < len(CR) else 80.0) - st
    if st + dd * 0.7 - last_k >= 1.0: c(st + dd * 0.7, 'klik', f'Create repository #{i+1}'); last_k = st + dd * 0.7
    if st + dd - last_p >= 1.0: c(st + dd, 'pop', f'repo #{i+1} jatuh ke tumpukan'); last_p = st + dd
c(77.6, 'rattle', 'repo berjatuhan makin rapat (tanda rapat = satu rattle)'); c(79.5, 'rattle', 'tumpukan repo menggunung (rattle kedua)')
c(75.86, 'kinetik', '"kecanduan."'); c(80.04, 'notif', 'kartu Releases kosong'); c(80.45, 'kata-frasa', 'kartu Releases mendarat'); c(81.0, 'error', 'semua progress membeku + guncang'); c(82.1, 'kata-frasa', 'tumpukan diam, sebelum sapuan')
# S14 keputusan
c(82.4, 'riser', 'push-through ke kalender yang digulung mundur')
for k, tt in enumerate([82.6, 83.6, 84.6]): c(tt, 'flip', f'kalender mundur halaman ke-{k+1}')
c(85.12, 'ring', 'titik awal: repo Jadisatu Nov 2025'); c(86.97, 'kamera', 'push-in mendekat ke label TITIK AWAL')
c(87.23, 'kata-frasa', 'tile Jadisatu, sebelum sapuan'); c(87.55, 'whoosh', 'sapuan blok ke Threads'); c(88.45, 'kamera', 'kamera mendarat di composer Threads'); c(87.9, 'ketik', 'mengetik thread baru', dur=1.5)
c(89.5, 'klik', 'klik Post (kali ini terkirim)'); c(90.1, 'pop', 'feed bergeser, post pertama masuk')
c(94.3, 'kamera', 'push-in penutup ke post terbaru'); c(92.45, 'pop', 'feed bergeser, post baru di atas'); c(92.95, 'kata-frasa', 'post "Yang aku buat" mendarat di feed')
for tt, w in [(89.7, 'Hari pertama'), (91.1, 'Yang aku alami'), (92.1, 'Yang aku buat'), (93.5, 'Pengalaman yang aku dapatkan')]: c(tt, 'terbit', f'post terbit: {w}')
# satu bunyi per frasa caption (1 pesan = 1 bunyi), kecuali bentrok ±0,1 dtk dengan cue lain
taken = [x['t'] for x in C]
for cap in json.load(open('remotion/src/captions.json'))['caps']:
    if 21.5 <= cap['s'] < 25.75: continue
    fr = [x['t'] for x in C if x['peran'] == 'kata-frasa']
    if all(abs(cap['s'] - x) > 0.1 for x in taken) and all(abs(cap['s'] - x) >= 1.0 for x in fr): c(cap['s'], 'kata-frasa', 'frasa caption: ' + ' '.join(w[1] for w in cap['words']))
C.sort(key=lambda x: x['t'])
json.dump({'cues': C}, open('audio/cues.json', 'w'), ensure_ascii=False, indent=0)
print(len(C), 'cues; density', round(len(C) / 97.5, 2))
