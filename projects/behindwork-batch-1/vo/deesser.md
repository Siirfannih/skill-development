# De-esser narasi TTS (Behindwork)

Dipakai pada narasi TTS saja; suara asli tokoh (quote cut) tidak diproses (Lantai E23).

Ukuran: `puncak desis` = p99 energi pita 5–10 kHz dikurangi median energi pita 300–3000 Hz pada bingkai bersuara (skrip ukur di sesi 22 Nov, sama dengan rumus ini). Narator kiblat `startup.mp4`: +0,8 dB. VO ep01 v1 (Multilingual v2, speaker boost ON): +7,5 dB (desis tajam terdengar).

Filter ffmpeg (crossover 5 kHz bertingkat dua, kompresi hanya pita atas; crossover sendiri transparan):

```
asplit=2[a1][a2];[a1]lowpass=f=5000:p=2,lowpass=f=5000:p=2[lo];[a2]highpass=f=5000:p=2,highpass=f=5000:p=2,acompressor=threshold=0.08:ratio=2:attack=0.5:release=50:knee=2[hi];[lo][hi]amix=inputs=2:normalize=0
```

Hasil uji (beat 01 + 05): v3 tanpa speaker boost +4,0 → −0,9 dB; v4 +4,9 → +0,8 dB; Multilingual v2 +6,8 → +1,2 dB; v1 +7,5 → +1,9 dB.
