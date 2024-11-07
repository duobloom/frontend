import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle, DrawerClose } from "@/components/common/Drawer";
import Header from "@/components/layout/Header";
import { BoxFooter, DropdownBox } from "@/components/ui/Box";
import { PolicyOptions, regions } from "@/constants";
import { Button, ScrollableOptions } from "@/components/common";
import { RegionSelecter } from "@/components/hospital";
import { examplePolicyData, PolicyInfo } from "@/components/policy/PolicyInfoBox";

const PolicyPage = () => {
  const [selectedOption, setSelectedOption] = useState(1);
  const [selectedSi, setSelectedSi] = useState<number | null>(1);
  const [selectedGun, setSelectedGun] = useState<number | null>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<number | null>(null);

  const selectedLocation = `${selectedSi ? regions.find((r) => r.id === selectedSi)?.si : ""} ${
    selectedGun ? "· " + regions.find((r) => r.id === selectedSi)?.gun.find((g) => g.id === selectedGun)?.name : ""
  } ${
    selectedNeighborhood
      ? "· " +
        regions
          .find((r) => r.id === selectedSi)
          ?.gun.find((g) => g.id === selectedGun)
          ?.neighborhoods.find((n) => n.id === selectedNeighborhood)?.name
      : ""
  }`;

  return (
    <div className="flex w-full flex-col">
      <Header variant="titleMove" title="맞춤 정책" />
      <Drawer>
        <DrawerTrigger className="w-full">
          <DropdownBox className="w-full">{selectedLocation || "지역 선택"}</DropdownBox>
        </DrawerTrigger>
        <ScrollableOptions options={PolicyOptions} selectedOption={selectedOption} onSelect={setSelectedOption} />
        <div className="px-[1.5rem]">
          <p className="mt-[1rem] text-[1.5rem] font-medium">190{}개의 정책</p>
          <BoxFooter />
          <PolicyInfo item={examplePolicyData} />
        </div>
        <DrawerContent>
          <span className="relative mb-[3.5rem] flex w-full items-center">
            <DrawerClose className="absolute left-0" />
            <DrawerTitle text="지역 선택" className="mx-auto" />
          </span>
          <RegionSelecter
            selectedSi={selectedSi}
            setSelectedSi={setSelectedSi}
            selectedGun={selectedGun}
            setSelectedGun={setSelectedGun}
            selectedNeighborhood={selectedNeighborhood}
            setSelectedNeighborhood={setSelectedNeighborhood}
          />

          <span className="fixed bottom-[1rem] left-0 w-full px-[2rem]">
            <BoxFooter />
            <Button variant="default" className="w-full">
              적용하기
            </Button>
          </span>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default PolicyPage;
