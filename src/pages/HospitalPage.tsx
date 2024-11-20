import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle, DrawerClose } from "@/components/common/Drawer";
import Header from "@/components/layout/Header";
import { BoxFooter, DropdownBox } from "@/components/ui/Box";
import { medicalDepartment, medicalOptions } from "@/constants";
import { Button, InfoBox, OptionBoxes, ScrollableOptions } from "@/components/common";
import { IconMap } from "@/assets/icon";
import { useNavigate } from "react-router-dom";
import { GetRegionName, RegionSelecter } from "@/components/hospital";
import { cn } from "@/utils";
import { useGetFilterHospital } from "@/hooks/useGetFilterHospital";
import React from "react";

const HospitalPage = () => {
  const navigate = useNavigate();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const [activeDrawer, setActiveDrawer] = useState<"location" | "department" | null>(null);
  const [selectedOption, setSelectedOption] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
  const [selectedSi, setSelectedSi] = useState<number | null>(null);
  const [selectedGun, setSelectedGun] = useState<number | null>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<number | null>(null);

  const regionCode = selectedSi === 0 ? null : selectedSi;
  const middleCode = selectedGun === 0 ? null : selectedGun;
  const detailCode = selectedNeighborhood === 0 ? null : selectedNeighborhood;
  const selectedDepartmentName = medicalDepartment.find((department) => department.id === selectedDepartment)?.name;
  const selectedDepartmentType: string | null =
    medicalDepartment.find((department) => department.id === selectedDepartment)?.type || null;
  const selectedOptionName = medicalOptions.find((option) => option.id === selectedOption)?.name;
  const optionKeyword: string | null = selectedOptionName === "전체" ? null : selectedOptionName || null;

  const { data: hospitalData, refetch: refetchHospital } = useGetFilterHospital(
    regionCode,
    middleCode,
    detailCode,
    optionKeyword,
    selectedDepartmentType,
  );

  const applyFilters = () => {
    refetchHospital().finally(() => {
      setActiveDrawer(null);
    });
  };

  return (
    <div className="flex h-full w-full flex-col">
      <Header variant="titleMove" title="병원/클리닉" />
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <Drawer dismissible={false} open={activeDrawer !== null}>
          <span className="flex w-full items-center justify-between px-[1.5rem]">
            <DrawerTrigger onClick={() => setActiveDrawer("location")}>
              <DropdownBox>
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
            <DrawerTrigger onClick={() => setActiveDrawer("department")}>
              <DropdownBox>{selectedDepartmentName || "전체"}</DropdownBox>
            </DrawerTrigger>
          </span>

          <ScrollableOptions
            options={medicalOptions}
            selectedOption={selectedOption}
            onSelect={(option) => {
              setSelectedOption(option);
              applyFilters();
            }}
          />

          <div className="px-[1.5rem]">
            <p className="text-[1.5rem] font-medium">
              {hospitalData ? `${hospitalData.length}개의 병원/클리닉` : "0 개의 병원/클리닉"}
            </p>
            <BoxFooter />
            <div className={cn("flex flex-col gap-[1rem]", "h-[calc(100dvh-28.6rem)]")}>
              {hospitalData && hospitalData.length > 0 ? (
                hospitalData.map((item) => (
                  <InfoBox
                    key={item.hospitalId}
                    variant="hospital"
                    hospitalId={item.hospitalId}
                    hospitalName={item.hospitalName}
                    region={item.region}
                    middle={item.middle}
                    detail={item.detail}
                    type={item.type}
                    time={item.time}
                    latitude={item.latitude}
                    longitude={item.longitude}
                    imageUrl={item.imageUrl}
                    scraped={item.scraped}
                    keywordMappings={item.keywordMappings}
                  />
                ))
              ) : (
                <p className="text-center text-[1.5rem] text-gray-400">데이터가 없습니다.</p>
              )}
            </div>
          </div>

          <Button
            variant="ovalReverse"
            size="md"
            className="fixed bottom-[6rem] mb-[1rem] self-center"
            onClick={() =>
              navigate("map", {
                state: {
                  selectedSi,
                  selectedGun,
                  selectedNeighborhood,
                },
              })
            }
          >
            <IconMap />
            지도보기
          </Button>

          <DrawerContent>
            {activeDrawer === "location" && (
              <RegionSelecter
                selectedSi={selectedSi}
                setSelectedSi={setSelectedSi}
                selectedGun={selectedGun}
                setSelectedGun={setSelectedGun}
                selectedNeighborhood={selectedNeighborhood}
                setSelectedNeighborhood={setSelectedNeighborhood}
                setActiveDrawer={setActiveDrawer}
              />
            )}
            {activeDrawer === "department" && (
              <div className="flex h-full flex-col pb-[6.5rem]">
                <span className="relative mb-[3.5rem] flex w-full items-center">
                  <DrawerClose className="absolute left-0" onClick={() => setActiveDrawer(null)} />
                  <DrawerTitle text="진료과 선택" className="mx-auto" />
                </span>
                <section ref={scrollRef} className="flex-1 overflow-y-scroll scrollbar-hide">
                  <OptionBoxes
                    options={medicalDepartment}
                    selectedOption={selectedDepartment}
                    onSelect={(option) => {
                      setSelectedDepartment(option);
                    }}
                  />
                </section>
              </div>
            )}
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

export default HospitalPage;
