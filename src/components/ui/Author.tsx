import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

type TAuthorProps = {
  profileImg?: string;
  name: string;
  category?: string;
  createdAt: string;
};

const Author = ({ profileImg, name, category, createdAt }: TAuthorProps) => {
  return (
    <div className="flex items-center gap-[1.2rem]">
      <Avatar>
        <AvatarImage src={profileImg} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-[.5rem]">
        <div className="flex items-center gap-[0.5rem]">
          <span className="text-[1.4rem] font-bold leading-none text-black">{name}</span>
          {category && (
            <>
              <span className="leading-none text-gray-500">·</span>
              <span className="text-[1.4rem] font-medium leading-none text-gray-500">{category}</span>
            </>
          )}
        </div>
        <span className="text-[1.2rem] font-medium leading-none text-gray-500">{createdAt}</span>
      </div>
    </div>
  );
};

export default Author;
