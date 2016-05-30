import { createAction } from 'redux-actions';

export const setFilterBit = createAction('APP_SET_FILTER_BIT', (filterBit, modifier) => (
  {filterBit, modifier}
));

export const setFilterText = createAction('APP_SET_FILTER_TEXT', (filterText) => (
  {filterText}
));

export const toggleFilters = createAction('APP_TOGGLE_FILTERS');