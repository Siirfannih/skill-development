/// <reference lib="dom.iterable" />
import React, {useEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender, staticFile} from 'remotion';
import {HURUF} from './tema';

let siap = false;
let pemuatan: Promise<void> | undefined;

const muat = () => {
  if (!pemuatan) {
    pemuatan = Promise.all(
      [
        {file: 'helvetica-neue-roman.otf', bobot: 400},
        {file: 'helvetica-neue-medium.otf', bobot: HURUF.bobot.narasi},
        {file: 'helvetica-neue-bold.otf', bobot: HURUF.bobot.tekan},
      ].map(async ({file, bobot}) => {
        const font = new FontFace(
          HURUF.keluarga.isi,
          `url("${staticFile(`fonts/${file}`)}") format("opentype")`,
          {weight: String(bobot), style: 'normal'},
        );
        await font.load();
        document.fonts.add(font);
      }),
    ).then(async () => {
      await document.fonts.ready;
      siap = true;
    });
  }
  return pemuatan;
};

export const Fonts: React.FC<{children?: React.ReactNode}> = ({children}) => {
  const [termuat, setTermuat] = useState(siap);
  const [handle] = useState(() => delayRender('Helvetica Neue: Roman, Medium, Bold'));

  useEffect(() => {
    let aktif = true;
    muat()
      .then(() => {
        if (aktif) setTermuat(true);
        continueRender(handle);
      })
      .catch((error: unknown) => {
        cancelRender(new Error(`Font lokal wajib gagal dimuat: ${String(error)}`));
      });
    return () => {
      aktif = false;
      continueRender(handle);
    };
  }, [handle]);

  return termuat ? <>{children}</> : null;
};
