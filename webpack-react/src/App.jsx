import React from 'react';
import './style.scss'
import logo from './img.jpg'
import {Button} from 'antd'
import Page from './Types'

const a = 1

const App = () => {
    return (
        <div className={'hi'}>
            <img src={logo}/>
            React is working
            <Button type="primary">Primary</Button>
            <Page/>
        </div>
    );
};

export default App;
