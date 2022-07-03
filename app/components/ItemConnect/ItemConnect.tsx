import * as React from 'react';
import { View, Text, TextInput, Image, Modal, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';
import ModalDropdown from 'react-native-modal-dropdown';
import { ItemDrug } from '../../elements/ItemDrug/ItemDrug';
import styles from './ItemConnect.style';
import vw from '../../utils/size-dynamic';
import MoneyFormat from '../../utils/MoneyFormat';
import api from '../../api';
import { connect } from 'react-redux';
import { getUnitType } from '../../redux/action/dataPersist';
import { themes } from '../../constants/';
const vat = ['0%', '5%', '10%'];

interface Props {
  item: any;
  index: number;
  updateInfo: any;
  unitType: any;
  getUnitType: any;
  type: any;
  onUpdate: any;
}
interface State {
  lot: any;
  price: any;
  quantity: any;
  unit_cd: any;
  unit_name: any;
  expired_date: any;
  vat_percent: any;
  isConnect: boolean;
  prevData: any;
  modalVisible: boolean;
}

class ItemConnect extends React.PureComponent<Props, State> {
  priceBeforeTax: number;
  constructor(props: Props) {
    super(props);
    const { item } = props;
    this.state = {
      lot: item.lot,
      price: item.price,
      quantity: item.quantity,
      unit_cd: item.unit_cd,
      unit_name: item.unit_name,
      expired_date: item.expired_date
        ? item.expired_date.slice(6, 8) + '/' + item.expired_date.slice(4, 6) + '/' + item.expired_date.slice(0, 4)
        : '',
      vat_percent:
        item.vat_percent === -1 ? '0%' : item.vat_percent === 0 ? '0%' : item.vat_percent === 5 ? '5%' : '10%',
      isConnect: item.sync_flg,
      modalVisible: false,
      prevData: {},
    };
    this.priceBeforeTax = item.price;
  }

  async componentDidMount() {
    try {
      if (!this.props.unitType || this.props.unitType.length === 0) {
        const res = await api.warehouse.getUnitDrug();
        this.props.getUnitType(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  isShowModal = () => {
    const { modalVisible, lot, price, quantity, unit_name, expired_date, vat_percent, isConnect } = this.state;
    if (!modalVisible)
      this.setState({ prevData: { lot, price, quantity, unit_name, expired_date, vat_percent, isConnect } });
    this.setState({ modalVisible: !modalVisible });
  };

  setUnitName = (idx: number, value: string) => {
    this.setState({
      unit_name: value,
      unit_cd: this.props.unitType[idx].code,
    });
  };

  setVAT = (idx: number, value: string) => {
    this.setState({
      vat_percent: value,
    });
    if (value === '5%') {
      this.setState({ price: (this.priceBeforeTax * Number(0.95)).toFixed(2) });
    } else if (value === '10%') {
      this.setState({ price: (this.priceBeforeTax * Number(0.9)).toFixed(2) });
    } else {
      this.setState({ price: this.priceBeforeTax.toFixed(2) });
    }
  };

  onChangeText = (text: string) => this.setState({ price: text });

  onClose = () => {
    const { vat_percent, lot, price, quantity, unit_cd, unit_name, expired_date, isConnect } = this.state.prevData;
    this.setState({
      vat_percent,
      lot,
      price,
      quantity,
      unit_cd,
      unit_name,
      expired_date,
      isConnect,
      modalVisible: false,
    });
  };

  onUpdate = () => {
    const { index, item, type } = this.props;
    const { vat_percent, lot, price, quantity, unit_cd, unit_name, expired_date, isConnect } = this.state;
    const data = {
      sync_flg: isConnect,
      lot: lot,
      quantity: quantity,
      unit_cd: unit_cd,
      unit_name: unit_name,
      price: price,
    };
    const dataExport = {
      ...data,
      expired_date: expired_date.slice(6, 8) + '' + expired_date.slice(4, 6) + '' + expired_date.slice(0, 4),
      export_detail_id: item.export_detail_id,
    };
    const dataInvoice = {
      ...data,
      drg_drug_cd: item.drg_drug_cd,
      invoice_detail_id: item.invoice_detail_id,
    };
    const dataImport = {
      ...data,
      vat_percent: vat_percent === '0%' ? '0' : vat_percent === '5%' ? '5' : '10',
      expired_date: expired_date,
      import_detail_id: item.import_detail_id,
    };
    if (type === 'invoice') this.props.onUpdate(index, dataInvoice);
    if (type === 'import') this.props.onUpdate(index, dataImport);
    if (type === 'export') this.props.onUpdate(index, dataExport);
    this.setState({ modalVisible: false });
  };

  _renderDropDown = (data: string[], value: string, onPress: any) => {
    return (
      <ModalDropdown
        disabled={!this.state.isConnect}
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
          <Image source={themes.ICON_ARROW_DROP} style={styles.iconDropDown} resizeMode="contain" />
        </View>
      </ModalDropdown>
    );
  };

  _renderCheckBox = (title: string, onPress: any, isConnect: boolean) => {
    return (
      <TouchableOpacity hitSlop={styles.hitSlop} onPress={onPress} style={styles.buttonCheckBox}>
        <View style={styles.checkbox}>
          {isConnect ? <Image source={themes.ICON_CHECKED} style={styles.iconCheck} /> : null}
        </View>
        <Text style={styles.txtSelectTime}>{title}</Text>
      </TouchableOpacity>
    );
  };

  _renderModal = () => {
    const { item, type } = this.props;
    const { lot, price, quantity, unit_name, expired_date, vat_percent, isConnect } = this.state;
    const listUnit = this.props.unitType.map((element: any) => {
      return element.value;
    });
    return (
      <Modal animationType={'slide'} transparent={true} visible={this.state.modalVisible}>
        <View style={styles.backgroundModal}>
          <View style={styles.modalInsideView}>
            <Text style={styles.nameDrug}>{item.drg_drug_name}</Text>
            <View style={[styles.containerLayout, { marginTop: 5 }]}>
              <View style={styles.rowLeft}>
                <Text>Liên thông</Text>
              </View>
              <View style={styles.containerCheckBox}>
                {this._renderCheckBox('Không', () => this.setState({ isConnect: false }), !this.state.isConnect)}
                {this._renderCheckBox('Có', () => this.setState({ isConnect: true }), this.state.isConnect)}
              </View>
            </View>

            <View style={[styles.containerLayout, { marginTop: 5 }]}>
              <View style={styles.rowLeft}>
                <Text>Lô sản xuất</Text>
                {lot && lot.length !== 0 ? null : <Text style={styles.iconStar}>*</Text>}
              </View>
              <TextInput
                editable={isConnect}
                placeholder="Nhập lô sản xuất"
                value={lot.toString()}
                style={[styles.txtInput, styles.rowRight]}
                onChangeText={txt => this.setState({ lot: txt })}
              />
            </View>

            <View style={[styles.containerLayout, { marginTop: 5 }]}>
              <View style={styles.rowLeft}>
                <Text>Đơn giá</Text>
                {price && price.length !== 0 ? null : <Text style={styles.iconStar}>*</Text>}
              </View>
              <TextInput
                editable={isConnect}
                placeholder="Nhập đơn giá"
                value={price && price.toString()}
                style={[styles.txtInput, styles.rowRight]}
                keyboardType="numeric"
                onChangeText={this.onChangeText}
              />
            </View>

            <View style={[styles.containerLayout, { marginTop: 5, justifyContent: 'space-between' }]}>
              <View style={[styles.containerLayout, { flex: 3 }]}>
                <Text>Số lượng</Text>
                {quantity && quantity.length !== 0 ? null : <Text style={styles.iconStar}>*</Text>}
              </View>
              <View style={[styles.containerLayout, { flex: 7 }]}>
                <TextInput
                  editable={isConnect ? true : false}
                  placeholder="Nhập số lượng"
                  value={quantity ? quantity.toString() : quantity}
                  style={styles.txtInput}
                  keyboardType="numeric"
                  onChangeText={txt => this.setState({ quantity: txt })}
                />
                <View style={[styles.containerLayout, { flex: 6 }]}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ paddingLeft: 5 }}>Đơn vị</Text>
                    {unit_name && unit_name.length !== 0 ? null : <Text style={styles.iconStar}>*</Text>}
                  </View>
                  <View style={styles.containerDropDown}>
                    {this._renderDropDown(listUnit, unit_name, this.setUnitName)}
                  </View>
                </View>
              </View>
            </View>

            {type === 'import' && (
              <View style={[styles.containerLayout, { marginTop: 5, justifyContent: 'space-between' }]}>
                <View style={styles.rowLeft}>
                  <Text>Hạn sử dụng</Text>
                  {expired_date && expired_date.length !== 0 ? null : <Text style={styles.iconStar}>*</Text>}
                </View>
                <View style={[styles.containerLayout, { flex: 7 }]}>
                  <View style={{ flex: 4 }}>
                    <DatePicker
                      disabled={!isConnect ? true : false}
                      androidMode="spinner"
                      style={{ width: '100%', ...styles.rowRight }}
                      date={expired_date}
                      mode="date"
                      placeholder="Chọn ngày"
                      format="DD/MM/YYYY"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      showIcon={false}
                      customStyles={{
                        dateInput: {
                          borderBottomColor: themes.colors.MAIN_COLOR,
                          borderBottomWidth: 1,
                          borderLeftWidth: 0,
                          borderRightWidth: 0,
                          borderTopWidth: 0,
                        },
                      }}
                      onDateChange={(date: string) => {
                        this.setState({ expired_date: date });
                      }}
                    />
                  </View>
                  <View style={[styles.containerLayout, { flex: 6 }]}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ paddingLeft: 5 }}>Thuế</Text>
                    </View>
                    <View style={styles.containerDropDown}>
                      {this._renderDropDown(vat, vat_percent, (idx: any, value: any) => this.setVAT(idx, value))}
                    </View>
                  </View>
                </View>
              </View>
            )}

            <View style={styles.containerButton}>
              <TouchableOpacity onPress={this.onUpdate} style={styles.button}>
                <Text style={[styles.txtButton, { color: themes.colors.WHITE }]}>Cập nhật</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity hitSlop={styles.hitSlop} style={styles.wapperButtonCancle} onPress={this.onClose}>
              <Image source={themes.ICON_CLOSE} style={styles.iconClose} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const { item } = this.props;
    const { lot, price, quantity, unit_name } = this.state;
    return (
      <ItemDrug srcImage={null} disabled={true} onPress={this.isShowModal}>
        <View style={styles.inforContainer}>
          <Text style={[styles.txt, { fontWeight: 'bold', marginRight: vw(50) }]} numberOfLines={2}>
            {item.drg_drug_name}
          </Text>

          <Text style={styles.txt}>Lô SX: {lot && lot.toString()}</Text>

          <Text style={styles.txt}>
            Giá: {MoneyFormat(price)}/{unit_name}
          </Text>

          <View style={styles.row}>
            <Text style={styles.txt}>Số lượng: </Text>
            <TextInput
              editable={false}
              style={[styles.textInput, { alignItems: 'center', width: vw(35) }]}
              placeholder="Nhập SL"
              keyboardType="numeric"
              value={quantity && quantity.toString()}
              onChangeText={async (text: string) => {
                this.setState({ quantity: text });
              }}
            />
            <Text style={styles.txt}> {unit_name}</Text>
          </View>
          <TouchableOpacity onPress={this.isShowModal} style={styles.buttonUpdate}>
            <Text style={[styles.txtButton, { color: themes.colors.MAIN_COLOR }]}>Cập nhật</Text>
          </TouchableOpacity>
          {!this.state.isConnect ? (
            <Text
              style={[styles.txt, { color: themes.colors.YELLOW, position: 'absolute', right: vw(0), bottom: vw(0) }]}
            >
              Không LT
            </Text>
          ) : null}
          {this._renderModal()}
        </View>
      </ItemDrug>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    unitType: state.dataPersist.unitType,
  };
}
const mapDispatchToProps = {
  getUnitType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemConnect);
