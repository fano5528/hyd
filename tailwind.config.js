/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ow: "#F7F9F9",
        mygray: "#E2E2E2",
        myblack: "#090E07",
      },
      spacing: {
        grid: "calc(100vw - 12rem)",
        sgrid: "calc(100vw - 3rem)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
}
