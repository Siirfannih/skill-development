"""v8e: tanda tangan isi shot untuk cache (klip, detik sumber, durasi file, grade) -> shot identik tidak dihitung ulang."""
import hashlib
def sig(s):
    dur = round(s['v1'] - s['v0'] + 0.2, 3)
    return hashlib.md5(f"{s['clip']}|{s['src']}|{dur}|{s.get('grade')}".encode()).hexdigest()[:16]
