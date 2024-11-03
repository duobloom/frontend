import React, { forwardRef } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/common/Drawer";
import Header from "@/components/layout/Header";
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

const FeedHeader = ({ feedData }: { feedData: FeedType }) => {
  const handleFeedSave = (id: number) => {
    console.log(id);
  };
  const handleFeedEdit = (id: number) => {
    console.log(id);
  };
  const handleFeedDelete = (id: number) => {
    console.log(id);
  };

  const renderMenuButton = () => {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <IconDotHorizontal className="cursor-pointer" />
        </DrawerTrigger>
        <DrawerContent className="h-[23%]">
          <div className="flex flex-col gap-[1.8rem] px-[9rem] py-[3.9rem] text-[1.6rem] font-extrabold leading-normal tracking-[-0.032rem]">
            <button onClick={() => handleFeedSave(feedData.feed_id)}>글 저장</button>
            <button onClick={() => handleFeedEdit(feedData.feed_id)}>수정</button>
            <button onClick={() => handleFeedDelete(feedData.feed_id)}>삭제</button>
          </div>
        </DrawerContent>
      </Drawer>
    );
  };

  return <Header variant="backMenu" menuButton={renderMenuButton} />;
};

export default FeedHeader;
