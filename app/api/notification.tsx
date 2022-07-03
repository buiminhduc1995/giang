// import FCM from 'react-native-fcm';
import Moment from 'moment/moment';
import firebase from 'react-native-firebase';
import client from './configApi';
import { token } from './authApi';
export default {
  checkPermission: async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // user has permissions
    } else {
      // user doesn't have permission
      await firebase.messaging().requestPermission();
    }
  },
  removeNotificationDisplayedListener() {},

  removeNotificationListener() {},

  scheduleLocalNotificationDelivery(item) {
    const shipDateTime = item.ship_datetime;
    const date = Moment(shipDateTime, 'HH:mm:ss DD/MM/YYYY');
    const distance = date.valueOf() - new Date().getTime();
    // console.log('distance notify', date.valueOf(),new Date().getTime(),date.valueOf() - 1800000);
    const time = distance < 1800000 ? date.valueOf() - distance + 5000 : date.valueOf() - 1800000;
    // console.log('date notify', time - new Date().getTime());
    // FCM.scheduleLocalNotification({
    //     id: item.med_order_id+'',
    //     fire_date: time,
    //     // fire_date: new Date().getTime() + 20000,
    //     vibrate: 500,
    //     title: "Đơn hàng cần giao vào lúc " + date.format('LT') + " hôm nay",
    //     body: item.order_title,
    //     sound: "default",
    //     sub_text: "Đơn hàng cần giao từ công ty " + item.provider_name,
    //     priority: "high",
    //     large_icon: "ic_launcher",
    //     show_in_foreground: true,
    //     wake_screen: true,
    //     channel:'ship_order',
    //     extra1: { a: 1 },
    //     extra2: 1,
    // });
  },

  scheduleLocalNotificationCompleteOrder(item) {
    const shipDateTime = item.ship_datetime;
    const date = Moment(shipDateTime, 'HH:mm:ss DD/MM/YYYY');
    // FCM.scheduleLocalNotification({
    //     id: item.med_order_id+1+'',
    //     fire_date: date.valueOf() + 1800000,
    //     // fire_date: new Date().getTime() + 30000,
    //     vibrate: 500,
    //     title: "Vui lòng cập nhật trạng thái hoàn thành đơn hàng trên ứng dụng",
    //     body: item.order_title,
    //     sound: "default",
    //     sub_text: "Đơn hàng cần giao từ công ty " + item.provider_name,
    //     priority: "high",
    //     large_icon: "ic_launcher",
    //     show_in_foreground: true,
    //     wake_screen: true,
    //     channel:'ship_order',
    //     extra1: { a: 1 },
    //     extra2: 1,
    // });
  },
  cancelLocalNotification(id) {
    // FCM.cancelLocalNotification(id + '');
    // FCM.cancelLocalNotification(id + 1 + '');
  },
  getNoti(drg_store_id, login_mode) {
    const url = `/drugstore/inventory/expired?drg_store_id=${drg_store_id}&login_mode=${login_mode}`;
    return client
      .get(url, {
        apiName: arguments.callee.name,
        headers: {
          Authorization: token,
        },
      })
      .then(response => response);
  },
};
