import React from 'react';
import {useVideoConfig} from 'remotion';
import {BidangUI} from '../BidangUI';
import {FONT_UI, FontsUI} from '../FontsUI';

export type TrackStudio = {nama: string; mulai: number; durasi: number; warna?: 'seq' | 'audio'};
export type StudioRemotionProps = {komposisi: string[]; aktif: string; track: TrackStudio[]; playhead: number; preview: React.ReactNode};

const C = {
  latar: '#1F2428', timeline: '#111111', tab: '#2F363D', pilihan: '#404548',
  teks: '#FFFFFF', redup: '#A6A7A9', pemisah: '#000000', seq: '#0B84F3',
  playhead: '#F02C00', garis: '#363A3E', border: 'rgba(0,0,0,.3)',
  tick: 'rgba(255,255,255,.15)', audio: 'linear-gradient(rgb(16 171 58), rgb(43 165 63) 60%)',
  gelombang: 'rgba(0,0,0,.5)',
};
// Kotak CSS @1x dari REPORT-studio-acuan-r1; tidak diambil dari perkiraan rasio panel.
export const STUDIO = {w: 1920, h: 1080, menu: 36.5, kiri: 383.40625, previewX: 386.40625, previewW: 1071.421875, kananX: 1460.828125, panelH: 724.375, kontrolY: 760.875, timelineY: 819.875, header: 39, baris: 26, padding: 16};
const areaTrack = STUDIO.w - STUDIO.previewX;
const bentang = areaTrack - STUDIO.padding * 2;
export const posisiPlayheadStudio = (frame: number, durasi: number) => STUDIO.previewX + STUDIO.padding + Math.max(0, Math.min(durasi - 1, frame)) / Math.max(1, durasi - 1) * bentang;
const at = (left: number, top: number, width?: number, height?: number): React.CSSProperties => ({position: 'absolute', left, top, width, height});
const flex: React.CSSProperties = {display: 'flex', alignItems: 'center'};
const timecode = (f: number, fps: number) => `${String(Math.floor(f / fps / 60)).padStart(2, '0')}:${String(Math.floor(f / fps) % 60).padStart(2, '0')}.${String(f % fps).padStart(2, '0')}`;

