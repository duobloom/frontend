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
    ],
  },
]);

export default router;
