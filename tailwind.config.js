/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#303135",
      },
      grayscale: {
        30: "30%",
        50: "50%",
        70: "70%",
      },
    },
  },
  plugins: [],
};
