import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, SectionList, RefreshControl, ScrollView } from 'react-native';
import HeaderBar from '../../elements/HeaderBar';
import { ICON_BACK, ICON_SEARCH, ICON_FILTER, INVOICE_TYPE_SEARCH, WHITE, themes } from '../../constants';
import vw from '../../utils/size-dynamic';
import { MyStatusBar } from '../../elements/MyStatusBar';
import Input from '../../elements/Input';
import styles from './OrderManagement.style';
import ModalDropdown from 'react-native-modal-dropdown';
import OrderItemSell from '../../components/OrderItemSell/';
import { connect } from 'react-redux';
import API from '../../api';
import ModalFilter from './ModalFilter';
import debounce from '../../utils/debounce';
import Moment from 'moment/moment';
import { HOME, DETAIL_PRODUCT_SCREEN, MANAGER_INVOICE_SCREEN } from '../../redux/types/';
import LoadContent from '../../elements/LoadContent';
import { ShineOverlay, Progressive } from 'rn-placeholder';
import { Navigation } from '../../dataType/';
import TextEmpty from '../../elements/TextEmpty/';
type Props = {
  navigation: Navigation;
  info: any;
  token: any;
  list_employees: any;
};
type State = {
  selectedValue: any;
  text: string;
  page: number;
  dataOrder: any;
  loadMore: boolean;
  refreshing: boolean;
  pulling: boolean;
  error: boolean;
  isFetching: boolean;
  totalPage: number;
  sumAmount: any;
  updated_user: string;
  from_issue_datetime: string;
  to_issue_datetime: string;
  customer_name: string;
  invoice_code: string;
  isOpenFirst: boolean;
  login_id: any;
  flag: boolean;
  isRefreshing: boolean;
};
class OrderManagement extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedValue: INVOICE_TYPE_SEARCH.CUSTOMER_NAME,
      text: '',
      page: 0,
      totalPage: 0,
      dataOrder: [],
      loadMore: false,
      refreshing: false,
      pulling: false,
      error: false,
      isFetching: false,
      sumAmount: '',
      updated_user: '',
      from_issue_datetime: this.props.navigation.getParam('from_date')
        ? Moment(this.props.navigation.getParam('from_date')).format('DD/MM/YYYY')
        : '',
      to_issue_datetime: this.props.navigation.getParam('to_date')
        ? Moment(this.props.navigation.getParam('to_date')).format('DD/MM/YYYY')
        : '',
      customer_name: '',
      invoice_code: '',
      isOpenFirst: true,
      login_id: this.props.navigation.getParam('login_id')
        ? this.props.navigation.getParam('login_id')
        : this.props.list_employees !== undefined && this.props.list_employees.length !== 0
        ? ''
        : this.props.info.login_id,
      flag: true,
      isRefreshing: false,
    };
  }
  componentDidMount() {
    const { isOpenFirst } = this.state;
    if (isOpenFirst === true) {
      this._initData();
    }
  }
  _initData = async () => {
    try {
      const {
        dataOrder,
        page,
        from_issue_datetime,
        to_issue_datetime,
        updated_user,
        customer_name,
        invoice_code,
        login_id,
      } = this.state;
      const { info } = this.props;
      const data = {
        params: {
          drg_store_id: info.drg_store_id,
          updated_user,
          from_issue_datetime,
          to_issue_datetime,
          customer_name,
          invoice_code,
          status: '',
          created_date: '',
          pay_method: '',
          invoice_type: '',
          sort_field: '',
          sort_type: '',
          drg_drug_cd: '',
          login_mode: 0,
          page: page + 1,
          totalPage: 0,
          login_id,
        },
      };
      if (dataOrder.length > 0) {
        await this.setState({ loadMore: true, isOpenFirst: false, flag: false });
      } else {
        await this.setState({ isFetching: true, isOpenFirst: false });
      }
      const response = await API.invoiceApi.getInvoice(data.params);
      const listOrder =
        response.data.data === null
          ? []
          : [
              {
                title: 'datetime',
                sumAmount: response.data.total_amount,
                data: response.data.data,
              },
            ];
      const newData = [...dataOrder, ...listOrder];
      this.setState({
        dataOrder: newData,
        isFetching: false,
        loadMore: false,
        page: page + 1,
        totalPage: response.data.total_page,
        isOpenFirst: false,
        flag: true,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        isFetching: false,
        loadMore: false,
      });
    }
  };
  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} right={this._renderHeaderRight()} />;
  }
  dataCondition = async (value: any) => {
    await this.setState({
      page: 0,
      totalPage: 0,
      dataOrder: [],
      updated_user: value.updated_user === 'Tất cả' ? '' : value.updated_user,
      from_issue_datetime: value.from_issue_datetime,
      to_issue_datetime: value.to_issue_datetime,
      isOpenFirst: true,
      login_id: value.login_id,
    });
    this._initData();
  };
  _renderHeaderRight = () => {
    return <ModalFilter dataConditionFilter={this.dataCondition} />;
  };
  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={styles.buttonGoBack} onPress={() => this.props.navigation.navigate(HOME)}>
        <Image source={ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtHeaderLeft}>Đơn hàng tại quầy</Text>
      </TouchableOpacity>
    );
  }
  search = async (text: string) => {
    const { selectedValue } = this.state;
    if (selectedValue === INVOICE_TYPE_SEARCH.CUSTOMER_NAME) {
      await this.setState({
        customer_name: text,
        invoice_code: '',
        page: 0,
        dataOrder: [],
      });
      this._initData();
    } else {
      await this.setState({
        invoice_code: text,
        customer_name: '',
        page: 0,
        dataOrder: [],
      });
      this._initData();
    }
  };
  _renderSearchBox() {
    const { selectedValue } = this.state;
    const placeholder = selectedValue == INVOICE_TYPE_SEARCH.CUSTOMER_NAME ? 'Nhập tên khách hàng' : 'Nhập mã hóa đơn';
    return (
      <View style={styles.wapperSearchBox}>
        <View style={styles.containerSearchBox}>
          <TouchableOpacity>
            <Image source={ICON_SEARCH} style={styles.iconSearchBox} />
          </TouchableOpacity>
          <Input
            onChange={debounce(this.search, 350)}
            style={styles.inputSearchBox}
            placeholder={placeholder}
            selectionColor={themes.colors.COLOR_INPUT}
            placeholderTextColor={themes.colors.PLACEHOLDER_INPUT}
          />
          {this._renderDropdown()}
        </View>
      </View>
    );
  }
  _onSelect = (idx: number, value: string) => {
    this.setState({
      selectedValue: value,
    });
  };
  _renderDropdown() {
    return (
      <ModalDropdown
        options={Object.values(INVOICE_TYPE_SEARCH)}
        defaultValue={this.state.selectedValue}
        defaultIndex={0}
        dropdownStyle={styles.stylesModal}
        dropdownTextStyle={styles.dropdownTextStyle}
        onSelect={(idx: number, value: string) => this._onSelect(idx, value)}
      >
        <View style={styles.wapperModalBox}>
          <Image source={ICON_FILTER} style={styles.imageModal} />
          <Text style={styles.txtModal}>{this.state.selectedValue}</Text>
        </View>
      </ModalDropdown>
    );
  }
  _loadMore = async () => {
    const { page, totalPage, loadMore } = this.state;
    if (loadMore || page >= totalPage) {
      this.setState({ loadMore: false });
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
          style={{ marginTop: 5, marginHorizontal: vw(10) }}
          animation={Progressive}
        />
      );
    return null;
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
      <TextEmpty text={'Không tìm thấy hóa đơn nào!'} />
    </ScrollView>
  );
  onRefresh = () => {
    this.setState({ dataOrder: [], page: 0 }, () => this._initData());
  };
  _renderAction = (item: any) => {
    return <Image source={themes.ICON_RIGHT} style={styles.iconRight} />;
  };
  _renderSectionList = () => {
    const { dataOrder, from_issue_datetime, isFetching, isOpenFirst, flag, isRefreshing } = this.state;
    return (
      <View
        style={[
          styles.wapperSectionList,
          { backgroundColor: isFetching ? themes.colors.WHITE : themes.colors.BACKGROUND_COLOR },
        ]}
      >
        <LoadContent
          number={10}
          loading={isFetching}
          animation={ShineOverlay}
          style={{ marginHorizontal: vw(10), marginTop: vw(5) }}
        />
        {isOpenFirst || isFetching ? null : dataOrder.length > 0 ? (
          <SectionList
            refreshControl={
              <RefreshControl
                tintColor={themes.colors.MAIN_COLOR}
                colors={[themes.colors.MAIN_COLOR, themes.colors.RED_BROWN, themes.colors.GRAY]}
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh}
              />
            }
            showsVerticalScrollIndicator={false}
            sections={dataOrder}
            contentContainerStyle={styles.contentContainerStyle}
            renderSectionHeader={({ section }) => (
              <View style={styles.wapperTitleSectionList}>
                {/* <Text style={styles.SectionHeader}> {section.title} </Text> */}
                {/* {from_issue_datetime.length !== 0 ? (
                  <Text style={styles.SectionHeader}>
                    Tổng tiền {section.sumAmount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} vnđ
                  </Text>
                ) : null} */}
              </View>
            )}
            renderItem={({ item }) => (
              <OrderItemSell
                item={item}
                navigation={this.props.navigation}
                onPress={() =>
                  this.props.navigation.push(DETAIL_PRODUCT_SCREEN, {
                    id: item.invoice_code.replace('INV', ''),
                    nameCustomer: item.customer_name,
                    screen: MANAGER_INVOICE_SCREEN,
                  })
                }
                action={() => this._renderAction(item)}
              />
            )}
            keyExtractor={item => item.invoice_id.toString()}
            onEndReachedThreshold={0.1}
            onEndReached={flag ? this._loadMore : null}
            ListFooterComponent={this._renderListFooterComponent()}
          />
        ) : (
          this._renderListEmpty()
        )}
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        {this._renderSearchBox()}
        {this._renderSectionList()}
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

export default connect(mapStateToProps)(OrderManagement);
