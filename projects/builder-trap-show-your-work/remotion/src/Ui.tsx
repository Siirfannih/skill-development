import React from 'react';
import { AbsoluteFill, Img, staticFile, interpolate, Easing, random } from 'remotion';
import { Agent, AgentId } from './Agents';

// Real-platform UIs rebuilt in code (Irfan 11 Nov: no screenshots; animate like a screen recording).
const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };
const lin = (t: number, a: number, b: number, v0: number, v1: number, e = Easing.linear) => interpolate(t, [a, b], [v0, v1], { ...clamp, easing: e });
export const Ico: React.FC<{ d: string; s?: number; c?: string; w?: number; fill?: string }> = ({ d, s = 22, c = '#000', w = 1.9, fill = 'none' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={fill} stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const MASK = (name: string, size: number, color: string) => (
  <div style={{ width: size, height: size, backgroundColor: color, WebkitMaskImage: `url(${staticFile(`logos/${name}.svg`)})`, WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }} />
);
export const Avatar: React.FC<{ s: number; face?: boolean; seed?: string }> = ({ s, face, seed = 'a' }) => face
  ? <Img src={staticFile('shots/face_end.jpg')} style={{ width: s, height: s, borderRadius: s / 2, objectFit: 'cover', objectPosition: '53% 30%', flexShrink: 0 }} />
  : <div style={{ width: s, height: s, borderRadius: s / 2, flexShrink: 0, background: `hsl(${Math.floor(random(seed) * 360)}, 18%, ${70 + random(seed + 'l') * 15}%)` }} />;

const IC = {
  home: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z', plus: 'M12 5v14M5 12h14', search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
  msg: 'M22 2L11 13M22 2l-7 20-4-9-9-4z', heart: 'M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z', user: 'M20 21a8 8 0 0 0-16 0M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  chart: 'M4 20V10M10 20V4M16 20v-8M22 20H2', bookmark: 'M6 3h12v18l-6-4-6 4z', lock: 'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4', comment: 'M21 12a8 8 0 0 1-12 7l-5 1 1-5a8 8 0 1 1 16-3z',
  repost: 'M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3', share: 'M22 2L11 13M22 2l-7 20-4-9-9-4z', dots: 'M5 12h.01M12 12h.01M19 12h.01',
  smile: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01', img: 'M4 5h16v14H4zM4 15l4-4 4 4 3-3 5 5', doc: 'M6 2h9l5 5v15H6zM14 2v6h6M9 13h6M9 17h6', pin: 'M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  opts: 'M4 4h16v16H4zM9 9v6M15 9v6M7 12h4M13 12h4', drafts: 'M6 2h9l5 5v15H6zM14 2v6h6M9 16l2 2 4-4',
};

// ===================== Threads (web, light) =====================
export type ThreadPostData = { user: string; tag?: string; time: string; text: string; media?: number; face?: boolean; mediaEl?: React.ReactNode };
const SIDE = [['For you', IC.home], ['New thread', IC.plus], ['Search', IC.search], ['', ''], ['Messages', IC.msg], ['Activity', IC.heart], ['Profile', IC.user], ['Insights', IC.chart]];
const FEEDS = ['Following', 'Saved', 'Liked', 'Ghost posts', 'Archive'];
const SUGG: [string, string, string][] = [['why.u9', 'Software Engineer', 'Tech satirist'], ['dsign.so', 'dsign.so', 'On-brand social posts in seconds.'], ['studio.rupa', 'Design Agency', 'Web & product design for SaaS.'], ['iqbal.dev', 'Iqbal', 'Irregularity is beauty.'], ['jordan.m', 'Jordan', 'Remote worker, software engineer.']];
export const ThreadPost: React.FC<{ p: ThreadPostData; font: string; appear?: number }> = ({ p, font, appear = 1 }) => (
  <div style={{ display: 'flex', gap: 14, padding: '18px 26px', borderBottom: '1px solid #EFEFEF', opacity: appear, transform: `translateY(${(1 - appear) * -30}px)` }}>
    <Avatar s={40} face={p.face} seed={p.user} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 17 }}>
        <span style={{ fontWeight: 600 }}>{p.user}</span>
        {p.tag && <><span style={{ color: '#999' }}>›</span><span style={{ color: '#0095F6', fontWeight: 600 }}>{p.tag}</span></>}
        <span style={{ color: '#999' }}>{p.time}</span><span style={{ marginLeft: 'auto', color: '#999' }}>···</span>
      </div>
      <div style={{ fontSize: 17, lineHeight: 1.4, margin: '4px 0 12px' }}>{p.text}</div>
      {p.mediaEl ? <div style={{ width: 420, height: 210, borderRadius: 12, overflow: 'hidden', border: '1px solid #EFEFEF', marginBottom: 12 }}>{p.mediaEl}</div>
        : p.media ? <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>{Array.from({ length: p.media }).map((_, i) => <div key={i} style={{ width: 290, height: 200, borderRadius: 12, background: i % 2 ? '#2A2D33' : '#E9EBEF' }} />)}</div> : null}
      <div style={{ display: 'flex', gap: 28, color: '#444', fontSize: 15, alignItems: 'center' }}>
        {[[IC.heart, '66'], [IC.comment, '11'], [IC.repost, '6'], [IC.share, '11']].map(([d, n], i) => <span key={i} style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Ico d={d} s={20} c="#444" />{n}</span>)}
      </div>
    </div>
  </div>
);
export const ThreadsWeb: React.FC<{ font: string; feed: ThreadPostData[]; feedAppear?: number[]; composerText?: string; composerPost?: number; scroll?: number }> = ({ font, feed, feedAppear = [], composerText, composerPost = 0, scroll = 0 }) => (
  <div style={{ position: 'absolute', inset: 0, background: '#FAFAFA', fontFamily: font, color: '#000', overflow: 'hidden' }}>
    {/* left nav */}
    <div style={{ position: 'absolute', left: 28, top: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{MASK('threads', 30, '#000')}<span style={{ fontSize: 34, fontWeight: 700, fontStyle: 'italic', letterSpacing: '-0.02em' }}>threads</span></div>
      <div style={{ marginTop: 50 }}>
        {SIDE.map(([n, d], i) => n ? (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '9px 14px', width: 250, borderRadius: 10, background: i === 0 ? '#EFEFEF' : 'transparent', fontSize: 19, fontWeight: i === 0 ? 600 : 400, position: 'relative' }}>
            <Ico d={d} s={22} c="#000" fill={i === 0 ? '#000' : 'none'} />{n}
            {n === 'Messages' && <span style={{ position: 'absolute', left: 26, top: 2, width: 18, height: 18, borderRadius: 9, background: '#FF3040', color: '#fff', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>5</span>}
          </div>) : <div key={i} style={{ height: 22 }} />)}
        <div style={{ color: '#999', fontSize: 15, margin: '30px 0 10px', display: 'flex', justifyContent: 'space-between', width: 250 }}><span>Other feeds</span><span>Edit</span></div>
        {FEEDS.map((n) => <div key={n} style={{ padding: '9px 0', fontSize: 19 }}>{n}</div>)}
      </div>
    </div>
    {/* centre column */}
    <div style={{ position: 'absolute', left: 560, top: 24, width: 810, fontSize: 26, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
      <span style={{ marginLeft: 30 }}>For you</span>
      <span style={{ marginLeft: 'auto', display: 'flex', gap: 22, marginRight: 30 }}><Ico d={IC.img} s={26} /><Ico d={IC.plus} s={26} /><Ico d={IC.dots} s={26} /></span>
    </div>
    <div style={{ position: 'absolute', left: 560, top: 86, width: 810, bottom: -20, background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '24px 24px 0 0', overflow: 'hidden' }}>
      <div style={{ transform: `translateY(${-scroll}px)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '22px 26px', borderBottom: '1px solid #EFEFEF' }}>
          <Avatar s={44} face />
          <span style={{ flex: 1, fontSize: 18, color: composerText ? '#000' : '#999' }}>{composerText || "What's new?"}</span>
          <span style={{ border: '1px solid #DDD', borderRadius: 12, padding: '9px 20px', fontSize: 17, fontWeight: 600, background: composerPost ? '#000' : '#fff', color: composerPost ? '#fff' : '#000', transform: `scale(${1 - composerPost * 0.05})` }}>Post</span>
        </div>
        {feed.map((p, i) => <ThreadPost key={p.user + i} p={p} font={font} appear={feedAppear[i] ?? 1} />)}
      </div>
    </div>
    {/* right column */}
    <div style={{ position: 'absolute', left: 1585, top: 18, width: 320 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#F0F0F0', borderRadius: 24, padding: '12px 18px', color: '#999', fontSize: 18 }}><Ico d={IC.search} s={20} c="#999" />Search</div>
      <div style={{ fontSize: 21, fontWeight: 700, margin: '30px 0 14px' }}>Follow suggestions</div>
      {SUGG.map(([u, s, b]) => (
        <div key={u} style={{ display: 'flex', gap: 12, marginBottom: 26 }}>
          <Avatar s={44} seed={u} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ fontWeight: 600, fontSize: 17 }}>{u}</span><span style={{ marginLeft: 'auto', border: '1px solid #DDD', borderRadius: 10, padding: '5px 14px', fontWeight: 600, fontSize: 15 }}>Follow</span></div>
            <div style={{ color: '#999', fontSize: 15 }}>{s}</div><div style={{ fontSize: 15, marginTop: 4 }}>{b}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
// New-thread modal + "Save to drafts?" dialog, exactly the platform's layout
export const ThreadsModal: React.FC<{ font: string; user: string; text: React.ReactNode; caret?: boolean; postHover?: number; cancelPress?: number; dialog?: number; savePress?: number }> = ({ font, user, text, caret, postHover = 0, cancelPress = 0, dialog = 0, savePress = 0 }) => (
  <>
    <div style={{ position: 'absolute', left: 960 - 392, top: 320, width: 784, background: '#FFFFFF', borderRadius: 22, fontFamily: font, color: '#000', boxShadow: '0 20px 60px rgba(0,0,0,0.25)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '22px 30px', borderBottom: '1px solid #EFEFEF', fontSize: 20 }}>
        <span style={{ opacity: 1 - cancelPress * 0.5 }}>Cancel</span><span style={{ flex: 1, textAlign: 'center', fontWeight: 700 }}>New thread</span>
        <span style={{ display: 'flex', gap: 18 }}><Ico d={IC.drafts} s={28} /><Ico d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM8 12h.01M12 12h.01M16 12h.01" s={28} /></span>
      </div>
      <div style={{ display: 'flex', gap: 16, padding: '22px 30px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}><Avatar s={46} face /><div style={{ width: 2, height: 54, background: '#E5E5E5' }} /><Avatar s={22} face /></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 19 }}><b>{user}</b> <span style={{ color: '#999' }}>›  Community or topic</span></div>
          <div style={{ fontSize: 19, lineHeight: 1.45, marginTop: 4, minHeight: 28 }}>{text}{caret && <span style={{ display: 'inline-block', width: 2, height: 22, background: '#000', marginLeft: 2, verticalAlign: 'middle' }} />}</div>
          <div style={{ display: 'flex', gap: 20, marginTop: 14, color: '#999' }}>{[IC.smile, IC.img, IC.doc, IC.pin].map((d, i) => <Ico key={i} d={d} s={24} c="#999" />)}</div>
          <div style={{ color: '#999', fontSize: 18, margin: '22px 0 0' }}>Add to thread</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', padding: '26px 30px 26px', fontSize: 19, color: '#999' }}>
        <Ico d={IC.opts} s={24} c="#999" /><span style={{ marginLeft: 10 }}>Post options</span>
        <span style={{ marginLeft: 'auto', border: '1px solid #DDD', borderRadius: 14, padding: '11px 24px', color: '#000', fontWeight: 600, background: postHover ? '#F2F2F2' : '#fff', transform: `scale(${1 + postHover * 0.04})` }}>Post</span>
      </div>
      {dialog > 0 && <div style={{ position: 'absolute', inset: 0, background: `rgba(0,0,0,${0.45 * dialog})` }} />}
    </div>
    {dialog > 0.01 && (
      <div style={{ position: 'absolute', left: 960 - 185, top: 312, width: 370, background: '#FFFFFF', borderRadius: 18, fontFamily: font, textAlign: 'center', overflow: 'hidden', opacity: dialog, transform: `scale(${0.9 + dialog * 0.1})`, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ fontWeight: 700, fontSize: 21, padding: '28px 20px 10px' }}>Save to drafts?</div>
        <div style={{ color: '#999', fontSize: 18, padding: '0 34px 24px', lineHeight: 1.4 }}>Save to drafts to edit and post at a later time.</div>
        <div style={{ borderTop: '1px solid #EFEFEF', padding: 20, fontSize: 20, fontWeight: 700, background: savePress ? '#F2F2F2' : '#fff' }}>Save</div>
        <div style={{ borderTop: '1px solid #EFEFEF', padding: 20, fontSize: 20, color: '#FF3040' }}>Don't save</div>
        <div style={{ borderTop: '1px solid #EFEFEF', padding: 20, fontSize: 20 }}>Cancel</div>
      </div>
    )}
  </>
);

// ===================== Instagram (mobile, light) =====================
const QUOTES = ['Kalau mau jadi sesuatu, harus menjadi sesuatu yang berbeda.', 'Sesuatu yang unik.', 'Sesuatu yang nggak orang lain punya.', 'Melakukan sesuatu yang berbeda.'];
const IGPost: React.FC<{ seed: string; font: string }> = ({ seed, font }) => (
  <div style={{ fontFamily: font, color: '#000', paddingBottom: 14 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px' }}>
      <div style={{ padding: 2, borderRadius: 18, background: 'linear-gradient(45deg, #FEDA75, #FA7E1E, #D62976, #962FBF)' }}><div style={{ padding: 2, background: '#fff', borderRadius: 16 }}><Avatar s={28} seed={seed} /></div></div>
      <span style={{ fontWeight: 600, fontSize: 14 }}>{['katakata.sukses', 'mindset.harian', 'jadi.beda', 'motivasi.id'][Math.floor(random(seed) * 4)]}</span><span style={{ marginLeft: 'auto', color: '#000' }}>···</span>
    </div>
    <div style={{ width: 360, height: 360, background: random(seed + 'b') > 0.5 ? '#111318' : '#0A1A4A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 36px', boxSizing: 'border-box', color: '#FFFFFF', fontSize: 26, fontWeight: 600, lineHeight: 1.25, textAlign: 'center' }}>
      {/* quote lines are phrases Irfan actually says in this video (rule 2) */}
      “{QUOTES[Math.floor(random(seed + 'q') * QUOTES.length)]}”
    </div>
    <div style={{ display: 'flex', gap: 16, padding: '10px 12px 6px' }}><Ico d={IC.heart} s={24} /><Ico d={IC.comment} s={24} /><Ico d={IC.share} s={24} /><span style={{ marginLeft: 'auto' }}><Ico d={IC.bookmark} s={24} /></span></div>
    <div style={{ fontWeight: 600, fontSize: 14, padding: '0 12px' }}>{(12 + Math.floor(random(seed + 'k') * 80)) / 10}k likes</div>
  </div>
);
export const InstagramPhone: React.FC<{ font: string; scroll: number; x: number; y: number }> = ({ font, scroll, x, y }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: 388, height: 780, borderRadius: 54, background: '#0E0E10', padding: 14, boxSizing: 'border-box', boxShadow: '0 30px 70px rgba(40,39,35,0.25)' }}>
    <div style={{ width: 360, height: 752, borderRadius: 42, background: '#FFFFFF', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 96, background: '#fff', zIndex: 2, boxSizing: 'border-box', padding: '40px 14px 0', display: 'flex', alignItems: 'center', fontFamily: font }}>
        <span style={{ fontSize: 26, fontWeight: 600, fontStyle: 'italic', letterSpacing: '-0.01em' }}>Instagram</span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}><Ico d={IC.heart} s={24} /><Ico d={IC.msg} s={24} /></span>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 96 - scroll }}>
        <div style={{ display: 'flex', gap: 12, padding: '6px 12px 12px' }}>
          {Array.from({ length: 5 }).map((_, i) => <div key={i} style={{ padding: 2, borderRadius: 34, background: 'linear-gradient(45deg, #FEDA75, #FA7E1E, #D62976, #962FBF)' }}><div style={{ padding: 2, background: '#fff', borderRadius: 32 }}><Avatar s={56} face={i === 0} seed={'st' + i} /></div></div>)}
        </div>
        {Array.from({ length: 14 }).map((_, i) => <IGPost key={i} seed={`ig${i % 7}`} font={font} />)}
      </div>
    </div>
  </div>
);

// ===================== OpenBot desktop (Mac) =====================
type Row = { id: AgentId; name: string; tag: string; time: string; work: string; done: string; at: number; badge: number };
export const OB_ROWS: Row[] = [
  { id: 'fred', name: 'Creative Pro', tag: 'Personal', time: '11:12 AM', work: 'Working…', done: 'Status: done · Laporan audit', at: 0.6, badge: 1 },
  { id: 'malu', name: 'Sales Ops', tag: 'Operations', time: '11:13 AM', work: 'Working…', done: 'Status: done · Result: audit', at: 1.1, badge: 2 },
  { id: 'cloe', name: 'Developer', tag: 'Engineering', time: '11:13 AM', work: 'Working…', done: 'Status: done · Result: audit', at: 1.6, badge: 3 },
  { id: 'vita', name: 'Content Research', tag: 'Research', time: '11:14 AM', work: 'Working…', done: 'Audit selesai dan dikirim', at: 2.1, badge: 6 },
  { id: 'nexo', name: 'Content Strategy', tag: 'Strategy', time: '11:15 AM', work: 'Working…', done: 'The audit report is ready', at: 2.5, badge: 4 },
  { id: 'yoshi', name: 'Writing Partner', tag: 'Personal', time: '11:12 AM', work: 'Working…', done: 'Laporan audit saya sudah selesai', at: 2.9, badge: 2 },
];
export const OpenBotWindow: React.FC<{ t: number; t0: number; font: string; hideAvatars?: number[] }> = ({ t, t0, font, hideAvatars = [] }) => {
  const u = t - t0;
  const ask = 'Cek status semua agent, ya.';
  const reply = 'Enam agent selesai. Laporan audit sudah dikirim ke Personal Asisten.';
  const nA = Math.floor(lin(u, 0.2, 0.9, 0, ask.length));
  const nR = Math.floor(lin(u, 1.6, 3.4, 0, reply.length));
  return (
    <div style={{ position: 'absolute', left: 960 - 760, top: 540 - 410, width: 1520, height: 820, borderRadius: 14, background: '#1C1C1E', overflow: 'hidden', boxShadow: '0 40px 100px rgba(10,26,74,0.35), 0 0 0 1px rgba(0,0,0,0.4)', fontFamily: font, color: '#F2F2F7', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 50, background: '#232325', display: 'flex', alignItems: 'center', gap: 9, padding: '0 18px', borderBottom: '1px solid #2E2E30', flexShrink: 0 }}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <span key={c} style={{ width: 13, height: 13, borderRadius: 7, background: c }} />)}
        <span style={{ marginLeft: 18, fontSize: 15, fontWeight: 600 }}>PC-Server</span>
        <span style={{ marginLeft: 26, display: 'flex', alignItems: 'center', gap: 8, background: '#2C2C2E', borderRadius: 8, padding: '5px 12px', fontSize: 14 }}><span style={{ width: 20, height: 20 }}><Agent id="fred" size={20} t={t} /></span>Personal Asisten</span>
      </div>
      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ width: 64, background: '#161618', borderRight: '1px solid #2E2E30', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26, paddingTop: 20 }}>
          {[IC.user, IC.chart, IC.doc, IC.bookmark, IC.dots].map((d, i) => <Ico key={i} d={d} s={22} c="#8E8E93" />)}
        </div>
        <div style={{ width: 400, borderRight: '1px solid #2E2E30', padding: '16px 14px', boxSizing: 'border-box' }}>
          <div style={{ background: '#2C2C2E', borderRadius: 10, padding: '9px 12px', color: '#8E8E93', fontSize: 15, display: 'flex', gap: 8 }}><Ico d={IC.search} s={18} c="#8E8E93" />Search</div>
          <div style={{ color: '#8E8E93', fontSize: 13, margin: '18px 6px 6px' }}>Unassigned</div>
          {OB_ROWS.map((r, i) => {
            const done = u >= r.at;
            const sec = i === 2 ? 'Chief' : i === 5 ? 'Worker' : null;
            return (
              <React.Fragment key={r.id}>
                {sec && <div style={{ color: '#F2F2F7', fontSize: 14, fontWeight: 600, margin: '12px 6px 4px' }}>{sec}</div>}
                <div style={{ display: 'flex', gap: 12, padding: '8px 6px', borderRadius: 10, background: done && u - r.at < 0.35 ? 'rgba(111,141,255,0.16)' : 'transparent', alignItems: 'center' }}>
                  <div style={{ position: 'relative', width: 50, height: 50, flexShrink: 0, opacity: hideAvatars.includes(i) ? 0 : 1 }}>
                    <Agent id={r.id} size={50} t={t} seed={i} talk={done ? 0 : 1} />
                    {done && <span style={{ position: 'absolute', left: 30, top: 32, minWidth: 18, height: 18, borderRadius: 9, background: '#6F8DFF', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #1C1C1E' }}>{r.badge}</span>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16 }}><b>{r.name}</b><span style={{ fontSize: 12, color: '#8E8E93', background: '#2C2C2E', borderRadius: 5, padding: '1px 6px' }}>{r.tag}</span><span style={{ marginLeft: 'auto', fontSize: 13, color: '#8E8E93' }}>{r.time}</span></div>
                    <div style={{ fontSize: 14, color: done ? '#C7C7CC' : '#6F8DFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{done ? r.done : r.work}</div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <div style={{ flex: 1, position: 'relative', padding: '24px 30px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{nA > 0 && <div style={{ background: '#2C2C2E', borderRadius: 18, padding: '12px 18px', fontSize: 17, maxWidth: 520 }}>{ask.slice(0, nA)}</div>}</div>
          {u > 1.1 && <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '26px 0 16px', color: '#6F8DFF', fontSize: 13, fontWeight: 700 }}><div style={{ flex: 1, height: 1, background: '#6F8DFF' }} />NEW<div style={{ flex: 1, height: 1, background: '#6F8DFF' }} /></div>}
          {u > 1.2 && (
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <Agent id="fred" size={40} t={t} talk={nR < reply.length ? 1 : 0} />
              <div style={{ background: '#2C2C2E', borderRadius: 18, padding: '12px 18px', fontSize: 17, lineHeight: 1.45, maxWidth: 560 }}>
                {nR > 0 ? reply.slice(0, nR) : <span style={{ display: 'inline-flex', gap: 5 }}>{[0, 1, 2].map((d) => <span key={d} style={{ width: 7, height: 7, borderRadius: 4, background: '#8E8E93', opacity: 0.3 + 0.7 * Math.max(0, Math.sin(u * 12 - d)) }} />)}</span>}
              </div>
            </div>
          )}
          <div style={{ position: 'absolute', left: 30, right: 30, bottom: 24, background: '#2C2C2E', borderRadius: 16, padding: '14px 18px', color: '#8E8E93', fontSize: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Ico d={IC.plus} s={20} c="#8E8E93" />Message Personal Asisten<span style={{ marginLeft: 'auto', width: 30, height: 30, borderRadius: 15, background: '#F2F2F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico d="M12 19V5M5 12l7-7 7 7" s={18} c="#000" /></span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===================== Calendar (ref "Goodbye April") =====================
export type Repo = [string, string, string];
const MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const monthKey = (d: string) => d.slice(0, 7);
const RepoTile: React.FC<{ r: Repo; size: number; font: string; hi?: number }> = ({ r, size, font, hi = 0 }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.22, background: '#FFFFFF', boxShadow: `0 8px 20px rgba(0,0,0,0.35), 0 0 0 ${hi * 4}px #6F8DFF`, transform: `rotate(${(random(r[0]) - 0.5) * 10}deg)`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: size * 0.1, boxSizing: 'border-box', fontFamily: font }}>
    {MASK('github', size * 0.26, '#1F2328')}
    <div style={{ fontSize: size * 0.15, fontWeight: 700, color: '#0969DA', lineHeight: 1.05, wordBreak: 'break-all' }}>{r[0]}</div>
  </div>
);
export const CalendarCard: React.FC<{ y: number; m: number; repos: Repo[]; font: string; tileA?: (i: number) => number; hiName?: string }> = ({ y, m, repos, font, tileA = () => 1, hiName }) => {
  const first = (new Date(Date.UTC(y, m, 1)).getUTCDay() + 6) % 7; // Monday-first
  const days = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  const cell = 104;
  const byDay: Record<number, Repo[]> = {};
  repos.forEach((r) => { const d = Number(r[2].slice(8, 10)); (byDay[d] = byDay[d] || []).push(r); });
  let k = 0;
  return (
    <div style={{ width: 800, padding: '40px 46px 44px', boxSizing: 'border-box', borderRadius: 44, background: 'linear-gradient(180deg, #0B0D0F 0%, #0E1428 70%, #13245E 100%)', border: '1px solid rgba(255,255,255,0.12)', fontFamily: font, color: '#F4F5F7', boxShadow: '0 40px 90px rgba(10,26,74,0.35)' }}>
      <div style={{ display: 'flex', alignItems: 'center', fontSize: 34, fontWeight: 500 }}>{MON[m]} {y}<span style={{ color: '#6F8DFF', marginLeft: 12 }}>›</span><span style={{ marginLeft: 'auto', color: '#6F8DFF', display: 'flex', gap: 40 }}>‹<span>›</span></span></div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(7, ${cell}px)`, marginTop: 30, color: '#6B6E76', fontSize: 22, textAlign: 'center' }}>{['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => <div key={d}>{d}</div>)}</div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(7, ${cell}px)`, gridAutoRows: '86px', marginTop: 12, fontSize: 34, textAlign: 'center', alignItems: 'center' }}>
        {Array.from({ length: first }).map((_, i) => <div key={'e' + i} />)}
        {Array.from({ length: days }).map((_, i) => {
          const d = i + 1, list = byDay[d];
          if (!list) return <div key={d}>{String(d).padStart(2, '0')}</div>;
          return (
            <div key={d} style={{ position: 'relative', height: 86 }}>
              {list.map((r, j) => { const a = tileA(k++); return (
                <div key={r[0]} style={{ position: 'absolute', left: 8 + j * 14, top: -4 - j * 10, opacity: Math.min(1, a * 1.5), transform: `scale(${0.4 + a * 0.6})` }}><RepoTile r={r} size={88} font={font} hi={hiName === r[0] ? 1 : 0} /></div>
              ); })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export const MiniMonth: React.FC<{ y: number; m: number; repos: Repo[]; font: string }> = ({ y, m, repos, font }) => {
  const first = (new Date(Date.UTC(y, m, 1)).getUTCDay() + 6) % 7, days = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  const set = new Set(repos.map((r) => Number(r[2].slice(8, 10))));
  return (
    <div style={{ width: 250, padding: '16px 18px', boxSizing: 'border-box', borderRadius: 18, background: '#0B0D0F', border: '1px solid rgba(255,255,255,0.1)', fontFamily: font, color: '#F4F5F7' }}>
      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{MON[m].slice(0, 3)} {y}<span style={{ float: 'right', color: '#6F8DFF' }}>{repos.length || ''}</span></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {Array.from({ length: first }).map((_, i) => <div key={'e' + i} />)}
        {Array.from({ length: days }).map((_, i) => <div key={i} style={{ height: 18, borderRadius: 5, background: set.has(i + 1) ? '#FFFFFF' : 'rgba(255,255,255,0.08)' }} />)}
      </div>
    </div>
  );
};

// ===================== Character scene (ref: man at desk, floating cubes) =====================
export const CUBES = Array.from({ length: 26 }).map((_, i) => ({
  x: (random('cx' + i) - 0.5) * 2600 + 960, y: (random('cy' + i) - 0.5) * 1500 + 480, s: 50 + random('cs' + i) * 170, r: (random('cr' + i) - 0.5) * 30, ph: random('cp' + i) * 6,
}));
export const Cube: React.FC<{ s: number; t: number; ph: number; r: number }> = ({ s, t, ph, r }) => (
  <div style={{ width: s, height: s * 0.82, transform: `translateY(${Math.sin(t * 0.8 + ph) * 12}px) rotate(${r + Math.sin(t * 0.5 + ph) * 3}deg)`, background: 'linear-gradient(160deg, #2B47FF 0%, #13245E 55%, #0A0F2A 100%)', borderTop: '2px solid rgba(220,228,255,0.85)', borderLeft: '1px solid rgba(220,228,255,0.45)', boxShadow: '0 20px 40px rgba(0,0,0,0.35)' }} />
);
export const Circuits: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => (
  <svg width="1920" height="1080" style={{ position: 'absolute' }}>
    {Array.from({ length: 16 }).map((_, i) => {
      const x = 300 + i * 90 + (random('ln' + i) - 0.5) * 60, len = 200 + random('ll' + i) * 380, bend = (random('lb' + i) - 0.5) * 120;
      const p = lin(t, t0 + i * 0.08, t0 + 1.2 + i * 0.08, 0, 1, Easing.out(Easing.cubic));
      const d = `M ${x} -20 L ${x} ${len * 0.6} L ${x + bend} ${len * 0.6 + Math.abs(bend)} L ${x + bend} ${len}`;
      return (
        <g key={i}>
          <path d={d} fill="none" stroke="rgba(160,180,255,0.55)" strokeWidth={1.6} strokeDasharray={1400} strokeDashoffset={1400 * (1 - p)} />
          {p > 0.95 && <circle cx={x + bend} cy={len} r={6} fill="none" stroke="rgba(160,180,255,0.8)" strokeWidth={1.6} />}
        </g>
      );
    })}
  </svg>
);
// silhouette at a desk with a monitor; the monitor screen is the hand-off into ChatGPT
export const DeskScene: React.FC<{ t: number; screenA: number }> = ({ t, screenA }) => (
  <svg width="1920" height="1080" style={{ position: 'absolute' }}>
    <defs>
      <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#DCE4FF" stopOpacity="0.55" /><stop offset="1" stopColor="#6F8DFF" stopOpacity="0" /></linearGradient>
      <linearGradient id="body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1A1F3A" /><stop offset="1" stopColor="#05070F" /></linearGradient>
    </defs>
    {/* floor light from the monitor (linear, not radial) */}
    <polygon points="900,640 1060,640 1260,930 700,930" fill="url(#beam)" opacity={0.45 + screenA * 0.4} />
    <rect x="0" y="905" width="1920" height="200" fill="url(#beam)" opacity="0.25" />
    {/* desk */}
    <rect x="760" y="720" width="420" height="16" rx="4" fill="#0E1226" stroke="rgba(111,141,255,0.4)" />
    <rect x="780" y="736" width="12" height="170" fill="#0E1226" /><rect x="1148" y="736" width="12" height="170" fill="#0E1226" />
    {/* monitor */}
    <rect x="900" y="590" width="170" height="112" rx="6" fill="#0B0E1E" stroke="rgba(160,180,255,0.6)" />
    <rect x="908" y="598" width="154" height="96" rx="3" fill="#DCE4FF" opacity={0.25 + screenA * 0.75} />
    <rect x="978" y="702" width="14" height="18" fill="#0B0E1E" />
    {/* chair */}
    <path d="M640 760 h70 v-110 h18 v128 h-88 z M660 778 v120 M700 778 v120" stroke="#141A33" strokeWidth="10" fill="#141A33" />
    {/* person, rim-lit from the screen */}
    <g transform={`translate(0 ${Math.sin(t * 1.3) * 1.5})`}>
      <circle cx="845" cy="560" r="26" fill="url(#body)" stroke="#6F8DFF" strokeWidth="2" strokeOpacity="0.7" />
      <path d="M812 590 Q845 578 878 590 L888 720 L870 720 L866 900 L848 900 L845 760 L842 900 L824 900 L820 720 L802 720 Z" fill="url(#body)" stroke="#6F8DFF" strokeWidth="2" strokeOpacity="0.55" />
      <path d="M878 600 L930 690 L920 698 L870 625" fill="url(#body)" stroke="#6F8DFF" strokeWidth="2" strokeOpacity="0.55" />
    </g>
  </svg>
);
export const NightBG: React.FC = () => <AbsoluteFill style={{ background: 'linear-gradient(180deg, #070B1E 0%, #0E1640 55%, #13245E 100%)' }} />;
