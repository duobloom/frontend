import { useState } from "react";
import Header from "@/components/layout/Header";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/common/Drawer";
import IconDotHorizontal from "../ui/IconDotHorizontal";
import { BoardType } from "@/types";
import { PostForm } from "../common";

const BoardHeader = ({ boardData }: { boardData: BoardType }) => {
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false); // 메뉴 드로어 상태
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false); // 수정 드로어 상태

  const handleBoardSave = (id: number) => {
    console.log(id);
  };
  const handleBoardEdit = (id: number) => {
    console.log(id);
    setIsMenuDrawerOpen(false); // 메뉴 드로어 닫기
    setIsEditDrawerOpen(true); // 수정 드로어 열기
  };
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
          <button onClick={() => handleBoardSave(boardData.boardId)}>글 저장</button>
          <button onClick={() => handleBoardEdit(boardData.boardId)}>수정</button>
          <button onClick={() => handleBoardDelete(boardData.boardId)}>삭제</button>
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
          <PostForm type="edit" context="board" initialData={boardData} onClose={() => setIsEditDrawerOpen(false)} />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default BoardHeader;
