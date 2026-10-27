#!/usr/bin/env python3
"""Minimal MCP client for https://mcp.idea.ai/mcp. Usage: idea_mcp.py list | call <tool> '<json args>'"""
import json, sys, os, subprocess, urllib.parse
S="/tmp/claude-0/-home-claude/1fa39fe2-fa3a-5b48-9d45-e6c23c632190/scratchpad/idea"
URL="https://mcp.idea.ai/mcp"
def tok():
    return json.load(open(f"{S}/token.json"))["access_token"]
def refresh():
    t=json.load(open(f"{S}/token.json")); c=json.load(open(f"{S}/client.json"))
    out=subprocess.run(["curl","-sS","-m","30","https://oauth.creativefabrica.com/oauth2/token","-d","grant_type=refresh_token","--data-urlencode",f"refresh_token={t['refresh_token']}","-d",f"client_id={c['client_id']}"],capture_output=True,text=True).stdout
    n=json.loads(out); assert "access_token" in n, n.get("error")
    t.update(n); json.dump(t,open(f"{S}/token.json","w")); os.chmod(f"{S}/token.json",0o600)
def post(body,sid=None,retry=True):
    import tempfile
    h=["-H","content-type: application/json","-H","accept: application/json, text/event-stream","-H",f"authorization: Bearer {tok()}","-H","MCP-Protocol-Version: 2025-06-18"]
    if sid: h+=["-H",f"mcp-session-id: {sid}"]
    hf=tempfile.mktemp(); bf=tempfile.mktemp()
    subprocess.run(["curl","-sS","-m","900","-D",hf,"-o",bf,"-X","POST",URL,*h,"-d",json.dumps(body)])
    head=open(hf).read(); payload=open(bf).read(); os.remove(hf); os.remove(bf)
    status=[l for l in head.splitlines() if l.startswith("HTTP/")][-1]
    if " 401" in status and retry: refresh(); return post(body,sid,False)
    s=[l.split(":",1)[1].strip() for l in head.splitlines() if l.lower().startswith("mcp-session-id")]
    msgs=[]
    for l in payload.splitlines():
        if l.startswith("data:"):
            try: msgs.append(json.loads(l[5:]))
            except Exception: pass
    if not msgs and payload.strip().startswith("{"): msgs=[json.loads(payload)]
    return (s[0] if s else sid), msgs, status
def session():
    sid,m,st=post({"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"fore-cerita","version":"1"}}})
    post({"jsonrpc":"2.0","method":"notifications/initialized"},sid)
    return sid
if __name__=="__main__":
    sid=session()
    if sys.argv[1]=="list":
        _,m,_=post({"jsonrpc":"2.0","id":2,"method":"tools/list"},sid)
        for t in m[-1]["result"]["tools"]:
            print("##",t["name"],"-",t.get("description","")[:400].replace("\n"," "))
            print("   args:",json.dumps(t.get("inputSchema",{}).get("properties",{}))[:700])
    else:
        _,m,st=post({"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":sys.argv[2],"arguments":json.loads(sys.argv[3]) if len(sys.argv)>3 else {}}},sid)
        print(st); print(json.dumps(m[-1] if m else {},ensure_ascii=False)[:6000])
