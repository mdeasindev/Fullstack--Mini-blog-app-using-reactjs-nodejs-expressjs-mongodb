const LoginReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_TEXT":
            const changeText = { ...state };
            changeText[action.handler.name] = action.handler.value;
            return changeText;
        case "ERRORS":
            const errors = { ...state };
            errors.errors = action.errors;
            return errors;
        case "SUCCESS":
            const success = { ...state };
            success.errors = {}
            success.email = '';
            success.password = '';
            success.success = action.success;
            return success;
        default:
            return state;
    }
}

export default LoginReducer;