import { useEffect, useState } from "react";
import Author from "../ui/Author";
import LikeAndComments from "../ui/LikeAndComments";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/Carousel";
import { FeedType, CommunityType } from "@/types";

type TPostDetailBoxProps = (FeedType | CommunityType) & { variant: string };

const PostDetailBox = (props: TPostDetailBoxProps) => {
  const { author, content, images, createdAt, likes, comments } = props;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const id = props.variant === "feed" ? (props as FeedType).feed_id : (props as CommunityType).community_id;

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
          <Author variant="feed" profileImg={author.profileImage} name={author.name} createdAt={createdAt} />
        </div>
        <div className="text-[1.3rem] font-medium leading-[1.8rem] tracking-[-0.026rem] text-black">{content}</div>
        {images && images.length > 0 && (
          <div className="relative">
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-square w-full overflow-hidden rounded-[1rem] border border-gray-300">
                      <img src={image.url} alt="" className="h-full w-full object-cover" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            {images.length > 1 && (
              <div className="absolute right-[1.5rem] top-[1.5rem] flex h-[2.4rem] w-auto min-w-[3.5rem] items-center justify-center rounded-[10rem] bg-black bg-opacity-80 px-[.7rem] py-[.5rem] text-[1rem] font-bold leading-normal tracking-[2px] text-white">
                {current}/{count}
              </div>
            )}
          </div>
        )}
      </article>
      <hr className="my-0" />
      <LikeAndComments type="feed" id={id} likes={likes} comments={comments} />
    </section>
  );
};

export default PostDetailBox;
