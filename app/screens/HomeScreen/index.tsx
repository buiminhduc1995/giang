import React from 'react';
import { Image, Text, TouchableOpacity, View, Platform, Alert, StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic';
import { ICON_LOGO, ICON_ORDER_FINISHED, ICON_ORDER_WAITING, BANNER_ORDER, WHITE, SHADOW } from '../../constants';
import HeaderBar from '../../elements/HeaderBar';
import OrderList from '../../components/OrderList';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OrderByModal from '../../elements/OrderByModal';
import { getDataHomeAction, getOrderListMoreAction } from '../../redux/action/home';
import { changeOrderByListOrder } from '../../redux/action/order';
import LoaderIndicator from '../../elements/LoaderIndicator';
// import FCM, { FCMEvent } from 'react-native-fcm';
import config from '../../config';
import api from '../../api';
import ImageCustom from '../../elements/ImageCustom/ImageCustom';
import EventBus from '../../utils/EventBus';
import LoadOrder from '../../elements/LoadOrder/';
import { ShineOverlay, Progressive } from 'rn-placeholder';
interface Props {
  totalPageOrderList: number;
  info: any;
  typeOrderBy: any;
  getDataHomeAction: Function;
  getOrderListMoreAction: Function;
  store: any;
  changeOrderByListOrder: Function;
  orderList: object;
  dashboard: any;
  navigation: Function;
  onClickFinishedOrder: Function;
  onClickOrderBanner: Function;
  onClickAcceptOrder: Function;
  onClickPickupOrder: Function;
}
interface State {
  isLoadMore: boolean;
  refreshing: boolean;
  pulling: boolean;
  page: number;
  error: boolean;
  isFetching: boolean;
}
class HomeScreen extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoadMore: false,
      refreshing: false,
      pulling: false,
      page: 2,
      error: false,
      isFetching: true,
    };
  }

  async componentWillMount() {
    await this._refreshData();
  }

  componentDidMount = async () => {
    EventBus.addListener('OrderNew', this._refreshData);
    // await setTimeout(() => {
    //   this.setState({ isFetching: true })
    // }, 2000);
    // this.setState({ isFetching: false })
    // if (this.props.autoRefresh !== false)
    //   this.intervalRefresh = setInterval(() => this._refreshData(), this.props.autoRefresh);
    // FCM.on(FCMEvent.Notification, notification => {
    //   console.log('notification1', notification);
    //   this._handleNotifyOrderForeground(notification);
    // });
    // FCM.getInitialNotification().then(notification => {
    //   console.log('notification2', notification);
    //   this._handleNotifyOrderBackground(notification);
    // });
  };

  componentWillReceiveProps(nextProps: any) {}

  componentWillUnmount() {
    clearInterval(this.intervalRefresh);
    EventBus.removeListener(this._refreshData);
  }

  _handleNotifyOrderForeground = (notification: any) => {
    if (notification == undefined) return;
    if (notification.topic != undefined && notification.topic === config.notifycation.order) {
      this._refreshData();
      // FCM.removeAllDeliveredNotifications();
    }
  };

  _handleNotifyOrderBackground = (notification: any) => {
    if (notification == undefined) return;
    if (notification.topic != undefined && notification.topic === config.notifycation.order) {
      this._refreshData();
      api.orderApi
        .getOrderDetails(notification.med_order_id)
        .then(res => {
          if (res.data.med_order_pool != undefined && res.data.med_order_pool.status === 1) {
            Alert.alert(
              'Đơn hàng đã được nhà thuốc khác nhận!',
              'Cảm ơn quý nhà thuốc đã sử dụng ứng dụng Medlink. \nVui lòng tiếp tục sử dụng dịch vụ để nhận đơn tiếp theo!',
              [{ text: 'Ok', onPress: () => this._refreshData() }],
            );
          }
        })
        .catch(err => {
          Alert.alert(
            'Đơn hàng đã được nhận!',
            'Cảm ơn quý nhà thuốc đã sử dụng ứng dụng Medlink. \nVui lòng tiếp tục sử dụng dịch vụ để nhận đơn tiếp theo!',
            [{ text: 'Ok', onPress: () => this._refreshData() }],
          );
        });
    }
  };

  _fetchMoreData = async () => {
    if (this.state.isLoadMore) return;
    if (this.state.page <= this.props.totalPageOrderList && this.props.info !== null) {
      await this.setState({ isLoadMore: true });
      this.props
        .getOrderListMoreAction(this.props.info.drg_store_id, this.props.typeOrderBy, this.state.page)
        .then(() => {
          this.setState(prevState => ({
            page: prevState.page + 1,
            error: false,
            isLoadMore: false,
          }));
        })
        .catch(err => {
          console.log(err);
          this.setState({
            error: err,
            isLoadMore: false,
          });
        });
    }
  };

  _refreshData = async () => {
    if (this.state.refreshing) return;
    if (this.props.info !== null) {
      await this.setState({ refreshing: true, isFetching: true });
      this.props
        .getDataHomeAction(this.props.info.drg_store_id, this.props.typeOrderBy)
        .then(() => {
          this.setState({
            refreshing: false,
            isFetching: false,
            page: 2,
          });
        })
        .catch(() => {
          this.setState({
            refreshing: false,
            isFetching: false,
          });
        });
    }
  };

  _pullingData = async () => {
    if (this.state.pulling) return;
    if (this.props.info !== null) {
      await this.setState({ pulling: true, isFetching: true });
      this.props
        .getDataHomeAction(this.props.info.drg_store_id, this.props.typeOrderBy)
        .then(() => {
          this.setState({
            pulling: false,
            page: 2,
            isFetching: false,
          });
        })
        .catch(() => {
          this.setState({
            pulling: false,
            isFetching: false,
          });
        });
    }
  };

  _renderHeader() {
    return (
      <HeaderBar
        left={this._renderHeaderLeft()}
        right={this._renderHeaderRight()}
        wrapLeft={{ flex: 1, paddingRight: vw(20) }}
      />
    );
  }

  _renderHeaderLeft() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={ICON_LOGO}
          style={{ width: vw(30), height: vw(30), resizeMode: 'contain', marginRight: vw(10) }}
        />
        <Text
          style={{ fontSize: vw(18), fontFamily: 'Arial', fontWeight: 'bold', color: '#ffffff', flex: 1 }}
          numberOfLines={1}
          ellipsizeMode={'tail'}
        >
          {this.props.store !== null && this.props.store.drg_name}
        </Text>
      </View>
    );
  }

  async _onSelect(idx, value) {
    if (idx.toString() === '0') {
      await this.props.changeOrderByListOrder('');
    } else if (idx.toString() === '1') {
      await this.props.changeOrderByListOrder('amount');
    }
    await this._refreshData();
  }

  _renderHeaderRight() {
    const dataSelect = ['Mới nhất', 'Giá trị đơn hàng'];
    return (
      <OrderByModal
        data={dataSelect}
        defaultValue={this.props.typeOrderBy === '' ? dataSelect[0] : dataSelect[1]}
        onSelect={(idx, value) => this._onSelect(idx, value)}
      />
    );
  }

  _renderOrderList() {
    return (
      this.props.orderList !== null && (
        <OrderList
          data={this.props.orderList}
          dataType={'NEW_ORDER'}
          navigation={this.props.navigation}
          onEndReached={this._fetchMoreData}
          onRefresh={this._pullingData}
          renderHeader={this._renderListHeader()}
          renderFooter={<View style={{ height: vw(10) }} />}
          style={{ flex: 1, paddingRight: vw(10), marginLeft: vw(10) }}
          isLoadMore={this.state.isLoadMore}
          refreshing={this.state.pulling}
          error={this.state.error}
          onClickAcceptOrder={this.props.onClickAcceptOrder}
        />
      )
    );
  }

  _renderListHeader() {
    const { isFetching } = this.state;
    return (
      <View style={{ paddingTop: vw(10) }}>
        <View style={styles.wrapHeader}>
          <TouchableOpacity
            style={[styles.box, { marginRight: vw(5), backgroundColor: '#EEA33D' }]}
            onPress={() => this.props.onClickPickupOrder()}
          >
            <Text style={styles.boxTitle}>Đơn chờ giao</Text>
            {this.props.dashboard.numPickupOrder === null ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: vw(20), paddingBottom: vw(10) }}>
                <View style={{ width: vw(32), height: vw(2), backgroundColor: '#ffffff', marginRight: vw(10) }} />
                <Text
                  style={{
                    fontFamily: 'Arial',
                    color: '#ffffff',
                    fontSize: vw(12),
                  }}
                >
                  {' '}
                  Đơn
                </Text>
              </View>
            ) : (
              <Text style={{ fontFamily: 'Arial', fontWeight: 'bold', color: '#ffffff', fontSize: vw(44) }}>
                {this.props.dashboard.numPickupOrder}
                <Text
                  style={{
                    fontFamily: 'Arial',
                    color: '#ffffff',
                    fontSize: vw(12),
                  }}
                >
                  {' '}
                  Đơn
                </Text>
              </Text>
            )}
            <Text style={{ fontSize: vw(10), fontFamily: 'Arial', color: '#ffffff' }}>
              Cập nhật: {this.props.dashboard.timeUpdate}
            </Text>
            <Image source={ICON_ORDER_WAITING} style={styles.boxIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.box, { marginLeft: vw(5), backgroundColor: '#2D9CDB' }]}
            onPress={() => this.props.onClickFinishedOrder()}
          >
            <Text style={styles.boxTitle}>Đơn đã hoàn thành</Text>
            {this.props.dashboard.numDoneOrder === null ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: vw(20), paddingBottom: vw(10) }}>
                <View style={{ width: vw(32), height: vw(2), backgroundColor: '#ffffff', marginRight: vw(10) }} />
                <Text
                  style={{
                    fontFamily: 'Arial',
                    color: '#ffffff',
                    fontSize: vw(12),
                  }}
                >
                  {' '}
                  Đơn
                </Text>
              </View>
            ) : (
              <Text style={{ fontFamily: 'Arial', fontWeight: 'bold', color: '#ffffff', fontSize: vw(44) }}>
                {this.props.dashboard.numDoneOrder}
                <Text
                  style={{
                    fontFamily: 'Arial',
                    color: '#ffffff',
                    fontSize: vw(12),
                  }}
                >
                  {' '}
                  Đơn
                </Text>
              </Text>
            )}
            <Text style={{ fontSize: vw(10), fontFamily: 'Arial', color: '#ffffff' }}>
              Cập nhật: {this.props.dashboard.timeUpdate}
            </Text>
            <Image source={ICON_ORDER_FINISHED} style={styles.boxIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ paddingBottom: 5 }} onPress={() => this.props.onClickOrderBanner()}>
          <ImageCustom source={BANNER_ORDER} style={{ width: '100%', height: 100, resizeMode: 'stretch' }} />
        </TouchableOpacity>
        <Text
          style={{ fontSize: vw(14), fontFamily: 'Arial', fontWeight: 'bold', color: '#4F4F4F', marginBottom: vw(5) }}
        >
          Đơn hàng cần giao
        </Text>
      </View>
    );
  }

  render() {
    const { isFetching, refreshing, pulling } = this.state;
    return (
      <View style={[styles.container]}>
        {this._renderHeader()}
        {isFetching ? (
          <LoadOrder loading={isFetching} number={10} animation={ShineOverlay} style={{ marginHorizontal: vw(5) }} />
        ) : (
          this._renderOrderList()
        )}
      </View>
    );
  }
}

HomeScreen.propTypes = {
  onClickPickupOrder: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F0EDEE',
  },
  wrapHeader: {
    flexDirection: 'row',
    marginBottom: vw(10),
  },
  box: {
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden',
    paddingHorizontal: vw(10),
    paddingVertical: vw(10),
  },
  boxTitle: {
    fontSize: vw(12),
    color: '#ffffff',
    fontFamily: 'Arial',
  },
  boxIcon: {
    width: vw(40),
    height: vw(40),
    marginRight: 10,
    position: 'absolute',
    top: '50%',
    right: vw(0),
    marginTop: vw(-10),
  },
});

function mapStateToProps(state: any) {
  return {
    store: state.user.dataUser.store,
    info: state.user.dataUser.info,
    autoRefresh: state.configReducer.autoRefresh,
    orderList: state.order.orderList,
    totalPageOrderList: state.order.totalPageOrderList,
    dashboard: state.order,
    typeOrderBy: state.order.typeOrderBy,
  };
}

const mapDispatchToProps = {
  getDataHomeAction,
  getOrderListMoreAction,
  changeOrderByListOrder,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
