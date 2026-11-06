// Disalin dari Siirfannih/jadisatu-partner apps/portal (components/dash.tsx, ui.tsx, Shell.tsx, workspace.tsx, pages/Ringkasan.tsx, Stok.tsx).
// Penyesuaian Remotion: Link/motion/router/session dibuang; animasi dikendalikan frame lewat prop `r` (0→1). Data = demo sintetis.
import React from 'react';
import { ArrowUpRight, ArrowDownRight, ChevronRight, ChevronsUpDown, LayoutGrid, ShoppingBag, Boxes, Wallet, Megaphone, Star, ReceiptText, Upload, Settings, Receipt, Check, Plus } from 'lucide-react';
import { Logo } from './common';

export const rp = (v: number) => 'Rp' + v.toLocaleString('id-ID');
export const NAV = [
  { label: 'Ringkasan', icon: LayoutGrid }, { label: 'Penjualan', icon: ShoppingBag }, { label: 'Stok', icon: Boxes },
  { label: 'Pesanan', icon: ReceiptText }, { label: 'Keuangan', icon: Wallet }, { label: 'Konten', icon: Megaphone },
  { label: 'Ulasan', icon: Star }, { label: 'Kirim data', icon: Upload }, { label: 'Pengaturan', icon: Settings },
];
const rise = (r = 1, y = 10): React.CSSProperties => ({ opacity: Math.min(1, r * 1.4), transform: `translateY(${(1 - r) * y}px)` });

