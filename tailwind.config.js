const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)', ...fontFamily.sans],
      },
      colors: {
        primary: {"50":"#fef2f2","100":"#fee2e2","200":"#fecaca","300":"#fca5a5","400":"#f87171","500":"#ef4444","600":"#dc2626","700":"#b91c1c","800":"#991b1b","900":"#7f1d1d"}
      },
      blur: {
        '2xs': '1px',
        xs: '2px',
      },
      height: {
        300: '300px',
        500: '500px'
      },
      brightness: {
        25: '.25',
        175: '1.75',
      },
      gridTemplateColumns: {
        '6': 'repeat(6, minmax(0, 1fr))',
      },
      
      // that is animation class
      animation: {
        fade: 'fadeIn 1s ease-in-out',
      },

      // that is actual animation
      keyframes: theme => ({
        fadeIn: {
          '0%': { backgroundColor: theme('colors.black') },
          '100%': { backgroundColor: theme('colors.transparent') },
        },
      }),
    },
  },
  plugins: [
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/line-clamp'),
      require('@tailwindcss/typography'),
      require('flowbite-typography'),
      require('flowbite/plugin')
  ],
}