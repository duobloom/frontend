import React, { useRef, useState } from "react";
import Header from "@/components/layout/Header";
import { Badge, Button, OptionTabs } from "@/components/common";
import { BoxFooter } from "@/components/ui/Box";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/Carousel";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/common/Drawer";
import useDraggable from "@/hooks/useDraggable";
import {
  DetailBox,
  MedicDetailInfo,
  MedicInfo,
  ClinicHours,
  InfoText,
  AddressCopy,
  KakaoMap,
} from "@/components/hospital";
import image from "@/assets/image/test.png";
import { useLocation } from "react-router-dom";
import { medicalDepartment } from "@/constants";
import { useGetHospitalInfo } from "@/hooks/useGetHospitalInfo";

const HospitalInfoPage = () => {
  const location = useLocation();
  const hospitalId = location.state?.id;
  const scrollRef = useRef<HTMLDivElement>(null);
  const draggableOptions = useDraggable(scrollRef);
  const [activeDrawer, setActiveDrawer] = useState<"medic" | "clinicHour" | null>(null);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [selectedTab, setSelectedTab] = useState("병원 정보");
  const infoSectionRef = useRef<HTMLDivElement>(null);
  const medicSectionRef = useRef<HTMLDivElement>(null);
  const directionSectionRef = useRef<HTMLDivElement>(null);

  const { data: hospitalData } = useGetHospitalInfo(hospitalId);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  // 탭 클릭 시 스크롤이동
  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    if (scrollRef.current && sectionRef.current) {
      scrollRef.current.scrollTo({
        top: sectionRef.current.offsetTop - scrollRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };
  //탭 클릭 시
  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab);
    if (tab === "병원 정보") scrollToSection(infoSectionRef);
    if (tab === "의료진") scrollToSection(medicSectionRef);
    if (tab === "오시는 길") scrollToSection(directionSectionRef);
  };

  const clinicHoursData = [
    { day: "월", time: "10:00 - 19:30" },
    { day: "화", time: "10:00 - 19:30" },
    { day: "수", time: "10:00 - 19:30" },
    { day: "목", time: "10:00 - 19:30" },
    { day: "금", time: "10:00 - 19:30" },
    { day: "토", time: "10:00 - 15:00" },
    { day: "일", time: "", isClosed: true },
  ];
  const images = [image, "https://example.com/image3.jpg", "https://example.com/image4.jpg"];

  return (
    <div className="flex h-full flex-col">
      <Header variant="backActions" isBookmark={isBookMarked} handleBookmark={() => setIsBookMarked(!isBookMarked)} />
      <div
        ref={scrollRef}
        {...draggableOptions}
        className="flex-1 overflow-y-scroll bg-white px-[1.8rem] pt-[2.2rem] scrollbar-hide"
      >
        <InfoText>{hospitalData?.hospitalName}</InfoText>
        <InfoText variant="secondary" size="sm">
          {medicalDepartment.find((department) => department.type === hospitalData?.type)?.name || hospitalData?.type}
        </InfoText>
        <span className="mt-[.5rem] flex items-center gap-[.8rem]">
          {hospitalData?.keywordMappings &&
            hospitalData.keywordMappings.length > 0 &&
            hospitalData.keywordMappings.map((keyword, index) => (
              <Badge key={index} variant="tagBadge">
                {keyword.keyword}
              </Badge>
            ))}
        </span>
        <BoxFooter />
        <section className="relative mb-[3rem] h-[17rem] w-full rounded-[1rem] border">
          <Carousel orientation="horizontal" setApi={setApi} className="h-[17rem] w-full">
            <CarouselContent className="flex">
              {images.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full overflow-hidden rounded-[1rem]">
                    <img
                      src={img}
                      alt={`slide-${index + 1}`}
                      className="h-[17rem] w-full rounded-[1rem] object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {images.length > 1 && (
            <div className="absolute right-[1.5rem] top-[1.5rem] flex h-[2.4rem] w-auto min-w-[3.5rem] items-center justify-center rounded-[10rem] bg-black bg-opacity-80 px-[.7rem] py-[.5rem] text-[1rem] font-bold leading-normal tracking-[2px] text-white">
              {current}/{count}
            </div>
          )}
        </section>
        <DetailBox title="전화번호" content={hospitalData?.phone ?? ""} />
        <Drawer>
          <DrawerTrigger className="w-full" onClick={() => setActiveDrawer("clinicHour")}>
            <DetailBox title="진료 시간" content={hospitalData?.time ?? "10:00 - 16:00"} showIcon />
          </DrawerTrigger>
          {activeDrawer === "clinicHour" && (
            <DrawerContent>
              <span className="relative mb-[3.5rem] flex w-full items-center">
                <DrawerClose className="absolute left-0" />
                <DrawerTitle text="진료 시간" className="mx-auto" />
              </span>
              <ClinicHours hours={clinicHoursData} />
            </DrawerContent>
          )}
        </Drawer>
        <div className="mt-[2rem]">
          <OptionTabs
            tabs={["병원 정보", "의료진", "오시는 길"]}
            selectedTab={selectedTab}
            onTabSelect={handleTabSelect}
          />
          <section ref={infoSectionRef} className="hospital-info">
            <InfoText size="md">소개</InfoText>
            <InfoText size="sm" className="mb-[1.5rem]">
              {hospitalData?.hospitalInfo}
            </InfoText>
            <InfoText size="md">등급 평가 정보</InfoText>
            <InfoText size="sm" className="mb-[1.5rem]">
              소개글 와라라라랑
            </InfoText>
            <InfoText size="md">진료 과목</InfoText>
            <InfoText size="sm" className="mb-[1.5rem]">
              산부인과 피부과
            </InfoText>
            <BoxFooter />
          </section>

          <section ref={medicSectionRef} className="medic">
            <InfoText size="md" className="mb-[1.5rem]">
              의료진
            </InfoText>
            <Drawer>
              <DrawerTrigger className="w-full" onClick={() => setActiveDrawer("medic")}>
                <MedicInfo title="의료진이름" content={hospitalData?.staffInfo ?? "의사 정보"} image_Url="dl" />
              </DrawerTrigger>
              {activeDrawer === "medic" && (
                <DrawerContent>
                  <MedicDetailInfo
                    title="의사명"
                    content="산부인과"
                    image_Url=""
                    specialty="진료항목은 이런게 있다."
                    record="의대 졸업"
                  />
                </DrawerContent>
              )}
            </Drawer>
            <BoxFooter />
          </section>

          <section ref={directionSectionRef} className="direction">
            <InfoText size="md" className="mb-[.5rem]">
              오시는 길
            </InfoText>
            <AddressCopy address={hospitalData?.address ?? ""} />
            <section className="mb-[2rem] h-[17rem] w-full rounded-[1rem] border" id="map">
              {hospitalData?.latitude && hospitalData?.longitude && (
                <KakaoMap
                  center={{ lat: hospitalData.latitude, lng: hospitalData.longitude }}
                  level={4}
                  hospitalData={[hospitalData]}
                />
              )}
            </section>
            <BoxFooter />
          </section>
          <section>
            <InfoText size="md" className="mb-[1.5rem]">
              이 주변 산부인과
            </InfoText>
          </section>
        </div>
      </div>
      <footer className="flex w-full items-center gap-[.7rem] border-t border-gray-300 px-[1.8rem] py-[.7rem]">
        <Button>접수 하기</Button>
        <Button variant="reverse">전화 문의</Button>
      </footer>
    </div>
  );
};

export default HospitalInfoPage;
