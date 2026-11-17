import {bundle} from '@remotion/bundler';
import {getCompositions, openBrowser, renderStill} from '@remotion/renderer';
import path from 'node:path';
import {mkdir, writeFile} from 'node:fs/promises';

const project = process.cwd();
const out = path.resolve(project, '../handoff/henti1');
await mkdir(out, {recursive: true});
const url = await bundle({entryPoint:path.join(project,'src/uji/papan-entry.tsx'),outDir:path.join(out,'.bundle')});
const browser = await openBrowser('chrome', {chromiumOptions:{gl:'swangle'}});
try {
  const compositions = await getCompositions(url,{puppeteerInstance:browser});
  const records=[];
  for(const composition of compositions) {
    const frame=composition.id==='Papan-B5'?87:84;
    const output=path.join(out,`${composition.id.replace('Papan','papan')}.jpg`);
    await renderStill({serveUrl:url,composition,output,frame,scale:.5,imageFormat:'jpeg',jpegQuality:95,
      puppeteerInstance:browser,chromiumOptions:{gl:'swangle'},timeoutInMilliseconds:180000});
    records.push({composition:composition.id,frame,output,width:960,height:540});
    console.log(`${composition.id}: f${frame}, 960×540`);
  }
  await writeFile(path.join(out,'render-manifest.json'),JSON.stringify(records,null,2));
} finally { await browser.close({silent:true}); }
