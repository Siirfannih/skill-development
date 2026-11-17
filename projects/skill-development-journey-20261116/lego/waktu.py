#!/usr/bin/env python3
"""Waktu video dari edit/words.json (SELALU turunan, tidak ada angka hardcode). Dipakai bangun.py.

- unit: kata mentah digabung per ejaan naskah (transkrip-hasil.md): ChatGPT, putus-putus, 100%, Apple style, ...
- T: semua jangkar waktu (detik) dicari lewat kata, bukan lewat angka.
"""
import json, os, re, sys

P = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKRIP = os.path.expanduser("~/work/skill-development/claude/motion-graphic/scripts")
sys.path.insert(0, os.path.join(SKRIP, "lego"))
FPS = 30
# Basis potongan. Matte (qc/matte/wajah-matte.mkv, 2522 f) dan proxy Lingkar (remotion/public/video/wajah-proxy.mp4) dibuat dari
# potongan R4 = edit/r5-before/ (salinan 22:40). edit/ kini berisi kandidat R5 (23:43) yang BELUM dikunci (cut_check_source,
# pause_clean, voice_level, audio_order GAGAL). Ganti ke "edit" hanya setelah cut terkunci DAN matte + proxy dibuat ulang (Opus 16 Nov).
EDIT = os.environ.get("SDJ_EDIT", "edit")   # R6 terkunci (ORDER.json, hash 1ee4baa3); basis R4 lama: SDJ_EDIT=edit/r5-before


def muat():
    d = json.load(open(os.path.join(P, EDIT, "words.json"), encoding="utf-8"))
    raw = [dict(w=x["w"], s=x["s"], e=x["e"]) for x in d["words"]]
    # perbaikan ejaan sesuai transkrip-hasil.md (naskah yang disetujui); waktu tidak diubah
    FIX = {"CGPT,": "ChatGPT,", "Apple's": "Apple", "Tale.": "style,", "cinematic": "Cinematic", "storytelling": "Storytelling",
           "pak": "Pak", "nggak?": "gak?"}
    out = []
    i = 0
    while i < len(raw):
        w = dict(raw[i]); w["w"] = FIX.get(w["w"], w["w"])
        nx = raw[i + 1] if i + 1 < len(raw) else None
        if nx and nx["w"].startswith("-"):                         # putus + -putus. ; orang + -orang ; workflow + -nya
            w["w"] += nx["w"]; w["e"] = nx["e"]; i += 1
        elif nx and w["w"] == "chat" and nx["w"] == "GPT":
            w = dict(w="ChatGPT", s=w["s"], e=nx["e"]); i += 1
        elif nx and w["w"] == "100" and nx["w"] == "%":
            w = dict(w="100%", s=w["s"], e=nx["e"]); i += 1
        out.append(w); i += 1
    return out


U = muat()
DURASI = U[-1]["e"]
try:
    import subprocess
    DURASI = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0",
                                   os.path.join(P, EDIT, "suara.wav")], capture_output=True, text=True).stdout.strip())
except Exception:
    pass


def nrm(s):
    return re.sub(r"[^\w%-]", "", s.lower())


# Petunjuk `after` di teks.py/waktu.py ditulis untuk potongan R4 (84,15 dtk). Pada potongan lain petunjuk diskalakan dengan rasio durasi dan diberi
# kelonggaran 0,6 dtk, supaya kata yang bergeser ±1 dtk tetap ditemukan (kata yang sama sebelumnya masih >0,6 dtk jauhnya).
SC = DURASI / 84.150729 if EDIT.rstrip("/") in ("edit", "lego/_r6") else 1.0     # lego/_r6 = salinan kata R6 (footage R6 belum diganti A1)


def idx(txt, after=0.0, nth=0):
    """indeks unit pertama setelah waktu `after` yang teksnya (tanpa tanda baca) == txt."""
    a = after * SC - (0.6 if SC != 1.0 and after > 0 else 0)
    k = [i for i, u in enumerate(U) if u["s"] >= a - 1e-6 and nrm(u["w"]) == nrm(txt)]
    if len(k) <= nth:
        raise KeyError(f"kata tidak ditemukan: {txt} setelah {after}")
    return k[nth]


def s(txt, after=0.0, nth=0):
    return U[idx(txt, after, nth)]["s"]


def e(txt, after=0.0, nth=0):
    return U[idx(txt, after, nth)]["e"]


