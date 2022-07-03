import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
} from 'react-native';

import GrapesAlert from '../../elements/GrapesAlert';
import { BACKGOUND_POLICY } from '../../constants';


export default class NotifyNewPolicy extends React.PureComponent {


    show = async () => {
        await this.grape.show();
    };

    close = async () => {
        await this.grape.close();
    };


    render() {
        return (
            <GrapesAlert ref={(node) => this.grape = node} contentStyle={styles.container} onClose={this._onClose}>
                <Image resizeMethod={'scale'} style={{resizeMode:'stretch',width:'100%',height:150, overflow:'visible'}} source={BACKGOUND_POLICY} />
                <View style= {{margin:10}}>
                    <Text style={{color:'#EB5757', fontWeight:'bold', paddingBottom:10}}>Xin chào Quý nhà thuốc!</Text>
                    <Text style={{paddingBottom:10}}>Medlink xin thông báo, hiện nay chúng tôi đã cập nhật điều khoản sử dụng dành cho Nhà thuốc sử dụng ứng dụng.</Text>
                    <Text style={{paddingBottom:10}}>Quý nhà thuốc vui lòng tham khảo để đảm bảo nghĩa vụ cũng như quyền lợi khi sử dụng ứng dụng Medlink. </Text>
                    <Text style={{paddingBottom:10, fontStyle:'italic'}}>Xin chân thành cám ơn Quý nhà thuốc!</Text>
                </View>
                <View style={{ width: '100%', height: 1, backgroundColor: 'gray', opacity: 0.5 }} />
                <View style={{ flexDirection: 'row', height: 40, backgroundColor: 'white' }}>
                    <TouchableOpacity style={styles.button}
                        onPress={this.props.onViewAfter}
                    >
                        <Text style={{ color: '#EB5757' }}>Tìm hiểu sau</Text>
                    </TouchableOpacity>
                    <View style={{ height: '100%', width: 1, backgroundColor: 'gray', opacity: 0.5 }} />
                    <TouchableOpacity style={styles.button}
                        onPress={this.props.onViewNow}
                    >
                        <Text style={{ color: '#EB5757', fontWeight: 'bold' }}>Xem điều khoản</Text>
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
    text: {
        textAlign: "center",
        textAlignVertical: "center"
    }
})