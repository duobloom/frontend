import { EmotionBox, BoardBox, QuestionBox } from "../common";

import testProfileImg from "@/assets/image/test-profile.jpg";
import testImg1 from "@/assets/image/test-profile2.jpg";
import testImg2 from "@/assets/image/test.png";

const questionData = {
  question_id: 1,
  content: "질문에 대한 이야기를 제공하는 곳",
  answers: [],
};

const boardData = {
  boardId: 1,
  author: { user_id: 1, name: "이혜선", profileImage: testProfileImg },
  content:
    "오늘 아침, 일찍 일어나 따뜻한 커피 한 잔을 들고 산책을 나갔다. 선선한 바람이 불어 기분이 상쾌했고, 오랜만에 여유롭게 자연을 만끽할 수 있었다.",
  photoUrls: [testImg1, testImg2],
  createdAt: "오전 10:56",
  likes: 1,
  comments: [
    {
      comment_id: 1,
      author: { user_id: 1, name: "이혜선", profileImage: testProfileImg },
      content:
        "평소에 퇴근하고 지쳐서 당신과 많은 이야기를 나누지 못했는데, 오늘 딱 느낀 거 같아, 우리 앞으로 대화를 자주 하자.",
      createdAt: "오후 10:56",
    },
    {
      comment_id: 2,
      author: { user_id: 2, name: "김준혁", profileImage: testProfileImg },
      content: "아~",
      createdAt: "오후 10:56",
    },
  ],
};

const emotionData = {
  emotionId: 1,
  emoji: 2,
  feedDate: "오후 11:18",
  author: { user_id: 1, name: "이혜선", profileImage: testProfileImg },
};

const MainFeed = ({ nowData }: { nowData: string }) => {
  console.log(nowData);

  return (
    <section className="relative z-0 mt-[1.5rem] flex h-[calc(100%-24.8rem)] flex-col gap-[1.5rem] overflow-auto rounded-t-[3rem] bg-gray-100 bg-[linear-gradient(to_right,_transparent,_transparent_50%,_#E2E2E2_50%,_#E2E2E2_50.3%,_transparent_50.3%)] bg-[length:100%_1px] bg-center p-[1.5rem] shadow-feed scrollbar-hide">
      <EmotionBox emotion={emotionData} />
      <BoardBox board={boardData} />
      <QuestionBox data={questionData} />
    </section>
  );
};

export default MainFeed;
