import { handleActions } from 'redux-actions';

export default handleActions({
  READY: (state) => (
    {
      ...state,
      isReady: true
    }
  )
}, {
  isReady: false
});
