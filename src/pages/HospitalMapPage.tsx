import { KakaoMap } from "@/components/hospital";
import { getRegionNameText } from "@/components/hospital/GetRegionName";
import Header from "@/components/layout/Header";
import { useGetFilterHospital } from "@/hooks/useGetFilterHospital";
import { useLocation } from "react-router-dom";

const HospitalMapPage = () => {
  const location = useLocation();
  const { selectedSi, selectedGun, selectedNeighborhood } = location.state || {};

  const { data: hospitalData } = useGetFilterHospital(selectedSi, selectedGun, selectedNeighborhood, null, null);

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
