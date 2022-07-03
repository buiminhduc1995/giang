import React, { PureComponent } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from './ItemDetailCheckInventory.styles';
import { themes } from '../../constants/index';
type Props = {
  item: {
    drg_drug_name: string;
    lot: string;
    quantity: number;
    cur_qty: number;
    cur_quantity: number;
  };
  type: any;
  deleted: () => void;
  note: () => void;
};
class index extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  _renderCenter = () => {
    const { item, type } = this.props;
    const text = type === 'Check' ? item.cur_qty : type === 'History' ? item.cur_quantity : null;
    return (
      <View>
        <Text style={styles.title}>{item.drg_drug_name}</Text>
        <View style={styles.row}>
          <Text style={styles.detail}>Lô sản xuất</Text>
          <Text style={styles.lot}>{item.lot}</Text>
        </View>
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
          <View style={styles.row}>
            <Text style={styles.detail}>Hệ thống</Text>
            <View style={styles.waperText}>
              <Text style={styles.txtInput}>{item.quantity}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.detail}>Trong kho</Text>
            <View style={styles.waperText}>
              <Text style={styles.txtInput}>{text ? text : ''}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  _renderRight = () => {
    const { type, item } = this.props;
    if (type === 'History') {
      return (
        <View style={styles.viewRight}>
          <Text style={styles.txtRight}>Đã kiểm kho</Text>
        </View>
      );
    }
    if (type === 'Check') {
      return (
        <View style={styles.rightCheck}>
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            onPress={this.props.note}
            style={styles.viewRight}
          >
            <Text style={styles.txtRight}>Thêm thông tin</Text>
          </TouchableOpacity>
          {item.cur_qty && (
            <TouchableOpacity onPress={this.props.deleted}>
              <Image source={themes.ICON_TRASH} style={styles.iconTrash} resizeMode="contain" />
            </TouchableOpacity>
          )}
        </View>
      );
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Image source={themes.IMAGE_DRUG} style={styles.image} />
        <View style={styles.center}>{this._renderCenter()}</View>
        <View style={styles.right}>{this._renderRight()}</View>
      </View>
    );
  }
}

export default index;