type Icon = 'film' | 'play' | 'back' | 'start' | 'end' | 'step' | 'loop' | 'volume' | 'in' | 'out' | 'fit' | 'layout' | 'eye' | 'audio' | 'link' | 'render';
const Ikon: React.FC<{nama: Icon; size?: number; color?: string}> = ({nama, size = 18, color = C.teks}) => {
  // Siluet play dan film dipindah dari ikon paket @remotion/studio 4.0.380.
  if (nama === 'play') return <svg width={size} height={size} viewBox="0 0 448 512" fill={color}><path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"/></svg>;
  if (nama === 'film') return <svg width={size} height={size} viewBox="0 0 512 512" fill={color}><path d="M448 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64V96C512 60.65 483.3 32 448 32zM384 64v176H128V64H384zM32 96c0-17.64 14.36-32 32-32h32v80H32V96zM32 176h64v64H32V176zM32 272h64v64H32V272zM64 448c-17.64 0-32-14.36-32-32v-48h64V448H64zM128 448V272h256V448H128zM480 416c0 17.64-14.36 32-32 32h-32v-80h64V416zM480 336h-64v-64h64V336zM480 240h-64v-64h64V240zM480 144h-64V64h32c17.64 0 32 14.36 32 32V144z"/></svg>;
  const isi: Record<Exclude<Icon, 'film' | 'play'>, React.ReactNode> = {
    back: <><path d="M5 4v16M20 4 7 12l13 8Z" fill={color}/></>,
    step: <><path d="M19 4v16M4 4l13 8-13 8Z" fill={color}/></>,
    start: <><path d="M3 4v16m9-16-8 8 8 8Zm9 0-8 8 8 8Z" fill={color}/></>,
    end: <><path d="M21 4v16M12 4l8 8-8 8ZM3 4l8 8-8 8Z" fill={color}/></>,
    loop: <path d="M18 4v5h-5m5-1H7a5 5 0 0 0-4 7m3 5v-5h5m-5 1h11a5 5 0 0 0 4-7"/>,
    volume: <><path d="M3 9h4l5-5v16l-5-5H3Z" fill={color}/><path d="M16 7a7 7 0 0 1 0 10m3-13a11 11 0 0 1 0 16"/></>,
    in: <path d="M15 4H9v16h6"/>, out: <path d="M9 4h6v16H9"/>,
    fit: <path d="M3 9V3h6m6 0h6v6m0 6v6h-6M9 21H3v-6"/>,
    layout: <><rect x="3" y="3" width="18" height="18"/><path d="M3 10h18M10 10v11"/></>,
    eye: <><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/><circle cx="12" cy="12" r="3" fill={color}/></>,
    audio: <><path d="M3 9h4l5-5v16l-5-5H3Z"/><path d="M17 7a7 7 0 0 1 0 10"/></>,
    link: <><path d="M13 3h8v8m0-8L10 14M10 5H3v16h16v-7"/></>,
    render: <><path d="M8 15c0-6 7-12 14-13 0 7-4 14-11 15l-5-5m4-3H4l-3 5h6m9 1v6l-5 2v-6M6 18l-4 4m4-7-5 5" fill={color}/><circle cx="16" cy="8" r="2" stroke={C.tab} fill={C.tab}/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round" style={{display: 'block'}}>{isi[nama]}</svg>;
};

// Gelombang pinjam/b1::Gelombang, dipadatkan ke tinggi track audio Studio. Tanpa sumber audio pada kontrak props.
const Gelombang: React.FC<{w: number; tinggi: number}> = ({w, tinggi}) => <svg width={w} height={tinggi} viewBox={`0 0 ${w} ${tinggi}`} style={{display: 'block'}}>
  {Array.from({length: Math.floor(w / 3)}, (_, i) => {
    const h = 2 + (tinggi - 4) * Math.abs(Math.sin(i * .9) * Math.cos(i * .31 + 1));
    return <rect key={i} x={i * 3 + 1} y={(tinggi - h) / 2} width={1} height={h} fill={C.gelombang}/>;
  })}
</svg>;

export const StudioRemotion: React.FC<StudioRemotionProps> = ({komposisi, aktif, track, playhead, preview}) => {
  const {fps} = useVideoConfig();
  const durasi = Math.max(1, ...track.map((t) => t.mulai + Math.max(0, t.durasi)));
  const frame = Math.round(Math.max(0, Math.min(durasi - 1, playhead)));
  const step = bentang / Math.max(1, durasi - 1);
  const px = posisiPlayheadStudio(frame, durasi);
  const panelR = STUDIO.w - STUDIO.kananX;
  const tombol: React.CSSProperties = {...flex, height: 38, padding: '0 10px', background: C.tab, border: `1px solid ${C.border}`, boxSizing: 'border-box', borderRadius: 3};
  return <div style={{width: '100%', height: '100%', background: C.latar}}>
    <FontsUI aplikasi="studio"/>
    <BidangUI lebar={1920} tinggi={1080} nama="Remotion Studio, tampilan Mac">
      <div data-studio style={{...at(0, 0, 1920, 1080), background: C.latar, color: C.teks, fontFamily: FONT_UI.studio, fontSize: 13, fontWeight: 400, lineHeight: 1.5}}>
        <div style={{...at(0, 0, 1920, 36.5), borderBottom: `1px solid ${C.pemisah}`, boxSizing: 'border-box'}}>
          <div style={{...at(18, 10), transform: 'rotate(4deg)'}}><Ikon nama="play" size={12}/></div>
          <div style={{...at(52, 6), ...flex, gap: 23}}>{['File', 'View', 'Tools', 'Packages', 'Help'].map((s) => <span key={s}>{s}</span>)}<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={C.teks} strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 18V6m-4 4 4-4 4 4"/></svg></div>
          <div style={{...at(934, 6), ...flex, gap: 7, color: C.redup}}>remotion<Ikon nama="link" size={12} color={C.redup}/></div>
          {[1858, 1882].map((x, i) => <svg key={x} width="17" height="18" viewBox="0 0 24 24" style={at(x, 9)}><rect x="2" y="3" width="20" height="18" rx="2" stroke={C.redup} strokeWidth="1.8" fill="none"/><rect x={i ? 13 : 3} y="4" width="8" height="16" fill={C.redup}/></svg>)}
        </div>
        <div style={{...at(STUDIO.kiri, STUDIO.menu, 3, STUDIO.panelH), background: C.pemisah}}/>
        <div style={{...at(STUDIO.kananX - 3, STUDIO.menu, 3, STUDIO.panelH), background: C.pemisah}}/>
        <div data-studio-compositions style={at(0, STUDIO.menu, STUDIO.kiri, STUDIO.panelH)}>
          <div style={{...at(0, 0, STUDIO.kiri / 2, 40), ...flex, paddingLeft: 16, borderTop: `2px solid ${C.seq}`, boxSizing: 'border-box', fontSize: 14}}>Compositions</div>
          <div style={{...at(STUDIO.kiri / 2, 0, STUDIO.kiri / 2, 40), ...flex, paddingLeft: 16, boxSizing: 'border-box', background: C.tab, color: C.redup, fontSize: 14}}>Assets</div>
          <div style={{...at(12, 51, 350, 68), fontSize: 12}}><div style={{fontWeight: 700}}>{aktif}</div><div style={{color: C.redup}}>1920x1080, {fps} FPS<br/>Duration {timecode(durasi, fps)}</div></div>
          <div style={{...at(0, 119, STUDIO.kiri, 1), background: C.border}}/>
          {komposisi.map((s, i) => <div data-studio-composition={s} key={`${s}-${i}`} style={{...at(0, 120 + i * 33, STUDIO.kiri, 32), ...flex, gap: 8, paddingLeft: 12, boxSizing: 'border-box', background: s === aktif ? C.pilihan : undefined, color: s === aktif ? C.teks : C.redup}}><Ikon nama="film" size={18} color={s === aktif ? C.teks : C.redup}/>{s}</div>)}
        </div>
        <div data-studio-preview style={{...at(STUDIO.previewX, STUDIO.menu + (STUDIO.panelH - STUDIO.previewW * 1080 / 1920) / 2, STUDIO.previewW, STUDIO.previewW * 1080 / 1920), overflow: 'hidden'}}>
          <div style={{...at(0, 0, 1920, 1080), transform: `scale(${STUDIO.previewW / 1920})`, transformOrigin: '0 0'}}>{preview}</div>
        </div>
        <div data-studio-props style={at(STUDIO.kananX, STUDIO.menu, panelR, STUDIO.panelH)}>
          <div style={{...at(0, 0, panelR / 2, 40), ...flex, paddingLeft: 16, borderTop: `2px solid ${C.seq}`, boxSizing: 'border-box', fontSize: 14}}>Props</div>
          <div style={{...at(panelR / 2, 0, panelR / 2, 40), ...flex, paddingLeft: 16, background: C.tab, boxSizing: 'border-box', color: C.redup, fontSize: 14}}>Renders</div>
          <div style={{...at(14, 328, panelR - 28), textAlign: 'center', fontSize: 14, color: C.redup}}>Make the props of this composition interactively editable by<br/>adding a <span style={{color: C.seq}}>schema</span> prop to the <span style={{color: C.seq}}>&lt;Composition&gt;</span> component.</div>
          <div style={{...tombol, ...at((panelR - 107) / 2, 388.5, 107, 45), justifyContent: 'center', fontSize: 14}}>Learn how</div>
        </div>
        <div data-studio-controls style={{...at(0, STUDIO.kontrolY, 1920, 56), borderTop: `1px solid ${C.border}`, boxSizing: 'border-box'}}>
          <span style={{...at(21, 8), fontSize: 24, color: C.redup}}>−</span><div style={{...at(55, 24, 92, 6), background: C.garis, borderRadius: 4}}/><div style={{...at(48, 20, 15, 15), background: C.teks, borderRadius: '50%'}}/><span style={{...at(159, 9), fontSize: 24}}>+</span>
          {[['Fit', 694], ['1x', 786]].map(([text, x]) => <div key={text} style={{...at(Number(x), 9, 80, 38), ...tombol, justifyContent: 'space-between', fontSize: 16}}>{text}<svg width="10" height="7" viewBox="0 0 10 7"><path d="m0 0 5 6 5-6" fill={C.teks}/></svg></div>)}
          {(['start', 'back', 'play', 'step', 'loop', 'volume', 'in', 'out', 'layout', 'fit'] as const).map((nama, i) => <div key={nama} style={at([894, 924, 953, 979, 1023, 1056, 1108, 1136, 1173, 1211][i], 20)}><Ikon nama={nama} size={16} color={nama === 'loop' || nama === 'layout' ? C.seq : C.teks}/></div>)}
          <div style={{...at(1807, 9, 101, 38), ...tombol, gap: 8, fontSize: 14}}><Ikon nama="render" size={17}/>Render</div>
        </div>
        <div style={{...at(0, STUDIO.timelineY - 3, 1920, 3), background: C.pemisah}}/>
        <div data-studio-timeline style={{...at(0, STUDIO.timelineY, 1920, 1080 - STUDIO.timelineY), overflow: 'hidden'}}>
          <div style={{...at(STUDIO.previewX, 0, areaTrack, 1080 - STUDIO.timelineY), background: C.timeline}}/>
          <div style={{...at(STUDIO.kiri, 0, 3, 1080), background: C.pemisah}}/>
          <div style={{...at(10, 7), fontSize: 16, fontVariantNumeric: 'tabular-nums'}}>{timecode(frame, fps)}</div>
          <span style={{...at(STUDIO.kiri - 28, 9), color: C.seq, fontSize: 12, borderBottom: `1px dotted ${C.seq}`}}>{frame}</span>
          {Array.from({length: Math.ceil(durasi / Math.max(1, Math.ceil(5 / step)))}, (_, index) => {
            const i = index * Math.max(1, Math.ceil(5 / step));
            const seconde = i % fps === 0 && i < Math.floor(durasi / fps) * fps;
            return <div key={i} style={{...at(STUDIO.previewX + STUDIO.padding + step * i, 0, 1, seconde ? 15 : i % fps === 0 ? 10 : i % 2 ? 2 : 5), background: C.tick}}>{seconde && i > 0 && <span style={{...at(8, 7), fontSize: 12, color: C.redup, whiteSpace: 'nowrap'}}>{timecode(i, fps)}</span>}</div>;
          })}
          {track.map((t, i) => {
            const start = Math.max(0, t.mulai);
            const end = Math.min(durasi, t.mulai + t.durasi);
            const audio = t.warna === 'audio';
            const width = Math.max(0, (end - start) / durasi * bentang);
            const top = STUDIO.header + i * STUDIO.baris;
            return <React.Fragment key={`${i}-${t.nama}`}>
              <div style={{...at(0, top, STUDIO.kiri, STUDIO.baris), ...flex, gap: 7, paddingLeft: 7, boxSizing: 'border-box', borderBottom: `1px solid ${C.border}`, fontSize: 12}}><Ikon nama={audio ? 'audio' : 'eye'} size={13} color={C.redup}/>{t.nama}</div>
              {width > 0 && <div data-studio-track={i} data-kind={audio ? 'audio' : 'seq'} style={{...at(STUDIO.previewX + STUDIO.padding + start / durasi * bentang, top, width, 25), borderRadius: 2, background: audio ? C.audio : C.seq, border: `1px solid rgba(255,255,255,.12)`, boxSizing: 'border-box', overflow: 'hidden'}}>
                {audio ? <Gelombang w={width} tinggi={23}/> : <span style={{...at(6, 2), fontSize: 12, color: C.redup}}>{Math.max(0, frame - t.mulai)}</span>}
              </div>}
            </React.Fragment>;
          })}
          <div data-studio-playhead data-frame={frame} style={{...at(px, 0, 1, 1080 - STUDIO.timelineY), background: C.playhead}}>
            <svg width="17" height="23" viewBox="0 0 159 212" style={at(-8, 0)}><path d="M17.0234375,1.07763419 L143.355469,1.07763419 C151.63974,1.07763419 158.355469,7.79336295 158.355469,16.0776342 L158.355469,69.390507 C158.355469,73.7938677 156.420655,77.9748242 153.064021,80.8248415 L89.3980057,134.881757 C83.7986799,139.635978 75.5802263,139.635978 69.9809005,134.881757 L6.66764807,81.1243622 C3.0872392,78.0843437 1.0234375,73.6246568 1.0234375,68.9277387 L1.0234375,17.0776342 C1.0234375,8.2410782 8.1868815,1.07763419 17.0234375,1.07763419 Z" fill={C.playhead}/></svg>
          </div>
        </div>
      </div>
    </BidangUI>
  </div>;
};
