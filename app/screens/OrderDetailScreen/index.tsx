import React from 'react';
import {
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  UIManager,
  View,
  BackHandler,
  Keyboard,
  Alert,
} from 'react-native';
import { themes } from '../../constants';
import { connect } from 'react-redux';
import ProductItem from '../../components/ProductItem';
import vw from '../../utils/size-dynamic';
import HeaderBar from '../../elements/HeaderBar';
import { MY_ORDER_SCREEN, HOME, MAP } from '../../redux/types';
import API from '../../api';
import PopupCancelOrder from '../../elements/PopupCancelOrder';
import { getDataHomeAction } from '../../redux/action/home';
import { getMyOrderListAction, changeTab } from '../../redux/action/order';
import { MyStatusBar } from '../../elements/MyStatusBar';
import LoaderIndicator from '../../elements/LoaderIndicator';
import appConfig from '../../config';
import { getPointWallet } from '../../redux/action/rewardPoint';
import styles from './OrderDetailScreen.styles';
import { Navigation } from '../../dataType/';
import InfoOrder from './InfoOrder';
import Footer from './Footer';
type Props = {
  navigation: Navigation;
  getDataHomeAction: Function;
  info: any;
  getPointWallet: any;
  store: any;
  typeOrderBy: any;
};
type State = {
  isOpenFooter: boolean;
  productsList: any;
  isShowDetail: boolean;
  medOrderInfo: {
    med_order_id: string;
    address1: string;
    provider_name: string;
    invoice_img: string;
    company_phone: string;
    note: string;
    district: string;
  };
  isLoading: boolean;
  error: boolean;
  isRequesting: boolean;
  isFocus: boolean;
  dataItem: any;
  amount: number;
  qty_request: number;
  update: boolean;
  distance: number;
  isFetching: boolean;
};
class OrderDetailScreen extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpenFooter: false,
      productsList: [],
      isShowDetail: false,
      medOrderInfo: {
        med_order_id: '',
        address1: '',
        provider_name: '',
        invoice_img: '',
        company_phone: '',
        note: '',
        district: '',
      },
      isLoading: false,
      error: false,
      isRequesting: false,
      isFocus: false,
      dataItem: null,
      amount: 0,
      qty_request: 1,
      update: false,
      distance: 0,
      isFetching: false,
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this._fetchData = this._fetchData.bind(this);
    this._handleBackPress = this._handleBackPress.bind(this);
    this._goBack = this._goBack.bind(this);
    this._onClickAcceptOrder = this._onClickAcceptOrder.bind(this);
    this._onClickOpenMap = this._onClickOpenMap.bind(this);
  }

  _goBack() {
    this.props.navigation.goBack();
  }

  async componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidHide', e => {
      this.setState({ isFocus: false });
    });
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidShow', e => {
      this.setState({ isFocus: true });
    });
    await this._fetchData();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress);
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._handleBackPress);
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.data != undefined) {
      this.setState(
        {
          dataItem: nextProps.data.data,
          amount: nextProps.data.data.price * 1,
        },
        () => nextProps.data.data.campaign != null && this.popupDialog.show(),
      );
    }
  }
  _getDataHomeAction = () => {
    this.props.navigation.goBack();
    this.props.getDataHomeAction(this.props.info.drg_store_id, this.props.typeOrderBy);
    this.props.navigation.dispatch({ data: { tabType: this.state.selectedTab }, type: HOME });
  };
  distanceAccept = async () => {
    try {
      const res = await API.orderApi.acceptOrder(
        this.props.info.drg_store_id,
        this.props.info.drg_store_code,
        this.state.medOrderInfo.med_order_id,
      );
      this.props.navigation.goBack();
      this.setState({
        isRequesting: false,
        isFetching: false,
      });
      getMyOrderListAction(this.props.info.drg_store_id, '');
      getDataHomeAction(this.props.info.drg_store_id, '');
      API.notification.scheduleLocalNotificationDelivery(this.state.medOrderInfo);
      API.notification.scheduleLocalNotificationCompleteOrder(this.state.medOrderInfo);
      this.props.navigation.navigate(MY_ORDER_SCREEN, {
        beforeScreen: 'OrderDetailScreen',
      });
    } catch (error) {
      this.setState({
        isRequesting: false,
        isFetching: false,
      });
      this.checkOrderStatus();
    }
  };
  checkOrderStatus = async () => {
    try {
      const res = await API.orderApi.getOrderDetails(this.state.medOrderInfo.med_order_id);
      if (res.data.med_order_pool != undefined && res.data.med_order_pool.status === 1) {
        Alert.alert(
          'Đơn hàng đã được nhà thuốc khác nhận!',
          'Cảm ơn quý nhà thuốc đã sử dụng ứng dụng Medlink. \nVui lòng tiếp tục sử dụng dịch vụ để nhận đơn tiếp theo!',
          [{ text: 'Ok', onPress: () => this._getDataHomeAction() }],
        );
      }
      this.setState({
        isRequesting: false,
        isFetching: false,
      });
    } catch (error) {
      Alert.alert(
        'Đơn hàng đã được nhận!',
        'Cảm ơn quý nhà thuốc đã sử dụng ứng dụng MedLink. \nVui lòng tiếp tục sử dụng dịch vụ để nhận đơn tiếp theo!',
        [{ text: 'Ok', onPress: () => this._getDataHomeAction() }],
      );
    }
  };
  _getDirections = async (startLoc: any, destinationLoc: any) => {
    try {
      await this.setState({ isFetching: true });
      const res = await API.mapApi.getDirections(startLoc, destinationLoc);
      if (res !== false) {
        this.setState({
          distance: res.distance,
        });
      }
      if (res.distance <= 50) {
        this.distanceAccept();
      } else {
        Alert.alert(
          'Thông báo',
          'Bạn không thể nhận đơn với khoảng cách quá 50km.',
          [{ text: 'OK', onPress: () => this.setState({ isRequesting: false, isFetching: false }) }],
          { cancelable: false },
        );
      }
    } catch (error) {
      this.setState({ isFetching: false });
    }
  };

  _handleBackPress() {
    this._goBack();
    return true;
  }

  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} right={this._renderHeaderRight()} />;
  }

  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={styles.buttonHeader} onPress={this._goBack}>
        <Image source={themes.ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtHeaderLeft}>Chi tiết đơn hàng</Text>
      </TouchableOpacity>
    );
  }

  _renderHeaderRight() {
    const dataOrderDetailScreen = this.props.navigation.getParam('dataOrderDetailScreen', null);
    return (
      dataOrderDetailScreen.dataType === 'PICKUP_ORDER' && (
        <TouchableOpacity style={styles.buttonHeader} onPress={this._onClickCancelOrder}>
          <Image source={themes.ICON_TRANS} style={styles.iconTrans} />
          <Text style={styles.cancelOrder}>Hủy đơn</Text>
        </TouchableOpacity>
      )
    );
  }

  _onClickOpenMap() {
    const dataOrderDetailScreen = this.props.navigation.getParam('dataOrderDetailScreen', null);
    if (this.props.info !== null) {
      requestAnimationFrame(() => {
        const data = {
          medOrderId: dataOrderDetailScreen.medOrderId,
          storeId: this.props.info.drg_store_id,
          dataType: dataOrderDetailScreen.dataType,
        };
        this.props.navigation.navigate(MAP, { dataMapScreen: data });
      });
    }
  }
  _callApiFinishedOrder = async (value: any) => {
    try {
      const res = await API.orderApi.getOrderHistoryDetails(value);
      this.setState({
        medOrderInfo: res.data.med_order_pool_history,
        productsList: res.data.lst_med_order_detail_history,
        isLoading: false,
        isFetching: false,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        error,
        isFetching: false,
      });
    }
  };
  _callApiViewDetail = async (value: any) => {
    try {
      const res = await API.orderApi.getOrderDetails(value);
      this.setState({
        medOrderInfo: res.data.med_order_pool,
        productsList:
          res.data.lst_med_order_detail_info[0].drug_id === 0
            ? res.data.lst_med_order_detail_info
            : res.data.list_drug_order,
        isLoading: false,
        isFetching: false,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        error,
        isFetching: false,
      });
    }
  };
  _fetchData() {
    const dataOrderDetailScreen = this.props.navigation.getParam('dataOrderDetailScreen', null);
    if (this.state.isLoading) return;
    this.setState({ isLoading: true }, () => {
      if (dataOrderDetailScreen.dataType === 'FINISHED_ORDER') {
        this._callApiFinishedOrder(dataOrderDetailScreen.medOrderId);
      } else {
        this._callApiViewDetail(dataOrderDetailScreen.medOrderId);
      }
    });
  }

  async _onClickAcceptOrder() {
    if (this.state.isRequesting) return;
    if (this.props.info !== null) {
      await this.setState({ isRequesting: true });
      let start = this.props.store.address1 + ',' + this.props.store.district;
      let end = this.state.medOrderInfo.address1 + ',' + this.state.medOrderInfo.district;
      if (start != null && start != '' && end != null && end != '') {
        this._getDirections(start, end);
      }
    }
  }
  _changeLoadingIndicator = (isFetching: boolean) => {
    this.setState({ isFetching });
  };

  _onClickCancelOrder = () => {
    if (this.state.isRequesting) return;
    this.popupDialog.show();
  };

  _addNewRewardPoint = async () => {
    const { info, store } = this.props;
    const params = {
      account_id: info.account_id,
      drg_store_id: store.drg_store_id,
      exchange_id: 0,
      point: 50,
      type: 1,
    };
    try {
      const res = await API.rewardPointApi.updateRewardPoint(params);
      this.props.getPointWallet(store.drg_store_id);
      Alert.alert('Thông báo', `Chúc mừng bạn vừa nhận được ${params.point} điểm thưởng trên hệ thống Medlink`);
    } catch (error) {
      console.log(error);
    }
  };
  _finishOrder = async () => {
    try {
      await this.setState({ isFetching: true });
      await API.orderApi.finishedOrder(
        this.props.info.drg_store_id,
        this.props.info.drg_store_code,
        this.state.medOrderInfo.med_order_id,
      );
      getMyOrderListAction(this.props.info.drg_store_id, '');
      getDataHomeAction(this.props.info.drg_store_id, '');
      this.props.navigation.goBack();
      this._addNewRewardPoint();
      this.setState({
        isRequesting: false,
        isFetching: false,
      });
    } catch (error) {
      this.setState({
        isRequesting: false,
        isFetching: false,
      });
      Alert.alert('Lỗi', 'Hoàn thành đơn thất bại!!');
    }
  };
  _onClickFinishedOrder = async () => {
    if (this.state.isRequesting) return;
    if (this.props.info !== null) {
      await this.setState({ isRequesting: true });
      Alert.alert(
        'Thông báo',
        'Bạn chắc chắn hoàn thành đơn hàng?',
        [
          {
            text: 'Hủy',
            onPress: () => {
              this.setState({ isRequesting: false }, () => false);
            },
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => this._finishOrder(),
          },
        ],
        { cancelable: false },
      );
    }
  };
  _toggleDetail = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState(prevState => ({
      isShowDetail: !prevState.isShowDetail,
    }));
  };

  _renderCampaignAdvertisement = () => {
    const { medOrderInfo, isShowDetail, productsList } = this.state;
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: vw(10),
        }}
      >
        <View
          style={{
            backgroundColor:
              medOrderInfo.note === 'Khách đồng ý mua sản phẩm' ? themes.colors.MAIN_COLOR : themes.colors.RED_BROWN,
          }}
        >
          <TouchableOpacity style={styles.buttonCampaignAdv} onPress={this._toggleDetail}>
            <Text style={styles.txtCampaignAdvNote}>{medOrderInfo.note}</Text>
            <Image source={themes.ICON_CARET_DOWN} style={styles.iconCaretDownCampaign} />
          </TouchableOpacity>
        </View>
        {medOrderInfo.note === 'Khách đồng ý mua sản phẩm' ? null : (
          <ScrollView style={{ height: isShowDetail ? vw(150) : 0, zIndex: 999 }}>
            {productsList.length === 0 ? (
              <Text>Vui lòng liên hệ với khách hàng để tư vấn thêm</Text>
            ) : (
              this._renderTextCampaign()
            )}
          </ScrollView>
        )}
      </View>
    );
  };
  _renderTextCampaign = () => {
    return (
      <View style={styles.containerCampaign}>
        {this.state.productsList.map((item: any) => (
          <View key={item.med_detail_id}>
            {item.campaign == null ? null : (
              <View>
                <Text style={styles.txtCampaignDrugName}>{item.drg_drug_name}</Text>
                <Text style={styles.txtCampaign}>
                  {item.campaign == null ? null : item.campaign.campaign_advertisement}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
    );
  };

  _renderInfo() {
    const dataOrderDetailScreen = this.props.navigation.getParam('dataOrderDetailScreen', null);
    const { medOrderInfo } = this.state;
    return (
      <InfoOrder
        medOrderInfo={medOrderInfo}
        dataOrderDetailScreen={dataOrderDetailScreen}
        _onClickOpenMap={this._onClickOpenMap}
        _renderCampaignAdvertisement={this._renderCampaignAdvertisement}
      />
    );
  }

  _renderListProduct() {
    const { medOrderInfo, productsList } = this.state;
    return (
      <View>
        {typeof medOrderInfo.provider_name === 'string' && medOrderInfo.provider_name.length > 0 && (
          <View style={styles.containerListProduct}>
            <Text style={[styles.title, { marginBottom: 0 }]}>
              Nhà cung cấp: <Text>{medOrderInfo.provider_name}</Text>
            </Text>
          </View>
        )}
        <Text style={styles.title}>Danh sách sản phẩm</Text>
        {productsList.map((item: any, index: any) => {
          return (
            <View style={styles.wrapProductItem} key={index.toString()}>
              <ProductItem
                data={item}
                type={'OrderDetail'}
                phoneCP={medOrderInfo.company_phone}
                navigation={this.props.navigation}
                hiddenCompany
              />
            </View>
          );
        })}
      </View>
    );
  }

  _renderInvoiceImage = () => {
    const { medOrderInfo } = this.state;
    if (medOrderInfo.invoice_img == null || medOrderInfo.invoice_img == '') {
      return null;
    } else {
      return (
        <View style={{ borderRadius: 5 }}>
          <Text style={styles.txtImageInvoice}>Hình ảnh hoá đơn</Text>
          <View style={{ backgroundColor: 'white', borderRadius: 5, padding: 10 }}>
            <Image
              source={{ uri: appConfig.baseWebURL + '/' + medOrderInfo.invoice_img }}
              style={styles.imageInvoice}
            />
          </View>
        </View>
      );
    }
  };
  close = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      isOpenFooter: false,
    });
  };
  close1 = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      isOpenFooter: true,
    });
  };
  _renderFooter() {
    const dataOrderDetailScreen = this.props.navigation.getParam('dataOrderDetailScreen', null);
    const { isOpenFooter, medOrderInfo } = this.state;
    return (
      <Footer
        dataOrderDetailScreen={dataOrderDetailScreen}
        isOpenFooter={isOpenFooter}
        medOrderInfo={medOrderInfo}
        _onClickFinishedOrder={() => this._onClickFinishedOrder()}
        _onClickAcceptOrder={() => this._onClickAcceptOrder()}
        onPress={() => this.close()}
        onPress1={() => this.close1()}
      />
    );
  }

  _renderOverlay() {
    return (
      this.state.isOpenFooter && (
        <TouchableWithoutFeedback
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.setState({
              isOpenFooter: false,
            });
          }}
        >
          <View style={styles.containerOverlay} />
        </TouchableWithoutFeedback>
      )
    );
  }

  _renderCancelPopup() {
    if (this.props.info !== null) {
      let data = {
        drg_store_id: this.props.info.drg_store_id,
        drg_store_code: this.props.info.drg_store_code,
        medOrderIdCancel: this.state.medOrderInfo.med_order_id,
        providerName: this.state.medOrderInfo.provider_name,
      };
      return (
        <PopupCancelOrder
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
          data={data}
          navigation={this.props.navigation}
          onDismissed={() => {
            this._goBack();
          }}
          changeLoadingIndicator={this._changeLoadingIndicator}
        />
      );
    }
  }

  render() {
    const { isLoading, error, isFetching } = this.state;
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        {!isLoading && !error ? (
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View style={{ flex: 1, paddingHorizontal: vw(10), paddingVertical: vw(10) }}>
                {this._renderInfo()}
                {this._renderListProduct()}
                {this._renderInvoiceImage()}
              </View>
            </ScrollView>
            {this._renderFooter()}
          </View>
        ) : (
          <View style={styles.containerError}>
            <Text>{error.message}</Text>
          </View>
        )}
        {this._renderCancelPopup()}
        {this._renderOverlay()}
        <LoaderIndicator loading={isFetching} />
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    data: state.auth.data3,
    store: state.user.dataUser.store,
    typeOrderBy: state.order.typeOrderBy,
  };
}

const mapDispatchToProps = {
  getDataHomeAction,
  getMyOrderListAction,
  changeTab,
  getPointWallet,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDetailScreen);
