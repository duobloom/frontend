import LazyIcon from "@/assets/icon/LazyIcon";
import { DrawerClose, DrawerTitle } from "../common/Drawer";
import { BoxFooter } from "../ui/Box";
import defaultImage from "@/assets/image/doctor1.png";

type TMedicInfoProps = {
  title: string;
  content: string;
  image_Url?: string;
};

const MedicInfo: React.FC<TMedicInfoProps> = ({ title, content, image_Url }) => {
  return (
    <div className="mb-[1rem] flex w-full items-center justify-between rounded-[1rem] border border-gray-300 bg-gray-50 px-[1.5rem] py-[1rem] shadow-box">
      <div className="flex items-center gap-[1.5rem] px-[1rem] py-[1.1rem]">
        <img
          src={image_Url || defaultImage}
          alt={title}
          className="h-[4rem] w-[4rem] rounded-full border border-gray-300 object-cover"
        />
        <div className="flex flex-col items-start">
          <span className="text-[1.5rem] font-bold text-black">{title}</span>
          <span className="text-[1.4rem] font-normal text-gray-400">{content}</span>
        </div>
      </div>
      <LazyIcon name="icon-dropdown" />
    </div>
  );
};

type TMedicDetailProps = {
  title: string;
  content: string;
  image_Url?: string;
  specialty: string[];
  record: string[];
};
const MedicDetailInfo: React.FC<TMedicDetailProps> = ({ title, content, image_Url, specialty, record }) => {
  return (
    <>
      <span className="relative mb-[3.5rem] flex w-full items-center">
        <DrawerClose className="absolute left-0" />
        <DrawerTitle text="의료진" className="mx-auto" />
      </span>
      <div className="flex h-full flex-col gap-[.8rem] overflow-y-scroll scrollbar-hide">
        <div className="mb-[1rem] flex items-center gap-[1.5rem]">
          <img
            src={image_Url}
            alt={title}
            className="h-[8rem] w-[8rem] rounded-full border border-gray-300 object-cover"
          />
          <div className="flex flex-col">
            <span className="text-[2rem] font-bold text-black">{title}</span>
            <span className="text-[1.4rem] font-normal text-gray-400">{content}</span>
          </div>
        </div>
        <BoxFooter className="my-[1rem]" />
        <h1 className="text-[1.5rem] font-bold">진료 항목</h1>
        {specialty && specialty.length > 0 ? (
          <p className="text-[1.4rem] font-medium">
            {specialty
              .map((item, index) => ((index + 1) % 4 === 0 ? `${item},\n` : `${item}, `))
              .join("")
              .trim()
              .slice(0, -1)}
          </p>
        ) : (
          <p className="text-[1.4rem] text-gray-400">정보 없음</p>
        )}
        <BoxFooter />
        <h1 className="text-[1.5rem] font-bold">학력 및 경력</h1>
        {record && record.length > 0 ? (
          <ul className="list-disc pl-[1.5rem]">
            {record.map((item, index) => (
              <li key={index} className="text-[1.4rem] font-medium">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[1.4rem] text-gray-400">정보 없음</p>
        )}
      </div>
    </>
  );
};
export { MedicInfo, MedicDetailInfo };
