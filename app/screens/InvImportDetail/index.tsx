import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  Animated,
  Alert,
  ScrollView,
} from 'react-native';
import styles from './InvImportDetail.styles';
import HeaderBar from '../../elements/HeaderBar/';
import { MyStatusBar } from '../../elements/MyStatusBar/';
import { ICON_BACK, themes } from '../../constants/';
import ItemProductHistoryImport from '../../components/ItemProductHistoryImport';
import { INVENTORY_TAB, INV_IMPORT_CREATE_TAB_STEP_1, PRODUCT_DETAIL_SCREEN } from '../../redux/types/';
import API from '../../api/';
import LoaderIndicator from '../../elements/LoaderIndicator';
import { connect } from 'react-redux';
import { removeProduct, addInformationImport, addProductNewBusiness } from '../../redux/action/inventory';
import LoadContent from '../../elements/LoadContent';
import vw from '../../utils/size-dynamic';
import { Navigation } from '../../dataType/';
type Props = {
  navigation: Navigation;
  removeProduct: Function;
  addProductNewBusiness: Function;
  addInformationImport: Function;
};
type State = {
  info: any;
  listProduct: any;
  animation: any;
  flag: boolean;
  isFetching: boolean;
  load: boolean;
};
class index extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      info: [],
      listProduct: [],
      animation: new Animated.Value(0),
      flag: true,
      isFetching: false,
      load: false,
    };
  }
  componentDidMount = () => {
    this.getDetailImport();
    this.toggleOpen();
  };
  getDetailImport = async () => {
    try {
      await this.setState({ isFetching: true });
      const id = this.props.navigation.getParam('codeImport');
      const res = await API.warehouse.getDetailImport(id);
      this.setState({ info: res.data.info, listProduct: res.data.products, isFetching: false });
    } catch (error) {
      this.setState({ isFetching: false });
      console.log(error);
    }
  };
  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }
  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={styles.buttonBack} onPress={() => this.props.navigation.goBack()}>
        <Image source={ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtHeaderLeft}>Chi tiết phiếu nhập kho</Text>
      </TouchableOpacity>
    );
  }
  functionRenderView = (title: string, content: string, flag: boolean) => {
    return (
      <View style={styles.containerFuntionView}>
        <View style={{ flex: 4 }}>
          <Text style={styles.txtLeft}>{title}</Text>
        </View>
        <View
          style={{
            flex: 6,
            borderBottomColor: flag ? themes.colors.BOTTOM_COLOR : themes.colors.WHITE,
            borderBottomWidth: flag ? 0.3 : 0,
          }}
        >
          <Text style={styles.txtRight}>{content}</Text>
        </View>
      </View>
    );
  };
  _renderItem = () => {
    const { info } = this.state;
    return (
      <View style={styles.wapperItem}>
        {this.functionRenderView('Mã phiếu nhập', info.import_code, true)}
        {this.functionRenderView('Tên cửa hàng', info.company_name, true)}
        {this.functionRenderView(
          'Trạng thái',
          info.status === 9 ? 'Đã hủy' : info.status === 2 ? 'Hoàn thành' : 'Chờ duyệt',
          true,
        )}
        {this.functionRenderView('Thời gian tạo', info.created_date, true)}
        {this.functionRenderView('Ghi chú', info.note === null ? 'Đang cập nhập' : info.note, true)}
        {this.functionRenderView('Người tạo phiếu', info.updated_user, true)}
        {this.functionRenderView('Phương thức nhập', info.import_type, true)}
        {this.functionRenderView('Thanh toán', info.pay_method, false)}
      </View>
    );
  };
  _renderProduct = () => {
    return (
      <View>
        <View style={styles.containerTitle}>
          <Text style={styles.txtTitle}>Danh sách sản phẩm</Text>
        </View>
      </View>
    );
  };
  getDetailProduct = (item: any) => {
    this.props.navigation.navigate(PRODUCT_DETAIL_SCREEN, { data: item });
  };
  _renderListProduct = () => {
    const { listProduct } = this.state;
    return (
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={listProduct}
        keyExtractor={(item: any) => item.import_detail_id.toString()}
        renderItem={({ item }) => (
          <ItemProductHistoryImport
            item={item}
            navigation={this.props.navigation}
            onPress={() => this.getDetailProduct(item)}
          />
        )}
      />
    );
  };
  toggleOpen = () => {
    this.setState({ flag: !this.state.flag });
    if (this._open) {
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 300,
      }).start();
    } else {
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 300,
      }).start();
    }
    this._open = !this._open;
  };
  offModal = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 100,
    }).start();
  };
  update = async () => {
    const { listProduct, info } = this.state;
    await this.props.removeProduct();
    for (i = 0; i < listProduct.length; i++) {
      // listProduct[i].price = (listProduct[i].price / listProduct[i].quantity).toFixed(0);
      listProduct[i].expired_date =
        listProduct[i].expired_date.slice(6, 8) +
        '/' +
        listProduct[i].expired_date.slice(4, 6) +
        '/' +
        listProduct[i].expired_date.slice(0, 4);
      listProduct[i].flag = 1;
      this.props.addProductNewBusiness(listProduct[i]);
    }
    const newInfo = {
      company_name: info.company_name,
      company_code: info.company_code,
      pay_method:
        info.pay_method === 'Chuyển khoản ngân hàng'
          ? 'BT'
          : info.pay_method === 'Thẻ tín dụng'
          ? 'CC'
          : info.pay_method === 'Tiền mặt'
          ? 'CS'
          : 'EW',
      import_type:
        info.import_type === 'Yêu cầu nhập kho'
          ? 'ORD'
          : info.import_type === 'Trả lại kho'
          ? 'REV'
          : info.import_type === 'Trả lại bán hàng'
          ? 'RET'
          : 'CHK',
      invoice_code: info.invoice_code,
      process_date: info.process_date,
      note: info.note ? info.note : '',
      selectClassify: info.import_type,
      selectPayMent: info.pay_method,
      import_code: info.import_code,
    };
    this.props.addInformationImport(newInfo);
    this.props.navigation.navigate(INV_IMPORT_CREATE_TAB_STEP_1, { isUpdate: true });
  };
  cancel = async () => {
    const { info } = this.state;
    try {
      await this.offModal();
      await this.setState({ load: true });
      const res = await API.warehouse.cancelImport(info.import_code);
      if (res.data.status_code === 200) {
        this.setState({ load: false });
        Alert.alert('Thông báo', 'Hủy nhập kho thành công', [
          { text: 'Đồng ý', onPress: () => this.backScreenWithCancel() },
        ]);
      } else if (res.data.status_code !== 200) {
        Alert.alert('Hủy nhập kho thất bại');
      }
    } catch (error) {
      console.log(error);
    }
  };
  backScreenWithCancel = () => {
    const { info } = this.state;
    this.props.navigation.navigate(INVENTORY_TAB, { import_code: info.import_code, status: 9 });
  };
  backScreenWithAgree = () => {
    const { info } = this.state;
    this.props.navigation.navigate(INVENTORY_TAB, { import_code: info.import_code, status: 2 });
  };
  agree = async () => {
    const { info } = this.state;
    try {
      await this.offModal();
      await this.setState({ load: true });
      const res = await API.warehouse.agreeImport(info.import_code);
      if (res.data.status_code === 200) {
        this.setState({ load: false });
        Alert.alert('Thông báo', 'Duyệt nhập kho thành công', [
          { text: 'Đồng ý', onPress: () => this.backScreenWithAgree() },
        ]);
      } else if (res.data.status_code !== 200) {
        Alert.alert('Hủy nhập kho thất bại');
      }
    } catch (error) {
      console.log(error);
    }
  };
  askCancel = () => {
    Alert.alert('Thông báo', 'Hủy nhập kho', [
      {
        text: 'Hủy',
      },
      { text: 'Đồng ý', onPress: () => this.cancel() },
    ]);
  };
  askAgree = () => {
    Alert.alert('Thông báo', 'Xác nhận nhập kho', [
      {
        text: 'Hủy',
      },
      { text: 'Đồng ý', onPress: () => this.agree() },
    ]);
  };
  renderOption = () => {
    const { flag } = this.state;

    const reloadInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, vw(-70)],
    });

    const orderInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, vw(-70), vw(-140)],
    });

    const uploadInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.3, 0.5, 1],
      outputRange: [0, vw(-70), vw(-140), vw(-210)],
    });

    const reloadStyle = {
      transform: [
        {
          translateY: reloadInterpolate,
        },
      ],
    };

    const updateStyle = {
      transform: [
        {
          translateY: uploadInterpolate,
        },
      ],
    };

    const orderStyle = {
      transform: [
        {
          translateY: orderInterpolate,
        },
      ],
    };

    return (
      <View>
        <Animated.View style={[styles.background]} />
        <TouchableWithoutFeedback onPress={() => this.askCancel()}>
          <Animated.View style={[styles.button, styles.other, orderStyle]}>
            <Text style={styles.txtAnimation}>Hủy</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.askAgree()}>
          <Animated.View style={[styles.button, styles.payText, reloadStyle]}>
            <Text style={styles.txtAnimation}>Xác nhận</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.update()}>
          <Animated.View style={[styles.button, styles.update, updateStyle]}>
            <Text style={styles.txtAnimation}>Cập nhật</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.toggleOpen}>
          <View style={[styles.button, styles.pay]}>
            <Text style={styles.txtAnimation}>{flag !== true ? 'Ẩn' : 'Hiện'}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };
  render() {
    const { info, isFetching, load } = this.state;
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <View style={styles.containerTitle}>
            <Text style={styles.txtTitle}>Thông tin phiếu nhập kho</Text>
          </View>
          <View style={{ backgroundColor: themes.colors.BACKGROUND_COLOR }}>{this._renderItem()}</View>
          {isFetching ? (
            <LoadContent number={3} loading={isFetching} style={{ marginTop: vw(30) }} />
          ) : (
            this._renderProduct()
          )}
          <View style={{ backgroundColor: themes.colors.BACKGROUND_COLOR, paddingHorizontal: vw(5), flex: 1 }}>
            {this._renderListProduct()}
          </View>
        </ScrollView>
        {info.status === 0 ? this.renderOption() : null}
        <LoaderIndicator loading={load} />
      </View>
    );
  }
}
const mapDispatchToProps = {
  addProductNewBusiness,
  removeProduct,
  addInformationImport,
};
export default connect(
  null,
  mapDispatchToProps,
  null,
  { forwardRef: true },
)(index);
