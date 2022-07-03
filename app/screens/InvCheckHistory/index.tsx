import React, { PureComponent } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import styles from './InvCheckHistory.styles';
import { themes } from '../../constants';
import API from '../../api';
import { connect } from 'react-redux';
import ItemTimeCheckInventory from '../../components/ItemTimeCheckInventory';
import { INV_CHECK_DETAIL, INV_CHECK_CREATE } from '../../redux/types';
import Moment from 'moment/moment';
import EventBus from '../../utils/EventBus';
import LoadContent from '../../elements/LoadContent/';
import { ShineOverlay, Progressive } from 'rn-placeholder';
import vw from '../../utils/size-dynamic';
import { Navigation } from '../../dataType/';
import TextEmpty from '../../elements/TextEmpty/';
type Props = {
  navigation: Navigation;
  info: any;
};
interface State {
  page: number;
  totalPage: number;
  loadMore: boolean;
  isOpenFirst: boolean;
  dataListCheckInventory: any;
  isFetching: boolean;
  date: any;
  isRefreshing: boolean;
}
class index extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      page: 0,
      totalPage: 0,
      loadMore: true,
      isOpenFirst: true,
      dataListCheckInventory: [],
      isFetching: false,
      date: '',
      isRefreshing: false,
    };
  }
  componentDidMount() {
    if (this.state.isOpenFirst) {
      this.getListCheckInventory();
    }
    var dateNow = Moment().format('DD/MM/YYYY');
    this.setState({ date: dateNow });
    EventBus.addListener('CheckInventorySucces', this.callGetHistory);
  }
  callGetHistory = async () => {
    await this.setState({ page: 0, dataListCheckInventory: [] });
    this.getListCheckInventory();
  };
  getListCheckInventory = async () => {
    const { info } = this.props;
    const { dataListCheckInventory, page } = this.state;
    const params = {
      drg_store_id: info.drg_store_id,
      store_ids: info.drg_store_id,
      page: page + 1,
      status: 1,
    };
    if (dataListCheckInventory.length > 0) {
      await this.setState({ loadMore: true });
    } else {
      await this.setState({ isFetching: true });
    }
    API.warehouse
      .getTimeCheckInventory(params)
      .then((res: any) => {
        const listHistory = res.data.data === null ? [] : res.data.data;
        const newData = [...dataListCheckInventory, ...listHistory];
        this.setState({
          dataListCheckInventory: newData,
          isFetching: false,
          totalPage: res.data.total_page,
          page: page + 1,
          loadMore: false,
          isOpenFirst: false,
          isRefreshing: false,
        });
      })
      .catch((err: any) => {
        console.log(err);
        this.setState({
          loadMore: false,
          isFetching: false,
          isRefreshing: false,
        });
      });
  };
  onRefresh = () => {
    this.setState({ page: 0, dataListCheckInventory: [], isRefreshing: true }, () => this.getListCheckInventory());
  };
  _loadMore = async () => {
    const { page, totalPage, loadMore } = this.state;
    if (loadMore || page >= totalPage) {
      this.setState({ loadMore: false });
      return;
    } else {
      await this.setState({ loadMore: true });
      try {
        this.getListCheckInventory();
      } catch (error) {}
    }
  };
  _renderListEmpty = () => (
    <ScrollView
      refreshControl={
        <RefreshControl
          tintColor={themes.colors.MAIN_COLOR}
          colors={[themes.colors.MAIN_COLOR, themes.colors.RED_BROWN, themes.colors.GRAY]}
          refreshing={this.state.isRefreshing}
          onRefresh={this.onRefresh}
        />
      }
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <TextEmpty text={'Không tìm thấy lịch sử kiểm kho nào!'} />
    </ScrollView>
  );
  _renderListFooterComponent = () => {
    const { loadMore } = this.state;
    if (loadMore) return <LoadContent number={1} loading={loadMore} style={{ marginTop: 5 }} animation={Progressive} />;
    return null;
  };
  _renderListCheckInventory = () => {
    const { dataListCheckInventory, isFetching, isOpenFirst } = this.state;
    return (
      <View
        style={[
          styles.containerFlatlist,
          { backgroundColor: isFetching ? themes.colors.WHITE : themes.colors.BACKGROUND_COLOR },
        ]}
      >
        <LoadContent
          number={10}
          loading={isFetching}
          animation={ShineOverlay}
          style={{ marginTop: vw(5), marginHorizontal: vw(10) }}
        />
        {isOpenFirst || isFetching ? null : dataListCheckInventory.length > 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl
                tintColor={themes.colors.MAIN_COLOR}
                colors={[themes.colors.MAIN_COLOR, themes.colors.RED_BROWN, themes.colors.GRAY]}
                refreshing={this.state.isFetching}
                onRefresh={this.onRefresh}
              />
            }
            showsHorizontalScrollIndicator={false}
            data={dataListCheckInventory}
            keyExtractor={(item: any) => item.check_date.toString()}
            onEndReachedThreshold={0.1}
            onEndReached={this._loadMore}
            renderItem={({ item }) => (
              <ItemTimeCheckInventory
                item={item}
                onPress={() =>
                  this.props.navigation.navigate(INV_CHECK_DETAIL, {
                    item:
                      item.check_date.slice(6, 8) +
                      '/' +
                      item.check_date.slice(4, 6) +
                      '/' +
                      item.check_date.slice(0, 4),
                  })
                }
                navigation={this.props.navigation}
              />
            )}
            ListFooterComponent={this._renderListFooterComponent()}
          />
        ) : (
          this._renderListEmpty()
        )}
      </View>
    );
  };
  _renderButton = () => {
    const { date } = this.state;
    return (
      <View style={styles.wapperHeader}>
        <TouchableOpacity
          style={styles.buttonCreate}
          onPress={() => this.props.navigation.navigate(INV_CHECK_CREATE, { item: date })}
        >
          <Text style={styles.txtHeaderRight}>+ Tạo phiếu kiểm kho</Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderTitle = () => {
    return (
      <View style={styles.wappertitle}>
        <Text style={styles.txtTilte}>Danh sách lịch sử kiểm kho</Text>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {this._renderButton()}
        {this.renderTitle()}
        {this._renderListCheckInventory()}
      </View>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    store: state.user.dataUser.store,
    token: state.user.token,
  };
}
export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true },
)(index);
