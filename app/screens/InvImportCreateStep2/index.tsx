import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import { MyStatusBar } from '../../elements/MyStatusBar/';
import HeaderBar from '../../elements/HeaderBar/';
import { ICON_BACK, MAIN_COLOR, ICON_SEARCH, ICON_ARROW_DROP, themes } from '../../constants/';
import styles from './InvImportCreateStep2.styles';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment/moment';
import ModalDropdown from 'react-native-modal-dropdown';
const classify = ['Yêu cầu nhập kho'];
const paymentDefault = ['Tiền mặt'];
import API from '../../api/';
import ModalSelectProvider from '../InvImportCreateStep3/ModalSelectProvider';
import { connect } from 'react-redux';
import LoaderIndicator from '../../elements/LoaderIndicator';
import { removeProduct, addInformationImport } from '../../redux/action/inventory';
import vw from '../../utils/size-dynamic';
import { IVN_IMPORT_CREATE_STEP_3 } from '../../redux/types/';
import { payment, import_type } from '../../redux/action/dataPersist';
import { Navigation } from '../../dataType';
type Props = {
  navigation: Navigation;
  info: any;
  token: any;
  objInfomationImport: any;
  paymentList: any;
  importTypeList: any;
  payment: Function;
  import_type: Function;
  store: any;
  addInformationImport: Function;
  listProductBusiness: any;
  listProductDQG: any;
};
type State = {
  company_code: string;
  process_date: string;
  note: string;
  selectClassify: any;
  typeImport: any;
  typePayMent: any;
  company_name: string;
  invoice_code: any;
  import_type: any;
  selectPayMent: any;
  pay_method: any;
  isFetching: boolean;
  valueNextScreen: any;
};
class index extends PureComponent<Props, State> {
  modalSelectedProvider: any;
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
      invoice_code: '',
      isFetching: false,
      valueNextScreen: [],
    };
  }
  async componentDidMount() {
    try {
      var dateNow = Moment().format('DD/MM/YYYY');
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
  functionDropDown = (data: any, value: any, onPress: any) => {
    return (
      <ModalDropdown
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
    const { process_date, note, selectClassify, selectPayMent, company_name } = this.state;
    const listTypeImport = this.props.importTypeList.map((element: any) => {
      return element.value;
    });
    const listTypePayMent = this.props.paymentList.map((element: any) => {
      return element.value;
    });
    return (
      <View style={{ width: '100%', paddingHorizontal: 10 }}>
        <View style={[styles.containerSearch, { paddingTop: vw(5) }]}>
          <TouchableOpacity style={styles.buttonSearch} onPress={this.onPressSearch}>
            <Image source={ICON_SEARCH} style={styles.iconSearch} />
            <Text style={styles.textSearch}>Nhấp chọn tìm nhà cung cấp</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerRow}>
          <View style={styles.rowLeft}>
            <Text style={styles.txt}>Tên nhà cung cấp</Text>
          </View>
          <View style={styles.rowRight}>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập để tạo mới nhà cung cấp"
              value={company_name}
              onChangeText={txt => this.setState({ company_name: txt })}
            />
            {company_name && company_name.length !== 0 ? null : (
              <Text style={styles.txtRed}>*</Text>
            )}
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
              }}
              onDateChange={(date: string) => {
                this.setState({ process_date: date });
              }}
            />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.txt}>Ghi chú</Text>
          <TextInput
            multiline
            placeholder="Nhập ghi chú..."
            value={note}
            onChangeText={txt => this.setState({ note: txt })}
            style={styles.note}
          />
        </View>
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
  ActionImport = async () => {
    const {
      company_name,
      company_code,
      pay_method,
      import_type,
      invoice_code,
      process_date,
      note,
      valueNextScreen,
      selectClassify,
      selectPayMent,
    } = this.state;
    if (company_name && company_name.length !== 0) {
      if (company_code) {
        let params = Object.assign(valueNextScreen, {
          company_name,
          company_code,
          pay_method: pay_method ? pay_method : 'CS',
          import_type: import_type ? import_type : 'ORD',
          invoice_code,
          process_date,
          note,
          selectClassify,
          selectPayMent,
        });
        this.props.addInformationImport(params);
        this.props.navigation.navigate(IVN_IMPORT_CREATE_STEP_3, {
          isUpdate: this.props.navigation.getParam('isUpdate'),
        });
      } else {
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
          await this.setState({ company_code: res.data.provider_code });
          var code = res.data.provider_code;
        } catch (error) {
          console.log(error);
        }
        let params = Object.assign(valueNextScreen, {
          company_name,
          company_code: company_code ? company_code : code,
          pay_method: pay_method ? pay_method : 'CS',
          import_type: import_type ? import_type : 'ORD',
          invoice_code,
          process_date,
          note,
          selectClassify,
          selectPayMent,
        });
        this.props.addInformationImport(params);
        this.props.navigation.navigate(IVN_IMPORT_CREATE_STEP_3, {
          isUpdate: this.props.navigation.getParam('isUpdate'),
        });
      }
    } else {
      Alert.alert('Nhà cung cấp trống');
    }
  };
  _renderButton = () => {
    return (
      <TouchableOpacity style={styles.buttonImport} onPress={() => this.ActionImport()}>
        <Text style={styles.txtFooter}>Tiếp tục</Text>
      </TouchableOpacity>
    );
  };
  render() {
    const { isFetching } = this.state;
    const { listProductBusiness, listProductDQG } = this.props;
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        <View style={styles.containerText}>
          <View>
            <Text style={styles.txt12}>Nhập thuốc</Text>
          </View>
          <View>
            <Text style={styles.txt12}>Phiếu nhập</Text>
          </View>
          <View>
            <Text style={styles.txt12}>Xác nhận</Text>
          </View>
        </View>
        <View style={styles.progress}>
          <View style={[styles.cricle, { backgroundColor: themes.colors.MAIN_COLOR }]}>
            <Text style={styles.txtProgress}>1</Text>
          </View>
          <View
            style={{
              width: '40%',
              backgroundColor:
                listProductBusiness.length > 0 || listProductDQG.length > 0
                  ? themes.colors.MAIN_COLOR
                  : themes.colors.BACKGROUND_COLOR,
              height: vw(2),
            }}
          />
          <View
            style={[
              styles.cricle,
              {
                backgroundColor:
                  listProductBusiness.length > 0 || listProductDQG.length > 0
                    ? themes.colors.MAIN_COLOR
                    : themes.colors.BACKGROUND_COLOR,
              },
            ]}
          >
            <Text style={styles.txtProgress}>2</Text>
          </View>
          <View style={{ width: '40%', height: vw(2), backgroundColor: themes.colors.BACKGROUND_COLOR }} />
          <View style={[styles.cricle, { backgroundColor: themes.colors.BACKGROUND_COLOR }]}>
            <Text style={styles.txtProgress}>3</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>{this._renderInformation()}</ScrollView>
        <View style={styles.wapperButton}>{this._renderButton()}</View>
        <ModalSelectProvider
          ref={node => (this.modalSelectedProvider = node)}
          onSelectProvider={this.onSelectProvider}
        />
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
