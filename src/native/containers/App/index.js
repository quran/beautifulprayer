import React from 'react';
import { Provider } from 'react-redux';

import Home from '../Home';
import createStore from '../../../redux/createStore';

const store = createStore();

const App = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);

export default App;
