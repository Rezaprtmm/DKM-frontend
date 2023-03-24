const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#FBFDFF",
          200: "#F8FBFF",
          300: "#F0F6FF",
          400: "#E9F2FF",
          500: "#E1EDFF",
          600: "#DAE9FF",
          700: "#AEBACC",
          800: "#838C99",
          900: "#575D66",
          1000: "#2C2F33",
        },
        ribbon: {
          100: "#E6F0FF",
          200: "#CCE0FF",
          300: "#99C2FF",
          400: "#66A3FF",
          500: "#3385FF",
          600: "#0066FF",
          700: "#0052CC",
          800: "#003D99",
          900: "#002966",
          1000: "#001433",
        },
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "608px",
          },
          "@screen md": {
            maxWidth: "736px",
          },
          "@screen lg": {
            maxWidth: "992px",
          },
          "@screen xl": {
            maxWidth: "1180px",
          },
        },
      });
    },
    require("@tailwindcss/line-clamp"),
  ],
};
