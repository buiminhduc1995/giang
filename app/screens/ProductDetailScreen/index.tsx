import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  UIManager,
  View,
  Dimensions,
  Alert,
  Linking,
  StyleSheet,
} from 'react-native';
import vw from '../../utils/size-dynamic';
import { ICON_BACK, BACKGROUND_COLOR, ICON_CART, ICON_PENCIL, ICON_NOTE, themes } from '../../constants';
import HeaderBar from '../../elements/HeaderBar';
import { connect } from 'react-redux';
import { MyStatusBar } from '../../elements/MyStatusBar';
import { getPointWallet } from '../../redux/action/rewardPoint';
import OrderDialog from '../../components/OrderDialog';
import { ORDER, INV_IMPORT_ADD_NEW_DRUG } from '../../redux/types';
import DrugItem from './DrugItem';
import InfoDetail from './InfoDetail';
import { addProductOrder } from '../../redux/action/orderToProvider';
import MoneyFormat from '../../utils/MoneyFormat';
import ModalDropdown from 'react-native-modal-dropdown';
interface Props {
  navigation: any;
  addProductOrder: any;
  listProductOrder: any;
}
interface State {
  dataDetail: any;
  amount: number;
  status: number;
  index: number;
  text: string;
  number: number;
  price: number;
}

