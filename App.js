/**
 * @format
 * @flow
 */

import React from 'react';
import {
  StatusBar,
} from 'react-native';

import Nav from './src/nav';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Nav/>
    </>
  );
};

export default App;
