import React, { useEffect, useRef, useState } from "react";
import { DrawerTitle } from "../common/Drawer";
import { Button } from "../common";
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
import { IconCamera, IconCircleClose, IconClose } from "@/assets/icon";
import { FeedPostType } from "@/types/FeedType";

const MainTextForm = ({
  type = "add",
  initialData = null,
  onClose,
}: {
  type?: string;
  initialData?: FeedPostType | null;
  onClose: () => void;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const draggableOptions = useDraggable(scrollRef);

  const [imgList, setImgList] = useState<{ url: string; alt?: string }[]>(initialData?.images || []);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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
    <>
      <div className="flex items-center justify-between pb-[1.4rem]">
        <div onClick={handleClose} className="cursor-pointer">
          <IconClose />
        </div>
        <DrawerTitle text={`${type === "add" ? "글 쓰기" : "글 수정"}`} />
        <Button variant="oval" size="sm" disabled={!isFormValid} onClick={handleSubmit}>
          완료
        </Button>
      </div>
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
    </>
  );
};

export default MainTextForm;
