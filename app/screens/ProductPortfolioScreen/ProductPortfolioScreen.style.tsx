import { StyleSheet, Platform } from 'react-native';
import { MAIN_COLOR, themes } from '../../constants/';
import vw from '../../utils/size-dynamic';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  wapperList: {
    flex: 1,
    paddingTop: 5,
  },
  txtButton: {
    color: 'white',
    fontSize: 15,
  },
  containerSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themes.colors.BACKGROUND_BOX_INPUT,
    borderRadius: 5,
    margin: vw(10),
    paddingHorizontal: vw(10),
  },
  iconSearchBox: {
    width: vw(21),
    height: vw(21),
    resizeMode: 'contain',
  },
  inputSearchBox: {
    color: themes.colors.COLOR_INPUT,
    backgroundColor: 'transparent',
    height: vw(40),
    paddingVertical: 0,
    flex: 1,
    fontSize: vw(14),
  },
  wapperSearchBox: {
    backgroundColor: 'white',
  },
  dropdownStyle: {
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
    fontFamily: 'Arial',
    paddingHorizontal: vw(15),
  },
  iconFilter: {
    width: vw(16),
    height: vw(16),
    resizeMode: 'contain',
  },
  txtValueDropDown: {
    fontSize: vw(10),
    color: themes.colors.MAIN_COLOR,
    fontFamily: 'Arial',
  },
  wapperDropDown: {
    alignItems: 'center',
  },
  containerDataEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtListEmpty: {
    fontSize: 20,
    color: themes.colors.MAIN_COLOR,
    fontWeight: 'bold',
  },
  buttonGoBack: {
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
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: themes.colors.WHITE,
  },
});
