import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import styles from './InvImportCreateWithBusiness.styles';
import { ICON_SEARCH, MAIN_COLOR, WHITE, themes } from '../../constants/';
import Input from '../../elements/Input';
import debounce from '../../utils/debounce';
import ItemProductImportNew from '../../components/ItemProductImportNew';
import LoaderIndicator from '../../elements/LoaderIndicator';
import { connect } from 'react-redux';
import API from '../../api/';
import ModalDrugBusiness from './ModalDrugBusiness';
import { INV_IMPORT_ADD_NEW_DRUG } from '../../redux/types/';
import { NavigationEvents } from 'react-navigation';
import { deletedProductBusiness } from '../../redux/action/inventory';
import EventBus from '../../utils/EventBus';
import LoadContent from '../../elements/LoadContent';
import { ShineOverlay, Progressive } from 'rn-placeholder';
import vw from '../../utils/size-dynamic';
import { Navigation } from '../../dataType/index.d';
import TextEmpty from '../../elements/TextEmpty/';
interface Props {
  info: any;
  listProductBusiness: any;
  codeQR: string;
  navigation: Navigation;
}
interface State {
  isOpenFirst: boolean;
  listProduct: any;
  text: string;
  page: number;
  totalPage: number;
  loadMore: boolean;
  isFetching: boolean;
  flag: boolean;
  item: any;
  codeQR: string;
}

