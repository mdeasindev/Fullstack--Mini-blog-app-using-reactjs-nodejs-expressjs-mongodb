import React, { Fragment, useContext } from 'react';
import Delete from '../../assets/delete.png';
import Edit from '../../assets/edit.png';
import { ThemeContext } from '../../../Contexts/ThemeContext';
import { PostListContext } from '../../../Contexts/PostListContext';
import { AuthContext } from '../../../Contexts/AuthContext';

const PostContent = ({ post }) => {

    const { token } = useContext(AuthContext);
    const context = useContext(ThemeContext);
    const postContext = useContext(PostListContext);
    const { isEditable, isEmptyText, text } = postContext.PostList;

    return (

        <div className={ isEditable ? "single-post p-0" : 'single-post' }>
            <h2>
                {post.name} <span>says,</span>
                {(token && Object.keys(token).length && (post.user_id === token._id)) ?
                    <Fragment>
                        {/* Delete */}
                        <span onClick={() => {
                            context.dispatch({type: "DELETE_POST", post_id: post._id})
                        }} className="delete-post"><img src={Delete} alt="Delete icon" /></span>

                        {/* Edit */}

                        {isEditable ? 
                            <button onClick={() => {
                                context.dispatch({
                                    type: "EDIT POST AND UPDATE", post_id: post._id,
                                    message: text
                                });

                                postContext.dispatch({ type: "EDIT POST AND UPDATE"});
                        
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