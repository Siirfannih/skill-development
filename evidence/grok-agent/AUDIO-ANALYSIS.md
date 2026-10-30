---
status: evidence
scope: grok-agent
how_to_use: "Jangan dimuat kecuali untuk mengecek satu angka. Rentang harian ada di kartu prinsip."
---

# Reference Video Audio Analysis Report

**Method:** measured with ffmpeg + librosa + pyloudnorm (ITU-R BS.1770) + openai-whisper `small`.
**Scene cuts:** ffmpeg `select='gt(scene,0.3)'` (Energy & The Sun also reported at 0.15 because 0.3 yielded 0 cuts).
**Sync rule measured:** cut timestamp within ±80 ms of a beat or onset.
**Inferences** are explicitly tagged; everything else is a measured fact.

Source files copied to `/workspace/audio-analysis/*.mp4` (duration-mapped to titles; attachment-store SHA filenames differ from content sha256).

## 01_krea2_launch — Krea 2 launch

- Attachment hint: `95d4a0a2...`
- Duration: **67.177 s**
- Tempo (beat_track / onset tempo): **129.2 / 129.2 BPM**, beats=137
- Integrated loudness: **-14.08 LUFS**, sample peak **0.0 dBFS**
- Dynamic range (RMS p95−p10): **22.00 dB**, crest **15.93 dB**
- Spectral centroid mean: **1514.1 Hz** (σ=1091.2)
- Band energy fractions: sub<60=0.0573, low60–250=0.2832, low-mid250–500=0.1589, mid500–2k=0.2565, **harsh2–6k=0.155**, high6–12k=0.0876, air12k+=0.0
- Onsets: **224** total (3.334/s), strong (p75) hits=56
- Silence gaps >300 ms: **3** → [{'start': 31.997, 'end': 32.485, 'dur': 0.488}, {'start': 63.878, 'end': 64.714, 'dur': 0.836}, {'start': 64.923, 'end': 67.177, 'dur': 2.254}]
- VO: present=True, lang=**en**, words=117, speech_dur=44.82s, presence=0.667, pace=**2.61 wps** (156.6 wpm)
- Scene cuts @0.3: **15**; sync within ±80ms of beat∨onset: **8/15 = 53.3%** (beat-only 33.3%, onset-only 33.3%)

### Loudness / dynamics table

| Metric | Value |
|---|---|
| LUFS integrated | -14.08 |
| Peak dBFS | 0.0 |
| RMS mean dB | -25.30 |
| RMS p10 / p50 / p95 dB | -32.74 / -18.51 / -10.74 |
| DR p95−p10 dB | 22.00 |
| Crest factor dB | 15.93 |

### Music structure (INFERENCE from RMS energy curve)

| Start | End | Label | Energy |
|---|---|---|---|
| 0.0 | 8.0 | intro | 0.208 |
| 8.0 | 42.0 | breakdown | 0.277 |
| 42.0 | 48.0 | groove | 0.495 |
| 48.0 | 50.0 | breakdown | 0.146 |
| 50.0 | 60.0 | groove | 0.505 |
| 60.0 | 67.18 | outro | 0.046 |

### Strong hit timestamps (onset strength ≥ p75)

0.929, 2.322, 2.554, 4.063, 4.296, 4.365, 5.735, 8.452, 8.684, 8.8, 9.729, 9.822, 11.633, 12.028, 13.769, 14.048, 14.141, 15.999, 16.161, 16.393, 16.904, 17.578, 18.065, 18.297, 19.9, 20.016, 23.638, 24.961, 26.633, 26.842, 30.581, 31.045, 31.742, 37.756, 38.638, 39.01, 42.423, 43.259, 45.859, 46.138 ...

### Transcript (Whisper small)

```
This is Creati, an image model made for aesthetics. Create in any style, no matter how expressive. Explore new ideas without stylistic boundaries. Show it a mood board and set the direction for what you want to create. It gets it, it gets you. Tell it what you love and what you don't. It learns and adapts to your visual preferences. The more you use it, the better it gets. With unique controls to adjust its creativity, add randomness or surprise, or tune stylization. Craya 2 is meant to be a base for you to build on. A raw creative medium with no predefined preferences or opinions, and every control for you to make it your own.
```

### Segment timestamps

| Start | End | Text |
|---|---|---|
| 1.0 | 6.04 | This is Creati, an image model made for aesthetics. |
| 7.12 | 11.08 | Create in any style, no matter how expressive. |
| 11.92 | 14.68 | Explore new ideas without stylistic boundaries. |
| 15.76 | 19.74 | Show it a mood board and set the direction for what you want to create. |
| 20.76 | 22.48 | It gets it, it gets you. |
| 23.56 | 25.7 | Tell it what you love and what you don't. |
| 25.7 | 28.8 | It learns and adapts to your visual preferences. |
| 30.06 | 34.0 | The more you use it, the better it gets. |
| 40.64 | 44.34 | With unique controls to adjust its creativity, |
| 44.96 | 48.68 | add randomness or surprise, or tune stylization. |
| 51.2 | 54.96 | Craya 2 is meant to be a base for you to build on. |
| 55.52 | 59.9 | A raw creative medium with no predefined preferences or opinions, |
| 60.38 | 63.0 | and every control for you to make it your own. |

### Cut ↔ audio sync detail (±80 ms)

(cuts at scene>0.3)

| Cut (s) | Δbeat (ms) | Δonset (ms) | Match |
|---|---|---|---|
| 5.467 | 102.7 | 106.3 | none |
| 5.7 | 105.0 | 35.0 | onset |
| 5.9 | 95.0 | 165.0 | none |
| 6.1 | 123.0 | 30.0 | onset |
| 6.3 | 77.0 | 170.0 | beat |
| 6.467 | 197.3 | 151.3 | none |
| 6.567 | 97.3 | 51.3 | onset |
| 6.7 | 36.0 | 82.0 | beat |
| 6.833 | 169.3 | 215.3 | none |
| 6.967 | 138.3 | 348.7 | none |
| 7.1 | 5.0 | 400.0 | beat |
| 7.233 | 128.3 | 266.7 | none |
| 7.367 | 179.3 | 133.3 | none |
| 7.5 | 46.0 | 0.0 | beat+onset |
| 10.733 | 29.3 | 40.7 | beat+onset |

