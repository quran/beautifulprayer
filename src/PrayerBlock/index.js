import React from 'react';

const PrayerBlock = ({ prayer }) => {
  return (
    <div className="prayer-block" style={{ backgroundImage: `url(/images/${prayer.name}.jpg)` }}>
      <h4>{prayer.name}</h4>
      <h3>{prayer.time}</h3>
    </div>
  );
};

export default PrayerBlock;
