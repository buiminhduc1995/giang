import { StyleSheet } from 'react-native';
import { themes } from '../../constants';
import vw from '../../utils/size-dynamic/';
export default StyleSheet.create({
  container: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    borderColor: themes.colors.MAIN_COLOR,
    borderWidth: 1,
    height: 60,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  txt: {
    paddingLeft: 10,
  },
  wapperLayout: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: themes.colors.MAIN_COLOR,
    width: vw(101),
    height: vw(24),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vw(2),
  },
  txtPhone: {
    fontSize: vw(14),
  },
  buttonSelectCustomer: {
    height: vw(25),
    width: vw(100),
    borderRadius: vw(5),
    backgroundColor: themes.colors.MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  title: {
    color: themes.colors.BLACK_BASIC,
    fontSize: vw(14),
    fontWeight: 'bold',
  },
  containerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: themes.colors.WHITE,
    height: vw(50),
    alignItems: 'center',
    paddingHorizontal: vw(10),
    borderRadius: vw(2),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 7,
  },
  right: {
    flex: 3,
    alignItems: 'center',
  },
  txtTime: {
    color: themes.colors.COLOR_INPUT_PRICE,
    fontSize: vw(12),
  },
  txtSelected: {
    color: themes.colors.WHITE,
    fontSize: vw(14),
  },
});
