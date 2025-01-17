import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/common/Drawer";
import Header from "@/components/layout/Header";
import { BoxFooter, DropdownBox } from "@/components/ui/Box";
import { PolicyOptions } from "@/constants";
import { Button, InfoBox, ScrollableOptions } from "@/components/common";
import { GetRegionName, RegionSelecter } from "@/components/hospital";
import { useGetFilterPolicy } from "@/hooks/useGetFilterPolicy";
import { cn } from "@/utils";
import { InfoBoxSkeleton } from "@/components/skeleton/InfoBoxSkeleton";

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

  const {
    data: policyData,
    refetch: refetchPolilcy,
    isLoading,
  } = useGetFilterPolicy(regionCode, middleCode, detailCode, optionKeyword);

  const applyFilters = () => {
    refetchPolilcy().finally(() => {
      setIsDrawerOpen(false);
    });
  };

  return (
    <div className="flex h-full w-full flex-col">
      <Header variant="titleMove" title="맞춤 정책" />
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <Drawer dismissible={false} open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <div className="w-full px-[1.5rem]">
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
          </div>
          <ScrollableOptions options={PolicyOptions} selectedOption={selectedOption} onSelect={setSelectedOption} />
          <div className="px-[1.5rem] py-[1.3rem]">
            <p className="text-[1.5rem] font-medium">{policyData && `${policyData.length}개의 정책`}</p>
          </div>
          <hr className="mt-0" />
          <div className="mt-1 px-[1.5rem]">
            <div className={cn("flex flex-col gap-[1rem]", "h-[calc(100dvh-28.6rem)]")}>
              {isLoading && Array.from({ length: 5 }, (_, idx) => <InfoBoxSkeleton key={idx} />)}
              {policyData && policyData.length > 0 ? (
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
                ))
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="mt-[2rem] text-center text-[1.4rem] text-gray-400">필터링 된 정책이 없습니다.</p>
                </div>
              )}
              <div className="min-h-[1rem]" />
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
              setActiveDrawer={setIsDrawerOpen}
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
    </div>
  );
};

export default PolicyPage;
