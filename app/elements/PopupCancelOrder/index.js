import React, { PureComponent } from 'react';
import { Alert, Dimensions, Image, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ICON_CLOSE, MAIN_COLOR } from "../../constants";
import API from "../../api";
import vw from "../../utils/size-dynamic";
import PopupDialog, { SlideAnimation } from "react-native-popup-dialog";
import RadioGroup, { RadioItem } from "../RadioGroup";
import { getDataHomeAction, getOrderListAction } from "../../redux/action/home";
import { getPointWallet } from '../../redux/action/rewardPoint';
import { connect } from "react-redux";
import { getMyOrderListAction } from "../../redux/action/order";

const { height, width } = Dimensions.get('window');

const slideAnimation = new SlideAnimation({
  slideFrom: 'top',
});

class PopupCancelOrder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cancelReason: 1,
      otherReason: "",
      visible: false,
    }
  }
  _addNewRewardPoint = () => {
    const { info, store } = this.props.dataUser;
    const params = {
      account_id: info.account_id,
      drg_store_id: store.drg_store_id,
      exchange_id: 0,
      point: 1000,
      type: 0
    }
    API.rewardPointApi.updateRewardPoint(params).then(res => {
      this.props.getPointWallet(store.drg_store_id);
      Alert.alert("Thông báo", `Bạn bị trừ ${params.point} điểm thưởng do không hoàn thành đơn hàng`);
    })
  }

  show = () => {
    this.setState({ visible: true })
  }
  close = () => {
    this.setState({ visible: false });
  }
  _cancelOrder = () => {
    const { drg_store_id, drg_store_code, medOrderIdCancel, providerName } = this.props.data;
    this.setState({ visible: false }, () => {
      this.setState({ refreshing: true }, () => {
        Keyboard.dismiss();
        this.props.changeLoadingIndicator(true);
        API.orderApi.cancelOrder(drg_store_id, drg_store_code, medOrderIdCancel, providerName,
          this.state.cancelReason, this.state.cancelReason === 9 ? this.state.otherReason : "").then(res => {
            if (this.state.cancelReason === 9) {
              this._addNewRewardPoint();
            }
            this.props.changeLoadingIndicator(false);
            this.setState({
              refreshing: false
            }, async () => {
              await this.props.getMyOrderListAction(drg_store_id, "");
              await this.props.getDataHomeAction(drg_store_id, this.props.typeOrderBy);
              await this.props.getOrderListAction(drg_store_id, this.props.typeOrderBy);
              API.notification.cancelLocalNotification(medOrderIdCancel);
              // if (this.props.isGoBack) this.props.navigation.goBack();
              return this.props.onDismissed()

            });
          }).catch(err => {
            this.props.changeLoadingIndicator(false);
            this.setState({
              refreshing: false
            }, () => {
              Alert.alert(
                'Thông báo',
                'Có lỗi xảy ra!',
                [
                  { text: 'OK', onPress: () => this.props.onDismissed() },
                ],
                { cancelable: false }
              );
            });
          })
      });
    });
  }
  render() {
    return (
      <PopupDialog
        visible={this.state.visible}
        ref={(popupDialog) => {
          this.popupDialog = popupDialog;
          // this.props.refer(popupDialog);
        }}
        dialogAnimation={slideAnimation}
        width={width - 30}
        containerStyle={{ justifyContent: "flex-start" }}
        dialogStyle={{ zIndex: 100, borderRadius: vw(12), top: vw(30), overflow: "hidden", height: vw(300) }}
        onDismissed={() => Keyboard.dismiss()}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", padding: vw(15) }}>
            <TouchableOpacity hitSlop={{ top: vw(30), left: vw(30), bottom: vw(30), right: vw(30) }}
              onPress={() => this.setState({ visible: false })}>
              <Image source={ICON_CLOSE} style={{ width: vw(15), height: vw(15) }} />
            </TouchableOpacity>
            <Text style={{
              flex: 1,
              textAlign: "center",
              fontFamily: "Arial",
              fontSize: vw(14),
              color: "#4F4F4F",
              fontWeight: "bold"
            }}>Lý do hủy đơn</Text>
          </View>
          <View style={{ flex: 1, padding: vw(15) }}>
            <RadioGroup>
              <RadioItem
                title={"Khách gọi hủy đơn"}
                checked={this.state.cancelReason === 1}
                onPress={() => {
                  this.setState({
                    cancelReason: 1
                  })
                }} />
              <RadioItem
                title={"Không liên hệ được với khách hàng"}
                checked={this.state.cancelReason === 2}
                onPress={() => {
                  this.setState({
                    cancelReason: 2
                  })
                }} />
              <RadioItem
                title={"Không tìm được địa chỉ"}
                checked={this.state.cancelReason === 3}
                onPress={() => {
                  this.setState({
                    cancelReason: 3
                  })
                }} />
              <RadioItem
                title={"Lý do khác"}
                checked={this.state.cancelReason === 9}
                onPress={() => {
                  this.setState({
                    cancelReason: 9
                  });
                }} />
            </RadioGroup>
            <TextInput
              multiline
              selectionColor="#4F4F4F"
              numberOfLines={10}
              textAlignVertical="top"
              underlineColorAndroid="transparent"
              onChangeText={(otherReason) => {
                this.setState({ otherReason: otherReason })
              }}
              value={this.state.otherReason}
              editable={this.state.cancelReason === 9}
              style={{
                borderRadius: vw(12),
                backgroundColor: "#F2F2F2",
                paddingHorizontal: vw(10),
                flex: 1
              }}
              onBlur={() => {
                this.setState({
                  isFocus: false
                });
              }}
              onFocus={() => {
                this.setState({
                  isFocus: true
                });
              }}
            />
          </View>
          <TouchableOpacity
            onPress={this._cancelOrder}
            style={{
              backgroundColor: MAIN_COLOR,
              height: vw(50),
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                textAlign: "center", fontFamily: "Arial", fontSize: vw(14), color: "#ffffff", fontWeight: "bold"
              }}
            >XÁC NHẬN HỦY</Text>
          </TouchableOpacity>
        </View>
      </PopupDialog>
    );
  }
}

function mapStateToProps(state) {
  return {
    dataUser: state.user.dataUser,
    typeOrderBy: state.order.typeOrderBy
  };
}

const mapDispatchToProps = {
  getOrderListAction,
  getDataHomeAction,
  getMyOrderListAction,
  getPointWallet
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(PopupCancelOrder);
// export default PopupCancelOrder ;