import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  AsyncStorage,
  FlatList,
} from 'react-native';
import HeaderBar from '../../../elements/HeaderBar';
import { connect } from 'react-redux';
import vw from '../../../utils/size-dynamic';
import { ICON_BACK, ICON_CART, TAB } from '../../../constants';
import { MyStatusBar } from '../../../elements/MyStatusBar';
import { styles } from './OrderListToProvider.style';
import ProductItem from '../ProductItem';
import API from '../../../api';
import { resetProductOrder } from '../../../redux/action/orderToProvider';
import { changeScrollTab, changeTabNavigator } from '../../../redux/action/navigation';
import MoneyFormat from '../../../utils/MoneyFormat';
import EventBus from '../../../utils/EventBus';
import LoaderIndicator from '../../../elements/LoaderIndicator';
import TextEmpty from '../../../elements/TextEmpty';
interface Props {
  listProductOrder: any;
  navigation: any;
  resetProductOrder: any;
  changeScrollTab: any;
  changeTabNavigator: any;
  store: any;
  info: any;
  totalPrice: number;
  discount: number;
}
interface State {
  isRequest: boolean;
  tempTotal: number;
  discount: number;
  total: number;
  note: string;
  height: number;
  address: string;
  phone: string;
}

class OrderListToProvider extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isRequest: false,
      tempTotal: props.totalPrice,
      discount: props.discount,
      total: props.totalPrice,
      note: '',
      height: 0,
      address: this.props.store.address1,
      phone: this.props.store.phone_no,
    };
  }

  onPressOrder = async () => {
    const { listProductOrder, info, totalPrice, discount } = this.props;
    const { address, phone, total, note } = this.state;
    if (!listProductOrder.length) {
      Alert.alert('Thông báo', 'Bạn chưa chọn sản phẩm nào!');
      return;
    }
    const listOrder = [...this.props.listProductOrder];
    for (let i = 0; i < listProductOrder.length; i++) {
      listOrder[i] = { ...listProductOrder[i] };
      delete listOrder[i].company_name;
    }
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    const params = {
      drg_store_id: info.drg_store_id,
      drg_store_name: info.full_name,
      amount: totalPrice,
      note: note,
      address: address,
      phone: phone,
      token_device: fcmToken,
      list_product: listOrder,
    };
    Alert.alert('Thông báo', 'Bạn có chắc chắn muốn đặt đơn hàng không?', [
      { text: 'Hủy', onPress: () => {} },
      {
        text: 'Đồng ý',
        onPress: async () => {
          try {
            this.setState({ isRequest: true });
            const res = await API.syncOrderToAdmin.orderProductList(params);
            this.setState({ isRequest: false });
            if (res.status >= 200 && res.status <= 300) {
              Alert.alert('Thông báo', 'Đặt đơn hàng thành công', [
                {
                  text: 'Đồng ý',
                  onPress: () => {
                    this.props.resetProductOrder();
                    EventBus.fireEvent('OrderNewSucces');
                    this.onPressNavigate(TAB.PROVIDER_TAB, 2);
                  },
                },
              ]);
            }
          } catch (error) {
            Alert.alert('Thông báo', `Đặt đơn hàng thất bại.`, [{ text: 'Đồng ý' }]);
            this.setState({ isRequest: false });
          }
        },
      },
    ]);
  };

  onPressNavigate = (nameTab: string, number: number) => {
    this.props.changeTabNavigator(nameTab);
    this.props.changeScrollTab(number);
    this.props.navigation.navigate('Home');
  };

  _goBack = () => {
    this.props.navigation.goBack();
  };

  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }

  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={styles.wrapperHeaderLeft} onPress={this._goBack}>
        <Image source={ICON_BACK} style={styles.iconBack} />
        <Text style={styles.titleHeader}>Đặt hàng</Text>
      </TouchableOpacity>
    );
  }

  _renderHeaderRight = () => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderListToProvider')}>
        <Image source={ICON_CART} style={styles.iconCart} />
        {this.props.listProductOrder.length ? (
          <View style={styles.containerNumberProduct}>
            <Text style={styles.numberProduct}>{this.props.listProductOrder.length}</Text>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  _renderInfo = () => {
    return (
      <View>
        <Text style={styles.title}>Thông tin đơn hàng</Text>
        <View style={styles.containerInfo}>
          <Text style={styles.text}>Tên Nhà thuốc: {this.props.info.full_name}</Text>
          <Text style={styles.text}>Địa chỉ: {this.props.store.address1}</Text>
          <Text style={styles.text}>SĐT: {this.props.store.phone_no}</Text>
          <View>
            <Text style={styles.text}>Ghi chú: </Text>
            <TextInput
              style={[styles.textInputBox, { height: Math.max(vw(40), this.state.height) }]}
              onChangeText={text => this.setState({ note: text })}
              value={this.state.note}
              placeholder={'Nhập ghi chú'}
              multiline={true}
              onContentSizeChange={event => {
                this.setState({ height: event.nativeEvent.contentSize.height });
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  _renderItem = ({ item, index }: { item: any; index: number }) => {
    return <ProductItem data={item} type={'ordered'} index={index} navigation={this.props.navigation} />;
  };

  _renderListOrder = () => {
    const { listProductOrder } = this.props;
    return (
      <View style={{ flexGrow: listProductOrder.length ? 0 : 1 }}>
        <View style={[styles.lineStyle, { marginVertical: vw(5) }]}>
          <Text style={[styles.title, { marginLeft: 0 }]}>Danh sách thuốc</Text>
          {listProductOrder.length ? (
            <TouchableOpacity style={styles.buttonAdd} onPress={() => this.onPressNavigate(TAB.PROVIDER_TAB, 0)}>
              <Text style={styles.textAdd}>+ Thêm sản phẩm</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        {listProductOrder.length ? (
          <FlatList
            style={styles.containerListOrder}
            data={this.props.listProductOrder}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            extraData={this.props}
          />
        ) : (
          <View style={styles.emptyList}>
            <TouchableOpacity style={styles.buttonAdd} onPress={() => this.onPressNavigate(TAB.PROVIDER_TAB, 0)}>
              <Text style={styles.textAdd}>+ Thêm sản phẩm</Text>
            </TouchableOpacity>
            <TextEmpty stylesContainer={{ flex: 0,marginTop: vw(10), }} text={'Không chứa đơn hàng nào!'} />
          </View>
        )}
      </View>
    );
  };

  _renderPrice = () => {
    const { totalPrice, discount } = this.props;
    return (
      <View style={styles.containerPrice}>
        <View style={styles.lineStyle}>
          <Text style={styles.text}>Tạm tính: </Text>
          <Text style={styles.text}>{MoneyFormat(totalPrice)}</Text>
        </View>
        <View style={styles.lineStyle}>
          <Text style={styles.text}>Giảm giá/Chiết khấu: </Text>
          <Text style={styles.text}>{MoneyFormat(discount)}</Text>
        </View>
      </View>
    );
  };

  _renderButton = () => {
    const { discount } = this.state;
    const { totalPrice } = this.props;
    const stylePrice = { ...styles.text, color: 'red', fontWeight: '500', fontSize: vw(18) };
    return (
      <View style={styles.containerButton}>
        <View style={styles.lineStyle}>
          <Text style={styles.text}>Thành tiền: </Text>
          <Text style={stylePrice}>{MoneyFormat(totalPrice - discount)}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.onPressOrder}>
          <Text style={styles.titleHeader}>Đặt hàng</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flexGrow: 1 }}>
            {this._renderInfo()}
            {this._renderListOrder()}
            {this._renderPrice()}
          </View>
        </ScrollView>
        {this._renderButton()}
        <LoaderIndicator loading={this.state.isRequest} />
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    store: state.user.dataUser.store,
    dataOrder: state.order.dataOrder,
    listProductOrder: state.orderToProvider.listProductOrder,
    totalPrice: state.orderToProvider.totalPrice,
    discount: state.orderToProvider.discount,
  };
}

const mapDispatchToProps = {
  resetProductOrder,
  changeTabNavigator,
  changeScrollTab,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderListToProvider);
