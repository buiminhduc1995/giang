import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic';
import { themes } from '../../constants';
export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 5,
    height: vw(100),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    backgroundColor: themes.colors.WHITE,
    borderRadius: 5,
  },
  image: {
    height: vw(80),
    width: vw(80),
  },
  txtprice: {
    fontSize: vw(12),
    fontWeight: 'bold',
    color: themes.colors.RED,
  },
  txtName: {
    fontSize: vw(14),
    fontWeight: 'bold',
    color: themes.colors.BLACK,
  },
  quanlity: {
    width: vw(40),
    height: vw(20),
    borderColor: themes.colors.BORDER_COLOR,
    backgroundColor: themes.colors.BACKGROUND_BOX_INPUT,
    borderWidth: 0.5,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amount: {
    color: themes.colors.COLOR_INPUT_PRICE,
    fontSize: vw(12),
    fontWeight: 'bold',
  },
  wapperItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  touch: {
    alignItems: 'flex-end',
    height: vw(80),
  },
  txt12:{
    fontSize:vw(12),
  }
});
