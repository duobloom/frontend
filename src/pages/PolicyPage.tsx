import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/common/Drawer";
import Header from "@/components/layout/Header";
import { BoxFooter, DropdownBox } from "@/components/ui/Box";
import { PolicyOptions } from "@/constants";
import { Button, InfoBox, ScrollableOptions } from "@/components/common";
import { GetRegionName, RegionSelecter } from "@/components/hospital";
import { useGetFilterPolicy } from "@/hooks/useGetFilterPolicy";
import { cn } from "@/utils";

const PolicyPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState(1);
  const [selectedSi, setSelectedSi] = useState<number | null>(null);
  const [selectedGun, setSelectedGun] = useState<number | null>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<number | null>(null);

  const regionCode = selectedSi === 0 ? null : selectedSi;
  const middleCode = selectedGun === 0 ? null : selectedGun;
  const detailCode = selectedNeighborhood === 0 ? null : selectedNeighborhood;

  const selectedOptionName = PolicyOptions.find((option) => option.id === selectedOption)?.name;
  const optionKeyword: string | null = selectedOptionName === "전체" ? null : selectedOptionName || null;

  const { data: policyData, refetch: refetchPolilcy } = useGetFilterPolicy(
    regionCode,
    middleCode,
    detailCode,
    optionKeyword,
  );

  const applyFilters = () => {
    refetchPolilcy().finally(() => {
      setIsDrawerOpen(false);
    });
  };

  return (
    <div className="flex w-full flex-col">
      <Header variant="titleMove" title="맞춤 정책" />
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <span className="w-full px-[1.5rem]">
          <DrawerTrigger className="w-full" onClick={() => setIsDrawerOpen(true)}>
            <DropdownBox className="w-full">
              {selectedGun ? (
                <GetRegionName
                  selectedSi={selectedSi}
                  selectedGun={selectedGun}
                  selectedNeighborhood={selectedNeighborhood}
                />
              ) : (
                "전체"
              )}
            </DropdownBox>
          </DrawerTrigger>
        </span>
        <ScrollableOptions options={PolicyOptions} selectedOption={selectedOption} onSelect={setSelectedOption} />
        <div className="px-[1.5rem]">
          <p className="text-[1.5rem] font-medium">{policyData && `${policyData.length}개의 정책`}</p>
          <BoxFooter />
          <div
            className={cn(
              "flex flex-col gap-[1rem] overflow-y-auto scrollbar-hide",
              "h-[calc(100dvh-28.6rem)]",
              // "h-[47.8rem]",
              // "lg:h-[46rem]",
              // "notebook:h-[47.5rem]",
              // "2xl:h-[60rem]",
              // "lg_mobile:h-[46rem]",
              // "sm_mobile:h-[41rem]",
              // "xsm_mobile:h-[25rem]",
            )}
          >
            {policyData &&
              policyData.length > 0 &&
              policyData.map((item) => (
                <InfoBox
                  key={item.policyId}
                  variant="policy"
                  policyId={item.policyId}
                  policyName={item.policyName}
                  policyHost={item.policyHost}
                  region={item.region}
                  middle={item.middle}
                  detail={item.detail}
                  startDate={item.startDate}
                  endDate={item.endDate}
                  imageUrl={item.imageUrl}
                  scraped={item.scraped}
                  keywordMappings={item.keywordMappings}
                />
              ))}
          </div>
        </div>
        <DrawerContent>
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
            <Button variant="default" className="w-full" onClick={applyFilters}>
              적용하기
            </Button>
          </span>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default PolicyPage;
