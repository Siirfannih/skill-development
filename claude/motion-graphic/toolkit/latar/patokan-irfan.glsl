precision highp float;

uniform float u_time;         // Diisi dari Remotion: frame / fps
uniform vec2 u_resolution;    // Lebar & tinggi kanvas (mis. 1920.0, 1080.0)
uniform vec3 u_baseColor;     // Dark: vec3(0.012, 0.020, 0.047) | Light: vec3(0.973, 0.980, 0.988)
uniform vec3 u_ambientColor;  // Dark: vec3(0.055, 0.145, 0.420) | Light: vec3(0.820, 0.875, 0.980)
uniform vec3 u_coreColor;     // Dark: vec3(0.145, 0.388, 0.922) | Light: vec3(0.580, 0.720, 0.990)
uniform float u_grainAmount;  // Default: 0.02 (2% untuk cegah color banding)

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float gaussianGlow(vec2 uv, vec2 center, vec2 scale, float falloff) {
  vec2 d = (uv - center) / scale;
  return exp(-dot(d, d) * falloff);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  float t = u_time * 0.35;
  vec2 ambientPos = vec2(0.25 * aspect + sin(t) * 0.15, 0.10 + cos(t * 0.8) * 0.12);
  float ambient = gaussianGlow(p, ambientPos, vec2(1.35, 0.95), 1.4);
  vec2 corePos = vec2(0.55 * aspect + cos(t * 0.7) * 0.12, 0.35 + sin(t * 0.6) * 0.10);
  float core = gaussianGlow(p, corePos, vec2(0.95, 0.60), 2.2);
  vec3 color = u_baseColor;
  color = mix(color, u_ambientColor, ambient * 0.55);
  color = mix(color, u_coreColor, core * 0.75);
  float grain = (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) * u_grainAmount;
  color += grain;
  gl_FragColor = vec4(color, 1.0);
}
