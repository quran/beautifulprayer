import React, { Component } from 'react';
import adhan from 'adhan';
import cookie from 'react-cookie';
import queryString from 'query-string';

import TopPanel from '../TopPanel';
import PrayerBlock from '../PrayerBlock';
import Loader from '../Loader';

import getLocation from '../utils/getLocation';
import getTimezone from '../utils/getTimezone';

import './style.css';

class Home extends Component {
  state = {
    method: cookie.load('method') || 'MuslimWorldLeague',
    madhab: cookie.load('madhab') || 'Shafi',
    offset: new Date().getTimezoneOffset() / (60 * -1),
    coordinates: this.getInitialCoordinates()
  };

  componentWillMount() {
    if (this.state.coordinates) return false;

    getLocation().then(({ location }) => this.setState({
      coordinates: new adhan.Coordinates(location.lat, location.lng)
    }));
  }

  getInitialCoordinates() {
    if (
      this.props.location.search &&
      queryString.parse(this.props.location.search).lat &&
      queryString.parse(this.props.location.search).lng
    ) {
      return new adhan.Coordinates(
        queryString.parse(this.props.location.search).lat,
        queryString.parse(this.props.location.search).lng
      );
    } else if (this.props.match.params && this.props.match.params.citySlug) {
      const key = this.props.match.params.citySlug.replace('-', '').toLowerCase();
      const currentCity = window.cities.find(city => city.city.replace(' ', '').replace('-', '').toLowerCase() === key);

      if (currentCity) {
        return new adhan.Coordinates(
          currentCity.latitude,
          currentCity.longitude
        );
      }
    }

    return null;
  }

  getPrayerTimes() {
    const date = new Date();
    const params = adhan.CalculationMethod[this.state.method]();
    params.madhab = adhan.Madhab[this.state.madhab];

    let times = new adhan.PrayerTimes(
      this.state.coordinates,
      date,
      params
    );

    if (times.nextPrayer() === 6) {
      date.setDate(date.getDate() + 1);

      times = new adhan.PrayerTimes(
        this.state.coordinates,
        date,
        params
      );
    }

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

  handleMadhabChange = (event) => {
    cookie.save('madhab', event.target.value);
    this.setState({ madhab: event.target.value });
  }

  handleMethodChange = (event) => {
    cookie.save('method', event.target.value);
    this.setState({ method: event.target.value });
  }

  handleLocationChange = ({ location, gmaps }) => {
    getTimezone(location.lat, location.lng).then(response => this.setState({
      coordinates: new adhan.Coordinates(location.lat, location.lng),
      offset: (response.rawOffset / 60 / 60)
    }));
  }

  render() {
    if (!this.state.coordinates) return <Loader />;

    // console.log(this.getNextPrayer(), this.getPrayerTimes(), this.getRemainingPrayers());
    console.log(adhan, this.getNextPrayer(), this.getPrayerTimes());

    return (
      <div className="App">
        <TopPanel
          method={this.state.method}
          madhab={this.state.madhab}
          nextPrayer={{ name: this.getNextPrayer().name, time: adhan.Date.formattedTime(this.getNextPrayer().time, this.state.offset) }}
          onMethodChange={this.handleMethodChange}
          onMadhabChange={this.handleMadhabChange}
          onLocationChange={this.handleLocationChange}
        />
        <div className="prayer-blocks">
          {
            this.getTimesList().map(name => (
              <PrayerBlock
                key={name}
                prayer={{ name, time: adhan.Date.formattedTime(this.getPrayerTimes()[name.toLowerCase()], this.state.offset) }}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default Home;
