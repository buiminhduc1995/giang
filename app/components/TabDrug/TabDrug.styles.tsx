import { StyleSheet, Platform } from 'react-native';
import vw from '../../utils/size-dynamic/';
import { themes } from '../../constants';
export default StyleSheet.create({
  containerSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themes.colors.BACKGROUND_BOX_INPUT,
    borderRadius: 5,
    margin: vw(10),
    paddingHorizontal: vw(10),
  },
  iconSearch: {
    width: vw(21),
    height: vw(21),
    resizeMode: 'contain',
  },
  input: {
    color: themes.colors.COLOR_INPUT,
    backgroundColor: 'transparent',
    height: vw(40),
    paddingVertical: 0,
    flex: 1,
    fontSize:vw(14)
  },
  dropDownStyle: {
    width: vw(150),
    height: 'auto',
    maxHeight: vw(120),
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: vw(10),
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
  text: {
    fontSize: vw(10),
    color: themes.colors.MAIN_COLOR,
    fontFamily: themes.fontFamily.fontFamily,
  },
  noContext: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  context: {
    flex: 1,
  },
  viewAnimation: {
    width: '50%',
    height: vw(30),
    backgroundColor: themes.colors.BACKGROUND_COLOR,
    borderRadius: vw(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  wapperAnimation: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '50%',
  },
  txtAnimation: {
    color: themes.colors.MAIN_COLOR,
    fontWeight: 'bold',
    fontSize: vw(12),
  },
  wapperSearchBox: {
    backgroundColor: themes.colors.WHITE,
  },
});
