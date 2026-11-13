// Threads web (terang + gelap) dibangun ulang sebagai kode (Lantai D20, BRIEF D-013).
// Acuan: assets/ref_ui/threads_feed_light.webp, threads_composer_light.webp, threads_save_drafts_dialog.webp,
// dan screenshot profil publik threads.com/@siirfannih (mode gelap). Ikon: lucide-react (ikon jadi), logo: simple-icons.
//
// Semua komponen murni: tidak membaca frame sendiri. Animasi dikendalikan pemanggil lewat props per frame
// (press 0..1, appear 0..1, caret, dll.), jadi bisa dipakai ulang di adegan mana pun (B09, B17, B22, B25).
// Ukuran dalam px dunia; `ui` = skala UI (1 = Threads web 1:1 pada layar 1920 px lebar, teks badan 15 px).
import React from 'react';
import { staticFile, Img } from 'remotion';
import {
  House, Search, Plus, Heart, User, MessageCircle, Repeat2, Send, Ellipsis, Menu,
  ChartNoAxesColumn, Smile, ImagePlay, FileText, MapPin, SlidersHorizontal,
} from 'lucide-react';
import { Logo } from '../engine/Logo';
import { FONT } from '../engine/theme';

export type ThreadsMode = 'light' | 'dark';

/** Token warna Threads web. Gelap: latar #101010, teks #F3F5F7, garis #333638 (TASK r2b). */
export const THREADS = {
  light: {
    page: '#FAFAFA', panel: '#FFFFFF', text: '#000000', sub: '#999999', faint: '#B8B8B8', line: '#E5E5E5',
    hover: '#F0F0F0', button: '#FFFFFF', buttonLine: '#D9D9D9', modal: '#FFFFFF', scrim: 'rgba(0,0,0,0.42)',
    danger: '#FF3040', link: '#0095F6', like: '#FF3040', wordDim: '#C7C7C7',
  },
  dark: {
    page: '#0A0A0A', panel: '#101010', text: '#F3F5F7', sub: '#777777', faint: '#4D4D4D', line: '#333638',
    hover: '#1E1E1E', button: '#101010', buttonLine: '#333638', modal: '#181818', scrim: 'rgba(0,0,0,0.6)',
    danger: '#FF3040', link: '#0095F6', like: '#FF3040', wordDim: '#4A4A4A',
  },
} as const;
export const thTheme = (m: ThreadsMode) => THREADS[m];

const font = (px: number, weight = 400, extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: FONT.inter, fontSize: px, fontWeight: weight, lineHeight: 1.34, letterSpacing: '-0.005em', ...extra,
});

/** Avatar bulat. src = path di public/ (mis. 'ui/avatar_siirfannih.jpg'); tanpa src = avatar default Threads. */
export const ThAvatar: React.FC<{ mode: ThreadsMode; size: number; src?: string; style?: React.CSSProperties }> = ({ mode, size, src, style }) => {
  const t = thTheme(mode);
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', flex: 'none', background: mode === 'dark' ? '#2A2A2A' : '#DBDBDB', border: `1px solid ${t.line}`, position: 'relative', ...style }}>
      {src ? (
        <Img src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        // siluet default (kepala + bahu), seperti avatar kosong Threads
        <svg viewBox="0 0 40 40" width={size} height={size} style={{ position: 'absolute', inset: 0 }}>
          <circle cx="20" cy="15.5" r="7" fill={mode === 'dark' ? '#5E5E5E' : '#F5F5F5'} />
          <path d="M6 37 C8 27 14 24.5 20 24.5 C26 24.5 32 27 34 37 Z" fill={mode === 'dark' ? '#5E5E5E' : '#F5F5F5'} />
        </svg>
      )}
    </div>
  );
};

