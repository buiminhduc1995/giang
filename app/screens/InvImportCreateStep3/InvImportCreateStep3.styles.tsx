import { StyleSheet, Platform } from 'react-native';
import vw from '../../utils/size-dynamic';
import { themes } from '../../constants/';
export default StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: vw(18),
    fontFamily: themes.fontFamily.fontFamily,
    fontWeight: 'bold',
    color: themes.colors.WHITE,
  },
  progress: {
    width: '100%',
    height: vw(2),
    backgroundColor: themes.colors.BACKGROUND_COLOR,
    marginTop: vw(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(5),
    marginBottom: vw(10),
  },
  cricle: {
    width: vw(20),
    height: vw(20),
    borderRadius: vw(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerText: {
    marginTop: vw(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: vw(5),
    marginBottom: vw(10),
  },
  txtProgress: {
    color: themes.colors.WHITE,
    fontSize: vw(12),
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vw(10),
  },
  rowLeft: {
    flex: 4,
  },
  rowRight: {
    flex: 6,
  },
  stylesModal: {
    width: vw(150),
    height: 'auto',
    maxHeight: vw(120),
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: -vw(100),
    marginRight: -vw(10),
    borderColor: themes.colors.MAIN_COLOR,
    borderWidth: 1,
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
    fontFamily: themes.fontFamily.fontFamily,
    paddingHorizontal: vw(15),
  },
  txt: {
    fontSize: vw(12),
    fontWeight: 'bold',
    color: themes.colors.BLACK,
  },
  textInput: {
    height: vw(40),
    borderBottomColor: themes.colors.MAIN_COLOR,
    borderBottomWidth: 1,
    fontSize: vw(14),
  },
  containerSearch: {
    backgroundColor: themes.colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSearch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.BACKGROUND_BOX_INPUT,
    borderRadius: vw(5),
    paddingHorizontal: vw(10),
    height: vw(40),
  },
  iconSearch: {
    width: vw(21),
    height: vw(21),
    resizeMode: 'contain',
  },
  textSearch: {
    color: themes.colors.PLACEHOLDER_INPUT,
    height: vw(40),
    flex: 1,
    paddingVertical: vw(10),
    fontSize:vw(14)
  },
  wapperInputFilter: {
    flexDirection: 'row',
    height: vw(40),
    width: vw(200),
    borderRadius: 5,
    borderColor: themes.colors.GRAY,
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: vw(10),
  },
  txtSelected: {
    marginRight: vw(5),
    fontSize:vw(14)
  },
  note: {
    height: vw(70),
    borderColor: themes.colors.MAIN_COLOR,
    borderWidth: 1,
    width: '100%',
    textAlignVertical: 'top',
    borderRadius: vw(5),
    fontSize:vw(14)
  },
  containerEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: vw(100),
  },
  wapperTitle: {
    width: '100%',
    height: vw(40),
    backgroundColor: themes.colors.BACKGROUND_COLOR,
    justifyContent: 'space-between',
    paddingHorizontal: vw(10),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vw(5),
  },
  txtTitle: {
    fontWeight: 'bold',
    color: themes.colors.BLACK,
    fontSize: vw(14),
  },
  button: {
    borderRadius: vw(5),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: vw(10),
    paddingVertical: vw(5),
  },
  txtButton: {
    fontSize: vw(12),
    fontWeight: 'bold',
  },
  txtFooter: {
    fontSize: vw(13),
    fontWeight: 'bold',
    color: themes.colors.WHITE,
  },
  buttonImport: {
    height: vw(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: vw(10),
    backgroundColor: themes.colors.MAIN_COLOR,
    width: '100%',
  },
  wapperButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: vw(7),
    paddingHorizontal: vw(10),
  },
  txtProgressDeatail: {
    fontSize: vw(14),
  },
  txtRed: {
    position: 'absolute',
    right: 10,
    marginTop: 10,
    color: 'red',
    fontSize: vw(14),
  },
  iconDropDown:{
    width: vw(14), height: vw(14), tintColor: themes.colors.BLACK_BASIC 
  }
});
