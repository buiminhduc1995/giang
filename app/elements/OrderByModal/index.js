import React, {Component} from 'react';
import {Image, StatusBar, Text, View, Platform} from 'react-native';
import vw from "../../utils/size-dynamic";
import {ICON_ARROW_DOWN} from "../../constants";
import ModalDropdown from "react-native-modal-dropdown";

class OrderByModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.defaultValue
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedValue: nextProps.defaultValue
    })
  }


  _onSelect = async (idx, value) => {
    await this.setState({
      selectedValue: value
    });
    await this.props.onSelect(idx, value);
  };

  render() {
    return (
      <ModalDropdown
        options={this.props.data}
        defaultValue={this.state.defaultValue}
        defaultIndex={0}
        animated={false}
        dropdownTextHighlightStyle={{
          color: '#666666'
        }}
        dropdownStyle={{
          width: vw(150),
          height: "auto",
          maxHeight: vw(120),
          borderRadius: 3,
          overflow: "hidden",
          marginTop: StatusBar.currentHeight - 5,
          // Shadow
          ...Platform.select({
            ios: {
              shadowColor: 'black',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.14,
              shadowRadius: 2,
            },
            android: {
              elevation: 8,
            },
          })
        }}
        dropdownTextStyle={{fontSize: vw(14), fontFamily: "Arial", paddingHorizontal: vw(15), color: '#666666'}}
        onSelect={this._onSelect}
      >
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Text style={{fontSize: vw(14), color: "#ffffff", fontFamily: "Arial", fontWeight:"bold", marginRight: vw(3)}}>{this.state.selectedValue}</Text>
          <Image source={ICON_ARROW_DOWN} style={{width: vw(8), resizeMode: "contain"}}/>
        </View>
      </ModalDropdown>
    );
  }
}

export default OrderByModal;