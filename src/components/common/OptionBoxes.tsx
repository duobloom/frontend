import { Button } from "@/components/common";
import { cn } from "@/utils";

type OptionTabProps = {
  tabs: string[];
  selectedTab: string;
  onTabSelect: (tab: string) => void;
};
type OptionBoxesProps = {
  options: { id: number; name: string }[];
  selectedOption: number;
  onSelect: (id: number) => void;
};

const OptionTabs = ({ tabs, selectedTab, onTabSelect }: OptionTabProps) => (
  <div className="w-full">
    <div className="mb-0 flex justify-between font-medium text-gray-400">
      {tabs?.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabSelect?.(tab)}
          className={cn("w-full px-[2rem]", selectedTab === tab ? "border-b-2 border-black text-black" : "")}
        >
          {tab}
        </button>
      ))}
    </div>
    <div className="mb-[2rem] mt-0 w-full border-b border-gray-300" />
  </div>
);

const OptionBoxes = ({ options, selectedOption, onSelect }: OptionBoxesProps) => (
  <div className={cn("grid grid-cols-2 gap-[.5rem]")}>
    {options.map((option) => (
      <Button
        key={option.id}
        variant="reverse"
        onClick={() => onSelect(option.id)}
        className={cn(
          "font-semibold shadow-box",
          selectedOption === option.id ? "bg-red-100" : "border-gray-300 text-gray-400",
        )}
      >
        {option.name}
      </Button>
    ))}
  </div>
);

export { OptionTabs, OptionBoxes };