"""Geometri bubble sapaan; harus sama dengan BubbleSapa.tsx (BM, EKOR, ujungEkor)."""
BM, EKOR = 56, 48


def ujung(ekor, bw, bh):
    if ekor == "kiri": return BM - EKOR + 6, BM + bh - 22
    if ekor == "kanan": return BM + bw + EKOR - 6, BM + bh - 22
    return BM + bw - 96 + 42, BM + bh + EKOR
