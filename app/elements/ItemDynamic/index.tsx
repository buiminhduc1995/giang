import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import vw from '../../utils/size-dynamic/';
import { SHADOW, themes } from '../../constants';
type Props = {
  source: any;
  center: any;
  right: any;
  onPress: () => void;
  disabled: any;
  styleWapper: any;
  item: object;
  stylesImage: any;
};
class index extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  renderCenter = (item: object) => {
    return this.props.center(item);
  };
  renderRight = (item: object) => {
    return this.props.right(item);
  };
  render() {
    const { source, onPress, disabled, item, styleWapper, stylesImage } = this.props;
    return (
      <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.container, { ...styleWapper }]}>
        <Image source={source} style={stylesImage} />
        <View style={styles.wapper}>
          <View style={{ marginLeft: source === undefined ? vw(0) : vw(5) }}>{this.renderCenter(item)}</View>
        </View>
        <View style={styles.Right}>{this.renderRight(item)}</View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    width: '100%',
    padding: vw(5),
    // ...SHADOW,
    justifyContent: 'space-between',
    backgroundColor: themes.colors.WHITE,
    borderRadius: vw(5),
    marginBottom: vw(5),
  },
  wapper: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: 'red',
  },
  Right: {
    // flex: 2,
  },
});
export default index;
