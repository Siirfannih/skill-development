// GitHub web mode gelap, dibangun ulang sebagai kode (Lantai D20). Acuan: screenshot publik
// github.com/Siirfannih/Jadisatulight (colorScheme dark, Playwright) + assets/ref_ui/github_*.png.
// Ikon: lucide-react (padanan Octicons), logo: simple-icons. Komponen murni: animasi lewat props per frame.
import React from 'react';
import { staticFile, Img } from 'remotion';
import {
  Code, CircleDot, GitPullRequest, CirclePlay, Table2, Shield, ChartLine, Settings, GitBranch, Tag, Search,
  Folder, File, Star, Eye, GitFork, BookOpen, ChevronDown, Bell, Plus, Lock, Menu, Check, Pin, BookMarked,
} from 'lucide-react';
import { Logo } from '../engine/Logo';
import { FONT } from '../engine/theme';

/** Token GitHub Primer (dark default). */
export const GH = {
  header: '#010409', canvas: '#0D1117', inset: '#151B23', border: '#3D444D', borderMuted: '#2A313C',
  text: '#F0F6FC', muted: '#9198A1', link: '#4493F8', btn: '#212830', btnBorder: '#3D444D',
  green: '#238636', greenHover: '#2EA043', greenText: '#FFFFFF', success: '#3FB950', accentLine: '#F78166',
};

const f = (px: number, weight = 400, extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: FONT.inter, fontSize: px, fontWeight: weight, lineHeight: 1.5, color: GH.text, ...extra,
});

const Badge: React.FC<{ ui: number; label: string }> = ({ ui, label }) => (
  <span style={{ ...f(12 * ui, 500, { color: GH.muted, lineHeight: 1 }), border: `1px solid ${GH.border}`, borderRadius: 999, padding: `${4 * ui}px ${8 * ui}px` }}>{label}</span>
);

