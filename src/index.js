import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyRoute from './router/index'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<MyRoute />, document.getElementById('root'));

serviceWorker.unregister();
