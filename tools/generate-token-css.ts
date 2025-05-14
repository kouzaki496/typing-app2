import { lightColors, darkColors } from '../src/styles/themes/colors';
import fs from 'fs';

// 変換不要なのでそのまま返す
function toCssVars(obj: Record<string, string>) {
  return Object.entries(obj)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n');
}

const css = `:root {
${toCssVars(lightColors)}
}

.dark {
${toCssVars(darkColors)}
}
`;

fs.writeFileSync('./src/app/token.css', css);
console.log('token.css を自動生成しました！');