/** Tombol garis (Post, Follow, Edit profile). press 0..1 = ditekan (skala + isi). */
export const ThButton: React.FC<{ mode: ThreadsMode; ui: number; label: string; press?: number; filled?: boolean; w?: number; style?: React.CSSProperties }> = ({
  mode, ui, label, press = 0, filled, w, style,
}) => {
  const t = thTheme(mode);
  const p = Math.sin(Math.PI * Math.min(1, Math.max(0, press)));
  return (
    <div
      style={{
        ...font(15 * ui, 600), height: 36 * ui, padding: `0 ${16 * ui}px`, width: w, boxSizing: 'border-box',
        borderRadius: 10 * ui, border: `1px solid ${filled ? t.text : t.buttonLine}`,
        background: filled ? t.text : p > 0 ? t.hover : t.button, color: filled ? t.panel : t.text,
        display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 - 0.06 * p})`, flex: 'none', ...style,
      }}
    >
      {label}
    </div>
  );
};

/** Wordmark Threads: ikon @ asli + kata "threads" (sesuai sidebar web). */
export const ThWordmark: React.FC<{ mode: ThreadsMode; ui: number }> = ({ mode, ui }) => {
  const t = thTheme(mode);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 * ui, color: t.text }}>
      <Logo name="threads" size={26 * ui} color={t.text} />
      <span style={{ ...font(28 * ui, 700, { fontStyle: 'italic', letterSpacing: '-0.03em', lineHeight: 1 }) }}>threads</span>
    </div>
  );
};

const NAV = [
  { k: 'home', label: 'For you', Icon: House },
  { k: 'new', label: 'New thread', Icon: Plus },
  { k: 'search', label: 'Search', Icon: Search },
  { k: 'gap', label: '', Icon: Plus },
  { k: 'messages', label: 'Messages', Icon: Send },
  { k: 'activity', label: 'Activity', Icon: Heart },
  { k: 'profile', label: 'Profile', Icon: User },
  { k: 'insights', label: 'Insights', Icon: ChartNoAxesColumn },
] as const;
export type ThNavKey = (typeof NAV)[number]['k'];

/** Sidebar kiri Threads web (wordmark + menu). */
export const ThSidebar: React.FC<{ mode: ThreadsMode; ui: number; active?: ThNavKey; w?: number }> = ({ mode, ui, active = 'home', w = 280 }) => {
  const t = thTheme(mode);
  return (
    <div style={{ width: w * ui, flex: 'none', padding: `${22 * ui}px ${16 * ui}px`, boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${8 * ui}px`, marginBottom: 34 * ui }}>
        <ThWordmark mode={mode} ui={ui} />
        <Menu size={22 * ui} color={t.text} strokeWidth={2} />
      </div>
      {NAV.map(({ k, label, Icon }) =>
        k === 'gap' ? (
          <div key={k} style={{ height: 22 * ui }} />
        ) : (
          <div
            key={k}
            style={{
              display: 'flex', alignItems: 'center', gap: 14 * ui, height: 40 * ui, padding: `0 ${10 * ui}px`,
              borderRadius: 10 * ui, background: k === active ? t.hover : 'transparent', color: t.text, ...font(17 * ui, k === active ? 600 : 400),
            }}
          >
            <Icon size={22 * ui} strokeWidth={k === active ? 2.6 : 2} fill={k === active && k === 'home' ? t.text : 'none'} color={t.text} />
            {label}
          </div>
        ),
      )}
    </div>
  );
};

