import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic/';
import { themes } from '../../constants';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  wapper: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: themes.colors.BACKGROUND_BOX_INPUT,
  },
  wapperHederLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wapperHederRight: {
    width: vw(120),
    height: vw(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.YELLOW,
    borderRadius: vw(5),
    marginRight: vw(10),
  },
  txtHeaderRight: {
    fontSize: vw(12),
    fontFamily: themes.fontFamily.fontFamily,
    fontWeight: 'bold',
    color: themes.colors.WHITE,
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapperList: {
    backgroundColor: themes.colors.BACKGROUND_COLOR,
  },
  buttonFooter: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.MAIN_COLOR,
    height: 33,
    borderRadius: 5,
    marginTop: 40,
    marginBottom: 10,
  },
  wapperLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  wrapperInfo: {
    padding: 10,
    backgroundColor: themes.colors.WHITE,
  },
  txtListProduct: {
    fontSize: vw(16),
    color: themes.colors.BLACK,
    fontWeight: 'bold',
  },
  txtTotalAmount: {
    fontSize: vw(16),
    color: themes.colors.RED,
  },
  txtCOD: {
    color: themes.colors.BLACK_BASIC,
    fontSize: vw(12),
  },
  containerPayment: {
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
  wrapperImage: {
    backgroundColor: themes.colors.WHITE,
    height: vw(55),
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
  iconBack: {
    width: vw(11),
    height: vw(20),
    resizeMode: 'contain',
    marginRight: vw(10),
  },
  txtDetail: {
    fontSize: vw(18),
    fontFamily: themes.fontFamily.fontFamily,
    fontWeight: 'bold',
    color: themes.colors.WHITE,
  },
  wapperTxtInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 7,
  },
  viewImage: {
    backgroundColor: themes.colors.WHITE,
    height: vw(70),
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: vw(10),
  },
  containerLoading: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .2)',
  },
  ModalInsideView: {
    backgroundColor: themes.colors.WHITE,
    height: 270,
    width: '90%',
    borderRadius: 10,
    padding: 10,
  },
  backgroundModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  wapperButtonCancel: {
    position: 'absolute',
    right: 0,
    marginTop: 10,
    marginRight: 10,
  },
  iconClose: {
    width: vw(10),
    height: vw(10),
    tintColor: themes.colors.RED,
  },
  wapperQRcode: {
    justifyContent: 'center',
    alignItems: 'center',
    height: vw(270),
  },
  imageShow: {
    width: vw(50),
    height: vw(50),
  },
  imageItem: {
    height: vw(80),
    width: vw(80),
  },
  containerItem: {},
  ItemContentWapper: {
    paddingLeft: 10,
    height: 80,
    justifyContent: 'space-between',
  },
  txtPrice: {
    color: themes.colors.RED_BROWN,
    fontSize: 14,
    fontWeight: 'bold',
  },
  txtName: {
    fontSize: 14,
    color: themes.colors.BLACK,
    fontWeight: 'bold',
  },
  ItemContentLayout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wapperQuanlity: {
    flexDirection: 'row',
    alignItems: 'center',
    height: vw(20),
    borderColor: themes.colors.BORDER_COLOR,
    backgroundColor: themes.colors.BACKGROUND_BOX_INPUT,
    borderWidth: 0.5,
    borderRadius: 3,
  },
  inputUpdateQuanlity: {
    color: themes.colors.COLOR_INPUT_PRICE,
    padding: 0,
    textAlign: 'center',
    fontSize: vw(12),
    height: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  iconCaretDown: {
    width: vw(6),
    height: vw(6),
    resizeMode: 'contain',
    marginRight: vw(5),
  },
  txtQuality: {
    paddingLeft: 5,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  containerButtonVNPay: {
    backgroundColor: themes.colors.MAIN_COLOR,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vw(5),
  },
  txtButtonVnPay: {
    color: themes.colors.WHITE,
    fontSize: vw(12),
    fontWeight: 'bold',
  },
  txt12: {
    fontSize: vw(12),
  },
});
