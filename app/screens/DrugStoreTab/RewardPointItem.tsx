import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import { MAIN_COLOR, ICON_RIGHT } from '../../constants';
import Api from '../../api';
import { connect } from 'react-redux';
import LoaderIndicator from '../../elements/LoaderIndicator';
import { REFRESH_NEWS, POINT_DETAIL_SCREEN } from '../../redux/types';
import { getPointWallet } from '../../redux/action/rewardPoint';
import MyStatusBar from '../../elements/MyStatusBar';

const { width, height } = Dimensions.get('window');
type Props = {
  store: any;
  getPointWallet: Function;
  navigation: Function;
  pointWallet: any;
};
type State = {};
class RewardPointItem extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this._getWalletPoint();
  }

  _getWalletPoint = () => {
    console.log('hello');
    const { drg_store_id } = this.props.store;
    this.props.getPointWallet(drg_store_id);
  };
  _goToPointDetail = () => {
    this.props.navigation.navigate(POINT_DETAIL_SCREEN);
  };

  render() {
    const { pointWallet } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold', paddingBottom: 5 }}>Thành viên ưu đãi</Text>
          <TouchableOpacity
            style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingRight: 10 }}
            onPress={this._goToPointDetail}
          >
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#2D9CDB' }}>Chi tiết</Text>
            <Image source={ICON_RIGHT} style={{ width: 10, height: 10 }} />
          </TouchableOpacity>
        </View>
        <Text style={{ fontStyle: 'italic', paddingBottom: 5, paddingTop: 5 }}>
          Điểm bạn có thể sử dụng:
          <Text style={{ fontWeight: 'bold', fontStyle: 'italic', color: '#EB5757' }}>
            {`  `}
            {pointWallet ? pointWallet.point : 0} điểm
          </Text>
        </Text>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontStyle: 'italic', paddingRight: 5, paddingTop: 5, paddingBottom: 5 }}>
            Cách tích luỹ điểm thưởng MedRewards
          </Text>
          <Image source={ICON_RIGHT} style={{ width: 10, height: 10 }} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: 'white',
    margin: 5,
    padding: 5,
    borderRadius: 5,
  },
});

function mapStateToProps(state: any) {
  return {
    user: state.user.dataUser.info,
    pointWallet: state.user.pointWallet,
    store: state.user.dataUser.store,
    isRefreshNew: state.social.isRefreshNew,
  };
}

const mapDispatchToProps = {
  getPointWallet,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RewardPointItem);
