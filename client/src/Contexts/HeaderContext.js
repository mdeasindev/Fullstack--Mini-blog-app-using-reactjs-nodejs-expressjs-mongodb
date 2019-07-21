import React, { createContext, useReducer } from 'react';
import HeaderReducer from '../reducers/HeaderReducer';
export const HeaderContext = createContext();

const HeaderContextProvider = props => {
    const [menus, dispatch] = useReducer(HeaderReducer, [
        {
            name: "Home",
            slug: '/',
            id: 1
        },
        {
            name: "Login",
            slug: "/login",
            id: 2,
            is_loggedIn: true
        },
        {
            name: "Register",
            slug: '/register',
            id: 3,
            is_loggedIn: true
        },
        {
            name: "My Blog",
            slug: '/myblog',
            id: 4,
            is_loggedIn: false
        }
    ]);

    return (
        <HeaderContext.Provider value={{menus, dispatch}}>
            {props.children}
        </HeaderContext.Provider>
    )
}

export default HeaderContextProvider;