/** Bilah judul kolom ("For you", nama profil) dengan ikon di kanan. */
export const ThColumnHeader: React.FC<{ mode: ThreadsMode; ui: number; title: string; w: number; back?: boolean }> = ({ mode, ui, title, w }) => {
  const t = thTheme(mode);
  return (
    <div style={{ width: w, height: 64 * ui, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${20 * ui}px`, boxSizing: 'border-box', color: t.text }}>
      <span style={font(20 * ui, 600)}>{title}</span>
      <div style={{ display: 'flex', gap: 16 * ui }}>
        <FileText size={24 * ui} color={t.text} strokeWidth={1.8} />
        <Plus size={24 * ui} color={t.text} strokeWidth={1.8} />
        <Ellipsis size={24 * ui} color={t.text} strokeWidth={1.8} />
      </div>
    </div>
  );
};

/** Kolom tengah berbingkai (kartu membulat di atas latar halaman), seperti Threads web. */
export const ThColumn: React.FC<{ mode: ThreadsMode; ui: number; w: number; h: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  mode, ui, w, h, children, style,
}) => {
  const t = thTheme(mode);
  return (
    <div style={{ width: w, height: h, background: t.panel, border: `1px solid ${t.line}`, borderBottom: 'none', borderRadius: `${28 * ui}px ${28 * ui}px 0 0`, overflow: 'hidden', position: 'relative', ...style }}>
      {children}
    </div>
  );
};

/** Baris "What's new?" + Post di atas feed. */
export const ThComposeRow: React.FC<{ mode: ThreadsMode; ui: number; avatar?: string }> = ({ mode, ui, avatar }) => {
  const t = thTheme(mode);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 * ui, padding: `${18 * ui}px ${24 * ui}px`, borderBottom: `1px solid ${t.line}` }}>
      <ThAvatar mode={mode} size={40 * ui} src={avatar} />
      <span style={{ ...font(16 * ui), color: t.sub, flex: 1 }}>What&apos;s new?</span>
      <ThButton mode={mode} ui={ui} label="Post" />
    </div>
  );
};

/**
 * Satu post di feed/profil.
 *  body   = isi teks (ReactNode; pemanggil boleh memberi kata per kata yang menyala sinkron ucapan)
 *  media  = lampiran (gambar/cetakan) di bawah teks
 *  like   = 0..1 animasi like ditekan (ikon jadi merah terisi, sedikit membesar)
 *  appear = 0..1 masuk dari bawah (spring diberi pemanggil); 1 = diam di tempat
 *  counts = angka di samping ikon (default tanpa angka: penulis menyembunyikan jumlah like)
 */
export const ThPost: React.FC<{
  mode: ThreadsMode; ui: number; w: number;
  user: string; avatar?: string; time?: string; topic?: string;
  body?: React.ReactNode; bodySize?: number; media?: React.ReactNode;
  like?: number; appear?: number; counts?: [string, string, string, string];
  divider?: boolean; style?: React.CSSProperties;
}> = ({ mode, ui, w, user, avatar, time, topic, body, bodySize = 15, media, like = 0, appear = 1, counts, divider = true, style }) => {
  const t = thTheme(mode);
  const lk = Math.min(1, Math.max(0, like));
  const pop = 1 + 0.35 * Math.sin(Math.PI * lk);
  const icon = 20 * ui;
  const act = (Icon: typeof Heart, k: number, extra?: { fill?: string; color?: string; scale?: number }) => (
    <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 5 * ui, color: extra?.color ?? t.text, ...font(13 * ui) }}>
      <Icon size={icon} strokeWidth={1.8} color={extra?.color ?? t.text} fill={extra?.fill ?? 'none'} style={{ transform: `scale(${extra?.scale ?? 1})` }} />
      {counts ? <span>{counts[k]}</span> : null}
    </div>
  );
  return (
    <div
      style={{
        width: w, boxSizing: 'border-box', padding: `${16 * ui}px ${24 * ui}px ${14 * ui}px`, display: 'flex', gap: 12 * ui,
        borderBottom: divider ? `1px solid ${t.line}` : 'none', background: t.panel,
        transform: appear < 1 ? `translateY(${(1 - appear) * 60 * ui}px)` : undefined, opacity: Math.min(1, appear * 1.5), ...style,
      }}
    >
      <ThAvatar mode={mode} size={36 * ui} src={avatar} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 * ui, color: t.text }}>
          <span style={font(15 * ui, 600)}>{user}</span>
          {topic ? <span style={{ ...font(15 * ui, 400), color: t.sub }}>›&nbsp;{topic}</span> : null}
          {time ? <span style={{ ...font(15 * ui), color: t.sub }}>{time}</span> : null}
          <div style={{ flex: 1 }} />
          <Ellipsis size={20 * ui} color={t.text} strokeWidth={1.8} />
        </div>
        {body ? <div style={{ ...font(bodySize * ui), color: t.text, marginTop: 2 * ui, whiteSpace: 'pre-wrap' }}>{body}</div> : null}
        {media ? <div style={{ marginTop: 10 * ui }}>{media}</div> : null}
        <div style={{ display: 'flex', gap: 26 * ui, marginTop: 12 * ui, marginLeft: -2 * ui }}>
          {act(Heart, 0, lk > 0.5 ? { fill: t.like, color: t.like, scale: pop } : { scale: pop })}
          {act(MessageCircle, 1)}
          {act(Repeat2, 2)}
          {act(Send, 3)}
        </div>
      </div>
    </div>
  );
};

/**
 * Modal "New thread" (composer). Dipakai B17 (gelap, Cancel → Save to drafts) dan B25 (terang, Post).
 *  text        = isi yang sudah/sedang diketik (ReactNode); caret = tampilkan kursor teks
 *  attachments = lampiran di bawah teks (mis. cetakan yang ditarik masuk)
 *  postPress / cancelPress = 0..1 tombol ditekan · postHover = 0..1 hover Post
 *  dim = 0..1 modal diredupkan (saat dialog Save to drafts di atasnya)
 */
export const ThComposer: React.FC<{
  mode: ThreadsMode; ui: number; w?: number;
  user: string; avatar?: string; text?: React.ReactNode; placeholder?: string; caret?: boolean;
  attachments?: React.ReactNode; postPress?: number; postHover?: number; cancelPress?: number; dim?: number;
  style?: React.CSSProperties;
}> = ({ mode, ui, w = 785, user, avatar, text, placeholder = "What's new?", caret, attachments, postPress = 0, postHover = 0, cancelPress = 0, dim = 0, style }) => {
  const t = thTheme(mode);
  const cp = Math.sin(Math.PI * Math.min(1, Math.max(0, cancelPress)));
  return (
    <div
      style={{
        width: w * ui, background: t.modal, borderRadius: 18 * ui, position: 'relative', overflow: 'hidden',
        boxShadow: mode === 'dark' ? `0 0 0 1px ${t.line}, 0 30px 80px rgba(0,0,0,0.6)` : '0 24px 70px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.04)',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', height: 70 * ui, padding: `0 ${30 * ui}px`, borderBottom: `1px solid ${t.line}`, color: t.text }}>
        <span style={{ ...font(19 * ui), opacity: 1 - 0.4 * cp, transform: `scale(${1 - 0.05 * cp})`, display: 'inline-block' }}>Cancel</span>
        <div style={{ flex: 1, textAlign: 'center', ...font(19 * ui, 700) }}>New thread</div>
        <div style={{ display: 'flex', gap: 22 * ui }}>
          <FileText size={28 * ui} color={t.text} strokeWidth={1.7} />
          <Ellipsis size={28 * ui} color={t.text} strokeWidth={1.7} style={{ border: `${1.6 * ui}px solid ${t.text}`, borderRadius: '50%', padding: 2 * ui, boxSizing: 'border-box' }} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 14 * ui, padding: `${24 * ui}px ${30 * ui}px 0` }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ThAvatar mode={mode} size={46 * ui} src={avatar} />
          <div style={{ width: 2 * ui, flex: 1, minHeight: 40 * ui, background: t.line, marginTop: 10 * ui }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 * ui, color: t.text }}>
            <span style={font(19 * ui, 600)}>{user}</span>
            <span style={{ ...font(19 * ui), color: t.sub }}>›&nbsp;&nbsp;Add a topic</span>
          </div>
          <div style={{ ...font(19 * ui), color: text ? t.text : t.sub, marginTop: 4 * ui, minHeight: 26 * ui }}>
            {text ?? placeholder}
            {caret ? <span style={{ display: 'inline-block', width: 2 * ui, height: 22 * ui, background: t.text, marginLeft: 2 * ui, verticalAlign: 'text-bottom' }} /> : null}
          </div>
          {attachments ? <div style={{ marginTop: 14 * ui }}>{attachments}</div> : null}
          <div style={{ display: 'flex', gap: 20 * ui, marginTop: 16 * ui, color: t.sub }}>
            <ImagePlay size={24 * ui} color={t.sub} strokeWidth={1.7} />
            <Smile size={24 * ui} color={t.sub} strokeWidth={1.7} />
            <FileText size={24 * ui} color={t.sub} strokeWidth={1.7} />
            <MapPin size={24 * ui} color={t.sub} strokeWidth={1.7} />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 * ui, padding: `${18 * ui}px ${30 * ui}px 0 ${38 * ui}px`, color: t.faint }}>
        <ThAvatar mode={mode} size={22 * ui} />
        <span style={{ ...font(19 * ui), color: t.faint }}>Add to thread</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', padding: `${24 * ui}px ${30 * ui}px ${26 * ui}px` }}>
        <SlidersHorizontal size={24 * ui} color={t.sub} strokeWidth={1.7} />
        <span style={{ ...font(19 * ui), color: t.sub, marginLeft: 12 * ui, flex: 1 }}>Post options</span>
        <ThButton
          mode={mode} ui={ui * 1.22} label="Post" press={postPress}
          style={{ background: postHover > 0 ? t.hover : t.button, boxShadow: postHover > 0 ? `0 0 0 ${2 * ui * postHover}px ${t.buttonLine}` : undefined }}
        />
      </div>
      {dim > 0 ? <div style={{ position: 'absolute', inset: 0, background: mode === 'dark' ? `rgba(0,0,0,${0.55 * dim})` : `rgba(0,0,0,${0.35 * dim})` }} /> : null}
    </div>
  );
};

/** Dialog "Save to drafts?" persis acuan (judul, keterangan, Save, Don't save, Cancel). savePress 0..1 = Save ditekan. */
export const ThSaveDraftDialog: React.FC<{ mode: ThreadsMode; ui: number; savePress?: number; saveHover?: number; style?: React.CSSProperties }> = ({
  mode, ui, savePress = 0, saveHover = 0, style,
}) => {
  const t = thTheme(mode);
  const sp = Math.sin(Math.PI * Math.min(1, Math.max(0, savePress)));
  const row = (label: string, color: string, bold: boolean, hi = 0): React.ReactNode => (
    <div style={{ height: 68 * ui, borderTop: `1px solid ${t.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, background: hi > 0 ? t.hover : 'transparent', ...font(19 * ui, bold ? 700 : 400) }}>
      {label}
    </div>
  );
  return (
    <div
      style={{
        width: 354 * ui, background: t.modal, borderRadius: 18 * ui, overflow: 'hidden', ...style,
        boxShadow: mode === 'dark' ? `0 0 0 1px ${t.line}, 0 30px 80px rgba(0,0,0,0.7)` : '0 24px 70px rgba(0,0,0,0.25)',
      }}
    >
      <div style={{ padding: `${28 * ui}px ${30 * ui}px ${26 * ui}px`, textAlign: 'center' }}>
        <div style={{ ...font(19 * ui, 700), color: t.text }}>Save to drafts?</div>
        <div style={{ ...font(17 * ui), color: t.sub, marginTop: 14 * ui }}>Save to drafts to edit and post at a later time.</div>
      </div>
      <div style={{ transform: `scale(${1 - 0.03 * sp})` }}>{row('Save', t.text, true, Math.max(saveHover, sp))}</div>
      {row("Don't save", t.danger, false)}
      {row('Cancel', t.text, false)}
    </div>
  );
};

/**
 * Kepala halaman profil (nama, handle, avatar, tombol, tab). posts = isi di bawah tab;
 * tanpa posts → empty state `empty` (default "No threads yet").
 */
export const ThProfile: React.FC<{
  mode: ThreadsMode; ui: number; w: number;
  name: string; handle: string; avatar?: string; bio?: string;
  tab?: 'Threads' | 'Replies' | 'Media' | 'Reposts'; empty?: string; posts?: React.ReactNode; own?: boolean; emptyPad?: number;
}> = ({ mode, ui, w, name, handle, avatar, bio, tab = 'Threads', empty = 'No threads yet', posts, own = true, emptyPad = 80 }) => {
  const t = thTheme(mode);
  const tabs = ['Threads', 'Replies', 'Media', 'Reposts'] as const;
  return (
    <div style={{ width: w, color: t.text }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: `${30 * ui}px ${28 * ui}px 0` }}>
        <div style={{ flex: 1 }}>
          <div style={font(28 * ui, 700, { lineHeight: 1.15 })}>{name}</div>
          <div style={{ ...font(16 * ui), marginTop: 4 * ui }}>{handle}</div>
        </div>
        <ThAvatar mode={mode} size={92 * ui} src={avatar} />
      </div>
      {bio ? <div style={{ ...font(16 * ui), padding: `${16 * ui}px ${28 * ui}px 0` }}>{bio}</div> : null}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 * ui, padding: `${22 * ui}px ${28 * ui}px 0`, color: t.sub }}>
        <ChartNoAxesColumn size={22 * ui} color={t.text} strokeWidth={1.8} style={{ marginLeft: 'auto' }} />
      </div>
      <div style={{ padding: `${18 * ui}px ${28 * ui}px 0` }}>
        <ThButton mode={mode} ui={ui} label={own ? 'Edit profile' : 'Follow'} filled={!own} w={w - 56 * ui} />
      </div>
      <div style={{ display: 'flex', marginTop: 14 * ui, borderBottom: `1px solid ${t.line}` }}>
        {tabs.map((k) => (
          <div key={k} style={{ flex: 1, textAlign: 'center', padding: `${14 * ui}px 0`, ...font(16 * ui, 600), color: k === tab ? t.text : t.sub, borderBottom: k === tab ? `${1.5 * ui}px solid ${t.text}` : '1px solid transparent', marginBottom: -1 }}>
            {k}
          </div>
        ))}
      </div>
      {posts ?? (
        <div style={{ padding: `${emptyPad * ui}px 0`, textAlign: 'center', ...font(16 * ui), color: t.sub }}>{empty}</div>
      )}
    </div>
  );
};

