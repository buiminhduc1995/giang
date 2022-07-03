import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, RefreshControl, ScrollView, Alert } from 'react-native';
import { themes } from '../../constants';
import Input from '../../elements/Input';
import ItemExportion from '../InvExportHistory/ItemExportion';
import { connect } from 'react-redux';
import API from '../../api';
import debounce from '../../utils/debounce';
import EventBus from '../../utils/EventBus';
import LoadContent from '../../elements/LoadContent';
import { ShineOverlay, Progressive } from 'rn-placeholder';
import styles from './ConnectExportHistory.styles';
import { ParamsGetExport, ResponseExportConnect } from '../../dataType/Connection';
import { Navigation } from '../../dataType/index.d';
import TextEmpty from '../../elements/TextEmpty/';
import { CONNECT_EXPORT_CREATE } from '../../navigation/screen_name';

type Props = {
  navigation: Navigation;
  info: any;
  token: any;
  export_code: string;
  status: number;
  listProductExport: any;
};
type State = {
  data: ResponseExportConnect[];
  modalValue: any;
  loadMore: boolean;
  isFetching: boolean;
  page: number;
  total_page: number;
  params: ParamsGetExport;
  isRefreshing: Boolean;
};

class ConnectExportHistory extends PureComponent<Props, State> {
  params: ParamsGetExport = {
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
    sync_status: '0',
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      data: [],
      modalValue: 'Người xuất kho',
      loadMore: false,
      isFetching: false,
      page: 1,
      total_page: 1,
      isRefreshing: false,
      params: { ...this.params },
    };
  }
  componentDidMount() {
    this.fetchData(null);
    EventBus.addListener('ExportNewSucces', () => this.fetchData(null));
    EventBus.addListener('ConnectExport', () => this.fetchData(null));
  }

  loadMore = async () => {
    const { data, params, page, total_page } = this.state;
    if (page >= total_page) return;
    await this.setState({ loadMore: true });
    try {
      const res = await API.syncDrugBank.getExportNotConnect(params, page + 1);
      this.setState({
        data: [...data, ...res.data.data],
        total_page: res.data.total_page,
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loadMore: false });
    }
    this.setState({ page: page + 1 });
  };

  fetchData = async (_params: any, page?: number) => {
    this.setState({ isFetching: true });
    const params = _params ? _params : { ...this.params };
    try {
      await this.setState({ page: 1, params: params });
      const res = await API.syncDrugBank.getExportNotConnect(params, page);
      console.log(res);
      this.setState({
        data: res.data.data,
        total_page: res.data.total_page,
        isRefreshing: false,
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isFetching: false, isRefreshing: false });
    }
  };

  search = async (text: string) => {
    const params = { ...this.params };
    params.export_code = text;
    params.updated_user = '';
    params.lot = '';
    this.fetchData(params);
  };

  _onSelect = (idx: number, value: string) => {
    this.setState({
      modalValue: value,
    });
  };

  _renderHeader() {
    return (
      <View style={styles.wapperHeader}>
        <Text style={styles.text}>Danh sách phiếu xuất kho chưa liên thông</Text>
      </View>
    );
  }

  _renderSearchBox() {
    return (
      <View style={styles.wapperSearchBox}>
        <View style={styles.containerSearchBox}>
          <TouchableOpacity>
            <Image source={themes.ICON_SEARCH} style={styles.iconSearchBox} />
          </TouchableOpacity>
          <Input
            onChange={debounce(this.search, 350)}
            style={styles.inputSearchBox}
            placeholder="Nhập mã xuất kho"
            selectionColor={themes.colors.COLOR_INPUT}
            placeholderTextColor={themes.colors.PLACEHOLDER_INPUT}
          />
        </View>
      </View>
    );
  }
  _renderListFooterComponent = () => {
    const { loadMore } = this.state;
    if (loadMore) return <LoadContent number={1} loading={loadMore} style={{ marginTop: 5 }} animation={Progressive} />;
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
            title="Loading..."
          />
        }
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <TextEmpty text={'Không tìm thấy phiếu xuất nào!'} />
      </ScrollView>
    );
  };
  connectNow = (e: { export_code: number }) => {
    Alert.alert('Thông báo', 'Bạn có chắc chắn muốn liên thông phiếu xuất kho không?', [
      { text: 'Hủy', onPress: () => {} },
      {
        text: 'Đồng ý',
        onPress: async () => {
          try {
            const res = await api.syncDrugBank.updateStatusExport({
              export_code: e.export_code,
              sync_status: '1',
            });
            Alert.alert('Thông báo', 'Liên thông thành công', [
              { text: 'Đồng ý', onPress: () => this.fetchData(null) },
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
  _renderItem = ({ item }: { item: ResponseExportConnect }) => {
    const { navigation } = this.props;
    return (
      <ItemExportion
        text_10={'Mã xuất kho'}
        text_11={item.export_code}
        status={' '}
        statusContainer={styles.statusContainer}
        onPress={() => {
          navigation.navigate(CONNECT_EXPORT_CREATE, { export_code: item.export_code });
        }}
        name={item.updated_user}
        icon_3={themes.ICON_HOME}
        text_3={item.export_type}
        time_date={item.updated_date}
        action={() => this._renderAction(item)}
      />
    );
  };

  onRefresh = async () => {
    await this.setState({ isRefreshing: true });
    this.fetchData(this.state.params);
  };

  _renderList = () => {
    const { data, isFetching, loadMore, isRefreshing } = this.state;
    return (
      <View
        style={[
          styles.wapperSectionList,
          { backgroundColor: isFetching ? themes.colors.WHITE : themes.colors.BACKGROUND_COLOR },
        ]}
      >
        <LoadContent style={{}} number={10} loading={isFetching} animation={ShineOverlay} />
        {isFetching ? null : data && data.length > 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl
                tintColor={themes.colors.MAIN_COLOR}
                colors={[themes.colors.MAIN_COLOR, themes.colors.RED_BROWN, themes.colors.GRAY]}
                refreshing={isRefreshing}
                onRefresh={this.onRefresh}
              />
            }
            showsVerticalScrollIndicator={false}
            data={data}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={this._renderItem}
            keyExtractor={(item: any) => item.export_id.toString()}
            onEndReachedThreshold={0.1}
            onEndReached={!loadMore ? this.loadMore : null}
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

export default connect(mapStateToProps)(ConnectExportHistory);
