/**
 * Ngo Dang Truong
 * https://github.com/truongngodang
 * 8:15 AM - 6/9/2018
 * @flow
 */
import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';

import size from '../../utils/size-dynamic';

class ButtonGradient extends React.PureComponent  {

  constructor(props) {
    super(props);
  }

  render() {
    let {style} = this.props;
    return (
      <TouchableOpacity onPress={this.props.onPress} disabled={this.props.disabled || false}>
        <LinearGradient
          colors={this.props.colors || ['#58c4be', '#45aa4b']}
          start={{x: 0, y: 0}} end={{x: 1, y: 1}}
          style={[style]}
        >
          <Text style={{color: "#ffffff", fontWeight: "bold", fontSize: this.props.fontSize || size(14)}}>{this.props.title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

ButtonGradient.propsTypes = {
  onPress: PropTypes.func,
};

export default ButtonGradient;
