import React, { Component } from 'react';
import { TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';

const WIDTH = Dimensions.get('screen').width;

export default class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: WIDTH
          }}
          onPress = {() => this.props.navigation.navigate('SettingsPage')}
        >
          <Image
            source={require('./SettingsIcon.png')}
            style={styles.settingsImg}
          />
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  settingsImg: {
    height: WIDTH * .1,
    width: WIDTH * .1,
    borderRadius: WIDTH * .1 / 2,
    margin: 10,
    tintColor: '#e7e8fb'
  },
})
