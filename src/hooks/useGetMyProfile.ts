import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "@/apis";

export const useGetMyProfile = () => {
  return useQuery({
    queryKey: ["UserInfo"],
    queryFn: () => getMyProfile(),
  });
};
