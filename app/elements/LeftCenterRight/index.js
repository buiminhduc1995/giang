import PropTypes from 'prop-types';
import React from 'react';
import { View} from 'react-native';

export default class LeftCenterRight extends React.PureComponent {
  static propTypes = {
    body: PropTypes.element,
    bodyStyle: PropTypes.object,
    containerStyle: PropTypes.object,
    left: PropTypes.element,
    leftStyle: PropTypes.object,
    right: PropTypes.element,
    rightStyle: PropTypes.object,
  };

  setNativeProps(nativeProps) {

  }

  renderLeft() {
    return this.props.left;
  }

  renderRight() {
    return this.props.right;
  }

  renderBody() {
    return this.props.body;
  }

  render() {
    return (
      <View style={{ ...styles.rootContainer, ...this.props.style }}>
        <View style={{ ...styles.leftContainer, ...this.props.leftStyle }}>
          {this.renderLeft()}
        </View>
        <View style={{ ...styles.bodyContainer, ...this.props.bodyStyle }}>
          {this.renderBody()}
        </View>
        <View style={{ ...styles.rightContainer, ...this.props.rightStyle }}>
          {this.renderRight()}
        </View>
      </View>
    );
  }
}

const styles = {
  rootContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftContainer: {
    flex: 0,
  },

  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  rightContainer: {
    flex: 0,
  },
};
