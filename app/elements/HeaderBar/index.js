import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import vw from '../../utils/size-dynamic';
import {MAIN_COLOR} from "../../constants";

class HeaderBar extends React.PureComponent  {
  static propTypes = {
    style: PropTypes.object,
    left: PropTypes.element,
    wrapLeft: PropTypes.object,
    right: PropTypes.element,
    wrapRight: PropTypes.object,
  };


  _renderLeft() {
    return this.props.left;
  }

  _renderRight() {
    return this.props.right;
  }

  render() {
    return (
      <View style={{ ...styles.container, ...this.props.style }}>
        <View style={{ ...styles.wrapLeft, ...this.props.wrapLeft }}>
          {this._renderLeft()}
        </View>
        <View style={{ ...styles.wrapRight, ...this.props.wrapRight }}>
          {this._renderRight()}
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    height: vw(50),
    paddingHorizontal: vw(10),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: MAIN_COLOR,
    overflow: "visible"
  }
};

export default HeaderBar;