import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, RefreshControl, FlatList, Alert } from 'react-native';
import {
  MAIN_COLOR,
  ICON_NOTIFICATION,
  ICON_INVOICE,
  ICON_INVENTORY,
  ICON_PRODUCT_DASHBOARD,
  ICON_CONNECT,
  ICON_POINT,
  ICON_VARIABILITY,
  ICON_RIGHT,
  WHITE,
  ICON_FILTER,
  ICON_CASH_FOLLOW,
  themes,
} from '../../constants';
import { connect } from 'react-redux';
import {
  REFRESH_NEWS,
  PRODUCT_DETAIL_SCREEN,
  CATEGORY_CASH_FLOW_HISTORY,
  CONNECT_DRUG_BANK_TAB,
} from '../../redux/types';
import HeaderBar from '../../elements/HeaderBar';
import vw from '../../utils/size-dynamic';
import ChartLine from './ChartLine';
import styles from './DrugStoreTab.style';
import ModalFilterChart from './ModalFilterChart';
import API from '../../api';
import Moment from 'moment/moment';
import { getTimeStance } from '../../utils/DateFormat';
import DashBoard from '../../elements/DashBoard/';
import ItemTopSell from '../../components/ItemTopSell';
import LoadContent from '../../elements/LoadContent';
import LoadLine from '../../elements/LoadLine';
import { ShineOverlay } from 'rn-placeholder';
const dataSelectFilterBestSell = ['Tháng vừa qua', 'Tuần vừa qua', 'Ngày hôm qua'];
import ModalDropdown from 'react-native-modal-dropdown';
import EventBus from '../../utils/EventBus';
import { Navigation } from '../../dataType/';
import { checkPartnerVNPay } from '../../redux/action/dataPersist';
import TextEmpty from '../../elements/TextEmpty/';
import {
  ADD_INVOICE_SCREEN,
  NOTIFICATION_SRCEEN,
  INVENTORY_TAB,
  MANAGER_INVOICE_SCREEN,
  PRODUCT_INVOICE_SCREEN,
  POINT_HOME_DRUG_SCREEN,
} from '../../redux/types/';
type Props = {
  navigation: Navigation;
  info: any;
  store: any;
  list_employees: any;
  checkPartnerVNPay: Function;
  infoPartnerVNPAY: any;
};
type State = {
  listNews: object;
  isFetching: boolean;
  from_date: string;
  to_date: string;
  arrayValueChart: any;
  dataDashBoard: any;
  totalAmount: number;
  nameCustomer: string;
  isRefreshing: boolean;
  fulltime: any;
  login_id: any;
  totalProductEmpty: number;
  resdata: any;
  isFetching1: boolean;
  numberInfo: number;
  revenue_today: number;
  total_invoice: number;
  total_point: number;
  total_product: number;
  number_export: number;
  number_import: number;
  new_invoice: number;
  best_product: string;
  top10BestSell: any;
  isFetchingTopBestSell: boolean;
  dateBestSell: any;
  selectedValueBestSell: any;
  total_product_nearly_expired: any;
  total_product_expired: any;
  total_product_nearly_empty: any;
  increase_percent: any;
};
class DrugStoreTab extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      listNews: [],
      isFetching: false,
      from_date: '',
      to_date: '',
      arrayValueChart: [],
      dataDashBoard: [],
      totalAmount: 0,
      nameCustomer: '',
      isRefreshing: false,
      fulltime: '',
      login_id:
        this.props.list_employees !== undefined && this.props.list_employees.length !== 0
          ? ''
          : this.props.info.login_id,
      totalProductEmpty: 0,
      resdata: [],
      isFetching1: false,
      numberInfo: 0,
      revenue_today: 0,
      total_invoice: 0,
      total_point: 0,
      total_product: 0,
      number_export: 0,
      number_import: 0,
      increase_percent: 0,
      new_invoice: 0,
      best_product: '',
      top10BestSell: [],
      isFetchingTopBestSell: false,
      dateBestSell: '',
      selectedValueBestSell: dataSelectFilterBestSell[0],
      total_product_nearly_expired: '',
      total_product_expired: '',
      total_product_nearly_empty: '',
    };
  }

  _renderHeader() {
    return (
      <HeaderBar
        left={this._renderHeaderLeft()}
        right={this._renderHeaderRight()}
        wrapLeft={{ flex: 1, paddingRight: vw(20) }}
      />
    );
  }

  _renderHeaderLeft() {
    const { store } = this.props;
    return (
      <View>
        <Text style={[styles.txtHeaderLeft]} numberOfLines={1}>
          Nhà thuốc {store && store.drg_name ? store.drg_name.replace('Nhà thuốc', '') : ''}
        </Text>
      </View>
    );
  }

  _renderHeaderRight() {
    const { navigation } = this.props;
    const { numberInfo } = this.state;
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={styles.wapperHederRight} onPress={() => navigation.navigate(ADD_INVOICE_SCREEN)}>
          <Text style={styles.txtHeaderRight}>Bán hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNoti} onPress={() => navigation.navigate(NOTIFICATION_SRCEEN)}>
          {numberInfo !== 0 && (
            <View style={styles.containerNoti}>
              <Text style={styles.numberInfo}>{numberInfo}</Text>
            </View>
          )}
          <Image source={ICON_NOTIFICATION} style={styles.iconNoti} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    );
  }
  componentDidMount = async () => {
    const { info, list_employees } = this.props;
    var date = new Date();
    var dateAgo = Moment(date.setDate(date.getDate() - 31)).format('YYYY/MM/DD');
    var dateNow = Moment().format('YYYY/MM/DD');
    await this.setState({
      from_date: dateAgo,
      dateBestSell: dateAgo,
      to_date: dateNow,
      nameCustomer: list_employees !== undefined && list_employees.length !== 0 ? 'Tất cả' : info.full_name,
    });
    this.getValueDashBoard();
    this.getValueChart();
    this.getTopBestSell();
    EventBus.addListener('ImportNewSucces', this.getValueDashBoard);
    EventBus.addListener('ExportNewSucces', this.getValueDashBoard);
    EventBus.addListener('CreateInvoiceSucces', this.getValueDashBoard);
    if (!this.props.infoPartnerVNPAY || this.props.infoPartnerVNPAY.length === 0) {
      const res = await API.payVNpay.checkPartnerVNPay(info.drg_store_id);
      this.props.checkPartnerVNPay(res.data);
    }
  };
  getTopBestSell = async () => {
    const { info } = this.props;
    const { dateBestSell } = this.state;
    try {
      const params = {
        drg_store_id: info.drg_store_id,
        to_date: dateBestSell,
      };
      await this.setState({ isFetchingTopBestSell: true });
      const res = await API.dashboard.getTopBestSell(params);
      this.setState({ top10BestSell: res.data, isFetchingTopBestSell: false });
    } catch (error) {
      console.log(error);
      this.setState({ isFetchingTopBestSell: false });
    }
  };
  getValueDashBoard = async () => {
    const { info, store } = this.props;
    try {
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      var fulltime1 = date + '/' + month + '/' + year;
      const params = {
        drg_store_id: info.drg_store_id,
        login_id: info.login_id,
        company_code: store.company_code,
        from_date: '',
        to_date: '',
      };
      await this.setState({ isFetching: true });
      const res = await API.dashboard.getValueDashBoard(params);
      this.setState({
        totalProductEmpty: res.data.total_product_empty,
        isRefreshing: false,
        fulltime: fulltime1,
        revenue_today: res.data.revenue_today,
        new_invoice: res.data.new_invoice,
        total_invoice: res.data.total_invoice,
        best_product: res.data.best_product,
        total_product: res.data.total_product,
        number_export: res.data.number_export,
        number_import: res.data.number_import,
        total_point: res.data.total_point,
        total_product_nearly_expired: res.data.total_product_nearly_expired,
        total_product_expired: res.data.total_product_expired,
        total_product_nearly_empty: res.data.total_product_nearly_empty,
        isFetching: false,
        increase_percent: res.data.increase_percent,
      });
    } catch (error) {
      this.setState({ isRefreshing: false, isFetching: false });
      console.log(error);
    }
  };
  sell = () => {
    this.props.navigation.navigate(MANAGER_INVOICE_SCREEN);
  };
  product = () => {
    this.props.navigation.navigate(PRODUCT_INVOICE_SCREEN);
  };
  inventory = () => {
    this.props.navigation.navigate(INVENTORY_TAB);
  };
  point = () => {
    this.props.navigation.navigate(POINT_HOME_DRUG_SCREEN);
  };
  connect = () => {
    this.props.navigation.navigate(CONNECT_DRUG_BANK_TAB);
  };
  report = () => {
    this.props.navigation.navigate(CATEGORY_CASH_FLOW_HISTORY);
  };
  _renderViewDashBoard = () => {
    const { fulltime, isFetching } = this.state;
    return (
      <View style={{ marginVertical: vw(10) }}>
        <View style={[styles.layoutRow, { marginTop: vw(5) }]}>
          <DashBoard onPress={() => this.sell()} title="Hóa đơn" source={ICON_INVOICE} status={isFetching} />
          <DashBoard onPress={() => this.inventory()} title="Kho" source={ICON_INVENTORY} status={isFetching} />
          <DashBoard
            onPress={() => this.product()}
            title="Sản phẩm"
            source={ICON_PRODUCT_DASHBOARD}
            status={isFetching}
          />
        </View>
        <View style={[styles.layoutRow, { marginTop: vw(10) }]}>
          <DashBoard onPress={() => this.connect()} title="Liên thông DQG" source={ICON_CONNECT} status={isFetching} />
          <DashBoard onPress={() => this.point()} title="Tích điểm" source={ICON_POINT} status={isFetching} />
          {false ? (
            <DashBoard onPress={() => this.report()} title="Giao dịch" source={ICON_CASH_FOLLOW} status={isFetching} />
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-around',
                width: '30%',
                borderRadius: 5,
                height: vw(100),
                paddingHorizontal: vw(5),
              }}
            />
          )}
        </View>
      </View>
    );
  };
  _renderReportNow = () => {
    const { revenue_today, new_invoice, number_import, number_export, isFetching, increase_percent } = this.state;
    return (
      <View style={[styles.containerReport, { height: vw(110) }]}>
        {isFetching ? (
          <LoadLine
            number={2}
            loading={isFetching}
            animation={ShineOverlay}
            style={{ marginTop: 5, marginLeft: vw(5) }}
          />
        ) : (
          <View>
            <Text style={styles.txtStatistical}>Hôm nay</Text>
            <View style={styles.wapperAlignCenter}>
              <View style={styles.detailReport}>
                <View style={[styles.contnetRow, { justifyContent: 'space-between' }]}>
                  <View style={styles.contnetRow}>
                    <Text style={[styles.txtReport, { fontWeight: 'bold' }]}>Doanh thu:</Text>
                    <Text style={[styles.numberReport, { paddingLeft: vw(5), marginBottom: vw(5) }]}>
                      {revenue_today && revenue_today.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                    </Text>
                    <Text style={[styles.txtReport, { paddingLeft: vw(5), marginBottom: vw(15) }]}>vnd</Text>
                  </View>
                  <View style={styles.contnetRow}>
                    <Image source={ICON_VARIABILITY} style={styles.iconVariability} />
                    <Text style={styles.txtPercent}>{increase_percent} %</Text>
                  </View>
                </View>
                <View style={styles.contnetRow}>
                  <Text style={[styles.txtReport, { fontWeight: 'bold' }]}>Đơn mới :</Text>
                  <Text style={[styles.numberReport, { paddingLeft: vw(5), marginBottom: vw(5) }]}>{new_invoice}</Text>
                  <Text style={[styles.txtReport, { paddingLeft: vw(5) }]}>đơn</Text>
                </View>
                <View style={[styles.contnetRow, { justifyContent: 'space-between' }]}>
                  <View style={styles.contnetRow}>
                    <Text style={[styles.txtReport, { fontWeight: 'bold' }]}>Nhập kho :</Text>
                    <Text style={[styles.numberReport, { paddingLeft: vw(5), marginBottom: vw(5) }]}>
                      {number_import}
                    </Text>
                    <Text style={[styles.txtReport, { paddingLeft: vw(5) }]}>phiếu</Text>
                  </View>
                  <View style={styles.contnetRow}>
                    <Text style={[styles.txtReport, { fontWeight: 'bold' }]}>Xuất kho :</Text>
                    <Text style={[styles.numberReport, { paddingLeft: vw(10), marginBottom: vw(5) }]}>
                      {number_export}
                    </Text>
                    <Text style={[styles.txtReport, { paddingLeft: vw(5) }]}>phiếu</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };
  functionWarning = (
    onPress: any,
    title: String,
    number: Number,
    backgroundColor: any,
    borderBottomColor: any,
    borderBottomWidth: any,
  ) => {
    return (
      <TouchableOpacity style={[styles.containerFunction, { borderBottomColor, borderBottomWidth }]} onPress={onPress}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.txtFunction}>{title}</Text>
          <View style={[styles.viewNumber, { backgroundColor }]}>
            <Text style={styles.numberFunction}>{number}</Text>
          </View>
        </View>
        <Image source={ICON_RIGHT} style={styles.iconRight} />
      </TouchableOpacity>
    );
  };
  _renderWarning = () => {
    const { navigation } = this.props;
    const { isFetching, total_product_nearly_empty, total_product_nearly_expired, total_product_expired } = this.state;
    return (
      <View style={[styles.containerReport, { height: vw(155) }]}>
        {isFetching ? (
          <LoadLine number={3} loading={isFetching} animation={ShineOverlay} style={{ marginTop: 5 }} />
        ) : (
          <View>
            <Text style={styles.txtStatistical}>Cảnh báo sản phẩm</Text>
            <View style={{ alignItems: 'center', width: '100%' }}>
              {this.functionWarning(
                () => navigation.navigate('ProductPortfolioScreen', { type: 'HetHang' }),
                'Sản phẩm sắp hết hàng',
                total_product_nearly_empty === undefined || null ? 0 : total_product_nearly_empty,
                themes.colors.BLUE,
                themes.colors.BOTTOM_COLOR,
                0.5,
              )}
              {this.functionWarning(
                () => navigation.navigate('ProductPortfolioScreen', { type: 'HetHang' }),
                'Sản phẩm sắp hết hạn sử dụng',
                total_product_nearly_expired === undefined || null ? 0 : total_product_nearly_expired,
                themes.colors.YELLOW,
                themes.colors.BOTTOM_COLOR,
                0.5,
              )}
              {this.functionWarning(
                () => navigation.navigate('ProductPortfolioScreen', { type: 'HetHang' }),
                'Sản phẩm hết hạn sử dụng',
                total_product_expired === undefined || null ? 0 : total_product_expired,
                themes.colors.RED,
                themes.colors.WHITE,
                0.5,
              )}
            </View>
          </View>
        )}
      </View>
    );
  };
  renderSeparator = () => (
    <View
      style={{
        backgroundColor: themes.colors.BOTTOM_COLOR,
        height: 1,
      }}
    />
  );
  gotoOrder = async (item: any) => {
    try {
      const res = await API.productApi.getDetailDrug(item.drug_id);
      this.props.navigation.navigate(PRODUCT_DETAIL_SCREEN, { data: res.data, editProduct: true });
    } catch (error) {
      console.log(error);
    }
  };
  _onSelect = async (idx: number, value: any) => {
    if (value === 'Tuần vừa qua') {
      await this.setState({
        selectedValueBestSell: value,
        dateBestSell: Moment()
          .subtract(7, 'days')
          .format('YYYY/MM/DD'),
      });
      this.getTopBestSell();
    }
    if (value === 'Ngày hôm qua') {
      await this.setState({
        selectedValueBestSell: value,
        dateBestSell: Moment()
          .subtract(1, 'days')
          .format('YYYY/MM/DD'),
      });
      this.getTopBestSell();
    }
    if (value === 'Tháng vừa qua') {
      await this.setState({
        selectedValueBestSell: value,
        dateBestSell: Moment()
          .subtract(31, 'days')
          .format('YYYY/MM/DD'),
      });
      this.getTopBestSell();
    }
  };
  _renderTopBestSell = () => {
    const { isFetchingTopBestSell, top10BestSell, selectedValueBestSell } = this.state;
    return (
      <View style={[styles.containerReport]}>
        {isFetchingTopBestSell ? (
          <LoadContent
            number={10}
            loading={isFetchingTopBestSell}
            animation={ShineOverlay}
            style={{ marginTop: vw(5) }}
          />
        ) : (
          <View>
            <View style={styles.containerTopSell}>
              <Text style={styles.txtStatistical}>Top 10 sản phẩm bán chạy</Text>
              <ModalDropdown
                options={dataSelectFilterBestSell}
                defaultValue={dataSelectFilterBestSell[0]}
                defaultIndex={0}
                dropdownStyle={[
                  styles.dropdownStyle,
                  {
                    height: dataSelectFilterBestSell.length > 4 ? 'auto' : -1,
                    width: '30%',
                    marginRight: vw(10),
                  },
                ]}
                dropdownTextStyle={styles.dropdownTextStyle}
                onSelect={(idx: number, value: any) => this._onSelect(idx, value)}
              >
                <View style={styles.containerModal}>
                  <Image source={ICON_FILTER} style={styles.iconSearch} />
                  <Text style={styles.text}>{selectedValueBestSell}</Text>
                </View>
              </ModalDropdown>
            </View>
            {top10BestSell.length === 0 ? (
              <TextEmpty stylesContainer={{ marginTop: vw(20) }} text={'Không tìm thấy sản phẩm nào!'} />
            ) : (
              <FlatList
                data={top10BestSell}
                keyExtractor={(item: any) => item.drug_id.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem={({ item }) => <ItemTopSell item={item} onPress={() => this.gotoOrder(item)} />}
              />
            )}
          </View>
        )}
      </View>
    );
  };
  getValueChart = async () => {
    try {
      const { info, store } = this.props;
      const { from_date, to_date, login_id } = this.state;
      const params = {
        drg_store_id: info.drg_store_id,
        login_id: login_id,
        company_code: store.company_code,
        from_date: from_date,
        to_date: to_date,
      };
      await this.setState({ isFetching1: true });
      const getNumberInfo = await API.notification.getNoti(info.drg_store_id, 0);
      const res = await API.dashboard.getValueChart(params);
      var sum = 0;
      for (i = 0; i < res.data.length; i++) {
        sum = sum + res.data[i]['total_revelue'];
      }
      const array = res.data.map((arrayChart: any, index: any) => {
        const arrayCharts = {
          x: getTimeStance(arrayChart.date),
          y: arrayChart.total_revelue,
        };
        return arrayCharts;
      });
      this.setState({
        resdata: res,
        arrayValueChart: array,
        isFetching: false,
        isFetching1: false,
        totalAmount: sum,
        isRefreshing: false,
        numberInfo: getNumberInfo.data.length,
      });
    } catch (error) {
      this.setState({
        isFetching: false,
        isFetching1: false,
        isRefreshing: false,
      });
      console.log(error);
    }
  };

  dataCondition = async (value: any) => {
    if (value.from_issue_datetime === '' || value.to_issue_datetime === '') {
      return;
    } else {
      await this.setState({
        from_date: value.from_issue_datetime,
        to_date: value.to_issue_datetime,
        isFetching1: true,
        login_id: value.updated_user,
        nameCustomer: value.nameCustomer,
      });
      this.getValueChart();
    }
  };
  _renderDate = () => {
    const { from_date, to_date, nameCustomer } = this.state;
    return (
      <View style={{ marginLeft: 5 }}>
        <Text style={styles.txtDateTime}>
          ( {Moment(from_date).format('DD/MM')} -
          {Moment(to_date).format('DD/MM') === Moment().format('DD/MM') ? ' Hôm nay ' : Moment(to_date).format('DD/MM')}
          ) | {nameCustomer}
        </Text>
      </View>
    );
  };
  _renderConditionChart = () => {
    const { isFetching1 } = this.state;
    return (
      <View>
        {isFetching1 ? (
          <LoadLine number={2} loading={isFetching1} animation={ShineOverlay} style={{ marginTop: 5 }} />
        ) : (
          <View style={styles.wapperConditionChart}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.txtStatistical}>Thống kê</Text>
              {this._renderDate()}
            </View>
            <View style={{ marginRight: 10 }}>
              <ModalFilterChart dataConditionFilter={this.dataCondition} />
            </View>
          </View>
        )}
      </View>
    );
  };
  _renderChartLine = () => {
    const { arrayValueChart, isFetching1, totalAmount, from_date, to_date, nameCustomer } = this.state;
    return (
      <View style={styles.containerChart}>
        {isFetching1 ? (
          <LoadLine number={3} loading={isFetching1} animation={ShineOverlay} style={{ marginTop: 5 }} />
        ) : arrayValueChart.length > 0 ? (
          <ChartLine
            data={arrayValueChart}
            nameCustomer={nameCustomer}
            totalAmount={totalAmount}
            from_date={from_date}
            to_date={to_date}
          />
        ) : (
          <View style={styles.wapperChartLine}>
            <Text style={styles.txtChartEmpty}>
              Không có dữ liệu từ ngày {Moment(from_date).format('DD/MM/YYYY')} đến ngày {''}
              {'' + Moment(to_date).format('DD/MM/YYYY')}
            </Text>
          </View>
        )}
      </View>
    );
  };
  _onRefresh = async () => {
    await this.setState({ isRefreshing: true });
    this.getValueDashBoard();
  };
  render() {
    const { isFetching } = this.state;
    return (
      <View style={[styles.container, { backgroundColor: isFetching ? themes.colors.WHITE : null }]}>
        {this._renderHeader()}
        <ScrollView
          refreshControl={
            <RefreshControl
              tintColor={themes.colors.MAIN_COLOR}
              colors={[themes.colors.MAIN_COLOR, themes.colors.RED_BROWN, themes.colors.GRAY]}
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          contentContainerStyle={styles.wapper}
          showsVerticalScrollIndicator={false}
        >
          {this._renderViewDashBoard()}
          {this._renderReportNow()}
          {this._renderConditionChart()}
          {this._renderChartLine()}
          {this._renderWarning()}
          {this._renderTopBestSell()}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    user: state.user.dataUser.info,
    isRefreshNew: state.social.isRefreshNew,
    info: state.user.dataUser.info,
    store: state.user.dataUser.store,
    list_employees: state.user.dataUser.list_employees,
    token: state.user.token,
  };
}

const mapDispatchToProps = {
  checkPartnerVNPay,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrugStoreTab);
