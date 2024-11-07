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

import { FeedPostFormSchema, FeedPostFormType } from "@/types/FeedType";
import { CategoryType, CommunityPostFormSchema, CommunityPostFormType } from "@/types/CommunityType";

import { IconClose } from "@/assets/icon";
import { useState } from "react";

type TPostFormProps = {
  type: "add" | "edit";
  context: "feed" | "community";
  initialData?: (FeedPostFormType | CommunityPostFormType) | null;
  onClose: () => void;
};

const PostForm = ({ type, context, initialData = null, onClose }: TPostFormProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // form 설정
  const form = useForm({
    resolver: zodResolver(context === "community" ? CommunityPostFormSchema : FeedPostFormSchema),
    defaultValues: {
      content: initialData?.content || "",
      images: initialData?.images || [],
      ...(context === "community" && {
        category: (initialData as CommunityPostFormType)?.category || "",
        tags: (initialData as CommunityPostFormType)?.tags || [],
      }),
    },
    mode: "onChange",
  });

  // 완료 버튼 클릭
  const handleSubmit = () => {
    if (form.formState.isValid || form.watch("content") || (context === "community" && form.watch("category"))) {
      console.log(form.getValues());
      onClose();
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
      (context === "community" && form.watch("category"))
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
              !form.formState.isValid || !form.watch("content") || (context === "community" && !form.watch("category"))
            }
            onClick={handleSubmit}
          >
            완료
          </Button>
        </div>

        {/* 폼 카테고리 영역 (community에서만) */}
        {context === "community" && (
          <FormCategoryButton
            selectedButton={form.watch("category") as CategoryType}
            setSelectedButton={(category: CategoryType) =>
              form.setValue("category", category, { shouldValidate: true })
            }
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
