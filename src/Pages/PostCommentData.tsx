import Posts from "./Posts";

import {v4 as uuidV4} from "uuid"

const generateCustomUUID = (prefix : string) : string =>{
    return `${prefix}-${uuidV4()}`;
  }
 export type Post = {
    userId : string;
      username : string;
      profile : string;
      picture : string;
      commentId : string;
  }
const post : Post[] = [
    {
      userId : generateCustomUUID("user"),
      username : "aarav_01",
      profile : "https://tse2.mm.bing.net/th?id=OIP.ZN0SZB41jB7Q1Fe-apJscAHaD-&pid=Api&P=0&h=180",
      picture : "https://www.zekefilm.org/wp-content/uploads/2023/06/Past-Lives_2.jpeg",
      commentId : "pastLives"
    },
    {
      userId : generateCustomUUID("user"),
      username : "vaibhav_69",
      profile : "https://s-media-cache-ak0.pinimg.com/originals/41/f5/bd/41f5bd86bffd57fa82256577b0f84c94.png",
      picture : "https://2.bp.blogspot.com/-B8F4TMHJEno/WDeuQvq5c_I/AAAAAAAAEG0/fNLpgeZxO1Acb8eUOINeMIZVX1FbBpJSACLcB/s1600/737400.jpg",
      commentId : "YourName"
    },
    {
      userId : generateCustomUUID("user"),
      username : "makoto_02",
      profile : "https://tse1.mm.bing.net/th?id=OIP.iJiGQFsWYDEJY8yrnQbXowHaEK&pid=Api&P=0&h=180",
      picture : "https://c.bookwalker.jp/4406323/t_700x780.jpg",
      commentId : "IWantToEatYourPancreas"
    },
    {
      userId : generateCustomUUID("user"),
      username : "sunshine_Girl",
      profile : "https://tse4.mm.bing.net/th?id=OIP.zfqOE1gHQfnc5BXaDQDRMAHaEK&pid=Api&P=0&h=180",
      picture : "https://wallpapers.com/images/hd/weathering-with-you-sunset-lovers-8krqvb02deld2kyh.jpg",
      commentId : "WeatheringWithYou"
    }
  ]

const PostCommentData = () => {
  return (
    <div className="flex flex-col items-center ">
      <div className="bg p-5 text-3xl shadow shadow-gray-50 mt-2">Infinite Scroll Comment Box(Ts Mini pro)</div>
      <div className="flex flex-col items-center mx-80 max-lg:mx-0 gap-1">
      {post.map((individualPost:Post)=>{
        return <Posts post = {individualPost} key={individualPost.userId}/>
      })}
      </div>
    </div>
  )
}

export default PostCommentData
