import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle, DrawerClose } from "@/components/common/Drawer";
import Header from "@/components/layout/Header";
import { BoxFooter, DropdownBox } from "@/components/ui/Box";
import { medicalDepartment, medicalOptions } from "@/constants";
import { Button, OptionBoxes, ScrollableOptions } from "@/components/common";
import { IconMap } from "@/assets/icon";
import { useNavigate } from "react-router-dom";
import { GetRegionName, HospitalInfo, RegionSelecter } from "@/components/hospital";
import { getSearchHospitalRegion } from "@/apis";
import { useQuery } from "@tanstack/react-query";

const HospitalPage = () => {
  const navigate = useNavigate();
  const [activeDrawer, setActiveDrawer] = useState<"location" | "department" | null>(null);
  const [selectedOption, setSelectedOption] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState(1);
  const [selectedSi, setSelectedSi] = useState<number | null>(0);
  const [selectedGun, setSelectedGun] = useState<number | null>(0);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<number | null>(null);

  const {
    data: hospitalData,
    isError,
    error,
    refetch: refetchHospital,
  } = useQuery({
    queryKey: ["hospitalData", selectedSi, selectedGun, selectedNeighborhood],
    queryFn: () => getSearchHospitalRegion(selectedSi, selectedGun, selectedNeighborhood),
    enabled: false,
  });
  const applyFilters = () => {
    if (activeDrawer === "location") refetchHospital();
    //else 진료과 필터링;
    setActiveDrawer(null);
  };

  if (isError) return <>{error.message}</>;

  const selectedDepartmentName = medicalDepartment.find((department) => department.id === selectedDepartment)?.name;

  return (
    <div className="flex h-full w-full flex-col">
      <Header variant="titleMove" title="병원/클리닉" />
      <Drawer>
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
        <ScrollableOptions options={medicalOptions} selectedOption={selectedOption} onSelect={setSelectedOption} />
        <div className="flex-1 px-[1.5rem]">
          <p className="mt-[1rem] text-[1.5rem] font-medium">
            {hospitalData ? `${hospitalData.length}개의 병원/클리닉` : "0 개의 병원/클리닉"}
          </p>
          <BoxFooter />
          {hospitalData && hospitalData.length > 0 ? (
            hospitalData.map((item) => <HospitalInfo key={item.hospital_id} item={item} />)
          ) : (
            <p className="text-center text-[1.5rem] text-gray-400">데이터가 없습니다.</p>
          )}
        </div>
        <Button variant="ovalReverse" size="md" className="mb-[1rem] self-center" onClick={() => navigate("map")}>
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
                onSelect={setSelectedDepartment}
              />
            </>
          )}
          <span className="fixed bottom-[1rem] left-0 w-full px-[2rem]">
            <BoxFooter />
            <Button
              variant="default"
              className="w-full"
              onClick={() => applyFilters()}
              disabled={selectedSi === null || selectedGun === null}
            >
              적용하기
            </Button>
          </span>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default HospitalPage;
