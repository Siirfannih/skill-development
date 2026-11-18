import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {move} from '../../../lib/curves';
import {BidangUI} from '../BidangUI';
import {FONT_UI, FontsUI} from '../FontsUI';
import {IkonClaude, type NamaIkonClaude} from './IkonClaude';
import {CLAUDE as C} from './warna';

export type AppClaudeTerangProps = {
  lampiran?: {nama: string; jenis: 'video'};
  /** mulai dan kirimPada memakai frame lokal komponen; cps = karakter per detik. */
  ketik: {teks: string; mulai: number; cps: number};
  kirimPada?: number;
};

const SESI = [
  'Edit video reel',
  'Riset referensi motion',
  'Storyboard konten minggu ini',
  'Caption carousel produk',
  'Audit warna brand',
  'Ide konten baru',
  'Script VO 60 detik',
  'Daftar b-roll',
  'Revisi thumbnail',
  'Analisis hook pesaing',
  'Rencana posting Desember',
  'Subtitle otomatis',
  'Color grading footage',
  'Musik latar yang cocok',
  'Ringkas podcast',
  'Template timeline',
  'Feedback klien',
  'Checklist render',
];
export const UKURAN_CLAUDE = {lebar: 2000, tinggi: 1228, sidebar: 406, kanan: 1544, judul: 61};
const flex: React.CSSProperties = {display: 'flex', alignItems: 'center'};
const at = (left: number, top: number, width?: number, height?: number): React.CSSProperties => ({position: 'absolute', left, top, width, height});

const IkonDi: React.FC<{nama: NamaIkonClaude; x: number; y: number; size?: number; redup?: boolean}> = ({nama, x, y, size = 24, redup}) => (
  <div style={{...at(x, y), color: redup ? C.redup : C.tinta}}><IkonClaude nama={nama} size={size}/></div>
);

