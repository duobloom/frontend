import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormCategoryButton, FormImage, FormTag } from "@/components/common/form";

import { DrawerTitle } from "./Drawer";
import { Button } from "./Button";
import { Form } from "@/components/ui/Form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/common/AlertDialog";

import { CategoryType, CommunityPostFormSchema, CommunityPostFormType } from "@/types/CommunityType";
import { BoardPostFormSchema, BoardPostFormType } from "@/types/BoardType";

import { IconClose } from "@/assets/icon";
import { useState } from "react";
import { getS3Url, postPresignedUrl, putS3Upload } from "@/apis/imageUpload/imageUpload";
import { usePostBoardWrite } from "@/hooks/usePostBoardWrite";

type TPostFormProps = {
  type: "add" | "edit";
  context: "board" | "community";
  initialData?: (BoardPostFormType | CommunityPostFormType) | null;
  onClose: () => void;
};

const PostForm = ({ type, context, initialData = null, onClose }: TPostFormProps) => {
  const postBoardMutation = usePostBoardWrite();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // form 설정
  const form = useForm({
    resolver: zodResolver(context === "community" ? CommunityPostFormSchema : BoardPostFormSchema),
    defaultValues: {
      content: initialData?.content || "",
      photoUrls: initialData?.photoUrls || [],
      ...(context === "community" && {
        type: (initialData as CommunityPostFormType)?.type || "",
        tags: (initialData as CommunityPostFormType)?.tags || [],
      }),
    },
    mode: "onChange",
  });

  // 완료 버튼 클릭
  const handleSubmit = async () => {
    if (form.formState.isValid || form.watch("content") || (context === "community" && form.watch("type"))) {
      try {
        let s3Urls: string[] = [];

        // 이미지가 있는 경우
        if (form.watch("photoUrls").length > 0) {
          const imageNames = form.getValues().photoUrls.map((photo) => photo.file?.name);
          const photos = form.getValues().photoUrls as { photo_url: string; file: File }[];

          // Presigned url 발급
          const presignedUrls = await postPresignedUrl(imageNames as string[]);

          // s3 업로드
          const isUpload = await putS3Upload(presignedUrls, photos);

          // 실패
          if (!isUpload) {
            console.log("이미지 업로드 실패");
            return;
          }
          // s3 URL 생성
          s3Urls = presignedUrls.map(getS3Url);
        }

        const boardForm = {
          title: "",
          content: form.getValues().content,
          photoUrls: s3Urls,
        };

        // 커뮤니티
        if (context === "community") {
          const communityForm = {
            ...boardForm,
            type: form.getValues().type,
            tags: form.getValues().tags || [],
          };
          console.log(communityForm);
          // postCommunityMutation.mutate(communityForm);
        }
        // 피드
        else {
          postBoardMutation.mutate(boardForm);
        }
        onClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 닫기 전 확인
  const handleClose = () => {
    const { photoUrls, tags } = form.getValues();
    if (
      form.formState.isValid ||
      form.watch("content") ||
      tags?.length ||
      photoUrls?.length ||
      (context === "community" && form.watch("type"))
    ) {
      setShowConfirmDialog(true);
    } else {
      onClose();
    }
  };

  // 모달(Drawer) 닫기
  const handleConfirmClose = () => {
    onClose();
    setShowConfirmDialog(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="flex h-full flex-col overflow-y-auto scrollbar-hide">
        <div className="flex items-center justify-between pb-[1.4rem]">
          <div onClick={handleClose} className="cursor-pointer">
            <IconClose />
          </div>
          <DrawerTitle text={`${type === "add" ? "글 쓰기" : "글 수정"}`} />
          <Button
            type="button"
            variant="oval"
            size="sm"
            disabled={
              !form.formState.isValid || !form.watch("content") || (context === "community" && !form.watch("type"))
            }
            onClick={handleSubmit}
          >
            완료
          </Button>
        </div>

        {/* 폼 카테고리 영역 (community에서만) */}
        {context === "community" && (
          <FormCategoryButton
            selectedButton={form.watch("type") as CategoryType}
            setSelectedButton={(type: CategoryType) => form.setValue("type", type, { shouldValidate: true })}
          />
        )}

        {/* 폼 이미지 영역 */}
        <FormImage form={form} />

        {/* 텍스트 입력 영역 */}
        <textarea
          {...form.register("content", {
            required: true,
            validate: (value) => value.trim().length > 0,
          })}
          placeholder="내용을 입력해 주세요"
          className="h-full resize-none text-[1.4rem] font-medium leading-[2rem] tracking-[-0.028] text-black outline-none"
        />

        {/* 태그 입력 영역 */}
        {context === "community" && <FormTag form={form as UseFormReturn<CommunityPostFormType>} />}
      </form>

      {/* Alert 부분 */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>알림</AlertDialogTitle>
            <AlertDialogDescription>글 작성을 취소하시겠어요?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>아니오</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmClose}>네</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  );
};

export default PostForm;
