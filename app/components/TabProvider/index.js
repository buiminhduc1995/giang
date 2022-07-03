import React, { Component } from 'react';
import { View } from 'react-native';
import vw from "../../utils/size-dynamic";
import API from "../../api";
import ProviderList from '../../components/ProviderList';
import { connect } from 'react-redux';
import LoaderIndicator from '../../elements/LoaderIndicator';

class TabProvider extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isLoadMore: false,
      refreshing: false,
      pulling: false,
      providerList: [],
      page: 2,
      totalPage: 0,
      error: false,
      isFetching:false
    }
  }

  async componentWillMount() {
    await this._refreshData();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isUpdate !== nextProps.isUpdate) {
      this._refreshData();
    }
  }

  _fetchMoreData = async () => {
    const account_id = this.props.info !== null && this.props.info.account_id
    if (this.state.isLoadMore) return;
    if (this.state.page <= this.state.totalPage) {
      await this.setState({ isLoadMore: true });
      API.companyApi.getProviderList(account_id, this.state.page).then(res => {
        if (res.data.data.length > 0)
          this.setState(prevState => ({
            isLoadMore: false,
            page: prevState.page + 1,
            providerList: [...this.state.providerList, ...res.data.data],
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
    const account_id = this.props.info !== null && this.props.info.account_id
    if (this.state.pulling) return;
    await this.setState({ pulling: true });
    API.companyApi.getProviderList(account_id, 1).then(res => {
      this.setState({
        pulling: false,
        page: 2,
        providerList: res.data.data,
        totalPage: res.data.total_page
      })
    }).catch(() => {
      this.setState({
        pulling: false
      });
    });
  };

  _refreshData = async () => {
    const account_id = this.props.info !== null && this.props.info.account_id
    if (this.state.refreshing) return;
    await this.setState({ refreshing: true, isFetching:true });
    API.companyApi.getProviderList(account_id, 1).then(res => {
      this.setState({
        refreshing: false,
        page: 2,
        providerList: res.data.data,
        totalPage: res.data.total_page,
        isFetching:false,
      });
      console.log(res)
    }).catch(() => {
      this.setState({
        refreshing: false,
        isFetching:false
      });
    });
  };

  render() {
    return (
      <View style={{flex:1}}>
        <ProviderList
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
          onUpdateProviderSuccess={() => {
            this._refreshData();
          }}
        />
        <LoaderIndicator loading={this.state.isFetching} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    isUpdate: state.company.isUpdate,
    info: state.user.dataUser.info
  };
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TabProvider);