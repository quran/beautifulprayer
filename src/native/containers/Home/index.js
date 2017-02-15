import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableHighlight, Modal, Dimensions, ScrollView, StatusBar, View, Image, Text, StyleSheet } from 'react-native';
import moment from 'moment';

import { getPrayerTimes, getNextPrayer, getTimesList, loadLocation } from '../../../redux/prayerTimes';
import Block from '../../components/Block';
import SettingsModal from '../../components/SettingsModal';
import adhan from '../../../utils/Adhan';

const { height, width } = Dimensions.get('window');

const backgroundImages = {
  fajr: require('../../../images/fajr.jpg'),
  sunrise: require('../../../images/sunrise.jpg'),
  dhuhr: require('../../../images/dhuhr.jpg'),
  asr: require('../../../images/asr.jpg'),
  maghrib: require('../../../images/maghrib.jpg'),
  isha: require('../../../images/isha.jpg')
};

class Home extends Component {
  state = {
    currentTime: this.getTime(),
    settingsModalOpen: false
  }

  componentWillMount() {
    return this.props.loadLocation();
  }

  componentDidUpdate() {
    if (!this.state.settingsModalOpen) {
      StatusBar.setHidden(true);
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ currentTime: this.getTime() }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getTime() {
    return moment().format('h:m A');
  }

  renderBlocks() {
    return getTimesList().map(name => (
      <Block
        key={name}
        image={backgroundImages[name.toLowerCase()]}
        prayer={{ name, time: adhan.Date.formattedTime(this.props.prayerTimes[name.toLowerCase()], this.props.offset) }}
      />
    ));
  }

  render() {
    if (!this.props.nextPrayer) return <View><Text>Loading...</Text></View>;

    return (
      <View>
        <SettingsModal visible={this.state.settingsModalOpen} onClose={() => this.setState({ settingsModalOpen: false })} />
        <ScrollView>
          <Image source={backgroundImages[this.props.nextPrayer.name.toLowerCase()]} style={styles.backgroundImage}>
            <View style={styles.details}>
              <Text onPress={() => this.setState({ settingsModalOpen: true })} style={styles.location}>
                Toronto
              </Text>
              <Text style={styles.dateTime}>
                {this.state.currentTime}
              </Text>
              <Text style={styles.dateTime}>
                {moment().format("MMMM D, YYYY")}
              </Text>
            </View>
            <View style={styles.nextPrayer}>
              <Text style={styles.name}>
                {this.props.nextPrayer.name}
              </Text>
              <Text style={styles.time}>
                {adhan.Date.formattedTime(this.props.nextPrayer.time, this.props.offset)}
              </Text>
            </View>
          </Image>
          {this.renderBlocks()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width,
    height
    // resizeMode: 'stretch', // or 'stretch'
  },
  backgroundImageBlock: {
    flex: 1,
    alignSelf: 'stretch',
    width,
    height: height / 2
  },
  details: {
    padding: 10,
  },
  location: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 30
  },
  dateTime: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '100'
  },
  nextPrayer: {
    padding: 15,
    position: 'absolute',
    bottom: 10
  },
  name: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '300'
  },
  time: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 86,
    fontWeight: '100'
  }
});

export default connect(state => {
  if (state.prayerTimes.coordinates) {
    return {
      prayerTimes: getPrayerTimes(state),
      nextPrayer: getNextPrayer(state),
      offset: state.prayerTimes.offset
    };
  }

  return {};
}, { loadLocation })(Home);
