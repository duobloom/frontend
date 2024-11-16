import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { Input } from "@/components/common";
import { CommentType } from "@/types/CommentType";
import { postComment } from "@/apis";

const CommentInput = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<AxiosResponse<CommentType>, AxiosError, { postId: string; text: string }>({
    mutationFn: async ({ postId, text }: { postId: string; text: string }) => await postComment({ postId, text }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
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
    mutation.mutate({ postId: id, text: value });
  };

  return (
    <footer className="h-[8rem] p-[1.5rem]">
      <Input className="h-[5rem] cursor-text" onSend={onSend} />
    </footer>
  );
};

export default CommentInput;
