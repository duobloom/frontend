import React, { useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { IconCircleClose } from "@/assets/icon";
import { CommunityPostFormType } from "@/types";

type TFormTagProps = {
  form: UseFormReturn<CommunityPostFormType>;
};

const FormTag = ({ form }: TFormTagProps) => {
  const tagInputRef = useRef<HTMLInputElement>(null);

  // 태그 입력
  const handleTagInput = () => {
    if (!tagInputRef.current) return;
    const newTag = tagInputRef.current.value.trim();
    if (!newTag) return;

    const currentTags = form.getValues("tags") || [];
    if (currentTags.length >= 5) return;
    if (currentTags.find((tag) => tag === newTag)) return;

    form.setValue("tags", [...currentTags, newTag]);
    tagInputRef.current.value = "";
  };

  // 태그 input 엔터
  const handleEnterEvent = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTagInput();
    }
  };

  const tags = form.watch("tags") || [];

  return (
    <div className="flex flex-col gap-[1.4rem] py-[1.5rem]">
      <div className="flex h-[5rem] w-full items-center justify-between rounded-[1rem] border border-gray-300 px-[1.5rem] py-[1rem]">
        <input
          ref={tagInputRef}
          type="text"
          placeholder="태그를 입력해 주세요"
          className="w-[22rem] border-none text-[1.4rem] font-medium outline-none"
          onKeyUp={handleEnterEvent}
        />
        <div className="flex items-center gap-[1.5rem] text-[1.4rem]">
          <span className="text-gray-300">{tags.length} / 5</span>
          <button type="button" className="text-gray-500" onClick={handleTagInput}>
            확인
          </button>
        </div>
      </div>
      {tags.length === 0 ? (
        <p className="px-[1.5rem] text-[1.2rem] font-medium text-gray-500">태그는 최대 5개까지 선택 가능합니다</p>
      ) : (
        <div className="flex flex-wrap items-center gap-[1rem] px-[1.5rem]">
          {tags.map((tag) => (
            <div key={tag} className="flex items-center">
              <span className="text-[1.2rem] font-bold">{tag}</span>
              <button
                type="button"
                onClick={() => {
                  const currentTags = form.getValues("tags") || [];
                  form.setValue(
                    "tags",
                    currentTags.filter((t) => t !== tag),
                  );
                }}
              >
                <IconCircleClose />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormTag;
