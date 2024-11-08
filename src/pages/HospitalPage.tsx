import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle, DrawerClose } from "@/components/common/Drawer";
import Header from "@/components/layout/Header";
import { BoxFooter, DropdownBox } from "@/components/ui/Box";
import { medicalDepartment, medicalOptions, regions } from "@/constants";
import { Button, OptionBoxes, ScrollableOptions } from "@/components/common";
import { IconMap } from "@/assets/icon";
import { useNavigate } from "react-router-dom";
import { HospitalInfo, exampleHospitalData, RegionSelecter } from "@/components/hospital";

const HospitalPage = () => {
  const navigate = useNavigate();
  const [activeDrawer, setActiveDrawer] = useState<"location" | "department" | null>(null);
  const [selectedOption, setSelectedOption] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState(1);
  const [selectedSi, setSelectedSi] = useState<number | null>(1);
  const [selectedGun, setSelectedGun] = useState<number | null>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<number | null>(null);

  const selectedDepartmentName = medicalDepartment.find((department) => department.id === selectedDepartment)?.name;
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
      <Header variant="titleMove" title="병원/클리닉" />
      <Drawer>
        <span className="flex w-full items-center justify-between">
          <DrawerTrigger onClick={() => setActiveDrawer("location")}>
            <DropdownBox>{selectedLocation || "지역 선택"}</DropdownBox>
          </DrawerTrigger>
          <DrawerTrigger onClick={() => setActiveDrawer("department")}>
            <DropdownBox>{selectedDepartmentName || "진료과 선택"}</DropdownBox>
          </DrawerTrigger>
        </span>
        <ScrollableOptions options={medicalOptions} selectedOption={selectedOption} onSelect={setSelectedOption} />
        <div className="px-[1.5rem]">
          <p className="mt-[1rem] text-[1.5rem] font-medium">190{}개의 병원/클리닉</p>
          <BoxFooter />
          <HospitalInfo item={exampleHospitalData} />
        </div>
        <Button
          variant="ovalReverse"
          size="md"
          className="absolute bottom-[8rem] right-[13.5rem]"
          onClick={() => navigate("map")}
        >
          <IconMap />
          지도보기
        </Button>
        {/* Drawer Content */}
        <DrawerContent>
          {/* 지역 */}
          {activeDrawer === "location" && (
            <>
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
            </>
          )}
          {/* 진료과 */}
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
            <Button variant="default" className="w-full">
              적용하기
            </Button>
          </span>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default HospitalPage;
