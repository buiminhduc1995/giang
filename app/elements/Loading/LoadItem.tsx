import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'rn-placeholder';

import vw from '../../utils/size-dynamic';
import { WHITE } from '../../constants';

type Props = {
  number?: Number;
  loading?: Boolean;
  style?: any;
  animation?: any;
};

class LoaderItem extends PureComponent<Props> {
  render() {
    return (
      <Placeholder Left={PlaceholderMedia} Animation={Fade} style={styles.container}>
        <PlaceholderLine width={80} />
        <PlaceholderLine width={30} />
      </Placeholder>
    );
  }
}

export default LoaderItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: vw(5),
    backgroundColor: WHITE,
    padding: vw(10),
    height: vw(80),
    borderRadius: vw(3),
  },
});
