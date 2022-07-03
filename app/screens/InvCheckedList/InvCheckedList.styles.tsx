import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic';
import { themes } from '../../constants/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerFlatlist: {
    flex: 1,
    padding: vw(5),
    backgroundColor: themes.colors.BACKGROUND_COLOR,
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
  },
  txtFilter: {
    color: themes.colors.BLACK,
    fontSize: vw(14),
    fontWeight: 'bold',
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
    shadowRadius: vw(4.65),
    elevation: vw(8),
  },
  txtButtonCheck: {
    fontSize: vw(12),
    color: themes.colors.WHITE,
    fontWeight: 'bold',
  },
  backgroundModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ModalInsideView: {
    backgroundColor: 'white',
    height: vw(150),
    width: '90%',
    borderRadius: vw(5),
    padding: vw(10),
  },
  containerModalNote: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtModal: {
    flex: 6,
  },
  textInputModal: {
    flex: 4,
    borderRadius: vw(5),
    borderWidth: vw(1),
    borderColor: themes.colors.BLACK,
    marginTop: vw(10),
    paddingLeft: vw(5),
    fontSize: vw(14),
  },
  buttonAccpect: {
    color: themes.colors.WHITE,
    fontWeight: 'bold',
    fontSize: vw(16),
  },
  buttonFilter: {
    height: vw(40),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vw(10),
    backgroundColor: themes.colors.MAIN_COLOR,
    borderRadius: vw(5),
  },
  viewNumber: {
    width: vw(20),
    height: vw(20),
    borderRadius: vw(10),
    backgroundColor: themes.colors.RED,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: vw(-3),
    right: vw(0),
  },
  txtNumber: {
    fontSize: vw(16),
    color: themes.colors.WHITE,
    fontWeight: 'bold',
  },
  containerRight: {
    backgroundColor: themes.colors.YELLOW,
    height: vw(30),
    padding: vw(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vw(5),
  },
  txtRight: {
    color: themes.colors.WHITE,
    fontWeight: 'bold',
    fontSize: vw(12),
  },
  txtFlatList: {
    color: themes.colors.BLACK,
    fontSize: vw(14),
    fontWeight: 'bold',
    marginVertical: vw(5),
  },
  iconClose: {
    width: vw(10),
    height: vw(10),
    tintColor: themes.colors.RED,
  },
  txtDrugName: {
    fontWeight: 'bold',
    color: themes.colors.BLACK_BASIC,
    fontSize: vw(12),
  },
  buttonClose: {
    position: 'absolute',
    right: vw(0),
    marginTop: vw(10),
    marginRight: vw(10),
  },
  wapperModal: {
    marginTop: vw(10),
    alignItems: 'center',
  },
  txt12: {
    fontSize: vw(12),
  },
});

export default styles;
