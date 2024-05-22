/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A1B',
        secondary: '#333F44',
        accent: '#37AA9C',
        light: '#94F3E4',
        whitish: '#D9D9D9',
        disabledColor: '#969696',
        danger: '#E9192D',
        zephyr: '#242426'
      },
    },
  },
  plugins: [],
}