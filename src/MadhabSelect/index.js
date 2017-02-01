import React, { PropTypes } from 'react';
import adhan from 'adhan';

const AsrSelect = ({ onChange }) => (
  <select onChange={onChange} className="location-dropdown" id="prayerMethod">
    {
      Object.keys(adhan.Madhab).map(method => (
        <option key={method} value={method}>{method}</option>
      ))
    }
  </select>
);

export default AsrSelect;
