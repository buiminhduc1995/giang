import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ICON_PERSON, MAIN_COLOR, ICON_RIGHT, BLACK } from '../../constants';
import vw from '../../utils/size-dynamic';

interface Props {
  onPress: () => void;
  text_10: string;
  text_11: string;
  status?: string;
  statusContainer?: object;
  name: string;
  icon_3: any;
  text_3: string;
  time_date: string;
}

class ItemInvHistory extends PureComponent<Props> {
  render() {
    const { onPress, text_10, text_11, status, statusContainer, name, icon_3, text_3, time_date } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.contentContainer}>
          <Text style={[styles.text, { fontWeight: 'bold' }]}>
            {text_10}
            <Text style={[styles.text, { fontWeight: 'normal' }]}> {text_11}</Text>
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {status ? (
              <View style={statusContainer}>
                <Text style={styles.textWhite}>{status}</Text>
              </View>
            ) : (
              <View style={[statusContainer, { backgroundColor: 'red' }]}>
                <Text style={styles.textWhite}>Đã hủy</Text>
              </View>
            )}
            <Image source={ICON_RIGHT} style={styles.iconRight} />
          </View>
        </View>
        <View style={styles.contentLeft}>
          <Image source={ICON_PERSON} style={[styles.imageIcon, { tintColor: BLACK }]} resizeMode="contain" />
          <Text style={styles.text}>{name}</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentLeft}>
            <Image source={icon_3} style={styles.imageIcon} resizeMode="contain" />
            <Text style={styles.text} numberOfLines={1}>
              {text_3}
            </Text>
          </View>
          <Text style={[styles.text, { fontSize: vw(10) }]}>{time_date}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexShrink: 1,
    padding: vw(7.5),
    marginTop: 5,
    backgroundColor: 'white',
    borderRadius: vw(3),
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vw(3),
  },
  contentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
  },
  iconRight: {
    width: 10,
    height: 10,
    tintColor: MAIN_COLOR,
  },
  imageIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  text: {
    color: BLACK,
    fontSize: vw(12),
    textAlignVertical: 'center',
  },
  textWhite: {
    fontSize: vw(12),
    color: '#FFF',
    fontFamily: 'Arial',
  },
});

export default ItemInvHistory;
