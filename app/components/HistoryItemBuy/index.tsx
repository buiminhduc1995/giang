import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ICON_DATETIME, ICON_DISTANCE } from '../../constants/';
class HistoryItemBuy extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { item } = this.props;
    return (
      <View
        style={{
          height: 59,
          borderRadius: 5,
          backgroundColor: 'white',
          marginTop: 10,
          paddingHorizontal: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: item.image }} style={{ width: 38, height: 38, borderRadius: 19, marginRight: 10 }} />
          <View>
            <Text style={{ fontSize: 14, color: '#4F4F4F', fontWeight: 'bold' }}>{item.nameDrug}</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', marginRight: 10 }}>
                <Image source={ICON_DATETIME} style={{ width: 14, height: 14, marginRight: 5 }} resizeMode="contain" />
                <Text style={{ fontSize: 12, color: '#828282' }}>{item.time}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image source={ICON_DISTANCE} style={{ width: 14, height: 14, marginRight: 5 }} resizeMode="contain" />
                <Text style={{ fontSize: 12, color: '#828282' }}>{item.distance}km</Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity>
            <Text style={{ fontSize: 14, color: '#2D9CDB', textAlign: 'right' }}>Chi tiết</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#4F4F4F' }}>
            {item.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}đ
          </Text>
        </View>
      </View>
    );
  }
}

export default HistoryItemBuy;
