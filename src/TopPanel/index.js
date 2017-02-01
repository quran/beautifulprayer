import React, { PropTypes } from 'react';
import Geosuggest from 'react-geosuggest';

import MethodSelect from '../MethodSelect';
import MadhabSelect from '../MadhabSelect';

require('./style.css');

const TopPanel = ({ nextPrayer, onMethodChange, onMadhabChange, onLocationChange }) => {
  return (
    <div className="top-panel" style={{ backgroundImage: `url(/images/${nextPrayer.name}.jpg)`}}>
      <h2 className="text-capitalize">{nextPrayer.name}</h2>
      <h1>{nextPrayer.time}</h1>
      <div className="top-panel-options">
        <Geosuggest
          types={['(cities)']}
          onSuggestSelect={onLocationChange}
        />
        <MethodSelect onChange={onMethodChange} />
        <MadhabSelect onChange={onMadhabChange} />
      </div>
    </div>
  );
};

TopPanel.propTypes = {
  onLocationChange: PropTypes.func,
  onMethodChange: PropTypes.func,
  nextPrayer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  })
};

export default TopPanel;
