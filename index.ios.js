/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import App from './src/native/containers/App';
import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

//
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

AppRegistry.registerComponent('beautifulprayer', () => App);
