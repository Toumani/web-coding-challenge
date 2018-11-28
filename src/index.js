import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Auth from './Auth';
import * as serviceWorker from './serviceWorker';

if (document.getElementById('auth-root') !== null)
	ReactDOM.render(<Auth />, document.getElementById('auth-root'));
else if (document.getElementById('app-root') !== null)
	ReactDOM.render(<App />, document.getElementById('app-root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
