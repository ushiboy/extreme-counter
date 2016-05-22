import { renderToString } from 'react-dom/server';
import { match } from 'redux-routing';

import application from './application';
import { fetchCount } from './webapi/count';
import routes from './routes';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

const initialActions = {
  '/about': () => Promise.resolve(),
  '/': () => fetchCount()
};

export function dispatch(href) {
  const matched = match(href, routes);
  const initialAction = matched && initialActions[matched.path] || null;
  if (!matched || !initialAction) {
    return Promise.resolve({ html: '', status: 404 });
  }
  return initialAction()
  .then(json => {
    const initialState = Object.assign({}, {
      route: {
        href
      }
    }, json || {});
    const app = application(renderToString, initialState);
    const html = `<!DOCTYPE html>
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

    return {
      html,
      status: 200
    };
  });
}
