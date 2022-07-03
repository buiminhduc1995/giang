import React, { Component } from 'react';
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
  action: any;
}

class ItemExportion extends Component<Props> {
  shouldComponentUpdate(prevProps: Props) {
    if (prevProps.status != this.props.status) return true;
    else return false;
  }
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
            {/* <Image source={ICON_RIGHT} style={styles.iconRight} /> */}
            <View>{this.props.action()}</View>
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
    marginTop: vw(5),
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
    width: vw(10),
    height: vw(10),
    tintColor: MAIN_COLOR,
  },
  imageIcon: {
    width: vw(20),
    height: vw(20),
    marginRight: vw(20),
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

export default ItemExportion;
