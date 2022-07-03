import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Modal, TextInput, Alert } from 'react-native';
import { ICON_BACK, ICON_SEARCH, WHITE, ICON_CLOSE } from '../../constants';
import Input from '../../elements/Input';

import { connect } from 'react-redux';
import API from '../../api';
import debounce from '../../utils/debounce';
import HeaderBar from '../../elements/HeaderBar';
import { MyStatusBar } from '../../elements/MyStatusBar';
import { addProductExport, updateProductExport, deleteProductExport } from '../../redux/action/inventory';
import ItemDrugList from './ItemDrugList';
import styles from './InvExportListDrug.style';
import LoadContent from '../../elements/LoadContent';
import { ShineOverlay, Progressive } from 'rn-placeholder';
import vw from '../../utils/size-dynamic';
import { INV_EXPORT_CREATE } from '../../navigation/screen_name';
import { Navigation, User } from '../../dataType';
import { colors } from '../../constants/themes';

type Props = {
  navigation: Navigation;
  info: User;
  token: any;
  listProductExport: any[];
  addProductExport: any;
  updateProductExport: any;
  deleteProductExport: any;
  changeInfoExport: any;
};

type State = {
  isFetching: boolean;
  loadMore: boolean;
  text: string;
  inv_quantity: string;
  totalPage: number;
  page: number;
  listProduct: any;
  isShowModal: boolean;
  indexUnitName: number;
  quantity: string;
  itemSeleted: any;
};

