import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import HeaderBar from '../../elements/HeaderBar';
import { MyStatusBar } from '../../elements/MyStatusBar';
import styles from './DetailOrderPharmacyScreen.style';
import { ICON_BACK, IMAGE_DRUG, BLACK, ICON_RIGHT, MAIN_COLOR, WHITE, BACKGROUND_COLOR } from '../../constants/index';
import vw from '../../utils/size-dynamic/';
import { connect } from 'react-redux';
import API from '../../api';
import LoaderIndicator from '../../elements/LoaderIndicator';
import Moment from 'moment/moment';
import { ItemDrugList } from '../../elements/ItemDrugList/ItemDrugList';
import LoadContent from '../../elements/LoadContent';
import { ShineOverlay, Progressive } from 'rn-placeholder';
import MoneyFormat from '../../utils/MoneyFormat';

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataProduct: [],
      isFetching: false,
      number_product: '',
      created_date: '',
      name: '',
      amount: '',
      status: '',
      flag: true,
      listStatus: [],
      darf: false,
      medlinkConfrim: false,
      phamarcyConfrim: false,
      shiping: false,
      done: false,
      cancle: false,
      sent: false,
    };
  }
  componentDidMount() {
    this.initData();
  }
  initData = async () => {
    const { navigation } = this.props;
    try {
      await this.setState({ isFetching: true });
      const res = await API.syncOrderToAdmin.getDetailOrderPharmacyToCompany(
        navigation.getParam('item').supply_order_id !== undefined
          ? navigation.getParam('item').supply_order_id
          : navigation.getParam('item'),
      );
      await this.setState({
        isFetching: false,
        number_product: res.data.info.number_product,
        created_date: res.data.info.created_date,
        name: res.data.info.name,
        status: res.data.info.status,
        amount: res.data.info.amount,
        dataProduct: res.data.list_product,
        listStatus: res.data.list_status,
      });
      if (res.data.list_status.find(e => e.status === 'draft')) {
        await this.setState({
          darf: true,
          medlinkConfrim: false,
          phamarcyConfrim: false,
          sent: false,
          shiping: false,
          done: false,
          cancle: false,
        });
      }
      if (res.data.list_status.find(e => e.status === 'wait_confirm')) {
        await this.setState({
          darf: false,
          medlinkConfrim: true,
          phamarcyConfrim: false,
          sent: false,
          shiping: false,
          done: false,
          cancle: false,
        });
      }
      if (res.data.list_status.find(e => e.status === 'order')) {
        await this.setState({
          darf: false,
          medlinkConfrim: false,
          phamarcyConfrim: true,
          sent: false,
          shiping: false,
          done: false,
          cancle: false,
        });
      }
      if (res.data.list_status.find(e => e.status === 'sent')) {
        await this.setState({
          darf: false,
          medlinkConfrim: false,
          phamarcyConfrim: false,
          sent: true,
          shiping: false,
          done: false,
          cancle: false,
        });
      }
      if (res.data.list_status.find(e => e.status === 'transfering')) {
        await this.setState({
          darf: false,
          medlinkConfrim: false,
          phamarcyConfrim: false,
          sent: false,
          shiping: true,
          done: false,
          cancle: false,
        });
      }
      if (res.data.list_status.find(e => e.status === 'done')) {
        await this.setState({
          darf: false,
          medlinkConfrim: false,
          phamarcyConfrim: false,
          sent: false,
          shiping: false,
          done: true,
          cancle: false,
        });
      }
      if (res.data.list_status.find(e => e.status === 'cancel')) {
        await this.setState({
          darf: false,
          medlinkConfrim: false,
          phamarcyConfrim: false,
          sent: false,
          shiping: false,
          done: false,
          cancle: true,
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({ isFetching: false });
    }
  };
  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }
  _renderHeaderLeft() {
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={() => this.props.navigation.goBack()}
      >
        <Image source={ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtHeader}>Chi tiết đơn hàng</Text>
      </TouchableOpacity>
    );
  }
  _renderTitle = (text: any, number: any) => {
    const { number_product } = this.state;
    return (
      <View style={styles.containerTitle}>
        <View style={styles.row}>
          <Text style={styles.txtTitle}>{text}</Text>
        </View>
        {number !== 0 ? <Text style={styles.number}>({number_product} sản phẩm)</Text> : null}
      </View>
    );
  };

  _renderItem = ({ item }) => {
    return (
      <ItemDrugList
        nameDrug={item.drug_name}
        sourceImage={IMAGE_DRUG}
        quantity={item.qty}
        unit_name={item.uom}
        price={item.price}
        totalPrice={(item.qty * item.price).toFixed(0)}
      />
    );
  };

  _renderDetail = () => {
    const { created_date, name, status, dataProduct } = this.state;
    return (
      <View style={styles.listProduct}>
        <Text style={styles.txtCode}>Mã đơn hàng: {name}</Text>
        <Text style={styles.time}>Thời gian đặt hàng: {Moment(created_date).format('DD/MM/YYYY hh:mm:ss')}</Text>
        <Text style={styles.status}>
          Trạng thái:{' '}
          {status === 'draft' || status === 'wait_confirm'
            ? 'Chờ xác nhận'
            : status === 'order'
            ? 'Được xác nhận'
            : status === 'sent'
            ? 'Gửi báo giá'
            : status === 'transfering'
            ? 'Đang giao hàng'
            : status === 'done'
            ? 'Hoàn thành'
            : 'Đã hủy'}
        </Text>
        <FlatList
          style={{ marginTop: vw(5) }}
          data={dataProduct}
          keyExtractor={(item: any) => item.drug_id.toString()}
          renderItem={this._renderItem}
        />
      </View>
    );
  };
  _renderAddress = () => {
    const { info, store } = this.props;
    return (
      <View style={styles.listProduct}>
        <Text style={[styles.status, { fontWeight: 'bold' }]}>Nhà thuốc: {info.full_name}</Text>
        <View style={styles.row}>
          <Text style={styles.status}>Địa chỉ: </Text>
          <Text style={[styles.status, { fontWeight: 'bold' }]}>
            {store.address1 ? store.address1 : 'Đang cập nhật...'}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.status}>Số điện thoại: </Text>
          <Text style={[styles.status, { fontWeight: 'bold' }]}>
            {store.phone_no ? store.phone_no : 'Đang cập nhật...'}
          </Text>
        </View>
      </View>
    );
  };
  _renderPayMent = () => {
    const { amount } = this.state;
    return (
      <View style={styles.listProduct}>
        <View style={styles.row}>
          <Text style={styles.status}>Tổng tiền: </Text>
          <Text style={[styles.status, { fontWeight: 'bold' }]}>{MoneyFormat(amount)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.status}>Phương thức thanh toán: </Text>
          <Text style={[styles.status, { fontWeight: 'bold' }]}>Tiền mặt</Text>
        </View>
      </View>
    );
  };
  _renderNote = () => {
    return (
      <View style={styles.listProduct}>
        <Text style={styles.status}>Giao hàng vào lúc 10h00 sáng</Text>
      </View>
    );
  };
  _renderProgressStatus = () => {
    const { listStatus, darf, medlinkConfrim, phamarcyConfrim, sent, shiping, done, cancle } = this.state;
    return (
      <View style={styles.containerProgress}>
        <View style={styles.line}>
          <View style={[styles.circle, { backgroundColor: cancle ? MAIN_COLOR : '#BDBDBD' }]} />
          <View style={[styles.circle, { backgroundColor: done ? MAIN_COLOR : '#BDBDBD' }]} />
          <View style={[styles.circle, { backgroundColor: shiping ? MAIN_COLOR : '#BDBDBD' }]} />
          <View style={[styles.circle, { backgroundColor: sent ? MAIN_COLOR : '#BDBDBD' }]} />
          <View style={[styles.circle, { backgroundColor: phamarcyConfrim ? MAIN_COLOR : '#BDBDBD' }]} />
          <View style={[styles.circle, { backgroundColor: medlinkConfrim ? MAIN_COLOR : '#BDBDBD' }]} />
          <View style={[styles.circle, { backgroundColor: darf ? MAIN_COLOR : '#BDBDBD' }]} />
        </View>
        <View style={styles.containerText}>
          <View style={styles.wapperTxt}>
            <Text style={[styles.h3, { color: cancle ? MAIN_COLOR : '#BDBDBD' }]}>Đã hủy</Text>
            <Text style={[styles.h2, { color: cancle ? MAIN_COLOR : '#BDBDBD' }]}>
              Thời gian:{' '}
              {listStatus.find(e => e.status === 'cancel')
                ? Moment(listStatus[listStatus.indexOf(listStatus.find(e => e.status === 'cancel'))].date).format(
                    'DD/MM/YYYY hh:mm:ss',
                  )
                : 'Đang cập nhật'}
            </Text>
          </View>
          <View style={styles.wapperTxt}>
            <Text style={[styles.h3, { color: done ? MAIN_COLOR : '#BDBDBD' }]}>Đã giao hàng</Text>
            <Text style={[styles.h2, { color: done ? MAIN_COLOR : '#BDBDBD' }]}>
              Thời gian:{' '}
              {listStatus.find(e => e.status === 'done')
                ? Moment(listStatus[listStatus.indexOf(listStatus.find(e => e.status === 'done'))].date).format(
                    'DD/MM/YYYY hh:mm:ss',
                  )
                : 'Đang cập nhật'}
            </Text>
          </View>
          <View style={styles.wapperTxt}>
            <Text style={[styles.h3, { color: shiping ? MAIN_COLOR : '#BDBDBD' }]}>Đang giao hàng</Text>
            <Text style={[styles.h2, { color: shiping ? MAIN_COLOR : '#BDBDBD' }]}>
              Thời gian:{' '}
              {listStatus.find(e => e.status === 'transfering')
                ? Moment(listStatus[listStatus.indexOf(listStatus.find(e => e.status === 'transfering'))].date).format(
                    'DD/MM/YYYY hh:mm:ss',
                  )
                : 'Đang cập nhật'}
            </Text>
          </View>
          <View style={styles.wapperTxt}>
            <Text style={[styles.h3, { color: sent ? MAIN_COLOR : '#BDBDBD' }]}>Gửi báo giá</Text>
            <Text style={[styles.h2, { color: sent ? MAIN_COLOR : '#BDBDBD' }]}>
              Thời gian:{' '}
              {listStatus.find(e => e.status === 'sent')
                ? Moment(listStatus[listStatus.indexOf(listStatus.find(e => e.status === 'sent'))].date).format(
                    'DD/MM/YYYY hh:mm:ss',
                  )
                : 'Đang cập nhật'}
            </Text>
          </View>
          <View style={styles.wapperTxt}>
            <Text style={[styles.h3, { color: phamarcyConfrim ? MAIN_COLOR : '#BDBDBD' }]}>Công ty dược xác nhận</Text>
            <Text style={[styles.h2, { color: phamarcyConfrim ? MAIN_COLOR : '#BDBDBD' }]}>
              Thời gian:{' '}
              {listStatus.find(e => e.status === 'order')
                ? Moment(listStatus[listStatus.indexOf(listStatus.find(e => e.status === 'order'))].date).format(
                    'DD/MM/YYYY hh:mm:ss',
                  )
                : 'Đang cập nhật'}
            </Text>
          </View>
          <View style={styles.wapperTxt}>
            <Text style={[styles.h3, { color: medlinkConfrim ? MAIN_COLOR : '#BDBDBD' }]}>Medlink xác nhận</Text>
            <Text style={[styles.h2, { color: medlinkConfrim ? MAIN_COLOR : '#BDBDBD' }]}>
              Thời gian:{' '}
              {listStatus.find(e => e.status === 'wait_confirm')
                ? Moment(listStatus[listStatus.indexOf(listStatus.find(e => e.status === 'wait_confirm'))].date).format(
                    'DD/MM/YYYY hh:mm:ss',
                  )
                : 'Đang cập nhật'}
            </Text>
          </View>
          <View style={styles.wapperTxt}>
            <Text style={[styles.h3, { color: darf ? MAIN_COLOR : '#BDBDBD' }]}>Chờ xác nhận</Text>
            <Text style={[styles.h2, { color: darf ? MAIN_COLOR : '#BDBDBD' }]}>
              Thời gian:{' '}
              {listStatus.find(e => e.status === 'draft')
                ? Moment(listStatus[listStatus.indexOf(listStatus.find(e => e.status === 'draft'))].date).format(
                    'DD/MM/YYYY hh:mm:ss',
                  )
                : 'Đang cập nhật'}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  _renderInformationOrder = () => {
    const { flag } = this.state;
    return (
      <TouchableOpacity onPress={() => this.setState({ flag: !flag })} style={styles.containerTitle}>
        <View style={styles.row}>
          <Text style={styles.txtTitle}>Trạng thái đơn hàng</Text>
        </View>
        {!flag ? (
          <Image source={ICON_RIGHT} style={styles.icon} />
        ) : (
          <Image source={ICON_RIGHT} style={[styles.icon, { transform: [{ rotate: '90deg' }] }]} />
        )}
      </TouchableOpacity>
    );
  };
  render() {
    const { navigation } = this.props;
    const { isFetching, flag, dataProduct } = this.state;
    return (
      <View style={[styles.container, { backgroundColor: isFetching ? WHITE : BACKGROUND_COLOR }]}>
        <MyStatusBar />
        {this._renderHeader()}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          {this._renderTitle('Chi tiết đơn hàng', dataProduct.length)}
          {this._renderDetail()}
          {this._renderTitle('Địa chỉ nhận hàng', 0)}
          {this._renderAddress()}
          {this._renderTitle('Phương thức thanh toán', 0)}
          {this._renderPayMent()}
          {this._renderInformationOrder()}
          {flag ? this._renderProgressStatus() : null}
        </ScrollView>
        <LoadContent number={10} loading={isFetching} animation={ShineOverlay} style={{ marginHorizontal: vw(5) }} />
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    info: state.user.dataUser.info,
    store: state.user.dataUser.store,
  };
}
export default connect(mapStateToProps)(index);
