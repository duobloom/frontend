import { useQuery } from "@tanstack/react-query";
import Author from "@/components/ui/Author";
import { getFeedData } from "@/apis/main/getFeedDataAPI";
import { ProfilesType } from "@/types/FeedType";

type TMainProfileProps = {
  nowData: string;
};

const MainProfile = ({ nowData }: TMainProfileProps) => {
  const { data, isLoading } = useQuery<ProfilesType, Error>({
    queryKey: ["coupleProfile"],
    queryFn: () => getFeedData(nowData),
  });

  return (
    <section className="flex h-[8rem] w-full items-center justify-between p-[1.5rem]">
      {isLoading || (
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
