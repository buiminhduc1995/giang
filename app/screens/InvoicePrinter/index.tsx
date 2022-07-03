import React from 'react';
import vw from '../../utils/size-dynamic';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import HeaderBar from '../../elements/HeaderBar';
import { MyStatusBar } from '../../elements/MyStatusBar';
import { ICON_BACK, ICON_LOGO_SPLASH } from '../../constants';
import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import RNPrint from 'react-native-print';
import styles from './InvoicePrinter.style';

import { Navigation } from '../../dataType';

interface Props {
  navigation: Navigation;
}
interface States {}

class InvoicePrinter extends React.Component<Props, States> {
  _printInvoice = async () => {
    const filePath = this.props.navigation.getParam('filePath');
    await RNPrint.print({ filePath: filePath });
  };
  _renderHeader() {
    return <HeaderBar left={this._renderHeaderLeft()} />;
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };

  _renderHeaderLeft() {
    return (
      <TouchableOpacity style={styles.wrapperHeaderLeft} onPress={this._goBack}>
        <Image source={ICON_BACK} style={styles.iconHeaderLeft} />
        <Text style={styles.textHeaderLeft}>Quay lại</Text>
      </TouchableOpacity>
    );
  }

  _renderContent = () => {
    const uri = this.props.navigation.getParam('uri');
    return (
      <View style={styles.containerContent}>
        <TouchableOpacity style={styles.button} onPress={this._printInvoice}>
          <Text style={styles.textButton}>In hóa đơn</Text>
        </TouchableOpacity>
        <View>
          <QRCode
            value={uri}
            size={vw(200)}
            logo={ICON_LOGO_SPLASH}
            logoSize={vw(50)}
            logoBackgroundColor="transparent"
          />
          <Text style={styles.text}>Quét QRcode để tải đơn thuốc!</Text>
        </View>
      </View>
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

function mapStateToProps(state: any) {
  return {
    info: state.user.dataUser.info,
    token: state.user.dataUser.token,
  };
}

export default connect(mapStateToProps)(InvoicePrinter);