## 02_spark — Everything Starts With a Spark

- Attachment hint: `ca25695f...`
- Duration: **47.347 s**
- Tempo (beat_track / onset tempo): **117.45 / 117.45 BPM**, beats=90
- Integrated loudness: **-12.84 LUFS**, sample peak **-0.3 dBFS**
- Dynamic range (RMS p95−p10): **26.79 dB**, crest **16.25 dB**
- Spectral centroid mean: **2435.6 Hz** (σ=1687.6)
- Band energy fractions: sub<60=0.0023, low60–250=0.1199, low-mid250–500=0.1705, mid500–2k=0.3124, **harsh2–6k=0.1513**, high6–12k=0.2427, air12k+=0.0
- Onsets: **195** total (4.119/s), strong (p75) hits=49
- Silence gaps >300 ms: **3** → [{'start': 17.067, 'end': 17.392, 'dur': 0.325}, {'start': 29.234, 'end': 29.559, 'dur': 0.325}, {'start': 46.811, 'end': 47.347, 'dur': 0.535}]
- VO: present=True, lang=**en**, words=80, speech_dur=31.66s, presence=0.669, pace=**2.527 wps** (151.6 wpm)
- Scene cuts @0.3: **6**; sync within ±80ms of beat∨onset: **5/6 = 83.3%** (beat-only 50.0%, onset-only 66.7%)

### Loudness / dynamics table

| Metric | Value |
|---|---|
| LUFS integrated | -12.84 |
| Peak dBFS | -0.3 |
| RMS mean dB | -24.06 |
| RMS p10 / p50 / p95 dB | -37.28 / -22.13 / -10.49 |
| DR p95−p10 dB | 26.79 |
| Crest factor dB | 16.25 |

### Music structure (INFERENCE from RMS energy curve)

| Start | End | Label | Energy |
|---|---|---|---|
| 0.0 | 4.0 | intro | 0.338 |
| 4.0 | 6.0 | intro | 0.205 |
| 6.0 | 10.0 | breakdown | 0.301 |
| 10.0 | 16.0 | groove | 0.433 |
| 16.0 | 20.0 | breakdown | 0.298 |
| 20.0 | 24.0 | groove | 0.459 |
| 24.0 | 26.0 | breakdown | 0.393 |
| 26.0 | 28.0 | groove | 0.534 |
| 28.0 | 30.0 | breakdown | 0.367 |
| 30.0 | 32.0 | groove | 0.629 |
| 32.0 | 36.0 | breakdown | 0.352 |
| 36.0 | 38.0 | groove | 0.596 |
| 38.0 | 40.0 | breakdown | 0.319 |
| 40.0 | 42.0 | groove | 0.595 |
| 42.0 | 46.0 | breakdown | 0.334 |
| 46.0 | 47.35 | outro | 0.043 |

### Strong hit timestamps (onset strength ≥ p75)

1.184, 1.347, 4.063, 7.546, 8.011, 9.195, 9.52, 9.985, 10.031, 10.519, 12.957, 13.212, 14.721, 15.952, 16.695, 17.67, 17.879, 17.972, 18.181, 18.715, 20.085, 21.246, 23.034, 23.313, 24.613, 26.633, 27.609, 27.887, 29.002, 30.279, 30.79, 31.184, 31.417, 31.765, 31.997, 32.972, 34.157, 34.691, 36.618, 36.897 ...

### Transcript (Whisper small)

```
Everything starts with a spark. An idea. A sketch. A question. What if this could grow? That's where purposeful design begins, turning ideas into experiences, and experiences into growth. Users want clarity. Not clutter. Not waiting. Just flow and simplicity. From messy sketches to clean dashboards, design shapes the journey. We design intuitive interfaces, smart layouts, and clear actions. All crafted to move people forward. Because great design isn't just how it looks. It's how it works. Ready to grow?
```

### Segment timestamps

| Start | End | Text |
|---|---|---|
| 0.0 | 1.72 | Everything starts with a spark. |
| 2.54 | 4.3 | An idea. A sketch. |
| 5.6 | 6.2 | A question. |
| 7.1 | 8.14 | What if this could grow? |
| 9.04 | 11.04 | That's where purposeful design begins, |
| 11.7 | 13.48 | turning ideas into experiences, |
| 13.86 | 16.16 | and experiences into growth. |
| 17.42 | 18.8 | Users want clarity. |
| 19.62 | 21.46 | Not clutter. Not waiting. |
| 22.02 | 23.48 | Just flow and simplicity. |
| 24.4 | 26.96 | From messy sketches to clean dashboards, |
| 27.56 | 29.02 | design shapes the journey. |
| 29.02 | 32.0 | We design intuitive interfaces, |
| 32.64 | 35.22 | smart layouts, and clear actions. |
| 36.08 | 38.5 | All crafted to move people forward. |
| 39.44 | 41.92 | Because great design isn't just how it looks. |
| 42.68 | 43.36 | It's how it works. |
| 44.5 | 45.12 | Ready to grow? |

### Cut ↔ audio sync detail (±80 ms)

(cuts at scene>0.3)

| Cut (s) | Δbeat (ms) | Δonset (ms) | Match |
|---|---|---|---|
| 14.2 | 13.0 | 34.0 | beat+onset |
| 19.867 | 83.7 | 36.7 | onset |
| 23.8 | 24.0 | 69.0 | beat+onset |
| 23.833 | 9.3 | 102.3 | beat |
| 33.767 | 97.7 | 167.7 | none |
| 42.1 | 114.0 | 44.0 | onset |

## 03_renaissance — The Next Renaissance

