import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import vw from '../../utils/size-dynamic';
import { colors, ICON_HELP } from '../../constants/themes';
type Props = {
  text: string;
  stylesContainer?: any;
};
class index extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    const { text, stylesContainer } = this.props;
    return (
      <View style={[styles.container, { ...stylesContainer }]}>
        <Image source={ICON_HELP} style={styles.image} />
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: vw(12),
    color: colors.BLACK,
    fontWeight: 'bold',
    marginTop: vw(5),
  },
  image: {
    width: vw(20),
    height: vw(20),
    resizeMode: 'contain',
  },
});
export default index;
