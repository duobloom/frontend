import { Button } from "@/components/common";
import Header from "@/components/layout/Header";
import { EditInput } from "@/components/mypage";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { getS3Url, postPresignedUrl, putS3Upload } from "@/apis/image/imageUpload";
import { reduceImageSize } from "@/utils";

const EditMyInfo = () => {
  const location = useLocation();
  const userInfo = location.state?.userInfo;
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>(userInfo.profilePictureUrl);
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [email, setEmail] = useState(userInfo.email);
  const [birth, setBirth] = useState(userInfo.birth);
  const [region, setRegion] = useState(userInfo.region);
  const patchMutate = useUpdateProfile();

  const handleImgEdit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedBlob = await reduceImageSize(URL.createObjectURL(file));
        const presignedUrls = await postPresignedUrl([file.name]);

        await putS3Upload(presignedUrls, [{ photo_url: file.name, file: compressedBlob as File }]);
        const s3ImageUrl = getS3Url(presignedUrls[0]);
        setProfilePictureUrl(s3ImageUrl);
      } catch (error) {
        console.error("이미지 업로드 중 오류가 발생했습니다:", error);
      }
    }
  };

  const handleEditClick = () => {
    fileRef.current?.click();
  };

  const handleApply = () => {
    patchMutate.mutate({ nickname, birth, profilePictureUrl, email, region });
  };

  return (
    <div className="flex h-full w-full flex-col">
      <Header variant="backTitle" title="내 정보 수정" />
      <div className="flex-1 px-[1.5rem] pt-[2rem]">
        <div className="flex flex-col items-center justify-center">
          <img
            src={profilePictureUrl}
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
            value={nickname ?? ""}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임"
          />
          <h1 className="mt-[1rem] text-[1.5rem] font-bold">이메일</h1>
          <EditInput
            variant="email"
            value={email ?? ""}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
          />
          <h1 className="mt-[1rem] text-[1.5rem] font-bold">생년월일</h1>
          <EditInput
            variant="birthdate"
            value={birth ?? ""}
            onChange={(e) => setBirth(e.target.value)}
            placeholder="YYYY-MM-DD"
          />
          <h1 className="mt-[1rem] text-[1.5rem] font-bold">거주 지역</h1>
          <EditInput
            variant="location"
            value={region ?? ""}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="서울시 강남구"
          />
        </section>
      </div>
      <footer className="flex w-full items-center gap-[.7rem] border-t border-gray-300 py-[1rem]">
        <Button className="mx-[1.5rem]" onClick={handleApply}>
          적용하기
        </Button>
      </footer>
    </div>
  );
};

export default EditMyInfo;
