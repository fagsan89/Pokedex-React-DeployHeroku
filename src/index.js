import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes'
// import './global.css'
import './global.scss'

ReactDOM.render(
    <React.StrictMode>
        <Routes />
    </React.StrictMode>,
    document.getElementById('root')
);

