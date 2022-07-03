import React, { PureComponent } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import vw from '../../utils/size-dynamic';
import { ICON_ARROW_DROP, themes } from '../../constants';
import DatePicker from 'react-native-datepicker';
import ModalDropdown from 'react-native-modal-dropdown';
const tax = ['Không thuế', '0%', '5%', '10%'];
const quality = ['Hộp', 'Lọ', 'Vỉ'];
import API from '../../api';
import { addProductNewBusiness } from '../../redux/action/inventory';
import { getUnitType } from '../../redux/action/dataPersist';
type Props = {
  item: any;
  info: any;
  valueCode: string;
  addProductNewBusiness: Function;
};
type State = {
  modalVisible: boolean;
  lot: any;
  drg_barcode: any;
  expired_date: any;
  typeUnit: any;
  unit_name: any;
  quantity: any;
  unit_cd: any;
  price: any;
  selectValueTax: any;
};
class ModalDrugBusiness extends PureComponent<Props, State> {
  priceBeforeTax: number;
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      lot: '',
      drg_barcode: '',
      expired_date: '',
      quantity: '',
      price: '',
      selectValueTax: tax[1],
      unit_name: quality[0],
      typeUnit: [],
      unit_cd: '',
    };
    this.priceBeforeTax = 0;
  }
  _getPrice = async (nextProps: any) => {
    try {
      const res = await API.syncOrderToAdmin.getPrice(nextProps.info.drg_store_id, nextProps.item.drg_drug_cd);
      this.setState({
        unit_name:
          nextProps.item && nextProps.item.unit_name !== null ? nextProps.item.unit_name : res.data[0].unit_name,
        unit_cd: nextProps.item ? nextProps.item.unit_cd : res.data[0].unit_cd,
        price: nextProps.item.price ? nextProps.item.price : res.data[0].price,
        typeUnit: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  async componentWillReceiveProps(nextProps: any) {
    nextProps.item.drg_drug_cd !== undefined &&
      nextProps.item.drg_drug_cd !== this.props.item.drg_drug_cd &&
      this._getPrice(nextProps);
    const info =
      nextProps.navigation.state.params &&
      nextProps.navigation.state.params.info &&
      nextProps.item.drug_id === nextProps.navigation.state.params.info.drug_id
        ? nextProps.navigation.state.params.info
        : null;
    this.setState({
      lot: nextProps.item.lot ? nextProps.item.lot : '',
      drg_barcode: nextProps.item.drg_barcode ? nextProps.item.drg_barcode : '',
      expired_date: nextProps.item.expired_date ? nextProps.item.expired_date : '',
      quantity: nextProps.item.quantity ? nextProps.item.quantity : '',
      selectValueTax: nextProps.item.vat_percent ? nextProps.item.vat_percent : tax[1],
    });
    if (info) {
      this.setState({
        lot: info.lot,
        expired_date: info.expired_date,
        quantity: info.quantity,
        price: info.price,
      });
    }
  }

  toggleModal = (visible: boolean) => {
    this.setState({ modalVisible: visible });
  };
  onPressCancel = () => {
    this.toggleModal(!this.state.modalVisible);
  };
  onPressOK = () => {
    const { lot, drg_barcode, expired_date, quantity, price, selectValueTax, unit_name, unit_cd } = this.state;
    const valueTax =
      selectValueTax === 'Không thuế' ? -1 : selectValueTax === '0%' ? 0 : selectValueTax === '5%' ? 5 : 10;
    if (lot && expired_date && quantity && price && selectValueTax && unit_name) {
      const item = { ...this.props.item };
      item.lot = lot;
      item.expired_date = expired_date;
      item.quantity = quantity;
      item.price = price;
      item.vat_percent = valueTax;
      item.unit_name = unit_name;
      item.flag = 1;
      item.unit_cd = unit_cd === undefined ? '006' : unit_cd;
      this.toggleModal(!this.state.modalVisible);
      this.props.addProductNewBusiness(item);
    } else {
      Alert.alert('Thông báo', 'Các trường thông tin không được trống', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };
  renderFooter = () => {
    return (
      <View style={styles.wapperFooter}>
        {this._renderButton(this.onPressCancel, 'Hủy')}
        {this._renderButton(this.onPressOK, 'Đồng ý')}
      </View>
    );
  };
  _renderButton = (onPress: any, text: string) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.txtButton}>{text}</Text>
    </TouchableOpacity>
  );
  unit_name = (idx: number, value: string) => {
    this.setState({
      unit_name: value,
      unit_cd: this.state.typeUnit[idx].code,
      price: this.state.typeUnit[idx].price,
    });
  };
  selectValueTax = async (idx: number, value: string) => {
    this.setState({
      selectValueTax: value,
    });
    if (value === '5%') {
      this.setState({ price: (this.priceBeforeTax * Number(0.95)).toFixed(2) });
    } else if (value === '10%') {
      this.setState({ price: (this.priceBeforeTax * Number(0.9)).toFixed(2) });
    } else {
      this.setState({ price: this.priceBeforeTax.toFixed(2) });
    }
  };
  functionDropDown = (data: any, value: any, onPress: any) => {
    return (
      <ModalDropdown
        options={data}
        defaultValue={value}
        defaultIndex={0}
        dropdownStyle={[
          styles.stylesModal,
          {
            height: data.length > 50 ? 'auto' : -1,
          },
        ]}
        dropdownTextStyle={styles.dropdownTextStyle}
        onSelect={onPress}
      >
        <View style={styles.wapperInputFilter}>
          <Text style={styles.txtSelected}>{value}</Text>
          <Image source={themes.ICON_ARROW_DROP} style={styles.iconArrow} resizeMode="contain" />
        </View>
      </ModalDropdown>
    );
  };
  renderBody = () => {
    const { item } = this.props;
    const { lot, expired_date, typeUnit, quantity, unit_name, price, selectValueTax } = this.state;
    const listUnit = typeUnit.map((element: { unit_name: string }) => {
      return element.unit_name;
    });
    if (this.props.valueCode !== undefined) {
      this.setState({ drg_barcode: this.props.valueCode });
    }
    return (
      <ScrollView>
        <Text style={styles.nameDrug}>{item.drg_drug_name}</Text>
        <View style={[styles.containerLayout, { marginTop: 5 }]}>
          <View style={styles.rowLeft}>
            <Text style={styles.txt12}>Lô sản xuất</Text>
            {lot && lot.length !== 0 ? null : <Text style={styles.txtRed}>*</Text>}
          </View>
          <View style={styles.rowRight}>
            <TextInput
              placeholder="Nhập lô sản xuất"
              value={lot.toString()}
              style={styles.txtInput}
              onChangeText={txt => this.setState({ lot: txt })}
            />
          </View>
        </View>
        <View style={[styles.containerLayout, { marginTop: 5 }]}>
          <View style={styles.rowLeft}>
            <Text style={styles.txt12}>Hạn sử dụng</Text>
            {expired_date && expired_date.length !== 0 ? null : <Text style={styles.txtRed}>*</Text>}
          </View>
          <View style={styles.rowRight}>
            <DatePicker
              androidMode="spinner"
              style={{ width: '100%' }}
              date={expired_date}
              mode="date"
              placeholder="Chọn ngày"
              format="DD/MM/YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={true}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  borderBottomColor: themes.colors.MAIN_COLOR,
                  borderBottomWidth: 1,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                  height: vw(40),
                  // fontSize: vw(14),
                },
                dateText: {
                  fontSize: vw(14),
                },
                // placeholderText: {
                //   fontSize: vw(14),
                // },
              }}
              onDateChange={(date: string) => {
                this.setState({ expired_date: date });
              }}
            />
          </View>
        </View>
        <View style={[styles.containerLayout, { marginTop: 5, justifyContent: 'space-between' }]}>
          <View style={{ flexDirection: 'row', flex: 3, alignItems: 'center' }}>
            <Text style={styles.txt12}>Số lượng</Text>
            {quantity && quantity.length !== 0 ? null : <Text style={styles.txtRed}>*</Text>}
          </View>
          <View style={{ flexDirection: 'row', flex: 7, alignItems: 'center' }}>
            <View style={{ flex: 4 }}>
              <TextInput
                placeholder="Nhập số lượng"
                value={quantity ? quantity.toString() : quantity}
                style={styles.txtInput}
                keyboardType="numeric"
                onChangeText={txt => this.setState({ quantity: txt })}
              />
            </View>
            <View style={{ flexDirection: 'row', flex: 6, alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={[{ paddingLeft: 5 }, styles.txt12]}>Đơn vị</Text>
                {unit_name && unit_name.length !== 0 ? null : <Text style={styles.txtRed}>*</Text>}
              </View>
              <View style={{ flex: 1, height: vw(40), alignItems: 'center' }}>
                {this.functionDropDown(listUnit, unit_name, (idx, value) => this.unit_name(idx, value))}
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.containerLayout, { marginTop: 5, justifyContent: 'space-between' }]}>
          <View style={{ flexDirection: 'row', flex: 3, alignItems: 'center' }}>
            <Text style={styles.txt12}>Giá nhập</Text>
            {price && price.length !== 0 ? null : <Text style={styles.txtRed}>*</Text>}
          </View>
          <View style={{ flexDirection: 'row', flex: 7, alignItems: 'center' }}>
            <View style={{ flex: 4 }}>
              <TextInput
                placeholder="Nhập đơn giá"
                value={price && price.toString()}
                style={styles.txtInput}
                keyboardType="numeric"
                onChangeText={txt => {
                  this.setState({ price: txt });
                  this.priceBeforeTax = Number(txt);
                }}
              />
            </View>
            <View style={{ flexDirection: 'row', flex: 6, alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={[{ paddingLeft: 5 }, styles.txt12]}>Thuế</Text>
              </View>
              <View style={{ flex: 1, height: vw(40), alignItems: 'center' }}>
                {this.functionDropDown(tax, selectValueTax, (idx, value) => this.selectValueTax(idx, value))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };
  render() {
    return (
      <Modal animationType={'slide'} transparent={true} visible={this.state.modalVisible}>
        <View style={styles.backgroundModal}>
          <View style={styles.ModalInsideView}>
            {this.renderBody()}
            {this.renderFooter()}
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  txtRed: {
    position: 'absolute',
    right: vw(10),
    marginTop: vw(0),
    color: 'red',
    fontSize: vw(14),
  },
  backgroundModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ModalInsideView: {
    backgroundColor: themes.colors.WHITE,
    height: vw(330),
    width: '90%',
    borderRadius: vw(5),
    padding: vw(10),
  },
  button: {
    height: vw(30),
    backgroundColor: themes.colors.MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    borderRightColor: themes.colors.WHITE,
    borderRightWidth: vw(1),
    marginTop: vw(10),
  },
  nameDrug: {
    fontSize: vw(16),
    color: themes.colors.COLOR_INPUT,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  txtButton: {
    color: themes.colors.WHITE,
    fontWeight: 'bold',
    fontSize: vw(18),
  },
  containerLayout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLeft: {
    flex: 3,
  },
  rowRight: {
    flex: 7,
  },
  txtInput: {
    borderBottomColor: themes.colors.MAIN_COLOR,
    borderBottomWidth: 1,
    height: vw(40),
    width: '100%',
    paddingLeft: vw(5),
    fontSize: vw(14),
  },
  iconQrCode: {
    width: vw(20),
    height: vw(20),
  },
  buttonQRCOde: {
    position: 'absolute',
    right: vw(0),
    marginTop: vw(10),
    marginRight: vw(10),
  },
  stylesModal: {
    width: vw(150),
    height: 'auto',
    maxHeight: vw(120),
    borderRadius: vw(3),
    overflow: 'hidden',
    marginTop: -vw(100),
    marginRight: -vw(10),
    // Shadow
    ...Platform.select({
      ios: {
        shadowColor: themes.colors.BLACK_BASIC,
        shadowOffset: { width: vw(0), height: vw(2) },
        shadowOpacity: vw(0.14),
        shadowRadius: vw(2),
      },
      android: {
        elevation: vw(8),
      },
    }),
  },
  dropdownTextStyle: {
    fontSize: vw(14),
    fontFamily: themes.fontFamily.fontFamily,
    paddingHorizontal: vw(15),
  },
  wapperInputFilter: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    flex: 1,
    borderBottomColor: themes.colors.MAIN_COLOR,
    borderBottomWidth: 1,
    justifyContent: 'space-around',
  },
  txtSelected: {
    marginRight: 5,
    fontSize: vw(14),
  },
  wapperFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconArrow: {
    width: vw(7),
    height: vw(7),
    tintColor:themes.colors.BLACK_BASIC,
    position: 'absolute',
    right: vw(5),
  },
  txt12: {
    fontSize: vw(14),
  },
});
function mapStateToProps(state: any) {
  return {
    unitType: state.dataPersist.unitType,
    info: state.user.dataUser.info,
  };
}
const mapDispatchToProps = {
  addProductNewBusiness,
  getUnitType,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true },
)(ModalDrugBusiness);
