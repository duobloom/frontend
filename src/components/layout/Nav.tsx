import { cn } from "@/utils";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { IconNavHome, IconNavMypage, IconNavPolicy, IconNavHospital, IconNavCommunity } from "@/assets/icon";

type NavItem = {
  name: string;
  path: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

const NAV_ITEMS: NavItem[] = [
  { name: "홈 피드", path: "/", Icon: IconNavHome },
  { name: "맞춤 정책", path: "/policy", Icon: IconNavPolicy },
  { name: "병원/클리닉", path: "/hospital", Icon: IconNavHospital },
  { name: "커뮤니티", path: "/community", Icon: IconNavCommunity },
  { name: "내 정보", path: "/mypage", Icon: IconNavMypage },
];

const NavBarContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed bottom-0 flex w-full items-center justify-between border-t border-gray-300 bg-[#fff] px-[3rem] py-[1.2rem] md_mobile:px-[4rem] lg:w-[37.5rem] lg:min-w-[37.5rem]",
        isMobile ? "w-full" : "max-w-[37.5rem]",
        className,
      )}
      {...props}
    />
  ),
);
NavBarContainer.displayName = "NavBarContainer";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!NAV_ITEMS.find((item) => item.path === location.pathname)) return;

  const isActive = (path: string) => location.pathname === path;
  return (
    <NavBarContainer>
      {NAV_ITEMS.map((item) => (
        <button key={item.path} onClick={() => navigate(item.path)} className="flex flex-col items-center">
          <item.Icon className={cn("h-[2.5rem] w-[2.5rem]", isActive(item.path) ? "text-red" : "text-gray-500")} />
          <span className={cn("text-[1rem] font-medium", isActive(item.path) ? "text-red" : "text-gray-500")}>
            {item.name}
          </span>
        </button>
      ))}
    </NavBarContainer>
  );
};

export default Navbar;
