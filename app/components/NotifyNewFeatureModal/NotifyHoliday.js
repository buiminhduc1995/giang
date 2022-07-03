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
import { BACKGROUND_NOTIFY_HOLIDAY } from '../../constants';


export default class NotifyHoliday extends React.PureComponent {


    show = async () => {
        await this.grape.show();
    };

    close = async () => {
        await this.grape.close();
    };


    render() {
        return (
            <GrapesAlert ref={(node) => this.grape = node} contentStyle={styles.container} onClose={this.onClose}>
                <Image resizeMethod={'scale'} style={{ resizeMode: 'stretch', width: '100%', height: 150, overflow: 'visible' }} source={BACKGROUND_NOTIFY_HOLIDAY} />
                <View style={{ margin: 10 }}>
                    <Text style={{ color: '#EB5757', fontWeight: 'bold', paddingBottom: 10 }}>Kính gửi Quý nhà thuốc!</Text>
                    <Text style={styles.text}>
                        Lời đầu tiên Medlink xin cảm ơn anh/chị đã quan tâm, lựa chọn sử dụng và đồng hành cùng Medlink trong suốt thời gian qua. Để thuận tiện trong kế hoạch làm việc giữa Medlink và Quý nhà thuốc, Medlink xin thông báo lịch nghỉ lễ 01/01/2019 của chúng tôi như sau:
                    </Text>
                    <View style={{justifyContent:'center', flexWrap:'wrap'}}>
                        <Text style={{ backgroundColor: '#D22229', borderRadius: 5, color: 'white', fontWeight: 'bold', marginTop: 10, marginBottom: 10, padding: 5, fontSize: 12, textAlign: 'center',flexWrap:'wrap' }}>Từ ngày 29/12/2018 đến hết ngày 01/01/2019</Text>
                    </View>
                    <Text style={styles.text}>Trong thời gian nghỉ lễ, các dịch vụ triển khai, hỗ trợ sẽ không đáp ứng được kịp thời như thường lệ, rất mong được sự thông cảm từ phía khách hàng. Medlink sẽ bắt đầu làm lại từ ngày 02/01/2019. Trong thời gian nghỉ lễ, nếu có bất kỳ vấn đề gì cần hỗ trợ gấp xin quý khách hàng liên hệ theo thông tin. </Text>
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