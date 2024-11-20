import { BoxContainer, BoxContent, BoxFooter, BoxHeader } from "@/components/ui/Box";
import AuthorSkeleton from "../common/AuthorSkeleton";
import LikeAndCommentSkeleton from "../common/LikeAndCommentSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";

const CommunityBoxSkeleton = () => {
  return (
    <BoxContainer>
      <BoxHeader>
        <div className="flex items-center gap-[1.2rem]">
          <AuthorSkeleton />
        </div>
      </BoxHeader>

      <BoxContent className="mb-[3rem] mt-[1rem]">
        <Skeleton className="h-[2rem] w-[100%]" />
      </BoxContent>

      <BoxFooter>
        <LikeAndCommentSkeleton />
      </BoxFooter>
    </BoxContainer>
  );
};

export default CommunityBoxSkeleton;
