import React, { useContext } from 'react';
import PostList from './PostList';
import { ThemeContext } from '../../../Contexts/ThemeContext';

const Posts = props => {

    const themeContext = useContext(ThemeContext);

    return (
        <div className="posts-list">
            <PostList posts={themeContext.posts} />
        </div>
    );
}

export default Posts;