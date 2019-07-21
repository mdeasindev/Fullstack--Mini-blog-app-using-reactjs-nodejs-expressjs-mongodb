import React from 'react';
import PostContent from './PostContent';
import PostListContextProvider from '../../../Contexts/PostListContext';


const PostList = ({posts}) => {

    return (
        posts != null ? 
            posts.length ? 
                posts.map(post =>
                    <PostListContextProvider key={post._id}>
                        <PostContent
                            post={post}
                        />
                    </PostListContextProvider>
                )
                : 'No Posts Found!'
            
        : 'loading...'
    )
    
}

export default PostList;