import React, { PureComponent } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { ICON_BACK, ICON_SEARCH, MAIN_COLOR } from '../../constants';
import styles from './OrderProductOutOfStockScreen.styles';
import { MyStatusBar } from '../../elements/MyStatusBar';
import HeaderBar from '../../elements/HeaderBar';
import Input from '../../elements/Input';
import API from '../../api/';
import ItemProductPortfolio from '../../components/ItemProductPortfolio/';
import LoaderIndicator from '../../elements/LoaderIndicator/';
import debounce from 'debounce';
type State = {
  text: any;
  page: number;
  isFetching: boolean;
  listProduct: any;
  totalPage: number;
  loadMore: boolean;
  isOpenFirst: boolean;
  quantity: number;
};
type Props = { navigation: Function; info: any };
class OrderProductOutOfStockScreen extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      page: 0,
      totalPage: 0,
      loadMore: true,
      isFetching: true,
      listProduct: [],
      isOpenFirst: true,
      quantity: 0,
    };
  }
  componentDidMount = () => {
    if (this.state.isOpenFirst) {
      this.getListProduct();
    }
  };
  getListProduct = async () => {
    try {
      const { text, page, listProduct, quantity } = this.state;
      const { info } = this.props;
      const data = {
        drg_store_id: info.drg_store_id,
        drg_drug_name: text,
        page: page + 1,
        quantity,
      };
      if (listProduct.length > 0) {
        await this.setState({ loadMore: true });
      } else {
        await this.setState({ isFetching: true });
      }
      const response = await API.productApi.getDrugListInventory(data);
      const listProducts = response.data.data === null ? [] : response.data.data;
      const newData = [...listProduct, ...listProducts];
      this.setState({
        listProduct: newData,
        isFetching: false,
        totalPage: response.data.total_page,
        page: page + 1,
        isOpenFirst: false,
        loadMore: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }
  _renderHeaderLeft() {
    const { navigation } = this.props;
    return (
      <TouchableOpacity style={styles.buttonGoBack} onPress={() => navigation.goBack()}>
        <Image source={ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtHeaderLeft}>Danh mục sản phẩm hết hàng</Text>
      </TouchableOpacity>
    );
  }
  search = async text => {
    await this.setState({ text, listProduct: [], page: 0 });
    this.getListProduct();
  };
  _renderSearchBox() {
    return (
      <View style={styles.wapperSearchBox}>
        <View style={styles.containerSearchBox}>
          <TouchableOpacity>
            <Image source={ICON_SEARCH} style={styles.iconSearchBox} />
          </TouchableOpacity>
          <Input
            onChange={debounce(this.search, 400)}
            style={styles.inputSearchBox}
            placeholder="Tìm kiếm sản phẩm hết hàng"
            selectionColor={'#333333'}
            placeholderTextColor={'#BDBDBD'}
          />
        </View>
      </View>
    );
  }
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
  _loadMore = async () => {
    const { page, totalPage, loadMore } = this.state;
    if (loadMore || page >= totalPage) {
      this.setState({ loadMore: false });
      return;
    } else {
      await this.setState({ loadMore: true });
      try {
        this.getListProduct();
      } catch (error) {
        console.log(error);
      }
    }
  };
  _renderListEmpty = () => (
    <View style={styles.containerDataEmpty}>
      <Text style={styles.txtListEmpty}>Không tìm thấy sản phẩm</Text>
    </View>
  );
  _renderListProductOutOfStock = () => {
    const { listProduct, isFetching, isOpenFirst } = this.state;
    return (
      <View style={styles.wapperList}>
        <LoaderIndicator loading={isFetching} />
        {isOpenFirst || isFetching ? null : listProduct.length > 0 ? (
          <FlatList
            data={listProduct}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.1}
            onEndReached={this._loadMore}
            renderItem={({ item }) => (
              <ItemProductPortfolio item={item} type={'orderNow'} navigation={this.props.navigation} />
            )}
            ListFooterComponent={this._renderListFooterComponent}
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
        {this._renderListProductOutOfStock()}
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
export default connect(mapStateToProps)(OrderProductOutOfStockScreen);
