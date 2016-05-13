import { combineReducers } from 'redux';
import count from './count';
import enableLoading from './enableLoading';
import { reducer } from 'redux-routing';

const reducers = combineReducers({
  count,
  enableLoading,
  route: reducer
});
export default reducers;
