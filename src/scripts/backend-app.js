import { renderToString } from 'react-dom/server';

import application from './application';
import { fetchCount } from './webapi/count';
import config from './config';

config({baseURL: 'http://localhost:3001' });

export function index() {
  return fetchCount()
  .then(json => {
    const initialState = {
      count: json.count
    };
    const app = application(renderToString, initialState);
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Extreme Counter</title>
</head>
<body>
  <div id="app">${app}</div>
  <script>
    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
  </script>
  <script src="scripts/app.js"></script>
</body>
</html>`;
  });
}
