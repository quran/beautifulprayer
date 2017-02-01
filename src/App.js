import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Home from './Home';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/cities/:citySlug" component={Home} />
    </div>
  </Router>
);

export default App;
