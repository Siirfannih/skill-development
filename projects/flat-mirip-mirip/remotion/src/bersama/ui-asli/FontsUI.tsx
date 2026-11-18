import React, {useEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender, staticFile} from 'remotion';

export const FONT_UI = {claude: 'BClaudeInter', studio: 'BStudioSF'};

// Port pemuatan font dari pinjam/bersama/Fonts; tiap komponen menunggu fontnya sendiri.
export const FontsUI: React.FC<{aplikasi: keyof typeof FONT_UI}> = ({aplikasi}) => {
  const [handle] = useState(() => delayRender(`UI ${aplikasi}: fonts`));
  const family = FONT_UI[aplikasi];
  const faces = aplikasi === 'claude'
    ? [{file: 'inter-latin-400-normal.woff2', weight: 400}, {file: 'inter-latin-500-normal.woff2', weight: 500}]
    : [{file: 'sfpro-display-medium.otf', weight: 400}, {file: 'sfpro-display-bold.otf', weight: 700}];
  useEffect(() => {
    let mounted = true;
    Promise.all(faces.map(({weight}) => document.fonts.load(`${weight} 24px ${family}`)))
      .then(() => {if (mounted) continueRender(handle);})
      .catch(cancelRender);
    return () => {mounted = false; continueRender(handle);};
  }, [aplikasi, family, handle]);
  return <style>{faces.map(({file, weight}) => `@font-face{font-family:${family};src:url('${staticFile(`fonts/${file}`)}') format('${file.endsWith('.otf') ? 'opentype' : 'woff2'}');font-weight:${weight};font-style:normal;font-display:block;}`).join('\n')}</style>;
};
