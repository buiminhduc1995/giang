import { StyleSheet, Platform } from 'react-native';
import vw from '../../utils/size-dynamic';
import { MAIN_COLOR, themes } from '../../constants';
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
    // justifyContent: 'space-between',
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
    width: '90%',
  },
  txt12: {
    fontSize: vw(12),
  },
});
