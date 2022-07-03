import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';
import { ICON_BACK, ICON_QR_CODE, ICON_SEARCH, ICON_CHECKED, MAIN_COLOR, ICON_CLOSE, themes } from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { MyStatusBar } from '../../elements/MyStatusBar';
import stylesGlobal from './AddNewOrder.style';
import vw from '../../utils/size-dynamic';
import HeaderBar from '../../elements/HeaderBar';
import ModalSelectedDrug from './ModalSelectedDrug';
import ItemProductPortfolio from '../../components/ItemProductPortfolio';
import LoaderIndicator from '../../elements/LoaderIndicator';
import { connect } from 'react-redux';
import { QR_CODE_SREEN, ADD_NEW_ORDER_STEP_TWO, ADD_NEW_ORDER } from '../../redux/types/';
import ImagePicker from 'react-native-image-crop-picker';
import { RNS3 } from 'react-native-aws3';
import ImageUpload from '../../screens/NewCreateScreen/ImageUpload';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment/moment';
import { Navigation } from '../../dataType';
import MoneyFormat from '../../utils/MoneyFormat';
import ModalNote from './ModalNote';
type Props = {
  navigation: Navigation;
};
type State = {
  nameDrug: string;
  totalAmount: number;
  nameCustomer: string;
  cod: boolean;
  phoneEdit: string;
  dataProductSelected: any;
  status: Boolean;
  modalVisible?: Boolean | undefined;
  dateStart: string;
  dateNowFilter: string;
  isFetching: Boolean;
  customer_code: any;
  index: any;
  openModalDrug: Boolean;
  isUpdateData: Number;
  discount: Number;
  note: string;
  item: any;
  listUrl: any;
  isLoadImage: Boolean;
  navigation: Boolean;
  amountDisconut: String;
  codeĐT: String;
  codeCSKCB: String;
  nameCSKCB: String;
  nameDoctor: String;
  notedrug: String;
  namePatient: String;
  agePatient: String;
  codePatient: String;
  nameSick: String;
  prescription: String;
  address3: String;
  img_url: string;
  flag: boolean;
};

