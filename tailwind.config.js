module.exports = {
  purge: ["./src/popup/**/*.{svelte,html}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    nightwind: {
      colors: {
          red: {
              700: "red.700"
          }
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('nightwind'),
  ],
  daisyui: {
    styled: true,
    themes: false,
    rtl: false,
  },
};
