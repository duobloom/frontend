import Author from "@/components/ui/Author";
import IconDotHorizontal from "@/components/ui/IconDotHorizontal";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/common/Drawer";
import { formatDateConvert } from "@/utils";
import { CommentType } from "@/types/CommentType";
import { useDeleteComment } from "@/hooks/useDeleteComment";

type TCommentBoxProps = {
  commentData: CommentType[];
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
        {commentData.map((comment) => (
          <div key={comment.id} className="flex flex-col gap-[.5rem]">
            <div className="flex items-center justify-between">
              <Author
                variant="community"
                profileImg={comment.profilePictureUrl}
                name={comment.nickname}
                createdAt={formatDateConvert(comment.createdAt)}
                isMe={comment.mine}
              />
              <Drawer>
                <DrawerTrigger asChild>
                  <IconDotHorizontal className="cursor-pointer" />
                </DrawerTrigger>
                <DrawerContent className="h-[23%]">
                  <div className="flex flex-col gap-[1.8rem] px-[9rem] py-[3.9rem] text-[1.6rem] font-extrabold leading-normal tracking-[-0.032rem]">
                    <button onClick={() => handleCommentEdit(comment.id)}>수정</button>
                    <button onClick={() => handleCommentDelete(comment.id)}>삭제</button>
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

export default CommentBox;
