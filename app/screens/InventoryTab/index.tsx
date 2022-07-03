import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './InventoryTab.styles';
import { ICON_BACK } from '../../constants';
import { MyStatusBar } from '../../elements/MyStatusBar';
import HeaderBar from '../../elements/HeaderBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import InvImportHistory from '../InvImportHistory/';
import InvExportHistory from '../InvExportHistory';
import InvCheckHistory from '../InvCheckHistory';
import { Navigation } from '../../dataType';
import TabPill from '../../components/TabPill/';
type Props = {
  navigation: Navigation;
};
type State = {
  import_code: any;
  status: any;
};
class index extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      import_code: '',
      status: '',
    };
  }
  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }
  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={styles.buttonBack} onPress={() => this.props.navigation.goBack()}>
        <Image source={ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtHeaderLeft}>Kho</Text>
      </TouchableOpacity>
    );
  }
  componentWillReceiveProps(nextProps: any) {
    this.setState({
      import_code: nextProps.navigation.state.params.import_code,
      status: nextProps.navigation.state.params.status,
    });
  }
  _renderTab() {
    return (
      <ScrollableTabView
        initialPage={0}
        renderTabBar={() => <TabPill style={{ backgroundColor: '#F0EDEE' }} />}
        tabBarPosition="top"
        onChangeTab={data => {}}
      >
        <View tabLabel={'Nhập kho'} style={{ flex: 1 }}>
          <InvImportHistory
            import_code={this.state.import_code}
            status={this.state.status}
            navigation={this.props.navigation}
          />
        </View>

        <View tabLabel={'Xuất kho'} style={{ flex: 1 }}>
          <InvExportHistory
            navigation={this.props.navigation}
            export_code={this.props.navigation.getParam('export_code')}
            status={this.props.navigation.getParam('status')}
          />
        </View>
        <View tabLabel={'Kiểm kho'} style={{ flex: 1 }}>
          <InvCheckHistory navigation={this.props.navigation} />
        </View>
      </ScrollableTabView>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        {this._renderTab()}
      </View>
    );
  }
}

export default index;
