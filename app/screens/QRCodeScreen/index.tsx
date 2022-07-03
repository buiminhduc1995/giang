import React from 'react';
import { Text, View, TouchableOpacity, Image, Alert, ToastAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import HeaderBar from '../../elements/HeaderBar';
import { MyStatusBar } from '../../elements/MyStatusBar';
import { ICON_BACK, MAIN_COLOR, ICON_BORDER_QRGREEN, ICON_CART, ICON_BACKGROUND_QR } from '../../constants';
import API from '../../api';
import { connect } from 'react-redux';
import ItemProductPortfolio from '../../components/ItemProductPortfolio';
import Sound from 'react-native-sound';
import { Navigation, User } from '../../dataType';

import styles from './QRcodeScreen.style';
import { ADD_NEW_ORDER, INV_IMPORT_ADD_NEW_DRUG } from '../../redux/types';
import { INV_IMPORT_CREATE_TAB_STEP_1, INV_EXPORT_CREATE } from '../../navigation/screen_name';

type Props = {
  navigation: Navigation;
  info: User;
};
type States = {
  numberProduct: number;
  canDetectBarcode: boolean;
  barcodes: any[];
  drugDetect: any;
  drugDetectArr: any[];
  source: string;
  showImage: boolean;
  id: string;
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
  codeQR: string;
};

let song: any = null;

class QRcodeScreen extends React.Component<Props, States> {
  state: States = {
    //flash: 'off',
    numberProduct: 0,
    canDetectBarcode: true,
    barcodes: [],
    drugDetect: null,
    drugDetectArr: [],
    source: '',
    showImage: true,
    id: '',
    top: false,
    bottom: false,
    left: false,
    right: false,
    codeQR: '',
  };
  camera: any;

  // Bat/Tat flash
  // const flashModeOrder = {
  //   off: 'on',
  //   // on: 'auto',
  //   // auto: 'torch',d
  //   torch: 'off',
  // };
  // toggleFlash() {
  //   this.setState({
  //     flash: flashModeOrder[this.state.flash],
  //   });
  // }

  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} right={this._renderHeaderRight()} />;
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };

  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={styles.wrapperHeaderLeft} onPress={this._goBack}>
        <Image source={ICON_BACK} style={styles.iconHeaderLeft} />
        <Text style={styles.titleHeaderLeft}>Quay lại</Text>
      </TouchableOpacity>
    );
  }

  _onPressHeaderRight = () => {
    const toScreen = this.props.navigation.getParam('toScreen');
    this.props.navigation.navigate(toScreen, { drugs: this.state.drugDetectArr });
  };

  _renderHeaderRight() {
    return (
      <TouchableOpacity style={styles.wrapperHeaderLeft} onPress={this._onPressHeaderRight}>
        <Image source={ICON_CART} style={styles.iconCart} />
        <View style={styles.containerNumberProduct}>
          <Text style={styles.numberProduct}>{this.state.numberProduct}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  onPlaySound() {
    song = new Sound('abc.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) console.log('failed to load the sound', error);
      else {
        song.play((success: any) => {
          if (!success) ToastAndroid.show('Error when play SoundPlayer :(((', ToastAndroid.SHORT);
        });
      }
    });
  }

  // takePicture = async () => {
  //   if (this.camera) {
  //     const options = { quality: 0.5, base64: true };
  //     const data = await this.camera.takePictureAsync(options);
  //     console.log(data.uri);
  //     this.setState({ source: data.uri });
  //   }
  // };
  // animationImage = async () => {
  //   var id = await setInterval(() => this.setState({ showImage: !this.state.showImage }), 300);
  //   this.setState({ id });
  // };

  // onBarCodeRead = async (data: any) => {
  //   console.log('====================================')
  //   console.log(data)
  //   console.log('====================================')
  //   if (data.bounds.origin.length === 4) {
  //     const topArea = data.bounds.origin[1] && data.bounds.origin[1].y > 0.4 * data.bounds.height ? true : false;
  //     const bottomArea = data.bounds.origin[3] && data.bounds.origin[3].y < 0.6 * data.bounds.height ? true : false;
  //     const leftArea = data.bounds.origin[1] && data.bounds.origin[1].x > 0.4 * data.bounds.width ? true : false;
  //     const rightArea = data.bounds.origin[3] && data.bounds.origin[3].x < 0.6 * data.bounds.width ? true : false;
  //     await this.setState({ top: topArea, right: rightArea, bottom: bottomArea, left: leftArea, codeQR: data.data })
  //   }
  //   else if (data.bounds.origin.length === 2) {
  //     const topArea = data.bounds.origin[1] && data.bounds.origin[1].y > 0.3 * data.bounds.height ? true : false;
  //     const bottomArea = data.bounds.origin[1] && data.bounds.origin[1].y < 0.7 * data.bounds.height ? true : false;
  //     const leftArea = data.bounds.origin[0] && data.bounds.origin[0].x > 0.2 * data.bounds.width ? true : false;
  //     const rightArea = data.bounds.origin[1] && data.bounds.origin[1].x < 0.8 * data.bounds.width ? true : false;
  //     await this.setState({ top: topArea, right: rightArea, bottom: bottomArea, left: leftArea, codeQR: data.data })
  //   }
  //   this.callAPISearchQRCode()
  // };

  callAPISearchQRCode = async (data: any) => {
    try {
      const { info } = this.props;
      const { canDetectBarcode } = this.state;
      const codeQR = data.data;
      if (canDetectBarcode) {
        // this.takePicture();
        // this.animationImage();
        this.onPlaySound();
        await this.setState({ canDetectBarcode: false });
        const data = {
          drg_store_id: info.drg_store_id,
          drg_barcode: codeQR,
        };
        const response = await API.productApi.searchProductInventoryByBarcode(data);
        this.setState({ barcodes: codeQR });
        if (response.data == null) {
          Alert.alert('Thông báo', 'Không tìm thấy sản phẩm trong kho', [
            { text: 'Ok', onPress: () => this.setState({ canDetectBarcode: true }) },
          ]);
        } else {
          const drug = response.data;
          drug.quantity = '1';
          drug.index_unit = '0';
          this.setState({ drugDetect: drug });
        }
      }
    } catch (error) {
      this.setState({ barcodes: [] });
      Alert.alert('Error', 'Có lỗi xảy ra', [{ text: 'Ok', onPress: () => {} }]);
    }
  };

  callShowAlert = async (data: any) => {
    const toScreen = this.props.navigation.getParam('toScreen');
    try {
      const { canDetectBarcode } = this.state;
      const codeQR = data.data;
      if (canDetectBarcode) {
        this.onPlaySound();
        await this.setState({ canDetectBarcode: false, codeQR });
        Alert.alert(
          'Thông báo',
          'Bạn có muốn dùng' + ' ' + codeQR + ' ' + 'làm mã thuốc',
          [
            {
              text: 'Hủy',
            },
            {
              text: 'Đồng ý',
              onPress: () => {
                this.props.navigation.navigate(toScreen, {
                  codeQR: this.state.codeQR,
                  info: this.props.navigation.getParam('info'),
                });
              },
            },
          ],
          { cancelable: false },
        );
      }
    } catch (error) {
      this.setState({ barcodes: [] });
      Alert.alert('Error', 'Có lỗi xảy ra', [{ text: 'Bỏ qua', onPress: this._goBack }]);
    }
  };

  _onBarCodeRead = (data: any) => {
    const toScreen = this.props.navigation.getParam('toScreen');
    if (toScreen === ADD_NEW_ORDER || toScreen === INV_EXPORT_CREATE) {
      this.callAPISearchQRCode(data);
    }
    if (toScreen === INV_IMPORT_ADD_NEW_DRUG) {
      this.callShowAlert(data);
    }
    if (toScreen === INV_IMPORT_CREATE_TAB_STEP_1) {
      this.callShowAlert(data);
    }
  };

  renderCamera() {
    const { canDetectBarcode, source, showImage } = this.state;
    return (
      <View style={styles.camera}>
        <Image
          source={ICON_BACKGROUND_QR}
          style={{ width: '100%', height: '100%', zIndex: 1, opacity: 0.8 }}
          resizeMode="stretch"
        />
        {source.toString().length > 0 ? (
          <Image source={{ uri: source }} style={styles.imageTaken} />
        ) : (
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.wrapperCamera}
            type={'back'}
            //flashMode={this.state.flash}
            onBarCodeRead={this._onBarCodeRead}
            autoFocus={'on'}
            ratio={'1:1'}
            trackingEnabled
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.ALL}
          >
            {showImage ? (
              <View style={{ flex: 1 }}>
                <Image
                  source={ICON_BORDER_QRGREEN}
                  style={[
                    styles.borderIcon,
                    { top: '20%', left: '20%', tintColor: canDetectBarcode ? MAIN_COLOR : 'yellow' },
                  ]}
                />
                <Image
                  source={ICON_BORDER_QRGREEN}
                  style={[
                    styles.borderIcon,
                    {
                      top: '20%',
                      right: '20%',
                      transform: [{ rotate: '90deg' }],
                      tintColor: canDetectBarcode ? MAIN_COLOR : 'yellow',
                    },
                  ]}
                />
                <Image
                  source={ICON_BORDER_QRGREEN}
                  style={[
                    styles.borderIcon,
                    {
                      bottom: '20%',
                      left: '20%',
                      transform: [{ rotate: '270deg' }],
                      tintColor: canDetectBarcode ? MAIN_COLOR : 'yellow',
                    },
                  ]}
                />
                <Image
                  source={ICON_BORDER_QRGREEN}
                  style={[
                    styles.borderIcon,
                    {
                      bottom: '20%',
                      right: '20%',
                      transform: [{ rotate: '180deg' }],
                      tintColor: canDetectBarcode ? MAIN_COLOR : 'yellow',
                    },
                  ]}
                />
              </View>
            ) : null}
          </RNCamera>
        )}
      </View>
    );
  }

  _addProduct = async (item: any) => {
    await this.setState({ source: '', showImage: true });
    const array = [...this.state.drugDetectArr, item];
    const drugArr = array
      .map(e => e['drug_id'])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((e: any) => array[e])
      .map((e: any) => array[e]);
    this.setState({
      drugDetectArr: drugArr,
      numberProduct: drugArr.length,
      barcodes: [],
      drugDetect: null,
      canDetectBarcode: true,
      top: false,
      right: false,
      bottom: false,
      left: false,
    });
  };

  _deleteProduct = async () => {
    await this.setState({ source: '', showImage: true });
    this.setState({
      drugDetect: null,
      canDetectBarcode: true,
      barcodes: [],
      top: false,
      right: false,
      bottom: false,
      left: false,
    });
  };

  renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        {this.state.drugDetect && (
          <ItemProductPortfolio
            type="ItemBarcodeDetect"
            item={item}
            addProduct={() => this._addProduct(item)}
            deleteProduct={this._deleteProduct}
          />
        )}
        {!this.state.drugDetect && this.state.barcodes.length !== 0 && (
          <Text style={styles.textNull}>Sản phẩm bạn yêu cầu không tồn tại{'\n'}Vui lòng thử lại</Text>
        )}
      </View>
    );
  };

  toggle = (value: string) => () => {
    this.setState({
      source: '',
      showImage: true,
      top: false,
      right: false,
      bottom: false,
      left: false,
      barcodes: [],
    });
    this.setState((prevState: States) => ({ [value]: !prevState[value] }));
  };

  renderOptionCamera = () => {
    const { canDetectBarcode } = this.state;
    return (
      <View style={styles.wrapperButton}>
        <TouchableOpacity onPress={this.toggle('canDetectBarcode')} style={styles.flipButton}>
          <Text style={styles.flipText}>{canDetectBarcode ? 'Đang quét...' : 'Quét mã vạch'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderHeader()}
        {this.renderCamera()}
        {this.renderItem(this.state.drugDetect)}
        {this.renderOptionCamera()}
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    token: state.user.dataUser.token,
  };
}

export default connect(mapStateToProps)(QRcodeScreen);
