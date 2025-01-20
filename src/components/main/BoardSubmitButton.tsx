import React from "react";
import { Button } from "@/components/common";
import { UseFormReturn } from "react-hook-form";
import { BoardPostFormType } from "@/types/BoardType";

type TBoardSubmitButtonProps = {
  form: UseFormReturn<BoardPostFormType>;
  onSubmit: () => void;
};

const BoardSubmitButton = React.memo(({ form, onSubmit }: TBoardSubmitButtonProps) => {
  const isValid = form.formState.isValid;
  const content = form.getValues("content");

  return (
    <Button type="button" variant="oval" size="sm" disabled={!isValid || !content.trim()} onClick={onSubmit}>
      완료
    </Button>
  );
});

export default BoardSubmitButton;
