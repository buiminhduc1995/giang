import React, { Component } from 'react';
import { View } from 'react-native';
import vw from "../../utils/size-dynamic";
import API from "../../api";
import OrderList from "../../components/OrderList";
import { connect } from "react-redux";
import  LoaderIndicator from '../../elements/LoaderIndicator';

class TabOrderList extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isLoadMore: false,
      refreshing: false,
      pulling: false,
      orderList: [],
      page: 2,
      totalPage: 0,
      error: false,
      isFetching:false
    }
  }

  async componentWillMount() {
    await this._refreshData();
  }

  _fetchMoreData = async () => {
    if (this.state.isLoadMore) return;
    if (this.state.page <= this.state.totalPage && this.props.info !== null) {
      await this.setState({ isLoadMore: true });
      API.orderApi.getListOrder(this.props.info.drg_store_id, this.props.storeProviderId, "ship_datetime", this.state.page).then(async res => {
        if (res.data.data.length > 0)
          this.setState(prevState => ({
            isLoadMore: false,
            page: prevState.page + 1,
            orderList: [...this.state.orderList, ...res.data.data],
            totalPage: res.data.total_page
          }))
      }).catch(error => {
        let mError = "";
        if (error.response) {
          mError = error.response.data
        } else {
          mError = error.message
        }
        this.setState({
          error: mError,
          isLoadMore: false
        });
      });
    }
  };

  _pullingData = async () => {
    if (this.state.pulling) return;
    if (this.props.info !== null) {
      await this.setState({ pulling: true });
      API.orderApi.getListOrder(this.props.info.drg_store_id, this.props.storeProviderId, "ship_datetime", 1).then(res => {
        this.setState({
          pulling: false,
          page: 2,
          orderList: res.data.data,
          totalPage: res.data.total_page
        })
      }).catch(() => {
        this.setState({
          pulling: false
        });
      });
    }
  };

  _refreshData = async () => {
    if (this.state.refreshing) return;
    if (this.props.info !== null) {
      await this.setState({ refreshing: true, isFetching: true });
      API.orderApi.getListOrder(this.props.info.drg_store_id, this.props.storeProviderId, "ship_datetime", 1).then(async res => {
        await this.setState({
          refreshing: false,
          page: 2,
          orderList: res.data.data,
          totalPage: res.data.total_page,
          isFetching:false,
        });
      }).catch(() => {
        this.setState({
          refreshing: false,
          isFetching:false,
        });
      });
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <OrderList
          data={this.state.orderList}
          navigation={this.props.navigation}
          onEndReached={this._fetchMoreData}
          onRefresh={this._pullingData}
          renderFooter={<View style={{ height: vw(10) }} />}
          renderHeader={<View style={{ height: vw(10) }} />}
          style={{ flex: 1, paddingRight: vw(10), marginLeft: vw(10) }}
          isLoadMore={this.state.isLoadMore}
          refreshing={this.state.pulling}
          error={this.state.error}
          dataType={"NEW_ORDER"}
        />
        <LoaderIndicator loading={this.state.isFetching}/>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    info: state.user.dataUser.info
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(TabOrderList);