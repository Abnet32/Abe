/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        heading: ["Outfit", "sans-serif"],
        amharic: ["Benaiah", "Noto Serif Ethiopic", "serif"],
      },
      colors: {
        brand: {
          red: "#E61C23",
          dark: "#111827",
          blue: "#0B132B",
        },
      },
    },
  },
  plugins: [],
};
