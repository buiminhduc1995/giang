import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text, LayoutAnimation, Image } from 'react-native';
import MoneyFormat from '../../utils/MoneyFormat';
import styles from './OrderDetailScreen.styles';
import vw from '../../utils/size-dynamic';
import { ICON_CLOSE, ICON_CARET_DOWN } from '../../constants/themes';
type Props = {
  _onClickFinishedOrder: Function;
  _onClickAcceptOrder: Function;
  isOpenFooter: any;
  medOrderInfo: any;
  dataOrderDetailScreen: any;
  onPress: Function;
  onPress1:Function
};
type State = {};
class Footer extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    const { isOpenFooter, medOrderInfo, dataOrderDetailScreen, onPress ,onPress1 } = this.props;
    return (
      <View style={styles.wrapFooter}>
        <View style={[styles.containerFooter, { height: isOpenFooter ? 'auto' : 0 }]}>
          <View style={{ padding: vw(10) }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={()=>onPress()} hitSlop={{ top: vw(5), bottom: vw(5), left: vw(5), right: vw(5) }}>
                <Image source={ICON_CLOSE} style={styles.iconClose} />
              </TouchableOpacity>
              <Text style={styles.txtSummaryFooter}>Tóm tắt</Text>
            </View>
            <View style={{ paddingVertical: vw(15) }}>
              <View style={styles.footerItem}>
                <Text style={styles.footerItemText}>Tổng đơn</Text>
                <Text style={styles.footerItemText}>{MoneyFormat(medOrderInfo.amount)}</Text>
              </View>
              <View style={styles.footerItem}>
                <Text style={styles.footerItemText}>Vận chuyển</Text>
                <Text style={styles.footerItemText}>Free</Text>
              </View>
              <View style={[styles.footerItem, { marginBottom: 0 }]}>
                <Text style={[styles.footerItemText, { color: '#4F4F4F', fontWeight: 'bold' }]}>Tổng</Text>
                <Text style={[styles.footerItemText, { color: '#4F4F4F', fontWeight: 'bold' }]}>
                  {MoneyFormat(medOrderInfo.amount)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.buttonFooterAnimation}
          onPress={()=>onPress1()}
        >
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.txtSum}>Tổng cộng</Text>
              <Image source={ICON_CARET_DOWN} style={styles.iconCaretDown} />
            </View>
            <Text style={styles.txtSumAmountCurrent}>{MoneyFormat(medOrderInfo.amount)}</Text>
          </View>
          {dataOrderDetailScreen.dataType === 'PICKUP_ORDER' ? (
            <TouchableOpacity style={styles.wrapBtn} onPress={()=>this.props._onClickFinishedOrder()}>
              <Text style={styles.btnText}>Hoàn thành</Text>
            </TouchableOpacity>
          ) : dataOrderDetailScreen.dataType === 'NEW_ORDER' ? (
            <TouchableOpacity style={styles.wrapBtn} onPress={()=>this.props._onClickAcceptOrder()}>
              <Text style={styles.btnText}>Nhận đơn</Text>
            </TouchableOpacity>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }
}

export default Footer;
