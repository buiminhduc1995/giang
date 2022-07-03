import React from 'react';
import { Image, Text, View, TouchableOpacity, FlatList, Alert, Animated, TouchableWithoutFeedback } from 'react-native';
import styles from './InvExportDetail.style';
import HeaderBar from '../../elements/HeaderBar';
import { ICON_BACK, ICON_HELP, BACKGROUND_COLOR, STATUS, IMAGE_DRUG } from '../../constants';
import { MyStatusBar } from '../../elements/MyStatusBar';
import { ItemDrugList } from '../../elements/ItemDrugList/ItemDrugList';
import API from '../../api/index';
import { INVENTORY_TAB } from '../../redux/types/';
import Moment from 'moment/moment';
import EventBus from '../../utils/EventBus';
import { Navigation } from '../../dataType';

type Props = {
  navigation: Navigation;
};
type States = {
  productList: any[];
  detailItem: any;
  animation: any;
  flag: boolean;
};

export default class DetailExport extends React.PureComponent<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      productList: [],
      detailItem: props.navigation.getParam('detailItem'),
      animation: new Animated.Value(0),
      flag: true,
    };
  }

  goBack = () => {
    this.props.navigation.navigate(INVENTORY_TAB, { export_code: '0' });
  };

  async componentDidMount() {
    this.toggleOpen();
    try {
      const code = this.props.navigation.getParam('export_code');
      const res = await API.warehouse.getDetailExport(code);
      this.setState({ detailItem: res.data.info, productList: res.data.products });
    } catch (err) {
      console.log(err);
    }
  }

  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }

  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={styles.wrapHeaderLeft} onPress={this.goBack}>
        <Image source={ICON_BACK} style={styles.imageHearderLeft} />
        <Text style={styles.textHeaderLeft}>Chi tiết xuất kho</Text>
      </TouchableOpacity>
    );
  }

  cancleExport = () => {
    Alert.alert('Thông báo', 'Bạn có chắc chắn muốn hủy xuất kho không?', [
      { text: 'Hủy', onPress: () => {} },
      {
        text: 'Đồng ý',
        onPress: async () => {
          try {
            const export_code = this.props.navigation.getParam('export_code');
            const res = await API.warehouse.postDeleteExport(export_code);
            if (res.status === 200) {
              Alert.alert('Thông báo', 'Hủy xuất kho thành công', [
                {
                  text: 'Đồng ý',
                  onPress: () => {
                    this.props.navigation.navigate(INVENTORY_TAB, { export_code: export_code, status: 9 });
                    EventBus.fireEvent('ExportChangeStatus');
                  },
                },
              ]);
            }
          } catch (err) {
            Alert.alert('Thông báo', 'Hủy xuất kho không thành công', [{ text: 'Đồng ý', onPress: () => {} }]);
          }
        },
      },
    ]);
  };

  approvalExport = () => {
    const { productList } = this.state;
    Alert.alert('Thông báo', 'Bạn có chắc chắn muốn phê duyệt phiếu xuất kho?', [
      { text: 'Hủy', onPress: () => {} },
      {
        text: 'Đồng ý',
        onPress: async () => {
          try {
            const export_code = this.props.navigation.getParam('export_code');
            const products = productList.map((product: any) => {
              const newProduct = {
                cur_qty: product.quantity.toString(),
                drg_drug_cd: product.drg_drug_cd,
                drug_id: product.drug_id.toString(),
                drg_store_code: product.drg_store_code,
                drg_drug_name: product.drg_drug_name,
                drg_store_id: product.drg_store_id.toString(),
                lot: product.lot,
                note: product.note === null ? '' : product.note,
                unit_cd: product.unit_cd,
                unit_name: product.unit_name,
                status: '2',
                updated_user: product.updated_user,
                export_code: product.export_code,
              };
              return newProduct;
            });
            const res = await API.warehouse.approvalExport(products);
            if (res.status === 200) {
              Alert.alert('Thông báo', 'Phê duyệt thành công', [
                {
                  text: 'Đồng ý',
                  onPress: () => {
                    this.props.navigation.navigate(INVENTORY_TAB, { export_code: export_code, status: 2 });
                    EventBus.fireEvent('ExportChangeStatus');
                  },
                },
              ]);
            }
          } catch (err) {
            Alert.alert('Thông báo', 'Phê duyệt không thành công', [{ text: 'Đồng ý', onPress: () => {} }]);
          }
        },
      },
    ]);
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

  _renderOption = () => {
    const { flag } = this.state;
    const reloadInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -70],
    });

    const orderInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, -70, -140],
    });
    const reloadStyle = {
      transform: [
        {
          translateY: reloadInterpolate,
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
        {/* <TouchableWithoutFeedback onPress={this.cancleExport}>
          <Animated.View style={[styles.button, { backgroundColor: '#C9302C' }, orderStyle]}>
            <Text style={styles.txtAnimation}>Hủy</Text>
          </Animated.View>
        </TouchableWithoutFeedback> */}
        <TouchableWithoutFeedback onPress={this.approvalExport}>
          <Animated.View style={[styles.button, { backgroundColor: '#68AF45' }, reloadStyle]}>
            {/* <Animated.Text style={[styles.label, labelStyle]}>Xác nhận nhập kho</Animated.Text> */}
            <Text style={styles.txtAnimation}>Duyệt</Text>
            {/* <Image source={ICON_OK_IMPORT} style={{ width: 20, height: 20 }} /> */}
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.toggleOpen}>
          <View style={[styles.button, { backgroundColor: '#FFC107' }]}>
            <Text style={styles.txtAnimation}>{!flag ? 'Ẩn' : 'Hiện'}</Text>
            {/* <Animated.Text style={[styles.label, labelStyle]}>Tùy chọn</Animated.Text> */}
            {/* {flag ? <Image source={ICON_MENU_CIRCLE} style={{ width: 20, height: 20 }} /> : <Image source={ICON_DROPDOWN_CIRCLE} style={{ width: 20, height: 20 }} />} */}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  _renderItem = (item: any) => {
    return (
      <ItemDrugList
        nameDrug={item.drg_drug_name}
        sourceImage={IMAGE_DRUG}
        quantity={item.quantity}
        unit_name={item.unit_name}
        price={item.price}
        totalPrice={(item.quantity * item.price).toFixed(0)}
        VAT={item.vat ? item.vat : null}
        expirationDate={Moment(item.expired_date).format('DD/MM/YYYY')}
      />
    );
  };
  _renderContent() {
    const { productList, detailItem } = this.state;
    return (
      <View style={styles.wrapContent}>
        <Text style={styles.title}>Thông tin xuất kho</Text>
        <View style={styles.inforContainer}>
          <View style={styles.item}>
            <Text style={styles.field}>Mã phiếu xuất</Text>
            <Text style={styles.content}>{detailItem.export_code}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.field}>Tên cửa hàng</Text>
            <Text style={styles.content} numberOfLines={1}>
              {detailItem.import_store_name}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.field}>Trạng thái</Text>
            <Text style={styles.content}>{STATUS[detailItem.status]}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.field}>Thời gian tạo</Text>
            <Text style={styles.content}>{detailItem.updated_date}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.field}>Ghi chú</Text>
            <Text style={styles.content} numberOfLines={1}>
              {detailItem.note}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.field}>Người tạo phiếu</Text>
            <Text style={styles.content}>{detailItem.updated_user}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.field}>Phân loại xuất</Text>
            <Text style={styles.content}>{detailItem.export_type}</Text>
          </View>
        </View>
        <Text style={styles.title}>Sản phẩm</Text>
        {!productList || !productList.length ? (
          <View style={[styles.productListContainer, { justifyContent: 'center', alignItems: 'center' }]}>
            <Image source={ICON_HELP} style={styles.imageIndicator} resizeMode={'contain'} />
            <Text style={styles.textIndicator}>Không chứa đơn hàng nào</Text>
          </View>
        ) : (
          <FlatList
            style={[styles.productListContainer, { backgroundColor: BACKGROUND_COLOR }]}
            data={productList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => this._renderItem(item)}
          />
        )}
      </View>
    );
  }

  render() {
    const { detailItem } = this.state;
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        {this._renderContent()}
        {detailItem.status == 0 ? this._renderOption() : null}
        {detailItem.status == 2 && detailItem.export_type != 'Bán hàng' ? (
          <TouchableOpacity style={styles.button} onPress={this.cancleExport}>
            <Text style={styles.txtAnimation}>Hủy</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}
