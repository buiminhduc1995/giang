import React, { PureComponent } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, Alert, ScrollView } from 'react-native';
import styles from './InvImportWithDrugNew.styles';
import { MyStatusBar } from '../../elements/MyStatusBar/';
import HeaderBar from '../../elements/HeaderBar/';
import { ICON_BACK, ICON_QR_CODE, MAIN_COLOR, ICON_ARROW_DROP, themes } from '../../constants/';
import { INV_IMPORT_CREATE_TAB_STEP_1, QR_SCAN_CODE_INVENTORY } from '../../redux/types/';
import DatePicker from 'react-native-datepicker';
import ModalDropdown from 'react-native-modal-dropdown';
const tax = ['Không thuế', '5%', '10%'];
const quality = ['Hộp', 'Lọ', 'Vỉ'];
import API from '../../api/';
import { addProductNewBusiness } from '../../redux/action/inventory';
import { connect } from 'react-redux';
import vw from '../../utils/size-dynamic';
import { Navigation } from '../../dataType';
import { getUnitType } from '../../redux/action/dataPersist';
import EventBus from '../../utils/EventBus';
type Props = {
  navigation: Navigation;
  addProductNewBusiness: Function;
  getUnitType: Function;
  unitType: any;
};
type State = {
  lot: String;
  drg_barcode: any;
  expired_date: string;
  quantity: string;
  price: string;
  selectValueTax: String;
  unit_name: String;
  typeUnit: any;
  unit_cd: Number;
  company_name: string;
};
class index extends PureComponent<Props, State> {
  priceBeforeTax: Number;
  constructor(props: Props) {
    super(props);
    const data = this.props.navigation.getParam('item');
    this.state = {
      lot: '',
      drg_barcode: data ? data.drg_barcode : '',
      expired_date: data ? data.expired_date : '',
      quantity: '',
      price: '',
      selectValueTax: data ? data.vat_percent : tax[1],
      unit_name: data ? data.unit_name : quality[0],
      typeUnit: [],
      unit_cd: data ? data.unit_cd : quality[0],
      company_name: data ? data.company_name : '',
    };
    this.priceBeforeTax = 0;
  }
  componentDidMount = async () => {
    if (!this.props.unitType || this.props.unitType.length === 0) {
      const res = await API.warehouse.getUnitDrug();
      this.props.getUnitType(res.data);
    }
  };
  // getTypeUnit = async () => {
  //   try {
  //     const res = await API.warehouse.getUnitDrug();
  //     this.setState({ typeUnit: res.data });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }
  _renderHeaderLeft() {
    return (
      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => this.props.navigation.navigate(INV_IMPORT_CREATE_TAB_STEP_1)}
      >
        <Image source={themes.ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtHeaderLeft}>Nhập kho</Text>
      </TouchableOpacity>
    );
  }
  _renderInformationBasic = () => {
    const data = this.props.navigation.getParam('item');
    return (
      <View>
        <View style={styles.wapperTitle}>
          <Text style={styles.txtTitle}>Thông tin cơ bản</Text>
        </View>
        <View style={styles.containerPadding}>
          <View style={styles.row}>
            <Text style={styles.fontSize14}>Tên thuốc: </Text>
            <Text style={styles.fontSize14}>{data.drg_drug_name}</Text>
          </View>
        </View>
        <View style={styles.containerPadding}>
          <View style={styles.row}>
            <Text style={styles.fontSize14}>Dạng bào chế: </Text>
            <Text style={styles.fontSize14}>{data.dosageForms}</Text>
          </View>
        </View>
      </View>
    );
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
          <Image source={themes.ICON_ARROW_DROP} style={styles.imageDropDown} resizeMode="contain" />
        </View>
      </ModalDropdown>
    );
  };
  selectValueTax = async (idx: any, value: any) => {
    this.setState({
      selectValueTax: value,
    });
    if (value === '5%') {
      this.setState({ price: (Number(this.priceBeforeTax) * Number(0.95)).toFixed(2) });
    } else if (value === '10%') {
      this.setState({ price: (Number(this.priceBeforeTax) * Number(0.9)).toFixed(2) });
    } else {
      this.setState({ price: this.priceBeforeTax.toFixed(2) });
    }
  };
  navigationQRCode = async () => {
    const { navigation } = this.props;
    navigation.navigate(QR_SCAN_CODE_INVENTORY, { screen: 'ImportWithDrugNew' });
  };
  unit_name = (idx: any, value: any) => {
    this.setState({
      unit_name: value,
      unit_cd: this.props.unitType[idx].code,
    });
  };

  _renderInformationImport = () => {
    const { lot, drg_barcode, expired_date, typeUnit, quantity, unit_name, price, selectValueTax } = this.state;
    const listUnit = this.props.unitType.map((element: { value: String }) => {
      return element.value;
    });
    if (this.props.navigation.getParam('codeQR') !== undefined) {
      this.setState({ drg_barcode: this.props.navigation.getParam('codeQR') });
    }
    return (
      <View>
        <View style={styles.wapperTitle}>
          <Text style={styles.txtTitle}>Thông tin nhập kho</Text>
        </View>
        <View>
          <View style={[styles.containerLayout, { marginTop: 5 }]}>
            <View style={styles.rowLeft}>
              <Text style={styles.fontSize14}>Lô sản xuất</Text>
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
              <Text style={styles.fontSize14}>Mã vạch</Text>
              {drg_barcode && drg_barcode.length !== 0 ? null : <Text style={styles.txtRed}>*</Text>}
            </View>
            <View style={styles.rowRight}>
              <TextInput
                placeholder="Nhập mã vạch"
                value={drg_barcode}
                style={styles.txtInput}
                onChangeText={txt => this.setState({ drg_barcode: txt })}
              />
              <TouchableOpacity onPress={() => this.navigationQRCode()} style={styles.buttonQRCOde}>
                <Image
                  source={themes.ICON_QR_CODE}
                  style={[styles.iconQrCode, { tintColor: themes.colors.MAIN_COLOR }]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.containerLayout, { marginTop: 5 }]}>
            <View style={styles.rowLeft}>
              <Text style={styles.fontSize14}>Hạn sử dụng</Text>
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
                  },
                  dateText: {
                    fontSize: vw(14),
                  },
                  placeholderText:{
                    fontSize:vw(14)
                  }
                }}
                onDateChange={(date: string) => {
                  this.setState({ expired_date: date });
                }}
              />
            </View>
          </View>
          <View style={[styles.containerLayout, { marginTop: 5, justifyContent: 'space-between' }]}>
            <View style={[styles.containerRow, { flex: 3 }]}>
              <Text style={styles.fontSize14}>Số lượng</Text>
              {quantity && quantity.length !== 0 ? null : <Text style={styles.txtRed}>*</Text>}
            </View>
            <View style={[styles.containerRow, { flex: 7 }]}>
              <View style={{ flex: 4 }}>
                <TextInput
                  placeholder="Nhập số lượng"
                  value={quantity ? quantity.toString() : quantity}
                  style={styles.txtInput}
                  keyboardType="numeric"
                  onChangeText={txt => this.setState({ quantity: txt })}
                />
              </View>
              <View style={[styles.containerRow, { flex: 6 }]}>
                <View style={{ flex: 1 }}>
                  <Text style={{ paddingLeft: 5, fontSize: vw(14) }}>Đơn vị</Text>
                  {unit_name && unit_name.length !== 0 ? null : <Text style={styles.txtRed}>*</Text>}
                </View>
                <View style={{ flex: 1, height: vw(40), alignItems: 'center' }}>
                  {this.functionDropDown(listUnit, unit_name, (idx: any, value: any) => this.unit_name(idx, value))}
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.containerLayout, { marginTop: 5, justifyContent: 'space-between' }]}>
            <View style={[styles.containerRow, { flex: 3 }]}>
              <Text style={styles.fontSize14}>Giá nhập</Text>
              {price && price.length !== 0 ? null : <Text style={styles.txtRed}>*</Text>}
            </View>
            <View style={[styles.containerRow, { flex: 7 }]}>
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
              <View style={[styles.containerRow, { flex: 6 }]}>
                <View style={{ flex: 1 }}>
                  <Text style={{ paddingLeft: 5, fontSize: vw(14) }}>Thuế</Text>
                </View>
                <View style={{ flex: 1, height: vw(40), alignItems: 'center' }}>
                  {this.functionDropDown(tax, selectValueTax, (idx: any, value: any) =>
                    this.selectValueTax(idx, value),
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  onPressOK = () => {
    const {
      lot,
      drg_barcode,
      expired_date,
      quantity,
      price,
      selectValueTax,
      unit_name,
      unit_cd,
      company_name,
    } = this.state;
    const valueTax =
      selectValueTax === 'Không thuế' ? -1 : selectValueTax === '0%' ? 0 : selectValueTax === '5%' ? 5 : 10;
    if (lot && drg_barcode && expired_date && quantity && price && selectValueTax && unit_name) {
      const item = { ...this.props.navigation.getParam('item') };
      item.lot = lot;
      item.drg_barcode = drg_barcode;
      item.expired_date = expired_date;
      item.quantity = quantity;
      item.price = price;
      item.vat_percent = valueTax;
      item.unit_name = unit_name;
      item.flag = 1;
      item.company_name = company_name;
      item.unit_cd = unit_cd === undefined ? '006' : unit_cd;
      this.props.addProductNewBusiness(item);
      EventBus.fireEvent('AddNewDrugSuccess');
      this.props.navigation.navigate(INV_IMPORT_CREATE_TAB_STEP_1);
    } else {
      Alert.alert('Thông báo', 'Các trường thông tin không được trống', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };
  _renderButton = () => {
    return (
      <TouchableOpacity onPress={() => this.onPressOK()} style={styles.buttonExport}>
        <Text style={styles.txtButton}>Đồng ý</Text>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        <ScrollView>
          {this._renderInformationBasic()}
          {this._renderInformationImport()}
        </ScrollView>
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', padding: vw(5) }}>
          {this._renderButton()}
        </View>
      </View>
    );
  }
}
const mapDispatchToProps = {
  addProductNewBusiness,
  getUnitType,
};
function mapStateToProps(state: any) {
  return {
    unitType: state.dataPersist.unitType,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true },
)(index);
