import { useEffect, useState } from "react";
import Author from "@/components/ui/Author";
import LikeAndComments from "@/components/ui/LikeAndComments";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/Carousel";
import { formatDateConvert } from "@/utils";
import { PostBoxType } from "@/types/BasePostType";

type TPostDetailBoxProps = {
  postData: PostBoxType;
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

  return (
    <section className="flex flex-col gap-[2rem] px-[1.5rem]">
      <article className="flex flex-col gap-[2rem]">
        <div>
          <Author
            variant={variant === "board" ? "board" : "community"}
            profileImg={postData.authorProfilePictureUrl}
            name={postData.authorNickname}
            createdAt={formatDateConvert(postData.updatedAt)}
            isMe={postData.mine}
          />
        </div>
        <div className="text-[1.3rem] font-medium leading-[1.8rem] tracking-[-0.026rem] text-black">
          {postData.content}
        </div>
        {postData.photoUrls && postData.photoUrls.length > 0 && (
          <div className="relative">
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {postData.photoUrls.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-square w-full overflow-hidden rounded-[1rem] border border-gray-300">
                      <img src={image} alt="이미지" className="h-full w-full object-cover" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            {postData.photoUrls.length > 1 && (
              <div className="absolute right-[1.5rem] top-[1.5rem] flex h-[2.4rem] w-auto min-w-[3.5rem] items-center justify-center rounded-[10rem] bg-black bg-opacity-80 px-[.7rem] py-[.5rem] text-[1rem] font-bold leading-normal tracking-[2px] text-white">
                {current}/{count}
              </div>
            )}
          </div>
        )}
      </article>
      <hr className="my-0" />
      <LikeAndComments
        type={variant === "board" ? "board" : "community"}
        isDetailPage={true}
        id={id}
        likeCount={postData.likeCount}
        commentCount={postData.commentCount}
        likedByUser={postData.likedByUser}
      />
    </section>
  );
};

export default PostDetailBox;
