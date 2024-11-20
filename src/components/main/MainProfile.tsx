import { useQuery } from "@tanstack/react-query";
import Author from "@/components/ui/Author";
import AuthorSkeleton from "@/components/skeleton/common/AuthorSkeleton";
import { getFeedData } from "@/apis/main/getFeedDataAPI";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { logValidationError, validateApiResponse } from "@/utils/zodHelpers";
import { FeedResponseSchema, ProfilesSchema, ProfilesType } from "@/types/FeedType";

type TMainProfileProps = {
  nowData: string;
};

const MainProfile = ({ nowData }: TMainProfileProps) => {
  const { handleError } = useErrorHandler();
  const { data, isLoading, error } = useQuery<ProfilesType, Error>({
    queryKey: ["coupleProfile"],
    queryFn: async () => {
      try {
        const response = await getFeedData(nowData);
        const validatedData = validateApiResponse(response, FeedResponseSchema);
        return ProfilesSchema.parse(validatedData);
      } catch (error) {
        logValidationError(error);
        throw error;
      }
    },
  });

  // 에러 처리
  if (error) {
    handleError(error);
    return <div>Error loading feed data</div>;
  }

  return (
    <section className="relative flex h-[8rem] w-full items-center justify-between bg-white p-[1.5rem]">
      {isLoading ? (
        <>
          <AuthorSkeleton variant="board" />
          <AuthorSkeleton variant="boardReverse" />
        </>
      ) : (
        <>
          <Author
            variant="board"
            profileImg={data?.userProfile.profilePictureUrl}
            name={data?.userProfile.nickname}
            birth={data?.userProfile.birth}
            isMe={true}
          />

          <div className="h-[5rem] w-[.1rem] bg-gray-300" />

          <Author
            variant="boardReverse"
            profileImg={data?.coupleProfile.profilePictureUrl}
            name={data?.coupleProfile.nickname}
            birth={data?.coupleProfile.birth}
          />
        </>
      )}
    </section>
  );
};

export default MainProfile;
