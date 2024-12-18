import LazyIcon from "@/assets/icon/LazyIcon";

const CommunityTitle = ({ title }: { title: string }) => {
  return (
    <div className={`flex cursor-pointer items-center justify-between px-[1.5rem] py-[.6rem]`}>
      <h1 className="text-[1.6rem] font-bold leading-normal tracking-[-0.032rem] text-black">{title}</h1>
      <button className="flex items-center justify-center">
        <LazyIcon name="icon-chevron-right" />
      </button>
    </div>
  );
};

export default CommunityTitle;
