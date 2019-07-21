const PostListReducer = (state, action) => {
    switch (action.type) {
        case "TEXT CHANGE":
            const newStates= { ...state };
            newStates.text = action.new_text;
            newStates.isEditable = true;
            return newStates;
            
        case "EDITABLE":
            const newState = {...state};
            newState.isEditable = !newState.isEditable;
            newState.text = action.message;
            return newState;
            
        case "EDIT POST AND UPDATE":
            const editandupdate = {...state};
            editandupdate.isEditable = !editandupdate.isEditable;
            return editandupdate;
            
        default:
            return state;
    }
}

export default PostListReducer;