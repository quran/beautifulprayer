import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { TouchableWithoutFeedback, View, TouchableHighlight, Modal, Text, StyleSheet } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { RadioButtons } from 'react-native-radio-buttons';
import adhan from '../../../utils/Adhan';

import { setMethod, setMadhab } from '../../../redux/prayerTimes';

const methods = Object.keys(adhan.CalculationMethod);
const madhabs = Object.keys(adhan.Madhab);

class SettingsModal extends Component {
  renderOption(option, selected, onSelect, index) {
    const textStyle = {
        paddingTop: 10,
        paddingBottom: 10,
        color: 'black',
        flex: 1,
        fontSize: 14,
      };
      const baseStyle = {
        flexDirection: 'row',
      };
      let style;
      let checkMark;

      if (index > 0) {
        style = [baseStyle, {
          borderTopColor: '#eeeeee',
          borderTopWidth: 1,
        }];
      } else {
        style = baseStyle;
      }

      if (selected) {
        checkMark = (
          <Text style={{
            flex: 0.1,
            color: '#007AFF',
            fontWeight: 'bold',
            paddingTop: 8,
            fontSize: 20,
            alignSelf: 'center',
          }}
        >
          ✓
        </Text>
      );
    }

    return (
      <TouchableWithoutFeedback onPress={onSelect} key={index}>
        <View style={style}>
          <Text style={textStyle}>{option.replace(/([a-z\d])([A-Z])/g, `$1 $2`)}</Text>
          {checkMark}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { visible, onClose, method, madhab } = this.props;
    const leftButtonConfig = {
      title: 'Close',
      handler: onClose,
    };

    const titleConfig = {
      title: 'Settings',
    };

    console.log(this.props, method, madhab);

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={() => {alert("Modal has been closed.")}}
      >
        <NavigationBar
          title={titleConfig}
          leftButton={leftButtonConfig}
        />
        <View style={{ margin: 20 }}>
          <Text style={styles.title}>
            Method
          </Text>
          <RadioButtons
            options={methods}
            onSelection={this.props.setMethod}
            selectedOption={method}
            renderOption={this.renderOption}
            renderContainer={RadioButtons.renderVerticalContainer}
          />
          <Text style={styles.title}>
            Madhab
          </Text>
          <RadioButtons
            options={madhabs}
            onSelection={this.props.setMadhab}
            selectedOption={madhab}
            renderOption={this.renderOption}
            renderContainer={RadioButtons.renderVerticalContainer}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#555555',
    marginBottom: 5,
    marginTop: 5,
    fontSize: 12,
  }
});

SettingsModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  method: PropTypes.string,
  madhad: PropTypes.string
};

export default connect(state => ({
  method: state.prayerTimes.method,
  madhab: state.prayerTimes.madhab,
}), { setMethod, setMadhab })(SettingsModal);
