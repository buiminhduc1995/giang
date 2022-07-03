import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic';
import { themes } from '../../constants';
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
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: themes.colors.WHITE,
  },
  iconHelp: {
    width: vw(20),
    height: vw(20),
  },
  txtNotConnect: {
    color: themes.colors.BLACK,
    fontSize: vw(12),
    textAlign: 'center',
  },
});
