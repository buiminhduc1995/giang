import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ICON_CHECKED} from "../../constants";
import vw from '../../utils/size-dynamic';

class CheckBox extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.checked
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isChecked: nextProps.checked
    })
  }

  render() {
    return (
      <TouchableOpacity style={this.props.style} onPress={this.props.onPress}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <View
            style={{
              width: vw(15),
              height: vw(15),
              backgroundColor: "#ffffff",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: vw(3),
              marginRight: vw(8)
            }}
          >
            {this.state.isChecked && <Image source={ICON_CHECKED} style={{width: vw(10), height: vw(10), resizeMode: "contain"}}/>}
          </View>
          <Text style={{fontFamily: "Arial", color: "#ffffff", fontSize: vw(13)}}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default CheckBox;