import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic'
import { BLACK } from '../../constants';
export default StyleSheet.create({
    conatinerButton: {
        alignItems: 'center',
        justifyContent: 'space-around',
        width: "30%",
        borderRadius: vw(5),
        height: vw(100),
        paddingHorizontal: vw(5),
    },
    image: {
        width: vw(50),
        height: vw(50),
        resizeMode: 'contain'
    },
    txt: {
        fontSize: vw(12),
        fontWeight: 'bold',
        color: BLACK
    }
})