class ProductDetailScreen extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const data = this.props.navigation.state.params.data;
    this.state = {
      dataDetail: null,
      amount: this.props.navigation.state.params.data.price,
      status: 0,
      index: 0,
      text: data.hasOwnProperty('units') ? this.props.navigation.state.params.data.units[0]['unit_name'] : '',
      number: data.hasOwnProperty('units') ? this.props.navigation.state.params.data.units[0]['inv_qty'] : '',
      price: data.hasOwnProperty('units') ? this.props.navigation.state.params.data.units[0]['price'] : '',
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} right={this._renderHeaderRight()} />;
  }

  _renderHeaderLeft() {
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={() => this.props.navigation.goBack()}
      >
        <Image
          source={ICON_BACK}
          style={{ width: vw(11), height: vw(20), resizeMode: 'contain', marginRight: vw(10) }}
        />
        <Text style={{ fontSize: vw(18), fontFamily: 'Arial', fontWeight: 'bold', color: '#ffffff' }}>
          Chi ti???t s???n ph???m
        </Text>
      </TouchableOpacity>
    );
  }
  _renderHeaderRight = () => {
    const { navigation } = this.props;
    return (
      <View>
        {!navigation.getParam('editProduct') ? (
          <TouchableOpacity onPress={() => navigation.navigate('OrderListToProvider')}>
            <Image source={ICON_CART} style={styles.iconCart} />
            {this.props.listProductOrder.length ? (
              <View style={styles.containerNumberProduct}>
                <Text style={styles.numberProduct}>{this.props.listProductOrder.length}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            onPress={() =>
              navigation.navigate(INV_IMPORT_ADD_NEW_DRUG, {
                editProduct: true,
                drug_id: navigation.getParam('data').drug_id,
              })
            }
          >
            <Image source={ICON_NOTE} style={styles.iconPencil} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  _renderProductInformation() {
    data = this.props.navigation.state.params.data;
    return (
      <View>
        {/* <Text style={{ color: 'black', fontSize: vw(16), fontWeight: 'bold', marginTop: 5, marginLeft: 5 }}>
          Th??ng tin s???n ph???m:
          </Text>
        <Text style={styles.text}>
          <Text style={styles.textTitle}>Th??nh ph???n</Text>
          {'\n'}
          {data.active_ingredient && data.active_ingredient !== '' && ' - ' + data.active_ingredient.replace(/&lt;br&gt;|-/g, "") + '\n\n'}
          <Text style={styles.textTitle}>C??ch d??ng:</Text>
          {'\n'}
          {data.direction_for_use && data.direction_for_use !== '' && ' - ' + data.direction_for_use.replace(/&lt;br&gt;|-/g, "") + '\n\n'}
          <Text style={styles.textTitle}>?????i t?????ng s??? d???ng:</Text>
          {'\n'}
          {data.dosage && data.dosage !== '' && ' - ' + data.dosage.replace(/&lt;br&gt;|-/g, "") + '\n\n'}
          <Text style={styles.textTitle}>C??ng d???ng:</Text>
          {'\n'}
          {data.note && data.note !== '' && ' - ' + data.note.replace(/&lt;br&gt;|-/g, "") + '\n'}
        </Text> */}
        <View style={{ flexDirection: 'row', marginTop: 5, marginRight: 5 }}>
          <Text style={{ color: 'black', fontSize: vw(16), fontWeight: 'bold', marginLeft: 5 }}>Xem Th??m: </Text>
          {data.campaign ? (
            <Text
              numberOfLines={1}
              onPress={() => Linking.openURL(data.campaign.campaign_link)}
              style={{ color: '#2F80ED', fontSize: vw(16), width: '100%' }}
            >
              {data.campaign.campaign_link}
            </Text>
          ) : null}
        </View>
      </View>
    );
  }

  _renderOtherDetail() {
    dataDetail = this.props.navigation.state.params.data.campaign;
    return (
      <View>
        <Text style={{ color: 'black', fontSize: vw(16), fontWeight: 'bold', marginTop: 5, marginLeft: 5 }}>
          Ch??nh s??ch b??n h??ng:
        </Text>
        {dataDetail ? (
          <Text style={styles.text}>
            {dataDetail.campaign_title !== null &&
              dataDetail.campaign_title !== '' &&
              dataDetail.campaign_title + ': \n'}
            {'\n'}
            {dataDetail.campaign_desc}
            {'\n'}
            {'\n'}
            {'Ng??y b???t ?????u ??p d???ng: ' + this.formatDate(dataDetail.start_date)}
            {'\n'}
            {'\n'}
            {'Ng??y k???t th??c: ' + this.formatDate(dataDetail.end_date)}
          </Text>
        ) : null}
      </View>
    );
  }

  formatDate(date) {
    if (date != null) {
      reval = date.substring(6) + '/' + date.substring(4, 6) + '/' + date.substring(0, 4);
      return reval;
    } else {
      return '';
    }
  }
  change = (id: number) => {
    if (this.state.status === 0 || (this.state.status !== 0 && this.state.status !== id)) {
      this.setState({
        status: id,
      });
    } else {
      this.setState({
        status: 0,
      });
    }
  };
  _onSelect = (idx, value) => {
    this.setState({
      text: value,
      number: this.props.navigation.state.params.data.units[idx]['inv_qty'],
      price: this.props.navigation.state.params.data.units[idx]['price'],
    });
  };
  _renderModal = () => {
    const { index } = this.state;
    const listUnit = this.props.navigation.state.params.data.units.map((element: any) => {
      return element.unit_name;
    });
    return (
      <ModalDropdown
        options={Object.values(listUnit)}
        defaultValue={listUnit[index]}
        defaultIndex={Number(index)}
        dropdownStyle={[styles.styleModal, { height: listUnit.length > 4 ? 'auto' : -1 }]}
        dropdownTextStyle={styles.dropdownTextStyle}
        onSelect={(idx: number, value: any) => this._onSelect(idx, value)}
      >
        <View style={styles.wapperQuanlityDrug}>
          <Text style={styles.txtModal}>{this.state.text}</Text>
          <Image source={themes.ICON_CARET_DOWN} style={styles.iconCaretDown} />
        </View>
      </ModalDropdown>
    );
  };
  renderDrugInventory = () => {
    const data = this.props.navigation.state.params.data;
    const date = data.expired_date
      ? data.expired_date.slice(6, 8) + '/' + data.expired_date.slice(4, 6) + '/' + data.expired_date.slice(0, 4)
      : '??ang c???p nh???t';
    return (
      <View>
        <Text style={styles.txt12}>H???n s??? d???ng : {date} </Text>
        <Text style={styles.txt12}>S??? l?? : {data.lot} </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.txt12}>Trong kho c??n</Text>
          <Text style={[styles.txt12, { marginLeft: vw(5) }]}>{this.state.number}</Text>
          {this._renderModal()}
          <Text style={[styles.txt12, { marginLeft: vw(5), color: themes.colors.RED }]}>
            ????n gi?? {MoneyFormat(this.state.price)}/{this.state.text}
          </Text>
        </View>
      </View>
    );
  };
  _renderTabItem = item => {
    const { id, title, up, down, content } = item;
    return (
      <View key={id}>
        <TouchableOpacity style={styles.touch} onPress={() => this.change(id)}>
          <Text style={styles.title}>{title}</Text>
          {this.state.status !== id ? (
            <Image source={down} style={styles.iconDown} />
          ) : (
            <Image source={up} style={[styles.iconDown, { transform: [{ rotate: '90deg' }] }]} />
          )}
        </TouchableOpacity>
        {this.state.status === id ? (
          <View style={{ paddingLeft: 10, backgroundColor: themes.colors.WHITE }}>
            {id !== '6' ? <Text style={styles.txt12}>{content}</Text> : this.renderDrugInventory()}
          </View>
        ) : null}
      </View>
    );
  };
  _renderContentTabItem() {
    const data = this.props.navigation.state.params.data;
    const campaign = data.campaign;
    const note = 'Hi???n t???i s???n ph???m ch??a ??p d???ng ch????ng tr??nh khuy???n n??o.';
    const policy = campaign
      ? `${campaign.campaign_desc} \nNg??y b???t ?????u ??p d???ng:  ${this.formatDate(campaign.start_date)}`
      : note;
    const dataItem = [
      {
        id: '6',
        title: 'Th??ng tin thu???c trong kho',
        up: themes.ICON_RIGHT,
        down: themes.ICON_RIGHT,
        content: 'Th??ng tin thu???c trong kho',
      },
      {
        id: '1',
        title: 'Ch??nh s??ch b??n h??ng',
        up: themes.ICON_RIGHT,
        down: themes.ICON_RIGHT,
        content: policy,
      },
      {
        id: '2',
        title: 'C??ng d???ng',
        up: themes.ICON_RIGHT,
        down: themes.ICON_RIGHT,
        content: data.note && data.note !== '' && ' - ' + data.note.replace(/&lt;br&gt;|-/g, '') + '\n',
      },
      {
        id: '3',
        title: 'Th??nh ph???n',
        up: themes.ICON_RIGHT,
        down: themes.ICON_RIGHT,
        content:
          data.active_ingredient &&
          data.active_ingredient !== '' &&
          ' - ' + data.active_ingredient.replace(/&lt;br&gt;|-/g, '') + '\n\n',
      },
      {
        id: '4',
        title: '?????i t?????ng s??? d???ng',
        up: themes.ICON_RIGHT,
        down: themes.ICON_RIGHT,
        content: data.dosage && data.dosage !== '' && ' - ' + data.dosage.replace(/&lt;br&gt;|-/g, '') + '\n\n',
      },
      {
        id: '5',
        title: 'C??ch d??ng',
        up: themes.ICON_RIGHT,
        down: themes.ICON_RIGHT,
        content:
          data.direction_for_use &&
          data.direction_for_use !== '' &&
          ' - ' + data.direction_for_use.replace(/&lt;br&gt;|-/g, '') + '\n\n',
      },
    ];
    return <View>{dataItem.map(item => this._renderTabItem(item))}</View>;
  }
  render() {
    const data = this.props.navigation.state.params.data;
    const campaign = data.campaign;
    const note = 'Hi???n t???i s???n ph???m ch??a ??p d???ng ch????ng tr??nh khuy???n n??o.';
    const policy = campaign
      ? `${campaign.campaign_desc} \nNg??y b???t ?????u ??p d???ng:  ${this.formatDate(campaign.start_date)}`
      : note;
    const SECTIONS = [
      {
        title: 'Ch??nh s??ch b??n h??ng',
        content: policy,
      },
      {
        title: 'C??ng d???ng',
        content: data.note && data.note !== '' && ' - ' + data.note.replace(/&lt;br&gt;|-/g, '') + '\n',
      },
      {
        title: 'Th??nh ph???n',
        content:
          data.active_ingredient &&
          data.active_ingredient !== '' &&
          ' - ' + data.active_ingredient.replace(/&lt;br&gt;|-/g, '') + '\n\n',
      },
      {
        title: '?????i t?????ng s??? d???ng',
        content: data.dosage && data.dosage !== '' && ' - ' + data.dosage.replace(/&lt;br&gt;|-/g, '') + '\n\n',
      },
      {
        title: 'C??ch d??ng',
        content:
          data.direction_for_use &&
          data.direction_for_use !== '' &&
          ' - ' + data.direction_for_use.replace(/&lt;br&gt;|-/g, '') + '\n\n',
      },
    ];
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        <ScrollView style={styles.wrapBody}>
          <DrugItem
            data={data}
            setQuantity={(number: string) => this.setState({ quantity: number })}
            quantity={this.state.quantity}
            navigation={this.props.navigation}
          />
          {/* <InfoDetail sections={SECTIONS} /> */}
          {data.hasOwnProperty('units') ? this._renderContentTabItem() : <InfoDetail sections={SECTIONS} />}
          <View style={{ padding: 5 }}>
            {/* {this._renderProductInformation()} */}
            {/* {this.state.dataDetail !== null && this._renderOtherDetail()} */}
          </View>
        </ScrollView>
        <OrderDialog />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    info: state.user.dataUser.info,
    store: state.user.dataUser.store,
    listProductOrder: state.orderToProvider.listProductOrder,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPointWallet,
    clickOrder: (type, data) => {
      dispatch({ type: type, data });
    },
    addProductOrder: (item: any) => dispatch(addProductOrder(item)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapBody: {
    flex: 1,
    backgroundColor: themes.colors.BACKGROUND_COLOR,
  },
  text: {
    color: themes.colors.BLACK_BASIC,
    marginTop: vw(10),
    marginLeft: vw(10),
    fontSize: vw(15),
  },
  textTitle: {
    color: themes.colors.BLACK_BASIC,
    fontStyle: 'italic',
    fontSize: vw(15),
  },
  //headerRight
  containerNumberProduct: {
    backgroundColor: themes.colors.YELLOW,
    height: vw(17),
    width: vw(17),
    borderRadius: vw(10),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: vw(-7),
    right: vw(-5),
  },
  iconCart: {
    width: vw(25),
    height: vw(25),
    resizeMode: 'contain',
    tintColor: themes.colors.WHITE,
  },
  iconPencil: {
    width: vw(20),
    height: vw(20),
    resizeMode: 'contain',
    tintColor: themes.colors.WHITE,
  },
  numberProduct: {
    fontSize: vw(12),
    fontFamily: themes.fontFamily.fontFamily,
    fontWeight: 'bold',
    color: themes.colors.WHITE,
    textAlign: 'center',
  },
  iconDown: {
    width: vw(10),
    height: vw(10),
    resizeMode: 'contain',
    tintColor: themes.colors.BLACK_BASIC,
  },
  touch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(0,0,0,0.4)',
    borderBottomWidth: 0.3,
    width: '100%',
    marginTop: vw(20),
    paddingLeft: vw(5),
    paddingRight: vw(5),
  },
  title: {
    color: themes.colors.BLACK_BASIC,
    fontSize: vw(16),
    fontWeight: 'bold',
    paddingBottom: vw(3),
  },
  txt12: {
    fontSize: vw(12),
    color: themes.colors.BLACK_BASIC,
  },
  styleModal: {
    width: vw(150),
    maxHeight: vw(120),
    borderRadius: vw(3),
    overflow: 'hidden',
    marginRight: -vw(10),
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.14,
        shadowRadius: 2,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  dropdownTextStyle: {
    fontSize: vw(14),
    fontFamily: themes.fontFamily.fontFamily,
    paddingHorizontal: vw(15),
  },
  wapperQuanlityDrug: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: vw(20),
    width: vw(70),
    borderColor: themes.colors.MAIN_COLOR,
    borderWidth: vw(1),
    flexDirection: 'row',
    marginLeft: vw(5),
  },
  txtModal: {
    fontSize: vw(10),
    color: themes.colors.MAIN_COLOR,
    fontFamily: themes.fontFamily.fontFamily,
  },
  iconCaretDown: {
    width: vw(6),
    height: vw(6),
    resizeMode: 'contain',
    marginRight: vw(5),
  },
});
