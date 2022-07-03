import React, { Component } from 'react';
import { BackHandler, Image, Text, TouchableOpacity, View } from 'react-native';
import vw from '../../utils/size-dynamic';
import HeaderBar from '../../elements/HeaderBar';
import OrderList from '../../components/OrderList';
import { connect } from 'react-redux';
import { ICON_BACK, ICON_HELP } from '../../constants';
import { HOME } from '../../redux/types';
import { getFinishedOrderListAction, getFinishedOrderListMoreAction } from '../../redux/action/order';
import { MyStatusBar } from '../../elements/MyStatusBar';
import LoaderIndicator from '../../elements/LoaderIndicator';

interface Props {
  navigation: Function;
  info: any;
  totalPageOrderList: number;
  getFinishedOrderListMoreAction: Function;
  getFinishedOrderListAction: Function;
  orderList: any;
}
interface State {
  isLoadMore: boolean;
  refreshing: boolean;
  pulling: boolean;
  error: boolean;
  page: number;
}

class HistoryOrderScreen extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      refreshing: false,
      pulling: false,
      error: false,
      page: 2,
      isLoadMore: false,
    };
  }

  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress);
  }

  _handleBackPress = () => {
    this._goBack();
    return true;
  };

  async componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this._handleBackPress);
    await this._refreshData();
  }

  _goBack = () => {
    const { beforeScreen } = this.props.navigation.state.params;
    // if (beforeScreen === 'home')
    return this.props.navigation.goBack();
    // this.props.navigation.dispatch({data: {tabType: 'HOME_TAB'}, type: HOME})
  };

  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this._goBack}>
        <Image
          source={ICON_BACK}
          style={{ width: vw(11), height: vw(20), resizeMode: 'contain', marginRight: vw(10) }}
        />
        <Text style={{ fontSize: vw(18), fontFamily: 'Arial', fontWeight: 'bold', color: '#ffffff' }}>
          Lịch sử đơn hàng
        </Text>
      </TouchableOpacity>
    );
  }

  _fetchMoreData = async () => {
    if (this.state.isLoadMore) return;
    if (this.state.page <= this.props.totalPageOrderList && this.props.info !== null) {
      await this.setState({ isLoadMore: true });
      this.props
        .getFinishedOrderListMoreAction(this.props.info.drg_store_id, this.state.page)
        .then((res:any) => {
          this.setState(prevState => ({
            isLoadMore: false,
            error: false,
            page: prevState.page + 1,
          }));
        })
        .catch((error: any) => {
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
        .getFinishedOrderListAction(this.props.info.drg_store_id)
        .then((res:any) => {
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
        .getFinishedOrderListAction(this.props.info.drg_store_id)
        .then(() => {
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
            dataType={'FINISHED_ORDER'}
            navigation={this.props.navigation}
            onEndReached={this._fetchMoreData}
            onRefresh={this._pullingData}
            renderHeader={<View style={{ height: vw(10) }} />}
            renderFooter={<View style={{ height: vw(10) }} />}
            style={{ flex: 1, paddingRight: vw(10), marginLeft: vw(10) }}
            isLoadMore={this.state.isLoadMore}
            refreshing={this.state.pulling}
            error={this.state.error}
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
    orderList: state.order.finishedOrderList,
    totalPageOrderList: state.order.totalPageFinishedOrderList,
  };
}

const mapDispatchToProps = {
  getFinishedOrderListAction,
  getFinishedOrderListMoreAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HistoryOrderScreen);
