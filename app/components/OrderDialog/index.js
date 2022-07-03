import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, Dimensions, StyleSheet, TextInput } from 'react-native';
import vw from '../../utils/size-dynamic';
import { connect } from 'react-redux';
import API from '../../api';
import PopupDialog from 'react-native-popup-dialog';
import { CANCEL_ORDER } from '../../redux/types';
import { getPointWallet } from '../../redux/action/rewardPoint';
const { height, width } = Dimensions.get('window');

class OrderDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      qty_request: '1',
      discount: 0,
      total: 0,
      visible: false,
    };
  }
  componentDidUpdate() {
    const { dataOrder } = this.props;
    if (dataOrder != null) {
      this._computeOrder(this.state.qty_request);
      this._showPopup();
    }
  }
  componentDidMount() {}
  _addProduct = () => {
    let number = Number(this.state.qty_request);
    number = number + 1;
    this._computeOrder(number);
    this.setState({ qty_request: number.toString() });
  };

  _subProduct = () => {
    let number = Number(this.state.qty_request);
    number = number > 1 ? number - 1 : 1;
    this._computeOrder(number);
    this.setState({ qty_request: number.toString() });
  };

  _computeOrder = number => {
    const { dataOrder } = this.props;
    if (dataOrder) {
      amount = dataOrder.price * number;
      if (dataOrder.campaign) {
        discount = dataOrder.campaign.discount * amount;
        total = amount - discount;
        this.setState({ amount, discount, total });
      } else {
        this.setState({ amount, total: amount });
      }
    }
  };
  _showPopup = () => {
    this.setState({ visible: true });
  };

  _cancelOrder = () => {
    this.props.cancelOrder();
    this.setState({ visible: false, amount: 0, qty_request: '1', discount: 0, total: 0 });
  };

  _addOrderSuccessed = params => {
    this._addNewRewardPoint();
    this._syncOderToAdmin(params);
  };
  _addNewRewardPoint = () => {
    const { info, store } = this.props;
    const params = {
      account_id: info.account_id,
      drg_store_id: store.drg_store_id,
      exchange_id: 0,
      point: this.state.qty_request < 6 ? 500 : 1000,
      type: 1,
    };
    API.rewardPointApi.updateRewardPoint(params).then(res => {
      this.props.getPointWallet(store.drg_store_id);
      Alert.alert('Thông báo', `Chúc mừng bạn vừa nhận được ${params.point} điểm thưởng trên hệ thống Medlink`);
    });
  };
  _syncOderToAdmin = data => {
    const { store } = this.props;
    API.syncOrderToAdmin.getProfilePartner(store.phone_no).then(res => {
      if (res.data.result.partner_id) {
        API.syncOrderToAdmin.uploadOrderToCompany(data, res.data.result.partner_id);
      }
    });
  };

  _orderProduct = async () => {
    const { dataOrder, info } = this.props;
    const campaign = dataOrder.campaign ? dataOrder.campaign : null;
    this.setState({ visible: false }, async () => {
      params = {
        supply_order: {
          provider_code: dataOrder.provider_code,
          provider_name: dataOrder.provider_name,
          company_id: dataOrder.company_id,
          company_name: dataOrder.company_name,
          company_code: dataOrder.company_code,
          amount: this.state.amount,
          amount_paid: '0',
          amount_debt: this.state.total,
          currency: 'VND',
          payment_type: 'COD',
          account_id: info.account_id,
          full_name: info.full_name,
          drg_store_id: dataOrder.drg_store_id,
          drg_store_name: '',
          delivery_date: '',
        },
        lst_supply_order_detail_info: [
          {
            campaign_id: campaign ? campaign.campaign_id : 0,
            drug_id: dataOrder.drug_id,
            drg_drug_cd: dataOrder.drg_drug_cd,
            drg_drug_name: dataOrder.drg_drug_name,
            qty_request: this.state.qty_request,
            unit_cd: dataOrder.unit,
            unit_name: dataOrder.unit_name,
            campaign_title: campaign ? campaign.campaign_title : '',
            campaign_amount: campaign ? campaign.campaign_amount : '',
            amount: dataOrder.price,
            amount_paid: '0',
            amount_debt: this.state.total,
            currency: 'VND',
            discount: campaign ? campaign.discount : 0,
          },
        ],
      };
      if (dataOrder.drug_id == 0) {
        Alert.alert('Rất tiếc!', 'Thuốc này hiện chưa được kinh doanh');
      } else {
        try {
          const response = await API.orderApi.orderProduct(params);
          this.props.cancelOrder();
          Alert.alert(
            'Thông báo',
            'Cám ơn Quý Nhà thuốc đã đặt hàng qua Ứng dụng Medlink. Đơn hàng của Quý Nhà thuốc sẽ được gửi tới Công ty Dược xử lý.',
            [{ text: 'OK', onPress: () => this._addOrderSuccessed(params) }],
            { cancelable: false },
          );
        } catch (error) {
          Alert.alert('Thông báo', 'Có lỗi xảy ra!', [{ text: 'OK' }], {
            cancelable: false,
          });
        }
      }
    });
  };

  render() {
    const { dataOrder } = this.props;
    return (
      <PopupDialog
        visible={this.state.visible}
        width={width - 20}
        containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        dialogStyle={{
          zIndex: 100,
          borderRadius: vw(10),
          overflow: 'hidden',
          height: vw(265),
        }}
      >
        <View style={styles.container}>
          <Text style={styles.title} numberOfLines={1}>
            {dataOrder ? dataOrder.drg_drug_name : null}
          </Text>
          <View style={{ width: '100%', height: 1, backgroundColor: 'gray', opacity: 0.5, marginTop: 5 }} />
          <View style={{ flex: 3, paddingTop: 5 }}>
            <View style={styles.item}>
              <Text style={styles.text}>Số lượng</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.button} onPress={this._subProduct}>
                  <Text style={{ fontWeight: 'bold', fontSize: 15 }}>-</Text>
                </TouchableOpacity>
                <TextInput
                  defaultValue={this.state.qty_request.toString()}
                  style={styles.inputOrder}
                  onChangeText={text => this.setState({ qty_request: text })}
                  value={this.state.qty_request}
                  underlineColorAndroid={'rgba(0,0,0,0)'}
                  keyboardType="numeric"
                  selectionColor={'#828282'}
                  textAlign={'center'}
                  textNumber={true}
                />
                {/* <Text style={styles.textNumber}>{this.state.qty_request}</Text> */}
                <TouchableOpacity style={styles.button} onPress={this._addProduct}>
                  <Text style={{ fontWeight: 'bold', fontSize: 15 }}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.text}>Thành tiền</Text>
              <Text style={[styles.text, { fontWeight: 'bold' }]}>{this.state.amount} vnđ</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.text}>Chiết khấu</Text>
              <Text style={styles.text}>
                {dataOrder && dataOrder.campaign ? dataOrder.campaign.discount * 100 : 0}%
              </Text>
            </View>
            <View style={{ height: 0.5, backgroundColor: 'gray', opacity: 0.5, marginLeft: 15, marginRight: 15 }} />
            <View style={styles.item}>
              <Text style={styles.text}>Tổng tiền cần thanh toán</Text>
              <Text style={[styles.text, { color: 'red' }]}>{this.state.total} vnđ</Text>
            </View>
          </View>
          <View style={{ width: '100%', height: 1, backgroundColor: 'gray', opacity: 0.5, marginTop: 10 }} />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.buttonAccept} onPress={this._cancelOrder}>
              <Text>Huỷ bỏ</Text>
            </TouchableOpacity>
            <View style={{ width: 1, height: '100%', backgroundColor: 'gray', opacity: 0.5 }} />
            <TouchableOpacity style={styles.buttonAccept} onPress={this._orderProduct}>
              <Text style={{ fontWeight: 'bold', color: '#61A02C' }}>Đồng ý</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PopupDialog>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    fontSize: vw(17),
    color: 'black',
    paddingTop: 15,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
  },
  text: {
    fontSize: vw(14),
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  textNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'gray',
    width: 60,
    borderRadius: 3,
    textAlign: 'center',
  },
  buttonAccept: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputOrder: {
    borderWidth: 1,
    borderColor: 'gray',
    width: 60,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    paddingTop: 0,
    paddingBottom: 0,
  },
});

function mapStateToProps(state) {
  return {
    info: state.user.dataUser.info,
    store: state.user.dataUser.store,
    dataOrder: state.order.dataOrder,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    cancelOrder: () => dispatch({ type: CANCEL_ORDER }),
    getPointWallet,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDialog);
