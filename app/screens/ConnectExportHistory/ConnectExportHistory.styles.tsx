import { StyleSheet, Platform } from 'react-native';
import { MAIN_COLOR, BLACK, themes } from '../../constants';
import vw from '../../utils/size-dynamic';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  stylesModal: {
    width: vw(150),
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
  txtModal: {
    fontSize: vw(10),
    color: themes.colors.MAIN_COLOR,
    fontFamily: 'Arial',
  },
  imageModal: {
    width: vw(16),
    height: vw(16),
    resizeMode: 'contain',
  },
  dropdownTextStyle: {
    fontSize: vw(14),
    fontFamily: 'Arial',
    paddingHorizontal: vw(15),
  },
  wapperSectionList: {
    paddingHorizontal: vw(10),
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 5,
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
  inputSearchBox: {
    color: themes.colors.COLOR_INPUT,
    backgroundColor: 'transparent',
    height: vw(40),
    paddingVertical: 0,
    flex: 1,
  },
  containerSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themes.colors.BACKGROUND_BOX_INPUT,
    borderRadius: 5,
    marginHorizontal: vw(10),
    marginVertical: vw(5),
    paddingHorizontal: vw(10),
    flex: 1,
  },
  iconSearchBox: {
    width: vw(21),
    height: vw(21),
    resizeMode: 'contain',
  },
  wapperSearchBox: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  wapperModalBox: {
    alignItems: 'center',
  },
  iconFilter: {
    width: 15,
    height: 15,
    tintColor: 'white',
  },
  wapperHeader: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  buttonCreate: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.YELLOW,
    borderRadius: 5,
  },
  txtHeaderRight: {
    fontSize: vw(14),
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: themes.colors.WHITE,
  },
  text: {
    fontSize: vw(14),
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: themes.colors.BLACK,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 3,
  },
  buttonConnect: {
    height: vw(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.MAIN_COLOR,
    borderRadius: vw(5),
    paddingHorizontal: vw(5),
    width: vw(80),
  },
  txtConnect: {
    fontSize: vw(10),
    color: themes.colors.WHITE,
  },
});
