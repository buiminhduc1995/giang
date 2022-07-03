import React from 'react';
import { BackHandler, Image, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic';

import HeaderBar from '../../elements/HeaderBar';
import { connect } from 'react-redux';
import { ICON_BACK } from '../../constants';
import Input from '../../elements/Input';
import { MyStatusBar } from '../../elements/MyStatusBar';
type Props = {
  navigation: Function;
  store: any;
};
type States = {};
class AccountInfoScreen extends React.PureComponent<Props, States> {
  constructor(props) {
    super(props);
    this._goBack = this._goBack.bind(this);
    this._handleBackPress = this._handleBackPress.bind(this);
  }

  _goBack() {
    this.props.navigation.goBack();
  }

  _handleBackPress() {
    this._goBack();
    return true;
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this._handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress);
  }

  _onClickEditInfo = () => {};

  _renderHeader() {
    return (
      <HeaderBar
        left={this._renderHeaderLeft()}
        // right={this._renderHeaderRight()}
        wrapLeft={{ flex: 1, paddingRight: vw(20) }}
      />
    );
  }

  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this._goBack}>
        <Image
          source={ICON_BACK}
          style={{ width: vw(11), height: vw(20), resizeMode: 'contain', marginRight: vw(10) }}
        />
        <Text style={{ fontSize: vw(18), fontFamily: 'Arial', fontWeight: 'bold', color: '#ffffff' }}>
          Thông tin tài khoản
        </Text>
      </TouchableOpacity>
    );
  }

  _renderHeaderRight() {
    return (
      <TouchableOpacity onPress={this._onClickEditInfo}>
        <Text style={{ fontSize: vw(14), fontFamily: 'Arial', fontWeight: 'bold', color: '#ffffff' }}>
          Sửa thông tin
        </Text>
      </TouchableOpacity>
    );
  }

  _renderContent() {
    return (
      this.props.store && (
        <ScrollView style={styles.wrapContent}>
          <View style={{ borderRadius: 3, overflow: 'hidden', marginBottom: vw(10) }}>
            <View style={styles.item}>
              <Text
                style={{
                  fontSize: vw(14),
                  color: '#BDBDBD',
                  width: vw(80),
                }}
              >
                Tên
              </Text>
              <Input
                style={styles.input}
                selectionColor={'#4F4F4F'}
                defaultValue={this.props.store.company_name}
                onChange={text => {}}
              />
            </View>
            <View style={styles.item}>
              <Text
                style={{
                  fontSize: vw(14),
                  color: '#BDBDBD',
                  width: vw(80),
                }}
              >
                Địa chỉ
              </Text>
              <Text style={styles.input} numberOfLines={2}>
                {this.props.store.address1 + ',' + this.props.store.district + ',' + this.props.store.city}
              </Text>
              {/* <Input
              style={styles.input}
              selectionColor={'#4F4F4F'}
              defaultValue={this.props.store.address1 + ','+ this.props.store.district + ','+ this.props.store.city }
              onChange={(text) => {

              }}/> */}
            </View>
            <View style={styles.item}>
              <Text
                style={{
                  fontSize: vw(14),
                  color: '#BDBDBD',
                  width: vw(80),
                }}
              >
                MST
              </Text>
              <Text style={styles.input}>{this.props.store.drg_tax_code}</Text>
              {/* <Input
              style={styles.input}
              selectionColor={'#4F4F4F'}
              defaultValue={this.props.store.drg_tax_code}
              onChange={(text) => {

              }}/> */}
            </View>
            <View style={styles.item}>
              <Text
                style={{
                  fontSize: vw(14),
                  color: '#BDBDBD',
                  width: vw(80),
                }}
              >
                Quản lý
              </Text>
              <Text style={styles.input}>{this.props.store.owner_name}</Text>
              {/* <Input
              style={styles.input}
              selectionColor={'#4F4F4F'}
              defaultValue={this.props.store.owner_name}
              onChange={(text) => {

              }}/> */}
            </View>
            <View style={styles.item}>
              <Text
                style={{
                  fontSize: vw(14),
                  color: '#BDBDBD',
                  width: vw(80),
                }}
              >
                Điện thoại
              </Text>
              <Text style={styles.input}>{this.props.store.phone_no}</Text>
              {/* <Input
              style={styles.input}
              selectionColor={'#4F4F4F'}
              defaultValue={this.props.store.phone_no}
              onChange={(text) => {

              }}/> */}
            </View>
            <View style={styles.item}>
              <Text
                style={{
                  fontSize: vw(14),
                  color: '#BDBDBD',
                  width: vw(80),
                }}
              >
                Email
              </Text>
              <Text style={styles.input}>{this.props.store.email}</Text>
              {/* <Input
              style={styles.input}
              selectionColor={'#4F4F4F'}
              defaultValue={this.props.store.email}
              onChange={(text) => {

              }}/> */}
            </View>
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              marginVertical: vw(10),
            }}
            onPress={() => {
              this.props.navigation.navigate('ChangePasswordScreen');
            }}
          >
            <Text
              style={{
                fontSize: vw(14),
                color: '#EB5757',
                fontFamily: 'Arial',
                textDecorationLine: 'underline',
              }}
            >
              Đổi mật khẩu truy cập
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
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
    paddingLeft: vw(10),
    alignItems: 'center',
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
    paddingVertical: vw(12),
  },
  input: {
    flexGrow: 1,
    color: '#4F4F4F',
    fontSize: vw(14),
    fontFamily: 'Arial',
    paddingVertical: vw(12),
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    borderColor: '#E7E7E7',
    height: vw(40),
    width: 0,
    paddingHorizontal: vw(5),
  },
});

function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    store: state.user.dataUser.store,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    /*logout: () => new Promise(resolve => resolve(dispatch({
      type: types.LOGOUT,
    })))*/
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountInfoScreen);
