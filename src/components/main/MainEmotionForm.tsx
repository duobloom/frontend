import React, { useState } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from "../common/Drawer";
import { Button } from "../common";

const emotionList = [
  { id: 1, text: "기쁨이 가득한 하루!", emoji: "😊" },
  { id: 2, text: "마음이 울적할 때는 쉬어가자.", emoji: "😢" },
  { id: 3, text: "화가 나면 잠시 멈추고 숨을 고르자.", emoji: "😡" },
  { id: 4, text: "피곤할 땐 충분한 휴식이 필요해.", emoji: "😴" },
  { id: 5, text: "사랑이 넘치는 순간!", emoji: "😍" },
  { id: 6, text: "깊은 생각이 필요할 때.", emoji: "🤔" },
  { id: 7, text: "눈물이 나는 날도 있어.", emoji: "😭" },
  { id: 8, text: "축하할 일이 있을 땐 마음껏 즐기자!", emoji: "🥳" },
];

const MainEmotionForm = ({ emojiNum = 0, children }: { emojiNum?: number; children: React.ReactNode }) => {
  const [clickEmojiNum, setClickEmojiNum] = useState(emojiNum); // 감정을 클릭한 적 있다면
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    console.log(clickEmojiNum);
    setIsOpen(false);
    setClickEmojiNum(0); // API 통신 완료 시
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="flex items-center justify-between pb-[2rem]">
          <DrawerClose />
          <DrawerTitle text="내 감정" />
          <Button variant="oval" size="sm" disabled={clickEmojiNum === emojiNum} onClick={handleSubmit}>
            완료
          </Button>
        </div>
        <div className="flex flex-col gap-[1rem]">
          {emotionList.map((item) => (
            <div
              key={item.id}
              onClick={() => setClickEmojiNum(item.id)}
              className={`flex h-[6.6rem] cursor-pointer items-center justify-between rounded-[1rem] border px-[2rem] py-[1.5rem] ${clickEmojiNum === item.id ? "bg-red-10 border-red" : "border-gray-300 bg-white"} shadow-box`}
            >
              <p
                className={`w-[25rem] text-[1.4rem] font-semibold leading-[1.8rem] tracking-[-0.028rem] ${clickEmojiNum === item.id ? "text-red" : "text-gray-500"}`}
              >
                {item.text}
              </p>
              <span className="flex h-[3.6rem] w-[3.6rem] items-end justify-center text-[2.5rem]">{item.emoji}</span>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MainEmotionForm;
