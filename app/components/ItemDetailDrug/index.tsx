import React, { PureComponent } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import MoneyFormat from '../../utils/MoneyFormat';
import { themes } from '../../constants';
import vw from '../../utils/size-dynamic/';
import styles from './ItemDetailDrug.styles';
type Props = {
  item: {
    discount: number;
    drg_drug_name: string;
    price: number;
    quantity: string;
    unit_name: string;
  };
};
type State = {};
class index extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    const { item } = this.props;
    return (
      <View style={styles.ItemContentWapper}>
        <View>
          <Text style={styles.txtName} numberOfLines={1}>
            {item.drg_drug_name}
          </Text>
          <Text style={styles.txtPrice}>{MoneyFormat(item.price)}</Text>
          {item.discount && item.discount !== 0 ? (
            <Text style={styles.txtDiscount}>Giảm giá {MoneyFormat(item.discount)}</Text>
          ) : null}
        </View>
        <View style={styles.ItemContentLayout}>
          <View style={[styles.wapperQuanlity, { width: vw(40) }]}>
            <TextInput
              style={[styles.inputUpdateQuanlity, { width: vw(40) }]}
              value={item.quantity.toString()}
              underlineColorAndroid={'rgba(0,0,0,0)'}
              keyboardType={'numeric'}
              selectionColor={themes.colors.COLOR_INPUT_PRICE}
              editable={false}
            />
            <Image source={themes.ICON_CARET_DOWN} style={styles.iconCaretDown} />
          </View>
          <Text style={styles.txtQuality}>{item.unit_name}</Text>
        </View>
      </View>
    );
  }
}

export default index;
