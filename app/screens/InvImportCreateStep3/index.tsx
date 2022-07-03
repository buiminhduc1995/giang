import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, FlatList, Alert } from 'react-native';
import styles from './InvImportCreateStep3.styles';
import { MyStatusBar } from '../../elements/MyStatusBar';
import HeaderBar from '../../elements/HeaderBar';
import { ICON_BACK, MAIN_COLOR, ICON_SEARCH, ICON_ARROW_DROP, BACKGROUND_COLOR, themes } from '../../constants';
import { connect } from 'react-redux';
import vw from '../../utils/size-dynamic';
import ModalDropdown from 'react-native-modal-dropdown';
const classify = ['Yêu cầu nhập kho'];
const paymentDefault = ['Tiền mặt'];
import API from '../../api';
import ModalSelectProvider from './ModalSelectProvider';
import Moment from 'moment/moment';
import LoaderIndicator from '../../elements/LoaderIndicator';
import DatePicker from 'react-native-datepicker';
import ItemProductImportNew from '../../components/ItemProductImportNew/';
import ModalDrugBusiness from './ModalDrugBusiness';
import ModalDrugDQG from './ModalDrugDQG';
import {
  deletedProductBusiness,
  deletedProductDQG,
  removeProduct,
  addInformationImport,
} from '../../redux/action/inventory';
import { INV_IMPORT_CREATE_TAB_STEP_1, INVENTORY_TAB } from '../../redux/types/';
import { payment, import_type } from '../../redux/action/dataPersist';
import EventBus from '../../utils/EventBus';
import { Navigation } from '../../dataType';
type Props = {
  navigation: Navigation;
  objInfomationImport: any;
  paymentList: any;
  importTypeList: any;
  payment: any;
  import_type: any;
  deletedProductBusiness: Function;
  addInformationImport: Function;
  listProductBusiness: any;
  listProductDQG: any;
  removeProduct: Function;
  deletedProductDQG: Function;
  info: any;
  store: any;
};
type State = {
  company_code: string;
  company_name: string;
  process_date: string;
  note: string;
  selectClassify: any;
  typeImport: any;
  typePayMent: any;
  selectPayMent: any;
  pay_method: any;
  import_type: any;
  invoice_code: any;
  isFetching: boolean;
  item: any;
  flag: boolean;
  valueNextScreen: any;
  import_code: any;
};
class index extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const data = this.props.objInfomationImport;
    this.state = {
      company_code: data ? data.company_code : '',
      company_name: data ? data.company_name : '',
      process_date: data ? data.process_date : '',
      note: data ? data.note : '',
      selectClassify: data.selectClassify ? data.selectClassify : classify[0],
      typeImport: [],
      typePayMent: [],
      selectPayMent: data.selectPayMent ? data.selectPayMent : paymentDefault[0],
      pay_method: data.pay_method ? data.pay_method : '',
      import_type: data.import_type ? data.import_type : '',
      invoice_code: data ? data.invoice_code : '',
      isFetching: false,
      item: [],
      flag: false,
      valueNextScreen: [],
      import_code: data ? data.import_code : '',
    };
  }
  async componentDidMount() {
    var dateNow = Moment().format('DD/MM/YYYY');
    try {
      if (this.props.objInfomationImport.process_date) {
        this.setState({ process_date: this.props.objInfomationImport.process_date });
      } else {
        this.setState({ process_date: dateNow });
      }
      this.setState({ process_date: dateNow });
      if (!this.props.paymentList || this.props.paymentList.length === 0) {
        const res = await API.warehouse.getTypePayment();
        this.props.payment(res.data);
      }
      if (!this.props.importTypeList || this.props.importTypeList.length === 0) {
        const res = await API.warehouse.getTypeImport();
        this.props.import_type(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }
  _renderHeaderLeft() {
    const { navigation } = this.props;
    return (
      <TouchableOpacity style={styles.buttonBack} onPress={() => this.props.navigation.goBack()}>
        <Image source={ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtHeaderLeft}>
          {!navigation.getParam('isUpdate') ? 'Nhập kho' : 'Cập nhật phiếu nhập kho'}
        </Text>
      </TouchableOpacity>
    );
  }
  onPressSearch = () => {
    this.modalSelectedProvider.toggleModal(true);
  };
  onSelectProvider = (value: any) => {
    this.setState({
      company_name: value.provider_name,
      company_code: value.provider_code,
    });
  };
  functionDropDown = (data: any, value: any, onPress: Function) => {
    const { flag } = this.state;
    return (
      <ModalDropdown
        disabled={!flag}
        options={data}
        defaultValue={value}
        defaultIndex={0}
        dropdownStyle={[
          styles.stylesModal,
          {
            height: data.length > 5 ? 'auto' : -1,
          },
        ]}
        dropdownTextStyle={styles.dropdownTextStyle}
        onSelect={onPress}
      >
        <View style={styles.wapperInputFilter}>
          <Text style={styles.txtSelected}>{value}</Text>
          <Image source={ICON_ARROW_DROP} style={styles.iconDropDown} resizeMode="contain" />
        </View>
      </ModalDropdown>
    );
  };
  selectClassify = (idx: any, value: any) => {
    this.setState({
      selectClassify: value,
      import_type: this.props.importTypeList[idx].code,
    });
  };
  selectPayMent = (idx: any, value: any) => {
    this.setState({
      selectPayMent: value,
      pay_method: this.props.paymentList[idx].code,
    });
  };
  _renderInformation = () => {
    const {
      process_date,
      note,
      selectClassify,
      typeImport,
      selectPayMent,
      typePayMent,
      company_name,
      flag,
    } = this.state;
    const listTypeImport = this.props.importTypeList.map((element: any) => {
      return element.value;
    });
    const listTypePayMent = this.props.paymentList.map((element: any) => {
      return element.value;
    });
    return (
      <View style={{ width: '100%', paddingHorizontal: vw(10) }}>
        {flag ? (
          <View style={[styles.containerSearch, { paddingTop: 5 }]}>
            <TouchableOpacity style={styles.buttonSearch} onPress={this.onPressSearch}>
              <Image source={ICON_SEARCH} style={styles.iconSearch} />
              <Text style={styles.textSearch}>Nhấp chọn tìm nhà cung cấp</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.containerRow}>
          <View style={styles.rowLeft}>
            <Text style={styles.txt}>Tên nhà cung cấp</Text>
          </View>
          <View style={styles.rowRight}>
            <TextInput
              editable={flag}
              style={styles.textInput}
              placeholder="Nhập để tạo mới nhà cung cấp"
              value={company_name}
              onChangeText={txt => this.setState({ company_name: txt })}
            />
            {company_name && company_name.length !== 0 ? null : <Text style={styles.txtRed}>*</Text>}
          </View>
        </View>
        <View style={styles.containerRow}>
          <View style={styles.rowLeft}>
            <Text style={styles.txt}>Mã nhà cung cấp</Text>
          </View>
          <View style={styles.rowRight}>
            <TextInput
              style={styles.textInput}
              editable={false}
              placeholder="Mã nhà cung cấp"
              value={this.state.company_code}
            />
          </View>
        </View>
        <View style={styles.containerRow}>
          <View style={styles.rowLeft}>
            <Text style={styles.txt}>Mã số phiếu</Text>
          </View>
          <View style={styles.rowRight}>
            <TextInput
              editable={flag}
              style={styles.textInput}
              placeholder="Mã số phiếu"
              value={this.state.invoice_code}
              onChangeText={txt => this.setState({ invoice_code: txt })}
            />
          </View>
        </View>
        <View style={[styles.containerRow, { marginTop: vw(10) }]}>
          <View style={styles.rowLeft}>
            <Text style={styles.txt}>Ngày nhập kho</Text>
          </View>
          <View style={styles.rowRight}>
            <DatePicker
              androidMode="spinner"
              disabled={!flag}
              style={{ width: '100%' }}
              date={process_date}
              mode="date"
              maxDate={process_date}
              placeholder="Chọn ngày bắt đầu"
              format="DD/MM/YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={true}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  borderRadius: 5,
                  borderColor: themes.colors.MAIN_COLOR,
                  height:vw(30)
                },
                dateText: {
                  fontSize: vw(14),
                },
                // placeholderText: {
                //   fontSize: vw(14),
                // },
              }}
              onDateChange={(date: string) => {
                this.setState({ process_date: date });
              }}
            />
          </View>
        </View>
        {note && note.length !== 0 ? (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.txt}>Ghi chú</Text>
            <TextInput
              editable={flag}
              multiline
              placeholder="Nhập ghi chú..."
              value={note}
              onChangeText={txt => this.setState({ note: txt })}
              style={styles.note}
            />
          </View>
        ) : null}
        <View style={styles.containerRow}>
          <View style={styles.rowLeft}>
            <Text style={styles.txt}>Phương thức thanh toán</Text>
          </View>
          <View style={[styles.rowRight, { alignItems: 'flex-end' }]}>
            {this.functionDropDown(listTypePayMent, selectPayMent, (idx: any, value: any) =>
              this.selectPayMent(idx, value),
            )}
          </View>
        </View>
        <View style={styles.containerRow}>
          <View style={styles.rowLeft}>
            <Text style={styles.txt}>Phân loại nhập</Text>
          </View>
          <View style={[styles.rowRight, { alignItems: 'flex-end' }]}>
            {this.functionDropDown(listTypeImport, selectClassify, (idx: any, value: any) =>
              this.selectClassify(idx, value),
            )}
          </View>
        </View>
      </View>
    );
  };
  deletedProduct = (item: any) => {
    if (item.hasOwnProperty('price')) {
      this.props.deletedProductBusiness(item);
    } else {
      this.props.deletedProductDQG(item);
    }
  };
  modalNote = async (item: any) => {
    await this.setState({ item });
    if (item.hasOwnProperty('source')) {
      this.modalDrugDQG.toggleModal(true);
    } else {
      this.modalDrugBusiness.toggleModal(true);
    }
  };
  renderEmpty = () => {
    return (
      <View style={styles.containerEmpty}>
        <Text>Chưa có sản phẩm được chọn</Text>
      </View>
    );
  };

  _renderProduct = () => {
    const { listProductBusiness, listProductDQG } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: BACKGROUND_COLOR, paddingBottom: vw(5) }}>
        {(listProductBusiness && listProductBusiness.length !== 0) ||
        (listProductDQG && listProductDQG.length !== 0) ? (
          <FlatList
            data={[...listProductBusiness, ...listProductDQG]}
            renderItem={({ item, index }) => (
              <ItemProductImportNew
                type="productselect"
                item={item}
                index={index}
                note={() => this.modalNote(item)}
                deletedProduct={() => this.deletedProduct(item)}
              />
            )}
          />
        ) : (
          this.renderEmpty()
        )}
      </View>
    );
  };
  createProvider = async () => {
    const { company_name } = this.state;
    const { info, store } = this.props;
    try {
      const params = {
        drg_store_id: info.drg_store_id,
        updated_user: info.full_name,
        provider_name: company_name,
        pic_name: '',
        phone_no: '',
        address1: '',
        tax_no: '',
        email: '',
        website: '',
        note: '',
        company_code: store.company_code,
      };
      const res = await API.warehouse.createProvider(params);
      this.setState({ company_code: res.data.provider_code });
    } catch (error) {
      console.log(error);
    }
  };
  callBackScreen = () => {
    EventBus.fireEvent('ImportNewSucces');
    this.props.navigation.navigate(INVENTORY_TAB);
  };

  createImportNew = async () => {
    const { info, store, listProductBusiness, listProductDQG } = this.props;
    const { note, pay_method, import_type, process_date, invoice_code, company_name, company_code } = this.state;
    const new_products = listProductDQG.map((product: any) => {
      const newProduct = {
        drg_ref_cd: product.drg_drug_cd,
        drg_drug_name: product.drg_name,
        license_cd: product.license_cd,
        active_ingredient: product.contraindication,
        concentration: product.contraindication,
        package_desc: product.package_desc,
        company_name: product.company_name,
        provider_name: product.provider_name === null ? '' : product.provider_name,
        prefix_code: product.source,
        description: product.description === null ? 'Dung dịch' : product.description,
        lot: product.lot,
        expired_date:
          product.expired_date.slice(6, 10) + product.expired_date.slice(3, 5) + product.expired_date.slice(0, 2),
        import_qty: product.import_qty,
        parent_unit_name: product.unit,
        unit_name1: product.unit_name1 ? product.unit_name1 : '',
        unit_name2: product.unit_name2 ? product.unit_name2 : '',
        unit_qty1: product.unit_qty1 ? product.unit_qty1 : '',
        unit_qty2: product.unit_qty2 ? product.unit_qty2 : '',
        import_unit_price: product.import_unit_price,
        parent_unit_price: product.parent_unit_price,
        unit_price1: product.unit_price1 ? product.unit_price1 : '',
        unit_price2: product.unit_price2 ? product.unit_price2 : '',
        drug_kind: product.drug_kind,
        barcode: product.barcode,
        drg_store_id: info.drg_store_id,
        drg_store_code: info.drg_store_code,
        updated_user: info.full_name,
      };
      return newProduct;
    });
    const products = listProductBusiness.map((product: any) => {
      const newProduct = {
        drug_id: product.drug_id.toString(),
        drg_drug_cd: product.drg_drug_cd,
        lot: product.lot,
        drg_drug_name: product.drg_drug_name,
        quantity: product.quantity,
        price: product.price.toString(),
        unit_cd: product.unit_cd === undefined ? '006' : product.unit_cd,
        unit_name: product.unit_name,
        drg_store_id: info.drg_store_id,
        drg_store_code: info.drg_store_code,
        mfg_date: '',
        expired_date:
          product.expired_date.slice(6, 10) + product.expired_date.slice(3, 5) + product.expired_date.slice(0, 2),
        vat_percent: product.vat_percent === '0%' ? '-1' : product.vat_percent,
        updated_user: info.full_name,
      };
      return newProduct;
    });
    try {
      const params = {
        info: {
          note: note,
          drg_store_id: info.drg_store_id,
          drg_store_code: info.drg_store_code,
          updated_user: store.drg_name,
          company_code: company_code,
          company_name: company_name,
          import_type: import_type.length === 0 ? 'ORD' : import_type,
          pay_method: pay_method.length === 0 ? 'CS' : pay_method,
          classification: '',
          process_date: process_date,
          invoice_code: invoice_code,
        },
        products,
        new_products,
        list_prices: [],
      };
      await this.setState({ isFetching: true });
      const res = await API.warehouse.createImportNew(params);
      if (res.data.status_code === 200) {
        this.setState({ isFetching: false });
        this.props.removeProduct();
        Alert.alert('Thông báo', 'Nhập kho thành công', [{ text: 'Đồng ý', onPress: () => this.callBackScreen() }], {
          cancelable: false,
        });
      } else if (res.data.status_code !== 200) {
        Alert.alert('Thông báo', 'Nhập kho thất bại');
      }
    } catch (error) {
      this.setState({ isFetching: false });
      Alert.alert('Thông báo', 'Nhập kho thất bại');
    }
  };
  updateImport = async () => {
    const { info, listProductBusiness } = this.props;
    const {
      note,
      pay_method,
      import_type,
      process_date,
      invoice_code,
      company_code,
      company_name,
      dataProduct,
      import_code,
    } = this.state;
    try {
      const products = listProductBusiness.map((product: any) => {
        const newProduct = {
          drug_id: product.drug_id.toString(),
          drg_drug_cd: product.drg_drug_cd,
          drg_drug_name: product.drg_drug_name,
          quantity: product.quantity,
          unit_cd: product.unit_cd,
          unit_name: product.unit_name,
          price: product.price.toString(),
          lot: product.lot,
          mfg_date: '',
          expired_date:
            product.expired_date.slice(6, 10) + product.expired_date.slice(3, 5) + product.expired_date.slice(0, 2),
          vat_percent: product.vat_percent === '0%' ? '-1' : product.vat_percent,
          updated_user: info.full_name,
          drg_store_code: info.drg_store_code,
          drg_store_id: info.drg_store_id,
        };
        return newProduct;
      });
      const params = {
        info: {
          note: note,
          drg_store_id: info.drg_store_id,
          drg_store_code: info.drg_store_code,
          updated_user: info.full_name,
          company_code: company_code,
          company_name: company_name,
          import_type: import_type.length === 0 ? 'ORD' : import_type,
          pay_method: pay_method.length === 0 ? 'CS' : pay_method,
          classification: '',
          process_date: process_date,
          invoice_code: invoice_code ? invoice_code : '',
          import_code: import_code,
        },
        products,
        list_prices: [],
        login_mode: 0,
      };
      await this.setState({ isFetching: true });
      const res = await API.warehouse.updateImport(params);
      if (res.data.status_code === 200) {
        this.setState({ isFetching: false });
        this.props.removeProduct();
        Alert.alert(
          'Thông báo',
          'Cập nhật nhập kho thành công',
          [{ text: 'Đồng ý', onPress: () => this.callBackScreen() }],
          { cancelable: false },
        );
      } else if (res.data.status_code !== 200) {
        Alert.alert('Thông báo', 'Cập nhật nhập kho thất bại');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Thông báo', 'Cập nhật nhập kho thất bại');
      this.setState({ isFetching: false });
    }
  };
  CheckBeforeImport = async () => {
    const { company_name, company_code } = this.state;
    const { navigation } = this.props;
    if (company_name && company_name.length !== 0) {
      if (company_code) {
        !navigation.getParam('isUpdate') ? this.createImportNew() : this.updateImport();
      } else {
        await this.createProvider();
        !navigation.getParam('isUpdate') ? this.createImportNew() : this.updateImport();
      }
    } else {
      Alert.alert('Nhà cung cấp trống');
    }
  };
  askImport = () => {
    Alert.alert(
      'Thông báo',
      'Bạn có chắc chắn nhập kho',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel Pressed'),
        },
        { text: 'Đồng ý', onPress: () => this.CheckBeforeImport() },
      ],
      { cancelable: false },
    );
  };
  askUpdate = () => {
    Alert.alert(
      'Thông báo',
      'Bạn có chắc chắn cập nhật kho',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel Pressed'),
        },
        { text: 'Đồng ý', onPress: () => this.CheckBeforeImport() },
      ],
      { cancelable: false },
    );
  };
  _renderButton = () => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        style={styles.buttonImport}
        onPress={() => (navigation.getParam('isUpdate') ? this.askUpdate() : this.askImport())}
      >
        <Text style={styles.txtFooter}>
          {!navigation.getParam('isUpdate') ? 'Nhập kho' : 'Cập nhật phiếu nhập kho'}
        </Text>
      </TouchableOpacity>
    );
  };
  edit = () => {
    this.setState({ flag: !this.state.flag });
  };
  addDrugNew = () => {
    const { navigation } = this.props;
    const {
      company_code,
      company_name,
      process_date,
      note,
      invoice_code,
      valueNextScreen,
      pay_method,
      import_type,
      selectClassify,
      selectPayMent,
    } = this.state;
    let params = Object.assign(valueNextScreen, {
      company_name,
      company_code,
      pay_method,
      import_type,
      invoice_code,
      process_date,
      note,
      selectClassify,
      selectPayMent,
    });
    this.props.addInformationImport(params);
    if (!this.props.navigation.getParam('isUpdate')) {
      navigation.navigate(INV_IMPORT_CREATE_TAB_STEP_1);
    } else {
      navigation.navigate(INV_IMPORT_CREATE_TAB_STEP_1, { isUpdate: this.props.navigation.getParam('isUpdate') });
    }
  };
  render() {
    const { listProductBusiness, listProductDQG, navigation } = this.props;
    const { isFetching, item, flag } = this.state;
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        <View style={styles.containerText}>
          <View>
            <Text style={styles.txtProgressDeatail}>Nhập thuốc</Text>
          </View>
          <View>
            <Text style={styles.txtProgressDeatail}>Phiếu nhập</Text>
          </View>
          <View>
            <Text style={styles.txtProgressDeatail}>Xác nhận</Text>
          </View>
        </View>
        <View style={styles.progress}>
          <View style={[styles.cricle, { backgroundColor: MAIN_COLOR }]}>
            <Text style={styles.txtProgress}>1</Text>
          </View>
          <View
            style={{
              width: '40%',
              backgroundColor: listProductBusiness.length > 0 || listProductDQG.length > 0 ? MAIN_COLOR : '#F0EDEE',
              height: vw(2),
            }}
          />
          <View
            style={[
              styles.cricle,
              { backgroundColor: listProductBusiness.length > 0 || listProductDQG.length > 0 ? MAIN_COLOR : '#F0EDEE' },
            ]}
          >
            <Text style={styles.txtProgress}>2</Text>
          </View>
          <View
            style={{
              width: '40%',
              height: vw(2),
              backgroundColor: listProductBusiness.length > 0 || listProductDQG.length > 0 ? MAIN_COLOR : '#F0EDEE',
            }}
          />
          <View
            style={[
              styles.cricle,
              { backgroundColor: listProductBusiness.length > 0 || listProductDQG.length > 0 ? MAIN_COLOR : '#F0EDEE' },
            ]}
          >
            <Text style={styles.txtProgress}>3</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.wapperTitle}>
            <Text style={styles.txtTitle}>Thông tin phiếu nhập</Text>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#FFC107' }]} onPress={() => this.edit()}>
              <Text style={[styles.txtButton, { color: 'white' }]}>{flag !== true ? 'Sửa' : 'Hoàn tất'}</Text>
            </TouchableOpacity>
          </View>
          {this._renderInformation()}
          <View style={styles.wapperTitle}>
            <Text style={styles.txtTitle}>Danh sách thuốc</Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: MAIN_COLOR }]}
              onPress={() => this.addDrugNew()}
            >
              <Text style={[styles.txtButton, { color: 'white' }]}>Thêm thuốc</Text>
            </TouchableOpacity>
          </View>
          {this._renderProduct()}
        </ScrollView>
        {(listProductBusiness && listProductBusiness.length !== 0) ||
        (listProductDQG && listProductDQG.length !== 0) ? (
          <View style={styles.wapperButton}>{this._renderButton()}</View>
        ) : null}
        <ModalSelectProvider
          ref={node => (this.modalSelectedProvider = node)}
          onSelectProvider={this.onSelectProvider}
        />
        <ModalDrugBusiness ref={(node: any) => (this.modalDrugBusiness = node)} item={item} navigation={navigation} />
        <ModalDrugDQG ref={(node: any) => (this.modalDrugDQG = node)} item={item} navigation={navigation} />

        <LoaderIndicator loading={isFetching} />
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    store: state.user.dataUser.store,
    token: state.user.token,
    listProductBusiness: state.inventory.listProductBusiness,
    listProductDQG: state.inventory.listProductDQG,
    objInfomationImport: state.inventory.objInfomationImport,
    paymentList: state.dataPersist.paymentList,
    importTypeList: state.dataPersist.importTypeList,
  };
}
const mapDispatchToProps = {
  deletedProductBusiness,
  deletedProductDQG,
  removeProduct,
  addInformationImport,
  import_type,
  payment,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true },
)(index);