# jangkar beat (turunan kata); nama mengikuti DESAIN.md
T = {}
T["finally"] = s("finally"); T["akhirnya"] = s("akhirnya"); T["selesai"] = s("selesai"); T["juga_e"] = e("juga")
T["b1b"] = s("Ya"); T["workflow1"] = s("workflow"); T["ai_model"] = s("AI", 7); T["chatgpt1"] = s("ChatGPT", 8)
T["claude1"] = s("Claude", 9.5); T["gemini1"] = s("Gemini"); T["decision"] = s("decision"); T["video1_e"] = e("gitu", 14)
T["b2a"] = s("Karena"); T["viral"] = s("viral"); T["ngedit"] = s("ngedit"); T["tapi"] = s("Tapi"); T["hasilnya"] = s("hasilnya")
T["slop"] = s("AI", 20); T["slop_e"] = e("slop"); T["b2b"] = s("Dan", 21.5); T["putus"] = s("putus-putus"); T["putus_e"] = e("putus-putus")
T["b3a"] = s("Dan", 23.9); T["template"] = s("template"); T["apple"] = s("Apple"); T["cinematic"] = s("Cinematic")
T["b3b"] = s("Nah"); T["ngebalik"] = s("ngebalik"); T["ngebalik_e"] = e("ngebalik"); T["gimana"] = s("Gimana", 34)
T["workflow2"] = s("workflow-nya"); T["workflow2_e"] = e("workflow-nya")
T["b4a"] = s("Jadi", 38.5); T["balik"] = s("balik"); T["balik_e"] = e("modal"); T["b4b"] = s("Ini", 43)
T["dua0"] = s("20"); T["dua0_e"] = e("kali", 48.5); T["lima"] = s("5"); T["lima_e"] = e("kali", 51)
T["gitu_b4"] = e("gitu.", 53)
T["b5a"] = s("Dan,", 54); T["kayak"] = s("Kayak", 57); T["ini_e"] = e("ini.", 59)


def jentik(a, b):
    """detik transien jentikan jari (energi 3–12 kHz naik paling tajam, rasio HF/LF > 1) di antara a..b, diukur dari suara.wav"""
    import numpy as np, soundfile as sf
    x, sr = sf.read(os.path.join(P, EDIT, "suara.wav")); x = x if x.ndim == 1 else x.mean(1)
    i0, i1 = int(a * sr), int(b * sr); x = x[i0:i1]
    n, hop = 512, 256
    fr = np.lib.stride_tricks.sliding_window_view(x, n)[::hop] * np.hanning(n)
    S = np.abs(np.fft.rfft(fr, axis=1)); f = np.fft.rfftfreq(n, 1 / sr)
    hf = S[:, (f > 3000) & (f < 12000)].sum(1); lf = S[:, (f > 100) & (f < 1500)].sum(1) + 1e-9
    sc = np.maximum(0, np.diff(hf, prepend=hf[0])) * (hf / lf > 1.0)
    return a + int(np.argmax(sc)) * hop / sr


# Irfan 17 Nov: dunia agen masuk TEPAT di jentikan jari ("kayak yang kalian lihat ini" + jentik), bukan di akhir "ini."
T["lihat_e"] = jentik(T["kayak"], T["ini_e"])
T["b5b"] = s("Bahkan", 59.5); T["koordinasi1"] = s("koordinasi", 60); T["claude2"] = s("Claude", 61.5); T["sebaliknya"] = s("sebaliknya")
T["session"] = s("session"); T["kesalahan"] = s("kesalahan"); T["loop"] = s("loop"); T["loop_e"] = e("pembelajaran"); T["sini_e"] = e("sini")
T["b6a"] = s("Ini", 72.5); T["pct"] = s("100%"); T["ai_e"] = e("AI.", 74)
T["b6b"] = s("Dan", 74.5); T["profesional"] = s("profesional"); T["masih2"] = s("masih", 79.5); T["ai2_e"] = e("AI?", 80)
T["comment"] = s("Comment"); T["skill"] = s("skill"); T["gratis_e"] = e("gratis")

# --- jangkar tambahan untuk penekanan kamera dan REVISI-1 ---
T["mempelajari"] = s("mempelajari"); T["publish"] = s("publish"); T["habis"] = s("habis", 42.5); T["langganan"] = s("langganan"); T["uji"] = s("uji", 51)
T["lintas"] = s("lintas", 56); T["claude_b4"] = s("Claude", 48.5); T["comment_w"] = s("Comment")
T["udah"] = s("Udah", 75); T["videonya"] = s("videonya", 74); T["gimana_v"] = s("gimana", 75)
T["kayak_v"] = s("kayak", 74.5)
