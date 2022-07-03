import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Animated, Alert, RefreshControl } from 'react-native';
import styles from './TabDrugInventory.style';
import {
  ICON_BACK,
  ICON_SEARCH,
  ICON_FILTER,
  MAIN_COLOR,
  PRODUCT_STORE_TYPE_SEARCH,
  WHITE,
  BACKGROUND_COLOR,
  BLACK,
} from '../../constants';
import vw from '../../utils/size-dynamic';
import { MyStatusBar } from '../../elements/MyStatusBar';
import HeaderBar from '../../elements/HeaderBar';
import ModalDropdown from 'react-native-modal-dropdown';
import Input from '../../elements/Input';
import LoaderIndicator from '../../elements/LoaderIndicator';
import ItemProductPortfolio from '../../components/ItemProductPortfolio';
import API from '../../api';
import { connect } from 'react-redux';
// import debounce from 'debounce';
import debounce from '../../utils/debounce';
import { PRODUCT_DETAIL_SCREEN } from '../../redux/types';
import EventBus from '../../utils/EventBus';
import LoadContent from '../../elements/LoadContent';
import { ShineOverlay, Progressive } from 'rn-placeholder';
import ProductItem from '../../screens/OrderToProvider/ProductItem';
import { Navigation } from '../../dataType';
import TextEmpty from '../../elements/TextEmpty/';
type State = {
  isFetching: boolean;
  selectedValue: any;
  text: string;
  listProduct: any;
  page: number;
  totalPage: number;
  loadMore: boolean;
  isOpenFirst: boolean;
  quantity: number;
  flag: boolean;
  refreshing: boolean;
  fadeIn: any;
  fadeOut: any;
  show: boolean;
};
type Props = {
  info: any;
  token: any;
  navigation: Navigation;
};
class TabDrugInventory extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedValue: PRODUCT_STORE_TYPE_SEARCH.ALL,
      text: '',
      isFetching: false,
      listProduct: [],
      page: 0,
      totalPage: 0,
      loadMore: true,
      isOpenFirst: true,
      quantity: -1,
      flag: true,
      refreshing: false,
      fadeIn: new Animated.Value(0),
      fadeOut: new Animated.Value(1),
      show: false,
    };
  }
  componentDidMount = async () => {
    if (this.props.navigation.getParam('type') === 'HetHang') {
      await this.setState({
        selectedValue: PRODUCT_STORE_TYPE_SEARCH.OUT_OF_STOCK,
        quantity: 0,
        page: 0,
        listProduct: [],
      });
      this._initData();
    } else if (this.state.isOpenFirst) {
      this._initData();
    }
  };
  componentDidUpdate(prevProps) {
    if (
      this.props.navigation.getParam('type') === 'HetHang' &&
      prevProps.navigation.getParam('type') !== this.props.navigation.getParam('type')
    ) {
      this.setState({ selectedValue: PRODUCT_STORE_TYPE_SEARCH.OUT_OF_STOCK, quantity: 0, page: 0, listProduct: [] });
      this._initData();
    }
  }
  _initData = async () => {
    try {
      const { text, listProduct, page, quantity } = this.state;
      const data = {
        drg_store_id: this.props.info.drg_store_id,
        drg_drug_name: text,
        page: page + 1,
        quantity: quantity,
      };
      if (listProduct.length > 0) {
        await this.setState({ loadMore: true, flag: false });
      } else {
        await this.setState({ isFetching: true });
      }
      const response = await API.productApi.getDrugListInventory(data);
      const listProducts = response.data.data === null ? [] : response.data.data;
      const newData = [...listProduct, ...listProducts];
      await this.setState({
        listProduct: newData,
        isFetching: false,
        totalPage: response.data.total_page,
        page: page + 1,
        isOpenFirst: false,
        loadMore: false,
        flag: true,
        refreshing: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        isFetching: false,
        isOpenFirst: false,
        loadMore: false,
        refreshing: false,
      });
    }
  };
  search = async (text: string) => {
    await this.setState({ text, listProduct: [], page: 0 });
    this._initData();
  };
  _renderSearchBox() {
    const { selectedValue } = this.state;
    const placeholder =
      selectedValue === PRODUCT_STORE_TYPE_SEARCH.ALL
        ? 'Tìm kiếm sản phẩm'
        : selectedValue === PRODUCT_STORE_TYPE_SEARCH.STOCKING
        ? 'Tìm kiếm sản phẩm còn hàng'
        : 'Tìm kiếm sản phẩm đã hết hàng';
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
            selectionColor={'#333333'}
            placeholderTextColor={'#BDBDBD'}
          />
          {this._renderDropdown()}
        </View>
      </View>
    );
  }
  changeTypeFilter = async () => {
    const { selectedValue } = this.state;
    if (selectedValue === PRODUCT_STORE_TYPE_SEARCH.ALL) {
      this.setState({ quantity: 3, page: 0, listProduct: [] });
      this._initData();
    } else if (selectedValue === PRODUCT_STORE_TYPE_SEARCH.OUT_OF_STOCK) {
      this.setState({ quantity: 0, page: 0, listProduct: [] });
      this._initData();
    } else {
      this.setState({ quantity: 1, page: 0, listProduct: [] });
      this._initData();
    }
  };
  _onSelect = async (idx: any, value: any) => {
    await this.setState({
      selectedValue: value,
    });
    this.changeTypeFilter();
  };
  _loadMore = async () => {
    const { page, totalPage, loadMore } = this.state;
    if (loadMore || page >= totalPage) {
      await this.setState({ loadMore: false });
      return;
    } else {
      await this.setState({ loadMore: true });
      try {
        this._initData();
      } catch (error) {
        console.log(error);
      }
    }
  };
  _renderDropdown() {
    return (
      <ModalDropdown
        options={Object.values(PRODUCT_STORE_TYPE_SEARCH)}
        defaultValue={this.state.selectedValue}
        defaultIndex={0}
        dropdownStyle={styles.dropdownStyle}
        dropdownTextStyle={styles.dropdownTextStyle}
        onSelect={(idx, value) => this._onSelect(idx, value)}
      >
        <View style={styles.wapperDropDown}>
          <Image source={ICON_FILTER} style={styles.iconFilter} />
          <Text style={styles.txtValueDropDown}>{this.state.selectedValue}</Text>
        </View>
      </ModalDropdown>
    );
  }
  _renderListFooterComponent = () => {
    const { loadMore } = this.state;
    if (loadMore)
      return (
        <LoadContent
          number={1}
          loading={loadMore}
          style={{ marginTop: vw(5), marginHorizontal: vw(10) }}
          animation={Progressive}
        />
      );
    return null;
  };
  _renderListEmpty = () => <TextEmpty text={'Không tìm thấy sản phẩm nào!'} />;
  onRefresh = async () => {
    await this.setState({ listProduct: [], page: 0, refreshing: true });
    this._initData();
  };
  fadeIn() {
    this.setState({ show: true });
    this.state.fadeIn.setValue(0);
    Animated.timing(this.state.fadeIn, {
      toValue: 1,
      duration: 1500,
    }).start(() => this.fadeOut());
  }

  fadeOut() {
    this.setState({ show: false });
    this.state.fadeOut.setValue(1);
    Animated.timing(this.state.fadeIn, {
      toValue: 0,
      duration: 1000,
    }).start();
  }
  show = e => {
    if (e === true) {
      this.fadeIn();
    }
  };
  _showOrderCart = () => {
    return (
      <Animated.View
        style={[
          styles.wapperAnimation,
          {
            opacity: this.state.fadeIn,
          },
        ]}
      >
        <View style={styles.viewAnimation}>
          <Text style={styles.txtAnimation}>Đã thêm vào giỏ hàng</Text>
        </View>
      </Animated.View>
    );
  };
  _renderListProductPortfolio = () => {
    const { listProduct, isFetching, isOpenFirst, flag, show } = this.state;
    return (
      <View style={[styles.wapperList, { backgroundColor: WHITE }]}>
        <LoadContent
          number={10}
          loading={isFetching}
          animation={ShineOverlay}
          style={{ marginHorizontal: vw(10), marginTop: vw(5) }}
        />
        {isOpenFirst || isFetching ? null : listProduct.length > 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl
                tintColor={MAIN_COLOR}
                colors={[MAIN_COLOR, '#CA4E4E', '#58C4BE']}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                title="Loading..."
              />
            }
            extraData={this.state}
            data={listProduct}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={listProduct.length > 9 ? 0.1 : null}
            onEndReached={listProduct.length > 9 ? (flag ? this._loadMore : null) : null}
            renderItem={({ item }) => (
              <ProductItem data={item} navigation={this.props.navigation} action={e => this.show(e)} />
            )}
            ListFooterComponent={this._renderListFooterComponent()}
          />
        ) : (
          this._renderListEmpty()
        )}
        {this._showOrderCart()}
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {this._renderSearchBox()}
        {this._renderListProductPortfolio()}
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    token: state.user.token,
  };
}
export default connect(mapStateToProps)(TabDrugInventory);
