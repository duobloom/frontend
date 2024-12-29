import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "@/routes/Router";
import "@/index.css";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_APP_SENTRY_DNS,
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  // 트랜잭션 추적
  tracesSampleRate: 1.0, // 전체 트랜잭션의 100%를 캡처합니다.
  // 'tracePropagationTargets'를 설정하여 분산 추적이 활성화될 URL을 제어
  tracePropagationTargets: ["localhost", /^https:\/\/duo-bloom\.com\/api/],
  // 세션 리플레이
  replaysSessionSampleRate: 0.1, // 세션 리플레이 샘플링 비율을 10%로 설정합니다. 개발 중에는 100%로 설정하고, 프로덕션에서는 낮은 비율로 샘플링하는 것이 좋습니다.
  replaysOnErrorSampleRate: 1.0, // 세션 전체를 샘플링하지 않을 경우, 에러가 발생한 세션에서는 샘플링 비율을 100%로 설정합니다.
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
