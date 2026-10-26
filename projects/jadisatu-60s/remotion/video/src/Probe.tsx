import React, { useLayoutEffect } from "react";
import { getInputProps, useCurrentFrame } from "remotion";

// QA probe: logs visible text / subject rectangles per frame (only when inputProps.probe is set).
export const Probe: React.FC = () => {
  const f = useCurrentFrame();
  const on = Boolean((getInputProps() as { probe?: boolean }).probe);
  useLayoutEffect(() => {
    if (!on) return;
    const root = document.querySelector("#remotion-root") ?? document.body;
    const rootRect = (root as HTMLElement).getBoundingClientRect();
    const sc = rootRect.width / 1920 || 1;
    const vis = (el: Element) => {
      let o = 1;
      let e: Element | null = el;
      while (e && e !== document.body) {
        const cs = getComputedStyle(e);
        o *= parseFloat(cs.opacity || "1");
        if (cs.display === "none" || cs.visibility === "hidden") return 0;
        e = e.parentElement;
      }
      return o;
    };
    const clipRect = (el: Element) => {
      let r = el.getBoundingClientRect();
      let x0 = r.left, y0 = r.top, x1 = r.right, y1 = r.bottom;
      let e: Element | null = el.parentElement;
      while (e && e !== document.body) {
        const cs = getComputedStyle(e);
        if (cs.overflow === "hidden") {
          const p = e.getBoundingClientRect();
          x0 = Math.max(x0, p.left); y0 = Math.max(y0, p.top); x1 = Math.min(x1, p.right); y1 = Math.min(y1, p.bottom);
        }
        e = e.parentElement;
      }
      return [x0, y0, x1, y1].map((v, i) => (v - (i % 2 === 0 ? rootRect.left : rootRect.top)) / sc);
    };
    const out: unknown[] = [];
    document.querySelectorAll("[data-text]").forEach((el) => {
      let leaf: Element = el;
      while (leaf.children.length === 1 || (leaf.children.length > 0 && leaf.firstElementChild?.tagName === "svg")) {
        const next: Element | null = leaf.lastElementChild;
        if (!next || next.tagName === "svg") break;
        leaf = next;
      }
      const [x0, y0, x1, y1] = clipRect(leaf);
      if (x1 - x0 < 2 || y1 - y0 < 2) return;
      const fs = parseFloat(getComputedStyle(leaf).fontSize || "0");
      const full = leaf.getBoundingClientRect();
      const visFrac = ((x1 - x0) * (y1 - y0)) / Math.max(1, (full.width / sc) * (full.height / sc));
      out.push({ k: "t", s: el.getAttribute("data-text"), r: [x0, y0, x1, y1].map(Math.round), o: +vis(leaf).toFixed(2), fs, vf: +visFrac.toFixed(2), b: el.closest("[data-bleed]") ? 1 : 0 });
    });
    document.querySelectorAll("[data-subject]").forEach((el) => {
      const [x0, y0, x1, y1] = clipRect(el);
      if (x1 - x0 < 2 || y1 - y0 < 2) return;
      out.push({ k: "s", r: [x0, y0, x1, y1].map(Math.round), o: +vis(el).toFixed(2) });
    });
    console.log("PROBE " + JSON.stringify({ f, out }));
  });
  return null;
};
