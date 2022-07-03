import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { MyStatusBar } from '../../elements/MyStatusBar/';
import HeaderBar from '../../elements/HeaderBar';
import { ICON_BACK, ICON_SEARCH, WHITE, themes } from '../../constants/index';
import styles from './InvCheckCreate.styles';
import API from '../../api/';
import { connect } from 'react-redux';
import ItemDetailCheckInventory from '../../components/ItemDetailCheckInventory';
import Input from '../../elements/Input';
import debounce from '../../utils/debounce';
import Moment from 'moment/moment';
import vw from '../../utils/size-dynamic';
import { addProductCheck, removeProductCheck, deletedProductCheck } from '../../redux/action/inventory';
import ModalEditCheck from './ModalEditCheck';
import { INV_CHECKED_LIST } from '../../redux/types/';
import LoadContent from '../../elements/LoadContent';
import { ShineOverlay, Progressive } from 'rn-placeholder';
import { Navigation } from '../../dataType/index.d';
import TextEmpty from '../../elements/TextEmpty/';
type State = {
  page: number;
  totalPage: number;
  loadMore: boolean;
  isOpenFirst: boolean;
  dataListProduct: any;
  isFetching: boolean;
  check_date: any;
  drg_drug_name: string;
  dateStart: string;
  dateNowFilter: string;
  flag: boolean;
  modalVisible: boolean;
  item: any;
  cur_qty: string;
  arrayImport: any;
  arraryExport: any;
  isFetching1: boolean;
};
type Props = {
  navigation: Navigation;
  info: any;
  listProductCheck: any;
  deletedProductCheck: () => void;
};
class index extends PureComponent<Props, State> {
  modalEditCheck: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      page: 0,
      totalPage: 0,
      loadMore: true,
      isOpenFirst: true,
      dataListProduct: [],
      isFetching: false,
      drg_drug_name: '',
      check_date: '',
      dateStart: '',
      dateNowFilter: '',
      flag: true,
      modalVisible: false,
      item: [],
      cur_qty: '',
      arrayImport: [],
      arraryExport: [],
      isFetching1: false,
    };
  }
  componentDidMount() {
    this.getDetailCheck();
    var dateNow = Moment().format('DD/MM/YYYY');
    this.setState({ dateNowFilter: dateNow });
  }
  getDetailCheck = async () => {
    const { info } = this.props;
    const { page, dataListProduct, drg_drug_name, check_date } = this.state;
    try {
      if (dataListProduct.length > 0) {
        await this.setState({ loadMore: true, flag: false });
      } else {
        await this.setState({ isFetching: true });
      }
      const params = {
        drg_store_id: info.drg_store_id,
        check_date,
        page: page + 1,
        drg_drug_name,
        status: '0',
      };
      const res = await API.warehouse.getDetailCheckInventory(params);
      const listHistory = res.data.data === null ? [] : res.data.data;
      const newData = [...dataListProduct, ...listHistory];
      this.setState({
        dataListProduct: newData,
        isFetching: false,
        totalPage: res.data.total_page,
        page: page + 1,
        loadMore: false,
        isOpenFirst: false,
        flag: true,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loadMore: false,
        isFetching: false,
      });
    }
  };
  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }
  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={styles.buttonBack} onPress={() => this.props.navigation.goBack()}>
        <Image source={themes.ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtHeaderLeft}>Kiểm kho</Text>
      </TouchableOpacity>
    );
  }
  _loadMore = async () => {
    const { page, totalPage, loadMore } = this.state;
    if (loadMore || page >= totalPage) {
      this.setState({ loadMore: false });
      return;
    } else {
      await this.setState({ loadMore: true });
      try {
        this.getDetailCheck();
      } catch (error) {}
    }
  };
  _renderListEmpty = () => <TextEmpty text={'Không tìm thấy sản phẩm nào!'} />;
  _renderListFooterComponent = () => {
    const { loadMore } = this.state;
    if (loadMore) return <LoadContent number={1} loading={loadMore} style={{ marginTop: 5 }} animation={Progressive} />;
    return null;
  };
  modalNote = (item: any) => {
    const {} = this.props;
    this.setState({ item }, () => this.modalEditCheck.toggleModal(true));
  };
  askDeleted = (item: any) => {
    Alert.alert('Thông báo', 'Bạn có chắc chắn xóa sản phẩm', [
      { text: 'Hủy', onPress: () => console.log('Ask me later pressed') },
      { text: 'Đồng ý', onPress: () => this.deletedProductCheck(item) },
    ]);
  };
  deletedProductCheck = async (item: any) => {
    this.props.deletedProductCheck(item);
  };
  _renderItem = (item: any) => {
    const { listProductCheck } = this.props;

    if (listProductCheck && listProductCheck.length) {
      for (let i = 0; i < listProductCheck.length; i++) {
        if (listProductCheck[i].inv_id == item.inv_id.toString()) {
          return (
            <ItemDetailCheckInventory
              item={listProductCheck[i]}
              type={'Check'}
              note={() => this.modalNote(listProductCheck[i])}
              deleted={() => this.askDeleted(listProductCheck[i])}
            />
          );
        }
      }
    }
    return (
      <ItemDetailCheckInventory
        item={item}
        type={'Check'}
        note={() => this.modalNote(item)}
        deleted={() => this.askDeleted(item)}
      />
    );
  };
  _renderListDetail = () => {
    const { dataListProduct, isFetching, isOpenFirst, flag } = this.state;
    const { listProductCheck } = this.props;
    return (
      <View
        style={[
          styles.containerFlatlist,
          { backgroundColor: isFetching ? themes.colors.WHITE : themes.colors.BACKGROUND_COLOR },
        ]}
      >
        <LoadContent
          number={10}
          loading={isFetching}
          animation={ShineOverlay}
          style={{ marginTop: vw(5), marginHorizontal: vw(5) }}
        />
        {isOpenFirst || isFetching ? null : dataListProduct.length > 0 ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={dataListProduct}
            keyExtractor={(item: any) => item.inv_id.toString()}
            onEndReachedThreshold={0.1}
            onEndReached={flag ? this._loadMore : null}
            renderItem={({ item }) => this._renderItem(item)}
            ListFooterComponent={this._renderListFooterComponent()}
            extraData={listProductCheck}
          />
        ) : (
          this._renderListEmpty()
        )}
      </View>
    );
  };
  search = (txt: string) => {
    this.setState({ drg_drug_name: txt, page: 0, dataListProduct: [], check_date: this.state.dateStart }, () =>
      this.getDetailCheck(),
    );
  };
  _renderSearchBox() {
    return (
      <View style={styles.wapperSearchBox}>
        <View style={styles.containerSearchBox}>
          <TouchableOpacity>
            <Image source={themes.ICON_SEARCH} style={styles.iconSearchBox} />
          </TouchableOpacity>
          <Input
            onChange={debounce(this.search, 400)}
            style={styles.inputSearchBox}
            placeholder="Nhập tên sản phẩm"
            selectionColor={themes.colors.COLOR_INPUT}
            placeholderTextColor={themes.colors.PLACEHOLDER_INPUT}
          />
        </View>
      </View>
    );
  }

  _renderButton = () => {
    const { listProductCheck, navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(INV_CHECKED_LIST)}
        style={[styles.buttonCheck, { backgroundColor: themes.colors.YELLOW }]}
      >
        <View style={styles.viewNumber}>
          <Text style={styles.txtNumber}>{listProductCheck.length}</Text>
        </View>
        <Text style={styles.txtButtonCheck}>Kiểm kho</Text>
      </TouchableOpacity>
    );
  };
  render() {
    const { listProductCheck, navigation } = this.props;
    const { item, isFetching1 } = this.state;
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        {this._renderSearchBox()}
        {this._renderListDetail()}
        {listProductCheck && listProductCheck.length > 0 ? this._renderButton() : null}
        <LoadContent number={10} loading={isFetching1} animation={ShineOverlay} />
        <ModalEditCheck ref={(node: any) => (this.modalEditCheck = node)} item={item} navigation={navigation} />
      </View>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    store: state.user.dataUser.store,
    token: state.user.token,
    listProductCheck: state.inventory.listProductCheck,
  };
}
const mapDispatchToProps = {
  addProductCheck,
  removeProductCheck,
  deletedProductCheck,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true },
)(index);
