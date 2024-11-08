import { regions } from "@/constants";
import { OptionTabs, OptionBoxes } from "@/components/common";
import { useState } from "react";

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

  const getOptions = () => {
    if (selectedTab === "시/도") {
      return regions.map((region) => ({ id: region.id, name: region.si }));
    }
    if (selectedTab === "시/군/구" && selectedSi !== null) {
      const selectedRegion = regions.find((region) => region.id === selectedSi);
      return selectedRegion ? selectedRegion.gun.map((gun) => ({ id: gun.id, name: gun.name })) : [];
    }
    if (selectedTab === "읍/면/동" && selectedSi !== null && selectedGun !== null) {
      const selectedRegion = regions.find((region) => region.id === selectedSi);
      const selectedGunData = selectedRegion?.gun.find((g) => g.id === selectedGun);
      return selectedGunData
        ? selectedGunData.neighborhoods.map((neighborhood) => ({ id: neighborhood.id, name: neighborhood.name }))
        : [];
    }
    return [];
  };

  return (
    <div>
      <OptionTabs tabs={["시/도", "시/군/구", "읍/면/동"]} selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      <OptionBoxes
        options={getOptions()}
        selectedOption={
          selectedTab === "시/도"
            ? (selectedSi ?? 0)
            : selectedTab === "시/군/구"
              ? (selectedGun ?? 0)
              : (selectedNeighborhood ?? 0)
        }
        onSelect={(id) => {
          if (selectedTab === "시/도") {
            setSelectedSi(id);
            setSelectedGun(null);
            setSelectedNeighborhood(null);
            setSelectedTab("시/군/구");
          } else if (selectedTab === "시/군/구") {
            setSelectedGun(id);
            setSelectedNeighborhood(null);
            setSelectedTab("읍/면/동");
          } else if (selectedTab === "읍/면/동") {
            setSelectedNeighborhood(id);
          }
        }}
      />
    </div>
  );
};

export default RegionSelecter;
