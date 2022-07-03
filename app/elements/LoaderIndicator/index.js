import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

class LoaderIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: props.loading,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.loading !== nextProps.loading) {
      this.setState({
        loading: nextProps.loading,
      });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <View style={[styles.modalBackground]}>
            <View style={styles.activityIndicatorWrapper}>
              {/* <WaveIndicator color='white' waveMode='outline' /> */}
              {/* <WaveIndicator color='white' count={2} waveFactor={0.4} /> */}
              <ActivityIndicator size="large" color="#00ff00" />
            </View>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0, 0, 0, .2)',
  },
  activityIndicatorWrapper: {
    // backgroundColor: 'rgba(0, 0, 0, .3)',
    height: 50,
    width: 100,
    borderRadius: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default LoaderIndicator;
