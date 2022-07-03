import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic';
import { themes } from '../../constants';
import { colors } from '../../constants/themes';
export default StyleSheet.create({
  container: {
    width: '100%',
    padding: vw(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: vw(70),
  },
  image: {
    width: vw(60),
    height: vw(60),
    borderRadius: vw(5),
  },
  wapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sell: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    height: vw(60),
    justifyContent: 'space-between',
    marginLeft: vw(5),
    flex: 1,
  },
  txtNameDrug: {
    fontSize: vw(13),
    color: themes.colors.BLACK,
    fontWeight: 'bold',
  },
  txtDescription: {
    fontSize: vw(11),
    color: themes.colors.PLACEHOLDER_INPUT,
  },
  txtSell: {
    fontSize: vw(11),
    color: themes.colors.BLACK_BASIC,
  },
  wapperSell: {
    justifyContent: 'center',
    alignItems: 'center',
    height: vw(15),
    paddingHorizontal: vw(15),
    backgroundColor: themes.colors.BORDER_COLOR,
    borderRadius: vw(3),
    marginLeft: vw(5),
  },
  numberSell: {
    fontSize: vw(12),
    color: colors.BLACK,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  txtOrder: {
    fontSize: vw(13),
    color: themes.colors.BLUE,
  },
  right: {
    height: vw(60),
    alignItems: 'flex-end',
  },
  unit_name: {
    paddingLeft: vw(5),
    fontSize: vw(12),
  },
});
