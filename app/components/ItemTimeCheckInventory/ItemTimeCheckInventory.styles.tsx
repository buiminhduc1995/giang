import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic/';
import { themes } from '../../constants/index';
export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: vw(5),
  },
  wapper: {
    height: vw(40),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: themes.colors.WHITE,
    borderRadius: vw(5),
    paddingHorizontal: vw(5),
  },
  txt: {
    fontSize: vw(12),
    fontWeight: 'bold',
    color: themes.colors.BLACK,
  },
  txtButton: {
    fontSize: vw(12),
    fontWeight: 'bold',
    color: themes.colors.MAIN_COLOR,
  },
});
