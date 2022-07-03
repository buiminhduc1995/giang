/**
 * Ngo Dang Truong
 * https://github.com/truongngodang
 * 8:15 AM - 6/9/2018
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';

class ButtonBorderIcon extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    let { style,styleText,styleIcon,onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={[styles.container,style]}>
        <Image source={this.props.icon} style={[styles.icon,styleIcon]}/>
        <Text style={[{fontSize: this.props.fontSize},styleText]}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    padding: 5,
    margin: 5,
    justifyContent:'center',
    alignItems:'center',
  },
  icon:{
    width:15,
    height:15,
    margin:3
  }
})

export default ButtonBorderIcon;
