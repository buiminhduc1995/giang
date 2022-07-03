import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './ConnectTab.styles';
import { themes } from '../../constants';
import { MyStatusBar } from '../../elements/MyStatusBar';
import HeaderBar from '../../elements/HeaderBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ConnectExportHistory from '../ConnectExportHistory';
import ConnectImportHistory from '../ConnectImportHistory';
import ConnectInvoiceHistory from '../ConnectInvoiceHistory';
import TabPill from '../../components/TabPill/';
import { Navigation } from '../../dataType/index.d';
import { connect } from 'react-redux';
type Props = {
  navigation: Navigation;
  store: any;
};
type State = {};
class index extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }
  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={styles.buttonBack} onPress={() => this.props.navigation.goBack()}>
        <Image source={themes.ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtHeaderLeft}>Liên thông dược quốc gia</Text>
      </TouchableOpacity>
    );
  }
  _renderTab() {
    return (
      <ScrollableTabView
        initialPage={0}
        renderTabBar={() => <TabPill style={{ backgroundColor: themes.colors.BACKGROUND_COLOR }} />}
        tabBarPosition="top"
        onChangeTab={data => {}}
      >
        <View tabLabel={'Hóa đơn'} style={{ flex: 1 }}>
          <ConnectInvoiceHistory navigation={this.props.navigation} />
        </View>

        <View tabLabel={'Phiếu nhập'} style={{ flex: 1 }}>
          <ConnectImportHistory navigation={this.props.navigation} />
        </View>
        <View tabLabel={'Phiếu xuất'} style={{ flex: 1 }}>
          <ConnectExportHistory navigation={this.props.navigation} />
        </View>
      </ScrollableTabView>
    );
  }
  renderNotConnect = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={themes.ICON_HELP_COLOR} style={styles.iconHelp} />
        <Text style={styles.txtNotConnect}>
          {'Nhà thuốc chưa có tài khoản liên thông.' +
            '\n' +
            'Vui lòng liên hệ với nhà cung cấp để cập nhật tài khoản.' +
            '\n' +
            'Tổng đài: 0247 308 0333' +
            '  ' +
            'Hotline: 0926080333' +
            '\n' +
            'Email: hotro@medlink.vn'}
        </Text>
      </View>
    );
  };
  render() {
    const { store } = this.props;
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        {store.ref_account == null ? this.renderNotConnect() : this._renderTab()}
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    store: state.user.dataUser.store,
  };
}
export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true },
)(index);
