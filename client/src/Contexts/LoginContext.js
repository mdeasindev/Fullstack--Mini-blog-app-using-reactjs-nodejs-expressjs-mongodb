import React, { createContext, useReducer } from 'react';
import LoginReducer from '../reducers/LoginReducer';
export const LoginContext = createContext();

const LoginContextProvider = props => {
    const [login, dispatch] = useReducer(LoginReducer, {
        email: '',
        password: '',
        errors: {},
        success: ''
    });

    return (
        <LoginContext.Provider value={{login, dispatch}}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;