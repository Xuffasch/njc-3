module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      // enable the modification of background color when the 'active' attribute is set on an element
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
