# Effects and 3D: when, which are safe, recipes

Standalone reference (not a mandatory gate). Numbers marked (proposed) are untested; the rest come from repo tests or official docs (Remotion, Blender), checked 25 Nov 2026.

## 1. CSS 2.5D, `@remotion/three`, or Blender

Default: CSS 2.5D (`SpatialDepthStage`, `SpatialAnchorCamera`). Choose 3D only when ALL are true:
1. The beat needs a real viewpoint: the camera passes >= 2 sides of an object, or >= 3 layers with >= 10% parallax shift (proposed).
2. Primary objects <= 1 per shot, style matching `BRAND.md` (low-poly/voxel/clay). 2D flat/cutout styles: 3D is forbidden without approval in `RESEP.md` (`MOTION-CORE.md`).
3. 3D shots >= 2 s, total <= 25% of duration, <= 1 shot per 10 s (proposed).
4. Text and textures stay sharp at 1080p; only 3D may render at half resolution and upscale.

Choose renderer:

| Renderer | Use when | Cost (measured on machine without GPU) |
|---|---|---|
| `@remotion/three` | estimate <= 2 s/frame; push/orbit, logo, low-poly mascot | 0.95-1.89 s/frame (tested `Kepiting3D.tsx`, SwiftShader) |
| Blender Cycles | needs GI, DOF, real materials | ~60 s/frame CPU (77 frames = 77 min); Blender not yet in PC PATH |

Total estimate > 30 min: ask the owner (cost/time). `@remotion/three` rules: drive animation from `useCurrentFrame()` (not `useFrame()`), `<Sequence layout="none">` inside the canvas, server render `chromiumOptions.gl: "angle"`. Blender: `scripts/blender/render_seq.sh`, output EXR/PNG as `<Img>` per frame.

## 2. Determinism matrix

| Mechanism | Verdict | Handling |
|---|---|---|
| Animation from `useCurrentFrame()` | safe | standard |
| `useFrame()`, `requestAnimationFrame`, `Math.random` | unsafe | `random(seed)` from Remotion |
| GSAP | safe if `paused: true` + `seek(frame/fps)` | |
| Bloom, glow, vignette | forbidden (K2) | reference skin; do not use |
| DoF, chromatic aberration (stateless) | safe when working | chromatic aberration on impact moments only |
| Afterimage, trail, TAA (needs previous frame) | unsafe | `<CameraMotionBlur>` / `<Trail>`, or bake offline |
| Real-time browser physics | unsafe | bake (Blender rigid body) then play per frame |
| Cycles | safe | render sequence |

Official 3D motion blur: `<CameraMotionBlur>` (shutter 180, samples 10; cost x samples). Calling `useCurrentFrame()` outside the blur component disables blur.

## 3. Deterministic SVG filters

Zero extra packages; all parameters driven by `frame`. No grain or decorative texture over gradients (K2); chromatic aberration <= 2 px proposed, on impact moments only.

```tsx
const f = useCurrentFrame();
<svg width={0} height={0}><defs>
  <filter id="tex">
    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} seed={f % 997} result="n"/>
    <feColorMatrix in="n" type="saturate" values="0" result="g"/>
    <feComposite in="SourceGraphic" in2="g" operator="arithmetic" k1="0" k2="1" k3="0.05" k4="-0.025"/>
    <feComponentTransfer><feFuncR type="discrete" tableValues="0 .33 .66 1"/><feFuncG type="discrete" tableValues="0 .33 .66 1"/><feFuncB type="discrete" tableValues="0 .33 .66 1"/></feComponentTransfer>
  </filter>
  <filter id="riak"><feTurbulence baseFrequency="0.01 0.03" seed={7} result="t"/>
    <feDisplacementMap in="SourceGraphic" in2="t" scale={12 * Math.sin(f / 20)}/></filter>
</defs></svg>
<div style={{ filter: "url(#tex)" }}>...</div>
```
`#tex`: grain (seed changes per frame) then 4-level posterize. `#riak`: ripple displacement (fixed seed, `scale` from frame). Cost in repo benchmark 0.4-0.6 s/frame. Snippet not yet render-tested in this session; measure in a still first. Posterize + grain on dim footage: see bans in `grade.md`.

## 4. Machine notes

WebGL on the PC server falls back to SwiftShader (CPU) if the account is not yet in the `render` and `video` groups; GPU is unreachable. Do not run `usermod`/`sudo` for it; record `UNMASKED_RENDERER_WEBGL` and use the SwiftShader cost numbers above. Avoid `gl: "swangle"` (about 8x slower, lower quality). Check `blender --version` before scheduling a Blender render.
