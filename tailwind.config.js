/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        coiny : ["Coiny", ...defaultTheme.fontFamily.sans]
      },
      colors:{
        "brand-purple" : 'var(--purple)',
        "brand-pink": 'var(--pink)',
        "brand-green": 'var(--green)',
        "brand-blue": 'var(--blue)',
        "brand-yellow": 'var(--yellow)',
        "brand-white":'var(--selection-text)'
      }
    },
  },
  plugins: [],
}
