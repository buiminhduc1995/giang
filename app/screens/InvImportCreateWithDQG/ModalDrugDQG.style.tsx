import { StyleSheet } from 'react-native';
import { colors, fontFamily } from '../../constants/themes';
import vw from '../../utils/size-dynamic';
import { SHADOW, themes } from '../../constants';

const styles = StyleSheet.create({
  backgroundModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ModalInsideView: {
    backgroundColor: colors.WHITE,
    height: '80%',
    width: '95%',
    borderRadius: vw(5),
    padding: vw(10),
  },
  button: {
    height: vw(30),
    backgroundColor: colors.MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    borderRightColor: colors.WHITE,
    borderRightWidth: 1,
    marginTop: vw(5),
  },
  txtButton: {
    color: colors.WHITE,
    fontWeight: 'bold',
    fontSize: vw(18),
  },
  wapperFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stylesModal: {
    width: vw(150),
    height: 'auto',
    maxHeight: vw(120),
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: -vw(100),
    marginRight: -vw(10),
    ...SHADOW,
  },
  dropdownTextStyle: {
    fontSize: vw(14),
    fontFamily: fontFamily.fontFamily,
    paddingHorizontal: vw(15),
  },
  wapperInputFilter: {
    alignItems: 'center',
    flexDirection: 'row',
    height: vw(40),
    flex: 1,
    borderBottomColor: colors.MAIN_COLOR,
    borderBottomWidth: vw(1),
    justifyContent: 'space-around',
    width: '100%',
  },
  txtSelected: {
    marginRight: vw(5),
    fontSize: vw(14),
  },
  containerBody: {
    paddingTop: vw(5),
    flex: 1,
  },
  nameDrug: {
    fontSize: vw(16),
    color: themes.colors.COLOR_INPUT,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  txtInput: {
    borderBottomColor: colors.MAIN_COLOR,
    borderBottomWidth: vw(1),
    height: vw(40),
    width: '100%',
    paddingLeft: 5,
    fontSize: vw(14),
  },
  containerLayout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLeft: {
    flex: 3,
  },
  rowRight: {
    flex: 7,
  },
  iconQrCode: {
    width: vw(20),
    height: vw(20),
  },
  buttonQRCOde: {
    position: 'absolute',
    right: 0,
    marginTop: vw(10),
    marginRight: vw(10),
  },
  buttonCheck: {
    width: vw(15),
    height: vw(15),
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vw(3),
    marginRight: vw(8),
    borderColor: colors.MAIN_COLOR,
    borderWidth: 1,
  },
  iconCheck: {
    width: vw(10),
    height: vw(10),
    resizeMode: 'contain',
  },
  wapperTitle: {
    height: vw(40),
    width: '100%',
  },
  txtListProduct: {
    fontWeight: 'bold',
    fontSize:vw(14)
  },
  text: {
    fontSize: vw(12),
    color: colors.BLACK,
  },
  iconArrow: {
    width: vw(7),
    height: vw(7),
    tintColor: colors.BLACK,
    position: 'absolute',
    right: vw(5),
  },
  txtRed: {
    position: 'absolute',
    right: vw(10),
    marginTop: vw(0),
    color: colors.RED,
    fontSize: vw(14),
  },
});

export default styles;
