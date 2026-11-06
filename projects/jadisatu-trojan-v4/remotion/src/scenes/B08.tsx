// Beat 8 · Jasa kreatif: satu usaha contoh fiktif "Risol Bu Sari". Foto/tile melayang (ref 10–13) → carousel platform ala 09
// → peragaan: Instagram (grid terisi), website (section tersusun), Google Bisnis (jam diubah, foto, update), Workspace "siap pakai".
// Batas kejujuran: tanpa angka hasil, tanpa bintang/jumlah ulasan, tanpa follower.
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { ChevronLeft, ChevronRight, Globe, Lock, Search, MapPin, Clock, Camera, PenLine, Phone, Navigation, Grid3x3, Check } from 'lucide-react';
import { beat, wf } from '../lib/time';
import { clamp, EASE, eo, pop, mix } from '../lib/anim';
import { Brand, Cursor, Emoji, GOOGLE, IG, Logo, MBlur, WA } from '../ui/common';
import { Ringkasan, StatusChip } from '../ui/portal';
import { whip } from '../ui/trans';

const FOOD = ['dumpling', 'hot_beverage', 'bread', 'bento_box', 'croissant', 'cookie', 'rice_ball', 'pot_of_food', 'shortcake', 'fried_shrimp'];
const GRAD = ['#FFE7C7,#FFC98F', '#E3ECFF,#BFD2FF', '#FDE2E4,#F9B9C0', '#E2F6EA,#B5E6C9', '#FFF1C9,#FFDD7A', '#EDE4FF,#CDB8FF'];
const Tile: React.FC<{ i: number; size: number; r?: number }> = ({ i, size, r = 0.22 }) => (
  <div style={{ width: size, height: size, borderRadius: size * r, background: `linear-gradient(150deg,${GRAD[i % GRAD.length]})`, display: 'grid', placeItems: 'center', boxShadow: '0 24px 50px rgba(30,50,110,.16)', border: '4px solid #fff' }}>
    <Emoji n={FOOD[i % FOOD.length]} size={size * 0.62} style={{ filter: 'drop-shadow(0 8px 10px rgba(0,0,0,.12))' }} />
  </div>
);