export function Kpi({ icon: Icon, label, value, sub, change, changeLabel, tone, r = 1 }: {
  icon: React.ElementType; label: string; value: React.ReactNode; sub?: React.ReactNode; change?: number | null; changeLabel?: string; tone?: 'warn' | 'bad' | 'up'; r?: number;
}) {
  const color = tone === 'bad' ? 'text-bad' : tone === 'warn' ? 'text-warn' : tone === 'up' ? 'text-up' : 'text-ink';
  return (
    <div className="card p-4 min-w-0 min-h-[128px] h-full flex flex-col" style={rise(r)}>
      <div className="flex items-start gap-2 text-muted text-[13px] leading-tight min-h-[2.5em]">
        <Icon className="w-4 h-4 mt-px shrink-0" /><span className="font-medium flex-1">{label}</span>
      </div>
      <div className="mt-2.5"><p className={`text-[24px] font-semibold leading-tight tracking-[-0.01em] tabular truncate ${color}`}>{value}</p></div>
      <div className="mt-auto pt-2 flex items-start gap-1.5 text-[12.5px] text-muted min-h-[26px]">
        {change != null && (
          <span className={`inline-flex items-center font-semibold shrink-0 ${change > 0 ? 'text-up' : 'text-bad'}`}>
            {change > 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            {Math.abs(change).toLocaleString('id-ID', { maximumFractionDigits: 1 })}%
          </span>
        )}
        <span className="flex-1 leading-snug">{change != null ? changeLabel : sub}</span>
      </div>
    </div>
  );
}

export function Box({ title, toLabel = 'Lihat semua', children, className = '', style, r = 1, right }: {
  title: string; toLabel?: string; children: React.ReactNode; className?: string; style?: React.CSSProperties; r?: number; right?: React.ReactNode;
}) {
  return (
    <section className={`card p-5 flex flex-col min-h-0 min-w-0 ${className}`} style={{ ...rise(r), ...style }}>
      <div className="flex items-center justify-between gap-3 mb-3 min-h-[32px]">
        <h2 className="font-display font-semibold text-[16px] tracking-[-0.01em] truncate">{title}</h2>
        {right ?? <span className="text-[12.5px] font-semibold text-accent flex items-center shrink-0">{toLabel} <ChevronRight className="w-3.5 h-3.5" /></span>}
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </section>
  );
}

function niceMax(v: number) { const p = Math.pow(10, Math.floor(Math.log10(v))); for (const m of [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) if (m * p >= v) return m * p; return 10 * p; }
export function shortNum(v: number) { if (v >= 1_000_000) return `${+(v / 1e6).toFixed(1)}jt`; if (v >= 1_000) return `${+(v / 1e3).toFixed(0)}rb`; return `${Math.round(v)}`; }

/** Grafik batang overview (dash.tsx Overview): batang arsir, batang aktif gelap. `grow` 0→1 per batang. */
export function Overview({ points, active, grow = () => 1 }: { points: { label: string; value: number }[]; active?: number; grow?: (i: number) => number }) {
  const nice = niceMax(Math.max(...points.map((p) => p.value), 1));
  return (
    <div className="relative h-full flex flex-col">
      <div className="relative flex-1 min-h-0">
        {[0, 0.5, 1].map((f) => (
          <div key={f} className="absolute left-0 right-0 border-t border-dashed border-line" style={{ bottom: `${f * 100}%` }}>
            <span className="absolute -top-2 left-0 text-[10.5px] text-muted bg-white pr-1 tabular">{f === 0 ? '' : shortNum(nice * f)}</span>
          </div>
        ))}
        <div className="absolute inset-0 pl-9 flex items-end gap-1.5">
          {points.map((p, i) => (
            <div key={i} className="relative flex-1 h-full flex items-end">
              <span className={`w-full rounded-md ${i === active ? 'bg-ink' : 'bg-[#7C8CA8] bar-hatch'}`} style={{ height: `${Math.max(2, (p.value / nice) * 100 * grow(i))}%` }} />
            </div>
          ))}
        </div>
      </div>
      <div className="pl-9 flex gap-1.5 mt-2">
        {points.map((p, i) => <span key={i} className="flex-1 text-center text-[10.5px] text-muted tabular">{p.label}</span>)}
      </div>
    </div>
  );
}

export function StatusChip({ tone, children }: { tone: 'ok' | 'warn' | 'bad' | 'info' | 'mute'; children: React.ReactNode }) {
  const c = { ok: 'bg-[#ECFDF3] text-up', warn: 'bg-[#FFFAEB] text-warn', bad: 'bg-[#FEF3F2] text-bad', info: 'bg-[#EFF4FF] text-accent', mute: 'bg-stage text-muted' }[tone];
  return <span className={`inline-flex items-center gap-1 text-[12px] font-medium px-2 py-0.5 rounded-md ${c}`}>{children}</span>;
}

const initials = (name = '') => name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('');
export function Switcher({ name, sub }: { name: string; sub: string }) {
  return (
    <div className="w-full flex items-center gap-2.5 rounded-xl border border-line bg-white px-2.5 min-h-[52px]">
      <span className="w-8 h-8 rounded-lg bg-stage text-ink text-[12.5px] font-semibold flex items-center justify-center shrink-0">{initials(name)}</span>
      <span className="flex-1 min-w-0"><span className="block text-[13.5px] font-semibold truncate">{name}</span><span className="block text-[12px] text-muted truncate">{sub}</span></span>
      <ChevronsUpDown className="w-4 h-4 text-muted shrink-0" />
    </div>
  );
}
/** Daftar pilihan (workspace.tsx listbox), untuk cabang. */
export function SwitchList({ items, activeIdx, appear = () => 1, addPress = 0, label = 'Cabang', addLabel = 'Tambah cabang' }: {
  items: { name: string; sub: string }[]; activeIdx: number; appear?: (i: number) => number; addPress?: number; label?: string; addLabel?: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-white shadow-xl p-1.5">
      <p className="px-2.5 pt-1.5 pb-1 text-[12px] text-muted">{label}</p>
      {items.map((m, i) => {
        const a = appear(i); if (a <= 0) return null;
        return (
          <div key={i} className="w-full flex items-center gap-2.5 px-2.5 rounded-lg overflow-hidden" style={{ height: 44 * Math.min(1, a * 1.2), opacity: Math.min(1, a), transform: `scale(${0.92 + 0.08 * a})` }}>
            <span className="w-7 h-7 rounded-md bg-stage text-[11.5px] font-semibold flex items-center justify-center shrink-0">{initials(m.name)}</span>
            <span className="flex-1 min-w-0"><span className="block text-[13.5px] font-medium truncate">{m.name}</span><span className="block text-[11.5px] text-muted truncate">{m.sub}</span></span>
            {i === activeIdx && <Check className="w-4 h-4 text-accent shrink-0" />}
          </div>
        );
      })}
      <div className="h-px bg-line my-1.5" />
      <div className="w-full flex items-center gap-2.5 px-2.5 min-h-[44px] rounded-lg text-[13.5px] font-medium" style={{ background: addPress > 0 ? `rgba(244,245,247,${addPress})` : undefined }}>
        <span className="w-7 h-7 rounded-md border border-dashed border-line flex items-center justify-center shrink-0"><Plus className="w-4 h-4" /></span>{addLabel}
      </div>
    </div>
  );
}

export function Sidebar({ r = 1, client = 'Risol Bu Sari', sub = 'Makanan & minuman', activeIdx = 0 }: { r?: number; client?: string; sub?: string; activeIdx?: number }) {
  return (
    <aside className="absolute inset-y-0 left-0 w-[248px] bg-white border-r border-line flex flex-col p-4 gap-4" style={{ opacity: Math.min(1, r * 1.5), transform: `translateX(${(1 - r) * -40}px)` }}>
      <div className="px-2 pt-2"><Logo /></div>
      <Switcher name={client} sub={sub} />
      <nav className="grid gap-0.5">
        {NAV.map(({ label, icon: Icon }, i) => (
          <div key={label} className={`flex items-center gap-3 min-h-[38px] px-3 rounded-xl text-[14px] ${i === activeIdx ? 'bg-[#EFF4FF] text-accent font-semibold' : 'text-[#475467]'}`}><Icon className="w-[18px] h-[18px]" />{label}</div>
        ))}
      </nav>
    </aside>
  );
}

export function PageHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5">
      <div><h1 className="font-display font-bold text-[26px] tracking-[-0.02em] leading-tight">{title}</h1>{sub && <p className="text-muted mt-1 text-[14px]">{sub}</p>}</div>
    </div>
  );
}

