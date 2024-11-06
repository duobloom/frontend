import React, { useEffect, useRef, useState } from "react";
import { DrawerTitle } from "@/components/common/Drawer";
import { Button } from "@/components/common";
import { CategoryButton } from "@/components/common/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/common/AlertDialog";
import useDraggable from "@/hooks/useDraggable";
import { FeedPostFormType, CommunityPostFormType } from "@/types";
import { IconCamera, IconCircleClose, IconClose } from "@/assets/icon";

type TPostFormProps = {
  type: "add" | "edit";
  context: "feed" | "community";
  initialData?: (FeedPostFormType | CommunityPostFormType) | null;
  onClose: () => void;
};

const PostForm = ({ type, context, initialData = null, onClose }: TPostFormProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const draggableOptions = useDraggable(scrollRef);

  const [selectedButton, setSelectedButton] = useState(0);
  const [imgList, setImgList] = useState<{ url: string; alt?: string }[]>(initialData?.images || []);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [tagList, setTagList] = useState(
    context === "community" && initialData && "tags" in initialData ? initialData?.tags : [],
  );

  useEffect(() => {
    if (textRef.current) {
      textRef.current.addEventListener("input", updateFormValidity);
    }
    return () => {
      if (textRef.current) {
        textRef.current.removeEventListener("input", updateFormValidity);
      }
    };
  }, [imgList]);

  // 완료 버튼 활성화
  const updateFormValidity = () => {
    if (textRef.current) {
      const isTextPresent = textRef.current.value.trim().length > 0;
      const isImagePresent = imgList.length > 0;
      setIsFormValid(isTextPresent || isImagePresent);
    }
  };

  // 제출
  const handleSubmit = () => {
    if (fileRef.current) {
      console.log(fileRef.current.value);
      console.log(imgList);
    }
    onClose();
  };

  // 이미지 삭제
  const handleImgDelete = (imgUrl: string) => {
    const newList = imgList.filter((img) => img.url !== imgUrl);
    setImgList(newList);
    if (textRef.current) {
      setIsFormValid(textRef.current.value.trim().length > 0 || newList.length > 0);
    }
  };

  // 이미지 추가
  const handleImgAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = target.files;

    if (!files || files.length === 0) return;

    const newImage = {
      url: URL.createObjectURL(files[0]), // img_src를 url로 변경
      alt: "", // 필요한 경우 alt를 여기에 설정할 수 있습니다.
    };
    setImgList([...imgList, newImage]);
    setIsFormValid(true);
  };

  // 태그 입력
  const handleEnterEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleTagInput();
  };

  const handleTagInput = () => {
    if (tagInputRef.current && tagInputRef.current.value.trim().length > 0) {
      const inputValue = tagInputRef.current.value.trim();

      if (inputValue.length <= 0) return;
      if (tagList.length >= 5) return;
      if (tagList.find((tag) => tag === inputValue)) return;

      setTagList([...tagList, inputValue]);
      tagInputRef.current.value = "";
    }
  };

  // 태그 삭제
  const handleTagDelete = (tag: string) => {
    const newList = tagList.filter((item) => item !== tag);
    setTagList(newList);
  };

  // 폼 초기화
  const resetForm = () => {
    setImgList([]);
    if (textRef.current) {
      textRef.current.value = "";
    }
    setIsFormValid(false);
  };

  // 닫기 전 확인
  const handleClose = () => {
    if (isFormValid) {
      setShowConfirmDialog(true);
    } else {
      resetForm();
      onClose();
    }
  };

  const handleConfirmClose = () => {
    resetForm();
    onClose();
    setShowConfirmDialog(false);
  };

  return (
    <div className="flex h-full flex-col overflow-y-auto scrollbar-hide">
      <div className="flex items-center justify-between pb-[1.4rem]">
        <div onClick={handleClose} className="cursor-pointer">
          <IconClose />
        </div>
        <DrawerTitle text={`${type === "add" ? "글 쓰기" : "글 수정"}`} />
        <Button variant="oval" size="sm" disabled={!isFormValid} onClick={handleSubmit}>
          완료
        </Button>
      </div>
      {/* 카테고리 선택 부분 */}
      {context === "community" && (
        <>
          <div className="mt-[1.5rem] flex flex-col gap-[1.5rem]">
            <h2 className="text-[1.4rem] font-bold leading-normal tracking-[-0.28px]">대분류를 선택해 주세요</h2>
            <CategoryButton selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
          </div>
          <hr />
        </>
      )}
      <div
        ref={scrollRef}
        className="my-[1.5rem] flex min-h-[10.5rem] gap-[.8rem] overflow-x-auto scrollbar-hide"
        {...draggableOptions()}
      >
        {imgList.map((img) => (
          <div
            key={img.url}
            className="relative h-[10.5rem] w-[10.5rem] min-w-[10.5rem] overflow-hidden rounded-[1rem] border border-gray-300"
          >
            <img src={img.url} alt={img.alt || "이미지"} className="h-full w-full object-cover" />
            <IconCircleClose
              className="absolute right-[.4rem] top-[.4rem] cursor-pointer"
              onClick={() => handleImgDelete(img.url)}
            />
          </div>
        ))}
        <fieldset className="h-full w-[10.5rem] min-w-[10.5rem] rounded-[1rem] border border-gray-300">
          <label htmlFor="inputFile" className="flex h-full w-full cursor-pointer items-center justify-center">
            <IconCamera />
          </label>
          <input ref={fileRef} type="file" id="inputFile" className="hidden" onChange={handleImgAdd} />
        </fieldset>
      </div>
      <hr />
      <textarea
        ref={textRef}
        placeholder="내용을 입력해 주세요"
        defaultValue={initialData?.content}
        className="h-full resize-none text-[1.4rem] font-medium leading-[2rem] tracking-[-0.028] text-black outline-none"
      ></textarea>
      {/* 태그 입력 부분 */}
      <div className="flex flex-col gap-[1.4rem] py-[1.5rem]">
        <div className="flex h-[5rem] w-full items-center justify-between rounded-[1rem] border border-gray-300 px-[1.5rem] py-[1rem]">
          <input
            ref={tagInputRef}
            type="text"
            placeholder="태그를 입력해 주세요"
            className="w-[22rem] border-none text-[1.4rem] font-medium outline-none"
            onKeyUp={(e) => handleEnterEvent(e)}
          />
          <div className="flex items-center gap-[1.5rem] text-[1.4rem]">
            <span className="text-gray-300">{tagList.length} / 5</span>
            <button className="text-gray-500" onClick={handleTagInput}>
              확인
            </button>
          </div>
        </div>
        {tagList.length === 0 ? (
          <p className="px-[1.5rem] text-[1.2rem] font-medium text-gray-500">태그는 최대 5개까지 선택 가능합니다</p>
        ) : (
          <div className="flex flex-wrap items-center gap-[1rem] px-[1.5rem]">
            {tagList.map((tag) => (
              <div key={tag} className="flex items-center">
                <span className="text-[1.2rem] font-bold">{tag}</span>
                <button onClick={() => handleTagDelete(tag)}>
                  <IconCircleClose />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>알림</AlertDialogTitle>
            <AlertDialogDescription>글 작성을 취소하시겠어요?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>아니오</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmClose}>네</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PostForm;
