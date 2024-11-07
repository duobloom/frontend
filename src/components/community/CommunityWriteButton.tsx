import React, { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/common/Drawer";
import { PostForm } from "@/components/common";
import { IconEdit } from "@/assets/icon";

const CommunityWriteButton = () => {
  const [isTextDrawerOpen, setIsTextDrawerOpen] = useState(false);

  return (
    <Drawer open={isTextDrawerOpen} onOpenChange={setIsTextDrawerOpen}>
      <DrawerTrigger asChild>
        <button
          className={`absolute bottom-[2rem] right-[2rem] flex h-[5rem] w-[5rem] items-center justify-center rounded-full border border-gray-300 bg-white shadow-icon`}
        >
          <IconEdit />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <PostForm type="add" context="community" onClose={() => setIsTextDrawerOpen(false)} />
      </DrawerContent>
    </Drawer>
  );
};

export default CommunityWriteButton;
