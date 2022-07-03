import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, Alert } from 'react-native';
import styles from './ConnectInvoiceCreate.styles';
import HeaderBar from '../../elements/HeaderBar';
import { MyStatusBar } from '../../elements/MyStatusBar';
import { ICON_BACK, BLACK, BACKGROUND_COLOR, MAIN_COLOR, WHITE, themes } from '../../constants';
import MoneyFormat from '../../utils/MoneyFormat';
import LoaderIndicator from '../../elements/LoaderIndicator';
import EventBus from '../../utils/EventBus';
import API from '../../api';
import ItemConnect from '../../components/ItemConnect/ItemConnect';
import { CONNECT_DRUG_BANK_TAB } from '../../redux/types';
import vw from '../../utils/size-dynamic';
import { Navigation } from '../../dataType/index.d';
type State = {
  customer_name: any;
  customer_phone_no: any;
  pay_method: any;
  created_date: any;
  invoice_code: any;
  updated_user: any;
  amount: any;
  listDrug: any;
  listDrugSelect: any;
  isFetching: Boolean;
  check: any;
};
type Props = {
  navigation: Navigation;
};

class index extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      customer_name: navigation.getParam('customer_name'),
      customer_phone_no: navigation.getParam('customer_phone_no'),
      pay_method: navigation.getParam('pay_method'),
      created_date: navigation.getParam('created_date'),
      invoice_code: navigation.getParam('invoice_code'),
      updated_user: navigation.getParam('updated_user'),
      amount: '',
      listDrug: [],
      listDrugSelect: [],
      isFetching: false,
      check: 0,
    };
  }

  componentDidMount = () => {
    this.initData();
  };

  initData = async () => {
    const { navigation } = this.props;
    try {
      const res = await API.syncDrugBank.getDetailInvoiceNotConnect(navigation.getParam('invoice_id'));
      const products = res.data.details.map((e: any) => {
        const newProduct = {
          lot: e.lot,
          drg_drug_cd: e.drg_drug_cd,
          quantity: e.quantity,
          unit_cd: e.unit_cd,
          unit_name: e.unit_name,
          price: e.price,
          invoice_detail_id: e.invoice_detail_id,
          sync_flg: e.sync_flg,
        };
        return newProduct;
      });
      await this.setState({ amount: res.data.amount, listDrug: res.data.details, listDrugSelect: products });
    } catch (error) {
      console.log(error);
    }
  };

  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }

  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={styles.buttonBack} onPress={() => this.props.navigation.goBack()}>
        <Image source={themes.ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtHeaderLeft}>Liên thông hóa đơn</Text>
      </TouchableOpacity>
    );
  }

  _functionRenderView = (title: any, content: any) => {
    return (
      <View style={styles.containerFuntionView}>
        <View style={{ flex: 3 }}>
          <Text style={[styles.txtFunction, { fontWeight: '400', color: themes.colors.BLACK }]}>{title}</Text>
        </View>
        <View style={{ flex: 7 }}>
          <Text style={[styles.txtFunction, { fontWeight: '400', color: themes.colors.BLACK_BASIC }]}>{content}</Text>
        </View>
      </View>
    );
  };

  _renderContent = () => {
    const {
      customer_name,
      customer_phone_no,
      pay_method,
      created_date,
      invoice_code,
      updated_user,
      amount,
    } = this.state;
    return (
      <View>
        <View style={[styles.containerTitle, { justifyContent: 'center' }]}>
          <Text style={styles.txtTitle}>Thông tin hóa đơn</Text>
        </View>
        {this._functionRenderView('Mã hóa đơn', invoice_code)}
        {customer_name !== 'Khách vãng lai' ? this._functionRenderView('Tên khách hàng', customer_name) : null}
        {customer_name !== 'Khách vãng lai' ? this._functionRenderView('Số điện thoại', customer_phone_no) : null}
        {this._functionRenderView('Thời gian tạo', created_date)}
        {this._functionRenderView('Trạng thái', 'Chưa liên thông')}
        {updated_user !== '' ? this._functionRenderView('Nhân viên bán hàng', updated_user) : null}
        {this._functionRenderView('Thanh toán', pay_method)}
        {this._functionRenderView('Tổng tiền', MoneyFormat(amount))}
      </View>
    );
  };

  _renderItemList = ({ item, index }: { item: any; index: number }) => {
    return (
      <ItemConnect
        item={item}
        index={index}
        navigation={this.props.navigation}
        onUpdate={this.onUpdate}
        type="invoice"
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

  callBackToScreen = () => {
    EventBus.fireEvent('ConnectInvoice');
    this.props.navigation.navigate(CONNECT_DRUG_BANK_TAB);
  };

  askCancel = () => {
    Alert.alert('Thông báo', 'Bạn chắc chắn không liên thông phiếu hoá đơn này?', [
      { text: 'Hủy', onPress: () => {} },
      {
        text: 'Đồng ý',
        onPress: async () => {
          try {
            const res = await API.syncDrugBank.updateStatusInvoice({
              invoice_code: this.state.invoice_code,
              sync_status: '-1',
            });
            Alert.alert('Thông báo', 'Đã xác nhận không liên thông', [
              { text: 'Đồng ý', onPress: () => this.callBackToScreen() },
            ]);
          } catch (error) {
            Alert.alert('Thông báo', 'Yêu cầu thất bại', [{ text: 'Đồng ý', onPress: () => {} }]);
          }
        },
      },
    ]);
  };

  askAgree = () => {
    const { invoice_code, amount, listDrugSelect } = this.state;
    Alert.alert('Thông báo', 'Bạn có chắc chắn muốn liên thông hóa đơn không?', [
      { text: 'Hủy', onPress: () => {} },
      {
        text: 'Đồng ý',
        onPress: async () => {
          try {
            const params = {
              invoice: {
                invoice_code: invoice_code,
                amount: amount,
                amount_paid: amount,
              },
              details: listDrugSelect,
            };
            await this.setState({ isFetching: true });
            const res = this.state.check === 1 ? await API.syncDrugBank.updateInformationInvoice(params) : true;
            if (res) {
              const res = await API.syncDrugBank.updateStatusInvoice({
                invoice_code: invoice_code,
                sync_status: '1',
              });
            }
            this.setState({ isFetching: false });
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

  onUpdate = async (index: number, data?: any) => {
    let amount = 0;
    const listDrugSelect = [...this.state.listDrugSelect];
    listDrugSelect[index] = data;
    await listDrugSelect.map((e: any) => {
      if (e.sync_flg) amount += Number(e.quantity) * Number(e.price);
    });
    await this.setState({ listDrugSelect, amount, check: 1 });
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
          {this._renderContent()}
          {this._renderListProduct()}
        </ScrollView>
        {this._renderButton()}
        <LoaderIndicator loading={isFetching} />
      </View>
    );
  }
}

export default index;
