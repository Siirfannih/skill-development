"""v6 (turunan v3/sil5.py, aturan sama): buang filler + jeda di dalam tiap bite -> v3/speech5.json (potongan ucapan per bite, detik klip sumber).
- Jeda: energi DeepFilterNet (frame 10 ms), sunyi >= 0,18 dtk dibuang, sisakan 0,04 dtk di tiap sisi.
- Filler: kata Whisper (prompt filler, v3/words5.json) yang cocok pola filler + rentang manual yang sudah dicek dengar-transkrip,
  dipotong di titik paling pelan terdekat.
- Lubang < 0,06 dtk dianggap konsonan (tidak dipotong)."""
import json, re, numpy as np, soundfile as sf, librosa
SRC = {'0361': [(10, '../v3/vo_src/dfn18/0361_10_DeepFilterNet3.wav')], '0378': [(10, 'vo_src/dfn24/0378_10_DeepFilterNet3.wav')],
       '0530': [(105, 'vo_src/dfn24/0530_105_DeepFilterNet3.wav')], '0525': [(172, 'vo_src/dfn24/0525_172_DeepFilterNet3.wav')],
       '0426': [(12, 'vo_src/dfn24/0426_12_DeepFilterNet3.wav')], '0531': [(95, 'vo_src/dfn24/0531_95_DeepFilterNet3.wav')],
       '0399': [(36, 'vo_src/dfn24/0399_36_DeepFilterNet3.wav')],
       '0704': [(0, 'raw23/dfn24/a_0704_DeepFilterNet3.wav')], '0712': [(0, 'raw23/dfn24/a_0712_DeepFilterNet3.wav')],
       '0713': [(0, 'raw23/dfn24/a_0713_DeepFilterNet3.wav')], '0718': [(0, 'raw23/dfn24/a_0718_DeepFilterNet3.wav')],
       '0723': [(0, 'raw23/dfn24/a_0723_DeepFilterNet3.wav')]}   # v9: testimoni Day 2 (Irfan)
# bite (batas luar): B1 berhenti setelah "buat", B2 mulai di "mendalami" -> "eee, apa sih ini bilangnya?" hilang
B = [('H', '0361', 12.46, 15.26), ('D1', '0378', 12.26, 16.90), ('D2', '0530', 114.40, 121.60), ('T1a', '0525', 174.70, 183.62), ('T1b', '0525', 183.90, 190.56),
     ('I1', '0426', 14.30, 27.28)   # v10: 'Eee,' datar 13,91-14,25 dibuang (celah 14,27-14,33)
    , ('T2', '0531', 100.28, 109.42), ('C1', '0399', 39.70, 49.86), ('C2', '0399', 73.60, 75.36),
     ('C3', '0399', 54.80, 66.74),
     # v9 (Irfan 15 Nov): testimoni tambahan Day 2 — batas diukur dari lembah energi sebelum suara pewawancara
     ('K1', '0712', 41.99, 48.56), ('K2', '0723', 14.06, 17.36), ('K3', '0713', 68.26, 76.41), ('K4', '0718', 293.99, 303.33),
     ('P1', '0704', 62.90, 76.26), ('P2', '0712', 153.56, 154.88), ('R2', '0712', 127.00, 128.72)]   # v10: mulai di celah sesudah '1 per 10,' (candaan)
