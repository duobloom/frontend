import { getFilterHospital } from "@/apis";
import { KakaoMap } from "@/components/hospital";
import { getRegionNameText } from "@/components/hospital/GetRegionName";
import Header from "@/components/layout/Header";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const HospitalMapPage = () => {
  const location = useLocation();
  const { selectedSi, selectedGun, selectedNeighborhood } = location.state || {};

  const {
    data: hospitalData,
    isError,
    error,
  } = useQuery({
    queryKey: ["hospitalData", selectedSi, selectedGun, selectedNeighborhood],
    queryFn: () => getFilterHospital(selectedSi, selectedGun, selectedNeighborhood),
  });

  if (isError) return <div>{error?.message || "에러가 발생했습니다."}</div>;

  return (
    <div className="flex h-full w-full flex-col">
      <Header variant="backTitle" title={getRegionNameText({ selectedSi, selectedGun, selectedNeighborhood })} />
      {hospitalData && (
        <KakaoMap
          center={{
            lat: hospitalData[0]?.latitude ?? 37.49671009920956,
            lng: hospitalData[0]?.longitude ?? 126.95356743986663,
          }}
          hospitalData={hospitalData}
        />
      )}
    </div>
  );
};

export default HospitalMapPage;
