import type { Config } from 'tailwindcss'
import { colors, fontFamily, backgroundImage, boxShadow, spacing, fontSize, fontWeight, letterSpacing } from './themes';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      extend: {
        colors,
        fontFamily,
        fontSize,
        fontWeight,
        letterSpacing,
        backgroundImage,
        boxShadow,
        spacing,
      },
    },
  },
  plugins: [],
}
export default config