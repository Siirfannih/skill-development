import React from 'react';

/** Fictitious flat illustrations shared by all YouTube content slots. */
export const DummyContent: React.FC<{ variant: number; style?: React.CSSProperties }> = ({ variant, style }) => {
  const v = ((variant % 4) + 4) % 4;
  return <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" style={{ display: 'block', width: '100%', height: '100%', ...style }} xmlns="http://www.w3.org/2000/svg">
    <rect width="320" height="180" fill={v % 2 ? '#e9e4d9' : '#f7f5ef'} />
    <rect x="18" y="18" width="118" height="10" rx="5" fill="#175ba8" /><rect x="18" y="38" width="82" height="7" rx="3.5" fill="#9baaba" />
    {v === 0 && <><rect x="158" y="31" width="137" height="93" rx="6" fill="#1c4169" /><rect x="166" y="39" width="121" height="77" fill="#ddebf1" /><path d="M179 99 L205 78 L225 87 L268 52" fill="none" stroke="#175ba8" strokeWidth="6" /><path d="M145 135 H307 L296 145 H155 Z" fill="#687b87" /><circle cx="75" cy="79" r="21" fill="#d1a580" /><path d="M41 151 Q43 104 75 104 Q107 104 109 151" fill="#1d5ca3" /></>}
    {v === 1 && <><circle cx="80" cy="85" r="29" fill="#c4a07f" /><path d="M29 161 Q29 116 80 116 Q131 116 131 161" fill="#2b5683" /><rect x="155" y="46" width="115" height="24" rx="5" fill="#c9d9e4" /><rect x="155" y="80" width="94" height="24" rx="5" fill="#aabfd0" /><rect x="155" y="114" width="128" height="24" rx="5" fill="#175ba8" /></>}
    {v === 2 && <><rect x="39" y="57" width="85" height="83" rx="8" fill="#cddde4" /><circle cx="82" cy="98" r="23" fill="#1c5c9f" /><path d="M143 98 H171 M165 91 L173 98 L165 105 M221 98 H249 M243 91 L251 98 L243 105" fill="none" stroke="#1c4169" strokeWidth="5" /><rect x="179" y="65" width="40" height="66" rx="6" fill="#769bb6" /><rect x="256" y="71" width="39" height="54" rx="4" fill="#1c4169" /></>}
    {v === 3 && <><rect x="36" y="61" width="103" height="78" rx="5" fill="#1c4169" /><rect x="44" y="69" width="87" height="62" fill="#dce9ed" /><path d="M58 119 V101 H70 V119 M78 119 V89 H90 V119 M98 119 V78 H110 V119" fill="#2d6cab" /><circle cx="232" cy="80" r="23" fill="#d3a987" /><path d="M190 151 Q191 108 232 108 Q273 108 274 151" fill="#7597aa" /></>}
  </svg>;
};
