import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PostBoxContext } from '../../../Contexts/PostBoxContext';
import { AuthContext } from '../../../Contexts/AuthContext';
import { ThemeContext } from '../../../Contexts/ThemeContext';
import axios from 'axios';

const PostBox = props => {

    const themeContext = useContext(ThemeContext);
    const { token } = useContext(AuthContext);
    const postBoxContext = useContext(PostBoxContext);


    const createPost = () => {
        const data = {
            message: postBoxContext.message,
            user_id:  token._id,
            name: token.name
        }

        if(postBoxContext.message){
            axios.post('/api/user/posts', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('jwt-sp-token')}`
                },
                data
                })
                .then(result => {
                    themeContext.dispatch({
                        type: "INSERT_POST",
                        new_post: result.data.output
                    });
                    postBoxContext.dispatch({
                        type: "SUCCESS"
                    })
                })
                .catch(error => {

                });
        } else {
            postBoxContext.dispatch({
                type: "ERROR"
            });
        }
    }
    
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
                            createPost();
                        }

                        
                    } } className="btn btn-primary">Post</button>
                }
            </form>
        </div>
        
    )
    
}

export default PostBox;