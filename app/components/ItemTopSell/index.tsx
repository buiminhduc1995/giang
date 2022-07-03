import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import styles from './ItemTopSell.styles';
import { themes } from '../../constants';
type Props = {
  onPress: () => void;
  item: {
    drg_drug_name: string;
    sold: string;
    unit_name: string;
  };
};
class index extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    const { onPress, item } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.wapper}>
          <Image source={themes.IMAGE_DRUG} style={styles.image} />
          <View style={styles.content}>
            <Text numberOfLines={2} style={styles.txtNameDrug}>
              {item.drg_drug_name}
            </Text>
            <Text style={styles.txtDescription}>Đang cập nhật mô tả thuốc</Text>
            <View style={styles.sell}>
              <Text style={styles.txtSell}>Đã bán</Text>
              <View style={styles.wapperSell}>
                <Text style={styles.numberSell}>{item.sold}</Text>
              </View>
              <Text style={styles.unit_name}>{item.unit_name}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default index;
