import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Dimensions, Alert, Modal } from 'react-native';
import { connect } from 'react-redux';
import vw from '../../utils/size-dynamic';
import { IMAGE_DRUG, BLACK, MAIN_COLOR, ICON_TRASH, SHADOW, ICON_CARET_DOWN } from '../../constants';
import CheckImage, { CheckUrl } from '../../utils/CheckImage';
import { PRODUCT_DETAIL_SCREEN } from '../../redux/types';
import { addProductOrder, deleteProductOrder, updateProductOrder } from '../../redux/action/orderToProvider';
import MoneyFormat from '../../utils/MoneyFormat';
import appConfig from '../../config/index';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';

interface Props {
  info: any;
  data: any;
  type: string;
  navigation: any;
  addProductOrder: any;
  resetProductOrder: any;
  deleteProductOrder: any;
  updateProductOrder: any;
  index: number;
}
interface State {
  quantity: string;
  visible: boolean;
  is_favorite: boolean | null;
  amount: number;
  discount: number;
  total: number;
  dataPrice: any[];
  unit_cd: string;
  unit_name: string;
  price: number;
}

class ProductItem extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    let is_favorite = null;
    if (props.data.favorite === 0) {
      is_favorite = false;
    } else if (props.data.favorite === 1) {
      is_favorite = true;
    }
    this.state = {
      is_favorite: is_favorite,
      visible: false,
      quantity: props.data.qty && typeof props.data.qty === 'number' ? props.data.qty.toString() : '1',
      amount: props.data.price,
      discount: 0,
      total: props.data.price,
      unit_cd: props.data.unit_cd,
      unit_name: props.data.unit_name,
      price: props.data.price || props.data.price_invest,
      dataPrice: [],
    };
  }

  onClickItem = async () => {
    const { navigation, data } = this.props;
    navigation.navigate(PRODUCT_DETAIL_SCREEN, { data: data, pharmacy: 1 });
  };


  computeOrder = (qty: number) => {
    const { data } = this.props;
    const { price } = this.state;
    if (data) {
      let amount = price * qty;
      if (data.campaign) {
        let discount = data.campaign.discount * amount;
        let total = amount - discount;
        this.setState({ amount, discount, total });
      } else {
        this.setState({ amount, total: amount });
      }
    }
  };

  addQuantity = () => {
    let number = Number(this.state.quantity);
    number = number + 1;
    this.computeOrder(number);
    this.setState({ quantity: number.toString() });
  };

  subQuantity = () => {
    let number = Number(this.state.quantity);
    number = number > 1 ? number - 1 : 1;
    this.computeOrder(number);
    this.setState({ quantity: number.toString() });
  };
  acceptOrder = () => {
    const itemToPharmacy = {
      drug_id: this.props.data.drug_id,
      drg_drug_cd: this.props.data.drg_drug_cd,
      drg_drug_name: this.props.data.drg_drug_name,
      qty: Number(this.state.quantity),
      unit: this.state.unit_name,
      unit_cd: this.state.unit_cd !== undefined ? this.state.unit_cd : 0,
      price: this.state.price,
      company_name: this.props.data.company_name,
    };
    const itemToCompany = {
      product_code: this.props.data.product_code,
      drg_drug_cd: this.props.data.drg_drug_cd,
      drg_drug_name: this.props.data.drg_drug_name,
      qty: Number(this.state.quantity),
      unit: this.state.unit_name,
      unit_cd: this.state.unit_cd !== undefined ? this.state.unit_cd : 0,
      price: this.state.price,
      company_name: this.props.data.company_name,
    };
    this.props.action(true);
    this.props.data.drug_id !== ''
      ? this.props.addProductOrder(itemToPharmacy)
      : this.props.addProductOrder(itemToCompany);
  };

  deleteProductOrder = () => {
    const itemToPharmacy = {
      drug_id: this.props.data.drug_id,
      drg_drug_cd: this.props.data.drg_drug_cd,
      drg_drug_name: this.props.data.drg_drug_name,
      qty: Number(this.state.quantity),
      unit: this.props.data.unit,
      unit_cd: this.state.unit_cd,
      price: this.state.price,
      company_name: this.props.data.company_name,
    };
    const itemToCompany = {
      product_code: this.props.data.product_code,
      drg_drug_cd: this.props.data.drg_drug_cd,
      drg_drug_name: this.props.data.drg_drug_name,
      qty: Number(this.state.quantity),
      unit: this.props.data.unit,
      unit_cd: this.state.unit_cd,
      price: this.state.price,
      company_name: this.props.data.company_name,
    };
    this.props.data.drug_id !== ''
      ? this.props.deleteProductOrder(itemToPharmacy)
      : this.props.deleteProductOrder(itemToCompany);
  };

  updateProductOrder = async (text: string) => {
    await this.setState({ quantity: text });
    const itemToPharmacy = {
      drug_id: this.props.data.drug_id,
      drg_drug_cd: this.props.data.drg_drug_cd,
      drg_drug_name: this.props.data.drg_drug_name,
      qty: Number(this.state.quantity),
      unit: this.props.data.unit,
      unit_cd: this.state.unit_cd,
      price: this.state.price,
      company_name: this.props.data.company_name,
    };
    const itemToCompany = {
      product_code: this.props.data.product_code,
      drg_drug_cd: this.props.data.drg_drug_cd,
      drg_drug_name: this.props.data.drg_drug_name,
      qty: Number(this.state.quantity),
      unit: this.props.data.unit,
      unit_cd: this.state.unit_cd,
      price: this.state.price,
      company_name: this.props.data.company_name,
    };
    this.props.data.drug_id !== ''
      ? this.props.updateProductOrder(itemToPharmacy, this.props.index)
      : this.props.updateProductOrder(itemToCompany, this.props.index);
  };
  _renderContentDrug = () => {
    const { img_url, image_url, avatar_url } = this.props.data;
    let productImg =
      (CheckImage(img_url) && img_url) ||
      (CheckImage(image_url) && image_url) ||
      (CheckImage(avatar_url) && avatar_url);
    if (CheckUrl(productImg)) {
      productImg = productImg;
    } else if (CheckImage(productImg) && !CheckUrl(productImg)) {
      productImg = appConfig.baseWebURL + '/' + productImg;
    }
    const { data, type } = this.props;
    return (
      <TouchableOpacity style={styles.containerContext} onPress={this.onClickItem}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={productImg != '' ? { uri: productImg } : IMAGE_DRUG} />
        </View>
        <View style={styles.inforContainer}>
          <Text style={styles.textBold} numberOfLines={1}>
            {data.drg_drug_name}
          </Text>
          {data.price || data.price_invest ? (
            <Text style={styles.textPrice}>{`${
              data.price || data.price_invest ? `${MoneyFormat(data.price || data.price_invest)}` : `Đang cập nhật`
            }`}</Text>
          ) : (
            <Text style={styles.textPrice}>Báo giá từ nhà cung cấp</Text>
          )}
          {(type !== 'ordered' || type === 'ordered') && (
            <View style={styles.lineBottom}>
              <View style={styles.wapperInput}>
                <TextInput
                  style={styles.inputContainer}
                  underlineColorAndroid={'rgba(0,0,0,0)'}
                  keyboardType={'numeric'}
                  selectionColor={'#828282'}
                  value={this.state.quantity}
                  onChangeText={this.updateProductOrder}
                />
                <Image source={ICON_CARET_DOWN} style={styles.iconCarteDown} />
              </View>

              <Text style={styles.text}>{` ${this.props.data.unit_name || this.props.data.unit}`}</Text>
            </View>
          )}
        </View>
        {type === 'ordered' && (
          <TouchableOpacity onPress={this.deleteProductOrder} style={styles.buttonTrash} hitSlop={styles.hitSlop}>
            <Image source={ICON_TRASH} style={styles.iconTrash} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  render() {
    const { company_name } = this.props.data;
    const { type } = this.props;
    const container = [
      styles.container,
      { borderRadius: type === 'ordered' ? 0 : vw(5), marginHorizontal: type === 'ordered' ? 0 : vw(10) },
    ];
    return (
      <View style={container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.textBold} numberOfLines={1}>
              NCC: {company_name ? company_name : '<Đang cập nhật>'}
            </Text>
          </View>
          {type != 'ordered' && (
            <TouchableOpacity hitSlop={styles.hitSlop} onPress={() => this.acceptOrder()}>
              <FontAwesome5 name="cart-plus" size={vw(20)} color={MAIN_COLOR} />
            </TouchableOpacity>
          )}
        </View>
        <View>{this._renderContentDrug()}</View>
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    isUpdate: state.product.isUpdate,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addProductOrder: (item: any) => dispatch(addProductOrder(item)),
    updateProductOrder: (item: any, index: number) => dispatch(updateProductOrder(item, index)),
    deleteProductOrder: (item: any) => dispatch(deleteProductOrder(item)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductItem);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginBottom: vw(7),
    borderRadius: vw(5),
    ...SHADOW,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: vw(10),
    paddingVertical: vw(5),
    borderBottomWidth: 0.5,
    borderBottomColor: '#e7e7e7',
  },
  containerContext: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: vw(5),
    marginBottom: vw(5),
    paddingVertical: vw(5),
    paddingHorizontal: vw(10),
  },
  imageContainer: {
    marginRight: vw(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inforContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginLeft: vw(5),
  },
  image: {
    width: vw(60),
    height: vw(60),
  },
  text: {
    color: BLACK,
    fontSize: vw(12),
  },
  textPrice: {
    color: '#EB5757',
    fontSize: vw(13),
    fontWeight: '500',
  },
  textBold: {
    color: BLACK,
    fontWeight: 'bold',
    fontSize: vw(12),
    // marginRight: vw(15),
  },
  textBlue: {
    fontSize: vw(12),
    color: '#2D9CDB',
    fontFamily: 'Arial',
    fontWeight: '300',
  },
  lineBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    color: '#828282',
    padding: 0,
    textAlign: 'center',
    fontSize: vw(12),
    fontWeight: 'bold',
    flex: 1,
  },
  //modal
  buttonAcceptModal: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hitSlop: {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  },
  containerModal: {
    flex: 1,
    justifyContent: 'space-between',
  },
  dialogStyle: {
    zIndex: 100,
    borderRadius: vw(10),
    overflow: 'hidden',
    height: vw(300),
  },
  title: {
    textAlign: 'center',
    fontSize: vw(17),
    color: 'black',
    paddingTop: 15,
    fontWeight: 'bold',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'gray',
    opacity: 0.5,
    marginTop: 5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  inputOrder: {
    borderWidth: 1,
    borderColor: 'gray',
    width: 60,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    paddingTop: 0,
    paddingBottom: 0,
    textAlign: 'center',
  },
  modalContainer: {
    height: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: vw(5),
    borderRadius: vw(2),
    borderWidth: 1,
    borderColor: MAIN_COLOR,
    paddingLeft: vw(3),
  },
  dropdownStyle: {
    width: vw(70),
    maxHeight: vw(120),
    borderRadius: 3,
    marginLeft: vw(5),
  },
  buttonTrash: {
    position: 'absolute',
    bottom: vw(7),
    right: vw(10),
  },
  iconTrash: {
    width: vw(15),
    height: vw(15),
    resizeMode: 'contain',
    tintColor: MAIN_COLOR,
  },
  iconOperator: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  wapperInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: vw(40),
    height: vw(20),
    borderColor: '#E0E0E0',
    backgroundColor: '#f2f2f2',
    borderWidth: 0.5,
    borderRadius: 3,
  },
  iconCarteDown: {
    width: vw(6),
    height: vw(6),
    resizeMode: 'contain',
    marginRight: vw(5),
  },
});
