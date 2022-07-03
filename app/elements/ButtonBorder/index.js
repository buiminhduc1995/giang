/**
 * Ngo Dang Truong
 * https://github.com/truongngodang
 * 8:15 AM - 6/9/2018
 * @flow
 */

import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity, View,
} from 'react-native';
import PropTypes from 'prop-types';
import size from '../../utils/size-dynamic';
class ButtonBorder extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    let {style} = this.props;
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View
          style={
            [style,
              {
                height: size(30),
                paddingHorizontal: size(23),
                borderRadius: size(30),
                borderColor:"#ffffff",
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center"
              }
            ]
          }
        >
          <Text style={{color: "#ffffff", fontWeight: "bold", fontSize: this.props.fontSize}}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

ButtonBorder.propsTypes = {
  onPress: PropTypes.func,
};

export default ButtonBorder;
