import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput,
} from 'react-native';
import { ICON_BACK, ICON_CHECKED, ICON_CLOSE, themes, IMAGE_DRUG, ICON_CARET_DOWN } from '../../constants';
import { MyStatusBar } from '../../elements/MyStatusBar';
import styles from './InvoiceDetail.style';
import vw from '../../utils/size-dynamic';
import HeaderBar from '../../elements/HeaderBar';
import API from '../../api/';
import LoadContent from '../../elements/LoadContent';
import { ShineOverlay } from 'rn-placeholder';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { html } from './renderHTML';
import { RNS3 } from 'react-native-aws3';
import { INVOICE_PRINTER, PRODUCT_DETAIL_SCREEN } from '../../navigation/screen_name';
import { Navigation } from '../../dataType';
import MoneyFormat from '../../utils/MoneyFormat';
import { Invoice_Detail, DetailDrug } from '../../dataType/Invoice';
import { connect } from 'react-redux';
import ImageView from 'react-native-image-view';
import QRCode from 'react-native-qrcode-svg';
import api from '../../api/';
import ItemDynamic from '../../elements/ItemDynamic/';
import ItemDetailDrug from '../../components/ItemDetailDrug/';
type Props = {
  info: any;
  store: any;
  navigation: Navigation;
  infoPartnerVNPAY: any;
};
type State = {
  data: Invoice_Detail;
  totalAmount: number;
  cod: boolean;
  phone: number;
  name: string;
  isFetching: boolean;
  isLoadMore: boolean;
  isImageViewVisible: boolean;
  imageShowView: any;
  imageIndex: any;
  image: string;
  isPrinting: boolean;
  modalVisible: boolean;
  codeQR: string;
  partnerVNpay?: boolean;
};

