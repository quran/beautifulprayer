import React, { PropTypes } from 'react';
import adhan from 'adhan';
require('./style.css');

const MethodSelect = ({ value, onChange }) => (
  <select value={value} onChange={onChange} className="location-dropdown">
    {
      Object.keys(adhan.CalculationMethod).map(method => (
        <option key={method} value={method}>{method.replace(/([a-z\d])([A-Z])/g, `$1 $2`)}</option>
      ))
    }
  </select>
);

MethodSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default MethodSelect;
