import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, Alert, FlatList } from 'react-native';
import { connect } from 'react-redux';
import vw from '../../utils/size-dynamic';
import { ICON_QR_CODE, MAIN_COLOR, ICON_CARET_DOWN, ICON_CHECKED, ICON_BACK, themes } from '../../constants/';
import ModalDropdown from 'react-native-modal-dropdown';
import API from '../../api/';
import { addProductNewBusiness } from '../../redux/action/inventory';
import { INV_IMPORT_CREATE_TAB_STEP_1, INV_IMPORT_WITH_DRUG_NEW, PRODUCT_INVOICE_SCREEN } from '../../redux/types/';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './InvImportAddNewDrug.styles';
import HeaderBar from '../../elements/HeaderBar/';
import { MyStatusBar } from '../../elements/MyStatusBar/';
import ModalInputQuanlity from './ModalInputQuanlity';
import ItemUnitDrug from '../../components/ItemUnitDrug';
import LoaderIndicator from '../../elements/LoaderIndicator';
import EventBus from '../../utils/EventBus';
import {
  getKindDrug,
  getUnitType,
  description,
  provider_drug,
  disease_classification,
} from '../../redux/action/dataPersist';
import { QR_CODE_SREEN, INV_IMPORT_ADD_NEW_DRUG } from '../../navigation/screen_name';
const source = ['Có hóa đơn', 'Không có hóa đơn', 'Cả 2'];
const quality = ['Hộp', 'Lọ', 'Vỉ'];
const specialist = ['Lựa chọn'];
const dosageForms = ['Bao vi nang'];
const vat = ['0%', '5%', '10%'];
const status = ['Đang kinh doanh', 'Không sử dụng'];
const kind = ['OTC', 'ETC', 'Thiết bị', 'Khác'];
const country = ['Việt Nam'];
const provider = ['Chọn nhà cung cấp'];
import { Navigation } from '../../dataType/index.d';
type Props = {
  navigation: Navigation;
  store: any;
  getKindDrug: Function;
  kindDrug: any;
  getUnitType: Function;
  unitType: any;
  descriptionType: any;
  description: Function;
};
type State = {
  modalVisible: boolean;
  status: boolean;
  status1: boolean;
  drg_drug_name: string;
  active_ingredient: string;
  drg_barcode: string;
  company_name: string;
  typeUnit: any;
  unit_name: any;
  prefix: any;
  unit_cd: string;
  drg_drug_alias: string;
  concentration: string;
  package_desc: string;
  license_cd: string;
  drg_ref_cd: string;
  selectSpecialist: any;
  valueArray: any;
  index: number;
  descriptionDrug: any;
  selectedValueDosageForms: any;
  kindDrug: any;
  changeUpdate: boolean;
  vat_percent: any;
  selectedStatusBusiness: any;
  exchangeValueInput: string;
  priceInput: string;
  noteInput: string;
  selectValueBasic: any;
  unitCodeBasic: string;
  description: string;
  drug_group: any;
  isFetching: boolean;
  item: any;
  responseInfoDrug: any;
  status2: boolean;
  origin: any;
  provider: any;
  imageDrug: any;
  indication: any;
  direction_for_use: any;
  dosage: any;
  storageTemperatures: any;
  moisturePreservation: any;
  controlDrug: any;
  describe: any;
  adverse_reaction: any;
  contraindication: any;
  interation: any;
  precaution: any;
  overdosage: any;
  synchronized: boolean;
  accumulatePoints: boolean;
  selectCountry: any;
  provider_name: any;
  listProvider: any;
  provider_code: any;
  classification: any;
  drug_classified: any;
  status3: boolean;
  priceSell: any;
};
class index extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      status: true,
      status1: false,
      status2: true,
      drg_drug_name: '',
      active_ingredient: '',
      drg_barcode: '',
      company_name: '',
      typeUnit: [],
      unit_name: quality[0],
      prefix: source[0],
      unit_cd: '',
      drg_drug_alias: '',
      concentration: '',
      package_desc: '',
      license_cd: '',
      drg_ref_cd: '',
      selectSpecialist: specialist[0],
      valueArray: [],
      index: 0,
      descriptionDrug: [],
      selectedValueDosageForms: dosageForms[0],
      kindDrug: [],
      changeUpdate: false,
      vat_percent: vat[0],
      selectedStatusBusiness: status[0],
      exchangeValueInput: '1',
      priceInput: '',
      noteInput: '',
      selectValueBasic: quality[0],
      unitCodeBasic: '006',
      description: '028',
      drug_group: kind[0],
      isFetching: false,
      item: [],
      responseInfoDrug: [],
      // state InfomationOther
      imageDrug: '',
      indication: '',
      direction_for_use: '',
      dosage: '',
      storageTemperatures: '',
      moisturePreservation: '',
      controlDrug: '',
      describe: '',
      adverse_reaction: '',
      contraindication: '',
      interation: '',
      precaution: '',
      overdosage: '',
      synchronized: false,
      accumulatePoints: false,
      selectCountry: country[0],
      provider_name: provider[0],
      listProvider: [],
      provider_code: '',
      classification: [],
      drug_classified: '',
      priceSell: '',
    };
  }
  // componentDidMount() {
  //   this.getTypeUnit();
  //   this.getListDescription();
  //   this.getKind();
  //   this.getProvider();
  //   this.getListClassification();
  //   this.props.navigation.getParam('drug_id') ? this.getDetailDrug() : null
  // }
  async componentDidMount() {
    try {
      this.props.navigation.getParam('drug_id') ? this.getDetailDrug() : null;
      if (!this.props.kindDrug || this.props.kindDrug.length === 0) {
        const res = await API.warehouse.getKindDrug();
        this.props.getKindDrug(res.data);
      }
      if (!this.props.unitType || this.props.unitType.length === 0) {
        const res = await API.warehouse.getUnitDrug();
        this.props.getUnitType(res.data);
      }
      if (!this.props.descriptionType || this.props.descriptionType.length === 0) {
        const res = await API.warehouse.getDescription();
        this.props.description(res.data);
      }
      if (!this.props.provider || this.props.provider.length === 0) {
        const res = await API.warehouse.getListProvider(this.props.store.company_code);
        this.props.provider_drug(res.data);
      }
      if (!this.props.disease_classification_type || this.props.disease_classification_type.length === 0) {
        const res = await API.warehouse.getListClassification();
        this.props.disease_classification(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  getDetailDrug = async () => {
    const { valueArray } = this.state;
    try {
      const res = await API.productApi.getDetailDrug(this.props.navigation.getParam('drug_id'));
      const value = res.data.units.length > 1 ? res.data.units.slice(1) : [];
      await this.setState({
        drg_drug_name: res.data.drg_drug_name,
        drg_barcode: res.data.drg_barcode,
        active_ingredient: res.data.active_ingredient,
        selectedValueDosageForms: res.data.description_value,
        description: res.data.description,
        drug_group: res.data.drug_kind ? res.data.drug_kind : res.data.drug_group,
        package_desc: res.data.package_desc,
        company_name: res.data.company_name,
        drg_drug_alias: res.data.drg_drug_alias === null ? '' : res.data.drg_drug_alias,
        drug_classified: res.data.drug_classified,
        selectSpecialist: res.data.drug_classified_value === null ? 'Lựa chọn' : res.data.drug_classified_value,
        license_cd: res.data.license_cd,
        dosage: res.data.dosage,
        adverse_reaction: res.data.adverse_reaction,
        concentration: res.data.concentration,
        contraindication: res.data.contraindication,
        direction_for_use: res.data.direction_for_use,
        precaution: res.data.precaution,
        provider_name: res.data.provider_name === '' ? 'Lựa chọn' : res.data.provider_name,
        indication: res.data.indication,
        selectValueBasic: res.data.units[0].parent_unit_name === null ? '' : res.data.units[0].parent_unit_name,
        unitCodeBasic: res.data.units[0].parent_unit === null ? '' : res.data.units[0].parent_unit,
        priceInput: res.data.units[0].max_price === null ? '' : res.data.units[0].max_price,
        noteInput: res.data.units[0].inv_qty_alarm,
        valueArray: [...valueArray, ...value],
        vat_percent: res.data.vat_percent + '%',
      });
    } catch (error) {
      console.log(error);
    }
  };
  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };

  _renderHeaderLeft() {
    const { navigation } = this.props;
    return (
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => this._goBack()}>
        <Image source={themes.ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtBack}>{!navigation.getParam('editProduct') ? 'Nhập thuốc mới' : 'Cập nhật thuốc'}</Text>
      </TouchableOpacity>
    );
  }
  callBackScreen = () => {
    EventBus.fireEvent('AddNewDrugSuccess');
    this.props.navigation.navigate(INV_IMPORT_CREATE_TAB_STEP_1);
  };
  importInventoryDrug = async () => {
    const {
      drg_drug_name,
      drg_barcode,
      selectValueBasic,
      responseInfoDrug,
      vat_percent,
      unitCodeBasic,
      selectedValueDosageForms,
      company_name,
    } = this.state;
    const data = {};
    (data.drg_drug_name = responseInfoDrug.drg_drug_name),
      (data.drg_barcode = responseInfoDrug.drg_barcode),
      (data.unit_name = selectValueBasic),
      (data.drug_id = responseInfoDrug.drug_id),
      (data.drg_drug_cd = responseInfoDrug.drg_drug_cd),
      (data.vat_percent = vat_percent),
      (data.unit_cd = unitCodeBasic),
      (data.dosageForms = selectedValueDosageForms),
      (data.company_name = company_name);
    await this.setState({ item: data });
    this.props.navigation.navigate(INV_IMPORT_WITH_DRUG_NEW, { item: this.state.item });
  };
  importDrug = async () => {
    const {
      valueArray,
      exchangeValueInput,
      priceInput,
      noteInput,
      selectValueBasic,
      unitCodeBasic,
      vat_percent,
      prefix,
      drug_group,
      description,
      active_ingredient,
      license_cd,
      drg_drug_name,
      drg_barcode,
      drg_ref_cd,
      concentration,
      selectedStatusBusiness,
      company_name,
      package_desc,
      drg_drug_alias,
      provider_name,
      provider_code,
      interation,
      drug_classified,
      precaution,
      overdosage,
      indication,
      dosage,
      adverse_reaction,
      describe,
      contraindication,
      direction_for_use,
      priceSell,
    } = this.state;
    const { store, info } = this.props;
    const exchange = valueArray.map((product: any) => {
      const newUnits = {
        drg_store_id: store.drg_store_id,
        drg_store_code: store.drg_store_code,
        unit: product.unit_code.toString(),
        unit_name: product.unit_name.toString(),
        parent_unit: unitCodeBasic.toString(),
        parent_unit_name: selectValueBasic.toString(),
        unit_qty: product.unit_qty.toString(),
        max_price: product.max_price.toString(),
        default_flg: '0',
        inv_qty_alarm: product.inv_qty_alarm.toString(),
      };
      return newUnits;
    });
    const valueBasic = {
      drg_store_id: store.drg_store_id.toString(),
      drg_store_code: store.drg_store_code,
      unit: unitCodeBasic.toString(),
      unit_name: selectValueBasic.toString(),
      parent_unit: unitCodeBasic.toString(),
      parent_unit_name: selectValueBasic.toString(),
      unit_qty: exchangeValueInput.toString(),
      max_price: priceInput.toString(),
      default_flg: '1',
      inv_qty_alarm: noteInput.toString(),
    };
    const arrayExchangeSetPriceSell = valueArray.map((e: any) => {
      const newUnits = {
        price: e.max_price,
        unit: e.unit_code.toString(),
        unit_name: e.unit_name.toString(),
      };
      return newUnits;
    });
    const arrayBasicSetPriceSell = {
      price: priceSell,
      unit: unitCodeBasic.toString(),
      unit_name: selectValueBasic.toString(),
    };
    const arraySetPrice = [arrayBasicSetPriceSell, ...arrayExchangeSetPriceSell];
    const units = [valueBasic, ...exchange];
    try {
      const parmas = {
        info: {
          drg_drug_name: drg_drug_name,
          license_cd: license_cd,
          company_code: store.company_code,
          company_name: company_name,
          country: 'Việt Nam',
          active_ingredient: active_ingredient,
          original_product: '',
          package_desc: package_desc,
          image_number: '0',
          image_url: '',
          avatar_url: '',
          drug_group: drug_group,
          drug_classified: drug_classified ? drug_classified : '127',
          drug_flg: '1',
          administration: '',
          indication: indication,
          description: description,
          dosage: dosage,
          adverse_reaction: adverse_reaction,
          contraindication: contraindication,
          interation: interation,
          precaution: precaution,
          overdosage: overdosage,
          atc_code: '',
          status: selectedStatusBusiness === 'Đang kinh doanh' ? '1' : '0',
          start_date: null,
          end_date: null,
          note: describe,
          prefix: prefix === 'Có hóa đơn' ? 'S' : prefix === 'Cả 2' ? 'N' : 'E',
          substore_sync_flg: 1,
          revision: '0',
          vat_percent: vat_percent.replace('%', ''),
          provider_code: provider_code,
          drg_barcode: drg_barcode,
          drg_drug_alias: drg_drug_alias,
          concentration: concentration,
          drg_ref_cd: drg_ref_cd,
          provider_name: provider_name,
          updated_user: info.full_name,
          drg_store_id: info.drg_store_id,
          direction_for_use: direction_for_use,
        },
        units,
      };
      await this.setState({ isFetching: true });
      const res = await API.warehouse.addDrugNew(parmas);
      if (res.status === 200) {
        const arrayDrugSetPrice = arraySetPrice.map((e: any) => {
          const newArray = {
            drug_id: res.data.units[0].drug_id,
            drg_store_id: res.data.units[0].drg_store_id,
            drg_store_code: res.data.units[0].drg_store_code,
            drg_drug_cd: res.data.units[0].drg_drug_cd,
            drg_drug_name: res.data.units[0].drg_drug_name,
            price: Number(e.price),
            price_before_vat: Number(e.price),
            unit: e.unit,
            unit_name: e.unit_name,
            updated_user: info.full_name,
          };
          return newArray;
        });
        arrayDrugSetPrice.forEach((product: any) => {
          API.productApi
            .updatePriceProduct(product)
            .then((res: any) => {
              console.log('==================update==================');
              console.log(res);
              console.log('==================update==================');
            })
            .catch((err: any) => {
              console.log('====================================');
              console.log(err);
              console.log('====================================');
            });
        });
        this.setState({ isFetching: false, responseInfoDrug: res.data.info });
        Alert.alert(
          'Thông báo',
          'Thêm thuốc mới thành công.Bạn có muốn nhập kho với sản phẩm ',
          [
            {
              text: 'Hủy',
              onPress: () => this.callBackScreen(),
              style: 'cancel',
            },
            { text: 'Đồng ý', onPress: () => this.importInventoryDrug() },
          ],
          { cancelable: false },
        );
      } else {
        Alert.alert('Thông báo', 'Thêm thuốc thất bại');
      }
    } catch (error) {
      this.setState({ isFetching: false });
      console.log(error);
    }
  };
  checkValueBeforeAdd = () => {
    const {
      drg_drug_name,
      active_ingredient,
      description,
      drug_group,
      prefix,
      company_name,
      drg_barcode,
      valueArray,
      selectValueBasic,
      exchangeValueInput,
      noteInput,
      priceInput,
      unitCodeBasic,
    } = this.state;
    const { navigation } = this.props;
    let objBasic = {};
    (objBasic.unit_code = unitCodeBasic ? unitCodeBasic : '006'),
      (objBasic.max_price = priceInput),
      (objBasic.unit_name = selectValueBasic),
      (objBasic.unit_qty = exchangeValueInput),
      (objBasic.inv_qty_alarm = noteInput),
      (objBasic.default_flg = 1);
    const arrayCheck = [...valueArray, objBasic];
    var valueArr = arrayCheck.map(function(item) {
      return item.unit_name;
    });
    var isDuplicate = valueArr.some(function(item, idx) {
      return valueArr.indexOf(item) != idx;
    });
    if (isDuplicate === false) {
      if (drg_drug_name && active_ingredient && description && drug_group && prefix && company_name) {
        !navigation.getParam('editProduct') ? this.importDrug() : this.updateProduct();
      } else {
        Alert.alert('Thông báo', 'Các trường bắt buộc không được trống');
      }
    } else {
      Alert.alert('Đơn vị không được trùng nhau');
    }
  };
  successUpdate = () => {
    this.props.navigation.navigate(PRODUCT_INVOICE_SCREEN);
  };
  updateProduct = async () => {
    const {
      valueArray,
      exchangeValueInput,
      priceInput,
      noteInput,
      selectValueBasic,
      unitCodeBasic,
      vat_percent,
      prefix,
      drug_group,
      description,
      active_ingredient,
      license_cd,
      drg_drug_name,
      drg_barcode,
      drg_ref_cd,
      concentration,
      selectedStatusBusiness,
      company_name,
      package_desc,
      drg_drug_alias,
      provider_name,
      provider_code,
      interation,
      drug_classified,
      precaution,
      overdosage,
      indication,
      dosage,
      adverse_reaction,
      describe,
      contraindication,
      direction_for_use,
    } = this.state;
    const { store, info } = this.props;
    const exchange = valueArray.map((product: any) => {
      const newUnits = {
        drg_store_id: store.drg_store_id,
        drg_store_code: store.drg_store_code,
        unit: product.unit_code === undefined ? product.unit : product.unit_code,
        unit_name: product.unit_name,
        parent_unit: unitCodeBasic,
        parent_unit_name: selectValueBasic,
        unit_qty: product.unit_qty,
        max_price: product.max_price,
        default_flg: 0,
        inv_qty_alarm: product.inv_qty_alarm,
      };
      return newUnits;
    });
    const valueBasic = {
      drg_store_id: store.drg_store_id,
      drg_store_code: store.drg_store_code,
      unit: unitCodeBasic,
      unit_name: selectValueBasic,
      parent_unit: unitCodeBasic,
      parent_unit_name: selectValueBasic,
      unit_qty: exchangeValueInput,
      max_price: priceInput,
      default_flg: 1,
      inv_qty_alarm: noteInput,
    };
    const units = [valueBasic, ...exchange];
    try {
      const parmas = {
        info: {
          drg_drug_name: drg_drug_name,
          license_cd: license_cd,
          company_code: store.company_code,
          company_name: company_name,
          country: 'Việt Nam',
          active_ingredient: active_ingredient,
          original_product: '',
          package_desc: package_desc,
          image_number: '0',
          image_url: '',
          avatar_url: '',
          drug_group: drug_group,
          drug_classified: drug_classified ? drug_classified : '127',
          drug_flg: '1',
          administration: '',
          indication: indication,
          description: description,
          dosage: dosage,
          adverse_reaction: adverse_reaction,
          contraindication: contraindication,
          interation: interation,
          precaution: precaution,
          overdosage: overdosage,
          atc_code: '',
          status: selectedStatusBusiness === 'Đang kinh doanh' ? '1' : '0',
          start_date: null,
          end_date: null,
          note: describe,
          prefix: prefix === 'Có hóa đơn' ? 'S' : prefix === 'Cả 2' ? 'N' : 'E',
          substore_sync_flg: 1,
          revision: '0',
          vat_percent: vat_percent.replace('%', ''),
          provider_code: provider_code,
          drg_barcode: drg_barcode,
          drg_drug_alias: drg_drug_alias,
          concentration: concentration,
          drg_ref_cd: drg_ref_cd,
          provider_name: provider_name,
          updated_user: info.full_name,
          drg_store_id: info.drg_store_id,
          direction_for_use: direction_for_use,
          drug_id: this.props.navigation.getParam('drug_id'),
          drug_kind: null,
        },
        units,
      };
      await this.setState({ isFetching: true });
      const res = await API.productApi.updateDrug(parmas, this.props.navigation.getParam('drug_id'));
      if (res.status === 200) {
        this.setState({ isFetching: false });
        Alert.alert('Thông báo', 'Cập nhật thuốc thành công', [{ text: 'OK', onPress: () => this.successUpdate() }], {
          cancelable: false,
        });
      } else {
        Alert.alert('Cập nhật thuốc thất bại');
        this.setState({ isFetching: false });
      }
    } catch (error) {
      console.log(error);
      this.setState({ isFetching: false });
    }
  };
  onPressOK = () => {
    const { navigation } = this.props;

    Alert.alert(
      'Thông báo',
      !navigation.getParam('editProduct') ? 'Bạn có chắc nhập sản phẩm mới' : 'Bạn có chắc cập nhật sản phẩm',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel Pressed'),
        },
        { text: 'Đồng ý', onPress: () => this.checkValueBeforeAdd() },
      ],
      { cancelable: false },
    );
  };
  renderFooter = () => {
    return <View style={styles.wapperFooter}>{this._renderButton(this.onPressOK, 'Đồng ý')}</View>;
  };
  _renderButton = (onPress: any, text: string) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.txtButton}>{text}</Text>
    </TouchableOpacity>
  );
  navigationQRCode = () => {
    this.props.navigation.navigate(QR_CODE_SREEN, { toScreen: INV_IMPORT_ADD_NEW_DRUG });
  };
  selectedValueDosageForms = (idx: any, value: any) => {
    this.setState({ selectedValueDosageForms: value, description: this.props.descriptionType[idx].code });
  };
  specialist = (idx: any, value: any) => {
    this.setState({
      selectSpecialist: value,
      drug_classified: this.props.disease_classification_type[idx].code,
    });
  };
  selectedStatusBusiness = (value: any, idx: any) => {
    this.setState({ selectedStatusBusiness: idx });
  };
  vat_percent = (value: any, idx: any) => {
    this.setState({ vat_percent: idx });
  };
  source = (value: any, idx: any) => {
    this.setState({ prefix: idx });
  };
  add_New_View = () => {
    this.modalInputQuanlity.toggleModal(true);
  };
  selectedValueGroupDrug = (value: any, idx: any) => {
    this.setState({ drug_group: idx });
  };
  renderOptionCollapsible = (flag: boolean, text: string, onPress: any, flagAdd: boolean, onPressAdd: any) => {
    return (
      <TouchableOpacity style={styles.wapperTitle} onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '90%',
            height: vw(40),
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.buttonCheck}>{!flag && <Image source={ICON_CHECKED} style={styles.iconCheck} />}</View>
            <Text style={styles.txtListProduct}>{text}</Text>
          </View>
          {flagAdd ? (
            <TouchableOpacity style={styles.buttonAddQuanlity} onPress={onPressAdd}>
              <Text style={styles.txtAddQuanlity}>Thêm đơn vị mới</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {flag ? (
          <Ionicons name="ios-arrow-forward" size={vw(20)} color="black" />
        ) : (
          <Ionicons name="ios-arrow-down" size={vw(20)} color="black" />
        )}
      </TouchableOpacity>
    );
  };
  _renderInfomation = (
    title: any,
    target: any,
    placeholder: string,
    editable = true,
    flag = true,
    keyboardType: any,
    onSubmitEditing: any,
  ) => {
    const text = this.state[target];
    return (
      <View style={styles.containerInfomation}>
        <View style={{ width: vw(100) }}>
          <Text style={styles.txtTitleInfor}>{title}</Text>
          {flag ? text && text.length !== 0 ? null : <Text style={styles.txtDranger}>*</Text> : null}
        </View>
        <TextInput
          editable={editable}
          keyboardType={keyboardType}
          style={styles.textInputInfomation}
          placeholder={placeholder}
          value={String(text)}
          onSubmitEditing={onSubmitEditing}
          onChangeText={text => {
            this.setState({ [target]: text });
          }}
        />
      </View>
    );
  };
  functionDropDown = (data: any, value: any, onPress: any) => {
    return (
      <ModalDropdown
        style={styles.modal}
        options={data}
        defaultValue={value}
        // defaultIndex={value[0]}
        dropdownStyle={[
          styles.stylesModal,
          {
            height: data.length > 50 ? 'auto' : -1,
          },
        ]}
        dropdownTextStyle={styles.dropdownTextStyle}
        onSelect={onPress}
      >
        <View style={styles.wapperInputFilter}>
          <Text style={styles.txtSelected} numberOfLines={2}>
            {value}
          </Text>
          <Image source={themes.ICON_CARET_DOWN} style={styles.iconDrop} resizeMode="contain" />
        </View>
      </ModalDropdown>
    );
  };
  renderBody = () => {
    const {
      status,
      status1,
      status2,
      status3,
      drg_drug_name,
      active_ingredient,
      drg_barcode,
      company_name,
      typeUnit,
      unit_name,
      prefix,
      descriptionDrug,
      selectedValueDosageForms,
      kindDrug,
      drug_group,
    } = this.state;
    const listDescription = this.props.descriptionType.map(element => {
      return element.value;
    });
    const listKind = this.props.kindDrug.map(element => {
      return element.value;
    });
    if (this.props.navigation.getParam('codeQR') !== undefined) {
      this.setState({ drg_barcode: this.props.navigation.getParam('codeQR') });
    }
    return (
      <ScrollView>
        {/* <Text style={styles.nameDrug}>Nhập thuốc mới</Text> */}
        <Text style={styles.txtListProduct}>Thông tin cơ bản</Text>
        <View style={[styles.containerLayout, { marginTop: 5 }]}>
          {this._renderInfomation('Tên biệt dược', 'drg_drug_name', 'Nhập tên biệt dược', true, true, 'default')}
          {this._renderInfomation('Tên hoạt chất', 'active_ingredient', 'Nhập tên hoạt chất', true, true, 'default')}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              flex: 1,
            }}
          >
            <View style={{ width: vw(100) }}>
              <Text style={styles.txtTitleInfor}>Mã vạch</Text>
              {/* {drg_barcode && drg_barcode.length !== 0 ? null : (
                <Text style={styles.txtDranger}>*</Text>
              )} */}
            </View>
            <TextInput
              style={styles.textInputInfomation}
              placeholder="Nhập mã vạch"
              value={drg_barcode && drg_barcode.toString()}
              onChangeText={text => {
                this.setState({ drg_barcode: text });
              }}
            />
            <TouchableOpacity onPress={() => this.navigationQRCode()} style={styles.buttonQRCOde}>
              <Image
                source={themes.ICON_QR_CODE}
                style={[styles.iconQrCode, { tintColor: themes.colors.MAIN_COLOR }]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.wapperAdditional}>
            <View style={{ width: vw(100) }}>
              <Text style={styles.txtTitleInfor}>Dạng bào chế</Text>
            </View>
            <View style={styles.wapperDropDown}>
              {this.functionDropDown(listDescription, selectedValueDosageForms, (idx: any, value: any) =>
                this.selectedValueDosageForms(idx, value),
              )}
            </View>
          </View>
          <View style={styles.wapperAdditional}>
            <View style={{ width: vw(100) }}>
              <Text style={styles.txtTitleInfor}>Nhóm thuốc</Text>
            </View>
            <View style={styles.wapperDropDown}>
              {this.functionDropDown(listKind, drug_group, (value: any, idx: any) =>
                this.selectedValueGroupDrug(value, idx),
              )}
            </View>
          </View>
          <View style={styles.wapperAdditional}>
            <View style={{ width: vw(100) }}>
              <Text style={styles.txtTitleInfor}>Hóa đơn</Text>
            </View>
            <View style={styles.wapperDropDown}>
              {this.functionDropDown(source, prefix, (value: any, idx: any) => this.source(value, idx))}
            </View>
          </View>
          {this._renderInfomation('Nhà sản xuất ', 'company_name', 'Nhập tên nhà sản xuất', true, true, 'default')}
        </View>
        {this.renderOptionCollapsible(status1, 'Thông tin nâng cao', null, true, () => this.add_New_View())}
        {this.renderQuanlity()}

        {this.renderOptionCollapsible(
          status,
          'Thông tin bổ sung',
          () => this.setState({ status: !status }),
          false,
          null,
        )}
        {!status ? this._renderAdditional() : null}
        {this.renderOptionCollapsible(
          status2,
          'Thông tin khác',
          () => this.setState({ status2: !status2 }),
          false,
          null,
        )}
        {!status2 ? this._renderInfomationOther() : null}
      </ScrollView>
    );
  };
  _renderAdditional = () => {
    const { selectSpecialist, selectedStatusBusiness, vat_percent, classification } = this.state;
    const listClassification = this.props.disease_classification_type.map(element => {
      return element.value;
    });
    return (
      <View style={[styles.containerLayout, { marginTop: 5 }]}>
        {this._renderInfomation('Tên viết tắt', 'drg_drug_alias', 'Nhập tên viết tắt', true, false, 'default')}
        {this._renderInfomation('Hàm lượng', 'concentration', 'Nhập hàm lượng', true, false, 'default')}
        {this._renderInfomation('Đóng gói', 'package_desc', 'Nhập quy cách đóng gói', true, false, 'default')}
        {this._renderInfomation('Số đăng ký', 'license_cd', 'Nhập số đăng ký', true, false, 'default')}
        {this._renderInfomation('Mã quốc gia', 'drg_ref_cd', 'Nhập mã quốc gia', true, false, 'default')}
        <View style={styles.wapperAdditional}>
          <View style={{ width: vw(100) }}>
            <Text style={styles.txtTitleInfor}>Chuyên khoa</Text>
          </View>
          <View style={styles.wapperDropDown}>
            {this.functionDropDown(listClassification, selectSpecialist, (idx: any, value: any) =>
              this.specialist(idx, value),
            )}
          </View>
        </View>
        <View style={styles.wapperAdditional}>
          <View style={{ width: vw(100) }}>
            <Text style={styles.txtTitleInfor}>Trạng thái</Text>
          </View>
          <View style={styles.wapperDropDown}>
            {this.functionDropDown(status, selectedStatusBusiness, (value: any, idx: any) =>
              this.selectedStatusBusiness(value, idx),
            )}
          </View>
        </View>
        <View style={styles.wapperAdditional}>
          <View style={{ width: vw(100) }}>
            <Text style={styles.txtTitleInfor}>Thuế</Text>
          </View>
          <View style={styles.wapperDropDown}>
            {this.functionDropDown(vat, vat_percent, (value: any, idx) => this.vat_percent(value, idx))}
          </View>
        </View>
      </View>
    );
  };
  selectedValueCountry = (idx, value) => {
    this.setState({ selectCountry: value });
  };
  selectedValueProvider = (idx, value) => {
    this.setState({ provider_name: value, provider_code: this.props.provider[idx].provider_code });
  };
  _renderInfomationOther = () => {
    const { selectCountry, provider_name, synchronized, accumulatePoints, listProvider } = this.state;
    const listProviderMap = this.props.provider.map(element => {
      return element.provider_name;
    });
    return (
      <View style={[styles.containerLayout, { marginTop: 5 }]}>
        {/* <View style={styles.wapperAdditional}>
          <View style={{ width: vw(100) }}>
            <Text>Xuất xứ</Text>
          </View>
          <View style={styles.wapperDropDown}>
            {this.functionDropDown(country, selectCountry, (idx: any, value: any) => this.selectedValueCountry(idx, value))}
          </View>
        </View> */}
        <View style={styles.wapperAdditional}>
          <View style={{ width: vw(100) }}>
            <Text style={styles.txtTitleInfor}>Nhà cung cấp</Text>
          </View>
          <View style={styles.wapperDropDown}>
            {this.functionDropDown(listProviderMap, provider_name, (idx: any, value: any) =>
              this.selectedValueProvider(idx, value),
            )}
          </View>
        </View>
        {this._renderInfomation('Chỉ định', 'indication', 'Nhập chỉ đinh thuốc', true, false, 'default')}
        {this._renderInfomation('Cách sử dụng', 'direction_for_use', 'Nhập cách sử dụng thuốc', true, false, 'default')}
        {this._renderInfomation('Đối tượng sử dụng', 'dosage', 'Nhập đối tượng sử dụng', true, false, 'default')}
        {/* {this._renderInfomation('Nhiệt độ bảo quản', 'storageTemperatures', 'Nhập nhiệt độ bảo quản', true, false)} */}
        {/* {this._renderInfomation('Độ ẩm bảo quản', 'moisturePreservation', 'Nhập độ ẩm bảo quản', true, false)} */}
        {/* {this._renderInfomation('Kiểm soát thuốc', 'controlDrug', 'Nhập kiểm soát thuốc', true, false)} */}
        {this._renderInfomation('Mô tả', 'describe', 'Nhập mô tả thuốc', true, false, 'default')}
        {this._renderInfomation('Tác dụng phụ', 'adverse_reaction', 'Nhập tác dụng phụ', true, false, 'default')}
        {this._renderInfomation(
          'Chống chỉ định',
          'contraindication',
          'Nhập chống chỉ định thuốc',
          true,
          false,
          'default',
        )}
        {this._renderInfomation('Tương tác thuốc', 'interation', 'Nhập tương tác thuốc', true, false, 'default')}
        {this._renderInfomation('Chú ý', 'precaution', 'Nhập chú ý', true, false, 'default')}
        {this._renderInfomation('Xử lý quá liều', 'overdosage', 'Nhập cách xử lý khi quá liều', true, false, 'default')}
        {/* <View style={[styles.wapperAdditional, { marginTop: vw(5) }]}>
          <View style={{ width: vw(100) }}>
            <Text>Đồng bộ kho lẻ</Text>
          </View>
          <TouchableOpacity onPress={() => this.setState({ synchronized: !synchronized })} style={[styles.buttonCheck, { position: 'absolute', left: vw(120) }]}>
            {synchronized && <Image source={ICON_CHECKED} style={styles.iconCheck} />}
          </TouchableOpacity>
        </View>
        <View style={[styles.wapperAdditional, { marginTop: vw(5) }]}>
          <View style={{ width: vw(100) }}>
            <Text>Tích điểm</Text>
          </View>
          <TouchableOpacity onPress={() => this.setState({ accumulatePoints: !accumulatePoints })} style={[styles.buttonCheck, { position: 'absolute', left: vw(120) }]}>
            {accumulatePoints && <Image source={ICON_CHECKED} style={styles.iconCheck} />}
          </TouchableOpacity>
        </View> */}
      </View>
    );
  };
  deletedQuanlity = (index: any) => {
    Alert.alert(
      'Thông báo',
      'Bạn muốn xóa đơn vị quy đổi',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: () =>
            this.setState(prevState => ({
              valueArray: prevState.valueArray.filter((_, i) => i != index),
            })),
        },
      ],
      { cancelable: false },
    );
  };
  updateQuantityProduct = (item: any, number: number) => {
    const { valueArray } = this.state;
    valueArray.forEach((product: any) => {
      if (product.unit_code === item.unit_code) product.unit_qty = number;
    });
    this.setState({ valueArray: [...valueArray] });
  };
  updateQuantityPrice = (item: any, price: number) => {
    const { valueArray } = this.state;
    valueArray.forEach((product: any) => {
      if (product.unit_code === item.unit_code) product.max_price = price;
    });
    this.setState({ valueArray: [...valueArray] });
  };
  updateNoteValue = (item: any, note: number) => {
    const { valueArray } = this.state;
    valueArray.forEach((product: any) => {
      if (product.unit_code === item.unit_code) product.inv_qty_alarm = note;
    });
    this.setState({ valueArray: [...valueArray] });
  };
  updateQuantityPriceSell = (item: any, price: number) => {
    const { valueArray } = this.state;
    valueArray.forEach((product: any) => {
      if (product.unit_code === item.unit_code) product.max_price = price;
    });
    this.setState({ valueArray: [...valueArray] });
  };
  changeModal = (item: any, value: any, e: any) => {
    const { valueArray } = this.state;
    valueArray.forEach((product: any) => {
      if (product.unit_code === item.unit_code) product.unit_name = value;
      if (product.unit_code === item.unit_code) product.unit_code = e;
    });
    this.setState({ valueArray: [...valueArray] });
  };
  selectedValueBasic = (idx: any, value: any) => {
    this.setState({ selectValueBasic: value, unitCodeBasic: this.props.unitType[idx].code });
  };
  renderQuanlity = () => {
    const { typeUnit, valueArray, selectValueBasic } = this.state;
    const { navigation } = this.props;
    const listUnit = this.props.unitType.map((element: any) => {
      return element.value;
    });
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.right}>
            <View style={styles.row}>
              <View style={{ width: vw(100) }}>
                <Text style={styles.txtTitleInfor}>Đơn vị cơ bản</Text>
              </View>
              <View style={styles.wapperDropDown}>
                {this.functionDropDown(listUnit, selectValueBasic, (idx: any, value: any) =>
                  this.selectedValueBasic(idx, value),
                )}
              </View>
            </View>
            {/* {this._renderInfomation('Giá trị quy đổi', 'exchangeValueInput', 'Nhập giá trị quy đổi', false, false)} */}
            {/* {this._renderInfomation('Giá trần', 'priceInput', 'Nhập giá trần', true, false)} */}
            {!navigation.getParam('editProduct')
              ? this._renderInfomation('Giá bán', 'priceSell', 'Nhập giá bán cơ bản', true, false, 'numeric')
              : null}
            {this._renderInfomation('Cảnh báo tồn kho', 'noteInput', 'Nhập cảnh báo tồn kho', true, false, 'numeric')}
          </View>
          <View style={styles.left}>
            <View />
          </View>
        </View>
        <FlatList
          style={{ marginTop: vw(5) }}
          extraData={this.state}
          data={valueArray}
          keyExtractor={(index: any) => index.toString()}
          renderItem={({ item, index }) => (
            <ItemUnitDrug
              item={item}
              index={index}
              type={!navigation.getParam('editProduct') ? 'addnew' : 'update'}
              deleted={() => this.deletedQuanlity(index)}
              updateQuantity={this.updateQuantityProduct}
              updatePrice={this.updateQuantityPrice}
              updatePriceSell={this.updateQuantityPriceSell}
              updateNote={this.updateNoteValue}
              onChangeModal={this.changeModal}
            />
          )}
        />
      </View>
    );
  };
  recevied = (value: any) => {
    const { valueArray } = this.state;
    this.setState({ valueArray: [...valueArray, value] });
  };
  render() {
    const { item, isFetching } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.backgroundModal}>
        <MyStatusBar />
        {this._renderHeader()}
        <View style={styles.ModalInsideView}>
          {this.renderBody()}
          {this.renderFooter()}
        </View>
        <ModalInputQuanlity
          ref={(node: any) => (this.modalInputQuanlity = node)}
          addUnit={this.recevied}
          flag={!navigation.getParam('editProduct')}
        />
        <LoaderIndicator loading={isFetching} />
      </View>
    );
  }
}
const mapDispatchToProps = {
  addProductNewBusiness,
  getKindDrug,
  getUnitType,
  description,
  provider_drug,
  disease_classification,
};
function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    store: state.user.dataUser.store,
    token: state.user.token,
    unitType: state.dataPersist.unitType,
    kindDrug: state.dataPersist.kindDrug,
    descriptionType: state.dataPersist.descriptionType,
    provider: state.dataPersist.provider,
    disease_classification_type: state.dataPersist.disease_classification_type,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true },
)(index);
