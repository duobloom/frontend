import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import axios from "axios";
import router from "@/routes/Router";
import "@/index.css";

// axiosClient가 어느정도 마무리 되면 옮기기
axios.defaults.baseURL = import.meta.env.VITE_APP_API_ENDPOINT;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
