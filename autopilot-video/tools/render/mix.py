# Mix akhir: VO + musik (di bawah VO) + SFX dari stok Irfan (Kenyset) dengan low-pass 6 kHz, lalu remux ke video.
import subprocess, os, sys
P = os.path.expanduser("~/Downloads/Kenyset [FREE SFX PACK]/")
L = "public/audio/"
# (detik, file, gain dB, visual yang disuarakan)
CUES = [
    (0.00, P + "soft-pop-sfx-433612.mp3", -14, "teks hook muncul"),
    (2.08, P + "simple-whoosh-02-433006.mp3", -16, "kamera tilt turun ke sumur"),
    (4.64, P + "soft-subtle-ui-pop-sfx-348820.mp3", -14, "teks B2 muncul"),
    (9.36, P + "soft-ui-pop-light-minimal-click-451232.mp3", -14, "label ruang hampa"),
    (11.88, P + "flowing-water-sound-effect-418728.mp3", -20, "kolom air naik di pipa"),
    (13.44, P + "quick-double-swish-sfx-230502.mp3", -18, "panah tekanan udara turun"),
    (16.33, P + "swoosh-015-383769.mp3", -18, "kamera mundur ke wide"),
    (20.22, P + "marimba-bloop-2-188149.mp3", -14, "label 7-9 meter"),
    (22.55, L + "sfx_thud.mp3", -8, "break kamera ke wide, momen negatif"),
    (24.31, P + "soft-pop-sfx-433612.mp3", -15, "teks mancing terus"),
    (26.79, P + "soft-subtle-ui-pop-sfx-348820.mp3", -14, "panah ukur"),
    (30.45, P + "shine-6-268910.mp3", -18, "flash putih ke kartu produk"),
    (32.38, P + "marimba-bloop-3-188151.mp3", -14, "kartu pompa jet disorot"),
    (34.61, P + "soft-pop-sfx-433612.mp3", -14, "teks CTA"),
    (37.09, P + "minimal-pop-click-ui-11-198311.mp3", -16, "subjudul komentar"),
]
inputs = ["-i", "out/silent.mp4", "-i", L + "vo_local.wav"]
flt = ["[1:a]aresample=48000,volume=0dB[vo]"]
mix = ["[vo]"]
n = 2
if os.path.exists(L + "music.mp3"):
    inputs += ["-i", L + "music.mp3"]
    flt.append(f"[{n}:a]aresample=48000,atrim=0:40,volume=-21dB,afade=t=in:d=0.3,afade=t=out:st=38.6:d=1.4[mu]"); mix.append("[mu]"); n += 1
for i, (t, f, db, _) in enumerate(CUES):
    if not os.path.exists(f):
        print("lewati, tidak ada:", f); continue
    inputs += ["-i", f]
    flt.append(f"[{n}:a]aresample=48000,atrim=0:1.6,afade=t=out:st=1.2:d=0.4,lowpass=f=6000,volume={db}dB,adelay={int(t*1000)}|{int(t*1000)}[s{i}]")
    mix.append(f"[s{i}]"); n += 1
flt.append("".join(mix) + f"amix=inputs={len(mix)}:normalize=0:dropout_transition=0,atrim=0:40,loudnorm=I=-14:TP=-1.5:LRA=9[a]")
cmd = ["ffmpeg", "-y", "-v", "error"] + inputs + ["-filter_complex", ";".join(flt), "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", "out/final_mix.mp4"]
subprocess.run(cmd, check=True)
print("ok out/final_mix.mp4")
