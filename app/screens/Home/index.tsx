import React from 'react';
import {
  View,
  StatusBar,
  Image,
  BackHandler,
  Alert,
  Platform,
  Keyboard,
  Linking,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import {
  ICON_ACCOUNT,
  ICON_ACCOUNT_DISABLE,
  ICON_HOME,
  ICON_HOME_DISABLE,
  ICON_LIST_ORDER,
  ICON_LIST_ORDER_DISABLE,
  ICON_MY_ORDER,
  ICON_TAB_NEW,
  ICON_MY_ORDER_DISABLE,
  ICON_PROVIDER,
  ICON_PROVIDER_DISABLE,
  MAIN_COLOR,
  TAB,
  ICON_DRUGSTORE,
  ICON_ORDER_ONLINE,
} from '../../constants/index';
import TabNavigator from 'react-native-tab-navigator';

import vw from '../../utils/size-dynamic';
import HomeScreen from '../HomeScreen';
import ListOrderScreen from '../ListOrderScreen';
import MyOrderScreen from '../MyOrderScreen';
import AccountScreen from '../AccountScreen';
import NewsScreen from '../NewsScreen';
import DrugStoreTab from '../DrugStoreTab';
import API from '../../api';
import { HISTORY_ORDER_SCREEN, HOME, MY_ORDER_SCREEN } from '../../redux/types';
import ProviderScreen from '../ProviderScreen';
import { getMyOrderListAction } from '../../redux/action/order';
import { getDataHomeAction } from '../../redux/action/home';
import { changeTabNavigator } from '../../redux/action/navigation';
import { MyStatusBar } from '../../elements/MyStatusBar';
import LoaderIndicator from '../../elements/LoaderIndicator';
import VersionCheck from 'react-native-version-check';
import firebase from 'react-native-firebase';
import { Notification, NotificationOpen, } from 'react-native-firebase';
import config from '../../config';
import { informationVersionNew } from '../../constants/';
import EventBus from '../../utils/EventBus';
import { DETAIL_ORDER_PHARMACY } from '../../redux/types';
interface Props {
  navigation: Function;
  getDataHomeAction: Function;
  data: any;
  selectedTabNavigator: string;
  changeTabNavigator: any;
}
interface State {
  refreshing: boolean;
  isFetching: boolean;
  //selectedTab: any;
}

class Home extends React.PureComponent<Props, State> {
  removeNotificationDisplayedListener!: () => any;
  removeNotificationListener!: () => any;
  removeNotificationOpenedListener!: () => any;
  constructor(props: Props) {
    super(props);
    this.state = {
      //selectedTab: props.data && props.data.tabType ? props.data.tabType : 'HOME_TAB',
      refreshing: false,
      isFetching: false,
    };
    StatusBar.setTranslucent(true);
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  };
  subscribeTopic = () => {
    firebase.messaging().subscribeToTopic(config.notifycation.order);
    firebase.messaging().subscribeToTopic(config.notifycation.notifycation_order_function);
    firebase.messaging().subscribeToTopic(config.notifycation.notification_new_policy);
    firebase.messaging().subscribeToTopic(config.notifycation.notification_holiday);
    firebase.messaging().subscribeToTopic(config.notifycation.notification_tet_holiday);
    firebase.messaging().subscribeToTopic(config.notifycation.notification_news);
  };
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.data && nextProps.data.tabType) {
      this.setState({ selectedTab: nextProps.data.tabType });
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  goToScreenOrder = async () => {
    await EventBus.fireEvent('OrderNew');
    this.changeTabNavigator(TAB.HOME_TAB);
  };
  goToOrderPharmacy = value => {
    this.props.navigation.navigate(DETAIL_ORDER_PHARMACY, { item: value });
  };
  componentDidMount = async () => {
    this.checkPermission();
    this.subscribeTopic();
    this.checkUpdate();
    this.removeNotificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed((notification: Notification) => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      });
    this.removeNotificationListener = firebase.notifications().onNotification((notification: Notification) => {
      if (notification._title === 'Medlink c???p nh???t t??nh n??ng m???i:') {
        this.show(notification._title, notification._body);
        Alert.alert(
          notification._title,
          notification._body,
          [{ text: '?????ng ??', onPress: () => console.log('Ask me later pressed') }],
          { cancelable: false },
        );
      }
      if (notification._body === '????n h??ng m???i t??? ???ng d???ng Medlink') {
        this.show(notification._title, notification._body);
      }
      if (notification._title === 'Tr???ng th??i ????n ?????t h??ng') {
        this.show1(notification._title, notification._body, notification._data.supply_order_id);
      }
      // Process your notification as required
    });
    this.removeNotificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen: NotificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;
        if (notification._body === '????n h??ng m???i t??? ???ng d???ng Medlink') {
          this.goToScreenOrder();
        }
        if (notification._title === 'Tr???ng th??i ????n ?????t h??ng') {
          this.goToOrderPharmacy(notification._data['key1']);
        }
      });
    const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      // App was opened by a notification
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification: Notification = notificationOpen.notification;
      if (notification._data['version_new'] !== undefined) {
        Alert.alert(
          'Medlink c???p nh???t t??nh n??ng m???i:',
          notification._data['version_new'].replace(/[.]/g, '\n'),
          [{ text: '?????ng ??', onPress: () => console.log('Ask me later pressed') }],
          { cancelable: false },
        );
      }
      if (notification._data['order_new'] !== undefined) {
        this.goToScreenOrder();
      }
      if (notification._data['status'] !== undefined) {
        this.goToOrderPharmacy(notification._data['supply_order_id']);
      }
    }
    // const notification = new firebase.notifications.Notification()
    //   .setNotificationId('notificationId')
    //   .setTitle('My notification title')
    //   .setBody('My notification body')
    //   .setData({
    //     key1: 'value1',
    //     key2: 'value2',
    //   });
    // // Display the notification
    // firebase.notifications().displayNotification(notification);
  };
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    this.removeNotificationDisplayedListener();
    this.removeNotificationListener();
    this.removeNotificationOpenedListener();
  }
  show = (title, value) => {
    const notification = new firebase.notifications.Notification()
      .setNotificationId('notificationId')
      .setTitle(title)
      .setBody(value)
      .android.setLargeIcon('ic_launcher')
      .android.setAutoCancel(true)
      .android.setPriority(firebase.notifications.Android.Priority.Max)
      .setData({
        key1: 'abc',
      });
    notification.android.setChannelId('channelId').android.setSmallIcon('ic_launcher');
    firebase.notifications().displayNotification(notification);
  };
  show1 = (title, value, e) => {
    const notification = new firebase.notifications.Notification({
      sound: 'default',
      show_in_foreground: true,
    })
      .setNotificationId('notificationId')
      .setTitle(title)
      .setBody(value)
      .android.setLargeIcon('ic_launcher')
      .android.setAutoCancel(true)
      .setData({
        key1: e,
      });
    notification.android.setChannelId('channelId').android.setSmallIcon('ic_launcher');
    firebase.notifications().displayNotification(notification);
  };
  checkUpdate = () => {
    const value = Platform.OS === 'ios' ? 'App Store.' : 'CH Play.';
    VersionCheck.needUpdate().then(async res => {
      const currentVersion = VersionCheck.getCurrentVersion();
      const lastVersion = await VersionCheck.getLatestVersion();
      if (res.isNeeded) {
        Alert.alert(
          'Th??ng b??o',
          'Phi??n b???n m???i c???a ???ng d???ng Medlink ???? c?? tr??n ' +
          value +
          // 'Phi??n b???n hi???n t???i l?? ' +
          // currentVersion +
          // '\n' +
          // '\nPhi??n b???n m???i nh???t ' +
          // lastVersion +
          informationVersionNew,
          [
            { text: 'H???y', onPress: () => console.log('Ask me later pressed') },
            {
              text: 'C???p nh???t ngay',
              onPress: async () => {
                Platform.OS == 'android'
                  ? Linking.openURL(await VersionCheck.getStoreUrl())
                  : Linking.openURL('https://apps.apple.com/us/app/medlink-pharmacy/id1470921954?mt=8');
              },
            },
          ],
          { cancelable: false },
        );
      }
    });
  };

  handleBackPress = () => {
    if (this.props.navigation.isFocused()) {
      Alert.alert(
        'Th??ng b??o',
        'B???n c?? mu???n tho??t ???ng d???ng?',
        [{ text: 'H???y', onPress: () => false, style: 'cancel' }, { text: 'OK', onPress: () => BackHandler.exitApp() }],
        { cancelable: false },
      );
      return true;
    }
  };

  _onClickPickupOrder = () => {
    // this.setState({ selectedTab: TAB.PICKUP_ORDER_TAB })
    this.props.navigation.navigate(MY_ORDER_SCREEN, {
      beforeScreen: 'home',
    });
  };

  _onClickOrderBanner = () => {
    this.props.changeTabNavigator(TAB.PROVIDER_TAB)
    // this.setState({ selectedTab: TAB.PROVIDER_TAB });
  };

  _onClickFinishedOrder = () => {
    this.props.navigation.navigate(HISTORY_ORDER_SCREEN, {
      beforeScreen: 'home',
    });
  };
  _getDataHomeAction = () => {
    this.props.getDataHomeAction(this.props.info.drg_store_id, this.props.typeOrderBy);
    this.props.navigation.dispatch({ data: { tabType: this.state.selectedTab }, type: HOME });
  };

  _getDirections(startLoc, destinationLoc, item) {
    this.setState({ isFetching: true });
    const { drg_store_id, drg_store_code } = this.props.dataUser.info;
    API.mapApi
      .getDirections(startLoc, destinationLoc)
      .then(res => {
        if (res == false) {
          this.setState({ isFetching: false });
          Alert.alert('L???i', 'Kh??ng t??m th???y ?????a ch??? giao h??ng!');
        }
        if (res !== false) {
          this.setState({
            distance: res.distance,
          });
          if (res.distance <= 50) {
            this.setState({ refreshing: true }, () => {
              API.orderApi
                .acceptOrder(drg_store_id, drg_store_code, item.med_order_id)
                .then(res => {
                  this.setState(
                    {
                      refreshing: false,
                      isFetching: false,
                    },
                    async () => {
                      // await this.setState({
                      //   selectedTab: 'PICKUP_ORDER_TAB'
                      // });
                      await this.props.getMyOrderListAction(this.props.dataUser.info.drg_store_id, '');
                      await this.props.getDataHomeAction(this.props.dataUser.info.drg_store_id, '');
                      API.notification.scheduleLocalNotificationDelivery(item);
                      API.notification.scheduleLocalNotificationCompleteOrder(item);
                      this.props.navigation.navigate(MY_ORDER_SCREEN, {
                        beforeScreen: 'Home',
                      });
                    },
                  );
                })
                .catch(err => {
                  this.setState({ refreshing: false, isFetching: false });
                  Alert.alert('L???i', 'C?? l???i x???y ra');
                  API.orderApi
                    .getOrderDetails(item.med_order_id)
                    .then(res => {
                      if (res.data.med_order_pool != undefined && res.data.med_order_pool.status === 1) {
                        Alert.alert(
                          '????n h??ng ???? ???????c nh?? thu???c kh??c nh???n!',
                          'C???m ??n qu?? nh?? thu???c ???? s??? d???ng ???ng d???ng Medlink. \nVui l??ng ti???p t???c s??? d???ng d???ch v??? ????? nh???n ????n ti???p theo!',
                          [
                            {
                              text: 'Ok',
                              onPress: () => this._getDataHomeAction(),
                            },
                          ],
                        );
                        this.setState({
                          refreshing: false,
                          isFetching: false,
                        });
                      }
                    })
                    .catch(err => {
                      Alert.alert(
                        '????n h??ng ???? ???????c nh???n!',
                        'C???m ??n qu?? nh?? thu???c ???? s??? d???ng ???ng d???ng MedLink. \nVui l??ng ti???p t???c s??? d???ng d???ch v??? ????? nh???n ????n ti???p theo!',
                        [
                          {
                            text: 'Ok',
                            onPress: () => this._getDataHomeAction(),
                          },
                        ],
                      );
                      this.setState({
                        refreshing: false,
                        isFetching: false,
                      });
                    });
                });
            });
          } else {
            this.setState({ isFetching: false });
            Alert.alert('Th??ng b??o', 'B???n kh??ng th??? nh???n ????n v???i kho???ng c??ch qu?? 50km.', [{ text: 'OK' }], {
              cancelable: false,
            });
          }
        }
      })
      .catch(error => {
        this.setState({ isFetching: false });
      });
  }

  _onClickAcceptOrder = item => {
    if (this.state.refreshing) return;
    start = this.props.store.address1 + ',' + this.props.store.district;
    end = item.address1 + ',' + item.district;
    if (start != null && start != '' && end != null && end != '') {
      this._getDirections(start, end, item);
    }
  };

  changeTabNavigator = (nameTab: string) => {
    this.props.changeTabNavigator(nameTab);
    Keyboard.dismiss();
  };

  _renderHomeTab() {
    return (
      <TabNavigator.Item
        selected={this.props.selectedTabNavigator === TAB.HOME_TAB}
        title="????n Online"
        tabStyle={{ justifyContent: 'center' }}
        renderIcon={() => (
          <Image source={ICON_ORDER_ONLINE} style={{ width: vw(20), height: vw(20), resizeMode: 'contain' }} />
        )}
        renderSelectedIcon={() => (
          <Image
            source={ICON_ORDER_ONLINE}
            style={{ width: vw(20), height: vw(20), resizeMode: 'contain',tintColor: '#61A02C' }}
            tintColor={MAIN_COLOR}
          />
        )}
        onPress={() => this.changeTabNavigator(TAB.HOME_TAB)}
        titleStyle={{ fontFamily: 'Arial', fontSize: vw(10), color: '#828282', }}
        selectedTitleStyle={{ color: MAIN_COLOR }}
      >
        <HomeScreen
          navigation={this.props.navigation}
          onClickPickupOrder={this._onClickPickupOrder}
          onClickFinishedOrder={this._onClickFinishedOrder}
          onClickAcceptOrder={this._onClickAcceptOrder}
          onClickOrderBanner={this._onClickOrderBanner}
        />
      </TabNavigator.Item>
    );
  }

  _renderOrderListTab() {
    return (
      <TabNavigator.Item
        selected={this.props.selectedTabNavigator === TAB.NEW_ORDER_TAB}
        title="Danh s??ch ????n"
        tabStyle={{ justifyContent: 'center' }}
        renderIcon={() => (
          <Image source={ICON_LIST_ORDER_DISABLE} style={{ width: vw(20), height: vw(20), resizeMode: 'contain' }} />
        )}
        renderSelectedIcon={() => (
          <Image source={ICON_LIST_ORDER} style={{ width: vw(20), height: vw(20), resizeMode: 'contain' }} />
        )}
        onPress={() => this.changeTabNavigator(TAB.NEW_ORDER_TAB)}
        titleStyle={{ fontFamily: 'Arial', fontSize: vw(10), color: '#828282',tintColor: '#61A02C' }}
        selectedTitleStyle={{ color: MAIN_COLOR }}
      >
        <ListOrderScreen navigation={this.props.navigation} onClickAcceptOrder={this._onClickAcceptOrder} />
      </TabNavigator.Item>
    );
  }
  _renderNewsTab() {
    return (
      <TabNavigator.Item
        selected={this.props.selectedTabNavigator === TAB.NEWS_TAB}
        title="Ki???n th???c"
        tabStyle={{ justifyContent: 'center' }}
        renderIcon={() => (
          <Image source={ICON_TAB_NEW} style={{ width: vw(20), height: vw(20), resizeMode: 'contain' }} />
        )}
        renderSelectedIcon={() => (
          <Image
            source={ICON_TAB_NEW}
            style={{ width: vw(20), height: vw(20), resizeMode: 'contain', tintColor: '#61A02C' }}
          />
        )}
        onPress={() => this.changeTabNavigator(TAB.NEWS_TAB)}
        titleStyle={{ fontFamily: 'Arial', fontSize: vw(10), color: '#828282' }}
        selectedTitleStyle={{ color: MAIN_COLOR }}
      >
        <NewsScreen navigation={this.props.navigation} />
      </TabNavigator.Item>
    );
  }

  _renderMyOrderTab() {
    return (
      <TabNavigator.Item
        selected={this.props.selectedTabNavigator === TAB.PICKUP_ORDER_TAB}
        title="????n c???a t??i"
        tabStyle={{ justifyContent: 'center' }}
        renderIcon={() => (
          <Image source={ICON_MY_ORDER_DISABLE} style={{ width: vw(20), height: vw(20), resizeMode: 'contain' }} />
        )}
        renderSelectedIcon={() => (
          <Image source={ICON_MY_ORDER} style={{ width: vw(20), height: vw(20), resizeMode: 'contain',tintColor: '#61A02C' }} />
        )}
        onPress={() => this.changeTabNavigator(TAB.PICKUP_ORDER_TAB)}
        titleStyle={{ fontFamily: 'Arial', fontSize: vw(10), color: '#828282' }}
        selectedTitleStyle={{ color: MAIN_COLOR }}
      >
        <MyOrderScreen navigation={this.props.navigation} />
      </TabNavigator.Item>
    );
  }

  _renderDrugStoreTab() {
    return (
      <TabNavigator.Item
        selected={this.props.selectedTabNavigator === TAB.DRUG_STORE_TAB}
        title="Nh?? thu???c"
        tabStyle={{ justifyContent: 'center' }}
        renderIcon={() => (
          <Image source={ICON_DRUGSTORE} style={{ width: vw(20), height: vw(20), resizeMode: 'contain' }} />
        )}
        renderSelectedIcon={() => (
          <Image
            source={ICON_DRUGSTORE}
            style={{ width: vw(20), height: vw(20), resizeMode: 'contain', tintColor: '#61A02C' }}
          />
        )}
        onPress={() => this.changeTabNavigator(TAB.DRUG_STORE_TAB)}
        titleStyle={{ fontFamily: 'Arial', fontSize: vw(10), color: '#828282' }}
        selectedTitleStyle={{ color: MAIN_COLOR }}
      >
        <DrugStoreTab navigation={this.props.navigation} />
      </TabNavigator.Item>
    );
  }

  _renderProviderTab() {
    return (
      <TabNavigator.Item
        selected={this.props.selectedTabNavigator === TAB.PROVIDER_TAB}
        title="?????t h??ng"
        tabStyle={{ justifyContent: 'center' }}
        renderIcon={() => (
          <Image source={ICON_PROVIDER_DISABLE} style={{ width: vw(20), height: vw(20), resizeMode: 'contain' }} />
        )}
        renderSelectedIcon={() => (
          <Image source={ICON_PROVIDER} style={{ width: vw(20), height: vw(20), resizeMode: 'contain' }} />
        )}
        onPress={() => this.changeTabNavigator(TAB.PROVIDER_TAB)}
        titleStyle={{ fontFamily: 'Arial', fontSize: vw(10), color: '#828282' }}
        selectedTitleStyle={{ color: MAIN_COLOR }}
      >
        <ProviderScreen navigation={this.props.navigation} />
      </TabNavigator.Item>
    );
  }

  _renderAccountTab() {
    return (
      <TabNavigator.Item
        selected={this.props.selectedTabNavigator === TAB.ACCOUNT_TAB}
        title="T??i kho???n"
        tabStyle={{ justifyContent: 'center' }}
        renderIcon={() => (
          <Image source={ICON_ACCOUNT_DISABLE} style={{ width: vw(20), height: vw(20), resizeMode: 'contain' }} />
        )}
        renderSelectedIcon={() => (
          <Image source={ICON_ACCOUNT} style={{ width: vw(20), height: vw(20), resizeMode: 'contain' }} />
        )}
        onPress={() => this.changeTabNavigator(TAB.ACCOUNT_TAB)}
        titleStyle={{ fontFamily: 'Arial', fontSize: vw(10), color: '#828282' }}
        selectedTitleStyle={{ color: MAIN_COLOR }}
      >
        <AccountScreen navigation={this.props.navigation} />
      </TabNavigator.Item>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        <TabNavigator
          tabBarStyle={{
            height: vw(50),
            backgroundColor: '#FFFFFF',
            overflow: 'hidden',
            elevation: 5,
            borderTopWidth: 0.5,
            borderTopColor: '#e5e5e5',
          }}
          sceneStyle={{ paddingBottom: vw(50) }}
          tabBarShadowStyle={{ height: 0 }}
        >
          {this._renderDrugStoreTab()}
          {this._renderHomeTab()}
          {/* {this._renderOrderListTab()} */}
          {this._renderProviderTab()}
          {this._renderNewsTab()}
          {/* {this._renderMyOrderTab()} */}

          {this._renderAccountTab()}
        </TabNavigator>
        <LoaderIndicator loading={this.state.isFetching} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#E7E7E7',
  },
});

function mapStateToProps(state: any) {
  return {
    dataUser: state.user.dataUser,
    data: state.auth.data,
    store: state.user.dataUser.store,
    isfreshOrder: state.order.isfreshOrder,
    typeOrderBy: state.order.typeOrderBy,
    info: state.user.dataUser.info,
    selectedTabNavigator: state.navigation.selectedTabNavigator,
  };
}

const mapDispatchToProps = {
  getMyOrderListAction,
  getDataHomeAction,
  changeTabNavigator,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
