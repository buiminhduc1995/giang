import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, Platform, FlatList, ActivityIndicator, Alert } from 'react-native';
import styles from './CustomerScreen.style';
import { ICON_BACK, ICON_ADD_HOME, ICON_SEARCH, ICON_FILTER, MAIN_COLOR, CUSTOMER_TYPE_SEARCH } from '../../constants';
import vw from '../../utils/size-dynamic';
import { MyStatusBar } from '../../elements/MyStatusBar';
import HeaderBar from '../../elements/HeaderBar';
import Input from '../../elements/Input';
import ModalDropdown from 'react-native-modal-dropdown';
import { dataCustomer } from '../../constants/data';
import ItemCustomer from '../../components/ItemCustomer/';
import { connect } from 'react-redux';
import API from '../../api/';
import LoaderIndicator from '../../elements/LoaderIndicator';
import { DETAIL_CUSTOMER_SCREEN } from '../../redux/types/';
import debounce from 'debounce';
type Props = {
  navigation: Function;
  token: any;
  info: any;
  store: any;
};
type State = {
  selectedValue: string;
  listCustomer: any;
  isFetching: boolean;
  text: any;
  page: number;
  totalPage: number;
  loadMore: boolean;
  isOpenFirst: boolean;
};
class CustomerScreen extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: CUSTOMER_TYPE_SEARCH.CUSTOMER_NAME,
      listCustomer: [],
      isFetching: false,
      text: '',
      page: 0,
      totalPage: 0,
      loadMore: true,
      isOpenFirst: true,
    };
  }
  componentDidMount = () => {
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
      const response = await API.customerApi.getCustomer(data, this.props.token);
      const listCustomers = response.data.data === null ? [] : response.data.data;
      const newData = [...listCustomer, ...listCustomers];
      this.setState({
        listCustomer: newData,
        isFetching: false,
        totalPage: response.data.total_page,
        page: page + 1,
        loadMore: false,
        isOpenFirst: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        isFetching: false,
        isOpenFirst: false,
      });
    }
  };
  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }
  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={styles.buttonBack} onPress={() => this.props.navigation.goBack()}>
        <Image source={ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtHeaderLeft}>Danh sách khách hàng</Text>
      </TouchableOpacity>
    );
  }
  search = async (text: string) => {
    await this.setState({ text, listCustomer: [], page: 0 });
    this._initData();
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
      } catch (error) { }
    }
  };
  _renderSearchBox() {
    const { selectedValue } = this.state;
    const placeholder =
      selectedValue == CUSTOMER_TYPE_SEARCH.CUSTOMER_NAME
        ? 'Nhập tên khách hàng'
        : 'Nhập số điện thoại'
    const keyboardType =
      selectedValue == CUSTOMER_TYPE_SEARCH.CUSTOMER_NAME
        ? 'default'
        : selectedValue == CUSTOMER_TYPE_SEARCH.PHONE_NUMBER
          ? 'phone-pad'
          : 'default';
    return (
      <View style={styles.wapperSearchBox}>
        <View style={styles.containerSearchBox}>
          <TouchableOpacity>
            <Image source={ICON_SEARCH} style={styles.iconSearch} />
          </TouchableOpacity>
          <Input
            onChange={debounce(this.search, 400)}
            style={styles.styleInput}
            placeholder={placeholder}
            keyboardType={keyboardType}
            selectionColor={'#333333'}
            placeholderTextColor={'#BDBDBD'}
          />
          {this._renderDropdown()}
        </View>
      </View>
    );
  }
  _onSelect = (idx: number, value: any) => {
    this.setState({
      selectedValue: value,
    });
  };

  _renderDropdown() {
    return (
      <ModalDropdown
        options={CUSTOMER_TYPE_SEARCH}
        defaultValue={this.state.selectedValue}
        defaultIndex={0}
        dropdownStyle={styles.dropdownStyle}
        dropdownTextStyle={styles.dropdownTextStyle}
        onSelect={(idx: number, value: any) => this._onSelect(idx, value)}
      >
        <View style={styles.wapperValueDropDown}>
          <Image source={ICON_FILTER} style={styles.iconFilter} />
          <Text style={styles.txtValueDropDown}>{this.state.selectedValue}</Text>
        </View>
      </ModalDropdown>
    );
  }
  onPressDetailButton = (item: any) => {
    const { navigation } = this.props;
    navigation.navigate(DETAIL_CUSTOMER_SCREEN, { item });
  };

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
  _renderListEmpty = () => (
    <View style={styles.containerDataEmpty}>
      <Text style={styles.txtListEmpty}>Không tìm thấy khách hàng</Text>
    </View>
  );
  _renderListCustomer = () => {
    const { listCustomer, isFetching, isOpenFirst } = this.state;
    return (
      <View style={styles.wapperListCustomer}>
        <LoaderIndicator loading={isFetching} />
        {isOpenFirst || isFetching ? null : listCustomer.length > 0 ? (
          <FlatList
            data={listCustomer}
            keyExtractor={item => item.user_id.toString()}
            onEndReachedThreshold={0.1}
            onEndReached={this._loadMore}
            renderItem={({ item }) => (
              <ItemCustomer
                item={item}
                type={'customer_detail'}
                onPressDetailButton={() => this.onPressDetailButton(item)}
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
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        {this._renderSearchBox()}
        {this._renderListCustomer()}
      </View>
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
export default connect(mapStateToProps)(CustomerScreen);
