import React, { PureComponent } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Image, Alert } from 'react-native';
import { themes } from '../../constants/index';
import styles from './InvCheckedList.styles';
import { addProductCheck } from '../../redux/action/inventory';
import { connect } from 'react-redux';
import vw from '../../utils/size-dynamic';
type Props = {
  addProductCheck: Function;
  item: any;
};
type State = {
  modalVisible: boolean;
  cur_qty: string;
};
class ModalEditCheck extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      cur_qty: '',
    };
  }
  componentWillReceiveProps(nextProps: any) {
    this.setState({
      cur_qty: nextProps.item.cur_qty ? nextProps.item.cur_qty : '',
    });
  }
  toggleModal(visible: boolean) {
    this.setState({ modalVisible: visible });
  }
  updateNoteModal = () => {
    const { cur_qty } = this.state;
    if (cur_qty.length > 0) {
      const item = { ...this.props.item };
      item.cur_qty = this.state.cur_qty;
      this.setState({ modalVisible: false });
      this.props.addProductCheck(item);
    } else {
      Alert.alert('Giá trị nhập trống');
    }
  };
  render() {
    const { cur_qty } = this.state;
    const { item } = this.props;
    return (
      <Modal transparent={true} animationType={'slide'} visible={this.state.modalVisible}>
        <View style={styles.backgroundModal}>
          <View style={styles.ModalInsideView}>
            <TouchableOpacity
              hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
              style={styles.buttonClose}
              onPress={() => this.setState({ modalVisible: false })}
            >
              <Image source={themes.ICON_CLOSE} style={styles.iconClose} />
            </TouchableOpacity>
            <View style={styles.wapperModal}>
              <Text numberOfLines={1} style={styles.txtDrugName}>
                {item.drg_drug_name}
              </Text>
              <View style={styles.containerModalNote}>
                <View style={styles.txtModal}>
                  <Text style={styles.txt12}>Thực tế trong kho</Text>
                </View>
                <TextInput
                  style={[styles.textInputModal, { height: vw(40), paddingVertical: vw(10) }]}
                  placeholder="Nhập số thực tế trong kho"
                  value={cur_qty.toString()}
                  keyboardType="numeric"
                  onChangeText={txt => this.setState({ cur_qty: txt })}
                />
              </View>
              <TouchableOpacity
                style={[styles.buttonFilter, { borderRightColor: themes.colors.GRAY, borderRightWidth: 0.5 }]}
                onPress={() => this.updateNoteModal()}
              >
                <Text style={styles.buttonAccpect}>Đồng ý</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    store: state.user.dataUser.store,
    token: state.user.token,
    listProductCheck: state.inventory.listProductCheck,
  };
}
const mapDispatchToProps = {
  addProductCheck,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true },
)(ModalEditCheck);
