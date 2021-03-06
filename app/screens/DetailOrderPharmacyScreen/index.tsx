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
        <Text style={styles.txtHeader}>Chi ti???t ????n h??ng</Text>
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
        {number !== 0 ? <Text style={styles.number}>({number_product} s???n ph???m)</Text> : null}
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
        <Text style={styles.txtCode}>M?? ????n h??ng: {name}</Text>
        <Text style={styles.time}>Th???i gian ?????t h??ng: {Moment(created_date).format('DD/MM/YYYY hh:mm:ss')}</Text>
        <Text style={styles.status}>
          Tr???ng th??i:{' '}
          {status === 'draft' || status === 'wait_confirm'
            ? 'Ch??? x??c nh???n'
            : status === 'order'
            ? '???????c x??c nh???n'
            : status === 'sent'
            ? 'G???i b??o gi??'
            : status === 'transfering'
            ? '??ang giao h??ng'
            : status === 'done'
            ? 'Ho??n th??nh'
            : '???? h???y'}
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
        <Text style={[styles.status, { fontWeight: 'bold' }]}>Nh?? thu???c: {info.full_name}</Text>
        <View style={styles.row}>
          <Text style={styles.status}>?????a ch???: </Text>
          <Text style={[styles.status, { fontWeight: 'bold' }]}>
            {store.address1 ? store.address1 : '??ang c???p nh???t...'}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.status}>S??? ??i???n tho???i: </Text>
          <Text style={[styles.status, { fontWeight: 'bold' }]}>
            {store.phone_no ? store.phone_no : '??ang c???p nh???t...'}
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
          <Text style={styles.status}>T???ng ti???n: </Text>
          <Text style={[styles.status, { fontWeight: 'bold' }]}>{MoneyFormat(amount)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.status}>Ph????ng th???c thanh to??n: </Text>
          <Text style={[styles.status, { fontWeight: 'bold' }]}>Ti???n m???t</Text>
        </View>
      </View>
    );
  };
  _renderNote = () => {
    return (
      <View style={styles.listProduct}>
        <Text style={styles.status}>Giao h??ng v??o l??c 10h00 s??ng</Text>
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
            <Text style={[styles.h3, { color: cancle ? MAIN_COLOR : '#BDBDBD' }]}>???? h???y</Text>
            <Text style={[styles.h2, { color: cancle ? MAIN_COLOR : '#BDBDBD' }]}>
              Th???i gian:{' '}
              {listStatus.find(e => e.status === 'cancel')
                ? Moment(listStatus[listStatus.indexOf(listStatus.find(e => e.status === 'cancel'))].date).format(
                    'DD/MM/YYYY hh:mm:ss',
                  )
                : '??ang c???p nh???t'}
            </Text>
          </View>
          <View style={styles.wapperTxt}>
            <Text style={[styles.h3, { color: done ? MAIN_COLOR : '#BDBDBD' }]}>???? giao h??ng</Text>
            <Text style={[styles.h2, { color: done ? MAIN_COLOR : '#BDBDBD' }]}>
              Th???i gian:{' '}
              {listStatus.find(e => e.status === 'done')
                ? Moment(listStatus[listStatus.indexOf(listStatus.find(e => e.status === 'done'))].date).format(
                    'DD/MM/YYYY hh:mm:ss',
                  )
                : '??ang c???p nh???t'}
            </Text>
          </View>
          <View style={styles.wapperTxt}>
            <Text style={[styles.h3, { color: shiping ? MAIN_COLOR : '#BDBDBD' }]}>??ang giao h??ng</Text>
            <Text style={[styles.h2, { color: shiping ? MAIN_COLOR : '#BDBDBD' }]}>
              Th???i gian:{' '}
              {listStatus.find(e => e.status === 'transfering')
                ? Moment(listStatus[listStatus.indexOf(listStatus.find(e => e.status === 'transfering'))].date).format(
                    'DD/MM/YYYY hh:mm:ss',
                  )
                : '??ang c???p nh???t'}
            </Text>
          </View>
          <View style={styles.wapperTxt}>
            <Text style={[styles.h3, { color: sent ? MAIN_COLOR : '#BDBDBD' }]}>G???i b??o gi??</Text>
            <Text style={[styles.h2, { color: sent ? MAIN_COLOR : '#BDBDBD' }]}>
              Th???i gian:{' '}
              {listStatus.find(e => e.status === 'sent')
                ? Moment(listStatus[listStatus.indexOf(listStatus.find(e => e.status === 'sent'))].date).format(
                    'DD/MM/YYYY hh:mm:ss',
                  )
                : '??ang c???p nh???t'}
            </Text>
          </View>
          <View style={styles.wapperTxt}>
            <Text style={[styles.h3, { color: phamarcyConfrim ? MAIN_COLOR : '#BDBDBD' }]}>C??ng ty d?????c x??c nh???n</Text>
            <Text style={[styles.h2, { color: phamarcyConfrim ? MAIN_COLOR : '#BDBDBD' }]}>
              Th???i gian:{' '}
              {listStatus.find(e => e.status === 'order')
                ? Moment(listStatus[listStatus.indexOf(listStatus.find(e => e.status === 'order'))].date).format(
                    'DD/MM/YYYY hh:mm:ss',
                  )
                : '??ang c???p nh???t'}
            </Text>
          </View>
          <View style={styles.wapperTxt}>
            <Text style={[styles.h3, { color: medlinkConfrim ? MAIN_COLOR : '#BDBDBD' }]}>Medlink x??c nh???n</Text>
            <Text style={[styles.h2, { color: medlinkConfrim ? MAIN_COLOR : '#BDBDBD' }]}>
              Th???i gian:{' '}
              {listStatus.find(e => e.status === 'wait_confirm')
                ? Moment(listStatus[listStatus.indexOf(listStatus.find(e => e.status === 'wait_confirm'))].date).format(
                    'DD/MM/YYYY hh:mm:ss',
                  )
                : '??ang c???p nh???t'}
            </Text>
          </View>
          <View style={styles.wapperTxt}>
            <Text style={[styles.h3, { color: darf ? MAIN_COLOR : '#BDBDBD' }]}>Ch??? x??c nh???n</Text>
            <Text style={[styles.h2, { color: darf ? MAIN_COLOR : '#BDBDBD' }]}>
              Th???i gian:{' '}
              {listStatus.find(e => e.status === 'draft')
                ? Moment(listStatus[listStatus.indexOf(listStatus.find(e => e.status === 'draft'))].date).format(
                    'DD/MM/YYYY hh:mm:ss',
                  )
                : '??ang c???p nh???t'}
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
          <Text style={styles.txtTitle}>Tr???ng th??i ????n h??ng</Text>
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
          {this._renderTitle('Chi ti???t ????n h??ng', dataProduct.length)}
          {this._renderDetail()}
          {this._renderTitle('?????a ch??? nh???n h??ng', 0)}
          {this._renderAddress()}
          {this._renderTitle('Ph????ng th???c thanh to??n', 0)}
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
