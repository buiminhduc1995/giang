import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, FlatList, Alert, ScrollView } from 'react-native';
import { MyStatusBar } from '../../elements/MyStatusBar';
import HeaderBar from '../../elements/HeaderBar';
import DatePicker from 'react-native-datepicker';
import styles from './InvExportCreate.style';
import { ICON_BACK, ICON_SEARCH, ICON_QR_CODE, ICON_HELP, BACKGROUND_COLOR, IMAGE_DRUG } from '../../constants';

import { QR_CODE_SREEN, INVENTORY_TAB } from '../../redux/types';
import Moment from 'moment/moment';
import { ModalCustom } from '../../elements/ModalCustom';
import { ItemDrugList } from '../../elements/ItemDrugList/ItemDrugList';
import API from '../../api';
import { connect } from 'react-redux';
import {
  addProductExport,
  resetProductExport,
  deleteProductExport,
  updateProductExport,
} from '../../redux/action/inventory';
import { payment, export_type } from '../../redux/action/dataPersist';
import EventBus from '../../utils/EventBus';
import { INV_EXPORT_DRUGLIST, INV_EXPORT_CREATE } from '../../navigation/screen_name';
import { Navigation, User } from '../../dataType';
import vw from '../../utils/size-dynamic';
import { colors } from '../../constants/themes';

type Props = {
  info: User;
  navigation: Navigation;
  payment: any;
  export_type: any;
  paymentList: any[];
  exportType: any[];
  store: any;
  infoExport: Object;
  listProductExport: any;
  addProductExport: any;
  deleteProductExport: any;
  updateProductExport: any;
  resetProductExport: any;
};
type State = {
  exportType: number;
  payment: number;
  drug_store: number;
  dateNowFilter: any;
  note: string;
  drug_store_list: any[];
};

