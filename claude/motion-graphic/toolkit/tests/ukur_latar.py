"""Pengukur latar v3 (tanpa gaya): area kalem, tepi (Sobel), kontras teks APCA 0.0.98G-4g, grain.
Dipakai scripts/tests/test_latar_v3.py dan kontak_latar.py. Butuh numpy, scipy, PIL."""
import numpy as np
from scipy.ndimage import gaussian_filter, sobel

SRGB = np.array([0.2126729, 0.7151522, 0.0721750])


def lin_y(rgb):
    """Luminansi relatif (0..1) dari sRGB uint8 (..., 3), koefisien APCA."""
    return ((np.asarray(rgb, float) / 255) ** 2.4) @ SRGB


def lstar(rgb):
    y = lin_y(rgb)
    return np.where(y > 216 / 24389, 116 * np.cbrt(y) - 16, y * 24389 / 27)


def apca(txt_rgb, bg_rgb):
    """Lc APCA-W3 0.0.98G-4g (konstanta resmi). Positif = teks gelap di latar terang, negatif = teks terang di latar gelap."""
    def soft(y): return y + (0.022 - y) ** 1.414 if y < 0.022 else y
    yt, yb = soft(float(lin_y(txt_rgb))), soft(float(lin_y(bg_rgb)))
    if abs(yb - yt) < 0.0005: return 0.0
    if yb > yt:
        s = (yb ** 0.56 - yt ** 0.57) * 1.14
        return 0.0 if s < 0.1 else (s - 0.027) * 100
    s = (yb ** 0.65 - yt ** 0.62) * 1.14
    return 0.0 if s > -0.1 else (s + 0.027) * 100


def blur(img, sigma):
    return np.stack([gaussian_filter(img.astype(float)[..., c], sigma) for c in range(3)], -1)


def area_kalem(img, dasar_rgb, batas=15.0, sigma=1.5):
    """% piksel yang |selisih L*| terhadap warna dasar <= batas (poin L*, skala 0-100, jadi 15 = 15 % dari rentang kecerahan).
    Grain dibuang dulu dengan blur ringan. Juga mengembalikan % menurut kenaikan luminansi relatif (referensi)."""
    L = lstar(np.clip(blur(img, sigma), 0, 255)); L0 = float(lstar(np.array(dasar_rgb)))
    return 100 * float((np.abs(L - L0) <= batas).mean())


def tepi(img, sigma=3.0):
    """Gradien L* maksimum (poin L* per piksel) dari Sobel (dinormalkan jadi turunan) pada render yang diblur. Juga p99,9."""
    L = lstar(np.clip(blur(img, sigma), 0, 255))
    g = np.hypot(sobel(L, 1), sobel(L, 0)) / 8.0
    return float(g.max()), float(np.percentile(g, 99.9))


def grain(img, sigma=1.5):
    """Simpangan baku frekuensi tinggi (0..1) pada seluruh piksel (grain dominan di latar kalem)."""
    f = img.astype(float) / 255
    hp = f - np.stack([gaussian_filter(f[..., c], sigma) for c in range(3)], -1)
    return float(hp.reshape(-1, 3).std())


def kontras_teks(img, kotak, warna_teks):
    """Lc terburuk (nilai |Lc| terkecil) antara warna teks dan setiap piksel latar (diblur ringan) di kotak (x0,y0,x1,y1) piksel."""
    x0, y0, x1, y1 = kotak
    bg = np.clip(blur(img, 1.5), 0, 255)[y0:y1, x0:x1].reshape(-1, 3)
    # Lc monoton terhadap Y latar: cukup periksa piksel paling terang dan paling gelap
    y = lin_y(bg); cand = [bg[y.argmax()], bg[y.argmin()]]
    return min(abs(apca(warna_teks, c)) for c in cand)
