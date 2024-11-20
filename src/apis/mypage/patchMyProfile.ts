import apiClient from "@/apis/axios";

export const patchMyProfile = async ({
  nickname,
  birth,
  profilePictureUrl,
  region,
}: {
  nickname?: string | null;
  birth?: string | null;
  profilePictureUrl?: string | null;
  region?: string | null;
}) => {
  const payload = Object.fromEntries(
    Object.entries({ nickname, birth, profilePictureUrl, region }).filter(([, value]) => value !== null),
  );

  const response = await apiClient.patch(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/users/profile`, payload);
  return response;
};
