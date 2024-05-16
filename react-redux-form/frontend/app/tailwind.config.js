/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./src/**/*.{html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'btn-color': '#6558f5',
        'header-color': '#E3#8ED',
      },
    },
  },
  plugins: [],
}