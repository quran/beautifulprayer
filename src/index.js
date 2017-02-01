import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import App from './App';
import './index.css';

fetch('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json')
.then(response => response.json())
.then(response => {
  window.cities = response;
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
});
