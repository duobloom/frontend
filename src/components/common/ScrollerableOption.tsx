/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { Button } from "@/components/common";
import { cn } from "@/utils";
import useDraggable from "@/hooks/useDraggable";

const ScrollableOptions = ({ options, selectedOption, onSelect }: any) => {
  const scrollRef = useRef(null);
  const draggableOptions = useDraggable(scrollRef);

  return (
    <section
      ref={scrollRef}
      {...draggableOptions()}
      className="flex w-full space-x-[.8rem] overflow-x-scroll px-[1rem] py-[.5rem] scrollbar-hide"
    >
      {options.map((option: any) => (
        <Button
          key={option.id}
          variant="oval"
          size="md"
          onClick={() => onSelect(option.id)}
          className={cn("whitespace-nowrap px-[3.8rem] text-[1.4rem] font-semibold", {
            "border-gray-400 bg-[#fff] text-gray-400": selectedOption !== option.id,
          })}
        >
          {option.name}
        </Button>
      ))}
    </section>
  );
};

export default ScrollableOptions;
