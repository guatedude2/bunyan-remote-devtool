import { handleActions } from 'redux-actions';
import historyFilters from '../utils/history-filters';
import { CONNECTED, DISCONNECTED, AUTH_NONE } from '../actions/client';

export default handleActions({
  CLIENT_SET_SERVER_PORT: (state, {payload}) => (
    {
      ...state,
      serverPort: payload.serverPort
    }
  ),

  CLIENT_SET_STATUS: (state, {payload}) => {
    let {history, filteredHistory, preserveHistory} = state;

    if (!preserveHistory && payload.status === CONNECTED) {
      history = [];
      filteredHistory = [];
    }

    return {
      ...state,
      status: payload.status,
      history: history,
      filteredHistory: filteredHistory,
      sendCredentials: false,
      authPanelVisible: false
    };
  },

  CLIENT_REQUEST_AUTH: (state, {payload}) => (
    {
      ...state,
      requestAuth: payload.authType,
      authPanelVisible: true
    }
  ),

  CLIENT_SEND_AUTH: (state, {payload}) => (
    {
      ...state,
      authPanelVisible: false,
      sendCredentials: true,
      authError: null,
      credentials: { ...payload }
    }
  ),

  CLIENT_SHOW_AUTH: (state) => (
    {
      ...state,
      authPanelVisible: true
    }
  ),

  CLIENT_HIDE_AUTH: (state) => (
    {
      ...state,
      authPanelVisible: false
    }
  ),

  CLIENT_AUTH_ERROR: (state, {payload}) => (
    {
      ...state,
      authError: payload.error
    }
  ),

  CLIENT_SET_FILTER_BIT: (state, {payload}) => {
    const filterBits = (payload.modifier ? state.filterBits ^ payload.filterBit : payload.filterBit);
    return {
      ...state,
      filterBits: filterBits,
      filteredHistory: historyFilters(state.history, filterBits, state.filterText)
    };
  },
  CLIENT_SET_FILTER_TEXT: (state, {payload}) => {
    const filterText = payload.filterText;
    return {
      ...state,
      filterText: filterText,
      filteredHistory: historyFilters(state.history, state.filterBits, filterText)
    };
  },
  CLIENT_ADD_LOG_EVENT: (state, {payload}) => (
    {
      ...state,
      history: state.history.concat([payload.event]),
      filteredHistory: state.filteredHistory.concat(historyFilters([payload.event], state.filterBits, state.filterText))
    }
  ),
  CLIENT_CLEAR_HISTORY: (state) => (
    {
      ...state,
      history: [],
      filteredHistory: []
    }
  ),
  CLIENT_CLEAR_FILTERS: (state) => (
    {
      ...state,
      filterBits: 1,
      filterText: '',
      filteredHistory: state.history.slice()
    }
  ),
  CLIENT_SET_PRESERVE_HISTORY: (state, {payload}) => (
    {
      ...state,
      preserveHistory: payload.preserveHistory
    }
  )
}, {
  serverPort: '',
  credentials: null,
  status: DISCONNECTED,
  history: [],
  filteredHistory: [],
  filterBits: 1,
  filterText: '',
  authPanelVisible: false,
  sendCredentials: false,
  requestAuth: AUTH_NONE,
  showAuthError: null,
  preserveHistory: false
});
