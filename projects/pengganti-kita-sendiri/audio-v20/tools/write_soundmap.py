"""Tulis SOUND-MAP.md dari events_v1.json (peta SFX sama untuk kedua video; beda hanya backsound)."""
import json, sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
import build as B

REASON = {
    'WORD': 'kata kinetik muncul -> Kinetictypography, varian diacak (tidak sama dua kali berturut)',
    'WORD1': 'kata pertama frasa kinetik (jeda >0.7 dtk) -> Katapertama',
    'EMPH': 'kata besar layar penuh / kartu kata (penekanan) -> Katapertama di frame + lapisan basmenyebar tipis (bobot, -6 dB)',
    'PHOTO': 'pergantian foto dalam montase -> Pergantianfoto, 9 varian dirotasi',
    'PHOTO1': 'gambar pertama montase -> Pergantianfoto:gambarpertama',
    'CUT': 'cut ke gambar baru (luminans berubah <0.35) -> Cut',
    'CONTRAST': 'cut gelap<->terang (luminans berubah >0.35, diukur dari video) -> Cutcontrastransision',
    'CAM': 'kamera bergerak nyata -> Wooshcameramovementtransisi, puncak digeser ke frame gerak tercepat',
    'WIPE': 'sapuan wipe layar penuh -> Woosh (puncak di sapuan tercepat)',
    'MOVE': 'objek bergerak (drag, kembali, terbang, mengecil, kalender dimampatkan) -> Move',
    'STEP': 'langkah figur user -> Move v01 (ketuk lembut), sangat pelan',
    'TYPE': 'rentang ketikan -> Keyboardtyping, varian disambung sepanjang rentang',
    'KEY': 'kata pendek diketik di layar (<0.4 dtk) -> 2-3 tuts tunggal Keyboardtyping',
    'ENTER': 'tombol kirim -> Enter',
    'AIPOP': 'AI muncul (agent, ikon AI, logo ChatGPT, kartu AI) -> Popup user interface : AI',
    'AIRESP': 'jawaban/hasil AI muncul (kartu balasan, landing page di orbit, denyut glyph) -> ResponAI',
    'AISTREAM': 'teks AI mengalir (bukan manusia mengetik) -> ES Scifi Computer Short Beeps (0.77 dtk ~ rentang 0.83)',
    'TICK': 'centang tugas selesai -> ES UI Buttons Confirm',
    'GLASS': 'blok kalender muncul -> ES UI Pops Glass (2 varian)',
    'POP': 'kartu/foto/titik UI muncul atau mendarat -> pop up',
    'CLICK': 'klik mouse / ambil kartu / bar -> ES UI Click Phone Tap (varian v02, v03)',
    'GONE': 'objek hilang (dibuang ke tempat sampah, grid memudar, diserap) -> ES UI Buttons Dissapear',
    'NOTIF': 'titik tujuan muncul di grafik -> Notif',
    'CURVE': 'garis/kurva digambar, scan dimulai -> Scanning dan gerak kurva',
    'LIGHT': 'lampu/sorot/layar menyala -> Lasertransision (nada F#6 bersih)',
    'LIGHTOFF': 'lampu/layar padam -> Lasertransision -5 semiton, lebih pelan (keluarga sama, arah turun)',
    'IMPACT': 'hantaman/boom objek -> basmenyebar dipotong ke hit utama, +3 semiton & saturasi ringan agar tidak terlalu deep dan terdengar di HP',
    'SPREAD': 'grid abu-abu menyebar (ribuan cerita) -> basmenyebar utuh (bas menyebar = makna harfiah)',
    'RISER': 'zoom-through / bloom menuju momen besar -> ES Riser Clean, puncak tepat di frame tujuan',
}

