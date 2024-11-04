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
        path: "/mypage",
        async lazy() {
          const { default: MyPage } = await import("@/pages/Mypage/MyPage");
          return { Component: MyPage };
        },
      },
      {
        path: "/mypage/point",
        async lazy() {
          const { default: MyPoint } = await import("@/pages/Mypage/MyPoint");
          return { Component: MyPoint };
        },
      },
      {
        path: "/mypage/editinfo",
        async lazy() {
          const { default: EditMyInfo } = await import("@/pages/Mypage/EditMyInfo");
          return { Component: EditMyInfo };
        },
      },
      {
        path: "/mypage/myscrap",
        async lazy() {
          const { default: MyScrap } = await import("@/pages/Mypage/MyScrap");
          return { Component: MyScrap };
        },
      },
      {
        path: "/mypage/savedpost",
        async lazy() {
          const { default: SavedPost } = await import("@/pages/Mypage/SavedPost");
          return { Component: SavedPost };
        },
      },
    ],
  },
]);

export default router;
