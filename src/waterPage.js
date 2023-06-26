import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView
 } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import AsyncStorage from '@react-native-community/async-storage';

import TopBar from './topBar';

import { getTimestamp } from './getTimestamp';
import { getAmountDrank } from './getAmountDrank';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const _grey = '#e7e8fb';

export default class WaterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numBottles: 0,
      bottleGoal: 4,
      bottleSizeOz: 32,
      lastDrink: 0
    };

    this.setNumBottles()
    this.setLastDrink()
    
    this.drankBottle = this.drankBottle.bind(this)
    this.setNumBottles = this.setNumBottles.bind(this)
    this.setLastDrink = this.setLastDrink.bind(this)
    this.onReset = this.onReset.bind(this)
  }

  storeNumBottles = async (numBottles) => {
    try {
      await AsyncStorage.setItem('numBottles', numBottles.toString());
    } catch (error) {
      // Error saving data
      console.log('Error saving data: ', error)
    }
  };

  storeLastDrink = async (lastDrink) => {
    try {
      await AsyncStorage.setItem('lastDrink', lastDrink.toString());
    } catch (error) {
      // Error saving data
      console.log('Error saving data: ', error)
    }
  };

  setLastDrink= async () => {
    try {
      const lastDrink = await AsyncStorage.getItem('lastDrink');

      console.log('lastDrink (string): ', lastDrink)

      if (lastDrink == null) {
        lastDrink = "0";
      }
      this.setState({ lastDrink: parseInt(lastDrink) })

    } catch (error) {

      console.log('Error setting lastDrink: ', error)
      this.setState({ lastDrink: 0 })

    }
  };


  setNumBottles = async () => {
    try {
      const numBottles = await AsyncStorage.getItem('numBottles');
      
      console.log('numBottles (string): ', numBottles)

      if (numBottles == null) {
        numBottles = "0";
      }
      this.setState({ numBottles: parseInt(numBottles) })

    } catch (error) {
      
      console.log('Error setting numBottles: ', error)
      this.setState({ numBottles: 0 })

    }
  };

  drankBottle(){

    prevBottles = this.state.numBottles;

    ts = new Date()

    this.setState(
      {
        numBottles: prevBottles + 1,
        lastDrink: ts.getTime()
      }
    );

    this.storeNumBottles(prevBottles + 1);
    this.storeLastDrink(ts.getTime());

  }

  onReset() {

    this.storeNumBottles(0);

    this.setState({numBottles: 0})

  }

  render() {
    return (
      <LinearGradient 
        colors={['#00C4CC', '#7B29E7']}
        style={styles.gradient}
      >
        <SafeAreaView>
        </SafeAreaView>
        <View
          style={styles.container}
        >
        
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'center',
              margin: 5
            }}
          >

            <Text 
              style={[
                styles.h1,
                {
                  fontSize: 80
                }
              ]}
            >
              {this.state.numBottles}
            </Text>
            <Text style={[styles.h2, {bottom: 13}]}> / {this.state.bottleGoal}</Text>
          </View>
          <Text style={styles.h2}>Bottles</Text>
          <TouchableOpacity
            style={styles.bigButton}
            onPress={this.drankBottle}
          >
            <Image
              source={require('./AddWaterIcon.png')}
              style={styles.waterImg}
            />
          </TouchableOpacity>
          <Text style={styles.h1}>{getAmountDrank(this.state.numBottles * this.state.bottleSizeOz)}</Text>
          
          {(this.state.lastDrink != 0) 
          
          ? 
            <Text style={styles.h2}>Drank Water {getTimestamp(this.state.lastDrink)}</Text>
          :
            <View/>

        }
          <TouchableOpacity
            style={styles.resetButton}
            onPress={this.onReset}
          >
            <Text style={[styles.h2, { color: '#e7e8fb'}]}>Reset</Text>
          </TouchableOpacity>
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
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  bigButton: {
    height: WIDTH * .7,
    width: WIDTH * .7,
    borderRadius: (WIDTH * .7) / 2 ,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  resetButton: {
    height: WIDTH * .15,
    width: WIDTH * .7,
    borderRadius: 27,
    backgroundColor: '#7278e8',
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