import { useState } from "react";
import { CommentType } from "./Comments";
import { v4 as uuidV4 } from "uuid";

type SingleCommentProps = {
  comm: CommentType;
  CommentReply: (reply: CommentType, parentComment: string) => void;
  PostID: string;
};
const SingleComment: React.FC<SingleCommentProps> = ({
  comm,
  CommentReply,
  PostID,
}) => {
  const [replyInput, setReplyInput] = useState("");
  const [reply, setReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const addReplies = () => {
    const childComment: CommentType = {
      CommentBy: "random123",
      CommentId: uuidV4(),
      ParentCommentId: comm.CommentId,
      CommentMsg: replyInput,
      Likes: 0,
      Replies: [],
    };
    CommentReply(childComment, comm.CommentId);
    setReply(false);
    setReplyInput("");
  };

  return (
    <div>
      <div>
        <div
          key={comm.CommentId}
          className=" border border-gray-700 p-1 m-1 rounded-md my-2"
        >
          <p className="text-sm">{comm.CommentBy}</p>
          <p className="text-sm text-wrap p-1 border-gray-100">
            {comm?.CommentMsg}
          </p>
          <div className="flex text-xs  gap-5 m-1">
            <div>
              <button onClick={() => setReply(!reply)}>reply</button>
            </div>
            <div>
              <button onClick={() => setShowReplies(!showReplies)}>
                { comm.Replies && comm.Replies?.length > 0 ? `${comm.Replies?.length} replies` : 'no replies' }
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            {reply && (
              <div>
                <input
                  type="text"
                  placeholder="reply to"
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  className="text-xs rounded-md ml-4 m-1 p-1 w-1/2"
                />
                <button
                  className="text-xs p-1 rounded-md bg-blue-600"
                  onClick={() => addReplies()}
                >
                  post
                </button>
              </div>
            )}
          </div>
          <div>
            {showReplies &&
              comm.Replies &&
              comm.Replies.length > 0 &&
              comm?.Replies.map((childCmt) => (
                <SingleComment
                  comm={childCmt}
                  PostID={PostID}
                  CommentReply={CommentReply}
                  key={comm.CommentId}
                />
              ))}
          </div>
        </div>
        {/* <h3>replies yet</h3> */}
      </div>
    </div>
  );
};

export default SingleComment;
//
