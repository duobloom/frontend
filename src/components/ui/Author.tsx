import { cva, VariantProps } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { cn } from "@/utils";

const AuthorVariants = cva("flex items-center", {
  variants: {
    variant: {
      community: "gap-[1.2rem]",
      board: "gap-[1rem]",
      boardReverse: "flex-row-reverse gap-[1rem]",
    },
  },
  defaultVariants: {
    variant: "community",
  },
});

const nameVariants = cva("font-bold leading-none", {
  variants: {
    variant: {
      community: "text-[1.4rem] tracking-[-0.028rem]",
      board: "text-[1.8rem]",
      boardReverse: "text-[1.8rem]",
    },
  },
  defaultVariants: {
    variant: "community",
  },
});

const subTextVariants = cva("text-[1.2rem] leading-none text-gray-500 tracking-[-0.024rem]", {
  variants: {
    variant: {
      community: "font-normal",
      board: "font-semibold",
      boardReverse: "font-semibold",
    },
  },
  defaultVariants: {
    variant: "community",
  },
});

interface AuthorProps extends VariantProps<typeof AuthorVariants> {
  profileImg?: string;
  name?: string;
  createdAt?: string;
  birth?: string;
  isMe?: boolean;
  className?: string;
}

const Author = ({ variant = "community", profileImg, name, createdAt, birth, isMe, className }: AuthorProps) => {
  const avatarSizes = {
    community: "h-[3.6rem] w-[3.6rem]",
    board: "h-[5rem] w-[5rem]",
    boardReverse: "h-[5rem] w-[5rem]",
  };

  return (
    <div className={cn(AuthorVariants({ variant }), className)}>
      <div className="relative -m-[0.8rem] p-[0.8rem]">
        <Avatar className={cn(variant && avatarSizes[variant])}>
          <AvatarImage src={profileImg} alt={name} className="object-cover" />
          <AvatarFallback>{(name as string)[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        {isMe && (
          <div className="absolute bottom-0 right-0 m-[.8rem] flex h-[1.6rem] w-[1.6rem] items-center justify-center rounded-full border border-gray-300 bg-black text-[.8rem] font-bold text-white">
            나
          </div>
        )}
      </div>
      <div className={cn(`flex flex-col gap-[.5rem] ${variant === "boardReverse" && "items-end"}`)}>
        <div className="flex items-center gap-[.5rem]">
          <span className={nameVariants({ variant })}>{name}</span>
        </div>
        {(birth || createdAt) && (
          <span className={cn(subTextVariants({ variant, className }))}>{birth || createdAt}</span>
        )}
      </div>
    </div>
  );
};

export default Author;
