import axios from 'axios';

const Reducer = (state, action) => {
    switch (action.type) {
        case "ADD_POSTS":
            return action.posts;
            
        case "DELETE_POST":
            axios.delete('/api/user/posts', {
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('jwt-sp-token')
                },
                data: {
                    post_id: action.post_id
                }
            })
            .then(result => {
                return result;
            }).catch(err => {
                console.log('error in deletePost');
            });

            return state.filter(post => post._id !== action.post_id);
            
        case "EDIT POST AND UPDATE":

                axios.put('/api/user/posts', {
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('jwt-sp-token')
                },
                data: {
                    post_id: action.post_id,
                    text: action.message
                }
                })
                .then(result => {
                    return result;      
                }).catch(err => {
                    console.log('error in editpost');
                })

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