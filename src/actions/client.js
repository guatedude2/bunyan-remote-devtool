import { createAction } from 'redux-actions';

export const CONNECTING = 'CONNECTING';
export const CONNECTED = 'CONNECTED';
export const DISCONNECTED = 'DISCONNECTED';
export const WAITING_FOR_AUTH = 'WAITING_FOR_AUTH';
export const AUTHENTICATING = 'AUTHENTICATING';
export const ERROR = 'ERROR';

export const AUTH_NONE = 0;
export const AUTH_KEY = 1;
export const AUTH_USER = 2;

export const clientEnable = createAction('CLIENT_ENABLE', (enabled) => (
  {enabled}
));

export const changeServerPort = createAction('CLIENT_SET_SERVER_PORT', (serverPort) => (
  {serverPort}
));

export const setClientStatus = createAction('CLIENT_SET_STATUS', (status) => (
  {status}
));

export const requestAuth = createAction('CLIENT_REQUEST_AUTH', (authType) => (
  {authType}
));

export const authError = createAction('CLIENT_AUTH_ERROR', (error) => (
  {error}
));

export const showAuthPanel = createAction('CLIENT_SHOW_AUTH');
export const hideAuthPanel = createAction('CLIENT_HIDE_AUTH');

export const sendAuth = createAction('CLIENT_SEND_AUTH', (userKey, password) => (
  {userKey, password}
));

export const setFilterBit = createAction('CLIENT_SET_FILTER_BIT', (filterBit, modifier) => (
  {filterBit, modifier}
));

export const setFilterText = createAction('CLIENT_SET_FILTER_TEXT', (filterText) => (
  {filterText}
));

export const addLogEvent = createAction('CLIENT_ADD_LOG_EVENT', (event) => (
  {event}
));

export const clearHistory = createAction('CLIENT_CLEAR_HISTORY');

export const clearFilters = createAction('CLIENT_CLEAR_FILTERS');

export const setPreserveHistory = createAction('CLIENT_SET_PRESERVE_HISTORY', (preserveHistory) => (
  {preserveHistory}
));

