import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import withPreventDoubleClick from '../../elements/withPreventDoubleClick';
import styles from './OrderDetailScreen.styles';
import {
  ICON_MAP_MARKER_COLOR,
  ICON_NAVIGATION_BLUE,
  ICON_USER_COLOR,
  ICON_MOBILE_MAIN,
  ICON_CALENDAR_COLOR,
  ICON_HELP_COLOR,
} from '../../constants/themes';
import vw from '../../utils/size-dynamic/';
import Communications from 'react-native-communications';
import { MAIN_COLOR } from '../../constants';
import { DateFormatOrderDetail } from '../../utils/DateFormat';
const TouchableOpacityEx = withPreventDoubleClick(TouchableOpacity);
type Props = {
  medOrderInfo: any;
  _onClickOpenMap: any;
  dataOrderDetailScreen: any;
  _renderCampaignAdvertisement: any;
};
type State = {};
class InfoOrder extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    const { medOrderInfo, dataOrderDetailScreen } = this.props;
    return (
      <View style={{ marginBottom: vw(15) }}>
        <Text style={styles.title}>Thông tin giao hàng</Text>

        <View style={styles.wrapInfo}>
          <Text style={styles.infoItemTitle}>{medOrderInfo.order_title}</Text>
          <View style={styles.infoItem}>
            <View style={styles.infoItemWrapText}>
              <Image source={ICON_MAP_MARKER_COLOR} style={styles.infoItemIcon} />
              <Text style={styles.infoItemText}>{medOrderInfo.address1}</Text>
            </View>
            <TouchableOpacityEx
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => this.props._onClickOpenMap()}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Image source={ICON_NAVIGATION_BLUE} style={[styles.infoItemIcon, { marginTop: 0 }]} />
              <Text style={[styles.infoItemText, { color: '#2D9CDB' }]}>Chỉ đường</Text>
            </TouchableOpacityEx>
          </View>

          {(dataOrderDetailScreen.dataType === 'PICKUP_ORDER' ||
            dataOrderDetailScreen.dataType === 'FINISHED_ORDER') && (
            <View style={styles.infoItem}>
              <View style={styles.infoItemWrapText}>
                <Image source={ICON_USER_COLOR} style={styles.infoItemIcon} />
                <Text style={styles.infoItemText}>{medOrderInfo.customer_name}</Text>
              </View>
              <TouchableOpacityEx
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => {
                  Communications.phonecall(medOrderInfo.customer_phone_no, true);
                }}
              >
                <Image source={ICON_MOBILE_MAIN} style={[styles.infoItemIcon, { marginTop: 0 }]} />
                <Text style={[styles.infoItemText, { color: MAIN_COLOR }]}>{medOrderInfo.customer_phone_no}</Text>
              </TouchableOpacityEx>
            </View>
          )}

          <View style={styles.infoItem}>
            <View style={styles.infoItemWrapText}>
              <Image source={ICON_CALENDAR_COLOR} style={styles.infoItemIcon} />
              <Text style={styles.infoItemText}>{DateFormatOrderDetail(medOrderInfo.ship_datetime)}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoItemWrapText}>
              <Image source={ICON_HELP_COLOR} style={styles.infoItemIcon} />
              <Text style={styles.infoItemText}>COD - Nhận hàng thanh toán</Text>
            </View>
          </View>
          {medOrderInfo.note === '' ? null : this.props._renderCampaignAdvertisement()}
        </View>
      </View>
    );
  }
}

export default InfoOrder;
