import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ICON_BACK, ICON_ADD_HOME, ICON_SEARCH, ICON_FILTER, MAIN_COLOR } from '../../constants';
import styles from './AddNewProductScreen.style';
import vw from '../../utils/size-dynamic';
import { MyStatusBar } from '../../elements/MyStatusBar';
import HeaderBar from '../../elements/HeaderBar';
type Props = {};
type State = {};
class AddNewProductScreen extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }
  _renderHeaderLeft() {
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={() => this.props.navigation.goBack()}
      >
        <Image
          source={ICON_BACK}
          style={{ width: vw(11), height: vw(20), resizeMode: 'contain', marginRight: vw(10) }}
        />
        <Text style={{ fontSize: vw(18), fontFamily: 'Arial', fontWeight: 'bold', color: '#ffffff' }}>
          Thêm sản phẩm mới
        </Text>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
      </View>
    );
  }
}

export default AddNewProductScreen;
