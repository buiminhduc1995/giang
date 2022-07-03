import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';

/**
 * Grapes Alert Component React Native.
 */
class GrapesAlert extends React.PureComponent  {

  constructor(props, context) {
    super(props, context);
    this.state = {
      isShow: false,
      fade: new Animated.Value(0),
      scale: new Animated.Value(0)
    };
  }

  /**
   * Show Alert
   */
  show = async () => {
    await this.setState({
      isShow: true
    });
    this.state.fade.setValue(0);
    this.state.scale.setValue(0);
    return new Promise(resolve => {
      Animated.parallel(
        [
          Animated.timing(
            this.state.fade,
            {
              toValue: 1,
              duration: 180,
              easing: Easing.linear,
            }
          ),
          Animated.timing(
            this.state.scale,
            {
              toValue: 1,
              duration: 180,
              easing: Easing.linear
            },
          )
        ],
        {
          useNativeDriver: true
        }
      ).start(() => resolve());
    })
  };

  /**
   * Close Alert
   */
  close = async () => {
    this.state.fade.setValue(1);
    this.state.scale.setValue(1);
    return new Promise(resolve => {
      Animated.parallel(
        [
          Animated.timing(
            this.state.fade,
            {
              toValue: 0,
              duration: 180,
              easing: Easing.linear
            }
          ).start(),
          Animated.timing(
            this.state.scale,
            {
              toValue: 0,
              duration: 180,
              easing: Easing.linear
            }
          )
        ],
        {
          useNativeDriver: true
        }
      ).start(() => {
        this.setState({isShow: false});
        this.props.onClose && this.props.onClose();
        return resolve();
      });
    })
  };

  render() {
    const {style, contentStyle, children} = this.props;
    const {isShow, fade, scale} = this.state;
    const containerAnimate = {
      backgroundColor: fade.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, .45)']
      })
    };
    const contentAnimate = {
      transform: [
        {
          scale: scale.interpolate({
            inputRange: [0, 1],
            outputRange: [.85, 1]
          })
        }
      ],
      opacity: fade.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })
    };
    if (!isShow) return null;
    return (
      <TouchableOpacity
        onPress={this.props.pressOutContent?this.close:null}
        style={styles.root}
        activeOpacity={1}
      >
        <Animated.View style={[styles.container, style, containerAnimate]}>
          <TouchableOpacity activeOpacity={1}>
            <Animated.View style={[styles.wrapContent, contentStyle, contentAnimate]}>
              {children || <Text>Grapes Alert</Text>}
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    );
  }

}

GrapesAlert.defaultProps = {
  pressOutContent: false,
};

GrapesAlert.propTypes = {
  /**
   * @property {object} style - style for wrapper.
   */
  style: PropTypes.object,
  /**
   * @property {element} children - content inner Alert content.
   */
  children: PropTypes.node.isRequired,
  /**
   * @property {bool} children - press out content will close Alert
   */
  pressOutContent: PropTypes.bool
};

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .45)',
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  wrapContent: {
    backgroundColor: '#ffffff',
    width: '100%'
  }
});

export default GrapesAlert;