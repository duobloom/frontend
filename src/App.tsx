import { Outlet } from "react-router-dom";
import { IconLogoDoubloom } from "@/assets/icon";
import Navbar from "./components/layout/Nav";

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fff5f5]">
      <div className="container relative flex max-w-[120rem] justify-center">
        {/* Left section - 로고 영역 */}
        <div className="hidden lg:block lg:w-[50%] xl:w-[55%]">
          <div className="relative h-screen w-full max-w-[49rem] pt-[5.1rem]">
            <div className="mb-20">
              <IconLogoDoubloom />
            </div>
            <div className="space-y-2 text-[4.6rem] font-medium leading-[1.2] tracking-[-2px]">
              <h1>소중한 길을</h1>
              <h1>따뜻하게 동행하는</h1>
              <h1 className="font-black text-red">듀오블룸</h1>
            </div>
          </div>
        </div>

        {/* Right section - 앱 영역 */}
        <div className="flex w-full justify-center lg:relative lg:w-[37.5rem]">
          <div className="right-1/4 top-0 h-screen w-full max-w-[37.5rem] bg-white shadow-lg lg:fixed lg:right-auto">
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
  );
}

export default App;
