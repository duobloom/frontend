import { useNavigate } from "react-router-dom";
import { PostType } from "@/types";
import { Badge } from "./Badge";
import Author from "@/components/ui/Author";
import { BoxContainer, BoxContent, BoxFooter, BoxHeader } from "@/components/ui/Box";
import LikeAndComments from "@/components/ui/LikeAndComments";

type PostBoxProps = {
  post: PostType;
};

export default function PostBox({ post }: PostBoxProps) {
  const navigate = useNavigate();

  return (
    <BoxContainer>
      <BoxHeader>
        <div className="flex items-center gap-[1.2rem]">
          <Author
            profileImg={post.author.profileImage}
            name={post.author.name}
            category={post.category.sub}
            createdAt={post.createdAt}
          />
        </div>
        {post.images.length > 1 && (
          <div className="relative h-[3.6rem] w-[3.6rem] overflow-hidden rounded-[1rem] border border-gray-100">
            <img src={post.images[0].url} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-[1.4rem] font-bold leading-normal text-white">
              {post.images.length}+
            </div>
          </div>
        )}
      </BoxHeader>

      <BoxContent className="mt-[1rem]">
        <div
          className="mb-[1.4rem] line-clamp-2 cursor-pointer text-[1.3rem] font-medium leading-[1.8rem] text-black"
          onClick={() => navigate(`/post/${post.post_id}`)}
        >
          {post.content}
        </div>
        <div className="flex flex-wrap gap-[0.8rem]">
          {post.tags.map((tag) => (
            <Badge key={tag.id} variant="tagBadge">
              {tag.name}
            </Badge>
          ))}
        </div>
      </BoxContent>

      <BoxFooter>
        <LikeAndComments type="post" id={post.post_id} likes={post.likes} comments={post.comments} />
      </BoxFooter>
    </BoxContainer>
  );
}