# v8d (Irfan 14 Nov): b = perkiraan AKHIR KALIMAT; titik akhir sebenarnya dicari otomatis = awal sunyi >= 80 ms sesudahnya
# (penutupan /t/ /k/ /p/ < 80 ms tidak dihitung sunyi: "dinikma|ti" 120,96-121,02 dan "Fes|t" 183,70-183,76 dulu terpancung).
# D2 diperpanjang ke akhir kalimat "...yang bisa dinikmati oleh banyak orang."; C3 utuh tanpa potongan isi (Irfan: harapan jangan dipotong).
# v8 (Irfan 14 Nov): bite dipotong di AKHIR KALIMAT (konteks), bukan mengikuti adegan: "wah gila ini.", "inovasi sih.",
# "seni yang bisa dinikmati.", "kegiatan ini, yaitu ... Festival.", "teman-teman baru di lingkungan ini.", "dikolaborasi dan elaborasi.",
# "daerah-daerah yang mempunyai potensi."; I1 diberi konteks workshop claymaking; Q = pertanyaan pewawancara sebelum "8,5".
# Batas akhir diukur dari lembah energi sesudah kata terakhir (batas kata whisper meleset s.d. 0,25 dtk).
# rentang yang dibuang karena isi (bukan jeda): keputusan naskah v6 (Irfan 13 Nov)
CUT = {'T1a': [(174.89, 175.24), (177.72, 178.88), (180.12, 180.33), (181.74, 182.03)],   # v8g: '-dah' sisa + desis jeda (Irfan: 'karena sudah ---- menciptakan ---- sebuah ---- kegiatan')   # v8f: 'Prima..kara' jeda dalam kata dibuang tepat sebelum letupan /k/ (175,29)
                          # "sudah" kedua (T1b mulai di "ini benar-benar"; "yaitu digital festival" dibuang)
       'C1': [],                         # "artinya menambah wawasan, artinya" (v8: '-nya' bocor s.d. 42,78; 'ternyata' mulai 43,36)
       'I1': [(16.46, 18.80), (20.56, 21.44), (22.58, 23.86)],   # v10: + 'membuat, ee, sketsa' (ee datar 20,82-21,36; celah ke celah)
       'K1': [(46.32, 46.99)],                         # v10: 'pas ikut, eh?, seneng' (eh 46,42-46,58 pitch naik; celah ke celah)         # "kelanjutan dari," ('workshop' = 15,87-16,41) + "dua dimensi. Nah," (v8: konteks workshop)
       }                         # "lebih ditingkatkan jika bisa pindah tempat" (v7: 'saya' = s 55,60 + ya s.d. 55,84 dari pitch/centroid; potong lama 55,62 memancung 'saya')
FILLER = re.compile(r"^(e+h*m*|eh|em+|hmm+|ehm+|uh+|um+)[,.?!…]*$", re.I)
MANUAL = {}          # bid -> [(a, b)] rentang filler tambahan (diisi setelah verifikasi dengar-transkrip)
# vokal ditahan yang diukur manual (probe5.py: pitch datar, energi tinggi) tapi tidak tertangkap filter kata panjang
MANUAL_HOLD = {}
END = {}   # "seni": ekor -ni sampai 119,95, lembah energi 120,00-120,10 sebelum "yang" (gagal v6: suara hilang mendadak)
# batas yang diverifikasi manual (dengar-transkrip + pitch): C2 berhenti sebelum pewawancara "8,5 kenapa tuh?" (75,50);
# C1 "elaborasi" = vokal s.d. 49,74 + desis '-si' tak bersuara s.d. ~49,95 (pitch 0, bukan suara pewawancara)
FIXED = {'K1': (41.99, 48.56), 'K2': (14.06, 17.36), 'K3': (68.26, 76.41), 'K4': (293.99, 303.33), 'P1': (62.90, 76.26),
         'P2': (153.56, 154.88), 'R2': (127.00, 128.72),   # v10f: 128,36 memotong 'deh' (whisper: '10 persen'); sunyi -47 dB di 128,70   # P2 'da|teng' penutupan /t/ 154,60-154,67; K2 sampai 'pertama'
         'C2': (73.33, 75.48), 'C1': (43.34, 49.98),   # v8g: 'sangat tertarik' dibuang (Irfan: kurang jernih, bertabrakan)
          'T1a': (174.31, None), 'D2': (114.40, None)}   # D2: 114,02-114,32 masih 'luas'   # v10f: T1a 174,28 membawa ekor 'dan' (whisper final: 'Dan untuk')
