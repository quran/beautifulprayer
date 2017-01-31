import React, { PropTypes } from 'react';
import Geosuggest from 'react-geosuggest';

import MethodSelect from '../MethodSelect';

require('./style.css');

const TopPanel = ({ nextPrayer, onMethodChange }) => {
  return (
    <div className="top-panel" style={{ backgroundImage: `url(/images/${nextPrayer.name}.jpg)`}}>
      <h2>{nextPrayer.name}</h2>
      <h1>{nextPrayer.time}</h1>
      <div className="top-panel-options">
        <Geosuggest types={['(cities)']} />
        <MethodSelect onChange={onMethodChange} />
      </div>
    </div>
  );
};

TopPanel.propTypes = {
  nextPrayer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  })
};

export default TopPanel;
