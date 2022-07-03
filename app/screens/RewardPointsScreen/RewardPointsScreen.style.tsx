import { StyleSheet } from 'react-native';
import { MAIN_COLOR } from '../../constants/';
import vw from '../../utils/size-dynamic';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0EDEE',
  },
  wapper: {
    flex: 1,
    marginHorizontal: vw(10),
    marginTop: vw(10),
  },
  wapperNotiPoint: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: vw(38),
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: vw(5),
    paddingHorizontal: vw(10),
  },
  txtbutton: {
    color: MAIN_COLOR,
    fontSize: vw(12),
  },
  txt: {
    color: 'black',
    fontSize: vw(14),
  },
  titleTxt: {
    fontSize: vw(16),
    color: '#595959',
    fontWeight: 'bold',
    paddingTop: 20,
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
    color: '#ffffff',
  },
});
