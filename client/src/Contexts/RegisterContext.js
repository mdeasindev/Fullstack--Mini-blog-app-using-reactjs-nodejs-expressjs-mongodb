import React, { createContext, useReducer } from 'react';
import RegisterReducer from '../reducers/RegisterReducer';
export const RegisterContext = createContext();

const RegisterContextProvider = props => {
    const [register, dispatch] = useReducer(RegisterReducer, {
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        errors: {},
        success: ''
    });

    return (
        <RegisterContext.Provider value={{register, dispatch}}>
            {props.children}
        </RegisterContext.Provider>
    );
}

export default RegisterContextProvider;