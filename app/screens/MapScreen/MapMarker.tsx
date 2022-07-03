import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { ICON_MAP_PIN } from '../../constants';

class MapMarker extends React.PureComponent {
  render() {
    return (
      <View style={{ width: 30, height: 30 }}>
        <Image source={ICON_MAP_PIN} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
      </View>
    );
  }
}

export default MapMarker;
