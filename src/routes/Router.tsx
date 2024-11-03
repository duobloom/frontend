import { createBrowserRouter } from "react-router-dom";
import App from "@/App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        async lazy() {
          const { default: MainPage } = await import("@/pages/MainPage");
          return { Component: MainPage };
        },
      },
      {
        path: "/feed/:id",
        async lazy() {
          const { default: FeedDetailPage } = await import("@/pages/FeedDetailPage");
          return { Component: FeedDetailPage };
        },
      },
    ],
  },
]);

export default router;
