import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, TextInput } from 'react-native';
import { MyStatusBar } from '../../elements/MyStatusBar';
import HeaderBar from '../../elements/HeaderBar/';
import styles from './CategoryCashFolowDetail.styles';
import { ICON_BACK, themes, IMAGE_DRUG, ICON_CARET_DOWN } from '../../constants';
import ItemProductPortfolio from '../../components/ItemProductPortfolio/';
import { mock } from '../../constants/';
import { Navigation } from '../../dataType';
import ItemDynamic from '../../elements/ItemDynamic/';
import { PRODUCT_DETAIL_SCREEN } from '../../redux/types';
import MoneyFormat from '../../utils/MoneyFormat';
import vw from '../../utils/size-dynamic/';
import ItemDetailDrug from '../../components/ItemDetailDrug/';
type Props = {
  navigation: Navigation;
};
type State = {};
class index extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    this._initData();
  };
  _initData = () => {};
  _renderHeader = () => {
    return <HeaderBar left={this._renderHeaderLeft()} right={this._renderHeaderRight()} />;
  };
  refund = () => {
    console.log('refund');
  };
  _renderHeaderRight = () => {
    return (
      <TouchableOpacity style={styles.wapperHederRight} onPress={() => this.refund()}>
        <Text style={styles.txtHeaderRight}>Hoàn tiền</Text>
      </TouchableOpacity>
    );
  };
  _renderHeaderLeft = () => {
    return (
      <TouchableOpacity style={styles.buttonBack} onPress={() => this.props.navigation.goBack()}>
        <Image source={themes.ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtHeaderLeft}>Chi tiết giao dịch</Text>
      </TouchableOpacity>
    );
  };
  _renderTitle = (title: string) => {
    return (
      <View style={styles.wapperTitle}>
        <Text style={styles.txtTitle}>{title}</Text>
      </View>
    );
  };
  functionInformation = (txtLeft: String, txtRight: String) => {
    return (
      <View style={styles.wapperInformation}>
        <View style={{ flex: 5 }}>
          <Text style={styles.txtLeft}>{txtLeft}</Text>
        </View>
        <View style={{ flex: 5 }}>
          <Text style={styles.txtRight}>{txtRight}</Text>
        </View>
      </View>
    );
  };
  _renderInformation = () => {
    return (
      <View>
        {this.functionInformation('Mã giao dịch', '0123456789')}
        {this.functionInformation('Mã đơn hàng', '0123456789')}
        {this.functionInformation('Ngày giao dịch', '19/09/2019')}
        {this.functionInformation('Trạng thái giao dịch', 'Giao dịch thành công')}
        {this.functionInformation('Nội dung thanh toán', 'Thanh toán đơn hàng INV0123456789')}
        {this.functionInformation('Số tiền', '12.000 đ')}
      </View>
    );
  };
  renderRight = () => {
    return (
      <View style={[styles.column, { height: 80 }]}>
        <View style={styles.rowRight}>
          <View />
          <Text>Chi tiết</Text>
        </View>
        <View />
      </View>
    );
  };
  _renderProduct = () => {
    return (
      <FlatList
        data={mock.dataDrug}
        contentContainerStyle={{ padding: 5 }}
        keyExtractor={(item: any) => item.drg_drug_name.toString()}
        renderItem={(item: any) => (
          <ItemDynamic
            source={IMAGE_DRUG}
            styleWapper={styles.containerItem}
            onPress={() =>
              this.props.navigation.navigate(PRODUCT_DETAIL_SCREEN, { data: item.item, editProduct: true })
            }
            stylesImage={styles.imageItem}
            center={() => <ItemDetailDrug item={item.item} />}
            right={() => this.renderRight()}
          />
        )}
      />
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {this._renderTitle('Thông tin giao dịch')}
          {this._renderInformation()}
          {this._renderTitle('Danh sách sản phẩm')}
          <View style={styles.containerProduct}>{this._renderProduct()}</View>
        </ScrollView>
      </View>
    );
  }
}

export default index;
