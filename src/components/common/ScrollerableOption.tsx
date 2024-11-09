import { useEffect, useRef } from "react";
import { Button } from "@/components/common";
import { cn } from "@/utils";
import useDraggable from "@/hooks/useDraggable";

type TScrollableOptionsProps = {
  options: { id: number; name: string }[];
  selectedOption: number;
  onSelect: (id: number) => void;
};

const ScrollableOptions = ({ options, selectedOption, onSelect }: TScrollableOptionsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const draggableOptions = useDraggable(scrollRef);

  useEffect(() => {
    const selectElement = scrollRef.current?.querySelector('[data-select="true"]');
    if (selectElement) {
      selectElement.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  }, [selectedOption]);

  return (
    <section
      ref={scrollRef}
      {...draggableOptions()}
      className="flex w-full space-x-[.8rem] overflow-x-scroll px-[1rem] py-[.5rem] scrollbar-hide"
    >
      {options.map((option) => (
        <Button
          key={option.id}
          data-select={selectedOption === option.id}
          variant="oval"
          size="md"
          onClick={() => onSelect(option.id)}
          className={cn(
            "inline-flex min-w-fit whitespace-nowrap px-[1.8rem] text-[1.4rem] font-semibold",
            selectedOption === option.id ? "bg-red text-white" : "border border-gray-500 bg-white text-gray-500",
          )}
        >
          {option.name}
        </Button>
      ))}
    </section>
  );
};

export default ScrollableOptions;