- Attachment hint: `71e227c4...`
- Duration: **90.629 s**
- Tempo (beat_track / onset tempo): **117.45 / 117.45 BPM**, beats=165
- Integrated loudness: **-14.41 LUFS**, sample peak **-0.07 dBFS**
- Dynamic range (RMS p95−p10): **11.59 dB**, crest **16.23 dB**
- Spectral centroid mean: **2325.6 Hz** (σ=1044.5)
- Band energy fractions: sub<60=0.0446, low60–250=0.1662, low-mid250–500=0.1194, mid500–2k=0.2424, **harsh2–6k=0.2929**, high6–12k=0.1304, air12k+=0.0
- Onsets: **494** total (5.451/s), strong (p75) hits=124
- Silence gaps >300 ms: **0** → []
- VO: present=True, lang=**en**, words=283, speech_dur=83.04s, presence=0.916, pace=**3.408 wps** (204.5 wpm)
- Scene cuts @0.3: **105**; sync within ±80ms of beat∨onset: **91/105 = 86.7%** (beat-only 36.2%, onset-only 80.0%)

### Loudness / dynamics table

| Metric | Value |
|---|---|
| LUFS integrated | -14.41 |
| Peak dBFS | -0.07 |
| RMS mean dB | -18.31 |
| RMS p10 / p50 / p95 dB | -24.24 / -17.64 / -12.65 |
| DR p95−p10 dB | 11.59 |
| Crest factor dB | 16.23 |

### Music structure (INFERENCE from RMS energy curve)

| Start | End | Label | Energy |
|---|---|---|---|
| 0.0 | 2.0 | breakdown | 0.372 |
| 2.0 | 6.0 | groove | 0.611 |
| 6.0 | 8.0 | breakdown | 0.28 |
| 8.0 | 10.0 | groove | 0.407 |
| 10.0 | 16.0 | breakdown | 0.208 |
| 16.0 | 18.0 | groove | 0.447 |
| 18.0 | 20.0 | breakdown | 0.384 |
| 20.0 | 22.0 | groove | 0.5 |
| 22.0 | 24.0 | breakdown | 0.38 |
| 24.0 | 28.0 | groove | 0.405 |
| 28.0 | 30.0 | breakdown | 0.39 |
| 30.0 | 32.0 | groove | 0.469 |
| 32.0 | 40.0 | breakdown | 0.307 |
| 40.0 | 44.0 | groove | 0.417 |
| 44.0 | 48.0 | breakdown | 0.367 |
| 48.0 | 50.0 | groove | 0.421 |
| 50.0 | 84.0 | breakdown | 0.27 |
| 84.0 | 90.63 | outro | 0.152 |

### Strong hit timestamps (onset strength ≥ p75)

1.324, 2.577, 3.646, 4.04, 5.619, 6.339, 6.664, 7.245, 7.732, 8.707, 9.497, 9.868, 10.797, 11.633, 12.19, 12.283, 13.421, 13.653, 14.396, 15.882, 16.161, 16.347, 16.533, 16.672, 17.786, 20.155, 20.573, 21.525, 21.966, 24.126, 24.729, 25.124, 25.31, 25.519, 26.308, 26.494, 26.587, 26.889, 27.098, 27.353 ...

### Transcript (Whisper small)

```
The 2030s will be the start of a new renaissance. Let's start! What can I explain? We all know AI is changing everything. New stations say we live in unprecedented times. What they don't realise is all of this has happened before. Do you plan to take over the world? The year is 1440 and this guy invents the printing press. A machine that brought knowledge, stories and scientific advancements to a scale the world had never seen before. Within a hundred years, 30,000 books turned into 200 million printed and spread across Europe. But that actually became a huge problem. Because once everyone was given the power to say anything, finding information wasn't difficult. Finding something meaningful was. Until eventually, this guy decided it was time for the rebirth of a lost human spirit. Or as the French say, as a renaissance. Where real art and knowledge became more important than endless tablets. But now our ways of communication are changing. Again, most companies believe the next rebirth of media belongs to those who pump out the most content the fastest. But we believe they're making the same mistake people made 500 years ago. Because the reason you treasure that handmade gift or cry at your favourite movie isn't because a machine pumped it out in a second. It's because they're made by real people putting in hours of effort, making things the scrappy and half-heart ways. Hilling stories that come from an honest human voice. We believe the next generation of brands won't win by just making more, they'll win by making things people actually care about. So, if this is the next renaissance, what part will you go?
```

### Segment timestamps

| Start | End | Text |
|---|---|---|
| 0.0 | 2.8 | The 2030s will be the start of a new renaissance. |
| 3.6 | 4.12 | Let's start! |
| 4.54 | 5.16 | What can I explain? |
| 5.38 | 6.84 | We all know AI is changing everything. |
| 7.06 | 9.68 | New stations say we live in unprecedented times. |
| 9.82 | 12.82 | What they don't realise is all of this has happened before. |
| 13.0 | 15.14 | Do you plan to take over the world? |
| 15.84 | 19.36 | The year is 1440 and this guy invents the printing press. |
| 19.76 | 25.26 | A machine that brought knowledge, stories and scientific advancements to a scale the world had never seen before. |
| 25.26 | 31.08 | Within a hundred years, 30,000 books turned into 200 million printed and spread across Europe. |
| 31.2 | 33.1 | But that actually became a huge problem. |
| 33.26 | 37.38 | Because once everyone was given the power to say anything, finding information wasn't difficult. |
| 37.74 | 39.56 | Finding something meaningful was. |
| 39.88 | 44.64 | Until eventually, this guy decided it was time for the rebirth of a lost human spirit. |
| 44.8 | 47.56 | Or as the French say, as a renaissance. |
| 48.2 | 51.92 | Where real art and knowledge became more important than endless tablets. |
| 52.32 | 54.46 | But now our ways of communication are changing. |
| 55.0 | 61.08 | Again, most companies believe the next rebirth of media belongs to those who pump out the most content the fastest. |
| 61.48 | 65.24 | But we believe they're making the same mistake people made 500 years ago. |
| 65.3 | 71.52 | Because the reason you treasure that handmade gift or cry at your favourite movie isn't because a machine pumped it out in a second. |
| 71.74 | 76.9 | It's because they're made by real people putting in hours of effort, making things the scrappy and half-heart ways. |
| 77.14 | 79.6 | Hilling stories that come from an honest human voice. |
| 79.6 | 86.1 | We believe the next generation of brands won't win by just making more, they'll win by making things people actually care about. |
| 86.32 | 89.96 | So, if this is the next renaissance, what part will you go? |

