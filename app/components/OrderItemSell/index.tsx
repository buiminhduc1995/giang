import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ICON_PERSON, AMOUNT, MAIN_COLOR, ICON_RIGHT, themes } from '../../constants';
import styles from './OrderItemSell.style';
import MoneyFormat from '../../utils/MoneyFormat';
import vw from '../../utils/size-dynamic';
type Props = {
  item: {
    invoice_code: number;
    customer_name: string;
    amount: number;
    created_date: string;
  };
  onPress: () => void;
  action: any;
};
class OrderItemSell extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    const { item, onPress } = this.props;
    return (
      <View style={{ flex: 1, width: '100%' }}>
        <TouchableOpacity onPress={onPress} style={styles.container}>
          <View style={{ height: vw(85), flex: 6, justifyContent: 'space-between', paddingVertical: vw(10) }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.nameProduct}>Mã hóa đơn{}</Text>
              <Text style={[styles.txt, { color: themes.colors.BLACK_BASIC }]}>{item.invoice_code}</Text>
            </View>
            <View style={styles.row}>
              <Image source={ICON_PERSON} style={styles.iconPerson} resizeMode="contain" />
              <Text style={[styles.txt, { color: themes.colors.BLACK_BASIC }]}>{item.customer_name}</Text>
            </View>
            <View style={styles.row}>
              <Image source={AMOUNT} style={styles.iconAmount} resizeMode="contain" />
              <Text style={[styles.txt, { color: themes.colors.BLUE }]}>{MoneyFormat(item.amount)}</Text>
            </View>
          </View>
          <View style={styles.containerButton}>
            <View>{this.props.action()}</View>
            <Text style={styles.txtdate}>{item.created_date}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default OrderItemSell;
