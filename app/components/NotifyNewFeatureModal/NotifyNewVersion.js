import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    Platform,
    Linking
} from 'react-native';

import GrapesAlert from '../../elements/GrapesAlert';
import { ICON_BACKGROUND_ORDER } from '../../constants';


export default class NotifyNewVersion extends React.PureComponent {


    show = async () => {
        await this.grape.show();
    };

    close = async () => {
        await this.grape.close();
    };

    _linkToStore = () => {
        this.props.closeNotify()
        if (Platform.OS === 'android') {
            Linking.openURL("market://details?id=com.ecomedic.medlink");
        } else {
            Linking.openURL('itms://itunes.apple.com/us/app/apple-store/1414235575?mt=8')
        }
    }


    render() {
        const store = Platform.OS === 'android' ? "Google Play" : "Apple Store";
        return (
            <GrapesAlert ref={(node) => this.grape = node} contentStyle={styles.container} onClose={this._onClose} style={{paddingHorizontal:40}}>
                <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#EB5757', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Phiên bản mới của ứng dụng Medlink</Text>
                </View>
                <View style={{ width: '100%', height: 1, backgroundColor: 'gray', opacity: 0.5 }} />
                <View style={{height:80}}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black', paddingLeft: 10, paddingBottom: 5 }}>Đã có phiên bản mới trên {store}.</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black', paddingLeft: 10 }}>Vui lòng cập nhật ứng dụng!</Text>
                </View>
                <View style={{ width: '100%', height: 1, backgroundColor: 'gray', opacity: 0.5 }} />
                <View style={{ flexDirection: 'row', height: 40, backgroundColor: 'white' }}>
                    <TouchableOpacity style={styles.button}
                        onPress={this._linkToStore}
                    >
                        <Text style={{ color: '#EB5757', fontWeight: 'bold' }}>Mở {store}</Text>
                    </TouchableOpacity>
                </View>
            </GrapesAlert>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        overflow: 'hidden',
        borderWidth: 0.5,
        borderColor: 'white',
    },
    icon: {
        height: 16,
        marginRight: 10,
        resizeMode: 'contain'
    },
    button: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    text: {
        fontSize: 12,
        textAlignVertical: "center",
        color: 'black'
    },

})