import '../public/css/salesforce-lightning-design-system.min.css';
import '../public/css/main.scss';


import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory } from 'react-router';

import Root from './containers/Root.jsx';
import configureStore from './store';

const store = configureStore();
const history = browserHistory;

const app = document.createElement('div');
document.body.appendChild(app);

ReactDom.render(<Root store={store} history={history} />, app);
