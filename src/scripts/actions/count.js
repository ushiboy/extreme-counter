import { UPDATE_COUNTER } from '../constants';
import { upVote, downVote } from '../webapi/count';

export function plusCounter() {
  return dispatch => {
    upVote().then(json => {
      dispatch({
        type: UPDATE_COUNTER,
        payload: json.count
      });
    });
  };
}

export function minusCounter() {
  return dispatch => {
    downVote().then(json => {
      dispatch({
        type: UPDATE_COUNTER,
        payload: json.count
      });
    });
  };
}
