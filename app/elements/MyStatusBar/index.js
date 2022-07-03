import React, { Component } from 'react';
import { View, StatusBar, Platform, Dimensions } from 'react-native';
import { MAIN_COLOR } from '../../constants';

const STATUSBAR_HEIGHT = getStatusBarHeight(true);
console.log('Status Bar', STATUSBAR_HEIGHT);

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812 || dimen.height === 896 || dimen.width === 896)
  );
}
export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}
export function getStatusBarHeight(safe) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
  });
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}

export const MyStatusBar = ({ backgroundColor, ...props }: { backgroundColor?: string }) => (
  <View style={{ height: STATUSBAR_HEIGHT - 5, backgroundColor: backgroundColor ? backgroundColor : MAIN_COLOR }}>
    <StatusBar
      translucent
      backgroundColor="rgba(0,0,0,0)"
      hidden={false}
      barStyle={props.barStyle || 'light-content'}
      {...props}
    />
  </View>
);
