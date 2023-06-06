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
      gridTemplateRows: {
        // Simple 8 row grid
        '4': 'repeat(4, minmax(0, 1fr))',
        '8': 'repeat(8, minmax(0, 1fr))',
        '10': 'repeat(10, minmax(0, 1fr))',
        '6': 'repeat(6, minmax(0, 1fr))',
        // Complex site-specific row configuration
        'layout': 'repeat(auto-fill, minmax(100px, 1fr))',
      },
       gridTemplateColumns: {
        // Simple 16 column grid
        '15': 'repeat(15, minmax(0, 1fr))',

        // Complex site-specific column configuration
        'footer': '200px minmax(900px, 1fr) 100px',
      },
       height: {
        'custom': '699px',
        'table': '565px'
      }
    },
  },
  plugins: [],
};
