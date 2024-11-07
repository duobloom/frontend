import { useEffect, useRef } from "react";
import useDraggable from "@/hooks/useDraggable";
import { cn } from "@/utils";
import { categoryList } from "@/constants/categoryList";
import { CategoryType } from "@/types/CommunityType";

type TFormCategoryButtonProps = {
  selectedButton: CategoryType;
  setSelectedButton: (category: CategoryType) => void;
};

const FormCategoryButton = ({ selectedButton, setSelectedButton }: TFormCategoryButtonProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const draggableOptions = useDraggable(scrollRef);

  useEffect(() => {
    const selectElement = scrollRef.current?.querySelector('[data-button="true"]');
    if (selectElement) {
      selectElement.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  }, [selectedButton]);

  return (
    <>
      <div className="mt-[1.5rem] flex flex-col gap-[1.5rem]">
        <h2 className="text-[1.4rem] font-bold leading-normal tracking-[-0.28px]">대분류를 선택해 주세요</h2>
        <div
          ref={scrollRef}
          {...draggableOptions()}
          className="mr-[-1.5rem] flex w-full space-x-[.7rem] overflow-x-scroll scrollbar-hide"
        >
          {categoryList.map((item) => (
            <button
              key={item.id}
              type="button"
              data-button={selectedButton === item.category}
              onClick={() => setSelectedButton(item.category)}
              className={cn(
                "inline-flex h-[5rem] min-w-[10.5rem] items-center justify-center overflow-hidden whitespace-nowrap rounded-[1rem] border px-[1.8rem] text-[1.4rem] font-semibold",
                selectedButton === item.category
                  ? "border-red bg-red-10 text-red"
                  : "border border-gray-300 bg-white text-gray-500",
              )}
            >
              {item.category}
            </button>
          ))}
        </div>
      </div>
      <hr />
    </>
  );
};

export default FormCategoryButton;
