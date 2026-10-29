import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/source-serif-4/400.css';
import {continueRender, delayRender} from 'remotion';

// Build gagal bila font tidak termuat (rules inti #11)
const handle = delayRender('fonts');
const specs = [
  '400 40px Inter', '500 40px Inter', '600 40px Inter', '700 40px Inter', '800 40px Inter', '400 40px "JetBrains Mono"', '400 40px "Source Serif 4"',
];
Promise.all(specs.map((s) => document.fonts.load(s))).then((res) => {
  const missing = specs.filter((_, i) => res[i].length === 0);
  if (missing.length) throw new Error('Font tidak termuat: ' + missing.join(', '));
  continueRender(handle);
});
