const Reducer = (state, action) => {
    switch (action.type) {
        case "ADD_POSTS":
            return action.posts;
            
        case "DELETE_POST":

            return state.filter(post => post._id !== action.post_id);
            
        case "EDIT POST AND UPDATE":

            return state.map(post => {
                if (post._id === action.post_id) {
                    post.message = action.message
                }
                return post;
            });
        
            
        case "INSERT_POST":
            const insertPost = [...state]
            insertPost.unshift(action.new_post)
            return insertPost;
            
        default:
            return action.posts;
            
    }
}

export default Reducer;