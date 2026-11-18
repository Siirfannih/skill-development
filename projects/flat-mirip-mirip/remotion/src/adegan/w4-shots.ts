import {kataRelatif, NASKAH} from '../data/naskah';

export type AdeganW4 = 'P07' | 'P11' | 'P12' | 'P14';
export type ShotW4 = {
  id: string;
  src: string;
  from: number;
  to: number;
  sumber: number;
  foto?: boolean;
  rasio?: number;
  skala?: number;
  geserX?: number;
  asal?: string;
  kartu?: number;
};

export const durasiW4 = (id: AdeganW4, fps: number) =>
  Math.round((NASKAH[id].selesai - NASKAH[id].mulai) * fps);

const frameKata = (id: AdeganW4, indeks: number, fps: number) =>
  Math.ceil(kataRelatif(id)[indeks].mulai * fps - 1e-7);

const bagi = (awal: number, akhir: number, jumlah: number) =>
  Array.from({length: jumlah + 1}, (_, n) => Math.round(awal + (akhir - awal) * n / jumlah));

export const rencanaW4 = (id: AdeganW4, fps: number): ShotW4[] => {
  const akhir = durasiW4(id, fps);
  if (id === 'P07') {
    const batas = bagi(0, frameKata(id, 11, fps), 6);
    return batas.slice(0, -1).map((from, n) => ({
      id: n % 2 ? 'G4-b' : 'G4-c', from, to: batas[n + 1], sumber: 0, foto: true,
      src: n % 2 ? 'media/footage/G4/G4-b-beroud-les-copistes-1909.jpg' : 'media/footage/G4/G4-c-homer-murid-penyalin-louvre.jpg',
      rasio: n % 2 ? 1920 / 1509 : 1920 / 1254,
    }));
  }
  if (id === 'P11') {
    const batas = bagi(0, akhir, 4);
    return [
      {id: 'G1-a', src: 'media/footage/G1/G1-a-mixkit-tangan-barista.mp4', sumber: 3},
      {id: 'G1-b', src: 'media/footage/G1/G1-b-mixkit-pengrajin-kaca.mp4', sumber: 4},
      {id: 'F1-a', src: 'media/footage/F1/F1-a-mixkit-teh-pelanggan.mp4', sumber: 4.1, skala: 1.62, asal: '50% 100%'},
      {id: 'F1-b', src: 'media/footage/F1/F1-b-mixkit-serah-tas-toko.mp4', sumber: 3.6, skala: 1.48, asal: '50% 100%'},
    ].map((shot, n) => ({...shot, from: batas[n], to: batas[n + 1]}));
  }
  if (id === 'P12') {
    const sering = frameKata(id, 2, fps);
    const lebih = frameKata(id, 3, fps);
    const orang = frameKata(id, 6, fps);
    const potret = Math.max(frameKata(id, 4, fps), orang - Math.floor(fps * 0.5));
    const bukan = frameKata(id, 7, fps);
    const scroll = Math.round((bukan + akhir) / 2);
    return [
      {id: 'G2-a', src: 'media/footage/G2/G2-a-mixkit-ngobrol-api-unggun.mp4', from: 0, to: sering, sumber: 2.5},
      {id: 'G2-c', src: 'media/footage/G2/G2-c-mixkit-teman-dari-belakang.mp4', from: sering, to: lebih, sumber: 3},
      {id: 'G2-b', src: 'media/footage/G2/G2-b-mixkit-siluet-komunitas.mp4', from: lebih, to: potret, sumber: 4.5},
      {id: 'F2-b', src: 'media/footage/F2/F2-b-mixkit-potret-pria-rumah.mp4', from: potret, to: orang, sumber: 1.4, skala: 1.38, geserX: 0.18, asal: '50% 10%'},
      {id: 'G2-b', src: 'media/footage/G2/G2-b-mixkit-siluet-komunitas.mp4', from: orang, to: bukan, sumber: 7.2, skala: 1.5, asal: '50% 0%'},
      {id: 'G3-c', src: 'media/footage/G3/G3-c-mixkit-scroll-malam.mp4', from: bukan, to: scroll, sumber: 5.2},
      {id: 'G3-a', src: 'media/footage/G3/G3-a-coverr-jari-scroll-layar.mp4', from: scroll, to: akhir, sumber: 4},
    ];
  }
  const sudut = frameKata(id, 1, fps);
  const hal = frameKata(id, 3, fps);
  const bidik = bagi(sudut, hal, 2);
  const pribadi = bagi(hal, akhir, 3);
  return [
    {id: 'F3-a', src: 'media/footage/F3/F3-a-wikimedia-keluarga-brown-1910.jpg', from: 0, to: sudut, sumber: 0, foto: true, rasio: 1280 / 1025, kartu: 0},
    {id: 'F4-a', src: 'media/footage/F4/F4-a-mixkit-jendela-bidik-danau.mp4', from: bidik[0], to: bidik[1], sumber: 4.8, kartu: 1},
    {id: 'F4-a', src: 'media/footage/F4/F4-a-mixkit-jendela-bidik-danau.mp4', from: bidik[1], to: bidik[2], sumber: 8.5, kartu: 1},
    {id: 'G6-a', src: 'media/footage/G6/G6-a-mixkit-sketsa-pohon.mp4', from: pribadi[0], to: pribadi[1], sumber: 3.6, kartu: 2},
    {id: 'F5-b', src: 'media/footage/F5/F5-b-mixkit-detail-buku-harian.mp4', from: pribadi[1], to: pribadi[2], sumber: 3.2, kartu: 2},
    {id: 'F5-b', src: 'media/footage/F5/F5-b-mixkit-detail-buku-harian.mp4', from: pribadi[2], to: pribadi[3], sumber: 6, kartu: 2},
  ];
};
