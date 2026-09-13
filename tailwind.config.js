/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@dipesh.singh/**/*.{js,mjs,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fit: {
          pass: "#16a34a",
          warn: "#ca8a04",
          fail: "#dc2626",
        }
      }
    },
  },
  plugins: [],
}

