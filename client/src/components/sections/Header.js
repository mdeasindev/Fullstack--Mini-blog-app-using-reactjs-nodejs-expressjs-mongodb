import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/react-logo-sp.png';
import { HeaderContext } from '../../Contexts/HeaderContext';
import { AuthContext } from '../../Contexts/AuthContext';

const Header = props => {
    const authContext = useContext(AuthContext);
    const headerContext = useContext(HeaderContext);

    return (
        <header id="header-section">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="logo">
                            <Link to="/">
                                <img src={Logo} alt="Logo" />
                                <h1>Mini Blog.</h1>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="col ml-auto">
                        <div className="main-menu">
                            <ul>
                                {headerContext.menus.map((menu, index) => {

                                    if (menu.is_loggedIn !== Boolean(Object.keys(authContext.token).length)) {
                                        return (
                                            
                                            <li key={index}>
                                                <NavLink exact={
                                                    menu.slug === '/' 
                                                } to={menu.slug}  >
                                                {menu.name}
                                                </NavLink>
                                                
                                            </li>
                                        )
                                    } else {
                                        return []
                                    }

                                })}

                                {authContext.token && Object.keys(authContext.token).length ?
                                    <li><Link onClick={() => {
                                        authContext.dispatch({ type: "LOGGED_OUT" });
                                    } } to="/login">Logout</Link></li>  : ''
                                } 
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        
        );
    
}

export default Header;