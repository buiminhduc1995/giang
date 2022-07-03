import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { MyStatusBar } from '../../elements/MyStatusBar/';
import HeaderBar from '../../elements/HeaderBar/';
import { themes } from '../../constants/';
import styles from './InvCheckDetail.styles';
import API from '../../api/';
import { connect } from 'react-redux';
import ItemDetailCheckInventory from '../../components/ItemDetailCheckInventory';
import Input from '../../elements/Input';
import debounce from '../../utils/debounce';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment/moment';
import LoadContent from '../../elements/LoadContent/';
import { ShineOverlay, Progressive } from 'rn-placeholder';
import { Navigation } from '../../dataType/index.d';
import vw from '../../utils/size-dynamic';
type State = {
  page: number;
  totalPage: number;
  loadMore: boolean;
  isOpenFirst: boolean;
  dataListProduct: any;
  isFetching: boolean;
  check_date: any;
  drg_drug_name: string;
  dateStart: string;
  dateNowFilter: string;
  flag: boolean;
};
type Props = {
  navigation: Navigation;
  info: any;
};
class index extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      page: 0,
      totalPage: 0,
      loadMore: true,
      isOpenFirst: true,
      dataListProduct: [],
      isFetching: false,
      drg_drug_name: '',
      check_date: this.props.navigation.getParam('item'),
      dateStart: '',
      dateNowFilter: '',
      flag: true,
    };
  }
  componentDidMount() {
    this.getDetailCheck();
    var dateNow = Moment().format('DD/MM/YYYY');
    this.setState({ dateNowFilter: dateNow, dateStart: this.props.navigation.getParam('item') });
  }
  getDetailCheck = async () => {
    const { info } = this.props;
    const { page, dataListProduct, drg_drug_name, check_date } = this.state;
    try {
      if (dataListProduct.length > 0) {
        await this.setState({ loadMore: true, flag: false });
      } else {
        await this.setState({ isFetching: true });
      }
      const params = {
        drg_store_id: info.drg_store_id,
        check_date,
        page: page + 1,
        drg_drug_name,
        status: 1,
      };
      const res = await API.warehouse.getDetailCheckInventory(params);
      const listHistory = res.data.data === null ? [] : res.data.data;
      const newData = [...dataListProduct, ...listHistory];
      this.setState({
        dataListProduct: newData,
        isFetching: false,
        totalPage: res.data.total_page,
        page: page + 1,
        loadMore: false,
        isOpenFirst: false,
        flag: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }
  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={styles.buttonBack} onPress={() => this.props.navigation.goBack()}>
        <Image source={themes.ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtHeaderLeft}>Chi tiết sản phẩm kiểm kho</Text>
      </TouchableOpacity>
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
        this.getDetailCheck();
      } catch (error) {}
    }
  };
  _renderListEmpty = () => (
    <View style={styles.containerDataEmpty}>
      <Text style={styles.txtListEmpty}>Không tìm thấy thông tin</Text>
    </View>
  );
  _renderListFooterComponent = () => {
    const { loadMore } = this.state;
    if (loadMore) return <LoadContent number={1} loading={loadMore} style={{ marginTop: 5 }} animation={Progressive} />;
    return null;
  };
  _renderListDetail = () => {
    const { dataListProduct, isFetching, isOpenFirst, flag } = this.state;
    return (
      <View
        style={[
          styles.containerFlatlist,
          { backgroundColor: isFetching ? themes.colors.WHITE : themes.colors.BACKGROUND_COLOR },
        ]}
      >
        <LoadContent number={10} loading={isFetching} animation={ShineOverlay} />
        {isOpenFirst || isFetching ? null : dataListProduct.length > 0 ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={dataListProduct}
            keyExtractor={(item: any) => item.import_code}
            onEndReachedThreshold={0.1}
            onEndReached={flag ? this._loadMore : null}
            renderItem={({ item }) => <ItemDetailCheckInventory item={item} type={'History'} />}
            ListFooterComponent={this._renderListFooterComponent()}
          />
        ) : (
          this._renderListEmpty()
        )}
      </View>
    );
  };
  search = (txt: string) => {
    this.setState({ drg_drug_name: txt, page: 0, dataListProduct: [], check_date: this.state.dateStart }, () =>
      this.getDetailCheck(),
    );
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
            placeholder="Nhập tên sản phẩm"
            selectionColor={themes.colors.COLOR_INPUT}
            placeholderTextColor={themes.colors.PLACEHOLDER_INPUT}
          />
        </View>
      </View>
    );
  }
  callAPICheckInventoryWithDate = (date: string) => {
    this.setState({ dateStart: date, page: 0, dataListProduct: [], check_date: date }, () => this.getDetailCheck());
  };
  _renderDate = () => {
    const { dateStart, dateNowFilter } = this.state;
    return (
      <View style={styles.containerDate}>
        <View style={{ flex: 3 }}>
          <Text style={styles.txtFilter}>Ngày kiểm kho</Text>
        </View>
        <View style={{ flex: 7 }}>
          <DatePicker
            androidMode="spinner"
            style={{ width: '100%' }}
            date={dateStart}
            mode="date"
            maxDate={dateNowFilter}
            placeholder="Chọn ngày bắt đầu"
            format="DD/MM/YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={true}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                right: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                borderRadius: 5,
                height: vw(30),
              },
              dateText: {
                fontSize: vw(14),
              },
            }}
            onDateChange={(date: string) => {
              this.callAPICheckInventoryWithDate(date);
            }}
          />
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        {this._renderSearchBox()}
        {this._renderDate()}
        {this._renderListDetail()}
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
