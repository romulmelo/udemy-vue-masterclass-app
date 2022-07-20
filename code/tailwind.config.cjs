/** @type {import('tailwindcss').Config} */
module.exports = {
  jit: true,
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Be Vietnam Pro", "sans-serif"]
      }
    }
  },
  plugins: []
}
