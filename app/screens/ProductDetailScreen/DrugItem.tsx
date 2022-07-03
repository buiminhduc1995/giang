import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import CheckImage, { CheckUrl } from '../../utils/CheckImage';
import { themes } from '../../constants';
import appConfig from '../../config';
import vw from '../../utils/size-dynamic';
import MoneyFormat from '../../utils/MoneyFormat';
import api from '../../api';
import { ModalCustom } from '../../elements/ModalCustom';
import { connect } from 'react-redux';
import { addProductOrder } from '../../redux/action/orderToProvider';

interface Props {
  info: any;
  data: any;
  addProductOrder: any;
  navigation: any;
}
interface State {
  quantity: string;
}

class DrugItem extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      quantity: '1',
    };
  }

  clickOrder = () => {
    const info = this.props.data;
    const price = this.props.data.price;
    const unit_name = this.props.data.unit_name;
    const unit_cd = this.props.data.unit_name;
    const itemToPharmacy = {
      drug_id: info.drug_id,
      drg_drug_cd: info.drg_drug_cd || this.props.data.drg_drug_cd,
      drg_drug_name: info.drg_drug_name,
      qty: Number(this.state.quantity),
      unit: unit_name,
      unit_cd: unit_cd,
      price: price || this.props.data.price_invest,
      company_name: info.company_name,
    };
    const itemToCompany = {
      product_code: this.props.data.product_code,
      drg_drug_cd: info.drg_drug_cd || this.props.data.drg_drug_cd,
      drg_drug_name: info.drg_drug_name,
      qty: Number(this.state.quantity),
      unit: unit_name,
      unit_cd: unit_cd,
      price: price || this.props.data.price_invest,
      company_name: info.company_name,
    };
    if (this.props.data.qty == 0) {
      Alert.alert('Thông báo', `Bạn chưa nhập số lượng đặt hàng!`);
      return;
    }
    this.props.data.drug_id !== ''
      ? this.props.addProductOrder(itemToPharmacy)
      : this.props.addProductOrder(itemToCompany);
    Alert.alert('Thông báo', `Đã thêm sản phẩm: ${this.props.data.drg_drug_name} vào giỏ hàng`, [
      { text: 'Xem giỏ hàng', onPress: () => this.props.navigation.navigate('OrderListToProvider') },
      { text: 'Tiếp tục mua', onPress: () => {} },
    ]);
  };

  render() {
    const { drg_drug_name, img_url, image_url, avatar_url } = this.props.data;
    const price = this.props.data.price;
    let productImg =
      (CheckImage(img_url) && img_url) ||
      (CheckImage(image_url) && image_url) ||
      (CheckImage(avatar_url) && avatar_url);
    if (CheckUrl(productImg)) {
      productImg = productImg;
    } else if (CheckImage(productImg) && !CheckUrl(productImg)) {
      productImg = appConfig.baseWebURL + '/' + productImg;
    }
    return (
      <View style={styles.container}>
        <FastImage
          style={styles.image}
          source={
            productImg != ''
              ? {
                  uri: productImg,
                  priority: FastImage.priority.high,
                }
              : themes.IMAGE_DRUG
          }
          resizeMode={productImg != '' ? 'contain' : null}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.textName}>{drg_drug_name}</Text>
          <Text style={styles.textPrice}>{`${MoneyFormat(price || this.props.data.price_invest)}/${
            this.props.data.unit_name!==undefined?this.props.data.unit_name:this.props.data.unit
          }`}</Text>

          <View style={styles.quantityUnit}>
            <View style={styles.quantityContainer}>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({ quantity: text })}
                value={this.state.quantity}
                underlineColorAndroid={'rgba(0,0,0,0)'}
                keyboardType={'numeric'}
                selectionColor={themes.colors.COLOR_INPUT_PRICE}
                editable={true}
                placeholder={'Nhập số lượng'}
              />
              <Image source={themes.ICON_CARET_DOWN} style={styles.iconCaretDown} />
            </View>
          </View>
          <TouchableOpacity style={styles.buttonOrder} onPress={this.clickOrder}>
            <Text style={styles.textButton}>Đặt hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    addProductOrder: (item: any) => dispatch(addProductOrder(item)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrugItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: vw(90),
    height: vw(90),
    marginRight: vw(10),
  },
  textName: {
    fontSize: vw(14),
    color: themes.colors.BLACK,
    fontFamily: themes.fontFamily.fontFamily,
    fontWeight: 'bold',
  },
  contentContainer: {
    flexWrap: 'wrap',
    flex: 1,
  },
  textPrice: {
    fontSize: vw(12),
    color: themes.colors.RED_BROWN,
    fontFamily: 'Arial',
    fontWeight: '500',
  },
  quantityUnit: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.4,
    height: vw(25),
    borderColor: themes.colors.BORDER_COLOR,
    backgroundColor: themes.colors.BACKGROUND_BOX_INPUT,
    borderWidth: 0.5,
    borderRadius: 3,
  },
  input: {
    color: '#828282',
    padding: 0,
    textAlign: 'center',
    fontSize: vw(12),
    height: vw(30),
    width: '100%',
    fontWeight: 'bold',
  },
  iconCaretDown: {
    width: vw(6),
    height: vw(6),
    resizeMode: 'contain',
    position: 'absolute',
    right: vw(3),
  },
  buttonOrder: {
    backgroundColor: themes.colors.MAIN_COLOR,
    borderRadius: vw(3),
    height: vw(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vw(5),
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: vw(12),
  },
  modalContainer: {
    height: vw(40),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: vw(5),
    borderRadius: vw(2),
    borderWidth: 1,
    borderColor: themes.colors.MAIN_COLOR,
    paddingLeft: vw(3),
  },
  dropdownStyle: {
    width: vw(70),
    maxHeight: vw(120),
    borderRadius: 3,
    marginLeft: vw(5),
  },
});
