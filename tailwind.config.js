/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["PT Serif", "serif"],
    },
    extend: {
      colors: {
        black: "#111111",
        gray: "#6F6F6F",
        lightGray: "#DDDDDD",
        deepBrown: "#422608",
        lightBrown: "#8B551B",
        peach: "#FDEAE1",
      },
    },
  },
  plugins: [],
};
