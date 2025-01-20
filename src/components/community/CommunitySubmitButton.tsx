import React from "react";
import { Button } from "@/components/common";
import { UseFormReturn } from "react-hook-form";
import { CommunityPostFormType } from "@/types/CommunityType";

type TCommunitySubmitButtonProps = {
  form: UseFormReturn<CommunityPostFormType>;
  onSubmit: () => void;
};
const CommunitySubmitButton = React.memo(({ form, onSubmit }: TCommunitySubmitButtonProps) => {
  const isValid = form.formState.isValid;
  const content = form.getValues("content");
  const type = form.getValues("type");

  return (
    <Button type="button" variant="oval" size="sm" disabled={!isValid || !content.trim() || !type} onClick={onSubmit}>
      완료
    </Button>
  );
});

export default CommunitySubmitButton;
