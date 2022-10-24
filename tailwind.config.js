/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
    colors: {
      primary: '#EF7A75',
      darkPrimary: '#da716c',
      secondary: '#F5EDE8',
      gray: '#a6a6a6',
      white: '#FFFFFF',
      black: '#000000',
      transparentBlack: 'rgba(0,0,0,1)',
      transparentBlack1: 'rgba(0,0,0,0.1)',
      transparentBlack9: 'rgba(0,0,0,0.9)',
      dustBlack: '#282828',
      lightGreen: '#80e876',
      midnightGreen: '#2a4f27',
    },
    extend: {
    },
  },
  plugins: [],
}
