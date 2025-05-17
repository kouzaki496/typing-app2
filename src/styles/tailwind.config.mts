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
        colors: {
          background: "var(--background)",
          foreground: "var(--foreground)",
          card: "var(--card)",
          "card-foreground": "var(--card-foreground)",
          popover: "var(--popover)",
          "popover-foreground": "var(--popover-foreground)",
          primary: "var(--primary)",
          "primary-foreground": "var(--primary-foreground)",
          secondary: "var(--secondary)",
          "secondary-foreground": "var(--secondary-foreground)",
          muted: "var(--muted)",
          "muted-foreground": "var(--muted-foreground)",
          accent: "var(--accent)",
          "accent-foreground": "var(--accent-foreground)",
          destructive: "var(--destructive)",
          border: "var(--border)",
          input: "var(--input)",
          ring: "var(--ring)",
          // 必要に応じて他の色も追加
        },
    },
  },
  plugins: [animate],
}
export default config