import json,sys,urllib.request,concurrent.futures as cf
key=open('/home/claude/ace/.el_key').read().strip()
VOICE='1I8tElkHzrblGqkJtwn3'
def tts(name,text,outdir):
    req=urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{VOICE}?output_format=mp3_44100_128',
        data=json.dumps({'text':text,'model_id':'eleven_v4','voice_settings':{'stability':0.85,'similarity_boost':0.8,'speed':1.12}}).encode(),headers={'xi-api-key':key,'Content-Type':'application/json'})
    try:
        r=urllib.request.urlopen(req,timeout=180); open(f'{outdir}/{name}.mp3','wb').write(r.read()); return 'ok '+name
    except urllib.error.HTTPError as e: return f'ERR {name} {e.code} {e.read()[:300]}'
L=json.load(open(sys.argv[1])); only=sys.argv[3:] 
with cf.ThreadPoolExecutor(2) as ex:
    for r in ex.map(lambda x: tts(x[0],x[1],sys.argv[2]), [l for l in L if not only or l[0] in only]): print(r)
