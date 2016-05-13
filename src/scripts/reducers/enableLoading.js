import { ENABLE_LOADING } from '../constants';

export default function enableLoading(state = false, action) {
  switch (action.type) {
    case ENABLE_LOADING:
      return true;
    default:
      return state;
  }
}
