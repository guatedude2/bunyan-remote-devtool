import { handleActions } from 'redux-actions';
import historyFilters from '../utils/history-filters';
import { DISCONNECTED } from '../actions/client';

export default handleActions({
  CLIENT_SET_STATUS: (state, {payload}) => (
    {
      ...state,
      status: payload.status
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
  CLIENT_ADD_LOG_EVENT: (state, {payload}) => {
    const history = state.history.concat([payload.event]);
    return {
      ...state,
      history: history,
      filteredHistory: historyFilters(history, state.filterBits, state.filterText)
    };
  },
  CLIENT_CLEAR_HISTORY: (state) => (
    {
      ...state,
      history: [],
      filteredHistory: []
    }
  )
}, {
  status: DISCONNECTED,
  history: [],
  filteredHistory: [],
  filterBits: 1,
  filterText: ''
});
