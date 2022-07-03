import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic';
import { themes } from '../../constants';
export default StyleSheet.create({
  container: {
    ...themes.SHADOW,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: themes.colors.WHITE,
    borderRadius: vw(5),
    paddingHorizontal: vw(5),
    paddingVertical: vw(5),
    marginTop: vw(7),
    marginHorizontal: vw(5),
  },
  itemContentWapper: {
    flex: 1,
  },
  image: {
    width:vw(80),
    // height:vw(80),
    aspectRatio: 1,
    margin: vw(5),
  },
  txtName: {
    fontSize: vw(14),
    color: themes.colors.BLACK,
    fontWeight: 'bold',
  },
  text: {
    fontSize: vw(12),
    color: themes.colors.BLACK,
  },
  txtPrice: {
    color: themes.colors.RED,
    fontSize: vw(12),
    fontWeight: 'bold',
  },
  buttonNote: {
    justifyContent: 'center',
    alignItems: 'center',
    height: vw(20),
    borderRadius: vw(5),
    paddingHorizontal: vw(5),
  },
  txtNote: {
    color: themes.colors.WHITE,
    fontWeight: 'bold',
    fontSize: vw(10),
  },
  quantity: {
    borderColor: themes.colors.BORDER_COLOR,
    backgroundColor: themes.colors.BACKGROUND_BOX_INPUT,
    borderWidth: vw(0.5),
    borderRadius: vw(3),
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: vw(12),
    height: vw(20),
    fontWeight: 'bold',
    width: vw(40),
  },
  amount: {
    color: themes.colors.BLACK,
    fontSize: vw(12),
    fontWeight: 'bold',
  },
  buttonIcon: {
    width: vw(20),
    height: vw(20),
    tintColor: themes.colors.MAIN_COLOR,
  },
  containerRight: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  txtTypeDrug: {
    fontSize: vw(12),
    fontWeight: 'bold',
    marginTop: vw(5),
  },
  viewRight: {
    height: vw(20),
    borderRadius: vw(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vw(5),
    padding: vw(5),
  },
  txtRight: {
    fontSize: vw(10),
    color: themes.colors.WHITE,
  },
  wapperRight: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
