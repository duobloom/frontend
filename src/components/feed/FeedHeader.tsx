import React from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/common/Drawer";
import Header from "@/components/layout/Header";
import IconDotHorizontal from "../ui/IconDotHorizontal";
import { FeedType } from "@/types";

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
