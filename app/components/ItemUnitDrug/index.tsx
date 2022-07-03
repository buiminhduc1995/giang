import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import styles from './ItemUnitDrug.styles';
import { themes } from '../../constants/';
import ModalDropdown from 'react-native-modal-dropdown';
import API from '../../api/';
import vw from '../../utils/size-dynamic';
type Props = {
  item: {
    unit_qty: number;
    max_price: string;
    inv_qty_alarm: number;
    indexValue: number;
    price_sell: number;
    unit: string;
  };
  index: any;
  onChangeModal: (a: any, b: any, c: any) => void;
  updateQuantity: (a: any, b: any) => void;
  updatePrice: Function;
  updateNote: Function;
  updatePriceSell: (a: any, b: any) => void;
  updateExchangeValue: () => void;
  deleted: () => void;
  type: any;
};
type State = {
  typeUnit: any;
  unit_qty: any;
  max_price: any;
  inv_qty_alarm: any;
  indexValue: any;
  price_sell: any;
};
class index extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      typeUnit: [],
      unit_qty: this.props.item.unit_qty === undefined ? 1 : this.props.item.unit_qty,
      max_price: this.props.item.max_price === undefined ? 1 : this.props.item.max_price,
      inv_qty_alarm: this.props.item.inv_qty_alarm === undefined ? 1 : this.props.item.inv_qty_alarm,
      indexValue: this.props.item.indexValue === undefined ? 0 : this.props.item.indexValue,
      // price_sell: this.props.item.price_sell === undefined ? 0 : this.props.item.price_sell,
    };
  }
  componentDidMount = () => {
    this.getTypeUnit();
  };
  getTypeUnit = async () => {
    try {
      const res = await API.warehouse.getUnitDrug();
      this.setState({ typeUnit: res.data });
      if (this.props.item.indexValue === undefined) {
        const getFruit = res.data.find((unit: any) => unit.code === this.props.item.unit);
        this.setState({ indexValue: res.data.indexOf(getFruit) });
      }
    } catch (error) {
      console.log(error);
    }
  };
  _onSelect = (idx: number, value: any) => {
    const { item } = this.props;
    this.setState({
      indexValue: idx,
    });
    this.props.onChangeModal(item, value, this.state.typeUnit[idx].code);
  };
  _renderModal = () => {
    const { typeUnit, indexValue } = this.state;
    const { item, index } = this.props;
    const listUnit = typeUnit.map((element: any) => {
      return element.value;
    });
    return (
      <ModalDropdown
        style={styles.modal}
        options={listUnit}
        defaultValue={listUnit[indexValue]}
        defaultIndex={index}
        dropdownStyle={[styles.styleModal, { height: listUnit.length > 100 ? 'auto' : -1 }]}
        dropdownTextStyle={styles.dropdownTextStyle}
        onSelect={(idx: number, value: any) => this._onSelect(idx, value)}
      >
        <View style={styles.wapperQuanlityDrug}>
          <Text style={styles.txtSelected}>{listUnit[indexValue]}</Text>
          <Image source={themes.ICON_CARET_DOWN} style={styles.iconCaretDown} />
        </View>
      </ModalDropdown>
    );
  };
  updateExchangeValue = (number: number) => {
    const { item, updateQuantity } = this.props;
    updateQuantity(item, number);
    this.setState({ unit_qty: number });
  };
  updateNoteValue = (inv_qty_alarm: string) => {
    const { item, updateNote } = this.props;
    updateNote(item, inv_qty_alarm);
    this.setState({ inv_qty_alarm: inv_qty_alarm });
  };
  updatePriceSellValue = (max_price: number) => {
    const { item, updatePriceSell } = this.props;
    updatePriceSell(item, max_price);
    this.setState({ max_price: max_price });
  };
  render() {
    const { deleted, type } = this.props;
    const { unit_qty, inv_qty_alarm, max_price } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.right}>
          <View style={styles.row}>
            <View style={styles.leftRow}>
              <Text style={styles.txt14}>Đơn vị quy đổi</Text>
            </View>
            <View style={styles.wapper}>{this._renderModal()}</View>
          </View>
          <View style={styles.row}>
            <View style={styles.leftRow}>
              <Text style={styles.txt14}>Giá trị quy đổi</Text>
            </View>
            <View style={styles.wapper}>
              <TextInput
                style={styles.input}
                value={unit_qty && unit_qty.toString()}
                onChangeText={this.updateExchangeValue}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.leftRow}>
              <Text style={styles.txt14}>Giá bán</Text>
            </View>
            <View style={styles.wapper}>
              <TextInput
                style={styles.input}
                value={max_price && max_price.toString()}
                onChangeText={this.updatePriceSellValue}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.leftRow}>
              <Text style={styles.txt14}>Cảnh báo tồn kho</Text>
            </View>
            <View style={styles.wapper}>
              <TextInput
                style={styles.input}
                value={inv_qty_alarm && inv_qty_alarm.toString()}
                onChangeText={this.updateNoteValue}
              />
            </View>
          </View>
        </View>
        <View style={styles.left}>
          <View />
          <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} onPress={deleted}>
            <Image source={themes.ICON_CANCEL_IMPORT} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default index;
