import React from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions, 
  ImageBackground, 
  KeyboardAvoidingView, 
  Alert, 
  BackHandler, 
  Keyboard,
  Platform
} from 'react-native';
import vw from "../../utils/size-dynamic";
import {
  BG_SPLASH,
  ICON_BACK,
  ICON_DRUG, ICON_MAIL,
  ICON_MAP_MARKER,
  ICON_PHONE_ROUND,
  MAIN_COLOR
} from "../../constants";
import HeaderBar from "../../elements/HeaderBar";
import Input from "../../elements/Input";
import validate from "../../utils/validate";
import API from "../../api";
import {LOGIN, REGISTER_SCREEN} from "../../redux/types";
import  LoaderIndicator from '../../elements/LoaderIndicator';
const {height, width} = Dimensions.get('window');
import {MyStatusBar} from '../../elements/MyStatusBar';

class RegisterScreen extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      drugName: '',
      drugAddress: '',
      taxCode: '',
      phone: '',
      email: '',
      businessCode:'',
      TDVCode:'',
      emailError: null,
      phoneError: null,
      drugNameError: null,
      isFetching:false,
    };
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._handleBackPress);
  }

  _handleBackPress = () => {
    return this.props.navigation.goBack();
  };

  _onRegister = async () => {
    await this.setState({
      emailError: validate('email', this.state.email),
      phoneError: validate('phone', this.state.phone),
      //taxCodeError: validate('string', this.state.taxCode),
      drugNameError: validate('string', this.state.drugName),
      //drugAddressError: validate('string', this.state.drugAddress),
    });
    let isError = this.state.emailError || this.state.phoneError || this.state.drugNameError;
    if (isError === null) {
      this.setState({isFetching:true});
      Keyboard.dismiss();
      const params = {
        med_register_name: this.state.drugName,
        med_register_email: this.state.email,
        med_register_phone: this.state.phone,
        address:  this.state.drugAddress,
        tax_code:  this.state.taxCode,
        business_code: this.state.businessCode,
        tdv_code: this.state.TDVCode,
      };
      API.authApi.register(params).then(() => {
        this.setState({isFetching:false});
        Alert.alert(
          'Thông báo',
          'Đăng ký đã được ghi nhận, chúng tôi sẽ liên hệ trong vòng 24 - 48 giờ. Xin cám ơn!',
          [
            {text: 'OK', onPress: () =>  this.props.navigation.navigate(LOGIN)}
          ],
          { cancelable: false }
        );
      }).catch(err => {
        this.setState({isFetching:false});
        Alert.alert(
          'Thông báo',
          'Đăng ký thất bại, Mã lỗi: ' + err,
          [
            {text: 'OK', onPress: () =>  false}
          ],
          { cancelable: false }
        );
      });
    }
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
      <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}}
                        onPress={() => this.props.navigation.goBack()}>
        <Image source={ICON_BACK} style={{width: vw(11), height: vw(20), resizeMode: "contain", marginRight: vw(10)}}/>
        <Text style={{fontSize: vw(18), fontFamily: "Arial", fontWeight: "bold", color: "#ffffff"}}>
          Đăng ký tài khoản
        </Text>
      </TouchableOpacity>
    )
  }

  _renderBody() {
    return (
      <View style={styles.wrapBody}>

        <View style={{width: width - vw(100), alignItems: 'center'}}>
          <Text style={{fontSize: vw(22), color: 'white', fontWeight: 'bold', marginBottom: vw(20)}}>Đăng ký tài khoản</Text>
          <View style={styles.inputItem}>
            <Text style={styles.error}>{this.state.drugNameError}</Text>
            <View style={styles.wrapInput}>
              <Image source={ICON_DRUG} style={styles.inputIcon}/>
              <Input
                onChange={(text) => {
                  this.setState({
                    drugName: text
                  })
                }}
                style={styles.input}
                placeholder={'Tên Nhà Thuốc'}
                selectionColor={'#ffffff'}
              />
            </View>
          </View>

          <View style={styles.inputItem}>
            <Text style={styles.error}>{this.state.phoneError}</Text>
            <View style={styles.wrapInput}>
              <Image source={ICON_PHONE_ROUND} style={styles.inputIcon}/>
              <Input
                onChange={(text) => {
                  this.setState({
                    phone: text
                  })
                }}
                style={styles.input}
                placeholder={'Số điện thoại'}
                selectionColor={'#ffffff'}
                keyboardType={"phone-pad"}
              />
            </View>
          </View>

          <View style={styles.inputItem}>
            <Text style={styles.error}>{this.state.emailError}</Text>
            <View style={styles.wrapInput}>
              <Image source={ICON_MAIL} style={styles.inputIcon}/>
              <Input
                onChange={(text) => {
                  this.setState({
                    email: text
                  })
                }}
                style={styles.input}
                placeholder={'Email'}
                selectionColor={'#ffffff'}
                autoCapitalize='none'
                keyboardType={"email-address"}
              />
            </View>
          </View>

          <View style={styles.inputItem}>
            <Text style={styles.error}>{this.state.drugAddressError}</Text>
            <View style={styles.wrapInput}>
              <Image source={ICON_MAP_MARKER} style={styles.inputIcon}/>
              <Input
                onChange={(text) => {
                  this.setState({
                    drugAddress: text
                  })
                }}
                style={styles.input}
                placeholder={'Địa chỉ (không bắt buộc)'}
                selectionColor={'#ffffff'}
              />
            </View>
          </View>

          <View style={styles.inputItem}>
            {/* <Text style={styles.error}>{this.state.emailError}</Text> */}
            <View style={styles.wrapInput}>
              <Image source={ICON_MAIL} style={styles.inputIcon}/>
              <Input
                onChange={(text) => {
                  this.setState({
                    businessCode: text
                  })
                }}
                style={styles.input}
                placeholder={'Số đăng ký kinh doanh (không bắt buộc)'}
                selectionColor={'#ffffff'}
                autoCapitalize='none'
              />
            </View>
          </View>
          <View style={styles.inputItem}>
            {/* <Text style={styles.error}>{this.state.emailError}</Text> */}
            <View style={styles.wrapInput}>
              <Image source={ICON_MAIL} style={styles.inputIcon}/>
              <Input
                onChange={(text) => {
                  this.setState({
                    TDVCode: text
                  })
                }}
                style={styles.input}
                placeholder={'Mã TDV (không bắt buộc)'}
                selectionColor={'#ffffff'}
                autoCapitalize='none'
              />
            </View>
          </View>

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
            onPress={this._onRegister}
          >
            <Text
              style={{fontSize: vw(16), fontFamily: "Arial", color: MAIN_COLOR, fontWeight: "bold"}}
            >
              {this.state.isRequestingLogin ? "Đang đăng ký..." : "Đăng Ký"}
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  _renderFooter() {
    return (
      <View>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: vw(20)
          }}
        >
          <Text style={{
            textDecorationLine : 'underline',
            color: 'white',
            fontFamily: 'Arial',
          }}>Điều khoản sử dụng</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS == "android"?null:<MyStatusBar/>}
        
        <ImageBackground
          style={{flex: 1}}
          source={BG_SPLASH}
        >
          {this._renderHeader()}
          <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            {this._renderBody()}
          </KeyboardAvoidingView>
          {this._renderFooter()}
          <LoaderIndicator loading={this.state.isFetching}/>
        </ImageBackground>
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
    padding: vw(15),
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
  }
};


export default RegisterScreen;