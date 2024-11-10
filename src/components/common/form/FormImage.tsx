import React, { useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import useDraggable from "@/hooks/useDraggable";
import { CommunityPostFormType, BoardPostFormType } from "@/types";
import { IconCamera, IconCircleClose } from "@/assets/icon";

type FormType = CommunityPostFormType | BoardPostFormType;

type TFormImageProps = {
  form: UseFormReturn<FormType>;
};

const FormImage = ({ form }: TFormImageProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const draggableOptions = useDraggable(scrollRef);

  // 이미지 삭제
  const handleImgDelete = (urlToDelete: string) => {
    const currentImages = form.getValues("images");
    form.setValue(
      "images",
      currentImages.filter((img) => img.url !== urlToDelete),
    );
    if (fileRef.current) fileRef.current.value = "";
  };

  // 이미지 첨부
  const handleImgAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = target.files;

    if (!files || files.length === 0) return;

    const newImage = {
      url: URL.createObjectURL(files[0]),
      alt: "",
    };
    form.setValue("images", [...form.getValues("images"), newImage]);
    target.value = "";
  };

  return (
    <>
      <div
        ref={scrollRef}
        className="my-[1.5rem] flex min-h-[10.5rem] gap-[.8rem] overflow-x-auto scrollbar-hide"
        {...draggableOptions()}
      >
        {form.watch("images").map((img) => (
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
          <input
            {...form.register("images")}
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
