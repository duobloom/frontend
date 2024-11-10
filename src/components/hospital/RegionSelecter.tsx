import React, { useState } from "react";
import { regions } from "@/constants";
import { OptionTabs, OptionBoxes } from "@/components/common";
import useDraggable from "@/hooks/useDraggable";
import { DrawerClose, DrawerTitle } from "../common/Drawer";
import { GetRegionName } from ".";

type TRegionSelecterProps = {
  selectedSi: number | null;
  setSelectedSi: React.Dispatch<React.SetStateAction<number | null>>;
  selectedGun: number | null;
  setSelectedGun: React.Dispatch<React.SetStateAction<number | null>>;
  selectedNeighborhood: number | null;
  setSelectedNeighborhood: React.Dispatch<React.SetStateAction<number | null>>;
};

const RegionSelecter = ({
  selectedSi,
  setSelectedSi,
  selectedGun,
  setSelectedGun,
  selectedNeighborhood,
  setSelectedNeighborhood,
}: TRegionSelecterProps) => {
  const [selectedTab, setSelectedTab] = useState("시/도");
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const draggableOptions = useDraggable(scrollRef);

  const getOptions = () => {
    if (selectedTab === "시/도") {
      return regions.map((region) => ({ id: region.region_code, name: region.si }));
    }
    if (selectedTab === "시/군/구" && selectedSi !== null) {
      const selectedRegion = regions.find((region) => region.region_code === selectedSi);

      const gunOptions =
        selectedRegion?.gun.flatMap((gun) => {
          if (gun.neighborhoods.length > 0) {
            return gun.neighborhoods.map((neighborhood) => ({
              id: neighborhood.detail_code,
              name: `${gun.name} ${neighborhood.name}`,
            }));
          } else {
            return {
              id: gun.middle_code,
              name: gun.name,
            };
          }
        }) || [];

      return gunOptions;
    }
    return [];
  };

  return (
    <div className="flex h-full flex-col pb-[6.5rem]">
      <span className="relative mb-[3.5rem] flex w-full items-center">
        <DrawerClose className="absolute left-0" />
        <DrawerTitle text="지역 선택" className="mx-auto" />
      </span>
      <OptionTabs tabs={["시/도", "시/군/구"]} selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      <GetRegionName selectedSi={selectedSi} selectedGun={selectedGun} selectedNeighborhood={selectedNeighborhood} />
      <section ref={scrollRef} {...draggableOptions()} className="mt-[1rem] flex-1 overflow-y-scroll scrollbar-hide">
        <OptionBoxes
          options={getOptions()}
          selectedOption={
            selectedTab === "시/도"
              ? (selectedSi ?? 0)
              : selectedTab === "시/군/구"
                ? (selectedNeighborhood ?? selectedGun ?? 0)
                : 0
          }
          onSelect={(id) => {
            if (selectedTab === "시/도") {
              setSelectedSi(id);
              setSelectedGun(null);
              setSelectedNeighborhood(null);
              setSelectedTab("시/군/구");
            } else if (selectedTab === "시/군/구") {
              const selectedRegion = regions.find((region) => region.region_code === selectedSi);
              const gun = selectedRegion?.gun.find((g) => g.neighborhoods.some((n) => n.detail_code === id));
              if (gun) {
                setSelectedGun(gun.middle_code);
                setSelectedNeighborhood(id);
              } else {
                setSelectedGun(id);
                setSelectedNeighborhood(null);
              }
            }
          }}
        />
      </section>
    </div>
  );
};

export default RegionSelecter;
