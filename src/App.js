import React, { Component } from 'react';
import adhan from 'adhan';
import TopPanel from './TopPanel';
import PrayerBlock from './PrayerBlock';
import Loader from './Loader';

import getLocation from './utils/getLocation';

import './App.css';

class App extends Component {
  state = {
    method: 'MuslimWorldLeague'
  };

  componentWillMount() {
    getLocation().then(({ location }) => this.setState({
      coordinates: new adhan.Coordinates(location.lat, location.lng)
    }));
  }

  getPrayerTimes() {
    const date = new Date();
    const times = new adhan.PrayerTimes(
      this.state.coordinates,
      date,
      adhan.CalculationMethod[this.state.method]()
    );

    return times;
  }

  getTimesList() {
    return Object.keys(adhan.Prayer).filter(name => name !== 'None');
  }

  getNextPrayer() {
    const nextPrayerIndex = this.getPrayerTimes().nextPrayer();
    const prayerName = this.getTimesList()[nextPrayerIndex].toLowerCase();

    return { name: prayerName, time: this.getPrayerTimes()[prayerName] };
  }

  handleMethodChange = (event) => {
    this.setState({ method: event.target.value });
  }

  render() {
    if (!this.state.coordinates) return <Loader />;
    const offset = new Date().getTimezoneOffset() / (60 * -1);

    // console.log(this.getNextPrayer(), this.getPrayerTimes(), this.getRemainingPrayers());
    console.log(adhan, this.getNextPrayer(), this.getPrayerTimes());

    return (
      <div className="App">
        <TopPanel
          nextPrayer={{ name: this.getNextPrayer().name, time: adhan.Date.formattedTime(this.getNextPrayer().time, offset) }}
          onMethodChange={this.handleMethodChange}
        />
        <div className="prayer-blocks">
          {
            this.getTimesList().map(name => (
              <PrayerBlock
                key={name}
                prayer={{ name, time: adhan.Date.formattedTime(this.getPrayerTimes()[name.toLowerCase()], offset) }}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
