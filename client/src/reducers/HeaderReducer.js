const HeaderReducer = (state, action) => {
    switch (action.type) {
        case "LOGGED_OUT":
            localStorage.removeItem('jwt-sp-token');
            state.token = {};
            return state;
        default:
            return state
    }
}

export default HeaderReducer;