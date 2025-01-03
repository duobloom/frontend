import { regions } from "@/constants";

type TRegionSelecterProps = {
  selectedSi: number | null;
  selectedGun: number | null;
  selectedNeighborhood: number | null;
};

const GetRegionName = ({ selectedSi, selectedGun, selectedNeighborhood }: TRegionSelecterProps) => {
  const selectedRegion = regions.find((r) => r.region_code === selectedSi);
  const selectedGunData = selectedRegion?.gun.find((g) => g.middle_code === selectedGun);
  const selectedNeighborhoodData = selectedGunData?.neighborhoods.find((n) => n.detail_code === selectedNeighborhood);

  const selectedLocation = `${selectedRegion?.si || ""}${
    selectedGunData ? ` · ${selectedGunData.name}` : ""
  }${selectedNeighborhoodData ? ` · ${selectedNeighborhoodData.name}` : ""}`;

  return <p className="text-[1.7rem] font-bold">{selectedLocation}</p>;
};
export const getRegionNameText = ({ selectedSi, selectedGun, selectedNeighborhood }: TRegionSelecterProps) => {
  const selectedRegion = regions.find((r) => r.region_code === selectedSi);
  const selectedGunData = selectedRegion?.gun.find((g) => g.middle_code === selectedGun);
  const selectedNeighborhoodData = selectedGunData?.neighborhoods.find((n) => n.detail_code === selectedNeighborhood);

  return (
    `${selectedRegion?.si || ""}${selectedGunData ? ` · ${selectedGunData.name}` : ""}${
      selectedNeighborhoodData ? ` · ${selectedNeighborhoodData.name}` : ""
    }` || "전체 지역"
  );
};

export default GetRegionName;
