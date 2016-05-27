import { UPDATE_COUNTER } from '../constants';
import webapi from '../webapi';
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
    webapi.fetchCount().then(json => {
      dispatch({
        type: UPDATE_COUNTER,
        payload: json.count
      });
    });
  };
}

export function plusCounter() {
  return dispatch => {
    webapi.upVote().then(json => {
      dispatch({
        type: UPDATE_COUNTER,
        payload: json.count
      });
    });
  };
}

export function minusCounter() {
  return dispatch => {
    webapi.downVote().then(json => {
      dispatch({
        type: UPDATE_COUNTER,
        payload: json.count
      });
    });
  };
}
