import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import Header from "@/components/layout/Header";
import { EmotionBox, FeedBox, QuestionBox } from "@/components/common";

import "dayjs/locale/ko";

import testProfileImg from "@/assets/image/test-profile.jpg";
import testImg1 from "@/assets/image/test-profile2.jpg";
import testImg2 from "@/assets/image/test.png";

// 한국어 로케일 설정
dayjs.locale("ko");

const questionData = {
  question_id: 1,
  content: "질문에 대한 이야기를 제공하는 곳",
  answers: [],
};

const feedData = {
  feed_id: 1,
  author: { user_id: 1, name: "이혜선", profileImage: testProfileImg },
  content:
    "오늘 아침, 일찍 일어나 따뜻한 커피 한 잔을 들고 산책을 나갔다. 선선한 바람이 불어 기분이 상쾌했고, 오랜만에 여유롭게 자연을 만끽할 수 있었다.",
  images: [
    { url: testImg1, alt: "" },
    { url: testImg2, alt: "" },
  ],
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
  emotion_id: 1,
  emotion_num: 2,
  updated_at: "오후 11:18",
  author: { user_id: 1, name: "이혜선", profileImage: testProfileImg },
};

const CalendarDetailPage = () => {
  const params = useParams();
  const [day, weekDay] = [dayjs(params.date).format("YYYY.MM.DD"), dayjs(params.date).format("dddd")];

  return (
    <main>
      <Header variant="backTitle" title="" />
      <h1 className="mb-[5rem] mt-[2rem] px-[1.5rem] text-[2.4rem] font-bold leading-[3rem] tracking-[-0.048rem]">
        {day} {weekDay}의 <br />
        기록을 알아보세요
      </h1>
      <section className="flex h-[calc(100%-18.8rem)] flex-col gap-[1.5rem] overflow-auto rounded-t-[3rem] bg-gray-100 p-[1.5rem] shadow-feed scrollbar-hide">
        <EmotionBox emotion={emotionData} />
        <FeedBox feed={feedData} />
        <QuestionBox data={questionData} />
      </section>
    </main>
  );
};

export default CalendarDetailPage;
