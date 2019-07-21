import React, { createContext, useReducer } from 'react';
import PostListReducer from '../reducers/PostsListReducer';

export const PostListContext = createContext();


const PostListContextProvider = props => {
    const [PostList, dispatch] = useReducer(PostListReducer, {
        isEditable: false,
        text: "",
        isEmptyText: false
    });

    return (
        <PostListContext.Provider value={{ PostList, dispatch }}>
            {props.children}
        </PostListContext.Provider>
    );
}

export default PostListContextProvider;