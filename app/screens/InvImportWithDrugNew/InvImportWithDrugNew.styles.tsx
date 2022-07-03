import { StyleSheet, Platform } from 'react-native';
import vw from '../../utils/size-dynamic';
import { MAIN_COLOR, BLACK, themes } from '../../constants/';
import { title } from '../../constants/themes';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonBack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBack: {
    width: vw(11),
    height: vw(20),
    resizeMode: 'contain',
    marginRight: vw(10),
  },
  txtHeaderLeft: {
    fontSize: vw(18),
    fontFamily: themes.fontFamily.fontFamily,
    fontWeight: 'bold',
    color: themes.colors.WHITE,
  },
  wapperTitle: {
    backgroundColor: themes.colors.BACKGROUND_COLOR,
    width: '100%',
    height: vw(40),
    padding: vw(5),
    justifyContent: 'center',
  },
  txtTitle: {
    ...title,
  },
  containerPadding: {
    width: '100%',
    padding: vw(5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stylesModal: {
    width: vw(150),
    height: 'auto',
    maxHeight: vw(120),
    borderRadius: vw(3),
    overflow: 'hidden',
    marginTop: -vw(100),
    marginRight: -vw(10),
    // Shadow
    ...Platform.select({
      ios: {
        shadowColor: themes.colors.BLACK_BASIC,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.14,
        shadowRadius: 2,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  dropdownTextStyle: {
    fontSize: vw(14),
    fontFamily: themes.fontFamily.fontFamily,
    paddingHorizontal: vw(15),
  },
  wapperInputFilter: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    flex: 1,
    borderBottomColor: themes.colors.MAIN_COLOR,
    borderBottomWidth: 1,
    justifyContent: 'space-around',
  },
  txtSelected: {
    marginRight: vw(5),
    fontSize:vw(14)
  },
  containerLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: vw(5),
  },
  rowLeft: {
    flex: 3,
  },
  rowRight: {
    flex: 7,
  },
  txtInput: {
    borderBottomColor: themes.colors.MAIN_COLOR,
    borderBottomWidth: vw(1),
    height: vw(40),
    width: '100%',
    paddingLeft: vw(5),
    fontSize:vw(14)
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
  buttonExport: {
    height: vw(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: vw(10),
    backgroundColor: themes.colors.MAIN_COLOR,
    width: '90%',
  },
  txtButton: {
    color: themes.colors.WHITE,
    fontWeight: 'bold',
    fontSize: vw(14),
  },
  imageDropDown: {
    width: vw(7),
    height: vw(7),
    tintColor: themes.colors.BLACK_BASIC,
    position: 'absolute',
    right: vw(5),
  },
  txtRed: {
    position: 'absolute',
    right: vw(10),
    marginTop: vw(0),
    color: themes.colors.RED,
    fontSize: vw(14),
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontSize14:{
    fontSize:vw(14)
  }
});
