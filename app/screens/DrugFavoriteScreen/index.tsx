import React, { Component } from 'react';
import { Image, Platform, Text, View, TouchableOpacity, Alert, Dimensions } from 'react-native';
import vw from '../../utils/size-dynamic';
import { ICON_BACK } from '../../constants';
import HeaderBar from '../../elements/HeaderBar';
import { connect } from 'react-redux';
import DrugList from '../../components/DrugList';
import API from '../../api';
import { onUpdateFavoriteAction } from '../../redux/action/product';
import { MyStatusBar } from '../../elements/MyStatusBar';
import OrderDialog from '../../components/OrderDialog';

const { height, width } = Dimensions.get('window');
type State = {
  isLoadMore: boolean;
  totalPage: number;
  providerList: any;
  page: number;
  refreshing: boolean;
  pulling: boolean;
  error: boolean;
  orderBy: any;
  dataItem: any;
  amount: number;
  qty_request: number;
  update: boolean;
};
type Props = {
  orderBy: any;
  navigation: Function;
  info: any;
  onUpdateFavoriteAction: Function;
};
class DrugFavoriteScreen extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      providerList: [],
      page: 2,
      totalPage: 0,
      isLoadMore: false,
      refreshing: false,
      pulling: false,
      error: false,
      orderBy: props.orderBy || null,
      dataItem: null,
      amount: 0,
      qty_request: 1,
      update: false,
    };
  }

  async componentWillMount() {
    await this._refreshData();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.orderBy !== nextProps.orderBy) {
      this.setState(
        {
          orderBy: nextProps.orderBy,
        },
        () => this._refreshData(),
      );
    }

    if (nextProps.data != undefined) {
      this.setState(
        {
          dataItem: nextProps.data.data,
          amount: nextProps.data.data.price * 1,
        },
        () => nextProps.data.data.campaign != null && this.popupDialog.show(),
      );
    }
  }

  _fetchMoreData = async () => {
    const account_id = this.props.info !== null && this.props.info.account_id;
    if (this.state.isLoadMore) return;
    if (this.state.page <= this.state.totalPage) {
      await this.setState({ isLoadMore: true });
      API.productApi
        .getDrugFavorite(account_id, this.state.page)
        .then(async res => {
          if (res.data.data.length > 0)
            this.setState(prevState => ({
              isLoadMore: false,
              page: prevState.page + 1,
              providerList: [...this.state.providerList, ...res.data],
              totalPage: res.data.total_page,
            }));
        })
        .catch(error => {
          let mError = '';
          if (error.response) {
            mError = error.response.data;
          } else {
            mError = error.message;
          }
          this.setState({ error: mError, isLoadMore: false });
        });
    }
  };

  _pullingData = async () => {
    const account_id = this.props.info !== null && this.props.info.account_id;
    if (this.state.pulling) return;
    await this.setState({ pulling: true });
    API.productApi
      .getDrugFavorite(account_id, this.state.page)
      .then(res => {
        this.setState({
          pulling: false,
          page: 2,
          providerList: [...this.state.providerList, ...res.data],
          totalPage: res.data.total_page,
        });
      })
      .catch(() => {
        this.setState({
          pulling: false,
        });
      });
  };

  _refreshData = async () => {
    const account_id = this.props.info !== null && this.props.info.account_id;
    if (this.state.refreshing) return;
    await this.setState({ refreshing: true });
    API.productApi
      .getDrugFavorite(account_id, 1)
      .then(async res => {
        await res.data.map(item => (item.favorite = 1));
        await this.setState({
          refreshing: false,
          page: 2,
          providerList: res.data,
          totalPage: res.data.total_page,
        });
      })
      .catch(() => {
        this.setState({
          refreshing: false,
        });
      });
  };

  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }

  _renderHeaderLeft() {
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={() => this.props.navigation.goBack()}
      >
        <Image
          source={ICON_BACK}
          style={{ width: vw(11), height: vw(20), resizeMode: 'contain', marginRight: vw(10) }}
        />
        <Text style={{ fontSize: vw(18), fontFamily: 'Arial', fontWeight: 'bold', color: '#ffffff' }}>
          Danh sách nhãn hàng yêu thích
        </Text>
      </TouchableOpacity>
    );
  }

  _renderBody() {
    return (
      <DrugList
        data={this.state.providerList}
        navigation={this.props.navigation}
        onEndReached={this._fetchMoreData}
        onRefresh={this._pullingData}
        renderFooter={<View style={{ height: vw(10) }} />}
        renderHeader={<View style={{ height: vw(10) }} />}
        style={{ flex: 1, paddingRight: vw(10), marginLeft: vw(10) }}
        isLoadMore={this.state.isLoadMore}
        refreshing={this.state.pulling}
        error={this.state.error}
        type={'DrugFavorite'}
        onUpdateProductSuccess={() => {
          this._refreshData();
          this.props.onUpdateFavoriteAction();
        }}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        {this._renderBody()}
        <OrderDialog />
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
  },
  wrapBody: {
    flex: 1,
  },
};

function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    data: state.auth.data4,
  };
}

const mapDispatchToProps = {
  onUpdateFavoriteAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrugFavoriteScreen);
