import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './containers/App';
import reducers from './reducers';

export default function application(renderer, initialState) {
  const store = createStore(reducers, initialState, applyMiddleware(thunk));
  return renderer(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
