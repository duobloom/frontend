import { KakaoMap } from "@/components/hospital";
import Header from "@/components/layout/Header";

const HospitalMapPage = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Header variant="backTitle" title="제목" />
      <KakaoMap></KakaoMap>
    </div>
  );
};

export default HospitalMapPage;
