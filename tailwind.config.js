/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2C6BCA",
        primaryAlt: "#E4EAF9",
        secondary: "#EBCC24",
      },
      fontFamily: {
        SpaceGrotesk: ["Space Grotesk", "sans-serif"],
        AudioWide: ["Audiowide", "cursive"],
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/line-clamp")],
};
