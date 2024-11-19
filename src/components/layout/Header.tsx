/**
<Header variant="titleMove" title="제목" />

<Header variant="titleMove">
  <div>내용</div>
</Header>

<Header variant="backTitle" title="제목" />

<Header variant="backMenu" title="제목" />

<Header variant="backActions" isBookmark={false} handleBookmark={() => {}} />

<Header variant="backSearch" />
 */

import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IconArrowLeft, IconBell, IconBookMark, IconSearch, IconShare } from "@/assets/icon";
import { cn } from "@/utils";

const VARIANTS = {
  TITLE_MOVE: "titleMove", // A
  BACK_TITLE: "backTitle", // B
  BACK_MENU: "backMenu", // C
  BACK_ACTIONS: "backActions", // D
  BACK_SEARCH: "backSearch", // E
} as const;

type TitleMoveHeader = {
  variant: typeof VARIANTS.TITLE_MOVE;
} & (
  | {
      title: string;
      children?: never;
      isBookmark?: never;
      handleBookmark?: () => never;
      searchQuery?: never;
      menuButton?: never;
    }
  | {
      title?: never;
      children: React.ReactNode;
      isBookmark?: never;
      handleBookmark?: () => never;
      searchQuery?: never;
      menuButton?: never;
    }
);

type BackTitleHeader = {
  variant: typeof VARIANTS.BACK_TITLE;
  title: string;
  children?: never;
  isBookmark?: never;
  handleBookmark?: () => never;
  searchQuery?: never;
  menuButton?: never;
};

type BackMenuHeader = {
  variant: typeof VARIANTS.BACK_MENU;
  title?: string;
  children?: never;
  isBookmark?: never;
  handleBookmark?: () => never;
  searchQuery?: never;
  menuButton: () => JSX.Element;
};

type BackActionsHeader = {
  variant: typeof VARIANTS.BACK_ACTIONS;
  title?: never;
  children?: never;
  isBookmark: boolean;
  handleBookmark: () => void;
  searchQuery?: never;
  menuButton?: never;
};

type BackSearchHeader = {
  variant: typeof VARIANTS.BACK_SEARCH;
  title?: never;
  children?: never;
  isBookmark?: never;
  handleBookmark?: () => never;
  searchQuery?: string;
  menuButton?: never;
};

type HeaderProps = (TitleMoveHeader | BackTitleHeader | BackMenuHeader | BackActionsHeader | BackSearchHeader) & {
  className?: string;
};

const Header = ({
  variant,
  children,
  title,
  isBookmark,
  handleBookmark,
  searchQuery,
  menuButton,
  className,
}: HeaderProps) => {
  const navigate = useNavigate();

  // 공유 버튼
  const handleShare = () => {};

  // 뒤로가기 버튼
  const renderBackButton = () => {
    return (
      <button onClick={() => navigate(-1)}>
        <IconArrowLeft />
      </button>
    );
  };

  const renderContent = () => {
    switch (variant) {
      case VARIANTS.TITLE_MOVE:
        return (
          <>
            {title ? <h1 className="text-[2.6rem] font-extrabold leading-normal text-black">{title}</h1> : children}
            <div className="flex items-center gap-[1.5rem]">
              <button onClick={() => navigate("/search")}>
                <IconSearch />
              </button>
              <button onClick={() => navigate("/alarm")}>
                <IconBell />
              </button>
            </div>
          </>
        );

      case VARIANTS.BACK_TITLE:
        return (
          <>
            {renderBackButton()}
            <h2 className="text-[1.6rem] font-extrabold leading-normal text-black">{title}</h2>
            <span className="w-[2.4rem]"></span>
          </>
        );

      case VARIANTS.BACK_MENU:
        return (
          <>
            {renderBackButton()}
            <h2 className="text-[1.6rem] font-extrabold leading-normal text-black">{title}</h2>
            {menuButton()}
          </>
        );

      case VARIANTS.BACK_ACTIONS:
        return (
          <>
            {renderBackButton()}
            <div className="flex items-center gap-[1.5rem]">
              <button onClick={handleShare}>
                <IconShare />
              </button>
              <button onClick={handleBookmark}>
                <IconBookMark className={`${isBookmark ? "stroke-red" : "stroke-gray-300"}`} />
              </button>
            </div>
          </>
        );

      case VARIANTS.BACK_SEARCH: {
        const inputRef = useRef<HTMLInputElement>(null);

        const handleClear = () => {
          if (inputRef.current) {
            inputRef.current.value = "";
            navigate("/search");
          }
        };

        const moveSearch = (e: React.KeyboardEvent) => {
          if (e.key === "Enter") {
            if (inputRef.current) {
              const inputValue = inputRef.current.value;
              if (inputRef.current.value.trim() !== "") navigate(`/search?query=${inputValue}`);
            }
          }
        };
        return (
          <>
            {renderBackButton()}
            <fieldset className="flex h-[4rem] w-[30.6rem] items-center justify-between rounded-[10rem] border border-gray-300 bg-gray-50 px-[1.5rem] py-[.5rem] text-[1.4rem]">
              <input
                type="text"
                ref={inputRef}
                defaultValue={searchQuery}
                className="w-[23.6rem] font-bold leading-normal text-red placeholder-gray-500 outline-none placeholder:font-medium"
                placeholder="검색어를 입력해주세요"
                onKeyUp={moveSearch}
              />
              {searchQuery && (
                <button className="font-medium leading-normal text-gray-500" onClick={handleClear}>
                  취소
                </button>
              )}
            </fieldset>
          </>
        );
      }
    }
  };

  return (
    <header className={cn(`flex h-[5.8rem] w-full items-center justify-between bg-white px-[1.5rem]`, className)}>
      {renderContent()}
    </header>
  );
};

export default Header;
