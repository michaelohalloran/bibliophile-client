import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './routes/AppRouter';
import store from './store';
import {Provider} from 'react-redux';

//put Provider around this, import store as well

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>, 
document.getElementById('root'));
