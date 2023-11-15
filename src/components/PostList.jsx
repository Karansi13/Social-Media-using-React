import { useContext } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcoomeMessage";

const PostList = () => {
    const { postList , addInitialPosts} = useContext(PostListData)
    // console.log(postList)

    const handleGetPostClick = () =>{
        fetch('https://dummyjson.com/posts')
        .then(res => res.json())
        .then(data => {
            addInitialPosts(data.posts)
        });
        console.log("get Post cclicked") // verification
    } 

    return (
        <>
        { postList.length === 0 && (
        <WelcomeMessage onGetPostclick={handleGetPostClick}/>
        )}
         {postList.map((post) => (
            <Post key={post.id} post={post}/>
        ))} 
        </>
    );
};

export default PostList;