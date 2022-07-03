import { StyleSheet } from 'react-native';
import vw from '../../utils/size-dynamic';
import { MAIN_COLOR, BLACK, BACKGROUND_COLOR } from '../../constants';

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
    fontSize: vw(18),
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  containerSearch: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSearch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: vw(5),
    margin: vw(10),
    paddingHorizontal: vw(10),
    height: vw(40),
  },
  iconSearch: {
    width: vw(21),
    height: vw(21),
    resizeMode: 'contain',
  },
  textSearch: {
    color: '#BDBDBD',
    height: vw(40),
    flex: 1,
    paddingVertical: vw(10),
    fontSize: vw(14),
  },
  iconQRcode: {
    width: vw(20),
    height: vw(20),
    tintColor: MAIN_COLOR,
    justifyContent: 'center',
  },
  txtQR: {
    fontSize: vw(10),
    color: MAIN_COLOR,
  },
  buttonQR: {
    alignItems: 'center',
    paddingRight: vw(5),
  },
  wrapperContainer: {
    //flex: 1,
    flexGrow: 1,
    backgroundColor: BACKGROUND_COLOR,
    paddingHorizontal: vw(10),
    paddingTop: vw(5),
  },
  title: {
    fontSize: vw(14),
    fontWeight: 'bold',
    color: BLACK,
    fontFamily: 'Arial',
  },
  imageIndicator: {
    alignSelf: 'center',
    width: vw(25),
    height: vw(40),
  },
  textIndicator: {
    textAlign: 'center',
    fontFamily: 'Arial',
    fontWeight: '600',
    fontSize: vw(12),
  },
  productListContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: vw(5),
    marginBottom: vw(5),
  },
  inforExportContainer: {
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: vw(5),
    padding: vw(5),
  },
  element: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  modalContainer: {
    height: vw(30),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: vw(2),
    borderWidth: 1,
    borderColor: MAIN_COLOR,
    paddingLeft: vw(3),
  },
  boxInput: {
    height: vw(50),
    fontSize: vw(12),
    width: '100%',
    borderWidth: 1,
    borderColor: MAIN_COLOR,
    textAlignVertical: 'top',
    padding: vw(5),
  },
  text: {
    fontSize: vw(12),
    fontWeight: 'bold',
    color: '#4F4F4F',
    width: '40%',
  },
  button: {
    height: vw(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: vw(10),
    marginVertical: vw(7),
    marginHorizontal: vw(10),
    backgroundColor: MAIN_COLOR,
  },
  textButton: {
    fontSize: vw(18),
    color: 'white',
    fontWeight: '500',
  },
  wrapperContentElement: {
    width: '60%',
  },
  wrapperDatePicker: {
    width: '60%',
    height: vw(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
