import React, { createContext, useReducer } from 'react';
import PostBoxReducer from '../reducers/PostBoxReducer';

export const PostBoxContext = createContext();

const PostBoxContextProvider = props => {
    const [postbox, dispatch] = useReducer(PostBoxReducer, {
        error: false,
        message: '',
        isMessageEmpty: false,
        newPost: ''
    });

    return (
        <PostBoxContext.Provider value={{...postbox, dispatch}}>
            {props.children}
        </PostBoxContext.Provider>
    );
}

export default PostBoxContextProvider;