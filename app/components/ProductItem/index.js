import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import vw from '../../utils/size-dynamic';
import { ICON_CARET_DOWN, ICON_STAR, ICON_STAR_O, IMAGE_DRUG } from '../../constants';
import withPreventDoubleClick from '../../elements/withPreventDoubleClick';
import PropTypes from 'prop-types';
import appConfig from '../../config';
import CheckImage, { CheckUrl } from '../../utils/CheckImage';
import { PROVIDER_DETAIL_SCREEN, PRODUCT_DETAIL_SCREEN } from '../../redux/types';
import API from '../../api';
import FastImage from 'react-native-fast-image';

const TouchableOpacityEx = withPreventDoubleClick(TouchableOpacity);

class ProductItem extends React.PureComponent {
  constructor(props) {
    super(props);
    let is_favorite = null;
    if (props.data.favorite === 0) {
      is_favorite = false;
    } else if (props.data.favorite === 1) {
      is_favorite = true;
    }
    this.state = {
      textInput: typeof props.data.quantity === 'number' ? props.data.quantity.toString() : '1',
      is_favorite: is_favorite,
      isRequesting: false,
    };
  }

  _onClickCompany = () => {
    const { company_id, drg_store_id } = this.props.data;
    this.props.navigation.navigate(PROVIDER_DETAIL_SCREEN, { data: { company_id, drg_store_id } });
  };

  _onClickItem = () => {
    this.props.navigation.navigate(PRODUCT_DETAIL_SCREEN, { data: this.props.data });
  };

  _onUpdateFavorite = async () => {
    if (this.props.info !== null && this.state.isRequesting === false) {
      await this.setState({
        isRequesting: true,
      });
      const params = {
        drug_id: this.props.data.drug_id,
        account_id: this.props.info.account_id,
        type: this.props.data.favorite ? 0 : 1,
      };
      API.productApi
        .updateFavorite(params)
        .then(() => {
          this.setState(
            prevState => ({
              is_favorite: !prevState.is_favorite,
              isRequesting: false,
            }),
            () => {
              return this.props.onUpdateProductSuccess();
            },
          );
        })
        .catch(err => {
          this.setState({
            isRequesting: false,
          });
          console.log(err);
        });
    }
  };

  _renderProductItemContent = () => {
    const { drg_drug_name, price, unit_name, discount, img_url, image_url, avatar_url, favorite } = this.props.data;
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
      <TouchableOpacity onPress={this._onClickItem}>
        <View style={styles.content}>
          {/* <Image source={productImg !=''? { uri: productImg } : ICON_NO_IMAGE}
            style={{ width: vw(80), height: vw(80), resizeMode: "contain", marginRight: vw(10) }} /> */}
          <FastImage
            style={{ width: vw(80), height: vw(80), marginRight: vw(10) }}
            source={
              productImg != ''
                ? {
                    uri: productImg,
                    priority: FastImage.priority.high,
                  }
                : IMAGE_DRUG
            }
            resizeMode={productImg != '' ? FastImage.resizeMode.contain : null}
          />
          <View style={{ flexWrap: 'wrap', flex: 1 }}>
            <Text
              style={{
                fontSize: vw(14),
                color: '#4F4F4F',
                fontFamily: 'Arial',
                fontWeight: 'bold',
                marginBottom: vw(5),
              }}
              numberOfLines={1}
            >
              {drg_drug_name}
            </Text>
            <Text
              style={{
                fontSize: vw(14),
                color: '#EB5757',
                fontFamily: 'Arial',
                fontWeight: 'bold',
                marginBottom: vw(5),
              }}
            >
              {price == '0' || price == ''
                ? 'Giá niêm yết từ nhà thuốc'
                : price && price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') + 'đ'}{' '}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: vw(5) }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: vw(40),
                  height: vw(20),
                  borderColor: '#E0E0E0',
                  backgroundColor: '#f2f2f2',
                  borderWidth: 0.5,
                  borderRadius: 3,
                }}
              >
                <TextInput
                  style={{
                    color: '#828282',
                    padding: 0,
                    textAlign: 'center',
                    fontSize: vw(12),
                    fontWeight: 'bold',
                    flex: 1,
                  }}
                  onChangeText={text => this.setState({ textInput: text })}
                  value={this.state.textInput}
                  underlineColorAndroid={'rgba(0,0,0,0)'}
                  keyboardType={'numeric'}
                  selectionColor={'#828282'}
                  editable={false}
                />
                <Image
                  source={ICON_CARET_DOWN}
                  style={{
                    width: vw(6),
                    height: vw(6),
                    resizeMode: 'contain',
                    marginRight: vw(5),
                  }}
                />
              </View>
              <Text style={{ color: '#333333', fontSize: vw(14), fontFamily: 'Arial' }}> {unit_name}</Text>
            </View>
          </View>
          <View style={{ paddingLeft: vw(10), alignItems: 'center' }}>
            {/* <TouchableOpacity onPress={this._onUpdateFavorite}>
              <Image
                source={favorite ? ICON_STAR : ICON_STAR_O}
                style={{
                  width: vw(15),
                  height: vw(15),
                  resizeMode: 'contain',
                  tintColor: favorite ? '#FFEB3B' : null,
                }}
              />
            </TouchableOpacity> */}
            <View style={{ flex: 1, justifyContent: 'center' }}>
              {discount > 0 && (
                <View
                  style={{
                    paddingHorizontal: vw(5),
                    height: vw(12),
                    borderRadius: vw(6),
                    backgroundColor: '#EB5757',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#ffffff',
                      fontSize: vw(9),
                      fontFamily: 'Arial',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                  >
                    Off {discount}%
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _clickOrder() {
    // dataItem = this.props.data;
    // this.props.clickOrder(ORDER,dataItem);
    this.props.navigation.navigate(PRODUCT_DETAIL_SCREEN, { data: this.props.data });
  }

  render() {
    const { company_name } = this.props.data;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            {!this.props.hiddenCompany && typeof company_name === 'string' && (
              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={{ fontSize: vw(13), color: '#4F4F4F', fontFamily: 'Arial' }}
                >
                  <Text style={{ fontWeight: 'bold' }}>NCC: </Text>
                  {company_name ? company_name : '<Chưa cập nhật>'}
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacityEx hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} onPress={() => this._clickOrder()}>
            <Text style={{ fontSize: vw(14), color: '#2D9CDB', fontFamily: 'Arial' }}>Đặt hàng</Text>
          </TouchableOpacityEx>
        </View>
        <View>{this._renderProductItemContent()}</View>
      </View>
    );
  }
}

ProductItem.propTypes = {
  data: PropTypes.object.isRequired,
};

const styles = {
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: vw(10),
    paddingVertical: vw(7),
    borderBottomWidth: 0.5,
    borderBottomColor: '#e7e7e7',
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
};

function mapStateToProps(state) {
  return {
    info: state.user.dataUser.info,
    isUpdate: state.product.isUpdate,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    clickOrder: (type, data) => {
      dispatch({ type: type, data });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductItem);
