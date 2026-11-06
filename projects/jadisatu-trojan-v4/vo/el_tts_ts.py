# VO per beat + alignment karakter. Kunci dibaca dari file, tidak dicetak.
import json,sys,base64,urllib.request,concurrent.futures as cf,os
KEYF=os.environ.get('EL_KEYFILE',os.path.expanduser('~/.secrets-mg/el1.key'))
VOICE=os.environ.get('EL_VOICE','1I8tElkHzrblGqkJtwn3')
SET={'stability':0.5,'similarity_boost':0.75,'style':0.0,'use_speaker_boost':True,'speed':1.0}  # = setelan tersimpan voice, tanpa percepatan
key=open(KEYF).read().strip()
def tts(name,text,outdir):
    req=urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{VOICE}/with-timestamps?output_format=mp3_44100_128',
        data=json.dumps({'text':text,'model_id':'eleven_v4','voice_settings':SET}).encode(),headers={'xi-api-key':key,'Content-Type':'application/json'})
    try:
        d=json.load(urllib.request.urlopen(req,timeout=180))
        open(f'{outdir}/{name}.mp3','wb').write(base64.b64decode(d['audio_base64']))
        json.dump({'text':text,'alignment':d.get('alignment')},open(f'{outdir}/{name}.align.json','w'),ensure_ascii=False)
        return 'ok '+name
    except urllib.error.HTTPError as e: return f'ERR {name} {e.code} {e.read()[:300]}'
L=json.load(open(sys.argv[1])); only=sys.argv[3:]
os.makedirs(sys.argv[2],exist_ok=True)
with cf.ThreadPoolExecutor(2) as ex:
    for r in ex.map(lambda x: tts(x[0],x[1],sys.argv[2]), [l for l in L if not only or l[0] in only]): print(r)