### Cut ↔ audio sync detail (±80 ms)

(cuts at scene>0.3)

| Cut (s) | Δbeat (ms) | Δonset (ms) | Match |
|---|---|---|---|
| 1.083 | 216.7 | 54.7 | onset |
| 1.792 | 89.3 | 42.3 | onset |
| 3.25 | 140.0 | 69.0 | onset |
| 3.5 | 110.0 | 146.0 | none |
| 3.75 | 151.0 | 104.0 | none |
| 4.0 | 99.0 | 40.0 | onset |
| 4.25 | 115.0 | 24.0 | onset |
| 4.5 | 135.0 | 42.0 | onset |
| 4.75 | 103.0 | 57.0 | onset |
| 5.75 | 101.0 | 78.0 | onset |
| 5.833 | 17.7 | 5.3 | beat+onset |
| 5.917 | 65.7 | 88.7 | beat |
| 6.0 | 149.0 | 172.0 | none |
| 6.083 | 232.3 | 93.7 | none |
| 6.833 | 30.3 | 16.7 | beat+onset |
| 7.125 | 166.0 | 89.0 | none |
| 7.75 | 29.0 | 18.0 | beat+onset |
| 8.417 | 126.7 | 10.7 | onset |
| 9.333 | 0.7 | 45.3 | beat+onset |
| 9.792 | 123.3 | 62.7 | onset |
| 11.292 | 179.3 | 99.7 | none |
| 13.0 | 96.0 | 26.0 | onset |
| 14.0 | 95.0 | 48.0 | onset |
| 14.708 | 79.3 | 36.7 | beat+onset |
| 16.417 | 162.7 | 69.7 | onset |
| 16.667 | 167.3 | 5.3 | onset |
| 17.708 | 240.7 | 38.3 | onset |
| 18.333 | 79.7 | 10.7 | beat+onset |
| 19.583 | 223.7 | 176.7 | none |
| 19.75 | 57.0 | 10.0 | beat+onset |
| 19.917 | 109.7 | 6.3 | onset |
| 20.083 | 210.7 | 71.7 | onset |
| 20.792 | 9.7 | 79.7 | beat+onset |
| 21.292 | 1.3 | 24.3 | beat+onset |
| 21.958 | 178.3 | 7.7 | onset |
| 23.375 | 16.0 | 39.0 | beat+onset |
| 25.458 | 13.7 | 32.3 | beat+onset |
| 26.5 | 17.0 | 6.0 | beat+onset |
| 29.792 | 255.3 | 23.7 | onset |
| 32.25 | 114.0 | 21.0 | onset |
| 33.333 | 105.3 | 152.3 | none |
| 33.708 | 30.7 | 6.7 | beat+onset |
| 34.167 | 13.3 | 56.7 | beat+onset |
| 34.542 | 102.3 | 33.3 | onset |
| 35.083 | 71.7 | 25.7 | beat+onset |
| 35.958 | 194.7 | 14.3 | onset |
| 37.708 | 68.3 | 0.7 | beat+onset |
| 38.542 | 235.3 | 3.3 | onset |
| 39.417 | 128.7 | 58.7 | onset |
| 40.0 | 201.0 | 62.0 | onset |
| 40.958 | 44.3 | 91.3 | beat |
| 41.708 | 260.3 | 110.7 | none |
| 42.792 | 188.3 | 136.7 | none |
| 44.833 | 213.7 | 18.3 | onset |
| 47.75 | 33.0 | 33.0 | beat+onset |
| 47.875 | 158.0 | 19.0 | onset |
| 48.0 | 283.0 | 51.0 | onset |
| 48.125 | 173.0 | 13.0 | onset |
| 48.25 | 48.0 | 45.0 | beat+onset |
| 48.75 | 58.0 | 11.0 | beat+onset |
| 49.208 | 87.7 | 41.7 | onset |
| 49.958 | 128.3 | 34.7 | onset |
| 51.083 | 231.3 | 22.3 | onset |
| 51.667 | 206.3 | 21.3 | onset |
| 52.25 | 111.0 | 88.0 | none |
| 52.833 | 38.7 | 8.3 | beat+onset |
| 53.875 | 19.0 | 51.0 | beat+onset |
| 55.042 | 126.7 | 10.7 | onset |
| 55.833 | 103.7 | 82.3 | none |
| 56.792 | 143.3 | 18.7 | onset |
| 57.458 | 10.7 | 57.7 | beat+onset |
| 58.042 | 61.7 | 54.3 | beat+onset |
| 58.75 | 259.0 | 73.0 | onset |
| 59.583 | 70.3 | 91.7 | beat |
| 60.667 | 132.7 | 39.7 | onset |
| 61.5 | 56.0 | 33.0 | beat+onset |
| 62.25 | 183.0 | 67.0 | onset |
| 62.667 | 88.7 | 19.7 | onset |
| 63.292 | 202.7 | 6.3 | onset |
| 63.583 | 15.7 | 30.3 | beat+onset |
| ... | ... | ... | (25 more in json) |

## 04_grii_batam — Indonesian GRII Batam sermon

- Attachment hint: `a30dab80...`
- Duration: **105.025 s**
- Tempo (beat_track / onset tempo): **123.05 / 123.05 BPM**, beats=207
- Integrated loudness: **-14.25 LUFS**, sample peak **-0.7 dBFS**
- Dynamic range (RMS p95−p10): **17.46 dB**, crest **15.09 dB**
- Spectral centroid mean: **1628.7 Hz** (σ=1068.0)
- Band energy fractions: sub<60=0.0569, low60–250=0.2627, low-mid250–500=0.1705, mid500–2k=0.2144, **harsh2–6k=0.1795**, high6–12k=0.1038, air12k+=0.0
- Onsets: **542** total (5.161/s), strong (p75) hits=136
- Silence gaps >300 ms: **0** → []
- VO: present=True, lang=**id**, words=298, speech_dur=104.46s, presence=0.995, pace=**2.853 wps** (171.2 wpm)
- Scene cuts @0.3: **53**; sync within ±80ms of beat∨onset: **46/53 = 86.8%** (beat-only 32.1%, onset-only 79.2%)