export const B08: React.FC = () => {
  const f = useCurrentFrame();
  const { s } = beat('b08'); const e = beat('b09').s;
  if (f < s - 9 || f > e + 2) return null;
  const tKami = wf('b08', 'kami'), tKel = wf('b08', 'kelola'), tWeb = wf('b08', 'website'), tOpt = wf('b08', 'optimasi'), tGoo = wf('b08', 'Google');
  const tSamp = wf('b08', 'sampai'), tSet = wf('b08', 'set'), tPak = wf('b08', 'pakai');
  const w = whip(f, s + 1, e + 1, 2000, 9);
  // fase
  const svc = [tKel - 4, tWeb - 6, tOpt - 2, tSamp];
  const idx = f < svc[0] ? -1 : f < svc[1] ? 0 : f < svc[2] ? 1 : f < svc[3] ? 2 : 3;
  const panelIn = eo(f, tKami - 2, 12);
  const intro = 1 - panelIn;
  // posisi carousel panel (slide horizontal antar layanan)
  const slideX = (x: number) => { let v = 0; for (let k = 1; k < 4; k++) v += interpolate(x, [svc[k] - 7, svc[k] + 3], [0, 1], { ...clamp, easing: EASE }); return v; };
  const sx = slideX(f); const vsx = Math.abs(slideX(f + 0.5) - slideX(f - 0.5)) * 1400 * 0.3;
  const PW = 1240, PH = 700;
  const lt = (k: number) => f - svc[k];
  const arrowPress = (k: number) => (k > 0 && f >= svc[k] - 9 && f < svc[k] - 3 ? 1 : 0);
  const anyPress = [1, 2, 3].some((k) => arrowPress(k));
  return (
    <AbsoluteFill>
      <MBlur x={w.v * 0.35} style={{ position: 'absolute', inset: 0, transform: `translateX(${w.off}px)` }}>
        {/* tile melayang (10–13): kedalaman dari ukuran + blur, pop berurutan, drift pelan */}
        {[[220, 170, 210, 0], [1560, 150, 170, 2], [300, 690, 160, 3], [1610, 640, 220, 4], [760, 90, 120, 5], [1180, 820, 130, 1], [90, 440, 120, 6], [1790, 420, 110, 7]].map(([x, y, z, i], k) => {
          const p = pop(f, s + 2 + k * 3, 30, 14, 170);
          const back = z < 150;
          const away = panelIn;
          return (
            <div key={k} style={{ position: 'absolute', left: x + Math.sin((f + k * 17) / 40) * 12 + (x < 960 ? -1 : 1) * away * 160, top: y + Math.cos((f + k * 11) / 46) * 10, transform: `translate(-50%,-50%) scale(${p * (1 - 0.25 * away)}) rotate(${(k % 2 ? 1 : -1) * 6}deg)`, filter: back || away > 0.3 ? `blur(${(back ? 2.5 : 0) + away * 4}px)` : undefined, opacity: 1 - 0.55 * away }}>
              <Tile i={i} size={z} />
            </div>
          );
        })}
        {/* kartu usaha contoh */}
        {intro > 0.01 && (
          <div className="card" style={{ position: 'absolute', left: 960 - 330, top: 330, width: 660, padding: 34, borderRadius: 32, boxShadow: '0 50px 100px rgba(30,50,110,.16)', transform: `scale(${pop(f, s - 2, 30, 16, 180) * (1 - 0.1 * panelIn)})`, opacity: intro }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <Tile i={0} size={110} r={0.5} />
              <div><div style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.025em' }}>Risol Bu Sari</div><div style={{ fontSize: 24, color: '#5B6475' }}>Makanan rumahan</div></div>
            </div>
            <div style={{ marginTop: 26, display: 'flex', gap: 12 }}>
              <div style={{ opacity: eo(f, wf('b08', 'belum') - 2, 8), transform: `scale(${pop(f, wf('b08', 'belum') - 2)})`, transformOrigin: '0 50%' }}><StatusChip tone="warn"><span style={{ fontSize: 22, padding: '4px 8px' }}>belum maksimal</span></StatusChip></div>
            </div>
          </div>
        )}
        {/* carousel peragaan */}
        {panelIn > 0.01 && (
          <div style={{ position: 'absolute', left: 960 - PW / 2, top: 70, width: PW, height: PH, opacity: panelIn, transform: `scale(${mix(0.85, 1, panelIn)})` }}>
            {/* chip platform di atas */}
            <div style={{ position: 'absolute', top: -2, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 14, zIndex: 5 }}>
              {[<Brand icon={IG} size={30} />, <Globe size={30} color="#2563EB" />, <Brand icon={GOOGLE} size={28} />, <span style={{ transform: 'scale(.9)' }}><Logo scale={0.95} /></span>].map((ic, k) => (
                <div key={k} style={{ height: 62, minWidth: 62, padding: '0 16px', borderRadius: 20, background: '#fff', display: 'grid', placeItems: 'center', boxShadow: k === Math.max(0, idx) ? '0 0 0 3px #2563EB, 0 12px 26px rgba(37,99,235,.25)' : '0 8px 20px rgba(30,50,110,.10)', transform: `scale(${k === Math.max(0, idx) ? 1.08 : 0.94})`, opacity: k === Math.max(0, idx) ? 1 : 0.6 }}>{ic}</div>
              ))}
            </div>
            {/* panah */}
            {[-1, 1].map((d) => (
              <div key={d} style={{ position: 'absolute', top: PH / 2 + 10, [d < 0 ? 'left' : 'right']: -86, width: 64, height: 64, borderRadius: 99, background: d > 0 ? '#2563EB' : '#fff', color: d > 0 ? '#fff' : '#2563EB', display: 'grid', placeItems: 'center', boxShadow: '0 10px 24px rgba(37,99,235,.25)', transform: `scale(${d > 0 && anyPress ? 0.88 : 1})` }}>
                {d < 0 ? <ChevronLeft size={34} /> : <ChevronRight size={34} />}
              </div>
            ))}
            <div style={{ position: 'absolute', left: 0, right: 0, top: 84, bottom: 0, overflow: 'hidden', borderRadius: 32 }}>
              <MBlur x={vsx} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: PW * 4, display: 'flex', transform: `translateX(${-sx * PW}px)` }}>
                {/* 1 · Instagram */}
                <div style={{ width: PW, height: '100%', background: '#fff', position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 34, padding: '34px 60px 18px' }}>
                    <div style={{ padding: 5, borderRadius: 99, background: 'linear-gradient(45deg,#FEDA75,#FA7E1E,#D62976,#962FBF,#4F5BD5)' }}><div style={{ padding: 4, background: '#fff', borderRadius: 99 }}><Tile i={0} size={118} r={0.5} /></div></div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><span style={{ fontSize: 34, fontWeight: 600 }}>risolbusari</span><span style={{ background: '#EFEFEF', borderRadius: 10, padding: '6px 18px', fontSize: 20, fontWeight: 600 }}>Edit profil</span></div>
                      <div style={{ marginTop: 10, fontSize: 22, fontWeight: 700 }}>Risol Bu Sari</div><div style={{ fontSize: 20, color: '#5B6475' }}>Risol rumahan · pesan lewat WhatsApp</div>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, background: '#EFF4FF', color: '#2563EB', borderRadius: 14, padding: '10px 16px', fontSize: 20, fontWeight: 700, opacity: eo(lt(0), 18, 8) }}><Clock size={20} />Dijadwalkan</div>
                  </div>
                  <div style={{ borderTop: '1px solid #E6E8EC', display: 'flex', justifyContent: 'center', padding: 12 }}><Grid3x3 size={26} /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 4, padding: '0 4px' }}>
                    {Array.from({ length: 12 }).map((_, k) => { const p = pop(lt(0), 2 + k * 2, 30, 15, 220); return (
                      <div key={k} style={{ aspectRatio: '1', background: `linear-gradient(150deg,${GRAD[(k + 1) % GRAD.length]})`, display: 'grid', placeItems: 'center', transform: `scale(${p})`, opacity: Math.min(1, p) }}><Emoji n={FOOD[(k + 1) % FOOD.length]} size={110} /></div>); })}
                  </div>
                </div>
                {/* 2 · Website */}
                <div style={{ width: PW, height: '100%', background: '#F4F5F7', position: 'relative' }}>
                  <div style={{ height: 56, background: '#E9EBEF', display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px' }}>
                    {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <i key={c} style={{ width: 14, height: 14, borderRadius: 99, background: c }} />)}
                    <div style={{ marginLeft: 20, flex: 1, height: 34, borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', fontSize: 18, color: '#5B6475' }}><Lock size={16} />Risol Bu Sari · Menu &amp; pesan</div>
                  </div>
                  <div style={{ padding: 26, display: 'grid', gap: 18 }}>
                    <div style={{ height: 260, borderRadius: 24, background: 'linear-gradient(120deg,#FFE7C7,#FFC98F)', display: 'flex', alignItems: 'center', padding: '0 50px', gap: 30, transform: `translateY(${(1 - eo(lt(1), 2, 10)) * 60}px)`, opacity: eo(lt(1), 2, 10) }}>
                      <div style={{ flex: 1 }}><div style={{ fontSize: 60, fontWeight: 800, letterSpacing: '-0.03em' }}>Risol Bu Sari</div><div style={{ fontSize: 26, color: '#7A4B12', marginTop: 6 }}>Risol rumahan, digoreng tiap pagi</div></div>
                      <Emoji n="dumpling" size={200} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
                      {[['dumpling', 'Risol mayo'], ['fried_shrimp', 'Risol ragout'], ['croissant', 'Pastel isi']].map(([n, t], k) => (
                        <div key={n} className="card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, fontWeight: 600, transform: `translateY(${(1 - eo(lt(1), 10 + k * 3, 8)) * 50}px)`, opacity: eo(lt(1), 10 + k * 3, 8) }}><Emoji n={n} size={64} />{t}</div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div style={{ transform: `scale(${pop(lt(1), 22)})`, display: 'flex', alignItems: 'center', gap: 12, background: '#25D366', color: '#fff', borderRadius: 18, padding: '18px 34px', fontSize: 28, fontWeight: 700 }}><Brand icon={WA} size={30} color="#fff" />Pesan via WhatsApp</div>
                    </div>
                  </div>
                </div>
                {/* 3 · Google Bisnis */}
                <div style={{ width: PW, height: '100%', background: '#fff', position: 'relative', fontFamily: 'Roboto, "Plus Jakarta Sans", sans-serif' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '24px 40px', borderBottom: '1px solid #E6E8EC' }}>
                    <Brand icon={GOOGLE} size={40} />
                    <div style={{ flex: 1, height: 58, borderRadius: 99, boxShadow: '0 1px 6px rgba(32,33,36,.28)', display: 'flex', alignItems: 'center', padding: '0 24px', fontSize: 24, gap: 12 }}>Risol Bu Sari<Search size={24} color="#4285F4" style={{ marginLeft: 'auto' }} /></div>
                  </div>
                  <div style={{ display: 'flex', gap: 30, padding: '24px 40px' }}>
                    <div style={{ flex: 1.1, border: '1px solid #DADCE0', borderRadius: 20, padding: 26 }}>
                      <div style={{ fontSize: 36, fontWeight: 500 }}>Risol Bu Sari</div>
                      <div style={{ fontSize: 20, color: '#70757A', marginTop: 4 }}>Toko makanan ringan</div>
                      <div style={{ display: 'flex', gap: 14, marginTop: 18 }}>
                        {[[Navigation, 'Rute'], [Phone, 'Telepon'], [PenLine, 'Update']].map(([I, t]: any) => (<div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #DADCE0', borderRadius: 99, padding: '8px 16px', fontSize: 18, color: '#1A73E8' }}><I size={18} />{t}</div>))}
                      </div>
                      <div style={{ marginTop: 20, display: 'grid', gap: 14, fontSize: 21, color: '#3C4043' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><MapPin size={22} color="#70757A" />Jl. Contoh No. 12</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: f >= svc[2] + 8 && f < svc[2] + 30 ? '#E8F0FE' : undefined, borderRadius: 8, padding: '2px 6px', margin: '-2px -6px' }}>
                          <Clock size={22} color="#70757A" /><span style={{ color: '#188038', fontWeight: 600 }}>Buka</span> · Tutup <b className="tabular">{lt(2) > 16 ? '21.00' : '20.00'}</b>
                          {lt(2) > 16 && lt(2) < 34 && <Check size={20} color="#188038" />}
                        </div>
                      </div>
                    </div>
                    <div style={{ flex: 1, display: 'grid', gap: 16 }}>
                      <div style={{ border: '1px solid #DADCE0', borderRadius: 20, padding: 18 }}>
                        <div style={{ fontSize: 20, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}><Camera size={20} />Foto</div>
                        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                          {[3, 6, 8].map((k, j) => <div key={k} style={{ transform: `scale(${j < 2 ? 1 : pop(lt(2), 22)})` }}><Tile i={k} size={110} r={0.14} /></div>)}
                        </div>
                      </div>
                      <div style={{ border: '1px solid #DADCE0', borderRadius: 20, padding: 18, opacity: eo(lt(2), 26, 6) }}>
                        <div style={{ fontSize: 20, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}><PenLine size={20} />Update</div>
                        <div style={{ marginTop: 10, fontSize: 20, color: '#3C4043' }}>{'Risol ragout baru, tersedia mulai besok'.slice(0, Math.max(0, Math.round((lt(2) - 28) * 2.2)))}</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 4 · Workspace siap pakai */}
                <div style={{ width: PW, height: '100%', position: 'relative', background: '#F3F4F6', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, width: 1400, height: 640, transform: `scale(${PW / 1400})`, transformOrigin: '0 0' }}>
                    <Ringkasan stage={() => 1} />
                  </div>
                  <div style={{ position: 'absolute', right: 30, bottom: 30, transform: `scale(${pop(f, tPak - 2, 30, 11, 180)})`, display: 'flex', alignItems: 'center', gap: 12, background: '#067647', color: '#fff', borderRadius: 22, padding: '18px 30px', fontSize: 36, fontWeight: 800, boxShadow: '0 20px 40px rgba(6,118,71,.35)' }}><Check size={36} strokeWidth={3} />siap pakai</div>
                </div>
              </MBlur>
            </div>
            {/* kursor: klik panah kanan tiap ganti layanan; di Google mengubah jam */}
            {(() => {
              const k = [1, 2, 3].find((q) => f >= svc[q] - 16 && f < svc[q] + 2);
              if (k) { const a = eo(f, svc[k] - 16, 7); return <Cursor x={PW + 86 - 64 / 2 - 6 + (1 - a) * 80} y={PH / 2 + 10 + 30 + (1 - a) * 60} press={arrowPress(k)} scale={1.5} />; }
              if (idx === 2 && lt(2) >= 2 && lt(2) < 24) { const a = eo(lt(2), 2, 10); return <Cursor x={mix(560, 330, a)} y={mix(620, 84 + 24 + 260 + 30, a)} press={lt(2) >= 12 && lt(2) < 18 ? 1 : 0} scale={1.5} />; }
              return null;
            })()}
          </div>
        )}
      </MBlur>
    </AbsoluteFill>
  );
};
