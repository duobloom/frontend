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
      {
        path: "/policy",
        async lazy() {
          const { default: PolicyPage } = await import("@/pages/PolicyPage");
          return { Component: PolicyPage };
        },
      },
      {
        path: "/policy/:policy_id",
        async lazy() {
          const { default: PolicyInfoPage } = await import("@/pages/PolicyInfoPage");
          return { Component: PolicyInfoPage };
        },
      },
      {
        path: "/feed/:id",
        async lazy() {
          const { default: PostDetailPage } = await import("@/pages/PostDetailPage");
          return { Component: PostDetailPage };
        },
      },
      {
        path: "/community/:id",
        async lazy() {
          const { default: PostDetailPage } = await import("@/pages/PostDetailPage");
          return { Component: PostDetailPage };
        },
      },
      {
        path: "/calendar",
        async lazy() {
          const { default: CalendarPage } = await import("@/pages/CalendarPage");
          return { Component: CalendarPage };
        },
      },
      {
        path: "/calendar/:date",
        async lazy() {
          const { default: CalendarDetailPage } = await import("@/pages/CalendarDetailPage");
          return { Component: CalendarDetailPage };
        },
      },
      {
        path: "/community",
        async lazy() {
          const { default: CommunityPage } = await import("@/pages/CommunityPage");
          return { Component: CommunityPage };
        },
      },
    ],
  },
]);

export default router;
