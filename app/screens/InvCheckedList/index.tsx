import React, { PureComponent } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { MyStatusBar } from '../../elements/MyStatusBar';
import HeaderBar from '../../elements/HeaderBar';
import styles from './InvCheckedList.styles';
import { themes } from '../../constants/index';
import { connect } from 'react-redux';
import ItemDetailCheckInventory from '../../components/ItemDetailCheckInventory/';
import { removeProductCheck, deletedProductCheck } from '../../redux/action/inventory';
import ModalEditCheck from './ModalEditCheck';
import EventBus from '../../utils/EventBus';
import { INVENTORY_TAB } from '../../redux/types/';
import API from '../../api';
import LoaderIndicator from '../../elements/LoaderIndicator';
import { Navigation } from '../../dataType/index.d';
type Props = {
  navigation: Navigation;
  listProductCheck: any;
  removeProductCheck: any;
  deletedProductCheck: any;
  info: any;
};
type State = {
  item: any;
  isFetching1: boolean;
};
class index extends PureComponent<Props, State> {
  modalEditCheck: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      item: [],
      isFetching1: false,
    };
  }
  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} right={this._renderHeaderRight()} />;
  }
  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={styles.buttonBack} onPress={() => this.props.navigation.goBack()}>
        <Image source={themes.ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtHeaderLeft}>Kiểm kho</Text>
      </TouchableOpacity>
    );
  }
  _renderHeaderRight() {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.containerRight}>
        <Text style={styles.txtRight}>Thêm sản phẩm</Text>
      </TouchableOpacity>
    );
  }
  callBackScreen = () => {
    this.props.navigation.navigate(INVENTORY_TAB);
    EventBus.fireEvent('CheckInventorySucces');
    EventBus.fireEvent('ImportNewSucces');
    EventBus.fireEvent('ExportNewSucces');
  };
  actionInventory = async () => {
    const { info, listProductCheck } = this.props;
    const productsAPI = listProductCheck.map((product: any) => {
      const newProduct = {
        cur_qty: product.cur_qty.toString(),
        drg_drug_cd: product.drg_drug_cd,
        drug_id: product.drug_id.toString(),
        drg_drug_name: product.drg_drug_name,
        exp_date: product.exp_date,
        mfg_date: '',
        lot: product.lot,
        unit_cd: product.unit_cd,
        unit_name: product.unit_name,
        drg_store_id: info.drg_store_id.toString(),
        updated_user: info.full_name,
        status: '0',
        note: '',
      };
      return newProduct;
    });
    await this.setState({ isFetching1: true });
    API.warehouse
      .checkInventory(productsAPI)
      .then(res => {
        if (res.status === 200) {
          this.setState({ isFetching1: false });
          this.props.removeProductCheck();
          Alert.alert('Thông báo', 'Kiểm kho thành công', [{ text: 'Đồng ý', onPress: () => this.callBackScreen() }], {
            cancelable: false,
          });
        } else {
          Alert.alert(
            'Tồn tại phiếu xuất/nhập ở trạng thái chờ duyệt',
            'Vui lòng sau khi phiếu xuất/nhập ở trạng thái hoàn thành',
            [
              {
                text: 'Đồng ý',
                onPress: () => console.log('abc'),
              },
            ],
          );
        }
      })
      .catch(err => {
        this.setState({ isFetching1: false });
        console.log(err);
        Alert.alert('Kiểm kho thất bại');
      });
  };
  askCheckInventory = () => {
    Alert.alert(
      'Thông báo',
      'Bạn có đồng ý kiểm kho',
      [
        { text: 'Hủy', onPress: () => console.log('OK Pressed') },
        { text: 'Đồng ý', onPress: () => this.actionInventory() },
      ],
      { cancelable: false },
    );
  };
  _renderButton = () => {
    const { listProductCheck } = this.props;
    return (
      <TouchableOpacity
        onPress={() => this.askCheckInventory()}
        style={[styles.buttonCheck, { backgroundColor: themes.colors.YELLOW }]}
      >
        <View style={styles.viewNumber}>
          <Text style={styles.txtNumber}>{listProductCheck.length}</Text>
        </View>
        <Text style={styles.txtButtonCheck}>Kiểm kho</Text>
      </TouchableOpacity>
    );
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
  deletedProductCheck = (item: any) => {
    this.props.deletedProductCheck(item);
  };
  _renderItem = (item: any) => {
    return (
      <ItemDetailCheckInventory
        item={item}
        type={'Check'}
        note={() => this.modalNote(item)}
        deleted={() => this.askDeleted(item)}
      />
    );
  };
  _renderListCheckedInventory = () => {
    const { listProductCheck } = this.props;
    return (
      <View style={styles.containerFlatlist}>
        <Text style={styles.txtFlatList}>Danh sách sản phẩm kiểm kho</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={listProductCheck}
          keyExtractor={(item: any) => item.inv_id.toString()}
          renderItem={({ item }) => this._renderItem(item)}
          extraData={listProductCheck}
        />
      </View>
    );
  };
  render() {
    const { item, isFetching1 } = this.state;
    const { navigation, listProductCheck } = this.props;
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        {this._renderListCheckedInventory()}
        {listProductCheck && listProductCheck.length > 0 ? this._renderButton() : null}
        <ModalEditCheck ref={(node: any) => (this.modalEditCheck = node)} item={item} navigation={navigation} />
        <LoaderIndicator loading={isFetching1} />
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
  removeProductCheck,
  deletedProductCheck,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true },
)(index);
