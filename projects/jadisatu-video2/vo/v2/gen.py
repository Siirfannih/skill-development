import json,os,sys,urllib.request,concurrent.futures as cf
key=os.environ["ELEVENLABS_API_KEY"];V="1I8tElkHzrblGqkJtwn3"
items=json.load(open("vo_sections.json")); only=sys.argv[1:]
VS={"stability":0.35,"similarity_boost":0.8,"style":0.0,"speed":1.12}
def gen(it):
    cid,text=it
    if only and cid not in only: return cid,"skip"
    body=json.dumps({"text":text,"model_id":"eleven_v4","voice_settings":VS}).encode()
    r=urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{V}?output_format=mp3_44100_128",data=body,headers={"xi-api-key":key,"Content-Type":"application/json"})
    try: d=urllib.request.urlopen(r,timeout=180).read(); open(f"{cid}.mp3","wb").write(d); return cid,len(d)
    except urllib.error.HTTPError as e: return cid,f"HTTP {e.code} {e.read()[:300]}"
with cf.ThreadPoolExecutor(2) as ex:
    for c,res in ex.map(gen,items): print(c,res,flush=True)
