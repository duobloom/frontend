import React, { useEffect, useRef } from "react";
import { Button } from "@/components/common";
import useDraggable from "@/hooks/useDraggable";
import { cn } from "@/utils";
import { Link } from "react-router-dom";

type TFilterButtonProps = {
  filterList: { id: number; text: string }[];
  selectedButton: number;
  setSelectedButton: (id: number) => void;
};

const FilterButton = ({ filterList, selectedButton, setSelectedButton }: TFilterButtonProps) => {
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
  }, [selectedButton]);

  return (
    <section
      ref={scrollRef}
      {...draggableOptions()}
      className="flex w-full space-x-[.8rem] overflow-x-scroll px-[1.5rem] py-[.5rem] scrollbar-hide"
    >
      {filterList.map((item) => (
        <Link key={item.id} to={`?filter=${item.id}`}>
          <Button
            data-select={selectedButton === item.id}
            variant="oval"
            size="md"
            onClick={() => setSelectedButton(item.id)}
            className={cn(
              "inline-flex min-w-fit whitespace-nowrap px-[1.8rem] text-[1.4rem] font-semibold",
              selectedButton === item.id ? "bg-red text-white" : "border border-gray-500 bg-white text-gray-500",
            )}
          >
            {item.text}
          </Button>
        </Link>
      ))}
    </section>
  );
};

export default FilterButton;
