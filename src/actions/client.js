import { createAction } from 'redux-actions';

export const CONNECTING = 'CONNECTING';
export const CONNECTED = 'CONNECTED';
export const DISCONNECTED = 'DISCONNECTED';
export const AUTHENTICATING = 'AUTHENTICATING';
export const ERROR = 'ERROR';

export const setClientStatus = createAction('CLIENT_SET_STATUS', (status) => (
  {status}
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

