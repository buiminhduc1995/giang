import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic';
import { MAIN_COLOR, themes } from '../../constants/index';
export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // paddingHorizontal: vw(5)
  },
  flatList: {
    width: '100%',
    padding: vw(5),
  },
  containerDataEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtListEmpty: {
    fontSize: vw(12),
  },
  input: {
    color: themes.colors.COLOR_INPUT,
    backgroundColor: 'transparent',
    height: vw(40),
    paddingVertical: 0,
    flex: 1,
    fontSize: vw(14),
  },
  wapperInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themes.colors.BACKGROUND_BOX_INPUT,
    borderRadius: vw(5),
    margin: vw(10),
    paddingHorizontal: vw(10),
  },
  iconSearch: {
    width: vw(21),
    height: vw(21),
    resizeMode: 'contain',
  },
});
