import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import crypto from 'node:crypto';
import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';
const project='/home/irfan/.codex/worktrees/builder-trap-r2-audit/skill-development/projects/builder-trap-r2';
const out=path.dirname(new URL(import.meta.url).pathname),bundle=project+'/qc/.bundle';
const WS=createRequire(project+'/remotion/package.json')('ws');
const chrome=project+'/remotion/node_modules/.remotion/chrome-headless-shell/linux64/chrome-headless-shell-linux64/chrome-headless-shell';
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const profile=path.join(out,'actual-profile-'+Date.now());fs.mkdirSync(profile);
const server=http.createServer((req,res)=>{
  const file=path.resolve(bundle,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  const actual=file===bundle?path.join(bundle,'index.html'):file;
  if(!actual.startsWith(bundle+'/')){res.writeHead(403);res.end();return;}
  try{const st=fs.statSync(actual);if(!st.isFile())throw Error('not file');res.setHeader('Content-Length',st.size);res.setHeader('Content-Type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.woff2':'font/woff2','.ttf':'font/ttf','.otf':'font/otf','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.json':'application/json'})[path.extname(actual)]??'application/octet-stream');fs.createReadStream(actual).pipe(res);}catch{res.writeHead(404);res.end();}
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const servePort=server.address().port,log=fs.openSync(path.join(out,'actual-chrome.log'),'w');
const proc=spawn(chrome,['--no-sandbox','--remote-debugging-address=127.0.0.1','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:['ignore',log,log]});
let socket;
try{
  let active;
  for(let i=0;i<100;i++){const p=path.join(profile,'DevToolsActivePort');if(fs.existsSync(p)){active=fs.readFileSync(p,'utf8').trim().split('\n');break;}if(proc.exitCode!==null)throw Error('Chrome exited');await new Promise(r=>setTimeout(r,100));}
  if(!active)throw Error('CDP not ready');
  socket=new WS('ws://127.0.0.1:'+active[0]+active[1]);await new Promise((r,j)=>{socket.once('open',r);socket.once('error',j);});
  let seq=0;const pending=new Map();socket.on('message',b=>{const m=JSON.parse(String(b));if(!m.id)return;const p=pending.get(m.id);if(!p)return;pending.delete(m.id);clearTimeout(p.timer);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);});
  const call=(method,params={},sessionId)=>new Promise((resolve,reject)=>{const id=++seq,timer=setTimeout(()=>{pending.delete(id);reject(Error('CDP timeout '+method));},15000);pending.set(id,{resolve,reject,timer});socket.send(JSON.stringify({id,method,params,...(sessionId?{sessionId}:{})}));});
  const version=await call('Browser.getVersion'),rows=[];
  for(const dpr of [.5,1,.5]){
    const {targetId}=await call('Target.createTarget',{url:'about:blank'}),{sessionId}=await call('Target.attachToTarget',{targetId,flatten:true});
    await call('Page.enable',{},sessionId);
    await call('Emulation.setDeviceMetricsOverride',{width:1920,height:1080,deviceScaleFactor:dpr,mobile:false},sessionId);
    await call('Page.addScriptToEvaluateOnNewDocument',{source:`window.process={env:{NODE_ENV:'production'}};window.remotion_puppeteerTimeout=20000;window.remotion_isMainTab=true;window.remotion_mediaCacheSizeInBytes=134217728;window.remotion_initialMemoryAvailable=4294967296;window.remotion_broadcastChannel=new BroadcastChannel('remotion-video-frame-extraction');window.remotion_inputProps='{}';window.remotion_initialFrame=570;window.remotion_attempt=1;window.remotion_audioEnabled=false;window.remotion_videoEnabled=true;window.remotion_logLevel='error';`},sessionId);
    await call('Page.navigate',{url:'http://127.0.0.1:'+servePort+'/'},sessionId);
    const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true},sessionId);if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
    let ready=false;
    for(let i=0;i<100;i++){ready=await evaluate(`typeof window.remotion_setBundleMode==='function'`);if(ready)break;await new Promise(r=>setTimeout(r,100));}
    if(!ready)throw Error('Bundle function not ready');
    await evaluate(`window.remotion_setBundleMode({type:'composition',compositionName:'Main',serializedResolvedPropsWithSchema:'{}',compositionDurationInFrames:2493,compositionFps:30,compositionHeight:1080,compositionWidth:1920})`);
    let measurement;
    for(let i=0;i<100;i++){
      measurement=await evaluate(`(async()=>{await document.fonts.ready;const user=[...document.querySelectorAll('span')].find(e=>e.textContent==='mindset.notes');if(!user||window.remotion_renderReady!==true)return {waiting:true,error:window.remotion_cancelledError};const header=user.parentElement,content=header.parentElement,post=content.parentElement;const rect=e=>{const r=e.getBoundingClientRect(),c=getComputedStyle(e);return {x:r.x,y:r.y,width:r.width,height:r.height,offsetTop:e.offsetTop,offsetLeft:e.offsetLeft,offsetWidth:e.offsetWidth,offsetHeight:e.offsetHeight,borderTop:c.borderTopWidth,borderBottom:c.borderBottomWidth,borderLeft:c.borderLeftWidth,fontSize:c.fontSize,lineHeight:c.lineHeight,transform:c.transform,perspective:c.perspective,opacity:c.opacity}};const ancestors=[];for(let e=post,n=0;e&&n<12;e=e.parentElement,n++)ancestors.push(rect(e));return {dpr:devicePixelRatio,width:innerWidth,height:innerHeight,ready:window.remotion_renderReady,nodes:{user:rect(user),header:rect(header),post:rect(post),avatar:rect(post.firstElementChild),body:rect(header.nextElementSibling),actions:rect(content.lastElementChild)},ancestors}})()`);
      if(!measurement.waiting)break;if(measurement.error)throw Error(measurement.error);await new Promise(r=>setTimeout(r,100));
    }
    if(measurement.waiting)throw Error('Actual frame DOM not ready '+JSON.stringify(measurement));
    rows.push(measurement);await call('Target.closeTarget',{targetId});
  }
  const record={scope:'DOM-only unmodified current qc/.bundle at real f570; no screenshots, video/sequence render, source mutation or comparator change.',frame:570,version,chrome,chrome_sha256:sha(chrome),probe_sha256:sha(new URL(import.meta.url)),bundle_sha256:sha(bundle+'/bundle.js'),source_snapshot_sha256:sha(project+'/qc/v6-finishing/source-snapshot.json'),profile,servePort,cdpPort:Number(active[0]),rows};
  fs.writeFileSync(path.join(out,'actual-result.json'),JSON.stringify(record,null,2)+'\n');
  console.log(JSON.stringify({result:path.join(out,'actual-result.json'),dpr05:rows[0].nodes,dpr1:rows[1].nodes,repeat05Matches:JSON.stringify(rows[0])===JSON.stringify(rows[2])},null,2));
  await call('Browser.close');
}finally{if(socket)socket.close();if(proc.exitCode===null)proc.kill('SIGTERM');fs.closeSync(log);server.close();}
