import type { Config } from 'tailwindcss'
import { theme } from '@/styles/theme'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: theme.colors,
      backgroundImage: theme.backgroundImage,
      boxShadow: theme.boxShadow,
      fontFamily: theme.fontFamily,
    },
  },
  plugins: [],
}
export default config