import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Author from "@/components/ui/Author";
import { BoxContainer, BoxContent, BoxFooter, BoxHeader } from "@/components/ui/Box";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/Carousel";
import IconDotHorizontal from "@/components/ui/IconDotHorizontal";
import LikeAndComments from "@/components/ui/LikeAndComments";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/common/Drawer";
import { MainBoardForm } from "@/components/main";

import { useDeletePostData } from "@/hooks/useDeletePostData";
import { usePostScrap } from "@/hooks/usePostScrap";
import { formatDateConvert } from "@/utils";
import { BoardType } from "@/types";

export default function BoardBox({ board }: { board: BoardType }) {
  const deletePostData = useDeletePostData({ page: false });
  const postScrap = usePostScrap();

  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false); // 메뉴 드로어 상태
  const [isTextDrawerOpen, setIsTextDrawerOpen] = useState(false); // 수정 드로어 상태

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // 글 저장 (스크랩)
  const handleTextSave = () => {
    postScrap.mutate({ type: "board", postId: board.boardId });
    setIsMenuDrawerOpen(false); // 메뉴 드로어 닫기
  };

  // 글 수정
  const handleTextEdit = () => {
    setIsMenuDrawerOpen(false); // 메뉴 드로어 닫기
    setIsTextDrawerOpen(true); // 수정 드로어 열기
  };

  // 글 삭제
  const handleTextDelete = () => {
    deletePostData.mutate({ type: "board", id: String(board.boardId) });
    setIsMenuDrawerOpen(false); // 메뉴 드로어 닫기
  };

  const initialData = {
    content: board.content,
    photoUrls: board.photoUrls.map((url) => ({
      photo_url: url,
      file: undefined,
    })),
  };

  return (
    <BoxContainer>
      <BoxHeader>
        <div className="flex items-center gap-[1.2rem]">
          <Author
            profileImg={board.authorProfilePictureUrl}
            name={board.authorNickname}
            createdAt={formatDateConvert(board.updatedAt)}
            isMe={board.mine}
          />
        </div>
        {/* 메뉴 Drawer */}
        <Drawer open={isMenuDrawerOpen} onOpenChange={setIsMenuDrawerOpen}>
          <DrawerTrigger asChild>
            <IconDotHorizontal className="cursor-pointer" aria-label="게시글 메뉴 열기" />
          </DrawerTrigger>
          <DrawerContent className="h-[23%]">
            <div className="flex flex-col gap-[1.8rem] px-[9rem] py-[3.9rem] text-[1.6rem] font-extrabold leading-normal tracking-[-0.032rem]">
              <button onClick={handleTextSave}>글 저장</button>
              {board.mine && (
                <>
                  <button onClick={handleTextEdit}>수정</button>
                  <button onClick={handleTextDelete}>삭제</button>
                </>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </BoxHeader>

      {/* 수정 Drawer */}
      <Drawer dismissible={false} open={isTextDrawerOpen} onOpenChange={setIsTextDrawerOpen}>
        <DrawerContent>
          <MainBoardForm
            id={board.boardId}
            type="edit"
            initialData={initialData}
            onClose={() => setIsTextDrawerOpen(false)}
          />
        </DrawerContent>
      </Drawer>

      <BoxContent className="ml-[4.8rem] mt-[1rem] flex flex-col">
        <Link
          to={`/board/${board.boardId}`}
          className="line-clamp-3 text-[1.3rem] font-medium leading-[1.8rem] text-black"
        >
          {board.content}
        </Link>

        {board.photoUrls && board.photoUrls.length > 0 && (
          <div className="relative mt-[1.5rem]">
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {board.photoUrls.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-square w-full overflow-hidden rounded-[1rem] border border-gray-300">
                      <img src={image} alt="이미지" className="h-full w-full object-cover" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            {board.photoUrls.length > 1 && (
              <div className="absolute right-[1.5rem] top-[1.5rem] flex h-[2.4rem] w-auto min-w-[3.5rem] items-center justify-center rounded-[10rem] bg-black bg-opacity-80 px-[.7rem] py-[.5rem] text-[1rem] font-bold leading-normal tracking-[2px] text-white">
                {current}/{count}
              </div>
            )}
          </div>
        )}
      </BoxContent>

      <BoxFooter className="ml-[4.8rem]">
        <LikeAndComments
          type="board"
          id={String(board.boardId)}
          likeCount={board.likeCount}
          commentCount={board.commentCount}
          likedByUser={board.likedByUser}
        />
      </BoxFooter>
    </BoxContainer>
  );
}
