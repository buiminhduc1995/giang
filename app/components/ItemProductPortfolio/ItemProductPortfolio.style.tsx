import { StyleSheet, Dimensions, Platform } from 'react-native';
let { width } = Dimensions.get('window');
import vw from '../../utils/size-dynamic';
import { themes } from '../../constants';
export default StyleSheet.create({
  container: {
    marginHorizontal: vw(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: vw(5),
    paddingHorizontal: vw(10),
    // height: vw(100),
    alignItems: 'center',
    padding:vw(5)
  },
  image: {
    height: vw(85),
    width: vw(85),
  },
  txtName: {
    fontSize: vw(14),
    color: themes.colors.BLACK,
    fontWeight: 'bold',
  },
  txtPrice: {
    color: themes.colors.RED,
    fontSize: vw(14),
    fontWeight: 'bold',
  },
  txtQuality: {
    paddingLeft: vw(5),
  },
  button: {
    height: vw(30),
    width: vw(100),
    borderRadius: vw(5),
    backgroundColor: themes.colors.YELLOW,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: vw(5),
  },
  textButton: {
    color: themes.colors.WHITE,
    fontWeight: 'bold',
    fontSize: vw(12),
  },
  txtInput: {
    height: vw(30),
    width: width / 3,
    borderColor: themes.colors.MAIN_COLOR,
    borderWidth: vw(1),
    borderRadius: vw(5),
    paddingVertical: vw(5),
    paddingLeft: vw(5),
    color: themes.colors.RED,
    marginBottom: vw(5),
  },
  buttonCheck: {
    height: vw(20),
    padding:vw(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vw(5),
  },
  inputUpdateQuanlity: {
    color: themes.colors.COLOR_INPUT_PRICE,
    padding: 0,
    textAlign: 'center',
    fontSize: vw(12),
    height: vw(20),
    fontWeight: 'bold',
    flex: 1,
  },
  wapperQuanlity: {
    flexDirection: 'row',
    alignItems: 'center',
    height: vw(20),
    borderColor: themes.colors.BORDER_COLOR,
    backgroundColor: themes.colors.BACKGROUND_BOX_INPUT,
    borderWidth: vw(0.5),
    borderRadius: vw(3),
  },
  styleModal: {
    width: vw(150),
    maxHeight: vw(120),
    borderRadius: vw(3),
    overflow: 'hidden',
    marginRight: -vw(10),
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
  wapperQuanlityDrug: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: vw(20),
    width: vw(70),
    borderColor: themes.colors.MAIN_COLOR,
    borderWidth: vw(1),
    flexDirection: 'row',
    marginLeft: vw(5),
  },
  statusProduct: {
    borderRadius: vw(3),
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: vw(10),
    height: vw(20),
  },
  txtStatus: {
    color: themes.colors.WHITE,
    fontSize: vw(10),
  },
  iconCaretDown: {
    width: vw(6),
    height: vw(6),
    resizeMode: 'contain',
    marginRight: vw(5),
  },
  dropdownTextStyle: {
    fontSize: vw(14),
    fontFamily: themes.fontFamily.fontFamily,
    paddingHorizontal: vw(15),
  },
  buttonRight: {
    justifyContent: 'flex-end',
  },
  ItemContentWapper: {
    paddingLeft: vw(10),
    // height: vw(80),
    justifyContent: 'space-between',
  },
  ItemContentLayout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonNote: {
    backgroundColor: themes.colors.MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    height: vw(20),
    borderRadius: vw(5),
    paddingHorizontal: vw(5),
  },
  txtNote: {
    color: themes.colors.WHITE,
    fontWeight: 'bold',
    fontSize: vw(10),
  },
  buttonIcon: {
    width: vw(20),
    height: vw(20),
    tintColor: themes.colors.MAIN_COLOR,
  },
  wapperButtonTrash: {
    alignItems: 'flex-end',
  },
  txtLot: {
    fontSize: vw(12),
    color: themes.colors.BLACK,
  },
  date: {
    fontSize: vw(12),
  },
  viewExpDate: {
    height: vw(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vw(5),
    paddingHorizontal: vw(3),
  },
  txtExpDate: {
    fontSize: vw(10),
    fontWeight: 'bold',
    color: themes.colors.WHITE,
  },
  containerGetList: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 3,
    height: vw(80),
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rowRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: vw(60),
  },
  buttonBarCode: {
    height: vw(24),
    width: vw(53),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.MAIN_COLOR,
    borderRadius: vw(5),
  },
  txtSelected: {
    color: themes.colors.WHITE,
    fontWeight: 'bold',
    fontSize: vw(12),
  },
  txtUnSelected: {
    color: themes.colors.MAIN_COLOR,
    fontWeight: 'bold',
    fontSize: vw(12),
  },
  txtModal: {
    fontSize: vw(10),
    color: themes.colors.MAIN_COLOR,
    fontFamily: themes.fontFamily.fontFamily,
  },
  iconRight: {
    width: vw(10),
    height: vw(10),
  },
  txtDate: {
    fontSize: vw(12),
    fontWeight: 'bold',
  },
});
