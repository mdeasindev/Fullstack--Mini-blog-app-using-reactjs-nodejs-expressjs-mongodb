const RegisterReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_TEXT":
            const textChange = { ...state };
            textChange[action.handler.name] = action.handler.value;
            return textChange;
            
        case "ERRORS":
            const errors = { ...state };
            errors.errors = action.errors;
            return errors;
            
        case "SUCCESS":
            const success = { ...state };
                success.name = '';
                success.email = '';
                success.password = '';
                success.confirm_password = '';
                success.errors = {};
                success.success = action.success;
            return success;
            
        case "DEFAULT":
                const defaultSt = { ...state };
                defaultSt.name = '';
                defaultSt.email = '';
                defaultSt.password = '';
                defaultSt.confirm_password = '';
                defaultSt.errors = {};
                defaultSt.success = '';
            return defaultSt;
        default:
            return state;
    }
}

export default RegisterReducer;