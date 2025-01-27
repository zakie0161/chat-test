/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "gray-700": 'rgb(64,65,78)',
        "gray-800": "rgba(52,53,65,1)",
        "gray-900": 'rgb(32,33,35)',
        primary: '#1E293B', // Add a "primary" color for consistency
        secondary: '#64748B', // Secondary color for softer accents
        accent: '#10B981', // Accent color for highlights (green)
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '108': '27rem',
        '280': '280px', // Keep your custom width value
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      backgroundImage: {
        'vert-dark-gradient': 'linear-gradient(180deg, rgba(53, 55, 64, 0), #353740 58.85%)',
        'radial-gradient': 'radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'], // Add a modern font stack
        mono: ['Fira Code', 'ui-monospace', 'monospace'], // For monospaced text
      },
      boxShadow: {
        'soft': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'hard': '0 6px 12px rgba(0, 0, 0, 0.2)',
        'accent': '0 4px 6px rgba(16, 185, 129, 0.5)', // Shadow matching the accent color
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        fadeOut: 'fadeOut 0.5s ease-in-out',
        slideIn: 'slideIn 0.5s ease-in-out',
      },
      // typography: {
      //   DEFAULT: {
      //     css: {
      //       h1: {
      //         color: '#1a202c', // dark gray
      //         fontWeight: '700',
      //       },
      //       a: {
      //         color: '#3182ce', // blue
      //         textDecoration: 'underline',
      //         '&:hover': {
      //           color: '#2b6cb0', // darker blue
      //         },
      //       },
      //     },
      //   },
      // },
    },
  },
  plugins: [],
  // plugins: [require('@tailwindcss/typography')],
}
