/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require("tailwindcss/colors");
const theme = require("./src/config/theme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      inherit: colors.inherit,
      current: colors.current,
      ...theme.colors,
      transparent: colors.transparent,
      red: colors.red,
    },
    fontSize: {
      sm: ["0.75rem", "1rem"],
      base: ["0.875rem", "1.25rem"],
      lg: ["1rem", "1.5rem"],
      xl: ["1.125rem", "1.75rem"],
      "2xl": ["1.5rem", "2rem"],
      "3xl": ["1.875rem", "2.25rem"],
      "4xl": ["2.25rem", "2.5rem"],
    },
    fontWeight: {
      normal: 300,
      bold: 400,
    },
    extend: {
      animation: {
        loading: "spin 650ms linear infinite",
      },
      borderColor: {
        loading: `${theme.colors.neutral[700]} transparent`,
      },
      boxShadow: {
        focus: `0 0 0 3px ${theme.colors.neutral[300]}`,
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
