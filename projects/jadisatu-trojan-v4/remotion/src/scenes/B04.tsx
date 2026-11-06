// Beat 4–5 · Produk + laporan: satu thread WhatsApp. Ketik → kirim → "tercatat" → kategori → dua kolom Pemasukan/Pengeluaran.
// Lalu jam bergulir ke 18.00, laporan harian masuk di thread yang sama, jari mengetuk link (dasbor lahir di B06).
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { beat, fr, wf, we, ws } from '../lib/time';
import { clamp, EASE, eo, pop, mix } from '../lib/anim';
import { Emoji, IE, Logo, MBlur } from '../ui/common';
import { WAPhone, Msg } from '../ui/wa';
import { StatusChip } from '../ui/portal';

export const T = () => {
  const tJual = wf('b04', 'jual'), tRibu1 = we('b04', 'ribu', 1), tBeli = wf('b04', 'beli'), tRibu2 = we('b04', 'ribu', 2);
  const send1 = tRibu1 + 3, send2 = tRibu2 + 3;
  return {
    tJadi: wf('b04', 'Jadisatu'), tChat: wf('b04', 'chat'), tJual, tRibu1, tBeli, tRibu2, send1, send2,
    rep1: send1 + 12, rep2: send2 + 12, tLang: wf('b04', 'langsung'), tPem: wf('b04', 'pemasukan'), tPeng: wf('b04', 'pengeluaran'),
    tTerus: wf('b05', 'Terus'), tLap: wf('b05', 'laporan'), tKirim: wf('b05', 'dikirim'), tWA: wf('b05', 'WhatsApp'),
  };
};
export const TAP = () => T().tWA + 2; // jari mengetuk link laporan

const typed = (f: number, txt: string, a: number, b: number) => txt.slice(0, Math.round(interpolate(f, [a, b], [0, txt.length], clamp)));
const Rec: React.FC<{ kind: 'in' | 'out'; label: string; amt: string }> = ({ kind, label, amt }) => (
  <div>
    <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><IE n="check_mark_button" size={19} />Tercatat</div>
    <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
      <StatusChip tone={kind === 'in' ? 'ok' : 'warn'}>{kind === 'in' ? 'Pemasukan' : 'Pengeluaran'}</StatusChip>
      <span style={{ fontSize: 15, color: '#54656F' }}>{label}</span>
    </div>
    <div style={{ marginTop: 3, fontWeight: 800, fontSize: 19 }} className="tabular">{amt}</div>
  </div>
);

