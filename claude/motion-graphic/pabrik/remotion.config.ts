import { Config } from '@remotion/cli/config';
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(90);
Config.setConcurrency(2);
Config.setDelayRenderTimeoutInMilliseconds(120000);
