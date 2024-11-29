/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#D40037',
        secondary: '#9D9D9C',
        dark: '#121212',
        light: '#ffffff',
        dark: '#000000',
        selectionBg: '#D40037', // Gold background color
        selectionText: '#ffffff', // Black text color
      },
    },
  },
  plugins: [],
};