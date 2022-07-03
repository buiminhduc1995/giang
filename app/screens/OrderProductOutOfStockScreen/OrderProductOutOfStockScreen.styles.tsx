import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic/';
import { MAIN_COLOR } from '../../constants/';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonGoBack: {
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
  wapperSearchBox: {
    backgroundColor: 'white',
  },
  containerSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    margin: vw(10),
    paddingHorizontal: vw(10),
  },
  iconSearchBox: {
    width: vw(21),
    height: vw(21),
    resizeMode: 'contain',
  },
  inputSearchBox: {
    color: '#333333',
    backgroundColor: 'transparent',
    height: vw(40),
    paddingVertical: 0,
    flex: 1,
  },
  containerDataEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtListEmpty: {
    fontSize: 20,
    color: MAIN_COLOR,
    fontWeight: 'bold',
  },
  wapperList: {
    backgroundColor: '#F0EDEE',
    flex: 1,
    paddingTop: 5,
  },
});
