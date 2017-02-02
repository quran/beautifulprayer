import React from 'react';
import { Dimensions, View, Image, Text, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

const Block = ({ image, prayer }) => {
  return (
    <Image source={image} style={styles.backgroundImageBlock}>
      <View style={styles.prayer}>
        <Text style={styles.name}>
          {prayer.name}
        </Text>
        <Text style={styles.time}>
          {prayer.time}
        </Text>
      </View>
    </Image>
  );
};

const styles = StyleSheet.create({
  backgroundImageBlock: {
    flex: 1,
    alignSelf: 'stretch',
    width,
    height: height / 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  prayer: {
  },
  name: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '300',
    textAlign: 'center'
  },
  time: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '100',
    textAlign: 'center'
  }
});

export default Block;
