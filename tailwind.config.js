/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'radial-gradient-yellow': 'radial-gradient(81.65% 10898.53% at 18.35% 50%, #EAD550 0%, #EAD250 2.07%, #EAD250 2.08%, #EAD250 2.09%, #EAD250 9.38%, #EAD250 25%, #EAD250 25.01%, #EAD250 27.08%, #EAD250 31.25%, #EAD250 31.26%, #EAD250 34.38%, #EAD251 37.5%, #EAD251 41.15%, #EAD251 45.83%, #EAD351 66.42%, #E5CD42 80.21%, #E2C837 90.62%, #E2C836 90.64%, #DFC42E 100%)'
      },
      colors: {
        greyscale: {
          20: '#AEBCCA',
          80: '#464646',
          90: '#1C1C1C'
        },
        green: '#1EA945',
        orange: '#D67B27',
        yellow: {
          DEFAULT: '#F5D836',
          light: '#EAD550',
          dark: '#DFC42E'
        },
        blue: '#3677F5'
      }
    }
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('not-first', '&:not(:first-child)')
    })
  ]
}