# v8d awal kalimat utuh (bukan di tengah aliran): D1 "Jelas, Bali Digifest..."; D2 "Jadi, pastinya di sini..."; T2 mulai di "perasaan kami"
# yang kedua (100,28; "izin diwakilkan" tidak ikut); I1 "Nah, dari dua dimensi..."; T1a "Pri-" mulai 174,58 (start 174,75 memancungnya)
NOGAP = {'T1a'}
SILOFF = {'R2'}   # 'sepuluh per sepuluh deh': ucapan cepat, jeda antarkata dibiarkan   # "karena sudah | menciptakan"
HOP = 0.01; KEEP = 0.04; MINSIL = 0.12; HOLE = 0.06   # v8f (Irfan: 'jangan ada jeda sama sekali'): diam >= 0,12 dtk dibuang, sisa 0,04   # v8d: hanya jeda panjang yang dibuang (0,18 memotong jeda di dalam 'Prima..kara')
W5 = json.load(open('words6.json')); W5['T1a'] = W5['T1b'] = W5['T1']   # T1 dipecah jadi hook (a) + workshop (b)
out = {}
def env10(x, sr, off, t0, t1):
    h = int(sr * 0.01); return np.array([20 * np.log10(np.sqrt(np.mean(x[int((t - off) * sr):int((t - off) * sr) + h] ** 2)) + 1e-9) for t in np.arange(t0, t1, 0.01)])
def sentence_end(x, sr, off, tE, ref, quiet_ms=80, cap=0.6):
    # awal sunyi pertama (energi <= ref-28 selama >= quiet_ms) sesudah tE-0.05; kalau tak ada, lembah terdalam
    e = env10(x, sr, off, tE - 0.05, tE + cap); k = quiet_ms // 10
    for i in range(len(e) - k):
        if (e[i:i + k] <= ref - 28).all(): return round(tE - 0.05 + i * 0.01 + 0.03, 3)
    return round(tE - 0.05 + int(np.argmin(e)) * 0.01, 3)
def sentence_start(x, sr, off, tS, ref, quiet_ms=60, cap=0.15):
    e = env10(x, sr, off, tS - cap, tS + 0.05); k = quiet_ms // 10
    for i in range(len(e) - k, -1, -1):
        if (e[i:i + k] <= ref - 28).all(): return round(tS - cap + (i + k) * 0.01 - 0.03, 3)
    return round(tS - cap + int(np.argmin(e)) * 0.01, 3)
