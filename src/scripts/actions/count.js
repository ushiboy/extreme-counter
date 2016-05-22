import { UPDATE_COUNTER } from '../constants';
import { upVote, downVote, fetchCount as _fetchCount } from '../webapi/count';
import { enableLoading } from './enableLoading';

export function fetchCountIfNeeded() {
  return (dispatch, getState) => {
    if (getState().enableLoading) {
      fetchCount()(dispatch);
    } else {
      dispatch(enableLoading());
    }
  };
}

export function fetchCount() {
  return dispatch => {
    _fetchCount().then(json => {
      dispatch({
        type: UPDATE_COUNTER,
        payload: json.count
      });
    });
  };
}

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
