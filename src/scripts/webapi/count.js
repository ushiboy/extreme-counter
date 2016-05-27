export function fetchCount(axios) {
  return axios.get('/api/count')
  .then(res => {
    return res.data;
  });
}

export function fetchSession(axios) {
  return axios.get('/api/session')
  .then(res => {
    return res.data;
  });
}

export function unlock(axios) {
  return axios.post('/api/login')
  .then(res => {
    return res.data;
  });
}

export function lock(axios) {
  return axios.delete('/api/logout')
  .then(res => {
    return res.data;
  });
}

export function upVote(axios) {
  return axios.post('/api/vote')
  .then(res => {
    return res.data;
  });
}

export function downVote(axios) {
  return axios.delete('/api/vote')
  .then(res => {
    return res.data;
  });
}
