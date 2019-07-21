import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './style.css';
import axios from 'axios';
import ThemeContextProvider from './Contexts/ThemeContext';
import AuthContextProvider from './Contexts/AuthContext';
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt-sp-token')}` 

ReactDOM.render( <AuthContextProvider><ThemeContextProvider><App /></ThemeContextProvider></AuthContextProvider>, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}
