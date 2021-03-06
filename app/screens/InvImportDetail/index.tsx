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
        <Text style={styles.txtHeaderLeft}>Chi ti???t phi???u nh???p kho</Text>
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
        {this.functionRenderView('M?? phi???u nh???p', info.import_code, true)}
        {this.functionRenderView('T??n c???a h??ng', info.company_name, true)}
        {this.functionRenderView(
          'Tr???ng th??i',
          info.status === 9 ? '???? h???y' : info.status === 2 ? 'Ho??n th??nh' : 'Ch??? duy???t',
          true,
        )}
        {this.functionRenderView('Th???i gian t???o', info.created_date, true)}
        {this.functionRenderView('Ghi ch??', info.note === null ? '??ang c???p nh???p' : info.note, true)}
        {this.functionRenderView('Ng?????i t???o phi???u', info.updated_user, true)}
        {this.functionRenderView('Ph????ng th???c nh???p', info.import_type, true)}
        {this.functionRenderView('Thanh to??n', info.pay_method, false)}
      </View>
    );
  };
  _renderProduct = () => {
    return (
      <View>
        <View style={styles.containerTitle}>
          <Text style={styles.txtTitle}>Danh s??ch s???n ph???m</Text>
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
        info.pay_method === 'Chuy???n kho???n ng??n h??ng'
          ? 'BT'
          : info.pay_method === 'Th??? t??n d???ng'
          ? 'CC'
          : info.pay_method === 'Ti???n m???t'
          ? 'CS'
          : 'EW',
      import_type:
        info.import_type === 'Y??u c???u nh???p kho'
          ? 'ORD'
          : info.import_type === 'Tr??? l???i kho'
          ? 'REV'
          : info.import_type === 'Tr??? l???i b??n h??ng'
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
        Alert.alert('Th??ng b??o', 'H???y nh???p kho th??nh c??ng', [
          { text: '?????ng ??', onPress: () => this.backScreenWithCancel() },
        ]);
      } else if (res.data.status_code !== 200) {
        Alert.alert('H???y nh???p kho th???t b???i');
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
        Alert.alert('Th??ng b??o', 'Duy???t nh???p kho th??nh c??ng', [
          { text: '?????ng ??', onPress: () => this.backScreenWithAgree() },
        ]);
      } else if (res.data.status_code !== 200) {
        Alert.alert('H???y nh???p kho th???t b???i');
      }
    } catch (error) {
      console.log(error);
    }
  };
  askCancel = () => {
    Alert.alert('Th??ng b??o', 'H???y nh???p kho', [
      {
        text: 'H???y',
      },
      { text: '?????ng ??', onPress: () => this.cancel() },
    ]);
  };
  askAgree = () => {
    Alert.alert('Th??ng b??o', 'X??c nh???n nh???p kho', [
      {
        text: 'H???y',
      },
      { text: '?????ng ??', onPress: () => this.agree() },
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
            <Text style={styles.txtAnimation}>H???y</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.askAgree()}>
          <Animated.View style={[styles.button, styles.payText, reloadStyle]}>
            <Text style={styles.txtAnimation}>X??c nh???n</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.update()}>
          <Animated.View style={[styles.button, styles.update, updateStyle]}>
            <Text style={styles.txtAnimation}>C???p nh???t</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.toggleOpen}>
          <View style={[styles.button, styles.pay]}>
            <Text style={styles.txtAnimation}>{flag !== true ? '???n' : 'Hi???n'}</Text>
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
            <Text style={styles.txtTitle}>Th??ng tin phi???u nh???p kho</Text>
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