export const B04: React.FC = () => {
  const f = useCurrentFrame();
  const { s } = beat('b04'); const t = T(); const tap = TAP();
  if (f < s - 6 || f > tap + 16) return null;
  const t1 = 'jual 12 risol 60rb', t2 = 'beli gas 25rb';
  // composer
  let txt = '', sendPress = 0;
  if (f >= t.tJual - 3 && f < t.send1) txt = typed(f, t1, t.tJual - 3, t.tRibu1);
  if (f >= t.tBeli - 4 && f < t.send2) txt = typed(f, t2, t.tBeli - 4, t.tRibu2);
  if (f >= t.send1 - 2 && f < t.send1 + 2) sendPress = 1; if (f >= t.send2 - 2 && f < t.send2 + 2) sendPress = 1;
  const caret = f >= t.tChat - 6 && txt.length >= 0 && Math.floor(f / 8) % 2 === 0 && f < t.tTerus;
  // jam: 09.41 → 18.00 bergulir
  const clockP = interpolate(f, [t.tTerus + 2, t.tTerus + 26], [0, 1], { ...clamp, easing: EASE });
  const mins = Math.round(mix(9 * 60 + 41, 18 * 60, clockP));
  const clock = `${String(Math.floor(mins / 60)).padStart(2, '0')}.${String(mins % 60).padStart(2, '0')}`;
  const msgs: Msg[] = [
    { id: 'o1', side: 'out', time: '09.41', a: pop(f, t.send1, 30, 15, 210), body: <>{t1}</> },
    { id: 'r1', side: 'in', time: '09.41', a: pop(f, t.rep1, 30, 15, 210), body: <Rec kind="in" label="Penjualan" amt="Rp60.000" /> },
    { id: 'o2', side: 'out', time: '09.52', a: pop(f, t.send2, 30, 15, 210), body: <>{t2}</> },
    { id: 'r2', side: 'in', time: '09.52', a: pop(f, t.rep2, 30, 15, 210), body: <Rec kind="out" label="Bahan & gas" amt="Rp25.000" /> },
    { id: 'rep', side: 'in', time: '18.00', a: pop(f, t.tLap - 2, 30, 15, 200), w: 330, body: (
      <div style={{ fontSize: 16 }}>
        <div style={{ fontWeight: 800, marginBottom: 4 }}>Laporan hari ini <IE n="bar_chart" size={18} /></div>
        <div>Penjualan <b className="tabular">Rp1.240.000</b> (86 transaksi)</div>
        <div>Pengeluaran <b className="tabular">Rp310.000</b></div>
        <div>Laba berjalan <b className="tabular">Rp930.000</b></div>
        <div style={{ marginTop: 6, color: '#027EB5', textDecoration: 'underline', background: f >= tap - 1 ? 'rgba(2,126,181,.14)' : undefined, borderRadius: 4 }}>jadisatu.cloud/r/k7Qm2</div>
      </div>) },
  ];
  // kamera: phone ke kiri saat kolom muncul, kembali ke tengah di beat 5
  const side = interpolate(f, [t.tLang - 6, t.tLang + 8, t.tTerus - 4, t.tTerus + 8], [0, 1, 1, 0], { ...clamp, easing: EASE });
  const px = mix(960, 520, side);
  // kamera fokus (BK08): zoom ke thread saat mengetik dan saat laporan masuk
  const zk = (x: number) => interpolate(x, [t.tChat - 4, t.tChat + 8, t.tLang - 8, t.tLang + 6, t.tLap - 8, t.tLap + 6], [0, 1, 1, 0, 0, 1], { ...clamp, easing: EASE });
  const z = zk(f);
  const sc = mix(0.98, 1.5, z), top = mix(40, -440, z);
  const vz = Math.abs(zk(f + 0.5) - zk(f - 0.5)) * 14;
  // scroll thread agar laporan terlihat penuh
  const scrollY = 0;
  // masuk: lanjutan push-through
  const enter = interpolate(f, [s - 6, s + 6], [1.35, 1], { ...clamp, easing: EASE });
  const enterBlur = interpolate(f, [s - 6, s + 6], [10, 0], clamp);
  // logo di kiri saat "Jadisatu Workspace"
  const logoA = eo(f, t.tJadi - 2, 10) * (1 - eo(f, t.tChat, 10));
  // kolom kanan
  const colA = eo(f, t.tLang - 2, 12) * (1 - eo(f, t.tTerus - 4, 10));
  const fly = (t0: number) => interpolate(f, [t0 - 6, t0 + 8], [0, 1], { ...clamp, easing: EASE });
  // ketuk link
  const fingerA = eo(f, tap - 14, 10);
  const press = f >= tap && f < tap + 6 ? 1 - (f - tap) / 6 : 0;
  // keluar: hilang ke dasbor (dilanjut B06)
  const out = eo(f, tap + 4, 10);
  return (
    <AbsoluteFill style={{ opacity: 1 - out }}>
      <MBlur y={enterBlur + vz} style={{ position: 'absolute', left: px - 215, top, transform: `scale(${sc * enter * (1 + out * 0.3)})`, transformOrigin: '50% 0%' }}>
        <WAPhone msgs={msgs} typed={txt} caret={caret} clock={clock} scrollY={scrollY} sendPress={sendPress} />
      </MBlur>
      {/* jam 18.00 (laporan otomatis) */}
      {(() => { const a = pop(f, t.tTerus + 2) * (1 - eo(f, t.tLap + 20, 10)); if (a <= 0) return null; return (
        <div style={{ position: 'absolute', left: px + 300 * mix(1, 1.5, z), top: 200, transform: `scale(${a})`, transformOrigin: '0 50%', display: 'flex', alignItems: 'center', gap: 16, background: '#fff', borderRadius: 26, padding: '16px 28px', boxShadow: '0 24px 50px rgba(30,50,110,.16)' }}>
          <Emoji n="alarm_clock" size={56} /><span className="tabular" style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.02em' }}>{clock}</span>
        </div>); })()}
      {/* Jadisatu Workspace */}
      {logoA > 0 && (
        <div style={{ position: 'absolute', left: 170, top: 400, opacity: logoA, transform: `translateX(${(1 - logoA) * -40}px)` }}>
          <Logo scale={2.6} />
          <div style={{ marginTop: 14, fontSize: 40, fontWeight: 700, color: '#2563EB', letterSpacing: '-0.02em', paddingLeft: 6 }}>Workspace</div>
        </div>
      )}
      {/* dua kolom */}
      {colA > 0 && (
        <div style={{ position: 'absolute', left: 860, top: 330, display: 'flex', gap: 32, opacity: colA, transform: `translateX(${(1 - colA) * 80}px)` }}>
          {([['Pemasukan', 'in', t.tPem, 'Jual 12 risol', 'Rp60.000'], ['Pengeluaran', 'out', t.tPeng, 'Beli gas', 'Rp25.000']] as const).map(([title, k, t0, row, amt]) => {
            const p = fly(t0);
            const land = pop(f, t0 + 8, 30, 14, 220);
            return (
              <div key={title} className="card" style={{ width: 470, padding: 30, boxShadow: '0 30px 60px rgba(30,50,110,.12)', borderColor: f >= t0 + 6 && f < t0 + 20 ? (k === 'in' ? '#A6E3C1' : '#F5D49A') : undefined }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 40, height: 40, borderRadius: 12, display: 'grid', placeItems: 'center', background: k === 'in' ? '#ECFDF3' : '#FFFAEB' }}>{k === 'in' ? <ArrowDownLeft color="#067647" /> : <ArrowUpRight color="#B54708" />}</span>
                  <span className="font-display" style={{ fontSize: 32, fontWeight: 600 }}>{title}</span>
                </div>
                <div style={{ marginTop: 22, height: 84, position: 'relative' }}>
                  {p > 0 && (
                    <div style={{ position: 'absolute', inset: 0, borderRadius: 14, background: '#F4F5F7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px',
                      transform: `translate(${(1 - p) * -380}px, ${(1 - p) * (k === 'in' ? 220 : 330)}px) scale(${0.7 + 0.3 * land})`, opacity: Math.min(1, p * 2) }}>
                      <span style={{ fontSize: 24, fontWeight: 600 }}>{row}</span><span className="tabular" style={{ fontSize: 27, fontWeight: 800, color: k === 'in' ? '#067647' : '#B54708' }}>{amt}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* jari mengetuk link */}
      {fingerA > 0 && (
        <div style={{ position: 'absolute', left: px - 215 * sc + 121 * sc - 44, top: top + 740 * sc - 8 + (1 - fingerA) * 160, opacity: fingerA * (1 - out), transform: `scale(${1 - 0.12 * press})` }}>
          {press > 0 && <div style={{ position: 'absolute', left: 6, top: -6, width: 60, height: 60, borderRadius: 99, background: `rgba(2,126,181,${0.25 * press})` }} />}
          <Emoji n="backhand_index_pointing_up" size={120} />
        </div>
      )}
    </AbsoluteFill>
  );
};
