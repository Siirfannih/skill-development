// YouTube desktop, halaman hasil pencarian, terang. Tata letak diukur dari screenshot asli 1600×1000
// (qc/ref_youtube_results.png, diambil headless Chromium 12 Nov 2026). Data hasil = pencarian nyata
// (assets/yt/search_uang_ai.txt → src/data/yt_search.json). Logo: simple-icons YouTube.
import React from 'react';
import { Img, staticFile } from 'remotion';
import { Menu, Search, Mic, X, EllipsisVertical, CircleUserRound, Home, SquarePlay, History, Clapperboard, ListVideo, Music2, Film, Gamepad2, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { FONT } from '../engine/theme';
import { Logo } from '../engine/Logo';
import RESULTS from '../data/yt_search.json';

export const YT_W = 1600;
export const YT_H = 1000;
export type YtResult = { id: string; title: string; channel: string; views: string; dur: string; age: string | null };
/** hasil yang ditampilkan berurutan (hanya yang usia unggahnya terbaca di halaman asli) */
export const YT_LIST: YtResult[] = (RESULTS as YtResult[]).filter((r) => r.age);
/** posisi kartu hasil ke-i (px desain, sebelum scroll) */
export const ytThumb = (i: number) => ({ x: 295, y: 112 + i * 297, w: 500, h: 281 });

const ink = '#0F0F0F';
const sub = '#606060';
const AV = ['#7B5E57', '#C06C84', '#6C5B7B', '#355C7D', '#2A9D8F', '#E76F51', '#8D99AE'];

const Side: React.FC<{ icon: React.ReactNode; label: string; bold?: boolean }> = ({ icon, label, bold }) => (
  <div style={{ height: 40, display: 'flex', alignItems: 'center', gap: 24, padding: '0 24px', fontSize: 14, fontWeight: bold ? 500 : 400, color: ink }}>
    {icon}
    {label}
  </div>
);

export const YouTubeResults: React.FC<{ scroll?: number; hover?: number; hoverP?: number }> = ({ scroll = 0, hover = -1, hoverP = 0 }) => {
  const ic = { size: 22, strokeWidth: 1.6, color: ink };
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: YT_W, height: YT_H, background: '#FFFFFF', fontFamily: FONT.inter, color: ink, overflow: 'hidden' }}>
      {/* hasil (bergulir) */}
      <div style={{ position: 'absolute', left: 0, top: -scroll, width: YT_W }}>
        {YT_LIST.map((r, i) => {
          const t = ytThumb(i);
          const hv = i === hover ? hoverP : 0;
          return (
            <React.Fragment key={r.id}>
              <div
                style={{
                  position: 'absolute', left: t.x, top: t.y, width: t.w, height: t.h, borderRadius: hv > 0 ? 0 : 12, overflow: 'hidden',
                  transform: `scale(${1 + 0.03 * hv})`, transformOrigin: 'center', boxShadow: hv > 0 ? `0 ${12 * hv}px ${30 * hv}px rgba(0,0,0,${0.18 * hv})` : undefined,
                }}
              >
                <Img src={staticFile(`yt/${r.id}.jpg`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', right: 8, bottom: 8, background: 'rgba(0,0,0,0.8)', color: '#FFF', fontSize: 12, fontWeight: 500, padding: '2px 5px', borderRadius: 4 }}>{r.dur}</div>
                {hv > 0 ? (
                  <>
                    <div style={{ position: 'absolute', left: 0, bottom: 0, height: 4, width: `${60 * hv}%`, background: '#FF0033' }} />
                    <div style={{ position: 'absolute', left: 10, bottom: 12, background: 'rgba(0,0,0,0.7)', color: '#FFF', fontSize: 12, padding: '3px 7px', borderRadius: 4, opacity: hv }}>Keep hovering to play</div>
                  </>
                ) : null}
              </div>
              <div style={{ position: 'absolute', left: 811, top: t.y + 2, width: 700 }}>
                <div style={{ fontSize: 18, lineHeight: '26px', fontWeight: 400, maxHeight: 52, overflow: 'hidden' }}>{r.title}</div>
                <div style={{ fontSize: 12, color: sub, marginTop: 4 }}>{r.views} views • {r.age}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, fontSize: 12, color: sub }}>
                  <div style={{ width: 24, height: 24, borderRadius: 12, background: AV[i % AV.length], color: '#FFF', fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {r.channel.slice(0, 1)}
                  </div>
                  {r.channel}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      {/* chip filter */}
      <div style={{ position: 'absolute', left: 240, top: 56, right: 0, height: 56, background: '#FFF', display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 55 }}>
        {['All', 'Shorts', 'Unwatched', 'Videos', 'Recently uploaded', 'Live'].map((c, k) => (
          <div key={c} style={{ height: 32, padding: '0 12px', borderRadius: 8, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 500, background: k === 0 ? ink : '#F2F2F2', color: k === 0 ? '#FFF' : ink }}>{c}</div>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 500, marginRight: 72 }}>Filters <SlidersHorizontal size={20} strokeWidth={1.6} /></div>
      </div>
      {/* sidebar */}
      <div style={{ position: 'absolute', left: 0, top: 56, width: 240, bottom: 0, background: '#FFF' }}>
        <div style={{ height: 12 }} />
        <Side icon={<Home {...ic} />} label="Home" />
        <Side icon={<Clapperboard {...ic} />} label="Shorts" />
        <Side icon={<SquarePlay {...ic} />} label="Subscriptions" />
        <Side icon={<CircleUserRound {...ic} />} label="You" />
        <Side icon={<History {...ic} />} label="History" />
        <div style={{ height: 1, background: '#E5E5E5', margin: '12px 0' }} />
        <div style={{ padding: '6px 32px', fontSize: 14, lineHeight: '20px' }}>Sign in to like videos, comment, and subscribe.</div>
        <div style={{ margin: '8px 32px', width: 104, height: 36, borderRadius: 18, border: '1px solid #E5E5E5', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#065FD4', fontSize: 14, fontWeight: 500 }}>
          <CircleUserRound size={22} strokeWidth={1.6} color="#065FD4" /> Sign in
        </div>
        <div style={{ height: 1, background: '#E5E5E5', margin: '14px 0' }} />
        <div style={{ padding: '4px 24px 8px', fontSize: 16, fontWeight: 600 }}>Explore</div>
        <Side icon={<Music2 {...ic} />} label="Music" />
        <Side icon={<Film {...ic} />} label="Movies" />
        <Side icon={<Gamepad2 {...ic} />} label="Gaming" />
        <Side icon={<ChevronDown {...ic} />} label="Show more" />
        <div style={{ height: 1, background: '#E5E5E5', margin: '14px 0' }} />
        <div style={{ padding: '4px 24px 8px', fontSize: 16, fontWeight: 600 }}>More from YouTube</div>
        <Side icon={<Logo name="youtube" size={22} />} label="YouTube Premium" />
        <Side icon={<ListVideo {...ic} />} label="YouTube Music" />
      </div>
      {/* kepala */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: YT_W, height: 56, background: '#FFF', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 72, display: 'flex', justifyContent: 'center' }}><Menu size={24} strokeWidth={1.6} color={ink} /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, position: 'relative' }}>
          <Logo name="youtube" size={30} />
          <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: '-0.06em', fontFamily: FONT.inter }}>YouTube</span>
          <span style={{ position: 'absolute', right: -16, top: -6, fontSize: 10, color: sub }}>ID</span>
        </div>
        <div style={{ position: 'absolute', left: 483, top: 8, width: 598, height: 40, display: 'flex' }}>
          <div style={{ flex: 1, border: '1px solid #C6C6C6', borderRadius: '20px 0 0 20px', display: 'flex', alignItems: 'center', padding: '0 12px 0 16px', fontSize: 16 }}>
            <span style={{ flex: 1 }}>cara dapat uang dari AI 2026</span>
            <X size={22} strokeWidth={1.5} color={ink} />
          </div>
          <div style={{ width: 62, border: '1px solid #C6C6C6', borderLeft: 'none', borderRadius: '0 20px 20px 0', background: '#F8F8F8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Search size={22} strokeWidth={1.6} color={ink} />
          </div>
        </div>
        <div style={{ position: 'absolute', left: 1098, top: 8, width: 40, height: 40, borderRadius: 20, background: '#F2F2F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Mic size={20} strokeWidth={1.6} color={ink} />
        </div>
        <div style={{ position: 'absolute', left: 1438, top: 16 }}><EllipsisVertical size={22} strokeWidth={1.6} color={ink} /></div>
        <div style={{ position: 'absolute', left: 1480, top: 9, height: 36, padding: '0 14px 0 8px', borderRadius: 18, border: '1px solid #E5E5E5', display: 'flex', alignItems: 'center', gap: 6, color: '#065FD4', fontSize: 14, fontWeight: 500 }}>
          <CircleUserRound size={22} strokeWidth={1.6} color="#065FD4" /> Sign in
        </div>
      </div>
    </div>
  );
};
