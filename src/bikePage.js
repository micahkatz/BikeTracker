import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  Alert,
  Linking
 } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import AsyncStorage from '@react-native-community/async-storage';

import TopBar from './topBar';

import { getTimestamp } from './getTimestamp';
import { getAmountDrank } from './getAmountDrank';

navigator.geolocation = require('@react-native-community/geolocation');

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const _grey = '#ffd1ed';

export default class BikePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numBottles: 0,
      bottleGoal: 4,
      bottleSizeOz: 32,
      lastDrink: 0,
      location: null,
      mapsURL: null,
      lat: null,
      lng: null
    };
    
    this.getLocation()

    this.setLocation = this.setLocation.bind(this)
    this.setLink = this.setLink.bind(this)
    this.handleLink = this.handleLink.bind(this)
    this.getLocation = this.getLocation.bind(this)
  }

  getLocation = async () => {
    try {
      var lat = await AsyncStorage.getItem('lat');
      var lng = await AsyncStorage.getItem('lng');

      this.setState({ lat, lng })

    } catch (error) {

      console.log('Error getting location: ', error)

    }
  };

  storeLocation = async (lat, lng) => {
    try {
      await AsyncStorage.setItem('lat', lat.toString());
      await AsyncStorage.setItem('lng', lng.toString());
    } catch (error) {
      // Error saving data
      console.log('Error saving data: ', error)
    }
  };

  setLocation = () => {

    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        console.log(location)

        parsedLocation = JSON.parse(location)

        lat = parsedLocation.coords.latitude
        lng = parsedLocation.coords.longitude

        this.setState({ lat, lng });

        this.setLink(lat, lng)

        this.storeLocation(lat, lng)
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    

  }

  setLink (lat, lng) {

    // https://www.google.com/maps/search/?api=1&query=


    // console.log('lat', location.coords.latitude, 'lng', location.coords.longitude)

    mapsURL = 'https://www.google.com/maps/search/?api=1&query=' + lat + ',' + lng


    console.log('mapsURL', mapsURL)
    this.setState({ mapsURL })
  }

  handleLink () {

    if(this.state.lat && this.state.lng){
      url = 'https://www.google.com/maps/search/?api=1&query=' + this.state.lat + ',' + this.state.lng
  
  
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + this.props.url);
        }
      });
    }
  };

  render() {
    return (
      <LinearGradient 
        colors={['#ff66c4', '#fe5656']}
        style={styles.gradient}
      >
        <SafeAreaView>
        </SafeAreaView>
        <View
          style={styles.container}
        >
          <TouchableOpacity
            style={styles.bigButton}
            onPress={this.setLocation}
          >
            <Image
              source={require('./BikeButton.png')}
              style={styles.waterImg}
            />
          </TouchableOpacity>
          <Text style={styles.h2}>Lat  {this.state.lat}</Text>
          <Text style={styles.h2}>Lng  {this.state.lng}</Text>
          
          {
            (this.state.lat && this.state.lng) 
            ? 
            (
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={this.handleLink}
                >
                  <Text style={[styles.h2, { color: '#ffeef3' }]}>Open in Google Maps</Text>
                </TouchableOpacity>
            )
            :
            (
                <View
                  style={[styles.resetButton, {
                    backgroundColor: 'transparent',
                    borderColor: '#ffeef3',
                    borderWidth: 2
                  }]}
                >
                  <Text style={[styles.h2, { color: '#ffeef3' }]}>Open in Google Maps</Text>
                </View>
            )
          }

          
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  container: {
    width: WIDTH,
    height: HEIGHT - 125,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bigButton: {
    height: WIDTH * .7,
    width: WIDTH * .7,
    borderRadius: (WIDTH * .7) / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  resetButton: {
    height: WIDTH * .15,
    width: WIDTH * .7,
    borderRadius: 27,
    backgroundColor: '#ff9ebb',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  waterImg: {
    height: WIDTH * .7,
    width: WIDTH * .7,
    borderRadius: WIDTH * .7 / 2,
  },
  h1: {
    color: 'white',
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 50
  },
  h2: {
    color: _grey,
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 20
  },
})