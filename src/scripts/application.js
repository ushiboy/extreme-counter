import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createMiddleware, History } from 'redux-routing';

import App from './containers/App';
import reducers from './reducers';
import routes from './routes';

function isBrowser() {
  const g = (this || 0).self || global;
  return !g.global && 'document' in g;
}

export default function application(renderer, initialState) {

  const router = createMiddleware(isBrowser() ? History : undefined);
  const store = createStore(reducers, initialState, applyMiddleware(thunk, router));
  return renderer(
    <Provider store={store}>
      <App routes={routes} />
    </Provider>
  );
}
