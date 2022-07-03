import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic/';
import { themes } from '../../constants';
export default StyleSheet.create({
  imageItem: {
    height: vw(80),
    width: vw(80),
  },
  containerItem: {},
  ItemContentWapper: {
    paddingLeft: vw(10),
    height: vw(80),
    justifyContent: 'space-between',
  },
  txtPrice: {
    color: themes.colors.RED_BROWN,
    fontSize: vw(14),
    fontWeight: 'bold',
  },
  txtName: {
    fontSize: vw(14),
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
    height: vw(20),
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
    paddingLeft: vw(5),
    fontSize:vw(12)
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  txtDiscount: {
    color: themes.colors.YELLOW,
    fontSize: vw(10),
  },
});