class DrugListSelect extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      text: '',
      isFetching: false,
      listProduct: [],
      page: 1,
      totalPage: 1,
      loadMore: false,
      inv_quantity: '1',
      isShowModal: false,
      indexUnitName: 0,
      quantity: '',
      itemSeleted: {},
    };
  }

  componentDidMount() {
    this.getData();
  }

  _goBack = () => this.props.navigation.goBack();

  getData = () => {
    const { text, listProduct, inv_quantity } = this.state;
    const data = {
      drg_store_id: this.props.info.drg_store_id,
      drg_drug_name: text,
      page: 1,
      quantity: inv_quantity,
    };
    this.setState({ isFetching: true }, async () => {
      try {
        const response = await API.productApi.getDrugListInventory(data, this.props.token);
        const listDrugs = response.data.data === null ? [] : response.data.data;
        const newData = [...listProduct, ...listDrugs];
        this.setState({
          listProduct: newData,
          totalPage: response.data.total_page,
          isFetching: false,
        });
      } catch (error) {
        console.log(error);
        this.setState({
          isFetching: false,
        });
      }
    });
  };

  callBackLoadMore = async () => {
    const { text, listProduct, page, inv_quantity } = this.state;
    const data = {
      drg_store_id: this.props.info.drg_store_id,
      drg_drug_name: text,
      page: page + 1,
      quantity: inv_quantity,
    };
    try {
      const response = await API.productApi.getDrugListInventory(data, this.props.token);
      const listDrugs = !response.data.data ? [] : response.data.data;
      const newData = [...listProduct, ...listDrugs];
      this.setState({
        listProduct: newData,
        totalPage: response.data.total_page,
        page: page + 1,
        loadMore: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loadMore: false,
      });
    }
  };

  loadMore = () => {
    const { page, totalPage } = this.state;
    if (page >= totalPage) return;
    this.setState({ loadMore: true }, this.callBackLoadMore);
  };

  search = (text: string) => {
    this.setState({ text, listProduct: [], page: 1 }, this.getData);
  };

  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }

  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={styles.wrapperHeaderLeft} onPress={this._goBack}>
        <Image source={ICON_BACK} style={styles.iconBack} />
        <Text style={styles.title}>Chọn sản phẩm xuất kho</Text>
      </TouchableOpacity>
    );
  }

  _renderSearchView = () => {
    return (
      <View style={styles.containerSearch}>
        <Image source={ICON_SEARCH} style={styles.iconSearch} />
        <Input
          onChange={debounce(this.search, 300)}
          style={styles.textInputSearch}
          placeholder={'Tìm kiếm sản phẩm'}
          selectionColor={'#333333'}
          placeholderTextColor={'#BDBDBD'}
        />
      </View>
    );
  };

  _renderListFooterComponent = () => {
    const { loadMore } = this.state;
    if (loadMore) return <LoadContent number={1} loading={loadMore} style={{ marginTop: 5 }} animation={Progressive} />;
    return null;
  };

  _renderListEmpty = () => (
    <View style={styles.wrapperEmptyList}>
      <Text style={styles.textEmptyList}>Không tìm thấy sản phẩm</Text>
    </View>
  );

  _changeVisiableModal = (item: any, indexDropDown: number) => {
    this.setState({ isShowModal: !this.state.isShowModal, itemSeleted: item, indexUnitName: indexDropDown });
  };

  _renderItem = ({ item, index }: { item: any; index: number }) => {
    const { listProductExport } = this.props;
    if (listProductExport && listProductExport.length) {
      for (let i = 0; i < listProductExport.length; i++) {
        if (listProductExport[i].drug_id == item.drug_id.toString() && listProductExport[i].lot === item.lot) {
          return (
            <ItemDrugList
              item={item}
              itemSelected={listProductExport[i]}
              selected={true}
              onPress={this._changeVisiableModal}
            />
          );
        }
      }
      return <ItemDrugList item={item} selected={false} onPress={this._changeVisiableModal} />;
    }
    return <ItemDrugList item={item} selected={false} onPress={this._changeVisiableModal} />;
  };

  _renderBody = () => {
    const { listProduct, isFetching, loadMore } = this.state;
    return (
      <View style={[styles.containerBody, { backgroundColor: isFetching ? WHITE : '#F0EDEE' }]}>
        <LoadContent number={10} loading={isFetching} animation={ShineOverlay} />
        {isFetching ? null : listProduct.length > 0 ? (
          <FlatList
            data={listProduct}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.1}
            onEndReached={!loadMore ? this.loadMore : null}
            renderItem={this._renderItem}
            ListFooterComponent={this._renderListFooterComponent()}
            extraData={this.props.listProductExport}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          this._renderListEmpty()
        )}
      </View>
    );
  };

  _renderButton = () => {
    // const { productExport } = this.state;
    // const disabled = !productExport || productExport.length === 0 ? true : false;
    // const button =
    //   !productExport || productExport.length === 0
    //     ? [styles.button, { backgroundColor: BACKGROUND_COLOR }]
    //     : styles.button;
    return (
      <TouchableOpacity
        style={styles.buttonExport}
        onPress={() => this.props.navigation.navigate(INV_EXPORT_CREATE)}
        disabled={false}
      >
        <Text style={[styles.title, { fontSize: vw(14) }]}>
          Bạn đã chọn ({this.props.listProductExport.length}) sản phẩm
        </Text>
      </TouchableOpacity>
    );
  };

  acceptedExport = (item: any) => {
    const { listProductExport } = this.props;
    const { quantity, indexUnitName } = this.state;
    const units = item.units[indexUnitName] ? item.units[indexUnitName] : {};
    const itemSelected = {
      drug_id: item.drug_id.toString(),
      drg_drug_cd: item.drg_drug_cd,
      drg_drug_name: item.drg_drug_name,
      quantity: quantity,
      unit_cd: units.unit_cd,
      unit_name: units.unit_name,
      price: units.price,
      lot: item.lot,
      units: item.units,
    };
    for (var i = 0; i < listProductExport.length; i++) {
      if (listProductExport[i].drug_id === itemSelected.drug_id && listProductExport[i].lot === itemSelected.lot) {
        this.props.updateProductExport(itemSelected, i);
        this.setState({
          isShowModal: false,
          indexUnitName: 0,
          quantity: '1',
        });
        return;
      }
    }
    this.props.addProductExport(itemSelected);
    this.setState({
      isShowModal: false,
      indexUnitName: 0,
      quantity: '1',
    });
  };

  _renderModalGetQuantity = () => {
    const { indexUnitName, isShowModal, quantity } = this.state;
    const item = this.state.itemSeleted;
    const units = item.units && item.units[indexUnitName] ? item.units[indexUnitName] : {};
    return (
      <Modal transparent={true} animationType={'slide'} visible={isShowModal}>
        <View style={styles.backgroundModal}>
          <View style={styles.modalInsideView}>
            <Text numberOfLines={1} style={styles.titleModal}>
              {item.drg_drug_name}
            </Text>
            <View style={styles.containerModalContent}>
              <Text style={styles.text}>Nhập số lượng xuất kho:</Text>
              <View style={styles.textInputRight}>
                <TextInput
                  style={styles.textInputModal}
                  placeholder="Nhập số lượng"
                  value={quantity}
                  keyboardType="numeric"
                  onChangeText={text => {
                    if (text <= units.inv_qty) this.setState({ quantity: text });
                    else
                      Alert.alert('Thông báo', `Trong kho chỉ còn ${units.inv_qty} sản phẩm`, [
                        { text: 'Đồng ý', onPress: () => {} },
                      ]);
                  }}
                />
                <Text style={[styles.textPrice, { color: colors.BLACK }]}> ({units.unit_name})</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.buttonAccept} onPress={() => this.acceptedExport(item)}>
              <Text style={styles.textButton}>Đồng ý</Text>
            </TouchableOpacity>
            <TouchableOpacity
              hitSlop={styles.hitSlop}
              style={styles.closeButton}
              onPress={() => this.setState({ isShowModal: false })}
            >
              <Image source={ICON_CLOSE} style={styles.closeButton} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        {this._renderSearchView()}
        {this._renderBody()}
        {this._renderButton()}
        {this._renderModalGetQuantity()}
      </View>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    token: state.user.token,
    listProductExport: state.inventory.listProductExport,
  };
}
const mapDispatchToProps = {
  addProductExport,
  updateProductExport,
  deleteProductExport,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrugListSelect);
