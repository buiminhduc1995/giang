import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { themes } from '../../constants/';
import styles from './ItemProductPortfolio.style';
import vw from '../../utils/size-dynamic';
import ModalDropdown from 'react-native-modal-dropdown';
import { PRODUCT_DETAIL_SCREEN } from '../../redux/types';
import countDate from '../../utils/countDate';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import { Navigation } from '../../dataType/index.d';
import MoneyFormat from '../../utils/MoneyFormat';
type Props = {
  item: {
    index_unit: Number;
    quantity: string;
    units: any;
    expired_date: any;
    discount: any;
    drg_drug_name: string;
    lot: any;
    unit_name: string;
    price: number;
    flag: number;
  };
  selectedProduct: Function;
  unSelectedProduct: Function;
  type: any;
  note: () => void;
  deletedProduct: () => void;
  addProduct: () => void;
  deleteProduct: () => void;
  navigation: Navigation;
  callTotalAmount: () => void;
  updatePrice: () => void;
  updateQuantity: () => void;
};
type State = {
  index: any;
  textInput: string;
  selected: boolean;
  showTextInput: boolean;
  quantity: any;
};

class ItemProductPortfolio extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      textInput: '1',
      selected: false,
      showTextInput: true,
      index: this.props.item.index_unit == undefined ? 0 : this.props.item.index_unit,
      quantity: this.props.item.quantity == undefined ? 1 : this.props.item.quantity,
    };
  }

  onPressSelected = () => {
    const { item } = this.props;
    const { index } = this.state;
    this.setState({ selected: true });
    if (item.units[index].inv_qty < 1) {
      item.quantity = item.units[index].inv_qty;
    } else {
      item.quantity = 1;
    }
    item.index_unit = index;
    this.props.selectedProduct(item);
  };
  onPressUnSeclected = () => {
    const { item } = this.props;
    this.setState({ selected: false });
    this.props.unSelectedProduct(item);
  };
  renderTextExp = (value: Number) => {
    let color, title;
    if (value <= 0) {
      (color = themes.colors.MAIN_COLOR), (title = 'HSD: ' + value.toString().replace('-', '') + ' ngày');
    } else if (value < -90 && value > 0) {
      (color = themes.colors.YELLOW), (title = 'hsd:' + value.toString().replace('-', '') + ' ngày');
    } else {
      (color = themes.colors.RED), (title = 'Hết hạn');
    }
    return (
      <View style={[styles.viewExpDate, { backgroundColor: color }]}>
        <Text style={styles.txtExpDate}>{title}</Text>
      </View>
    );
  };
  _onSelect = (idx: number, value: any) => {
    const { type, item } = this.props;
    if (type === 'ProductSelected') {
      item.index_unit = idx;
      if (item.units[idx].inv_qty < 1) {
        item.quantity = item.units[idx].inv_qty;
        this.props.callTotalAmount();
        Alert.alert('Sản phẩm trong kho đã hết hàng');
        this.setState({ quantity: item.units[idx].inv_qty });
      } else {
        item.quantity = 1;
        this.props.callTotalAmount();
        this.setState({ quantity: 1 });
      }
    }
    this.setState({
      index: idx,
    });
  };
  _renderModal = () => {
    const { index } = this.state;
    const { item } = this.props;
    const listUnit = item.units.map((element: any) => {
      return element.unit_name;
    });
    return (
      <ModalDropdown
        options={Object.values(listUnit)}
        defaultValue={listUnit[index]}
        defaultIndex={Number(index)}
        dropdownStyle={[styles.styleModal, { height: listUnit.length > 4 ? 'auto' : -1 }]}
        dropdownTextStyle={styles.dropdownTextStyle}
        onSelect={(idx: number, value: any) => this._onSelect(idx, value)}
      >
        <View style={styles.wapperQuanlityDrug}>
          <Text style={styles.txtModal}>{listUnit[index]}</Text>
          <Image source={themes.ICON_CARET_DOWN} style={styles.iconCaretDown} />
        </View>
      </ModalDropdown>
    );
  };
  _renderRight = () => {
    const { type, item } = this.props;
    const { selected, index } = this.state;
    const value =
      item.units[index].inv_qty >= 10
        ? 'Còn hàng'
        : item.units[index].inv_qty < 10 && item.units[index].inv_qty > 0
        ? 'Sắp hết hàng'
        : 'Hết hàng';
    const background =
      item.units[index].inv_qty >= 10
        ? themes.colors.MAIN_COLOR
        : item.units[index].inv_qty < 10 && item.units[index].inv_qty > 0
        ? themes.colors.YELLOW
        : themes.colors.RED;
    if (type === 'getList') {
      return (
        <View style={styles.containerGetList}>
          <FontAwesome5 name="cart-plus" size={vw(20)} color={themes.colors.MAIN_COLOR} />
          {value !== 'Hết hàng' && (
            <Text
              style={[
                styles.txtDate,
                { color: countDate(item.expired_date) < 0 ? themes.colors.RED : themes.colors.MAIN_COLOR },
              ]}
            >
              {countDate(item.expired_date)}
            </Text>
          )}
          <View style={[styles.statusProduct]}>
            <Text style={[styles.txtStatus, { color: background, fontStyle: 'italic', fontSize: vw(12) }]}>
              {value}
            </Text>
          </View>
        </View>
      );
    }
    if (type === 'ProductSelected') {
      return (
        <View style={styles.containerGetList}>
          <View style={styles.rowRight}>
            <View />
            <TouchableOpacity style={styles.buttonNote} onPress={this.props.note}>
              <Text style={styles.txtNote}>{type === 'ProductSelected' ? 'Ghi chú' : 'Nhập thông tin'}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.wapperButtonTrash} onPress={this.props.deletedProduct}>
            <Image source={themes.ICON_TRASH} style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>
      );
    }
    if (type === 'ItemBarcodeDetect') {
      return (
        <View style={styles.column}>
          <View style={styles.rowRight}>
            <View />
            <TouchableOpacity style={styles.buttonBarCode} onPress={this.props.addProduct}>
              <Text style={[styles.textButton]}>Thêm</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.wapperButtonTrash} onPress={this.props.deleteProduct}>
            <Image source={themes.ICON_TRASH} style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>
      );
    }
    if (type === 'AddProductNew') {
      return (
        <View style={styles.containerGetList}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View />
            <TouchableOpacity
              onPress={selected ? this.onPressUnSeclected : this.onPressSelected}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              style={[
                styles.buttonCheck,
                { backgroundColor: selected ? themes.colors.MAIN_COLOR : themes.colors.WHITE },
              ]}
            >
              {selected ? (
                <Text style={styles.txtSelected}>Đã chọn</Text>
              ) : (
                <Text style={styles.txtUnSelected}>Chọn</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            {value !== 'Hết hàng' && (
              <Text
                style={[
                  styles.txtDate,
                  { color: countDate(item.expired_date) < 0 ? themes.colors.RED : themes.colors.MAIN_COLOR },
                ]}
              >
                {countDate(item.expired_date)}
              </Text>
            )}
          </View>

          <View style={[styles.statusProduct]}>
            <Text style={[styles.txtStatus, { color: background, fontStyle: 'italic', fontSize: vw(12) }]}>
              {value}
            </Text>
          </View>
        </View>
      );
    }
  };

  _renderItemContent = () => {
    const { item, type } = this.props;
    const { index } = this.state;
    if (type === 'AddProductNew' || type === 'getList') {
      return (
        <View style={styles.ItemContentWapper}>
          <View>
            <Text style={styles.txtName} numberOfLines={2}>
              {item.drg_drug_name}
            </Text>
            <Text style={styles.txtLot}>Lô: {item.lot}</Text>
            {this._renderPirce()}
          </View>
          <View style={styles.ItemContentLayout}>
            <View style={styles.ItemContentLayout}>
              <Text style={{ fontSize: vw(10) }}>Còn</Text>
              <View style={[styles.wapperQuanlity, { marginLeft: vw(5), width: vw(40) }]}>
                <TextInput
                  style={[styles.inputUpdateQuanlity, { width: vw(40) }]}
                  onChangeText={this.updateQuantityProduct}
                  underlineColorAndroid={'rgba(0,0,0,0)'}
                  keyboardType={'numeric'}
                  selectionColor={'#828282'}
                  value={item.units[index].inv_qty.toString()}
                  editable={false}
                />
                <Image source={themes.ICON_CARET_DOWN} style={styles.iconCaretDown} />
              </View>
            </View>
            {this._renderModal()}
          </View>
        </View>
      );
    }
    if (type === 'ItemBarcodeDetect') {
      return (
        <View style={styles.ItemContentWapper}>
          <View>
          <Text style={styles.txtName} numberOfLines={2}>
              {item.drg_drug_name}
            </Text>
            {this._renderPirce()}
          </View>
          <View style={styles.ItemContentLayout}>
            <View style={[styles.wapperQuanlity, { width: vw(40) }]}>
              <TextInput
                style={[styles.inputUpdateQuanlity, { width: vw(40) }]}
                value={item.quantity}
                underlineColorAndroid={'rgba(0,0,0,0)'}
                keyboardType={'numeric'}
                selectionColor={'#828282'}
                editable={true}
                onChangeText={text => {
                  this.setState({ quantity: text });
                  item.quantity = text;
                }}
              />
              <Image source={themes.ICON_CARET_DOWN} style={styles.iconCaretDown} />
            </View>
            {this._renderModal()}
          </View>
        </View>
      );
    }
    if (type === 'ProductSelected') {
      return (
        <View style={styles.ItemContentWapper}>
          <View>
          <Text style={styles.txtName} numberOfLines={2}>
              {item.drg_drug_name}
            </Text>
            {this._renderPirce()}
            {item.discount && item.discount !== 0 ? (
              <Text style={{ color: themes.colors.YELLOW, fontSize: vw(10) }}>
                {item.flag === 1 ? 'Hàng khuyến mãi' : 'Giảm giá' + MoneyFormat(item.discount)}
              </Text>
            ) : null}
          </View>
          <View style={styles.ItemContentLayout}>
            <View>
              <View style={[styles.wapperQuanlity, { width: vw(60) }]}>
                <TextInput
                  style={[styles.inputUpdateQuanlity, { width: vw(60) }]}
                  onChangeText={this.updateQuantityProduct}
                  value={this.state.quantity.toString()}
                  underlineColorAndroid={'rgba(0,0,0,0)'}
                  keyboardType={'numeric'}
                  selectionColor={'#828282'}
                />
                <Image source={themes.ICON_CARET_DOWN} style={styles.iconCaretDown} />
              </View>
            </View>
            {this._renderModal()}
          </View>
        </View>
      );
    }
  };

  _renderPirce = () => {
    const { item, type } = this.props;
    const { showTextInput, index } = this.state;
    if (type === 'AddProductNew' || type === 'getList') {
      return (
        <View>
          {item.units[index].price ? (
            <Text style={styles.txtPrice}>{MoneyFormat(item.units[index].price)}</Text>
          ) : (
            <Text style={styles.txtPrice}>Nhập giá ngay</Text>
          )}
        </View>
      );
    }
    if (type === 'ProductSelected') {
      return (
        <View>
          {item.units[index].price && item.units[index].price !== 0 ? (
            <Text style={styles.txtPrice}>{MoneyFormat(item.units[index].price)}</Text>
          ) : showTextInput ? (
            <TouchableOpacity style={styles.button} onPress={() => this.hiddenButton()}>
              <Text style={styles.textButton}>Nhập giá ngay</Text>
            </TouchableOpacity>
          ) : (
            <TextInput
              onChangeText={this.updatePriceProduct}
              keyboardType={'numeric'}
              style={styles.txtInput}
              placeholder="Nhập giá sản phẩm"
            />
          )}
        </View>
      );
    }
    if (type === 'ItemBarcodeDetect') {
      return <Text style={styles.txtPrice}>{MoneyFormat(item.price)}</Text>;
    }
  };
  updateQuantityProduct = (number: number) => {
    const { item, updateQuantity } = this.props;
    const { index } = this.state;
    if (number > item.units[index].inv_qty) {
      Alert.alert(
        'Thông báo',
        'Trong kho hiện tại còn ' + '' + item.units[index].inv_qty + ' ' + item.units[index].unit_name,
        [
          {
            text: 'Đồng ý',
            onPress: () => {
              this.setState({ quantity: item.units[index].inv_qty });
            },
          },
        ],
        { cancelable: false },
      );
      updateQuantity(item, item.units[index].inv_qty);
    } else {
      updateQuantity(item, number);
      this.setState({ quantity: number });
    }
  };
  updatePriceProduct = (price: string) => {
    const { item, updatePrice } = this.props;
    const { index } = this.state;
    updatePrice(
      item,
      item.units[index].price === null ? (item.units[index].price = price) : (item.units[index].price = price),
      item.units[index].price === null ? (item.units[index].isUpdate = true) : (item.units[index].isUpdate = true),
    );
  };
  hiddenButton = () => {
    this.setState({ showTextInput: !this.state.showTextInput });
  };

  render() {
    const { item, type, navigation } = this.props;
    return (
      <View style={{ flex: 1, paddingBottom: vw(5) }}>
        <TouchableOpacity
          disabled={type === 'AddProductNew' ? true : false}
          style={styles.container}
          onPress={() => navigation.navigate(PRODUCT_DETAIL_SCREEN, { data: item, editProduct: true })}
        >
          <View style={{ flexDirection: 'row', flex: 7 }}>
            <Image source={themes.IMAGE_DRUG} style={styles.image} />
            {this._renderItemContent()}
          </View>
          {this._renderRight()}
        </TouchableOpacity>
      </View>
    );
  }
}
export default ItemProductPortfolio;
