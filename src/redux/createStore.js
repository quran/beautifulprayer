import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from './reducers';

export default function createStore(data) {
  const middleware = [createLogger(), thunk];

  let finalCreateStore;
  if (__DEV__) {
    finalCreateStore = compose(
      applyMiddleware(...middleware)
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const store = finalCreateStore(reducer, data);

  return store;
}
