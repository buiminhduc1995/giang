import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
} from 'react-native';

import { ICON_BACKGROUND_ORDER, IMAGE_ORDER_FEATURE, ICON_TRANSPORT, ICON_GO_FAST, ICON_PERCENT_DISCOUNT, ICON_PHONE } from '../../constants';
import { dataNotifyScreenNewFeature } from '../../constants/data';
import GrapesAlert from '../../elements/GrapesAlert';


export default class NotifyOrderModal extends React.PureComponent {


    show = async () => {
        await this.grape.show();
    };

    close = async () => {
        await this.grape.close();
    };

    _onClickClose = async () => {
        await this.grape.close();
    };

    _onClickFinish = async () => {
        await this.grape.close();
    };

    render() {
        return (
            <GrapesAlert ref={(node) => this.grape = node} contentStyle={styles.container} onClose={this._onClose}>
                <ImageBackground style={{ flexDirection: 'row', backgroundColor: '#22a374' }}
                    source={ICON_BACKGROUND_ORDER}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 13, paddingBottom: 10 }}>MedLink ra mắt tính năng</Text>
                        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Đặt hàng trực tiếp</Text>
                        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>trên ứng dụng</Text>
                    </View>
                    <Image style={{ flex: 1, resizeMode: 'contain', height: 120 }} source={IMAGE_ORDER_FEATURE}></Image>
                </ImageBackground>
                <View style={{ padding: 10, flexWrap: 'wrap' }}>
                    <Text style={{ fontSize: 13, color: '#7AAE4E', paddingBottom: 10, paddingTop: 10, fontWeight: 'bold' }}>{dataNotifyScreenNewFeature.order.content1}</Text>
                    <Text style={{ fontSize: 13 }}>{dataNotifyScreenNewFeature.order.content2}</Text>
                    <Text style={{ fontSize: 13, paddingBottom: 10, paddingTop: 10 }}>{dataNotifyScreenNewFeature.order.content3}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={ICON_PERCENT_DISCOUNT} style={styles.icon} />
                        <Text style ={{flex:1, flexWrap:'wrap'}}>
                            <Text >{dataNotifyScreenNewFeature.order.content4}</Text>
                            <Text style={{ color: '#F18686', fontWeight: 'bold' }}>{dataNotifyScreenNewFeature.order.content5}</Text>
                            <Text >{dataNotifyScreenNewFeature.order.content6}</Text>
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={ICON_PHONE} style={styles.icon} />
                        <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 13 }}>{dataNotifyScreenNewFeature.order.content7}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={ICON_TRANSPORT} style={styles.icon} />
                        <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 13 }}>{dataNotifyScreenNewFeature.order.content8}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={ICON_GO_FAST} style={styles.icon} />
                        <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 13 }}>{dataNotifyScreenNewFeature.order.content9}</Text>
                    </View>
                    <Text style={{ paddingTop: 10, fontSize: 12, color: '#F18686', fontWeight: 'bold', fontStyle: 'italic' }}>{dataNotifyScreenNewFeature.order.content10}</Text>
                </View>
                <View style={{ width: '100%', height: 1, backgroundColor: 'gray', opacity: 0.5 }} />
                <View style={{ flexDirection: 'row', height: 40, backgroundColor: 'white' }}>
                    <TouchableOpacity style={styles.button}
                        onPress={this.props.onPressOrderCancel}
                    >
                        <Text style={{ color: '#7AAE4E' }}>Tìm hiểu sau</Text>
                    </TouchableOpacity>
                    <View style={{ height: '100%', width: 1, backgroundColor: 'gray', opacity: 0.5 }} />
                    <TouchableOpacity style={styles.button}
                        onPress={this.props.onPressOrder}
                    >
                        <Text style={{ color: '#7AAE4E', fontWeight: 'bold' }}>Đặt hàng ngay</Text>
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
        borderColor: 'white'
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
    text:{
        textAlign:"center",
        textAlignVertical:"center"
    }
})