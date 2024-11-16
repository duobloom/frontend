import { HospitalListType } from "@/types";
import axios from "axios";

export const getScrapHospital = async () => {
  const response = await axios.get<HospitalListType>("/api/hospital-scrap");
  console.log(response.data);
  return response;
};

export const postScrapHospital = async (hospitalId?: number) => {
  await axios.post(`/api/hospital-scrap?hospitalId=${hospitalId}`);
};
// export const deleteScrapHospital = async (hospitalId?: number) => {
//   console.log(hospitalId);
//   await axios.delete(`/api/hospital-scrap`, {
//     data: { hospitalId: hospitalId },
//   });
// };
export const deleteScrapHospital = async (hospitalId?: number) => {
  console.log(hospitalId);
  await axios.delete(`/api/hospital-scrap?hospitalId=${hospitalId}`);
};
