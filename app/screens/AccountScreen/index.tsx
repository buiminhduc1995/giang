import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, AsyncStorage, StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic';
import {
  ICON_ACCOUNT_DISABLE,
  ICON_FLAG,
  ICON_HISTORY,
  ICON_LAW,
  ICON_LOGO,
  ICON_ROLE,
  ICON_VOICE,
  ICON_HEART,
  TAB,
} from '../../constants';

import HeaderBar from '../../elements/HeaderBar';
import {
  HELPSCREEN,
  HISTORY_ORDER_SCREEN,
  LOGIN,
  ACCOUNT_INFO_SCREEN,
  PROVIDER_FAVORITE_SCREEN,
  DRUG_FAVORITE_SCREEN,
  LOGOUT,
  RESET_APP,
} from '../../redux/types';
import { connect } from 'react-redux';
import VersionNumber from 'react-native-version-number';
import { changeTabNavigator } from '../../redux/action/navigation';
import { persistor } from '../../redux/store';
import { Navigation } from '../../dataType';

// import FCM from 'react-native-fcm';
type Props = {
  info: any;
  logout: any;
  resetRedux: any;
  navigation: Navigation;
  changeTabNavigator: any;
};

class AccountScreen extends React.PureComponent<Props> {
  _renderHeader() {
    return (
      <HeaderBar
        left={this._renderHeaderLeft()}
        right={this._renderHeaderRight()}
        wrapLeft={{ flex: 1, paddingRight: vw(20) }}
      />
    );
  }

  _renderHeaderLeft() {
    return (
      <Text
        style={{ fontSize: vw(18), fontFamily: 'Arial', fontWeight: 'bold', color: '#ffffff' }}
        numberOfLines={1}
        ellipsizeMode={'tail'}
      >
        {this.props.info !== null && this.props.info.full_name}
      </Text>
    );
  }

  _logout = () => {
    AsyncStorage.removeItem('fcmToken');
    this.props.changeTabNavigator(TAB.DRUG_STORE_TAB);
    this.props.logout({ type: LOGOUT });
    persistor.purge();
    this.props.resetRedux();
    this.props.navigation.navigate(LOGIN);
    // FCM.getInitialNotification().then(notif => {
    //   FCM.unsubscribeFromTopic('Medlink_New_Order'); // production
    //   // FCM.unsubscribeFromTopic("Medlink_Uat_New_Order");  // UAT
    //   // FCM.unsubscribeFromTopic("Medlink_Dev_New_Order");  // Dev
    // });
  };

  _renderHeaderRight() {
    return (
      <TouchableOpacity onPress={this._logout}>
        <Text style={{ fontSize: vw(14), fontFamily: 'Arial', fontWeight: 'bold', color: '#ffffff' }}>Đăng xuất</Text>
      </TouchableOpacity>
    );
  }

  _onClickHistoryOrderScreen = () => {
    this.props.navigation.navigate(HISTORY_ORDER_SCREEN, {
      beforeScreen: 'home',
    });
  };

  _onClickAccountInfoScreen = () => {
    this.props.navigation.navigate(ACCOUNT_INFO_SCREEN);
  };

  _onClickProviderFavoriteScreen = () => {
    this.props.navigation.navigate(PROVIDER_FAVORITE_SCREEN);
  };

  _onClickDrugFavoriteScreen = () => {
    this.props.navigation.navigate(DRUG_FAVORITE_SCREEN);
  };

  _renderItem = (item: { title: any; onPress: any; icon: any }) => {
    const { title, onPress, icon } = item;
    return (
      <TouchableOpacity style={styles.item} onPress={onPress} key={title}>
        <Image source={icon} style={styles.itemImg} />
        <Text style={styles.itemText}>{title}</Text>
      </TouchableOpacity>
    );
  };
  _onClickItem = (screen_key: string) => {
    this.props.navigation.navigate(screen_key);
  };

  _onClickPolicy = (key: any) => {
    this.props.navigation.navigate(HELPSCREEN, { dataHelpScreen: { screenType: key } });
  };
  _renderContent() {
    const listMyInfo = [
      {
        title: 'Lịch sử đơn hàng',
        icon: ICON_HISTORY,
        onPress: this._onClickHistoryOrderScreen,
      },
      {
        title: 'Thông tin tài khoản',
        icon: ICON_ACCOUNT_DISABLE,
        onPress: () => this._onClickItem(ACCOUNT_INFO_SCREEN),
      },
      {
        title: 'Danh sách nhà cung cấp yêu thích',
        icon: ICON_HEART,
        onPress: () => this._onClickItem(PROVIDER_FAVORITE_SCREEN),
      },
      {
        title: 'Danh sách nhãn hàng yêu thích',
        icon: ICON_HEART,
        onPress: () => this._onClickItem(DRUG_FAVORITE_SCREEN),
      },
    ];

    const listPolicy = [
      {
        title: 'Chính sách chung',
        icon: ICON_FLAG,
        onPress: () => this._onClickPolicy('GENERAL_POLICY'),
      },
      {
        title: 'Điều khoản sử dụng',
        icon: ICON_FLAG,
        onPress: () => this._onClickPolicy('POLICY_APPLICATION'),
      },
      {
        title: 'Quyền hạn riêng tư',
        icon: ICON_ROLE,
        onPress: () => this._onClickPolicy('SECURE_POLICY'),
      },
      {
        title: 'Thông tin hợp pháp',
        icon: ICON_LAW,
        onPress: () => this._onClickPolicy('LEGAL_INFO'),
      },
      {
        title: 'Thông tin hỗ trợ',
        icon: ICON_VOICE,
        onPress: () => this._onClickPolicy('INFO_SUPPORT'),
      },
    ];
    return (
      <ScrollView style={styles.wrapContent}>
        <View style={{ borderRadius: 3, overflow: 'hidden', marginBottom: vw(10) }}>
          {listMyInfo.map(item => this._renderItem(item))}
        </View>
        <View style={{ borderRadius: 3, overflow: 'hidden' }}>{listPolicy.map(item => this._renderItem(item))}</View>
        <View style={{ alignItems: 'center', paddingVertical: vw(20) }}>
          <Image
            source={ICON_LOGO}
            style={{ width: vw(40), height: vw(40), resizeMode: 'contain', marginBottom: vw(10) }}
          />
          <Text style={{ fontSize: vw(12), fontFamily: 'Arial', color: '#BDBDBD' }}>
            Phiên bản {VersionNumber.appVersion}
          </Text>
          <Text style={{ fontSize: vw(12), fontFamily: 'Arial', color: '#4F4F4F' }}>
            2018 Medlink.com. All rights reserved
          </Text>
        </View>
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        {this._renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0EDEE',
  },
  wrapHeader: {
    flexDirection: 'row',
    padding: vw(10),
  },
  wrapContent: {
    flex: 1,
    padding: vw(10),
    backgroundColor: '#E7E7E7',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: vw(10),
    paddingVertical: vw(12),
    borderBottomWidth: 0.5,
    borderColor: '#E7E7E7',
  },
  itemImg: {
    width: vw(15),
    height: vw(15),
    resizeMode: 'contain',
    marginRight: vw(10),
  },
  itemText: {
    color: '#4F4F4F',
    fontSize: vw(14),
    fontFamily: 'Arial',
  },
});

function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    logout: () => {
      dispatch({ type: LOGOUT });
    },
    changeTabNavigator: (tabName: string) => {
      dispatch(changeTabNavigator(tabName));
    },
    resetRedux: () => {
      dispatch({ type: RESET_APP });
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountScreen);
