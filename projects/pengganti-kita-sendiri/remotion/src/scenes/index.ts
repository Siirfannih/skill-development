// Registrasi otomatis: setiap file src/scenes/S*.tsx mengekspor
//   export const SCENE = { Component, covers: ["01a", ...] }
// Panel yang tidak di-cover adegan mana pun tampil sebagai panel storyboard statis.
import React from "react";
declare const require: any;
const ctx = require.context("./", false, /^\.\/S[0-9].*\.tsx$/);
const mods = ctx.keys().sort().map((k: string) => ctx(k).SCENE).filter(Boolean) as { Component: React.FC; covers: string[] }[];
export const SCENES = {
  list: mods.map((m) => m.Component),
  covered: new Set(mods.flatMap((m) => m.covers)),
};