// Port sidebar/chat/composer/status AppClaude (pinjam/b3) dan ChatInput (pinjam/bersama/chat/Chrome).
// Dimensi dikembalikan ke screenshot 2000 x 1228; filter invert dan kamera adegan pinjaman dilepas.
export const AppClaudeTerang: React.FC<AppClaudeTerangProps> = ({lampiran, ketik, kirimPada}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const huruf = Array.from(ketik.teks);
  const jumlah = Math.max(0, Math.min(huruf.length, Math.floor((frame - ketik.mulai) * Math.max(0, ketik.cps) / fps)));
  const isi = huruf.slice(0, jumlah).join('');
  const caret = frame >= ketik.mulai && Math.floor((frame - ketik.mulai) / Math.max(1, Math.round(fps / 2))) % 2 === 0;
  const tertekan = kirimPada !== undefined && frame >= kirimPada && frame < kirimPada + 3;
  const tekan = tertekan ? move(frame, kirimPada!, 1, 'land') : 0;
  return <div style={{width: '100%', height: '100%', background: C.kertas}}>
    <FontsUI aplikasi="claude"/>
    <BidangUI lebar={2000} tinggi={1228} nama="Claude desktop tema terang">
      <div data-app-claude style={{...at(0, 0, 2000, 1228), fontFamily: FONT_UI.claude, fontSize: 21, lineHeight: 1.45, fontWeight: 400, color: C.tinta, background: C.kertas}}>
        <div style={{...at(0, 0, 406, 1228), background: C.sidebar, borderRight: `1px solid ${C.garis}`, boxSizing: 'border-box'}}/>
        <div style={{...at(0, 0, 2000, 61), borderBottom: `1px solid ${C.garis}`, boxSizing: 'border-box'}}/>
        <div style={{...at(405, 0, 1, 61), background: C.garis}}/>
        <div style={{...at(15, 20), ...flex, gap: 12}}>{[C.merahMac, C.kuningMac, C.hijauMac].map((c) => <span key={c} style={{display: 'block', width: 17, height: 17, borderRadius: '50%', background: c, border: '1px solid rgba(0,0,0,.09)'}}/>)}</div>
        <IkonDi nama="sidebar" x={117} y={16} size={27}/><IkonDi nama="kiri" x={162} y={17} size={23}/><IkonDi nama="kanan" x={201} y={17} size={23} redup/>
        <div style={{...at(292, 7, 101, 42), ...flex, borderRadius: 12, background: C.tombol}}>
          <div style={{...flex, justifyContent: 'center', width: 50}}><IkonClaude nama="chat" size={26}/></div>
          <div style={{...flex, justifyContent: 'center', width: 49, height: 40, border: `1px solid ${C.garis}`, borderRadius: 11, background: C.sidebar}}><IkonClaude nama="code" size={24}/></div>
        </div>
        <div style={{...at(435, 13), ...flex, gap: 19}}>Edit video reel<IkonClaude nama="bawah" size={19}/></div>
        <div style={{...at(1588, 7, 41, 42), borderRadius: 12, background: C.tombol}}/>
        <IkonDi nama="list" x={1597} y={17}/><IkonDi nama="terminal" x={1643} y={18} size={22}/>
        <IkonDi nama="baru" x={1690} y={17} size={23}/><IkonDi nama="globe" x={1736} y={16}/>
        <IkonDi nama="folder" x={1782} y={16} size={25}/><IkonDi nama="more" x={1830} y={16} size={24}/>
        <div style={{...at(1873, 16, 1, 23), background: C.garisLembut}}/>
        <div style={{...at(1897, 15), ...flex, gap: 10}}><IkonClaude nama="share" size={24}/>Share</div>

        <div data-claude-sessions style={{...at(0, 61, 405, 1115), overflow: 'hidden'}}>
          {SESI.slice(0, -1).map((s, i) => <div key={s} style={{...at(0, 6 + i * 49.3, 394, 46), ...flex, borderRadius: 12, background: i === 0 ? C.pilihan : undefined, boxSizing: 'border-box', padding: '0 15px', whiteSpace: 'nowrap', overflow: 'hidden'}}>
            {s}{i === 0 && <span style={{marginLeft: 'auto'}}><IkonClaude nama="more" size={23}/></span>}
          </div>)}
          <div style={{...at(15, 1028, 360, 80), background: C.sidebar}}/>
          <div style={{...at(15, 1028), ...flex, gap: 10, color: C.redup, fontSize: 18}}>This computer<IkonClaude nama="bawah" size={16}/></div>
          <div style={{...at(15, 1074), fontSize: 21}}>{SESI[SESI.length - 1]}</div>
        </div>
        <div style={{...at(0, 1176, 405, 52), ...flex, gap: 12, padding: '0 13px', boxSizing: 'border-box', borderTop: `1px solid ${C.garis}`, fontSize: 20}}>
          <span style={{...flex, justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', background: C.status, color: C.tinta, fontSize: 14}}>B</span>
          <span>Behindwork</span><IkonClaude nama="bawah" size={15}/>
          <span style={{marginLeft: 'auto', paddingRight: 10}}><IkonClaude nama="gear" size={24}/></span>
        </div>

        <div data-claude-chat style={{...at(406, 61, 1138, 850), overflow: 'hidden'}}/>
        <div data-claude-composer style={{...at(451, 912, 1046, 272), borderRadius: 22, border: `1.5px solid ${C.garis}`, boxSizing: 'border-box', background: C.kertas, boxShadow: C.bayangan}}>
          {lampiran && <div data-claude-attachment style={{...at(24, 20, 224, 78), ...flex, gap: 12, padding: 10, boxSizing: 'border-box', borderRadius: 14, border: `1px solid ${C.garisLembut}`}}>
            <div style={{...flex, justifyContent: 'center', width: 56, height: 56, borderRadius: 9, background: C.tombol}}><IkonClaude nama="play" size={27}/></div>
            <div style={{minWidth: 0, lineHeight: 1.25}}><div style={{fontSize: 20, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{lampiran.nama}</div><div style={{fontSize: 17, color: C.redup}}>Video</div></div>
          </div>}
          <div data-claude-typed data-count={jumlah} style={{...at(26, lampiran ? 118 : 24, 965), minHeight: 64, fontSize: 23, lineHeight: 1.5, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere'}}>{isi}<span data-claude-caret style={{display: 'inline-block', width: 2, height: 27, background: C.tinta, verticalAlign: 'text-bottom', marginLeft: 1, visibility: caret ? 'visible' : 'hidden'}}/></div>
          <IkonDi nama="plus" x={21} y={225} size={24}/>
          <div data-claude-send data-pressed={tertekan} style={{...at(937, 217, 44, 40), ...flex, justifyContent: 'center', borderRadius: 8, background: tertekan ? C.pilihan : undefined, transform: `scale(${tertekan ? .94 - .03 * tekan : 1})`}}><IkonClaude nama="enter" size={26}/></div>
          <IkonDi nama="mic" x={1000} y={225} size={25}/>
        </div>
        <div style={{...at(1235, 1198), ...flex, gap: 11, fontSize: 20}}><span>Opus 5.5</span><span style={{color: C.redup}}>High</span><span>·</span><span>Auto</span><svg width="23" height="23" viewBox="0 0 24 24" style={{marginLeft: 12}}><circle cx="12" cy="12" r="9" fill="none" stroke={C.garis} strokeWidth="2.5"/><path d="M12 3a9 9 0 1 1-8 5" fill="none" stroke={C.status} strokeWidth="2.5"/></svg></div>

        <aside style={{...at(1543, 61, 457, 1167), borderLeft: `1px solid ${C.garis}`, boxSizing: 'border-box', fontSize: 20}}>
          <div style={{...at(23, 21), fontSize: 19}}>Environment</div>
          <div style={{...at(26, 68), ...flex, gap: 19}}><IkonClaude nama="monitor" size={25} warna={C.redup}/><span>Local · MacBook Pro</span></div>
          <span style={{...at(340, 68), color: C.tautan, borderBottom: `1px solid ${C.tautan}`, fontSize: 19}}>Learn more</span>
          <div style={{...at(23, 116, 416, 1), background: C.garisLembut}}/>
          <div style={{...at(23, 139), ...flex, gap: 9, fontSize: 19}}>Context<IkonClaude nama="kanan" size={14} warna={C.redup}/></div>
          <div style={{...at(355, 138), ...flex, gap: 9, color: C.redup, fontSize: 19}}>41%<span style={{width: 35, height: 14, borderRadius: 9, background: C.konteks, padding: 3, boxSizing: 'border-box'}}><span style={{display: 'block', width: 13, height: 8, borderRadius: 6, background: C.biru}}/></span></div>
          <div style={{...at(23, 186, 416, 1), background: C.garisLembut}}/>
          <div style={{...at(23, 207), fontSize: 19}}>Outputs</div>
          {(['video.mp4', 'edit-plan.md', 'timeline.json'] as const).map((s, i) => <div key={s} style={{...at(27, 253 + i * 47), ...flex, gap: 19}}><IkonClaude nama={i === 0 ? 'image' : 'file'} size={25} warna={C.redup}/>{s}</div>)}
          <div style={{...at(23, 394, 416, 1), background: C.garisLembut}}/>
          <div style={{...at(23, 418), fontSize: 19}}>Background tasks</div>
          <div style={{...at(27, 463), ...flex, gap: 19}}><IkonClaude nama="tugas" size={24} warna={C.redup}/>Render preview</div>
          <span style={{...at(372, 463), fontSize: 18, color: C.redup}}>2m</span><span aria-label="Running" style={{...at(421, 470, 14, 14), borderRadius: 3, background: C.tinta}}/>
        </aside>
      </div>
    </BidangUI>
  </div>;
};
