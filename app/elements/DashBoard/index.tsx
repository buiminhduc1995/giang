import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { ICON_RIGHT, WHITE, SHADOW } from '../../constants/index';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade, Shine, ShineOverlay, Progressive } from 'rn-placeholder';
import styles from './DashBoard.styles';
import vw from '../../utils/size-dynamic';
type Props = {
  onPress: any;
  source: any;
  title: string;
  status: boolean;
};
class index extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { onPress, source, title, status } = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={[styles.conatinerButton, { backgroundColor: WHITE, ...SHADOW }]}>
        {status ? (
          <View style={{marginTop:vw(10)}}>
            <Placeholder
              Left={PlaceholderMedia}
              Animation={ShineOverlay}
              style={{
                width: vw(50),
                height: vw(50),
                // alignItems: 'center',
                // justifyContent: 'center',
                flexDirection: 'column',
              }}
            ></Placeholder>
            <View style={{alignItems:'center',}}>
              <PlaceholderLine width={120} style={{ marginTop: vw(5) }} />
            </View>
          </View>
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Image source={source} style={styles.image} />
            <Text style={styles.txt}>{title}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

export default index;
