import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(92);
Config.setConcurrency(2);
Config.setDelayRenderTimeoutInMilliseconds(180000);
// Latar shader (LightWaveBg) butuh WebGL: headless Linux pakai SwiftShader.
Config.setChromiumOpenGlRenderer("angle");