const Btn: React.FC<{ ui: number; children: React.ReactNode; green?: boolean; hover?: number; press?: number; style?: React.CSSProperties }> = ({ ui, children, green, hover = 0, press = 0, style }) => {
  const p = Math.sin(Math.PI * Math.min(1, Math.max(0, press)));
  return (
    <div
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6 * ui, height: 32 * ui, padding: `0 ${12 * ui}px`, borderRadius: 6 * ui,
        background: green ? (hover > 0 || p > 0 ? GH.greenHover : GH.green) : GH.btn, border: `1px solid ${green ? 'rgba(240,246,252,0.1)' : GH.btnBorder}`,
        ...f(14 * ui, 500, { color: green ? GH.greenText : GH.text, lineHeight: 1 }), boxSizing: 'border-box', transform: `scale(${1 - 0.05 * p})`,
        boxShadow: hover > 0 ? `0 0 0 ${3 * ui * hover}px rgba(46,160,67,0.35)` : undefined, flex: 'none', ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Bilah atas (logo, breadcrumb owner / repo, cari, ikon, avatar) + tab repo. */
export const GhHeader: React.FC<{ ui: number; w: number; owner: string; repo?: string; avatar?: string; tabs?: boolean; title?: string }> = ({
  ui, w, owner, repo, avatar, tabs = true, title,
}) => {
  const TABS = [
    ['Code', Code], ['Issues', CircleDot], ['Pull requests', GitPullRequest], ['Actions', CirclePlay],
    ['Projects', Table2], ['Security', Shield], ['Insights', ChartLine], ['Settings', Settings],
  ] as const;
  return (
    <div style={{ width: w, background: GH.header, borderBottom: `1px solid ${GH.border}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 * ui, height: 64 * ui, padding: `0 ${18 * ui}px` }}>
        <div style={{ width: 32 * ui, height: 32 * ui, border: `1px solid ${GH.border}`, borderRadius: 6 * ui, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Menu size={16 * ui} color={GH.muted} />
        </div>
        <Logo name="github" size={32 * ui} color={GH.text} />
        <span style={f(15 * ui, 600)}>
          {owner}
          {repo || title ? <span style={{ color: GH.muted, fontWeight: 400 }}>&nbsp;/&nbsp;</span> : null}
          {repo ?? title}
        </span>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 * ui, width: 280 * ui, height: 32 * ui, border: `1px solid ${GH.border}`, borderRadius: 6 * ui, padding: `0 ${10 * ui}px`, boxSizing: 'border-box' }}>
          <Search size={16 * ui} color={GH.muted} />
          <span style={f(14 * ui, 400, { color: GH.muted })}>Type / to search</span>
        </div>
        {[Plus, CircleDot, GitPullRequest, Bell].map((I, k) => (
          <div key={k} style={{ width: 32 * ui, height: 32 * ui, border: `1px solid ${GH.border}`, borderRadius: 6 * ui, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <I size={16 * ui} color={GH.muted} />
          </div>
        ))}
        <div style={{ width: 32 * ui, height: 32 * ui, borderRadius: '50%', overflow: 'hidden', background: '#30363D' }}>
          {avatar ? <Img src={staticFile(avatar)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
        </div>
      </div>
      {tabs ? (
        <div style={{ display: 'flex', gap: 4 * ui, padding: `0 ${16 * ui}px`, height: 48 * ui, alignItems: 'stretch' }}>
          {TABS.map(([label, I], k) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 * ui, padding: `0 ${8 * ui}px`, borderBottom: k === 0 ? `${2 * ui}px solid ${GH.accentLine}` : '2px solid transparent', ...f(14 * ui, k === 0 ? 600 : 400) }}>
              <I size={16 * ui} color={GH.muted} />
              {label}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

/** Avatar kecil (gambar di public/ atau lingkaran kosong). */
const Av: React.FC<{ ui: number; size: number; src?: string }> = ({ ui, size, src }) => (
  <div style={{ width: size * ui, height: size * ui, borderRadius: '50%', overflow: 'hidden', background: '#30363D', flex: 'none' }}>
    {src ? <Img src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
  </div>
);

export type GhFile = { name: string; dir?: boolean; msg?: string; when?: string };
export const GH_DEFAULT_FILES: GhFile[] = [
  { name: 'src', dir: true }, { name: 'scripts', dir: true }, { name: '.gitignore' }, { name: 'package.json' },
  { name: 'tsconfig.json' },
];

/**
 * Halaman repo (tab Code). readme='add' = kotak empty state "Add a README" (repo tanpa README).
 *  releasesHi 0..1 = sorot "No releases published" di sidebar · addHover / addPress = tombol hijau "Add a README"
 *  compact = tanpa bilah atas global (untuk kartu tumpukan B20)
 */
export const GhRepoPage: React.FC<{
  ui: number; w: number; h: number; owner: string; repo: string; visibility?: 'Public' | 'Private';
  avatar?: string; files?: GhFile[]; commitMsg?: string; when?: string; readme?: 'add' | 'none';
  releasesHi?: number; hiColor?: string; addHover?: number; addPress?: number; header?: boolean; style?: React.CSSProperties;
}> = ({
  ui, w, h, owner, repo, visibility = 'Private', avatar, files = GH_DEFAULT_FILES, commitMsg = 'Initial commit', when = 'last month',
  readme = 'add', releasesHi = 0, hiColor = '#6F8DFF', addHover = 0, addPress = 0, header = true, style,
}) => {
  const pad = 32 * ui;
  const side = 296 * ui;
  const mainW = w - pad * 2 - side - 24 * ui;
  const row = (fi: GhFile, k: number) => (
    <div key={k} style={{ display: 'flex', alignItems: 'center', height: 40 * ui, padding: `0 ${16 * ui}px`, borderTop: `1px solid ${GH.borderMuted}`, gap: 10 * ui }}>
      {fi.dir ? <Folder size={16 * ui} color={GH.muted} fill={GH.muted} /> : <File size={16 * ui} color={GH.muted} />}
      <span style={{ ...f(14 * ui), width: mainW * 0.34 }}>{fi.name}</span>
      <span style={{ ...f(14 * ui, 400, { color: GH.muted }), flex: 1 }}>{fi.msg ?? commitMsg}</span>
      <span style={f(14 * ui, 400, { color: GH.muted })}>{fi.when ?? when}</span>
    </div>
  );
  return (
    <div style={{ width: w, height: h, background: GH.canvas, overflow: 'hidden', position: 'relative', ...style }}>
      {header ? <GhHeader ui={ui} w={w} owner={owner} repo={repo} avatar={avatar} /> : null}
      <div style={{ padding: `${20 * ui}px ${pad}px 0` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 * ui, paddingBottom: 16 * ui, borderBottom: `1px solid ${GH.borderMuted}` }}>
          <Av ui={ui} size={26} src={avatar} />
          <span style={f(22 * ui, 600)}>{repo}</span>
          <Badge ui={ui} label={visibility} />
          <div style={{ flex: 1 }} />
          <Btn ui={ui}><Pin size={14 * ui} color={GH.muted} />Pin</Btn>
          <Btn ui={ui}><Eye size={14 * ui} color={GH.muted} />Unwatch<span style={{ ...f(12 * ui, 600), background: '#2F3742', borderRadius: 999, padding: `0 ${6 * ui}px` }}>1</span></Btn>
          <Btn ui={ui}><GitFork size={14 * ui} color={GH.muted} />Fork<span style={{ ...f(12 * ui, 600), background: '#2F3742', borderRadius: 999, padding: `0 ${6 * ui}px` }}>0</span></Btn>
          <Btn ui={ui}><Star size={14 * ui} color={GH.muted} />Star<span style={{ ...f(12 * ui, 600), background: '#2F3742', borderRadius: 999, padding: `0 ${6 * ui}px` }}>0</span></Btn>
        </div>
        <div style={{ display: 'flex', gap: 24 * ui, marginTop: 20 * ui }}>
          <div style={{ width: mainW, flex: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 * ui, marginBottom: 14 * ui }}>
              <Btn ui={ui}><GitBranch size={15 * ui} color={GH.muted} />main<ChevronDown size={14 * ui} color={GH.muted} /></Btn>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 * ui, ...f(14 * ui, 600) }}><GitBranch size={15 * ui} color={GH.muted} />1 <span style={{ fontWeight: 400, color: GH.muted }}>Branch</span></span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 * ui, ...f(14 * ui, 600) }}><Tag size={15 * ui} color={GH.muted} />0 <span style={{ fontWeight: 400, color: GH.muted }}>Tags</span></span>
              <div style={{ flex: 1 }} />
              <Btn ui={ui} green><Code size={15 * ui} color="#fff" />Code<ChevronDown size={14 * ui} color="#fff" /></Btn>
            </div>
            <div style={{ border: `1px solid ${GH.border}`, borderRadius: 6 * ui, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 * ui, height: 52 * ui, padding: `0 ${16 * ui}px`, background: GH.inset }}>
                <Av ui={ui} size={22} src={avatar} />
                <span style={f(14 * ui, 600)}>{owner}</span>
                <span style={{ ...f(14 * ui, 400, { color: GH.muted }), flex: 1 }}>{commitMsg}</span>
                <span style={f(14 * ui, 400, { color: GH.muted })}>{when}</span>
              </div>
              {files.map(row)}
            </div>
            {readme === 'add' ? (
              <div style={{ marginTop: 24 * ui, border: `1px solid ${GH.border}`, borderRadius: 6 * ui, padding: `${22 * ui}px ${24 * ui}px`, display: 'flex', alignItems: 'center', gap: 20 * ui }}>
                <BookOpen size={26 * ui} color={GH.muted} style={{ flex: 'none' }} />
                <span style={{ ...f(15 * ui, 400, { color: GH.text }), flex: 1 }}>Help people interested in this repository understand your project by adding a README.</span>
                <Btn ui={ui * 1.08} green hover={addHover} press={addPress}>Add a README</Btn>
              </div>
            ) : null}
          </div>
          <div style={{ width: side, flex: 'none' }}>
            <div style={f(16 * ui, 600)}>About</div>
            <div style={{ ...f(14 * ui, 400, { color: GH.muted, fontStyle: 'italic' }), marginTop: 10 * ui }}>No description, website, or topics provided.</div>
            {[[BookMarked, 'Activity'], [Star, '0 stars'], [Eye, '1 watching'], [GitFork, '0 forks']].map(([I, l], k) => {
              const Icon = I as typeof Star;
              return (
                <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8 * ui, marginTop: 8 * ui, ...f(14 * ui, 400, { color: GH.muted }) }}>
                  <Icon size={15 * ui} color={GH.muted} />{l as string}
                </div>
              );
            })}
            <div style={{ height: 1, background: GH.borderMuted, margin: `${20 * ui}px 0` }} />
            <div
              style={{
                position: 'relative', padding: `${10 * ui}px ${12 * ui}px`, margin: `-${10 * ui}px -${12 * ui}px`, borderRadius: 8 * ui,
                boxShadow: releasesHi > 0 ? `0 0 0 ${2.5 * ui}px ${hiColor}` : undefined, background: releasesHi > 0 ? `rgba(111,141,255,${0.14 * releasesHi})` : undefined,
                opacity: 1,
              }}
            >
              <div style={f(16 * ui, 600)}>Releases</div>
              <div style={{ ...f(14 * ui, 400, { color: releasesHi > 0.5 ? GH.text : GH.muted }), marginTop: 6 * ui }}>No releases published</div>
              <div style={{ ...f(14 * ui, 400, { color: GH.link }), marginTop: 2 * ui }}>Create a new release</div>
            </div>
            <div style={{ height: 1, background: GH.borderMuted, margin: `${20 * ui}px 0` }} />
            <div style={f(16 * ui, 600)}>Packages</div>
            <div style={{ ...f(14 * ui, 400, { color: GH.muted }), marginTop: 6 * ui }}>No packages published</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Form "Create a new repository". name = teks yang sudah diketik (pemanggil memotong per frame);
 * available = tampilkan centang "<name> is available."; createPress / createHover 0..1.
 */
export const GhNewRepo: React.FC<{
  ui: number; w: number; h: number; owner: string; name: string; caret?: boolean; available?: boolean; avatar?: string;
  createPress?: number; createHover?: number; style?: React.CSSProperties;
}> = ({ ui, w, h, owner, name, caret, available, avatar, createPress = 0, createHover = 0, style }) => {
  const colW = 760 * ui;
  const label = (t: string, req = false) => (
    <div style={{ ...f(14 * ui, 600), marginBottom: 6 * ui }}>
      {t}{req ? <span style={{ color: '#F85149' }}> *</span> : null}
    </div>
  );
  const input = (child: React.ReactNode, wpx: number, focus = false) => (
    <div style={{ width: wpx, height: 34 * ui, border: `1px solid ${focus ? GH.link : GH.border}`, boxShadow: focus ? `0 0 0 ${1 * ui}px ${GH.link}` : undefined, borderRadius: 6 * ui, background: GH.canvas, display: 'flex', alignItems: 'center', padding: `0 ${10 * ui}px`, boxSizing: 'border-box', ...f(14 * ui) }}>
      {child}
    </div>
  );
  const radio = (on: boolean, Icon: typeof Lock, title: string, sub: string) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 * ui, marginTop: 12 * ui }}>
      <div style={{ width: 14 * ui, height: 14 * ui, borderRadius: '50%', border: `${on ? 4 * ui : 1}px solid ${on ? GH.link : GH.muted}`, boxSizing: 'border-box', marginTop: 4 * ui }} />
      <Icon size={24 * ui} color={GH.muted} />
      <div>
        <div style={f(14 * ui, 600)}>{title}</div>
        <div style={f(12 * ui, 400, { color: GH.muted })}>{sub}</div>
      </div>
    </div>
  );
  const hr = <div style={{ height: 1, background: GH.borderMuted, margin: `${18 * ui}px 0` }} />;
  return (
    <div style={{ width: w, height: h, background: GH.canvas, overflow: 'hidden', position: 'relative', ...style }}>
      <GhHeader ui={ui} w={w} owner="" title="New repository" avatar={avatar} tabs={false} />
      <div style={{ width: colW, margin: '0 auto', paddingTop: 30 * ui }}>
        <div style={f(24 * ui, 600)}>Create a new repository</div>
        <div style={{ ...f(14 * ui, 400, { color: GH.muted }), marginTop: 4 * ui }}>
          Repositories contain a project&apos;s files and version history. Have a project elsewhere? <span style={{ color: GH.link }}>Import a repository.</span>
        </div>
        {hr}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 * ui }}>
          <div>
            {label('Owner', true)}
            {input(<><Av ui={ui} size={20} src={avatar} /><span style={{ marginLeft: 8 * ui, flex: 1 }}>{owner}</span><ChevronDown size={14 * ui} color={GH.muted} /></>, 200 * ui)}
          </div>
          <div style={{ ...f(22 * ui, 400, { color: GH.muted }), paddingBottom: 2 * ui }}>/</div>
          <div>
            {label('Repository name', true)}
            {input(<>{name}{caret ? <span style={{ display: 'inline-block', width: 1.5 * ui, height: 18 * ui, background: GH.text, marginLeft: 1 }} /> : null}</>, 330 * ui, true)}
          </div>
        </div>
        <div style={{ height: 22 * ui, marginTop: 6 * ui, display: 'flex', alignItems: 'center', gap: 6 * ui, ...f(13 * ui, 400, { color: GH.success }), opacity: available ? 1 : 0 }}>
          <Check size={15 * ui} color={GH.success} />
          {name} is available.
        </div>
        <div style={{ ...f(14 * ui, 400, { color: GH.muted }), marginTop: 8 * ui }}>Great repository names are short and memorable.</div>
        <div style={{ marginTop: 16 * ui }}>
          <div style={{ ...f(14 * ui, 600), marginBottom: 6 * ui }}>Description <span style={{ color: GH.muted, fontWeight: 400 }}>(optional)</span></div>
          {input(null, colW)}
        </div>
        {hr}
        {radio(false, BookMarked, 'Public', 'Anyone on the internet can see this repository. You choose who can commit.')}
        {radio(true, Lock, 'Private', 'You choose who can see and commit to this repository.')}
        {hr}
        <div style={f(14 * ui, 600)}>Initialize this repository with:</div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 * ui, marginTop: 10 * ui }}>
          <div style={{ width: 14 * ui, height: 14 * ui, border: `1px solid ${GH.muted}`, borderRadius: 3 * ui, marginTop: 4 * ui }} />
          <div>
            <div style={f(14 * ui, 600)}>Add a README file</div>
            <div style={f(12 * ui, 400, { color: GH.muted })}>This is where you can write a long description for your project.</div>
          </div>
        </div>
        {hr}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Btn ui={ui * 1.1} green hover={createHover} press={createPress}>Create repository</Btn>
        </div>
      </div>
    </div>
  );
};

/** Bilah browser gelap tipis dengan URL (memberi nama repo asli saat halaman digulir). */
export const BrowserBar: React.FC<{ ui: number; w: number; url: string }> = ({ ui, w, url }) => (
  <div style={{ width: w, height: 44 * ui, background: '#1B1F24', display: 'flex', alignItems: 'center', gap: 8 * ui, padding: `0 ${14 * ui}px`, boxSizing: 'border-box', borderBottom: `1px solid ${GH.borderMuted}` }}>
    {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
      <div key={c} style={{ width: 12 * ui, height: 12 * ui, borderRadius: '50%', background: c, opacity: 0.85 }} />
    ))}
    <div style={{ marginLeft: 18 * ui, flex: 1, maxWidth: 640 * ui, height: 28 * ui, borderRadius: 8 * ui, background: '#0D1117', display: 'flex', alignItems: 'center', gap: 8 * ui, padding: `0 ${12 * ui}px`, ...f(13.5 * ui, 400, { color: GH.muted }) }}>
      <Lock size={12 * ui} color={GH.muted} />
      <span><span style={{ color: GH.text }}>github.com</span>{url}</span>
    </div>
  </div>
);

/**
 * Kartu repo ringkas untuk tumpukan B20: bilah atas (logo + owner / repo), judul + visibilitas,
 * 3 baris file di kiri, sidebar About + Releases ("No releases published", bisa disorot) di kanan.
 */
export const GhRepoCard: React.FC<{
  ui: number; w: number; h: number; owner: string; repo: string; visibility?: 'Public' | 'Private'; avatar?: string;
  when?: string; releasesHi?: number; hiColor?: string; style?: React.CSSProperties;
}> = ({ ui, w, h, owner, repo, visibility = 'Private', avatar, when = 'now', releasesHi = 0, hiColor = '#6F8DFF', style }) => {
  const pad = 26 * ui;
  const side = 300 * ui;
  const files: GhFile[] = [{ name: 'src', dir: true }, { name: 'package.json' }, { name: '.gitignore' }];
  return (
    <div style={{ width: w, height: h, background: GH.canvas, overflow: 'hidden', position: 'relative', borderRadius: 10 * ui, border: `1px solid ${GH.border}`, boxSizing: 'border-box', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 * ui, height: 56 * ui, padding: `0 ${pad}px`, background: GH.header, borderBottom: `1px solid ${GH.border}` }}>
        <Logo name="github" size={28 * ui} color={GH.text} />
        <span style={f(15 * ui, 600)}>{owner}<span style={{ color: GH.muted, fontWeight: 400 }}>&nbsp;/&nbsp;</span>{repo}</span>
      </div>
      <div style={{ display: 'flex', gap: 6 * ui, padding: `0 ${pad - 8 * ui}px`, height: 44 * ui, alignItems: 'stretch', background: GH.header, borderBottom: `1px solid ${GH.border}` }}>
        {([['Code', Code], ['Issues', CircleDot], ['Pull requests', GitPullRequest], ['Actions', CirclePlay]] as const).map(([label, I], k) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7 * ui, padding: `0 ${8 * ui}px`, borderBottom: k === 0 ? `${2 * ui}px solid ${GH.accentLine}` : '2px solid transparent', ...f(14 * ui, k === 0 ? 600 : 400) }}>
            <I size={15 * ui} color={GH.muted} />{label}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 * ui, padding: `${16 * ui}px ${pad}px` }}>
        <Av ui={ui} size={24} src={avatar} />
        <span style={f(22 * ui, 600, { whiteSpace: 'nowrap' })}>{repo}</span>
        <Badge ui={ui} label={visibility} />
      </div>
      <div style={{ display: 'flex', gap: 22 * ui, padding: `0 ${pad}px` }}>
        <div style={{ flex: 1, minWidth: 0, border: `1px solid ${GH.border}`, borderRadius: 6 * ui, overflow: 'hidden', alignSelf: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 * ui, height: 44 * ui, padding: `0 ${12 * ui}px`, background: GH.inset }}>
            <Av ui={ui} size={20} src={avatar} />
            <span style={f(13 * ui, 600)}>{owner}</span>
            <span style={{ ...f(13 * ui, 400, { color: GH.muted }), flex: 1 }}>Initial commit</span>
            <span style={f(13 * ui, 400, { color: GH.muted })}>{when}</span>
          </div>
          {files.map((fi, k) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', height: 36 * ui, padding: `0 ${12 * ui}px`, borderTop: `1px solid ${GH.borderMuted}`, gap: 8 * ui }}>
              {fi.dir ? <Folder size={15 * ui} color={GH.muted} fill={GH.muted} /> : <File size={15 * ui} color={GH.muted} />}
              <span style={f(13 * ui)}>{fi.name}</span>
            </div>
          ))}
        </div>
        <div style={{ width: side, flex: 'none' }}>
          <div style={f(16 * ui, 600)}>About</div>
          <div style={{ ...f(14 * ui, 400, { color: GH.muted, fontStyle: 'italic' }), marginTop: 6 * ui }}>No description, website, or topics provided.</div>
          <div style={{ height: 1, background: GH.borderMuted, margin: `${14 * ui}px 0 ${16 * ui}px` }} />
          <div
            style={{
              padding: `${10 * ui}px ${12 * ui}px`, margin: `-${10 * ui}px -${12 * ui}px`, borderRadius: 8 * ui,
              boxShadow: releasesHi > 0 ? `0 0 0 ${2.5 * ui}px ${hiColor}` : undefined, background: releasesHi > 0 ? `rgba(111,141,255,${0.16 * releasesHi})` : undefined,
            }}
          >
            <div style={f(17 * ui, 600)}>Releases</div>
            <div style={{ ...f(16 * ui, 400, { color: releasesHi > 0.5 ? GH.text : GH.muted }), marginTop: 4 * ui }}>No releases published</div>
          </div>
        </div>
      </div>
    </div>
  );
};