### Loudness / dynamics table

| Metric | Value |
|---|---|
| LUFS integrated | -14.25 |
| Peak dBFS | -0.7 |
| RMS mean dB | -19.35 |
| RMS p10 / p50 / p95 dB | -28.11 / -18.33 / -10.65 |
| DR p95−p10 dB | 17.46 |
| Crest factor dB | 15.09 |

### Music structure (INFERENCE from RMS energy curve)

| Start | End | Label | Energy |
|---|---|---|---|
| 0.0 | 2.0 | groove | 0.64 |
| 2.0 | 4.0 | intro | 0.244 |
| 4.0 | 14.0 | breakdown | 0.312 |
| 14.0 | 16.0 | groove | 0.412 |
| 16.0 | 18.0 | drop | 0.763 |
| 18.0 | 24.0 | groove | 0.587 |
| 24.0 | 34.0 | breakdown | 0.323 |
| 34.0 | 36.0 | groove | 0.428 |
| 36.0 | 40.0 | breakdown | 0.374 |
| 40.0 | 48.0 | groove | 0.453 |
| 48.0 | 50.0 | breakdown | 0.37 |
| 50.0 | 54.0 | groove | 0.541 |
| 54.0 | 60.0 | breakdown | 0.308 |
| 60.0 | 62.0 | groove | 0.41 |
| 62.0 | 64.0 | breakdown | 0.295 |
| 64.0 | 66.0 | groove | 0.562 |
| 66.0 | 74.0 | breakdown | 0.327 |
| 74.0 | 76.0 | groove | 0.556 |
| 76.0 | 86.0 | breakdown | 0.338 |
| 86.0 | 88.0 | groove | 0.471 |
| 88.0 | 98.0 | breakdown | 0.319 |
| 98.0 | 100.0 | groove | 0.408 |
| 100.0 | 102.0 | outro | 0.223 |
| 102.0 | 105.02 | outro | 0.306 |

### Strong hit timestamps (onset strength ≥ p75)

0.813, 1.161, 3.39, 3.762, 4.458, 4.528, 5.712, 5.875, 6.409, 8.336, 8.847, 10.194, 11.494, 12.307, 13.189, 13.398, 13.63, 14.629, 16.486, 16.997, 17.461, 17.578, 18.019, 19.064, 19.923, 20.317, 20.805, 21.432, 22.013, 22.152, 22.5, 22.941, 24.404, 26.122, 28.352, 29.211, 29.466, 30.279, 30.79, 31.045 ...

### Transcript (Whisper small)

```
yang namanya londo irng itu kayak begitu sudah kalau jadi pecahbat pegang kuasa bisa ngatur undang-undang bisa eksekusi bisa pake aparat penegang ukung untuk pencet orang pake pacak bikin perijinan tetanggutan rampas tanah adat setelah itu kalau ada banjir kita mesti tabah terdemusi bah dari mengkuasa sudah kurang londo apa ini sudah ya persis kayak pada waktu itu ya sabat itu perintah yang diberikan oleh Tuhan untuk membebasikan orang-orang yang sangat lemah perintahnya anjelas ya jangan kamu bekerja pada hari sabat orang-orang lemah orang-orang dibawah yang disuruh kerja paksa dikasih perintah sabat sabat adalah perintah untuk orang-orang dibawah bisa istirahat sabat itu perintah pembebasan tapi sekarang sudah dilengkungkan orang-orang agami seperti ini sudah sabat itu menjadi semacam kayak peraturan agama dan semakin beragama mereka semakin bersabat mereka semakin tinggi nilainya padahal sabat itu adalah untuk orang-orang yang dibawah sabat dibalik sudah prinsipnya harika merdekaan dengan sabat sebenarnya mirip ya sudah membebaskan orang-orang yang tertindas sudah kita waktu ngomong tentang KOMPERDECAAN sudah bersiap-siap untuk mendengarkan kekonyalan-kekonyalan yang kita tonton dengan bayar tiket tiketnya adalah darah dan air matanya orang-orang melarat bidatuh-bidatuh ada angka-angka yang super fantasi lalu nanti akan mendapatkan tepuk tangan yang banyak dari pejilat-pejilat yang berharap cabatan saja dapat cabatan atau mempertahankan cabatan atau naik cabatan atau rangkap cabatan ya kurang lebih seperti itu ongkosnya ya darah dan air matanya orang-orang kecil kita diajak untuk nasionalis mencintai negara untuk mumpa cara juga lalu melakukan kejutan-kejutan yang minim sekali vaidah kalau karung makan kerubu bagianya dipasangin juga itu kemerdekaan juga yang merdekas ya apa sih sabat dipake dia eksploitasi oleh para pemimpin agamanya yusus-yusus membalikkan itu maka yusus datang untuk membebaskan dan ongkosnya adalah dia menjadi kurban mati dia terserah-serah
```

### Segment timestamps

