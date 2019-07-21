const AuthReducer = (state, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            return state = action.token;
        case "LOGGED_OUT":
            localStorage.removeItem("jwt-sp-token");
            return state = {};
        default:
            return state;
    }
}

export default AuthReducer;