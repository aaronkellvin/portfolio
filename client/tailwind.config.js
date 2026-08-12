/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#faf6ef',
          alt: '#f2ebe0',
          panel: '#ffffff',
          muted: '#f7f1e8',
        },
        ink: {
          DEFAULT: '#141414',
          soft: '#3a3a3a',
        },
        gold: {
          DEFAULT: '#b8863a',
          soft: 'rgba(184, 134, 58, 0.14)',
        },
        terracotta: '#c75b39',
        wine: '#7a3e48',
        line: '#e5dbcc',
        muted: '#6a6258',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 18px rgba(20, 20, 20, 0.07)',
        card: '0 12px 36px rgba(20, 20, 20, 0.09)',
        lift: '0 24px 60px rgba(20, 20, 20, 0.11)',
        accent: '0 16px 44px rgba(20, 20, 20, 0.14)',
      },
      borderRadius: {
        xl: '18px',
        '2xl': '24px',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'blob-1': 'blob1 28s ease-in-out infinite',
        'blob-2': 'blob2 32s ease-in-out infinite',
        aurora: 'aurora 48s linear infinite',
      },
      keyframes: {
        blob1: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(32px, -24px, 0)' },
        },
        blob2: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(-28px, 20px, 0)' },
        },
        aurora: {
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
