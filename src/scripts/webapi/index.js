import axios from 'axios';

import * as apis from './count';

const combinedApis = Object.keys(apis).reduce((result, key) => {
  const api = apis[key];
  if (typeof(api) === 'function') {
    result[key] = api.bind(null, axios);
  }
  return result;
}, {});

export default combinedApis;