| Start | End | Text |
|---|---|---|
| 0.0 | 1.64 | yang namanya londo irng itu kayak begitu sudah |
| 1.64 | 3.04 | kalau jadi pecahbat |
| 3.04 | 4.06 | pegang kuasa |
| 4.06 | 5.4 | bisa ngatur undang-undang |
| 5.4 | 6.46 | bisa eksekusi |
| 6.46 | 8.08 | bisa pake aparat penegang ukung |
| 8.08 | 9.92 | untuk pencet orang pake pacak |
| 9.92 | 10.88 | bikin perijinan |
| 10.88 | 11.54 | tetanggutan |
| 11.54 | 12.78 | rampas tanah adat |
| 12.78 | 14.06 | setelah itu kalau ada banjir |
| 14.06 | 17.24 | kita mesti tabah terdemusi bah dari mengkuasa sudah |
| 17.24 | 18.72 | kurang londo apa ini sudah ya |
| 18.72 | 20.0 | persis kayak pada waktu itu ya |
| 20.0 | 22.02 | sabat itu perintah yang diberikan oleh Tuhan |
| 22.02 | 23.44 | untuk membebasikan orang-orang yang sangat lemah |
| 23.44 | 24.58 | perintahnya anjelas ya |
| 24.58 | 26.34 | jangan kamu bekerja pada hari sabat |
| 26.88 | 27.68 | orang-orang lemah |
| 27.68 | 29.3 | orang-orang dibawah yang disuruh kerja paksa |
| 29.3 | 30.62 | dikasih perintah sabat |
| 30.62 | 33.0 | sabat adalah perintah untuk orang-orang dibawah |
| 33.0 | 33.82 | bisa istirahat |
| 33.82 | 36.04 | sabat itu perintah pembebasan |
| 36.04 | 38.84 | tapi sekarang sudah dilengkungkan orang-orang agami seperti ini sudah |
| 38.84 | 41.44 | sabat itu menjadi semacam kayak peraturan agama |
| 41.44 | 43.12 | dan semakin beragama mereka |
| 43.12 | 44.46 | semakin bersabat mereka |
| 44.46 | 45.86 | semakin tinggi nilainya |
| 45.86 | 47.82 | padahal sabat itu adalah untuk orang-orang yang dibawah |
| 47.82 | 49.44 | sabat dibalik sudah |
| 49.44 | 51.62 | prinsipnya harika merdekaan dengan sabat |
| 51.62 | 52.42 | sebenarnya mirip ya sudah |
| 52.42 | 54.48 | membebaskan orang-orang yang tertindas sudah |
| 54.48 | 55.58 | kita waktu ngomong tentang |
| 55.58 | 56.58 | KOMPERDECAAN |
| 56.58 | 59.32 | sudah bersiap-siap untuk mendengarkan kekonyalan-kekonyalan |
| 59.32 | 61.18 | yang kita tonton dengan bayar tiket |
| 61.18 | 62.8 | tiketnya adalah darah |
| 62.8 | 64.64 | dan air matanya orang-orang melarat |
| 64.64 | 65.98 | bidatuh-bidatuh |
| 65.98 | 68.28 | ada angka-angka yang super fantasi |
| 68.28 | 70.28 | lalu nanti akan mendapatkan tepuk tangan yang banyak |
| 70.28 | 71.46 | dari pejilat-pejilat yang |
| 71.46 | 72.64 | berharap cabatan saja |
| 72.64 | 75.06 | dapat cabatan atau mempertahankan cabatan |
| 75.06 | 76.94 | atau naik cabatan atau rangkap cabatan |
| 76.94 | 77.74 | ya kurang lebih seperti itu |
| 77.74 | 78.8 | ongkosnya ya |
| 78.8 | 80.94 | darah dan air matanya orang-orang kecil |
| 80.94 | 82.8 | kita diajak untuk nasionalis |
| 82.8 | 83.96 | mencintai negara |
| 83.96 | 85.34 | untuk mumpa cara juga |
| 85.34 | 86.82 | lalu melakukan kejutan-kejutan |
| 86.82 | 88.32 | yang minim sekali vaidah |
| 88.32 | 89.98 | kalau karung makan kerubu |
| 89.98 | 91.0 | bagianya dipasangin juga |
| 91.0 | 92.22 | itu kemerdekaan juga |
| 92.22 | 93.48 | yang merdekas ya apa sih |
| 93.48 | 94.62 | sabat dipake |
| 94.62 | 96.82 | dia eksploitasi oleh para pemimpin agamanya |
| 96.82 | 98.02 | yusus-yusus membalikkan itu |
| 98.02 | 99.72 | maka yusus datang untuk membebaskan |
| 99.72 | 102.82 | dan ongkosnya adalah dia menjadi kurban |
| 102.82 | 105.0 | mati dia terserah-serah |

### Cut ↔ audio sync detail (±80 ms)

(cuts at scene>0.3)

| Cut (s) | Δbeat (ms) | Δonset (ms) | Match |
|---|---|---|---|
| 0.467 | 1948.3 | 2.7 | onset |
| 2.1 | 315.0 | 10.0 | onset |
| 3.333 | 126.7 | 56.7 | onset |
| 4.4 | 11.0 | 58.0 | beat+onset |
| 6.867 | 16.7 | 63.7 | beat+onset |
| 8.667 | 40.3 | 28.7 | beat+onset |
| 11.133 | 35.7 | 34.3 | beat+onset |
| 13.067 | 75.3 | 29.3 | beat+onset |
| 14.4 | 236.0 | 229.0 | none |
| 17.5 | 178.0 | 39.0 | onset |
| 19.0 | 238.0 | 6.0 | onset |
| 23.767 | 219.3 | 12.7 | onset |
| 26.933 | 71.7 | 24.7 | beat+onset |
| 30.8 | 13.0 | 10.0 | beat+onset |
| 33.867 | 11.3 | 151.7 | beat |
| 33.933 | 55.3 | 199.7 | beat |
| 34.067 | 188.7 | 66.3 | onset |
| 39.1 | 188.0 | 72.0 | onset |
| 48.167 | 38.3 | 8.7 | beat+onset |
| 49.667 | 140.3 | 93.3 | none |
| 52.767 | 82.3 | 12.3 | onset |
| 54.9 | 78.0 | 62.0 | beat+onset |
| 56.667 | 245.3 | 152.3 | none |
| 59.567 | 216.7 | 15.3 | onset |
| 61.767 | 161.3 | 1.7 | onset |
| 65.233 | 37.7 | 31.3 | beat+onset |
| 66.233 | 105.7 | 36.7 | onset |
| 68.7 | 15.0 | 124.0 | beat |
| 70.4 | 212.0 | 20.0 | onset |
| 73.3 | 238.0 | 18.0 | onset |
| 78.133 | 230.3 | 91.3 | none |
| 78.933 | 78.3 | 8.3 | beat+onset |
| 81.4 | 218.0 | 79.0 | onset |
| 85.633 | 94.7 | 1.7 | onset |
| 88.467 | 117.3 | 44.7 | onset |
| 89.133 | 38.3 | 15.3 | beat+onset |
| 90.0 | 117.0 | 24.0 | onset |
| 90.133 | 16.3 | 29.7 | beat+onset |
| 90.2 | 83.0 | 37.0 | onset |
| 90.267 | 149.7 | 103.7 | none |
| 90.333 | 216.3 | 131.7 | none |
| 91.367 | 236.3 | 4.3 | onset |
| 93.867 | 104.3 | 34.3 | onset |
| 98.3 | 129.0 | 60.0 | onset |
| 98.5 | 71.0 | 92.0 | beat |
| 98.567 | 137.7 | 25.3 | onset |
| 98.633 | 204.3 | 41.3 | onset |
| 98.7 | 240.0 | 8.0 | onset |
| 98.767 | 173.3 | 58.7 | onset |
| 98.833 | 106.7 | 60.7 | onset |
| 100.167 | 204.7 | 27.3 | onset |
| 100.8 | 230.0 | 2.0 | onset |
| 104.967 | 1568.7 | 1242.7 | none |

