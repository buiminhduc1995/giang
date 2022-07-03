import React, { PureComponent } from 'react';
import { Modal, Text, TextInput, StyleSheet, View, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import vw from '../../utils/size-dynamic';
import { MAIN_COLOR, ICON_ARROW_DROP, themes } from '../../constants';
import ModalDropdown from 'react-native-modal-dropdown';
import API from '../../api';
const quality = ['Hộp', 'Lọ', 'Vỉ'];
import { connect } from 'react-redux';
import { getUnitType } from '../../redux/action/dataPersist';
class ModalInputQuanlity extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      typeUnit: [],
      unit_name: '',
      price: '',
      exchangeValue: '',
      dataAdd: [],
      index: '',
      note: '',
      max_price: '',
    };
  }
  async componentDidMount() {
    try {
      if (!this.props.unitType || this.props.unitType.length === 0) {
        const res = await API.warehouse.getUnitDrug();
        this.props.getUnitType(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  unit_name = (idx, value) => {
    this.setState({
      unit_name: value,
      index: idx,
    });
  };
  functionDropDown = (data: any, value: any, onPress: any) => {
    return (
      <ModalDropdown
        style={styles.modal}
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
          <Image source={ICON_ARROW_DROP} style={styles.iconDrop} resizeMode="contain" />
        </View>
      </ModalDropdown>
    );
  };
  renderBody = () => {
    const { unit_name, typeUnit } = this.state;
    const { flag } = this.props;
    const listUnit = this.props.unitType.map(element => {
      return element.value;
    });
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: vw(14), fontWeight: 'bold' }}>Thêm đơn vị quy đổi</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            flex: 1,
          }}
        >
          <View style={{ width: vw(100) }}>
            <Text style={styles.txt14}>Đơn vị quy đổi</Text>
          </View>
          <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', marginLeft: vw(10) }}>
            {this.functionDropDown(listUnit, unit_name, (idx, value) => this.unit_name(idx, value))}
          </View>
        </View>
        <View style={styles.containerInfomation}>
          <View style={{ width: vw(100) }}>
            <Text style={styles.txt14}>Giá trị quy đổi</Text>
          </View>
          <TextInput
            style={styles.textInputInfomation}
            onChangeText={text => this.setState({ exchangeValue: text })}
            keyboardType="number-pad"
            placeholder="Nhập giá trị quy đổi"
          />
        </View>
        {/* <View style={styles.containerInfomation}>
          <View style={{ width: vw(100) }}>
            <Text>Giá trần</Text>
          </View>
          <TextInput
            style={styles.textInputInfomation}
            placeholder='Nhập giá trần'
            onChangeText={(text) => this.setState({ price: text })}
            keyboardType='number-pad'
          />
        </View> */}
        <View style={styles.containerInfomation}>
          <View style={{ width: vw(100) }}>
            <Text style={styles.txt14}>Giá bán</Text>
          </View>
          <TextInput
            style={styles.textInputInfomation}
            placeholder="Nhập giá bán quy đổi"
            onChangeText={text => this.setState({ max_price: text })}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.containerInfomation}>
          <View style={{ width: vw(100) }}>
            <Text style={styles.txt14}>Cảnh báo tồn kho</Text>
          </View>
          <TextInput
            style={styles.textInputInfomation}
            placeholder="Nhập cảnh báo tồn kho"
            onChangeText={text => this.setState({ note: text })}
            keyboardType="number-pad"
          />
        </View>
      </View>
    );
  };
  toggleModal(visible) {
    this.setState({ modalVisible: visible });
  }
  onPressCancel = () => {
    this.toggleModal(!this.state.modalVisible);
  };
  onPressOK = async () => {
    const { price, dataAdd, typeUnit, index, unit_name, exchangeValue, note, max_price } = this.state;
    let data = {};
    (data.unit_code = this.props.unitType[index].code),
      (data.max_price = max_price),
      (data.unit_name = unit_name),
      (data.unit_qty = exchangeValue),
      (data.inv_qty_alarm = note),
      (data.indexValue = index),
      (data.default_flg = 0),
      // (data.price_sell = max_price);
      this.props.addUnit(data);
    this.toggleModal(!this.state.modalVisible);
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
    const { modalVisible } = this.state;
    return (
      <Modal animationType={'slide'} transparent={true} visible={modalVisible}>
        <View style={styles.backgroundModal}>
          <View style={[styles.ModalInsideView]}>
            {this.renderBody()}
            {this.renderFooter()}
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  backgroundModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ModalInsideView: {
    backgroundColor: themes.colors.WHITE,
    height: vw(300),
    width: '90%',
    borderRadius: vw(5),
    padding: vw(10),
  },
  button: {
    height: vw(40),
    backgroundColor: themes.colors.MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    borderRightColor: themes.colors.WHITE,
    borderRightWidth: vw(1),
    marginTop: vw(20),
  },
  txtButton: {
    color: themes.colors.WHITE,
    fontWeight: 'bold',
    fontSize: vw(18),
  },
  wapperFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modal: {
    width: '100%',
    borderBottomColor: themes.colors.MAIN_COLOR,
    borderBottomWidth: vw(1),
    height: vw(40),
    justifyContent: 'center',
  },
  stylesModal: {
    width: vw(150),
    height: 'auto',
    maxHeight: vw(120),
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: -vw(100),
    marginRight: -vw(10),
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
    justifyContent: 'space-around',
  },
  txtSelected: {
    marginRight: vw(5),
    fontSize:vw(14)
  },
  iconDrop: {
    width: vw(7),
    height: vw(7),
    tintColor: themes.colors.BLACK_BASIC,
    position: 'absolute',
    right: vw(5),
  },
  containerInfomation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
  },
  textInputInfomation: {
    flex: 1,
    width: '100%',
    height: vw(40),
    borderBottomColor: themes.colors.MAIN_COLOR,
    borderBottomWidth: 1,
    marginLeft: vw(10),
    fontSize:vw(14)
  },
  txt14:{
    fontSize:vw(14)
  }
});
const mapDispatchToProps = {
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
)(ModalInputQuanlity);
