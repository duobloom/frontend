import type { Config } from "tailwindcss";

import { PluginCreator } from "tailwindcss/types/config";

const utilsPlugin: PluginCreator = ({ addUtilities }) =>
  addUtilities({
    ".scrollbar-hide": {
      "-ms-overflow-style": "none" /* IE and Edge */,
      "scrollbar-width": "none" /* Firefox */,
      "&::-webkit-scrollbar": {
        display: "none" /* Safari and Chrome */,
      },
    },
  });

const config: Config = {
  mode: "jit", // calc 사용
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      lg_mobile: "425px",
      md_mobile: "375px",
      sm_mobile: "340px",
      xsm_mobile: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      notebook: "1440px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
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
        feed: "0 4px 6px 0 rgba(0, 0, 0, 0.1) inset", // 피드 박스 그림자
      },

      scrollbar: ["hidden"], //스크롤바 숨기기
    },
  },
  plugins: [utilsPlugin],
};
export default config;
