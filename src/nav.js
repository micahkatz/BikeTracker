/*
  nav.js handles all navigation between pages
*/

import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import {Image} from 'react-native'

import WaterPage from './waterPage';
import BikePage from './bikePage';
import SettingsPage from './settingsPage';

// AppNavigator is the Top-Layer navigator for the entire app
const WaterNavigator = createStackNavigator({
  WaterPage,
  SettingsPage
},
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

const TabNavigator = createBottomTabNavigator({
  WaterNavigator,
  BikePage
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;

        let imgSrc

        if (routeName === 'WaterNavigator') {
          
          imgSrc = require('./WaterIcon.png')
        } 
        else if (routeName === 'BikePage') {
          imgSrc = require('./BikeIcon.png')
        }

        // You can return any component that you like here!
        return <Image source={imgSrc} style={{height: 60, width: 59, margin: 5, tintColor}}/>
      },
    }),
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'transparent',
        position: 'absolute',
        borderTopWidth: 0,
        left: 0,
        bottom: 0,
        right: 0
      }
    }
  }
);

export default createAppContainer(TabNavigator);
