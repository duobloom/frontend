import React, { useEffect, useRef, useState } from "react";
import { DrawerClose, DrawerTitle } from "../common/Drawer";
import { Button } from "../common";
import useDraggable from "@/hooks/useDraggable";
import { IconCamera, IconCircleClose } from "@/assets/icon";

const MainTextForm = ({ onClose }: { onClose: () => void }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const draggableOptions = useDraggable(scrollRef);

  const [imgList, setImgList] = useState<{ img_id: string; img_src: string }[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);

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
  const handleImgDelete = (img_id: string) => {
    const newList = imgList.filter((img) => img.img_id !== img_id);
    setImgList(newList);
    if (textRef.current) {
      setIsFormValid(textRef.current.value.trim().length > 0 || newList.length > 0);
    }
  };

  // 이미지 추가
  const handleImgAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];

    if (files === undefined) return;

    const newImage = {
      img_id: Date.now().toString(),
      img_src: URL.createObjectURL(files),
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

  return (
    <>
      <div className="flex items-center justify-between pb-[1.4rem]">
        <DrawerClose onClick={resetForm} />
        <DrawerTitle text="글 쓰기" />
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
            key={img.img_id}
            className="relative h-[10.5rem] w-[10.5rem] min-w-[10.5rem] overflow-hidden rounded-[1rem] border border-gray-300"
          >
            <img src={img.img_src} alt="이미지" className="h-full w-full object-cover" />
            <IconCircleClose
              className="absolute right-[.4rem] top-[.4rem] cursor-pointer"
              onClick={() => handleImgDelete(img.img_id)}
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
        className="h-full resize-none text-[1.4rem] font-medium leading-[2rem] tracking-[-0.028] text-black outline-none"
      ></textarea>
    </>
  );
};

export default MainTextForm;
