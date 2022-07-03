import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, RefreshControl, ScrollView } from 'react-native';
import styles from './ProductPortfolioScreen.style';
import {
  ICON_BACK,
  ICON_SEARCH,
  ICON_FILTER,
  MAIN_COLOR,
  PRODUCT_STORE_TYPE_SEARCH,
  WHITE,
  themes,
} from '../../constants';
import vw from '../../utils/size-dynamic';
import { MyStatusBar } from '../../elements/MyStatusBar';
import HeaderBar from '../../elements/HeaderBar';
import ModalDropdown from 'react-native-modal-dropdown';
import Input from '../../elements/Input';
import ItemProductPortfolio from '../../components/ItemProductPortfolio/';
import API from '../../api/';
import { connect } from 'react-redux';
import debounce from '../../utils/debounce';
import LoadContent from '../../elements/LoadContent';
import { ShineOverlay, Progressive } from 'rn-placeholder';
import { Navigation } from '../../dataType/';
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
  isRefreshing: boolean;
};
type Props = {
  navigation: Navigation;
  info: any;
  token: any;
};
class ProductPortfolioScreen extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedValue: PRODUCT_STORE_TYPE_SEARCH.STOCKING,
      text: '',
      isFetching: false,
      listProduct: [],
      page: 0,
      totalPage: 0,
      loadMore: true,
      isOpenFirst: true,
      quantity: 1,
      flag: true,
      isRefreshing: false,
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
  componentDidUpdate(prevProps: Props) {
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
        isRefreshing: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        isFetching: false,
        isOpenFirst: false,
        loadMore: false,
        isRefreshing: false,
      });
    }
  };
  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }
  _renderHeaderRight = () => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity onPress={() => navigation.navigate('AddNewProductScreen')}>
        <Text style={styles.txtButton}>Thêm</Text>
      </TouchableOpacity>
    );
  };
  _renderHeaderLeft() {
    const { navigation } = this.props;
    return (
      <TouchableOpacity style={styles.buttonGoBack} onPress={() => navigation.goBack()}>
        <Image source={ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtHeaderLeft}>Danh mục sản phẩm</Text>
      </TouchableOpacity>
    );
  }
  search = (text: string) => {
    this.setState({ text, listProduct: [], page: 0 }, () => this._initData());
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
            selectionColor={themes.colors.COLOR_INPUT}
            placeholderTextColor={themes.colors.PLACEHOLDER_INPUT}
          />
          {this._renderDropdown()}
        </View>
      </View>
    );
  }
  changeTypeFilter = async () => {
    const { selectedValue } = this.state;
    if (selectedValue === PRODUCT_STORE_TYPE_SEARCH.ALL) {
      this.setState({ quantity: 3, page: 0, listProduct: [] }, () => this._initData());
    } else if (selectedValue === PRODUCT_STORE_TYPE_SEARCH.OUT_OF_STOCK) {
      this.setState({ quantity: 0, page: 0, listProduct: [] }, () => this._initData());
    } else {
      this.setState({ quantity: 1, page: 0, listProduct: [] }, () => this._initData());
    }
  };
  _onSelect = (idx: number, value: any) => {
    this.setState(
      {
        selectedValue: value,
      },
      () => this.changeTypeFilter(),
    );
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
        onSelect={(idx: number, value: any) => this._onSelect(idx, value)}
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
      <TextEmpty text={'Không tìm thấy sản phẩm nào!'} />
    </ScrollView>
  );
  onRefresh = () => {
    this.setState({ isRefreshing: true, listProduct: [], page: 0 }, () => this._initData());
  };
  _renderListProductPortfolio = () => {
    const { listProduct, isFetching, isOpenFirst, flag } = this.state;
    return (
      <View
        style={[
          styles.wapperList,
          { backgroundColor: isFetching ? themes.colors.WHITE : themes.colors.BACKGROUND_COLOR },
        ]}
      >
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
                tintColor={themes.colors.MAIN_COLOR}
                colors={[themes.colors.MAIN_COLOR, themes.colors.RED_BROWN, themes.colors.GRAY]}
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh}
              />
            }
            extraData={this.state}
            data={listProduct}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={listProduct.length > 9 ? 0.1 : null}
            onEndReached={listProduct.length > 9 ? (flag ? this._loadMore : null) : null}
            renderItem={({ item }) => (
              <ItemProductPortfolio item={item} type={'getList'} navigation={this.props.navigation} />
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
export default connect(mapStateToProps)(ProductPortfolioScreen);
