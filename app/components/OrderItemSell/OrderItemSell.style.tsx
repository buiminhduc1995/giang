import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic/';
import { themes } from '../../constants/';
export default StyleSheet.create({
  container: {
    marginHorizontal: vw(10),
    marginTop: vw(5),
    paddingHorizontal: vw(5),
    backgroundColor: themes.colors.WHITE,
    height: vw(85),
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vw(10),
  },
  txt: {
    paddingLeft: 6,
    fontSize: vw(14),
  },
  nameProduct: {
    fontSize: vw(14),
    fontWeight: 'bold',
    color: themes.colors.BLACK_BASIC,
  },
  txtdate: {
    fontSize: vw(12),
    color: themes.colors.BLACK_BASIC,
    textAlign: 'right',
  },
  buttonDetail: {
    width: vw(101),
    height: vw(24),
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderRadius: vw(2),
  },
  txtButton: {
    fontWeight: 'bold',
    color: themes.colors.WHITE,
    fontSize: vw(12),
  },
  containerButton: {
    height: vw(85),
    flex: 4,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: vw(10),
  },
  iconRight: {
    width: vw(10),
    height: vw(10),
    tintColor: themes.colors.MAIN_COLOR,
  },
  iconAmount: {
    width: vw(20),
    height: vw(20),
    tintColor: themes.colors.MAIN_COLOR,
  },
  iconPerson: {
    width: vw(20),
    height: vw(20),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
