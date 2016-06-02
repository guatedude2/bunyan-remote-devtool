import { handleActions } from 'redux-actions';

import { DISCONNECTED } from '../actions/client';

export default handleActions({
  CLIENT_SET_STATUS: (state, {payload}) => (
    {
      ...state,
      status: payload.status
    }
  ),

  CLIENT_ADD_LOG_EVENT: (state, {payload}) => (
    {
      ...state,
      history: state.history.concat([payload.event])
    }
  )
}, {
  status: DISCONNECTED,
  history: []
});
