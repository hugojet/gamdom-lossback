/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gamdom-dark': '#0a1f1c',
        'gamdom-darker': '#03110e',
        'gamdom-card': '#13302b',
        'gamdom-card-light': '#1c3f39',
        'gamdom-border': '#284c45',
        'gamdom-teal': '#14b8a6',
        'gamdom-teal-light': '#2dd4bf',
        'gamdom-teal-dim': '#0f766e',
        'gamdom-lime': '#bef264',
        'gamdom-lime-bright': '#d9f99d',
        'gamdom-yellow': '#facc15',
      },
      fontFamily: {
        sans: ['Figtree', 'system-ui', 'sans-serif'],
        display: ['Unbounded', 'Figtree', 'system-ui', 'sans-serif'],
        mono: ['"Roboto Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'gamdom-hero': 'radial-gradient(ellipse at 40% 20%, rgba(20,184,166,0.20) 0%, rgba(10,31,28,0) 55%), radial-gradient(ellipse at 80% 90%, rgba(190,242,100,0.10) 0%, rgba(10,31,28,0) 60%)',
        'gamdom-card-grad': 'linear-gradient(135deg, rgba(19,48,43,0.85) 0%, rgba(10,31,28,0.95) 100%)',
        'gamdom-teal-glow': 'radial-gradient(ellipse at center, rgba(20,184,166,0.40) 0%, transparent 65%)',
        'gamdom-hex-grid': 'repeating-linear-gradient(0deg, rgba(20,184,166,0.06) 0, rgba(20,184,166,0.06) 1px, transparent 1px, transparent 56px), repeating-linear-gradient(60deg, rgba(20,184,166,0.06) 0, rgba(20,184,166,0.06) 1px, transparent 1px, transparent 56px), repeating-linear-gradient(-60deg, rgba(20,184,166,0.06) 0, rgba(20,184,166,0.06) 1px, transparent 1px, transparent 56px)',
      },
      boxShadow: {
        'teal-glow': '0 0 30px rgba(20,184,166,0.50)',
        'teal-glow-sm': '0 0 14px rgba(20,184,166,0.30)',
        'lime-glow': '0 0 26px rgba(190,242,100,0.40)',
        'card': '0 6px 28px rgba(0,0,0,0.55)',
        'scale-up': '0 16px 36px -10px rgba(20,184,166,0.40), 0 0 0 1px rgba(20,184,166,0.25)',
      },
      animation: {
        'teal-pulse': 'tealPulse 2.6s ease-in-out infinite',
        'token-float-a': 'tokenFloatA 14s ease-in-out infinite',
        'token-float-b': 'tokenFloatB 18s ease-in-out infinite',
        'token-float-c': 'tokenFloatC 21s ease-in-out infinite',
        'lime-flash': 'limeFlash 7s ease-in-out infinite',
      },
      keyframes: {
        tealPulse: {
          '0%, 100%': { boxShadow: '0 0 18px rgba(20,184,166,0.40)' },
          '50%': { boxShadow: '0 0 44px rgba(20,184,166,0.80)' },
        },
        tokenFloatA: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(28px, -18px) rotate(15deg)' },
        },
        tokenFloatB: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(-32px, 22px) rotate(-20deg)' },
        },
        tokenFloatC: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(22px, 26px) rotate(28deg)' },
        },
        limeFlash: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.75' },
        },
      },
    },
  },
  plugins: [],
}
