/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f2f1ff',
          100: '#e6e4ff',
          200: '#d0ccff',
          300: '#aea5ff',
          400: '#8a78ff',
          500: '#6d4dff',
          600: '#5c31f2',
          700: '#4c24cf',
          800: '#3f1fa8',
          900: '#351d85',
        },
        accent: {
          400: '#38bdf8',
          500: '#6366f1',
          600: '#8b5cf6',
          700: '#a855f7',
        },
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(76, 36, 207, 0.12)',
        'glass-lg': '0 20px 60px -10px rgba(76, 36, 207, 0.25)',
        'glow-brand': '0 0 0 1px rgba(255,255,255,0.4), 0 8px 24px -4px rgba(109,77,255,0.35)',
      },
      borderRadius: {
        xl2: '18px',
        xl3: '20px',
      },
      backgroundImage: {
        'grid-light':
          'linear-gradient(rgba(109,77,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(109,77,255,0.06) 1px, transparent 1px)',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        popIn: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        fadeUp: {
          '0%': { transform: 'translateY(8px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width, 0%)' },
        },
        confettiFall: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
          '100%': { transform: 'translate(var(--drift, 0px), 105vh) rotate(var(--rotate, 360deg))', opacity: 0.4 },
        },
      },
      animation: {
        floatSlow: 'floatSlow 6s ease-in-out infinite',
        popIn: 'popIn 0.25s ease-out',
        fadeUp: 'fadeUp 0.35s ease-out',
        shimmer: 'shimmer 1.6s linear infinite',
        progressFill: 'progressFill 1s ease-out forwards',
        confettiFall: 'confettiFall linear forwards',
      },
    },
  },
  plugins: [],
}
