import React from 'react';
import { Image, Text, View, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import styles from './ConnectExportCreate.styles';
import HeaderBar from '../../elements/HeaderBar';
import {themes} from '../../constants';
import { MyStatusBar } from '../../elements/MyStatusBar';
import API from '../../api/index';
import ItemConnect from '../../components/ItemConnect/ItemConnect';
import api from '../../api/index';
import { CONNECT_DRUG_BANK_TAB } from '../../redux/types';
import EventBus from '../../utils/EventBus';
import LoaderIndicator from '../../elements/LoaderIndicator/';
import vw from '../../utils/size-dynamic';
import { Navigation } from '../../dataType/index.d';
interface Props {
  navigation: Navigation;
}
interface States {
  productList: any[];
  productListAsync: any[];
  detailItem: any;
  isFetching: boolean;
  check: any;
}

export default class index extends React.PureComponent<Props, States> {
  _open: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      productList: [],
      productListAsync: [],
      detailItem: {},
      isFetching: false,
      check: 1,
    };
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  async componentDidMount() {
    try {
      const code = this.props.navigation.getParam('export_code');
      const res = await API.syncDrugBank.getDetailExportNotConnect(code);
      const products = res.data.products.map((e: any) => {
        const newProduct = {
          lot: e.lot,
          drg_drug_cd: e.drg_drug_cd,
          quantity: e.quantity,
          unit_cd: e.unit_cd,
          unit_name: e.unit_name,
          price: e.price,
          export_detail_id: e.export_detail_id,
          sync_flg: e.sync_flg,
          expired_date: e.expired_date,
        };
        return newProduct;
      });
      this.setState({ detailItem: res.data.info, productList: res.data.products, productListAsync: products });
    } catch (err) {
      console.log(err);
    }
  }
  callBackToScreen = () => {
    EventBus.fireEvent('ConnectExport');
    this.props.navigation.navigate(CONNECT_DRUG_BANK_TAB);
  };
  askCancel = () => {
    Alert.alert('Th??ng b??o', 'B???n ch???c ch???n kh??ng li??n th??ng phi???u xu???t kho n??y?', [
      { text: 'H???y', onPress: () => {} },
      {
        text: '?????ng ??',
        onPress: async () => {
          try {
            await this.setState({ isFetching: true });
            const res = await api.syncDrugBank.updateStatusExport({
              export_code: this.state.detailItem.export_code,
              sync_status: '-1',
            });
            this.setState({ isFetching: false });
            Alert.alert('Th??ng b??o', '???? x??c nh???n kh??ng li??n th??ng', [
              { text: '?????ng ??', onPress: () => this.callBackToScreen() },
            ]);
          } catch (error) {
            this.setState({ isFetching: false });
            Alert.alert('Th??ng b??o', 'Y??u c???u  th???t b???i', [{ text: '?????ng ??', onPress: () => {} }]);
          }
        },
      },
    ]);
  };

  askAgree = () => {
    Alert.alert('Th??ng b??o', 'B???n c?? ch???c ch???n mu???n li??n th??ng phi???u xu???t kho kh??ng?', [
      { text: 'H???y', onPress: () => {} },
      {
        text: '?????ng ??',
        onPress: async () => {
          try {
            await this.setState({ isFetching: true });
            const res =
              this.state.check === 0
                ? await api.syncDrugBank.updateExportNotConnect({ products: this.state.productListAsync })
                : true;
            if (res) {
              this.setState({ isFetching: false });
              const res = await api.syncDrugBank.updateStatusExport({
                export_code: this.state.detailItem.export_code,
                sync_status: '1',
              });
            }
            Alert.alert('Th??ng b??o', 'Li??n th??ng th??nh c??ng', [
              { text: '?????ng ??', onPress: () => this.callBackToScreen() },
            ]);
          } catch (error) {
            this.setState({ isFetching: false });
            Alert.alert('Th??ng b??o', 'Li??n th??ng th???t b???i', [{ text: '?????ng ??', onPress: () => {} }]);
          }
        },
      },
    ]);
  };

  onUpdate = (index: number, data?: any) => {
    const productListAsync = [...this.state.productListAsync];
    productListAsync[index] = data;
    this.setState({ productListAsync: productListAsync, check: 0 });
  };

  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }

  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={styles.buttonBack} onPress={this.goBack}>
        <Image source={themes.ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtHeaderLeft}>Chi ti???t phi???u xu???t kho</Text>
      </TouchableOpacity>
    );
  }

  _renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <ItemConnect
        item={item}
        index={index}
        navigation={this.props.navigation}
        onUpdate={this.onUpdate}
        type="export"
      />
    );
  };

  _renderListProduct = () => {
    const { productList } = this.state;
    return (
      <View>
        <View
          style={[
            styles.containerTitle,
            { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
          ]}
        >
          <Text style={styles.txtTitle}>S???n ph???m</Text>
        </View>
        <FlatList
          style={[styles.productListContainer, { backgroundColor: themes.colors.BACKGROUND_COLOR }]}
          data={productList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
        />
      </View>
    );
  };

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
    const { export_code, import_store_name, created_date, updated_user, export_type } = this.state.detailItem;
    return (
      <View>
        <View style={[styles.containerTitle, { justifyContent: 'center' }]}>
          <Text style={styles.txtTitle}>Th??ng tin h??a ????n</Text>
        </View>
        {this._functionRenderView('M?? phi???u xu???t', export_code)}
        {this._functionRenderView('T??n c???a h??ng', import_store_name ? import_store_name : 'Ch??a c???p nh???t')}
        {this._functionRenderView('Th???i gian t???o', created_date)}
        {this._functionRenderView('Ng?????i t???o phi???u', updated_user ? updated_user : 'Ch??a c???p nh???t')}
        {this._functionRenderView('Ph??n lo???i xu???t', export_type)}
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
          <Text style={[styles.txtButton, { color: themes.colors.WHITE }]}>Li??n th??ng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { borderColor: themes.colors.MAIN_COLOR, backgroundColor: themes.colors.WHITE, borderWidth: vw(1) },
          ]}
          onPress={this.askCancel}
        >
          <Text style={[styles.txtButton, { color: themes.colors.MAIN_COLOR }]}>Kh??ng li??n th??ng</Text>
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
