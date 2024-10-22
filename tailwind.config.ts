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
          500: "#9DA0A7", // 폰트에서 사용하는 색
          300: "#E2E2E2", // 박스, 카드, 북마크, input 테두리 색
          100: "#F4F4F4", // 텍스트 박스, 첨부한 이미지 테두리, hr 색
          50: "#FCFCFC", // 배경 색
        },
      },
      boxShadow: {
        box: "0 4px 6px rgba(0, 0, 0, 0.1)", // 박스 그림자
      },
    },
  },
  plugins: [],
};
