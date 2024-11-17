import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import { isMobile } from "react-device-detect";
import Navbar from "./components/layout/Nav";
import { cn } from "./utils";
import { IconLogoDoubloom } from "@/assets/icon";

const queryClient = new QueryClient();

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = import.meta.env.VITE_APP_API_ENDPOINT;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen items-center justify-center bg-[#fff5f5]">
        <div className="container relative flex max-w-[100rem] justify-between xl:max-w-[120rem]">
          {/* Left section - 로고 영역 */}
          <div className="hidden lg:block notebook:w-[82.5rem]">
            <div className="relative h-screen w-full max-w-[50rem] pt-[5rem] xl:pl-[10.2rem]">
              <div className="mb-[14.7rem]">
                <IconLogoDoubloom />
              </div>
              <div className="space-y-[0.2rem] text-[4.6rem] font-medium leading-[1.2] tracking-[-0.2rem]">
                <h1>소중한 길을</h1>
                <h1>따뜻하게 동행하는</h1>
                <h1 className="font-black text-red">듀오블룸</h1>
              </div>
            </div>
          </div>
          {/* Right section - 앱 영역 */}
          <div className="right-section flex w-full justify-center lg:w-[37.5rem] lg:min-w-[37.5rem]">
            <div className={cn("h-screen w-full bg-white shadow-lg", isMobile ? "w-full" : "max-w-[37.5rem]")}>
              <div className="flex h-full flex-col">
                <div className="flex-1 overflow-y-auto will-change-scroll">
                  <Outlet />
                </div>
                <Navbar />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
