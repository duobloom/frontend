import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormCategoryButton, FormImage, FormTag } from "@/components/common/form";
import { DrawerTitle } from "../common/Drawer";
import { Button } from "../common/Button";
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

import { getS3Url, postPresignedUrl, putS3Upload } from "@/apis/image/imageUpload";
import { usePostBoardWrite } from "@/hooks/usePostBoardWrite";
import { usePutBoardUpdate } from "@/hooks/usePutBoardUpdate";
import { usePostCommunityWrite } from "@/hooks/usePostCommunityWrite";

import { CategoryType, CommunityPostFormSchema, CommunityPostFormType } from "@/types/CommunityType";
import { BoardPostFormSchema, BoardPostFormType } from "@/types/BoardType";

import { IconClose } from "@/assets/icon";

type TPostFormProps = {
  id?: number;
  type: "add" | "edit";
  context: "board" | "community";
  initialData?: (BoardPostFormType | CommunityPostFormType) | null;
  onClose: () => void;
};

const PostForm = ({ id, type, context, initialData = null, onClose }: TPostFormProps) => {
  const postBoardMutation = usePostBoardWrite();
  const postCommunityMutation = usePostCommunityWrite();
  const putBoardUpdate = usePutBoardUpdate();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // form 설정
  const form = useForm({
    resolver: zodResolver(context === "community" ? CommunityPostFormSchema : BoardPostFormSchema),
    defaultValues: {
      content: initialData?.content || "",
      images:
        context === "community"
          ? (initialData as CommunityPostFormType)?.images || []
          : (initialData as BoardPostFormType)?.images || [],
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
        let finalUrls: string[] = [];

        // 이미지가 있는 경우
        if (form.watch("images").length > 0) {
          const photos = form.getValues().images as { photo_url: string; file: File }[];

          // file이 존재하는 경우만 필터링
          const validPhotos = photos.filter((photo) => photo.file !== undefined);

          // Presigned url 발급
          const presignedUrls = await postPresignedUrl(validPhotos.map((photo) => photo.file!.name));

          // S3 업로드
          const isUpload = await putS3Upload(presignedUrls, validPhotos);

          // 실패
          if (!isUpload) {
            console.log("이미지 업로드 실패");
            return;
          }

          // s3 URL 생성
          const s3Urls = presignedUrls.map(getS3Url);

          // 최종 업로드 할 이미지 url 리스트
          finalUrls = [
            ...photos.filter((photo) => photo.file === undefined).map((photo) => photo.photo_url), // 기존 이미지
            ...s3Urls, // 새로 업로드된 이미지
          ];
        }

        const baseForm = {
          content: form.getValues().content,
        };

        // 커뮤니티
        if (context === "community") {
          const communityForm = {
            ...baseForm,
            imageUrls: finalUrls,
            type: form.getValues().type as CategoryType,
            tags: form.getValues().tags || [],
          };
          if (type === "add") {
            postCommunityMutation.mutate(communityForm);
          } else {
            // 업데이트 (해야 됨...)
          }
        }
        // 피드
        else {
          const boardForm = {
            ...baseForm,
            photoUrls: finalUrls,
          };
          if (type === "add") {
            postBoardMutation.mutate(boardForm);
          } else {
            putBoardUpdate.mutate({ id: id as number, boardForm });
          }
        }
        onClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 닫기 전 확인
  const handleClose = () => {
    const { images, tags } = form.getValues();
    if (
      form.formState.isValid ||
      form.watch("content") ||
      tags?.length ||
      images?.length ||
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
