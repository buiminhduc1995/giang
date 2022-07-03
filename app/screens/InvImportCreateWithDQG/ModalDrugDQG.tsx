import React, { PureComponent } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, Image, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { ICON_QR_CODE, MAIN_COLOR, ICON_ARROW_DROP, ICON_CHECKED, themes } from '../../constants';
import API from '../../api';
import vw from '../../utils/size-dynamic';
import DatePicker from 'react-native-datepicker';
import ModalDropdown from 'react-native-modal-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addProductDQG } from '../../redux/action/inventory';
import { getKindDrug, getUnitType, description } from '../../redux/action/dataPersist';
import { QR_CODE_SREEN, INV_IMPORT_CREATE_TAB_STEP_1 } from '../../navigation/screen_name';
import styles from './ModalDrugDQG.style';
import { Navigation } from '../../dataType';

type Props = {
  item: any;
  navigation: Navigation;
  kindDrug: any;
  unitType: any;
  getKindDrug: any;
  getUnitType: any;
  addProductDQG: any;
  descriptionType: string[];
  description: any;
};
type State = {
  modalVisible: boolean;
  descriptionDrug: any;
  barcode: any;
  selectedValueGroupDrug: any;
  selectedValueDosageForms: any;
  source: any;
  unit: any;
  lot: any;
  expired_date: any;
  import_qty: any;
  parent_unit_price: any;
  import_unit_price: any;
  unit_price1: any;
  unit_price2: any;
  selectValueUnit1: any;
  unit_qty1: any;
  selectValueUnit2: any;
  unit_qty2: any;
  drug_kind: any;
  unit_name1: any;
  unit_name2: any;
  status: boolean;
};

const groupDrug = ['OTC', 'ETC', 'Thiết bị', 'Khác'];
const dosageForms = ['Lựa chọn dạng bào chế', 'Hộp', 'Cái', 'Chiếc', 'Cuộn', 'Vỉ', 'Viên tác dụng kéo dài'];
const prefix = ['Có hóa đơn', 'Không có hóa đơn'];
const unit = ['Viên', 'Liều', 'Lọ'];
const unit1 = ['Chọn'];
const unit2 = ['Chọn'];

