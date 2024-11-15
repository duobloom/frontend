import { useState } from "react";
import Header from "@/components/layout/Header";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/common/Drawer";
import { PostForm } from "@/components/common";
import IconDotHorizontal from "@/components/ui/IconDotHorizontal";
import { BoardType, CommunityType } from "@/types";

// type EditPostType<T extends "board" | "community"> = T extends "board"
//   ? Pick<BoardType, "content"> & {
//       photoUrls: {
//         photo_url: string;
//         file?: File;
//       }[];
//     }
//   : Omit<CommunityType, "photoUrls"> & {
//       photoUrls: {
//         photo_url: string;
//         file?: File;
//       }[];
//     };

type TPostHeaderProps = {
  postData: BoardType | CommunityType;
  variant: "board" | "community";
  id: number;
};

const PostHeader = ({ postData, variant, id }: TPostHeaderProps) => {
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false); // 메뉴 드로어 상태
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false); // 수정 드로어 상태

  const boardInitialData = {
    content: postData.content,
    photoUrls: postData.photoUrls.map((url) => ({
      photo_url: url,
      file: undefined,
    })),
  };

  // props로 넘겨줄 값
  const initialData =
    variant === "community"
      ? {
          ...boardInitialData,
          type: (postData as CommunityType).type,
          tags: (postData as CommunityType).tags,
        }
      : boardInitialData;

  // 글 저장
  const handleBoardSave = (id: number) => {
    console.log(id);
  };

  // 글 수정
  const handleBoardEdit = (id: number) => {
    console.log(id);
    setIsMenuDrawerOpen(false); // 메뉴 드로어 닫기
    setIsEditDrawerOpen(true); // 수정 드로어 열기
  };

  // 글 삭제
  const handleBoardDelete = (id: number) => {
    console.log(id);
  };

  const renderMenuButton = () => (
    <Drawer open={isMenuDrawerOpen} onOpenChange={setIsMenuDrawerOpen}>
      <DrawerTrigger asChild>
        <IconDotHorizontal className="cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent className="h-[23%]">
        <div className="flex flex-col gap-[1.8rem] px-[9rem] py-[3.9rem] text-[1.6rem] font-extrabold leading-normal tracking-[-0.032rem]">
          <button onClick={() => handleBoardSave(id)}>글 저장</button>
          <button onClick={() => handleBoardEdit(id)}>수정</button>
          <button onClick={() => handleBoardDelete(id)}>삭제</button>
        </div>
      </DrawerContent>
    </Drawer>
  );

  return (
    <>
      <Header variant="backMenu" menuButton={renderMenuButton} />

      {/* 수정 Drawer */}
      <Drawer dismissible={false} open={isEditDrawerOpen} onOpenChange={setIsEditDrawerOpen}>
        <DrawerContent>
          <PostForm
            type="edit"
            context={variant}
            initialData={initialData}
            onClose={() => setIsEditDrawerOpen(false)}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PostHeader;
