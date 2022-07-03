import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './ItemImport.styles';
import { themes } from '../../constants';
import vw from '../../utils/size-dynamic';
type Props = {
  item: {
    import_code: number;
    company_name: string;
    status: number;
    updated_date: string;
  };
  status: any;
  onPress: any;
  title: string;
  detail: string;
  onPressConnect: any;
};
class index extends PureComponent<Props> {
  render() {
    const { item, status, onPress, title, detail, onPressConnect } = this.props;
    const value = status === 9 ? 'Đã hủy' : item.status === 2 ? 'Hoàn thành' : 'Chờ duyệt';
    const background =
      status === 9 ? themes.colors.RED : item.status === 0 ? themes.colors.YELLOW : themes.colors.MAIN_COLOR;
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.wapperLayout}>
          <View style={styles.layoutInfor}>
            <Text style={styles.title}>MÃ PHIẾU:</Text>
            <Text style={styles.title}>{item.import_code}</Text>
          </View>
          <View style={styles.layoutInfor}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.title}>{detail}</Text>
          </View>
          <View style={styles.layoutInfor}>
            <Text style={styles.title}>NCC:</Text>
            <Text style={styles.title}>{item.company_name}</Text>
          </View>
        </View>
        <View style={styles.wapperLayout}>
          {status !== undefined ? (
            <View style={styles.buttonIcon}>
              <Image source={themes.ICON_RIGHT} style={{ width: vw(10), height: vw(10) }} resizeMode="contain" />
            </View>
          ) : (
            <TouchableOpacity
              onPress={onPressConnect}
              style={[styles.boxStatus, { backgroundColor: themes.colors.MAIN_COLOR }]}
            >
              <Text style={styles.txt}>Liên thông</Text>
            </TouchableOpacity>
          )}

          {status !== undefined ? (
            <View style={[styles.boxStatus, { backgroundColor: background, width: vw(70) }]}>
              <Text style={styles.txt}>{value}</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.datetime}>{item.updated_date}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

export default index;