for bid, c, a, b in B:
    off, f = [x for x in SRC[c] if x[0] <= a][-1]; x, sr = sf.read(f)
    if x.ndim == 2: x = x.mean(1)
    ref = np.percentile(env10(x, sr, off, a, b), 90)
    a0, b0 = a, b; a = sentence_start(x, sr, off, a, ref); b = sentence_end(x, sr, off, b, ref)
    if bid in FIXED: a, b = FIXED[bid][0] or a, FIXED[bid][1] or b
    print(f'  {bid}: awal {a0:.2f}->{a:.2f}  akhir {b0:.2f}->{b:.2f} (ref p90 {ref:.0f} dB)')
    h = int(sr * HOP); seg = x[int((a - off) * sr):int((b - off) * sr)]
    e = np.array([20 * np.log10(np.sqrt(np.mean(seg[i:i + h] ** 2)) + 1e-9) for i in range(0, len(seg) - h + 1, h)])
    thr = max(np.percentile(e, 90) - 30, -54)   # hanya sunyi sungguhan; -26 memotong suku kata lemah ("nge-la-ku-in")
    v = e > thr
    # isi lubang pendek (konsonan / letupan)
    n = len(v); i = 0
    while i < n:
        if not v[i]:
            j = i
            while j < n and not v[j]: j += 1
            if 0 < i and j < n and (j - i) * HOP < HOLE: v[i:j] = True
            i = j
        else: i += 1
    # jeda panjang yang tidak sepenuhnya sunyi (napas/noise): energi <= p90-26 selama >= 0,35 dtk -> jeda (C1 44,00-44,92)
    thr2 = max(np.percentile(e, 90) - 22, -50); low = e <= thr2; i = 0   # v8f: diam terdengar (<= ref-22) >= 0,18 dtk dibuang
    while i < n:
        if low[i]:
            j = i
            while j < n and low[j]: j += 1
            if (j - i) * HOP >= 0.18 and i > 0 and j < n: v[i:j] = False
            i = j
        else: i += 1
    # v10: kata yang dikenali whisper tidak boleh dipotong (kata yang diucapkan pelan, mis. 'tempat' -21 dB, dulu terbuang sebagai jeda)
    for w in W5.get(bid, {}).get('words', []):
        if FILLER.match(w[2]) or not (a <= w[0] and w[1] <= b): continue
        i0 = max(0, int((w[0] + 0.04 - a) / HOP)); i1 = min(n, int((w[1] - 0.04 - a) / HOP))
        if i1 > i0: v[i0:i1] |= e[i0:i1] > np.percentile(e, 90) - 32   # hanya bagian yang masih bergelombang (kata pelan tetap utuh)
    # filler -> paksa sunyi
    fill = [(w[0], w[1]) for w in W5.get(bid, {}).get('words', []) if FILLER.match(w[2]) and a <= w[0] < b] + MANUAL.get(bid, []) + CUT.get(bid, [])
    for fa, fb in fill:
        i0 = max(0, int((fa - a) / HOP)); i1 = min(n, int((fb - a) / HOP) + 1)
        v[i0:i1] = False
    # potongan ucapan
    parts = []; i = 0
    while i < n:
        if v[i]:
            j = i
            while j < n and v[j]: j += 1
            parts.append([i, j]); i = j
        else: i += 1
    # gabungkan potongan yang jaraknya < MINSIL (jeda pendek dibiarkan alami)
    merged = []
    for p in parts:
        if merged and (p[0] - merged[-1][1]) * HOP < MINSIL: merged[-1][1] = p[1]
        else: merged.append(p)
    res = [[round(a + max(0, p[0] * HOP - KEEP), 3), round(a + min(n, p[1]) * HOP + KEEP, 3)] for p in merged]
    if bid in SILOFF: res = [[a, b]]
    res[0][0] = a; res[-1][1] = b          # batas luar bite sudah dicek per 40 ms (v3)
    # v8d: batas potongan ISI tepat di titik yang diverifikasi (KEEP tidak berlaku: KEEP 0,08 menyeret ke kata yang dibuang)
    for ca, cb in CUT.get(bid, []):
        for r in res:
            if abs(r[0] - cb) < 0.15: r[0] = cb
            if abs(r[1] - ca) < 0.15: r[1] = ca
    # v7: ujung bite yang terpancung, diukur per bite (bukan otomatis: otomatis ikut menyeret kata yang sengaja dibuang)

    res = [r for r in res if r[1] - r[0] >= 0.12 or r is res[0]]
    # vokal ditahan (mikir, "mereee-ka"): pitch stabil + spektrum hampir diam + masih bersuara, > 0,24 dtk
    # -> buang bagian tengahnya, sisakan 0,05 dtk di tiap sisi (disambung crossfade 20 ms di mixer)
    y32 = seg.astype(np.float32); hh = int(sr * 0.02)
    mf = librosa.feature.mfcc(y=y32, sr=sr, n_mfcc=13, hop_length=hh, n_fft=2048)[1:]
    fl = np.r_[0, np.linalg.norm(np.diff(mf, axis=1), axis=0)]
    f0 = librosa.yin(y32, fmin=70, fmax=400, sr=sr, frame_length=2048, hop_length=hh)
    e2 = 20 * np.log10(librosa.feature.rms(y=y32, frame_length=hh, hop_length=hh)[0] + 1e-9) - np.percentile(e, 90)
    m = min(len(fl), len(f0), len(e2))
    fls = np.array([np.median(fl[max(0, k - 1):k + 2]) for k in range(m)])
    st = (e2[:m] > -12) & (np.abs(np.r_[0, np.diff(f0[:m])]) < 5) & (f0[:m] < 380)   # pitch datar = vokal ditahan
    holds = []; i = 0
    while i < m:
        if st[i]:
            j = i
            while j < m and st[j]: j += 1
            if (j - i) * 0.02 > 0.24: holds.append((a + i * 0.02 + 0.06, a + j * 0.02 - 0.06))
            i = j
        else: i += 1
    # hanya di dalam kata yang memanjang tidak wajar (> 0,26 dtk per suku kata, waktu kata dari words5)
    longw = [(w[0], w[1], w[2]) for w in W5[bid]['words'] if (w[1] - w[0]) / max(1, len(re.findall(r'[aiueo]+', w[2].lower()))) > 0.26]
    holds = [(ha, hb) for ha, hb in holds if any(s0 - 0.05 <= ha and hb <= s1 + 0.05 for s0, s1, _ in longw)]
    holds = []   # v8d: pemendekan vokal ditahan DIMATIKAN (memotong di tengah vokal = 'suara hilang tiba-tiba')
    holds += MANUAL_HOLD.get(bid, [])
    for ha, hb in holds:
        new = []
        for p, q in res:
            if p < ha and hb < q: new += [[p, round(ha, 3)], [round(hb, 3), q]]
            else: new.append([p, q])
        res = new
    if holds: print('    vokal ditahan dipendekkan:', [(round(p, 2), round(q, 2)) for p, q in holds])
    # sambungan jeda/vokal yang kasar (joins: rasio spektrum > 2,5 dan kedua sisi bersuara > -40 dB) dibatalkan: jedanya dibiarkan
    def mfv(y): return librosa.feature.mfcc(y=y.astype(np.float32), sr=sr, n_mfcc=13, n_fft=1024, hop_length=len(y) + 1)[1:, 0]
    Mb = librosa.feature.mfcc(y=seg.astype(np.float32), sr=sr, n_mfcc=13, n_fft=1024, hop_length=int(0.02 * sr))[1:]
    base = np.median(np.linalg.norm(np.diff(Mb, axis=1), axis=0)); hj = int(0.02 * sr); merged2 = [list(res[0])]
    for p, q in res[1:]:
        p1 = merged2[-1][1]; u = x[int((p1 - off) * sr) - hj:int((p1 - off) * sr)]; w = x[int((p - off) * sr):int((p - off) * sr) + hj]
        eu, ew = [20 * np.log10(np.sqrt(np.mean(z ** 2)) + 1e-9) for z in (u, w)]
        r = np.linalg.norm(mfv(u) - mfv(w)) / base
        content = any(abs(ca - p1) < 0.12 or abs(cb - p) < 0.12 for ca, cb in CUT.get(bid, []))
        if r > 2.5 and min(eu, ew) > -40 and not content:
            merged2[-1][1] = q; print(f'    sambungan kasar {p1:.2f}|{p:.2f} r={r:.1f} -> dibatalkan')
        else: merged2.append([p, q])
    res = merged2
    # v10 (Irfan 15 Nov): JANGAN memotong gelombang yang masih ada. Potong hanya di celah tanpa gelombang:
    # 20 ms terakhir yang dipakai di ujung potongan dan 20 ms pertama di awal potongan harus sudah 'sunyi'
    # (<= max(ref-30, lantai noise+4 dB)); bila belum, geser keluar sampai gelombang habis (maks 0,30 dtk; ujung luar bite maks 0,08).
    # Celah yang tersisa < 60 ms -> potongan digabung (tidak ada potong).
    eb = env10(x, sr, off, res[0][0], res[-1][1]); refb = np.percentile(eb, 90); floor = np.percentile(eb, 10)
    QUIET = max(refb - 30, floor + 4)
    def lvl(t0, t1):
        s_ = x[max(0, int((t0 - off) * sr)):int((t1 - off) * sr)]; return 20 * np.log10(np.sqrt(np.mean(s_ ** 2)) + 1e-9) if len(s_) else -99
    snapped = []
    for k, (p, q) in enumerate(res):
        lim_q = (0.0 if bid in FIXED and FIXED[bid][1] else 0.08) if k == len(res) - 1 else 0.30   # ujung luar terverifikasi: dikunci
        lim_p = (0.0 if bid in FIXED and FIXED[bid][0] else 0.08) if k == 0 else 0.30
        if any(abs(q - ca) < 0.03 for ca, cb in CUT.get(bid, [])): lim_q = 0.0     # ujung potongan isi sudah diverifikasi: dikunci
        if any(abs(p - cb) < 0.03 for ca, cb in CUT.get(bid, [])): lim_p = 0.0
        dq = 0.0
        while lvl(q + dq - 0.02, q + dq) > QUIET and dq < lim_q: dq += 0.01
        dp = 0.0
        while lvl(p - dp, p - dp + 0.02) > QUIET and dp < lim_p: dp += 0.01
        snapped.append([round(p - dp, 3), round(q + dq, 3)])
    merged3 = [snapped[0]]
    for p, q in snapped[1:]:
        if p - merged3[-1][1] < 0.06: merged3[-1][1] = max(merged3[-1][1], q)
        else: merged3.append([p, q])
    if len(merged3) != len(res) or merged3 != res: print(f'    snap celah: {len(res)} -> {len(merged3)} potongan (sunyi <= {QUIET:.0f} dB)')
    res = merged3
    # v10b: ujung/awal yang MASIH bergelombang di sisi yang dipakai -> geser keluar s.d. 0,12 dtk ke titik sunyi pertama
    # (> batas = max(ref-26, lantai+10)). Ujung luar bite FIXED yang menempel suara orang lain tidak digeser.
    LIM = max(refb - 26, floor + 10)
    for k, r in enumerate(res):
        outer_q = k == len(res) - 1 and bid in FIXED and FIXED[bid][1]
        outer_p = k == 0 and bid in FIXED and FIXED[bid][0]
        nxt = res[k + 1][0] if k + 1 < len(res) else 1e9; prv = res[k - 1][1] if k > 0 else -1e9
        if not outer_q and lvl(r[1] - 0.02, r[1]) > LIM:
            for dq in np.arange(0.01, 0.13, 0.01):
                if r[1] + dq >= nxt - 0.03: break
                if lvl(r[1] + dq - 0.02, r[1] + dq) <= LIM: r[1] = round(r[1] + dq, 3); break
        if not outer_p and lvl(r[0], r[0] + 0.02) > LIM:
            for dp in np.arange(0.01, 0.13, 0.01):
                if r[0] - dp <= prv + 0.03: break
                if lvl(r[0] - dp, r[0] - dp + 0.02) <= LIM: r[0] = round(r[0] - dp, 3); break
    tot = sum(q - p for p, q in res)
    cutj = [i for i, (p, q) in enumerate(res) if i > 0 and any(abs(cb - p) < 0.12 for ca, cb in CUT.get(bid, []))]
    cutj = []   # v8f: tanpa jeda koma sisipan (Irfan: langsung lanjut)
    if bid in NOGAP: cutj = []   # v8e: potongan di tengah frasa tanpa koma -> tanpa jeda sisipan (jeda 0,15 terdengar bolong)
    # v8: ruang ekor/awal: fade akhir (maks 0,14) dan awal (maks 0,06) berhenti sebelum suara berikutnya (> p90-20 dB),
    # supaya ekor kata utuh tanpa menyeret awal kata/orang berikutnya
    pk = np.percentile(e, 90) - 20
    def room(t0, d, step):
        k = 0.0
        while k < d:
            u = t0 + (k if step > 0 else -k - 0.01); i = int((u - off) * sr)
            if i < 0 or i + int(sr * 0.01) > len(x): break
            if 20 * np.log10(np.sqrt(np.mean(x[i:i + int(sr * 0.01)] ** 2)) + 1e-9) > pk: break
            k += 0.01
        return round(max(0.02, k - 0.01), 3)
    def tail(t0, cap=0.25):
        # ekor kata yang meluruh ikut (s, napas akhir) sampai benar-benar pelan; berhenti bila ada onset baru (naik > 6 dB)
        hh = int(sr * 0.01); mn = 1e9; k = 0.0; best = 0.02
        while k < cap:
            i = int((t0 + k - off) * sr)
            if i + hh > len(x): break
            v = 20 * np.log10(np.sqrt(np.mean(x[i:i + hh] ** 2)) + 1e-9)
            if v > mn + 6 and v > pk: break
            mn = min(mn, v); best = k
            if v < pk - 6: break
            k += 0.01
        return round(max(0.02, best), 3)
    post = max(room(res[-1][1], 0.14, 1), tail(res[-1][1])); pre = room(res[0][0], 0.06, -1)
    out[bid] = dict(clip=c, parts=res, cut_after=cutj, pre=pre, post=post)
    print(f'    ruang awal {pre:.2f} / ekor {post:.2f}')     # cut_after: indeks potongan yang didahului potongan isi (beri jeda koma)
    print(f"{bid} {c} {a}-{b} ({b-a:.2f}) -> {len(res)} potongan, {tot:.2f} dtk (hemat {b-a-tot:.2f}); filler {fill}")
    print('   ', res)
json.dump(out, open('speech6.json', 'w'), indent=1)
