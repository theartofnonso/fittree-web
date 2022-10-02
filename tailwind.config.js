/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      Montserrat: ['Montserrat', 'sans-serif'],
    },
    colors: {
      primary: '#EF7A75',
      secondary: '#F5EDE8',
      white: '#FFFFFF'
    },
    extend: {},
  },
  plugins: [],
}
