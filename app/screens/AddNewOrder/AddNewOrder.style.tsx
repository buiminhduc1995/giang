import { StyleSheet, Platform } from 'react-native';
import { themes } from '../../constants/';
import vw from '../../utils/size-dynamic';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  wapper: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: themes.colors.BACKGROUND_BOX_INPUT,
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonFooter: {
    marginHorizontal: vw(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.MAIN_COLOR,
    height: vw(33),
    borderRadius: vw(5),
    width: '90%',
  },
  textInput: {
    flex: 1,
    borderBottomColor: themes.colors.MAIN_COLOR,
    borderBottomWidth: vw(1),
    height: vw(40),
    paddingLeft: vw(5),
    paddingVertical: vw(5),
  },
  waperLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vw(10),
  },
  txtButtonAdd: {
    fontSize: vw(15),
    fontWeight: 'bold',
    color: themes.colors.WHITE,
  },
  txtQR: {
    fontSize: vw(10),
    color: themes.colors.MAIN_COLOR,
  },
  butonQR: {
    alignItems: 'center',
    paddingRight: vw(5),
  },
  wapperQRCode: {
    alignItems: 'center',
    backgroundColor: themes.colors.BACKGROUND_BOX_INPUT,
    flex: 1,
    height: vw(40),
    borderRadius: vw(5),
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
  buttonCheck: {
    width: vw(15),
    height: vw(15),
    backgroundColor: themes.colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vw(3),
    marginRight: vw(8),
    borderColor: themes.colors.MAIN_COLOR,
    borderWidth: vw(1),
  },
  wapperDranger: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: vw(70),
    backgroundColor: themes.colors.WHITE,
    fontSize: vw(14),
  },
  wapperInputFilter: {
    flexDirection: 'row',
    height: vw(40),
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: vw(10),
    borderBottomColor: themes.colors.MAIN_COLOR,
    borderBottomWidth: vw(1),
  },
  txtButton: {
    color: themes.colors.WHITE,
    fontWeight: 'bold',
    fontSize: vw(18),
  },
  wapperTitle: {
    padding: vw(10),
    height: vw(40),
    backgroundColor: themes.colors.BACKGROUND_COLOR,
  },
  iconCheck: {
    width: vw(10),
    height: vw(10),
    resizeMode: 'contain',
  },
  backgroundPayment: {
    backgroundColor: themes.colors.WHITE,
    padding: vw(10),
  },
  wapperButtonCheck: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconFilter: {
    width: vw(20),
    height: vw(20),
    tintColor: themes.colors.MAIN_COLOR,
    marginLeft: vw(10),
  },
  dropdownTextStyle: {
    fontSize: vw(14),
    fontFamily: themes.fontFamily.fontFamily,
  },
  informationFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 7,
  },
  styleModal: {
    width: vw(150),
    maxHeight: vw(120),
    borderRadius: vw(3),
    overflow: 'hidden',
    marginTop: vw(10),
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
  buttonCamera: {
    marginLeft: vw(20),
  },
  wapperViewInfo: {
    backgroundColor: themes.colors.WHITE,
    width: '100%',
    paddingHorizontal: vw(10),
    paddingBottom: vw(10),
  },
  textInputInfomation: {
    width: '100%',
    borderRadius: vw(5),
    borderWidth: vw(1),
    paddingVertical: vw(5),
    marginTop: vw(10),
    paddingLeft: vw(10),
    borderColor: themes.colors.COLOR_INPUT_PRICE,
    fontSize: vw(14),
  },
  backgroundModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ModalInsideView: {
    backgroundColor: themes.colors.WHITE,
    height: vw(245),
    width: '90%',
    borderRadius: vw(5),
    padding: vw(10),
  },
  containerModalNote: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtModal: {
    flex: 3,
  },
  textInputModal: {
    flex: 7,
    borderRadius: vw(5),
    borderWidth: vw(1),
    borderColor: themes.colors.COLOR_INPUT_PRICE,
    marginTop: vw(10),
    paddingLeft: vw(5),
    fontSize: vw(14),
  },
  buttonAccpect: {
    color: themes.colors.WHITE,
    fontWeight: 'bold',
    fontSize: vw(16),
  },
  buttonFilter: {
    height: vw(40),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vw(10),
    backgroundColor: themes.colors.MAIN_COLOR,
    borderRadius: vw(5),
  },
  titleTxtInfomation: {
    fontWeight: 'bold',
    fontSize: vw(14),
    paddingTop: vw(10),
  },
  buttonNote: {
    position: 'absolute',
    right: 0,
    marginTop: vw(10),
    marginRight: vw(10),
  },
  iconClose: {
    width: vw(10),
    height: vw(10),
    tintColor: themes.colors.RED,
  },
  txtNoteDrugName: {
    fontWeight: 'bold',
    color: themes.colors.BLACK_BASIC,
    fontSize: vw(12),
  },
  txtDanger: {
    position: 'absolute',
    right: vw(10),
    marginTop: vw(20),
    color: themes.colors.RED,
    fontSize: vw(12),
  },
  txt12: {
    fontSize: vw(12),
  },
  iconCheckDiscount: {
    width: vw(10),
    height: vw(10),
  },
  checkbox: {
    height: vw(15),
    width: vw(15),
    borderColor: themes.colors.MAIN_COLOR,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
