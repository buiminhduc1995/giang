import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  Platform,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { ICON_SEARCH, ICON_FILTER, MAIN_COLOR, CUSTOMER_TYPE_SEARCH, themes } from '../../constants';
import Input from '../../elements/Input';
import ModalDropdown from 'react-native-modal-dropdown';
import vw from '../../utils/size-dynamic';
import { connect } from 'react-redux';
import ItemCustomer from '../../components/ItemCustomer';
import LoaderIndicator from '../../elements/LoaderIndicator';
import API from '../../api';
import debounce from '../../utils/debounce';
import { Navigation } from '../../dataType/index.d';
type Props = {
  navigation: Navigation;
  token: any;
  info: any;
  store: any;
  onSelectCustomer: Function;
};
type State = {
  selectedValue: string;
  listCustomer: any;
  isFetching: boolean;
  text: any;
  page: number;
  totalPage: number;
  loadMore: boolean;
  modalVisible: boolean;
  customerSelected: object;
  isOpenFirst: boolean;
};
class ModalSelectedPhone extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedValue: CUSTOMER_TYPE_SEARCH.CUSTOMER_NAME,
      listCustomer: [],
      isFetching: false,
      text: '',
      page: 0,
      totalPage: 0,
      loadMore: true,
      customerSelected: {},
      isOpenFirst: true,
    };
  }
  toggleModal(visible: boolean) {
    this.setState({ modalVisible: visible });
  }
  componentDidUpdate = () => {
    if (this.state.isOpenFirst) {
      this._initData();
    }
  };
  _initData = async () => {
    try {
      const { selectedValue, text, page, listCustomer } = this.state;
      const data = {
        drg_store_id: this.props.info.drg_store_id,
        customer_name: '',
        invoice_code: '',
        phone_no: '',
        customer_group_cd: '',
        page: page + 1,
        company_code: this.props.store.company_code,
      };
      if (selectedValue === CUSTOMER_TYPE_SEARCH.CUSTOMER_NAME) {
        data.customer_name = text;
      } else if (selectedValue === CUSTOMER_TYPE_SEARCH.PHONE_NUMBER) {
        data.phone_no = text;
      } else {
        data.customer_group_cd = text;
      }
      if (listCustomer.length > 0) {
        await this.setState({ loadMore: true });
      } else {
        await this.setState({ isFetching: true });
      }
      const res = await API.customerApi.getCustomer(data, this.props.token);
      const dataCustomer = res.data.data === null ? [] : res.data.data;
      const newData = [...listCustomer, ...dataCustomer];
      this.setState({
        listCustomer: newData,
        isFetching: false,
        totalPage: res.data.total_page,
        page: page + 1,
        loadMore: false,
        isOpenFirst: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        isFetching: false,
        loadMore: false,
        isOpenFirst: false,
      });
    }
  };
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
  search = async (text: String) => {
    await this.setState({ text, listCustomer: [], page: 0 });
    this._initData();
  };
  _renderSearchView = () => {
    const { selectedValue } = this.state;
    const placeholder =
      selectedValue == CUSTOMER_TYPE_SEARCH.CUSTOMER_NAME
        ? 'Nhập tên khách hàng'
        : this.state.selectedValue == CUSTOMER_TYPE_SEARCH.PHONE_NUMBER
        ? 'Nhập số điện thoại'
        : 'Nhóm khác';
    const keyboardType =
      selectedValue == CUSTOMER_TYPE_SEARCH.CUSTOMER_NAME
        ? 'default'
        : this.state.selectedValue == CUSTOMER_TYPE_SEARCH.PHONE_NUMBER
        ? 'phone-pad'
        : 'default';
    return (
      <View style={styles.containerSearch}>
        <Image source={ICON_SEARCH} style={styles.iconSearch} />
        <Input
          onChange={debounce(this.search, 400)}
          style={styles.textInputSearch}
          placeholder={placeholder}
          selectionColor={themes.colors.COLOR_INPUT}
          keyboardType={keyboardType}
          placeholderTextColor={themes.colors.PLACEHOLDER_INPUT}
        />
        {this._renderDropdown()}
      </View>
    );
  };
  _onSelect = (idx: Number, value: string) => {
    this.setState({
      selectedValue: value,
    });
  };
  _renderDropdown() {
    return (
      <ModalDropdown
        options={Object.values(CUSTOMER_TYPE_SEARCH)}
        defaultValue={this.state.selectedValue}
        defaultIndex={0}
        dropdownStyle={styles.dropdownStyle}
        dropdownTextStyle={styles.dropdownTextStyle}
        onSelect={(idx: Number, value: string) => this._onSelect(idx, value)}
      >
        <View style={{ alignItems: 'center' }}>
          <Image source={ICON_FILTER} style={styles.dropDownIcon} />
          <Text style={styles.textDropdown}>{this.state.selectedValue}</Text>
        </View>
      </ModalDropdown>
    );
  }
  selectedCustomer = (item: any) => {
    let data = Object.assign(this.state.customerSelected, {
      phone: item.phone_no,
      name: item.customer_name,
      customer_code: item.customer_code,
      address: item.address1,
    });
    this.setState({ modalVisible: false, customerSelected: data });
    this.props.onSelectCustomer(this.state.customerSelected);
  };
  _renderListEmpty = () => (
    <View style={styles.containerEmpty}>
      <Text style={styles.txtEmpty}>Không tìm thấy kết quả phù hợp</Text>
    </View>
  );
  _renderListFooterComponent = () => {
    const { loadMore } = this.state;
    if (loadMore)
      return (
        <View style={{ marginVertical: 10 }}>
          <ActivityIndicator size="large" color={MAIN_COLOR} />
        </View>
      );
    return null;
  };
  _renderBody = () => {
    const { listCustomer, isOpenFirst, isFetching } = this.state;
    return (
      <View style={{ backgroundColor: '#F0EDEE', flex: 1, paddingBottom: 10 }}>
        <LoaderIndicator loading={this.state.isFetching} />

        {isOpenFirst || isFetching ? null : listCustomer.length > 0 ? (
          <FlatList
            data={listCustomer}
            renderItem={({ item, index }) => (
              <ItemCustomer item={item} type={'customer'} onPressSelected={() => this.selectedCustomer(item)} />
            )}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.1}
            onEndReached={this._loadMore}
            ListFooterComponent={this._renderListFooterComponent()}
          />
        ) : (
          this._renderListEmpty()
        )}
      </View>
    );
  };
  cancel = async () => {
    await this.setState({ modalVisible: false, page: 0, listCustomer: [] });
    this._initData();
  };
  _renderFooter = () => {
    return (
      <TouchableOpacity style={styles.button} onPress={() => this.cancel()}>
        <Text style={styles.txtButton}>HỦY</Text>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <Modal animationType={'slide'} transparent={false} visible={this.state.modalVisible}>
        {this._renderSearchView()}
        {this._renderBody()}
        <View style={styles.containerFooter}>{this._renderFooter()}</View>
      </Modal>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    token: state.user.token,
    store: state.user.dataUser.store,
  };
}
export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true },
)(ModalSelectedPhone);
const styles = StyleSheet.create({
  // search
  containerSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themes.colors.BACKGROUND_COLOR,
    borderRadius: 5,
    margin: vw(10),
    paddingHorizontal: vw(10),
  },
  iconSearch: {
    width: vw(21),
    height: vw(21),
    resizeMode: 'contain',
  },
  textInputSearch: {
    color: themes.colors.COLOR_INPUT,
    backgroundColor: 'transparent',
    height: vw(40),
    paddingVertical: 0,
    flex: 1,
    fontSize:vw(14)
  },

  // button
  button: {
    height: vw(40),
    backgroundColor: themes.colors.MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    borderRadius: vw(5),
  },

  // body
  containerBody: {
    paddingTop: 5,
    flex: 1,
  },
  dropdownStyle: {
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
  },
  dropdownTextStyle: {
    fontSize: vw(14),
    fontFamily: 'Arial',
    paddingHorizontal: vw(15),
  },
  dropDownIcon: {
    width: vw(16),
    height: vw(16),
    resizeMode: 'contain',
  },
  textDropdown: {
    fontSize: vw(10),
    color: themes.colors.MAIN_COLOR,
    fontFamily: 'Arial',
  },
  txtButton: {
    fontSize: vw(14),
    color: themes.colors.WHITE,
    fontWeight: 'bold',
  },
  containerEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtEmpty: {
    fontSize: 20,
    color: themes.colors.MAIN_COLOR,
    fontWeight: 'bold',
  },
  containerFooter: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: vw(60),
  },
});
