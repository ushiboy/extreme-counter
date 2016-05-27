import { UPDATE_SESSION } from '../constants';
import webapi from '../webapi';

export function unlock() {
  return dispatch => {
    webapi.unlock().then(json => {
      dispatch({
        type: UPDATE_SESSION,
        payload: true
      });
    });
  };
}

export function lock() {
  return dispatch => {
    webapi.lock().then(json => {
      dispatch({
        type: UPDATE_SESSION,
        payload: false
      });
    });
  };
}
