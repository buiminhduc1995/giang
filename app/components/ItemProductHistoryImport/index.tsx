import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './ItemProductHistoryImport.style';
import Moment from 'moment/moment';
import { themes } from '../../constants/index';
import MoneyFormat from '../../utils/MoneyFormat';
import vw from '../../utils/size-dynamic';
type Props = {
  item: {
    drg_drug_name: string;
    vat_percent: number;
    quantity: number;
    unit_name: string;
    expired_date: string;
    lot: string;
    price: number;
  };
  onPress: () => void;
};
class index extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    const { item, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Image source={themes.IMAGE_DRUG} style={styles.image} />
        <View style={{ flex: 1, marginLeft: 5 }}>
          <Text style={styles.txtName} numberOfLines={1}>
            {item.drg_drug_name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.txtprice}>{MoneyFormat(item.price)}</Text>
            <Text style={styles.txt12}>(VAT {item.vat_percent === -1 ? 'Không thuế' : item.vat_percent + '%'} )</Text>
          </View>
          <View style={styles.wapperItem}>
            <View style={styles.quanlity}>
              <Text style={styles.amount}>{item.quantity}</Text>
            </View>
            <Text style={{ paddingLeft: vw(10), fontSize: vw(12) }}>{item.unit_name}</Text>
          </View>
          <Text style={styles.txt12}>{'Hạn sử dụng:' + '  ' + Moment(item.expired_date).format('DD/MM/YYYY')}</Text>
          <Text style={styles.txt12}>Lô sản xuất: {item.lot}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default index;
