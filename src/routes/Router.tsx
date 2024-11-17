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
      {
        path: "/board/:id",
        async lazy() {
          const { default: BoardDetailPage } = await import("@/pages/BoardDetailPage");
          return { Component: BoardDetailPage };
        },
      },
      {
        path: "/community/:id",
        async lazy() {
          const { default: CommunityDetailPage } = await import("@/pages/CommunityDetailPage");
          return { Component: CommunityDetailPage };
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
      {
        path: "/login",
        async lazy() {
          const { default: LoginPage } = await import("@/pages/LoginPage");
          return { Component: LoginPage };
        },
      },
      {
        path: "/search",
        async lazy() {
          const { default: SearchPage } = await import("@/pages/SearchPage");
          return { Component: SearchPage };
        },
      },
      {
        path: "/alarm",
        async lazy() {
          const { default: AlarmPage } = await import("@/pages/AlarmPage");
          return { Component: AlarmPage };
        },
      },
    ],
  },
]);

export default router;
