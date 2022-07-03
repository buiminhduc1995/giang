import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './ItemNoti.style';
import { themes } from '../../constants/index';
type Props = {
  item: {
    notify_content: any;
    updated_date: string;
  };
};
class ItemNoti extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    const { item } = this.props;
    const value = JSON.parse(item.notify_content);
    return (
      <View style={{ flex: 1, width: '100%', paddingHorizontal: 10, paddingTop: 5 }}>
        <View style={styles.containerItem}>
          <Image source={themes.IMAGE_DRUG} style={styles.imageItem} />
          <View style={styles.content}>
            <Text numberOfLines={2} style={[styles.txtTitle, { fontWeight: 'bold' }]}>
              {'Sản phẩm' + ' ' + value.drug_cd + ' - ' + value.drug_name}
            </Text>
            <Text numberOfLines={2} style={[styles.txtTitle, { fontWeight: 'bold' }]}>
              {'Lô sản xuất' + ' ' + value.lot}
            </Text>
            <Text numberOfLines={2} style={[styles.txtTitle, { fontWeight: 'bold' }]}>
              {'Hết hạn ngày' +
                ' ' +
                value.exp_date.slice(6, 8) +
                '/' +
                value.exp_date.slice(4, 6) +
                '/' +
                value.exp_date.slice(0, 4)}
            </Text>
            <Text style={styles.txtDate}>{item.updated_date.slice(8, 19)}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default ItemNoti;
