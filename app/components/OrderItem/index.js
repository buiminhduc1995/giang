import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { HOME, ORDERDETAIL } from "../../redux/types";
import {
  ICON_CALENDAR_COLOR,
  ICON_MAP_MARKER_COLOR,
  MAIN_COLOR,
  ICON_NO_IMAGE
} from "../../constants";
import withPreventDoubleClick from "../../elements/withPreventDoubleClick";
import vw from '../../utils/size-dynamic';
import PropTypes from 'prop-types';
import API from "../../api";
import appConfig from "../../config";
import CheckImage from "../../utils/CheckImage";
import { DateFormatOrderItem } from "../../utils/DateFormat";

const TouchableOpacityEx = withPreventDoubleClick(TouchableOpacity);
class OrderItem extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isRequesting: false
    };
    this._onClickItem = this._onClickItem.bind(this);
    this._onClickAcceptOrder = this._onClickAcceptOrder.bind(this);
    this._onClickCancelOrder = this._onClickCancelOrder.bind(this);
  }

  _onClickItem() {
    const data = {
      dataType: this.props.dataType,
      medOrderId: this.props.data.med_order_id
    };
    this.props.navigation.navigate(ORDERDETAIL, { dataOrderDetailScreen: data });
  };

  _getDirections(startLoc, destinationLoc) {
    let item = this.props.data;
    API.mapApi.getDirections(startLoc, destinationLoc).then(res => {
      if (res !== false) {
        this.setState({
          distance: res.distance
        });
        if (res.distance <= 50) {
          this.setState({ isRequesting: true }, () => {
            API.orderApi.acceptOrder(this.props.dataUser.info.drg_store_id, this.props.dataUser.info.drg_store_code, item.med_order_id).then(res => {
              this.setState({
                isRequesting: false
              });
              this.props.navigation.dispatch({
                data: {
                  tabType: 'PICKUP_ORDER_TAB'
                }, type: HOME
              });
            }).catch(err => {
              this.setState({
                isRequesting: false
              });
              console.log(err)
            })
          });
        } else {
          Alert.alert(
            'Thông báo',
            'Bạn không thể nhận đơn với khoảng cách quá 50km.',
            [
              { text: 'OK' },
            ],
            { cancelable: false }
          );
        }
      }
    }).catch((error) => {

    });
  }

  _onClickAcceptOrder() {
    let item = this.props.data;
    if (this.state.isRequesting) return;
    start = this.props.store.address1 + ',' + this.props.store.district;
    end = item.address1 + ',' + item.district;
    if (start != null && start != '' && end != null && end != '') {
      this._getDirections(start, end);
    }
  };

  _onClickCancelOrder() {
    let item = this.props.data;
    let data = {
      tabType: 'PICKUP_ORDER_TAB'
    };
    if (this.state.isRequesting) return;
    this.setState({ isRequesting: true }, () => {
      API.orderApi.cancelOrder(this.props.dataUser.drg_store_id, this.props.dataUser.drg_store_code, item.med_order_id).then(res => {
        console.log(res);
        this.setState({
          isRequesting: false
        });
        this.props.navigation.dispatch({ data, type: HOME });
      }).catch(err => {
        this.setState({
          isRequesting: false
        });
        console.log(err)
      })
    });
  };

  render() {
    const item = this.props.data;
    const dataType = this.props.dataType;
    return (
      <TouchableOpacityEx style={styles.container}
        onPress={this.props.onClickItem ? () => this.props.onClickItem(this.props.data) : this._onClickItem}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ alignItems: "center" }}>
            <Image style={{ width: vw(38), height: vw(38), borderRadius: vw(38 / 2), resizeMode: "contain" }}
              source={CheckImage(item.img_url) ? { uri: appConfig.baseWebURL + '/' + item.img_url } : ICON_NO_IMAGE} />
          </View>

          <View style={{ marginLeft: vw(10), flex: 1 }}>
            <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} ellipsizeMode={'tail'}
                  style={[styles.name]}>{item.order_title} {item.distance && '(' + item.distance + ' km)'}</Text>

                <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", marginRight: vw(10) }}>
                  {
                    item.type === 'orderOther' ? null :
                      <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flexWrap: "wrap",
                        marginRight: vw(5),
                        flex: 1
                      }}>
                        <Image source={ICON_CALENDAR_COLOR}
                          style={{ width: vw(14), height: vw(14), resizeMode: "contain", marginRight: vw(3) }} />
                        <Text
                          numberOfLines={1} ellipsizeMode={'tail'}
                          style={{ color: "#4F4F4F", fontSize: vw(12), fontFamily: "Arial", flex: 1 }}>
                          {DateFormatOrderItem(item.ship_datetime)}
                        </Text>
                      </View>
                  }

                  <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", flex: 1 }}>
                    <Image source={ICON_MAP_MARKER_COLOR}
                      style={{ width: vw(14), height: vw(14), resizeMode: "contain", marginRight: vw(3) }} />
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={{ color: "#4F4F4F", fontSize: vw(12), fontFamily: "Arial", flex: 1 }}>
                      {item.district || "null"}
                    </Text>
                  </View>
                </View>
              </View>
              {
                dataType === 'NEW_ORDER' ?
                  <TouchableOpacity style={{
                    alignItems: "center",
                    backgroundColor: MAIN_COLOR,
                    borderRadius: 5,
                    width: vw(100),
                    paddingVertical: vw(5)
                  }} onPress={this.props.onClickAcceptOrder ?
                    () => this.props.onClickAcceptOrder(item)
                    : this._onClickAcceptOrder}>
                    <Text style={{ color: "#ffffff", fontSize: vw(12), fontFamily: "Arial" }}>Nhận đơn (đ)</Text>
                    <Text style={{ color: "#ffffff", fontSize: vw(14), fontFamily: "Arial", fontWeight: "bold" }}>
                      {item.amount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") || "0"}
                    </Text>
                  </TouchableOpacity> : null
              }
              {
                dataType === 'PICKUP_ORDER' ?
                  <TouchableOpacity
                    style={{ alignItems: "flex-end", paddingHorizontal: vw(10), paddingVertical: vw(5) }}
                    onPress={this.props.onClickCancelOrder ?
                      () => this.props.onClickCancelOrder(item.med_order_id, item.provider_name)
                      : this._onClickCancelOrder}
                  >
                    <Text style={{ color: "#EB5757", fontSize: vw(12), fontFamily: "Arial", fontWeight: "bold" }}>Hủy đơn</Text>
                    <Text style={{ color: "#EB5757", fontSize: vw(14), fontFamily: "Arial", fontWeight: "bold" }}>
                      {item.amount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") || "0"} đ
                  </Text>
                  </TouchableOpacity> : null
              }
              {
                dataType === 'cancel' ?
                  <TouchableOpacity style={{ alignItems: "flex-end", paddingHorizontal: vw(10), paddingVertical: vw(5) }}>
                    <Text style={{ color: "#EB5757", fontSize: vw(12), fontFamily: "Arial", fontWeight: "bold" }}>Đã
                    hủy</Text>
                    <Text style={{ color: "#EB5757", fontSize: vw(14), fontFamily: "Arial", fontWeight: "bold" }}>
                      {item.price}
                    </Text>
                  </TouchableOpacity> : null
              }
              {
                dataType === 'FINISHED_ORDER' ?
                  <View style={{ alignItems: "flex-end", paddingHorizontal: vw(10), paddingVertical: vw(5) }}>
                    <Text style={{ color: "#2D9CDB", fontSize: vw(12), fontFamily: "Arial", fontWeight: "bold" }}>Hoàn
                    Thành</Text>
                    <Text style={{ color: "#EB5757", fontSize: vw(14), fontFamily: "Arial", fontWeight: "bold" }}>
                      {item.amount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") || "0"} đ
                  </Text>
                  </View> : null
              }
              {
                dataType === 'PICKUP_ORDER_MAP' ?
                  <View style={{ alignItems: "flex-end", paddingHorizontal: vw(10), paddingVertical: vw(5) }}>
                    <Text
                      style={{ color: MAIN_COLOR, fontSize: vw(14), fontFamily: "Arial", fontWeight: "bold" }}>{item.distance}</Text>
                    <Text style={{ color: "#EB5757", fontSize: vw(14), fontFamily: "Arial", fontWeight: "bold" }}>
                      {item.amount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") || "0"} đ
                  </Text>
                  </View> : null
              }
            </View>
          </View>
        </View>

      </TouchableOpacityEx>
    );
  }
}

OrderItem.propTypes = {
  data: PropTypes.object,
  onClickItem: PropTypes.func,
  onClickCancelOrder: PropTypes.func,
  onClickAcceptOrder: PropTypes.func,
  dataType: PropTypes.string.isRequired
};

const styles = {
  container: {
    flex: 1,
    padding: vw(10),
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  name: {
    fontSize: vw(14),
    color: "#4F4F4F",
    fontFamily: "Arial", fontWeight: "bold",
    marginBottom: vw(3),
    paddingRight: vw(10)
  }
};

function mapStateToProps(state) {
  return {
    dataUser: state.user.dataUser,
    store: state.user.dataUser.store,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);