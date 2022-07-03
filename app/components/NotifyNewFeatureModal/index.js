import React, { Component } from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { HOME, LOGIN, HIDDEN_NOTIFY_NEWFEATURE, SHOW_NOTIFY_NEWFEATURE } from '../../redux/types';
// import FCM, { FCMEvent } from 'react-native-fcm';
import NotifyOrderModal from './NotifyOrderModal';
import NotifyNewPolicy from './NotifyNewPolicy';
import NotifyHoliday from './NotifyHoliday';
import NotifyNewVersion from './NotifyNewVersion';
import NotifyTetHoliday from './NotifyTetHoliday';
const platform = Platform.OS;

const body_notify_ios = {
  ORDER_FUNCTION: 'Đặt hàng nhanh chóng, triết khấu hấp dẫn với ứng dụng Medlink',
  NEW_POLICY: 'Điều khoản sử dụng',
  HOLIDAY: 'tet duong lich',
  NEW_VERSION: 'cap nhat ung dung medlink',
  TET_HOLIDAY: 'Thông báo lịch nghỉ Lễ Tết Nguyên Đán 2019',
};
const type_notify = {
  ORDER_FUNCTION: 'ORDER_FUNCTION',
  NEW_POLICY: 'NEW_POLICY',
  HOLIDAY: 'HOLIDAY',
  NEW_VERSION: 'NEW_VERSION',
  TET_HOLIDAY: 'TET_HOLIDAY',
};
class NotifyNewFeatureModal extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    // FCM.on(FCMEvent.Notification, notification => {
    //     this._handleNotifycation(notification);
    // });
    // FCM.getInitialNotification().then(notification => {
    //     this._handleNotifycation(notification);
    // })
    this._show();
  }

  _handleNotifycation = notification => {
    if (notification == undefined) return;
    if (notification.local_notification) {
    } else {
      let topic;
      if (platform === 'android') {
        const data = notification.from;
        topic = data.split('/')[2];
      } else {
        const body = notification.aps.alert.body;
        if (body === body_notify_ios.ORDER_FUNCTION) {
          topic = type_notify.ORDER_FUNCTION;
        }
        if (body === body_notify_ios.NEW_POLICY) {
          topic = type_notify.NEW_POLICY;
        }
        if (body === body_notify_ios.HOLIDAY) {
          topic = type_notify.HOLIDAY;
        }
        if (body === body_notify_ios.NEW_VERSION) {
          topic = type_notify.NEW_VERSION;
        }
        if (body === body_notify_ios.TET_HOLIDAY) {
          topic = type_notify.TET_HOLIDAY;
        }
      }

      if (topic === type_notify.ORDER_FUNCTION) {
        this.props.showNotify(type_notify.ORDER_FUNCTION);
      }
      if (topic === type_notify.NEW_POLICY) {
        this.props.showNotify(type_notify.NEW_POLICY);
      }
      if (topic === type_notify.HOLIDAY) {
        this.props.showNotify(type_notify.HOLIDAY);
      }
      if (topic === type_notify.NEW_VERSION) {
        this.props.showNotify(type_notify.NEW_VERSION);
      }
      if (topic === type_notify.TET_HOLIDAY) {
        this.props.showNotify(type_notify.TET_HOLIDAY);
      }
    }
  };

  componentDidUpdate() {
    if (this.props.showModalNewFeature !== null) {
      this._show();
    }
  }
  _show = () => {
    if (this.props.showModalNewFeature === type_notify.ORDER_FUNCTION) {
      this.notifyOrder.show();
    }
    if (this.props.showModalNewFeature === type_notify.NEW_POLICY) {
      this.newPolicy.show();
    }
    if (this.props.showModalNewFeature === type_notify.HOLIDAY) {
      this.holiday.show();
    }
    if (this.props.showModalNewFeature === type_notify.NEW_VERSION) {
      this.newVersion.show();
    }
    if (this.props.showModalNewFeature === type_notify.TET_HOLIDAY) {
      this.tetHoliday.show();
    }
  };

  _close = () => {
    if (this.props.showModalNewFeature == type_notify.ORDER_FUNCTION) {
      this.notifyOrder.close();
    }
    if (this.props.showModalNewFeature == type_notify.NEW_POLICY) {
      this.newPolicy.close();
    }
    if (this.props.showModalNewFeature == type_notify.HOLIDAY) {
      this.holiday.close();
    }
    if (this.props.showModalNewFeature == type_notify.NEW_VERSION) {
      this.newVersion.close();
    }
    if (this.props.showModalNewFeature == type_notify.TET_HOLIDAY) {
      this.tetHoliday.close();
    }
  };

  _onViewAfter = () => {
    this.newPolicy.close();
    this.props.hiddenNotify();
  };

  _onViewNow = () => {
    this.newPolicy.close();
    this.props.hiddenNotify();
    if (this.props.isLogged) {
      this.props.navigateScreen(HOME, 'ACCOUNT_TAB');
    } else {
      this.props.navigateScreen(LOGIN, 'ACCOUNT_TAB');
    }
  };

  _onPressOrder = () => {
    this.notifyOrder.close();
    this.props.hiddenNotify();
    this._scheduleLocalNotification();
    if (this.props.isLogged) {
      this.props.navigateScreen(HOME, 'PROVIDER_TAB');
    } else {
      this.props.navigateScreen(LOGIN, 'PROVIDER_TAB');
    }
  };
  _onPressOrderCancel = () => {
    this.notifyOrder.close();
    this.props.hiddenNotify();
    this._scheduleLocalNotification();
  };

  _closeHoliday = () => {
    this.props.hiddenNotify();
  };
  _scheduleLocalNotification() {
    // FCM.scheduleLocalNotification({
    //     id: "ORDER_FUNCTION",
    //     fire_date: new Date().getTime() + 86400000,
    //     vibrate: 500,
    //     title: "Chức năng mới trên MedLink",
    //     body: "Đặt hàng qua ứng dụng với công ty dược",
    //     sound: "default",
    //     sub_text: "Nhận ngay triết khấu hấp dẫn từ nhà cung cấp",
    //     priority: "high",
    //     large_icon: "ic_launcher",
    //     show_in_foreground: true,
    //     wake_screen: true,
    //     extra1: { a: 1 },
    //     extra2: 1,
    // });
  }
  _showLocalNotification() {
    // FCM.presentLocalNotification({
    //     channel: 'new_feature_channel',
    //     id: new Date().valueOf().toString(), // (optional for instant notification)
    //     title: "MedLink", // as FCM payload
    //     body: "Force touch to reply", // as FCM payload (required)
    //     sound: "default", // "default" or filename
    //     priority: "high", // as FCM payload
    //     click_action: "com.ecomedic.medlink", // as FCM payload - this is used as category identifier on iOS.
    //     badge: 10, // as FCM payload IOS only, set 0 to clear badges
    //     number: 10, // Android only
    //     ticker: "My Notification Ticker", // Android only
    //     auto_cancel: true, // Android only (default true)
    //     large_icon: "ic_launcher", // Android only
    //     icon: "ic_launcher", // as FCM payload, you can relace this with custom icon you put in mipmap
    //     big_text: "Đặt hàng qua ứng dụng với công ty dược", // Android only
    //     sub_text: "Nhận ngay triết khấu hấp dẫn từ nhà cung cấp", // Android only
    //     color: "red", // Android only
    //     vibrate: 300, // Android only default: 300, no vibration if you pass 0
    //     wake_screen: true, // Android only, wake up screen when notification arrives
    //     group: "group", // Android only
    //     ongoing: true, // Android only
    //     my_custom_data: "my_custom_field_value", // extra data you want to throw
    //     lights: true, // Android only, LED blinking (default false)
    //     show_in_foreground: true // notification when app is in foreground (local & remote)
    // });
  }
  render() {
    if (this.props.showModalNewFeature === type_notify.ORDER_FUNCTION) {
      return (
        <NotifyOrderModal
          ref={node => (this.notifyOrder = node)}
          onPressOrderCancel={this._onPressOrderCancel}
          onPressOrder={this._onPressOrder}
        />
      );
    } else if (this.props.showModalNewFeature === type_notify.NEW_POLICY) {
      return (
        <NotifyNewPolicy
          ref={node => (this.newPolicy = node)}
          onViewNow={this._onViewNow}
          onViewAfter={this._onViewAfter}
        />
      );
    } else if (this.props.showModalNewFeature === type_notify.HOLIDAY) {
      return <NotifyHoliday ref={node => (this.holiday = node)} closeHoliday={this._closeHoliday} />;
    } else if (this.props.showModalNewFeature === type_notify.NEW_VERSION) {
      return <NotifyNewVersion ref={node => (this.newVersion = node)} closeHoliday={this._closeHoliday} />;
    } else if (this.props.showModalNewFeature === type_notify.TET_HOLIDAY) {
      return <NotifyTetHoliday ref={node => (this.tetHoliday = node)} closeHoliday={this._closeHoliday} />;
    } else return null;
  }
}

function mapStateToProps(state) {
  return {
    isLogged: state.user.isLogged,
    showModalNewFeature: state.notify.showModalNewFeature,
  };
}

const mapDispatchToProps = dispatch => ({
  navigateScreen: (screen, tab) => dispatch({ type: screen, data: { tabType: tab } }),
  hiddenNotify: () => dispatch({ type: HIDDEN_NOTIFY_NEWFEATURE }),
  showNotify: type_notify => dispatch({ type: SHOW_NOTIFY_NEWFEATURE, type_notify }),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotifyNewFeatureModal);
