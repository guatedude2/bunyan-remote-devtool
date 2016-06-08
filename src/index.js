import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import client from './utils/bunyan-remote-client';
import { setClientStatus, addLogEvent, requestAuth, authError} from './actions/client';
import reducers from './reducers';
import App from './containers/App';

let store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

store.subscribe(() => {
  const {serverPort, sendCredentials, credentials} = store.getState().client;
  client.setPort(serverPort || 3232);

  if (sendCredentials) {
    client.authenticate(credentials.userKey, credentials.password);
  }
});

client.onStatusChanged((status) => {
  store.dispatch(setClientStatus(status));
});

client.onRequestAuth((authType) => {
  store.dispatch(requestAuth(authType));
});

client.onLogEvent((event) => {
  store.dispatch(addLogEvent(event));
});

client.onAuthError((error) => {
  store.dispatch(authError(error));
});

client.connect('localhost', 3232);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);