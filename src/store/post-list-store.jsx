import { createContext, useReducer } from "react";

export const PostList = createContext({
    postList: [],
    addPost: () => {},
    addInitialPosts: () => {},
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
    else if(action.type === "ADD_INITIAL_POSTS") {
        newPostlist = action.payload.posts
    }
    return newPostlist;
}

const PostListProvider = ({ children }) => {

    const[postList,  dispatchPostlist] = useReducer(postListReducer,
    []
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
    const addInitialPosts = (posts) => {
        dispatchPostlist({
            type: "ADD_INITIAL_POSTS",
            payload: {
                posts,
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
        addInitialPosts,
        deletePost,
        }}>{children}
        </PostList.Provider>
    )
}


export default PostListProvider;