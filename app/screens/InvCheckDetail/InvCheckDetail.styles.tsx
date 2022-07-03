import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic';
import { themes } from '../../constants/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerFlatlist: {
    width: '100%',
    paddingHorizontal: vw(5),
    flex: 1,
    paddingBottom: vw(5),
  },
  containerDataEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtListEmpty: {
    fontSize: vw(14),
    color: themes.colors.MAIN_COLOR,
  },
  title: {
    fontSize: vw(16),
    fontWeight: 'bold',
    color: themes.colors.BLACK,
    paddingLeft: vw(5),
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
    fontFamily: themes.fontFamily.fontFamily,
    fontWeight: 'bold',
    color: themes.colors.WHITE,
  },
  txtTitle: {
    fontSize: vw(16),
    color: themes.colors.COLOR_INPUT,
    fontWeight: 'bold',
  },
  wapperSearchBox: {
    backgroundColor: themes.colors.WHITE,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themes.colors.BACKGROUND_BOX_INPUT,
    borderRadius: vw(5),
    margin: vw(10),
    paddingHorizontal: vw(10),
    flex: 1,
  },
  iconSearchBox: {
    width: vw(21),
    height: vw(21),
    resizeMode: 'contain',
  },
  inputSearchBox: {
    color: themes.colors.COLOR_INPUT,
    backgroundColor: 'transparent',
    height: vw(40),
    paddingVertical: vw(0),
    flex: 1,
    fontSize: vw(14),
  },
  txtFilter: {
    color: themes.colors.BLACK,
    fontSize: vw(14),
    fontWeight: 'bold',
  },
  buttonCheckInventory: {
    height: vw(40),
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vw(5),
    backgroundColor: themes.colors.MAIN_COLOR,
    marginVertical: vw(5),
  },
  txtCheck: {
    color: themes.colors.WHITE,
    fontWeight: 'bold',
    fontSize: vw(14),
  },
  buttonCheck: {
    width: vw(60),
    height: vw(60),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowOffset: { x: 2, y: 0 },
    borderRadius: vw(30),
    position: 'absolute',
    bottom: vw(20),
    right: vw(20),
    shadowRadius: 4.65,
    backgroundColor: themes.colors.MAIN_COLOR,
    elevation: vw(8),
  },
  txtButtonCheck: {
    fontSize: vw(12),
    color: themes.colors.WHITE,
    fontWeight: 'bold',
  },
  wapperHeader: {
    height: vw(40),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: vw(10),
    marginBottom: vw(5),
  },
  buttonCreate: {
    width: '100%',
    height: vw(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.YELLOW,
    borderRadius: vw(5),
  },
  txtHeaderRight: {
    fontSize: vw(14),
    fontFamily: themes.fontFamily.fontFamily,
    fontWeight: 'bold',
    color: themes.colors.WHITE,
  },
  wappertitle: {
    width: '100%',
    paddingHorizontal: vw(10),
    paddingTop: vw(5),
  },
  txtTilte: {
    fontSize: vw(14),
    fontWeight: 'bold',
    color: themes.colors.BLACK,
  },
  containerDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: vw(10),
  },
});

export default styles;
