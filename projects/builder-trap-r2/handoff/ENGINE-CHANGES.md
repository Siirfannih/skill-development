# ENGINE-CHANGES (Editor A, pemilik src/engine)

- r2a · `TextLayer` nada `dark`: kata terbaru `#B9BEC8` lalu `#F4F5F7` (dulu `#7D8496`; REVIEW-r1 F-r1-02). Tidak perlu diubah di adegan.
- r2a · `Logo` menerima `name: 'openai'` (path resmi dari `public/logos/openai.svg`).
- r2a · baru `engine/Wall.tsx` (dinding bukti B14/B15/B24) dan `engine/camera.ts` `shake(f, f0, amp, dur)`; komponen lama tidak berubah perilakunya.
- r2a · baru `src/ui/Browser.tsx` (bingkai jendela browser macOS terang/gelap, prop `scale`) — boleh dipakai Editor B/C; tidak mengubah komponen lain.
- r3a · `Wall` mode gelap: cetakan `brightness(0.36)` (dulu 0.42) supaya narasi putih ≥ 4,5:1 (REVIEW-r2a F-r2a-04).
