import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import { ICON_RIGHT, themes } from '../../constants';
import { connect } from 'react-redux';
import { REFRESH_NEWS } from '../../redux/types';
import vw from '../../utils/size-dynamic';
type State = {
  pointWallet: any;
};
type Props = {};
class ManagerOderItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      pointWallet: null,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wapper}>
          <Text style={styles.txtTitle}>Danh sách đơn hàng tại quầy</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.txtDetail}>Chi tiết</Text>
            <Image source={ICON_RIGHT} style={styles.iconRight} />
          </TouchableOpacity>
        </View>
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
    backgroundColor: themes.colors.WHITE,
    margin: 5,
    padding: 5,
    borderRadius: 5,
  },
  iconRight: {
    width: vw(10),
    height: vw(10),
  },
  txtDetail: {
    fontSize: vw(12),
    fontWeight: 'bold',
    color: themes.colors.BLUE,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: vw(10),
  },
  txtTitle: {
    fontWeight: 'bold',
    paddingBottom: vw(5),
  },
  wapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

function mapStateToProps(state: any) {
  return {
    user: state.user.dataUser.info,
    store: state.user.dataUser.store,
    isRefreshNew: state.social.isRefreshNew,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    reFreshNew: (isRefreshNew: any) => dispatch({ type: REFRESH_NEWS, isRefreshNew: isRefreshNew }),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManagerOderItem);
