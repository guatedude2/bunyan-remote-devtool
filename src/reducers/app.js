import { handleActions } from 'redux-actions';

export default handleActions({
  APP_SET_FILTER_BIT: (state, {payload}) => (
    {
      ...state,
      filterBits: (payload.modifier ? state.filterBits ^ payload.filterBit : payload.filterBit)
    }
  ),
  APP_SET_FILTER_TEST: (state, {payload}) => (
    {
      ...state,
      filterText: payload.filterText
    }
  ),
  APP_TOGGLE_FILTERS: (state) => (
    {
      ...state,
      filtersVisible: !state.filtersVisible
    }
  )
}, {
  filtersVisible: false,
  filterBits: 1,
  filterText: ''
});
