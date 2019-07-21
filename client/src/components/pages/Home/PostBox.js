import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PostBoxContext } from '../../../Contexts/PostBoxContext';
import { AuthContext } from '../../../Contexts/AuthContext';
import { ThemeContext } from '../../../Contexts/ThemeContext';

const PostBox = props => {

    const themeContext = useContext(ThemeContext);
    const { token } = useContext(AuthContext);
    const postBoxContext = useContext(PostBoxContext);
    
    return (
                          
        <div className="post-box">
        {Object.keys(token).length ?
            <h2>Hi, {token.name}</h2> :
            ''
        }
        
            <form action="/api/user/posts">
                <textarea onChange={(e) => {
                    postBoxContext.dispatch({ type: "CHANGE TEXT", message: e.target.value });
                }} name="message" className={
                    !postBoxContext.isMessageEmpty ? 'form-control' : 'form-control is-invalid'
                    } id="" cols="30" rows="3" value={postBoxContext.message}></textarea>
                

                {postBoxContext.error && postBoxContext.error === true ?
                    <p>You are logged out. please <Link to="/login">Login</Link></p> : ''
                }
                

                {token && Object.keys(token).length === 0 ?
                    <Link to="/login"><button className="btn btn-primary">Post</button></Link>
                    :
                    <button onClick={(e) => {
                        if (Object.keys(token).length !== 0) {
                            e.preventDefault();

                            if(postBoxContext.message) {
                                themeContext.dispatch({
                                    type: "INSERT_POST",
                                    new_post: {
                                        user_id: token._id,
                                        name: token.name,
                                        message: postBoxContext.message
                                    }
                                });
                            }

                            postBoxContext.dispatch({
                                type: "CREATE_POST",
                                user_id: token._id,
                                name: token.name,
                            });
                        
                        }

                        
                    } } className="btn btn-primary">Post</button>
                }
            </form>
        </div>
        
    )
    
}

export default PostBox;