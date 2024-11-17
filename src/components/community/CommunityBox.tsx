import { useNavigate } from "react-router-dom";
import { CommunityType } from "@/types";
import { Badge } from "@/components/common/Badge";
import Author from "@/components/ui/Author";
import { BoxContainer, BoxContent, BoxFooter, BoxHeader } from "@/components/ui/Box";
import LikeAndComments from "@/components/ui/LikeAndComments";
import { formatDateConvertWithRelativeTime } from "@/utils/formatDateConvert";

type CommunityBoxProps = {
  communityData: CommunityType;
};

export default function CommunityBox({ communityData }: CommunityBoxProps) {
  const navigate = useNavigate();

  return (
    <BoxContainer>
      <BoxHeader>
        <div className="flex items-center gap-[1.2rem]">
          <Author
            profileImg={communityData?.profilePictureUrl}
            name={communityData?.nickname}
            createdAt={formatDateConvertWithRelativeTime(communityData?.updatedAt as string)}
            isMe={communityData.owner}
          />
        </div>
        {communityData?.imageUrls.length >= 1 && (
          <div className="relative h-[3.6rem] w-[3.6rem] overflow-hidden rounded-[1rem] border border-gray-100">
            <img src={communityData?.imageUrls[0]} alt="이미지" className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-[1.4rem] font-bold leading-normal text-white">
              {communityData?.imageUrls.length > 1
                ? communityData?.imageUrls.length + "+"
                : communityData?.imageUrls.length}
            </div>
          </div>
        )}
      </BoxHeader>

      <BoxContent className="mt-[1rem]">
        <div
          className="mb-[1.4rem] line-clamp-2 cursor-pointer text-[1.3rem] font-medium leading-[1.8rem] text-black"
          onClick={() => navigate(`/community/${communityData?.communityId}`)}
        >
          {communityData?.content}
        </div>
        <div className="flex flex-wrap gap-[0.8rem]">
          {communityData?.tags.map((tag) => (
            <Badge key={tag.tagId} variant="tagBadge">
              {tag.name}
            </Badge>
          ))}
        </div>
      </BoxContent>

      <BoxFooter>
        <LikeAndComments
          type="community"
          id={String(communityData?.communityId)}
          likeCount={communityData?.likeCount}
          commentCount={communityData.commentCount as number}
          likedByUser={communityData?.likedByUser}
        />
      </BoxFooter>
    </BoxContainer>
  );
}
