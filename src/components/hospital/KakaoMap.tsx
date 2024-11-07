/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect } from "react";
import { IconLocation } from "@/assets/icon";
import useDraggable from "@/hooks/useDraggable";
import MarkerIcon from "@/assets/icon/icn-Hospital-on.png";

declare global {
  interface Window {
    kakao: any;
  }
}

type TKakaoMapProps = {
  children?: React.ReactNode;
  center?: { lat: number; lng: number };
  level?: number;
  markerPosition?: { lat: number; lng: number };
  markerImage?: string;
};

function KakaoMap({
  children,
  center = { lat: 37.49671009920956, lng: 126.95356743986663 },
  level = 4,
  markerPosition = { lat: 37.49671009920956, lng: 126.95356743986663 },
  markerImage = MarkerIcon,
}: TKakaoMapProps) {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      if (container) {
        const options = {
          center: new window.kakao.maps.LatLng(center.lat, center.lng),
          level: level,
        };
        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;
      }
    });
  }, [center, level]);

  useEffect(() => {
    if (markerPosition && mapRef.current) {
      const markerPos = new window.kakao.maps.LatLng(markerPosition.lat, markerPosition.lng);
      const markerIcon = new window.kakao.maps.MarkerImage(markerImage, new window.kakao.maps.Size(30, 30), {
        offset: new window.kakao.maps.Point(15, 30),
      });

      const marker = new window.kakao.maps.Marker({
        position: markerPos,
        image: markerIcon,
      });
      marker.setMap(mapRef.current);
    }
  }, [markerPosition, markerImage]);

  const scrollRef = useRef(null);
  const draggableOptions = useDraggable(scrollRef);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const currentLocation = new window.kakao.maps.LatLng(latitude, longitude);

        if (mapRef.current) {
          mapRef.current.setCenter(currentLocation);
        }
      });
    }
  };

  return (
    <div className="relative flex-1 scrollbar-hide" id="map">
      <div className="absolute bottom-[1rem] right-0 z-10 flex flex-col items-end">
        {children}
        <IconLocation onClick={handleLocationClick} className="cursor-pointer" />
        <section
          ref={scrollRef}
          {...draggableOptions()}
          className="bottom-[1rem] flex w-full gap-[1rem] overflow-x-scroll px-[.5rem] scrollbar-hide"
        />
      </div>
    </div>
  );
}

export { KakaoMap };
