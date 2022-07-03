import React from 'react';
import { Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import vw from '../../utils/size-dynamic';
import HeaderBar from '../../elements/HeaderBar';
import OrderList from '../../components/OrderList';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import PopupCancelOrder from '../../elements/PopupCancelOrder';
import OrderByModal from '../../elements/OrderByModal';
import { getMyOrderListAction, getMyOrderListMoreAction } from '../../redux/action/order';
import LoaderIndicator from '../../elements/LoaderIndicator';
import { MyStatusBar } from '../../elements/MyStatusBar';
import { ICON_BACK, ICON_HELP } from '../../constants';
import { HOME } from '../../redux/types';

const { height, width } = Dimensions.get('window');
interface Props {
  navigation: Function;
  totalPageOrderList: number;
  info: any;
  getMyOrderListMoreAction: Function;
  getMyOrderListAction: Function;
  orderList: any;
}
interface State {
  isLoadMore: boolean;
  refreshing: boolean;
  pulling: boolean;
  page: number;
  error: boolean;
  typeOrderBy: string;
  medOrderIdCancel: any;
  providerName: any;
  isFocus: boolean;
  isFetching: boolean;
}
class MyOrderScreen extends React.PureComponent<Props, State> {
  popupDialog: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoadMore: false,
      refreshing: false,
      pulling: false,
      page: 2,
      error: false,
      typeOrderBy: '',
      medOrderIdCancel: null,
      providerName: null,
      isFocus: false,
      isFetching: false,
    };
    this.popupDialog = null;
  }

  async componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidHide', e => {
      this.setState({ isFocus: true });
    });
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidShow', e => {
      this.setState({ isFocus: true });
    });
    await this._refreshData();
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _changeLoadingIndicator = (isFetching: any) => {
    this.setState({ isFetching });
  };

  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} right={this._renderHeaderRight()} />;
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };

  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this._goBack}>
        <Image
          source={ICON_BACK}
          style={{ width: vw(11), height: vw(20), resizeMode: 'contain', marginRight: vw(10) }}
        />
        <Text style={{ fontSize: vw(18), fontFamily: 'Arial', fontWeight: 'bold', color: '#ffffff' }}>
          Đơn hàng chờ giao
        </Text>
      </TouchableOpacity>
    );
  }

  _renderHeaderRight() {
    const dataSelect = ['Mới nhất', 'Thời gian giao'];
    return (
      <OrderByModal
        data={dataSelect}
        defaultValue={this.state.typeOrderBy === '' ? dataSelect[0] : dataSelect[1]}
        onSelect={this._onSelect}
      />
    );
  }

  _onSelect = async (idx: number, value: any) => {
    if (idx.toString() === '0') {
      await this.setState({
        typeOrderBy: '',
      });
      await this._refreshData();
    } else if (idx.toString() === '1') {
      await this.setState({
        typeOrderBy: 'ship_datetime',
      });
      await this._refreshData();
    }
  };

  _fetchMoreData = async () => {
    if (this.state.isLoadMore) return;
    if (this.state.page <= this.props.totalPageOrderList && this.props.info !== null) {
      await this.setState({ isLoadMore: true });
      this.props
        .getMyOrderListMoreAction(this.props.info.drg_store_id, this.state.typeOrderBy, this.state.page)
        .then(() => {
          this.setState(prevState => ({
            isLoadMore: false,
            error: false,
            page: prevState.page + 1,
          }));
        })
        .catch(error => {
          this.setState({
            error: error,
            isLoadMore: false,
          });
        });
    }
  };

  _refreshData = async () => {
    if (this.state.refreshing) return;
    if (this.props.info !== null) {
      await this.setState({ refreshing: true });
      this.props
        .getMyOrderListAction(this.props.info.drg_store_id, this.state.typeOrderBy)
        .then(() => {
          this.setState({
            refreshing: false,
            page: 2,
          });
        })
        .catch(() => {
          this.setState({
            refreshing: false,
          });
        });
    }
  };

  _pullingData = async () => {
    if (this.state.pulling) return;
    if (this.props.info !== null) {
      await this.setState({ pulling: true });
      this.props
        .getMyOrderListAction(this.props.info.drg_store_id, this.state.typeOrderBy, 1)
        .then((res: any) => {
          this.setState({
            pulling: false,
            page: 2,
          });
        })
        .catch(() => {
          this.setState({
            pulling: false,
          });
        });
    }
  };

  _onClickCancelOrder = (med_order_id: any, provider_name: any) => {
    if (this.state.refreshing) return;
    this.setState(
      {
        medOrderIdCancel: med_order_id,
        providerName: provider_name,
      },
      () => this.popupDialog.show(),
    );
  };

  _renderCancelPopup() {
    if (this.props.info !== null) {
      let data = {
        drg_store_id: this.props.info.drg_store_id,
        drg_store_code: this.props.info.drg_store_code,
        medOrderIdCancel: this.state.medOrderIdCancel,
        providerName: this.state.providerName,
      };
      return (
        <PopupCancelOrder
          ref={(popupDialog: any) => {
            this.popupDialog = popupDialog;
          }}
          data={data}
          onDismissed={() => this._refreshData()}
          navigation={this.props.navigation}
          changeLoadingIndicator={this._changeLoadingIndicator}
        />
      );
    }
  }

  _renderOrderList() {
    return (
      <View style={{ flex: 1 }}>
        <LoaderIndicator loading={this.state.refreshing && !this.props.orderList} />
        {(!this.props.orderList || !this.props.orderList.length) && !this.state.refreshing ? (
          <View style={styles.containerIndicator}>
            <Image source={ICON_HELP} style={styles.imageIndicator} resizeMode={'contain'} />
            <Text style={styles.textIndicator}>Không chứa đơn hàng nào</Text>
          </View>
        ) : (
          <OrderList
            data={this.props.orderList}
            dataType={'PICKUP_ORDER'}
            navigation={this.props.navigation}
            onEndReached={this._fetchMoreData}
            onRefresh={this._pullingData}
            renderHeader={<View style={{ height: vw(10) }} />}
            renderFooter={<View style={{ height: vw(10) }} />}
            style={{ flex: 1, paddingRight: vw(10), marginLeft: vw(10) }}
            isLoadMore={this.state.isLoadMore}
            refreshing={this.state.pulling}
            error={this.state.error}
            onClickCancelOrder={this._onClickCancelOrder}
          />
        )}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        {this._renderOrderList()}
        {this._renderCancelPopup()}
        <LoaderIndicator loading={this.state.isFetching} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F0EDEE',
  },
  wrapHeader: {
    flexDirection: 'row',
    padding: vw(10),
  },
  wrapPopup: {
    flex: 1,
  },
  containerIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIndicator: {
    width: vw(25),
    height: vw(40),
  },
  textIndicator: {
    textAlign: 'center',
    fontFamily: 'Arial',
    fontWeight: '600',
  },
};

function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    store: state.user.dataUser.store,
    orderList: state.order.myOrderList,
    totalPageOrderList: state.order.totalPageMyOrderList,
  };
}

const mapDispatchToProps = {
  getMyOrderListMoreAction,
  getMyOrderListAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyOrderScreen);
