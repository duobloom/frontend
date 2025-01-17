import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DrawerTitle } from "@/components/common/Drawer";
import { Button } from "@/components/common";
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
import BoardFormImage from "./BoardFormImage";

import { getS3Url, postPresignedUrl, putS3Upload } from "@/apis/image/imageUpload";
import { usePostBoardWrite } from "@/hooks/usePostBoardWrite";
import { usePutBoardUpdate } from "@/hooks/usePutBoardUpdate";

import { BoardPostFormSchema, BoardPostFormType } from "@/types/BoardType";

import LazyIcon from "@/assets/icon/LazyIcon";

type TMainBoardFormProps = {
  id?: number;
  type: "add" | "edit";
  initialData?: BoardPostFormType | null;
  onClose: () => void;
};

const MainBoardForm = ({ id, type, initialData = null, onClose }: TMainBoardFormProps) => {
  const postBoardMutation = usePostBoardWrite();
  const putBoardUpdate = usePutBoardUpdate();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // form 설정
  const form = useForm({
    resolver: zodResolver(BoardPostFormSchema),
    defaultValues: {
      content: initialData?.content || "",
      photoUrls: initialData?.photoUrls || [],
    },
    mode: "onChange",
  });

  // 완료 버튼 클릭
  const handleSubmit = async () => {
    if (form.formState.isValid || form.watch("content")) {
      try {
        let finalUrls: string[] = [];

        // 이미지가 있는 경우
        if (form.watch("photoUrls").length > 0) {
          // const imageNames = form.getValues().photoUrls.map((photo) => photo.file?.name);
          const photos = form.getValues().photoUrls as { photo_url: string; file: File }[];

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

        const boardForm = {
          content: form.getValues().content,
          photoUrls: finalUrls,
        };

        if (type === "add") {
          postBoardMutation.mutate(boardForm);
        } else {
          putBoardUpdate.mutate({ id: id as number, boardForm });
        }
        onClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 닫기 전 확인
  const handleClose = () => {
    const { photoUrls } = form.getValues();
    if (form.formState.isValid || form.watch("content") || photoUrls?.length) {
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
            <LazyIcon name="icon-close" />
          </div>
          <DrawerTitle text={`${type === "add" ? "글 쓰기" : "글 수정"}`} />
          <Button
            type="button"
            variant="oval"
            size="sm"
            disabled={!form.formState.isValid || !form.watch("content")}
            onClick={handleSubmit}
          >
            완료
          </Button>
        </div>

        {/* 폼 이미지 영역 */}
        <BoardFormImage form={form} />

        {/* 텍스트 입력 영역 */}
        {/* <textarea
          {...form.register("content", {
            required: true,
            validate: (value) => value.trim().length > 0,
          })}
          placeholder="내용을 입력해 주세요"
          className="h-full resize-none text-[1.4rem] font-medium leading-[2rem] tracking-[-0.028] text-black outline-none"
        /> */}

        {/* #91 font 스케일 조정으로 인한 값 수정 */}
        <textarea
          {...form.register("content", {
            required: true,
            validate: (value) => value.trim().length > 0,
          })}
          placeholder="내용을 입력해 주세요"
          className="h-full w-[114.2857%] origin-top-left scale-[0.875] transform resize-none text-[1.6rem] font-medium leading-[2.2857rem] tracking-[-0.032rem] text-black outline-none"
        />
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

export default MainBoardForm;
