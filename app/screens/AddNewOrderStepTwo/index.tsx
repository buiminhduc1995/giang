import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView } from 'react-native';
import styles from './AddNewOrderStepTwo.style';
import { MyStatusBar } from '../../elements/MyStatusBar';
import HeaderBar from '../../elements/HeaderBar';
import { connect } from 'react-redux';
import { themes } from '../../constants';
import ModalSelectedCustomer from './ModalSelectedCustomer';
import API from '../../api';
import LoaderIndicator from '../../elements/LoaderIndicator';
import { DETAIL_PRODUCT_SCREEN, MANAGER_INVOICE_SCREEN } from '../../redux/types/';
import MoneyFormat from '../../utils/MoneyFormat';
import EventBus from '../../utils/EventBus';
import { Navigation } from '../../dataType/index.d';
import { html } from '../InvoiceDetail/renderHTML';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { RNS3 } from 'react-native-aws3';
import ModalDropdown from 'react-native-modal-dropdown';
const methodDiscount = ['VNĐ', '%'];
type State = {
  cod: boolean;
  phoneEdit: string;
  nameCustomer: string;
  customer_code: string;
  address: string;
  totalAmount: number;
  guestPay: string;
  excessCash: string;
  status: number;
  isFetching: boolean;
  dataProductSelected: any;
  vn_pay: boolean;
  isPrint: boolean;
  selectMedthodDiscount: string;
  discountInvoice: number;
  valueDiscount: string;
};
type Props = {
  navigation: Navigation;
  token: any;
  info: any;
  store: any;
  infoPartnerVNPAY: any;
};
class AddNewOrderStepTwo extends PureComponent<Props, State> {
  modalSelectedCustomer: any;
  constructor(props: Props) {
    super(props);
    const data = this.props.navigation.getParam('data');
    this.state = {
      phoneEdit: data.phoneEdit ? data.phoneEdit : '',
      nameCustomer: data.nameCustomer ? data.nameCustomer : '',
      customer_code: data.customer_code ? data.customer_code : '',
      cod: true,
      vn_pay: false,
      address: data.address ? data.address : '',
      totalAmount: data.totalAmount ? data.totalAmount : '',
      guestPay: '',
      excessCash: '',
      status: 1,
      isFetching: false,
      dataProductSelected: data.dataProductSelected,
      isPrint: false,
      selectMedthodDiscount: methodDiscount[0],
      discountInvoice: 0,
      valueDiscount: '',
    };
  }

  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }

  _renderHeaderLeft() {
    const { navigation } = this.props;
    return (
      <TouchableOpacity style={styles.buttonLeft} onPress={() => navigation.goBack()}>
        <Image source={themes.ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtHeader}>Thêm đơn hàng mới</Text>
      </TouchableOpacity>
    );
  }

  onPressSearchPhone = () => {
    this.modalSelectedCustomer.toggleModal(true);
  };

  onSelectCustomer = (dataCustomer: any) => {
    this.setState({
      phoneEdit: dataCustomer.phone,
      nameCustomer: dataCustomer.name,
      customer_code: dataCustomer.customer_code,
      address: dataCustomer.address,
    });
  };

  _renderSearchPhone = () => {
    return (
      <View style={styles.containerSearch}>
        <TouchableOpacity style={styles.buttonSearch} onPress={this.onPressSearchPhone}>
          <Image source={themes.ICON_SEARCH} style={styles.iconSearch} />
          <Text style={styles.textSearch}>Tìm kiếm số điện thoại</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderOptionCheckBox = () => {
    const option = [
      {
        id: 1,
        title: 'Cá nhân',
      },
      {
        id: 2,
        title: 'Công ty',
      },
      {
        id: 3,
        title: 'Vãng lai',
      },
    ];
    return <View style={styles.containerCheckbox}>{option.map(item => this._renderCheckBox(item))}</View>;
  };

  change = (id: any) => {
    if (this.state.status === 0 || (this.state.status !== 0 && this.state.status !== id)) {
      this.setState({
        status: id,
      });
    }
  };

  _renderCheckBox = (item: any) => {
    const { id, title } = item;
    return (
      <TouchableOpacity key={item.id} onPress={() => this.change(id)}>
        <View style={styles.wapperButtonCheck}>
          <View style={styles.buttonCheck}>
            {this.state.status === id && <Image source={themes.ICON_CHECKED} style={styles.iconCheck} />}
          </View>
          <Text style={styles.txtCOD}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  editGuestPay = (txt: string) => {
    this.setState({ guestPay: txt });
  };

  mathMoney = () => {
    const { guestPay, totalAmount } = this.state;
    if (Number(guestPay) > totalAmount) {
      console.log('ok');
    } else {
      Alert.alert('Số tiền phải lớn hơn hoặc bằng tống số tiền đơn hàng');
    }
  };

  checkAmount = () => {
    const { totalAmount } = this.state;
    if (Number(totalAmount) > 100000) {
      this.setState({ vn_pay: true, cod: false });
    } else {
      Alert.alert('Thông báo', 'Số tiền tối thiểu lớn hơn 100.000đ');
    }
  };

  _onSelect = (idx: number, value: string) => {
    this.setState({ selectMedthodDiscount: value, discountInvoice: 0, valueDiscount: '' });
  };

  textDiscountByInvoice = (txt: string) => {
    const { selectMedthodDiscount } = this.state;
    if (selectMedthodDiscount === 'VNĐ') {
      this.setState({ discountInvoice: Number(txt), valueDiscount: txt });
    }
    if (selectMedthodDiscount === '%' && Number(txt) <= 100) {
      this.setState({ valueDiscount: txt, discountInvoice: (this.state.totalAmount * Number(txt)) / 100 });
    }
  };

  _renderPayment = () => {
    const {
      guestPay,
      cod,
      vn_pay,
      totalAmount,
      isPrint,
      discountInvoice,
      selectMedthodDiscount,
      valueDiscount,
    } = this.state;
    const { infoPartnerVNPAY } = this.props;
    return (
      <View style={styles.backgroundPayment}>
        <View style={[styles.row]}>
          <TouchableOpacity onPress={() => this.setState({ vn_pay: false, cod: true })}>
            <View style={styles.wapperButtonCheck}>
              <View style={styles.buttonCheck}>
                {this.state.cod && <Image source={themes.ICON_CHECKED} style={styles.iconCheck} />}
              </View>
              <Text style={styles.txtCOD}>COD (Thanh toán tiền mặt)</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonVNPay} onPress={() => this.setState({ isPrint: !isPrint })}>
            <View style={styles.wapperButtonCheck}>
              <View style={styles.buttonCheck}>
                {this.state.isPrint && <Image source={themes.ICON_CHECKED} style={styles.iconCheck} />}
              </View>
              <Text style={styles.txtCOD}>In hóa đơn</Text>
            </View>
          </TouchableOpacity>
        </View>
        {cod &&
          this._renderInformation(
            'Khách trả',
            'Nhập số tiền khách trả',
            this.mathMoney,
            guestPay,
            'numeric',
            true,
            (txt: string) => this.editGuestPay(txt),
            false,
          )}
        {cod &&
          this._renderInformation(
            'Trả lại',
            'Nhập số tiền trả lại khách',
            this.onSubmit,
            Number(guestPay) - totalAmount + discountInvoice < 0
              ? '0'
              : MoneyFormat(Number(guestPay) - totalAmount + discountInvoice),
            'numeric',
            false,
            () => {},
            false,
          )}
        <View style={[styles.row, { flex: 1 }]}>
          <View style={[styles.buttonVNPay, { flex: 3 }]}>
            <Text style={styles.txt14}>Giảm giá{'\n'}hóa đơn</Text>
          </View>
          <View style={[styles.row, { flex: 7 }]}>
            <TextInput
              placeholder={selectMedthodDiscount === 'VNĐ' ? 'Nhập số tiền' : 'Nhập số phần trăm'}
              value={valueDiscount}
              onChangeText={(txt: string) => this.textDiscountByInvoice(txt)}
              style={styles.inputDiscountByInvoice}
            />
            <ModalDropdown
              options={Object.values(methodDiscount)}
              defaultValue={methodDiscount[0]}
              defaultIndex={0}
              dropdownStyle={[styles.styleModal, { height: methodDiscount.length > 4 ? 'auto' : -1 }]}
              dropdownTextStyle={styles.dropdownTextStyle}
              onSelect={(idx: number, value: any) => this._onSelect(idx, value)}
            >
              <View style={styles.wapperQuanlityDrug}>
                <Text style={styles.txtModal}>{selectMedthodDiscount}</Text>
                <Image source={themes.ICON_CARET_DOWN} style={styles.iconCaretDown} />
              </View>
            </ModalDropdown>
          </View>
        </View>
        {/* {infoPartnerVNPAY && infoPartnerVNPAY.length !== 0 && (
          <TouchableOpacity style={styles.buttonVNPay} onPress={() => this.checkAmount()}>
            <View style={styles.wapperButtonCheck}>
              <View style={styles.buttonCheck}>
                {this.state.vn_pay && <Image source={themes.ICON_CHECKED} style={styles.iconCheck} />}
              </View>
              <Text style={styles.txtCOD}>Thanh toán qua VN Pay</Text>
            </View>
          </TouchableOpacity>
        )} */}
      </View>
    );
  };
  _renderInformation = (
    text: any,
    placeholder: string,
    onSubmitEditing: () => void,
    value?: string,
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad',
    editable?: boolean,
    onChangeText?: (text: string) => void,
  ) => {
    return (
      <View style={[styles.waperLayout, { alignItems: 'center' }]}>
        <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.txt14}>{text}</Text>
        </View>
        <View style={styles.informationFlex}>
          <TextInput
            editable={editable}
            style={styles.textInput}
            placeholder={placeholder}
            value={value}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
          />
        </View>
      </View>
    );
  };
  searchAPIPhone = () => {
    const { phoneEdit } = this.state;
    const { info, store, token } = this.props;
    if (phoneEdit.toString().length >= 10) {
      const data = {
        drg_store_id: info.drg_store_id,
        phone_no: phoneEdit,
        company_code: store.company_code,
      };
      API.customerApi
        .getCustomer(data, token)
        .then((res: any) => {
          if (res.data.data[0]['customer_name'].length > 0) {
            this.setState({
              nameCustomer: res.data.data[0]['customer_name'],
              customer_code: res.data.data[0]['customer_code'],
              address: res.data.data[0]['address1'],
            });
          }
        })
        .catch((err: any) => {
          console.log(err);
          this.setState({ customer_code: '' });
        });
    } else {
      Alert.alert('Số điện thoại dưới 10 ký tự');
    }
  };
  editPhone = (txt: number) => {
    this.setState({ phoneEdit: txt });
  };
  editCustomer = (txt: string) => {
    this.setState({ nameCustomer: txt });
  };
  editAddress = (txt: string) => {
    this.setState({ address: txt });
  };
  onSubmit = () => {};
  _renderInfoView = () => {
    const { phoneEdit, nameCustomer, address, status } = this.state;
    return (
      <View style={{ padding: 10, backgroundColor: themes.colors.WHITE }}>
        {this._renderInformation(
          'Số ĐT',
          'Nhập số điện thoại',
          this.searchAPIPhone,
          phoneEdit,
          'phone-pad',
          status !== 3 ? true : false,
          (txt: any) => this.editPhone(txt),
          true,
        )}
        {this._renderInformation(
          'Tên KH',
          'Nhập tên khách hàng',
          this.onSubmit,
          nameCustomer,
          'default',
          status !== 3 ? true : false,
          (txt: any) => this.editCustomer(txt),
          true,
        )}
        {this._renderInformation(
          'Địa chỉ',
          'Nhập địa chỉ',
          this.onSubmit,
          address,
          'default',
          status !== 3 ? true : false,
          (txt: any) => this.editAddress(txt),
          true,
        )}
      </View>
    );
  };
  _renderFooter = () => {
    const { totalAmount, vn_pay, ok, discountInvoice, selectMedthodDiscount, valueDiscount } = this.state;
    return (
      <View style={styles.containerFooter}>
        <View>
          <Text style={styles.txt14}>Tổng cộng</Text>
          <Text style={styles.amountMoney}>{MoneyFormat(totalAmount - discountInvoice)}</Text>
        </View>
        <TouchableOpacity
          onPress={this.createInvoice}
          style={[styles.createInvoice, { backgroundColor: themes.colors.MAIN_COLOR }]}
        >
          <Text style={styles.txtCreateInvoice}>Tạo đơn</Text>
        </TouchableOpacity>
      </View>
    );
  };
  createCustomer = async () => {
    try {
      const { phoneEdit, nameCustomer, address } = this.state;
      const { info, token } = this.props;
      const params = {
        drg_store_id: info.drg_store_id,
        customer_name: nameCustomer,
        customer_type: '1',
        customer_group_cd: 'CGRP000001',
        customer_group_name: 'Khách lẻ',
        avatar_url: null,
        birthday: '',
        sex: 'M',
        phone_no: phoneEdit,
        email: '',
        facebook_id: null,
        prefecture: null,
        city: '',
        district: null,
        address1: address,
        address2: null,
        zipcode: null,
        conv_code: null,
        source: 'SOURCE_TEL',
        note: '',
        updated_user: info.full_name,
      };
      const res = await API.customerApi.createCustomer(params, token);
      this.setState({ customer_code: res.data.customer_code });
    } catch (error) {
      console.log(error);
    }
  };
  updatePriceForOneItem = async (product: any) => {
    const {} = this.state;
    const { info, store, token } = this.props;
    try {
      const params = {
        drug_id: product.drug_id,
        drg_store_id: info.drg_store_id,
        drg_store_code: info.drg_store_code.toString(),
        drg_drug_cd: product.drg_drug_cd.toString(),
        drg_drug_name: product.drg_drug_name.toString(),
        price: product.units[product.index_unit].price,
        price_before_vat: product.units[product.index_unit].price,
        unit: product.units[product.index_unit].unit_cd,
        unit_name: product.units[product.index_unit].unit_name,
        updated_user: info.full_name,
      };
      const res = API.productApi.updatePriceProduct(params, token);
    } catch (error) {
      console.log(error);
    }
  };

  updatePrice = async () => {
    const { dataProductSelected } = this.state;
    const {} = this.props;
    dataProductSelected.forEach((product: any) => {
      if (product.units[product.index_unit].isUpdate === true) {
        this.updatePriceForOneItem(product);
      }
    });
  };

  _printInvoice = async () => {
    const { totalAmount, nameCustomer, dataProductSelected, discountInvoice } = this.state;
    const { info, store } = this.props;
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    const create_date = date + '/' + month + '/' + year;
    const dataParams = this.props.navigation.getParam('data');
    const info_invoice = {
      store: info.full_name,
      address: store.address1,
      phone: store.phone_no,
      customer: nameCustomer ? nameCustomer : 'Khách vãng lai',
      //invoiceID: data.invoice_code,
      created_at: create_date,
      total: Number(totalAmount) + Number(dataParams.amountDisconut),
      amount: totalAmount - discountInvoice,
    };
    const listDrug = new Array<any>();
    await dataProductSelected.map((e: any) => {
      const temp = {
        drg_drug_name: e.drg_drug_name,
        price: e.units[e.index_unit].price.toString(),
        quantity: e.quantity.toString(),
        unit_name: e.units[e.index_unit].unit_name,
        dosage: e.dosage,
      };
      listDrug.push(temp);
    });
    const htmlString = await html(info_invoice, listDrug);
    const results = await RNHTMLtoPDF.convert({
      html: htmlString,
      fileName: 'invoice',
    });
    return this._uploadFile(results);
  };

  _uploadFile = async (data: any) => {
    try {
      const date = new Date();
      const file = {
        uri: `file://${data.filePath}`,
        name: `${date.getTime()}.pdf`,
        type: 'document/pdf',
      };
      const options = {
        keyPrefix: 'HOA_DON_MUA_THUOC',
        bucket: 'medlinknews',
        region: 'ap-southeast-1',
        accessKey: 'AKIAIGK2LWAXNG77D4LQ',
        secretKey: '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',
        successActionStatus: 201,
      };
      const response = await RNS3.put(file, options);
      if (response.status !== 201) throw new Error('Failed to upload image to S3');
      return response.body.postResponse.location;
    } catch (error) {
      Alert.alert('Thông báo', 'Không thể upload dữ liệu, kiểm tra internet');
    }
  };

  apiCreateInvoice = async () => {
    const {
      totalAmount,
      nameCustomer,
      phoneEdit,
      dataProductSelected,
      customer_code,
      discountInvoice,
      isPrint,
      guestPay,
    } = this.state;
    const { info, store, navigation } = this.props;
    const dataParams = navigation.getParam('data');
    const products = dataProductSelected.map((product: any) => {
      const newProduct = {
        drug_id: product.drug_id.toString(),
        drg_drug_cd: product.drg_drug_cd,
        lot: product.lot,
        drg_drug_name: product.drg_drug_name,
        quantity: product.quantity.toString(),
        price: product.units[product.index_unit].price.toString(),
        dosage: product.dosage,
        discount: product.discount,
        unit_cd: product.units[product.index_unit].unit_cd,
        unit_name: product.units[product.index_unit].unit_name,
        drg_store_id: info.drg_store_id.toString(),
        drg_store_code: info.drg_store_code,
        promotion_flg: '0',
      };
      return newProduct;
    });
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    const issue_datetime = date + '/' + month + '/' + year;
    const url_file = isPrint ? await this._printInvoice() : null;
    const amount = totalAmount - discountInvoice;
    const amount_paid = Number(guestPay) - amount > 0 ? amount : Number(guestPay);
    this.setState({ isFetching: true });
    const params = {
      info: {
        note: 'Ban cho khach hang',
        drg_store_id: info.drg_store_id,
        drg_store_code: info.drg_store_code,
        import_store_name: store.drg_name,
        updated_user: info.full_name,
        updated_user_id: info.login_id,
        export_type: 'ORD',
      },
      products,
      invoice: {
        invoice_type: '0',
        amount: amount.toString(),
        amount_paid: amount_paid.toString(),
        amount_debt: (amount - amount_paid).toString(),
        discount_amount: discountInvoice,
        currency: 'VND',
        pay_method: 'CS',
        status: '2',
        note: '',
        customer_code: customer_code,
        customer_name: nameCustomer,
        pay_reference: '',
        customer_phone_no: phoneEdit,
        ecoin_minus: '0',
        ecoin_plus: '0',
        issue_datetime: issue_datetime,
        img_url: dataParams.listUrl.length > 0 ? dataParams.listUrl[0].url : '',
        invoice_img: url_file,
      },
      prescription: {
        pres_code: dataParams.codeĐT ? dataParams.codeĐT : '',
        clinic_code: dataParams.codeCSKCB ? dataParams.codeCSKCB : '',
        clinic_name: dataParams.nameCSKCB ? dataParams.nameCSKCB : '',
        pres_doctor: dataParams.nameDoctor ? dataParams.nameDoctor : '',
        pres_date: dataParams.dateStart ? dataParams.dateStart : '',
        pres_note: dataParams.notedrug ? dataParams.notedrug : '',
        patient_name: dataParams.namePatient ? dataParams.namePatient : '',
        patient_age: dataParams.agePatient ? dataParams.agePatient : '',
        disease_code: dataParams.codePatient ? dataParams.codePatient : '',
        disease_name: dataParams.nameSick ? dataParams.nameSick : '',
        patient_address: dataParams.address ? dataParams.address : '',
      },
      prescription_flg: !dataParams.status === true ? 'true' : 'false',
      company_code: store.company_code,
    };
    await this.setState({ isFetching: true });
    API.invoiceApi
      .createInvoice(params)
      .then((res: any) => {
        if (res.status === 200) {
          this.setState({ isFetching: false });
          EventBus.fireEvent('CreateInvoiceSucces');
          Alert.alert('Thông báo', 'Tạo đơn hàng thành công', [
            {
              text: 'Đồng ý',
              onPress: () =>
                navigation.replace(DETAIL_PRODUCT_SCREEN, {
                  id: res.data.invoice_code.replace('INV', ''),
                  nameCustomer: res.data.customer_name,
                  screen: MANAGER_INVOICE_SCREEN,
                  vn_pay: this.state.vn_pay,
                }),
            },
          ]);
        } else {
          this.setState({ isFetching: false });
          Alert.alert('Tạo đơn hàng thất bại');
        }
      })
      .catch((err: any) => {
        Alert.alert('Thông báo', 'Tạo đơn hàng thất bại');
        this.setState({ isFetching: false });
        console.log(err);
      });
  };
  askCreateInvoive = () => {
    Alert.alert(
      'Thông báo',
      'Bạn có muốn tạo đơn',
      [{ text: 'Hủy' }, { text: 'Đồng ý', onPress: () => this.apiCreateInvoice() }],
      { cancelable: false },
    );
  };

  createInvoice = async () => {
    const { customer_code, status, phoneEdit, nameCustomer, address } = this.state;
    if (status !== 3) {
      if (customer_code.length === 0) {
        if (phoneEdit && nameCustomer && address) {
          await this.createCustomer();
          await this.updatePrice();
          this.askCreateInvoive();
        } else {
          Alert.alert('Các trường khách hàng không được trống');
        }
      } else {
        await this.updatePrice();
        this.askCreateInvoive();
      }
    } else if (status === 3) {
      await this.setState({ customer_code: '', nameCustomer: 'Khách vãng lai' });
      await this.updatePrice();
      this.askCreateInvoive();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, backgroundColor: themes.colors.BACKGROUND_BOX_INPUT }}
        >
          <View style={styles.wapperTitle}>
            <Text style={styles.txtListProduct}>Khách hàng</Text>
          </View>
          {this._renderSearchPhone()}
          {this.renderOptionCheckBox()}
          {this._renderInfoView()}
          <ModalSelectedCustomer
            ref={node => (this.modalSelectedCustomer = node)}
            onSelectCustomer={this.onSelectCustomer}
          />
          <View style={styles.wapperTitle}>
            <Text style={styles.txtListProduct}>Thanh toán</Text>
          </View>
          {this._renderPayment()}
        </ScrollView>
        {this._renderFooter()}
        <LoaderIndicator loading={this.state.isFetching} />
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    store: state.user.dataUser.store,
    token: state.user.token,
    infoPartnerVNPAY: state.dataPersist.infoPartnerVNPAY,
  };
}
export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true },
)(AddNewOrderStepTwo);
