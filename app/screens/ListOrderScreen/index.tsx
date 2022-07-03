import React from 'react';
import { Text, View } from 'react-native';
import vw from '../../utils/size-dynamic';
import HeaderBar from '../../elements/HeaderBar';
import OrderList from '../../components/OrderList';
import { connect } from 'react-redux';
import OrderByModal from '../../elements/OrderByModal';
import { getOrderListAction, getOrderListMoreAction } from '../../redux/action/home';
import { changeOrderByListOrder } from '../../redux/action/order';
type Props = {
  getOrderListMoreAction: Function;
  info: any;
  typeOrderBy: any;
  totalPageOrderList: number;
  getOrderListAction: Function;
  changeOrderByListOrder: Function;
  orderList: any;
  navigation: Function;
  onClickAcceptOrder: any;
};
type State = {
  isLoadMore: boolean;
  refreshing: boolean;
  pulling: boolean;
  page: number;
  error: boolean;
};
class ListOrderScreen extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isLoadMore: false,
      refreshing: false,
      pulling: false,
      page: 2,
      error: false,
    };
  }

  async componentWillMount() {
    await this._refreshData();
  }

  componentWillReceiveProps(nextProps: any) {}

  componentDidMount() {}

  componentWillUnmount() {}

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
          this.setState({
            error: err,
            isLoadMore: false,
          });
        });
    }
  };

  _pullingData = async () => {
    if (this.state.pulling) return;
    if (this.props.info !== null) {
      await this.setState({ pulling: true });
      this.props
        .getOrderListAction(this.props.info.drg_store_id, this.props.typeOrderBy)
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

  _refreshData = async () => {
    if (this.state.refreshing) return;
    if (this.props.info !== null) {
      await this.setState({ refreshing: true });
      this.props
        .getOrderListAction(this.props.info.drg_store_id, this.props.typeOrderBy)
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

  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} right={this._renderHeaderRight()} />;
  }

  _renderHeaderLeft() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: vw(18), fontFamily: 'Arial', fontWeight: 'bold', color: '#ffffff' }}>
          Danh sách đơn hàng
        </Text>
      </View>
    );
  }

  async _onSelect(idx: string, value: any) {
    if (idx.toString() === '0') {
      await this.props.changeOrderByListOrder('');
      await this._refreshData();
    } else if (idx.toString() === '1') {
      await this.props.changeOrderByListOrder('amount');
      await this._refreshData();
    }
  }

  _renderHeaderRight() {
    const dataSelect = ['Mới nhất', 'Giá trị đơn hàng'];
    return (
      <OrderByModal
        data={dataSelect}
        defaultValue={this.props.typeOrderBy === '' ? dataSelect[0] : dataSelect[1]}
        onSelect={(idx: string, value: any) => this._onSelect(idx, value)}
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
          renderFooter={<View style={{ height: vw(10) }} />}
          renderHeader={<View style={{ height: vw(10) }} />}
          style={{ flex: 1, paddingRight: vw(10), marginLeft: vw(10) }}
          isLoadMore={this.state.isLoadMore}
          refreshing={this.state.pulling}
          error={this.state.error}
          onClickAcceptOrder={this.props.onClickAcceptOrder}
        />
      )
    );
  }

  render() {
    return (
      <View style={styles.container}>
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
};

function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    store: state.user.dataUser.store,
    autoRefresh: state.configReducer.autoRefresh,
    orderList: state.order.orderList,
    totalPageOrderList: state.order.totalPageOrderList,
    typeOrderBy: state.order.typeOrderBy,
  };
}

const mapDispatchToProps = {
  getOrderListAction,
  getOrderListMoreAction,
  changeOrderByListOrder,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListOrderScreen);