class CreateExportion extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      note: '',
      dateNowFilter: '',
      exportType: 0,
      payment: 0,
      drug_store_list: [],
      drug_store: -1,
    };
  }

  async componentDidMount() {
    const { store } = this.props;
    let dateNow = Moment().format('DD/MM/YYYY');
    this.setState(prev => ({ ...prev, dateNowFilter: dateNow }));
    try {
      if (!this.props.paymentList || this.props.paymentList.length === 0) {
        const res = await API.warehouse.getTypePayment();
        this.props.payment(res.data);
      }
      if (!this.props.exportType || this.props.exportType.length === 0) {
        const res = await API.warehouse.getExportType();
        this.props.export_type(res.data);
      }
      const res = await API.warehouse.getDrugStoreList(store.company_id, store.company_id);
      for (let e of res.data) {
        !e.drg_store_name ? (e.drg_store_name = 'Unknown') : null;
      }
      this.setState({ drug_store_list: res.data });
    } catch (err) {
      console.log(err);
    }
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };

  _goDrugList = () => {
    this.props.navigation.navigate(INV_EXPORT_DRUGLIST);
  };

  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }

  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={styles.buttonBack} onPress={this._goBack}>
        <Image source={ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtHeaderLeft}>Xuất kho</Text>
      </TouchableOpacity>
    );
  }

  QRCode = () => {
    this.props.navigation.navigate(QR_CODE_SREEN, {
      productSelected: this.productSelected,
      toScreen: INV_EXPORT_CREATE,
    });
  };

  _renderSearchBox() {
    return (
      <View style={styles.containerSearch}>
        <TouchableOpacity style={styles.buttonSearch} onPress={this._goDrugList}>
          <Image source={ICON_SEARCH} style={styles.iconSearch} />
          <Text style={styles.textSearch}>Tìm kiếm thuốc</Text>
          <TouchableOpacity style={styles.buttonQR} onPress={this.QRCode}>
            <Image source={ICON_QR_CODE} style={styles.iconQRcode} resizeMode="contain" />
            <Text style={styles.txtQR}>Quét mã</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }

  componentWillReceiveProps(nextProps: any) {
    const drugs = this.props.navigation.getParam('drugs', []);
    const nextDrugs = nextProps.navigation.getParam('drugs', []);
    if (drugs !== nextDrugs) {
      this.productSelected(nextDrugs);
    }
  }

  productSelected = (newListProduct: any) => {
    newListProduct.forEach((element: any, index: number) => {
      const itemSelected = {
        drug_id: element.drug_id.toString(),
        drg_drug_cd: element.drg_drug_cd,
        drg_drug_name: element.drg_drug_name,
        quantity: 1,
        unit_cd: element.units[0].unit_cd,
        unit_name: element.units[0].unit_name,
        price: element.units[0].price,
        lot: element.lot,
        units: element.units,
      };
      this.props.addProductExport(itemSelected);
    });
  };

  onPressExport = async () => {
    const { info, store, listProductExport, } = this.props;
    const { note, dateNowFilter, exportType, payment, drug_store_list, drug_store } = this.state;
    const productExport = [...listProductExport];
    for (let i = 0; i < listProductExport.length; i++) {
      productExport[i] = { ...listProductExport[i] };
      delete productExport[i].units;
      productExport[i].price = productExport[i].price.toString();
      productExport[i].quantity = productExport[i].quantity.toString();
    }
    const params = {
      info: {
        export_type: this.props.exportType[exportType].code,
        note: note,
        company_code: store.company_code,
        company_name: store.company_name,
        pay_method: this.props.paymentList[payment].code,
        status: '',
        import_store_id: '',
        drg_store_id: info.drg_store_id,
        drg_store_code: info.drg_store_code,
        updated_user: store.full_name,
        process_date: dateNowFilter,
      },
      products: productExport,
    };
    Alert.alert('Thông báo', 'Bạn có chắc chắn muốn xuất kho không?', [
      { text: 'Hủy', onPress: () => {} },
      {
        text: 'Đồng ý',
        onPress: async () => {
          try {
            if (params.info.export_type !== 'TRS') {
              params.info.import_store_id = '';
            } else {
              params.info.import_store_id = drug_store_list[drug_store].drg_store_id;
            }
            const res = await API.warehouse.postExportProduct(params);
            if (res.status === 200) {
              Alert.alert('Thông báo', 'Xuất kho thành công', [
                {
                  text: 'Đồng ý',
                  onPress: () => {
                    this.props.navigation.navigate(INVENTORY_TAB);
                    EventBus.fireEvent('ExportNewSucces');
                    this.props.resetProductExport();
                  },
                },
              ]);
            }
          } catch (error) {
            let err = 'Vui lòng thử lại';
            if (!productExport || productExport.length === 0) err = 'Chưa có sản phẩm được chọn';
            if (params.info.export_type === 'TRS' && params.info.import_store_id === '') {
              err = 'Chưa chọn chi nhánh chuyển tới';
            }
            Alert.alert('Thông báo', `Xuất kho thất bại. ${err}`, [{ text: 'Đồng ý' }]);
          }
        },
      },
    ]);
  };

  onSelectedModal = (value: string, index: number, typeModal: string): void => {
    this.setState(prevState => {
      const newState: State = { ...prevState };
      newState[typeModal] = index;
      if (typeModal === 'exportType' && this.props.exportType[newState[typeModal]].code !== 'TRS') {
        newState['drug_store'] = -1;
      }
      return newState;
    });
  };

  _renderPickDate = () => {
    return (
      <DatePicker
        style={styles.wrapperDatePicker}
        date={this.state.dateNowFilter}
        mode="date"
        maxDate={this.state.dateNowFilter}
        placeholder="Chọn ngày bắt đầu"
        format="DD/MM/YYYY"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={true}
        customStyles={{
          dateIcon: {
            position: 'absolute',
            right: vw(0),
            height: vw(20),
            width: vw(20),
            marginTop: vw(2),
            resizeMode: 'contain',
          },
          dateInput: {
            flex: 1,
            height: vw(30),
            borderWidth: vw(1),
            borderColor: colors.MAIN_COLOR,
          },
          dateText: {
            fontSize: vw(14),
            position: 'absolute',
            left: vw(5),
          },
        }}
        onDateChange={(date: string) => {
          this.setState({ dateNowFilter: date });
        }}
      />
    );
  };

  onPressDelete = (item: any) => {
    this.props.deleteProductExport(item);
  };

  _renderItem = ({ item, index }: { item: any; index: number }) => {
    const productExport = this.props.listProductExport;
    const options = item.units.map((element: any) => {
      return element.unit_name;
    });
    return (
      <ItemDrugList
        nameDrug={item.drg_drug_name}
        sourceImage={IMAGE_DRUG}
        quantity={item.quantity}
        price={item.price}
        totalPrice={Number((item.price * item.quantity).toFixed(0))}
        VAT={item.VAT ? item.VAT : 0}
        createExportion={true}
        onChangeQuantity={(value: string) => {
          let temp = 0;
          for (temp; temp < productExport[index].units.length; temp++) {
            if (productExport[index].units[temp].unit_cd == productExport[index].unit_cd) break;
          }
          if (value <= productExport[index].units[temp].inv_qty) {
            productExport[index].quantity = value;
            const itemSelected = {
              drug_id: item.drug_id.toString(),
              drg_drug_cd: item.drg_drug_cd,
              drg_drug_name: item.drg_drug_name,
              quantity: value,
              unit_cd: item.unit_cd,
              unit_name: item.unit_name,
              price: item.price,
              lot: item.lot,
              units: item.units,
            };
            this.props.updateProductExport(itemSelected, index);
          } else {
            Alert.alert('Thông báo', `Trong kho chỉ còn ${productExport[index].units[temp].inv_qty} sản phẩm`, [
              { text: 'Đồng ý', onPress: () => {} },
            ]);
          }
        }}
        onChangeModalSelection={(i: number) => {
          const itemSelected = {
            drug_id: item.drug_id.toString(),
            drg_drug_cd: item.drg_drug_cd,
            drg_drug_name: item.drg_drug_name,
            quantity: item.units[i].inv_qty,
            unit_cd: item.units[i].unit_cd,
            unit_name: item.units[i].unit_name,
            price: item.units[i].price,
            lot: item.lot,
            units: item.units,
          };
          this.props.updateProductExport(itemSelected, index);
        }}
        modalOptions={options}
        valueModal={item.unit_name}
        onPressDelete={() => this.onPressDelete(item)}
      />
    );
  };
  _renderContent() {
    const productExport = this.props.listProductExport;
    const payment = this.props.paymentList.map(e => e.value);
    const exportType = this.props.exportType.map(e => e.value);
    const drug_store_list = this.state.drug_store_list.map(e => e.drg_store_name);
    return (
      <ScrollView contentContainerStyle={styles.wrapperContainer}>
        <Text style={styles.title}>Thông tin xuất kho</Text>
        <View style={styles.inforExportContainer}>
          <View style={styles.element}>
            <Text style={styles.text}>Phân loại xuất kho</Text>
            <ModalCustom
              options={exportType}
              style={styles.wrapperContentElement}
              onSelected={(index: number, value: string) => this.onSelectedModal(value, index, 'exportType')}
              value={exportType[this.state.exportType]}
              containerStyle={styles.modalContainer}
            />
          </View>
          <View style={styles.element}>
            <Text style={styles.text}>
              Chuyển tới cửa hàng
              {this.props.exportType[this.state.exportType].code === 'TRS' && this.state.drug_store == -1 ? (
                <Text style={{ color: 'red' }}> *</Text>
              ) : null}
            </Text>
            <ModalCustom
              options={drug_store_list}
              style={styles.wrapperContentElement}
              onSelected={(index: number, value: string) => this.onSelectedModal(value, index, 'drug_store')}
              value={drug_store_list[this.state.drug_store]}
              containerStyle={styles.modalContainer}
              disabled={this.props.exportType[this.state.exportType].code === 'TRS' ? false : true}
            />
          </View>
          <View style={styles.element}>
            <Text style={styles.text}>Phương thức thanh toán</Text>
            <ModalCustom
              options={payment}
              style={styles.wrapperContentElement}
              onSelected={(index: number, value: string) => this.onSelectedModal(value, index, 'payment')}
              value={payment[this.state.payment]}
              containerStyle={styles.modalContainer}
            />
          </View>
          <View style={styles.element}>
            <Text style={styles.text}>Ngày xuất kho</Text>
            {this._renderPickDate()}
          </View>
          <Text style={styles.text}>Ghi chú</Text>
          <TextInput
            // multiline
            style={styles.boxInput}
            onChangeText={text => this.setState({ note: text })}
            value={this.state.note}
            defaultValue={'Nhập ghi chú'}
          />
        </View>

        <Text style={styles.title}>Danh sách sản phẩm</Text>
        {!productExport || productExport.length === 0 ? (
          <View style={[styles.productListContainer, { justifyContent: 'center', alignItems: 'center' }]}>
            <Image source={ICON_HELP} style={styles.imageIndicator} resizeMode={'contain'} />
            <Text style={styles.textIndicator}>Không chứa sản phẩm nào</Text>
          </View>
        ) : (
          <View style={[styles.productListContainer, { backgroundColor: BACKGROUND_COLOR }]}>
            <FlatList
              data={productExport}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()}
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="on-drag"
              removeClippedSubviews={false}
            />
          </View>
        )}
      </ScrollView>
    );
  }
  _renderButton = () => {
    const productExport = this.props.listProductExport;
    const disabled = !productExport || productExport.length === 0 ? true : false;
    const button =
      !productExport || productExport.length === 0
        ? [styles.button, { backgroundColor: BACKGROUND_COLOR }]
        : styles.button;
    return (
      <TouchableOpacity style={button} onPress={this.onPressExport} disabled={disabled}>
        <Text style={styles.textButton}>Xuất kho</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        {this._renderSearchBox()}
        {this._renderContent()}
        {this._renderButton()}
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  const exportType = state.user.isHaveSubStore
    ? state.dataPersist.exportType.filter((item: any) => item.code !== 'ORD')
    : state.dataPersist.exportType.filter((item: any) => item.code !== 'ORD' && item.code !== 'TRS');
  return {
    info: state.user.dataUser.info,
    store: state.user.dataUser.store,
    paymentList: state.dataPersist.paymentList,
    exportType: exportType,
    infoExport: state.inventory.inforExport,
    listProductExport: state.inventory.listProductExport,
  };
}
const mapDispatchToProps = {
  payment,
  export_type,
  addProductExport,
  deleteProductExport,
  updateProductExport,
  resetProductExport,
};

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     getPayment: (payment: any) =>
//       dispatch({
//         type: types.PAYMENT,
//         payload: payment,
//       }),
//     getExportType: (exportType: any) =>
//       dispatch({
//         type: types.EXPORT_TYPE,
//         payload: exportType,
//       }),
//     addProductExport: (item: any) => dispatch(addProductExport(item)),
//     deleteProductExport: (item: any) => dispatch(deleteProductExport(item)),
//     updateProductExport: (item: any, index: number) => dispatch(updateProductExport(item, index)),
//     resetProductExport: () => dispatch(resetProductExport()),
//   };
// };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateExportion);
