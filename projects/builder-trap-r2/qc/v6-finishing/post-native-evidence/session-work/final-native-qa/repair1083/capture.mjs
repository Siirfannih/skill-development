import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
const P='/home/irfan/.codex/worktrees/builder-trap-r2-audit/skill-development/projects/builder-trap-r2';
const O=path.dirname(new URL(import.meta.url).pathname);
const require=createRequire(P+'/remotion/package.json');
const R=P+'/remotion/node_modules/@remotion/renderer';
const {selectComposition,renderStill}=require(R);
const take=require(R+'/dist/take-frame.js');
const {puppeteerEvaluateWithCatch}=require(R+'/dist/puppeteer-evaluate.js');
const chrome=P+'/remotion/node_modules/.remotion/chrome-headless-shell/linux64/chrome-headless-shell-linux64/chrome-headless-shell';
const sha=q=>crypto.createHash('sha256').update(fs.readFileSync(q)).digest('hex');
const protectedPaths=[P+'/qc/v6-finishing/source-snapshot.json',P+'/qc/v6-finishing/readiness.json',P+'/qc/v6-finishing/SHIP.json',P+'/tools/finish_v6.py',P+'/out/builder-trap-r2_v6.mp4',P+'/qc/v6-finishing/final-all-frame-correspondence-additive.json'];
const frozenBefore=Object.fromEntries(protectedPaths.map(q=>[q,sha(q)]));
const bundleHashes=Object.fromEntries(fs.readdirSync(P+'/qc/.bundle').filter(n=>/\.(js|html)$/.test(n)).map(n=>[n,sha(P+'/qc/.bundle/'+n)]));
const record={schema_version:1,scope:'Isolated diagnostic fresh native frame captures only; no final/chunk replacement, source change, threshold change or closure.',started_utc:new Date().toISOString(),invocation:process.argv,TMPDIR:process.env.TMPDIR,cpu_affinity:fs.readFileSync('/proc/self/status','utf8').split('\n').find(x=>x.startsWith('Cpus_allowed_list:')),nice:os.getPriority(),lock:'Caller acquired existing /tmp/remotion-heavy-render.lock nonblocking before invocation',browser_executable:chrome,browser_sha256:sha(chrome),renderer_package_sha256:sha(R+'/package.json'),capture_script_sha256:sha(new URL(import.meta.url)),bundle_hashes:bundleHashes,frozen_before:frozenBefore,frames:[]};
let currentFrame=null;
const originalTake=take.takeFrame;
take.takeFrame=async args=>{
 const measured=await puppeteerEvaluateWithCatch({page:args.freePage,frame:currentFrame,args:[],timeoutInMilliseconds:20000,pageFunction:()=>{
  const nodes=[...document.querySelectorAll('div')].filter(e=>e.childElementCount===0&&e.textContent==='satu tahun'&&getComputedStyle(e).fontFamily.includes('Caveat'));
  return {initialFrame:window.remotion_initialFrame,dpr:devicePixelRatio,viewport:[innerWidth,innerHeight],renderReady:window.remotion_renderReady,fontStatus:document.fonts.status,handwriting:nodes.map(e=>{const c=getComputedStyle(e),r=e.getBoundingClientRect();return {text:e.textContent,clipPath:c.clipPath,fontFamily:c.fontFamily,fontSize:c.fontSize,opacity:c.opacity,rect:{x:r.x,y:r.y,width:r.width,height:r.height}}}),offthreadImages:[...document.querySelectorAll('img')].filter(e=>e.src.includes('/proxy?')).map(e=>({src:e.src,complete:e.complete,naturalWidth:e.naturalWidth,naturalHeight:e.naturalHeight}))};
 }});
 const frameRecord={frame:currentFrame,seconds:currentFrame/30,output:args.output,scale:args.scale,format:args.imageFormat,width:args.width,height:args.height,dom_before_surface_capture:measured.value};record.frames.push(frameRecord);
 return originalTake(args);
};
try{
 const composition=await selectComposition({serveUrl:P+'/qc/.bundle',id:'Main',browserExecutable:chrome,logLevel:'error',timeoutInMilliseconds:180000,offthreadVideoThreads:1});
 record.composition=composition;
 if(composition.durationInFrames!==2493||composition.width!==1920||composition.height!==1080)throw Error('Unexpected composition');
 for(const frame of [1083,1082,1084]){
  currentFrame=frame;const output=O+'/native-'+frame+'.png';if(fs.existsSync(output))throw Error('Refuse overwrite '+output);
  const options={serveUrl:P+'/qc/.bundle',composition,output,frame,imageFormat:'png',scale:1,browserExecutable:chrome,logLevel:'error',timeoutInMilliseconds:180000,offthreadVideoThreads:1,overwrite:false};
  await renderStill(options);record.frames.at(-1).sha256=sha(output);record.frames.at(-1).bytes=fs.statSync(output).size;
  console.log(JSON.stringify(record.frames.at(-1)));
 }
 record.frozen_after=Object.fromEntries(protectedPaths.map(q=>[q,sha(q)]));
 record.frozen_unchanged=JSON.stringify(record.frozen_before)===JSON.stringify(record.frozen_after);
 if(!record.frozen_unchanged)throw Error('Frozen inputs changed during diagnostic');
 record.ended_utc=new Date().toISOString();record.completed=true;
}catch(e){record.completed=false;record.error=String(e);throw e;}
finally{fs.writeFileSync(O+'/provenance.json',JSON.stringify(record,null,2)+'\n');}
