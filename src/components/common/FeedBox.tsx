import { useEffect, useState } from "react";
import { FeedType } from "@/types";
import Author from "@/components/ui/Author";
import { BoxContainer, BoxContent, BoxFooter, BoxHeader } from "@/components/ui/Box";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/Carousel";
import LikeAndComments from "@/components/ui/LikeAndComments";
import { IconDotHorizontal } from "@/assets/icon";

type FeedBoxProps = {
  feed: FeedType;
};

export default function FeedBox({ feed }: FeedBoxProps) {
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
    <BoxContainer>
      <BoxHeader>
        <div className="flex items-center gap-[1.2rem]">
          <Author profileImg={feed.author.profileImage} name={feed.author.name} createdAt={feed.createdAt} />
        </div>
        <IconDotHorizontal className="cursor-pointer" />
      </BoxHeader>

      <BoxContent className="ml-[4.8rem] mt-[1rem] flex flex-col">
        <div className="text-[1.3rem] font-medium leading-[1.8rem] text-black">{feed.content}</div>

        {feed.images && feed.images.length > 0 && (
          <div className="relative mt-[1.5rem]">
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {feed.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-square w-full overflow-hidden rounded-[1rem] border border-gray-300">
                      <img src={image.url} alt="" className="h-full w-full object-cover" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            {feed.images.length > 1 && (
              <div className="absolute right-[1.5rem] top-[1.5rem] flex h-[2.4rem] w-auto min-w-[3.5rem] items-center justify-center rounded-[10rem] bg-black bg-opacity-80 px-[.7rem] py-[.5rem] text-[1rem] font-bold leading-normal tracking-[2px] text-white">
                {current}/{count}
              </div>
            )}
          </div>
        )}
      </BoxContent>

      <BoxFooter className="ml-[4.8rem]">
        <LikeAndComments type="feed" id={feed.id} likes={feed.likes} comments={feed.comments} />
      </BoxFooter>
    </BoxContainer>
  );
}
