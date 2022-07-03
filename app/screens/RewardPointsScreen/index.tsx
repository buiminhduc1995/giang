import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from './RewardPointsScreen.style';
import { ICON_BACK } from '../../constants';
import { MyStatusBar } from '../../elements/MyStatusBar';
import HeaderBar from '../../elements/HeaderBar';
import { dataPromotion } from '../../constants/data';
import ItemPromotion from '../../components/ItemPromotion';
import { connect } from 'react-redux';
import API from '../../api';
type Props = {
  navigation: Function;
  info: any;
  token: string;
};
type State = {
  point: number;
};
class RewardPointsScreen extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      point: 150000,
    };
  }
  componentDidMount() {
    this.getPoint();
  }
  getPoint = async () => {
    try {
      const { info, token } = this.props;
      const res = await API.rewardPointApi.getPointWallet(info.drg_store_id, token);
      this.setState({ point: res.data.point });
    } catch (error) {
      console.log(error);
    }
  };
  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }
  _renderHeaderLeft() {
    const { navigation } = this.props;
    return (
      <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()}>
        <Image source={ICON_BACK} style={styles.iconBack} />
        <Text style={styles.txtHeaderLeft}>Điểm tích lũy</Text>
      </TouchableOpacity>
    );
  }
  _renderNotiPoint = () => {
    return (
      <View style={styles.wapperNotiPoint}>
        <Text style={styles.txt}>
          Điểm của bạn: {this.state.point.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} điểm
        </Text>
        <TouchableOpacity>
          <Text style={styles.txtbutton}>Chi tiết ></Text>
        </TouchableOpacity>
      </View>
    );
  };
  _renderListPromotion = () => {
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={dataPromotion}
        horizontal
        renderItem={({ item }) => <ItemPromotion item={item} />}
        keyExtractor={(item, index) => index}
      />
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        <View style={styles.wapper}>
          {this._renderNotiPoint()}
          {/* <Text style={styles.titleTxt}>Ưu đãi dành cho nhà thuốc</Text> */}
          {/* {this._renderListPromotion()} */}
        </View>
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    store: state.user.dataUser.store,
    token: state.user.token,
  };
}
export default connect(mapStateToProps)(RewardPointsScreen);
