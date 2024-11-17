import { useState } from "react";
import Header from "@/components/layout/Header";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/common/Drawer";
import { PostForm } from "@/components/common";
import IconDotHorizontal from "@/components/ui/IconDotHorizontal";
import { useDeletePostData } from "@/hooks/useDeletePostData";
import { usePostScrap } from "@/hooks/usePostScrap";
import { BoardType, CommunityDetailType } from "@/types";

// type EditPostType<T extends "board" | "community"> = T extends "board"
//   ? Pick<BoardType, "content"> & {
//       photoUrls: {
//         photo_url: string;
//         file?: File;
//       }[];
//     }
//   : Omit<CommunityDetailType, "photoUrls"> & {
//       photoUrls: {
//         photo_url: string;
//         file?: File;
//       }[];
//     };

type TPostHeaderProps = {
  postData: BoardType | CommunityDetailType;
  variant: "board" | "community";
  id: string;
};

const PostHeader = ({ postData, variant, id }: TPostHeaderProps) => {
  const deletePostData = useDeletePostData({ page: true });
  const postScrap = usePostScrap();

  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false); // 메뉴 드로어 상태
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false); // 수정 드로어 상태

  const imagesList = variant === "board" ? (postData as BoardType).photoUrls : (postData as CommunityDetailType).images;
  const isMe = variant === "board" ? (postData as BoardType).mine : (postData as CommunityDetailType).owner;
  const content =
    variant === "board" ? (postData as BoardType).content : (postData as CommunityDetailType).community.content;

  const boardInitialData = {
    content: content,
    images: imagesList.map((url) => ({
      photo_url: url,
      file: undefined,
    })),
  };

  // props로 넘겨줄 값
  const initialData =
    variant === "community"
      ? {
          ...boardInitialData,
          type: (postData as CommunityDetailType).community.type,
          tags: (postData as CommunityDetailType).tags,
        }
      : boardInitialData;

  // 글 저장
  const handleBoardSave = () => {
    postScrap.mutate({ type: variant, postId: Number(id) });
    setIsMenuDrawerOpen(false); // 메뉴 드로어 닫기
  };

  // 글 수정
  const handleBoardEdit = () => {
    setIsMenuDrawerOpen(false); // 메뉴 드로어 닫기
    setIsEditDrawerOpen(true); // 수정 드로어 열기
  };

  // 글 삭제
  const handleBoardDelete = () => {
    deletePostData.mutate({ type: variant, id });
  };

  const renderMenuButton = () => (
    <Drawer open={isMenuDrawerOpen} onOpenChange={setIsMenuDrawerOpen}>
      <DrawerTrigger asChild>
        <IconDotHorizontal className="cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent className="h-[23%]">
        <div className="flex flex-col gap-[1.8rem] px-[9rem] py-[3.9rem] text-[1.6rem] font-extrabold leading-normal tracking-[-0.032rem]">
          <button onClick={handleBoardSave}>글 저장</button>
          {isMe && (
            <>
              <button onClick={handleBoardEdit}>수정</button>
              <button onClick={handleBoardDelete}>삭제</button>
            </>
          )}
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
            id={Number(id)}
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
