import React from 'react';
import { Alert, BackHandler, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import vw from '../../utils/size-dynamic';
import HeaderBar from '../../elements/HeaderBar';
import { connect } from 'react-redux';
import { ICON_BACK } from '../../constants';
import validate from '../../utils/validate';
import Input from '../../elements/Input';
import API from '../../api';
import MD5 from 'crypto-js/md5';
import { MyStatusBar } from '../../elements/MyStatusBar';
type Props = {
  navigation: Function;
};
type State = {
  oldPassword: String;
  newPassword: String;
  newPasswordConfirm: String;
  passwordError: any;
  info: any;
};
class ChangePasswordScreen extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
      passwordError: null,
    };
    this._goBack = this._goBack.bind(this);
    this._handleBackPress = this._handleBackPress.bind(this);
  }

  _onChangeOldPassword(text:string) {
    this.setState({
      oldPassword: text,
    });
  }

  _onChangeNewPassword(text:string) {
    this.setState({
      newPassword: text,
    });
  }

  _onChangeNewPasswordConfirm(text:string) {
    this.setState({
      newPasswordConfirm: text,
    });
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

  _onClickChangePassword = async () => {
    await this.setState({
      passwordError:
        validate('string', this.state.oldPassword) ||
        validate('string', this.state.newPassword) ||
        validate('string', this.state.newPasswordConfirm),
    });
    if (this.state.newPasswordConfirm !== this.state.newPassword) {
      await this.setState({
        passwordError: 'Mật khẩu nhập không khớp',
      });
    }
    const isError = this.state.passwordError;
    if (isError === null && this.props.info !== null) {
      const params = {
        login_id: this.props.info.login_id,
        old_password: `${MD5(this.state.oldPassword)}`,
        new_password: `${MD5(this.state.newPassword)}`,
      };
      API.authApi
        .changePassword(params)
        .then(res => {
          Alert.alert(
            'Thông báo',
            'Mật khẩu đã được đổi',
            [{ text: 'OK', onPress: () => this.props.navigation.navigate('Login') }],
            { cancelable: false },
          );
        })
        .catch(err => {
          Alert.alert(
            'Thông báo',
            'Đổi mật khẩu thất bại, Mã lỗi: ' + err.message,
            [{ text: 'OK', onPress: () => false }],
            { cancelable: false },
          );
        });
    }
  };

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
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this._goBack}>
        <Image
          source={ICON_BACK}
          style={{ width: vw(11), height: vw(20), resizeMode: 'contain', marginRight: vw(10) }}
        />
        <Text style={{ fontSize: vw(18), fontFamily: 'Arial', fontWeight: 'bold', color: '#ffffff' }}>
          Thay đổi mật khẩu
        </Text>
      </TouchableOpacity>
    );
  }

  _renderHeaderRight() {
    return (
      <TouchableOpacity onPress={this._onClickChangePassword}>
        <Text style={{ fontSize: vw(14), fontFamily: 'Arial', fontWeight: 'bold', color: '#ffffff' }}>
          Lưu mật khẩu
        </Text>
      </TouchableOpacity>
    );
  }

  _renderContent = () => {
    return (
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.wrapContent}>
        {this.state.passwordError !== null && (
          <Text style={{ color: '#B71C1C', paddingVertical: vw(10) }}>{this.state.passwordError}</Text>
        )}
        <View style={{ borderRadius: 3, overflow: 'hidden', marginBottom: vw(10) }}>
          <View style={styles.item}>
            <Text
              style={{
                fontSize: vw(14),
                color: '#BDBDBD',
                width: vw(125),
              }}
            >
              Mật khẩu cũ
            </Text>
            <Input
              style={styles.input}
              selectionColor={'#4F4F4F'}
              secureTextEntry
              autoCapitalize="none"
              onChange={(text: string) => this._onChangeOldPassword(text)}
            />
          </View>
          <View style={styles.item}>
            <Text
              style={{
                fontSize: vw(14),
                color: '#BDBDBD',
                width: vw(125),
              }}
            >
              Mật khẩu mới
            </Text>
            <Input
              style={styles.input}
              selectionColor={'#4F4F4F'}
              secureTextEntry
              autoCapitalize="none"
              onChange={(text: string) => this._onChangeNewPassword(text)}
            />
          </View>
          <View style={styles.item}>
            <Text
              style={{
                fontSize: vw(14),
                color: '#BDBDBD',
                width: vw(125),
              }}
            >
              Xác nhận mật khẩu
            </Text>
            <Input
              style={[styles.input, { borderBottomWidth: 0 }]}
              selectionColor={'#4F4F4F'}
              secureTextEntry
              autoCapitalize="none"
              onChange={(text: string) => this._onChangeNewPasswordConfirm(text)}
            />
          </View>
        </View>
      </ScrollView>
    );
  };

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

const styles = {
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
    color: '#4F4F4F',
    fontSize: vw(14),
    fontFamily: 'Arial',
    paddingVertical: vw(12),
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    borderColor: '#E7E7E7',
    height: vw(40),
    paddingHorizontal: vw(5),
  },
};

function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
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
)(ChangePasswordScreen);
