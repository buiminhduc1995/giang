import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import HeaderBar from '../../elements/HeaderBar';
import { MyStatusBar } from '../../elements/MyStatusBar';
import { ICON_BACK, WHITE } from '../../constants';
import { connect } from 'react-redux';
import API from '../../api';
import styles from './NotificationScreen.style';
import LoaderIndicator from '../../elements/LoaderIndicator/';
import ItemNoti from '../../components/ItemNoti';
import LoadContent from '../../elements/LoadContent';
import vw from '../../utils/size-dynamic';
import { ShineOverlay, Progressive } from 'rn-placeholder';
import TextEmpty from '../../elements/TextEmpty/';
import { colors } from '../../constants/themes';
type State = {
  isOpenFirst: boolean;
  isFetching: boolean;
  listNoti: any;
};
class NotificationScreen extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isOpenFirst: false,
      isFetching: false,
      listNoti: [],
    };
  }
  componentDidMount() {
    this._initData();
  }
  _initData = async () => {
    const { info } = this.props;
    try {
      await this.setState({ isFetching: true });
      const res = await API.notification.getNoti(info.drg_store_id, 0);
      this.setState({
        isFetching: false,
        listNoti: res.data,
      });
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
        <Text style={styles.txtBack}>Thông báo</Text>
      </TouchableOpacity>
    );
  }
  _renderListNotification = () => {
    const { listNoti, isFetching } = this.state;
    return (
      <View style={[styles.wapperListCustomer, { backgroundColor: isFetching ? colors.WHITE : colors.BACKGROUND_COLOR }]}>
        <LoadContent number={10} loading={isFetching} animation={ShineOverlay} style={{ marginHorizontal: vw(5) }} />
        {!isFetching ? (
          listNoti.length !== 0 ? (
            <FlatList
              data={listNoti}
              keyExtractor={item => item.notify_id.toString()}
              renderItem={({ item }) => <ItemNoti item={item} />}
            />
          ) : (
            <TextEmpty text={'Không tìm thấy thông báo nào!'} />
          )
        ) : null}
      </View>
    );
  };
  render() {
    const { isFetching } = this.state;
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        {this._renderListNotification()}
        {/* <LoaderIndicator loading={isFetching} /> */}
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    token: state.user.token,
    store: state.user.dataUser.store,
  };
}
export default connect(mapStateToProps)(NotificationScreen);
