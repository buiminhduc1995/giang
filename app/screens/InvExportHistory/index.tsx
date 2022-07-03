import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, RefreshControl, ScrollView } from 'react-native';
import { ICON_SEARCH, ICON_FILTER, MAIN_COLOR, ICON_HOME, themes } from '../../constants';
import Input from '../../elements/Input';
import ModalDropdown from 'react-native-modal-dropdown';
import ItemExportion from './ItemExportion';
import { connect } from 'react-redux';
import API from '../../api';
import debounce from '../../utils/debounce';
import ModalFilterExport from './ModalFilterExport';
import EventBus from '../../utils/EventBus';
import styles from './InvExportHistory.style';
import { INV_EXPORT_CREATE, INV_EXPORT_DRUGLIST, INV_EXPORT_DETAIL } from '../../navigation/screen_name';
import { LoadItem } from '../../elements/Loading';
import { ResponseHistoryExport, ParamHistoryExport, ExportHistoryElement } from '../../dataType/Inventory';
import { Navigation } from '../../dataType';
import { ShineOverlay } from 'rn-placeholder';
import LoadContent from '../../elements/LoadContent';
import TextEmpty from '../../elements/TextEmpty/';

type Props = {
  navigation: Navigation;
  info: any;
  token: any;
  export_code: string;
  status: number;
  listProductExport: any;
};
type State = {
  dataHistory: ExportHistoryElement[];
  modalValue: string;
  loadMore: boolean;
  isFetching: boolean;
  page: number;
  total_page: number;
  drg_drug_name: string;
  lot: string;
  from_time: string;
  to_time: string;
  drg_store_id: number;
  sort_field: string;
  sort_type: string;
  status: number;
  login_mode: 0;
  store_ids: string[];
  export_code: string;
  export_type: string;
  updated_user: string;
  import_store: string;
};
//params: ParamHistoryExport;

