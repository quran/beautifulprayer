import React, { Component } from 'react';
import prayTimes from 'prayer-times';
import TopPanel from './TopPanel';
import PrayerBlock from './PrayerBlock';
import Loader from './Loader';

import getLocation from './utils/getLocation';

import './App.css';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.prayerTimes = new prayTimes();
    this.state = {};
  }

  componentWillMount() {
    // console.log(getLocation)
    getLocation().then(({ location }) => this.setState({ location }));
  }

  getPrayerTimes() {
    const latitude = this.state.location.latitude || this.state.location.lat;
    const longitude = this.state.location.longitude || this.state.location.lng;
    const date = new Date();
    const times = this.prayerTimes.getTimes(new Date(), [latitude, longitude]);

    if (date > this.convertTimeToDate(times['isha'])) {
      date.setDate(date.getDate() + 1);
      date.setHours(2);

      return this.prayerTimes.getTimes(date, [latitude, longitude]);
    }

    return times;
  }

  getTimesList() {
    return ['Fajr', 'Sunrise',  'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  }

  getRemainingPrayers() {
    const date = new Date();
    const remaining = [];

    this.getTimesList().forEach(time => {
      const convertedTime = this.convertTimeToDate(this.getPrayerTimes()[time.toLowerCase()])

      if (convertedTime > date) {
        remaining.push([
          time,
          this.getPrayerTimes()[time.toLowerCase()]
        ]);
      }
    });

    return remaining;
  }

  getNextPrayer() {
    return this.getRemainingPrayers()[0] || ['Fajr', this.getPrayerTimes()['fajr']];
  }

  handleMethodChange = (event) => {
    this.prayerTimes.setMethod(event.target.value);
    this.forceUpdate();
  }

  convertTimeToDate(timeString) {
    let hours = Number(timeString.match(/^(\d+)/)[1]);
    let minutes = Number(timeString.match(/:(\d+)/)[1]);
    const AMPM = timeString.match(/\s(.*)$/)[1];

    if (AMPM === 'pm' && hours < 12) hours += 12;
    if (AMPM === 'am' && hours === 12) hours -= 12;

    let sHours = hours.toString();
    let sMinutes = minutes.toString();
    if (hours < 10) sHours = `0${sHours}`;
    if (minutes < 10) sMinutes = `0${sMinutes}`;

    const date = new Date();
    date.setHours(sHours);
    date.setMinutes(sMinutes);

    return date;
  }

  render() {
    if (!this.state.location) return <Loader />;
    console.log(this.getNextPrayer(), this.getPrayerTimes(), this.getRemainingPrayers());

    return (
      <div className="App">
        <TopPanel
          nextPrayer={{ name: this.getNextPrayer()[0], time: this.getNextPrayer()[1] }}
          onMethodChange={this.handleMethodChange}
        />
        <div className="prayer-blocks">
          {
            this.getTimesList().map(item => (
              <PrayerBlock
                key={item}
                prayer={{ name: item, time: this.getPrayerTimes()[item.toLowerCase()] }}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
