import React, { PureComponent } from 'react';
import { Modal, Text, StyleSheet, View, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { themes } from '../../constants/index';
import vw from '../../utils/size-dynamic';
import { connect } from 'react-redux';
type Props = {
  item: any;
  itemEdit: Function;
};
type State = {
  modalVisible: boolean;
  flag: boolean;
  note: string;
  discount: string;
};
class ModalNote extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      flag: false,
      note: '',
      discount: '',
    };
  }
  toggleModal(visible: boolean) {
    this.setState({ modalVisible: visible });
  }
  discount = txt => {
    const { item } = this.props;
    const { discount } = this.state;
    if (item.units[item.index_unit].price > discount) {
      this.setState({ discount: txt });
    } else {
      Alert.alert('Số tiền giảm giá không được lớn hơn giá sản phẩm');
      this.setState({ discount: '' });
    }
  };

  componentWillReceiveProps(props: any) {
    this.setState({
      flag: props.item.flag !== undefined ? (props.item.flag === 1 ? true : false) : false,
      note: props.item.dosage,
      discount: props.item.discount !== undefined ? props.item.discount : '',
    });
  }
  updateNoteModal = () => {
    const { item } = this.props;
    const { note, discount, flag } = this.state;
    item.dosage = note;
    item.discount = !flag ? discount : Number(item.units[item.index_unit].price * item.quantity);
    flag ? (item.flag = 1) : (item.flag = 0);
    this.props.itemEdit(item);
    this.toggleModal(!this.state.modalVisible);
  };
  cancel = () => {
    const { item } = this.props;
    this.props.itemEdit(item);
    this.toggleModal(!this.state.modalVisible);
  };

  render() {
    const { item } = this.props;
    const { note, flag, discount } = this.state;
    return (
      <Modal transparent={true} animationType={'slide'} visible={this.state.modalVisible}>
        <View style={stylesGlobal.backgroundModal}>
          <View style={stylesGlobal.ModalInsideView}>
            <TouchableOpacity
              hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
              style={stylesGlobal.buttonNote}
              onPress={() => this.cancel()}
            >
              <Image source={themes.ICON_CLOSE} style={stylesGlobal.iconClose} />
            </TouchableOpacity>
            <View style={{ marginTop: vw(10), alignItems: 'center' }}>
              <Text numberOfLines={1} style={stylesGlobal.txtNoteDrugName}>
                {item.drg_drug_name}
              </Text>
              <View style={stylesGlobal.containerModalNote}>
                <View style={stylesGlobal.txtModal}>
                  <Text style={stylesGlobal.txt12}>Hàng khuyến mãi</Text>
                </View>
                <View style={{ flex: 7 }}>
                  <TouchableOpacity
                    style={[stylesGlobal.checkbox]}
                    onPress={() => this.setState({ flag: !flag, discount: '' })}
                  >
                    {flag ? <Image source={themes.ICON_CHECKED} style={stylesGlobal.iconCheckDiscount} /> : null}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={stylesGlobal.containerModalNote}>
                <View style={stylesGlobal.txtModal}>
                  <Text style={stylesGlobal.txt12}>Giảm giá</Text>
                </View>
                <TextInput
                  editable={!flag}
                  style={[stylesGlobal.textInputModal, { height: vw(40), paddingVertical: vw(10) }]}
                  placeholder="Nhập số tiền giảm giá"
                  value={discount.toString()}
                  keyboardType="numeric"
                  onChangeText={txt => this.discount(txt)}
                />
              </View>
              <View style={stylesGlobal.containerModalNote}>
                <View style={stylesGlobal.txtModal}>
                  <Text style={stylesGlobal.txt12}>Ghi chú</Text>
                </View>
                <TextInput
                  style={[stylesGlobal.textInputModal, { height: vw(70), textAlignVertical: 'top' }]}
                  multiline
                  placeholder="Nhập ghi chú cho sản phẩm"
                  value={note}
                  onChangeText={txt => this.setState({ note: txt })}
                />
              </View>
              <TouchableOpacity
                style={[stylesGlobal.buttonFilter, { borderRightColor: themes.colors.GRAY, borderRightWidth: 0.5 }]}
                onPress={() => this.updateNoteModal()}
              >
                <Text style={stylesGlobal.buttonAccpect}>Đồng ý</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
const stylesGlobal = StyleSheet.create({
  backgroundModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ModalInsideView: {
    backgroundColor: themes.colors.WHITE,
    height: vw(245),
    width: '90%',
    borderRadius: vw(5),
    padding: vw(10),
  },
  iconClose: {
    width: vw(10),
    height: vw(10),
    tintColor: themes.colors.RED,
  },
  txtNoteDrugName: {
    fontWeight: 'bold',
    color: themes.colors.BLACK_BASIC,
    fontSize: vw(12),
  },
  containerModalNote: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    height: vw(15),
    width: vw(15),
    borderColor: themes.colors.MAIN_COLOR,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtModal: {
    flex: 3,
  },
  txt12: {
    fontSize: vw(12),
  },
  buttonNote: {
    position: 'absolute',
    right: 0,
    marginTop: vw(10),
    marginRight: vw(10),
  },
  iconCheckDiscount: {
    width: vw(10),
    height: vw(10),
  },
  buttonAccpect: {
    color: themes.colors.WHITE,
    fontWeight: 'bold',
    fontSize: vw(16),
  },
  textInputModal: {
    flex: 7,
    borderRadius: vw(5),
    borderWidth: vw(1),
    borderColor: themes.colors.COLOR_INPUT_PRICE,
    marginTop: vw(10),
    paddingLeft: vw(5),
    fontSize: vw(14),
  },
  buttonFilter: {
    height: vw(40),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vw(10),
    backgroundColor: themes.colors.MAIN_COLOR,
    borderRadius: vw(5),
  },
});
export default connect(
  null,
  null,
  null,
  { forwardRef: true },
)(ModalNote);
