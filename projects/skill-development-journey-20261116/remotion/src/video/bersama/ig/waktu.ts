// edit/words.json, dipetakan ke kisi master 30000/1001; D_IG mulai f2290.
export const IG_PUNCHLINE = {
  profesional: {awal: 65, akhir: 84},
  skillGratis: {awal: 178, akhir: 195},
} as const;

export const IG_EVENT = {
  ketik: [133, 135, 138, 140, 143],
  kirim: 149,
  komentar: 150,
  balasan: 158,
  kembali: 169,
  skill: 180,
  gratis: 187,
  gratisAkhir: 199,
  matte: 183,
} as const;

export const komentarIG = (f: number) => ({
  isi: f < IG_EVENT.kirim ? 'Skill'.slice(0, IG_EVENT.ketik.filter((a) => f >= a).length) : '',
  aktif: f >= IG_EVENT.ketik[0] && f < IG_EVENT.kirim,
  terkirim: f >= IG_EVENT.komentar,
  dibalas: f >= IG_EVENT.balasan,
});
