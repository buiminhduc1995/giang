import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic';
import { BLACK, SHADOW, themes } from '../../constants';
export default StyleSheet.create({
  container: {
    ...SHADOW,
    backgroundColor: 'white',
    height: vw(60),
    justifyContent: 'space-between',
    marginTop: vw(5),
    marginHorizontal: vw(5),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(7),
    borderRadius: vw(5),
  },
  boxStatus: {
    height: vw(20),
    // width: vw(70),
    borderRadius: vw(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: vw(10),
    color: themes.colors.WHITE,
  },
  layoutInfor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: vw(12),
    fontWeight: 'bold',
    paddingRight: vw(5),
    color: themes.colors.BLACK,
  },
  buttonIcon: {
    alignItems: 'flex-end',
  },
  wapperLayout: {
    height: vw(50),
    justifyContent: 'space-between',
  },
  datetime: {
    fontSize: vw(12),
    color: themes.colors.BLACK,
  },
});
