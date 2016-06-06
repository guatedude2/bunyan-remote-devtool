import { handleActions } from 'redux-actions';
import historyFilters from '../utils/history-filters';
import { CONNECTED, DISCONNECTED } from '../actions/client';

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
      filteredHistory: filteredHistory
    };
  },

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
  status: DISCONNECTED,
  history: [],
  filteredHistory: [],
  filterBits: 1,
  filterText: '',
  preserveHistory: false
});
