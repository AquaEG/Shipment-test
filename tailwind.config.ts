import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f5ff',
          100: '#dfe8ff',
          200: '#c6d6ff',
          300: '#9ab7ff',
          400: '#6f92ff',
          500: '#4d72ff',
          600: '#3e59f3',
          700: '#3447da',
          800: '#2d3caf',
          900: '#262f82',
        },
        cyanGlow: '#43d8ff',
        violetGlow: '#8b5cf6',
        midnight: '#060816',
        panel: '#0d1328',
      },
      boxShadow: {
        soft: '0 28px 60px -30px rgba(8, 15, 35, 0.8)',
        glow: '0 0 0 1px rgba(125, 137, 255, 0.2), 0 24px 80px -30px rgba(77, 114, 255, 0.45)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Sora"', '"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgba(148, 163, 184, 0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.14) 1px, transparent 1px)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '0.65' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
        pulse: 'pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