class index extends PureComponent<Props, State> {
  modalDrugBusiness: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      listProduct: [],
      text: '',
      page: 0,
      totalPage: 0,
      loadMore: false,
      isOpenFirst: true,
      isFetching: false,
      flag: true,
      item: [],
      codeQR: '',
    };
  }
  componentDidMount() {
    this.initData();
    EventBus.addListener('AddNewDrugSuccess', this.callGetHistory);
  }
  callGetHistory = async () => {
    await this.setState({ page: 0, listProduct: [], text: '' });
    this.initData();
  };
  initData = async () => {
    const { info } = this.props;
    const { text, listProduct, page } = this.state;
    try {
      const params = {
        drg_drug_name: text,
        drg_store_id: info.drg_store_id,
        page: page + 1,
      };
      if (listProduct.length > 0) {
        await this.setState({ loadMore: true, flag: false });
      } else {
        await this.setState({ isFetching: true });
      }
      const res = await API.warehouse.getDrugListImportNew(params);
      const listHistoryOld = res.data.data === null ? [] : res.data.data;
      const newData = [...listProduct, ...listHistoryOld];
      await this.setState({
        listProduct: newData,
        isFetching: false,
        totalPage: res.data.total_page,
        page: page + 1,
        loadMore: false,
        flag: true,
        isOpenFirst: false,
      });
      if (this.props.navigation.getParam('isUpdate') === true) {
        const { listProductBusiness } = this.props;
        const newListProductSelected = [...listProductBusiness, ...this.state.listProduct];
        const filterSameProduct = newListProductSelected
          .map(e => e['drg_drug_cd'])
          .map((e, i, final) => final.indexOf(e) === i && i)
          .filter(e => newListProductSelected[e])
          .map(e => newListProductSelected[e]);
        this.setState({ listProduct: filterSameProduct });
      }
    } catch (error) {
      console.log(error);
      this.setState({
        isFetching: false,
        loadMore: false,
        isOpenFirst: false,
      });
    }
  };
  search = async (text: any) => {
    this.setState({ text, page: 0, listProduct: [] });
    this.initData();
  };
  addImportDrug = () => {
    this.props.navigation.navigate(INV_IMPORT_ADD_NEW_DRUG);
  };
  _renderSearchView = () => {
    return (
      <View style={styles.wapperSreach}>
        <View style={styles.containerSearch}>
          <Image source={ICON_SEARCH} style={styles.iconSearch} />
          <Input
            onChange={debounce(this.search, 400)}
            style={styles.textInputSearch}
            placeholder="Tìm kiếm thuốc trong kho"
            selectionColor={themes.colors.COLOR_INPUT}
            placeholderTextColor={themes.colors.PLACEHOLDER_INPUT}
          />
        </View>
        <TouchableOpacity onPress={this.addImportDrug} style={styles.buttonAddDrug}>
          <Text style={styles.txtAdd}>Tạo mới</Text>
        </TouchableOpacity>
      </View>
    );
  };
  modalNote = (item: any) => {
    this.setState({ item }, () => this.modalDrugBusiness.toggleModal(true));
  };
  deletedProduct = (item: any) => {
    Alert.alert('Thông báo', 'Bạn có chắc chắn xóa sản phẩm', [
      { text: 'Hủy', onPress: () => console.log('Ask me later pressed') },
      { text: 'Đồng ý', onPress: () => this.props.deletedProductBusiness(item) },
    ]);
  };
  _renderItem = (item: any) => {
    const { listProductBusiness } = this.props;
    const { listProduct } = this.state;
    if (listProductBusiness && listProductBusiness.length) {
      for (let i = 0; i < listProductBusiness.length; i++) {
        if (listProductBusiness[i].drg_drug_cd == item.drg_drug_cd.toString()) {
          return (
            <ItemProductImportNew
              type="modal"
              item={listProductBusiness[i]}
              note={() => this.modalNote(listProductBusiness[i])}
              deletedProduct={() => this.deletedProduct(listProductBusiness[i])}
            />
          );
        }
      }
    }
    return (
      <ItemProductImportNew
        type="modal"
        item={item}
        note={() => this.modalNote(item)}
        deletedProduct={() => this.deletedProduct(item)}
      />
    );
  };
  loadMore = async () => {
    const { page, totalPage, loadMore } = this.state;
    if (loadMore || page >= totalPage) {
      await this.setState({ loadMore: false });
      return;
    } else {
      await this.setState({ loadMore: true });
      try {
        this.initData();
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
    return <TextEmpty text={'Không tìm thấy sản phẩm nào!'} />;
  };
  _renderBody = () => {
    const { listProduct, isOpenFirst, isFetching, flag, text } = this.state;
    const { listProductBusiness } = this.props;
    // const newListProductSelected = [...listProductBusiness, ...this.state.listProduct];
    // const filterSameProduct = newListProductSelected
    //   .map(e => e['drg_drug_cd'])
    //   .map((e, i, final) => final.indexOf(e) === i && i)
    //   .filter(e => newListProductSelected[e])
    //   .map(e => newListProductSelected[e]);

    return (
      <View
        style={[
          styles.containerBody,
          { backgroundColor: isFetching ? themes.colors.WHITE : themes.colors.BACKGROUND_COLOR },
        ]}
      >
        <LoadContent
          number={10}
          loading={isFetching}
          animation={ShineOverlay}
          style={{ marginTop: vw(5), marginHorizontal: vw(5) }}
        />
        {isOpenFirst || isFetching ? null : listProduct.length > 0 ? (
          <FlatList
            extraData={listProductBusiness}
            data={listProduct}
            keyExtractor={(item: any) => item.drg_drug_cd.toString()}
            renderItem={({ item }) => this._renderItem(item)}
            onEndReachedThreshold={listProduct.length > 9 ? 0.1 : null}
            onEndReached={listProduct.length > 9 ? (flag ? this.loadMore : null) : null}
            ListFooterComponent={this._renderListFooterComponent()}
          />
        ) : (
          this._renderListEmpty()
        )}
      </View>
    );
  };

  onWillFocus = () => {
    const codeQR = this.props.codeQR;
    if (codeQR && codeQR !== this.state.item.drg_barcode) {
      this.setState({ item: { ...this.state.item, drg_barcode: codeQR } });
      this.modalDrugBusiness.toggleModal(true);
    }
  };
  render() {
    const { navigation } = this.props;
    const { item } = this.state;
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.onWillFocus} />
        {this._renderSearchView()}
        {this._renderBody()}
        <ModalDrugBusiness ref={(node: any) => (this.modalDrugBusiness = node)} item={item} navigation={navigation} />
      </View>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    token: state.user.token,
    listProductBusiness: state.inventory.listProductBusiness,
    listProductDQG: state.inventory.listProductDQG,
  };
}
const mapDispatchToProps = {
  deletedProductBusiness,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true },
)(index);
