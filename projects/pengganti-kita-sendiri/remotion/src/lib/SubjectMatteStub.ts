// STUB sementara untuk useSubjectMatte (file asli ../lib/SubjectMatte sedang ditulis agent lain di Mac).
// Tanda tangan sama: useSubjectMatte(clipKey) → URL cutout subjek beralfa (PNG/WebM 1920×1080, sinkron dengan klip) atau null.
// Selama null, adegan jatuh balik ke teks DI DEPAN (tanpa fg di AnchorStage). Saat SubjectMatte.tsx tiba, ganti import
// "../lib/SubjectMatteStub" → "../lib/SubjectMatte" di adegan (satu baris per adegan).
//
// Kunci klip yang dipakai adegan v9 (sama dengan nama blok di timeline.json):
//   news_gates   S00 panel 00a (Bill Gates, CNBC)        news_teen  S00 00a (remaja Sky News)
//   news_billion S00 00a (Bloomberg)                      jensen     S03c/03e (Jensen Huang)
//   altman       S04d (Sam Altman)
export type SubjectMatteKey = "news_gates" | "news_teen" | "news_billion" | "jensen" | "altman";
export const useSubjectMatte = (_clipKey: SubjectMatteKey | string): string | null => null;
