import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList, Alert } from 'react-native';
import styles from './InvImportCreateWithDQG.styles';
import { ICON_SEARCH, WHITE, themes } from '../../constants/';
import Input from '../../elements/Input';
import debounce from '../../utils/debounce';
import ItemProductImportNew from '../../components/ItemProductImportNew';
import { connect } from 'react-redux';
import API from '../../api/';
import ModalDrugDQG from './ModalDrugDQG';
import { NavigationEvents } from 'react-navigation';
import { deletedProductDQG } from '../../redux/action/inventory';
import LoadContent from '../../elements/LoadContent';
import { ShineOverlay, Progressive } from 'rn-placeholder';
import vw from '../../utils/size-dynamic';
import TextEmpty from '../../elements/TextEmpty/';
type Props = {
  listProductBusiness: any;
};
type State = {
  isOpenFirst: boolean;
  listProduct: any;
  text: string;
  page: number;
  totalPage: number;
  loadMore: boolean;
  isFetching: boolean;
  flag: boolean;
  item: any;
};
class index extends PureComponent<Props, State> {
  constructor(props) {
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
    };
  }
  componentDidMount() {
    if (this.state.isOpenFirst) {
      this.initData();
    }
  }
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
      const res = await API.warehouse.getDrugListImportDQG(params);
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
      </View>
    );
  };
  modalNote = async item => {
    const {} = this.props;
    await this.setState({ item });
    this.modalDrugDQG.toggleModal(true);
  };
  deletedProduct = (item: any) => {
    Alert.alert('Thông báo', 'Bạn có chắc chắn xóa sản phẩm', [
      { text: 'Hủy', onPress: () => console.log('Ask me later pressed') },
      { text: 'Đồng ý', onPress: () => this.props.deletedProductDQG(item) },
    ]);
  };
  _renderItem = (item: any) => {
    const { listProductDQG } = this.props;
    if (listProductDQG && listProductDQG.length) {
      for (let i = 0; i < listProductDQG.length; i++) {
        if (listProductDQG[i].drg_drug_cd == item.drg_drug_cd.toString()) {
          return (
            <ItemProductImportNew
              type="modalDQG"
              item={listProductDQG[i]}
              note={() => this.modalNote(listProductDQG[i])}
              deletedProduct={() => this.deletedProduct(listProductDQG[i])}
            />
          );
        }
      }
    }
    return (
      <ItemProductImportNew
        type="modalDQG"
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
    const { listProduct, isOpenFirst, isFetching, flag } = this.state;
    const { listProductDQG } = this.props;
    return (
      <View style={[styles.containerBody, { backgroundColor: isFetching ? WHITE : '#F0EDEE' }]}>
        <LoadContent
          number={10}
          loading={isFetching}
          animation={ShineOverlay}
          style={{ marginHorizontal: vw(5), marginTop: vw(5) }}
        />
        {isOpenFirst || isFetching ? null : listProduct.length > 0 ? (
          <FlatList
            extraData={listProductDQG}
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
  // _renderButton = () => {
  //   const { navigation, listProductDQG } = this.props;
  //   return (
  //     <TouchableOpacity style={styles.buttonExport} onPress={() => navigation.navigate(IMPORT_STEP_2)}>
  //       <Text style={styles.txtFooter}>Đã chọn ({listProductDQG && listProductDQG.length}) sản phẩm</Text>
  //     </TouchableOpacity>
  //   );
  // };
  onWillFocus = () => {
    const codeQR = this.props.codeQR;
    if (codeQR && codeQR !== this.state.item.barcode) {
      this.setState({ item: { ...this.state.item, barcode: codeQR } });
      this.modalDrugDQG.toggleModal(true);
    }
  };
  render() {
    const { listProductDQG, navigation } = this.props;
    const { item } = this.state;
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.onWillFocus} />
        {this._renderSearchView()}
        {this._renderBody()}
        {/* {listProductDQG && listProductDQG.length > 0 ? (
          <View style={styles.wapperButton}>{this._renderButton()}</View>
        ) : null} */}
        <ModalDrugDQG ref={(node: any) => (this.modalDrugDQG = node)} item={item} navigation={this.props.navigation} />
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
  deletedProductDQG,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true },
)(index);
