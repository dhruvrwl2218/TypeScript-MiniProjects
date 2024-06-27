import { useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import SingleComment from "./SingleComment";

type CommentsProps = {
  ParentCommentId: string;
  PostId: string;
};

export type CommentType = {
  CommentBy: string; //username
  CommentId: string;
  ParentCommentId: string;
  CommentMsg: string;
  Likes?: number;
  Replies?: CommentType[]; //Arrays of comments
};

const Comments = ({ ParentCommentId, PostId }: CommentsProps) => {
  const [comments, setComments] = useState<CommentType[]>(() => {
    let localStorageString = localStorage.getItem(`${PostId}`);
    let allComment = localStorageString ? JSON.parse(localStorageString) : [];

    // const filteredComment = allComment.filter((comm: CommentType) => comm.ParentCommentId === ParentCommentId);

    // return filteredComment
    return allComment;
  });
  const [error, setError] = useState<string | null>(null);
  // const [reply,setReply] =useState<>()
  const commentInput = useRef<HTMLInputElement>(null);

  const CreateComments = () => {
    if (commentInput.current && commentInput.current.value.trim() === "") {
      setError("Comment can't be empty");
    } else {
      setError(null);
      const comm: CommentType = {
        CommentBy: "aparichit143", //your can fill the username as per your user
        CommentId: uuidV4(),
        ParentCommentId: ParentCommentId,
        CommentMsg: commentInput.current?.value || "",
        Likes: 0,
        Replies: [],
      };

      setComments((prevComments) => {
        const newComments = [...(prevComments || []), comm];
        localStorage.setItem(`${PostId}`, JSON.stringify(newComments));
        return newComments;
      });

      if (commentInput.current) {
        commentInput.current.value = ""; // Clear the input field
      }
    }
  };
  const CommentReply = (reply: CommentType, parentComment: string) => {
    const addReply = (updateComment: CommentType[]): CommentType[] => {
      return updateComment.map((up) => {
        if (up.CommentId === parentComment) {
          return {
            ...up,
            Replies: [...(up.Replies || []), reply],
          };
        }
        if (up.Replies) {
          return {
            ...up,
            Replies: addReply(up.Replies),
          };
        }
        return up;
      });
    };

    setComments((prevComments) => {
      const updatedcommets = addReply(prevComments);
      localStorage.setItem(`${PostId}`, JSON.stringify(updatedcommets));
      return updatedcommets;
    });
  };
  return (
    <div className="border border-gray-700 rounded-md p-1">
      <div>
        {comments.length > 0 ? (
          comments.map((comm) => (
            <div
              key={comm.CommentId}
              className=" border border-gray-700 p-1 m-1 rounded-md my-2"
            >
              <SingleComment
                comm={comm}
                CommentReply={CommentReply}
                PostID={PostId}
              />
            </div>
          ))
        ) : (
          <h3>No comments yet</h3>
        )}
      </div>
      <div className="flex justify-between gap-8 my-3">
        <input
          type="text"
          placeholder="add your comments"
          ref={commentInput}
          className={`${
            error ? "border-red-500" : "border-gray-300"
          }  rounded-md p-2 w-full `}
        />
        <button
          onClick={CreateComments}
          className="mr-3 bg-blue-700 rounded-md p-2 px-5"
        >
          Post
        </button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Comments;

// import { useRef, useState } from "react"
// import { v4 as uuidV4 } from "uuid"
// import SingleComment from "./SingleComment"

// type CommentsProps = {
//   ParentCommentId: string
//   PostId : string
// }

// export type Comment = {
//   CommentBy : string //username
//   CommentId: string
//   ParentCommentId: string
//   CommentMsg: string
//   Likes?: number
//   Replies? : Comment[] //Arrays of comments
// }

// const Comments = ({ ParentCommentId , PostId}: CommentsProps) => {
//   const [comments, setComments] = useState<Comment[]>(() => {

//     let localStorageString = localStorage.getItem(`${PostId}`)
//     let allComment = localStorageString ? JSON.parse(localStorageString) : [];

//     const filteredComment = allComment.filter((comm: Comment) => comm.ParentCommentId === ParentCommentId);

//     return filteredComment
//   }
//   )
//   const [error, setError] = useState<string | null>(null)
//   // const [reply,setReply] =useState<>()
//   const commentInput = useRef<HTMLInputElement>(null)

//   const CreateComments = () => {

//     if (commentInput.current && commentInput.current.value.trim() === '') {
//       setError("Comment can't be empty")
//     } else {
//       setError(null)
//       const comm: Comment = {
//         CommentBy : "aparichit143", //your can fill the username as per your user
//         CommentId: uuidV4(),
//         ParentCommentId: ParentCommentId,
//         CommentMsg: commentInput.current?.value || '',
//         Likes: 0,
//         Replies:[]
//       }

//       setComments(prevComments => {
//         const newComments = [...(prevComments || []), comm];
//         localStorage.setItem(`${PostId}`, JSON.stringify(newComments));
//         return newComments;
//       })

//       if (commentInput.current) {
//         commentInput.current.value = ''; // Clear the input field
//       }
//     }
//   }
//   // const commentReply = (e:HTMLBodyElement) => {
//   //   e.pre
//   // }
//   return (

//     <div className="border border-gray-700 rounded-md p-1">
//       <div >
//         {comments.length > 0 ? comments.map((comm) => <div key={comm.CommentId}
//          className=" border border-gray-700 p-1 m-1 rounded-md my-2">

//          <SingleComment comm={comm} />
//           </div>) :
//           <h3>No comments yet</h3>
//         }
//       </div >
//       <div className="flex justify-between gap-8 my-3">
//       <input type="text" placeholder="add your comments" ref={commentInput} className={`${error ? 'border-red-500' : 'border-gray-300'}  rounded-md p-2 w-full `} />
//       <button onClick={CreateComments} className="mr-3 bg-blue-700 rounded-md p-2 px-5">Post</button>
//       {error && <p>{error}</p>}
//       </div>
//     </div>
//   )
// }

// export default Comments
