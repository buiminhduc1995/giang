import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import styles from './InvImportCreateTabStep1.styles';
import { MyStatusBar } from '../../elements/MyStatusBar/';
import HeaderBar from '../../elements/HeaderBar/';
import { ICON_BACK, MAIN_COLOR, themes } from '../../constants/';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabPill from '../../components/TabPill/';
import ListProductBusiness from '../InvImportCreateWithBusiness/';
import ListProductDQG from '../InvImportCreateWithDQG/';
import vw from '../../utils/size-dynamic';
import { IVN_IMPORT_CREATE_STEP_2 } from '../../redux/types/';
import { deletedProductBusiness, deletedProductDQG, removeProduct } from '../../redux/action/inventory';
import { Navigation } from '../../dataType';
type Props = {
  navigation: Navigation;
  info: any;
  token: any;
  removeProduct: Function;
  deletedProductBusiness: Function;
  deletedProductDQG: Function;
  listProductBusiness: any;
  listProductDQG: any;
};
type State = {
  status: boolean;
};
class index extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      status: true,
    };
  }

  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }

  askGoBack = () => {
    if (this.props.navigation.getParam('isUpdate')) {
      Alert.alert(
        'Thông báo',
        'Bạn có chắc muốn hủy cập nhật phiếu nhập kho',
        [
          { text: 'Hủy', onPress: () => console.log('Ask me later pressed') },
          { text: 'Đồng ý', onPress: () => this.okGoBack() },
        ],
        { cancelable: false },
      );
    } else {
      this.props.navigation.goBack();
    }
  };

  okGoBack = () => {
    this.props.removeProduct();
    this.props.navigation.goBack();
  };

  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={styles.buttonBack} onPress={this.askGoBack}>
        <Image source={ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtHeaderLeft}>
          {!this.props.navigation.getParam('isUpdate') ? 'Nhập kho' : 'Cập nhật phiếu nhập kho'}
        </Text>
      </TouchableOpacity>
    );
  }

  componentDidMount() {
    if (this.props.navigation.getParam('value')) {
      this.setState({ status: false });
    }
  }

  naviagateStep2 = () => {
    this.props.navigation.navigate(IVN_IMPORT_CREATE_STEP_2, { isUpdate: this.props.navigation.getParam('isUpdate') });
  };

  _renderTab() {
    const { status } = this.state;
    return (
      <ScrollableTabView
        initialPage={0}
        renderTabBar={() => <TabPill style={{ backgroundColor: themes.colors.BACKGROUND_COLOR }} />}
        tabBarPosition="top"
      >
        <View tabLabel={'Trong kho'} style={{ flex: 1 }}>
          <ListProductBusiness
            navigation={this.props.navigation}
            value={this.props.navigation.getParam('value')}
            codeQR={this.props.navigation.getParam('codeQR')}
            isUpdate={this.props.navigation.getParam('isUpdate')}
          />
        </View>
        {status ? (
          <View tabLabel={'Thuốc mới DQG'} style={{ flex: 1 }}>
            <ListProductDQG
              navigation={this.props.navigation}
              value={this.props.navigation.getParam('value')}
              codeQR={this.props.navigation.getParam('codeQR')}
            />
          </View>
        ) : null}
      </ScrollableTabView>
    );
  }

  _renderButton = () => {
    const { listProductBusiness, listProductDQG } = this.props;
    return (
      <TouchableOpacity style={styles.buttonExport} onPress={this.naviagateStep2}>
        <Text style={styles.txtFooter}>Đã chọn ({listProductBusiness.concat(listProductDQG).length}) sản phẩm</Text>
      </TouchableOpacity>
    );
  };
  render() {
    const { listProductBusiness, listProductDQG } = this.props;
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        <View style={styles.containerText}>
          <View>
            <Text style={styles.txt12}>Nhập thuốc</Text>
          </View>
          <View>
            <Text style={styles.txt12}>Phiếu nhập</Text>
          </View>
          <View>
            <Text style={styles.txt12}>Xác nhận</Text>
          </View>
        </View>
        <View style={styles.progress}>
          <View style={[styles.cricle, { backgroundColor: MAIN_COLOR }]}>
            <Text style={styles.txtProgress}>1</Text>
          </View>
          <View style={{ width: '40%', backgroundColor: themes.colors.BACKGROUND_COLOR, height: vw(2) }} />
          <View style={[styles.cricle, { backgroundColor: themes.colors.BACKGROUND_COLOR }]}>
            <Text style={styles.txtProgress}>2</Text>
          </View>
          <View style={{ width: '40%', height: vw(2) }} />
          <View style={[styles.cricle, { backgroundColor: themes.colors.BACKGROUND_COLOR }]}>
            <Text style={styles.txtProgress}>3</Text>
          </View>
        </View>
        <View style={{ flex: 9.5 }}>{this._renderTab()}</View>
        {listProductBusiness.length !== 0 || listProductDQG.length !== 0 ? (
          <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', padding: vw(5) }}>
            {this._renderButton()}
          </View>
        ) : null}
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    store: state.user.dataUser.store,
    token: state.user.token,
    listProductBusiness: state.inventory.listProductBusiness,
    listProductDQG: state.inventory.listProductDQG,
  };
}
const mapDispatchToProps = {
  deletedProductBusiness,
  deletedProductDQG,
  removeProduct,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true },
)(index);
