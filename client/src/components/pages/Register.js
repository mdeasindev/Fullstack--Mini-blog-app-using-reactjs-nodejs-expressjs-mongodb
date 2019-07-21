import React, { useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SectionHeading from '../sections/SectionHeading';
import { RegisterContext } from '../../Contexts/RegisterContext';

const Register = props => {
    const registerContext = useContext(RegisterContext);

    const changeHandler = e => {
        
        registerContext.dispatch({
            type: "CHANGE_TEXT",
            handler: {
                name: e.target.name,
                value: e.target.value
            }
        })
        
    }

    const submitHandler =  e => {
        e.preventDefault();
        const { name, email, password, confirm_password } = registerContext.register;

        
        axios.post('/api/user/register',
        {
            name,
            email,
            password,
            confirm_password
        })
        .then(result => {
            registerContext.dispatch({
                type: "SUCCESS",
                success: result.data.message
            })

            setTimeout(() => {
                props.history.push('/login');
                registerContext.dispatch({
                    type: "DEFAULT"
                });
            }, 1000);

            
        }).catch(error => {
            if (error) {
                const errors = error.response.data;
                registerContext.dispatch({
                    type: "ERRORS",
                    errors
                });
            }
        });


    }

 

        const { name, email, password, confirm_password } = registerContext.register.errors;

        return (
          
            <div className="register-form">
                <div className="row">
                    <div className="col-6 mx-auto">

                        <SectionHeading title="Register" />

                        <form onSubmit={submitHandler} action="/fullstack-mini-blog/api/register" method="POST">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input onChange={changeHandler} type="text" name="name" className={!name ? 'form-control' : 'form-control is-invalid'} id="name" aria-describedby="emailHelp" placeholder="Name" />

                                {name ? 
                                    <div className="invalid-feedback">
                                        {name}
                                    </div> : ''
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input onChange={changeHandler} type="email" name="email" className={!email ? 'form-control' : 'form-control is-invalid'} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                
                                {email ? 
                                    <div className="invalid-feedback">
                                        {email}
                                    </div> : ''
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input onChange={changeHandler} type="password" name="password" className={!password ? 'form-control' : 'form-control is-invalid'} id="exampleInputPassword1" placeholder="Password" />
                                
                                {password ? 
                                    <div className="invalid-feedback">
                                        {password}
                                    </div> : ''
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputConfirmPassword1">Password</label>
                                <input onChange={changeHandler} type="password" name="confirm_password" className={!confirm_password ? 'form-control' : 'form-control is-invalid'} id="exampleInputConfirmPassword1" placeholder="Confirm password" />
                                
                                {confirm_password ? 
                                    <div className="invalid-feedback">
                                        {confirm_password}
                                    </div> : ''
                                }

                            </div>
                            {registerContext.register.success ? 
                                <button className="btn btn-success d-block mb-3">{ registerContext.register.success }</button> : '' }
                            <button type="submit" className="btn btn-primary">Register</button>

                            <span className="info-message">If you already have an account, please <Link to="/login">Login</Link></span>
                        </form>
                    </div>
                </div>
            </div>

        );
    
}

export default Register;
