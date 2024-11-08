import { Outlet } from "react-router-dom";
import { IconLogoDoubloom } from "@/assets/icon";
import Navbar from "./components/layout/Nav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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
            <div className="h-screen w-full max-w-[37.5rem] bg-white shadow-lg">
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
    </QueryClientProvider>
  );
}

export default App;
