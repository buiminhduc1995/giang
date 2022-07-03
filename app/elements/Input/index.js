import React, { Component } from 'react';
import {
  TextInput,
} from 'react-native';
import dp from "../../utils/size-dynamic";
import PropTypes from "prop-types";

class Input extends React.PureComponent  {

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue || ""
    }
  }


  async _onTextChange(text) {
    await this.setState({
      value: text
    });
    return this.props.onChange(text);
  }

  render() {
    return (
      <TextInput
        style={[{
          width: '100%',
          height: dp(45),
          paddingHorizontal: dp(10),
          backgroundColor: '#f2f2f2',
          borderRadius: dp(6),
          color: '#333333',
          fontFamily: 'Arial'
        }, this.props.style]}
        editable={this.props.editable}
        maxLength={this.props.maxLength || 100}
        onChangeText={(text) => this._onTextChange(text)}
        placeholder={this.props.placeholder}
        placeholderTextColor={this.props.placeholderTextColor || 'rgba(255, 255, 255, .5)'}
        selectionColor={this.props.selectionColor || "#333333"}
        underlineColorAndroid="transparent"
        value={this.state.value}
        secureTextEntry={this.props.secureTextEntry}
        autoCapitalize={this.props.autoCapitalize}
        keyboardType={this.props.keyboardType}
        defaultValue={this.props.defaultValue || ""}
      />
    );
  }
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default Input;