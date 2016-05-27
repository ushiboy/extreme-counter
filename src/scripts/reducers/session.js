import { UPDATE_SESSION } from '../constants';

export default function session(state={ authenticated: false }, action) {
  switch (action.type) {
    case UPDATE_SESSION:
      return Object.assign({}, state, {
        authenticated: action.payload
      });
    default:
      return state;
  }
}
