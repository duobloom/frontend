import CommunityTitle from "./CommunityTitle";

import testMagazineImage from "@/assets/image/test-magazine.jpg";

const CommunityMagazine = () => {
  return (
    <article className="flex flex-col gap-[1rem]">
      <CommunityTitle title="매거진" />
      <div className="px-[1.5rem]">
        <div
          className="h-[15rem] w-full cursor-pointer rounded-[1rem] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${testMagazineImage}')`,
          }}
        >
          <div className="flex h-full w-full flex-col justify-between rounded-[1rem] bg-black/50 p-[2rem]">
            <div className="flex w-fit items-center justify-center rounded-[.5rem] border border-red p-[.4rem] text-[1rem] font-bold text-red">
              듀블 매거진
            </div>
            <h6 className="text-[2rem] font-bold leading-[2.6rem] text-white">
              듀블과 함께하는
              <br /> 글로벌 난임 프로젝트
            </h6>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CommunityMagazine;