def main():
    ev = json.load(open('/home/claude/pks/v20/work/events_v1.json'))
    L = ['# SOUND-MAP PKS v20', '',
         'Satu peta SFX dipakai di Video 1 dan Video 2 (beda hanya backsound). Waktu = detik visual dari penanda render',
         '(`v11final.sfx`), dikoreksi dari gambar. Level = dB relatif punch VO (persentil-95 RMS 50 ms saat narator bicara).',
         'Dibuat otomatis oleh `tools/write_soundmap.py` dari `build.py`.', '',
         '## Keluarga bunyi (kata kode = keluarga)', '', '| keluarga | arti / file | level |', '|---|---|---|']
    for k, r in REASON.items():
        f = B.FAM[k]; lv = f.get('gain', 'Katapertama -11, basmenyebar -13')
        L.append(f'| {k} | {r} | {lv} |')
    L += ['', '## Penanda yang tidak diberi bunyi sendiri', '',
          'Satu momen = satu bunyi: bila dua penanda jatuh dalam 50 ms, yang berprioritas lebih tinggi dipakai',
          f'(urutan: {", ".join(B.PRIO)}); rentang ketik dan riser tidak digabung.', '',
          'Dibuang dari gambar (alasan di `build.py` DROP): ' + ', '.join(f'`{d}`' for d in sorted(B.DROP)), '',
          'Tidak dipakai: `scaningfast` (tidak ada scan cepat di gambar), `ES Swooshes Big Cinematic` (terlalu besar untuk gerak',
          'kamera video ini), `ES Glitch Databend` (tidak ada glitch di gambar), `ES Notification Message` (Notif Irfan sudah',
          'mewakili), `ES Click Sci-Fi Open`, `ES Bass Dive` (terlalu deep; kalender dimampatkan diberi Move), `Woosh` hanya untuk wipe.',
          '`Cut` = `Pergantianfoto:gambarpertama` (file identik) dan `Kinetictypography` = `Variasitransisiataucut` (file identik):',
          'Variasitransisiataucut tidak dipakai untuk cut agar kata dan cut tidak berbunyi sama.', '',
          '## Peristiwa', '', '| detik | objek (penanda) | bunyi + varian | level | catatan |', '|---|---|---|---|---|']
    for e in ev:
        note = []
        if e.get('merged'): note.append('menggabung ' + ', '.join(m.split(':', 1)[1] for m in e['merged']))
        if e.get('shift_ms'): note.append(f"puncak digeser {e['shift_ms']:+d} ms ke gerak tercepat")
        if e.get('layer'): note.append('lapisan ' + e['layer'])
        if e.get('dur'): note.append(f"rentang {e['dur']:.2f} dtk")
        if e.get('lift_db'): note.append(f"+{e['lift_db']} dB (jatuh di suku kata keras VO)")
        if e.get('trim_db'): note.append(f"{e['trim_db']} dB (di atas klip narasumber yang bicara)")
        L.append(f"| {e['t']:.3f} | `{e['ev'].split(':', 1)[1]}` | {e['fam']} · {e.get('variant', '')} | {e.get('level_db', '')} | {'; '.join(note)} |")
    L += ['', '## Backsound', '',
          '**Video 1 - Particle Emission penuh + ambience kantor.** Particle Emission (C minor, pad gelap-dreamy) dari detik 0',
          'sampai akhir; file ini membangun sendiri (lebih penuh mulai ~40 dtk dan ~80 dtk) dan itu jatuh di babak AI bekerja (41)',
          'dan "satu sukses di antara ribuan cerita gagal" (79). Ambience kantor (Epidemic, segmen 20-38 dtk file, HPF 150 Hz)',
          'hanya 32-50 dtk di bawah adegan "kita bekerja" (kalender, tugas, ketik prompt), 24 LU di bawah VO.', '',
          '**Video 2 - Reggae (awal sebelum piano) sebagai bookend + Particle Emission di tengah + ambience kantor.**',
          'Cold open 0-10.29 memakai awal Reggae (E mayor, pluck arpeggio melankolis; piano masuk di ~9.75 dtk file, jadi dipakai',
          '0.30-9.62 lalu diperpanjang satu bar dari fase yang sama, periode 3.12 dtk) dan berhenti bersama cut ke "Sadar" (10.29).',
          'Particle masuk dari cut itu dan membawa babak tengah. Tema Reggae yang sama kembali tepat di awal jeda VO 125.25',
          '(pre-lap 1.1 dtk ke cut "Peran Kamu" 126.35) sampai akhir: dibuka dengan dunia yang kagum pada AI, ditutup kembali',
          'ke manusia. Reggae (E) dan Particle (C minor) bentrok nada, jadi hanya bersilang 0.3 dtk (Particle habis 125.55).',
          'Documenter tidak dipakai: earshot membacanya sebagai rustle (burung mengepak / hewan kecil di rumput) di bawah cold open,',
          'bunyi tanpa objek di gambar.', '',
          'Level bed per bagian (LU relatif VO): ' + ', '.join(f'{t:g}s {v:+d}' for t, v in B.PLAN_BODY), '']
    pathlib.Path(__file__).resolve().parents[1].joinpath('SOUND-MAP.md').write_text('\n'.join(L), encoding='utf-8')
    print('SOUND-MAP.md', len(ev), 'peristiwa')

if __name__ == '__main__':
    main()
