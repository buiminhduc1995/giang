import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic';
import { MAIN_COLOR, themes } from '../../constants';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  wapperSreach: {
    paddingHorizontal: vw(10),
    paddingTop: vw(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSearch: {
    width: vw(21),
    height: vw(21),
    resizeMode: 'contain',
  },
  textInputSearch: {
    color: themes.colors.COLOR_INPUT,
    backgroundColor: 'transparent',
    height: vw(40),
    paddingVertical: 0,
    fontSize: vw(14),
  },
  containerSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themes.colors.BACKGROUND_BOX_INPUT,
    borderRadius: vw(5),
    paddingHorizontal: vw(5),
    flex: 1,
  },
  containerBody: {
    width: '100%',
    padding: vw(5),
    marginVertical: vw(5),
    flex: 1,
  },
  containerEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmpty: {
    fontSize: 20,
    color: themes.colors.MAIN_COLOR,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wapperButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: vw(7),
    paddingHorizontal: vw(10),
  },
  txtFooter: {
    color: themes.colors.WHITE,
    fontSize: vw(12),
    fontWeight: 'bold',
  },
  buttonExport: {
    height: vw(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: vw(10),
    backgroundColor: themes.colors.MAIN_COLOR,
    width: '100%',
  },
  buttonAddDrug: {
    width: vw(100),
    height: vw(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.MAIN_COLOR,
    marginLeft: vw(5),
    borderRadius: vw(5),
    paddingHorizontal: vw(5),
  },
  txtAdd: {
    fontSize: vw(12),
    color: themes.colors.BLACK,
    fontWeight: 'bold',
  },
});
