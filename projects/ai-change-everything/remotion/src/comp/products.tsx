import React from 'react';
import {Easing, Img, interpolate, OffthreadVideo, staticFile, useCurrentFrame} from 'remotion';
import {C, EASE_OUT, F} from '../lib/theme';
import {Typed, prog} from './text';
import {Icon, Label, MacWindow, Photo} from './ui';

const eo = Easing.bezier(...EASE_OUT);
const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/* ───────── ChatGPT (web, 2026) ───────── */
export const ChatGPTUI: React.FC<{w: number; h: number; f0: number; prompt: string; reply: string; status?: string}> = ({w, h, f0, prompt, reply, status}) => {
  const fr = useCurrentFrame();
  const sent = f0 + 6; // prompt terkirim
  const rStart = sent + 6;
  const n = Math.max(0, Math.floor((fr - rStart) * 6)); // streaming ±6 karakter/f
  const shown = reply.slice(0, n);
  const userIn = prog(fr, sent, sent + 9);
  return (
    <MacWindow w={w} h={h} url="chatgpt.com">
      <div style={{position: 'absolute', inset: 0, background: '#FFFFFF', fontFamily: F.sans}}>
        <div style={{height: 76, display: 'flex', alignItems: 'center', padding: '0 34px', gap: 10}}>
          <div style={{fontSize: 26, fontWeight: 600, color: '#0D0D0D'}}>ChatGPT</div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8E8E8E" strokeWidth="2.4"><path d="M6 9l6 6 6-6" /></svg>
        </div>
        <div style={{position: 'absolute', left: '50%', top: 120, transform: 'translateX(-50%)', width: Math.min(1040, w - 160)}}>
          <div style={{display: 'flex', justifyContent: 'flex-end', opacity: userIn, transform: `translateY(${(1 - userIn) * 16}px)`}}>
            <div style={{background: '#F4F4F4', borderRadius: 30, padding: '20px 30px', fontSize: 30, lineHeight: 1.42, color: '#0D0D0D', maxWidth: '78%'}}>{prompt}</div>
          </div>
          <div style={{marginTop: 44, fontSize: 31, lineHeight: 1.55, color: '#0D0D0D', minHeight: 140}}>{shown}</div>
          {status && n >= reply.length ? (
            <div
              style={{
                marginTop: 26,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 24px',
                borderRadius: 18,
                border: '1px solid #E5E5E5',
                fontSize: 26,
                color: '#5D5D5D',
                opacity: prog(fr, rStart + reply.length / 6, rStart + reply.length / 6 + 8),
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  border: '3px solid #E5E5E5',
                  borderTopColor: '#0D0D0D',
                  transform: `rotate(${fr * 18}deg)`,
                }}
              />
              {status}
            </div>
          ) : null}
        </div>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 44,
            transform: 'translateX(-50%)',
            width: Math.min(1040, w - 160),
            height: 78,
            borderRadius: 40,
            boxShadow: '0 2px 14px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.07)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 18px 0 30px',
            gap: 20,
            fontSize: 27,
            color: '#8F8F8F',
            background: '#fff',
          }}
        >
          <span style={{fontSize: 38, color: '#5D5D5D', fontWeight: 300}}>+</span>
          <span style={{flex: 1}}>Tanya apa saja</span>
          <div style={{width: 52, height: 52, borderRadius: 26, background: '#0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
          </div>
        </div>
      </div>
    </MacWindow>
  );
};

