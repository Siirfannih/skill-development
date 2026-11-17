import React from 'react';
import {SimpulOpenAI} from '../komponen/PixelTokoh2D';

// Isi dari K13/Panel.tsx; salinan papan memakai ruang jendela tanpa kartu kedua.
const panel: React.CSSProperties = {padding:'24px 32px',color:'#1F2328',fontFamily:'K13Inter',fontSize:26,lineHeight:1.45};
const tool: React.CSSProperties = {marginTop:15,color:'#6B6F76',fontSize:22};

export const PanelClaude: React.FC = () => <div style={panel}>
  <div>Ada Codex kedua untuk maskot <code style={{fontSize:23,background:'#F1F0EC',borderRadius:5,padding:'3px 7px'}}>(TASK-K12-r1)</code> yang ditulis atas nama "Sutradara claude1". Saya telusuri asal prosesnya.</div>
  <div style={tool}>Ran 2 commands ›</div>
  <div style={tool}>Traced parent processes of the second mascot Codex ›</div>
  <div style={tool}>Kill orphan codex, look for chat-bubble/character references <span style={{marginLeft:10}}>Blocked</span></div>
  <div style={{...tool,marginTop:19,display:'flex',alignItems:'center',gap:12}}><span style={{color:'#D97757',fontSize:30}}>✳</span>Finding where the orphan Codex logs 59s ›</div>
</div>;

export const PanelChatGPT: React.FC = () => <div style={panel}>
  <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center',gap:8,color:'#6B6F76',fontSize:22}}><SimpulOpenAI size={24}/>Sent by ChatGPT from another chat</div>
  <div style={{background:'#0D0D0D',color:'white',padding:'22px 26px',borderRadius:28,marginTop:16,fontSize:26,lineHeight:1.45}}>
    Koordinasi ruang PC sesuai instruksi Irfan agar sesi aktif aman. Saya mengerjakan Builder Trap v6, QA sudah lengkap…
    <div style={{marginTop:12}}>Show more ⌄</div>
  </div>
  <div style={{marginTop:22}}>Sisa pengujian dan cache paket yang tidak terpakai mulai dibersihkan.</div>
  <div style={{marginTop:17,color:'#6B6F76',fontSize:24}}>Checking pnpm store hardlinks</div>
</div>;
