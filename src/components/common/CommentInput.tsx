import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { Input } from "@/components/common";
import { CommentType } from "@/types/CommentType";
import { postComment } from "@/apis";

const CommentInput = ({ type, id }: { type: string; id: string }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<AxiosResponse<CommentType>, AxiosError, { type: string; postId: string; text: string }>({
    mutationFn: async ({ type, postId, text }: { type: string; postId: string; text: string }) =>
      await postComment({ type, postId, text }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["community"],
      });
      queryClient.invalidateQueries({
        queryKey: ["community", id],
      });
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        console.error("로그인이 필요합니다.");
      } else {
        console.error("업로드 중 오류가 발생했습니다:", error.message);
      }
    },
  });

  const onSend = (value: string) => {
    mutation.mutate({ type, postId: id, text: value });
  };

  return (
    <footer className="h-[8rem] p-[1.5rem]">
      <Input className="h-[5rem] cursor-text" onSend={onSend} />
    </footer>
  );
};

export default CommentInput;