## 05_energy_sun — Energy & The Sun

- Attachment hint: `3a50e02d...`
- Duration: **21.868 s**
- Tempo (beat_track / onset tempo): **123.05 / 123.05 BPM**, beats=45
- Integrated loudness: **-14.08 LUFS**, sample peak **-0.32 dBFS**
- Dynamic range (RMS p95−p10): **12.68 dB**, crest **13.93 dB**
- Spectral centroid mean: **1686.3 Hz** (σ=1094.1)
- Band energy fractions: sub<60=0.0375, low60–250=0.1833, low-mid250–500=0.2003, mid500–2k=0.2921, **harsh2–6k=0.1893**, high6–12k=0.0922, air12k+=0.0
- Onsets: **109** total (4.984/s), strong (p75) hits=28
- Silence gaps >300 ms: **0** → []
- VO: present=True, lang=**en**, words=74, speech_dur=20.24s, presence=0.926, pace=**3.656 wps** (219.4 wpm)
- Scene cuts @0.3: **0**; sync within ±80ms of beat∨onset: **0/0 = n/a** (beat-only n/a, onset-only n/a)
- Scene cuts @0.15 (fallback): **8**; sync beat∨onset: **8/8 = 100.0%**

### Loudness / dynamics table

| Metric | Value |
|---|---|
| LUFS integrated | -14.08 |
| Peak dBFS | -0.32 |
| RMS mean dB | -18.45 |
| RMS p10 / p50 / p95 dB | -25.12 / -17.53 / -12.44 |
| DR p95−p10 dB | 12.68 |
| Crest factor dB | 13.93 |

### Music structure (INFERENCE from RMS energy curve)

| Start | End | Label | Energy |
|---|---|---|---|
| 0.0 | 2.0 | drop | 0.715 |
| 2.0 | 6.0 | groove | 0.551 |
| 6.0 | 8.0 | drop | 0.752 |
| 8.0 | 21.85 | groove | 0.538 |

### Strong hit timestamps (onset strength ≥ p75)

0.255, 0.395, 1.347, 3.437, 3.646, 5.341, 5.341, 5.735, 5.828, 6.339, 6.873, 7.872, 9.334, 9.683, 10.124, 12.771, 13.816, 14.303, 14.907, 15.186, 16.509, 16.625, 17.949, 18.228, 18.576, 18.622, 20.643, 21.316

### Transcript (Whisper small)

```
Everything around you that you call life was made up by people that were no smarter than you. In order for a new industry to emerge, you need energy. The future of concy will essentially just be wattage. We need to move towards nuclear, wind and solar very quickly. There's always energy, there never can be enough energy. The sun rounds up to 100% of all energy. It's really all about the sun.
```

### Segment timestamps

| Start | End | Text |
|---|---|---|
| 0.0 | 5.18 | Everything around you that you call life was made up by people that were no smarter than you. |
| 5.36 | 7.96 | In order for a new industry to emerge, you need energy. |
| 8.2 | 10.94 | The future of concy will essentially just be wattage. |
| 11.08 | 14.28 | We need to move towards nuclear, wind and solar very quickly. |
| 14.48 | 17.06 | There's always energy, there never can be enough energy. |
| 17.22 | 20.2 | The sun rounds up to 100% of all energy. |
| 20.46 | 21.42 | It's really all about the sun. |

### Cut ↔ audio sync detail (±80 ms)

(cuts at scene>0.15)

| Cut (s) | Δbeat (ms) | Δonset (ms) | Match |
|---|---|---|---|
| 1.168 | 122.8 | 63.2 | onset |
| 1.251 | 206.3 | 20.3 | onset |
| 3.086 | 137.4 | 21.4 | onset |
| 7.174 | 24.2 | 68.8 | beat+onset |
| 11.011 | 65.0 | 18.0 | beat+onset |
| 14.264 | 85.7 | 38.7 | onset |
| 17.184 | 92.1 | 45.1 | onset |
| 18.56 | 224.8 | 15.8 | onset |

## Cross-video synthesis

### Comparison table

| Video | Dur | BPM | LUFS | DR(p95-p10) | Centroid Hz | harsh 2–6k | sub<60 | onset/s | Cuts | Sync±80ms | VO lang | VO wps |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Krea 2 launch | 67.177 | 129.2 | -14.08 | 22.0 | 1514.1 | 0.155 | 0.0573 | 3.334 | 15@0.3 | 53.3% | en | 2.61 |
| Everything Starts With a Spark | 47.347 | 117.45 | -12.84 | 26.79 | 2435.6 | 0.1513 | 0.0023 | 4.119 | 6@0.3 | 83.3% | en | 2.527 |
| The Next Renaissance | 90.629 | 117.45 | -14.41 | 11.59 | 2325.6 | 0.2929 | 0.0446 | 5.451 | 105@0.3 | 86.7% | en | 3.408 |
| Indonesian GRII Batam sermon | 105.025 | 123.05 | -14.25 | 17.46 | 1628.7 | 0.1795 | 0.0569 | 5.161 | 53@0.3 | 86.8% | id | 2.853 |
| Energy & The Sun | 21.868 | 123.05 | -14.08 | 12.68 | 1686.3 | 0.1893 | 0.0375 | 4.984 | 8@0.15 | 100.0% | en | 3.656 |

