import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic';
import { themes } from '../../constants/index';
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: vw(70),
    alignItems: 'center',
    backgroundColor: themes.colors.WHITE,
    paddingHorizontal: vw(5),
    borderRadius: vw(5),
    ...themes.SHADOW,
    marginBottom: vw(10),
  },
  icon: {
    width: vw(60),
    height: vw(60),
  },
  content: {
    flex: 1,
    height: vw(60),
    justifyContent: 'space-between',
    marginLeft: vw(5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    alignItems: 'flex-end',
    height: vw(60),
    width: vw(100),
    justifyContent: 'space-between',
  },
  containerStatus: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: vw(7),
    borderRadius: vw(2),
  },
  txtStatus: {
    fontSize: vw(12),
    color: themes.colors.WHITE,
  },
  h1: {
    fontSize: vw(14),
    fontWeight: 'bold',
    color: themes.colors.BLACK,
  },
  h6: {
    fontSize: vw(12),
    color: themes.colors.BLACK,
  },
});
