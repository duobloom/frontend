import { Button } from "@/components/common";
import Header from "@/components/layout/Header";
import { EditInput } from "@/components/mypage";
import React, { useState } from "react";

const EditMyInfo = () => {
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string>("https://example.com/profile-image.jpg");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [location, setLocation] = useState("");

  const handleImgEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleEditClick = () => {
    fileRef.current?.click();
  };

  return (
    <div className="flex h-full w-full flex-col">
      <Header variant="backTitle" title="내 정보 수정" />
      <div className="flex-1 px-[1.5rem] pt-[2rem]">
        <div className="flex flex-col items-center justify-center">
          <img
            src={profileImage}
            alt="Profile"
            className="relative h-[12rem] w-[12rem] rounded-full border border-gray-300 object-cover"
          />
          <Button variant="oval" size="sm" className="absolute top-[18rem]" onClick={handleEditClick}>
            수정
          </Button>
          <input ref={fileRef} type="file" id="inputFile" className="hidden" onChange={handleImgEdit} />
        </div>
        <hr className="mt-[3rem]" />
        <section className="flex flex-col gap-[1rem] py-[.7rem]">
          <h1 className="text-[1.5rem] font-bold">닉네임</h1>
          <EditInput
            variant="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임"
          />
          <h1 className="mt-[1rem] text-[1.5rem] font-bold">이메일</h1>
          <EditInput variant="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
          <h1 className="mt-[1rem] text-[1.5rem] font-bold">생년월일</h1>
          <EditInput
            variant="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            placeholder="생년월일"
          />
          <h1 className="mt-[1rem] text-[1.5rem] font-bold">거주 지역</h1>
          <EditInput
            variant="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="거주 지역"
          />
        </section>
      </div>
      <footer className="flex w-full items-center gap-[.7rem] border-t border-gray-300 py-[1rem]">
        <Button className="mx-[1.5rem]">적용하기</Button>
      </footer>
    </div>
  );
};

export default EditMyInfo;
