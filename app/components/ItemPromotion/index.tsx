import React, { PureComponent } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './ItemPromotion.style';
class ListItemPromotion extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { item } = this.props;
    return (
      <View style={{ marginRight: 10 }}>
        <Image source={{ uri: item.image }} style={{ height: 88, width: 293,borderRadius:5 }} />
        <TouchableOpacity style={styles.touch}>
          <Text style={styles.txtButton}>Sử dụng</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ListItemPromotion;
