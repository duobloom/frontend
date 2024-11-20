import { Button } from "@/components/common";
import { cn } from "@/utils";

type OptionTabProps = {
  tabs: string[];
  selectedTab: string;
  onTabSelect: (tab: string) => void;
  className?: string;
};
type OptionBoxesProps = {
  options: { id: number; name: string }[];
  selectedOption: number | null;
  onSelect: (id: number) => void;
};

const OptionTabs = ({ tabs, selectedTab, onTabSelect, className }: OptionTabProps) => (
  <div className={cn("w-full", className)}>
    <div className="mb-0 flex justify-between text-[1.5rem] font-medium text-gray-400">
      {tabs?.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabSelect?.(tab)}
          className={cn(
            "w-full pb-[1.4rem] pt-[2rem] text-center",
            selectedTab === tab ? "border-b-2 border-black font-bold text-black" : "",
          )}
        >
          {tab}
        </button>
      ))}
    </div>
    <div className="mb-[2rem] mt-0 w-full border-b border-gray-300" />
  </div>
);

const OptionBoxes = ({ options, selectedOption, onSelect }: OptionBoxesProps) => (
  <div className={cn("grid grid-cols-2 gap-[.7rem]")}>
    {options.map((option) => (
      <Button
        key={option.id}
        variant="reverse"
        onClick={() => onSelect(option.id)}
        className={cn(
          "text-[14px] font-semibold shadow-box",
          selectedOption === option.id ? "bg-red-100 font-extrabold" : "border-gray-300 text-gray-400",
        )}
      >
        {option.name}
      </Button>
    ))}
  </div>
);

export { OptionTabs, OptionBoxes };
