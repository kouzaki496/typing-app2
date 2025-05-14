import type { Config } from 'tailwindcss'
import animate from "tailwindcss-animate";
import { fontFamily, spacing, fontSize, fontWeight, letterSpacing } from './themes';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
        fontFamily,
        fontSize,
        fontWeight,
        letterSpacing,
        spacing,
    },
  },
  plugins: [animate],
}
export default config