import axios from "axios";

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

  const response = await axios.patch("/api/users/profile", payload);
  return response;
};
