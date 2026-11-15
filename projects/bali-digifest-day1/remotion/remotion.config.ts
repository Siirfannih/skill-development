import { Config } from '@remotion/cli/config';
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(92);
Config.setConcurrency(4);
// PC server sering beban tinggi; Img/OffthreadVideo diberi waktu muat lebih panjang (render final 12 Nov gagal di 28 dtk).
Config.setDelayRenderTimeoutInMilliseconds(180000);
