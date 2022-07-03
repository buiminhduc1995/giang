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
import { BANNER_TETHOLIDAY } from '../../constants';


export default class NotifyTetHoliday extends React.PureComponent {


    show = async () => {
        await this.grape.show();
    };

    close = async () => {
        await this.grape.close();
    };


    render() {
        return (
            <GrapesAlert ref={(node) => this.grape = node} contentStyle={styles.container} onClose={this._onClose}>
                <Image resizeMethod={'scale'} style={{ resizeMode: 'stretch', width: '100%', height: 150, overflow: 'visible' }} source={BANNER_TETHOLIDAY} />
                <View style={{ margin: 10 }}>
                    <Text style={{ color: '#EB5757', fontWeight: 'bold', paddingBottom: 10 }}>Kính gửi Quý nhà thuốc!</Text>
                    <Text style={styles.text}>
                        Kính gửi Quý nhà thuốc! Lời đầu tiên Medlink xin chân thành cảm ơn Quý nhà thuốc đã quan tâm và hợp tác trong năm vừa qua. Medlink xin thông báo lịch nghỉ lễ Tết Nguyên Đán Kỷ Hợi 2019 như sau:
                    </Text>
                    <View style={{justifyContent:'center', flexWrap:'wrap',backgroundColor: '#D22229', borderRadius:5, padding:5, margin:5}}>
                        <Text style={{color: 'white', fontWeight: 'bold', paddingBottom: 5, fontSize: 12, textAlign: 'center',flexWrap:'wrap' }}>Thời gian nghỉ: 02/02/2019 đến 10/02/2019</Text>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 12, textAlign: 'center',flexWrap:'wrap' }}>Thời gian làm việc trở lại chính thức: 11/02/2019</Text>
                    </View>
                    <Text style={styles.text}>
                        Trong thời gian nghỉ lễ, bộ phận hỗ trợ sẽ không đáp ứng được kịp thời như thường lệ, rất mong được sự thông cảm từ phía quý nhà thuốc. Nếu có bất kỳ vấn đề gì cần hỗ trợ gấp xin quý nhà thuốc vui lòng liên hệ theo thông tin:
                    </Text>
                    <Text style={{ padding: 10, textAlign: 'center', color: '#EB5757', fontWeight: 'bold' }}>Hotline: 092 608 0333</Text>
                    <Text style={{ color: 'black', fontStyle: 'italic' }}>Kính chúc quý nhà thuốc có kỳ nghỉ lễ vui vẻ và an toàn!</Text>
                </View>
                <View style={{ width: '100%', height: 1, backgroundColor: 'gray', opacity: 0.5 }} />
                <View style={{ flexDirection: 'row', height: 40, backgroundColor: 'white' }}>
                    <TouchableOpacity style={styles.button}
                        onPress={this.props.closeHoliday}
                    >
                        <Text style={{ color: '#EB5757' }}>Đóng</Text>
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
        fontSize: 12,
        textAlignVertical: "center",
        color: 'black'
    },

})