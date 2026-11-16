# RAEA parity smoke test

This directory copies the active Remotion source into an isolated RAEA entry
and maps the small Remotion API surface used by Builder Trap R2 through
`remotion-compat/`.

Run `./setup.sh` after every change under `../remotion/src`. The smoke gate is:

- still and 300-frame video mean SSIM >= 0.98 against Remotion;
- exactly 300 frames at 1920x1080 and 30 fps;
- audio lag <= 1 sample and SNR >= 60 dB.

RAEA `0.1.0-canary.2` only exposes AAC audio inside MP4. Its audio comparison
is therefore codec-inclusive: failure of the 60 dB SNR gate blocks a full RAEA
render even when timing is correct. Do not weaken the gate; use a release that
can emit PCM WAV before claiming lossless audio parity.
