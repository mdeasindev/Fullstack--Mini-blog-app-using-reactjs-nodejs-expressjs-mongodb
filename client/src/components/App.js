import React, { useContext } from 'react';
import Register from './pages/Register';
import Home from './pages/Home/Home';
import Login from './pages/Login';
import MyBlog from './pages/MyBlog';
import Header from './sections/Header';
import { Router, Route, Switch } from 'react-router-dom'
import history from './history';
import HeaderContextProvider from '../Contexts/HeaderContext';
import LoginContextProvider from '../Contexts/LoginContext';
import RegisterContextProvider from '../Contexts/RegisterContext';
import { AuthContext } from '../Contexts/AuthContext';
import Page404 from './pages/Page404';


const App = props => {
    const { token } = useContext(AuthContext);

    return (
      <div className="App">

        <Router history={history}>
          
            <HeaderContextProvider>
              <Header />
            </HeaderContextProvider>
          

            <main id="main-app">
              <div className="container">
                <div className="inner-app">
                <Switch>
                    <Route exact path="/" component={Home} />

                    { Object.keys(token).length === 0 ?
                      <React.Fragment>

                        <RegisterContextProvider>
                          <Route exact path="/register" component={Register} />
                        </RegisterContextProvider>
                        
                        <LoginContextProvider>
                          <Route exact path="/login" component={Login} />
                        </LoginContextProvider>
                      </React.Fragment> :
                      
                      <Route exact path="/myblog" component={MyBlog} />
                      
                      }
                  
                  <Route exact component={Page404}/>
                  </Switch>
                </div>
              </div>
            </main>
                
        </Router>
        
      </div>
    );
  }




export default App;