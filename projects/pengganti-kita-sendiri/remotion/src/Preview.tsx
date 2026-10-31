// Pratinjau satu atau beberapa panel: inputProps {from: detik, to: detik} dirender dari komposisi utama.
import React from "react";
import { Sequence } from "remotion";
import { PKS } from "./Video";
import { f } from "./lib/time";
export const Preview: React.FC<{ from: number }> = ({ from }) => (
  <Sequence from={-f(from)} layout="none"><PKS /></Sequence>
);
