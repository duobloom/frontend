import React, { forwardRef } from "react";
import Author from "../ui/Author";
import { FeedType } from "@/types";
import { Drawer, DrawerContent, DrawerTrigger } from "../common/Drawer";

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

type TFeedPostProps = {
  feedData: FeedType;
};

const FeedComment = ({ feedData }: TFeedPostProps) => {
  // 댓글 수정
  const handleCommentEdit = (id: number) => {
    console.log(id);
  };

  // 댓글 삭제
  const handleCommentDelete = (id: number) => {
    console.log(id);
  };

  return (
    <section>
      <div className="mb-[1.5rem] mt-[2rem] h-[.6rem] w-full bg-gray-100" />
      <article className={`flex flex-col gap-[2rem] px-[1.5rem]`}>
        {feedData.comments.map((comment) => (
          <div key={comment.comment_id} className="flex flex-col gap-[.5rem]">
            <div className="flex items-center justify-between">
              <Author
                variant="community"
                profileImg={comment.author.profileImage}
                name={comment.author.name}
                createdAt={comment.createdAt}
              />
              <Drawer>
                <DrawerTrigger asChild>
                  <IconDotHorizontal className="cursor-pointer" />
                </DrawerTrigger>
                <DrawerContent className="h-[23%]">
                  <div className="flex flex-col gap-[1.8rem] px-[9rem] py-[3.9rem] text-[1.6rem] font-extrabold leading-normal tracking-[-0.032rem]">
                    <button onClick={() => handleCommentEdit(comment.comment_id)}>수정</button>
                    <button onClick={() => handleCommentDelete(comment.comment_id)}>삭제</button>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
            <p className="ml-[4.8rem] text-[1.3rem] font-medium leading-[1.8rem] tracking-[-0.026rem] text-black">
              {comment.content}
            </p>
          </div>
        ))}
      </article>
    </section>
  );
};

export default FeedComment;
