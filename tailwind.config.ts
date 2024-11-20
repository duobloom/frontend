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
          10: "#FF5A5A1A",
          500: "#BB2626",
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
        box: "0 2px 8px 0 rgba(0, 0, 0, 0.10)", // 박스 그림자
        feed: "0 1px 4px 0 rgba(0, 0, 0, 0.03) inset", // 피드 박스 그림자
        "feed-side": "0 5px -1px 0 rgba(0, 0, 0, 0.03) inset", // 피드 박스 사이드 그림자
        icon: "4px 4px 20px 0px rgba(0, 0, 0, 0.25)", // 아이콘 버튼 그림자
      },

      scrollbar: ["hidden"], //스크롤바 숨기기

      keyframes: {
        fadein: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeout: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" },
        },
      },
      animation: {
        fadein: "fadein 0.5s ease-in-out",
        fadeout: "fadeout 1s ease-in-out",
      },
    },
  },
  plugins: [utilsPlugin],
};
export default config;
