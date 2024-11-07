import React from "react";
import { Button } from "../common";
import { InfoText } from ".";

type TAddressCopyProps = {
  address: string;
};

const AddressCopy: React.FC<TAddressCopyProps> = ({ address }) => {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        alert("주소가 복사되었습니다."); // 성공 알림
      })
      .catch((err) => {
        console.error("주소 복사 실패:", err); // 에러 로그
      });
  };

  return (
    <span className="flex items-baseline justify-between">
      <InfoText size="sm" className="mb-[1.5rem]">
        {address}
      </InfoText>
      <Button variant="oval" size="sm" onClick={handleCopy}>
        복사
      </Button>
    </span>
  );
};

export default AddressCopy;
