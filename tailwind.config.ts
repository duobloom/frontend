/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Pretendard"', "sans-serif"],
      },
      colors: {
        red: {
          DEFAULT: "#FF5A5A",
        },
        blue: {
          DEFAULT: "#3978F2",
        },
        black: {
          DEFAULT: "#212721",
        },
        gray: {
          DEFAULT: "#9DA0A7",
        },
      },
    },
  },
  plugins: [],
};
