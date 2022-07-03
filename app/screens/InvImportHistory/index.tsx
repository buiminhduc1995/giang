import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, RefreshControl, Alert, ScrollView } from 'react-native';
import styles from './InvImportHistory.styles';
import Input from '../../elements/Input';
import debounce from '../../utils/debounce';
import {
  ICON_SEARCH,
  MAIN_COLOR,
  TYPE_SEARCH_HISTORY_IMPORT,
  ICON_FILTER,
  WHITE,
  ICON_UPDATE,
  themes,
} from '../../constants/';
import ItemCodeImport from '../../components/ItemCodeImport';
import API from '../../api';
import { connect } from 'react-redux';
import EventBus from '../../utils/EventBus';
import ModalDropdown from 'react-native-modal-dropdown';
import ModalFilterImport from './ModalFilterImport';
import { INV_IMPORT_CREATE_TAB_STEP_1, INV_IMPORT_DETAIL } from '../../redux/types/';
import LoadContent from '../../elements/LoadContent';
import vw from '../../utils/size-dynamic';
import { ShineOverlay, Progressive } from 'rn-placeholder';
import { Navigation } from '../../dataType';
import TextEmpty from '../../elements/TextEmpty/';
type Props = {
  navigation: Navigation;
  info: any;
  token: any;
};
type State = {
  text: string;
  dataHistoryImport: any;
  isFetching: boolean;
  page: number;
  totalPage: number;
  loadMore: boolean;
  selectedValue: any;
  drg_drug_name: any;
  company_name: any;
  import_code: any;
  status: number;
  from_process_date: string;
  to_process_date: string;
  flag: boolean;
  isRefreshing: Boolean;
};
class index extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      text: '',
      dataHistoryImport: [],
      isFetching: false,
      page: 0,
      totalPage: 0,
      loadMore: true,
      selectedValue: TYPE_SEARCH_HISTORY_IMPORT.CODE_IMPORT,
      drg_drug_name: '',
      company_name: '',
      import_code: '',
      status: 0,
      from_process_date: '',
      to_process_date: '',
      flag: true,
      isRefreshing: false,
    };
  }
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.import_code !== '') {
      const newDataHistoryImport = this.state.dataHistoryImport.map((item: any) => {
        if (item.import_code === nextProps.import_code) {
          item.status = nextProps.status;
        }
        return item;
      });
      this.setState({ dataHistoryImport: newDataHistoryImport });
    }
  }
  componentDidMount() {
    this.getHistoryImport();
    EventBus.addListener('ImportNewSucces', this.callGetHistory);
  }
  callGetHistory = async () => {
    await this.setState({
      page: 0,
      dataHistoryImport: [],
      isFetching: true,
      text: '',
      totalPage: 0,
      from_process_date: '',
      to_process_date: '',
      status: 0,
    });
    this.getHistoryImport();
  };
  getHistoryImport = async () => {
    const {
      text,
      page,
      dataHistoryImport,
      import_code,
      company_name,
      drg_drug_name,
      status,
      from_process_date,
      to_process_date,
    } = this.state;
    const { info } = this.props;
    try {
      const data = {
        import_code,
        drg_store_id: info.drg_store_id,
        store_ids: info.drg_store_id,
        page: page + 1,
        company_name,
        drg_drug_name,
        status,
        from_process_date,
        to_process_date,
      };
      if (dataHistoryImport.length > 0) {
        await this.setState({ loadMore: true, flag: false });
      } else {
        await this.setState({ isFetching: true });
      }
      const res = await API.warehouse.getHistoryImport(data);
      const listHistory = res.data.data === null ? [] : res.data.data;
      const newData = [...dataHistoryImport, ...listHistory];
      await this.setState({
        dataHistoryImport: newData,
        isFetching: false,
        totalPage: res.data.total_page,
        page: page + 1,
        loadMore: false,
        flag: true,
        isRefreshing: false,
      });
    } catch (error) {
      console.log(error);
      if (error.message === 'Network Error') {
        Alert.alert('Tín hiệu kết nối mạng yếu');
      }
      this.setState({
        isFetching: false,
        loadMore: false,
        isRefreshing: false,
      });
    }
  };
  search = async (txt: string) => {
    const { selectedValue } = this.state;
    if (selectedValue === TYPE_SEARCH_HISTORY_IMPORT.CODE_IMPORT) {
      await this.setState({
        import_code: txt,
        page: 0,
        dataHistoryImport: [],
        company_name: '',
        drg_drug_name: '',
      });
      this.getHistoryImport();
    } else if (selectedValue === TYPE_SEARCH_HISTORY_IMPORT.COMPANY_NAME) {
      await this.setState({
        import_code: '',
        page: 0,
        dataHistoryImport: [],
        company_name: txt,
        drg_drug_name: '',
      });
      this.getHistoryImport();
    } else if (selectedValue === TYPE_SEARCH_HISTORY_IMPORT.NAME_PRODUCT) {
      await this.setState({
        import_code: '',
        page: 0,
        dataHistoryImport: [],
        company_name: '',
        drg_drug_name: txt,
      });
      this.getHistoryImport();
    }
  };
  _onSelect = async (idx: number, value: any) => {
    await this.setState({
      selectedValue: value,
    });
  };
  _renderDropdown() {
    return (
      <ModalDropdown
        options={Object.values(TYPE_SEARCH_HISTORY_IMPORT)}
        defaultValue={this.state.selectedValue}
        defaultIndex={0}
        dropdownStyle={styles.dropdownStyle}
        dropdownTextStyle={styles.dropdownTextStyle}
        onSelect={(idx: number, value: any) => this._onSelect(idx, value)}
      >
        <View style={styles.wapperDropDown}>
          <Image source={ICON_FILTER} style={styles.iconFilter} />
          <Text style={styles.txtValueDropDown}>{this.state.selectedValue}</Text>
        </View>
      </ModalDropdown>
    );
  }
  dataCondition = async (value: any) => {
    await this.setState({
      status: value.status,
      from_process_date: value.from_issue_datetime,
      to_process_date: value.to_issue_datetime,
      page: 0,
      dataHistoryImport: [],
      import_code: '',
      company_name: '',
      drg_drug_name: '',
    });
    this.getHistoryImport();
  };
  _renderSearchBox() {
    const { selectedValue } = this.state;
    const placeholder =
      selectedValue == TYPE_SEARCH_HISTORY_IMPORT.CODE_IMPORT
        ? 'Nhập mã phiếu nhập'
        : TYPE_SEARCH_HISTORY_IMPORT.COMPANY_NAME
        ? 'Nhập tên nhà cung cấp'
        : 'Nhập tên sản phẩm';
    return (
      <View style={styles.wapperSearchBox}>
        <View style={styles.containerSearchBox}>
          <TouchableOpacity>
            <Image source={ICON_SEARCH} style={styles.iconSearchBox} />
          </TouchableOpacity>
          <Input
            onChange={debounce(this.search, 400)}
            style={styles.inputSearchBox}
            placeholder={placeholder}
            selectionColor={themes.colors.COLOR_INPUT}
            placeholderTextColor={themes.colors.PLACEHOLDER_INPUT}
          />
          {this._renderDropdown()}
        </View>
        <ModalFilterImport dataConditionFilter={this.dataCondition} />
      </View>
    );
  }
  onRefresh = async () => {
    await this.setState({
      page: 0,
      dataHistoryImport: [],
      isFetching: true,
      text: '',
      totalPage: 0,
      from_process_date: '',
      to_process_date: '',
      status: 0,
      isRefreshing: true,
    });
    this.getHistoryImport();
    // if (loadMore || page >= totalPage) {
    //   await this.setState({ loadMore: false });
    //   return;
    // } else {
    //   await this.setState({ loadMore: true });
    //   try {
    //     this.getHistoryImport();
    //   } catch (error) {}
    // }
  };
  _loadMore = async () => {
    const { page, totalPage, loadMore } = this.state;
    if (loadMore || page >= totalPage) {
      await this.setState({ loadMore: false });
      return;
    } else {
      await this.setState({ loadMore: true });
      try {
        this.getHistoryImport();
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
  _renderListEmpty = () => (
    <ScrollView
      refreshControl={
        <RefreshControl
          tintColor={MAIN_COLOR}
          colors={[MAIN_COLOR, '#CA4E4E', '#58C4BE']}
          refreshing={this.state.isRefreshing}
          onRefresh={this.onRefresh}
          title="Loading..."
        />
      }
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <TextEmpty text={'Không tìm thấy mã phiếu nhập nào!'} />
    </ScrollView>
  );
  _renderListImport = () => {
    const { dataHistoryImport, isFetching, flag } = this.state;
    return (
      <View style={[styles.containerFlatlist, { backgroundColor: isFetching ? WHITE : '#F0EDEE' }]}>
        <LoadContent number={10} loading={isFetching} animation={ShineOverlay} style={{ marginHorizontal: vw(5) }} />
        {isFetching ? null : dataHistoryImport.length > 0 ? (
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
            showsHorizontalScrollIndicator={false}
            data={dataHistoryImport}
            keyExtractor={(item: any) => item.import_code.toString()}
            onEndReachedThreshold={0.1}
            onEndReached={flag ? this._loadMore : null}
            renderItem={({ item }) => (
              <ItemCodeImport
                item={item}
                onPress={() => this.props.navigation.navigate(INV_IMPORT_DETAIL, { codeImport: item.import_code })}
                status={item.status}
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

  importNew = () => {
    this.props.navigation.navigate(INV_IMPORT_CREATE_TAB_STEP_1);
  };
  _renderTypeImport = () => {
    return (
      <View style={styles.wapperHeader}>
        <TouchableOpacity style={styles.buttonCreate} onPress={() => this.importNew()}>
          <Text style={styles.txtHeaderRight}>+ Tạo phiếu nhập kho</Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderTitle = () => {
    return (
      <View style={styles.wappertitle}>
        <Text style={styles.txtTilte}>Danh sách lịch sử nhập kho</Text>
      </View>
    );
  };
  render() {
    const { isFetching } = this.state;
    return (
      <View style={styles.container}>
        {this._renderTypeImport()}
        {this.renderTitle()}
        {this._renderSearchBox()}
        {this._renderListImport()}
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
export default connect(mapStateToProps)(index);
