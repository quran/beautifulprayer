import React, { PropTypes } from 'react';
import adhan from 'adhan';

const MadhabSelect = ({ onChange, value }) => (
  <select value={value} onChange={onChange} className="location-dropdown" id="prayerMethod">
    {
      Object.keys(adhan.Madhab).map(method => (
        <option key={method} value={method}>{method}</option>
      ))
    }
  </select>
);

MadhabSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default MadhabSelect;
