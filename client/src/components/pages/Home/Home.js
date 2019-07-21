import React, { Component } from 'react';
import PostBoxContextProvider from '../../../Contexts/PostBoxContext';
import PostBox from './PostBox';
import Posts from './Posts';
import Sidebar from './Sidebar';

class Home extends Component {
 
    render() { 
        
        return ( 
            <div className="main-content">
                
                <div className="row">
                    <div className="col-8">
                        <div className="main-content-left">
                            <PostBoxContextProvider>
                                <PostBox />
                            </PostBoxContextProvider>

                            <Posts />
                        </div>
                    </div>
                    <div className="col">
                        <Sidebar />
                    </div>
                </div>
            </div>
        );
    }

}
 
export default Home;