/** Ringkasan FnB (Ringkasan.tsx) dengan data demo sintetis. stage: fungsi 0→1 per bagian (BK07: kerangka→sidebar→KPI→grafik→daftar). */
export const DEMO_DAYS = [
  { label: 'Sen', value: 980000 }, { label: 'Sel', value: 1120000 }, { label: 'Rab', value: 860000 }, { label: 'Kam', value: 1310000 },
  { label: 'Jum', value: 1450000 }, { label: 'Sab', value: 1680000 }, { label: 'Min', value: 1240000 },
];
export function Ringkasan({ stage, client = 'Risol Bu Sari', title = 'Ringkasan', badge }: { stage: (k: string) => number; client?: string; title?: string; badge?: React.ReactNode }) {
  const top = [['Risol mayo', 64], ['Risol ragout', 41], ['Pastel isi', 28], ['Es teh manis', 25]] as const;
  return (
    <div className="absolute inset-0 bg-canvas overflow-hidden" style={{ opacity: Math.min(1, stage('frame') * 2) }}>
      <Sidebar r={stage('side')} client={client} />
      <main className="absolute top-0 bottom-0 right-0 left-[248px] px-8 py-7">
        <div style={{ opacity: stage('head'), transform: `translateY(${(1 - stage('head')) * 8}px)` }} className="flex items-start justify-between">
          <PageHead title={title} sub="Hari ini, Jumat 13 November" />{badge}
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Kpi r={stage('k1')} icon={Wallet} label="Penjualan hari ini" value={rp(1240000)} change={8.2} changeLabel="vs Jumat lalu" />
          <Kpi r={stage('k2')} icon={Receipt} label="Transaksi hari ini" value="86" sub={`${rp(14400)}/struk`} />
          <Kpi r={stage('k3')} icon={Wallet} label="Pengeluaran hari ini" value={rp(310000)} sub="gas, kulit, minyak" />
          <Kpi r={stage('k4')} icon={Boxes} label="Perlu restock" value="2" tone="bad" sub="stok lain aman" />
        </div>
        <div className="grid grid-cols-12 gap-4 mt-4">
          <Box r={stage('chart')} title="Penjualan" className="col-span-8 h-[300px]" right={<span className="inline-flex rounded-xl border border-line bg-white p-0.5"><span className="px-2.5 min-h-[30px] rounded-[9px] text-[12.5px] font-semibold bg-ink text-white flex items-center">7 hari</span><span className="px-2.5 min-h-[30px] text-[12.5px] font-semibold text-muted flex items-center">30 hari</span></span>}>
            <Overview points={DEMO_DAYS} active={4} grow={(i) => Math.max(0, Math.min(1, stage('chart') * 1.6 - i * 0.08))} />
          </Box>
          <Box r={stage('list')} title="Menu terlaris 7 hari" toLabel="Detail" className="col-span-4 h-[300px]">
            <div className="grid">
              {top.map(([n, q], i) => (
                <div key={n} className="flex items-center gap-3 py-2 border-b border-line last:border-0 min-h-[44px]" style={{ opacity: Math.max(0, Math.min(1, stage('list') * 2 - i * 0.25)) }}>
                  <span className="w-6 h-6 rounded-md bg-stage text-[12px] font-semibold flex items-center justify-center">{i + 1}</span>
                  <span className="flex-1 text-[14px] font-medium">{n}</span><span className="text-[13.5px] tabular text-muted">{q} terjual</span>
                </div>
              ))}
            </div>
          </Box>
        </div>
      </main>
    </div>
  );
}
