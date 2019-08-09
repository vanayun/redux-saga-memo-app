import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';
import App from 'containers/App';
import 'index.css';

// ie 대응
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
