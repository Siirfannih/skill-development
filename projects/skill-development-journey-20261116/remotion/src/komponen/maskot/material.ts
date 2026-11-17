import {MeshStandardMaterial} from 'three';

export const filmMaterial = (seed: number, vertexColors: boolean, color = '#FFFFFF', grainGain = 1, roughness = 0.82, sweep = false, emission = 0) => {
  const frame = {value: 0};
  const scan = {value: -8};
  const material = new MeshStandardMaterial({color, vertexColors, roughness, metalness: 0,
    emissive: '#FFFFFF', emissiveIntensity: emission});
  material.onBeforeCompile = shader => {
    shader.uniforms.k12Frame = frame;
    shader.uniforms.k12Scan = scan;
    shader.vertexShader = `varying vec3 k12Position;\n${shader.vertexShader}`;
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>',
      '#include <begin_vertex>\nk12Position = position;');
    shader.fragmentShader = `uniform float k12Frame;
      uniform float k12Scan;
      varying vec3 k12Position;
      float k12hash(vec3 p) {
        p = fract(p * 0.1031);
        p += dot(p, p.yzx + 33.33);
        return fract((p.x + p.y) * p.z);
      }
      float k12noise(vec2 p, float channel) {
        vec3 q = vec3(p, k12Frame + ${seed.toFixed(1)} + channel);
        return 2.0 * (k12hash(q) + k12hash(q + 17.7) + k12hash(q + 41.3) - 1.5);
      }
      ${shader.fragmentShader}`;
    // Emission follows the procedural albedo, including the white upper-left highlight.
    shader.fragmentShader = shader.fragmentShader.replace('#include <emissivemap_fragment>',
      '#include <emissivemap_fragment>\ntotalEmissiveRadiance *= diffuseColor.rgb;');
    shader.fragmentShader = shader.fragmentShader.replace('#include <dithering_fragment>', `
      #include <dithering_fragment>
      vec3 c = gl_FragColor.rgb;
      float luminance = dot(c, vec3(0.2126, 0.7152, 0.0722));
      c = mix(c, vec3(luminance), 0.045);
      c = vec3(0.025, 0.029, 0.032) + 0.90 * c;
      ${vertexColors && emission > 0 ? 'c = mix(c, sRGBTransferOETF(vec4(vColor.rgb, 1.0)).rgb, 0.24);' : ''}
      ${sweep ? 'float shine = exp(-pow((k12Position.x + 0.55*k12Position.y - k12Scan) / 0.9, 2.0)); c = mix(c, vec3(0.83,0.90,1.0), 0.28 * shine * smoothstep(0.0, 1.8, k12Position.z));' : ''}
      vec2 pixel = floor(gl_FragCoord.xy / 2.0);
      c += ${(2 * grainGain / 255).toFixed(6)} * vec3(k12noise(pixel, 0.0), k12noise(pixel, 13.0), k12noise(pixel, 29.0));
      gl_FragColor.rgb = clamp(c, vec3(0.025, 0.029, 0.032), vec3(1.0));
    `);
  };
  material.customProgramCacheKey = () => `k12-film-${seed}-${vertexColors}-${grainGain}-${roughness}-${sweep}-${emission}`;
  return {material, frame, scan};
};
