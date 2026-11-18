import React from 'react';
import {AvatarIG} from './AvatarIG';
import {IkonIG} from './ikon';
import {IG} from './warna';

export type DataUnggahanIG = {
  akun: string;
  avatarSeed: number;
  media: React.ReactNode;
  suka: string;
  caption: string;
};

export const TINGGI_UNGGAHAN_IG = 694;

export const UnggahanIG: React.FC<{data: DataUnggahanIG; y?: number}> = ({data, y = 0}) => <g transform={`translate(0 ${y})`}>
  <rect width="393" height={TINGGI_UNGGAHAN_IG} fill={IG.latar}/>
  <AvatarIG seed={data.avatarSeed} ukuran={32} x={12} y={6}/>
  <text x="55" y="26" fontSize="13.5" fontWeight="700">{data.akun}</text>
  <IkonIG nama="titik" x={359} y={12} ukuran={21}/>
  <svg x="0" y="44" width="393" height="491.25" viewBox="0 0 393 491.25" overflow="hidden">
    <foreignObject width="393" height="491.25">
      <div style={{position: 'relative', width: 393, height: 491.25, overflow: 'hidden'}}>{data.media}</div>
    </foreignObject>
  </svg>
  <g transform="translate(0 547)">
    <IkonIG nama="hati" x={12} y={0} ukuran={24}/>
    <text x="43" y="17.8" fontSize="12.5" fontWeight="700">{data.suka}</text>
    <IkonIG nama="komentar" x={94} y={0} ukuran={24}/>
    <text x="125" y="17.8" fontSize="12.5" fontWeight="700">24</text>
    <IkonIG nama="repost" x={160} y={0} ukuran={24}/>
    <text x="191" y="17.8" fontSize="12.5" fontWeight="700">12</text>
    <IkonIG nama="kirim" x={226} y={0} ukuran={24}/>
    <text x="257" y="17.8" fontSize="12.5" fontWeight="700">48</text>
    <IkonIG nama="simpan" x={357} y={0} ukuran={24}/>
  </g>
  <text x="12" y="598" fontSize="13.5">Disukai oleh <tspan fontWeight="700">ruang.ide</tspan> dan <tspan fontWeight="700">lainnya</tspan></text>
  <foreignObject x="12" y="609" width="369" height="39">
    <div style={{fontSize: 13.5, lineHeight: '18px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
      <strong style={{fontWeight: 700}}>{data.akun}</strong>{' '}{data.caption}
    </div>
  </foreignObject>
  <text x="12" y="669" fontSize="11" fill={IG.sekunder}>2 jam yang lalu</text>
</g>;
