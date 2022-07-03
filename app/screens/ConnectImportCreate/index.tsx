import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, Alert } from 'react-native';
import styles from './ConnectImportCreate.styles';
import HeaderBar from '../../elements/HeaderBar/';
import { MyStatusBar } from '../../elements/MyStatusBar/';
import { themes } from '../../constants';
import LoaderIndicator from '../../elements/LoaderIndicator/';
import API from '../../api';
import EventBus from '../../utils/EventBus';
import ItemConnect from '../../components/ItemConnect/ItemConnect';
import { CONNECT_DRUG_BANK_TAB } from '../../redux/types';
import vw from '../../utils/size-dynamic';
import { Navigation } from '../../dataType/index.d';
type Props = {
  navigation: Navigation;
};
type State = {
  listDrug: any;
  isFetching: Boolean;
  info: any;
  productListAsync: any;
  check: any;
};
class index extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      listDrug: [],
      isFetching: false,
      info: [],
      productListAsync: [],
      check: 0,
    };
  }

  componentDidMount = () => {
    this.initData();
  };

  initData = async () => {
    try {
      const { navigation } = this.props;
      const res = await API.syncDrugBank.getDetailImportNotConnect(navigation.getParam('import_code'));
      const products = res.data.products.map((e: any) => {
        const newProduct = {
          sync_flg: e.sync_flg,
          lot: e.lot,
          expired_date: e.expired_date,
          quantity: e.quantity,
          unit_cd: e.unit_cd,
          unit_name: e.unit_name,
          price: e.price,
          import_detail_id: e.import_detail_id,
          vat_percent: e.vat_percent,
        };
        return newProduct;
      });
      this.setState({ info: res.data.info, listDrug: res.data.products, productListAsync: products });
    } catch (error) {
      console.log(error);
    }
  };

  askCancel = () => {
    Alert.alert('Thông báo', 'Bạn chắc chắn không liên thông phiếu nhập kho này?', [
      { text: 'Hủy', onPress: () => {} },
      {
        text: 'Đồng ý',
        onPress: async () => {
          try {
            await this.setState({ isFetching: true });
            const res = await API.syncDrugBank.updateStatusImport({
              import_code: this.state.info.import_code,
              sync_status: '-1',
            });
            this.setState({ isFetching: false });
            Alert.alert('Thông báo', 'Đã xác nhận không liên thông', [
              { text: 'Đồng ý', onPress: () => this.callBackToScreen() },
            ]);
          } catch (error) {
            this.setState({ isFetching: false });
            Alert.alert('Thông báo', 'Yêu cầu  thất bại', [{ text: 'Đồng ý', onPress: () => {} }]);
          }
        },
      },
    ]);
  };

  askAgree = () => {
    Alert.alert('Thông báo', 'Bạn có chắc chắn muốn liên thông phiếu nhập kho không?', [
      { text: 'Hủy', onPress: () => {} },
      {
        text: 'Đồng ý',
        onPress: async () => {
          try {
            await this.setState({ isFetching: true });
            const res =
              this.state.check === 1
                ? await API.syncDrugBank.updateInformationImport({ products: this.state.productListAsync })
                : true;
            if (res) {
              this.setState({ isFetching: false });
              const res = await API.syncDrugBank.updateStatusImport({
                import_code: this.state.info.import_code,
                sync_status: '1',
              });
            }
            Alert.alert('Thông báo', 'Liên thông thành công', [
              { text: 'Đồng ý', onPress: () => this.callBackToScreen() },
            ]);
          } catch (error) {
            this.setState({ isFetching: false });
            Alert.alert('Thông báo', 'Liên thông thất bại', [{ text: 'Đồng ý', onPress: () => {} }]);
          }
        },
      },
    ]);
  };

  onUpdate = (index: number, data?: any) => {
    const productListAsync = [...this.state.productListAsync];
    productListAsync[index] = data;
    this.setState({ productListAsync: productListAsync, check: 1 });
  };

  callBackToScreen = () => {
    EventBus.fireEvent('ConnectImport');
    this.props.navigation.navigate(CONNECT_DRUG_BANK_TAB);
  };

  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }

  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={styles.buttonBack} onPress={() => this.props.navigation.goBack()}>
        <Image source={themes.ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtHeaderLeft}>Liên thông phiếu nhập</Text>
      </TouchableOpacity>
    );
  }

  _functionRenderView = (title: any, content: any) => {
    return (
      <View style={styles.containerFuntionView}>
        <View style={{ flex: 5 }}>
          <Text style={[styles.txtFunction, { fontWeight: '400', color: themes.colors.BLACK }]}>{title}</Text>
        </View>
        <View style={{ flex: 5 }}>
          <Text style={[styles.txtFunction, { fontWeight: '400', color: themes.colors.BLACK_BASIC }]}>{content}</Text>
        </View>
      </View>
    );
  };
  _renderItem = () => {
    const { info } = this.state;
    return (
      <View>
        <View style={[styles.containerTitle, { justifyContent: 'center' }]}>
          <Text style={styles.txtTitle}>Thông tin phiếu nhập</Text>
        </View>
        {this._functionRenderView('Mã phiếu nhập', info.import_code)}
        {this._functionRenderView('Nhà cung cấp', info.company_name)}
        {this._functionRenderView('Phân loại nhập', info.import_type)}
        {this._functionRenderView('Phương thức thanh toán', info.pay_method)}
        {this._functionRenderView('Thời gian tạo', info.created_date)}
      </View>
    );
  };

  _renderItemList = ({ item, index }: { item: any; index: number }) => {
    return (
      <ItemConnect
        type={'import'}
        item={item}
        index={index}
        navigation={this.props.navigation}
        onUpdate={this.onUpdate}
      />
    );
  };

  _renderListProduct = () => {
    const { listDrug } = this.state;
    return (
      <View>
        <View
          style={[
            styles.containerTitle,
            { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
          ]}
        >
          <Text style={styles.txtTitle}>Danh sách sản phẩm</Text>
        </View>
        <FlatList
          style={[styles.productListContainer, { backgroundColor: themes.colors.BACKGROUND_COLOR }]}
          data={listDrug}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItemList}
        />
      </View>
    );
  };

  _renderButton = () => {
    return (
      <View style={styles.wapperButton}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: themes.colors.MAIN_COLOR }]}
          onPress={this.askAgree}
        >
          <Text style={[styles.txtButton, { color: themes.colors.WHITE }]}>Liên thông</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { borderColor: themes.colors.MAIN_COLOR, backgroundColor: themes.colors.WHITE, borderWidth: vw(1) },
          ]}
          onPress={this.askCancel}
        >
          <Text style={[styles.txtButton, { color: themes.colors.MAIN_COLOR }]}>Không liên thông</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { isFetching } = this.state;
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
          {this._renderItem()}
          {this._renderListProduct()}
        </ScrollView>
        {this._renderButton()}
        <LoaderIndicator loading={isFetching} />
      </View>
    );
  }
}

export default index;