### Audio character (measured)

- **Promo/trailer subset** (excl. sermon): mean LUFS=-13.85, mean DR=18.27 dB, mean centroid=1990 Hz, mean harsh2–6k frac=0.1971, mean sub frac=0.0354, mean onset/s=4.47
- **All five**: mean LUFS=-13.93, mean harsh2–6k=0.1936
- LUFS range all: -14.41 … -12.84
- Harsh 2–6k fraction range (promo): 0.1513 … 0.2929

### Rule check: “warm thock, avoid harsh 2–6 kHz”

Measured harsh-band energy fractions (share of STFT magnitude in 2–6 kHz):
- Krea 2 launch: **0.1550** (sub=0.0573, low60–250=0.2832, high6–12k=0.0876)
- Everything Starts With a Spark: **0.1513** (sub=0.0023, low60–250=0.1199, high6–12k=0.2427)
- The Next Renaissance: **0.2929** (sub=0.0446, low60–250=0.1662, high6–12k=0.1304)
- Indonesian GRII Batam sermon: **0.1795** (sub=0.0569, low60–250=0.2627, high6–12k=0.1038)
- Energy & The Sun: **0.1893** (sub=0.0375, low60–250=0.1833, high6–12k=0.0922)

- INFERENCE: Promo references keep 2–6 kHz energy fraction in roughly **0.151–0.293** of total spectral magnitude; not zeroed, but mid/high energy is balanced. “Avoid harsh 2–6k” is **partially supported** as a mix taste (no video is 2–6k-dominant; mid 0.5–2k + low often larger) — verify against band tables above rather than treating as absolute notch.
- Sub <60 Hz fractions (promo) 0.0023–0.0573: INFERENCE — “thock” likely tied to low/sub + transient design, not LUFS alone.

### Music-per-act patterns (INFERENCE from energy sections)

Common measured pattern across promo pieces:
- Low/intro energy early, one or more **build→drop** rises, occasional breakdown, quieter outro.
- Exact section tables are per-video above (algorithmic labels).
- Sermon (04) energy curve still yields BPM~123 from librosa — INFERENCE: likely false tempo from speech cadence/room; treat 04 as VO-primary, not music-grid reference.

### SFX vocabulary (measured proxies)

- Proxy = strong onset hits (p75 onset strength) + onset density windows.
- Promo strong-hit counts: Krea 2 launch=56, Everything Starts With a Spark=49, The Next Renaissance=124, Energy & The Sun=28
- Silence gaps >300ms appear in Krea (3) and Spark (3); Renaissance/Energy/GRII measured **0** gaps at top_db=35 — denser continuous beds.
- INFERENCE: SFX “whoosh/impact” moments coincide with strong onset timestamps listed per video; use those times as hit vocabulary anchors when designing edits.

### Mix / loudness targets (concrete numbers from refs)

| Target | Promo subset (01,02,03,05) | Notes |
|---|---|---|
| Integrated LUFS | **-14.4 to -12.8** (mean -13.9) | All sit near −14 to −13 |
| DR p95−p10 | **11.6–26.8 dB** | |
| Centroid | **1514–2436 Hz** | |
| harsh 2–6k frac | **0.151–0.293** | |
| VO pace (where VO present) | **2.53–3.66 wps** (152–219 wpm) | |

### Sync rules (measured)

- Krea 2 launch: cuts=15 (@0.3), sync±80ms beat∨onset = **53.3%**
- Everything Starts With a Spark: cuts=6 (@0.3), sync±80ms beat∨onset = **83.3%**
- The Next Renaissance: cuts=105 (@0.3), sync±80ms beat∨onset = **86.7%**
- Indonesian GRII Batam sermon: cuts=53 (@0.3), sync±80ms beat∨onset = **86.8%**
- Energy & The Sun: cuts=8 (@0.15), sync±80ms beat∨onset = **100.0%**
- Mean sync rate across videos with cuts: **82.0%**
- INFERENCE usable as edit rule: prefer placing cuts on beat grid or within 80 ms of a strong onset; refs do this for a substantial fraction of detected scene changes (see per-video rates).

### Concrete numbers for an AI video-editing skill

```
loudness_target_lufs: -14.5 .. -12.5   # measured promo cluster ~-14.4..-12.8
dynamic_range_p95_p10_db: 11.6 .. 26.8
spectral_centroid_hz: 1514 .. 2436
harsh_2k_6k_energy_fraction_max_guide: 0.293  # stay at or below ref max
sub_lt_60_energy_fraction: 0.002 .. 0.057
cut_audio_sync_tolerance_ms: 80
silence_gap_interest_ms: 300
vo_pace_wps: 2.53 .. 3.66
scene_detect_threshold: 0.3  # fall back to 0.15 if zero cuts
tempo_expect_bpm_promo: ~117 .. 129  # measured; verify per track
```

### Demucs

Not run (time/CPU). Separation skipped; VO presence inferred from Whisper speech segments.

### File paths

- Report: `/workspace/audio-analysis/REPORT.md`
- WAVs: `/workspace/audio-analysis/wav/`
- Per-video audio JSON: `/workspace/audio-analysis/json/*_audio.json`
- Sync JSON: `/workspace/audio-analysis/json/sync.json`
- Transcripts: `/workspace/audio-analysis/transcripts/`
- Scene cuts: `/workspace/audio-analysis/scenes/`
- Videos: `/workspace/audio-analysis/0{1..5}_*.mp4`
