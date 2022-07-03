import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { themes } from '../../constants';
import MoneyFormat from '../../utils/MoneyFormat';
import styles from './ItemProductImportNew.styles';
import Entypo from 'react-native-vector-icons/Entypo';
import vw from '../../utils/size-dynamic';
interface Props {
  item: any;
  type: string;
  note: any;
  selectedProduct: () => void;
  unSelectedProduct: () => void;
  deletedProduct: () => void;
}
interface State {}

class ItemProductImportNew extends PureComponent<Props, State> {
  _renderRight = () => {
    const { type, item } = this.props;
    if (type === 'modal' || type === 'modalDQG') {
      return (
        <View style={styles.containerRight}>
          <View style={styles.wapperRight}>
            {/* <View /> */}
            <TouchableOpacity onPress={this.props.note} style={[styles.viewRight]}>
              {item.flag === 1 || item.hasOwnProperty('price') ? (
                <Entypo name="pencil" size={vw(20)} color={themes.colors.MAIN_COLOR} />
              ) : (
                <Entypo name="pencil" size={vw(20)} color={themes.colors.MAIN_COLOR} />
              )}
            </TouchableOpacity>
          </View>
          {item.flag === 1 && (
            <TouchableOpacity onPress={this.props.deletedProduct}>
              <Image source={themes.ICON_TRASH} style={styles.buttonIcon} resizeMode="contain" />
            </TouchableOpacity>
          )}
        </View>
      );
    }
    if (type === 'productselect') {
      return (
        <View style={styles.containerRight}>
          <View style={styles.wapperRight}>
            {/* <View /> */}
            <TouchableOpacity style={[styles.buttonNote]} onPress={this.props.note}>
              {item.flag === 1 || item.hasOwnProperty('price') ? (
                <Entypo name="pencil" size={vw(20)} color={themes.colors.MAIN_COLOR} />
              ) : (
                <Entypo name="pencil" size={vw(20)} color={themes.colors.MAIN_COLOR} />
              )}
            </TouchableOpacity>
            <Text style={styles.txtTypeDrug}>
              {item.hasOwnProperty('source') ? 'Thuốc thêm mới' : 'Thuốc trong kho'}
            </Text>
          </View>
          <TouchableOpacity onPress={this.props.deletedProduct}>
            <Image source={themes.ICON_TRASH} style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>
      );
    }
  };

  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity onPress={this.props.note} style={styles.container}>
        <Image source={themes.IMAGE_DRUG} style={styles.image} />
        <View style={styles.itemContentWapper}>
          <Text numberOfLines={2} style={styles.txtName}>
            {item.drg_drug_name ? item.drg_drug_name : item.drg_name}
          </Text>
          <Text style={styles.text} numberOfLines={2}>
            {item.company_name ? item.company_name.replace('Công ty', '') : '<Đang cập nhật>'}
          </Text>
          {item.package_desc ? (
            <Text style={styles.text} numberOfLines={1}>
              {item.package_desc}
            </Text>
          ) : null}
          {item.import_unit_price || item.price ? (
            <Text style={styles.txtPrice}>
              Giá nhập:{' '}
              <Text style={{ color: 'red' }}>
                {item.price ? MoneyFormat(item.price) : MoneyFormat(item.import_unit_price)}
                {`/${item.unit_name || item.unit}`}
              </Text>
            </Text>
          ) : null}
          {item.quantity || item.import_qty ? (
            <Text style={styles.amount}>
              Nhập: <Text>{item.quantity ? item.quantity : item.import_qty}</Text>
              <Text> {item.unit_name ? item.unit_name : item.unit}</Text>
            </Text>
          ) : null}
        </View>
        <View>{this._renderRight()}</View>
      </TouchableOpacity>
    );
  }
}
export default ItemProductImportNew;
