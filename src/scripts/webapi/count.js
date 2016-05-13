import axios from 'axios';

export function fetchCount() {
  return axios('/api/count')
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
