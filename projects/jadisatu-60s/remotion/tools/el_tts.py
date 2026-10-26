import json,sys,urllib.request
key=open('/home/claude/thegap/.el_key').read().strip()
VOICE='1I8tElkHzrblGqkJtwn3'
def tts(text,out,model='eleven_v4'):
    req=urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{VOICE}?output_format=mp3_44100_128',
        data=json.dumps({'text':text,'model_id':model}).encode(),headers={'xi-api-key':key,'Content-Type':'application/json'})
    try:
        r=urllib.request.urlopen(req,timeout=120); open(out,'wb').write(r.read()); print('ok',out)
    except urllib.error.HTTPError as e: print('ERR',e.code,e.read()[:300])
if __name__=='__main__': tts(sys.argv[2],sys.argv[1])
