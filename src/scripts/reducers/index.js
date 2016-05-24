import { combineReducers } from 'redux';
import count from './count';
import session from './session';
import enableLoading from './enableLoading';
import { reducer } from 'redux-routing';

const reducers = combineReducers({
  count,
  session,
  enableLoading,
  route: reducer
});
export default reducers;
