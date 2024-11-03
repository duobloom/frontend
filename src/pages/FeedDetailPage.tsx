import { FeedHeader, FeedPost, FeedComment, CommentInput } from "@/components/feed";

import testProfileImg from "@/assets/image/test-profile.jpg";
import testImg1 from "@/assets/image/test-profile2.jpg";
import testImg2 from "@/assets/image/test.png";

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

const FeedDetailPage = () => {
  return (
    <main>
      <FeedHeader feedData={feedData} />
      <div className="h-[calc(100vh-138px)] overflow-y-auto scrollbar-hide">
        <FeedPost feedData={feedData} />
        <FeedComment feedData={feedData} />
      </div>
      <CommentInput />
    </main>
  );
};

export default FeedDetailPage;
