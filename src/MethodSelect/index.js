import React, { PropTypes } from 'react';
import adhan from 'adhan';
require('./style.css');

const MethodSelect = ({ onChange }) => (
  <select onChange={onChange} className="location-dropdown" id="prayerMethod">
    {
      Object.keys(adhan.CalculationMethod).map(method => (
        <option key={method} value={method}>{method.replace(/([a-z\d])([A-Z])/g, '$1' + ' ' + '$2')}</option>
      ))
    }
  </select>
);

export default MethodSelect;
