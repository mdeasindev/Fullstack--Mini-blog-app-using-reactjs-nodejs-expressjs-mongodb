import React, { useContext } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import SectionHeading from '../sections/SectionHeading';
import { LoginContext } from '../../Contexts/LoginContext';
import { AuthContext } from '../../Contexts/AuthContext';

const Login = props => {
    
    const loginContext = useContext(LoginContext);
    const authContext = useContext(AuthContext);


    const submitHandler = e => {
        e.preventDefault();
        const { email, password } = loginContext.login;

        axios.post('/api/user/login', {
            email,
            password
        })
        .then(res => {
            localStorage.setItem('jwt-sp-token', res.data.token);

            loginContext.dispatch({
                type: "SUCCESS",
                success: res.data.message
            });

            
            authContext.dispatch({
                type: "SET_TOKEN",
                token: jwtDecode(res.data.token)
            });
            
            props.history.push('/');
        })
        .catch(error => {
            const errors = error.response.data;

            loginContext.dispatch({
                type: "ERRORS",
                errors
            });
        })

    }

    const changeHandler = e => {
        loginContext.dispatch({
            type: "CHANGE_TEXT",
            handler: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

       
        
        const { email, password, message } = loginContext.login.errors; 
        return (
            <div className="login-form">
                <div className="row">
                    <div className="col-6 mx-auto">
                        <SectionHeading title="Login" />
                        {message ?
                            <div className="alert alert-danger" role="alert">{message}</div>
                            : ""
                        }
                        <form onSubmit={submitHandler} action="/api/user/login" method="POST">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                                <input
                                    onChange={changeHandler} type="email"
                                    className={!email ? 'form-control' : 'form-control is-invalid'} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                                    name="email"
                                />

                                {email ? 
                                    <div className="invalid-feedback">
                                        {email}
                                    </div> : ''
                                }
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                                <input
                                    onChange={changeHandler} type="password"
                                    className={!password ? 'form-control' : 'form-control is-invalid'} id="exampleInputPassword1" placeholder="Password"
                                    name="password"
                                />

                                {password ? 
                                    <div className="invalid-feedback">
                                        {password}
                                    </div> : ''
                                }
                            </div>
                        {loginContext.login.success ? 
                            <button className="btn btn-success d-block mb-3">{ loginContext.login.success }</button> : '' }
                            <button type="submit" className="btn btn-primary">Login</button>
                            
                            <span className="info-message">If you don't have an account, please <Link to="/register">Register</Link></span>
                    </form>
                    </div>
                </div>
            </div>
        );
    
}
 
export default Login;