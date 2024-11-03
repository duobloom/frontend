import { useEffect, useRef, useState } from "react";
import { DrawerTitle } from "../common/Drawer";
import { Button } from "../common";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../common/AlertDialog";
import { IconClose } from "@/assets/icon";

const MainQuestionForm = ({ qTitle, onClose }: { qTitle: string; onClose: () => void }) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.addEventListener("input", updateFormValidity);
    }
    return () => {
      if (textRef.current) {
        textRef.current.removeEventListener("input", updateFormValidity);
      }
    };
  }, []);

  // 완료 버튼 활성화
  const updateFormValidity = () => {
    if (textRef.current) {
      setIsFormValid(textRef.current.value.trim().length > 0);
    }
  };

  // 제출
  const handleSubmit = () => {
    if (textRef.current) {
      console.log(textRef.current.value);
    }
    onClose();
  };

  // 폼 초기화
  const resetForm = () => {
    if (textRef.current) {
      textRef.current.value = "";
    }
    setIsFormValid(false);
  };

  // 닫기 전 확인
  const handleClose = () => {
    if (isFormValid) {
      setShowConfirmDialog(true);
    } else {
      resetForm();
      onClose();
    }
  };

  const handleConfirmClose = () => {
    resetForm();
    onClose();
    setShowConfirmDialog(false);
  };

  return (
    <>
      <div className="flex items-center justify-between pb-[1.4rem]">
        <div onClick={handleClose} className="cursor-pointer">
          <IconClose />
        </div>
        <DrawerTitle text="질문 답변" />
        <Button variant="oval" size="sm" disabled={!isFormValid} onClick={handleSubmit}>
          완료
        </Button>
      </div>
      <div className="flex h-full flex-col">
        <h1 className="py-[1.5rem] text-[2.4rem] font-bold leading-[3rem] tracking-[-0.048rem] text-black">{qTitle}</h1>
        <hr className="mb-[2rem] mt-[1.5rem]" />
        <textarea
          ref={textRef}
          placeholder="답변을 입력해 주세요"
          className="h-full resize-none text-[1.4rem] font-medium leading-[2rem] tracking-[-0.028] text-black outline-none"
        ></textarea>
      </div>

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
    </>
  );
};

export default MainQuestionForm;
