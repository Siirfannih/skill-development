"""Versi bahasa Indonesia dari episode Inggris yang sudah jadi: adegan, SFX tambahan, dan musik dipakai ulang,
waktunya dipetakan per beat secara proporsional dari VO Inggris ke VO Indonesia (beat id sama, makna sama).
KT tetap ditulis ulang di rancangan _id dengan kata yang benar-benar diucapkan VO Indonesia."""
import json


def muat_waktu(beats_path, words_path):
    beats = {b["id"]: b for b in json.load(open(beats_path))["beats"]}
    words = json.load(open(words_path))["words"]
    return beats, words


def pemeta(en_beats, en_words, id_beats):
    import re
    norm = lambda s: re.sub(r"[^a-z0-9]", "", s.lower())

    def t_en(kata, beat, n=1, akhir=False):
        b = en_beats[beat]; k = norm(kata); hit = 0
        for x in en_words:
            if b["mulai"] - 0.08 <= x["start"] < b["selesai"] + 0.05 and norm(x["word"]).startswith(k):
                hit += 1
                if hit == n:
                    return x["end"] if akhir else x["start"]
        raise SystemExit(f"kata EN '{kata}' ke-{n} tidak ada di beat {beat}")

    def map_t(t):
        """detik timeline Inggris -> detik timeline Indonesia, proporsional di dalam beat yang memuatnya."""
        urut = sorted(en_beats)
        for i, bid in enumerate(urut):
            b = en_beats[bid]; nb = en_beats[urut[i + 1]]["mulai"] if i + 1 < len(urut) else b["selesai"] + 5
            if t < nb or i + 1 == len(urut):
                ib = id_beats[bid]; ib_next = id_beats[urut[i + 1]]["mulai"] if i + 1 < len(urut) else ib["selesai"] + (t - b["selesai"])
                span_en = max(1e-3, nb - b["mulai"]); span_id = ib_next - ib["mulai"]
                if t <= b["mulai"]:
                    return ib["mulai"] - (b["mulai"] - t)
                return ib["mulai"] + (t - b["mulai"]) / span_en * span_id
        return t

    def wp(kata, beat, n=1, akhir=False):
        return round(map_t(t_en(kata, beat, n, akhir)), 3)

    wp.beat = id_beats
    return wp, map_t


def ganti(wid, wp, peta):
    """Pemanggil w() untuk adegan/SFX Inggris: kata Inggris yang ada di `peta` diganti kata Indonesia yang sepadan
    {(kata_en, beat[, n]): (kata_id, beat[, n])}; sisanya dipetakan proporsional (dicatat, supaya bisa dicek)."""
    def w(kata, beat, n=1, akhir=False):
        k = peta.get((kata, beat, n)) or (peta.get((kata, beat)) if n == 1 else None)
        if k:
            return wid(k[0], k[1], k[2] if len(k) > 2 else 1, akhir)
        t = wp(kata, beat, n, akhir); print(f"  proporsional: {kata}/{beat}/{n} -> {t}"); return t
    w.beat = wid.beat
    return w
