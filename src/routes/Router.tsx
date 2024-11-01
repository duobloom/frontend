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
      {
        path: "/hospital/map",
        async lazy() {
          const { default: HospitalMapPage } = await import("@/pages/HospitalMapPage");
          return { Component: HospitalMapPage };
        },
      },
      {
        path: "/hospital/:hopital_id",
        async lazy() {
          const { default: HospitalInfoPage } = await import("@/pages/HospitalInfoPage");
          return { Component: HospitalInfoPage };
        },
      },
    ],
  },
]);

export default router;
