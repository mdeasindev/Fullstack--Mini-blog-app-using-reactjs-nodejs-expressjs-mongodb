import React, { createContext, useEffect, useReducer } from 'react';
import Reducer from '../reducers/reducer';
import axios from 'axios';

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
    const [posts, dispatch] = useReducer(Reducer, null);

    useEffect(() => {
        axios.get('/api/user/posts')
            .then(posts => {
                if (posts.data.length) {
                    dispatch({ posts: posts.data.reverse() });
                }
            });
    }, []);

    return (
        <ThemeContext.Provider value={{posts, dispatch}}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export default ThemeContextProvider;