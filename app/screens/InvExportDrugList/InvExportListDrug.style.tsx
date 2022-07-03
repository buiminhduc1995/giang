import { StyleSheet } from 'react-native';

import { BACKGROUND_COLOR, MAIN_COLOR } from '../../constants';
import vw from '../../utils/size-dynamic';
import { colors } from '../../constants/themes';

const styles = StyleSheet.create({
  wrapperHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  // search
  containerSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: vw(5),
    margin: vw(10),
    paddingHorizontal: vw(10),
    fontSize: vw(14),
  },
  iconSearch: {
    width: vw(21),
    height: vw(21),
    resizeMode: 'contain',
  },
  textInputSearch: {
    color: '#333333',
    backgroundColor: 'transparent',
    height: vw(40),
    flex: 1,
    fontSize: vw(14),
  },
  // body
  containerBody: {
    paddingVertical: vw(5),
    paddingHorizontal: vw(10),
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  //header
  title: {
    fontSize: vw(18),
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  iconBack: {
    width: vw(11),
    height: vw(20),
    resizeMode: 'contain',
    marginRight: vw(10),
  },
  //bottonExport
  buttonExport: {
    height: vw(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: vw(10),
    marginVertical: vw(7),
    marginHorizontal: vw(10),
    backgroundColor: MAIN_COLOR,
  },
  textButton: {
    color: '#FFF',
    fontSize: vw(16),
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  //empty list
  wrapperEmptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmptyList: {
    fontSize: vw(20),
    color: colors.MAIN_COLOR,
    fontWeight: 'bold',
  },
  //Modal
  backgroundModal: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalInsideView: {
    backgroundColor: 'white',
    height: vw(150),
    width: '90%',
    borderRadius: vw(5),
    padding: vw(10),
  },
  titleModal: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: vw(14),
    textAlign: 'center',
  },
  containerModalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: vw(10),
  },
  textInputRight: {
    width: '45%',
    height: vw(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textInputModal: {
    width: '80%',
    height: vw(40),
    borderRadius: vw(5),
    borderWidth: 1,
    borderColor: '#828282',
    paddingLeft: vw(5),
    fontSize: vw(14),
  },
  buttonAccept: {
    height: vw(40),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vw(10),
    backgroundColor: MAIN_COLOR,
    borderRadius: vw(5),
  },
  closeButton: {
    width: vw(10),
    height: vw(10),
    tintColor: '#000',
    position: 'absolute',
    top: vw(5),
    right: vw(5),
  },
  hitSlop: {
    top: vw(20),
    bottom: vw(20),
    left: vw(20),
    right: vw(20),
  },
  text: {
    fontSize: vw(12),
  },
  textPrice: {
    color: '#EB5757',
    fontSize: vw(14),
    fontWeight: 'bold',
  },
});

export default styles;
