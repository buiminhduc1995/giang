import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './ItemHistoryOrderPharmacy.style';
import { themes } from '../../constants/index';
import Moment from 'moment/moment';
import MoneyFormat from '../../utils/MoneyFormat';
type Props = {
  onPress: any;
  item: any;
};
class index extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    const { item, onPress } = this.props;
    const value =
      item.status === 'draft' || item.status === 'wait_confirm'
        ? 'Chờ xác nhận'
        : item.status === 'order'
        ? 'Được xác nhận'
        : item.status === 'sent'
        ? 'Gửi báo giá'
        : item.status === 'transfering'
        ? 'Giao hàng'
        : item.status === 'done'
        ? 'Hoàn thành'
        : 'Đã hủy';
    const backgroundColor =
      item.status === 'draft' || item.status === 'wait_confirm'
        ? themes.colors.COLOR_ORDER_WAITING_CONFIRM
        : item.status === 'order'
        ? themes.colors.COLOR_ORDER_ACCEPT
        : item.status === 'sent'
        ? themes.colors.COLOR_ORDER_SEND
        : item.status === 'transfering'
        ? themes.colors.COLOR_ORDER_TRANSPORT
        : item.status === 'done'
        ? themes.colors.MAIN_COLOR
        : themes.colors.RED;
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Image source={themes.ICON_GOODS} style={[styles.icon]} resizeMode="contain" />
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.h1}>Mã đơn hàng </Text>
            <Text style={styles.h1}>{item.name}</Text>
          </View>
          <Text style={styles.h6}>Số sản phẩm: {item.number_product}</Text>
          <Text style={styles.h6}>{Moment(item.created_date).format('DD/MM/YYYY hh:mm:ss')}</Text>
        </View>
        <View style={styles.right}>
          <View style={[styles.containerStatus, { backgroundColor }]}>
            <Text style={styles.txtStatus}>{value}</Text>
          </View>
          <View>
            <Text style={styles.h1}>{MoneyFormat(item.amount)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default index;
