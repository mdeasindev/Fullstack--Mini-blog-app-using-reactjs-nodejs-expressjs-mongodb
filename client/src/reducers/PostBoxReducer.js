const PostBoxReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE TEXT":
            const newState = { ...state };
            newState.message = action.message;
            return newState;
        case "ERROR":
            const createPost = { ...state }
            createPost.isMessageEmpty = true
            return createPost;
        case "SUCCESS":
            const success = { ...state };
            success.isMessageEmpty = false;
            success.message = '';
            return success;
        default:
            return state;
    }
}

export default PostBoxReducer;