class AddNewOrder extends PureComponent<Props, State> {
  modalSelectedDrug: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      nameDrug: '',
      totalAmount: 0,
      nameCustomer: this.props.navigation.getParam('customer_name'),
      cod: true,
      phoneEdit: this.props.navigation.getParam('customer_phone_no'),
      dataProductSelected: [],
      isFetching: false,
      customer_code: this.props.navigation.getParam('customer_code'),
      index: '',
      openModalDrug: false,
      isUpdateData: 1,
      status: true,
      codeĐT: '',
      codeCSKCB: '',
      nameCSKCB: '',
      nameDoctor: '',
      notedrug: '',
      namePatient: '',
      agePatient: '',
      codePatient: '',
      nameSick: '',
      modalVisible: false,
      item: [],
      prescription: '',
      discount: 0,
      note: '',
      isLoadImage: false,
      listUrl: [],
      dateStart: '',
      dateNowFilter: '',
      amountDisconut: '',
      navigation: true,
      address3: this.props.navigation.getParam('address3'),
      img_url: '',
      flag: false,
    };
  }

  componentDidMount() {
    var dateNow = Moment().format('DD/MM/YYYY');
    this.setState({ dateStart: dateNow, dateNowFilter: dateNow });
  }
  componentWillReceiveProps(nextProps: any) {
    const drugs = this.props.navigation.getParam('drugs', []);
    const nextDrugs = nextProps.navigation.getParam('drugs', []);
    if (drugs !== nextDrugs) {
      this.productSelected(nextDrugs);
    }
  }

  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }
  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={styles.buttonLeft} onPress={() => this.props.navigation.goBack()}>
        <Image source={themes.ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtLeft}>Thêm đơn hàng mới</Text>
      </TouchableOpacity>
    );
  }
  onPressSearch = () => {
    this.modalSelectedDrug.toggleModal(true);
  };
  QRCode = () => {
    this.props.navigation.navigate(QR_CODE_SREEN, { productSelected: this.productSelected, toScreen: ADD_NEW_ORDER });
  };
  _renderSearchBox() {
    return (
      <View style={styles.containerSearch}>
        <TouchableOpacity style={styles.buttonSearch} onPress={this.onPressSearch}>
          <Image source={themes.ICON_SEARCH} style={styles.iconSearch} />
          <Text style={styles.textSearch}>Tìm kiếm thuốc</Text>
          <TouchableOpacity style={stylesGlobal.butonQR} onPress={this.QRCode}>
            <Image source={themes.ICON_QR_CODE} style={styles.iconQRcode} resizeMode="contain" />
            <Text style={stylesGlobal.txtQR}>Quét mã</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }
  productSelected = (newListProduct: any) => {
    const { dataProductSelected } = this.state;
    const newListProductSelected = [...dataProductSelected, ...newListProduct];
    const filterSameProduct = newListProductSelected
      .map(e => e['drug_id'])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((e: any) => newListProductSelected[e])
      .map((e: any) => newListProductSelected[e]);
    this.countTotalAmount(filterSameProduct);
    this.setState({ dataProductSelected: filterSameProduct });
  };

  deletedProduct = (item: any) => {
    const newProductSelected = this.state.dataProductSelected.filter((product: any) => {
      if (item.drug_id !== product.drug_id) return true;
    });
    this.countTotalAmount(newProductSelected);
    this.setState({ dataProductSelected: newProductSelected });
  };
  inputDiscount = (txt: any) => {
    const { item, discount } = this.state;
    if (item.units[item.index_unit].price > discount) {
      this.setState({ discount: txt });
    } else {
      Alert.alert('Số tiền giảm giá không được lớn hơn giá sản phẩm');
      this.setState({ discount: 0 });
    }
  };
  discount = () => {
    this.setState({ flag: !this.state.flag });
  };
  renderModalNote = () => {
    const { item, note, discount, modalVisible, flag } = this.state;
    return (
      <Modal transparent={true} animationType={'slide'} visible={modalVisible}>
        <View style={stylesGlobal.backgroundModal}>
          <View style={stylesGlobal.ModalInsideView}>
            <TouchableOpacity
              hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
              style={stylesGlobal.buttonNote}
              onPress={() => this.setState({ modalVisible: false })}
            >
              <Image source={themes.ICON_CLOSE} style={stylesGlobal.iconClose} />
            </TouchableOpacity>
            <View style={{ marginTop: vw(10), alignItems: 'center' }}>
              <Text numberOfLines={1} style={stylesGlobal.txtNoteDrugName}>
                {item.drg_drug_name}
              </Text>
              <View style={stylesGlobal.containerModalNote}>
                <View style={stylesGlobal.txtModal}>
                  <Text style={stylesGlobal.txt12}>Hàng khuyến mãi</Text>
                </View>
                <View style={{ flex: 7 }}>
                  <TouchableOpacity style={[stylesGlobal.checkbox]} onPress={() => this.discount()}>
                    {!this.state.flag ? <Image source={ICON_CHECKED} style={stylesGlobal.iconCheckDiscount} /> : null}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={stylesGlobal.containerModalNote}>
                <View style={stylesGlobal.txtModal}>
                  <Text style={stylesGlobal.txt12}>Giảm giá</Text>
                </View>
                <TextInput
                  style={[stylesGlobal.textInputModal, { height: vw(40), paddingVertical: vw(10) }]}
                  placeholder="Nhập số tiền giảm giá"
                  value={discount.toString()}
                  keyboardType="numeric"
                  onChangeText={txt => this.inputDiscount(txt)}
                />
              </View>
              <View style={stylesGlobal.containerModalNote}>
                <View style={stylesGlobal.txtModal}>
                  <Text style={stylesGlobal.txt12}>Ghi chú</Text>
                </View>
                <TextInput
                  style={[stylesGlobal.textInputModal, { height: vw(70), textAlignVertical: 'top' }]}
                  multiline
                  placeholder="Nhập ghi chú cho sản phẩm"
                  value={note}
                  onChangeText={txt => this.setState({ note: txt })}
                />
              </View>
              <TouchableOpacity
                style={[stylesGlobal.buttonFilter, { borderRightColor: themes.colors.GRAY, borderRightWidth: 0.5 }]}
                onPress={() => this.updateNoteModal()}
              >
                <Text style={stylesGlobal.buttonAccpect}>Đồng ý</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  updateNoteModal = () => {
    const { item, dataProductSelected } = this.state;
    this.setState({ modalVisible: false });
    item.discount = Number(this.state.discount);
    item.dosage = this.state.note;
    this.setState({ discount: 0, dataProductSelected: [...dataProductSelected], note: '' });
    this.countTotalAmount(dataProductSelected);
  };
  modalNote = (item: any) => {
    if (item.units[item.index_unit].price === null) {
      Alert.alert('Vui lòng nhập giá trước khi nhập ghi chú');
    } else {
      this.setState({ item });
      this.modalNoteItem.toggleModal(true);
    }
  };
  countTotalAmount = (dataProductSelected: any) => {
    const newTotalAmountAfter = dataProductSelected.reduce(
      (a: any, item: any) =>
        a +
        item.units[item.index_unit].price * item['quantity'] -
        (item['discount'] !== undefined ? item['discount'] : 0),
      0,
    );
    const newTotalAmountFrist = dataProductSelected.reduce(
      (a: any, item: any) => a + item.units[item.index_unit].price * item['quantity'],
      0,
    );
    const disconutMoney = newTotalAmountFrist - newTotalAmountAfter;
    this.setState({ totalAmount: newTotalAmountAfter.toFixed(0), amountDisconut: disconutMoney.toFixed(0) });
  };
  updateQuantityProduct = (item: any, number: number) => {
    const { dataProductSelected } = this.state;
    dataProductSelected.forEach((product: any) => {
      if (product.drug_id === item.drug_id) product.quantity = Number(number);
    });
    this.countTotalAmount(dataProductSelected);
  };
  updatePriceProduct = (item: any, price: number) => {
    const { dataProductSelected } = this.state;
    dataProductSelected.forEach((product: any) => {
      if (product.drug_id === item.drug_id) product.price = Number(price);
    });
    this.setState({ dataProductSelected });
    this.countTotalAmount(dataProductSelected);
  };
  callTotalAmount = () => {
    this.countTotalAmount(this.state.dataProductSelected);
  };
  _renderListProduct = () => {
    const { totalAmount, dataProductSelected } = this.state;
    return (
      <View style={{ backgroundColor: themes.colors.BACKGROUND_COLOR }}>
        <View
          style={[
            stylesGlobal.viewRow,
            {
              paddingHorizontal: vw(10),
              height: vw(40),
              backgroundColor: themes.colors.BACKGROUND_COLOR,
              alignItems: 'center',
            },
          ]}
        >
          <Text style={stylesGlobal.txtListProduct}>Danh sách thuốc</Text>
          <Text style={stylesGlobal.txtTotalAmount}>{totalAmount !== 0 ? MoneyFormat(totalAmount) : null}</Text>
        </View>
        {this.renderModalNote()}
        {dataProductSelected && dataProductSelected.length > 0 ? (
          <FlatList
            // extraData={this.state}
            data={dataProductSelected}
            keyExtractor={(index: any) => index.toString()}
            renderItem={({ item, index }) => (
              <ItemProductPortfolio
                item={item}
                index={index}
                type={'ProductSelected'}
                deletedProduct={() => this.deletedProduct(item)}
                note={() => this.modalNote(item)}
                updateQuantity={this.updateQuantityProduct}
                updatePrice={this.updatePriceProduct}
                callTotalAmount={this.callTotalAmount}
                navigation={this.props.navigation}
              />
            )}
          />
        ) : (
          <View style={stylesGlobal.wapperDranger}>
            <Text style={stylesGlobal.txt12}>Chưa có sản phẩm được chọn</Text>
          </View>
        )}
      </View>
    );
  };
  removeImage = async (image: any) => {
    const newListUrl = await this.state.listUrl.filter((item: any) => {
      return item.url !== image.url;
    });
    this.setState({ listUrl: newListUrl });
  };

  uploadFile = async (image: any) => {
    return new Promise((resole, reject) => {
      const date = new Date();
      const file = {
        uri: image.path,
        name: `${date.getTime()}.png`,
        type: image.mime,
      };
      const options = {
        keyPrefix: 'uploads',
        bucket: 'medlinknews',
        region: 'ap-southeast-1',
        accessKey: 'AKIAIGK2LWAXNG77D4LQ',
        secretKey: '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',
        successActionStatus: 201,
      };
      RNS3.put(file, options).then((response: any) => {
        if (response.status !== 201) throw new Error('Failed to upload image to S3');
        const url = {
          url: response.body.postResponse.location,
          type_url: 'image',
        };
        const newListUrl = [...this.state.listUrl, ...[url]];
        this.setState({ listUrl: newListUrl });
        resole();
      });
    });
  };
  onPressCamera = () => {
    const { listUrl } = this.state;
    if (listUrl.length < 1) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        compressImageQuality: 0.3,
      }).then(async image => {
        await this.setState({ isLoadImage: true });
        await this.uploadFile(image);
        this.setState({ isLoadImage: false });
      });
    } else {
      Alert.alert('Tối đa cho phép upload 1 ảnh');
    }
  };
  onPressAddImage = () => {
    const { listUrl } = this.state;
    if (listUrl.length < 1) {
      ImagePicker.openPicker({
        multiple: true,
        maxFiles: 15,
        compressImageQuality: 0.3,
      }).then(async (images: any) => {
        await this.setState({ isLoadImage: true });
        for (const image of images) {
          await this.uploadFile(image);
        }
        this.setState({ isLoadImage: false });
      });
    } else {
      Alert.alert('Tối đa cho phép upload 1 ảnh');
    }
  };
  _renderImageDrug = () => {
    const {} = this.state;
    return (
      <View style={{ backgroundColor: themes.colors.BACKGROUND_COLOR }}>
        <View style={[stylesGlobal.wapperTitle, { flexDirection: 'row', alignItems: 'center' }]}>
          <Text style={stylesGlobal.txtListProduct}>Ảnh đơn thuốc</Text>
          <TouchableOpacity onPress={this.onPressCamera} style={stylesGlobal.buttonCamera}>
            <Entypo name="camera" size={vw(20)} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressAddImage} style={stylesGlobal.buttonCamera}>
            <FontAwesome name="photo" size={vw(20)} color="black" />
          </TouchableOpacity>
        </View>
        {this.state.listUrl.length !== 0 ? (
          <ImageUpload images={this.state.listUrl} removeImage={this.removeImage} />
        ) : (
          <View style={stylesGlobal.wapperDranger}>
            <Text style={stylesGlobal.txt12}>Chưa có hình ảnh được chọn</Text>
          </View>
        )}
      </View>
    );
  };
  _renderInfomation = (
    target: any,
    placeholder: string,
    height?: 30 | 60,
    multiline?: true | false,
    textAlignVertical?: 'top' | 'center',
  ) => {
    const text = this.state[target];
    return (
      <View>
        <TextInput
          style={[
            stylesGlobal.textInputInfomation,
            {
              height,
              textAlignVertical,
            },
          ]}
          placeholder={placeholder}
          value={text}
          multiline={multiline}
          onChangeText={text => {
            this.setState({ [target]: text });
          }}
        />
        {text && text.length !== 0 ? null : <Text style={stylesGlobal.txtDanger}>*</Text>}
      </View>
    );
  };
  _renderDatePicker = () => {
    const { dateStart, dateNowFilter } = this.state;
    return (
      <View style={{ justifyContent: 'center', marginVertical: vw(5) }}>
        <DatePicker
          androidMode="spinner"
          style={{ width: '100%' }}
          date={dateStart}
          mode="date"
          maxDate={dateNowFilter}
          placeholder="Ngày kê đơn"
          format="DD/MM/YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={true}
          customStyles={{
            dateIcon: {
              position: 'absolute',
              right: 0,
              top: 10,
              marginLeft: 0,
            },
            dateInput: {
              borderRadius: vw(5),
              marginTop: vw(10),
              height: vw(30),
            },
            dateText: {
              fontSize: vw(14),
            },
          }}
          onDateChange={(date: string) => {
            this.setState({ dateStart: date });
          }}
        />
      </View>
    );
  };
  _renderViewInfomationPrescription = () => {
    const { status } = this.state;
    return (
      <View>
        {!status ? (
          <View style={stylesGlobal.wapperViewInfo}>
            {this._renderInfomation('codeĐT', 'Mã ĐT')}
            {this._renderInfomation('codeCSKCB', 'Mã CSKCB')}
            {this._renderInfomation('nameCSKCB', 'Tên CSKCB')}
            {this._renderInfomation('nameDoctor', 'BS kê đơn')}
            {this._renderDatePicker()}
            {this._renderInfomation('notedrug', 'Ghi chú chuẩn đoán', vw(60), true, 'top')}
            <Text style={stylesGlobal.titleTxtInfomation}>Thông tin bệnh nhân</Text>
            {this._renderInfomation('namePatient', 'Tên bệnh nhân')}
            {this._renderInfomation('agePatient', 'Tuổi bệnh nhân')}
            {this._renderInfomation('codePatient', 'Mã bệnh nhân')}
            {this._renderInfomation('nameSick', 'Tên bệnh')}
            {this._renderInfomation('address3', 'Địa chỉ', 60, true, 'top')}
          </View>
        ) : null}
      </View>
    );
  };
  nextStepTwo = async () => {
    const { dataProductSelected, totalAmount } = this.state;
    await dataProductSelected.forEach((product: any) => {
      if (product.units[product.index_unit].price === null) {
        Alert.alert('Vui lòng nhập giá cho sản phẩm');
        this.setState({ navigation: false });
      } else {
        this.setState({ navigation: true });
      }
    });
    const {
      listUrl,
      codeĐT,
      codeCSKCB,
      nameCSKCB,
      nameDoctor,
      dateStart,
      namePatient,
      agePatient,
      codePatient,
      nameSick,
      address3,
      notedrug,
      nameCustomer,
      phoneEdit,
      customer_code,
      status,
      amountDisconut,
      navigation,
      img_url,
    } = this.state;
    const data = {
      listUrl,
      dataProductSelected,
      totalAmount,
      codeĐT,
      codeCSKCB,
      nameCSKCB,
      nameDoctor,
      dateStart,
      namePatient,
      agePatient,
      codePatient,
      nameSick,
      address3,
      notedrug,
      nameCustomer,
      phoneEdit,
      customer_code,
      status,
      amountDisconut,
      navigation,
      img_url,
    };
    if (navigation === true) {
      if (dataProductSelected.length > 0) {
        if (status === false) {
          if (
            codeĐT.length > 0 &&
            codeCSKCB.length > 0 &&
            nameCSKCB.length > 0 &&
            nameDoctor.length > 0 &&
            notedrug.length > 0 &&
            namePatient.length > 0 &&
            agePatient.length > 0 &&
            codePatient.length > 0 &&
            nameSick.length > 0 &&
            address3.length > 0
          ) {
            this.props.navigation.navigate(ADD_NEW_ORDER_STEP_TWO, { data: data });
          } else {
            Alert.alert('Các trường thông tin kê toa không được trống');
          }
        } else {
          this.props.navigation.navigate(ADD_NEW_ORDER_STEP_TWO, { data: data });
        }
      } else {
        Alert.alert('Chưa có sản phẩm được chọn');
      }
    }
  };
  item = e => {
    const { dataProductSelected } = this.state;
    this.setState({ dataProductSelected: Array.from(new Set([...dataProductSelected, e])) });
    this.countTotalAmount(dataProductSelected);
  };
  render() {
    const { status } = this.state;
    return (
      <View style={stylesGlobal.container}>
        <MyStatusBar />
        {this._renderHeader()}
        <View style={{ flex: 9 }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={stylesGlobal.wapper}>
            {this._renderSearchBox()}
            {this._renderListProduct()}
            {this._renderImageDrug()}
            <TouchableOpacity
              style={[
                stylesGlobal.wapperTitle,
                { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
              ]}
              onPress={() => this.setState({ status: !status })}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.buttonCheck}>
                  {!status && <Image source={themes.ICON_CHECKED} style={styles.iconCheck} />}
                </View>
                <Text style={stylesGlobal.txtListProduct}>Thông tin kê toa</Text>
              </View>

              {status ? (
                <Ionicons name="ios-arrow-forward" size={20} color="black" />
              ) : (
                <Ionicons name="ios-arrow-down" size={20} color="black" />
              )}
            </TouchableOpacity>
            {this._renderViewInfomationPrescription()}
          </ScrollView>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={stylesGlobal.buttonFooter} onPress={this.nextStepTwo}>
            <Text style={stylesGlobal.txtButtonAdd}>Tiếp theo</Text>
          </TouchableOpacity>
        </View>
        <ModalSelectedDrug
          ref={(node: any) => (this.modalSelectedDrug = node)}
          productSelected={this.productSelected}
        />
        <ModalNote ref={(node: any) => (this.modalNoteItem = node)} item={this.state.item} itemEdit={this.item} />
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
  };
}
export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true },
)(AddNewOrder);

