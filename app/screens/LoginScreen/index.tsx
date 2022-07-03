import React from 'react';
import API from '../../api';

import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StatusBar,
  ImageBackground,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  Alert,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import { HOME, REGISTER_SCREEN } from '../../redux/types';
import {
  BG_SPLASH,
  ICON_CLOSE,
  ICON_INPUT_PASSWORD,
  ICON_INPUT_USERNAME,
  ICON_LOGO_SPLASH,
  MAIN_COLOR,
} from '../../constants';
import vw from '../../utils/size-dynamic';
import validate from '../../utils/validate';
import * as types from '../../redux/types';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import CheckBox from '../../elements/CheckBox';
import Communications from 'react-native-communications';
import PopupDialog from 'react-native-popup-dialog';
// import FCM from 'react-native-fcm';
import LoaderIndicator from '../../elements/LoaderIndicator';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../constants/themes';

const { width, height } = Dimensions.get('window');
type State = {
  username: string;
  password: string;
  usernameError: any;
  passwordError: any;
  loggedError: boolean | string;
  isRequestingLogin: boolean;
  saveLogged: any;
  isFocus: boolean;
  isShowPassword: boolean;
};
type Props = {
  navigation: Function;
  saveLogged: boolean;
  userSaved: any;
};

class LoginScreen extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: props.saveLogged ? props.userSaved.username : '',
      password: props.saveLogged ? props.userSaved.password : '',
      usernameError: null,
      passwordError: null,
      loggedError: false,
      isRequestingLogin: false,
      saveLogged: props.saveLogged,
      isFocus: false,
      isShowPassword: false,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   FCM.subscribeToTopic("Medlink");
  //   // FCM.unsubscribeFromTopic("Medlink");
  // }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidHide', e => {
      this.setState({ isFocus: false });
    });
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidShow', e => {
      this.setState({ isFocus: true });
    });
    this.props.logout();
  }

  // componentWillUnmount() {
  //   this.keyboardDidShowListener.remove();
  //   this.keyboardDidHideListener.remove();
  // }

  async componentDidMount() {
    let { username, password } = this.state;
    if (!username || !password) {
      const username = (await AsyncStorage.getItem('username')) || '';
      const password = (await AsyncStorage.getItem('password')) || '';
      this.setState({ username, password });
    }
    // FCM.getInitialNotification().then(notif => {
    //   FCM.subscribeToTopic(config.notifycation.order);
    //   FCM.subscribeToTopic(config.notifycation.notifycation_order_function);
    //   FCM.subscribeToTopic(config.notifycation.notification_new_policy);
    //   FCM.subscribeToTopic(config.notifycation.notification_holiday);
    //   FCM.subscribeToTopic(config.notifycation.notification_tet_holiday);
    //   FCM.subscribeToTopic(config.notifycation.notification_news);
    // });
    // FCM.createNotificationChannel({
    //   id: 'ship_order',
    //   name: 'Thông báo giao hàng',
    //   description: 'Thông báo đơn hàng cần giao của nhà thuốc',
    //   priority: 'max',
    // });
    // try {
    //   const result = await FCM.requestPermissions({ badge: true, sound: true, alert: true });
    // } catch (e) {
    //   // console.error(e);
    // }
  }
  validateUsername = async () => {
    if (validate('email', this.state.username) === null) {
      return null;
    } else if (validate('phone', this.state.username) === null) {
      return null;
    } else {
      return 'Vui lòng nhập đúng email hoặc số điện thoại';
    }
  };

  _login = async () => {
    Keyboard.dismiss();
    if (this.state.isRequestingLogin) return;
    const result = await this.validateUsername();
    this.setState(
      {
        usernameError: result,
        passwordError: validate('password', this.state.username),
        isRequestingLogin: true,
      },
      () => {
        if (this.state.usernameError === null && this.state.passwordError === null) {
          API.authApi
            .getLogin(this.state.username, this.state.password)
            .then(res => {
              this.setState(
                {
                  loggedError: false,
                  isRequestingLogin: false,
                },
                () => {
                  {
                    this.state.saveLogged
                      ? AsyncStorage.multiSet([['username', this.state.username], ['password', this.state.password]])
                      : AsyncStorage.multiSet([['username', ''], ['password', '']]);
                  }
                  let userSaved = {
                    username: this.state.username,
                    password: this.state.password,
                  };
                  this.props
                    .logged(res, this.state.saveLogged, this.state.saveLogged ? userSaved : null)
                    .then(() => this.props.navigation.push(HOME));
                },
              );
            })
            .catch((err: any) => {
              if (err.message.indexOf('400') !== -1) {
                this.setState({
                  loggedError: 'Sai tên truy cập hoặc mật khẩu! Xin vui lòng nhập thông tin đăng nhập khác',
                  isRequestingLogin: false,
                });
              }
              if (err.message === 'Network Error') {
                this.setState({
                  loggedError: 'Lỗi kết nối, vui lòng kiểm tra internet và thử lại',
                  isRequestingLogin: false,
                });
              }
              if (err.message.indexOf('timeout') !== -1) {
                this.setState({
                  loggedError: 'Lỗi internet hoặc đường truyền chậm, vui lòng kiểm tra internet và thử lại',
                  isRequestingLogin: false,
                });
              }
            });
        } else {
          this.setState({
            isRequestingLogin: false,
          });
        }
      },
    );
  };

  _onChangeTextUser(text: string) {
    this.setState({
      username: text,
    });
  }

  _onChangeTextPassword(text: string) {
    this.setState({
      password: text,
    });
  }

  _onBlurUser = async () => {
    const result = await this.validateUsername();
    this.setState({
      usernameError: result,
    });
  };

  _onBlurPassword = () => {
    this.setState({
      passwordError: validate('password', this.state.password),
    });
  };

  _onClickLostPassword = () => {
    this.props.navigation.navigate('ResetPasswordScreen');
  };

  _showPassword = () => {
    const { isShowPassword } = this.state;
    this.setState({ isShowPassword: !isShowPassword });
  };

  _renderPopupLostPassword() {
    return (
      <PopupDialog
        ref={popupDialog => {
          this.popupDialog = popupDialog;
        }}
        width={width - 30}
        containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        dialogStyle={{ zIndex: 100, borderRadius: vw(12), overflow: 'hidden', height: vw(200) }}
        onDismissed={() => Keyboard.dismiss()}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: vw(15) }}>
            <TouchableOpacity
              hitSlop={{ top: vw(30), left: vw(30), bottom: vw(30), right: vw(30) }}
              onPress={() => this.popupDialog.dismiss()}
            >
              <Image source={ICON_CLOSE} style={{ width: vw(15), height: vw(15) }} />
            </TouchableOpacity>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                fontFamily: 'Arial',
                fontSize: vw(14),
                color: '#4F4F4F',
                fontWeight: 'bold',
              }}
            >
              Quên mật khẩu
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ padding: vw(20), flexWrap: 'wrap', flex: 1 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#333333', lineHeight: vw(24) }}>Gọi điện đến tổng đài: </Text>
                <TouchableOpacity
                  onPress={() => {
                    Communications.phonecall('024 7308 0333', true);
                  }}
                >
                  <Text style={{ fontWeight: 'bold', color: '#333333', lineHeight: vw(24) }}>024 7308 0333</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#333333', lineHeight: vw(24) }}>Hotline: </Text>
                <TouchableOpacity
                  onPress={() => {
                    Communications.phonecall('092 608 0333', true);
                  }}
                >
                  <Text style={{ fontWeight: 'bold', color: '#333333', lineHeight: vw(24) }}>092 608 0333</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => this.popupDialog.dismiss()}
              style={{
                backgroundColor: MAIN_COLOR,
                height: vw(50),
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Arial',
                  fontSize: vw(14),
                  color: '#ffffff',
                  fontWeight: 'bold',
                }}
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </PopupDialog>
    );
  }

  render() {
    const { isShowPassword } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground style={styles.container} source={BG_SPLASH}>
          <StatusBar hidden />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
              }}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}
            >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Image source={ICON_LOGO_SPLASH} style={{ width: vw(150), height: vw(150), resizeMode: 'contain' }} />
                <Text style={{ color: '#ffffff', fontSize: vw(32), fontFamily: 'Arial', fontWeight: 'bold' }}>
                  Medlink
                </Text>
                <View style={{ paddingHorizontal: vw(45), paddingVertical: vw(50), width: '100%' }}>
                  <View style={{ marginBottom: vw(10) }}>
                    <Text style={{ fontSize: vw(11), color: '#B71C1C' }}>{this.state.usernameError}</Text>
                    <View style={styles.inputItem}>
                      <Image
                        source={ICON_INPUT_USERNAME}
                        style={{ width: vw(14), height: vw(14), resizeMode: 'contain', marginRight: vw(5) }}
                      />
                      <TextInput
                        maxLength={50}
                        onBlur={() => this._onBlurUser()}
                        onChangeText={text => this._onChangeTextUser(text)}
                        placeholder="Email / Số điện thoại"
                        placeholderTextColor="rgba(255, 255, 255, .5)"
                        selectionColor="white"
                        autoCapitalize="none"
                        keyboardType={'email-address'}
                        underlineColorAndroid="transparent"
                        value={this.state.username}
                        style={{ flex: 1, fontSize: vw(14), fontFamily: 'Arial', paddingVertical: 0, color: '#ffffff' }}
                      />
                    </View>
                  </View>

                  <View>
                    <Text style={{ fontSize: vw(11), color: '#B71C1C' }}>{this.state.passwordError}</Text>
                    <View style={styles.inputItem}>
                      <Image
                        source={ICON_INPUT_PASSWORD}
                        style={{ width: vw(14), height: vw(14), resizeMode: 'contain', marginRight: vw(5) }}
                      />
                      <TextInput
                        maxLength={25}
                        onBlur={() => this._onBlurPassword()}
                        onChangeText={text => this._onChangeTextPassword(text)}
                        placeholder="Mật khẩu"
                        placeholderTextColor="rgba(255, 255, 255, .5)"
                        selectionColor="white"
                        underlineColorAndroid="transparent"
                        secureTextEntry={!isShowPassword}
                        autoCapitalize="none"
                        value={this.state.password}
                        style={{ flex: 1, fontSize: vw(14), fontFamily: 'Arial', paddingVertical: 0, color: '#ffffff' }}
                      />
                      <TouchableOpacity
                        style={{ position: 'absolute', right: vw(2) }}
                        hitSlop={{ top: 15, right: 15, left: 15, bottom: 15 }}
                        onPress={this._showPassword}
                      >
                        {!isShowPassword ? (
                          <FontAwesome5 name="eye" size={vw(15)} color={colors.WHITE} />
                        ) : (
                          <FontAwesome5 name="eye-slash" size={vw(15)} color={colors.WHITE} />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>

                  <CheckBox
                    title={'Lưu mật khẩu'}
                    style={{ marginTop: vw(20), marginBottom: vw(25) }}
                    checked={this.state.saveLogged}
                    onPress={() => {
                      this.setState(prevState => ({
                        saveLogged: !prevState.saveLogged,
                      }));
                    }}
                  />

                  {this.state.loggedError && (
                    <Text
                      style={{
                        fontSize: vw(14),
                        fontFamily: 'Arial',
                        color: '#ffffff',
                        fontStyle: 'italic',
                        textAlign: 'center',
                        marginVertical: vw(15),
                      }}
                    >
                      {this.state.loggedError}
                    </Text>
                  )}

                  <TouchableOpacity
                    style={{
                      height: vw(40),
                      backgroundColor: '#ffffff',
                      borderRadius: vw(5),
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: vw(15),
                    }}
                    onPress={() => {
                      requestAnimationFrame(() => {
                        this._login();
                      });
                    }}
                  >
                    <Text style={{ fontSize: vw(16), fontFamily: 'Arial', color: MAIN_COLOR, fontWeight: 'bold' }}>
                      {this.state.isRequestingLogin ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this._onClickLostPassword}>
                    <Text
                      style={{
                        fontSize: vw(14),
                        fontFamily: 'Arial',
                        color: '#ffffff',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    >
                      Quên mật khẩu?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <KeyboardSpacer />
          </View>

          {!this.state.isFocus && (
            <View style={{ flexDirection: 'row', paddingBottom: vw(15) }}>
              <Text
                style={{
                  fontSize: vw(14),
                  fontFamily: 'Arial',
                  color: '#ffffff',
                }}
              >
                Bạn chưa có tài khoản?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(REGISTER_SCREEN);
                }}
              >
                <Text
                  style={{
                    fontSize: vw(14),
                    fontFamily: 'Arial',
                    color: '#ffffff',
                    textDecorationLine: 'underline',
                  }}
                >
                  Đăng ký tại đây
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ImageBackground>
        <LoaderIndicator loading={this.state.isRequestingLogin} />
        {/*{this._renderPopupLostPassword()}*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgba(255, 255, 255, .5)',
    borderBottomWidth: 1,
    paddingBottom: vw(5),
  },
});
function mapStateToProps(state: any) {
  return {
    isLogged: state.user.isLogged,
    dataUser: state.user.dataUser,
    saveLogged: state.user.saveLogged,
    userSaved: state.user.userSaved,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    logged: (data, saveLogged, userSaved) =>
      new Promise(resolve =>
        resolve(
          dispatch({
            type: types.LOGGED,
            data: data,
            saveLogged: saveLogged,
            userSaved: userSaved,
          }),
        ),
      ),
    logout: () =>
      new Promise(resolve =>
        resolve(
          dispatch({
            type: types.LOGOUT,
          }),
        ),
      ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
