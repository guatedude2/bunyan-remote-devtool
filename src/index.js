import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import client from './utils/bunyan-remote-client';
import {setClientStatus, addLogEvent} from './actions/client';
import reducers from './reducers';
import App from './containers/App';

let store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
client.onStatusChanged((status, data) => {
  store.dispatch(setClientStatus(status, data));
});

client.onLogEvent((event) => {
  store.dispatch(addLogEvent(event));
});

client.connect('localhost', 3232);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);