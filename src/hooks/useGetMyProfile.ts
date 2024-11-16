import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "@/apis";
import { validateApiResponse, logValidationError } from "@/utils/zodHelpers";
import { UserType } from "@/types";
import { UserSchema } from "@/types/UserType";

export const useGetMyProfile = () => {
  return useQuery<UserType, Error>({
    queryKey: ["UserInfo"],
    queryFn: async (): Promise<UserType> => {
      try {
        const response = await getMyProfile();
        return validateApiResponse(response, UserSchema);
      } catch (error) {
        logValidationError(error);
        throw error;
      }
    },
  });
};
