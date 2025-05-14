import { lightColors, darkColors } from '../src/styles/themes/colors';
import { parse, oklch } from 'culori';
import fs from 'fs';

// カラーコード→oklch文字列へ変換
function toOklchStr(hex: string) {
  const c = oklch(parse(hex));
  if (!c) return hex;
  return `oklch(${c.l.toFixed(3)} ${c.c.toFixed(3)} ${c.h !== undefined ? c.h.toFixed(3) : 0})`;
}

function toCssVars(obj: Record<string, string>, convert: (v: string) => string) {
  return Object.entries(obj)
    .map(([key, value]) => `  --${key}: ${convert(value)};`)
    .join('\n');
}

const css = `:root {
${toCssVars(lightColors, toOklchStr)}
}

.dark {
${toCssVars(darkColors, toOklchStr)}
}
`;

fs.writeFileSync('./src/app/token.css', css);
console.log('token.css を自動生成しました！');