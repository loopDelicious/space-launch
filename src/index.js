import React from 'react';
import ReactDOM from 'react-dom';

import './css/reset.css';
import './css/variables.css';
import './css/index.css';

import App from './components/App.js';
import registerServiceWorker from './components/registerServiceWorker.js';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
