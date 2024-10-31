import { cva, VariantProps } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { cn } from "@/utils";

const AuthorVariants = cva("flex items-center", {
  variants: {
    variant: {
      community: "gap-[1.2rem]",
      feed: "gap-[1rem]",
      feedReverse: "flex-row-reverse gap-[1rem]",
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
      feed: "text-[1.8rem]",
      feedReverse: "text-[1.8rem]",
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
      feed: "font-semibold",
      feedReverse: "font-semibold",
    },
  },
  defaultVariants: {
    variant: "community",
  },
});

interface AuthorProps extends VariantProps<typeof AuthorVariants> {
  profileImg?: string;
  name: string;
  category?: string;
  createdAt?: string;
  birth?: string;
  isMe?: boolean;
  className?: string;
}

const Author = ({
  variant = "community",
  profileImg,
  name,
  category,
  createdAt,
  birth,
  isMe,
  className,
}: AuthorProps) => {
  const avatarSizes = {
    community: "h-[3.6rem] w-[3.6rem]",
    feed: "h-[5rem] w-[5rem]",
    feedReverse: "h-[5rem] w-[5rem]",
  };

  return (
    <div className={cn(AuthorVariants({ variant }), className)}>
      <div className="relative -m-[0.8rem] p-[0.8rem]">
        <Avatar className={cn(variant && avatarSizes[variant])}>
          <AvatarImage src={profileImg} alt={name} className="object-cover" />
          <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        {isMe && (
          <div className="absolute bottom-0 right-0 m-[.8rem] flex h-[1.6rem] w-[1.6rem] items-center justify-center rounded-full border border-gray-300 bg-black text-[.8rem] font-bold text-white">
            나
          </div>
        )}
      </div>
      <div className={cn(`flex flex-col gap-[.5rem] ${variant === "feedReverse" && "items-end"}`)}>
        <div className="flex items-center gap-[.5rem]">
          <span className={nameVariants({ variant })}>{name}</span>
          {category && (
            <>
              <span className="leading-none text-gray-500">·</span>
              <span className="text-[1.4rem] font-medium leading-none text-gray-500">{category}</span>
            </>
          )}
        </div>
        {(birth || createdAt) && <span className={cn(subTextVariants({ variant }))}>{birth || createdAt}</span>}
      </div>
    </div>
  );
};

export default Author;
