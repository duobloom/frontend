import Author from "@/components/ui/Author";
import IconDotHorizontal from "@/components/ui/IconDotHorizontal";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/common/Drawer";
import { formatDateConvert } from "@/utils";
import { useDeleteComment } from "@/hooks/useDeleteComment";
import { CommentType } from "@/types/CommentType";
import { CommunityCommentType } from "@/types/CommunityType";

type TCommentBoxProps = {
  commentData: CommentType[] | CommunityCommentType[];
  type: "board" | "community";
};

const CommentBox = ({ commentData, type }: TCommentBoxProps) => {
  const deleteComment = useDeleteComment();

  // 댓글 수정
  const handleCommentEdit = (id: number) => {
    console.log(id);
  };

  // 댓글 삭제
  const handleCommentDelete = (id: number) => {
    deleteComment.mutate({ type, id });
  };

  return (
    <section>
      <div className="mb-[1.5rem] mt-[2rem] h-[.6rem] w-full bg-gray-100" />
      <article className={`flex flex-col gap-[2rem] px-[1.5rem]`}>
        {commentData.map((comment) => {
          let commentId, profileImg, name, createdAt, isMe, content;
          if (type === "board") {
            commentId = (comment as CommentType).id;
            profileImg = (comment as CommentType).profilePictureUrl;
            name = (comment as CommentType).nickname;
            createdAt = (comment as CommentType).createdAt;
            isMe = (comment as CommentType).mine;
            content = (comment as CommentType).content;
          } else {
            commentId = (comment as CommunityCommentType).commentId;
            profileImg = (comment as CommunityCommentType).profileUrl;
            name = (comment as CommunityCommentType).nickname;
            createdAt = comment as CommunityCommentType;
            isMe = (comment as CommunityCommentType).owner;
            content = (comment as CommunityCommentType).content;
          }
          return (
            <div key={commentId} className="flex flex-col gap-[.5rem]">
              <div className="flex items-center justify-between">
                <Author
                  variant="community"
                  profileImg={profileImg}
                  name={name}
                  createdAt={formatDateConvert(createdAt as string)}
                  isMe={isMe}
                />
                <Drawer>
                  <DrawerTrigger asChild>
                    <IconDotHorizontal className="cursor-pointer" />
                  </DrawerTrigger>
                  <DrawerContent className="h-[23%]">
                    <div className="flex flex-col gap-[1.8rem] px-[9rem] py-[3.9rem] text-[1.6rem] font-extrabold leading-normal tracking-[-0.032rem]">
                      <button onClick={() => handleCommentEdit(commentId)}>수정</button>
                      <button onClick={() => handleCommentDelete(commentId)}>삭제</button>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
              <p className="ml-[4.8rem] text-[1.3rem] font-medium leading-[1.8rem] tracking-[-0.026rem] text-black">
                {content}
              </p>
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default CommentBox;
