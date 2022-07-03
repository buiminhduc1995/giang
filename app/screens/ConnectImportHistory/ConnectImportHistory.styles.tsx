import { StyleSheet, Platform } from 'react-native';
import vw from '../../utils/size-dynamic';
import { themes } from '../../constants/';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  wappertitle: {
    width: '100%',
    paddingHorizontal: vw(10),
    paddingTop: vw(5),
  },
  txtTilte: {
    fontSize: vw(14),
    fontWeight: 'bold',
    color: themes.colors.BLACK,
  },
  wapperSearchBox: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themes.colors.BACKGROUND_BOX_INPUT,
    borderRadius: 5,
    margin: vw(10),
    paddingHorizontal: vw(10),
    flex: 1,
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
    // fontFamily: 'Arial',
    paddingHorizontal: vw(15),
  },
  wapperDropDown: {
    alignItems: 'center',
  },
  txtValueDropDown: {
    fontSize: vw(10),
    color: themes.colors.MAIN_COLOR,
    // fontFamily: 'Arial',
  },
  iconFilter: {
    width: vw(16),
    height: vw(16),
    resizeMode: 'contain',
  },
  wapperSectionList: {
    backgroundColor: themes.colors.BACKGROUND_COLOR,
    flex: 1,
  },
  containerDataEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtListEmpty: {
    fontWeight: 'bold',
    color: themes.colors.MAIN_COLOR,
    fontSize: vw(14),
  },
});
