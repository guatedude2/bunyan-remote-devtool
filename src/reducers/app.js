import { handleActions } from 'redux-actions';

export default handleActions({
  APP_TOGGLE_FILTERS: (state) => (
    {
      ...state,
      filtersVisible: !state.filtersVisible
    }
  )
}, {
  filtersVisible: false,
});
