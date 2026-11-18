"""Tulis remotion/src/data/naskah.ts: kata per adegan + waktu SEMENTARA dari rentang panel storyboard REVISI.
Saat VO terkunci, file ini diganti oleh versi yang membaca words.json (Whisper) dengan struktur sama."""
import json
P = [  # id, mulai, selesai (dtk, storyboard REVISI), kelompok tampil (dipisah |)
 ('P01', 0.0, 5.2, 'Kenapa banyak video | yang ada | di sosial media | sekarang terasa | flat dan | mirip-mirip?'),
 ('P02', 5.2, 5.6, 'Claude'),
 ('P03', 5.6, 7.2, 'sudah mengubah | industri kreatif,'),
 ('P04', 7.2, 11.2, 'dan membuat | banyak video | semakin mudah | diedit dalam | hitungan menit,'),
 ('P05', 11.2, 12.8, 'tapi rasanya | AI-slop.'),
 ('P06', 12.8, 22.0, 'Coba perhatiin | video yang dibuat | AI di berandamu: | visual berantakan, | mirip | satu sama lain, | latar krem | warna-warni, | siluet orang, | dan AI Slop.'),
 ('P07', 22.0, 28.4, 'Buat belajar | hal ini bagus | karena salah satu | cara belajar terbaik | adalah meniru | karya orang lain,'),
 ('P08', 28.4, 33.6, 'dan AI | bikin kita | sampai ke | hasil yang bagus | jauh lebih cepat.'),
 ('P09', 33.6, 38.0, 'Masalahnya, | begitu dipakai | buat brand, | hasilnya bisa | sangat mirip | dan familiar,'),
 ('P10', 38.0, 42.0, 'dan yang mirip? | biasanya | susah diingat'),
 ('P11', 42.0, 43.6, 'Founder itu | jualan kepercayaan,'),
 ('P12', 43.6, 47.6, 'dan kita seringkali | lebih mudah | ingat orangnya, | bukan videonya.'),
 ('P13', 47.6, 52.5, 'Jadi apa | yang membuat | video tetap | spesial, unik | dan mudah diingat?'),
 ('P14', 52.5, 56.7, 'ceritamu, | sudut pandangmu, | hal yang | cuma kamu alami.'),
 ('P15', 56.7, 58.3, 'Seleramu'),
]
out = {}
for pid, a, b, teks in P:
    groups = [g.strip().split() for g in teks.split('|')]
    words = [(w, gi) for gi, g in enumerate(groups) for w in g]
    span = (b - a) * 0.9  # sisakan 10 % untuk napas akhir panel
    total = sum(len(w) + 2 for w, _ in words)
    t = a; kata = []
    for w, gi in words:
        d = span * (len(w) + 2) / total
        kata.append({'t': w, 'mulai': round(t, 3), 'selesai': round(t + d, 3), 'kelompok': gi})
        t += d
    out[pid] = {'mulai': a, 'selesai': b, 'kata': kata}
ts = ('// DIBUAT OTOMATIS oleh audio/naskah_sementara.py — jangan diedit tangan.\n'
      '// Waktu SEMENTARA (storyboard REVISI). Akan diganti waktu VO terkunci dengan struktur sama.\n'
      'export type KataNaskah = {t: string; mulai: number; selesai: number; kelompok: number};\n'
      'export type Adegan = {mulai: number; selesai: number; kata: KataNaskah[]};\n'
      'export const SUMBER_WAKTU = "sementara";\n'
      f'export const NASKAH: Record<string, Adegan> = {json.dumps(out, ensure_ascii=False, indent=1)};\n'
      '/** Kata adegan dengan waktu relatif awal adegan (untuk komponen di dalam <Sequence>). */\n'
      'export const kataRelatif = (id: string) => { const a = NASKAH[id]; return a.kata.map((k) => ({...k, mulai: k.mulai - a.mulai, selesai: k.selesai - a.mulai})); };\n')
open('remotion/src/data/naskah.ts', 'w').write(ts)
print('ok', sum(len(v['kata']) for v in out.values()), 'kata')
