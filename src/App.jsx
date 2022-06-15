import logo from './logo.svg';
import './App.css';
import React from 'react';
import Wrap from './modules/Test'

class App extends React.Component{
    render(){
        return(
            <div className='mainWrapperBody'>
                <Wrap/>
            </div>
        )
    }
}

export default App;
