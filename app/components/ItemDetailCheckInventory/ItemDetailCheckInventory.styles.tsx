import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic/';
import { themes } from '../../constants/index';
export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: vw(5),
    flexDirection: 'row',
    alignItems: 'center',
    height: vw(80),
    backgroundColor: themes.colors.WHITE,
    marginTop: vw(5),
  },
  image: {
    height: vw(60),
    width: vw(60),
  },
  center: {
    flex: 1,
    marginLeft: vw(5),
  },
  right: {
    width: vw(80),
    height: vw(80),
  },
  viewRight: {
    height: vw(20),
    borderRadius: vw(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.MAIN_COLOR,
    marginTop: vw(5),
    padding: vw(5),
  },
  txtRight: {
    fontSize: vw(10),
    color: themes.colors.WHITE,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: vw(14),
    fontWeight: 'bold',
    color: themes.colors.BLACK,
  },
  detail: {
    fontSize: vw(12),
    fontWeight: 'bold',
  },
  waperText: {
    width: vw(40),
    height: vw(20),
    borderColor: themes.colors.BORDER_COLOR,
    backgroundColor: themes.colors.BACKGROUND_BOX_INPUT,
    borderWidth: vw(0.5),
    borderRadius: vw(3),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: vw(5),
  },
  txtInput: {
    color: themes.colors.COLOR_INPUT_PRICE,
    textAlign: 'center',
    fontSize: vw(12),
    fontWeight: 'bold',
  },
  lot: {
    fontSize: vw(12),
    fontWeight: 'bold',
    color: themes.colors.MAIN_COLOR,
    paddingLeft: vw(5),
  },
  rightCheck: {
    height: vw(70),
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  iconTrash: {
    width: vw(20),
    height: vw(20),
    tintColor: themes.colors.MAIN_COLOR,
  },
});
