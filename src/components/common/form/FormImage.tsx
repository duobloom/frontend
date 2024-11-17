import React, { useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import useDraggable from "@/hooks/useDraggable";
import { CommunityPostFormType, BoardPostFormType } from "@/types";
import { IconCamera, IconCircleClose } from "@/assets/icon";
import { reduceImageSize } from "@/utils";

type FormType = CommunityPostFormType | BoardPostFormType;

type TFormImageProps = {
  form: UseFormReturn<FormType>;
};

const FormImage = ({ form }: TFormImageProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const draggableOptions = useDraggable(scrollRef);

  // 이미지 삭제
  const handleImgDelete = (index: number) => {
    const currentPhotos = form.getValues("photoUrls");
    URL.revokeObjectURL(currentPhotos[index].photo_url); // 메모리 정리
    const newPhotos = currentPhotos.filter((_, i) => i !== index);
    form.setValue("photoUrls", newPhotos);
    if (fileRef.current) fileRef.current.value = "";
  };

  // 이미지 첨부
  const handleImgAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = target.files;

    if (!files || files.length === 0) return;

    const originalFile = files[0];
    const newImage = URL.createObjectURL(files[0]);
    const resizedImage = await reduceImageSize(newImage);

    // 원본 파일명에서 확장자를 제외한 이름만 추출
    const originalFileName = originalFile.name.replace(/\.[^/.]+$/, "");
    // 새로운 파일명 생성 (.webP 확장자 사용)
    const newFileName = `${originalFileName}.webP`;

    const resizedFile = new File([resizedImage], newFileName, {
      type: "image/webP",
    });

    const newFileInfo: { photo_url: string; file: File } = {
      photo_url: URL.createObjectURL(resizedImage),
      file: resizedFile,
    };

    form.setValue("photoUrls", [...form.getValues("photoUrls"), newFileInfo]);
    target.value = "";
  };

  return (
    <>
      <div
        ref={scrollRef}
        className="my-[1.5rem] flex min-h-[10.5rem] gap-[.8rem] overflow-x-auto scrollbar-hide"
        {...draggableOptions()}
      >
        {form.watch("photoUrls").map((img, index) => (
          <div
            key={img.photo_url}
            className="relative h-[10.5rem] w-[10.5rem] min-w-[10.5rem] overflow-hidden rounded-[1rem] border border-gray-300"
          >
            <img src={img.photo_url} alt={"이미지"} className="h-full w-full object-cover" />
            <IconCircleClose
              className="absolute right-[.4rem] top-[.4rem] cursor-pointer"
              onClick={() => handleImgDelete(index)}
            />
          </div>
        ))}
        <fieldset className="h-full w-[10.5rem] min-w-[10.5rem] rounded-[1rem] border border-gray-300">
          <label htmlFor="inputFile" className="flex h-full w-full cursor-pointer items-center justify-center">
            <IconCamera />
          </label>
          <input
            {...form.register("photoUrls")}
            type="file"
            id="inputFile"
            className="hidden"
            onChange={handleImgAdd}
            accept="image/*"
          />
        </fieldset>
      </div>
      <hr />
    </>
  );
};

export default FormImage;
