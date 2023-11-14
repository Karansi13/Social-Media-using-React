import { createContext, useReducer } from "react";

export const PostList = createContext({
    postList: [],
    addPost: () => {},
    deletePost: () => {},
});


const postListReducer = (currentPostList, action) => {
    let newPostlist = currentPostList;
    if(action.type === "DELETE_POST") {
        newPostlist = currentPostList.filter(post => post.id !== action.payload.postId)
    }
    else if(action.type === "ADD_POST"){
        newPostlist = [action.payload, ...currentPostList]
    }
    return newPostlist;
}

const PostListProvider = ({ children }) => {

    const[postList,  dispatchPostlist] = useReducer(postListReducer,
    DEFAULT_POST_LIST
    );

    const addPost = (userId, postTitle, postBody, reactions, tags) => {
        // console.log(`${userId} ${postTitle} ${postBody} ${reactions} ${tags}`)
        dispatchPostlist({
            type: "ADD_POST",
            payload: {
                id: Date.now(), // production ke liye aise id  generate nhi krte
                title: postTitle,
                body: postBody,
                reactions: reactions,
                userId: userId,
                tags: tags,
            }
        })
    }

    const deletePost = (postId) => {
        // console.log(`Delete post ${postId}`)
        dispatchPostlist({
            type: "DELETE_POST",
            payload: {
                postId,
            },
        })
    }

    return (
        <PostList.Provider value={{
        postList,
        addPost,
        deletePost,
        }}>{children}
        </PostList.Provider>
    )
}

const DEFAULT_POST_LIST = [
    {
    id: '1',
    title: 'Learning Reactjs',
    body: 'This is the best React tutorial I have  ever watched',
    reactions: 2,
    userId: 'user-13',
    tags: ["KG coding by Prashant", "web dev"],
},
{
    id: '2',
    title: 'Learning Javasscript',
    body: 'Harsh sir is amazing',
    reactions: 5,
    userId: 'user-7',
    tags: ["Chai aur code","coding"],
},
];

export default PostListProvider;