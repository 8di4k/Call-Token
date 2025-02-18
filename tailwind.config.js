/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B2B',
          dark: '#E85A1F',
          light: '#FF8F5A'
        }
      },
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif']
      }
    },
  },
  plugins: [],
};