import { HospitalType } from "@/types";
import { InfoBox } from "../common";

type THospitalInfo = {
  item: HospitalType;
};

const exampleHospitalData: HospitalType = {
  hospital_id: 1,
  hospital_name: "서울 중앙 병원",
  hospital_type: "종합병원",
  hospital_img: "https://example.com/hospital.jpg", // 예시 이미지 URL
  start_date: "09:00", // 진료 시작 시간
  end_date: "18:00", // 진료 종료 시간
  lat: "37.5665", // 서울 위도
  lon: "126.9780", // 서울 경도
  location: "서울특별시 중구 세종대로 110",
  isClosed: false, // 영업 중
  isCert: true, // 인증됨
  keywords: [
    { keyword_id: 1, keyword_name: "응급실" },
    { keyword_id: 2, keyword_name: "24시간 진료" },
    { keyword_id: 3, keyword_name: "내과" },
  ],
};
const HospitalInfo = ({ item }: THospitalInfo) => {
  return (
    <InfoBox
      key={item.hospital_id}
      variant="hospital"
      hospital_id={item.hospital_id}
      hospital_name={item.hospital_name}
      hospital_type={item.hospital_type}
      hospital_img={item.hospital_img}
      start_date={item.start_date}
      end_date={item.end_date}
      location={item.location}
      isClosed={item.isClosed}
      isCert={item.isCert}
      keywords={item.keywords}
    />
  );
};

export { HospitalInfo, exampleHospitalData };
