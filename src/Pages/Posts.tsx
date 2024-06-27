import { useState } from "react";
import { Post } from "./PostCommentData";
import Comments from "../Components/Commetn_pro/Comments";

type PostComProps = {
  post: Post;
};

const Posts: React.FC<PostComProps> = ({ post }) => {
  const [showComments, setShowComments] = useState<boolean>(false);

  return (
    <div className=" basis-1 w-3/4 max-lg:w-full shadow-md shadow-gray-100">
      <div>
        <div key={post.userId} className=" flex flex-col m-2 p-2 ">
          <div className="flex bg-gray-800 gap-6">
            <img
              src={post.profile}
              alt="Profile"
              className="rounded-full w-20 p-1"
            />
            <h2 className="pb-0 text-lg">{post.username}</h2>
          </div>
          <div className="flex justify-center my-1">
            <img src={post.picture} alt="Post" className="h-96 w-full object-cover "/>
          </div>
          <div className="p-2 flex justify-around bg-blue-600 text-lg">
            <button onClick={() => setShowComments(!showComments)}>
              {" "}
              Comments
            </button>
            <button>like</button>
            <button>share</button>
          </div>
          {showComments && (
            <div>
              <Comments
                ParentCommentId={post.commentId}
                PostId={post.commentId}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
