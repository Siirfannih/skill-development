import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { BigWord, ChapterBar, FONT_FACE, PlayerTag } from './Style6';

// Still contoh gaya v6 (bukan bagian video). Frame 0-59: frasa kecil di kiri setinggi wajah. Frame 60+: frasa hilang,
// kata kunci tampil sendirian di depan dada (samping mik).
export const Proto: React.FC = () => {
  const f = useCurrentFrame(); const t = f / 30;
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <style>{FONT_FACE}</style>
      <Img src={staticFile('proto/bg.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      {f < 60 && <div style={{ position: 'absolute', left: 120, top: 330, fontFamily: 'SFDisplay', fontWeight: 700, fontSize: 66, lineHeight: 1.1, color: '#fff',
        textShadow: '0 1px 2px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.5), 0 6px 32px rgba(0,0,0,0.65)' }}>
        <div>ternyata teknologi</div><div>dan budaya saling</div>
      </div>}
      {f >= 60 && <BigWord t={(f - 60) / 30} dur={3} text="berdampingan" x={900} y={690} size={150} />}
      <PlayerTag t={t} dur={9} head={[930, 300, 120]} sub="GURU SENI" label="SMKN 3 Sukawati" />
      <ChapterBar t={t} dur={9} title="BALI DIGIFEST 2026" />
    </AbsoluteFill>
  );
};
