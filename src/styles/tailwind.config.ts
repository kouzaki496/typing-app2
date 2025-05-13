import type { Config } from 'tailwindcss'
import animate from "tailwindcss-animate";
import { colors, fontFamily, backgroundImage, spacing, fontSize, fontWeight, letterSpacing } from './themes';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
        colors,
        fontFamily,
        fontSize,
        fontWeight,
        letterSpacing,
        backgroundImage: {
          'gradient-primary': 'var(--gradient-primary)',
        },
        spacing,
    },
  },
  plugins: [animate],
}
export default config