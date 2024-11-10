import Author from "@/components/ui/Author";
import { UserProfileType } from "@/types/UserType";

type TMainProfileProps = {
  userData: UserProfileType;
  partnerData: UserProfileType;
};

const MainProfile = ({ userData, partnerData }: TMainProfileProps) => {
  return (
    <section className="flex h-[8rem] w-full items-center justify-between p-[1.5rem]">
      <Author
        variant="board"
        profileImg={userData.profileImage}
        name={userData.name}
        birth={userData.birth}
        isMe={true}
      />

      <div className="h-[5rem] w-[.1rem] bg-gray-300" />

      <Author
        variant="boardReverse"
        profileImg={partnerData.profileImage}
        name={partnerData.name}
        birth={partnerData.birth}
      />
    </section>
  );
};

export default MainProfile;