/**
 * Seluruh halaman Threads web dalam satu jendela membulat: sidebar + kolom tengah.
 * column = isi kolom (feed/profil); header = judul kolom. Lebar kolom = colW (px dunia).
 */
export const ThreadsWindow: React.FC<{
  mode: ThreadsMode; ui: number; w: number; h: number; colW?: number; header?: string;
  active?: ThNavKey; children: React.ReactNode; scroll?: number; radius?: number; style?: React.CSSProperties; overlay?: React.ReactNode;
}> = ({ mode, ui, w, h, colW = 640, header = 'For you', active = 'home', children, scroll = 0, radius = 18, style, overlay }) => {
  const t = thTheme(mode);
  const side = 250;
  return (
    <div
      style={{
        position: 'relative', width: w, height: h, background: t.page, borderRadius: radius, overflow: 'hidden',
        boxShadow: mode === 'dark'
          ? '0 0 0 1px rgba(255,255,255,0.07), 0 40px 90px rgba(0,0,0,0.55)'
          : '0 0 0 1px rgba(40,39,35,0.06), 0 34px 70px rgba(40,39,35,0.20), 0 8px 18px rgba(40,39,35,0.10)',
        display: 'flex', ...style,
      }}
    >
      <ThSidebar mode={mode} ui={ui} active={active} w={side} />
      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
        <div style={{ width: colW, transform: `translateX(${-side * ui * 0.25}px)` }}>
          <ThColumnHeader mode={mode} ui={ui} title={header} w={colW} />
          <ThColumn mode={mode} ui={ui} w={colW} h={h}>
            <div style={{ transform: `translateY(${-scroll}px)` }}>{children}</div>
          </ThColumn>
        </div>
      </div>
      {overlay}
    </div>
  );
};

