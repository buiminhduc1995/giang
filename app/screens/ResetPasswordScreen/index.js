import React from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions, StatusBar, ImageBackground, KeyboardAvoidingView, Alert, BackHandler, Keyboard,
} from 'react-native';
import vw from "../../utils/size-dynamic";
import {
  BG_SPLASH,
  ICON_BACK, ICON_BELL,
  ICON_GROUP,
  ICON_USER,
  MAIN_COLOR
} from "../../constants";
import HeaderBar from "../../elements/HeaderBar";
import Input from "../../elements/Input";
import validate from "../../utils/validate";
import API from "../../api";
import {REGISTER_SCREEN} from "../../redux/types";
import PopupDialog, {SlideAnimation} from "react-native-popup-dialog";

const {height, width} = Dimensions.get('window');
const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

class ResetPasswordScreen extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: null,
      isRequesting: false
    };
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._handleBackPress);
  }

  _handleBackPress = () => {
    return this.props.navigation.goBack();
  };

  _onClickResetPassword = async () => {
    await this.setState({
      emailError: validate('email', this.state.email),
    });
    let isError = this.state.emailError;

    if (isError === null) {
      Keyboard.dismiss();
      const params = {
        "login_id": this.state.email
      };
      API.authApi.resetPassword(params).then(res => {
        this.popupDialog.show();
      }).catch(err => {
        Alert.alert(
          'Thông báo',
          'Thất bại, Mã lỗi: ' + err.message,
          [
            {text: 'OK', onPress: () =>  false}
          ],
          { cancelable: false }
        );
      });
    }
  };

  _renderContentPopup = () => {
    return (
      <View>
        <View>
          <Text style={styles.text}>Hướng dẫn đăng ký tài khoản đã được gửi về địa chỉ</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>Email </Text>
            <Text style={{color: MAIN_COLOR, fontWeight: 'bold'}}>{this.state.email} </Text>
            <Text style={styles.text}>của bạn</Text>
          </View>
          <Text style={styles.text}> </Text>
        </View>
        <Text style={styles.text}>Vui lòng kiểm tra và làm theo hướng dẫn để lấy lại mật khẩu truy cập</Text>
      </View>
    )
  };

  _renderPopup = () => {
    return (
      <PopupDialog
        ref={(popupDialog) => {
          this.popupDialog = popupDialog;
        }}
        dialogAnimation={slideAnimation}
        width={width - 20}
        dialogStyle={{
          borderRadius: vw(12),
          overflow: "hidden",
          height: vw(294),
          backgroundColor: 'transparent',
          paddingTop: vw(35)
        }}
      >
        <View style={{flex: 1}}>
          <View style={styles.header}>
            <Image source={ICON_BELL} style={{
              width: vw(35),
              height: vw(35),
              resizeMode: 'contain'
            }}/>
          </View>

          <View style={{
            backgroundColor: '#fff',
            borderRadius: vw(12),
            overflow: 'hidden',
            justifyContent: 'space-between'
          }}>

            <View style={{
              paddingHorizontal: vw(15),
              paddingVertical: vw(40),
              paddingTop: vw(50)
            }}>
              {this._renderContentPopup()}
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: MAIN_COLOR,
                height: vw(50),
                justifyContent: "center"
              }}
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}
            >
              <Text style={{
                textAlign: "center",
                fontFamily: "Arial",
                fontSize: vw(14),
                color: "#ffffff",
                fontWeight: "bold"
              }}>XÁC NHẬN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PopupDialog>
    )
  };

  _renderHeader() {
    return (
      <HeaderBar
        left={this._renderHeaderLeft()}
        style={{backgroundColor: 'transparent'}}
      />
    );
  }

  _renderHeaderLeft() {
    return (
      <TouchableOpacity
        style={{flexDirection: "row", alignItems: "center"}}
        onPress={() => this.props.navigation.goBack()}>
        <Image source={ICON_BACK} style={{width: vw(11), height: vw(20), resizeMode: "contain", marginRight: vw(10)}}/>
        <Text style={{fontSize: vw(18), fontFamily: "Arial", fontWeight: "bold", color: "#ffffff"}}>
          Quên mật khẩu
        </Text>
      </TouchableOpacity>
    )
  }

  _renderBody() {
    return (
      <View style={[styles.wrapBody, {alignItems: 'center'}]}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{fontSize: vw(22), color: 'white', fontWeight: 'bold'}}>Quên mật khẩu</Text>
        </View>

        <View style={{
          flex: 2,
          alignItems: 'center'
        }}>
          <View style={[styles.inputItem, {maxWidth: vw(250)}]}>
            <Text style={styles.error}>{this.state.emailError}</Text>
            <View style={styles.wrapInput}>
              <Image source={ICON_USER} style={styles.inputIcon}/>
              <Input
                onChange={(text) => {
                  this.setState({
                    email: text
                  })
                }}
                style={styles.input}
                placeholder={'Tên truy cập hoặc email'}
                selectionColor={'#ffffff'}
                autoCapitalize='none'
                keyboardType={"email-address"}
              />
            </View>
          </View>
          <Text
            style={{
              fontSize: vw(14),
              color: 'white',
              fontFamily: 'Arial',
              fontStyle: 'italic',
              paddingVertical: vw(10)
            }}
          >Nhập địa chỉ Email đã dùng để đâng ký của bạn</Text>
          <TouchableOpacity
            style={{
              height: vw(40),
              backgroundColor: 'white',
              borderRadius: vw(5),
              justifyContent: "center",
              alignItems: "center",
              marginVertical: vw(15),
              width: vw(250)
            }}
            onPress={this._onClickResetPassword}
          >
            <Text
              style={{fontSize: vw(16), fontFamily: "Arial", color: MAIN_COLOR, fontWeight: "bold"}}
            >
              {this.state.isRequesting ? "Đang gửi yêu cầu ..." : "Gửi yêu cầu"}
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  _renderFooter = () => {
    return (
      <View style={{flexDirection: "row", paddingBottom: vw(15), justifyContent: 'center'}}>
        <Text
          style={{
            fontSize: vw(14),
            fontFamily: "Arial",
            color: "#ffffff"
          }}
        >Bạn chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => {
          this.props.navigation.navigate(REGISTER_SCREEN)
        }}>
          <Text
            style={{
              fontSize: vw(14),
              fontFamily: "Arial",
              color: "#ffffff",
              textDecorationLine: "underline"
            }}
          >Đăng ký tại đây</Text>
        </TouchableOpacity>
      </View>
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{flex: 1}}
          source={BG_SPLASH}
        >
          {this._renderHeader()}
          <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            {this._renderBody()}
          </KeyboardAvoidingView>
          {this._renderFooter()}
        </ImageBackground>
        {this._renderPopup()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  wrapHeader: {
    flexDirection: "row",
    padding: vw(10),
  },
  wrapBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontFamily: 'Arial',
    color: '#333333',
    marginBottom: vw(5)
  },
  input: {
    height: vw(30),
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0,
    color: '#ffffff',
    paddingVertical: 0,
    paddingLeft: vw(5)
  },
  inputIcon: {
    width: vw(12),
    height: vw(12),
    resizeMode: 'contain',
    tintColor: 'white'
  },
  wrapInput: {
    borderBottomWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, .5)',
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputItem: {
    marginBottom: vw(10)
  },
  error: {
    color: '#B71C1C',
    fontSize: vw(9)
  },
  header: {
    width: vw(70),
    height: vw(70),
    borderRadius: vw(35),
    backgroundColor: MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -vw(35),
    left: width / 2 - vw(35),
    zIndex: 1
  },
  text: {
    color: '#828282',
    fontSize: vw(14),
    fontFamily: 'Arial'
  },
};


export default ResetPasswordScreen;