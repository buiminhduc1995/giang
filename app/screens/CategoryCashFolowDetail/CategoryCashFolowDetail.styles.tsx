import { StyleSheet } from 'react-native';
import { themes } from '../../constants';
import vw from '../../utils/size-dynamic';
import { header, body, title } from '../../constants/themes';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.WHITE,
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
    ...header,
  },
  wapperTitle: {
    height: vw(40),
    width: '100%',
    paddingHorizontal: vw(5),
    justifyContent: 'center',
    backgroundColor: themes.colors.BACKGROUND_COLOR,
  },
  txtTitle: {
    ...title,
  },
  wapperInformation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: vw(5),
  },
  txtLeft: {
    color: themes.colors.BLACK_BASIC,
    ...body,
  },
  txtRight: {
    color: themes.colors.BLACK_BASIC,
    ...body,
  },
  wapperHederRight: {
    width: vw(120),
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.WHITE,
    borderRadius: 5,
    marginRight: vw(10),
  },
  txtHeaderRight: {
    ...body,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: themes.colors.MAIN_COLOR,
  },
  containerProduct: {
    backgroundColor: themes.colors.BACKGROUND_COLOR,
    flex: 1,
  },
  imageItem: {
    height: 80,
    width: 80,
  },
  containerItem: {},
  ItemContentWapper: {
    paddingLeft: 10,
    height: 80,
    justifyContent: 'space-between',
  },
  txtPrice: {
    color: '#EB5757',
    fontSize: 14,
    fontWeight: 'bold',
  },
  txtName: {
    fontSize: 14,
    color: '#4F4F4F',
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
    borderColor: '#E0E0E0',
    backgroundColor: '#f2f2f2',
    borderWidth: 0.5,
    borderRadius: 3,
  },
  inputUpdateQuanlity: {
    color: '#828282',
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
});
