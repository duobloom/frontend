import React, { useRef, useState } from "react";
import Header from "@/components/layout/Header";
import { Badge, Button, InfoBox, OptionTabs } from "@/components/common";
import { BoxFooter } from "@/components/ui/Box";
// import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/Carousel";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/common/Drawer";
import {
  DetailBox,
  MedicDetailInfo,
  MedicInfo,
  ClinicHours,
  InfoText,
  AddressCopy,
  KakaoMap,
} from "@/components/hospital";
import defaultImage from "@/assets/image/test.png";
import { useLocation } from "react-router-dom";
import { medicalDepartment } from "@/constants";
import { useGetHospitalInfo } from "@/hooks/useGetHospitalInfo";
import { deleteScrapHospital, postScrapHospital } from "@/apis";
import { parseJsonString } from "@/utils/parseString";
import { useGetFilterHospital } from "@/hooks/useGetFilterHospital";
import { DetailInfoSkeleton } from "@/components/skeleton/detailInfoSkeleton";

const HospitalInfoPage = () => {
  const location = useLocation();
  const hospitalId = location.state?.id;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDrawer, setActiveDrawer] = useState<"medic" | "clinicHour" | null>(null);
  const [selectedTab, setSelectedTab] = useState("병원 정보");
  const infoSectionRef = useRef<HTMLDivElement>(null);
  const medicSectionRef = useRef<HTMLDivElement>(null);
  const directionSectionRef = useRef<HTMLDivElement>(null);

  const { data: hospitalData, refetch: refetchHospitalData, isLoading } = useGetHospitalInfo(hospitalId);
  const { data: relatedData } = useGetFilterHospital(1100000000, 1168000000, null, null, null);

  const handleBookmark = async () => {
    try {
      if (hospitalData?.scraped) {
        await deleteScrapHospital(hospitalId);
      } else {
        await postScrapHospital(hospitalId);
      }
      refetchHospitalData();
    } catch (error) {
      console.error("북마크 업데이트 중 에러:", error);
    }
  };

  // const [api, setApi] = useState<CarouselApi>();
  // const [current, setCurrent] = useState(0);
  // const [count, setCount] = useState(0);

  // React.useEffect(() => {
  //   if (!api) return;

  //   setCount(api.scrollSnapList().length);
  //   setCurrent(api.selectedScrollSnap() + 1);

  //   api.on("select", () => {
  //     setCurrent(api.selectedScrollSnap() + 1);
  //   });
  // }, [api]);

  // 탭 클릭 시 스크롤이동
  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    if (scrollRef.current && sectionRef.current) {
      scrollRef.current.scrollTo({
        top: sectionRef.current.offsetTop - scrollRef.current.offsetTop - 60,
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

  const parseStaff = parseJsonString(hospitalData?.staffInfo);
  const parseInfo = parseJsonString(hospitalData?.hospitalInfo);
  const departmentName = medicalDepartment.find((department) => department.type === hospitalData?.type)?.name;
  if (isLoading) {
    <DetailInfoSkeleton />;
  }

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto scrollbar-hide">
      {hospitalData && (
        <Header variant="backActions" isBookmark={hospitalData?.scraped} handleBookmark={handleBookmark} />
      )}
      <div ref={scrollRef} className="flex-1 overflow-y-scroll bg-white px-[1.8rem] scrollbar-hide">
        <InfoText className="mt-[2rem]">{hospitalData?.hospitalName}</InfoText>
        <InfoText variant="secondary" size="sm">
          {departmentName || hospitalData?.type}
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
          <div className="relative w-full overflow-hidden rounded-[1rem]">
            <img
              src={hospitalData?.imageUrl || defaultImage}
              className="h-[17rem] w-full rounded-[1rem] object-cover"
            />
          </div>
          {/* <Carousel orientation="horizontal" setApi={setApi} className="h-[17rem] w-full">
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
          </Carousel> */}
          {/* {images.length > 1 && (
            <div className="absolute right-[1.5rem] top-[1.5rem] flex h-[2.4rem] w-auto min-w-[3.5rem] items-center justify-center rounded-[10rem] bg-black bg-opacity-80 px-[.7rem] py-[.5rem] text-[1rem] font-bold leading-normal tracking-[2px] text-white">
              {current}/{count}
            </div>
          )} */}
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
              <div className="h-full overflow-y-auto scrollbar-hide">
                <ClinicHours hours={clinicHoursData} />
              </div>
            </DrawerContent>
          )}
        </Drawer>
        <div>
          <OptionTabs
            tabs={["병원 정보", "의료진", "오시는 길"]}
            selectedTab={selectedTab}
            onTabSelect={handleTabSelect}
            className="sticky top-0 z-10 bg-[#fff]"
          />
          <section ref={infoSectionRef} className="hospital-info">
            <InfoText size="md">소개</InfoText>
            <InfoText size="sm" className="mb-[1.5rem]">
              {parseInfo?.introduction || ""}
            </InfoText>
            <InfoText size="md">진료 과목</InfoText>
            <InfoText size="sm" className="mb-[1.5rem]">
              {parseInfo?.departments || ""}
            </InfoText>
            <BoxFooter />
          </section>

          <section ref={medicSectionRef} className="medic">
            <InfoText size="md" className="mb-[1.5rem]">
              의료진
            </InfoText>
            <Drawer>
              <DrawerTrigger className="w-full" onClick={() => setActiveDrawer("medic")}>
                <MedicInfo
                  title={parseStaff?.name}
                  content={departmentName ? `${departmentName} 전문의` : "산부인과 전문의"}
                  image_Url={parseStaff?.imageUrl || ""}
                />
              </DrawerTrigger>
              {activeDrawer === "medic" && (
                <DrawerContent>
                  <MedicDetailInfo
                    title={parseStaff?.name}
                    content="산부인과"
                    image_Url={parseStaff?.imageUrl}
                    specialty={parseStaff?.specializations}
                    record={parseStaff?.educationAndCareer}
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
            <div className="flex flex-col gap-[1rem]">
              {relatedData &&
                relatedData
                  .filter((item) => item.hospitalId !== hospitalId)
                  .map((item) => (
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
                  ))}
            </div>
          </section>
        </div>
      </div>
      <footer className="fixed bottom-0 z-20 flex w-[37.5rem] max-w-[37.5rem] items-center gap-[.7rem] border-t border-gray-300 bg-[#fff] px-[1.8rem] py-[.7rem]">
        <Button>{hospitalData?.linkUrl && <a href={hospitalData?.linkUrl} />}접수 하기</Button>
        <Button variant="reverse">전화 문의</Button>
      </footer>
    </div>
  );
};

export default HospitalInfoPage;
