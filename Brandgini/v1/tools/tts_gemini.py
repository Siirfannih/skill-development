#!/usr/bin/env python3
"""
Voiceover Generator untuk Soalnya Gini (24/7 Server Worker)
Primary: Google AI Studio Gemini TTS (racikan natural ala edubizz-1.mp4)
Fallback: ElevenLabs Multilingual v2 / Turbo v2.5

Cara pakai:
  export GEMINI_API_KEY="your_key"
  python3 tools/tts_gemini.py --input episodes/ep01/script.md --out episodes/ep01/vo_raw.wav --voice Aoede

  # Fallback ke ElevenLabs:
  export ELEVENLABS_API_KEY="your_key"
  export ELEVENLABS_VOICE_ID="your_voice_id"
  python3 tools/tts_gemini.py --engine elevenlabs --input episodes/ep01/script.md --out episodes/ep01/vo_raw.wav
"""
import argparse
import os
import re
import sys
import wave
import urllib.request
import json

DIRECTORS_NOTES_ID = """# AUDIO PROFILE: Narator Explainer Indonesia (Soalnya Gini)
## Role
Teman yang cerdas, hangat, dan santai saat menjelaskan cara kerja hal-hal sehari-hari di kedai kopi.

## DIRECTOR'S NOTES
- Style: Conversational, curious, warm vocal smile, natural micro-breaths between thoughts. NOT a stiff news anchor, NOT robotic, NOT overly dramatic.
- Accent: Natural modern Jakarta Indonesian (bahasa Indonesia percakapan sehari-hari).
- Pacing: Medium-brisk (~150 WPM). Insert subtle 0.25-0.35s natural pauses on '...' and slight rising curiosity on '?'. Slow down slightly on key technical terms for clarity.

## TRANSCRIPT TO SPEAK:
"""

def clean_script(path: str) -> str:
    raw = open(path, "r", encoding="utf-8").read()
    # Hapus markdown heading / metadata jika ada
    lines = [ln.strip() for ln in raw.splitlines() if ln.strip() and not ln.strip().startswith("#")]
    text = " ".join(lines)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def synthesize_gemini(text: str, out_wav: str, voice: str, model: str):
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        sys.exit("ERROR: GEMINI_API_KEY belum di-set.")
    try:
        from google import genai
        from google.genai import types
    except ImportError:
        sys.exit("ERROR: Install SDK dulu: pip install google-genai")

    client = genai.Client(api_key=api_key)
    prompt = f"{DIRECTORS_NOTES_ID}{text}"

    response = client.models.generate_content(
        model=model,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_modalities=["AUDIO"],
            speech_config=types.SpeechConfig(
                voice_config=types.VoiceConfig(
                    prebuilt_voice_config=types.PrebuiltVoiceConfig(
                        voice_name=voice
                    )
                )
            ),
        ),
    )

    pcm_data = response.candidates[0].content.parts[0].inline_data.data
    with wave.open(out_wav, "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(24000)
        wf.writeframes(pcm_data)
    print(f"[OK] Gemini TTS ({model}, voice={voice}) -> {out_wav}")

def synthesize_elevenlabs(text: str, out_wav: str):
    api_key = os.environ.get("ELEVENLABS_API_KEY")
    voice_id = os.environ.get("ELEVENLABS_VOICE_ID")
    if not api_key or not voice_id:
        sys.exit("ERROR: ELEVENLABS_API_KEY dan ELEVENLABS_VOICE_ID wajib di-set.")

    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}?output_format=pcm_44100"
    payload = json.dumps({
        "text": text,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": 0.35,
            "similarity_boost": 0.78,
            "style": 0.35,
            "use_speaker_boost": True
        }
    }).encode("utf-8")

    req = urllib.request.Request(
        url,
        data=payload,
        headers={
            "xi-api-key": api_key,
            "Content-Type": "application/json"
        },
        method="POST",
    )
    with urllib.request.urlopen(req) as resp:
        pcm_data = resp.read()

    with wave.open(out_wav, "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(44100)
        wf.writeframes(pcm_data)
    print(f"[OK] ElevenLabs TTS (voice={voice_id}) -> {out_wav}")

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--input", required=True, help="Path ke script.md")
    p.add_argument("--out", required=True, help="Path output .wav")
    p.add_argument("--engine", choices=["gemini", "elevenlabs"], default="gemini")
    p.add_argument("--voice", default="Aoede", help="Voice Gemini: Aoede, Kore, Leda, Puck, Charon")
    p.add_argument("--model", default="gemini-2.5-flash-preview-tts")
    args = p.parse_args()

    text = clean_script(args.input)
    os.makedirs(os.path.dirname(os.path.abspath(args.out)), exist_ok=True)
    if args.engine == "gemini":
        synthesize_gemini(text, args.out, args.voice, args.model)
    else:
        synthesize_elevenlabs(text, args.out)

if __name__ == "__main__":
    main()
