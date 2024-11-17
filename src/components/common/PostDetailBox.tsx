import { useEffect, useState } from "react";
import Author from "@/components/ui/Author";
import LikeAndComments from "@/components/ui/LikeAndComments";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/Carousel";
import { formatDateConvert } from "@/utils";
import { PostBoxType } from "@/types/BasePostType";
import { CommunityDetailType } from "@/types";

type TPostDetailBoxProps = {
  postData: PostBoxType | CommunityDetailType;
  variant: string;
  id: string;
};

const PostDetailBox = ({ postData, variant, id }: TPostDetailBoxProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const ArticleBox = (variant: string, postData: PostBoxType | CommunityDetailType) => {
    let profileImg, name, createdAt, isMe, content, photoUrls;

    if (variant === "board") {
      profileImg = (postData as PostBoxType).authorProfilePictureUrl;
      name = (postData as PostBoxType).authorNickname;
      createdAt = (postData as PostBoxType).updatedAt;
      isMe = (postData as PostBoxType).mine;
      content = (postData as PostBoxType).content;
      photoUrls = (postData as PostBoxType).photoUrls;
    } else if (variant === "community") {
      profileImg = (postData as CommunityDetailType).community.profilePictureUrl;
      name = (postData as CommunityDetailType).community.nickname;
      createdAt = (postData as CommunityDetailType).community.updatedAt;
      content = (postData as CommunityDetailType).community.content;
      photoUrls = (postData as CommunityDetailType).images.map((item) => item.imageUrl);
      isMe = (postData as CommunityDetailType).owner;
    }

    return (
      <article className="flex flex-col gap-[2rem]">
        <div>
          <Author
            variant={variant as "community" | "board"}
            profileImg={profileImg}
            name={name}
            createdAt={formatDateConvert(createdAt as string)}
            isMe={isMe}
          />
        </div>
        <div className="text-[1.3rem] font-medium leading-[1.8rem] tracking-[-0.026rem] text-black">{content}</div>
        {photoUrls && photoUrls.length > 0 && (
          <div className="relative">
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {photoUrls.map((image, index) => {
                  return (
                    <CarouselItem key={index}>
                      <div className="relative aspect-square w-full overflow-hidden rounded-[1rem] border border-gray-300">
                        <img src={image || image} alt="이미지" className="h-full w-full object-cover" />
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
            {photoUrls.length > 1 && (
              <div className="absolute right-[1.5rem] top-[1.5rem] flex h-[2.4rem] w-auto min-w-[3.5rem] items-center justify-center rounded-[10rem] bg-black bg-opacity-80 px-[.7rem] py-[.5rem] text-[1rem] font-bold leading-normal tracking-[2px] text-white">
                {current}/{count}
              </div>
            )}
          </div>
        )}
      </article>
    );
  };

  return (
    <section className="flex flex-col gap-[2rem] px-[1.5rem]">
      {ArticleBox(variant, postData)}
      <hr className="my-0" />
      <LikeAndComments
        type={variant === "board" ? "board" : "community"}
        isDetailPage={true}
        id={id}
        likeCount={postData.likeCount ?? 0}
        commentCount={
          variant === "board"
            ? (postData as PostBoxType).commentCount
            : (postData as CommunityDetailType).community.commentCount
        }
        likedByUser={postData.likedByUser}
      />
    </section>
  );
};

export default PostDetailBox;
