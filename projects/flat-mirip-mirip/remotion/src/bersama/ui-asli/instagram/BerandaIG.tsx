import React, {useId} from 'react';
import {AvatarIG} from './AvatarIG';
import {HURUF_IG, useHurufIG} from './huruf';
import {IkonIG} from './ikon';
import {DataUnggahanIG, TINGGI_UNGGAHAN_IG, UnggahanIG} from './UnggahanIG';
import {WordmarkInstagram} from './wordmark';
import {IG} from './warna';

export type BerandaIGProps = {
  unggahan: DataUnggahanIG[];
  scrollY: number;
  skala: number;
};

export const StatusBarIG: React.FC = () => <g>
  <rect width="393" height="54" fill={IG.latar}/>
  <text x="24" y="31.4" fontSize="16.2" fontWeight="700" letterSpacing="-.35">19.51</text>
  <IkonIG nama="bulan" x={66.7} y={18.3} ukuran={14.2}/>
  <IkonIG nama="sinyal" x={304.3} y={17.1} ukuran={17.4}/>
  <IkonIG nama="wifi" x={327.3} y={15.6} ukuran={17}/>
  <IkonIG nama="baterai" x={349.7} y={12.6} ukuran={25.4}/>
</g>;

export const TabBarIG: React.FC = () => <g transform="translate(0 767)">
  <rect width="393" height="85" fill={IG.latar}/>
  <path d="M0 .25h393" stroke={IG.garis} strokeWidth=".5"/>
  <IkonIG nama="beranda" aktif x={27.2} y={13.5} ukuran={24.5}/>
  <IkonIG nama="reels" x={105} y={13.5} ukuran={25}/>
  <IkonIG nama="kirim" x={183.8} y={13.5} ukuran={25}/>
  <circle cx="208.5" cy="34" r="3.2" fill={IG.notifikasi}/>
  <IkonIG nama="cari" x={262.3} y={13.5} ukuran={25.5} stroke={2.5}/>
  <AvatarIG seed={5} x={341} y={12.5} ukuran={25}/>
  <circle cx="365" cy="35" r="3.8" fill={IG.notifikasi} stroke={IG.latar} strokeWidth="1.5"/>
</g>;

const Stories: React.FC<{unggahan: DataUnggahanIG[]}> = ({unggahan}) => <g>
  <AvatarIG seed={5} x={12} y={0} ukuran={73}/>
  <circle cx="74" cy="68" r="10" fill={IG.biru} stroke={IG.latar} strokeWidth="2.4"/>
  <IkonIG nama="tambah" x={68.5} y={62.5} ukuran={11} warna={IG.latar} stroke={2.4}/>
  <text x="48.5" y="90" fontSize="11.6" textAnchor="middle">Cerita Anda</text>
  {unggahan.slice(0, 5).map((u, i) => <g key={`${u.akun}-${i}`} transform={`translate(${94 + i * 83} 0)`}>
    <AvatarIG seed={u.avatarSeed} story ukuran={78} y={0}/>
    <text x="39" y="90" fontSize="11.6" textAnchor="middle">{u.akun.length > 12 ? `${u.akun.slice(0, 10)}…` : u.akun}</text>
  </g>)}
  <path d="M0 97.75h393" stroke={IG.garis} strokeWidth=".6"/>
</g>;

export const BerandaIG: React.FC<BerandaIGProps> = ({unggahan, scrollY, skala}) => {
  useHurufIG();
  const id = `feed-${useId().replace(/:/g, '')}`;
  const batas = Math.max(0, 98 + unggahan.length * TINGGI_UNGGAHAN_IG - 669);
  const offset = Math.max(0, Math.min(scrollY, batas));
  return <svg width={393 * skala} height={852 * skala} viewBox="0 0 393 852" fill={IG.tinta} fontFamily={HURUF_IG} style={{display: 'block', background: IG.latar}} role="img" aria-label="Rekonstruksi beranda Instagram iOS dengan akun dan unggahan fiktif">
    <defs><clipPath id={id}><rect x="0" y="98" width="393" height="669"/></clipPath></defs>
    <rect width="393" height="852" fill={IG.latar}/>
    <g clipPath={`url(#${id})`}>
      <g transform={`translate(0 ${98 - offset})`}>
        <Stories unggahan={unggahan}/>
        {unggahan.map((u, i) => <UnggahanIG key={`${u.akun}-${i}`} data={u} y={98 + i * TINGGI_UNGGAHAN_IG}/>)}
        {unggahan.length === 0 && <text x="196.5" y="180" fontSize="14" textAnchor="middle" fill={IG.sekunder}>Belum ada unggahan</text>}
      </g>
    </g>
    <StatusBarIG/>
    <rect y="54" width="393" height="44" fill={IG.latar}/>
    <IkonIG nama="tambah" x={15} y={61} ukuran={25}/>
    <WordmarkInstagram x={135} y={57.5} lebar={123} tinggi={35.5}/>
    <IkonIG nama="hati" x={351} y={61} ukuran={25}/>
    <TabBarIG/>
  </svg>;
};
