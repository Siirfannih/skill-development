"""TTS ElevenLabs untuk flat-mirip-mirip (D-15): suara Jadisatu Narrator V3, model eleven_v4.
Pakai: python3 audio/el_tts.py <out.mp3> "<teks>"   (kunci dibaca dari ~/.config/elevenlabs/api_key; tidak dicetak)"""
import json, os, sys, urllib.request, urllib.error
KEY = open(os.path.expanduser('~/.config/elevenlabs/api_key')).read().strip()
VOICE = '1I8tElkHzrblGqkJtwn3'
def tts(text, out, model='eleven_v4'):
    req = urllib.request.Request(
        f'https://api.elevenlabs.io/v1/text-to-speech/{VOICE}?output_format=mp3_44100_192',
        data=json.dumps({'text': text, 'model_id': model}).encode(),
        headers={'xi-api-key': KEY, 'Content-Type': 'application/json'})
    try:
        r = urllib.request.urlopen(req, timeout=180)
        open(out, 'wb').write(r.read()); print('ok', out, len(text), 'karakter')
    except urllib.error.HTTPError as e:
        print('ERR', e.code, e.read()[:300].decode(errors='replace')); sys.exit(1)
if __name__ == '__main__':
    tts(sys.argv[2], sys.argv[1])