class InvoiceDetail extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: {} as Invoice_Detail,
      totalAmount: 0,
      cod: true,
      phone: 0,
      name: this.props.navigation.getParam('nameCustomer'),
      isFetching: false,
      isLoadMore: false,
      imageShowView: [],
      imageIndex: 0,
      isImageViewVisible: false,
      image: '',
      isPrinting: false,
      modalVisible: false,
      codeQR: '',
    };
  }

  componentDidMount() {
    this._initData();
  }
  genQRVNPay = async () => {
    const { info, navigation } = this.props;
    try {
      const param = {
        storeId: info.drg_store_id.toString(),
        accountId: info.account_id.toString(),
        invoiceId: navigation.getParam('id').toString(),
        amount: this.state.totalAmount.toString(),
      };
      const res = await api.payVNpay.renderQRcode(param);
      if (res.data.status === 200) {
        this.setState({ modalVisible: true, codeQR: res.data.data.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
  _initData = async () => {
    const { navigation } = this.props;
    await this.setState({ isLoadMore: true, isFetching: true });
    try {
      const res = await API.invoiceApi.getDetailInvoice(navigation.getParam('id'));
      await this.setState({
        data: res.data,
        phone: res.data.cashflow !== null ? res.data.cashflow.wallet_id : '',
        isFetching: false,
        totalAmount: res.data.amount,
        image: res.data.img_url,
        imageShowView: [
          {
            height: 1440,
            source: { uri: res.data.img_url },
            width: 1440,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isFetching: false });
    }
  };

  _printInvoice = async () => {
    const { data, name } = this.state;
    const { info, store } = this.props;
    const info_invoice = {
      store: info.full_name,
      address: store.address1,
      phone: store.phone_no,
      customer: name ? name : 'Khách vãng lai',
      invoiceID: data.invoice_code,
      created_at: data.details[0].updated_date,
      discount: data.discount_amount,
      amount: data.amount,
    };
    const listDrug = new Array<any>();
    this.setState({ isPrinting: true });
    data.details.map((e: DetailDrug) => {
      const temp = {
        drg_drug_name: e.drg_drug_name,
        price: e.price,
        quantity: e.quantity,
        unit_name: e.unit_name,
        dosage: e.dosage,
      };
      listDrug.push(temp);
    });
    const htmlString = await html(info_invoice, listDrug);
    const results = await RNHTMLtoPDF.convert({
      html: htmlString,
      fileName: 'invoice',
    });
    if (data.invoice_img) {
      this.setState({ isPrinting: false });
      this.props.navigation.navigate(INVOICE_PRINTER, {
        filePath: results.filePath,
        uri: data.invoice_img,
      });
    } else this._uploadFile(results);
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
      this.setState({ isPrinting: false });
      if (response.status !== 201) throw new Error('Failed to upload image to S3');
      this.props.navigation.navigate(INVOICE_PRINTER, {
        filePath: data.filePath,
        uri: response.body.postResponse.location,
      });
    } catch (error) {
      Alert.alert('Thông báo', 'Không thể upload dữ liệu, kiểm tra internet');
    }
  };

  _renderLoading = () => {
    return <ActivityIndicator size={'large'} style={styles.containerLoading} animating={true} />;
  };

  _navigate = () => {
    const { navigation } = this.props;
    navigation.navigate(navigation.getParam('screen'));
  };

  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} right={this._renderHeaderRight()} />;
  }

  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={styles.wapperHederLeft} onPress={this._navigate}>
        <Image source={themes.ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtDetail}>Chi tiết đơn hàng</Text>
      </TouchableOpacity>
    );
  }

  _renderHeaderRight() {
    return (
      <TouchableOpacity style={styles.wapperHederRight} onPress={this._printInvoice}>
        <Text style={styles.txtHeaderRight}>In hóa đơn</Text>
      </TouchableOpacity>
    );
  }

  _renderInformation = () => {
    return (
      <View style={styles.wrapperInfo}>
        <View style={[styles.wapperLayout, { alignItems: 'center' }]}>
          <View style={{ flex: 3 }}>
            <Text style={styles.txt12}>Số điện thoại</Text>
          </View>
          <View style={styles.wapperTxtInfo}>
            <Text style={styles.txt12}>{this.state.phone}</Text>
          </View>
        </View>
        <View style={[styles.wapperLayout, { alignItems: 'center' }]}>
          <View style={{ flex: 3 }}>
            <Text style={styles.txt12}>Tên khách hàng</Text>
          </View>
          <View style={styles.wapperTxtInfo}>
            <Text style={styles.txt12}>{this.state.name}</Text>
          </View>
        </View>
      </View>
    );
  };

  _renderPayment = () => {
    const { navigation, infoPartnerVNPAY } = this.props;

    const { partnerVNpay } = this.state;
    return (
      <View
        style={[styles.wrapperInfo, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
      >
        <View style={styles.wapperHederLeft}>
          <View style={styles.containerPayment}>
            {this.state.cod && <Image source={themes.ICON_CHECKED} style={styles.iconCheck} />}
          </View>
          <Text style={styles.txtCOD}>{partnerVNpay ? 'Thanh toán qua VN Pay' : 'COD (Thanh toán tiền mặt)'}</Text>
        </View>
        {infoPartnerVNPAY && infoPartnerVNPAY.length !== 0 ? (
          <TouchableOpacity onPress={() => this.genQRVNPay()} style={styles.containerButtonVNPay}>
            <Text style={styles.txtButtonVnPay}>Mở mã VNPay</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    );
  };
  renderRight = () => {
    return (
      <View style={[styles.column, { height: vw(80) }]}>
        <View style={styles.viewRow}>
          <View />
          <Text style={styles.txt12}>Chi tiết</Text>
        </View>
        <View />
      </View>
    );
  };
  _renderItem = ({ item }: { item: DetailDrug }) => (
    <ItemDynamic
      source={IMAGE_DRUG}
      styleWapper={styles.containerItem}
      onPress={() => this.props.navigation.navigate(PRODUCT_DETAIL_SCREEN, { data: item, editProduct: true })}
      stylesImage={styles.imageItem}
      center={() => <ItemDetailDrug item={item} />}
      right={() => this.renderRight()}
    />
  );

  _renderListProduct = () => {
    const { data, totalAmount } = this.state;
    return (
      <View style={styles.wrapperList}>
        <View style={[styles.viewRow, { paddingHorizontal: 10, paddingTop: 10 }]}>
          <Text style={styles.txtListProduct}>Danh sách thuốc</Text>
          <Text style={styles.txtTotalAmount}>{MoneyFormat(totalAmount)}</Text>
        </View>
        <FlatList
          contentContainerStyle={{ padding: 5 }}
          data={this.state.data.details}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
        />
      </View>
    );
  };

  _onPressImage = (imageShowView: any, index: number) => {
    this.setState({
      imageShowView: imageShowView,
      isImageViewVisible: true,
      imageIndex: index,
    });
  };

  _renderImage = () => {
    const { image, imageShowView } = this.state;
    return (
      <TouchableOpacity
        disabled={image ? false : true}
        onPress={() => this._onPressImage(imageShowView, 0)}
        style={styles.viewImage}
      >
        <Image source={{ uri: image }} style={styles.imageShow} />
      </TouchableOpacity>
    );
  };
  cancel = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };
  _renderModal = () => {
    return (
      <Modal transparent={true} animationType={'slide'} visible={this.state.modalVisible}>
        <View style={styles.backgroundModal}>
          <View style={styles.ModalInsideView}>
            <TouchableOpacity
              hitSlop={{ top: vw(50), bottom: vw(50), left: vw(50), right: vw(50) }}
              style={styles.wapperButtonCancel}
              onPress={() => this.cancel()}
            >
              <Image source={themes.ICON_CLOSE} style={styles.iconClose} />
            </TouchableOpacity>
            <View style={styles.wapperQRcode}>
              <QRCode value={this.state.codeQR} logoSize={500} logoBackgroundColor="transparent" />
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  render() {
    const { isFetching, imageShowView, imageIndex, isImageViewVisible, image, isPrinting } = this.state;
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        {isPrinting && this._renderLoading()}
        {isFetching ? (
          <LoadContent
            number={10}
            loading={isFetching}
            animation={ShineOverlay}
            style={{ marginHorizontal: vw(5), marginTop: vw(5) }}
          />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.wapper}>
            <View>{this._renderListProduct()}</View>
            <View style={{ padding: 10 }}>
              <Text style={styles.txtListProduct}>Khách hàng</Text>
            </View>
            {this._renderInformation()}
            <View style={{ padding: 10 }}>
              <Text style={styles.txtListProduct}>Thanh toán</Text>
            </View>
            {this._renderPayment()}
            <View style={{ padding: 10 }}>
              <Text style={styles.txtListProduct}>Hình ảnh</Text>
            </View>
            {image !== null && this._renderImage()}
            <ImageView
              glideAlways
              images={imageShowView}
              imageIndex={imageIndex}
              animationType="fade"
              isVisible={isImageViewVisible}
              onClose={() => this.setState({ isImageViewVisible: false })}
            />
            {this._renderModal()}
          </ScrollView>
        )}
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    store: state.user.dataUser.store,
    infoPartnerVNPAY: state.dataPersist.infoPartnerVNPAY,
  };
}

export default connect(mapStateToProps)(InvoiceDetail);
