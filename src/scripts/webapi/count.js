import axios from 'axios';
import config from '../config';

export function fetchCount() {
  const baseURL = config().baseURL;
  return axios('/api/count', {
    baseURL
  })
  .then(res => {
    return res.data;
  });
}

export function upVote() {
  return axios('/api/vote', {
    method: 'POST'
  })
  .then(res => {
    return res.data;
  });
}

export function downVote() {
  return axios('/api/vote', {
    method: 'DELETE'
  })
  .then(res => {
    return res.data;
  });
}
