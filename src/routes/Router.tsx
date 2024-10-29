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
        path: "/hospital",
        async lazy() {
          const { default: HospitalPage } = await import("@/pages/HospitalPage");
          return { Component: HospitalPage };
        },
      },
    ],
  },
]);

export default router;
