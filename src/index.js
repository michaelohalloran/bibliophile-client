import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'normalize.css/normalize.css';
import AppRouter from './routes/AppRouter';

import {Provider} from 'react-redux';

//put Provider around this, import store as well

ReactDOM.render(<AppRouter />, document.getElementById('root'));