class HistoryExport extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dataHistory: [],
      modalValue: 'Người xuất kho',
      loadMore: false,
      isFetching: false,
      page: 1,
      total_page: 1,
      drg_drug_name: '',
      lot: '',
      from_time: '',
      to_time: '',
      drg_store_id: this.props.info.drg_store_id,
      sort_field: '',
      sort_type: 'asc',
      status: 0,
      login_mode: 0,
      store_ids: [this.props.info.drg_store_id],
      export_code: '',
      export_type: '',
      updated_user: '',
      import_store: '',
    };
  }

  componentDidMount() {
    this.fetchData();
    EventBus.addListener('ExportNewSucces', this.fetchData);
    EventBus.addListener('ExportChangeStatus', this.onDidNavigate);
  }

  getParams = (state: any) => {
    const {
      drg_drug_name,
      lot,
      from_time,
      to_time,
      drg_store_id,
      sort_field,
      sort_type,
      status,
      login_mode,
      store_ids,
      export_code,
      export_type,
      updated_user,
      import_store,
    } = state;
    return {
      drg_drug_name,
      lot,
      from_time,
      to_time,
      drg_store_id,
      sort_field,
      sort_type,
      status,
      login_mode,
      store_ids,
      export_code,
      export_type,
      updated_user,
      import_store,
    };
  };

  callBackFetchData = async () => {
    const { page } = this.state;
    const params: ParamHistoryExport = this.getParams(this.state);
    try {
      const res = await API.warehouse.getHistoryExportion(params, page);
      this.setState({
        dataHistory: (res as ResponseHistoryExport).data || [],
        total_page: (res as ResponseHistoryExport).total_page,
        isFetching: false,
      });
    } catch (error) {
      this.setState({
        isFetching: false,
      });
    }
  };

  fetchData = () => {
    this.setState(
      {
        isFetching: true,
        page: 1,
      },
      () => this.callBackFetchData(),
    );
  };

  callBackLoadMore = async () => {
    const { page, dataHistory } = this.state;
    const params: ParamHistoryExport = this.getParams(this.state);
    try {
      const res = await API.warehouse.getHistoryExportion(params, page + 1);
      this.setState({
        dataHistory: [...dataHistory, ...(res as ResponseHistoryExport).data],
        total_page: (res as ResponseHistoryExport).total_page,
        loadMore: false,
        page: page + 1,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loadMore: false,
      });
    }
  };

  loadMore = () => {
    const { page, total_page } = this.state;
    if (page >= total_page) return;
    this.setState({ loadMore: true }, this.callBackLoadMore);
  };

  search = async (text: string) => {
    const { modalValue } = this.state;
    if (modalValue === 'Người xuất kho') {
      this.setState({
        export_code: '',
        updated_user: text,
        lot: '',
      });
      this.fetchData();
    }
    if (modalValue === 'Mã xuất kho') {
      this.setState({
        export_code: text,
        updated_user: '',
        lot: '',
      });
      this.fetchData();
    }
    if (modalValue === 'Số lô') {
      this.setState({
        export_code: '',
        updated_user: '',
        lot: text,
      });
      this.fetchData();
    }
  };

  _onSelect = (idx: number, value: string) => {
    this.setState({
      modalValue: value,
    });
  };

  onDidNavigate = () => {
    const { export_code, status } = this.props;
    if (!export_code) return;
    else {
      const dataHistory = [...this.state.dataHistory];
      let e: any;
      for (e of dataHistory) {
        if (e.export_code === export_code) {
          e.status = status;
          break;
        }
      }
      this.setState({ dataHistory: dataHistory });
    }
  };

  creatExport = () => {
    this.props.listProductExport && this.props.listProductExport.length
      ? this.props.navigation.navigate(INV_EXPORT_CREATE)
      : this.props.navigation.navigate(INV_EXPORT_DRUGLIST);
  };

  _renderHeader() {
    return (
      <View style={styles.wapperHeader}>
        <TouchableOpacity style={styles.buttonCreate} onPress={this.creatExport}>
          <Text style={styles.txtHeaderRight}>+ Tạo phiếu xuất kho</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Danh sách lịch sử xuất kho</Text>
      </View>
    );
  }

  _renderSearchBox() {
    const { modalValue } = this.state;
    const placeholder =
      modalValue == 'Người xuất kho'
        ? 'Nhập tên người xuất kho'
        : modalValue == 'Mã xuất kho'
        ? 'Nhập mã xuất kho'
        : 'Nhập số lô';
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
            selectionColor={'#333333'}
            placeholderTextColor={'#BDBDBD'}
          />
          {this._renderDropdown()}
        </View>
        <ModalFilterExport dataConditionFilter={this.fetchData} />
      </View>
    );
  }

  _renderDropdown() {
    return (
      <ModalDropdown
        options={['Người xuất kho', 'Mã xuất kho', 'Số lô']}
        defaultValue={this.state.modalValue}
        defaultIndex={0}
        dropdownStyle={styles.stylesModal}
        dropdownTextStyle={styles.dropdownTextStyle}
        onSelect={(idx: number, value: string) => this._onSelect(idx, value)}
      >
        <View style={styles.wapperModalBox}>
          <Image source={ICON_FILTER} style={styles.imageModal} />
          <Text style={styles.txtModal}>{this.state.modalValue}</Text>
        </View>
      </ModalDropdown>
    );
  }

  _renderListFooterComponent = () => {
    const { loadMore } = this.state;
    if (loadMore) return <LoadItem />;
    return null;
  };

  _renderListEmpty = () => (
    <ScrollView
      refreshControl={
        <RefreshControl
          tintColor={MAIN_COLOR}
          colors={[MAIN_COLOR, '#CA4E4E', '#58C4BE']}
          refreshing={this.state.isFetching}
          onRefresh={this.fetchData}
          title="Loading..."
        />
      }
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <TextEmpty text={'Không tìm thấy mã phiếu xuất nào!'} />
    </ScrollView>
  );
  _renderAction = () => {
    return <Image source={themes.ICON_RIGHT} style={styles.iconRight} />;
  };
  _renderItem = ({ item }: { item: any }) => {
    const statusContainer = [
      styles.statusContainer,
      {
        backgroundColor: item.status === 2 ? MAIN_COLOR : item.status === 9 ? 'red' : '#FFC107',
      },
    ];
    const status = item.status === 2 ? 'Hoàn thành' : item.status === 9 ? 'Đã hủy' : 'Chờ duyệt';
    return (
      <ItemExportion
        text_10={'Mã xuất kho'}
        text_11={item.export_code}
        status={status}
        statusContainer={statusContainer}
        onPress={() =>
          this.props.navigation.navigate(INV_EXPORT_DETAIL, { export_code: item.export_code, detailItem: item })
        }
        name={item.updated_user}
        icon_3={ICON_HOME}
        text_3={item.export_type}
        time_date={item.updated_date}
        action={() => this._renderAction(item)}
      />
    );
  };

  _renderList = () => {
    const { dataHistory, isFetching, loadMore } = this.state;
    if (!isFetching && dataHistory && dataHistory.length === 0) return this._renderListEmpty();
    else
      return isFetching ? (
        <LoadContent number={10} loading={isFetching} animation={ShineOverlay} />
      ) : (
        <View style={styles.wapperSectionList}>
          <FlatList
            refreshControl={
              <RefreshControl
                tintColor={MAIN_COLOR}
                colors={[MAIN_COLOR, '#CA4E4E', '#58C4BE']}
                refreshing={isFetching}
                onRefresh={this.fetchData}
                title="Loading..."
              />
            }
            showsVerticalScrollIndicator={false}
            data={dataHistory}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={this._renderItem}
            keyExtractor={(item: any) => item.export_id.toString()}
            onEndReachedThreshold={0.1}
            onEndReached={!loadMore ? this.loadMore : null}
            ListFooterComponent={this._renderListFooterComponent()}
          />
        </View>
      );
  };

  render() {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        {this._renderSearchBox()}
        {this._renderList()}
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    token: state.user.token,
    list_employees: state.user.dataUser.list_employees,
    listProductExport: state.inventory.listProductExport,
  };
}

export default connect(mapStateToProps)(HistoryExport);
