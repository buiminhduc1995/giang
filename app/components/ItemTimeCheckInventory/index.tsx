import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './ItemTimeCheckInventory.styles';
type Props = {
  item: {
    check_date: string;
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
      <View style={styles.container}>
        <TouchableOpacity style={styles.wapper} onPress={onPress}>
          <Text style={styles.txt}>
            {item.check_date.slice(6, 8) + '/' + item.check_date.slice(4, 6) + '/' + item.check_date.slice(0, 4)}
          </Text>
          <View>
            <Text style={styles.txtButton}>></Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default index;
