import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/common/Drawer";
import { IconEdit } from "@/assets/icon";
import { CommunityPostForm } from "@/components/community";

const CommunityWriteButton = () => {
  const [isTextDrawerOpen, setIsTextDrawerOpen] = useState(false);

  return (
    <Drawer dismissible={false} open={isTextDrawerOpen} onOpenChange={setIsTextDrawerOpen}>
      <DrawerTrigger asChild>
        <button
          className={`absolute bottom-[2rem] right-[2rem] z-30 flex h-[5rem] w-[5rem] items-center justify-center rounded-full border border-gray-300 bg-white shadow-icon`}
        >
          <IconEdit />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <CommunityPostForm type="add" onClose={() => setIsTextDrawerOpen(false)} />
      </DrawerContent>
    </Drawer>
  );
};

export default CommunityWriteButton;
