import React from "react";
import CommunityTitle from "./CommunityTitle";
import { CommunityBox } from "@/components/common";

const examplePost = {
  community_id: 1,
  author: {
    user_id: 1,
    name: "이혜선",
    profileImage: "https://example.com/profile.jpg",
  },
  category: "자유" as "자유" | "심리케어" | "멘토링" | "정책" | "병원/클리닉",
  content:
    "본 타입은 커뮤니티에서 홈에서만 사용하는 타입입니다. 내용은 두줄 이상넘어가지 않고, 넘어갈시에는 이렇게 표현합니다.아아아아",
  images: [{ url: "https://example.com/profile.jpg", alt: "" }],
  tags: ["태그1", "태그2", "태그3"],
  createdAt: "오전 09:00",
  likes: 1,
  comments: [
    {
      comment_id: 1,
      author: { user_id: 1, name: "이혜선", profileImage: "https://example.com/profile.jpg" },
      content:
        "평소에 퇴근하고 지쳐서 당신과 많은 이야기를 나누지 못했는데, 오늘 딱 느낀 거 같아, 우리 앞으로 대화를 자주 하자.",
      createdAt: "오후 10:56",
    },
    {
      comment_id: 2,
      author: { user_id: 2, name: "김준혁", profileImage: "https://example.com/profile.jpg" },
      content: "아~",
      createdAt: "오후 10:56",
    },
  ],
};

type TCommunityPostListProps = {
  category: string;
  limit?: number;
};

const CommunityPostList = ({ category, limit }: TCommunityPostListProps) => {
  return (
    <article className="flex flex-col gap-[1rem]">
      {limit ? (
        <CommunityTitle title={`${category} 인기 글`} />
      ) : (
        <div>
          <p className="px-[1.5rem] text-[1.4rem] font-medium leading-normal">438개의 {category} 글</p>
          <hr />
        </div>
      )}
      <div className="flex flex-col gap-[1.5rem] px-[1.5rem]">
        <CommunityBox communityData={examplePost} />
      </div>
    </article>
  );
};

export default CommunityPostList;
