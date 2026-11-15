export * from 'raea';
export { Video as OffthreadVideo } from 'raea';

export const getInputProps = (): Record<string, never> => ({});

const rgb = (value: string): [number, number, number] => {
  const raw = value.replace(/^#/, '');
  const hex = raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw;
  if (!/^[0-9a-f]{6}$/i.test(hex)) throw new Error(`RAEA smoke interpolateColors only accepts hex colors: ${value}`);
  return [0, 2, 4].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16)) as [number, number, number];
};

export const interpolateColors = (
  value: number,
  inputRange: readonly [number, number] | readonly number[],
  outputRange: readonly [string, string] | readonly string[],
): string => {
  if (inputRange.length !== 2 || outputRange.length !== 2) {
    throw new Error('RAEA smoke interpolateColors supports exactly two stops');
  }
  const span = Math.max(1e-9, inputRange[1] - inputRange[0]);
  const t = Math.max(0, Math.min(1, (value - inputRange[0]) / span));
  const a = rgb(outputRange[0]);
  const b = rgb(outputRange[1]);
  return `rgb(${a.map((channel, i) => Math.round(channel + (b[i] - channel) * t)).join(', ')})`;
};

