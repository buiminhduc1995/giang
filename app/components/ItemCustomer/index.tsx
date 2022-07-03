import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { themes } from '../../constants/';
import styles from './ItemCustomer.style';
import vw from '../../utils/size-dynamic/';
import { Navigation } from '../../dataType/index.d';
type Props = {
  navigation: Navigation;
  type: any;
  item: any;
  onPressSelected: () => void;
  onPressDetailButton: () => void;
};
class ItemCustomer extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  renderRight = () => {
    const { type } = this.props;
    if (type === 'customer') {
      return (
        <TouchableOpacity style={styles.buttonSelectCustomer} onPress={this.props.onPressSelected}>
          <Text style={styles.txtSelected}>Chọn</Text>
        </TouchableOpacity>
      );
    }
    if (type === 'provider') {
      return (
        <TouchableOpacity style={styles.buttonSelectCustomer} onPress={this.props.onPressSelected}>
          <Text style={styles.txtSelected}>Chọn</Text>
        </TouchableOpacity>
      );
    }
    if (type === 'customer_detail') {
      return (
        <TouchableOpacity onPress={this.props.onPressDetailButton} style={styles.button}>
          <Text style={styles.txtSelected}>Chi tiết</Text>
        </TouchableOpacity>
      );
    }
  };
  _renderContent = () => {
    const { item, type } = this.props;
    const source = type === 'customer' ? themes.ICON_PERSON : type === 'provider' ? themes.ICON_SUPPLIER : null;
    const valueText1 = type === 'customer' ? item.customer_name : type === 'provider' ? item.provider_name : null;
    const valueText2 = type === 'customer' ? 'Điện thoại: ' : type === 'provider' ? 'Mã NCC: ' : null;
    const valueText3 = type === 'customer' ? item.phone_no : type === 'provider' ? item.provider_code : null;
    return (
      <View style={styles.containerContent}>
        <View style={styles.left}>
          <Image source={source} style={{ width: vw(32), height: vw(32) }} />
          <View style={{ marginLeft: vw(10) }}>
            <Text style={styles.title} numberOfLines={1}>
              {valueText1}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.txtPhone, { color: themes.colors.COLOR_INPUT_PRICE }]}>{valueText2}</Text>
              <Text style={[styles.txtPhone, { color: themes.colors.BLUE }]}>
                {valueText3 ? valueText3 : 'Đang cập nhật'}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.right}>
          {this.renderRight()}
          <Text style={styles.txtTime}>{item.time}</Text>
        </View>
      </View>
    );
  };
  render() {
    return <View style={{ flex: 1, paddingHorizontal: vw(10), marginTop: vw(5) }}>{this._renderContent()}</View>;
  }
}

export default ItemCustomer;
