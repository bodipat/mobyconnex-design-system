/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Kanit', '"IBM Plex Sans Thai Looped"', 'system-ui', 'sans-serif'],
        body: ['"IBM Plex Sans Thai Looped"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        line: 'var(--border)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        brand: { DEFAULT: 'var(--brand)', fg: 'var(--brand-fg)', soft: 'var(--brand-soft)', strong: 'var(--brand-strong)' },
        accent: { DEFAULT: 'var(--accent)', fg: 'var(--accent-fg)', soft: 'var(--accent-soft)' },
        navy: { DEFAULT: '#0F1D64', deep: '#0A1449', soft: '#1B2C7E' },
        lime: { DEFAULT: '#7ED956', soft: '#E8F9DE', dark: '#5FBF37' },
        teal: { DEFAULT: '#18979E', soft: '#E1F3F4' },
        success: 'var(--success)', warning: 'var(--warning)', danger: 'var(--danger)', info: 'var(--info)',
      },
      borderRadius: { sm: 'var(--radius-sm)', DEFAULT: 'var(--radius)', lg: 'var(--radius-lg)', xl: 'var(--radius-xl)', '2xl': 'var(--radius-2xl)' },
      boxShadow: { e1: 'var(--shadow-1)', e2: 'var(--shadow-2)', e3: 'var(--shadow-3)' },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(100deg, #18979E 0%, #3EB686 28%, #7ED956 50%, #0F1D64 78%)',
        'brand-gradient-soft': 'linear-gradient(100deg, #18979E 0%, #7ED956 55%)',
      },
      maxWidth: { content: '78rem' },
    },
  },
  plugins: [],
}
