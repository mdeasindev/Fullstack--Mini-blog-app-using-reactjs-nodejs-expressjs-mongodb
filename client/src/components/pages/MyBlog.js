import React, { useContext } from 'react';
import SectionHeading from '../sections/SectionHeading';
import PostList from '../pages/Home/PostList';
import { ThemeContext } from '../../Contexts/ThemeContext';
import { AuthContext } from '../../Contexts/AuthContext';

const MyBlog = () => {

    const authContext = useContext(AuthContext);
    const themeContext = useContext(ThemeContext);

   
    return (
        <div className="myblog-post">
            <div className="row">
                <div className="col-8 mx-auto">
                <SectionHeading title="My Blog" />
                <PostList posts={themeContext.posts ? themeContext.posts.filter(post=> post.user_id === authContext.token._id) : null} />
                </div>
            </div>
        </div>   
    )

}

export default MyBlog;