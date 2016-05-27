import { renderToString } from 'react-dom/server';
import { match } from 'redux-routing';

import application from './application';
import { fetchCount, fetchSession } from './webapi/count';
import routes from './routes';
import axios from 'axios';


function about(axios) {
  return fetchSession(axios)
  .then(({authenticated}) => {
    return {
      session: {
        authenticated
      },
      enableLoading: true
    };
  });
}

function index(axios) {
  return Promise.all([
    fetchCount(axios),
    fetchSession(axios)
  ]).then(([{count}, {authenticated}]) => {
    return {
      count,
      session: {
        authenticated
      }
    };
  });
}

const routeHandlers = {
  '/about': about,
  '/': index
};

export function dispatch(req) {
  const { url, headers } = req;
  const matched = match(url, routes);
  const routeHandler = matched ? routeHandlers[matched.path] : null;
  if (!routeHandler) {
    return Promise.resolve({ html: '', status: 404 });
  }

  const configuredAxios = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
      'Cookie': headers.cookie || ''
    }
  });

  return routeHandler(configuredAxios)
  .then(routeState => {
    const initialState = Object.assign({}, {
      route: {
        href: url
      }
    }, routeState || {});

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
