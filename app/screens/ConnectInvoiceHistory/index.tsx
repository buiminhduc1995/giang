import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, RefreshControl, ScrollView, Alert } from 'react-native';
import styles from './ConnectInvoiceHistory.styles';
import Input from '../../elements/Input';
import debounce from '../../utils/debounce';
import { themes } from '../../constants';
const valueFilter = ['Mã HĐ', 'Mã sản phẩm', 'Tên khách hàng', 'Nhân viên bán hàng'];
import API from '../../api';
import { connect } from 'react-redux';
import OrderItemSell from '../../components/OrderItemSell';
import { CONNECT_INVOICE_CREATE } from '../../redux/types';
import LoadContent from '../../elements/LoadContent';
import vw from '../../utils/size-dynamic';
import { ShineOverlay, Progressive } from 'rn-placeholder';
import EventBus from '../../utils/EventBus';
import { Navigation } from '../../dataType/index.d';
import TextEmpty from '../../elements/TextEmpty/';
type Props = {
  navigation: Navigation;
  info: any;
};
type State = {
  selectedValue: any;
  isFetching: Boolean;
  page: any;
  totalPage: any;
  loadMore: Boolean;
  invoice_code: any;
  customer_name: any;
  updated_user: any;
  from_issue_datetime: any;
  to_issue_datetime: any;
  pay_method: any;
  drg_drug_cd: any;
  listInvoiceNotConnect: any;
  flag: Boolean;
  isRefreshing: Boolean;
};
class index extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedValue: valueFilter[0],
      isFetching: false,
      page: 0,
      totalPage: 0,
      loadMore: true,
      invoice_code: '',
      customer_name: '',
      updated_user: '',
      from_issue_datetime: '',
      to_issue_datetime: '',
      pay_method: '',
      drg_drug_cd: '',
      listInvoiceNotConnect: [],
      flag: true,
      isRefreshing: false,
    };
  }
  componentDidMount = () => {
    EventBus.addListener('ConnectInvoice', this.callGetHistory);
    EventBus.addListener('CreateInvoiceSucces', this.callGetHistory);
    this._initData();
  };
  callGetHistory = () => {
    this.setState({ page: 0, listInvoiceNotConnect: [] });
    this._initData();
  };
  _initData = async () => {
    const { info } = this.props;
    const {
      invoice_code,
      customer_name,
      updated_user,
      pay_method,
      from_issue_datetime,
      to_issue_datetime,
      page,
      drg_drug_cd,
      listInvoiceNotConnect,
    } = this.state;
    try {
      const data = {
        invoice_code,
        customer_name,
        updated_user,
        pay_method,
        from_issue_datetime,
        to_issue_datetime,
        drg_store_id: info.drg_store_id,
        drg_drug_cd,
        page: page + 1,
      };
      if (listInvoiceNotConnect.length > 0) {
        await this.setState({ loadMore: true, flag: false });
      } else {
        await this.setState({ isFetching: true });
      }
      const res = await API.syncDrugBank.getInvoiceNotConnect(data);
      const listHistory = res.data.data === null ? [] : res.data.data;
      const newData = [...listInvoiceNotConnect, ...listHistory];
      await this.setState({
        listInvoiceNotConnect: newData,
        isFetching: false,
        totalPage: res.data.total_page,
        page: page + 1,
        loadMore: false,
        flag: true,
        isRefreshing: false,
      });
    } catch (error) {
      this.setState({
        isFetching: false,
        loadMore: false,
        isRefreshing: false,
      });
      console.log(error);
    }
  };
  renderTitle = () => {
    return (
      <View style={styles.wappertitle}>
        <Text style={styles.txtTilte}>Danh sách hóa đơn cần liên thông</Text>
      </View>
    );
  };
  search = async (txt: string) => {
    await this.setState({ invoice_code: txt, page: 0, listInvoiceNotConnect: [] });
    this._initData();
  };
  dataCondition = (value: any) => {
    console.log(value);
  };
  _renderSearchBox() {
    return (
      <View style={styles.wapperSearchBox}>
        <View style={styles.containerSearchBox}>
          <TouchableOpacity>
            <Image source={themes.ICON_SEARCH} style={styles.iconSearchBox} />
          </TouchableOpacity>
          <Input
            onChange={debounce(this.search, 400)}
            style={styles.inputSearchBox}
            placeholder="Nhập mã hóa đơn"
            selectionColor={themes.colors.COLOR_INPUT}
            placeholderTextColor={themes.colors.PLACEHOLDER_INPUT}
          />
        </View>
      </View>
    );
  }
  _loadMore = async () => {
    const { page, totalPage, loadMore } = this.state;
    if (loadMore || page >= totalPage) {
      await this.setState({ loadMore: false });
      return;
    } else {
      await this.setState({ loadMore: true });
      try {
        this._initData();
      } catch (error) {}
    }
  };
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
  _renderListEmpty = () => {
    const { isRefreshing } = this.state;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={themes.colors.MAIN_COLOR}
            colors={[themes.colors.MAIN_COLOR, themes.colors.RED_BROWN, themes.colors.GRAY]}
            refreshing={isRefreshing}
            onRefresh={this.onRefresh}
          />
        }
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <TextEmpty text={'Không tìm thấy hóa đơn nào!'} />
      </ScrollView>
    );
  };
  onRefresh = async () => {
    const { page, totalPage, loadMore } = this.state;
    await this.setState({ page: 0, listInvoiceNotConnect: [], invoice_code: '', isRefreshing: true });
    this._initData();
  };
  connectNow = e => {
    Alert.alert('Thông báo', 'Bạn có chắc chắn muốn liên thông hóa đơn không?', [
      { text: 'Hủy', onPress: () => {} },
      {
        text: 'Đồng ý',
        onPress: async () => {
          try {
            const res = await API.syncDrugBank.updateStatusInvoice({
              invoice_code: e.invoice_code,
              sync_status: '1',
            });
            Alert.alert('Thông báo', 'Liên thông thành công', [
              { text: 'Đồng ý', onPress: () => this.callGetHistory() },
            ]);
          } catch (error) {
            Alert.alert('Thông báo', 'Liên thông thất bại', [{ text: 'Đồng ý', onPress: () => {} }]);
          }
        },
      },
    ]);
  };
  _renderAction = (item: any) => {
    return (
      <TouchableOpacity style={styles.buttonConnect} onPress={() => this.connectNow(item)}>
        <Text style={styles.txtConnect}>Liên thông</Text>
      </TouchableOpacity>
    );
  };
  _renderListInvoiceConnect = () => {
    const { flag, isFetching, listInvoiceNotConnect, isRefreshing } = this.state;
    return (
      <View
        style={[
          styles.wapperSectionList,
          { backgroundColor: isFetching ? themes.colors.WHITE : themes.colors.BACKGROUND_COLOR },
        ]}
      >
        <LoadContent number={10} loading={isFetching} animation={ShineOverlay} style={{ marginHorizontal: vw(5) }} />
        {isFetching ? null : listInvoiceNotConnect.length > 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl
                tintColor={themes.colors.MAIN_COLOR}
                colors={[themes.colors.MAIN_COLOR, themes.colors.RED_BROWN, themes.colors.GRAY]}
                refreshing={isRefreshing}
                onRefresh={this.onRefresh}
              />
            }
            showsHorizontalScrollIndicator={false}
            data={listInvoiceNotConnect}
            keyExtractor={(item: any) => item.invoice_id.toString()}
            onEndReachedThreshold={0.1}
            onEndReached={flag ? this._loadMore : null}
            renderItem={({ item }) => (
              <OrderItemSell
                item={item}
                navigation={this.props.navigation}
                onPress={() =>
                  this.props.navigation.navigate(CONNECT_INVOICE_CREATE, {
                    invoice_id: item.invoice_code.replace('INV', ''),
                    customer_name: item.customer_name,
                    customer_phone_no: item.customer_phone_no,
                    pay_method:
                      item.pay_method === 'CS'
                        ? 'Tiền mặt'
                        : item.pay_method === 'BT'
                        ? 'Chuyển khoản ngân hàng'
                        : item.pay_method === 'CC'
                        ? 'Thẻ tín dụng'
                        : 'Ví điện tử',
                    created_date: item.created_date,
                    invoice_code: item.invoice_code,
                    updated_user: item.updated_user,
                  })
                }
                action={() => this._renderAction(item)}
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
  render() {
    const {} = this.state;
    return (
      <View style={styles.container}>
        {this.renderTitle()}
        {this._renderSearchBox()}
        {this._renderListInvoiceConnect()}
      </View>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    token: state.user.token,
    list_employees: state.user.dataUser.list_employees,
  };
}

export default connect(mapStateToProps)(index);
