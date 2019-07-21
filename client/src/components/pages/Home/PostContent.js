import React, { Fragment, useContext } from 'react';
import Delete from '../../assets/delete.png';
import Edit from '../../assets/edit.png';
import { ThemeContext } from '../../../Contexts/ThemeContext';
import { PostListContext } from '../../../Contexts/PostListContext';
import { AuthContext } from '../../../Contexts/AuthContext';
import axios from 'axios';

const PostContent = ({ post }) => {

    const { token } = useContext(AuthContext);
    const context = useContext(ThemeContext);
    const postContext = useContext(PostListContext);
    const { isEditable, isEmptyText, text } = postContext.PostList;

    const deletePost = (post_id) => {
        axios.delete('/api/user/posts', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('jwt-sp-token')}`
            },
            data: {
                post_id
            }
        })
        .then(result => {
            context.dispatch({ type: "DELETE_POST", post_id });
        }).catch(err => {
            console.log('error in deletePost');
        });
    }

    const updatePost = (post_id, message) => {
        axios.put('/api/user/posts', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('jwt-sp-token')}`
            },
            data: {
                post_id,
                text
            }
            })
            .then(result => {
                context.dispatch({
                    type: "EDIT POST AND UPDATE", post_id,
                    message: text
                });

                postContext.dispatch({ type: "EDIT POST AND UPDATE"});
                console.log(result); 
                console.log(text);
            }).catch(err => {
                console.log('error in editpost');
            })
    }

    return (

        <div className={ isEditable ? "single-post p-0" : 'single-post' }>
            <h2>
                {post.name} <span>says,</span>
                {(token && Object.keys(token).length && (post.user_id === token._id)) ?
                    <Fragment>
                        {/* Delete */}
                        <span onClick={(e) => {
                            e.preventDefault();
                            deletePost(post._id);
                        }} className="delete-post"><img src={Delete} alt="Delete icon" /></span>

                        {/* Edit */}

                        {isEditable ? 
                            <button onClick={(e) => {
                                e.preventDefault();
                                updatePost(post._id, post.message);
                            }} type="submit" className="btn btn-danger">Update</button> :

                            <span onClick={() => {
                                postContext.dispatch({type: "EDITABLE", message: post.message})
                            }}  className="edit-post"><img src={Edit} alt="Edit Content"/></span>
                        }
                        
                    </Fragment>
                    : ''}
            </h2>
            
            {isEditable ?
                <form>
                    <textarea className={isEmptyText ? 'form-control is-invalid' : 'form-control'} onChange={(e) => {
                        return postContext.dispatch({ type: "TEXT CHANGE", new_text: e.target.value });
                    }} cols="30" rows="8" value={text}/>
                </form> 
                :
                <p>{post.message}</p>
            }
            
        </div>
    )
}

export default PostContent;