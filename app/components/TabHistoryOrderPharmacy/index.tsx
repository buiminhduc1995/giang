import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import styles from './TabHistoryPharmacyCompany.style';
import ItemHistoryOrderPharmacy from '../ItemHistoryOrderPharmacy/';
// import { dataHistoryOrder } from '../../constants/data'
import { DETAIL_ORDER_PHARMACY } from '../../redux/types/';
import { ICON_FILTER, ICON_SEARCH, MAIN_COLOR, WHITE, themes } from '../../constants';
import LoaderIndicator from '../../elements/LoaderIndicator';
import Input from '../../elements/Input';
import ModalDropdown from 'react-native-modal-dropdown';
const dataSelect = ['Tất cả', 'Đã nhận đơn', 'Đang giao', 'Hoàn thành', 'Đã hủy', 'Chờ xác nhận', 'Gửi báo giá'];
import validate from '../../utils/validate';
import vw from '../../utils/size-dynamic';
import api from '../../api';
import { connect } from 'react-redux';
import debounce from '../../utils/debounce';
import EventBus from '../../utils/EventBus';
import LoadContent from '../../elements/LoadContent';
import { ShineOverlay, Progressive } from 'rn-placeholder';
import TextEmpty from '../../elements/TextEmpty';
type Props = {};
type State = {
  selectedValue: any;
  page: any;
  totalPage: any;
  loadMore: boolean;
  isFetching: boolean;
  text: any;
  dataHistoryOrder: any;
  status: any;
};
class index extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: dataSelect[0],
      page: 0,
      totalPage: 0,
      loadMore: false,
      isFetching: false,
      text: '',
      dataHistoryOrder: [],
      status: '',
    };
  }
  componentDidMount() {
    this.initData();
    EventBus.addListener('OrderNewSucces', this.onRefresh);
  }
  initData = async () => {
    const { store } = this.props;
    const { dataHistoryOrder, page, text, status } = this.state;
    try {
      const params = {
        page: page + 1,
        order_code: text,
        status: status,
      };
      if (dataHistoryOrder.length > 0) {
        await this.setState({ loadMore: true });
      } else {
        await this.setState({ isFetching: true });
      }
      const res = await api.syncOrderToAdmin.getListOrderPharmacyToCompany(params, store.drg_store_id);
      const listHistory = res.data.data === null ? [] : res.data.data;
      const newData = [...dataHistoryOrder, ...listHistory];
      this.setState({
        dataHistoryOrder: newData,
        isFetching: false,
        totalPage: res.data.total_page,
        page: page + 1,
        loadMore: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        isFetching: false,
        loadMore: false,
      });
    }
  };
  goToDetail = (item: any) => {
    this.props.navigation.navigate(DETAIL_ORDER_PHARMACY, { item: item });
  };
  _onSelect = async (idx, value) => {
    await this.setState({
      selectedValue: value,
    });
    if (value === 'Chờ xác nhận') {
      await this.setState({ status: 'draft', dataHistoryOrder: [], page: 0 });
      this.initData();
    } else if (value === 'Đang giao') {
      await this.setState({ status: 'transfering', dataHistoryOrder: [], page: 0 });
      this.initData();
    } else if (value === 'Gửi báo giá') {
      await this.setState({ status: 'sent', dataHistoryOrder: [], page: 0 });
      this.initData();
    } else if (value === 'Hoàn thành') {
      await this.setState({ status: 'done', dataHistoryOrder: [], page: 0 });
      this.initData();
    } else if (value === 'Đã hủy') {
      await this.setState({ status: 'cancel', dataHistoryOrder: [], page: 0 });
      this.initData();
    } else if (value === 'Đã nhận đơn') {
      await this.setState({ status: 'sent', dataHistoryOrder: [], page: 0 });
      this.initData();
    } else if (value === 'Tất cả') {
      await this.setState({ status: '', dataHistoryOrder: [], page: 0 });
      this.initData();
    }
  };
  _renderDropdown() {
    return (
      <ModalDropdown
        options={dataSelect}
        defaultValue={this.state.selectedValue}
        defaultIndex={0}
        dropdownStyle={{
          width: vw(150),
          height: 'auto',
          maxHeight: vw(120),
          borderRadius: 3,
          overflow: 'hidden',
          marginTop: vw(10),
          marginRight: -vw(10),
          // Shadow
          ...Platform.select({
            ios: {
              shadowColor: 'black',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.14,
              shadowRadius: 2,
            },
            android: {
              elevation: 8,
            },
          }),
        }}
        dropdownTextStyle={{
          fontSize: vw(14),
          fontFamily: 'Arial',
          paddingHorizontal: vw(15),
        }}
        onSelect={(idx, value) => this._onSelect(idx, value)}
      >
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Image
            source={ICON_FILTER}
            style={{
              width: vw(16),
              height: vw(16),
              resizeMode: 'contain',
            }}
          />
          <Text
            style={{
              fontSize: vw(10),
              color: MAIN_COLOR,
              fontFamily: 'Arial',
            }}
          >
            {this.state.selectedValue}
          </Text>
        </View>
      </ModalDropdown>
    );
  }
  search = async (text: any) => {
    const { selectedValue } = this.state;
    if (selectedValue === 'Đang gửi') {
      await this.setState({
        text,
        page: 0,
        dataHistoryOrder: [],
        status: 'draft',
      });
      this.initData();
    } else if (selectedValue === 'Đang giao') {
      await this.setState({
        text,
        page: 0,
        dataHistoryOrder: [],
        status: 'sale',
      });
      this.initData();
    } else if (selectedValue === 'Hoàn thành') {
      await this.setState({
        text,
        page: 0,
        dataHistoryOrder: [],
        status: 'done',
      });
      this.initData();
    } else if (selectedValue === 'Đã hủy') {
      await this.setState({
        text,
        page: 0,
        dataHistoryOrder: [],
        status: 'cancel',
      });
      this.initData();
    } else if (selectedValue === 'Đã nhận đơn') {
      await this.setState({
        text,
        page: 0,
        dataHistoryOrder: [],
        status: 'sent',
      });
      this.initData();
    } else if (selectedValue === 'Tất cả') {
      await this.setState({
        text,
        page: 0,
        dataHistoryOrder: [],
        status: '',
      });
      this.initData();
    }
  };
  _renderSearchBox() {
    return (
      <View
        style={{
          backgroundColor: 'white',
        }}
      >
        <View style={styles.wapperInput}>
          <Image source={ICON_SEARCH} style={styles.iconSearch} />
          <Input
            onChange={debounce(this.search, 400)}
            style={styles.input}
            placeholder={'Tìm kiếm theo từ khóa'}
            selectionColor={themes.colors.COLOR_INPUT}
            placeholderTextColor={themes.colors.PLACEHOLDER_INPUT}
          />
          {this._renderDropdown()}
        </View>
      </View>
    );
  }
  _renderListFooterComponent = () => {
    const { loadMore } = this.state;
    if (loadMore)
      return (
        <LoadContent
          number={1}
          loading={loadMore}
          style={{ marginTop: 5, marginHorizontal: vw(5) }}
          animation={Progressive}
        />
      );
    return null;
  };
  _renderListEmpty = () => <TextEmpty text={'Không tìm thấy lịch sử đơn hàng nào!'} />;
  _loadMore = async () => {
    const { page, totalPage, loadMore } = this.state;
    if (loadMore || page >= totalPage) {
      await this.setState({ loadMore: false });
      return;
    } else {
      await this.setState({ loadMore: true });
      try {
        this.initData();
      } catch (error) {}
    }
  };
  onRefresh = async () => {
    const { text } = this.state;
    await this.setState({ page: 0, dataHistoryOrder: [], totalPage: 0 });
    this.initData();
  };
  render() {
    const { dataHistoryOrder, isFetching } = this.state;
    return (
      <View style={[styles.container, { backgroundColor: WHITE }]}>
        {this._renderSearchBox()}
        <LoadContent
          number={10}
          loading={isFetching}
          animation={ShineOverlay}
          style={{ marginHorizontal: vw(10), marginTop: vw(5) }}
        />
        {isFetching ? null : dataHistoryOrder.length > 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl
                tintColor={MAIN_COLOR}
                colors={[MAIN_COLOR, '#CA4E4E', '#58C4BE']}
                refreshing={this.state.isFetching}
                onRefresh={this.onRefresh}
                title="Loading..."
              />
            }
            contentContainerStyle={{ flexGrow: 1, width: '100%', padding: vw(10) }}
            data={dataHistoryOrder}
            keyExtractor={(item: any) => item.supply_order_id.toString()}
            renderItem={({ item }) => <ItemHistoryOrderPharmacy item={item} onPress={() => this.goToDetail(item)} />}
            ListFooterComponent={this._renderListFooterComponent()}
            onEndReachedThreshold={0.1}
            onEndReached={this._loadMore}
          />
        ) : (
          this._renderListEmpty()
        )}
      </View>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    store: state.user.dataUser.store,
  };
}
export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true },
)(index);