class ModalDrugDQG extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      descriptionDrug: '',
      barcode: '',
      selectedValueGroupDrug: groupDrug[0],
      selectedValueDosageForms: dosageForms[0],
      source: prefix[0],
      unit: unit[0] === 'mCi' ? '' : unit[0],
      lot: '',
      expired_date: '',
      import_qty: '',
      parent_unit_price: '',
      import_unit_price: '',
      unit_price1: '',
      unit_price2: '',
      selectValueUnit1: unit1[0],
      unit_qty1: '',
      selectValueUnit2: unit2[0],
      unit_qty2: '',
      drug_kind: '',
      unit_name1: '',
      unit_name2: '',
      status: true,
    };
  }
  toggleModal(visible: boolean) {
    this.setState({ modalVisible: visible });
  }
  onPressCancel = () => {
    this.toggleModal(!this.state.modalVisible);
  };
  componentWillReceiveProps(nextProps: Props) {
    const info =
      nextProps.navigation.state.params &&
      nextProps.navigation.state.params.info &&
      nextProps.item.drug_id === nextProps.navigation.state.params.info.drug_id
        ? nextProps.navigation.state.params.info
        : null;
    this.setState({
      selectedValueGroupDrug: nextProps.item ? nextProps.item.drug_kind : groupDrug[0],
      selectedValueDosageForms: nextProps.item ? nextProps.item.description : dosageForms[0],
      source: nextProps.item ? (nextProps.item.source === 'S' ? 'Có hóa đơn' : 'Không có hóa đơn') : prefix[0],
      unit: nextProps.item ? (nextProps.item.unit === 'mCi' ? '' : nextProps.item.unit) : unit[0],
      lot: nextProps.item ? nextProps.item.lot : '',
      barcode: nextProps.item ? nextProps.item.barcode : '',
      expired_date: nextProps.item ? nextProps.item.expired_date : '',
      import_qty: nextProps.item ? nextProps.item.import_qty : '',
      parent_unit_price: nextProps.item ? nextProps.item.parent_unit_price : '',
      import_unit_price: nextProps.item ? nextProps.item.import_unit_price : '',
      status: true,
      unit_price1: nextProps.item ? nextProps.item.unit_price1 : '',
      unit_price2: nextProps.item ? nextProps.item.unit_price2 : '',
      selectValueUnit1: nextProps.item ? nextProps.item.unit_name1 : unit1[0],
      unit_qty1: nextProps.item ? nextProps.item.unit_qty1 : '',
      selectValueUnit2: nextProps.item ? nextProps.item.unit_name2 : unit2[0],
      unit_qty2: nextProps.item ? nextProps.item.unit_qty2 : '',
    });
    if (info) {
      this.setState({
        lot: info.lot,
        expired_date: info.expired_date,
        parent_unit_price: info.parent_unit_price,
        import_unit_price: info.import_unit_price,
        import_qty: info.import_qty,
        unit: info.unit,
        drug_kind: info.drug_kind,
      });
    }
  }
  onPressOK = () => {
    const {
      lot,
      expired_date,
      parent_unit_price,
      import_unit_price,
      import_qty,
      unit,
      selectValueUnit1,
      selectValueUnit2,
      unit_price1,
      unit_qty1,
      unit_price2,
      unit_qty2,
      selectedValueDosageForms,
      selectedValueGroupDrug,
      unit_name1,
      unit_name2,
      barcode,
      source,
    } = this.state;
    if (
      lot &&
      expired_date &&
      parent_unit_price &&
      import_unit_price &&
      import_qty &&
      selectedValueDosageForms &&
      selectedValueGroupDrug &&
      unit &&
      source
    ) {
      const item = { ...this.props.item };
      item.lot = lot;
      item.expired_date = expired_date;
      item.parent_unit_price = parent_unit_price;
      item.import_unit_price = import_unit_price;
      item.import_qty = import_qty;
      item.unit = unit;
      item.drug_kind = selectedValueGroupDrug;
      item.barcode = barcode ? barcode : '';
      item.description = selectedValueDosageForms;
      item.source = source === 'Có hóa đơn' ? 'S' : 'E';
      item.flag = 1;
      item.unit_name1 = selectValueUnit1;
      item.unit_qty1 = unit_qty1;
      item.unit_price1 = unit_price1;
      item.unit_name2 = selectValueUnit2;
      item.unit_qty2 = unit_qty2;
      item.unit_price2 = unit_price2;
      this.toggleModal(!this.state.modalVisible);
      this.props.addProductDQG(item);
    } else {
      Alert.alert('Thông báo', 'Các trường không được bỏ trống');
    }
  };
  async componentDidMount() {
    try {
      if (!this.props.kindDrug || this.props.kindDrug.length === 0) {
        const res = await API.warehouse.getKindDrug();
        this.props.getKindDrug(res.data);
      }
      if (!this.props.unitType || this.props.unitType.length === 0) {
        const res = await API.warehouse.getUnitDrug();
        this.props.getUnitType(res.data);
      }
      if (!this.props.descriptionType || this.props.descriptionType.length === 0) {
        const res = await API.warehouse.getDescription();
        this.props.description(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  functionDropDown = (data: any, value: any, onPress: any) => {
    return (
      <ModalDropdown
        options={data}
        defaultValue={value}
        defaultIndex={0}
        dropdownStyle={[
          styles.stylesModal,
          {
            height: data.length > 100 ? 'auto' : -1,
          },
        ]}
        dropdownTextStyle={styles.dropdownTextStyle}
        onSelect={onPress}
      >
        <View style={styles.wapperInputFilter}>
          <Text style={styles.txtSelected}>{value}</Text>
          <Image source={ICON_ARROW_DROP} style={styles.iconArrow} resizeMode="contain" />
        </View>
      </ModalDropdown>
    );
  };
  _renderInfomation = (target: any, placeholder: string, keyboardType: 'default', editable = true, style?: any) => {
    const text = this.state[target];
    return (
      <View>
        <TextInput
          editable={editable}
          style={[styles.txtInput, style]}
          placeholder={placeholder}
          value={text}
          keyboardType={keyboardType}
          onChangeText={text => {
            this.setState({ [target]: text });
          }}
        />
      </View>
    );
  };
  selectedValueGroupDrug = (idx: number, value: string) => {
    this.setState({ selectedValueGroupDrug: value, drug_kind: this.props.kindDrug[idx].code });
  };
  selectedValueDosageForms = (idx: number, value: string) => {
    this.setState({ selectedValueDosageForms: value });
  };
  source = (idx: number, value: string) => {
    this.setState({ source: value });
  };
  unit = (idx: number, value: string) => {
    this.setState({ unit: value });
  };
  selectValueUnit1 = (idx: number, value: string) => {
    value === 'Trống'
      ? this.setState({ selectValueUnit1: '', unit_name1: '', unit_price1: '', unit_qty1: '' })
      : this.setState({ selectValueUnit1: value, unit_name1: this.props.unitType[idx].code });
  };
  selectValueUnit2 = (idx: number, value: string) => {
    value === 'Trống'
      ? this.setState({ selectValueUnit2: '', unit_name2: '', unit_price2: '', unit_qty2: '' })
      : this.setState({ selectValueUnit2: value, unit_name2: this.props.unitType[idx].code });
  };
  scanQRCode = async () => {
    const info = {
      drug_id: this.props.item.drug_id,
      lot: this.state.lot,
      expired_date: this.state.expired_date,
      parent_unit_price: this.state.parent_unit_price,
      import_unit_price: this.state.import_unit_price,
      import_qty: this.state.import_qty,
      unit: this.state.unit,
      drug_kind: this.state.drug_kind,
    };
    const { navigation } = this.props;
    await this.toggleModal(!this.state.modalVisible);
    navigation.navigate('QRCodeScreen', { info: info, toScreen: INV_IMPORT_CREATE_TAB_STEP_1 });
  };
  renderOptionCollapsible = () => {
    const { status } = this.state;
    return (
      <TouchableOpacity
        style={[styles.wapperTitle, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
        onPress={() => this.setState({ status: !status })}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.buttonCheck}>{!status && <Image source={ICON_CHECKED} style={styles.iconCheck} />}</View>
          <Text style={styles.txtListProduct}>Thông tin bổ sung đơn vị quy đổi</Text>
        </View>

        {status ? (
          <Ionicons name="ios-arrow-forward" size={20} color="black" />
        ) : (
          <Ionicons name="ios-arrow-down" size={20} color="black" />
        )}
      </TouchableOpacity>
    );
  };
  renderBody = () => {
    const {
      lot,
      barcode,
      selectedValueGroupDrug,
      selectedValueDosageForms,
      source,
      expired_date,
      unit,
      import_qty,
      import_unit_price,
      parent_unit_price,
      status,
      kindDrug,
      descriptionDrug,
    } = this.state;
    const { item } = this.props;
    const listKind = this.props.kindDrug.map(element => {
      return element.value;
    });
    const listUnit = this.props.unitType.map(element => {
      return element.value;
    });
    const listDescription = this.props.descriptionType.map(element => {
      return element.value;
    });
    return (
      <ScrollView>
        <View style={[styles.containerBody, { alignItems: 'center', paddingHorizontal: 5, justifyContent: 'center' }]}>
          <Text style={styles.nameDrug}>{item.drg_name}</Text>
          <View style={[styles.containerLayout, { marginTop: 5 }]}>
            <View style={styles.rowLeft}>
              <Text style={styles.text}>Lô sản xuất</Text>
              {lot && lot.length !== 0 ? null : <Text style={styles.txtRed}>*</Text>}
            </View>
            <View style={styles.rowRight}>{this._renderInfomation('lot', 'Nhập lô sản xuất', null, true)}</View>
          </View>
          <View style={[styles.containerLayout, { marginTop: 5 }]}>
            <View style={styles.rowLeft}>
              <Text style={styles.text}>Mã vạch</Text>
            </View>
            <View style={styles.rowRight}>
              <TextInput
                placeholder="Nhập mã vạch"
                value={barcode && barcode.toString()}
                style={styles.txtInput}
                onChangeText={txt => this.setState({ barcode: txt })}
              />
              <TouchableOpacity
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                style={styles.buttonQRCOde}
                onPress={() => this.scanQRCode()}
              >
                <Image
                  source={ICON_QR_CODE}
                  style={[styles.iconQrCode, { tintColor: MAIN_COLOR }]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.containerLayout, { marginTop: 5, justifyContent: 'space-between' }]}>
            <View style={{ flexDirection: 'row', flex: 3, alignItems: 'center' }}>
              <Text style={styles.text}>Dạng bào chế</Text>
              {selectedValueDosageForms && selectedValueDosageForms.length !== 0 ? null : (
                <Text style={styles.txtRed}>*</Text>
              )}
            </View>
            <View style={{ flex: 7 }}>
              {this.functionDropDown(listDescription, selectedValueDosageForms, (idx, value) =>
                this.selectedValueDosageForms(idx, value),
              )}
            </View>
          </View>
          <View style={[styles.containerLayout, { marginTop: 5, justifyContent: 'space-between' }]}>
            <View style={{ flexDirection: 'row', flex: 3, alignItems: 'center' }}>
              <Text style={styles.text}>Hạn sử dụng</Text>
              {expired_date && expired_date.length !== 0 ? null : <Text style={styles.txtRed}>*</Text>}
            </View>
            <View style={{ flexDirection: 'row', flex: 7, alignItems: 'center' }}>
              <View style={{ flex: 4 }}>
                <DatePicker
                  style={{ width: '100%' }}
                  date={expired_date}
                  mode="date"
                  androidMode="spinner"
                  placeholder="Chọn ngày"
                  format="DD/MM/YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={!expired_date ? true : false}
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      right: -5,
                      top: 10,
                      marginLeft: 0,
                      width: 20,
                      height: 20,
                    },
                    dateInput: {
                      paddingRight: vw(12),
                      borderBottomColor: themes.colors.MAIN_COLOR,
                      borderBottomWidth: vw(1),
                      borderLeftWidth: vw(0),
                      borderRightWidth: vw(0),
                      borderTopWidth: vw(0),
                      height: vw(30),
                    },
                    dateText: {
                      fontSize: vw(14),
                    },
                    placeholderText: {
                      fontSize: vw(14),
                    },
                  }}
                  onDateChange={(date: string) => {
                    this.setState({ expired_date: date });
                  }}
                />
              </View>
              <View style={{ flexDirection: 'row', flex: 6, alignItems: 'center' }}>
                <View>
                  <Text style={[styles.text, { paddingLeft: 5 }]}>Nhóm thuốc </Text>
                  {selectedValueGroupDrug && selectedValueGroupDrug.length !== 0 ? null : (
                    <Text style={styles.txtRed}>*</Text>
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  {this.functionDropDown(listKind, selectedValueGroupDrug, (idx, value) =>
                    this.selectedValueGroupDrug(idx, value),
                  )}
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.containerLayout, { marginTop: 5, justifyContent: 'space-between' }]}>
            <View style={{ flexDirection: 'row', flex: 3, alignItems: 'center' }}>
              <Text style={styles.text}>Số lượng</Text>
              {import_qty && import_qty.length !== 0 ? null : <Text style={styles.txtRed}>*</Text>}
            </View>
            <View style={{ flexDirection: 'row', flex: 7, alignItems: 'center' }}>
              <View style={{ flex: 4 }}>{this._renderInfomation('import_qty', 'Nhập số lượng', 'numeric', true)}</View>
              <View style={{ flexDirection: 'row', flex: 6, alignItems: 'center' }}>
                <View>
                  <Text style={[styles.text, { paddingLeft: 5 }]}>Đơn vị cơ bản</Text>
                  {unit && unit.length !== 0 ? null : <Text style={styles.txtRed}>*</Text>}
                </View>

                <View style={{ flex: 1 }}>
                  {this.functionDropDown(listUnit, unit, (idx, value) => this.unit(idx, value))}
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.containerLayout, { marginTop: 5, justifyContent: 'space-between' }]}>
            <View style={{ flexDirection: 'row', flex: 3, alignItems: 'center' }}>
              <Text style={styles.text}>Hóa đơn</Text>
            </View>
            <View style={{ flex: 7 }}>
              {this.functionDropDown(prefix, source, (idx, value) => this.source(idx, value))}
            </View>
          </View>
          <View style={[styles.containerLayout, { marginTop: 5 }]}>
            <View style={styles.rowLeft}>
              <Text style={styles.text}>Giá nhập (ĐVCB)</Text>
              {import_unit_price && import_unit_price.length !== 0 ? null : <Text style={styles.txtRed}>*</Text>}
            </View>
            <View style={styles.rowRight}>
              {this._renderInfomation('import_unit_price', 'Nhập giá nhập đơn vị cơ bản', 'numeric', true)}
            </View>
          </View>
          <View style={[styles.containerLayout, { marginTop: 5 }]}>
            <View style={styles.rowLeft}>
              <Text style={styles.text}>Giá bán (ĐVCB)</Text>
              {parent_unit_price && parent_unit_price.length !== 0 ? null : <Text style={styles.txtRed}>*</Text>}
            </View>
            <View style={styles.rowRight}>
              {this._renderInfomation('parent_unit_price', 'Nhập giá bán đơn vị cơ bản', 'numeric', true)}
            </View>
          </View>
          {this.renderOptionCollapsible()}
          {!status ? this._renderContentOption() : null}
        </View>
      </ScrollView>
    );
  };
  _renderContentOption = () => {
    const {
      unit_price1,
      unit_price2,
      selectValueUnit1,
      unit_qty1,
      selectValueUnit2,
      unit_qty2,
      unit_name1,
      unit_name2,
    } = this.state;
    const empty = {
      code: '000',
      type: 'DRUG_UNIT',
      value: 'Trống',
      seo_url: null,
      note: 'Đơn vị',
      language: 'VI',
      uvalue: 'TRỐNG',
    };
    const temp = [empty, ...this.props.unitType];
    const listUnit1 = temp.map(element => {
      return element.value;
    });
    const listUnit2 = temp.map(element => {
      return element.value;
    });
    return (
      <View
        style={[
          styles.containerBody,
          { alignItems: 'center', paddingHorizontal: 5, justifyContent: 'center', paddingBottom: 10 },
        ]}
      >
        <View style={[styles.containerLayout, { marginTop: 5, justifyContent: 'space-between', alignItems: 'center' }]}>
          <View style={{ flexDirection: 'row', flex: 5, alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={[styles.text, { flex: 2 }]}>Đơn vị {'\n'}quy đổi 1</Text>
            <View style={{ flex: 3 }}>
              {this.functionDropDown(listUnit1, selectValueUnit1, (idx, value) => this.selectValueUnit1(idx, value))}
            </View>
          </View>
          <View style={{ flexDirection: 'row', flex: 5, alignItems: 'center', marginLeft: vw(5) }}>
            <Text style={styles.text}>
              Giá trị{'\n'}quy đổi 1
              {unit_qty1 && unit_qty1.length !== 0 ? null : <Text style={{ marginTop: 0, color: 'red' }}>*</Text>}
            </Text>
            <View style={{ flex: 4 }}>
              {this._renderInfomation(
                'unit_qty1',
                unit_name1.length !== 0 ? 'Nhập số lượng' : 'Chọn ĐVQĐ1',
                'numeric',
                unit_name1.length !== 0 ? true : false,
                { textAlign: 'center' },
              )}
            </View>
          </View>
        </View>
        <View style={[styles.containerLayout, { marginTop: 5 }]}>
          <Text style={[styles.text, { flex: 2 }]}>
            Giá bán ĐVQĐ1
            {unit_price1 && unit_price1.length !== 0 ? null : <Text style={{ marginTop: 0, color: 'red' }}>*</Text>}
          </Text>
          <View style={{ flex: 8 }}>
            {this._renderInfomation(
              'unit_price1',
              unit_name1.length !== 0 ? 'Nhập giá bán ĐVQĐ 1' : 'Xin vui lòng chọn ĐVQĐ1',
              'numeric',
              true,
              unit_name1.length !== 0 ? true : false,
            )}
          </View>
        </View>

        <View style={[styles.containerLayout, { marginTop: 5, justifyContent: 'space-between', alignItems: 'center' }]}>
          <View style={{ flexDirection: 'row', flex: 5, alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={[styles.text, { flex: 2 }]}>Đơn vị {'\n'}quy đổi 2</Text>
            <View style={{ flex: 3 }}>
              {this.functionDropDown(listUnit2, selectValueUnit2, (idx, value) => this.selectValueUnit2(idx, value))}
            </View>
          </View>
          <View style={{ flexDirection: 'row', flex: 5, alignItems: 'center', marginLeft: vw(5) }}>
            <Text style={styles.text}>
              Giá trị{'\n'}quy đổi 2
              {unit_qty2 && unit_qty2.length !== 0 ? null : <Text style={{ marginTop: 0, color: 'red' }}>*</Text>}
            </Text>
            <View style={{ flex: 4 }}>
              {this._renderInfomation(
                'unit_qty2',
                unit_name2.length !== 0 ? 'Nhập đơn vị' : 'Chọn ĐVQĐ2',
                'numeric',
                unit_name2.length !== 0 ? true : false,
                { textAlign: 'center' },
              )}
            </View>
          </View>
        </View>
        <View style={[styles.containerLayout, { marginTop: 5 }]}>
          <Text style={[styles.text, { flex: 2 }]}>
            Giá bán ĐVQĐ2
            {unit_price2 && unit_price2.length !== 0 ? null : <Text style={{ marginTop: 0, color: 'red' }}>*</Text>}
          </Text>
          <View style={{ flex: 8 }}>
            {this._renderInfomation(
              'unit_price2',
              unit_name2.length !== 0 ? 'Nhập giá bán ĐVQĐ 2' : 'Xin vui lòng chọn ĐVQĐ2',
              'numeric',
              unit_name2.length !== 0 ? true : false,
            )}
          </View>
        </View>
      </View>
    );
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

function mapStateToProps(state: any) {
  return {
    unitType: state.dataPersist.unitType,
    kindDrug: state.dataPersist.kindDrug,
    descriptionType: state.dataPersist.descriptionType,
  };
}
const mapDispatchToProps = {
  addProductDQG,
  getKindDrug,
  getUnitType,
  description,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true },
)(ModalDrugDQG);
