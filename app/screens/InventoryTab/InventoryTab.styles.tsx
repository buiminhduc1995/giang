import { StyleSheet, Platform } from 'react-native';
import vw from '../../utils/size-dynamic';
import { MAIN_COLOR } from '../../constants';
import { header } from '../../constants/themes';
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
    ...header,
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
  iconSearch: {
    width: vw(21),
    height: vw(21),
    resizeMode: 'contain',
  },
  styleInput: {
    color: '#333333',
    backgroundColor: 'transparent',
    height: vw(40),
    paddingVertical: 0,
    flex: 1,
  },
  button: {
    backgroundColor: MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    height: vw(20),
    width: vw(80),
    borderRadius: 5,
  },
  txtButton: {
    fontSize: vw(12),
    fontWeight: 'bold',
    color: 'white',
  },
  wapperHederRight: {
    width: vw(120),
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFC107',
    borderRadius: 5,
    marginRight: vw(10),
  },
  txtHeaderRight: {
    fontSize: vw(12),
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
