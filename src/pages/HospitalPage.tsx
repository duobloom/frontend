import { useRef, useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle, DrawerClose } from "@/components/common/Drawer";
import Header from "@/components/layout/Header";
import { BoxFooter, DropdownBox } from "@/components/ui/Box";
import { medicalDepartment, medicalOptions } from "@/constants";
import { Button, InfoBox, OptionBoxes, ScrollableOptions } from "@/components/common";
import { IconMap } from "@/assets/icon";
import { useNavigate } from "react-router-dom";
import { GetRegionName, RegionSelecter } from "@/components/hospital";
import { getFilterHospital } from "@/apis";
import { useQuery } from "@tanstack/react-query";
import useDraggable from "@/hooks/useDraggable";
import { cn } from "@/utils";

const HospitalPage = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const draggableOptions = useDraggable(scrollRef);

  const [activeDrawer, setActiveDrawer] = useState<"location" | "department" | null>(null);
  const [selectedOption, setSelectedOption] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState(1);
  const [selectedSi, setSelectedSi] = useState<number | null>(null);
  const [selectedGun, setSelectedGun] = useState<number | null>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<number | null>(null);

  const regionCode = selectedSi === 0 ? null : selectedSi;
  const middleCode = selectedGun === 0 ? null : selectedGun;
  const detailCode = selectedNeighborhood === 0 ? null : selectedNeighborhood;
  const selectedDepartmentName = medicalDepartment.find((department) => department.id === selectedDepartment)?.name;
  const selectedDepartmentType = medicalDepartment.find((department) => department.id === selectedDepartment)?.type;
  const selectedOptionName = medicalOptions.find((option) => option.id === selectedOption)?.name;
  const optionKeyword = selectedOptionName === "전체" ? null : selectedOptionName;

  const {
    data: hospitalData,
    isError,
    error,
    refetch: refetchHospital,
  } = useQuery({
    queryKey: ["hospitalData", regionCode, middleCode, detailCode, optionKeyword, selectedDepartmentType],
    queryFn: () => getFilterHospital(regionCode, middleCode, detailCode, optionKeyword, selectedDepartmentType),
    enabled: false,
  });

  const applyFilters = () => {
    refetchHospital().finally(() => {
      setActiveDrawer(null);
    });
  };

  if (isError) return <div>{error?.message || "에러가 발생했습니다."}</div>;

  return (
    <div className="flex w-full flex-col">
      <Header variant="titleMove" title="병원/클리닉" />
      <Drawer open={activeDrawer !== null}>
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
          <div
            ref={scrollRef}
            {...draggableOptions()}
            className={cn(
              "flex flex-col gap-[1rem] overflow-y-auto scrollbar-hide",
              "h-[47.8rem]",
              "lg:h-[46rem]",
              "notebook:h-[60.5rem]",
              "2xl:h-[74rem]",
              "lg_mobile:h-[46rem]",
              "sm_mobile:h-[41rem]",
              "xsm_mobile:h-[25rem]",
            )}
          >
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
                  address={item.address}
                  time={item.time}
                  latitude={item.latitude}
                  longitude={item.longitude}
                  linkUrl={item.linkUrl}
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
          onClick={() => navigate("map")}
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
            />
          )}
          {activeDrawer === "department" && (
            <>
              <span className="relative mb-[3.5rem] flex w-full items-center">
                <DrawerClose className="absolute left-0" />
                <DrawerTitle text="진료과 선택" className="mx-auto" />
              </span>
              <OptionBoxes
                options={medicalDepartment}
                selectedOption={selectedDepartment}
                onSelect={(option) => {
                  setSelectedDepartment(option);
                }}
              />
            </>
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
  );
};

export default HospitalPage;
