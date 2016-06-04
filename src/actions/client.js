import { createAction } from 'redux-actions';

export const CONNECTED = 'CONNECTED';
export const DISCONNECTED = 'DISCONNECTED';
export const AUTHENTICATING = 'AUTHENTICATING';
export const READY = 'READY';
export const ERROR = 'ERROR';

export const setClientStatus = createAction('CLIENT_SET_STATUS', (status) => (
  {status}
));

export const addLogEvent = createAction('CLIENT_ADD_LOG_EVENT', (event) => (
  {event}
));

export const clearHistory = createAction('CLIENT_CLEAR_HISTORY');