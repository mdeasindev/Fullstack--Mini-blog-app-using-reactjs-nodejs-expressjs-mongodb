import React, { createContext, useReducer } from 'react';
import AuthReducer from '../reducers/AuthReducer';
import Token from '../components/Token';
export const AuthContext = createContext();


const AuthContextProvider = props => {

    const [token, dispatch] = useReducer(AuthReducer, Token);

    return (
        <AuthContext.Provider value={{token, dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;