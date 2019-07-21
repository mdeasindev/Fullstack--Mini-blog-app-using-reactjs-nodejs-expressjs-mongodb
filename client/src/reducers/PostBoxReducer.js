import axios from 'axios';

const PostBoxReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE TEXT":
            const newState = { ...state };
            newState.message = action.message;
            return newState;
        case "CREATE_POST":
            const createPost = {...state }
            if (createPost.message) {
                const data = {
                    message: createPost.message,
                    user_id: action.user_id,
                    name: action.name
                }
                axios.post('/api/user/posts', data)
                    .then(result => {
                        createPost.newPost = 'hi by'
                    })
                    .catch(error => {
                        createPost.error = true;
                    });
            } else {
                createPost.isMessageEmpty = true
            }
            createPost.message = "";
            return createPost;
        default:
            return state;
    }
}

export default PostBoxReducer;