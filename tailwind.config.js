// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
      normal: 400,
      bold: 500,
    },
    extend: {
      animation: {
        loading: "spin 650ms linear infinite",
      },
      borderColor: {
        loading: `${colors.slate[700]} transparent`,
      },
      boxShadow: {
        focus: `0 0 0 3px ${colors.slate[300]}`,
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
