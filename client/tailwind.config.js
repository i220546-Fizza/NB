/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        champagne: '#D6B77C',
        gold: '#BFA06A',
        'gold-light': '#E4CDA0',
        ivory: '#F7F2E8',
        espresso: '#211A17',
        cocoa: '#3A2C25',
        obsidian: '#0D0B0A',
        beige: '#E8DED0',
        navy: '#0F1B2E',
        'navy-light': '#1B2E48',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.35em',
        widest3: '0.5em',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(2%, -3%, 0) scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        drift: 'drift 18s ease-in-out infinite',
        shimmer: 'shimmer 3.5s linear infinite',
        floatSlow: 'floatSlow 6s ease-in-out infinite',
        fadeUp: 'fadeUp 1s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
