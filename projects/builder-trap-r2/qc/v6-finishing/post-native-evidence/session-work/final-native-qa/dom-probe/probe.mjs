import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';
const project='/home/irfan/.codex/worktrees/builder-trap-r2-audit/skill-development/projects/builder-trap-r2';
const out=path.dirname(new URL(import.meta.url).pathname);
const require=createRequire(project+'/remotion/package.json');
const WS=require('ws');
const chrome=project+'/remotion/node_modules/.remotion/chrome-headless-shell/linux64/chrome-headless-shell-linux64/chrome-headless-shell';
const font=project+'/remotion/public/fonts/inter/inter-latin-400-normal.woff2';
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const profile=path.join(out,'profile-'+Date.now());fs.mkdirSync(profile);
const log=fs.openSync(path.join(out,'chrome.log'),'w');
const proc=spawn(chrome,['--no-sandbox','--remote-debugging-address=127.0.0.1','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:['ignore',log,log]});
let socket;
try {
  let active;
  for(let i=0;i<100;i++){
    const p=path.join(profile,'DevToolsActivePort');
    if(fs.existsSync(p)){active=fs.readFileSync(p,'utf8').trim().split('\n');break;}
    if(proc.exitCode!==null)throw Error('Chrome exited '+proc.exitCode);
    await new Promise(r=>setTimeout(r,100));
  }
  if(!active)throw Error('Own browser did not expose its CDP port');
  socket=new WS('ws://127.0.0.1:'+active[0]+active[1]);
  await new Promise((r,j)=>{socket.once('open',r);socket.once('error',j);});
  let seq=0;const pending=new Map();
  socket.on('message',b=>{const m=JSON.parse(String(b));if(!m.id)return;const p=pending.get(m.id);if(!p)return;pending.delete(m.id);clearTimeout(p.timer);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);});
  const call=(method,params={},sessionId)=>new Promise((resolve,reject)=>{const id=++seq;const timer=setTimeout(()=>{pending.delete(id);reject(Error('CDP timeout '+method));},15000);pending.set(id,{resolve,reject,timer});socket.send(JSON.stringify({id,method,params,...(sessionId?{sessionId}:{})}));});
  const version=await call('Browser.getVersion');
  const {targetId}=await call('Target.createTarget',{url:'about:blank'});
  const {sessionId}=await call('Target.attachToTarget',{targetId,flatten:true});
  await call('Page.enable',{},sessionId);
  const html=`<!doctype html><style>
  @font-face{font-family:InterUI;src:url(data:font/woff2;base64,${fs.readFileSync(font).toString('base64')})}
  *{margin:0}body{margin:0;font-family:InterUI,sans-serif}
  .one{width:100px;height:20px;border:1px solid #111}
  .column{width:720px;height:880px;border:1px solid #E5E5E5;border-bottom:none;position:absolute;left:370px;top:120px}
  .avatar{width:43.2px;height:43.2px;border:1px solid #E5E5E5;border-radius:50%;flex:none}
  .compose{display:flex;align-items:center;gap:16.8px;padding:21.6px 28.8px;border-bottom:1px solid #E5E5E5}
  .compose .avatar{width:48px;height:48px}
  .post{width:720px;box-sizing:border-box;padding:19.2px 28.8px 16.8px;display:flex;gap:14.4px;border-bottom:1px solid #E5E5E5}
  .content{flex:1;min-width:0}.header{display:flex;align-items:baseline;gap:7.2px;font-size:18px;line-height:1.34;letter-spacing:-0.005em}
  .media{margin-top:12px;width:283.008px;height:159.456px}.actions{display:flex;gap:31.2px;margin-top:14.4px;margin-left:-2.4px;font-size:15.6px;line-height:1.34}.icon{width:24px;height:24px}
  .body{font-size:18px;line-height:1.34;letter-spacing:-0.005em;margin-top:2.4px;white-space:pre-wrap}
  </style><div id="one" class="one"></div><div class="column" id="column"><div class="compose" id="compose"><div class="avatar" id="composeAvatar"></div><span>What's new?</span></div>${[1,2].map(k=>`<div class="post" id="post${k}"><div class="avatar"></div><div class="content"><div class="header">growth.daily</div><div class="media"></div><div class="actions"><div class="icon"></div></div></div></div>`).join('')}<div class="post" id="quote"><div class="avatar" id="quoteAvatar"></div><div class="content"><div class="header" id="quoteHeader">mindset.notes 1h</div><div class="body" id="quoteBody">Kalau mau jadi sesuatu, harus\nmenjadi sesuatu yang berbeda.</div><div class="actions" id="quoteActions"><div class="icon"></div></div></div></div></div>`;
  const rows=[];
  for(const dpr of [.5,1,.5]){
    await call('Emulation.setDeviceMetricsOverride',{width:1920,height:1080,deviceScaleFactor:dpr,mobile:false},sessionId);
    await call('Page.navigate',{url:'data:text/html;charset=utf-8,'+encodeURIComponent(html)},sessionId);
    let result;
    for(let n=0;n<50;n++){
      result=await call('Runtime.evaluate',{expression:`(async()=>{if(!document.getElementById('quote'))return null;await document.fonts.ready;return {dpr:devicePixelRatio,width:innerWidth,height:innerHeight,nodes:Object.fromEntries(['one','column','compose','composeAvatar','post1','post2','quote','quoteAvatar','quoteHeader','quoteBody','quoteActions'].map(id=>{const el=document.getElementById(id),r=el.getBoundingClientRect(),c=getComputedStyle(el);return [id,{x:r.x,y:r.y,width:r.width,height:r.height,borderTop:c.borderTopWidth,borderBottom:c.borderBottomWidth,borderLeft:c.borderLeftWidth,fontSize:c.fontSize,lineHeight:c.lineHeight}]}))}})()`,awaitPromise:true,returnByValue:true},sessionId);
      if(result.exceptionDetails)throw Error(JSON.stringify(result.exceptionDetails));
      if(result.result?.value){rows.push(result.result.value);break;}
      await new Promise(r=>setTimeout(r,50));
    }
    if(rows.length===0)throw Error('No DOM measurements');
  }
  const record={scope:'Synthetic DOM-only structural clone of Threads flow CSS; no Remotion frame render, screenshot, source change or comparator change. Not a complete ThPost render.',chrome,chrome_sha256:sha(chrome),version,probe_sha256:sha(new URL(import.meta.url)),font,font_sha256:sha(font),profile,port:Number(active[0]),rows};
  fs.writeFileSync(path.join(out,'result.json'),JSON.stringify(record,null,2)+'\n');
  console.log(JSON.stringify({chrome:version.product,dpr05:rows[0],dpr1:rows[1],repeat05Matches:JSON.stringify(rows[0])===JSON.stringify(rows[2]),result:path.join(out,'result.json')},null,2));
  await call('Browser.close');
} finally {
  if(socket)socket.close();
  if(proc.exitCode===null)proc.kill('SIGTERM');
  fs.closeSync(log);
}
