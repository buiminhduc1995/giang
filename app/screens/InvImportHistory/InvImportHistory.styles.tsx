import { StyleSheet, Platform } from 'react-native';
import vw from '../../utils/size-dynamic';
import { MAIN_COLOR, BLACK, themes } from '../../constants/';
import { title, body, header } from '../../constants/themes';
export default StyleSheet.create({
  container: {
    flex: 1,
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
    borderRadius: vw(5),
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
    fontSize:vw(14)
  },
  containerFlatlist: {
    width: '100%',
    paddingHorizontal: vw(5),
    flex: 1,
    paddingBottom: vw(5),
  },
  containerType: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    paddingHorizontal: vw(5),
    justifyContent: 'space-between',
    marginTop: vw(10),
  },
  image: {
    height: vw(10),
    width: vw(10),
    marginRight: vw(5),
  },
  containerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: vw(30),
    padding: vw(5),
    borderRadius: vw(5),
    backgroundColor: themes.colors.MAIN_COLOR,
  },
  txtButton: {
    fontSize: vw(12),
    color: themes.colors.WHITE,
    fontWeight: 'bold',
  },
  containerDataEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownStyle: {
    width: vw(150),
    height: 'auto',
    maxHeight: vw(120),
    borderRadius: vw(3),
    overflow: 'hidden',
    marginTop: vw(10),
    marginRight: -vw(10),
    // Shadow
    ...Platform.select({
      ios: {
        shadowColor: themes.colors.BLACK_BASIC,
        shadowOffset: { width: vw(0), height: vw(2) },
        shadowOpacity: vw(0.14),
        shadowRadius: vw(2),
      },
      android: {
        elevation: vw(8),
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
  wapperHeader: {
    height: vw(40),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: vw(10),
  },
  buttonCreate: {
    width: '100%',
    height: vw(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.YELLOW,
    borderRadius: vw(5),
  },
  txtHeaderRight: {
    fontSize: vw(14),
    fontWeight: 'bold',
    color: themes.colors.WHITE,
  },
  wappertitle: {
    width: '100%',
    paddingHorizontal: vw(10),
    paddingTop: vw(5),
  },
  txtTilte: {
    ...title,
  },
  txtListEmpty: {
    ...body,
    color: themes.colors.BLACK,
    fontWeight: 'bold',
  },
});
