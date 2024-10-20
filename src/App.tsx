import { Outlet } from "react-router-dom";
import logo from "@/assets/icon/logo_duobloom.svg";

function App() {
  return (
    <div className="flex min-h-screen justify-center bg-[#fff5f5]">
      <div className="flex w-[120rem] justify-between">
        <div className="ml-[10.2rem] mt-[5rem] w-[49rem]">
          <img src={logo} alt="로고이미지" />
          <div className="mt-[15rem] text-[4.6rem] font-medium leading-[5.5rem] tracking-[-2px]">
            <h1>소중한 길을</h1>
            <h1>따뜻하게 동행하는</h1>
            <h1 className="font-black text-red">듀오블룸</h1>
          </div>
        </div>
        <div className="mr-[8.5rem] flex h-full w-[37.5rem] flex-col bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
