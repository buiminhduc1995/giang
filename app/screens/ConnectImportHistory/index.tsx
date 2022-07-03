import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, RefreshControl, ScrollView, Alert } from 'react-native';
import styles from './ConnectImportHistory.styles';
import Input from '../../elements/Input';
import debounce from '../../utils/debounce';
import { themes } from '../../constants';
import API from '../../api/';
import { connect } from 'react-redux';
import { CONNECT_IMPORT_CREATE } from '../../redux/types/';
import LoadContent from '../../elements/LoadContent';
import vw from '../../utils/size-dynamic';
import { ShineOverlay, Progressive } from 'rn-placeholder';
import ItemCodeImport from '../../components/ItemCodeImport';
import EventBus from '../../utils/EventBus';
import { Navigation } from '../../dataType/index.d';
import TextEmpty from '../../elements/TextEmpty';
import MoneyFormat from '../../utils/MoneyFormat';
type Props = {
  navigation: Navigation;
  info: any;
};
type State = {
  isFetching: Boolean;
  page: any;
  totalPage: any;
  loadMore: Boolean;
  flag: Boolean;
  listImportNotConnect: any;
  import_code: any;
  drg_drug_name: any;
  import_type: any;
  company_name: any;
  lot: any;
  from_time: any;
  to_time: any;
  invoice_code: any;
  from_process_date: any;
  to_process_date: any;
  isRefreshing: Boolean;
};
class index extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isFetching: false,
      page: 0,
      totalPage: 0,
      loadMore: true,
      flag: true,
      listImportNotConnect: [],
      import_code: '',
      drg_drug_name: '',
      import_type: '',
      company_name: '',
      lot: '',
      from_time: '',
      to_time: '',
      invoice_code: '',
      from_process_date: '',
      to_process_date: '',
      isRefreshing: false,
    };
  }
  componentDidMount = () => {
    this._initData();
    EventBus.addListener('ImportNewSucces', this.callGetHistory);
    EventBus.addListener('ConnectImport', this.callGetHistory);
  };
  callGetHistory = () => {
    this.setState({ page: 0, listImportNotConnect: [] });
    this._initData();
  };
  _initData = async () => {
    const { info } = this.props;
    const {
      listImportNotConnect,
      import_code,
      drg_drug_name,
      import_type,
      company_name,
      lot,
      from_time,
      to_time,
      invoice_code,
      from_process_date,
      to_process_date,
      page,
    } = this.state;
    try {
      const data = {
        import_code,
        drg_drug_name,
        import_type,
        company_name,
        lot,
        from_time,
        to_time,
        invoice_code,
        from_process_date,
        to_process_date,
        drg_store_id: info.drg_store_id,
        store_ids: [info.drg_store_id],
        page: page + 1,
      };
      if (listImportNotConnect.length > 0) {
        await this.setState({ loadMore: true, flag: false });
      } else {
        await this.setState({ isFetching: true });
      }
      const res = await API.syncDrugBank.getImportNotConnect(data);
      const listHistory = res.data.data === null ? [] : res.data.data;
      const newData = [...listImportNotConnect, ...listHistory];
      await this.setState({
        listImportNotConnect: newData,
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
        <Text style={styles.txtTilte}>Danh sách phiếu nhập cần liên thông</Text>
      </View>
    );
  };
  search = async (txt: any) => {
    await this.setState({ import_code: txt, listImportNotConnect: [], page: 0 });
    this._initData();
  };
  _renderSearchBox() {
    const {} = this.state;
    return (
      <View style={styles.wapperSearchBox}>
        <View style={styles.containerSearchBox}>
          <TouchableOpacity>
            <Image source={themes.ICON_SEARCH} style={styles.iconSearchBox} />
          </TouchableOpacity>
          <Input
            onChange={debounce(this.search, 400)}
            style={styles.inputSearchBox}
            placeholder="Nhập mã phiếu nhập"
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
        <TextEmpty text={'Không tìm thấy phiếu nhập nào!'} />
      </ScrollView>
    );
  };
  onRefresh = async () => {
    const {} = this.state;
    await this.setState({ page: 0, listImportNotConnect: [], import_code: '', isRefreshing: true });
    this._initData();
  };
  connectImportNow = item => {
    Alert.alert('Thông báo', 'Bạn có chắc chắn muốn liên thông phiếu nhập kho không?', [
      { text: 'Hủy', onPress: () => {} },
      {
        text: 'Đồng ý',
        onPress: async () => {
          try {
            const res = await API.syncDrugBank.updateStatusImport({
              import_code: item.import_code,
              sync_status: '1',
            });

            Alert.alert('Thông báo', 'Liên thông thành công', [
              { text: 'Đồng ý', onPress: () => this.callGetHistory() },
            ]);
          } catch (error) {
            this.setState({ isFetching: false });
            Alert.alert('Thông báo', 'Liên thông thất bại', [{ text: 'Đồng ý', onPress: () => {} }]);
          }
        },
      },
    ]);
  };
  _renderListInvoiceConnect = () => {
    const { flag, isFetching, listImportNotConnect, isRefreshing } = this.state;
    return (
      <View
        style={[
          styles.wapperSectionList,
          { backgroundColor: isFetching ? themes.colors.WHITE : themes.colors.BACKGROUND_COLOR },
        ]}
      >
        <LoadContent number={10} loading={isFetching} animation={ShineOverlay} style={{ marginHorizontal: vw(5) }} />
        {isFetching ? null : listImportNotConnect.length > 0 ? (
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
            data={listImportNotConnect}
            keyExtractor={(item: any) => item.import_code.toString()}
            onEndReachedThreshold={0.1}
            onEndReached={flag ? this._loadMore : null}
            renderItem={({ item }) => (
              <ItemCodeImport
                item={item}
                navigation={this.props.navigation}
                onPress={() => this.props.navigation.navigate(CONNECT_IMPORT_CREATE, { import_code: item.import_code })}
                title="Tổng mua"
                detail={MoneyFormat(item.total_amount)}
                onPressConnect={() => this.connectImportNow(item)}
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
    const { isFetching } = this.state;
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