const styles = StyleSheet.create({
  // style search
  containerSearch: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSearch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.BACKGROUND_BOX_INPUT,
    borderRadius: vw(5),
    margin: vw(10),
    paddingHorizontal: vw(10),
    height: vw(40),
  },
  iconSearch: {
    width: vw(21),
    height: vw(21),
    resizeMode: 'contain',
  },
  textSearch: {
    color: themes.colors.PLACEHOLDER_INPUT,
    height: vw(40),
    flex: 1,
    paddingVertical: vw(10),
    fontSize: vw(14),
  },
  iconQRcode: {
    width: vw(20),
    height: vw(20),
    tintColor: themes.colors.MAIN_COLOR,
    justifyContent: 'center',
  },
  buttonCheck: {
    width: vw(15),
    height: vw(15),
    backgroundColor: themes.colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vw(3),
    marginRight: vw(8),
    borderColor: themes.colors.MAIN_COLOR,
    borderWidth: 1,
  },
  iconCheck: {
    width: vw(10),
    height: vw(10),
    resizeMode: 'contain',
  },
  iconBack: {
    width: vw(11),
    height: vw(20),
    resizeMode: 'contain',
    marginRight: vw(10),
  },
  buttonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtLeft: {
    fontSize: vw(18),
    fontFamily: themes.fontFamily.fontFamily,
    fontWeight: 'bold',
    color: themes.colors.WHITE,
  },
});
