import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 基本のカラー（ライトモード）
        primary: '#1A2A3A',
        secondary: '#0D3B53',
        accent: '#4C6A8A',

        // ダークモード用のカラー
        'primary-dark': '#0D0F11',
        'secondary-dark': '#1A4B6C',
        'accent-dark': '#375D7B',

        // グラデーションカラー
        'gradient-start': '#1A2A3A',
        'gradient-end': '#4C6A8A',
      },
      backgroundImage: {
        'gradient-to-r': 'linear-gradient(to right, #1A2A3A, #4C6A8A)',  // 横方向のグラデーション
      },
      boxShadow: {
        // メタリックな印象を与えるためのシャドウ
        'metallic': '0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        // メタリック感のあるスタイルに適したフォント
        sans: ['Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config