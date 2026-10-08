import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0a0e27',
        darker: '#050812',
        accent: '#00d9ff',
        success: '#00ff88',
        warning: '#ffaa00',
        error: '#ff4444',
      },
      fontFamily: {
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
