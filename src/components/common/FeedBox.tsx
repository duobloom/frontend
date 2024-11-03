import { forwardRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Author from "@/components/ui/Author";
import { BoxContainer, BoxContent, BoxFooter, BoxHeader } from "@/components/ui/Box";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/Carousel";
import LikeAndComments from "@/components/ui/LikeAndComments";
import { Drawer, DrawerContent, DrawerTrigger } from "./Drawer";
import { FeedType } from "@/types";

const IconDotHorizontal = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="icn-dot-horizontal">
      <circle id="Vector" cx="12" cy="12" r="2" fill="#212721" />
      <circle id="Vector_2" cx="5" cy="12" r="2" fill="#212721" />
      <circle id="Vector_3" cx="19" cy="12" r="2" fill="#212721" />
    </g>
  </svg>
));
IconDotHorizontal.displayName = "IconDotHorizontal";

export { IconDotHorizontal };

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

  // 글 저장 (스크랩)
  const handleTextSave = (id: number) => {
    console.log(id);
  };

  // 글 수정
  const handleTextEdit = (id: number) => {
    console.log(id);
  };

  // 글 삭제
  const handleTextDelete = (id: number) => {
    console.log(id);
  };

  return (
    <BoxContainer>
      <BoxHeader>
        <div className="flex items-center gap-[1.2rem]">
          <Author profileImg={feed.author.profileImage} name={feed.author.name} createdAt={feed.createdAt} />
        </div>
        <Drawer>
          <DrawerTrigger asChild>
            <IconDotHorizontal className="cursor-pointer" />
          </DrawerTrigger>
          <DrawerContent className="h-[23%]">
            <div className="flex flex-col gap-[1.8rem] px-[9rem] py-[3.9rem] text-[1.6rem] font-extrabold leading-normal tracking-[-0.032rem]">
              <button onClick={() => handleTextSave(feed.feed_id)}>글 저장</button>
              <button onClick={() => handleTextEdit(feed.feed_id)}>수정</button>
              <button onClick={() => handleTextDelete(feed.feed_id)}>삭제</button>
            </div>
          </DrawerContent>
        </Drawer>
      </BoxHeader>

      <BoxContent className="ml-[4.8rem] mt-[1rem] flex flex-col">
        <Link
          to={`/feed/${feed.feed_id}`}
          className="line-clamp-3 text-[1.3rem] font-medium leading-[1.8rem] text-black"
        >
          {feed.content}
        </Link>

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
        <LikeAndComments type="feed" id={feed.feed_id} likes={feed.likes} comments={feed.comments} />
      </BoxFooter>
    </BoxContainer>
  );
}
