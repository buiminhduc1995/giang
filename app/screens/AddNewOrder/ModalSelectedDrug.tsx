import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {
  ICON_BACK,
  ICON_ADD_HOME,
  ICON_SEARCH,
  ICON_FILTER,
  MAIN_COLOR,
  ICON_QR_CODE,
  PRODUCT_STORE_TYPE_SEARCH,
  WHITE,
  themes,
} from '../../constants';
import Input from '../../elements/Input';
import vw from '../../utils/size-dynamic';
import stylesGlobal from './AddNewOrder.style';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import API from '../../api/';
import ItemProductPortfolio from '../../components/ItemProductPortfolio/';
import debounce from '../../utils/debounce';
import LoadContent from '../../elements/LoadContent';
import { ShineOverlay, Progressive } from 'rn-placeholder';
import { Navigation } from '../../dataType';
import TextEmpty from '../../elements/TextEmpty/';
type Props = {
  navigation: Navigation;
  info: any;
  token: any;
  productSelected: () => void;
};
type State = {
  isFetching: boolean;
  selectedValue: any;
  text: string;
  listProduct: any;
  modalVisible: boolean;
  listProductSelected: any;
  totalPage: number;
  page: number;
  loadMore: boolean;
  isOpenFirst: boolean;
  quantity: number;
  flag: boolean;
};
class ModalSelectedDrug extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedValue: PRODUCT_STORE_TYPE_SEARCH.ALL,
      text: '',
      isFetching: false,
      listProduct: [],
      listProductSelected: [],
      page: 0,
      totalPage: 0,
      loadMore: false,
      isOpenFirst: true,
      quantity: 1,
      flag: true,
    };
  }

  componentDidMount = () => {
    if (this.state.isOpenFirst) {
      this.getData();
    }
  };
  getData = async () => {
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
      const response = await API.productApi.getDrugListInventory(data, this.props.token);
      const listDrugs = response.data.data === null ? [] : response.data.data;
      const newData = [...listProduct, ...listDrugs];
      await this.setState({
        listProduct: newData,
        totalPage: response.data.total_page,
        page: page + 1,
        loadMore: false,
        isFetching: false,
        isOpenFirst: false,
        flag: true,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loadMore: false,
        isFetching: false,
        isOpenFirst: false,
      });
    }
  };

  toggleModal(visible: boolean) {
    this.setState({ modalVisible: visible });
  }
  _onSelect = (idx: Number, value: any) => {
    this.setState({
      selectedValue: value,
    });
  };
  _renderDropdown() {
    return (
      <ModalDropdown
        options={PRODUCT_STORE_TYPE_SEARCH}
        defaultValue={this.state.selectedValue}
        defaultIndex={0}
        dropdownStyle={styles.dropdownStyle}
        dropdownTextStyle={styles.dropdownTextStyle}
        onSelect={(idx: Number, value: any) => this._onSelect(idx, value)}
      >
        <View>
          <Image source={themes.ICON_FILTER} style={styles.dropDownIcon} />
          <Text style={styles.textDropdown}>{this.state.selectedValue}</Text>
        </View>
      </ModalDropdown>
    );
  }
  selectedProduct = (item: Object) => {
    const { listProductSelected } = this.state;
    const newListProductSelected = [...listProductSelected, item];
    this.setState({ listProductSelected: newListProductSelected });
  };
  unSelectedProduct = (item: { drug_id: Number }) => {
    const { listProductSelected } = this.state;
    const newListProductSelected = listProductSelected.filter((product: { drug_id: Number }) => {
      if (product.drug_id !== item.drug_id) return true;
    });
    this.setState({ listProductSelected: newListProductSelected });
  };
  _loadMore = async () => {
    const { page, totalPage, loadMore } = this.state;
    if (loadMore || page >= totalPage) {
      await this.setState({ loadMore: false });
      return;
    } else {
      await this.setState({ loadMore: true });
      try {
        this.getData();
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
          style={{ marginTop: 5, marginLeft: vw(10) }}
          animation={Progressive}
        />
      );
    return null;
  };
  _renderListEmpty = () => <TextEmpty text={'Không tìm thấy sản phẩm nào!'} />;

  _renderBody = () => {
    const { listProduct, isOpenFirst, isFetching, flag } = this.state;
    return (
      <View
        style={[
          styles.containerBody,
          { backgroundColor: isFetching ? themes.colors.WHITE : themes.colors.BACKGROUND_COLOR },
        ]}
      >
        <LoadContent number={10} loading={isFetching} animation={ShineOverlay} />
        {isOpenFirst || isFetching ? null : listProduct.length > 0 ? (
          <FlatList
            data={listProduct}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={listProduct.length > 9 ? 0.1 : null}
            onEndReached={listProduct.length > 9 ? (flag ? this._loadMore : null) : null}
            renderItem={({ item }) => (
              <ItemProductPortfolio
                type="AddProductNew"
                item={item}
                selectedProduct={() => this.selectedProduct(item)}
                unSelectedProduct={() => this.unSelectedProduct(item)}
                navigation={this.props.navigation}
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
  onPressOK = async () => {
    const { listProductSelected } = this.state;
    this.props.productSelected(listProductSelected);
    this.setState({ modalVisible: false, listProduct: [], text: '', page: 0, listProductSelected: [] }, () =>
      this.getData(),
    );
  };

  search = (text: string) => {
    this.setState({ text, listProduct: [], page: 0 }, () => this.getData());
  };
  _renderSearchView = () => {
    const { selectedValue } = this.state;
    const value =
      selectedValue === PRODUCT_STORE_TYPE_SEARCH.ALL
        ? 'Tìm kiếm sản phẩm'
        : selectedValue === PRODUCT_STORE_TYPE_SEARCH.STOCKING
        ? 'Tìm kiếm sản phẩm đang kinh doanh'
        : 'Tìm kiếm sản phẩm hết hàng';
    return (
      <View style={styles.containerSearch}>
        <Image source={themes.ICON_SEARCH} style={styles.iconSearch} />
        <Input
          onChange={debounce(this.search, 400)}
          style={styles.textInputSearch}
          placeholder={value}
          selectionColor={themes.colors.COLOR_INPUT}
          placeholderTextColor={themes.colors.PLACEHOLDER_INPUT}
        />
      </View>
    );
  };

  onPressCancel = () => {
    this.toggleModal(!this.state.modalVisible);
    this.setState({ modalVisible: false, listProduct: [], text: '', page: 0, listProductSelected: [] }, () =>
      this.getData(),
    );
  };
  _renderButton = (onPress: () => void, text: String) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={stylesGlobal.txtButton}>{text}</Text>
    </TouchableOpacity>
  );
  _renderButtonView = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {this._renderButton(this.onPressCancel, 'Hủy')}
      {this._renderButton(this.onPressOK, 'Đồng ý')}
    </View>
  );
  render() {
    return (
      <Modal animationType={'slide'} transparent={false} visible={this.state.modalVisible}>
        {this._renderSearchView()}
        {this._renderBody()}
        {this._renderButtonView()}
      </Modal>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    token: state.user.token,
  };
}
export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true },
)(ModalSelectedDrug);

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
    fontSize: vw(14),
  },

  // button
  button: {
    height: vw(50),
    backgroundColor: themes.colors.MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    borderRightColor: themes.colors.WHITE,
    borderRightWidth: vw(1),
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
    fontFamily: themes.fontFamily.fontFamily,
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
    fontFamily: themes.fontFamily.fontFamily,
  },
  viewListEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtEmpty: {
    fontSize: 20,
    color: themes.colors.MAIN_COLOR,
    fontWeight: 'bold',
  },
});
