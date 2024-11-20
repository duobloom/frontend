import Header from "@/components/layout/Header";
import CommentBoxSkeleton from "@/components/skeleton/common/CommentBoxSkeleton";
import PostBoxSkeleton from "../common/PostBoxSkeleton";

const DetailPageSkeleton = () => {
  return (
    <div>
      <Header variant="backMenu" menuButton={() => <></>} />
      <PostBoxSkeleton />
      <CommentBoxSkeleton />
    </div>
  );
};

export default DetailPageSkeleton;
