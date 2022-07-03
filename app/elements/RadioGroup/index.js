import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import vw from "../../utils/size-dynamic";
import {MAIN_COLOR} from "../../constants";

export class RadioItem extends React.PureComponent {
  constructor(props){
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
    return(
      <TouchableOpacity style={{flexDirection: "row", alignItems: "center", marginBottom: vw(10)}}
        onPress={this.props.onPress}
      >
        <View
          style={{
            width: vw(16),
            height: vw(16),
            borderColor: this.state.isChecked ? MAIN_COLOR : "#BDBDBD",
            borderRadius: vw(16),
            borderWidth: vw(2),
            justifyContent: "center",
            alignItems: "center",
            marginRight: vw(10)
          }}
        >
          {this.state.isChecked && <View style={{width: vw(8), height: vw(8), backgroundColor: MAIN_COLOR, borderRadius: vw(8)}}/>}
        </View>
        <Text style={{fontSize: vw(14), color: this.state.isChecked ? MAIN_COLOR : "#828282"}}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

class RadioGroup extends React.Component {
  render() {
    return (
      <View>
        {this.props.children}
      </View>
    );
  }
}

export default RadioGroup;