import { UPDATE_COUNTER } from '../constants';

export default function count(state=0, action) {
  switch (action.type) {
    case UPDATE_COUNTER:
      return action.payload;
    default:
      return state;
  }
}
