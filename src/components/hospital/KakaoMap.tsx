/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, useState } from "react";
import { IconLocation } from "@/assets/icon";
import MarkerIcon from "@/assets/icon/icn-Hospital-on.png";
import RedDotIcon from "@/assets/icon/icon-reddot.png";
import { InfoBox } from "../common";
import { HospitalListType } from "@/types";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "../ui/Carousel";

declare global {
  interface Window {
    kakao: any;
  }
}

type TKakaoMapProps = {
  center?: { lat: number; lng: number };
  level?: number;
  markerImage?: string;
  hospitalData?: HospitalListType[];
};

function KakaoMap({
  center = { lat: 37.514575, lng: 127.0495556 },
  level = 4,
  markerImage = MarkerIcon,
  hospitalData = [],
}: TKakaoMapProps) {
  const mapRef = useRef<any>(null);
  const centerRef = useRef(center);
  const [selectedHospital, setSelectedHospital] = useState<HospitalListType | null>(hospitalData[0]);
  const markersRef = useRef<any[]>([]);
  const overlaysRef = useRef<any[]>([]);
  const [api, setApi] = useState<CarouselApi>();

  // 지도 초기화 및 중심 설정
  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      if (container) {
        const options = {
          center: new window.kakao.maps.LatLng(centerRef.current.lat, centerRef.current.lng),
          level: level,
        };
        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;
      }
    });
  }, [level]);

  // 마커와 오버레이 설정
  useEffect(() => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    overlaysRef.current.forEach((overlay) => overlay.setMap(null));
    markersRef.current = [];
    overlaysRef.current = [];

    if (mapRef.current && hospitalData) {
      hospitalData.forEach((hospital, index) => {
        if (hospital.latitude && hospital.longitude) {
          const markerPos = new window.kakao.maps.LatLng(hospital.latitude, hospital.longitude);

          // 선택된 병원 ID와 비교하여 마커 이미지 결정
          const isSelected = selectedHospital?.hospitalId === hospital.hospitalId;
          const currentMarkerImage = isSelected
            ? new window.kakao.maps.MarkerImage(markerImage, new window.kakao.maps.Size(35, 35), {
                offset: new window.kakao.maps.Point(15, 15),
              })
            : new window.kakao.maps.MarkerImage(RedDotIcon, new window.kakao.maps.Size(27, 27), {
                offset: new window.kakao.maps.Point(10, 10),
              });

          const marker = new window.kakao.maps.Marker({
            position: markerPos,
            image: currentMarkerImage,
          });

          window.kakao.maps.event.addListener(marker, "click", () => {
            if (selectedHospital?.hospitalId !== hospital.hospitalId) {
              setSelectedHospital(hospital); // 상태 업데이트
              mapRef.current.setCenter(markerPos); // 지도 중심 변경
              api?.scrollTo(index); // 마커 클릭시 해당 캐러샐로 이동
            }
          });

          marker.setMap(mapRef.current);
          markersRef.current.push(marker);

          // 선택된 병원에만 커스텀 오버레이 생성
          if (isSelected) {
            const overlayContent = document.createElement("div");
            overlayContent.className =
              "py-[.5rem] px-[.6rem] bg-white rounded-[.5rem] shadow-box border border-red-400 text-center font-medium";
            overlayContent.innerHTML = `<div class="text-[1.2rem]">${hospital.hospitalName}</div>`;

            const customOverlay = new window.kakao.maps.CustomOverlay({
              content: overlayContent,
              position: markerPos,
              yAnchor: 1.5,
              zIndex: 3,
            });

            customOverlay.setMap(mapRef.current);
            overlaysRef.current.push(customOverlay);
          }
        }
      });
    }
  }, [hospitalData, markerImage, selectedHospital]);

  // 캐러셀 인덱스 변경 시 지도와 마커 업데이트
  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      const currentIndex = api.selectedScrollSnap();
      const hospital = hospitalData[currentIndex];
      if (hospital && selectedHospital?.hospitalId !== hospital.hospitalId) {
        setSelectedHospital(hospital);
        mapRef.current.setCenter(new window.kakao.maps.LatLng(hospital.latitude, hospital.longitude));
      }
    });
  }, [api, hospitalData, selectedHospital]);

  // 사용자의 현재 위치로 지도 이동
  const handleUserLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const currentLocation = new window.kakao.maps.LatLng(latitude, longitude);
        mapRef.current?.setCenter(currentLocation);
      });
    }
  };

  return (
    <div className="relative flex-1 scrollbar-hide" id="map">
      <div className="absolute bottom-[1rem] right-0 z-10 flex w-full flex-col items-end">
        <IconLocation onClick={handleUserLocationClick} className="cursor-pointer" />
        <Carousel orientation="horizontal" setApi={setApi} className="h-[17rem] w-full">
          <CarouselContent className="flex">
            {hospitalData?.map((hospital) => (
              <CarouselItem key={hospital.hospitalId}>
                <div className="relative w-full overflow-hidden rounded-[1rem] px-[1.5rem]">
                  <InfoBox
                    key={hospital.hospitalId}
                    variant="hospital"
                    hospitalId={hospital.hospitalId}
                    hospitalName={hospital.hospitalName}
                    region={hospital.region}
                    middle={hospital.middle}
                    detail={hospital.detail}
                    type={hospital.type}
                    time={hospital.time}
                    latitude={hospital.latitude}
                    longitude={hospital.longitude}
                    imageUrl={hospital.imageUrl}
                    scraped={hospital.scraped}
                    keywordMappings={hospital.keywordMappings}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export { KakaoMap };