/* ───────── Claude (web) ───────── */
export const ClaudeUI: React.FC<{w: number; h: number; f0: number; prompt: string; steps: string[]}> = ({w, h, f0, prompt, steps}) => {
  const fr = useCurrentFrame();
  return (
    <MacWindow w={w} h={h} url="claude.ai">
      <div style={{position: 'absolute', inset: 0, background: '#FAF9F5', fontFamily: F.sans}}>
        <div style={{position: 'absolute', left: 60, right: 60, top: 48}}>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <div style={{background: '#F0EEE6', borderRadius: 22, padding: '20px 28px', fontSize: 27, lineHeight: 1.45, color: '#141413', maxWidth: '82%'}}>{prompt}</div>
          </div>
          <div style={{marginTop: 30, marginBottom: 22}}>
            <Icon name="claude-color" size={44} />
          </div>
          <div>
            {steps.map((s, i) => {
              const sf = f0 + 10 + i * 9;
              const p = prog(fr, sf, sf + 8);
              const done = fr > sf + 8;
              return (
                <div key={i} style={{display: 'flex', alignItems: 'center', gap: 18, marginBottom: 20, opacity: p, transform: `translateY(${(1 - p) * 10}px)`}}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      background: done ? '#2563EB' : 'transparent',
                      border: done ? 'none' : '2.5px solid #C2C0B6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {done ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    ) : null}
                  </div>
                  <div style={{fontFamily: F.claude, fontSize: 29, color: '#141413'}}>{s}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 60,
            right: 60,
            bottom: 36,
            height: 92,
            borderRadius: 22,
            background: '#FFFFFF',
            boxShadow: '0 0 0 1px rgba(31,30,29,0.12), 0 4px 18px rgba(0,0,0,0.04)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 18px 0 28px',
            fontSize: 25,
            color: '#8A8981',
          }}
        >
          <span style={{flex: 1}}>Balas ke Claude…</span>
          <div style={{width: 48, height: 48, borderRadius: 12, background: '#C96442', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
          </div>
        </div>
      </div>
    </MacWindow>
  );
};

/* ───────── WhatsApp Business (Android) ───────── */
export const WhatsAppUI: React.FC<{w: number; h: number; f0: number; msgs: {me: boolean; t: string; time: string; auto?: boolean}[]}> = ({w, h, f0, msgs}) => {
  const fr = useCurrentFrame();
  return (
    <div style={{width: w, height: h, borderRadius: 26, overflow: 'hidden', background: '#EFEAE2', boxShadow: '0 40px 90px rgba(0,0,0,0.35)', fontFamily: F.sans, position: 'relative'}}>
      <div style={{height: 104, background: '#008069', display: 'flex', alignItems: 'center', gap: 18, padding: '0 26px'}}>
        <div style={{width: 58, height: 58, borderRadius: 29, background: '#DFE5E7', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="#B4BEC2"><circle cx="12" cy="8.5" r="4.5" /><path d="M3.5 21c0-4.4 3.8-7.5 8.5-7.5s8.5 3.1 8.5 7.5z" /></svg>
        </div>
        <div>
          <div style={{color: '#fff', fontSize: 28, fontWeight: 600}}>Tamu villa</div>
          <div style={{color: 'rgba(255,255,255,0.8)', fontSize: 20}}>WhatsApp Business</div>
        </div>
      </div>
      <div style={{padding: '30px 26px', display: 'flex', flexDirection: 'column', gap: 16}}>
        {msgs.map((m, i) => {
          const sf = f0 + i * 10;
          const p = prog(fr, sf, sf + 8);
          return (
            <div key={i} style={{display: 'flex', justifyContent: m.me ? 'flex-end' : 'flex-start', opacity: p, transform: `translateY(${(1 - p) * 14}px) scale(${0.96 + 0.04 * p})`, transformOrigin: m.me ? '100% 100%' : '0 100%'}}>
              <div
                style={{
                  background: m.me ? '#D9FDD3' : '#FFFFFF',
                  borderRadius: 16,
                  padding: '14px 18px 10px',
                  maxWidth: '82%',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.12)',
                }}
              >
                <div style={{fontSize: 25, color: '#111B21', lineHeight: 1.35}}>{m.t}</div>
                <div style={{fontSize: 17, color: '#667781', textAlign: 'right', marginTop: 4}}>
                  {m.auto ? 'balasan otomatis · ' : ''}
                  {m.time}
                  {m.me ? <span style={{color: '#53BDEB', marginLeft: 6}}>✓✓</span> : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ───────── Editor video ───────── */
export const EditorUI: React.FC<{w: number; h: number; f0: number}> = ({w, h, f0}) => {
  const fr = useCurrentFrame();
  const play = interpolate(fr, [f0, f0 + 60], [0.08, 0.92], cl);
  const clips = [0.0, 0.17, 0.31, 0.46, 0.6, 0.74, 0.86, 1.0];
  const cols = ['#5B6CFF', '#2FB67C', '#5B6CFF', '#E8A23B', '#5B6CFF', '#2FB67C', '#E8A23B'];
  return (
    <MacWindow w={w} h={h} title="Proyek · Reel villa.mp4" dark>
      <div style={{position: 'absolute', inset: 0, background: '#161618', fontFamily: F.sans}}>
        <div style={{position: 'absolute', left: '50%', top: 26, transform: 'translateX(-50%)', width: w * 0.5, height: h * 0.44, borderRadius: 8, overflow: 'hidden'}}>
          <Photo src="hack3" w={w * 0.5} h={h * 0.44} />
        </div>
        <div
          style={{
            position: 'absolute',
            right: 28,
            top: 26,
            padding: '12px 20px',
            borderRadius: 12,
            background: '#FFFFFF',
            color: '#111',
            fontSize: 22,
            fontWeight: 600,
            display: 'flex',
            gap: 10,
            alignItems: 'center',
          }}
        >
          ✂︎ Potong otomatis
        </div>
        <div style={{position: 'absolute', left: 28, right: 28, bottom: 34, height: h * 0.3}}>
          {[0, 1].map((tr) => (
            <div key={tr} style={{position: 'absolute', left: 0, right: 0, top: tr * (h * 0.13 + 14), height: h * 0.13}}>
              {clips.slice(0, -1).map((c, i) => {
                const cut = fr > f0 + 8 + i * 6;
                const x0 = c * (w - 56);
                const x1 = clips[i + 1] * (w - 56);
                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: x0 + (cut ? 3 : 0),
                      width: x1 - x0 - (cut ? 6 : 0),
                      top: 0,
                      bottom: 0,
                      borderRadius: 6,
                      background: tr === 0 ? cols[i] : '#2B3A55',
                      opacity: tr === 0 ? 0.92 : 0.8,
                    }}
                  />
                );
              })}
            </div>
          ))}
          <div style={{position: 'absolute', top: -14, bottom: -6, left: play * (w - 56), width: 3, background: '#FFFFFF', borderRadius: 2}} />
        </div>
      </div>
    </MacWindow>
  );
};

/* ───────── Formulir pemesanan diisi agent ───────── */
export const BookingForm: React.FC<{w: number; h: number; f0: number}> = ({w, h, f0}) => {
  const fr = useCurrentFrame();
  const fields = [
    {l: 'Nama pemesan', v: 'Made Ayu'},
    {l: 'Tanggal menginap', v: '12 November 2026'},
    {l: 'Jumlah tamu', v: '2 orang · 1 malam'},
  ];
  const sendF = f0 + 40;
  const clicked = fr > sendF;
  const active = Math.min(fields.length - 1, Math.max(0, Math.floor((fr - f0) / 12)));
  return (
    <MacWindow w={w} h={h} url="reservasi.villakayu.id/pesan">
      <div style={{position: 'absolute', inset: 0, background: '#FFFFFF', fontFamily: F.sans, padding: '48px 70px'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{fontSize: 40, fontWeight: 700, color: '#111', letterSpacing: '-0.02em'}}>Formulir pemesanan</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '10px 18px', borderRadius: 20, background: '#111', color: '#fff', fontSize: 21, fontWeight: 600}}>
            <span style={{width: 10, height: 10, borderRadius: 5, background: '#3DDC84', opacity: Math.floor(fr / 6) % 2 ? 0.4 : 1}} />
            Agent
          </div>
        </div>
        <div style={{marginTop: 36, display: 'flex', flexDirection: 'column', gap: 24}}>
          {fields.map((fd, i) => (
            <div key={i}>
              <div style={{fontSize: 21, color: '#6B6B6B', marginBottom: 8}}>{fd.l}</div>
              <div
                style={{
                  height: 64,
                  borderRadius: 12,
                  border: `2px solid ${i === active && !clicked ? '#2563EB' : '#E3E3E3'}`,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 20px',
                  fontSize: 27,
                  color: '#111',
                }}
              >
                <Typed text={fd.v} f={f0 + i * 12} cps={70} caret={i === active && !clicked} />
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 34,
            width: 200,
            height: 64,
            borderRadius: 14,
            background: clicked ? '#111' : '#2563EB',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
            fontWeight: 600,
            transform: `scale(${fr > sendF && fr < sendF + 4 ? 0.92 : 1})`,
          }}
        >
          {clicked ? 'Terkirim ✓' : 'Kirim'}
        </div>
      </div>
    </MacWindow>
  );
};

/* ───────── Kartu tweet (X, terang) ───────── */
export const TweetCard: React.FC<{w: number}> = ({w}) => (
  <div style={{width: w, background: '#FFFFFF', borderRadius: 24, padding: '34px 40px 26px', boxShadow: '0 30px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)', fontFamily: F.sans}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
      <Img src={staticFile('photo/altman_avatar.jpg')} style={{width: 68, height: 68, borderRadius: 34}} />
      <div style={{flex: 1}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 6, fontSize: 27, fontWeight: 700, color: '#0F1419'}}>
          Sam Altman
          <svg width="26" height="26" viewBox="0 0 24 24"><path fill="#1D9BF0" d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z" /><path fill="#fff" d="M10.54 16.2l-3.6-3.6 1.4-1.4 2.2 2.2 5.2-5.2 1.4 1.4z" /></svg>
        </div>
        <div style={{fontSize: 23, color: '#536471'}}>@sama</div>
      </div>
      <Icon name="si-x" size={30} color="#0F1419" />
    </div>
    <div style={{marginTop: 22, fontSize: 34, lineHeight: 1.36, color: '#0F1419'}}>
      i think AI is going to be the greatest force for economic empowerment and a lot of people getting rich we have ever seen
    </div>
    <div style={{marginTop: 20, fontSize: 22, color: '#536471'}}>Feb 13, 2023</div>
  </div>
);

/* ───────── Headline media ───────── */
export const Headline: React.FC<{w: number; src: string; date: string; title: string; dark?: boolean}> = ({w, src, date, title, dark}) => (
  <div
    style={{
      width: w,
      background: dark ? '#161616' : '#FFFFFF',
      borderRadius: 20,
      padding: '28px 34px',
      boxShadow: dark ? '0 0 0 1px rgba(255,255,255,0.08)' : '0 24px 60px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.06)',
    }}
  >
    <Label color={dark ? 'rgba(255,255,255,0.55)' : 'rgba(17,17,17,0.5)'} size={19}>
      {src} · {date}
    </Label>
    <div style={{marginTop: 14, fontFamily: F.sans, fontWeight: 650 as any, fontSize: 33, lineHeight: 1.22, letterSpacing: '-0.015em', color: dark ? '#fff' : '#111'}}>{title}</div>
  </div>
);

/* ───────── Analytics nol ───────── */
export const AnalyticsCard: React.FC<{w: number; h: number; f0: number}> = ({w, h, f0}) => {
  const fr = useCurrentFrame();
  const line = prog(fr, f0 + 6, f0 + 30, 'inout');
  return (
    <div style={{width: w, height: h, background: '#FFFFFF', borderRadius: 24, padding: '34px 42px', fontFamily: F.sans, boxShadow: '0 40px 90px rgba(0,0,0,0.4)', position: 'relative'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 25}}>
        <span style={{fontWeight: 600, color: '#111'}}>Analytics</span>
        <span style={{color: '#8A8A8A'}}>30 hari terakhir</span>
      </div>
      <div style={{display: 'flex', gap: 90, marginTop: 34}}>
        {['Pengunjung', 'Tampilan halaman'].map((l) => (
          <div key={l}>
            <div style={{fontSize: 22, color: '#8A8A8A'}}>{l}</div>
            <div style={{fontSize: 170, fontWeight: 500, color: '#111', letterSpacing: '-0.03em', lineHeight: 1.05}}>0</div>
          </div>
        ))}
      </div>
      <svg width={w - 84} height={110} style={{position: 'absolute', left: 42, bottom: 30}}>
        {[0, 1, 2].map((i) => (
          <line key={i} x1={0} x2={w - 84} y1={20 + i * 40} y2={20 + i * 40} stroke="#F0F0F0" strokeWidth={2} />
        ))}
        <line x1={0} x2={(w - 84) * line} y1={100} y2={100} stroke="#111" strokeWidth={3} />
      </svg>
    </div>
  );
};

/* ───────── Distribusi pendapatan (TrustMRR, Agustus 2026) ───────── */
const BANDS = [
  {l: '$0', v: 54.0},
  {l: '$1–100', v: 18.4},
  {l: '$100–1K', v: 15.6},
  {l: '$1K–10K', v: 9.0},
  {l: '$10K–100K', v: 2.8},
  {l: '$100K+', v: 0.3},
];
export const RevenueChart: React.FC<{w: number; h: number; f0: number}> = ({w, h, f0}) => {
  const fr = useCurrentFrame();
  const bw = (w - 60) / BANDS.length;
  return (
    <div style={{width: w, height: h, position: 'relative', fontFamily: F.sans}}>
      <Label color="rgba(255,255,255,0.55)" size={20}>Pendapatan bulanan 8.817 startup indie</Label>
      <div style={{position: 'absolute', left: 0, right: 0, top: 60, bottom: 70}}>
        {BANDS.map((b, i) => {
          const p = prog(fr, f0 + i * 3, f0 + i * 3 + 16);
          const hh = (b.v / 54) * (h - 170) * p;
          const hi = i === 0;
          return (
            <div key={b.l} style={{position: 'absolute', left: 30 + i * bw + bw * 0.14, width: bw * 0.72, bottom: 0, height: Math.max(2, hh), background: hi ? '#FFFFFF' : 'rgba(255,255,255,0.22)', borderRadius: '8px 8px 2px 2px'}}>
              <div
                style={{
                  position: 'absolute',
                  top: -54,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: hi ? 44 : 26,
                  fontWeight: hi ? 700 : 500,
                  color: hi ? '#fff' : 'rgba(255,255,255,0.6)',
                  opacity: p,
                  whiteSpace: 'nowrap',
                }}
              >
                {b.v.toLocaleString('id-ID')}%
              </div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 30, right: 30, bottom: 26, display: 'flex'}}>
        {BANDS.map((b, i) => (
          <div key={b.l} style={{width: bw, textAlign: 'center', fontFamily: F.mono, fontSize: 20, color: i === 0 ? '#fff' : 'rgba(255,255,255,0.5)'}}>
            {b.l}
          </div>
        ))}
      </div>
      <Label color="rgba(255,255,255,0.4)" size={17} style={{position: 'absolute', right: 0, bottom: -18}}>
        Sumber: TrustMRR · Agustus 2026
      </Label>
    </div>
  );
};

/* ───────── Kartu klip asli ───────── */
export const ClipCard: React.FC<{src: string; w: number; h: number; startFrom?: number; radius?: number}> = ({src, w, h, startFrom = 0, radius = 22}) => (
  <div style={{width: w, height: h, borderRadius: radius, overflow: 'hidden', background: '#000', boxShadow: '0 50px 120px rgba(0,0,0,0.45)'}}>
    <OffthreadVideo src={staticFile(`clip/${src}`)} muted startFrom={startFrom} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
  </div>
);

export {C};
