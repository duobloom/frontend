/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, useState } from "react";
import { IconLocation } from "@/assets/icon";
import MarkerIcon from "@/assets/icon/icn-Hospital-on.png";
import RedDotIcon from "@/assets/icon/icon-reddot.png";
import UserIcon from "@/assets/icon/icon-userlocation.png";
import { InfoBox } from "../common";
import { HospitalListType } from "@/types";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "../ui/Carousel";
import { InfoBoxSkeleton } from "../skeleton/InfoBoxSkeleton";

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
  isLoading?: boolean;
};

function KakaoMap({
  center = { lat: 37.514575, lng: 127.0495556 },
  level = 4,
  markerImage = MarkerIcon,
  hospitalData = [],
  isLoading,
}: TKakaoMapProps) {
  const mapRef = useRef<any>(null);
  const centerRef = useRef(center);
  const [selectedHospital, setSelectedHospital] = useState<HospitalListType | null>(hospitalData[0]);
  const markersRef = useRef<any[]>([]);
  const overlaysRef = useRef<any[]>([]);
  const [api, setApi] = useState<CarouselApi>();

  // 지도 초기화
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
              setSelectedHospital(hospital);
              mapRef.current.setCenter(markerPos);
              api?.scrollTo(index);
            }
          });

          marker.setMap(mapRef.current);
          markersRef.current.push(marker);

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

  // 캐러셀 선택 이벤트
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

  // 가장 가까운 병원 찾기
  const findNearestHospital = (userLat: number, userLng: number) => {
    const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
      const toRad = (value: number) => (value * Math.PI) / 180;
      const R = 6371;
      const dLat = toRad(lat2 - lat1);
      const dLng = toRad(lng2 - lng1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

    return hospitalData.reduce(
      (nearest, hospital) => {
        if (hospital.latitude !== null && hospital.longitude !== null) {
          const distance = calculateDistance(userLat, userLng, hospital.latitude, hospital.longitude);
          return distance < nearest.distance ? { hospital, distance } : nearest;
        }
        return nearest;
      },
      { hospital: hospitalData[0], distance: Infinity },
    ).hospital;
  };
  const handleUserLocationClick = () => {
    // 사용자가 지정한 좌표
    const userLatitude = 37.48402343350356;
    const userLongitude = 127.12265346891247;

    if (!mapRef.current) return;

    // 사용자 위치 마커 생성
    const userLocation = new window.kakao.maps.LatLng(userLatitude, userLongitude);
    const userMarkerImage = new window.kakao.maps.MarkerImage(UserIcon, new window.kakao.maps.Size(35, 35), {
      offset: new window.kakao.maps.Point(17.5, 35),
    });
    const userMarker = new window.kakao.maps.Marker({
      position: userLocation,
      image: userMarkerImage,
    });
    userMarker.setMap(mapRef.current); // 사용자 마커를 지도에 표시

    // 가장 가까운 병원 찾기
    const nearestHospital = findNearestHospital(userLatitude, userLongitude);

    if (nearestHospital) {
      const hospitalPos = new window.kakao.maps.LatLng(nearestHospital.latitude!, nearestHospital.longitude!);

      // 두 위치를 포함하는 LatLngBounds 설정
      const bounds = new window.kakao.maps.LatLngBounds();
      bounds.extend(userLocation); // 사용자 위치 포함
      bounds.extend(hospitalPos); // 병원 위치 포함

      // 지도에 설정
      mapRef.current.setBounds(bounds);

      // 병원 마커 선택 및 설정
      setSelectedHospital(nearestHospital);
      const index = hospitalData.findIndex((hospital) => hospital.hospitalId === nearestHospital.hospitalId);
      if (api && index >= 0) {
        api.scrollTo(index); // 캐러셀 위치 업데이트
        mapRef.current.setLevel(5);
      }

      // 현재 지도의 확대 수준 확인
      console.log("Current map level:", mapRef.current.getLevel());
    }
  };

  // // 사용자 위치로 가장 가까운 병원 이동
  // const handleUserLocationClick = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;

  //         // 사용자 위치 마커 생성
  //         const userLocation = new window.kakao.maps.LatLng(latitude, longitude);
  //         const userMarkerImage = new window.kakao.maps.MarkerImage(UserIcon, new window.kakao.maps.Size(35, 35), {
  //           offset: new window.kakao.maps.Point(17.5, 35),
  //         });
  //         const userMarker = new window.kakao.maps.Marker({
  //           position: userLocation,
  //           image: userMarkerImage,
  //         });

  //         // 사용자 마커를 지도에 표시
  //         userMarker.setMap(mapRef.current);

  //         // 지도 중심을 사용자 위치로 설정
  //         mapRef.current.setCenter(userLocation);

  //         // 가장 가까운 병원 찾기
  //         const nearestHospital = findNearestHospital(latitude, longitude);

  //         if (nearestHospital) {
  //           const hospitalPos = new window.kakao.maps.LatLng(nearestHospital.latitude!, nearestHospital.longitude!);
  //           // 지도 중심을 가장 가까운 병원으로 설정
  //           mapRef.current.setCenter(hospitalPos);
  //           setSelectedHospital(nearestHospital);
  //         }
  //       },
  //       (error) => {
  //         console.error("위치 정보를 가져오는 중 오류가 발생했습니다:", error);
  //       },
  //       {
  //         enableHighAccuracy: true, // 고정밀 위치 사용
  //         maximumAge: 0, // 캐시된 위치 사용 방지
  //         timeout: 10000, // 위치 요청 제한 시간 (10초)
  //       },
  //     );
  //   } else {
  //     console.error("사용자의 위치 정보를 지원하지 않는 브라우저입니다.");
  //   }
  // };

  return (
    <div className="relative flex-1 scrollbar-hide" id="map">
      <div className="absolute bottom-[1rem] right-0 z-10 flex w-full flex-col items-end">
        <IconLocation onClick={handleUserLocationClick} className="cursor-pointer" />
        <Carousel orientation="horizontal" setApi={setApi} className="h-full w-full">
          <CarouselContent className="flex">
            {hospitalData.map((hospital) => (
              <CarouselItem key={hospital.hospitalId}>
                <div className="relative w-full overflow-hidden rounded-[1rem] px-[1.5rem]">
                  {isLoading && <InfoBoxSkeleton />}
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
