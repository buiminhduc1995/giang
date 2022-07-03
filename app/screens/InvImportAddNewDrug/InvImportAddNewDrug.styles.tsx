import { StyleSheet, Platform } from 'react-native';
import vw from '../../utils/size-dynamic';
import { MAIN_COLOR, themes } from '../../constants/';
export default StyleSheet.create({
  backgroundModal: {
    flex: 1,
  },
  ModalInsideView: {
    backgroundColor: themes.colors.WHITE,
    flex: 1,
    borderRadius: vw(5),
    padding: vw(10),
  },
  button: {
    height: vw(40),
    backgroundColor: themes.colors.MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRightColor: themes.colors.WHITE,
    borderRightWidth: 1,
    marginTop: vw(20),
  },
  nameDrug: {
    fontSize: vw(16),
    color: themes.colors.COLOR_INPUT,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  txtButton: {
    color: themes.colors.WHITE,
    fontWeight: 'bold',
    fontSize: vw(18),
  },
  containerLayout: {
    alignItems: 'center',
  },
  txtSelected: {
    marginRight: vw(5),
    fontSize: vw(14),
  },
  wapperFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wapperTitle: {
    height: vw(40),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:vw(10)
  },
  buttonCheck: {
    width: vw(15),
    height: vw(15),
    backgroundColor: themes.colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vw(3),
    marginRight: vw(8),
    borderColor: themes.colors.MAIN_COLOR,
    borderWidth: 1,
  },
  iconCheck: {
    width: vw(10),
    height: vw(10),
    resizeMode: 'contain',
  },
  txtListProduct: {
    fontWeight: 'bold',
    fontSize: vw(14),
  },
  txtTitleInfor: {
    fontSize: vw(12),
  },
  textInputInfomation: {
    flex: 1,
    width: '100%',
    height: vw(40),
    borderBottomColor: themes.colors.MAIN_COLOR,
    borderBottomWidth: vw(1),
    marginLeft: vw(10),
    fontSize: vw(12),
  },
  buttonQRCOde: {
    position: 'absolute',
    right: 0,
    marginTop: vw(10),
    marginRight: vw(10),
  },
  iconQrCode: {
    width: vw(20),
    height: vw(20),
  },
  stylesModal: {
    width: vw(150),
    height: 'auto',
    maxHeight: vw(120),
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: -vw(100),
    marginRight: -vw(10),
    // Shadow
    ...Platform.select({
      ios: {
        shadowColor: 'black',
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
    justifyContent: 'space-around',
  },
  iconDrop: {
    width: vw(7),
    height: vw(7),
    tintColor: themes.colors.BLACK_BASIC,
    position: 'absolute',
    right: vw(5),
  },
  modal: {
    width: '100%',
    borderBottomColor: themes.colors.MAIN_COLOR,
    borderBottomWidth: vw(1),
    height: vw(40),
    justifyContent: 'center',
  },
  containerInfomation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
  },
  txtDranger: {
    position: 'absolute',
    right: vw(-5),
    marginTop: 0,
    color: themes.colors.RED,
    fontSize:vw(14)
  },
  buttonAddQuanlity: {
    height: vw(30),
    padding: vw(5),
    backgroundColor: themes.colors.YELLOW,
    borderRadius: vw(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtAddQuanlity: {
    fontSize: vw(12),
    fontWeight: 'bold',
    color: themes.colors.WHITE,
  },
  deletedQuanlity: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themes.colors.MAIN_COLOR,
    width: vw(50),
    height: vw(30),
    borderRadius: vw(5),
    marginTop: vw(10),
  },
  containerFlatlist: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: vw(1),
    borderBottomColor: themes.colors.MAIN_COLOR,
  },
  viewQuanlity: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  right: {
    flex: 1,
    justifyContent: 'center',
  },
  left: {},
  icon: {
    tintColor: themes.colors.MAIN_COLOR,
    width: vw(20),
    height: vw(20),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: vw(5),
  },
  wapper: {
    flex: 1,
    width: '100%',
    height: vw(20),
  },
  leftRow: {
    width: vw(120),
  },
  wapperQuanlityDrug: {
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomColor: themes.colors.MAIN_COLOR,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  wapperAdditional: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
  },
  iconBack: {
    width: vw(11),
    height: vw(20),
    resizeMode: 'contain',
    marginRight: vw(10),
  },
  txtBack: {
    fontSize: vw(18),
    fontFamily: themes.fontFamily.fontFamily,
    fontWeight: 'bold',
    color: themes.colors.WHITE,
  },
  wapperDropDown: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginLeft: vw(10),
  },
});
