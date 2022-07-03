import { StyleSheet, Platform } from 'react-native';
import { MAIN_COLOR, themes } from '../../constants/';
import vw from '../../utils/size-dynamic';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  SectionHeader: {
    fontSize: vw(16),
    padding: vw(5),
    color: 'black',
    fontWeight: 'bold',
  },
  ModalInsideView: {
    backgroundColor: themes.colors.WHITE,
    height: '50%',
    width: '90%',
    borderRadius: vw(10),
    padding: vw(10),
  },
  backgroundModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.TRANSPARENT,
  },
  txtFilter: {
    color: 'black',
    // fontWeight: 'bold',
    fontSize: vw(14),
  },
  wapperInputFilter: {
    flexDirection: 'row',
    height: vw(40),
    width: '100%',
    borderRadius: vw(5),
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: vw(10),
  },
  buttonFilter: {
    height: vw(40),
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vw(10),
    backgroundColor: themes.colors.MAIN_COLOR,
    borderRadius: vw(5),
  },
  txtAskFilter: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: vw(16),
  },
  stylesModal: {
    width: vw(150),
    // height: 'auto',
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
  txtModal: { fontSize: vw(10), color: themes.colors.MAIN_COLOR, fontFamily: 'Arial' },
  imageModal: {
    width: vw(16),
    height: vw(16),
    resizeMode: 'contain',
  },
  checkbox: {
    height: vw(15),
    width: vw(15),
    borderColor: themes.colors.MAIN_COLOR,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wapperCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vw(3),
    marginTop: vw(20),
  },
  dropdownTextStyle: {
    fontSize: vw(14),
    fontFamily: 'Arial',
    paddingHorizontal: vw(15),
  },
  wapperSectionList: {
    backgroundColor: themes.colors.BACKGROUND_COLOR,
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: vw(5),
  },
  wapperTitleSectionList: {
    marginTop: vw(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerDataEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtListEmpty: {
    fontSize: vw(20),
    color: themes.colors.MAIN_COLOR,
    fontWeight: 'bold',
  },
  inputSearchBox: {
    color: themes.colors.COLOR_INPUT,
    backgroundColor: 'transparent',
    height: vw(40),
    paddingVertical: 0,
    flex: 1,
    fontSize: vw(14),
  },
  containerSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themes.colors.BACKGROUND_BOX_INPUT,
    borderRadius: vw(5),
    margin: vw(10),
    paddingHorizontal: vw(10),
  },
  iconSearchBox: {
    width: vw(21),
    height: vw(21),
    resizeMode: 'contain',
  },
  wapperSearchBox: {
    backgroundColor: 'white',
  },
  wapperModalBox: {
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
  buttonGoBack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtSelectTime: {
    paddingLeft: vw(5),
    fontSize: vw(13),
  },
  iconFilter: {
    width: vw(15),
    height: vw(15),
    tintColor: 'white',
  },
  txtFilterButton: {
    fontSize: vw(18),
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: themes.colors.WHITE,
  },
  containerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wapperButtonCancel: {
    position: 'absolute',
    right: vw(0),
    marginTop: vw(10),
    marginRight: vw(10),
  },
  iconClose: {
    width: vw(10),
    height: vw(10),
    tintColor: themes.colors.RED,
  },
  iconCheck: {
    width: vw(10),
    height: vw(10),
  },
  wapperView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vw(15),
  },
  wapperColum1: {
    flex: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconRight: {
    width: vw(10),
    height: vw(10),
    tintColor: themes.colors.MAIN_COLOR,
  },
});
