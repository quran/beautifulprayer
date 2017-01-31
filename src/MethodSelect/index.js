import React, { PropTypes } from 'react';
require('./style.css');

const MethodSelect = ({ onChange }) => (
  <select onChange={onChange} className="location-dropdown" id="prayerMethod">
    <option className="selectoption" value="MWL">MWL</option>
    <option className="selectoption" value="ISNA">ISNA</option>
    <option className="selectoption" value="Egypt">Egypt</option>
    <option className="selectoption" value="Makkah">Makkah</option>
    <option className="selectoption" value="Karachi">Karachi</option>
    <option className="selectoption" value="Tehran">Tehran</option>
    <option className="selectoption" value="Jafari">Jafari</option>
  </select>
);

export default MethodSelect;
